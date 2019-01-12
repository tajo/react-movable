import * as React from 'react';
import { List, Item, arrayMove } from '../index';

class App extends React.Component<{}, { items: string[] }> {
  state = {
    items: Array.from(Array(100).keys()).map(val => `Item ${val}`)
  };
  render() {
    return (
      <div
        style={{
          maxWidth: '332px',
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
          render={({ items, isDragged, onWheel, ref }) => (
            <ul
              style={{
                padding: '1em',
                cursor: isDragged ? 'grabbing' : undefined
              }}
              onWheel={onWheel}
              ref={ref as any}
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
