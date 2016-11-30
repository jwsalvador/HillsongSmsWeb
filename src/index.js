import React from 'react';
import { render } from 'react-dom';
import {Router, browserHistory} from 'react-router';
import './styles/app.scss';

import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import routes from './routes';
import {fetchMessagesByCode} from './actions/messagesActions';
import {fetchInbox} from './actions/inboxActions';
import {CONFIG_INIT_STATE} from './reducers/initialStates';

const store = configureStore();

store.dispatch(fetchMessagesByCode(CONFIG_INIT_STATE.campus));
store.dispatch(fetchInbox(CONFIG_INIT_STATE.campus));

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('main')
);
