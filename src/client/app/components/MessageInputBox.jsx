import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';

export default class MessageInputBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			socket: ''
		}

		this.updateText = this.updateText.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	componentDidMount() {
		let socket = io('http://localhost:8080/');
		socket.on('connect', function() {
		console.log('Socket Id: ', socket.id);
		})
		socket.on('new-message', function(data) {
			console.log('fdsfds', data);
		})
		this.setState({
			socket: socket
		});
	}

  clearInput() {
    this.setState({
      text: ''
    })
  }

	sendMessage() {
		let message = {
			event_id: this.props.eventId || 2,
			user_id: this.props.userId || 2,
			text: this.state.text,
			created: new Date().toISOString()
		}

		let socket = this.state.socket;
		socket.emit('send-message', message);
    this.props.renderNewMessage(message);
    this.clearInput();
		// $.ajax({
		// 	url: '/messages',
		// 	method: 'POST',
		// 	data: message,
		// 	success: function(results) {
		// 		console.log(results);
		// 	},
		// 	error: function(err) {
		// 		console.log('Error: ', err);
		// 	}
		// });
	}

	updateText(event) {
		this.setState({
			text: event.target.value
		});
	}

	render() {
		return (
			<div className="ui action input">
				<input type="text" placeholder="Message"
					value={ this.state.text }
					onChange={ this.updateText } />
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
