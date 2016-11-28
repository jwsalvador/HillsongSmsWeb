import React from 'react';
import {Form, TextArea} from 'semantic-ui-react';

const mapping = {
  value: {
      name: 'value',
      label: 'Message response:',
      placeholder:'Please enter response that will be sent to the user',
    },
    default: {
      name: 'default',
      label: 'Fallback message:',
      placeholder:'Please enter a response in case the message from the user didn\'t match any expected messages',
    }
}

const InputArea = ({field, value, handler}) => {
  const fields = mapping[field];
  return (
    <Form.TextArea 
        className="padded" 
        rows='3' 
        value={value} 
        onChange={handler}
        {...fields}/>
  );
};

const Input = ({name, value, label, holder, handler}) => {
  return (
    <Form.Field className="padded">
      <label>{label}</label>
      <input value={value} name={name} placeholder={holder} onChange={handler}/>
    </Form.Field>
  );
}

export {InputArea, Input};