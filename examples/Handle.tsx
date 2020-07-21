import * as React from 'react';
import { List, arrayMove, arrayRemove } from '../src/index';

export const HandleIcon = () => (
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

export const buttonStyles = {
  border: 'none',
  margin: 0,
  padding: 0,
  width: 'auto',
  overflow: 'visible',
  cursor: 'pointer',
  background: 'transparent'
};

const Handle: React.FC = () => {
  const [items, setItems] = React.useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);

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
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
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
        renderItem={({ value, props, isDragged, isSelected }) => (
          <li
            {...props}
            style={{
              ...props.style,
              padding: '1.5em',
              margin: '0.5em 0em',
              listStyleType: 'none',
              border: '2px solid #CCC',
              boxShadow: '3px 3px #AAA',
              color: '#333',
              borderRadius: '5px',
              cursor: isDragged ? 'grabbing' : 'inherit',
              fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {/* 
                  Mark any node with the data-movable-handle attribute if you wish
                  to use is it as a DnD handle. The rest of renderItem will be then
                  ignored and not start the drag and drop. 
                */}
              <button
                data-movable-handle
                style={{
                  ...buttonStyles,
                  cursor: isDragged ? 'grabbing' : 'grab',
                  marginRight: '3em'
                }}
                tabIndex={-1}
              >
                <HandleIcon />
              </button>
              <div>{value}</div>
            </div>
          </li>
        )}
      />
    </div>
  );
};

export default Handle;
