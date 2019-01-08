import * as React from 'react';

interface IListProps {
  //children: (props: IListRenderProps) => React.ReactNode;
  render: any;
  values: string[];
  onChange: any;
}

export const events = {
  start: ['touchstart', 'mousedown'],
  move: ['touchmove', 'mousemove'],
  end: ['touchend', 'touchcancel', 'mouseup']
};

class List extends React.Component<IListProps> {
  items: any[] = [];
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

  onStart = (e: React.MouseEvent, index: number) => {
    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseup', this.onEnd);
    const target = e.target as HTMLElement;
    const targetRect = target.getBoundingClientRect() as DOMRect;
    this.setState({
      itemDragged: index,
      targetX: targetRect.x,
      targetY: targetRect.y,
      targetHeight: targetRect.height,
      targetWidth: targetRect.width,
      initialX: e.pageX,
      initialY: e.pageY
    });
  };

  onMove = (e: MouseEvent) => {
    if (this.state.itemDragged === -1) return null;
    const ghostEl = this.ghostRef.current as HTMLElement;
    const translate = `translate3d(${e.pageX -
      this.state.initialX}px, ${e.pageY - this.state.initialY}px, 0px)`;
    ghostEl.style.transform = translate;
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (e.pageY > this.items[i].current.offsetTop) {
        this.setState({ afterIndex: i });
        return;
      }
    }
    this.setState({ afterIndex: -1 });
  };

  onEnd = (e: MouseEvent) => {
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseup', this.onEnd);
    console.log(
      `start: ${this.state.itemDragged}, end: ${this.state.afterIndex}`
    );
    this.state.afterIndex > -1 &&
      this.props.onChange({
        oldIndex: this.state.itemDragged,
        newIndex: this.state.afterIndex
      });
    this.setState({ itemDragged: -1, afterIndex: -2 });
  };

  render() {
    return this.props.render(
      this.props.values.map((value, index) => {
        const itemProps = {
          index,
          isDragged: index === this.state.itemDragged,
          onStart: this.onStart,
          beforeDropzone: index === this.state.afterIndex,
          afterDropzone: index - 1 === this.state.afterIndex,
          setItemRef: (ref: any, index: number) => {
            this.items[index] = ref;
          },
          setGhostRef: (ref: any) => {
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