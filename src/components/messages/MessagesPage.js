import React, {Component} from 'react';
import {Header, Grid, Icon} from 'semantic-ui-react';
import {Link} from 'react-router';
import MessagesList from './MessagesList';

class MessagesPage extends Component {
  render() {
    return (
      <div>
        <Header as="h2">
          <Link to="/"><Icon name="arrow left"/></Link>
          Messages
        </Header>
        <Grid columns="equal">
          <Grid.Column mobile={16} tablet={5} computer={5}>
            <MessagesList />
          </Grid.Column>
          <Grid.Column only='computer'>
            {this.props.children}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default MessagesPage;