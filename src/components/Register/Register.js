import React from 'react';
import { browserHistory } from 'react-router';
import auth from '../../auth';
import s from './Register.scss';
import Panel from '../Panel/Panel';

const Register = React.createClass({

  render: function () {
    return (
      <Panel
        title="Create a ReactSlack account"
        btnLabel="Create account"
        handleFormSubmit={this.handleRegister}
        redirectPath="/login"
        linkLabel="Already have an account? Login">
      </Panel>
    );
  },

  handleRegister: function(userInfo) {
    auth.register(userInfo)
      .then(authData => browserHistory.push('/messages'))
      .catch(err => console.error(err.stack));
  }

});

export default Register;
