import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { authPropTypes } from '../../config/proptypes';

import Footer from '../shared/Footer.jsx';
import AuthForm from '../shared/AuthForm.jsx';
import Preloader from '../shared/Preloader.jsx';
import ErrorDisplay from '../shared/ErrorDisplay.jsx';

import loginUser from '../../actions/loginUser';

/**
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  /**
   * @param {object} formData -
   * @returns {undefined} - return nothing
   */
  userLogin = (formData) => {
    this.props.dispatch(loginUser(formData));
  }

  /**
   * @returns {view} - Renders tht login page view
   * @memberof Login
   */
  render() {
    const { isFetching, errorMessage, isAuthenticated, location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    if (isAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }

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
                  <AuthForm type="login" authFormSubmit={this.userLogin} />
                </div>
              </div>
            </div>
            <p className="white-text center">
            Don’t have an account?
              <Link to="/signup" className="white-text"> Signup now</Link>
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

Login.defaultProps = {
  // the error message should not be fined by default
  errorMessage: undefined
};

Login.propTypes = authPropTypes;

const mapStateToProps = ({ auth, isFetching }) => {
  const { isAuthenticated, errorMessage, user } = auth;
  // whichever is undefined thats is not in auth wont be added to the props
  return {
    isAuthenticated,
    errorMessage,
    user,
    isFetching
  };
};

export default connect(mapStateToProps)(Login);
