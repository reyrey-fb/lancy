import history from '../history';

//Email/Password Sign In Action Creator Using Firebase Auth
export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    //initialize firebase instance
    const firebase = getFirebase();
    //make async call to firebase auth SDK
    firebase
      .auth()
      .signInWithEmailAndPassword(
        credentials.email,
        credentials.password
        //call returns a promise, which if successful, dispatches success action
      )
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
        //navigate programmatically back to Sign In screen
        history.push("/");
      })
      //if error thrown, dispatches error action
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  }  
};

//Sign Out Action Creator Using Firebase Auth
export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    //initialize firebase instance
    const firebase = getFirebase();
    //make async call to firebase auth SDK
    firebase
      .auth()
      .signOut()
    //call returns a promise, which if successful, dispatches success action
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
        //navigate programmatically back to Sign In screen
        history.push("/signin");
      })
      .catch((err) => {
        //if error thrown, dispatches error action
        dispatch({ type: "SIGNOUT_ERROR", err });
    });
  }
};






