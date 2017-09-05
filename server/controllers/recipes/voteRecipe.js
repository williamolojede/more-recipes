import { Vote } from '../../models/index';

const voteRecipe = (req, res, next) => {
  const { dir, id } = req.params;
  const { userID } = req;
  // validate vote url
  if (dir !== 'down' && dir !== 'up') {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  }

  Vote.findAll({ where: { recipeId: id } })
    .then((votes) => {
      // check if the votes table is empty i:e its the first vote for the recipe
      if (votes.length === 0) {
        return Vote.create({
          userId: userID,
          recipeId: id,
          voteType: dir
        })
          .then(() => res.status(200).send({ message: 'success' }))
          .catch((error) => {
            const err = new Error(error);
            err.status = 500;
            return next(err);
          });
      }
      // get list of voters for a recipe
      const alreadyVoted = [];
      votes.forEach((el) => {
        alreadyVoted.push(el.dataValues.userId);
      });
      if (alreadyVoted.includes(userID)) {
        // get cuurent user's vote
        const userVote = votes.filter(el => el.dataValues.userId === userID)[0];
        // if current votetype === previous votetype => reject
        if (userVote.dataValues.voteType === dir) {
          const err = new Error('vote already recorded');
          err.status = 403;
          return next(err);
        }
        // else change vote type
        return Vote.findById(userVote.dataValues.id)
          .then(vote => vote.update({ voteType: dir }))
          .then(() => res.status(200).send({ message: 'success' }));
      }

      Vote.create({
        userId: userID,
        recipeId: id,
        voteType: dir
      })
        .then(() => res.status(200).send({ message: 'success' }))
        .catch((error) => {
          const err = new Error(error);
          err.status = 500;
          return next(err);
        });
    });
};

export default voteRecipe;
