import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';


import AuthStatus from './auth/AuthStatus';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Account from './userSettings/Account';
import Billing from './userSettings/Billing';
import Profile from './userSettings/Profile';
import SavedJobsList from "./main/SavedJobsList";
import history from '../history';
import Slider from './main/Slider';



class App extends Component {
    render() {
        return (
          <React.Fragment>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={AuthStatus} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/savedjobs" component={SavedJobsList} />
                <Route exact path="/account" component={Account} />
                <Route path="/account/billing" component={Billing} />
                <Route path="/account/profile" component={Profile} />
                <Route path="/slider" component={Slider} />
              </Switch>
            </Router>
          </React.Fragment>
        );
    }
}

export default App;