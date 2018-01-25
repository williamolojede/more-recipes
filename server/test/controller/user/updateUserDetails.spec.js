import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken, janeToken }
} = testSetup;

describe('Update users details', () => {
  const updateUrl = `${rootURL}/users/1`;
  tokenAuthentication(request, 'put', updateUrl, expect);

  it('should reject request if update field is not provided', (done) => {
    request.put(updateUrl)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Update property required or can not be empty');
        done();
      });
  });

  it('should reject request if update request is not made by account owner', (done) => {
    request.put(updateUrl)
      .send({ token: janeToken, update: { fullname: 'Fake Name' } })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Not authorized to modify this user');
        done();
      });
  });

  it('should return 404 if user is not found', (done) => {
    request.put(`${rootURL}/users/100`)
      .send({ token: johnToken, update: { fullname: 'Fake Name' } })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('User not found');
        done();
      });
  });

  it('should reject request if update field has invalid key name(s)', (done) => {
    request.put(updateUrl)
      .send({ token: johnToken, update: { test: 'Fake Name' } })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Invalid property name(s) on update object');
        done();
      });
  });

  it('should reject request if user provides email address that has been taken', (done) => {
    request.put(updateUrl)
      .send({ token: johnToken, update: { email: 'janet_doe@gmail.com' } })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('User with email already exists');
        done();
      });
  });

  it('should sucessfully update user details', (done) => {
    request.put(updateUrl)
      .send({ token: johnToken, update: { email: 'johndoe_new@mailer.com' } })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('User Details updated successfully');
        expect(res.body.user.email).to.equal('johndoe_new@mailer.com');
        done();
      });
  });
});
