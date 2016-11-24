import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import Home from './components/home/HomePage';
import Messages from './components/messages/MessagesPage';
import MessagesList from './components/messages/MessagesList';
import MessageDetail from './components/messages/MessageDetail';
import Inbox from './components/inbox/InboxPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/messages" component={Messages}>
      <Route path="/messages/detail" component={MessageDetail}/>
    </Route>
    <Route path="/inbox" component={Inbox}/>
  </Route>
);