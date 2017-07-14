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
      console.log('parsing failed', ex)
    })
  }

  render() {
    return (
      <ol className="videos">
        {this.state.videos.map(video =>
          <li key={video['videoId']['S']} className="video">
            <div>
              <Link to={`/video/${video['videoId']['S']}`}>
                {video['480p_transcoded']['S']}
              </Link>
            </div>
          </li>
        )}
      </ol>
    );
  }
}

export default Videos;
