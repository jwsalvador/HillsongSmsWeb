import React, {Component} from 'react';
import LinkIcon from '../common/LinkIcon';
import {Grid, Icon, Dropdown, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {selectCampus} from '../../actions/configActions';
import {fetchMessagesByCode} from '../../actions/messagesActions';
import {CAMPUS_OPTIONS} from '../../helpers/constants';

let initialValue = '';

class HomePage extends Component {
  constructor(props) {
    super(props);

    initialValue = this.props.campus || CAMPUS_OPTIONS[3].value
    this.props.fetchMessagesByCode(initialValue);

    this.state = {value: initialValue};

    this.onCampusChange = this.onCampusChange.bind(this);
  }

  onCampusChange(event, {value}) {
    this.setState({value});
    this.props.selectCampus(value);

    this.props.fetchMessagesByCode(value);
  }

  render() {
    return (
      <div className="home">
        <Grid stackable padded textAlign='center' columns='equal'>
          <Grid.Row>
            <Header as="h1" className="header__margin-bottom">Hillsong SMS</Header>
          </Grid.Row>
          <Grid.Row>
            <Dropdown fluid placeholder="Select your campus" value={this.state.value} selection options={CAMPUS_OPTIONS} onChange={this.onCampusChange}/>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <LinkIcon route="/" name="browser" header="Dashboard">
                View SMS stats
              </LinkIcon>
            </Grid.Column>
            <Grid.Column only="tablet mobile">
              <LinkIcon route="inbox/list" name="comments" header="Inbox">
                View received and sent messages to users
              </LinkIcon>
            </Grid.Column>
            <Grid.Column only="computer">
              <LinkIcon route="inbox" name="comments" header="Inbox">
                View received and sent messages to users
              </LinkIcon>
            </Grid.Column>
            <Grid.Column only="tablet mobile">
              <LinkIcon route="messages/list" name="mail outline" header="Messages">
                Manage message response settings
              </LinkIcon>
            </Grid.Column>
            <Grid.Column only="computer">
              <LinkIcon route="messages" name="mail outline" header="Messages">
                Manage message response settings
              </LinkIcon>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    campus: state.config.campus
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({fetchMessagesByCode, selectCampus}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);