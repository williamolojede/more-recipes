import PropTypes from 'prop-types';

export const authPropTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.object
    })
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

// AuthForm Component
export const authFormPropTypes = {
  type: PropTypes.string.isRequired,
  authFormSubmit: PropTypes.func.isRequired,
};

// ErrorDisplay Component
export const errorDisplayPropTypes = {
  message: PropTypes.string.isRequired
};

// TopRatedRecipeList Component
export const topRatedRecipeListPropTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

// RecipeCard Component
// NOTE: not all keys are checked since they'll also be checked in `RecipeCardInfo`
export const recipeCardPropTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img_url: PropTypes.string
  }).isRequired
};

// RecipeCardInfo Component
export const recipeCardInfoPropTypes = {
  info: PropTypes.shape({
    User: PropTypes.shape({
      imgUrl: PropTypes.string,
      fullname: PropTypes.string.isRequired
    }).isRequired,
    upVoteCount: PropTypes.number.isRequired,
    downVoteCount: PropTypes.number.isRequired,
    favoriteCount: PropTypes.number.isRequired,
    viewCount: PropTypes.number.isRequired,
  }).isRequired
};

// Home Component
export const homePagePropTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
