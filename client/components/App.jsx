/**
 * Root Component
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import requireAuthentication from '../utils/requiresAuth.jsx';


import Home from './pages/Home';
import SingleRecipe from './pages/SingleRecipe';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile/Profile';

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
          <Route exact path="/" component={requireAuthentication(Home)} />
          <Route exact path="/recipe/:id" component={requireAuthentication(SingleRecipe)} />
          <Route path="/user/:uid" component={requireAuthentication(Profile)} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
