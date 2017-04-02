import React from 'react';
import ShortInfo from './ShortInfo.jsx';
import AttendingList from './AttendingList.jsx';
import MessageInputBox from './MessageInputBox.jsx';
import CreateEventButton from '../CreateEventButton.jsx';

const EventShow = (props) => (
  <div className='event-show'>
    <CreateEventButton
      currentUser={ props.currentUser }
      addNewTolist={ props.addNewTolist }
      friends={ props.friends }
      getEvents={ props.getEvents }
      history={ props.history }
    />
    {
      !props.event &&
      <div className="ui raised padded segment">
        <h1 className="ui header">Welcome to You In!</h1>
        <p>You currently have no events. Get started by creating your first event and inviting your friends!</p>
        <p>After creating your first event, you will be able to chat with everyone you've invited.</p>
      </div>
    }
    {
      props.event &&
      <ShortInfo
        currentUser={ props.currentUser }
        event={ props.event }
        accessToken={ props.accessToken }
        currentAttendees={ props.currentAttendees }
        friends={ props.friends }
        isGoing={ props.isGoing }
        handleDeclineEvent={ props.handleDeclineEvent }
        handleAcceptEvent={ props.handleAcceptEvent }
        buttonAccept={ props.buttonAccept }
        buttonDecline={ props.buttonDecline }
        deleteEvent = { props.deleteEvent }
        userName={ props.userName }
        messages={ props.messages }
        renderNewMessage={ props.renderNewMessage }
        socket={ props.socket }
      /> 
    }
  </div>
);

export default EventShow;
