import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Videos extends Component {
  
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
      <ul className="videos">
        {this.state.videos.map(video =>
          <li key={video['videoId']['S']} className="video list-unstyled">
            <div>
              <Link to={`/video/${video['videoId']['S']}`}>
                {video['480p_transcoded']['S']}
              </Link>
            </div>
          </li>
        )}
      </ul>
    );
  }
}

export default Videos;
