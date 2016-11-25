import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {List} from 'semantic-ui-react';

import {fetchMessages, selectMessage} from '../../actions/messagesActions';

class MessagesList extends Component {
  componentWillMount() {
    this.state = {selected: ''}

    this.onSelectItem = this.onSelectItem.bind(this);

    console.log(this.props.messages);
  }

  onSelectItem(message) {
    this.setState({selected: message._id});

    this.props.selectMessage(message);
  }

  renderMessages() {
    return this.props.messages.map(message => {
      const isSelected = message._id === this.state.selected ? 'item__active' : '';
      return (
        <List.Item key={message._id} className={`padded ${isSelected}`} onClick={() => this.onSelectItem(message)}>
          <List.Content>
            <List.Header>{message.key.toUpperCase()}</List.Header>
            <List.Description>{message.value.substring(0, 45).concat('...')}</List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    if (!this.props.messages) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <List selection>
          {this.renderMessages()}
        </List>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages.all
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({fetchMessages, selectMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);