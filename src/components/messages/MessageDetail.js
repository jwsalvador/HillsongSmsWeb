import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Header} from 'semantic-ui-react';

class MessageDetail extends Component {
  render() {

    const {message} = this.props;

    if (!message) {
      return <div>Please select a message to view...</div>;
    }
    return (
      <div>
        <Header as="h1">{message.key}</Header>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.messages.selected
  }
}

export default connect(mapStateToProps)(MessageDetail);