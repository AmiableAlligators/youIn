import React from 'react';
import OwnerDetailedView from './OwnerDetailedView.jsx';

class OwnerEventListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    //bind methods here
    this.handleClickListItem = this.handleClickListItem.bind(this);
  }
  //Insert Methods Here
  handleClickListItem() {
    this.setState({clicked: !this.state.clicked});
  }

  render() {

    return (
      <div>
      <div className="panel list-item " onClick={this.handleClickListItem}>
        <span className="glyphicon glyphicon-globe col-md-1"></span>
        <span className="col-md-4">{this.props.event.title}</span>
        <span className="col-md-4">{this.props.event.date} at {this.props.event.time}</span>
        <span className="col-md-3">{this.props.event.attendees}<span> people IN</span></span>
        <br/>
      </div>
        {this.state.clicked ? <OwnerDetailedView event={this.props.event}/> : '' }
      </div>
    );
  }
}

export default OwnerEventListItem;

