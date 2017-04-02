import React from 'react';

const NewFriendEntry = props => (
  <div>
    { props.friend.firstname } ({ props.friend.email })
  </div>
);

export default NewFriendEntry;
