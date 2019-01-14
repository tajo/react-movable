import * as React from 'react';
import { List, Item, arrayMove } from '../index';
import { FixedSizeList } from 'react-window';

class ItemRenderer extends React.PureComponent<{
  data: any;
  index: number;
  style: any;
}> {
  render() {
    const { itemProps, value } = this.props.data[this.props.index];
    return (
      <Item
        render={props => {
          const windowStyles = itemProps.isDragged
            ? props.style
            : { ...props.style, ...this.props.style };
          return (
            <div style={windowStyles} key={itemProps.value} ref={props.ref}>
              <div
                onMouseDown={props.onMouseDown}
                style={{
                  padding: '1.5em',
                  margin: '0.5em 0em',
                  cursor: itemProps.isDragged ? 'grabbing' : 'grab',
                  border: '2px solid #CCC',
                  boxShadow: '3px 3px #AAA',
                  color: '#333',
                  width: '300px',
                  borderRadius: '5px',
                  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                  backgroundColor: itemProps.isActive ? '#EEE' : '#FFF'
                }}
              >
                {value} {this.props.index} {itemProps.index}
              </div>
            </div>
          );
        }}
        {...itemProps}
      />
    );
  }
}

class App extends React.Component<{}, { items: string[] }> {
  state = {
    items: Array.from(Array(20).keys()).map(val => `Item ${val}`)
  };
  render() {
    return (
      <div
        style={{
          maxWidth: '332px',
          margin: '0px auto',
          backgroundColor: '#F7F7F7',
          padding: '64px 48px'
        }}
      >
        <List
          values={this.state.items}
          onChange={({ oldIndex, newIndex }) => {
            console.log('onChange', oldIndex, newIndex);
            this.setState((prevState: { items: string[] }) => ({
              items: arrayMove(prevState.items, oldIndex, newIndex)
            }));
          }}
          render={({ items }) => (
            <FixedSizeList
              style={{
                borderTop: '5px solid #AAA',
                borderBottom: '5px solid #AAA',
                padding: '1em 0.8em 1em 1em',
                outline: 'none'
              }}
              itemSize={78}
              itemData={items}
              itemCount={items.length}
              width={332}
              height={642}
            >
              {ItemRenderer as any}
            </FixedSizeList>
          )}
        />
      </div>
    );
  }
}

export default App;
