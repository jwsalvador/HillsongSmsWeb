import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {List, Button} from 'semantic-ui-react';
import {Link} from 'react-router';

import {fetchMessages, selectMessage} from '../../actions/messagesActions';

class MessagesList extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentWillMount() {

    const {selected} = this.props;
    
    this.state = {selected: selected ? selected._id : ''};

    this.onSelectItem = this.onSelectItem.bind(this);
    this.onAddNewMessage = this.onAddNewMessage.bind(this);
  }

  onSelectItem(message) {
    this.setState({selected: message._id});

    this.props.selectMessage(message);

    this.context.router.push('/messages/detail');
  }

  onAddNewMessage() {
    this.setState({selected: ''});
    this.props.selectMessage(null);
    this.context.router.push('/messages/form');
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
        <List selection className="list__scroll">
          {this.renderMessages()}
        </List>
        <Button fluid color="blue" onClick={this.onAddNewMessage}>Add new message</Button>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages.all,
    selected: state.messages.selected
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({fetchMessages, selectMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);