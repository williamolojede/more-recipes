import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';


import decodeToken from '../../utils/decodeToken';

import ManageRecipes from '../shared/ManageRecipes';
import Preloader from '../shared/Preloader';
import RecipeCardShort from '../shared/RecipeCard/RecipeCardShort';

import { fetchFavoriteRecipes, favorite } from '../../actions/recipe';

class FavoriteRecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentPage: 1,
      limit: 12,
      last: 1,
    };

    this.payload = {
      userId: decodeToken().id,
      page: this.state.currentPage,
      limit: this.state.limit
    };
  }

  componentWillMount() {
    const payload = {
      userId: decodeToken().id,
      page: this.state.currentPage,
      limit: this.state.limit
    };
    this.props.dispatch(fetchFavoriteRecipes(payload));
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
      const payload = {
        userId: decodeToken().id,
        page: this.state.currentPage,
        limit: this.state.limit
      };
      this.props.dispatch(fetchFavoriteRecipes(payload));
    }
  }

  handlePageClick = ({ selected }) => {
    this.setState({
      currentPage: selected + 1
    });
  }

  removeRecipe = (id) => {
    swal({
      title: 'Remove recipe from your favorite List?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          return this.props.dispatch(favorite(id));
        }
        return willDelete;
      })
      .then((willDelete) => {
        if (!willDelete) return;
        const payload = {
          userId: decodeToken().id,
          page: (this.state.recipes.length === 1 && this.state.last !== 1) ?
            this.state.currentPage - 1 : this.state.currentPage,
          limit: this.state.limit
        };
        this.props.dispatch(fetchFavoriteRecipes(payload));
      });
  }

  renderBody = () => {
    const { isFetching } = this.props;

    if (isFetching) {
      return (<Preloader />);
    } else if (!isFetching && this.state.recipes.length === 0) {
      return (
        <div className="no-favorites">
          <span>Welcome to your favorites!</span>
          <span>Tap <i className="mdi mdi-heart" /> to save any recipe you like,</span>
          <span>and it&apos;ll show up here.</span>
        </div>
      );
    }
    return (
      <ul className="row recipes-list">
        {
          this.state.recipes.map(({ id, name }) => (<RecipeCardShort
            id={id}
            name={name}
            removeRecipe={this.removeRecipe}
            key={id}
            type="favorite"
          />))
        }
      </ul>
    );
  }

  render() {
    return (
      <ManageRecipes>
        <div className="container page-manage__recipes">

          {
            this.renderBody()
          }
          {
            (this.state.last > 1 && this.state.recipes.length !== 0) &&
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
                containerClassName={`pagination ${this.props.isFetching ? 'is-fetching' : ''}`}
              />
            </footer>
          }

        </div>
      </ManageRecipes>
    );
  }
}

FavoriteRecipesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  favoriteRecipes: { recipes, pagination },
  isFetching,
}) => ({
  recipes,
  pagination,
  isFetching
});

export { FavoriteRecipesPage as PureFavoriteRecipesPage };
export default connect(mapStateToProps)(FavoriteRecipesPage);
