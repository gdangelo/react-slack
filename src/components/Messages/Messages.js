import React from 'react';
import { Link } from 'react-router';
import s from './Messages.scss';

const Messages = React.createClass({

  render: function () {
    return (
      <div id="wrapper">

        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <Link to="/">ReactSlack</Link>
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
  }

});

export default Messages;
