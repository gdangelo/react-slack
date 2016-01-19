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
      currentUser: {},
      channelsLoaded: false,
      usersLoaded: false,
      userSelected: {},
      message: ''
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
    /* handle messages */
    this.fbMessages = new Firebase(rootUrl + 'messages/');
    this.bindAsObject(this.fbMessages, 'messages');
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
                {
                  this.state.channelsLoaded ?
                    <ListChannels
                        channelsStore={this.firebaseRefs.channels}
                        channels={this.state.channels} />
                    : null
                }
              </ul>
            </div>
            <div className="sidebar-section">
              <h2>Direct messages</h2>
              <ul className="sidebar-list">
              {
                this.state.usersLoaded ?
                  <ListUsers
                      usersStore={this.firebaseRefs.users}
                      users={this.state.users}
                      onSelectedUser={this.handleUserClick}/>
                  : null
              }
              </ul>
            </div>
            <div className="sidebar-footer">
              <p className="sidebar-currentUser">{ this.state.usersLoaded ? this.state.currentUser.name : null }</p>
              <Link to="/profile">edit profile</Link> / <a href="" onClick={this.handleLogoutClick}>logout</a>
            </div >
          </div>
        </div>

        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                {this.renderBody()}
              </div>
            </div>
          </div>
        </div>

    </div>
    );
  },

  renderBody: function () {
    if (Object.keys(this.state.userSelected).length > 0) {
      return (
        <div>
          <h1>@ {this.state.userSelected.name}</h1>
          <div className="input-group">
            <input
              type="text"
              value={this.state.message}
              className="form-control"
              placeholder="Type a message..."
              onChange={this.handleMessageChange}/>
            <span className="input-group-btn">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.handleSendClick}>
                Send
              </button>
            </span>
          </div>
        </div>
      )
    }
  },

  handleChannelsDataLoaded: function () {
    this.setState({channelsLoaded: true});
  },

  handleUsersDataLoaded: function () {
    let currentUser = this.state.users[auth.getUserAuth().uid];
    currentUser.id = auth.getUserAuth().uid;

    this.setState({
      usersLoaded: true,
      currentUser: currentUser
    });
  },

  handleLogoutClick: function () {
    auth.logout( () => browserHistory.push('/'));
  },

  handleUserClick: function (key) {
    let userSelected = this.state.users[key];
    userSelected.id = key;

    this.setState({
      userSelected: userSelected
    });
  },

  handleMessageChange: function (event) {
    this.setState({
      message: event.target.value
    });
  },

  handleSendClick: function () {
    if (this.state.message) {
      this.firebaseRefs.messages.push({
        text: this.state.message,
        users: [this.state.currentUser.id, this.state.userSelected.id],
        datetime: new Date().toString()
      });
      // reset message state
      this.setState({ message: '' });
    }
  }

});

export default Messages;
