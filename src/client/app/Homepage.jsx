import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import OwnerEventList from './OwnerEventList.jsx';
import FriendEventList from './FriendEventList.jsx';
import CreateEventButton from './CreateEventButton.jsx';
import LogoutButton from './LogoutButton.jsx';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null
    };
  }

  pollEvents() {
    this.props.getEvents(this.props.history, function(result) {

      if (result.ownerEvents.length !== this.state.ownerEvents.length) {
        this.setState({
          ownerEvents: result.ownerEvents
        });
      }
      if (result.friendEvents.length !== this.state.friendEvents.length) {
        this.setState({
          friendEvents: result.friendEvents
        });
      }
    });
  }

  componentDidMount() {
    // this.setState({
    //   intervalId: setInterval(this.pollEvents.bind(this), 1000)
    // });
  }

  componentWillUnmount() {
    // clearInterval(this.state.intervalId);
    // this.setState({
    //   intervalId: null
    // });
  }

  render() {

    return (
      <div>
        <div className="container">
          <div className="page-header">
            <div className="ui horizontal list">
              <div className="item">
                <div className="content">
                  <div className="header">
                    <h2 id='userName'>Hello <span id="headerName">{this.props.userName}</span></h2>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="content">
                  <div className="header">
                    <Link to="/chat"><button className="ui primary button">Enter Event Chat</button></Link>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="content">
                  <div className="header">
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className='container events'>
            <br></br><br></br>
            <h2>My Events</h2>
            <OwnerEventList
              ownerEventsArr={this.props.ownerEvents}
              accessToken={this.props.accessToken}
              getEvents={this.props.getEvents}
              history={this.props.history}/>
          </div>
          <div className='container events'>
            <h2>Friend Events</h2>
            <FriendEventList accessToken={this.props.accessToken}
            friendEventsArr={this.props.friendEvents}
            getEvents={this.props.getEvents}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Homepage;
