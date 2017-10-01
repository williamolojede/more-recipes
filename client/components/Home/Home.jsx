import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetchTopRecipes from '../../actions/fetchRecipe';

import TopRatedRecipeList from '../shared/TopRatedRecipeList.jsx';
import Preloader from '../shared/Preloader.jsx';
import SiteNav from '../shared/SiteNav.jsx';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopRecipes());
  }

  render() {
    const { isFetching, recipes } = this.props;
    return (
      <div className="page page__home">
        <header className="site-header">
          <SiteNav />
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
              {
                isFetching ? <Preloader /> : <TopRatedRecipeList recipes={recipes} />
              }
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

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ recipes, isFetching }) => ({
  recipes,
  isFetching
});

export default connect(mapStateToProps)(Home);
