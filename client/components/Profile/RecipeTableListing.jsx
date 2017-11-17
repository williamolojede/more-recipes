import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RecipeTableListingRow from './RecipeTableListingRow';

import Paginate from '../../../server/helpers/paginate';
import Pagination from '../shared/Pagination';
import scrollUp from '../../utils/scrollUp';

const propTypes = {
  type: PropTypes.oneOf(['favorites', 'personal-recipes']).isRequired,
  asOwner: PropTypes.bool.isRequired
};

class RecipeTableListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      pages: [],
      limit: 4,
      currentPage: 1,
    };
  }

  componentWillMount() {
    const paginate = new Paginate(this.props.recipes, this.state.limit);
    const {
      recipes,
      metaData: { pages }
    } = paginate.getRecipesForPage(this.state.currentPage);

    this.setState({ recipes, pages });
  }

  getRecipesForPage = (pageNumber) => {
    if (this.state.currentPage === pageNumber) return;
    if (pageNumber < 1 || pageNumber > this.state.pages[this.state.pages.length - 1]) {
      return;
    }

    const paginate = new Paginate(this.props.recipes, this.state.limit);
    const { recipes } = paginate.getRecipesForPage(pageNumber);
    scrollUp('16.66', '50');
    this.setState({
      currentPage: pageNumber,
      recipes,
    });
  }

  render() {
    const { asOwner, type, removeRecipe } = this.props;
    const { recipes } = this.state;
    if (recipes.length === 0) {
      if (type === 'personal-recipes') {
        if (!asOwner) {
          return (
            <div className="no-favorites">
              <span>This user as no personal recipes yet...</span>
            </div>
          );
        }

        return (
          <div className="no-favorites">
            <span>You don&apos;t have any personal recipes yet.</span>
            <span>Share your own culinary creations! Add a recipe</span>
          </div>
        );
      } else if (type === 'favorites') {
        if (!asOwner) {
          return (
            <div className="no-favorites">
              <span>This user as no favorite recipes yet...</span>
            </div>
          );
        }

        return (
          <div className="no-favorites">
            <span>Welcome to your favorites!</span>
            <span>Tap <i className="mdi mdi-heart" /> to save any recipe you like,</span>
            <span>and it&apos;ll show up here.</span>
          </div>
        );
      }
    }

    return (
      <table className="my-recipe__manage--table">
        <thead>
          <tr>
            <th colSpan={asOwner ? null : '2'}>Name</th>
            {
              asOwner ? <th>Actions</th> : null
            }
          </tr>
        </thead>
        <tbody>
          {
            type === 'favorites' ?
              recipes.map((item, index) => (
                <RecipeTableListingRow
                  recipe={item.Recipe}
                  type="favorites"
                  asOwner={asOwner}
                  key={item.Recipe.id}
                  removeRecipe={removeRecipe}
                  index={index}
                />))
              :
              recipes.map((recipe, index) => (
                <RecipeTableListingRow
                  recipe={recipe}
                  type="personal-recipes"
                  asOwner={asOwner}
                  key={recipe.id}
                  index={index}
                  removeRecipe={removeRecipe}
                />))
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <Pagination
                currentPage={this.state.currentPage}
                getRecipesForPage={this.getRecipesForPage}
                pages={this.state.pages}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

RecipeTableListing.propTypes = {
  ...propTypes,
};

export default RecipeTableListing;
