import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { recipePropTypes } from '../../config/proptypes';

const propTypes = {
  type: PropTypes.string.isRequired,
  asOwner: PropTypes.bool.isRequired
};

const RecipeTableListingRow = ({ recipe, asOwner, type, removeRecipe, index }) => (
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

const RecipeTableListing = ({ recipes, asOwner, type, removeRecipe }) => {
  if (recipes.length === 0) {
    if (type === 'personal-recipes') {
      if (!asOwner) {
        return (
          <div className="no-favorites">
            <span>This user as no personal recipes yet...</span>
          </div>
        );
      }

      return (
        <div className="no-favorites">
          <span>You don&apos;t have any personal recipes yet.</span>
          <span>Share your own culinary creations! Add a recipe</span>
        </div>
      );
    } else if (type === 'favorites') {
      if (!asOwner) {
        return (
          <div className="no-favorites">
            <span>This user as no favorite recipes yet...</span>
          </div>
        );
      }

      return (
        <div className="no-favorites">
          <span>Welcome to your favorites!</span>
          <span>Tap <i className="mdi mdi-heart" /> to save any recipe you like,</span>
          <span>and it&apos;ll show up here.</span>
        </div>
      );
    }
  }

  return (
    <table className="my-recipe__manage--table">
      <thead>
        <tr>
          <th colSpan={asOwner ? null : '2'}>Name</th>
          {
            asOwner ? <th>Actions</th> : null
          }
        </tr>
      </thead>
      <tbody>
        {
          type === 'favorites' ?
            recipes.map((item, index) => (
              <RecipeTableListingRow
                recipe={item.Recipe}
                type="favorites"
                asOwner={asOwner}
                key={item.id}
                removeRecipe={removeRecipe}
                index={index}
              />))
            :
            recipes.map((recipe, index) => (
              <RecipeTableListingRow
                recipe={recipe}
                type="personal-recipes"
                asOwner={asOwner}
                key={recipe.id}
                index={index}
                removeRecipe={removeRecipe}
              />))
        }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2">
            <ul className="pagination">
              <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
              <li className="active"><a href="#!">1</a></li>
              <li className="waves-effect"><a href="#!">2</a></li>
              <li className="waves-effect"><a href="#!">3</a></li>
              <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
            </ul>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

RecipeTableListingRow.propTypes = {
  ...propTypes,
  recipe: PropTypes.shape(recipePropTypes).isRequired
};

RecipeTableListing.propTypes = {
  ...propTypes,
  recipes: PropTypes.arrayOf(PropTypes.shape(recipePropTypes)).isRequired
};

export default RecipeTableListing;
