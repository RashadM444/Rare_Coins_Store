import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../Redux/Login/LoginActions";
import "./style.css";

class AdminLogin extends Component {
  state = {
    login: "",
    pass: "",
  };
  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(loginUser(this.state.login, this.state.pass));
  };
  render() {
    return (
      <div>
        <form className='admin-login-form' onSubmit={this.handleSubmit}>
          <label htmlFor='login'>Login</label>
          <input
            id='login'
            name='login'
            type='text'
            value={this.state.login}
            onChange={this.handleInput}
          />
          <label htmlFor='password'>Password</label>
          <input
            id='pass'
            name='password'
            type='password'
            value={this.state.pass}
            onChange={this.handleInput}
          />
          <button className='violet-button' type='submit'>
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    signedIn: state.signedIn,
  };
};

export default connect(mapStateToProps)(AdminLogin);
