import axios from 'axios';
import * as types from './actionTypes';

function fetchMessages() {
  const request = axios.get('/api/messages');

  return {
    type: types.FETCH_MESSAGES,
    payload: request
  }
}

function fetchMessagesByCode(code) {
  const request = axios.get(`/api/messages/${code}`);

  return {
    type: types.FETCH_MESSAGES_BY_CODE,
    payload: request
  }
}

function selectMessage(message) {

  return {
    type: types.SELECT_MESSAGE,
    payload: message
  }
}

function saveMessageSuccess(obj) {
  return {
    type: types.SAVE_MESSAGE,
    payload:obj
  };
}

function saveMessage(obj) {
  const request = axios.post('/api/message', obj);

  return (dispatch, getState) => {
    dispatch(saveMessageSuccess(request));
    dispatch(fetchMessagesByCode(getState().config.campus));
  };
}

export {fetchMessages, fetchMessagesByCode, selectMessage, saveMessage};