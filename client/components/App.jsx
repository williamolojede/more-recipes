/**
 * Root Component
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// import actionCreators from '../actions/loginUser';

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
          <Route path="/login" render={() => <Login {...this.props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
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

// const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps)(App);
