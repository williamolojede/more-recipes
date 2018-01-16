import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { fetchTopRecipes } from '../../actions/recipe';

import TopRatedRecipeList from '../shared/TopRatedRecipeList';
import Preloader from '../shared/Preloader';
import ConnectedSiteNav from '../shared/SiteNav';
import SiteFooter from '../shared/SiteFooter';
import Search from '../shared/Search';

import { currentUserPropTypes } from '../../config/proptypes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentPage: 1,
      limit: 6,
      last: 1,
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
        pagination
      } = newProps;
      this.setState({
        recipes,
        last: pagination.last
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.props.dispatch(fetchTopRecipes(this.state.currentPage, this.state.limit));
    }
  }

  toggleSearch =() => {
    this.setState({
      isSearchActive: !this.state.isSearchActive
    });
  }

  handlePageClick = ({ selected }) => {
    this.setState({
      currentPage: selected + 1
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
          <ConnectedSiteNav currentUser={this.props.currentUser} />
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
              <footer>
                <ReactPaginate
                  previousLabel={<i className="material-icons">chevron_left</i>}
                  nextLabel={<i className="material-icons">chevron_right</i>}
                  pageCount={this.state.last}
                  marginPagesDisplayed={2}
                  pageClassName="waves-effect"
                  pageRangeDisplayed={4}
                  onPageChange={this.handlePageClick}
                  activeClassName="active"
                  containerClassName="pagination"
                />
              </footer>


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

  ...currentUserPropTypes
};

const mapStateToProps = ({
  topRecipes: { recipes, pagination },
  isFetching,
  auth: { currentUser }
}) => ({
  recipes,
  pagination,
  currentUser,
  isFetching
});

export { Home as PureHome };
export default connect(mapStateToProps)(Home);
