/**
 * Root Component
 */
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className='page page__home'>
        <header class="site-header">
          <nav>
            <div class="nav-wrapper">
              <a href="/" class="brand-logo">MoreRecipes</a>
              <ul class="right hide-on-med-and-down">
                <li><a href="my_recipes.html">My Recipes</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
              </ul>
              <ul class="side-nav" id="mobile-nav">
                <li><a href="my_recipes.html">My Recipes</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
              </ul>
              <a href="#" data-activates="mobile-nav" class="button-collapse">
                <i class="material-icons">menu</i>
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default App;
