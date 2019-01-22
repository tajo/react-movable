import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  getTranslateOffset,
  transformItem,
  setItemTransition,
  binarySearch
} from './utils';
import { IItemProps, IProps, TEvent } from './types';

const AUTOSCROLL_ACTIVE_OFFSET = 200;
const AUTOSCROLL_SPEED_RATIO = 10;

class List<Value = string> extends React.Component<IProps<Value>> {
  listRef = React.createRef<HTMLElement>();
  ghostRef = React.createRef<HTMLElement>();
  topOffsets: number[] = [];
  itemTranslateOffsets: number[] = [];
  initialYOffset = 0;
  lastScroll = 0;
  needle = -1;
  afterIndex = -2;
  state = {
    itemDragged: -1,
    selectedItem: -1,
    initialX: 0,
    initialY: 0,
    targetX: 0,
    targetY: 0,
    targetHeight: 0,
    targetWidth: 0,
    liveText: '',
    scrollingSpeed: 0,
    scrollWindow: false
  };

  componentDidMount() {
    this.calculateOffsets();
  }

  componentDidUpdate(_prevProps: any, prevState: { scrollingSpeed: number }) {
    if (
      prevState.scrollingSpeed !== this.state.scrollingSpeed &&
      prevState.scrollingSpeed === 0
    ) {
      this.doScrolling();
    }
  }

  doScrolling = () => {
    const { scrollingSpeed, scrollWindow } = this.state;
    const el = scrollWindow ? window : this.listRef.current!;
    window.requestAnimationFrame(() => {
      el.scrollBy({
        top: scrollingSpeed,
        left: 0
      });
      if (scrollingSpeed !== 0) {
        this.doScrolling();
      }
    });
  };

  getChildren = () => {
    if (this.listRef && this.listRef.current) {
      return Array.from(this.listRef.current.children);
    }
    console.warn(
      'No items found in the List container. Did you forget to pass & spread the `props` param in renderList?'
    );
    return [];
  };

  static defaultProps = {
    transitionDuration: 300,
    lockVertically: false,
    voiceover: {
      item: (position: number) =>
        `You are currently at a draggable item at position ${position}. Press space bar to lift.`,
      lifted: (position: number) =>
        `You have lifted item at position ${position}. Press j to move down, k to move up, space bar to drop and escape to cancel.`,
      moved: (position: number, up: boolean) =>
        `You have moved the lifted item ${
          up ? 'up' : 'down'
        } to position ${position}. Press j to move down, k to move up, space bar to drop and escape to cancel.`,
      dropped: (from: number, to: number) =>
        `You have dropped the item. It has moved from position ${from} to ${to}.`,
      canceled: (position: number) =>
        `You have cancelled the movement. The item has returned to its starting position of ${position}.`
    }
  };

  calculateOffsets = () => {
    this.topOffsets = this.getChildren().map(
      item => item.getBoundingClientRect().top
    );
    this.itemTranslateOffsets = this.getChildren().map(item =>
      getTranslateOffset(item)
    );
  };

  getTargetIndex = (e: TEvent) =>
    this.getChildren().findIndex(
      child => child === e.target || child.contains(e.currentTarget)
    );

  onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    document.addEventListener('mousemove', this.onMouseMove, { passive: true });
    document.addEventListener('mouseup', this.onEnd, { passive: true });
    const index = this.getTargetIndex(e);
    if (index === -1) return;
    this.onStart(
      this.getChildren()[index] as HTMLElement,
      e.clientX,
      e.clientY,
      index
    );
  };

  onTouchStart = (e: React.TouchEvent) => {
    document.addEventListener('touchmove', this.onTouchMove, { passive: true });
    document.addEventListener('touchend', this.onEnd, { passive: true });
    document.addEventListener('touchcancel', this.onEnd, { passive: true });
    const index = this.getTargetIndex(e);
    if (index === -1) return;
    this.onStart(
      this.getChildren()[index] as HTMLElement,
      e.touches[0].clientX,
      e.touches[0].clientY,
      index
    );
  };

  getYOffset = () => {
    const listScroll = this.listRef.current
      ? this.listRef.current.scrollTop
      : 0;
    return window.pageYOffset + listScroll;
  };

  onStart = (
    target: HTMLElement,
    clientX: number,
    clientY: number,
    index: number
  ) => {
    if (this.state.selectedItem > -1) {
      this.setState({ selectedItem: -1 });
      this.needle = -1;
    }
    const targetRect = target.getBoundingClientRect() as DOMRect;
    const targetStyles = window.getComputedStyle(target);
    this.calculateOffsets();
    this.initialYOffset = this.getYOffset();
    this.setState({
      itemDragged: index,
      targetX: targetRect.x - parseInt(targetStyles['margin-left' as any], 10),
      targetY: targetRect.y - parseInt(targetStyles['margin-top' as any], 10),
      targetHeight: targetRect.height,
      targetWidth: targetRect.width,
      initialX: clientX,
      initialY: clientY
    });
  };

  onMouseMove = (e: MouseEvent) => this.onMove(e.clientX, e.clientY);

  onTouchMove = (e: TouchEvent) =>
    this.onMove(e.touches[0].clientX, e.touches[0].clientY);

  onWheel = (e: React.WheelEvent) => {
    if (this.state.itemDragged < 0) return;
    this.lastScroll = this.listRef.current!.scrollTop += e.deltaY;
    this.moveOtherItems();
  };

  onMove = (clientX: number, clientY: number) => {
    if (this.state.itemDragged === -1) return null;
    transformItem(
      this.ghostRef.current!,
      clientY - this.state.initialY,
      this.props.lockVertically ? 0 : clientX - this.state.initialX
    );
    this.autoScrolling(clientY);
    this.moveOtherItems();
  };

  moveOtherItems = () => {
    const targetRect = this.ghostRef.current!.getBoundingClientRect();
    const itemVerticalCenter = targetRect.top + targetRect.height / 2;
    const offset = getTranslateOffset(
      this.getChildren()[this.state.itemDragged]
    );
    const currentYOffset = this.getYOffset();
    // adjust offsets if scrolling happens during the item movement
    if (this.initialYOffset !== currentYOffset) {
      this.topOffsets = this.topOffsets.map(
        offset => offset - (currentYOffset - this.initialYOffset)
      );
      this.initialYOffset = currentYOffset;
    }
    this.afterIndex = binarySearch(this.topOffsets, itemVerticalCenter);
    this.animateItems(
      this.afterIndex === -1 ? 0 : this.afterIndex,
      this.state.itemDragged,
      offset
    );
  };

  autoScrolling = (clientY: number) => {
    const {
      top,
      bottom,
      height
    } = this.listRef.current!.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    // autoscrolling for the window (down)
    if (
      bottom > viewportHeight &&
      viewportHeight - clientY < AUTOSCROLL_ACTIVE_OFFSET
    ) {
      this.setState({
        scrollingSpeed: Math.round(
          (AUTOSCROLL_ACTIVE_OFFSET - (viewportHeight - clientY)) /
            AUTOSCROLL_SPEED_RATIO
        ),
        scrollWindow: true
      });
      // autoscrolling for the window (up)
    } else if (top < 0 && clientY < AUTOSCROLL_ACTIVE_OFFSET) {
      this.setState({
        scrollingSpeed: Math.round(
          (AUTOSCROLL_ACTIVE_OFFSET - clientY) / -AUTOSCROLL_SPEED_RATIO
        ),
        scrollWindow: true
      });
    } else {
      if (this.state.scrollWindow && this.state.scrollingSpeed !== 0) {
        this.setState({ scrollingSpeed: 0, scrollWindow: false });
      }
      // autoscrolling for containers with overflow
      if (height + 20 < this.listRef.current!.scrollHeight) {
        let scrollingSpeed = 0;
        if (clientY - top < AUTOSCROLL_ACTIVE_OFFSET) {
          scrollingSpeed = Math.round(
            (AUTOSCROLL_ACTIVE_OFFSET - (clientY - top)) /
              -AUTOSCROLL_SPEED_RATIO
          );
        } else if (bottom - clientY < AUTOSCROLL_ACTIVE_OFFSET) {
          scrollingSpeed = Math.round(
            (AUTOSCROLL_ACTIVE_OFFSET - (bottom - clientY)) /
              AUTOSCROLL_SPEED_RATIO
          );
        }
        if (this.state.scrollingSpeed !== scrollingSpeed) {
          this.setState({ scrollingSpeed });
        }
      }
    }
  };

  animateItems = (
    needle: number,
    movedItem: number,
    offset: number,
    animateMovedItem: boolean = false
  ) => {
    this.getChildren().forEach((item, i) => {
      setItemTransition(item, this.props.transitionDuration);
      if (movedItem === i && animateMovedItem) {
        if (movedItem === needle) {
          return transformItem(item, null);
        }
        transformItem(
          item,
          movedItem < needle
            ? this.itemTranslateOffsets
                .slice(movedItem + 1, needle + 1)
                .reduce((a, b) => a + b, 0)
            : this.itemTranslateOffsets
                .slice(needle, movedItem)
                .reduce((a, b) => a + b, 0) * -1
        );
      } else if (movedItem < needle && i > movedItem && i <= needle) {
        transformItem(item, -offset);
      } else if (i < movedItem && movedItem > needle && i >= needle) {
        transformItem(item, offset);
      } else {
        transformItem(item, null);
      }
    });
  };

  onEnd = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('mouseup', this.onEnd);
    document.removeEventListener('touchup', this.onEnd);
    document.removeEventListener('touchcancel', this.onEnd);
    if (this.afterIndex > -1 && this.state.itemDragged !== this.afterIndex) {
      this.props.onChange({
        oldIndex: this.state.itemDragged,
        newIndex: this.afterIndex
      });
    }
    this.getChildren().forEach(item => {
      setItemTransition(item, 0);
      transformItem(item, null);
    });
    this.setState({ itemDragged: -1, scrollingSpeed: 0 });
    this.afterIndex = -2;
    // sometimes the scroll gets messed up after the drop, fix:
    if (this.lastScroll > 0) {
      this.listRef.current!.scrollTop = this.lastScroll;
      this.lastScroll = 0;
    }
  };

  onKeyDown = (e: React.KeyboardEvent) => {
    const selectedItem = this.state.selectedItem;
    const index = this.getTargetIndex(e);
    if (index === -1) return;
    if (e.key === ' ') {
      e.preventDefault();
      if (selectedItem === index) {
        if (selectedItem !== this.needle) {
          this.getChildren().forEach(item => {
            setItemTransition(item, 0);
            transformItem(item, null);
          });
          this.props.onChange({
            oldIndex: selectedItem,
            newIndex: this.needle
          });
          (this.getChildren()[this.needle] as HTMLElement).focus();
        }
        this.setState({
          selectedItem: -1,
          liveText: this.props.voiceover.dropped(
            selectedItem + 1,
            this.needle + 1
          )
        });
        this.needle = -1;
      } else {
        this.setState({
          selectedItem: index,
          liveText: this.props.voiceover.lifted(index + 1)
        });
        this.needle = index;
      }
    }
    if (
      (e.key === 'ArrowDown' || e.key === 'j') &&
      selectedItem > -1 &&
      this.needle < this.props.values.length - 1
    ) {
      e.preventDefault();
      const offset = getTranslateOffset(this.getChildren()[selectedItem]);
      this.needle++;
      this.animateItems(this.needle, selectedItem, offset, true);
      this.setState({
        liveText: this.props.voiceover.moved(this.needle + 1, false)
      });
    }
    if (
      (e.key === 'ArrowUp' || e.key === 'k') &&
      selectedItem > -1 &&
      this.needle > 0
    ) {
      e.preventDefault();
      const offset = getTranslateOffset(this.getChildren()[selectedItem]);
      this.needle--;
      this.animateItems(this.needle, selectedItem, offset, true);
      this.setState({
        liveText: this.props.voiceover.moved(this.needle + 1, true)
      });
    }
    if (e.key === 'Escape' && selectedItem > -1) {
      this.getChildren().forEach(item => {
        setItemTransition(item, 0);
        transformItem(item, null);
      });
      this.setState({
        selectedItem: -1,
        liveText: this.props.voiceover.canceled(selectedItem + 1)
      });
      this.needle = -1;
    }
    if ((e.key === 'Tab' || e.key === 'Enter') && selectedItem > -1) {
      e.preventDefault();
    }
  };

  render() {
    const baseStyle = {
      userSelect: 'none',
      '-webkit-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      boxSizing: 'border-box',
      position: 'relative'
    } as React.CSSProperties;
    const ghostStyle = {
      ...baseStyle,
      top: this.state.targetY,
      left: this.state.targetX,
      width: this.state.targetWidth,
      height: this.state.targetHeight,
      display: 'block',
      position: 'fixed',
      marginTop: 0
    } as React.CSSProperties;
    return (
      <React.Fragment>
        {this.props.renderList({
          children: this.props.values.map((value, index) => {
            const isHidden = index === this.state.itemDragged;
            const isSelected = index === this.state.selectedItem;
            const props: IItemProps = {
              key: index,
              tabIndex: 0,
              'aria-roledescription': this.props.voiceover.item(index + 1),
              onKeyDown: this.onKeyDown,
              onMouseDown: this.onMouseDown,
              onTouchStart: this.onTouchStart,
              style: {
                ...baseStyle,
                visibility: isHidden ? 'hidden' : undefined,
                zIndex: isSelected ? 5000 : 0
              } as React.CSSProperties
            };
            return this.props.renderItem({
              value,
              props,
              index,
              isDragged: false,
              isSelected
            });
          }),
          isDragged: this.state.itemDragged > -1,
          props: {
            ref: this.listRef
          }
        })}
        {this.state.itemDragged > -1 &&
          ReactDOM.createPortal(
            this.props.renderItem({
              value: this.props.values[this.state.itemDragged],
              props: {
                ref: this.ghostRef,
                style: ghostStyle,
                onWheel: this.onWheel
              },
              isDragged: true,
              isSelected: false
            }),
            document.body
          )}
        <div
          aria-live="assertive"
          role="log"
          aria-atomic="true"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            margin: '-1px',
            border: '0px',
            padding: '0px',
            overflow: 'hidden',
            clip: 'react(0px, 0px, 0px, 0px)',
            clipPath: 'inset(100%)'
          }}
        >
          {this.state.liveText}
        </div>
      </React.Fragment>
    );
  }
}

export default List;
