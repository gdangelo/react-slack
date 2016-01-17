import React from 'react';
import { Link, browserHistory } from 'react-router';
import ReactFire from 'reactfire';
import Firebase from 'firebase';
import auth from '../../auth';
import s from './Messages.scss';
import ListChannels from '../ListChannels/ListChannels';

let rootUrl = "https://react-slack.firebaseio.com/";

const Messages = React.createClass({

  mixins: [ ReactFire ],

  getInitialState: function () {
    return {
      channels: {},
      loaded: false
    };
  },

  componentWillMount: function () {
    if (!auth.loggedIn()){
      browserHistory.push('/login');
    }
    this.fb = new Firebase(rootUrl + 'channels/');
    this.bindAsObject(this.fb, 'channels');
    this.fb.on('value', this.handleDataLoaded);
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
            {this.state.loaded ?
                <ListChannels
                    channelsStore={this.firebaseRefs.channels}
                    channels={this.state.channels} /> :
                ""
            }
            <li className="sidebar-title">
              <a href="#">Direct messages</a>
            </li>
            <li className="sidebar-footer">
              {this.props.username}
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

  handleDataLoaded: function () {
    this.setState({loaded: true});
  },

  handleLogoutClick: function(){
    auth.logout( () => browserHistory.push('/'));
  }

});

export default Messages;
