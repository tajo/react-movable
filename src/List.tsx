import * as React from 'react';
import { getTranslateOffset } from './utils';

export interface IBaseItemProps {
  index: number;
  isDragged: boolean;
  ghostItemStyle: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  onMouseStart: (e: React.MouseEvent, index: number) => void;
  onTouchStart: (e: React.TouchEvent, index: number) => void;
  setItemRef: (ref: React.RefObject<HTMLElement>, index: number) => void;
  setGhostRef: (ref: React.RefObject<HTMLElement>) => void;
}

interface IListProps<Value> {
  render: (
    items: { value: Value; itemProps: IBaseItemProps }[]
  ) => React.ReactNode;
  values: Value[];
  onChange: (meta: { oldIndex: number; newIndex: number }) => void;
  transitionDuration: number;
  lockVertically: boolean;
}

class List<Value = string> extends React.Component<IListProps<Value>> {
  items: React.RefObject<HTMLElement>[] = [];
  ghostRef = React.createRef<HTMLElement>();
  state = {
    itemDragged: -1,
    afterIndex: -2,
    initialX: 0,
    initialY: 0,
    targetX: 0,
    targetY: 0,
    targetHeight: 0,
    targetWidth: 0
  };

  static defaultProps = { transitionDuration: 300, lockVertically: false };

  onMouseStart = (e: React.MouseEvent, index: number) => {
    if (e.button !== 0) return;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onEnd);
    this.onStart(e.target as HTMLElement, e.pageX, e.pageY, index);
  };

  onTouchStart = (e: React.TouchEvent, index: number) => {
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onEnd);
    document.addEventListener('touchcancel', this.onEnd);
    this.onStart(
      e.target as HTMLElement,
      e.touches[0].pageX,
      e.touches[0].pageY,
      index
    );
  };

  onStart = (
    target: HTMLElement,
    pageX: number,
    pageY: number,
    index: number
  ) => {
    const targetRect = target.getBoundingClientRect() as DOMRect;
    this.setState({
      itemDragged: index,
      targetX: targetRect.x,
      targetY: targetRect.y,
      targetHeight: targetRect.height,
      targetWidth: targetRect.width,
      initialX: pageX,
      initialY: pageY
    });
  };

  onMouseMove = (e: MouseEvent) => this.onMove(e.pageX, e.pageY);

  onTouchMove = (e: TouchEvent) =>
    this.onMove(e.touches[0].pageX, e.touches[0].pageY);

  onMove = (pageX: number, pageY: number) => {
    if (this.state.itemDragged === -1) return null;
    const ghostEl = this.ghostRef.current as HTMLElement;
    ghostEl.style.transform = `translate3d(${
      this.props.lockVertically ? 0 : pageX - this.state.initialX
    }px, ${pageY - this.state.initialY}px, 0px)`;
    const element = this.items[this.state.itemDragged].current!;
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (pageY > this.items[i].current!.offsetTop) {
        if (this.state.afterIndex !== i) {
          this.items[i].current!.style['transition-duration' as any] = `${
            this.props.transitionDuration
          }ms`;
          if (i > this.state.afterIndex) {
            if (!this.items[i].current!.style.transform) {
              this.items[
                i
              ].current!.style.transform = `translate3d(0px, -${getTranslateOffset(
                element
              )}px, 0px)`;
            } else {
              this.items[i - 1].current!.style.transform = null;
            }
          } else {
            if (!this.items[i].current!.style.transform) {
              this.items[
                i
              ].current!.style.transform = `translate3d(0px, ${getTranslateOffset(
                element
              )}px, 0px)`;
            } else {
              this.items[i + 1].current!.style.transform = null;
            }
          }
          this.setState({ afterIndex: i });
        }
        return;
      }
    }
    this.setState({ afterIndex: -1 });
  };

  onEnd = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('mouseup', this.onEnd);
    document.removeEventListener('touchup', this.onEnd);
    document.removeEventListener('touchcancel', this.onEnd);
    if (this.state.afterIndex > -1) {
      const oldIndex = this.state.itemDragged;
      const newIndex = this.state.afterIndex;
      this.props.onChange({ oldIndex, newIndex });
    }
    this.items.forEach(item => {
      item.current!.style.transform = null;
      item.current!.style['transition-duration' as any] = '0ms';
    });
    this.setState({ itemDragged: -1, afterIndex: -2 });
  };

  render() {
    return this.props.render(
      this.props.values.map((value, index) => {
        const itemProps: IBaseItemProps = {
          index,
          isDragged: index === this.state.itemDragged,
          onMouseStart: this.onMouseStart,
          onTouchStart: this.onTouchStart,
          setItemRef: (ref, index) => {
            this.items[index] = ref;
          },
          setGhostRef: ref => {
            this.ghostRef = ref;
          },
          ghostItemStyle: {
            top: this.state.targetY,
            left: this.state.targetX,
            width: this.state.targetWidth,
            height: this.state.targetHeight
          }
        };
        return { value, itemProps };
      })
    );
  }
}

export default List;
