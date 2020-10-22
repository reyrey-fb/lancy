import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import JobList from './jobs/JobList';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import history from '../history';

class App extends Component {
    render() {
        return (
          <Router history={history}>
            <div className="App">
              <Switch>
                <Route exact path="/" component={JobList} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
              </Switch>
            </div>
          </Router>
        );
    }
}

export default App;