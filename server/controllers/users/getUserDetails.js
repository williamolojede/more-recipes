import { User, Recipe, Favorite } from '../../models';
import systemErrorHandler from '../../helpers/systemErrorHandler';

const getUserDetails = (req, res, next) => {
  const { userID } = req;
  const { uid } = req.params;

  const asOwner = (userID === parseInt(uid, 10));
  User.findOne({
    where: { id: req.params.uid },
    include: [
      { model: Recipe, as: 'recipes' },
      { model: Favorite, as: 'favorites', include: { model: Recipe } }
    ]
  })
    .then((user) => {
      const userDetails = Object.assign({}, user.dataValues);
      delete userDetails.password;

      return res.send({
        status: 'success',
        message: 'user found',
        user: userDetails,
        asOwner
      });
    })
    .catch(error => systemErrorHandler(error, next));
};

export default getUserDetails;
