import axios from 'axios';
import * as types from './actionTypes';

const fetchInbox = (campus) => {
  const request = axios.get(`/api/inbox/${campus}`);

  return {
    type: types.FECTH_INBOX,
    payload: request
  }
};

const selectInbox = (arrayOfMessages) => {
  return {
    type: types.SELECT_INBOX,
    payload: arrayOfMessages
  }
}

export {fetchInbox, selectInbox};