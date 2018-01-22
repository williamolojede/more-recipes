import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCardShort = ({
  id,
  name,
  removeRecipe,
  type
}) => (
  <li className="col s12 m6 l4 x4 recipes-list-item">
    <div className="card">
      <Link to={`/recipe/${id}`} className="recipes-list-item__name">
        {name}
      </Link>
      <div className="recipes-list-item__actions">
        {
          type !== 'favorite' &&
          <Link
            to={`/user/recipes/${id}/edit`}
            className="recipes-list-item__actions-edit"
          >
            <i className="mdi mdi-pencil" />
          </Link>
        }
        <button
          onClick={() => removeRecipe(id)}
          className="recipes-list-item__actions-delete"
        >
          <i className="mdi mdi-delete" />
        </button>
      </div>
    </div>
  </li>
);

RecipeCardShort.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  removeRecipe: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['favorite', 'personal']).isRequired
};

export default RecipeCardShort;
