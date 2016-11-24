import axios from 'axios';
import * as types from './actionTypes';

function fetchMessages() {
  const request = axios.get('/api/messages');

  return {
    type: types.FETCH_MESSAGES,
    payload: request
  }
}

export {fetchMessages};