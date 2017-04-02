import React from 'react';
import DeleteButton from './DeleteButton.jsx';
import AttendingList from './AttendingList.jsx';
import Chatbox from './Chatbox.jsx';

export default class ShortInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui vertical segment" style={{paddingTop: '0'}}>
        <div className="ui horizontal divider">Event Chat</div>
        {
          this.props.event.owner === this.props.currentUser && 
          <DeleteButton
            event={ this.props.event }
            accessToken={ this.props.accessToken }
            deleteEvent={ this.props.deleteEvent }
          />
        }
        <h1 className="ui header" style={{marginTop: '0'}}>
          { this.props.event.title }
          <div className="sub header">Where: <strong>{ this.props.event.location }</strong> When: <strong>{ this.props.event.time }</strong> |
            <i className="info icon"></i> { this.props.event.description }</div>
        </h1>
        <AttendingList
          currentUser={ this.props.currentUser }
          event={ this.props.event }
          currentAttendees={ this.props.currentAttendees }
          friends={ this.props.friends }
          isGoing={ this.props.isGoing }
          handleDeclineEvent={ this.props.handleDeclineEvent }
          handleAcceptEvent={ this.props.handleAcceptEvent }
          buttonAccept={ this.props.buttonAccept }
          buttonDecline={ this.props.buttonDecline }
        />
        <Chatbox
          userName={ this.props.userName }
          currentUser={ this.props.currentUser }
          messages={ this.props.messages }
          renderNewMessage={ this.props.renderNewMessage }
          currentEvent={ this.props.event }
          socket={ this.props.socket }
        />
      </div>
    );
  }
};
