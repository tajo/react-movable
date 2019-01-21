import * as React from 'react';
import { List, arrayMove } from '../src/index';

class LockVertically extends React.Component<{}, { items: string[] }> {
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
          lockVertically
          values={this.state.items}
          onChange={({ oldIndex, newIndex }) =>
            this.setState((prevState: { items: string[] }) => ({
              items: arrayMove(prevState.items, oldIndex, newIndex)
            }))
          }
          renderList={({ children, props, isDragged }) => (
            <ul
              {...props}
              style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined }}
            >
              {children}
            </ul>
          )}
          renderItem={({ value, props, isDragged, isSelected }) => (
            <li
              {...props}
              style={{
                ...props.style,
                padding: '1.5em',
                margin: '0.5em 0em',
                listStyleType: 'none',
                cursor: isDragged ? 'grabbing' : 'grab',
                border: '2px solid #CCC',
                boxShadow: '3px 3px #AAA',
                color: '#333',
                borderRadius: '5px',
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'
              }}
            >
              {value}
            </li>
          )}
        />
      </div>
    );
  }
}

export default LockVertically;
