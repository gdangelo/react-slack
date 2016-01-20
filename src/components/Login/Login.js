import React from 'react';
import { browserHistory } from 'react-router';
import auth from '../../auth';
import s from './Login.scss';
import Panel from '../Panel/Panel';

const Login = React.createClass({

  render: function () {
    return (
      <Panel
        title="Sign in to ReactSlack"
        btnLabel="Login"
        handleFormSubmit={this.handleLogin}
        redirectPath="/register"
        linkLabel="Create a ReactSlack account">
      </Panel>
    );
  },

  handleLogin: function(userInfo) {
    auth.login(userInfo)
      .then(authData => browserHistory.push('/messages'))
      .catch(err => console.error(err.stack));
  }

});

export default Login;
