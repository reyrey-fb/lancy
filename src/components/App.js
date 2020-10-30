import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';


import JobList from './jobs/JobList';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Account from './userSettings/Account'
import history from '../history';

import NavBar from './nav/NavBar';

class App extends Component {
    render() {
        return (
          <React.Fragment>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={JobList} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/account" component={Account} />
                <Route path="/nav" component={NavBar} />
              </Switch>
            </Router>
          </React.Fragment>
        );
    }
}

export default App;