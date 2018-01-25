import testSetup from '../test-utils/test-setup';
import { Review } from '../../models';

const { expect } = testSetup;

const validationError = 'SequelizeValidationError';

describe('Review model', () => {
  let reviewData;
  beforeEach(() => {
    reviewData = {
      content: 'you stole my moms recipe dawg',
      userId: 1,
      recipeId: 2
    };
  });

  it('should create a review model object', (done) => {
    Review.create(reviewData)
      .then((review) => {
        expect(review).to.instanceof(Object);
        expect(review.content).to.equal(reviewData.content);
        expect(review.userId).to.equal(reviewData.userId);
        expect(review.recipeId).to.equal(reviewData.recipeId);
        done();
      });
  });

  it('should throw an error when review is null', () => {
    Review.create({ ...reviewData, review: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when content is an empty string', () => {
    Review.create({ ...reviewData, content: '' })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
        expect(error.errors[0].message).to.equal('the content of your review can not be empty');
      });
  });

  it('should throw an error when user id is null', () => {
    Review.create({ ...reviewData, userId: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });

  it('should throw an error when recipe id is null', () => {
    Review.create({ ...reviewData, recipeId: null })
      .catch((error) => {
        expect(error.name).to.equal(validationError);
      });
  });
});
