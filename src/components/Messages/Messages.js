import React from 'react';
import { Link, browserHistory } from 'react-router';
import auth from '../../auth';
import s from './Messages.scss';

const Messages = React.createClass({

  componentWillMount: function () {
    if (!auth.loggedIn()){
      browserHistory.push('/login');
    }
  },
  
  render: function () {
    return (
      <div id="wrapper">

        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              ReactSlack
            </li>
            <li className="sidebar-title">
              <a href="#">Channels</a>
            </li>
            <li>
              <a href="#"># general</a>
            </li>
            <li>
              <a href="#"># random</a>
            </li>
            <li className="sidebar-title">
              <a href="#">Direct messages</a>
            </li>
            <li>
              <a href="#">slackbot</a>
            </li>
            <li className="sidebar-footer">
              Grégory DAngelo
              <Link to="/profile">edit profile</Link> / <a href="" onClick={this.handleLogoutClick}>logout</a>
            </li>
          </ul>
        </div>

        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h1>#General</h1>
              </div>
            </div>
          </div>
        </div>

    </div>
    );
  },

  handleLogoutClick: function(){
    auth.logout( () => browserHistory.push('/'));
  }

});

export default Messages;
