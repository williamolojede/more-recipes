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

// User Prototype
export const userPrototypes = {
  fullname: PropTypes.string.isRequired,
  imgUrl: PropTypes.string
};

export const userImgPropTypes = {
  user: PropTypes.shape(userPrototypes).isRequired,
  type: PropTypes.string.isRequired
};


export const reviewPropTypes = {
  review: PropTypes.shape({
    content: PropTypes.string.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      fullname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
};

export const recipePropTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    reviews: PropTypes.arrayOf(reviewPropTypes.review),
    upVoteCount: PropTypes.number.isRequired,
    downVoteCount: PropTypes.number.isRequired,
    favoriteCount: PropTypes.number.isRequired,
    viewCount: PropTypes.number.isRequired
  }).isRequired,
};

