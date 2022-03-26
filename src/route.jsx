import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import Dashboard from './component/dashboard/dashboard';
import Auth from './component/auth/auth';
import Form from './component/form/form';
import Post from './component/post/post';

const Routes = function Routes() {
  return (
    <Switch>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/post/:postid" element={<Post />} />
      <Route path="/new" element={<Form />} />
      <Route exact path="/" element={<Auth />} />
    </Switch>
  );
};

export default Routes;
