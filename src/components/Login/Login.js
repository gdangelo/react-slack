import React from 'react';
import { Link } from 'react-router';
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
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleLoginClick}>
                      Login
                    </button>
                  </div>
                </div>
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

    handleLoginClick: function() {
      console.log(this.state.email + ' / ' + this.state.password);
    }

});

export default Login;
