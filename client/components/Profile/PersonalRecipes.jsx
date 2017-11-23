import React from 'react';
import PropTypes from 'prop-types';
import RecipeTableListing from './RecipeTableListing.jsx';
import { recipePropTypes } from '../../config/proptypes';

const PersonalRecipes = ({ personalRecipes, asOwner, removeRecipe }) => (
  <div className="col s12 my-recipe__manage z-depth-1" id="manage">
    <RecipeTableListing
      recipes={personalRecipes}
      asOwner={asOwner}
      type="personal-recipes"
      removeRecipe={removeRecipe}
    />
  </div>
);

PersonalRecipes.propTypes = {
  asOwner: PropTypes.bool.isRequired,
  personalRecipes: PropTypes.arrayOf(recipePropTypes.recipe).isRequired,
  removeRecipe: PropTypes.func.isRequired
};

export default PersonalRecipes;
