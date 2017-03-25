import React from 'react';
import {render} from 'react-dom';

class FriendsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    }
  }
  
  handleClick(friendId) {
    this.setState({
      isSelected: !this.state.isSelected
    })
    this.props.inviteFriend();
  }

  render() {
    return (
      <h5 
        className={this.state.isSelected ? "selected" : null}
        onClick={this.handleClick.bind(this)}>

        {this.props.friend.firstname}</h5>
    )
  }
}

export default FriendsListItem;
