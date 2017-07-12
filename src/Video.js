import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Vote from './Vote';

export default class Video extends Component {

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

    const url = 'https://1sbgbl3pof.execute-api.us-west-2.amazonaws.com/test/';
    fetch(url + videoId)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        const videos = json['Items']
        this.setState({video_id: videos[0]['videoId']['S']});
        this.setState({video_path: videos[0]['480p_transcoded']['S']});
        this.setState({video_duration: videos[0]['duration']['S']});
		this.setState({video_thumbnail: videos[0]['thumbnail']['S']});
        this.setState({video_url: "https://s3-us-west-2.amazonaws.com/bhead-transcoded/" + videos[0]['480p_transcoded']['S']});
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      })
      console.log( 'videos at end: ' + this.state.videos )
  }

  render() {

    return (
      <div className="videos">
		<div>
		  <Link to="/">
		    &larr; Back to videos
		  </Link>
		</div>
        <div>
          <a href={this.state.video_url}>
		    <img src={"https://s3-us-west-2.amazonaws.com/bhead-transcoded/" + this.state.video_thumbnail + '.png'} alt={this.state.video_url} />
          </a>
        </div>
        <div>
          Duration: {this.state.video_duration}
        </div>
		<div>
		  <Vote />
		</div>
      </div>
    )
  }
}
