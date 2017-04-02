import React from 'react';
import Avatar from './Avatar.jsx';

const AttendingList = props => {
  let checkOwnership = () => props.currentUser !== props.event.owner;

  return (
    <div style={{backgroundColor: 'white', paddingBottom: '15px'}}>
      <strong>Attending: </strong>
      <div className="ui relaxed mini horizontal list">
        { 
          props.currentAttendees &&
          props.currentAttendees.map( ( friend, index ) => (
            <Avatar
              key={ index }
              user={ friend }
            />
          ))
        }
      </div>
      { checkOwnership() &&
        <div>
          {
            props.event.isAttending &&
            <div>
              <button className={ props.buttonDecline } 
                onClick={ props.handleDeclineEvent }>
                Decline
              </button>
              <button className={ props.buttonAccept }>Going</button>
            </div>
          }
          {
            !props.event.isAttending &&
            <div>
              <button className={ props.buttonDecline } 
                onClick={ props.handleDeclineEvent }>
                { props.event.isAttending === '' ? 'Decline' : 'Not Going' }
              </button>
              <button className={ props.buttonAccept } 
                onClick={ props.handleAcceptEvent }>
                Accept
              </button>
            </div>
          }
        </div>
      }
    </div>
  );
};

export default AttendingList;
