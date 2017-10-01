import React from 'react';
import { Link } from 'react-router-dom';

import { recipeCardPropTypes } from '../../../config/proptypes';

import RecipeCardInfo from './RecipeCardInfo.jsx';

const RecipeCard = (props) => {
  const {
    id,
    name,
    description,
    img_url,
    upVoteCount,
    downVoteCount,
    favoriteCount,
    viewCount,
    User
  } = props.recipe;

  const recipeInfo = {
    upVoteCount,
    downVoteCount,
    favoriteCount,
    viewCount,
    User
  };

  return (
    <div className="recipe-card card">
      <Link to={`/repcipe/${id}`}>
        <img
          src={img_url}
          alt="pancake"
          className="recipe-card__img card-image"
        />
      </Link>
      <div className="card-content">
        <Link to={`/repcipe/${id}`}>
          <h4 className="recipe-card__title card-title">{name}</h4>
        </Link>
        <p className="recipe-card__description">{description}</p>
      </div>
      <RecipeCardInfo info={recipeInfo} />
    </div>
  );
};

// NOTE: not all keys are checked since they'll also be checked in `RecipeCardInfo`
RecipeCard.propTypes = recipeCardPropTypes;

export default RecipeCard;
