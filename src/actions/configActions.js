import * as types from './actionTypes';

import * as messages from './messagesActions';

import * as inbox from './inboxActions';

const select = (code) => {
  return {
    type: types.SELECT_CAMPUS,
    payload: code
  };
}

const selectCampus = (code) => {
  return dispatch => {
    dispatch(select(code));
    dispatch(messages.selectMessage(null));
    dispatch(inbox.fetchInbox(code));
  };
}

export {selectCampus};