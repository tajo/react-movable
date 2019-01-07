import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List, Item } from '../src/index';

const itemStyles = {
  padding: '1em',
  backgroundColor: '#CCC',
  listStyleType: 'none'
};

const ghostItemStyles = {
  padding: '1em',
  margin: 0,
  backgroundColor: 'blue',
  listStyleType: 'none'
};

const MyItem: React.SFC<any> = ({ children, ...restProps }) => (
  <Item
    render={(props: any) => {
      return (
        <li
          {...props}
          style={{
            ...itemStyles,
            ...props.style,
            borderTop: restProps.afterDropzone ? '5px solid red' : 0,
            borderBottom: restProps.beforeDropzone ? '5px solid red' : 0,
            marginTop: restProps.afterDropzone ? '0px' : '10px',
            marginBottom: restProps.beforeDropzone ? '0px' : '10px'
          }}
        >
          {children}
        </li>
      );
    }}
    renderGhost={(props: any) => (
      <li {...props} style={{ ...ghostItemStyles, ...props.style }}>
        {children}
      </li>
    )}
    {...restProps}
  />
);

export default class App extends React.Component {
  render() {
    return (
      <List
        render={(children: any) => <ul style={{ padding: 0 }}>{children}</ul>}
      >
        <MyItem>Item 1</MyItem>
        <MyItem>Item 2</MyItem>
        <MyItem>Item 3</MyItem>
      </List>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
