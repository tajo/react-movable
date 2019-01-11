import * as React from 'react';
import { List, Item, arrayMove } from '../index';
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants';

class App extends React.Component<{}, { items: string[] }> {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  };
  render() {
    return (
      <div
        style={{
          maxWidth: '300px',
          margin: '0px auto',
          backgroundColor: '#F7F7F7',
          padding: '3em'
        }}
      >
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
                  key={value}
                  render={props => (
                    <li
                      {...props}
                      style={{
                        ...props.style,
                        padding: '1.5em',
                        margin: itemProps.isDragged ? 0 : '0.5em 0em',
                        listStyleType: 'none',
                        cursor: itemProps.isDragged ? 'grabbing' : 'grab',
                        border: '2px solid #CCC',
                        boxShadow: '3px 3px #AAA',
                        color: '#333',
                        borderRadius: '5px',
                        fontFamily:
                          'Arial, "Helvetica Neue", Helvetica, sans-serif',
                        backgroundColor: itemProps.isActive ? '#EEE' : '#FFF'
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
      </div>
    );
  }
}

export default App;
