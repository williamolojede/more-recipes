/**
 * Root Component
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import requireAuthentication from './hoc/requiresAuth';


import Home from './pages/Home';
import SingleRecipe from './pages/SingleRecipe';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddRecipePage from './pages/AddRecipePage';
import PersonalRecipesPage from './pages/PersonalRecipesPage';
import FavoriteRecipesPage from './pages/FavoriteRecipesPage';
import Profile from './pages/Profile';

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
          <Route exact path="/user" component={requireAuthentication(Profile)} />
          <Route exact path="/user/recipes/create" component={requireAuthentication(AddRecipePage)} />
          <Route exact path="/user/recipes" component={requireAuthentication(PersonalRecipesPage)} />
          <Route
            exact
            path="/user/recipes/:recipeId/edit"
            component={requireAuthentication(props => (<AddRecipePage {...props} isEditMode />))}
          />
          <Route exact path="/user/favorites" component={requireAuthentication(FavoriteRecipesPage)} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
