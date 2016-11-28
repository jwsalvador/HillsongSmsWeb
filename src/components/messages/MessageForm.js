import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Header, Button, Form, Checkbox} from 'semantic-ui-react';

import {saveMessage} from '../../actions/messagesActions';
import {CAMPUS_OPTIONS} from '../../helpers/constants';
import {InputArea, Input} from './Form';

class MessageForm extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeValueStateHandler = this.changeValueStateHandler.bind(this);
    this.changeDefaultStateHandler = this.changeDefaultStateHandler.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.changeKeyStateHandler = this.changeKeyStateHandler.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
  }

  componentWillMount(){
    this.initStates(this.props.messages);
  }

  componentWillReceiveProps(nextProps) {
    this.initStates(nextProps.messages);
  }

  onSubmit(event) {
    event.preventDefault();
    const {selected} = this.props.messages;
    let newObj = Object.assign({}, this.state);
    
    if (selected) {
      
    }


    this.props.saveMessage(newObj);
  }

  initStates({selected, all}) {
    
    const checkStates = {};
    if (selected) {
      _.forEach(all, (m => {
        const isChecked = _.indexOf(selected.child_messages, m._id) !== -1;
        checkStates[m._id] = isChecked;
      }));
    }
    
    this.state = {
      _id: selected ? selected._id : null,
      key: selected ? selected.key : '',
      value: selected ? selected.value : '',
      defVal: selected ? selected.default : '',
      checkbox: checkStates,
      campusCodes: selected ? selected.campus_codes : []
    }
  }

  handleCheckboxChange(event, {value, checked}) {
    const obj = Object.assign({}, this.state.checkbox, { [value]: checked });
    this.setState({checkbox: obj});
  }


  handleCampusChange(event, {checked, value}) {
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
        <Form.Checkbox 
            onChange={this.handleCampusChange} 
            checked={isChecked} 
            key={m.value} 
            label={m.text} 
            name='campus' 
            value={m.value} />
      );
    });
  }

  renderResponseCheckbox() {
    const {all} = this.props.messages;
    return all.map(m => {
      const isChecked = this.state.checkbox[m._id];
      return (
        <Form.Checkbox 
            onChange={this.handleCheckboxChange} 
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
            <Button type="button" basic color="red" className="right" onClick={() => this.context.router.push('/messages')}>Cancel</Button>                
            <Button type="submit" basic color="blue" className="right">Save</Button>

          </Header>
          {!selected && <Input name="key" value={key} handler={this.changeKeyStateHandler} label="Key" holder="Enter new key"/>}
        </div>
        
        
      );
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
            {this.renderResponseCheckbox()}
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