import React from 'react';
import { Link, browserHistory } from 'react-router';
import auth from '../../auth';
import s from './Login.scss';

const Login = React.createClass({

    getInitialState: function () {
      return {
        'email': '',
        'password': ''
      };
    },

    render: function () {
      return (
        <div className="row row-centered">
          <div className="col-md-6 col-centered">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">Sign in to ReactSlack</h1>
              </div>
              <div className="panel-body">
                <form onSubmit={this.handleFormSubmit}>
                  <div className="row row-centered">
                    <div className="col-md-12 col-centered">
                      <div className="input-group input-group-lg">
                        <span className="input-group-addon glyphicon glyphicon-envelope"></span>
                        <input
                          value={this.state.email}
                          onChange={this.handleEmailInputChange}
                          type="email"
                          className="form-control"
                          placeholder="Email" />
                      </div>
                      <div className="input-group input-group-lg">
                        <span className="input-group-addon glyphicon glyphicon-lock"></span>
                        <input
                          onChange={this.handlePasswordInputChange}
                          value={this.state.password}
                          type="password"
                          required
                          className="form-control"
                          placeholder="Password" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 text-left">
                      <Link to="/register">Create a ReactSlack account</Link>
                    </div>
                    <div className="col-md-6 text-right">
                      <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    },

    handleEmailInputChange: function(event) {
      this.setState({ email: event.target.value });
    },

    handlePasswordInputChange: function(event) {
      this.setState({ password: event.target.value });
    },

    handleFormSubmit: function(event) {
      var userAndPass = {
        email    : this.state.email,
        password : this.state.password
      };

      event.preventDefault();
      auth.login(userAndPass)
        .then(authData => browserHistory.push('/messages'))
        .catch(err => console.error(err.stack));
    }

});

export default Login;
