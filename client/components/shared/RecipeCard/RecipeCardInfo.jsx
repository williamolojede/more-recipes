import React from 'react';
import { Link } from 'react-router-dom';

import { recipeCardInfoPropTypes } from '../../../config/proptypes';

import RecipeStats from '../RecipeStats.jsx';
import UserImg from '../UserImg.jsx';


const RecipeCardInfo = (props) => {
  const {
    User,
    upVoteCount,
    downVoteCount,
    favoriteCount,
    viewCount
  } = props.info;
  const stats = {
    upVoteCount,
    downVoteCount,
    favoriteCount,
    viewCount
  };

  return (
    <div className="card-action recipe-card__info">
      <UserImg user={User} type="inRecipeCard" />
      <div className="recipe-card__info">
        <span>
          <span className="recipe-card__info-by">Recipe by</span>
          <Link to={`user/${User.id}`}> {User.fullname}</Link>
        </span>
        <RecipeStats stats={stats} />
      </div>
    </div>
  );
};

RecipeCardInfo.propTypes = recipeCardInfoPropTypes;
export default RecipeCardInfo;
