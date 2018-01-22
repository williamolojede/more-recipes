import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { authPropTypes } from '../../config/proptypes';

import Footer from '../shared/Footer.jsx';
import AuthForm from '../shared/AuthForm.jsx';
import Preloader from '../shared/Preloader.jsx';
import ErrorDisplay from '../shared/ErrorDisplay.jsx';

import loginUser from '../../actions/loginUser';
import { removeAuthErrorMessage } from '../../actions/auth';


class Login extends Component {
  componentWillMount() {
    if (this.props.errorMessage) {
      this.props.dispatch(removeAuthErrorMessage());
    }
  }

  /**
   * @param {object} formData -
   * @returns {undefined} - return nothing
   */
  userLogin = (formData) => {
    this.props.dispatch(loginUser(formData));
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

export const mapStateToProps = ({ auth, isFetching }) => {
  const { isAuthenticated, errorMessage } = auth;
  return {
    isAuthenticated,
    errorMessage,
    isFetching
  };
};

export { Login as PureLogin };
export default connect(mapStateToProps)(Login);
