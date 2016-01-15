import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App/App';
import Login from './components/Login/Login';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="login" component={Login} />
  </Router>
), document.querySelector('.container'));
