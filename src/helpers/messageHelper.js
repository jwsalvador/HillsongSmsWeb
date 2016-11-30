export const getMessageByProp = (val, messages) => {
  if (val.hasOwnProperty('message_body')) {
    return val.message_body
  }

  if (!messages) {
    return;
  }
  const m = messages.filter((m) => {
    return m._id === val.message;
  })[0];
  
  return m.value;
  
}