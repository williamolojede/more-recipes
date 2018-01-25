import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';


const {
  rootURL,
  request,
  expect,
  tokens: { johnToken }
} = testSetup;

describe('Get all user\'s personal recipe(s)', () => {
  tokenAuthentication(request, 'get', `${rootURL}/users/1/recipes`, expect);

  it('should return 404 for a non existing user id', (done) => {
    request.get(`${rootURL}/users/100/recipes`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('User not found');
        done();
      });
  });

  it('should return a paginated list of users personal recipes', (done) => {
    request.get(`${rootURL}/users/1/recipes`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.recipes).to.be.a('array');
        expect(res.body.status).to.equal('success');
        // look at the order of test
        expect(res.body.pagination.pageSize).to.equal(2);
        done();
      });
  });
});
