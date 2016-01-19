import React from 'react';
import auth from '../../auth';
import s from './ListUsers.scss';

const ListUsers = React.createClass({

  render: function () {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  },

  renderList: function () {
    let children = [];
    let currentUser = auth.getUserAuth();

    for(let key in this.props.users) {
      let user = this.props.users[key];

      if(user.name && key != currentUser.uid){
        children.push(
          <li key={key} className={"sidebar-users" + (user.connected ? " connected" : "")}>
            <a href="#" onClick={this.props.onSelectedUser.bind(null, key)}>{user.name}</a>
          </li>
        );
      }
    }

    return children;
  }

});

export default ListUsers;
