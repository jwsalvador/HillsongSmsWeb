import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';

import {PageHeader} from '../common/HSHeader';
import InboxList from './InboxList';

class InboxPage extends Component {
  render() {
    return (
      <div>
        <PageHeader text="Inbox"/>
        <Grid columns="equal" className="inbox-container">
          <Grid.Column only="computer" width={5}>
            <InboxList />
          </Grid.Column>
          <Grid.Column verticalAlign='bottom'>
            {this.props.children}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default InboxPage;