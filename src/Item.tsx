import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IBaseItemProps } from './List';

interface IRenderProps {
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  ref: React.RefObject<any>;
  style: React.CSSProperties;
}

interface IItemProps extends IBaseItemProps {
  render: (itemProps: IRenderProps) => React.ReactNode;
}

class Item extends React.Component<IItemProps> {
  ghostRef = React.createRef<HTMLElement>();
  itemRef = React.createRef<HTMLElement>();
  componentDidMount() {
    if (this.props.isDragged) {
      this.props.setGhostRef(this.ghostRef);
    }
    this.props.setItemRef(this.itemRef, this.props.index);
  }
  componentDidUpdate(prevProps: IItemProps) {
    if (this.props.isDragged && !prevProps.isDragged) {
      this.props.setGhostRef(this.ghostRef);
    }
    if (prevProps.index !== this.props.index) {
      this.props.setItemRef(this.itemRef, this.props.index);
    }
  }
  componentWillUnmount() {
    this.props.removeItemRef(this.props.index);
  }
  render() {
    const baseRenderProps = {
      style: {
        userDrag: 'none',
        userSelect: 'none',
        boxSizing: 'border-box'
      } as React.CSSProperties
    };
    const renderItemProps = {
      ...baseRenderProps,
      style: {
        ...baseRenderProps.style,
        visibility: this.props.isDragged ? 'hidden' : undefined,
        zIndex: this.props.isSelected ? 5000 : 0,
        position: 'relative'
      } as React.CSSProperties,
      ref: this.itemRef,
      tabIndex: 0,
      onKeyDown: (e: React.KeyboardEvent) =>
        this.props.onKeyDown(e, this.props.index),
      onMouseDown: (e: React.MouseEvent) =>
        this.props.onMouseStart(e, this.props.index),
      onTouchStart: (e: React.TouchEvent) =>
        this.props.onTouchStart(e, this.props.index),
      'aria-roledescription': this.props.voiceover.item(this.props.index + 1)
    };
    const renderGhostProps = {
      ...baseRenderProps,
      ref: this.ghostRef,
      style: {
        ...baseRenderProps.style,
        display: 'block',
        position: 'fixed',
        marginTop: 0,
        top: this.props.ghostItemStyle.top,
        left: this.props.ghostItemStyle.left,
        width: this.props.ghostItemStyle.width,
        height: this.props.ghostItemStyle.height
      } as React.CSSProperties
    };
    return (
      <React.Fragment>
        {this.props.render(renderItemProps)}
        {this.props.isDragged &&
          ReactDOM.createPortal(
            this.props.render(renderGhostProps),
            document.body
          )}
      </React.Fragment>
    );
  }
}

export default Item;
