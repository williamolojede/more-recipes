import testSetup from '../test-utils/test-setup';
import { Favorite } from '../../models';

const { expect } = testSetup;

describe('Favorite model', () => {
  let favoriteData;
  beforeEach(() => {
    favoriteData = {
      userId: 1,
      recipeId: 2,
    };
  });

  it('should create a view model object', (done) => {
    Favorite.create(favoriteData)
      .then((favorite) => {
        expect(favorite).to.instanceof(Object);
        expect(favorite.userId).to.equal(favoriteData.userId);
        expect(favorite.recipeId).to.equal(favoriteData.recipeId);
        done();
      });
  });

  it('should throw an error when user id is null', () => {
    Favorite.create({ ...favoriteData, userId: null })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
      });
  });

  it('should throw an error when recipe id is null', () => {
    Favorite.create({ ...favoriteData, recipeId: null })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
      });
  });
});
