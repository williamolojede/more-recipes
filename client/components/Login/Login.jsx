import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Footer from '../shared/Footer.jsx';
import AuthForm from '../shared/AuthForm.jsx';
import Preloader from '../shared/Preloader.jsx';
import ErrorDisplay from '../shared/ErrorDisplay.jsx';

import loginUser from '../../actions/loginUser.js';

/**
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  /**
   * @param {object} creds - User credentials
   * @returns {undefined} - return nothing
   */
  onUserLogin(e) {
    e.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    this.props.dispatch(loginUser({ email, password }));
    this.authForm.reset();
  }
  /**
   * @returns {view} - Renders tht login page view
   * @memberof Login
   */
  render() {
    const { isFetching, errorMessage } = this.props;
    return (
      <div className="page page__login">
        <header className="header center">
          <a href="/" className="white-text brand-logo">MoreRecipes</a>
        </header>

        <main>
          <div className="container">
            <div className="row">
              <div className="login-card card col s11 m6">
                <div className="card-content">
                  {
                    errorMessage ? <ErrorDisplay message={errorMessage} /> : null
                  }
                  <h1 className="card-title center">Log in to MoreRecipes</h1>
                  {/* <AuthForm type="login" /> */}
                  <form className="auth-form form" ref={(node) => { this.authForm = node; }} onSubmit={e => this.onUserLogin(e)}>
                    <input
                      id="usr-email"
                      type="email"
                      name="usr-email"
                      className="form__input"
                      placeholder="email"
                      ref={(node) => { this.emailInput = node; }}
                      required
                    />
                    <input
                      id="usr-pswd"
                      type="password"
                      name="usr-pswd"
                      className="form__input"
                      placeholder="password"
                      ref={(node) => { this.passwordInput = node; }}
                      required
                    />

                    <button type="submit" className="form__submit z-depth-1">Login</button>
                  </form>
                </div>
              </div>
            </div>
            <p className="white-text center">
              Don’t have an account?
              <a href="register.html" className="white-text"> Register now</a>
            </p>
            {
              isFetching ? <Preloader /> : null
            }
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default Login;
