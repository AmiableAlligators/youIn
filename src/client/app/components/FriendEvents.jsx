import React from 'react';
import Event from './Event.jsx';

const FriendEvents = (props) => (
  <div>
      <div className="ui medium header" style={{padding: '5px 20px'}}>
        Friend Events
      </div>
      {
        !props.friendsEvents || props.friendsEventslength === 0 &&
        <p style={{padding: '5px 20px'}}>You currently have no events from friends.</p>
      }
      <div className="ui link list">  
      {
        props.friendEvents &&
        props.friendEvents.map( ( event, index ) => (
          <Event
            currentEvent={ props.currentEvent }
            key={ index }
            event={ event }
            handleSidebarEventClick={ props.handleSidebarEventClick } />
        ))
      }
      </div>
  </div>
);

export default FriendEvents;
