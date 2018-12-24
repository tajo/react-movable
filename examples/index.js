import React from 'react';
import ReactDOM from 'react-dom';
import Movable from '../src/Movable';

export default class App extends React.Component {
  render() {
    return <Movable />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
