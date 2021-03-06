import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { authPropTypes } from '../../config/proptypes';

import Footer from '../shared/Footer.jsx';
import AuthForm from '../shared/AuthForm.jsx';
import Preloader from '../shared/Preloader.jsx';
import ErrorDisplay from '../shared/ErrorDisplay.jsx';

import signupUser from '../../actions/signupUser';
import { removeAuthErrorMessage } from '../../actions/auth';

class Signup extends Component {
  componentWillMount() {
    if (this.props.errorMessage) {
      this.props.dispatch(removeAuthErrorMessage());
    }
  }

  userSignup = (formData) => {
    this.props.dispatch(signupUser(formData));
  }

  render() {
    const {
      isFetching,
      errorMessage,
      isAuthenticated,
      location
    } = this.props;
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
                  <AuthForm type="signup" authFormSubmit={this.userSignup} />
                </div>
              </div>
            </div>
            <p className="white-text center">
              Have an account already?
              <Link to="/login" className="white-text"> Log in now</Link>
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

Signup.propTypes = authPropTypes;

export const mapStateToProps = ({ auth, isFetching }) => {
  const { isAuthenticated, errorMessage } = auth;
  return {
    isAuthenticated,
    errorMessage,
    isFetching
  };
};

export { Signup as PureSignup };
export default connect(mapStateToProps)(Signup);

