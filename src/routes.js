import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import auth from './auth';
import App from './components/App/App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';

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
    <Route path="/" component={App} />
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="profile" component={Profile} onEnter={requireAuth} />
  </Router>
), document.querySelector('.container'));
