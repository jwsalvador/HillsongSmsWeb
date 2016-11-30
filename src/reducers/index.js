import {combineReducers} from 'redux';

import messages from './messagesReducer';
import config from './configReducer';
import inbox from './inboxReducer';

const rootReducer = combineReducers({
  config,
  messages,
  inbox
});

export default rootReducer;