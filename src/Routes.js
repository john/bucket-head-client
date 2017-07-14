import React from 'react';
import {
  Switch,
  Route } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Videos from './containers/Videos';
import Video from './containers/Video';
import NotFound from './containers/NotFound';
import AppliedRoute from './components/AppliedRoute'


export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />

    <Route exact path="/videos" component={Videos} />
    <Route path="/video/:videoId" component={Video} props={childProps} />}/>

    <Route component={NotFound} />
  </Switch>
);