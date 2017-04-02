import React from 'react';
import Event from './Event.jsx';

const MyEvents = (props) => (
  <div>
    <div className="ui medium header" style={{padding: '5px 20px'}}>
      My Events
    </div>
    {
      props.myEvents.length === 0 &&
      <p style={{padding: '5px 20px'}}>You currently have no events.</p>
    }
    <div className="ui link list">
    { 
        props.myEvents &&
        props.myEvents.map( ( event, index ) => (
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

export default MyEvents;
