import { Recipe, Review, User } from '../models/index';

const findRecipe = id => Recipe.findById(id, {
  include: [
    {
      model: Review,
      as: 'reviews',
      include: [
        { model: User, attributes: ['id', 'username', 'fullname'] }
      ]
    },
    { model: User, attributes: ['id', 'username', 'fullname'] }
  ],
  order: [[{ model: Review, as: 'reviews' }, 'id', 'DESC']]
});

export default findRecipe;
