import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './component/dashboard/dashboard';
import Auth from './component/auth/auth';
import Form from './component/form/form';
import Post from './component/post/post';

export default function Routes(props){
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/post/:postid" component={Post} />
      <Route path="/new" component={Form} />
      <Route exact path="/" component={Auth} />
    </Switch>
  )
}
