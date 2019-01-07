import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IItemRenderProps {
  onMouseDown: (e: React.MouseEvent) => void;
  ref?: React.RefObject<any>;
  style: any;
}
interface IItemProps {
  render: (itemProps: IItemRenderProps) => React.ReactNode;
  renderGhost: (itemProps: IItemRenderProps) => React.ReactNode;
  registerItem?: any;
  onStart?: any;
  ghostItemStyle?: any;
  isDragged?: any;
  index?: number;
  setGhostRef: any;
  setItemRef: any;
}

class Item extends React.Component<IItemProps> {
  ghostRef = React.createRef<HTMLElement>();
  itemRef = React.createRef<HTMLElement>();
  componentDidMount() {
    this.props.setItemRef(this.itemRef, this.props.index);
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.isDragged && !prevProps.isDragged) {
      this.props.setGhostRef(this.ghostRef);
    }
  }
  render() {
    const renderProps = {
      onMouseDown: (e: React.MouseEvent) =>
        this.props.onStart(e, this.props.index),
      ref: this.itemRef,
      style: { userDrag: 'none', userSelect: 'none', boxSizing: 'border-box' }
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
      }
    };
    return (
      <React.Fragment>
        {this.props.render(renderProps)}
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
