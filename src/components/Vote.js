import React, { Component } from 'react';
import config from '../config.js';

class Vote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      yes_disabled: false,
      no_disabled: false,
    };
  }

  async componentDidMount() {
    // get vote from API, update state
    // const currentUser = this.getCurrentUser();
  }

  handleVote = (vote) => {
    fetch( config.dynamodb.URL + this.props.video_id + '/vote', {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({vote: vote, user_id: "74"})
      }).then(function(response) {
        return response.json();
      }).catch(function(ex) {
        console.log('FAIL FAIL FAIL', ex)
      })

    // Change class of button. Model on state change of login submit button

  }

  render() {
    return (
      <div>
    	  <div className="voteButtonWrapper">
          <button className='btn btn-success' disabled={this.state.yes_disabled} onClick={this.handleVote.bind(this, 'yes')} >
            Looks fine to me.
          </button>
      		&nbsp;
      	  <button className='btn btn-danger' disabled={this.state.no_disabled} onClick={this.handleVote.bind(this, 'no')}>
      		  Are you kidding!?
    	    </button>
    	  </div>
      </div>
    );
  }
}

export default Vote;
