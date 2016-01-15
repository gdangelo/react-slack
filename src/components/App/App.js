import React from 'react';
import { Link } from 'react-router';
import Firebase from 'firebase';
import ReactFire from 'reactfire';
import s from './App.scss';

let rootUrl = "https://react-slack.firebaseio.com/";

const App = React.createClass({

    mixins: [ ReactFire ],

    componentWillMount: function () {
      let ref = new Firebase(rootUrl + "items");
      this.bindAsObject(ref, "items");
    },

    render: function () {
      return (
        <div>
          <div className="row row-centered">
            <div className="col-md-8 col-centered">
              <div className="page-header">
                <h1>Welcome to ReactSlack</h1>
              </div>
            </div>
          </div>
          <div className="row row-centered">
            <div className="col-md-8 col-centered">
              <Link to="/login"
                type="button"
                className="btn btn-default">
                Login
              </Link>
              <span> or </span>
              <Link to="/register"
                type="button"
                className="btn btn-primary">
                Register
              </Link>
            </div>
          </div>
          <div className="row row-centered">
            <div className="col-md-8 col-centered">
              <p>ReactSlack is an open source <a href="https://slack.com/">Slack</a> built using <a href="https://www.firebase.com/">Firebase</a> and <a href="https://facebook.github.io/react/">React.js</a> library.<br />
              Learn how to create this app from scratch with the <a href="http://eloquentwebapp.com">EloquentWebApp.com tutorial</a>.
              </p>
            </div>
          </div>
        </div>
      );
    }

});

export default App;
