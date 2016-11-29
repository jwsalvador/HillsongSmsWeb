import * as types from '../actions/actionTypes';
import * as init from './initialStates';

export default (state = init.MESSAGES_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGES:
      return Object.assign({}, state, {all: action.payload.data});
    case types.FETCH_MESSAGES_BY_CODE:
      return Object.assign({}, state, {all: action.payload.data});
    case types.SELECT_MESSAGE:
      return Object.assign({}, state, {selected: action.payload});
    case types.SAVE_MESSAGE:
      return Object.assign({}, state, {selected: action.payload.data});
    default:
      return state;
  }
}