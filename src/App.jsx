import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Nav from './component/nav/nav';
import Routes from './route';

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

const App = function App() {
  const [updatePic, setUpdatePic] = useState('');

  return (
    <div className="app">
      {/* <h1>helo</h1> */}
      <ToastContainer />
      <Nav updatePic={updatePic} hc={({ target }) => setUpdatePic(target.value)} />
      <Routes />
    </div>
  );
};

export default App;
