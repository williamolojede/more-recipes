/**
 * Root Component
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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

export default App;
