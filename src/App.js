import React, { Component } from 'react';
import Nav from './component/nav/nav';
import Routes from './route';
import './app.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      updatePic: ''
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div className="app">
        <Nav updatePic={this.state.updatePic} hc={this.handleChange} />
        <Routes />
      </div>
    );
  }
}

export default App;
