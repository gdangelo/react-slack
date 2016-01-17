import React from 'react';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';
import ReactFire from 'reactfire';
import auth from '../../auth';
import s from './Profile.scss';

let rootUrl = "https://react-slack.firebaseio.com/";
let ref = new Firebase(rootUrl);

const Profile = React.createClass({

  mixins: [ ReactFire ],

  getInitialState: function () {
    return {
      name: '',
      loaded: false
    };
  },

  componentWillMount: function () {
    if (!auth.loggedIn()){
      browserHistory.push('/login');
    }
    else {
      this.fb = new Firebase(rootUrl + 'users/' + ref.getAuth().uid);
      this.fb.once('value', this.handleDataLoaded);
    }
  },

  render: function () {
    return (
      <div>
        <h1>Profile</h1>
        {this.renderForm()}
      </div>
    );
  },

  renderForm: function() {
    if (this.state.loaded){
      return (
        <form onSubmit={this.handleFormSubmit}>
          <input
            value={this.state.name}
            onChange={this.handleUsernameInputChange}
            type="text"
            className="form-control"
            placeholder="Username" />
        </form>
      );
    }
  },

  handleDataLoaded: function (snap) {
    let data = snap.val();
    this.setState(Object.assign(data, {loaded: true}));
  },

  handleUsernameInputChange: function(event){
    this.setState({ name: event.target.value });
  },

  handleFormSubmit: function(event){
    //todo
  }

});

export default Profile;
