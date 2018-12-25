import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List, Item } from '../src/index';

const MyList: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <List>{() => <ul>{children}</ul>}</List>
);
const MyItem: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <Item>{() => <li>{children}</li>}</Item>
);

export default class App extends React.Component {
  render() {
    return (
      <MyList>
        <MyItem>Heyoo222</MyItem>
        <MyItem>Item 2</MyItem>
      </MyList>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
