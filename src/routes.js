import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App/App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
  </Router>
), document.querySelector('.container'));
