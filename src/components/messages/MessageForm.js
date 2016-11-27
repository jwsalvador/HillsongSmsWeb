import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Header, Button, Form, TextArea, Checkbox} from 'semantic-ui-react';

class MessageForm extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    const {selected} = this.props.messages;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStateHandler = this.changeStateHandler.bind(this);
    
    this.state = {
      key: selected ? selected.key : '',
      value: selected ? selected.value : '',
      defVal: selected ? selected.default : '',
    }
  }

  componentWillMount() {
    if (!this.props.messages.selected) {
      this.context.router.push('/messages');
    }
  }

  handleSubmit(event) {

  }

  renderCheckbox(list, val) {
    return list.map(m => {
      const isChecked = _.indexOf(val.child_messages, m._id) !== -1;
      return (
        <Form.Checkbox checked={isChecked} key={m._id} label={m.key.toUpperCase()} name='expected' value={m._id} />
      );
    })
  }

  changeStateHandler(event, {value}) {
    this.setState({value});
  }

  render() {
    const {selected, all} = this.props.messages;
    const {key, value, defVal} = this.state;

    if (!selected) {
      return <div>No message selected</div>;
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Header as="h1">
          {key.toUpperCase()}
          <Button type="button" basic color="blue" className="right" onClick={() => this.context.router.push('/messages')}>Cancel</Button>      
        </Header>
        <Form.TextArea 
            className="padded" 
            name='value' 
            label='Message response:' 
            placeholder='Anything else we should know?' 
            rows='3' 
            value={value} 
            onChange={this.changeStateHandler}/>
        <Form.TextArea 
            className="padded" 
            name='default' 
            label='Fallback message:' 
            placeholder='Anything else we should know?' 
            rows='3' 
            value={defVal} 
            onChange={this.changeStateHandler}/>
        <Form.Field className="padded">
            <label>Expected responses</label>
            <Form.Group inline>
              {this.renderCheckbox(all, selected)}
            </Form.Group>
          </Form.Field>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
  }
}

export default connect(mapStateToProps)(MessageForm);