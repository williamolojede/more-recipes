/**
 * Root Component
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import requireAuthentication from '../utils/requiresAuth.jsx';


import Home from './Home/Home.jsx';
import SingleRecipe from './SingleRecipe/SingleRecipe.jsx';
import Login from './Login/Login.jsx';
import Signup from './Signup/Signup.jsx';

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
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
