import { Vote } from '../../models/index';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const voteRecipe = (req, res, next) => {
  const { dir, id } = req.params;
  const { userID } = req;
  // validate vote url
  if (dir !== 'down' && dir !== 'up') {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  }

  // abstracted the vote creation so i'm not duplicating the code
  const createVote = (userId, recipeId, voteType) => Vote.create({ userId, recipeId, voteType })
    .then(() => {
      req.direction = dir;
      next();
    })
    .catch(error => systemErrorHandler(error, next));

  // find all votes for the current recipes
  Vote.findAll({ where: { recipeId: id } })
    .then((votes) => {
      // check if the votes table is empty i:e its the first vote for the recipe
      // don't do any checking
      if (votes.length === 0) {
        return createVote(userID, id, dir);
      }

      // get list of voters for a recipe
      const alreadyVoted = [];
      votes.forEach((el) => {
        alreadyVoted.push(el.dataValues.userId);
      });

      if (alreadyVoted.includes(userID)) {
        // get current user's vote
        const userVote = votes.filter(el => el.dataValues.userId === userID)[0];

        // delete the vote
        // if current votetype === previous votetype delete and
        if (userVote.dataValues.voteType === dir) {
          return Vote.findById(userVote.dataValues.id)
            .then(vote => vote.destroy())
            .then(() => {
              req.sameDirection = true;
              next();
            });
        }

        // change the vote
        // else change vote type
        return Vote.findById(userVote.dataValues.id)
          .then(vote => vote.update({ voteType: dir }))
          .then(() => {
            req.direction = dir;
            next();
          });
      }

      createVote(userID, id, dir);
    });
};

export default voteRecipe;
