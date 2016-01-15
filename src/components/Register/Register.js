import React from 'react';
import { Link } from 'react-router';
import Firebase from 'firebase';
import ReactFire from 'reactfire';
import s from './Register.scss';

let rootUrl = "https://react-slack.firebaseio.com/";
let ref = new Firebase(rootUrl);

const Register = React.createClass({

    mixins: [ ReactFire ],

    getInitialState: function () {
      return {
        'username': '',
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
                <h1 className="panel-title">Sign up</h1>
              </div>
              <div className="panel-body">
                <div className="row row-centered">
                  <div className="col-md-12 col-centered">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon glyphicon glyphicon-user"></span>
                      <input
                        value={this.state.username}
                        onChange={this.handleUsernameInputChange}
                        type="text"
                        className="form-control"
                        placeholder="Username" />
                    </div>
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
                  <div className="col-md-12">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleRegisterClick}>
                      Create account
                    </button>
                    <div className="footer">
                      Already have an account?
                      <Link to="/login"> Login</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },

    handleUsernameInputChange: function(event) {
      this.setState({ username: event.target.value });
    },

    handleEmailInputChange: function(event) {
      this.setState({ email: event.target.value });
    },

    handlePasswordInputChange: function(event) {
      this.setState({ password: event.target.value });
    },

    handleRegisterClick: function() {
      ref.createUser({
        email    : this.state.email,
        password : this.state.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
    }

});

export default Register;
