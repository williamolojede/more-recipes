import React from 'react';

const IngredientsList = props => (
  <div className="recipe__ingredients col s12 m5">
    <h3>Ingredients</h3>
    <ul>
      {
        props.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)
      }
    </ul>
  </div>
);

export default IngredientsList;
