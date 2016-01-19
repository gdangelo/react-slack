import React from 'react';
import { Link, browserHistory } from 'react-router';
import ReactFire from 'reactfire';
import Firebase from 'firebase';
import auth from '../../auth';
import s from './Messages.scss';
import ListChannels from '../ListChannels/ListChannels';
import ListUsers from '../ListUsers/ListUsers';

let rootUrl = "https://react-slack.firebaseio.com/";

const Messages = React.createClass({

  mixins: [ ReactFire ],

  getInitialState: function () {
    return {
      channels: {},
      users: {},
      channelsLoaded: false,
      usersLoaded: false
    };
  },

  componentWillMount: function () {
    if (!auth.loggedIn()){
      browserHistory.push('/login');
    }
    /* handle channels */
    this.fbChannels = new Firebase(rootUrl + 'channels/');
    this.bindAsObject(this.fbChannels, 'channels');
    this.fbChannels.on('value', this.handleChannelsDataLoaded);
    /* handle users */
    this.fbUsers = new Firebase(rootUrl + 'users/');
    this.bindAsObject(this.fbUsers, 'users');
    this.fbUsers.on('value', this.handleUsersDataLoaded);
  },

  render: function () {
    return (
      <div id="wrapper">

        <div id="sidebar-wrapper">
          <div className="sidebar-nav">
            <div className="sidebar-brand">
              ReactSlack
            </div>
            <div className="sidebar-section">
              <h2>Channels</h2>
              <ul className="sidebar-list">
                {this.state.channelsLoaded ?
                    <ListChannels
                        channelsStore={this.firebaseRefs.channels}
                        channels={this.state.channels} /> :
                    ""
                }
              </ul>
            </div>
            <div className="sidebar-section">
              <h2>Direct messages</h2>
              <ul className="sidebar-list">
              {this.state.usersLoaded ?
                  <ListUsers
                      usersStore={this.firebaseRefs.users}
                      users={this.state.users} /> :
                  ""
              }
              </ul>
            </div>
            <div className="sidebar-footer">
              {this.props.username}
              <Link to="/profile">edit profile</Link> / <a href="" onClick={this.handleLogoutClick}>logout</a>
            </div >
          </div>
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

  handleChannelsDataLoaded: function () {
    this.setState({channelsLoaded: true});
  },

  handleUsersDataLoaded: function () {
    this.setState({usersLoaded: true});
  },

  handleLogoutClick: function(){
    auth.logout( () => browserHistory.push('/'));
  }

});

export default Messages;
