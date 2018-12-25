import * as React from 'react';

interface IListProps {
  children: () => React.ReactNode;
}

class List extends React.Component<IListProps> {
  render() {
    return this.props.children();
  }
}

export default List;
