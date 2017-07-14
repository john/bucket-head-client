import React, { Component } from 'react';

import { CognitoUserPool, } from 'amazon-cognito-identity-js';
import config from '../config.js';

class Vote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      yes_disabled: false,
      no_disabled: false,
    };
    this.handleVote = this.handleVote.bind(this);
  }

  async componentDidMount() {
    // get vote from API, update state
    // const currentUser = this.getCurrentUser();
  }

  handleVote = (vote) => {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    var cognitoUser = userPool.getCurrentUser();
    
    fetch( config.dynamodb.URL + this.props.video_id + '/vote', {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({vote: vote, user_id: cognitoUser.username })
      }).then(function(response) {
        return response.json();
      }).catch(function(ex) {
        console.log('FAIL FAIL FAIL', ex)
      })
      this.toggle(vote);
  }
  
  toggle(vote) {
    if(vote == 'yes') {
      this.setState({yes_disabled: true});
      this.setState({no_disabled: false});
    } else {
      this.setState({yes_disabled: false});
      this.setState({no_disabled: true});
    }
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
