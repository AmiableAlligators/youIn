import React from 'react';

const Event = (props) => (
  <a className={props.currentEvent.event_id === props.event.event_id ? 'item active' : 'item'}
  	onClick={ () => props.handleSidebarEventClick(props.event) }>
    <span style={{marginRight: '10px'}}>{ props.event.title }</span>
    { 
      props.event.unread_messages && 
      props.event.unread_messages.length > 0 &&
      props.currentEvent.event_id !== props.event.event_id 
      	? <span className="ui red circular label">{props.event.unread_messages.length}</span> : ''
    }

  </a>
);

export default Event;
