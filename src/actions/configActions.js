import * as types from './actionTypes';

import * as messages from './messagesActions';

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
  };
}

export {selectCampus};