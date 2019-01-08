import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List, Item, arrayMove } from '../src/index';

const itemStyles = {
  padding: '1em',
  margin: '0.5em',
  listStyleType: 'none'
};

const ghostItemStyles = {
  padding: '1em',
  margin: 0,
  backgroundColor: 'blue',
  listStyleType: 'none'
};

const placeholderItemStyles = {
  ...itemStyles,
  backgroundColor: 'yellow'
};

export default class App extends React.Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3']
  };
  render() {
    return (
      <List
        values={this.state.items}
        onChange={({ oldIndex, newIndex }: { oldIndex: any; newIndex: any }) =>
          this.setState((prevState: any) => ({
            items: arrayMove(prevState.items, oldIndex, newIndex)
          }))
        }
        render={(items: any) => (
          <ul style={{ padding: 0 }}>
            {items.map(
              ({ value, itemProps }: { value: any; itemProps: any }) => (
                <Item
                  render={(props: any) => {
                    return (
                      <li
                        {...props}
                        style={{
                          ...itemStyles,
                          ...props.style,
                          backgroundColor: itemProps.beforeDropzone
                            ? 'red'
                            : '#CCC'
                        }}
                      >
                        {value}
                      </li>
                    );
                  }}
                  renderGhost={(props: any) => (
                    <li
                      {...props}
                      style={{ ...ghostItemStyles, ...props.style }}
                    >
                      {value}
                    </li>
                  )}
                  renderPlaceholder={(props: any) => (
                    <li
                      {...props}
                      style={{
                        ...placeholderItemStyles,
                        ...props.style
                      }}
                    >
                      {value}
                    </li>
                  )}
                  {...itemProps}
                />
              )
            )}
          </ul>
        )}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
