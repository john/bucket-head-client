import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter, Link } from 'react-router-dom';
import Routes from './Routes'
import RouteNavItem from './components/RouteNavItem';

import { Nav, Navbar } from 'react-bootstrap';
import './App.css';

import Login from './Login';
import Home from './containers/Home';

class App extends Component {

  handleNavLink = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }
  
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">BucketHead</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <RouteNavItem onClick={this.handleNavLink} href="/signup">Signup</RouteNavItem>
              <RouteNavItem onClick={this.handleNavLink} href="/login">Login</RouteNavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes />

      </div>
    );
  }
}

export default withRouter(App);