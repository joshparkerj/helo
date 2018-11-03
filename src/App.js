import React, { Component } from 'react';
import Nav from './component/nav/nav';
import Routes from './route';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Nav />
        <Routes />
      </div>
    );
  }
}

export default App;
