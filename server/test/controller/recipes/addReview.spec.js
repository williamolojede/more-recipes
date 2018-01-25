import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken }
} = testSetup;

describe('Review a recipe', () => {
  const reviewsUrl = `${rootURL}/recipes/1/reviews`;
  tokenAuthentication(request, 'post', reviewsUrl, expect);

  it('should return 404 if recipe is not found', (done) => {
    request.post(`${rootURL}/recipes/15/reviews`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        done();
      });
  });

  it('should reject request if no content is passed', (done) => {
    request.post(reviewsUrl)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('the content of your review can not be empty');
        done();
      });
  });

  it('should reject requeset if content is passed but is an empty string', (done) => {
    request.post(reviewsUrl)
      .send({ token: johnToken, content: '     ' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('the content of your review can not be empty');
        done();
      });
  });

  it('should create review and return a paginated list of all reviews for that recipe', (done) => {
    request.post(reviewsUrl)
      .send({ token: johnToken, content: 'i created a shitty recipe' })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.reviews).to.be.a('array');
        expect(res.body.reviews.length).to.be.equal(1);
        expect(res.body.reviews[0].content).to.be.equal('i created a shitty recipe');
        expect(res.body.message).to.equal('Your review has been recorded');
        expect(res.body.pagination.pageSize).to.equal(1);
        done();
      });
  });
});
