import React, { Component } from 'react';

import TopRatedRecipeList from '../shared/TopRatedRecipeList.jsx';
import Preloader from '../shared/Preloader.jsx';
/**
 * @export
 * @class App
 * @extends {Component}
 */
class Home extends Component {
  /**
   * @returns {component} returns a component that matches a provided path
   * @memberof App
   */
  render() {
    return (
      <div className="page page__home">
        <header className="site-header">
          <nav className="site-header__nav">
            <div className="nav-wrapper container">
              <a href="/" className="brand-logo">MoreRecipes</a>
              <ul className="right hide-on-med-and-down">
                <li><a href="profile.html">Profile</a></li>
              </ul>
              <ul className="side-nav" id="mobile-nav">
                <li><a href="profile.html">Profile</a></li>
              </ul>
              <a href="#" data-activates="mobile-nav" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
            </div>
          </nav>
          <section className="site-header__hero">
            <input className="site-header__hero--input" type="text" placeholder="find a recipe" />
          </section>
        </header>
        <main>
          <div className="container">
            <section className="page__home--top-rated">
              <header>
                <h1>Top Rated</h1>
              </header>
              {/* {
                isFetching ? <Preloader /> : <TopRatedRecipeList />
              } */}
              <TopRatedRecipeList />
            </section>
          </div>
        </main>

        <footer className="page-footer">
          <div className="container">
            <p>Crafted with <i className="mdi mdi-heart" /> by <a href="http://william.ng/" target="_blank" rel="noopener noreferrer">William I. Olojede</a></p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
