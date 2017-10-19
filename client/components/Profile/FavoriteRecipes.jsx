import React from 'react';
import PropTypes from 'prop-types';
import RecipeTableListing from './RecipeTableListing.jsx';

const FavoriteRecipes = ({ favoriteRecipes, asOwner, removeRecipe }) => (
  <div className="col s12 my-recipe__manage z-depth-1" id="favorites">
    <RecipeTableListing
      recipes={favoriteRecipes}
      asOwner={asOwner}
      type="favorites"
      removeRecipe={removeRecipe}
    />
  </div>
);

FavoriteRecipes.propTypes = {
  asOwner: PropTypes.bool.isRequired,
  removeRecipe: PropTypes.func.isRequired
};

export default FavoriteRecipes;
