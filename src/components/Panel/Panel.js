import React from 'react';
import { Link } from 'react-router';
import s from './Panel.scss';

const Panel = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    btnLabel: React.PropTypes.string,
    handleFormSubmit: React.PropTypes.func.isRequired,
    redirectPath: React.PropTypes.string,
    linkLabel: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      title: 'Default title',
      btnLabel: 'Submit',
      redirectPath: '/',
      linkLabel: 'Redirect to root url'
    }
  },

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
              <h1 className="panel-title">{this.props.title}</h1>
            </div>
            <div className="panel-body">
              {this.props.children}
              <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon glyphicon glyphicon-envelope"></span>
                      <input
                        value={this.state.email}
                        onChange={this.handleEmailInputChange}
                        type="email"
                        required
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
                <div className="panel-submit row">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-blue btn-outlined">{this.props.btnLabel}</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Link to={this.props.redirectPath}>{this.props.linkLabel}</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleEmailInputChange: function (event) {
    this.setState({ email: event.target.value });
  },

  handlePasswordInputChange: function (event) {
    this.setState({ password: event.target.value });
  },

  handleFormSubmit: function (event) {
    event.preventDefault();
    this.props.handleFormSubmit(this.state);
  }

});

export default Panel;
