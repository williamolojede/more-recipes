import React from 'react';

const RecipeStats = (props) => {
  const { favoriteCount, upVoteCount, downVoteCount, viewCount } = props.stats;

  return (
    <ul className="recipe-stats">
      <li className="recipe-stats__favorite">
        <a href="/favorite">
          <i className="mdi mdi-heart" />
          <span>{favoriteCount}</span>
        </a>
      </li>
      <li className="recipe-stats__vote-up">
        <a href="/vote-up">
          <i className="mdi mdi-thumb-up" />
          <span>{upVoteCount}</span>
        </a>
      </li>
      <li className="recipe-stats__vote-down">
        <a href="/vote-down">
          <i className="mdi mdi-thumb-down" />
          <span>{downVoteCount}</span>
        </a>
      </li>
      <li className="recipe-stats__views">
        <i className="mdi mdi-eye" />
        <span>{viewCount}</span>
      </li>
    </ul>
  );
};

export default RecipeStats;
