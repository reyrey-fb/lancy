import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { connect} from 'react-redux';
import { signIn }  from '../../actions/authActions';

class SignIn extends Component {

  renderError = ( { touched, error }) => {
      if (touched && error) {
          return (
              <div>
                  {error}
              </div>
          )
      }
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div className="input-field">
        <label className="active">{label}</label>
        <input {...input} autoComplete="off" />
        <span className="helper-text">{this.renderError(meta)}</span>
      </div>
    );
  }
  
  onSubmit = (formValues) => {
    //call signIn action here and pass it the formValues (same as this.state, if not using Redux Form)
    this.props.signIn(formValues);
  };

  render() {
    const { authError } = this.props;
    return (
      <div className="container">
        <form className="white" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
            <Field name="email" component={this.renderInput} label="Email" />
            <Field name="password" component={this.renderInput} label="Password" />
            <button className="btn blue lighten-1 z-depth-0">Log In</button>
            <p className="grey-text">
              Don't have an account?
              <Link to="/signup"> Sign Up</Link>
            </p>
              <Link to="/signup">Forgot Password?</Link>
            <div className="red-text center">
                { authError ? <p>{authError}</p> : null }
            </div>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.email) {
        errors.email = "You must enter an email";
    }

    if (!formValues.password) {
        errors.password = "You must enter a password";
    }

    return errors;
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

const formWrapped = reduxForm({
    form: "SignIn",
    validate,
    })(SignIn);

export default connect (mapStateToProps, mapDispatchToProps)(formWrapped);