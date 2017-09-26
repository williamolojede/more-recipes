/**
 * Root Component
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './Home/Home.jsx';
import Login from './Login/Login.jsx';

/**
 * @export
 * @class App
 * @extends {Component}
 */
class App extends React.Component {
  /**
   * @returns {component} returns a component that matches a provided path
   * @memberof App
   */
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth }) => {
  const { isAuthenticated, errorMessage, user } = auth;

  // whichever is undefined thats is not in auth wont be added to the props
  return {
    isAuthenticated,
    errorMessage,
    user
  };
};

export default connect(mapStateToProps)(App);
