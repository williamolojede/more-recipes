import React from 'react';
import PropTypes from 'prop-types';

const AuthForm = props => (
  <form className="auth-form form" method="post" action="/login/">
    {
      props.type === 'signup' ?
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
    />
    <input
      id="usr-pswd"
      type="password"
      name="usr-pswd"
      className="form__input"
      placeholder="password"
      required
    />

    <button type="submit" className="form__submit z-depth-1">
      {
        props.type === 'signup' ?
          'Register'
          :
          'Login'
      }
    </button>
  </form>
);

AuthForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AuthForm;
