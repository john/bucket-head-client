import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Login from './Login';
import Videos from './Videos';
import Video from './Video';

// import Home from './containers/Home';

export default () => (
  <Switch>
	  <Route path="/login" exact component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/videos" render={()=><Videos videos={this.state.videos} />}/>
    <Route path="/video/:videoId" component={Video} />}/>
  </Switch>
);