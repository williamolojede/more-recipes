import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { recipePropTypes } from '../../config/proptypes';

const propTypes = {
  type: PropTypes.oneOf(['favorites', 'personal-recipes']).isRequired,
  asOwner: PropTypes.bool.isRequired
};

const RecipeTableListingRow = ({
  recipe,
  asOwner,
  type,
  removeRecipe,
  index
}) => (
  <tr>
    <td className="my-recipe__manage--table___name">
      <Link to={`/recipe/${recipe.id}`}>
        {recipe.name}
      </Link>
    </td>
    {
      asOwner &&
        <td className="my-recipe__manage--table___action">
          {
            type === 'favorites' ||
            <Link
              to={{
                pathname: '/user/1/modify-recipe',
                state: { recipe, index }
              }}
            >
              <i className="mdi mdi-wrench" />
            </Link>
          }
          <button onClick={e => removeRecipe(e, recipe.id, type, index)}>
            <i className="mdi mdi-delete" />
          </button>
        </td>
    }
  </tr>
);

RecipeTableListingRow.propTypes = {
  ...propTypes,
  recipe: PropTypes.shape(recipePropTypes).isRequired,
  removeRecipe: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default RecipeTableListingRow;
