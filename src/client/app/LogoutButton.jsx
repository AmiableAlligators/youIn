import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class LogoutButton extends React.Component {
  constructor(props) {
    super(props)
  }

  logout() {
    FB.logout((response) => {
      console.log(response);
    });
   
  }
  render() {
    return (
      <Link className='ui button' to='/' onClick={this.logout.bind(this)} id='logout'>Logout</Link>
    )
  }
}

export default LogoutButton; 