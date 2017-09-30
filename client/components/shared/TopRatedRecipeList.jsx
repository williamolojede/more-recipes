import React from 'react';
import RecipeCard from './RecipeCard/RecipeCard.jsx';

const TopRatedRecipeList = () => (
  <ul className="top-rated__list row">
    <li className="top-rated__item col s12 m4 l4 x3">
      <RecipeCard />
    </li>
  </ul>
);

export default TopRatedRecipeList;
