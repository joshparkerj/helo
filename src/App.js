import React, { Component } from 'react';
import Nav from './component/nav/nav';
import Routes from './route';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
        <ToastContainer />
        <Nav updatePic={this.state.updatePic} hc={this.handleChange} />
        <Routes />
      </div>
    );
  }
}

export default App;
