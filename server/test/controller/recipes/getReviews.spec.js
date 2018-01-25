import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken }
} = testSetup;

describe('Get all reviews for a recipe', () => {
  tokenAuthentication(request, 'get', `${rootURL}/recipes/1/reviews`, expect);

  it('should return 404 if recipe is not found', (done) => {
    request.get(`${rootURL}/recipes/15/reviews`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        done();
      });
  });

  it('should return a paginated list of all reviews for the recipe', (done) => {
    request.get(`${rootURL}/recipes/1/reviews`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.reviews.length).to.equal(1);
        expect(res.body.reviews[0].content).to.equal('i created a shitty recipe');
        expect(res.body.reviews[0].User.id).to.equal(1);
        expect(res.body.pagination.pageSize).to.equal(1);
        done();
      });
  });
});
