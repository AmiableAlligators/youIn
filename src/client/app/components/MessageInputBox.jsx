import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import Moment from 'moment';

export default class MessageInputBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		}

		this.updateText = this.updateText.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
	}

  clearInput() {
    this.setState({
      text: ''
    })
  }

  handleKeypress(e) {
  	if (e.nativeEvent.keyCode === 13) {
  		this.sendMessage();
  	}
  }

  // Send message in UTC time
	sendMessage() {
		let message = {
			event_id: this.props.currentEvent.event_id,
			user_id: this.props.currentUser,
      user_name: this.props.userName,
			text: this.state.text,
			created: Moment().format()
		}
		this.props.socket.emit('send-message', message);
    this.props.renderNewMessage(message);
    this.clearInput();
	}

	updateText(event) {
		this.setState({
			text: event.target.value
		});
	}

	render() {
		return (
			<div className="ui action input youin__message-box">
				<input type="text" placeholder="Message"
					value={ this.state.text }
					onChange={ this.updateText }
					onKeyPress={ this.handleKeypress } />
				<button className="ui button"
					onClick={ this.sendMessage }>Send</button>
			</div>
		)
	}
}

MessageInputBox.propTypes = {
	eventId: React.PropTypes.number,
	userId: React.PropTypes.number
}
