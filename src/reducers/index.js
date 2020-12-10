import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import searchReducer from "./searchReducer";
import sliderReducer from './sliderReducer';

export default combineReducers({
    //component reducers
    auth: authReducer,
    search: searchReducer,
    hourlySlider: sliderReducer('hourlySlider'),
    priceSlider: sliderReducer('priceSlider'),
    //redux form reducer
    form: formReducer,
    //add firebase to reducers
    firebase: firebaseReducer,
    firestore: firestoreReducer
})