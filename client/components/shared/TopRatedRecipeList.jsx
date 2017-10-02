import React from 'react';

import { topRatedRecipeListPropTypes } from '../../config/proptypes';

import RecipeCard from './RecipeCard/RecipeCard.jsx';

const TopRatedRecipeList = props => (
  <ul className="top-rated__list row">
    {props.recipes.map(recipe => (
      <li className="top-rated__item col s12 m4 l4 x3" key={recipe.id}>
        <RecipeCard recipe={recipe} />
      </li>
    ))}
  </ul>
);

TopRatedRecipeList.propTypes = topRatedRecipeListPropTypes;

export default TopRatedRecipeList;
