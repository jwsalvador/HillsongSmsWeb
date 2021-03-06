import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import Home from './components/home/HomePage';
import Messages from './components/messages/MessagesPage';
import MessagesList from './components/messages/MessagesList';
import MessageDetail from './components/messages/MessageDetail';
import MessageForm from './components/messages/MessageForm';
import Inbox from './components/inbox/InboxPage';
import InboxRoom from './components/inbox/InboxRoom';
import InboxList from './components/inbox/InboxList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/messages" component={Messages}>
      <IndexRoute component={MessageDetail}/>
      <Route path="/messages/form" component={MessageForm}/>
      <Route path="/messages/detail" component={MessageDetail}/>
      <Route path="/messages/list" component={MessagesList}/>
    </Route>
    <Route path="/inbox" component={Inbox}>
      <IndexRoute component={InboxRoom} />
      <Route path="/inbox/room" component={InboxRoom}/>
      <Route path="/inbox/list" component={InboxList}/>
    </Route>
  </Route>
);