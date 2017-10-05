import React from 'react';

import { recipeCardInfoPropTypes } from '../../../config/proptypes';

import RecipeStats from '../RecipeStats.jsx';
import UserImg from '../UserImg.jsx';


const RecipeCardInfo = (props) => {
  const { User, upVoteCount, downVoteCount, favoriteCount, viewCount } = props.info;
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
        <span><span className="recipe-card__info-by">Recipe by</span> {User.fullname}</span>
        <RecipeStats stats={stats} />
      </div>
    </div>
  );
};

RecipeCardInfo.propTypes = recipeCardInfoPropTypes;
export default RecipeCardInfo;
