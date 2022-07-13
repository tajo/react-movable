import * as React from 'react';
import { List, arrayMove } from '../src/index';

const css = `
  .ghostItem {
    opacity: 0.5;
  }

  .item {
    position: relative;
  }

  .item:not(.isDragged) {
    transform: none !important;
  }

  .insertNeedle {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background-color: red;
  }

  .insertNeedleAbove {
    top: calc(-.5em + 1px);
  }

  .insertNeedleBelow {
    bottom: calc(-.5em + 1px);
  }
`;

const InsertNeedle: React.FC = () => {
  const [items, setItems] = React.useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  const [needle, setNeedle] = React.useState<null | number>(null);

  return (
    <div
      style={{
        maxWidth: '300px',
        margin: '0px auto',
        backgroundColor: '#F7F7F7',
        padding: '3em'
      }}
    >
      <style>{css}</style>
      <List
        getNeedle={setNeedle}
        transitionDuration={0}
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props, isDragged }) => (
          <ul
            {...props}
            style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined }}
          >
            {children}
          </ul>
        )}
        renderItem={({
          value,
          props,
          isDragged,
          isSelected,
          index,
          itemDragged
        }) => {
          const { style, ...restProps } = props;
          const { visibility, ...styles } = style || {};
          return (
            <li
              {...restProps}
              className={`item ${isDragged ? 'isDragged' : ''} ${
                visibility === 'hidden' ? 'ghostItem' : ''
              }`}
              style={{
                ...styles,
                padding: '1.5em',
                margin: '0.5em 0em',
                listStyleType: 'none',
                cursor: isDragged ? 'grabbing' : 'grab',
                border: '2px solid #CCC',
                color: '#333',
                borderRadius: '5px',
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF',
                zIndex: isSelected || isDragged ? 1 : 'inherit',
                ...(isDragged ? {} : { transform: 'none !important' }),
                ...(visibility === 'hidden' ? { opacity: '.5' } : {})
              }}
            >
              {value}
              {needle === index &&
                !isDragged &&
                !isSelected &&
                visibility !== 'hidden' && (
                  <div
                    className={`insertNeedle ${
                      needle > itemDragged
                        ? `insertNeedleBelow`
                        : 'insertNeedleAbove'
                    }`}
                  ></div>
                )}
            </li>
          );
        }}
      />
    </div>
  );
};

export default InsertNeedle;
