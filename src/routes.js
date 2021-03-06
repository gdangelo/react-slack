import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import auth from './auth';
import App from './components/App/App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';

function isAuth(nextState, replace) {
  if (auth.loggedIn()) {
    replace({
      pathname: '/messages',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={isAuth} />
    <Route path="login" component={Login} onEnter={isAuth} />
    <Route path="register" component={Register} onEnter={isAuth} />
    <Route path="profile" component={Profile} onEnter={requireAuth} />
    <Route path="messages" component={Messages} onEnter={requireAuth} />
  </Router>
), document.querySelector('.container'));
