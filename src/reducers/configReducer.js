import * as types from '../actions/actionTypes';
import {CONFIG_INIT_STATE} from './initialStates';

const config = (state = CONFIG_INIT_STATE, action) => {
  switch(action.type) {
    case types.SELECT_CAMPUS:
      return Object.assign({}, state, { campus: action.payload});
    default:
      return state;
  }
};

export default config;