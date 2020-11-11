import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
    auth: authReducer,
    search: searchReducer,
    form: formReducer,
    //add firebase to reducers
    firebase: firebaseReducer,
    firestore: firestoreReducer
})