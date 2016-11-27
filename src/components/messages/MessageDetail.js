import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { Header, Divider, Button } from 'semantic-ui-react';

import Section from './Section';

class MessageDetail extends Component {
  renderValue(prop) {
    if (this.props.message.default) {
      return (
        <Section divider header="Fallback message:" text={this.props.message.default}/>
      );
    }
  }

  renderChildren() {
    if (this.props.message.child_messages.length) {
      return (
        <Section divider header="Expected responses:">
          {this.renderExpected()}
        </Section>
      );
    }
  }

  renderExpected() {
    return this.props.message.child_messages.map((val) => {
      const child = _.filter(this.props.messages, (m) => {
        return m._id == val;
      });
      
      return (
        <div key={child[0]._id}>
          { child[0].key.toUpperCase() }
        </div>
      );
    });
  }

  render() {
    if (!this.props.message) {
      return <div>No message selected...</div>
    }

    return (
      <div>
        <Header as="h1">
          {this.props.message.key.toUpperCase()}
          <Button basic color="red" className="right">Delete</Button>
          <Link to="messages/form"><Button basic color="blue" className="right">Edit</Button></Link>
        </Header>
        <Section header="Message response:" text={this.props.message.value}/>
        {this.renderValue()}
        {this.renderChildren()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.messages.selected,
    messages: state.messages.all
  }
}

export default connect(mapStateToProps)(MessageDetail);