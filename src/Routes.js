import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Videos from './Videos';
import Video from './Video';

export default () => (
  <Switch>
	  <Route path="/login" exact component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/videos" component={Videos} />
    <Route path="/video/:videoId" component={Video} />}/>
    <Route component={NotFound} />
  </Switch>
);
