import React, { Component } from 'react';

import { connect } from 'react-redux';

import { homePagePropTypes } from '../../config/proptypes';

import { fetchTopRecipes } from '../../actions/fetchRecipe';

import TopRatedRecipeList from '../shared/TopRatedRecipeList.jsx';
import Preloader from '../shared/Preloader.jsx';
import SiteNav from '../shared/SiteNav.jsx';
import SiteFooter from '../shared/SiteFooter.jsx';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopRecipes());
  }

  /**
   *  @return {jsx} - the view to be rendered
   */
  renderBody = () => {
    const { isFetching, recipes } = this.props;

    if (isFetching) {
      return (<Preloader />);
    } else if (!isFetching && recipes.length === 0) {
      return (
        <p className="no-recipes">
          Sorry no recipes present at the moment
          <span role="img" aria-label="sad">😢  </span>, please try again later
          <span role="img" aria-label="please">🙏</span>
        </p>
      );
    }
    return (<TopRatedRecipeList recipes={recipes} />);
  }

  render() {
    return (
      <div className="page page__home">
        <header className="site-header">
          <SiteNav user={this.props.user} />
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
                this.renderBody()
              }
            </section>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }
}

Home.propTypes = homePagePropTypes;

const mapStateToProps = ({ recipes, isFetching, auth }) => ({
  recipes,
  user: auth.user,
  isFetching
});

export default connect(mapStateToProps)(Home);
