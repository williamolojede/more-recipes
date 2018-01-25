import testSetup from '../../test-utils/test-setup';

const {
  rootURL,
  request,
  jwt,
  expect
} = testSetup;

describe('User signup', () => {
  const signupURl = `${rootURL}/users/signup`;

  it('should return a success message after a successful account creation', (done) => {
    request.post(signupURl)
      .send({
        user: {
          fullname: 'John Doe',
          password: '123456',
          email: 'johndoe@mailer.com'
        }
      })
      .end((err, res) => {
        const { user } = jwt.decode(res.body.token);

        // Ensures that only the id is used to create the token
        expect(Object.keys(user).length).to.equal(1);
        expect(user.id).to.equal(res.body.user.id);

        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Account created');
        expect(res.body.token).to.be.a('string');
        expect(res.body.user.id).to.equal(5);
        expect(res.body.user.email).to.equal('johndoe@mailer.com');
        expect(res.body.user.fullname).to.equal('John Doe');
        done();
      });
  });

  it('should not create account if email address is already taken', (done) => {
    request.post(signupURl)
      .send({
        user: {
          fullname: 'Jane Kim',
          password: '123456',
          email: 'johndoe@mailer.com',
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('User with email already exists');
        done();
      });
  });

  it('should not create account if email address is not provided', (done) => {
    request.post(signupURl)
      .send({
        user: {
          fullname: 'John Doe',
          password: '123456',
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email field is required');
        done();
      });
  });

  it('should not create account if email address field contains only whitespace(s)', (done) => {
    request.post(signupURl)
      .send({
        user: {
          fullname: 'John Doe',
          password: '123456',
          email: ' ',
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email can not be empty');
        done();
      });
  });

  it('should not create account if password contains only whitespace(s)', (done) => {
    request.post(signupURl)
      .send({
        user: {
          fullname: 'John Doe',
          password: '  ',
          email: 'johndoe@mailer.com',
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Password can not be empty');
        done();
      });
  });

  it('should not create return 400 for if password is less than 6 characters', (done) => {
    request.post(signupURl)
      .send({
        user: {
          fullname: 'John Doe',
          password: '12345',
          email: 'johndoe@mailer.com',
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Password must be minimum of 6 characters');
        done();
      });
  });

  it('should not create account if password field is not provided', (done) => {
    request.post(signupURl)
      .send({
        user: {
          fullname: 'John Doe',
          email: 'johndoe@mailer.com',
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Password field is required');
        done();
      });
  });

  it('should not create account if both email and password are not provided', (done) => {
    request.post(signupURl)
      .send({
        user: {
          fullname: 'John Doe'
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Email and password fields are required');
        done();
      });
  });

  it('should not create account if fullname is not provided', (done) => {
    request.post(signupURl)
      .send({
        user: {
          password: '1234567890',
          email: 'johndoe@mailer.com',
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Fullname field is required');
        done();
      });
  });
});
