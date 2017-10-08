import React from 'react';
// import { connnect } from ''

const RecipeStats = (props) => {
  const { favoriteCount, upVoteCount, downVoteCount, viewCount } = props.stats;
  return (
    <ul className="recipe-stats">
      <li className="recipe-stats__favorite">
        <button onClick={() => props.favorite && props.favorite()} >
          <i className="mdi mdi-heart" />
          <span>{favoriteCount}</span>
        </button>
      </li>
      <li className="recipe-stats__vote-up">
        <button onClick={() => props.vote && props.vote('up')} >
          <i className="mdi mdi-thumb-up" />
          <span>{upVoteCount}</span>
        </button>
      </li>
      <li className="recipe-stats__vote-down">
        <button onClick={() => props.vote && props.vote('down')} >
          <i className="mdi mdi-thumb-down" />
          <span>{downVoteCount}</span>
        </button>
      </li>
      <li className="recipe-stats__views">
        <i className="mdi mdi-eye" />
        <span>{viewCount}</span>
      </li>
    </ul>
  );
};

export default RecipeStats;
