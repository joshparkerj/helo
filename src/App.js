import React, { Component } from 'react';
import Dashboard from './component/dashboard/dashboard';
import Auth from './component/auth/auth';
import Form from './component/form/form';
import Nav from './component/nav/nav';
import Post from './component/post/post';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
      <Dashboard />
      <Auth />
      <Form />
      <Nav />
      <Post />
      </div>
    );
  }
}

export default App;
