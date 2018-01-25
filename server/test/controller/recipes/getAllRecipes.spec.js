import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken }
} = testSetup;

describe('Get all recipes', () => {
  const recipesUrl = `${rootURL}/recipes`;

  tokenAuthentication(request, 'get', recipesUrl, expect);

  it('should return a paginated list of all recipes', (done) => {
    request.get(recipesUrl)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.recipes).to.be.a('array');
        expect(res.body.status).to.equal('success');
        expect(res.body.recipes.length).to.equal(res.body.pagination.pageSize);
        expect(res.body.pagination.last).to.equal(1);
        expect(res.body.pagination.totalCount).to.equal(4);
        done();
      });
  });

  // SORTED LIST OF ALL RECIPES
  it('return 400 for a wrong sort order', (done) => {
    request.get(`${recipesUrl}?sort=upvotes&order=somewrongorder`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid sort order');
        done();
      });
  });

  it('should return 400 for a wrong sort order', (done) => {
    request.get(`${recipesUrl}?sort=notupvoteordownvote&order=descending`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('invalid sort type');
        done();
      });
  });

  it('should return 200 for successfully returning a sorted recipe list', (done) => {
    request.get(`${recipesUrl}?sort=upvotes&order=descending&page=1&limit=2`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('success');
        expect(res.body.recipes.length).to.equal(res.body.pagination.pageSize);
        expect(res.body.pagination.last).to.equal(2);
        expect(res.body.pagination.totalCount).to.equal(4);
        done();
      });
  });

  // Search
  it('should return list of recipes that match search term by name', (done) => {
    request.get(`${recipesUrl}?search=Fried+Rice`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.recipes.length).to.equal(1);
        done();
      });
  });

  it('should return list of recipes that match search term by ingredient name', (done) => {
    request.get(`${recipesUrl}?search=canola+oil`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.recipes.length).to.equal(1);
        done();
      });
  });
});
