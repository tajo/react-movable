import * as React from 'react';
import { List, arrayMove, arrayRemove } from '../index';

const Removable = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#555"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x-circle"
  >
    <title>Remove</title>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const Move = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#555"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-move"
  >
    <polyline points="5 9 2 12 5 15" />
    <polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" />
    <polyline points="19 9 22 12 19 15" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

const buttonStyles = {
  border: 'none',
  margin: 0,
  padding: 0,
  width: 'auto',
  overflow: 'visible',
  cursor: 'pointer',
  background: 'transparent'
};

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
          padding: '3em',
          textAlign: 'center'
        }}
      >
        <List
          values={this.state.items}
          onChange={({ oldIndex, newIndex }) =>
            this.setState((prevState: { items: string[] }) => ({
              items: arrayMove(prevState.items, oldIndex, newIndex)
            }))
          }
          renderList={({ children, props, isDragged }) => (
            <ul
              {...props}
              style={{
                padding: '0em 0em 1em 0em',
                cursor: isDragged ? 'grabbing' : 'inherit'
              }}
            >
              {children}
            </ul>
          )}
          renderItem={({ value, props, index, isDragged, isSelected }) => (
            <li
              {...props}
              onMouseDown={undefined}
              onTouchStart={undefined}
              style={{
                ...props.style,
                padding: '1.5em',
                margin: '0.5em 0em',
                listStyleType: 'none',
                border: '2px solid #CCC',
                boxShadow: '3px 3px #AAA',
                color: '#333',
                borderRadius: '5px',
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <button
                  style={{
                    ...buttonStyles,
                    cursor: isDragged ? 'grabbing' : 'grab'
                  }}
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  tabIndex={-1}
                >
                  <Move />
                </button>
                <div>{value}</div>{' '}
                <button
                  onClick={() =>
                    this.setState(prevProps => ({
                      items: index
                        ? arrayRemove(prevProps.items, index)
                        : prevProps.items
                    }))
                  }
                  style={buttonStyles}
                >
                  <Removable />
                </button>
              </div>
            </li>
          )}
        />
        <button
          onClick={() =>
            this.setState({
              items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
                'Item 5',
                'Item 6'
              ]
            })
          }
        >
          Reset
        </button>
      </div>
    );
  }
}

export default App;
