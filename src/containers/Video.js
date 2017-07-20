import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Vote from '../components/Vote';
import config from '../config.js';

class Video extends Component {

  constructor(props) {
    super(props);
    this.state = {
      video_id: '',
      video_path: '',
      video_duration: '',
      video_thumbnail: '',
      video_url: ''
    };
  }

  // Seeing that I should be using redux to share state, to prevent having
  // to refetch this, but whatever, for now.
  componentDidMount() {
    const { videoId } = this.props.match.params;
    this.setState({videoId: videoId});

    fetch( config.dynamodb.URL + videoId)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        const videos = json['Items']
        this.setState({video_id: videos[0]['VideoId']['S']});
        this.setState({video_path: videos[0]['480p_transcoded']['S']});
        this.setState({video_duration: videos[0]['duration']['S']});
		    this.setState({video_thumbnail: videos[0]['thumbnail']['S']});
        this.setState({video_url: "https://s3-us-west-2.amazonaws.com/bhead-transcoded/" + videos[0]['480p_transcoded']['S']});
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  render() {
    if (!this.state.video_thumbnail) {
        return <div />
    }

    return (
      <div className="videos">
    		<div className="back">
    		  <Link to="/videos">
    		    &larr; Back to videos
    		  </Link>
    		</div>
          <div>
            <a href={this.state.video_url}>
    		      <img src={"https://s3-us-west-2.amazonaws.com/bhead-transcoded/" + this.state.video_thumbnail + '.png'} alt={this.state.video_url} />
            </a>
          </div>
    		<div>
    		  <Vote video_id={this.state.video_id} />
    		</div>
      </div>
    )
  }
}

export default Video;
