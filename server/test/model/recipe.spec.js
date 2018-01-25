import testSetup from '../test-utils/test-setup';
import { Recipe } from '../../models';

const { expect } = testSetup;


describe('Recipe model', () => {
  let recipeData;
  const validationError = 'SequelizeValidationError';

  beforeEach(() => {
    recipeData = {
      name: 'Fried Rice',
      description: 'Nigerian Fried Rice puts a spicy, flavorful spin on the traditional fried rice and is appealing on its own or served with a variety of other African food.',
      img_url: 'http://www.africanbites.com/wp-content/uploads/2014/05/IMG_9677-2-1-150x150.jpg',
      ingredients: ['rice', 'canola oil'],
      instructions: ['Break up the clumpy rice before starting.', 'Garnish with chopped scallion and serve'],
    };
  });

  it('should create a recipe model object', (done) => {
    Recipe.create(recipeData)
      .then((recipe) => {
        expect(recipe).to.instanceof(Object);
        expect(recipe.name).to.equal(recipeData.name);
        expect(recipe.ingredients).to.eql(recipeData.ingredients);
        expect(recipe.directions).to.eql(recipeData.directions);
        expect(recipe.img_url).to.equal(recipeData.img_url);
        expect(recipe.upVoteCount).to.equal(0);
        expect(recipe.downVoteCount).to.equal(0);
        expect(recipe.favoriteCount).to.equal(0);
        expect(recipe.viewCount).to.equal(0);
        done();
      });
  });

  it('should throw an error when recipe name is null', () => {
    Recipe.create({ ...recipeData, name: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when description is null', () => {
    Recipe.create({ ...recipeData, description: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when ingredients is null', () => {
    Recipe.create({ ...recipeData, ingredients: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when instructions is null', () => {
    Recipe.create({ ...recipeData, instructions: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when recipe name  is an empty string', () => {
    Recipe.create({ ...recipeData, name: '' })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
        expect(error.errors[0].message).to.equal('Recipe name can not be empty');
      });
  });

  it('should throw an error when description is an empty string', () => {
    Recipe.create({ ...recipeData, description: '' })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
        expect(error.errors[0].message).to.equal('recipe description can not be empty');
      });
  });

  it('should throw an error when img_url is an empty string', () => {
    Recipe.create({ ...recipeData, img_url: '' })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
        expect(error.errors[0].message).to.equal('recipe img url can not be empty');
      });
  });

  it('should throw an error when ingredients is an array of empty string', () => {
    Recipe.create({ ...recipeData, ingredients: [''] })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
        expect(error.errors[0].message).to.equal('recipe ingredients can not be empty');
      });
  });

  it('should throw an error when instructions is an array of empty string', () => {
    Recipe.create({ ...recipeData, instructions: [''] })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
        expect(error.errors[0].message).to.equal('recipe instructions can not be empty');
      });
  });
});
