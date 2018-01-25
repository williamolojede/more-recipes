import jwt from 'jsonwebtoken';

const tokenAuthentication = (request, method, url, expect) => {
  const invalidToken = jwt.sign({ user: { id: 15 } }, process.env.JWT_SECRET, { expiresIn: '3 days' });
  const expiredToken = jwt.sign({ user: { id: 15 } }, process.env.JWT_SECRET, { expiresIn: '2s' });

  describe('token authentication', () => {
    // check if token is passed
    it('return 400 if token is not present', (done) => {
      request[method](url)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    it('return 403 for expired user token used', (done) => {
      setTimeout(() => {
        request[method](url)
          .send({ token: expiredToken })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('expired user authorization token');
            done();
          });
      }, 3000);
    });

    // check if token(invalid)
    it('return 403 for invalid user token used', (done) => {
      request[method](url)
        .send({ token: `${invalidToken}hfdgnh` })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    // check if a is token(invalid) it seems right but doesn't map to any user on the db
    it('return 403 for invalid user token used', (done) => {
      request[method](url)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });
  });
};

export default tokenAuthentication;
