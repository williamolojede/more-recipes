import testSetup from '../test-utils/test-setup';
import { View } from '../../models';

const { expect } = testSetup;

describe('View model', () => {
  let viewData;
  beforeEach(() => {
    viewData = {
      userId: 1,
      recipeId: 2,
    };
  });

  it('should create a view model object', (done) => {
    View.create(viewData)
      .then((view) => {
        expect(view).to.instanceof(Object);
        expect(view.userId).to.equal(viewData.userId);
        expect(view.recipeId).to.equal(viewData.recipeId);
        done();
      });
  });

  it('should throw an error when user id is null', () => {
    View.create({ ...viewData, userId: null })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
      });
  });

  it('should throw an error when recipe id is null', () => {
    View.create({ ...viewData, recipeId: null })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
      });
  });
});
