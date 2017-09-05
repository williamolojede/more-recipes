import { Recipe, Vote, User, Favorite } from '../../models/index';
/**
 * @param  {array} arr (of objects)
 * @param  {string} key
 * @param  {string} val
 * @return  {number} count
 */
const count = (arr, key, val) => {
  // check if arr is empty
  if (arr.length === 0) return 0;
  // check if key and val doesn't exist
  if (key === null && val === null) return arr.length;
  // counts the number of objects whose value and the passed value matches
  return arr.filter(el => el[key] === val).length;
};

/**
 * @param  {array} arr - array of objects to be sorted
 * @param  {string} dir - the direction to sort(ascending or descending)
 * @param  {function} callback - callback function
 * @return {array} sorted - the newly sorted array
 */
const sortRecipesByVote = (arr, dir, callback) => {
  // check if arr is empty
  if (arr.length === 0) return arr;
  if (dir !== 'ascending' && dir !== 'descending') {
    const err = new Error('invalid sort order');
    err.status = 400;
    return callback(err);
  }
  const sorted = arr.sort((a, b) => {
    if (dir === 'ascending') {
      if (a.upVote === b.upVote) return a.updatedAt - b.updatedAt;
      return a.upVote - b.upVote;
    }
    // if its descending
    if (a.upVote === b.upVote) return b.updatedAt - a.updatedAt;
    return b.upVote - a.upVote;
  });
  callback(null, sorted);
};

/** Class representing a recipe. */
class RecipeBody {
  /**
   * @param  {string} name - Recipe name
   * @param  {string} description - Recipe description
   * @param  {string} imgUrl - Recipe image url
   * @param  {array} ingredients - Recipe ingredients list
   * @param  {array} instructions - Recipe instructions list
   * @param  {object} owner - User information - id, fullname and user img if it exist
   * @param  {array} reviews - Recipe review list
   * @param  {number} favorites - Recipe favorites count
   * @param  {number} viewCount - Recipe view count
   * @param  {number} upVote - Recipe upvote count
   * @param  {number} downVote - Recipe downvote count
   * @param  {number} id - Recipe id
   * @param  {time} createdAt - Recipe time of creation
   * @param  {time} updatedAt - Recipe time of update
   */
  constructor(name, description, imgUrl, ingredients, instructions,
    owner, reviews, favorites, viewCount, upVote, downVote, id,
    createdAt, updatedAt) {
    this.name = name;
    this.description = description;
    this.imgUrl = imgUrl;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.owner = owner;
    this.reviews = reviews;
    this.favorites = favorites;
    this.viewCount = viewCount;
    this.upVote = upVote;
    this.downVote = downVote;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
const getAllRecipe = (req, res, next) => {
  Recipe.findAll({ include: [{ model: Vote, as: 'votes' }, { model: User }, { model: Favorite, as: 'favorites' }] })
    .then((recipes) => {
      const buffer = [];
      const { sort, order } = req.query;
      recipes.forEach((el) => {
        buffer.push(new RecipeBody(
          el.name,
          el.description,
          el.img_url,
          el.ingredients,
          el.instructions,
          { id: el.User.id, fullname: el.User.fullname },
          null,
          count(el.favorites),
          null,
          count(el.votes, 'voteType', 'up'),
          count(el.votes, 'voteType', 'down'),
          el.id,
          el.createdAt,
          el.updatedAt
        ));
      });
      //  if query is passed
      if (sort && order) {
        return sortRecipesByVote(buffer, order, (err, sorted) => {
          if (!err) return res.status(200).send({ recipes: sorted, message: 'success' });
          return next(err);
        });
      }
      return res.status(200).send({ recipes: buffer, message: 'success' });
    })
    .catch((error) => {
      const err = new Error(error);
      err.status = 500;
      next(err);
    });
};
export default getAllRecipe;
