import * as React from 'react';
import { List, arrayMove } from '../src/index';

const ScrollingWindow: React.FC = () => {
  const [items, setItems] = React.useState(
    Array.from(Array(100).keys()).map((val) => `Item ${val}`)
  );
  React.useEffect(() => {
    document.documentElement.setAttribute('data-scroll', 'single');
    return () => {
      document.documentElement.removeAttribute('data-scroll');
    };
  });
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
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props, isDragged }) => (
          <ul
            {...props}
            style={{
              padding: '1em',
              cursor: isDragged ? 'grabbing' : undefined
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
};

export default ScrollingWindow;
