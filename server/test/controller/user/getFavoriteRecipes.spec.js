import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';


const {
  rootURL,
  request,
  expect,
  tokens: { johnToken, janeToken }
} = testSetup;

describe('Get all user\'s favorite recipe(s)', () => {
  tokenAuthentication(request, 'get', `${rootURL}/users/1/favorites`, expect);

  // user doesn't exist
  it('should return 404 for a non existing user id', (done) => {
    request.get(`${rootURL}/users/100/favorites`)
      .send({ token: janeToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('User not found');
        done();
      });
  });

  // user has no favorites
  it('should return a paginated list of users favorite recipes', (done) => {
    request.get(`${rootURL}/users/1/favorites`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.recipes).to.be.a('array');
        expect(res.body.recipes.length).to.equal(1);
        expect(res.body.status).to.equal('success');
        expect(res.body.pagination.pageSize).to.equal(1);
        done();
      });
  });
});
