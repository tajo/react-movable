import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IBaseItemProps } from './List';

interface IItemRenderProps {
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  ref: React.RefObject<any>;
  style: React.CSSProperties;
}

interface IItemProps extends IBaseItemProps {
  render: (itemProps: IItemRenderProps) => React.ReactNode;
  renderGhost: (itemProps: IItemRenderProps) => React.ReactNode;
  renderPlaceholder: (itemProps: IItemRenderProps) => React.ReactNode;
}

class Item extends React.Component<IItemProps> {
  ghostRef = React.createRef<HTMLElement>();
  itemRef = React.createRef<HTMLElement>();
  componentDidMount() {
    this.props.setItemRef(this.itemRef, this.props.index);
  }
  componentDidUpdate(prevProps: IItemProps) {
    if (this.props.isDragged && !prevProps.isDragged) {
      this.props.setGhostRef(this.ghostRef);
    }
  }
  render() {
    const renderProps = {
      onMouseDown: (e: React.MouseEvent) =>
        this.props.onMouseStart(e, this.props.index),
      onTouchStart: (e: React.TouchEvent) =>
        this.props.onTouchStart(e, this.props.index),
      ref: this.itemRef,
      style: {
        userDrag: 'none',
        userSelect: 'none',
        boxSizing: 'border-box'
      } as React.CSSProperties
    };
    const itemGhostProps = {
      ...renderProps,
      ref: this.ghostRef,
      style: {
        ...renderProps.style,
        display: 'block',
        position: 'fixed',
        top: this.props.ghostItemStyle.top,
        left: this.props.ghostItemStyle.left,
        width: this.props.ghostItemStyle.width,
        height: this.props.ghostItemStyle.height
      } as React.CSSProperties
    };
    return (
      <React.Fragment>
        {this.props.isDragged && this.props.renderPlaceholder
          ? this.props.renderPlaceholder(renderProps)
          : this.props.render(renderProps)}
        {this.props.isDragged &&
          ReactDOM.createPortal(
            this.props.renderGhost(itemGhostProps),
            document.body
          )}
      </React.Fragment>
    );
  }
}

export default Item;
