import React from 'react';
import {BrowserRouter, history, Link} from 'react-router-dom';
import { ajaxSetup } from 'jquery';

class Facebook extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : process.env.CLIENT_ID, //testing
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,
        version    : 'v2.1'
      });
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);
  }

  testAPI() {
    var check = this;
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      check.props.setName(response.name);
      console.log('Successful login for: ' + response.name);
    });
  }

// This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    /* The response object is returned with a status field that lets the
     app know the current login status of the person. */
    if (response.status === 'connected') {
    // Logged into your app and Facebook.
      this.testAPI();

      ajaxSetup({
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + response.authResponse.accessToken);
        }
      })
      this.props.setToken(response.authResponse.accessToken);
      this.props.setCurrentUser(response.authResponse.userID);
      this.props.getFriends(response.authResponse.userID);
      this.props.getEvents(this.props.history, function(result) {
        console.log('results of fetching events', result);
        if (result.friendEvents.length > 0) {
          var friendEventsWithAttending = result.friendEvents.map(event => {
            var isAttending = event.attendees.filter(attend => (
              response.authResponse.userID === attend.user_id
            ))
            if (isAttending.length > 0) {
              event.isAttending = true;
              return event;
            } else {
              event.isAttending = '';
              return event;
            }
          })
        }
        this.setState({
          ownerEvents: result.ownerEvents,
          friendEvents: result.friendEvents
        });
      });
      this.props.history.push('/homepage');

    } else if (response.status === 'not_authorized') {
      this.props.history.push('/');
    } else {
      this.props.history.push('/');
    }
  }

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleClick() {
    FB.login(this.statusChangeCallback.bind(this), {scope: 'public_profile, email'});
  }
  render() {
    return (
      <div className="ui middle aligned center aligned grid" style={{height: '100%'}}>
        <div className="column" style={{width: '450px'}}>
          <h2 className="ui teal image header">
            <div className="content">
              <h1>You In?</h1>
            </div>
          </h2>
          <form className="ui large form">
            <div className="ui">
              <div className="ui fluid">
                <a className="fb-login-button" data-max-rows="1" data-size="large"
                data-show-faces="false" data-auto-logout-link="false" 
                onClick={this.handleClick.bind(this)}>Login</a>
              </div>
            </div>

            <div className="ui error message"></div>

          </form>
        </div>
      </div>
    )
  }
}

export default Facebook;
