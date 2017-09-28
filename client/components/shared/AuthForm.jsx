import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class AuthForm
 * @extends {Component}
 */
class AuthForm extends React.Component {
  /**
   * @param {node} e - element
   * @return {view} - renders a form
   */
  onFormSubmit(e) {
    e.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    if (this.props.type === 'login') {
      this.props.authFormSubmit({ email, password });
    }

    this.authForm.reset();
  }

  /**
   * @return {view} - renders a form
   */
  render() {
    return (
      <form
        className="auth-form form"
        ref={(node) => { this.authForm = node; }}
        onSubmit={e => this.onFormSubmit(e)}
      >
        {
          this.props.type === 'signup' ?
            <input
              type="text"
              name="usr-name"
              className="form__input"
              placeholder="name"
              required
            />
            :
            null
        }
        <input
          id="usr-email"
          type="email"
          name="usr-email"
          className="form__input"
          placeholder="email"
          required
          ref={(node) => { this.emailInput = node; }}
        />
        <input
          id="usr-pswd"
          type="password"
          name="usr-pswd"
          className="form__input"
          placeholder="password"
          required
          ref={(node) => { this.passwordInput = node; }}
        />

        <button type="submit" className="form__submit z-depth-1">
          {
            this.props.type === 'signup' ?
              'Register'
              :
              'Login'
          }
        </button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  type: PropTypes.string.isRequired,
  authFormSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
