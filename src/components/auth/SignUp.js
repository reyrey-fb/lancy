import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
//import { connect} from 'react-redux';
//import { signUp }  from '../../actions';
import "../../scss/main.css";


class SignUp extends Component {
  renderError = ({ touched, error }) => {
    if (touched && error) {
      return <div>{error}</div>;
    }
  };

  renderInput = ({ input, label, meta }) => {
      return (
        <React.Fragment>
          <label htmlFor={`input${label}`} className="sr-only">
            {label}
          </label>
          <input
            {...input}
            className="form-control mb-2"
            placeholder={label}
            autoComplete="off"
            required
          />
          <span className="helper-text">{this.renderError(meta)}</span>
        </React.Fragment>
      );
  }

  onSubmit = (formValues) => {
    //LINK REGISTRATION/AUTHENTICATION HERE THROUGH ACTION CREATOR PROP
    //this.props.signUp(formValues);
    console.log(formValues.name);
  };

  render() {
    //console.log(this.props);
    const { authError } = this.props;
    return (
      <div className="container-fluid bg-light min-vh-100">
        <div className="row d-flex justify-content-center min-vh-100 align-items-center">
          <div className="col-sm"></div>
          <div className="text-center col-sm px-5 py-2 bg-white card py-5">
            <form
              className="form-signin"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <img
                className="mb-4"
                src={require("../../assets/images/logo_text.svg")}
                alt="Lancy"
                width="140"
                height="80"
              />
              <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
              <Field name="name" component={this.renderInput} label="Name" />
              <Field name="email" component={this.renderInput} label="Email" />
              <Field
                name="password"
                component={this.renderInput}
                label="Password"
              />
              <button className="btn btn-lg btn-primary btn-block mb-4">
                Sign Up
              </button>

              <Link to="/signin">I already have an account</Link>

              <div>{authError ? <p>{authError}</p> : null}</div>
            </form>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    );
  }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.name) {
        errors.name = "You must enter a name"
    }

    if (!formValues.email) {
        errors.email = "You must enter an email";
    }

    if (!formValues.password) {
        errors.password = "You must enter a password";
    }

    return errors;
}

export default reduxForm({
    form: "SignUp",
    validate
}) (SignUp);