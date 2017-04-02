import React from 'react';
import MyEvents from './MyEvents.jsx';
import FriendEvents from './FriendEvents.jsx';

const Sidebar = (props) => (
  <div style={{width: '220px', height: '100%', borderRight: '1px solid #ccc'}}>
	  <h2 className="ui header logo">
		  <i className="settings icon"></i>
		  <div className="content">
		  	You In?
		  </div>
		</h2>
		<div className="ui divider"></div>
    <MyEvents myEvents={ props.myEvents }
      handleSidebarEventClick={ props.handleSidebarEventClick }
      currentEvent={ props.currentEvent} />
    <div className="ui divider"></div>
    <FriendEvents friendEvents={ props.friendEvents }
    	handleSidebarEventClick={ props.handleSidebarEventClick }
    	currentEvent={ props.currentEvent } />
  </div>
);

export default Sidebar; 

