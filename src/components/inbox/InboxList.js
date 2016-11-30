import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {List, Header, Image} from 'semantic-ui-react';

import {fetchInbox, selectInbox} from '../../actions/inboxActions';
import {getMessageByProp} from '../../helpers/messageHelper';
import HSList from '../common/HSList';

class InboxList extends Component {
  constructor(props) {
    super(props);

    this.state = {selected: ''};
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  getMessageFromProps(id) {
    if (!this.props.messages) {
      return;
    }
    const m = this.props.messages.filter((m) => {
      return m._id === id;
    })[0];
    
    return m.value;
  }

  componentWillMount() {
    this.props.fetchInbox(this.props.campus);
  }

  onSelectItem(key, message) {
    this.setState({selected: key});

    this.props.selectInbox(message);

    this.context.router.push('/inbox/room');
  }

  render() {
    console.log(this.props.inbox)
    return (
      <List selection className="list__scroll">
        {
          this.props.inbox.map((message) => {
            const key = _.keys(message)[0];
            const isSelected = this.state.selected === key ? 'item__active' : '';
            const val = message[key][0];
            
            const text = getMessageByProp(val, this.props.messages);
            return (
              <List.Item key={key} className={`padded ${isSelected}`} onClick={() => this.onSelectItem(key, message)}>
                <Image avatar src='http://semantic-ui.com/images/avatar/small/christian.jpg' />
                <List.Content>
                  <List.Header>{key}</List.Header>
                  <List.Description className="cursive">{text.length > 30 ? text.substring(0, 30).concat('...') : text}</List.Description>
                </List.Content>
              </List.Item>
            )
          })
        }
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inbox: state.inbox.all,
    messages: state.messages.all,
    campus: state.config.campus
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchInbox, selectInbox}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxList);