import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import scrollUp from '../../utils/scrollUp';

import { fetchTopRecipes } from '../../actions/fetchRecipe';

import TopRatedRecipeList from '../shared/TopRatedRecipeList';
import Preloader from '../shared/Preloader';
import ConnectedSiteNav from '../shared/SiteNav';
import SiteFooter from '../shared/SiteFooter';
import Pagination from '../shared/Pagination';
import Search from '../shared/Search';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      pages: [],
      currentPage: 1,
      limit: 6,
      isSearchActive: false
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchTopRecipes(this.state.currentPage, this.state.limit));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.recipes) {
      const {
        recipes,
        metaData
      } = newProps;
      this.setState({
        recipes,
        pages: metaData.pages
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.props.dispatch(fetchTopRecipes(this.state.currentPage, this.state.limit));
    }
  }
  getRecipesForPage = (pageNumber) => {
    if (this.state.currentPage === pageNumber) return;
    if (pageNumber < 1 || pageNumber > this.state.pages[this.state.pages.length - 1]) {
      return;
    }
    scrollUp('16.66', '50');
    this.setState({
      currentPage: pageNumber
    });
  }

  toggleSearch =() => {
    this.setState({
      isSearchActive: !this.state.isSearchActive
    });
  }

  renderBody = () => {
    const { isFetching } = this.props;

    if (isFetching) {
      return (<Preloader />);
    } else if (!isFetching && this.state.recipes.length === 0) {
      return (
        <p className="no-recipes">
          Sorry no recipes present at the moment
          <span role="img" aria-label="sad">😢  </span>, please try again later
          <span role="img" aria-label="please">🙏</span>
        </p>
      );
    }
    return (<TopRatedRecipeList recipes={this.state.recipes} />);
  }

  render() {
    return (
      <div className="page page__home">
        <header className="site-header">
          <ConnectedSiteNav user={this.props.user} />
          <section className="site-header__hero">
            <h2>Delicious recipes, just a search away...</h2>
            <input
              className="site-header__hero--input"
              type="text"
              onFocus={this.toggleSearch}
              placeholder="what would you like to cook?"
            />
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
              {
                !this.props.isFetching ?
                  <footer>
                    <Pagination
                      currentPage={this.state.currentPage}
                      getRecipesForPage={this.getRecipesForPage}
                      pages={this.state.pages}
                    />
                  </footer> : null
              }

            </section>
          </div>
        </main>
        {
          this.state.isSearchActive && <Search toggleSearch={this.toggleSearch} />
        }
        <SiteFooter />
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired
};

const mapStateToProps = ({ topRecipes, isFetching, auth }) => ({
  recipes: topRecipes.recipes,
  metaData: topRecipes.metaData,
  user: auth.user,
  isFetching
});


export default connect(mapStateToProps)(Home);
