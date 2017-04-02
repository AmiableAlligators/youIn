import React from 'react';
import ReactDOM from 'react-dom';
import MessageListEntry from './MessageListEntry.jsx';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const messageList = this.messageList;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    return (
      <div className="ui items" 
        style={{position: 'fixed', bottom: '40px',  height: '400px', overflowX: 'hidden', overflowY: 'scroll', width: '100%', zIndex: '-99'}}
        ref={input => { this.messageList = input}}>
        {
          this.props.messages.length === 0 &&
          <div className="ui raised segment" style={{position: 'absolute', bottom: '0'}}>
            <p>This event currently has no messages.</p>
          </div>
        }
        {
          this.props.messages.length > 0 &&
          this.props.messages.map( ( message, index ) => (
            <MessageListEntry
              key={ index }
              message={ message }
            />
          ))
        }
      </div>
    );
  }
}