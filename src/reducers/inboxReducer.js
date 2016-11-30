import * as types from '../actions/actionTypes';
import * as init from './initialStates';

export default (state = init.INBOX_INITIAL_STATE, action) => {
  
  switch (action.type) {
    case types.FECTH_INBOX:
      return Object.assign({}, state, { all: action.payload.data });
    case types.SELECT_INBOX: 
      return Object.assign({}, state, { selected: action.payload });;
    default:
      return state;
  }
}