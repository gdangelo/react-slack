import React from 'react';
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

    for(let key in this.props.users) {
      let user = this.props.users[key];

      if(user.name){
        children.push(
          <li key={key} className={"sidebar-users" + (user.connected ? " connected" : "")}>
            <a href="#">{user.name}</a>
          </li>
        );
      }
    }

    return children;
  }

});

export default ListUsers;
