import {combineReducers} from 'redux';

import messages from './messagesReducer';
import config from './configReducer';

const rootReducer = combineReducers({
  config,
  messages
});

export default rootReducer;