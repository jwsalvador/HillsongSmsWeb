import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Segment, List, Header, Button, Grid} from 'semantic-ui-react';

import {getMessageByProp} from '../../helpers/messageHelper';

class InboxRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {key: ''};
  }

  componentDidUpdate() {
    const elem = document.querySelector('.inbox-list');

    if (elem) elem.scrollTop = 600;
  }

  renderInboxRoom() {
    const {selected} = this.props;
    const number = Object.keys(selected)[0];
    return _.uniqBy(selected[number], (e) => {return e._id }).map(obj => {
      const text = getMessageByProp(obj, this.props.messages);
      return (
        <List.Item key={obj._id}>
          <Header as="h6" className="item__header-top">{obj.from || 'System'}</Header>
          <Segment inverted color='grey' size='tiny'>{text}</Segment>
        </List.Item>
      );
    });
  }

  render() {
    if (!this.props.selected) return <div></div>;

    return (
      <Grid>
        <Grid.Row className="phone tab">
          <Header as="h2">
            {Object.keys(this.props.selected)[0]}
            <Link style={{width: '100%'}} to="/inbox/list"><Button basic color="red" className="right">Back</Button></Link>
          </Header>
          
        </Grid.Row>
        
        <Grid.Row className="inbox-list">
          <List>
            { this.renderInboxRoom() }
          </List>
        </Grid.Row>
      </Grid>
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