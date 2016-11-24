import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchMessages} from '../../actions/messagesActions';

class MessagesList extends Component {
  componentWillMount() {
    this.props.fetchMessages();
  }

  render() {
    return (
      <div>
        This is list of messages
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({fetchMessages}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);