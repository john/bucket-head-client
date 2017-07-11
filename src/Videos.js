import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Vote from './Vote';

export default class Videos extends Component {
  render() {
    return (
      <ul className="videos">
        {this.props.videos.map(video =>
          //<VideoListItem video={video} key={video['videoId']['S']} />
          <li key={video['videoId']['S']} className="video list-unstyled">
            <div>
              <Link to={`/video/${video['videoId']['S']}`}>
                {video['480p_transcoded']['S']}
              </Link>
              <Vote />
            </div>
          </li>
        )}
      </ul>
    );
  }
}