import express from 'express';
import jwt from 'jsonwebtoken';
import { Recipe } from '../models/index';

const router = express.Router();

router.get('/', (req, res, next) => {
  Recipe.findAll()
    .then(recipes => res.status(200).json(recipes))
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 400;
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { token } = req.query;
  const decoded = jwt.decode(token);

  const { name, description, img_url, ingredients, instructions } = req.body;
  Recipe.create({
    name,
    description,
    img_url,
    ingredients,
    instructions,
    owner: decoded.user.id
  })
    .then(recipe => res.status(200).json(recipe))
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 400;
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const { token } = req.query;
  const decoded = jwt.decode(token);
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      }
      if (decoded.user.id !== recipe.owner) {
        const err = new Error('No Authorization');
        err.status = 401;
        next(err);
      }
      recipe.destroy()
        .then(output => res.status(200).send(output))
        .catch(err => console.error(err));
    })
    .catch((error) => {
      const err = new Error(error.errors[0].message);
      err.status = 401;
      next(err);
    });
});

export default router;
