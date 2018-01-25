import testSetup from '../test-utils/test-setup';
import { Vote } from '../../models';

const { expect } = testSetup;

describe('Vote model', () => {
  let voteData;
  beforeEach(() => {
    voteData = {
      userId: 1,
      recipeId: 2,
      voteType: 'up'
    };
  });

  it('should create a vote model object', (done) => {
    Vote.create(voteData)
      .then((vote) => {
        expect(vote).to.instanceof(Object);
        expect(vote.userId).to.equal(voteData.userId);
        expect(vote.recipeId).to.equal(voteData.recipeId);
        expect(vote.voteType).to.equal(voteData.voteType);
        done();
      });
  });

  it('should throw an error when userId is null', () => {
    Vote.create({ ...voteData, userId: null })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
      });
  });

  it('should throw an when voteType is null', () => {
    Vote.create({ ...voteData, voteType: null })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
      });
  });

  it('should throw an error when recipeId is null', () => {
    Vote.create({ ...voteData, recipeId: null })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
      });
  });
});
