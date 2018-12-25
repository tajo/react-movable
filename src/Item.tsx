import * as React from 'react';

interface IItemProps {
  children: () => React.ReactNode;
}

class Item extends React.Component<IItemProps> {
  render() {
    return this.props.children();
  }
}

export default Item;
