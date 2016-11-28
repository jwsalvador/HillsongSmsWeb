import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Header, Button, Form, Checkbox} from 'semantic-ui-react';

import {saveMessage} from '../../actions/messagesActions';
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
  }

  componentWillMount(){
    this.initStates(this.props.messages);
  }

  componentWillReceiveProps(nextProps) {
    this.initStates(nextProps.messages);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.saveMessage(this.state);
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
      key: selected ? selected.key : '',
      value: selected ? selected.value : '',
      defVal: selected ? selected.default : '',
      checkbox: checkStates
    }
  }

  handleCheckboxChange(event, {value, checked}) {
    const obj = Object.assign({}, this.state.checkbox, { [value]: checked });
    this.setState({checkbox: obj});
  }

  renderCheckbox() {
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
    })
  }

  changeValueStateHandler(event, {value}) {
    this.setState({value});
  }

  changeDefaultStateHandler(event, {value}) {
    this.setState({defVal: value});
  }

  changeKeyStateHandler(event, {value}) {
    this.setState({key: value});
  }

  render() {
    const {selected, all} = this.props.messages;
    const {key, value, defVal} = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Header as="h1">
          {key.toUpperCase()}
          <Button type="button" basic color="red" className="right" onClick={() => this.context.router.push('/messages')}>Cancel</Button>                
          <Button type="submit" basic color="blue" className="right">Save</Button>
        </Header>
        {!key && <Input name="key" value={key} onChange={this.changeKeyStateHandler} label="Key" holder="Enter new key"/>}
        <InputArea field='value' value={value} handler={this.changeValueStateHandler}/>
        <InputArea field='default' value={defVal} onChange={this.changeDefaultStateHandler}/>

        <Form.Field className="padded">
          <label>Expected responses</label>
          <Form.Group inline>
            {this.renderCheckbox()}
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