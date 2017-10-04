import React from 'react';

const RecipeStats = () => (
  <ul className="recipe-stats">
    <li className="recipe-stats__favorite">
      <a href="/favorite">
        <i className="mdi mdi-heart" />
        <span>12</span>
      </a>
    </li>
    <li className="recipe-stats__vote-up">
      <a href="/vote-up">
        <i className="mdi mdi-thumb-up" />
        <span>12</span>
      </a>
    </li>
    <li className="recipe-stats__vote-down">
      <a href="/vote-down">
        <i className="mdi mdi-thumb-down" />
        <span>4</span>
      </a>
    </li>
    <li className="recipe-stats__views">
      <i className="mdi mdi-eye" />
      <span>120</span>
    </li>
    {/* <li className="write-review">
      <a href="#write-review">
        Write Review
      </a>
    </li> */}
  </ul>
);

export default RecipeStats;
