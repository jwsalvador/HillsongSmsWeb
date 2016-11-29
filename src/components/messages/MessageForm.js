import _ from 'lodash';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Header, Form, Checkbox} from 'semantic-ui-react';
import toastr from 'toastr';

import {saveMessage} from '../../actions/messagesActions';
import {CAMPUS_OPTIONS} from '../../helpers/constants';
import {InputArea, Input} from './Form';
import HSButton from '../common/HSButton';

class MessageForm extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeValueStateHandler = this.changeValueStateHandler.bind(this);
    this.changeDefaultStateHandler = this.changeDefaultStateHandler.bind(this);
    this.handleChildMessagesChange = this.handleChildMessagesChange.bind(this);
    this.changeKeyStateHandler = this.changeKeyStateHandler.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
  }

  componentWillMount(){
    this.initStates(this.props.messages);
  }

  componentWillReceiveProps(nextProps) {
    this.initStates(nextProps.messages);
  }

  changeValueStateHandler(event, {value}) {
    this.setState({value});
  }

  changeDefaultStateHandler(event, {value}) {
    this.setState({defVal: value});
  }

  changeKeyStateHandler(event) {
    this.setState({key: event.target.value});
  }

  initStates({selected, all}) {
    this.state = {
      _id: selected ? selected._id : null,
      key: selected ? selected.key : '',
      value: selected ? selected.value : '',
      defVal: selected ? selected.default : '',
      childMessages: selected ? _.clone(selected.child_messages) : [],
      campusCodes: selected ? _.clone(selected.campus_codes) : []
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const {selected} = this.props.messages;
    let newObj = Object.assign({}, this.state);
    
    if (selected) {
      newObj = { _id: selected._id };
      for (const key in this.state) {
        switch (key) {
          case 'defVal':
            if (this.state[key] !== selected.default) newObj['default'] = this.state[key];
            break;
          case 'campusCodes':
            if (!_.isEqual(this.state[key].sort(), selected.campus_codes.sort())) newObj['campus_codes'] = this.state[key];
            break;
          case 'childMessages':
            if (!_.isEqual(this.state[key].sort(), selected.child_messages.sort())) newObj['child_messages'] = this.state[key];
            break;
          default:
            if (this.state[key] !== selected[key]) newObj[key] = this.state[key];
        }
      }
    }
    this.props.saveMessage(newObj);

    toastr.success('Saved message!');

    this.context.router.push('/messages/detail');
  }

  handleChildMessagesChange(event, {value, checked}) {
    // const obj = Object.assign({}, this.state.checkbox, { [value]: checked });
    // this.setState({checkbox: obj});
    var codes = checked ? 
              _.concat(this.state.childMessages, value) : 
              _.remove(this.state.childMessages, (id) => { return id !== value});

    this.setState({childMessages: codes});
  }

  handleCampusChange(event, {checked, value}) {
    const {selected} = this.props.messages;
    var codes = checked ? 
                  _.concat(this.state.campusCodes, value) : 
                  _.remove(this.state.campusCodes, (code) => { return code !== value});

    this.setState({campusCodes: codes});
  }

  renderCampusCheckbox() {
    const all = CAMPUS_OPTIONS;
    return all.map(m => {
      
      const isChecked = _.indexOf(this.state.campusCodes, m.value) > -1;
      return (
        <Form.Checkbox className="padded"
            onChange={this.handleCampusChange} 
            checked={isChecked} 
            key={m.value} 
            label={m.text} 
            name='campus' 
            value={m.value} />
      );
    });
  }

  renderChildMessagesCheckbox() {
    const {all} = this.props.messages;
    
    return all.map(m => {
      const isChecked = _.indexOf(this.state.childMessages, m._id) > -1;;
      return (
        <Form.Checkbox className="padded"
            onChange={this.handleChildMessagesChange} 
            checked={isChecked} 
            key={m._id} 
            label={m.key.toUpperCase()} 
            name='expected' 
            value={m._id} />
      );
    });
  }

  renderHeader() {
    const {selected} = this.props.messages;
    const {key, value, defVal} = this.state;

    return (
        <div>
          <Header as="h1">
            {selected && key.toUpperCase()}
            <HSButton type='button' warning handler={() => this.context.router.push('/messages')} label="Cancel"/>
            <HSButton type='submit' basic label="Save"/>

          </Header>
          {!selected && <Input name="key" value={key} handler={this.changeKeyStateHandler} label="Key" holder="Enter new key"/>}
        </div>
        
        
      );
  }


  render() {
    const {key, value, defVal} = this.state;
    
    return (
      <Form onSubmit={this.onSubmit}>
        {this.renderHeader()}
        <InputArea field='value' value={value} handler={this.changeValueStateHandler}/>
        <InputArea field='default' value={defVal} handler={this.changeDefaultStateHandler}/>

        <Form.Field className="padded">
          <label>Expected responses</label>
          <Form.Group inline>
            {this.renderChildMessagesCheckbox()}
          </Form.Group>
        </Form.Field>

        <Form.Field className="padded">
          <label>Used by campus:</label>
          <Form.Group inline>
            {this.renderCampusCheckbox()}
          </Form.Group>
        </Form.Field>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    config: state.config
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({saveMessage} , dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);