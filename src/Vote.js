import React, { Component } from 'react';

class Vote extends Component {

  render() {
    return (
	  <div>
        <button className='btn'>
          Looks fine to me.
        </button>
		&nbsp;
	    <button className='btn'>
		  Are you kidding!?
	    </button>
	  </div>
    );
  }
}

export default Vote;
