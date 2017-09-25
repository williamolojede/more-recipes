import React, { Component } from 'react';
import Footer from '../shared/Footer/Footer.jsx';

/**
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  /**
   * @returns {view} - Renders tht login page view
   * @memberof Login
   */
  render() {
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
                  <h1 className="card-title center">Log in to MoreRecipes</h1>
                  <form className="auth-form form" method="post" action="/login/">
                    <input
                      id="usr-email"
                      type="email"
                      name="usr-email"
                      className="form__input"
                      placeholder="email"
                      required
                    />
                    <input
                      id="usr-pswd"
                      type="password"
                      name="usr-pswd"
                      className="form__input"
                      placeholder="password"
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
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default Login;
