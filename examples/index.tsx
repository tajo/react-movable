import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List, Item, arrayMove } from '../src/index';

export default class App extends React.Component<{}, { items: string[] }> {
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
        render={({ items, isDragged }) => (
          <ul
            style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined }}
          >
            {items.map(({ value, itemProps }) => (
              <Item
                render={props => (
                  <li
                    {...props}
                    style={{
                      ...props.style,
                      padding: '1em',
                      margin: '0.5em 0em',
                      listStyleType: 'none',
                      cursor: 'grab',
                      backgroundColor: itemProps.isSelected ? 'yellow' : '#CCC'
                    }}
                  >
                    {value}
                  </li>
                )}
                renderGhost={props => (
                  <li
                    {...props}
                    style={{
                      ...props.style,
                      padding: '1em',
                      margin: 0,
                      backgroundColor: 'blue',
                      listStyleType: 'none',
                      cursor: 'grabbing'
                    }}
                  >
                    {value}
                  </li>
                )}
                {...itemProps}
              />
            ))}
          </ul>
        )}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
