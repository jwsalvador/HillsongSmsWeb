import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Segment, List, Header} from 'semantic-ui-react';

import {getMessageByProp} from '../../helpers/messageHelper';

class InboxRoom extends Component {
  componentDidUpdate() {
    const elem = document.querySelector('.inbox-list');

    if (elem) elem.scrollTop = 600;
  }
  
  renderInboxRoom() {
    const {selected} = this.props;
    const number = Object.keys(selected)[0];

    return selected[number].map(obj => {
      const text = getMessageByProp(obj, this.props.messages);
      return (
        <List.Item>
          <Header as="h6" className="item__header-top">{obj.from || 'System'}</Header>
          <Segment inverted color='grey' size='tiny'>{text}</Segment>
        </List.Item>
      );
    });
  }

  render() {
    if (!this.props.selected) return <div></div>;
    return (
      <div ref="scroll" className="inbox-list">
        <List>
          { this.renderInboxRoom() }
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selected: state.inbox.selected,
    messages: state.messages.all
  }
}
export default connect(mapStateToProps)(InboxRoom);