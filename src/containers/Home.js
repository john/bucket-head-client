import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>BucketHead</h1>
          <p>Shoot instant replays straight out of your head.</p>
		      <h4><a href="/#videos">See the videos</a></h4>
        </div>
      </div>
    );
  }
}

export default Home;
