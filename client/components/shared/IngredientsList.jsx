/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';

const IngredientsList = ({ ingredients }) => {
  let ingredientListOne;
  let ingredientListTwo;

  if (ingredients.length % 2 === 0) {
    ingredientListOne = ingredients.slice(0, (ingredients.length / 2));
    ingredientListTwo = ingredients.slice(ingredients.length / 2);
  } else {
    const div = Math.round(ingredients.length / 2);
    ingredientListOne = ingredients.slice(0, div);
    ingredientListTwo = ingredients.slice(div);
  }

  return (
    <div className="recipe__ingredients row">
      <h3>Ingredients</h3>
      <ul className="col s12 m6">
        {
          ingredientListOne.map((ingredient, i) => <li key={i}>{ingredient}</li>)
        }
      </ul>
      <ul className="col s12 m6">
        {
          ingredientListTwo.map((ingredient, i) => <li key={i}>{ingredient}</li>)
        }
      </ul>
    </div>
  );
};

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default IngredientsList;
