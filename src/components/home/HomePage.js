import React, {Component} from 'react';
import LinkIcon from '../common/LinkIcon';
import {Grid, Icon, Dropdown, Header} from 'semantic-ui-react';

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Grid stackable padded textAlign='center' columns='equal'>
          <Grid.Row>
            <Header as="h1">Welcome to Hillsong SMS app</Header>
          </Grid.Row>
          <Grid.Row>
            <Dropdown fluid placeholder="Select your campus" selection options={[{text: 'pinas', value:'ph'}]}/>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <LinkIcon route="dashboard" name="browser" header="Dashboard"/>
            </Grid.Column>
            <Grid.Column>
              <LinkIcon route="inbox" name="comments" header="Inbox"/>
            </Grid.Column>
            <Grid.Column>
              <LinkIcon route="messages" name="mail outline" header="Messages"/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default HomePage;