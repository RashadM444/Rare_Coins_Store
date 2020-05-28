import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

// import styles from "./Registration.module.css";
// import { createNewUser } from "../../actions";

const required = (value) => (value ? undefined : "Required");
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const minLength = (min) => (value) =>
  value && value.length < min
    ? `Password should be at least ${min} characters`
    : undefined;
const minLength6 = minLength(6);

class SignUp extends Component {
  renderName = ({ label, input, type, meta: { touched, error, warning } }) => {
    return (
      <div>
        <label>{label}</label>
        <input type={type} {...input} />
        {touched &&
          ((error && <p>{error}</p>) || (warning && <span>{warning}</span>))}
      </div>
    );
  };

  renderEmail = ({ label, input, type, meta: { touched, error, warning } }) => {
    return (
      <div>
        <label>{label}</label>
        <input type={type} {...input} />
        {touched &&
          ((error && <p>{error}</p>) || (warning && <span>{warning}</span>))}
      </div>
    );
  };

  renderPassword = ({
    label,
    input,
    type,
    meta: { touched, error, warning },
  }) => {
    return (
      <div>
        <label>{label}</label>
        <input type={type} {...input} />
        {touched &&
          ((error && <p>{error}</p>) || (warning && <span>{warning}</span>))}
      </div>
    );
  };

  onSubmit = (values) => {
    this.props.createNewUser(values);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <h1>Sign Up</h1>
        <Field
          validate={required}
          label='Name'
          type='text'
          name='name'
          component={this.renderName}
        />
        <Field
          validate={[required, email]}
          label='Email'
          type='email'
          name='email'
          component={this.renderName}
        />
        <Field
          validate={[required, minLength6]}
          label='Password'
          type='password'
          name='password'
          component={this.renderName}
        />
        <div>
          <input type='submit' />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "regForm",
})(connect(null, null)(SignUp));
