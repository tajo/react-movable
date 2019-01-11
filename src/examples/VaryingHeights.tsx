import * as React from 'react';
import { List, Item, arrayMove } from '../index';

class App extends React.Component<{}, { items: string[] }> {
  state = {
    items: [
      '70px Item 1',
      '100px Item 2',
      '70px Item 3',
      '70px Item 4',
      '150px Item 5'
    ]
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
                        margin: '0.5em 0em',
                        display: 'flex',
                        alignItems: 'center',
                        listStyleType: 'none',
                        cursor: itemProps.isDragged ? 'grabbing' : 'grab',
                        border: '2px solid #CCC',
                        boxShadow: '3px 3px #AAA',
                        color: '#333',
                        borderRadius: '5px',
                        fontFamily:
                          'Arial, "Helvetica Neue", Helvetica, sans-serif',
                        backgroundColor: itemProps.isActive ? '#EEE' : '#FFF',
                        height: `${parseInt(value, 10)}px`
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
