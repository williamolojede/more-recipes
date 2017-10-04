import React from 'react';

import { recipeCardInfoPropTypes } from '../../../config/proptypes';
import defaultConfig from '../../../config/default';

import RecipeStats from '../RecipeStats.jsx';


const RecipeCardInfo = (props) => {
  const { User, upVoteCount, downVoteCount, favoriteCount, viewCount } = props.info;

  return (
    <div className="card-action recipe-card__info">
      {/* if user img is present show it or the default if not */}
      <img
        src={User.imgUrl || defaultConfig.userImgUrl}
        alt={User.fullname}
        title={User.fullname}
        className="recipe-card__info---img"
      />
      <div className="recipe-card__info">
        <span><span className="recipe-card__info-by">Recipe by</span> {User.fullname}</span>
        <RecipeStats />
        <ul className="recipe-card__info--stats">
          <li className="stats__favorite">
            <i className="mdi mdi-heart" />
            <span>{favoriteCount}</span>
          </li>
          <li className="stats__vote-up">
            <i className="mdi mdi-thumb-up" />
            <span>{upVoteCount}</span>
          </li>
          <li className="stats__vote-down">
            <i className="mdi mdi-thumb-down" />
            <span>{downVoteCount}</span>
          </li>
          <li className="stats__view">
            <i className="mdi mdi-eye" />
            <span>{viewCount}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

RecipeCardInfo.propTypes = recipeCardInfoPropTypes;
export default RecipeCardInfo;
