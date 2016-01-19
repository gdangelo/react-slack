import React from 'react';
import s from './ListChannels.scss';

const ListChannels = React.createClass({

  render: function () {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  },

  renderList: function () {
    let children = [];

    for(let key in this.props.channels) {
      let channel = this.props.channels[key];

      if(this.props.channels[key].name){
        children.push(
          <li key={key}>
            <a href="#" onClick={this.props.onSelectedChannel.bind(null, key)}># {channel.name}</a>
          </li>
        );
      }
    }

    return children;
  }

});

export default ListChannels;
