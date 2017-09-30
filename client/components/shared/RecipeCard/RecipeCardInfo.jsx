import React from 'react';

const RecipeCardInfo = () => (
  <div className="card-action recipe-card__info">
    <img
      src="https://roadwaytravels.com/img/userDefaultIcon.png"
      alt=""
      className="recipe-card__info---img"
    />
    <div className="recipe-card__info">
      <span><span className="recipe-card__info-by">Recipe by</span> John Doe</span>
      <ul className="recipe-card__info--stats">
        <li className="stats__favorite">
          <i className="mdi mdi-heart" />
          <span>120</span>
        </li>
        <li className="stats__vote-up">
          <i className="mdi mdi-thumb-up" />
          <span>120</span>
        </li>
        <li className="stats__vote-down">
          <i className="mdi mdi-thumb-down" />
          <span>120</span>
        </li>
        <li className="stats__view">
          <i className="mdi mdi-eye" />
          <span>120</span>
        </li>
      </ul>
    </div>
  </div>
);

export default RecipeCardInfo;
