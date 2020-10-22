import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import firebase from 'firebase/app';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from "redux-firestore";

import App from "./components/App";
import reducers from './reducers';
import fbConfig from './config/fbConfig';

//hook up Redux Dev Tools Chrome Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//CREATE REDUX STORE
//hook up Redux Store with Thunk (for async dispatch calls) + our project's Firestore DB + Firebase BaaS
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
    )
);

//React-Redux-Firebase Config
const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.querySelector("#root")
);
