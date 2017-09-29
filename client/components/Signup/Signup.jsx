import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Footer from '../shared/Footer.jsx';
import AuthForm from '../shared/AuthForm.jsx';
import Preloader from '../shared/Preloader.jsx';
import ErrorDisplay from '../shared/ErrorDisplay.jsx';

class Signup extends Component {
  render() {
    const { isFetching, errorMessage, isAuthenticated, location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    if (isAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className="page page__register">
        <header className="header center">
          <a href="/" className="white-text brand-logo">MoreRecipes</a>
        </header>
        <main>
          <div className="container">
            <div className="row">
              <div className="register-card card col s11 m6">
                <div className="card-content">
                  {
                    errorMessage ? <ErrorDisplay message={errorMessage} /> : null
                  }
                  <h1 className="card-title center">Create a MoreRecipes Account</h1>
                  <AuthForm type="signup" />
                </div>
              </div>
            </div>
            <p className="white-text center">
              Don’t have an account?
              <Link to="/login" className="white-text"> Register now</Link>
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

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => {
  const { isAuthenticated, errorMessage, user, isFetching } = auth;
  // whichever is undefined thats is not in auth wont be added to the props
  return {
    isAuthenticated,
    errorMessage,
    user,
    isFetching
  };
};

export default connect(mapStateToProps)(Signup);

