import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken, janeToken }
} = testSetup;

describe('Get User Detail', () => {
  const userDetailsUrl = `${rootURL}/users/1`;

  tokenAuthentication(request, 'get', userDetailsUrl, expect);

  it('should send error message when userId provided is invalid(less than 1)', (done) => {
    request.get(`${rootURL}/users/-15`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal("-15 isn't a valid User id value, see documentation!");
        done();
      });
  });

  it('should send error message when userId provided is invalid(not a number)', (done) => {
    request.get(`${rootURL}/users/giberrish`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal("giberrish isn't a valid User id value, see documentation!");
        done();
      });
  });

  it('should respond with 404 if user is not found', (done) => {
    request.get(`${rootURL}/users/1000`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        done();
      });
  });

  it('should respond with user detail when user is found(requested by another user)', (done) => {
    request.get(userDetailsUrl)
      .send({ token: janeToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.user).to.be.a('object');
        expect(res.body.user.username).to.be.a('null');
        expect(res.body.user.imgUrl).to.be.a('null');
        expect(res.body.user.email).to.equal('john_doe@gmail.com');
        expect(res.body.user.fullname).to.equal('John Doe');
        expect(res.body.user.id).to.equal(1);
        expect(res.body.message).to.equal('user found');
        expect(res.body.asOwner).to.equal(false);
        done();
      });
  });

  it('should respond with user detail when a user is found(requested by the user)', (done) => {
    request.get(userDetailsUrl)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.user).to.be.a('object');
        expect(res.body.user.username).to.be.a('null');
        expect(res.body.user.imgUrl).to.be.a('null');
        expect(res.body.user.email).to.equal('john_doe@gmail.com');
        expect(res.body.user.fullname).to.equal('John Doe');
        expect(res.body.user.id).to.equal(1);
        expect(res.body.message).to.equal('user found');
        expect(res.body.asOwner).to.equal(true);
        done();
      });
  });
});
