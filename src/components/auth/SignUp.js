import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
//import { connect} from 'react-redux';
//import { signUp }  from '../../actions';


class SignUp extends Component {

  renderError = ({ touched, error }) => {
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
    //LINK REGISTRATION/AUTHENTICATION HERE THROUGH ACTION CREATOR PROP
    //this.props.signUp(formValues);
    console.log(formValues.name);
  };

  render() {
      //console.log(this.props);
    return (
      <div className="container">
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="white"
        >
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <Field name="name" component={this.renderInput} label="Name" />
          <Field name="email" component={this.renderInput} label="Email" />
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
          />
          <button className="btn blue lighten-1 z-depth-0">Sign Up</button>
        </form>
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