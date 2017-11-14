import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      <Link to={`/recipe/${id}`} className="recipe-card__img">
        <img
          src={img_url} /* eslint camelcase: 0 */
          alt="pancake"
          className="card-image"
        />
      </Link>
      <div className="card-content">
        <Link to={`/recipe/${id}`}>
          <h4 className="recipe-card__title card-title">{name}</h4>
        </Link>
        <p className="recipe-card__description">{description}</p>
      </div>
      <RecipeCardInfo info={recipeInfo} />
    </div>
  );
};

// NOTE: not all keys are checked since they'll also be checked in `RecipeCardInfo`
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img_url: PropTypes.string
  }).isRequired
};

export default RecipeCard;
