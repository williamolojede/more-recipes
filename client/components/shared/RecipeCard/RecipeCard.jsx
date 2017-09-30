import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCardInfo from './RecipeCardInfo.jsx';

const RecipeCard = () => (
  <div className="recipe-card card">
    <Link to="/repcipe/1">
      <img
        src="https://fthmb.tqn.com/4P30MYPyJYr0fxlkBuHmNZg4NO8=/960x0/filters:no_upscale()/about/3167488129_cc7a303896_o-58a6fe3b5f9b58a3c91bf559.jpg"
        alt="pancake"
        className="recipe-card__img card-image"
      />
    </Link>
    <div className="card-content">
      <Link to="/repcipe/1">
        <h4 className="recipe-card__title card-title">Pancake</h4>
      </Link>
      <p className="recipe-card__description">Who doesn’t love pancakes in the morning? These delicious vanilla pancakes are thick and </p>
    </div>
    <RecipeCardInfo />
  </div>
);

export default RecipeCard;
