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

      if(this.props.users[key].name){
        children.push(
          <li key={key}>
            <a href="#">{user.connected ? "* " + user.name : user.name}</a>
          </li>
        );
      }
    }

    return children;
  }

});

export default ListUsers;
