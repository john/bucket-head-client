import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import config from '../config.js';

class Videos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
  }

  componentDidMount() {
    fetch( config.dynamodb.URL )
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      this.setState({videos: json['Items']});
    }.bind(this)).catch(function(ex) {
      console.log('parsing failed', ex);
    })
  }

  render() {
    return (
      <div className="videos row">
        {this.state.videos.map(video =>
          <div key={video['VideoId']['S']} className="video col-sm-3">
            <Link to={`/video/${video['VideoId']['S']}`}>
              <img src={config.s3.URL + video['thumbnail']['S']} alt={video['thumbnail']['S']} />
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Videos;
