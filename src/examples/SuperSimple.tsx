import * as React from 'react';
import { List, Item, arrayMove } from '../index';

class App extends React.Component<{}, { items: string[] }> {
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
        render={({ items }) => (
          <ul>
            {items.map(({ value, itemProps }) => (
              <Item
                key={value}
                render={props => <li {...props}>{value}</li>}
                {...itemProps}
              />
            ))}
          </ul>
        )}
      />
    );
  }
}

export default App;
