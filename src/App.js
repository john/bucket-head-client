import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Videos from './Videos';
import Video from './Video';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
  }

  componentDidMount() {
    const url = 'https://1sbgbl3pof.execute-api.us-west-2.amazonaws.com/test/';
    fetch(url)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        this.setState({videos: json['Items']});
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <h2>
              <img src="http://scienceismetal.com/wp-content/uploads/2014/09/Buckethead.jpg" alt="BucketHead" />
              BucketHead!
            </h2>
          </div>

          <Switch>
            <Route exact path="/" render={()=><Videos videos={this.state.videos} />}/>
            { /*<Route exact path='/' render={routeProps => <Videos {...routeProps} />}/> */}

            { /* this one, the prop isn't available yet (above it's available in state). So need to get it dynamically from the link */ }
            <Route path="/video/:videoId" component={Video} />}/>
            { /* <Route path="/video/:videoId" render={()=><Video videos={this.state.videos} />}/> */ }
          </Switch>

        </div>
      </div>
    );
  }
}

export default App;
