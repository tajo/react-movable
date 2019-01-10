import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List, Item, arrayMove } from '../src/index';

const itemStyles = {
  padding: '1em',
  marginTop: '0.5em',
  marginBottom: '0.5em',
  listStyleType: 'none'
};

const ghostItemStyles = {
  padding: '1em',
  margin: 0,
  backgroundColor: 'blue',
  listStyleType: 'none'
};

export default class App extends React.Component<{}, { items: string[] }> {
  state = {
    items: [
      'Item 0',
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6'
    ]
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
        render={items => (
          <ul style={{ padding: 0 }}>
            {items.map(({ value, itemProps }) => (
              <Item
                render={props => (
                  <li
                    {...props}
                    style={{
                      ...itemStyles,
                      ...props.style,
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
                      ...ghostItemStyles,
                      ...props.style
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
