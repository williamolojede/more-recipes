import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard/RecipeCard.jsx';

const TopRatedRecipeList = props => (
  <ul className="top-rated__list row">
    {props.recipes.map(recipe => (
      <li className="top-rated__item col s12 m6 l4 x4" key={recipe.id}>
        <RecipeCard recipe={recipe} />
      </li>
    ))}
  </ul>
);

TopRatedRecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TopRatedRecipeList;
