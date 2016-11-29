import React, {Component} from 'react';
import {Header, Grid, Icon} from 'semantic-ui-react';
import {Link} from 'react-router';
import MessagesList from './MessagesList';

class MessagesPage extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Header as="h1" className="header__margin-bottom">
          <Link to="/"><Icon name="arrow left"/></Link>
          Messages
        </Header>
        <Grid columns="equal">
          <Grid.Column only="computer" width={5}>
            <MessagesList />
          </Grid.Column>
          <Grid.Column>
            {this.props.children}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default MessagesPage;