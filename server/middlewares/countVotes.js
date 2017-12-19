import { Vote, Recipe } from '../models/index';
import systemErrorHandler from '../helpers/systemErrorHandler';

const count = (req, res, next) => {
  const { id } = req.params;

  Vote.findAll({ where: { recipeId: id } })
    .then((votes) => {
      // count votes
      const upVoteCount = votes.filter(vote => vote.dataValues.voteType === 'up').length;
      const downVoteCount = votes.filter(vote => vote.dataValues.voteType === 'down').length;
      return { upVoteCount, downVoteCount };
    })
    .then(({ upVoteCount, downVoteCount }) => {
      // find recipe and update its values
      let message = req.direction === 'up' ? 'You liked this recipe' : 'You disliked this recipe';

      if (req.sameDirection) {
        message = 'Vote removed';
      }

      Recipe.findById(id)
        .then(recipe => recipe.update({ upVoteCount, downVoteCount })
          .then(newRecipe => res.status(200).send({ recipe: newRecipe, status: 'success', message })))
        .catch(error => systemErrorHandler(error, next));
    })
    .catch(error => systemErrorHandler(error, next));
};

export default count;
