import React, {Component} from 'react';
import LinkIcon from '../common/LinkIcon';
import {Grid, Icon, Dropdown, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchMessagesByCode} from '../../actions/messagesActions';
import {CAMPUS_OPTIONS} from '../../helpers/constants';

const INITIAL_VALUE = CAMPUS_OPTIONS[3].value;

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.props.fetchMessagesByCode(INITIAL_VALUE);

    this.state = {value: INITIAL_VALUE};

    this.onCampusChange = this.onCampusChange.bind(this);
  }

  onCampusChange(event, {value}) {
    this.setState({value});

    this.props.fetchMessagesByCode(value);
  }

  render() {
    return (
      <div className="home">
        <Grid stackable padded textAlign='center' columns='equal'>
          <Grid.Row>
            <Header as="h1">Welcome to Hillsong SMS app</Header>
          </Grid.Row>
          <Grid.Row>
            <Dropdown fluid placeholder="Select your campus" value={this.state.value} selection options={CAMPUS_OPTIONS} onChange={this.onCampusChange}/>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <LinkIcon route="/" name="browser" header="Dashboard"/>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({fetchMessagesByCode}, dispatch);
}

export default connect(null, mapDispatchToProps)(HomePage);