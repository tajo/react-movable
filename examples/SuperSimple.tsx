import * as React from 'react';
import { List, arrayMove } from '../src/index';

class SuperSimple extends React.Component<{}, { items: string[] }> {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  };
  render() {
    return (
      <List
        values={this.state.items}
        onChange={({ oldIndex, newIndex }) =>
          this.setState((prevState: { items: string[] }) => ({
            items: arrayMove(prevState.items, oldIndex, newIndex)
          }))
        }
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props }) => <li {...props}>{value}</li>}
      />
    );
  }
}

export default SuperSimple;
