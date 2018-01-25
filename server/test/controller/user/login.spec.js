import testSetup from '../../test-utils/test-setup';

const {
  rootURL,
  request,
  jwt,
  expect
} = testSetup;

describe('User login', () => {
  const loginURl = `${rootURL}/users/login`;

  it('should return a success message after sucessfully authenicating user', (done) => {
    request.post(loginURl)
      .send({
        user: {
          password: 'john_doe',
          email: 'john_doe@gmail.com',
        }
      })
      .end((err, res) => {
        const { user } = jwt.decode(res.body.token);

        // Ensures that only the id is used to create the token
        expect(Object.keys(user).length).to.equal(1);
        expect(user.id).to.equal(res.body.user.id);

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('You are successfully logged in');
        expect(res.body.user.id).to.equal(1);
        expect(res.body.user.email).to.equal('john_doe@gmail.com');
        expect(res.body.token).to.be.a('string');
        done();
      });
  });

  it('should not login user if password is not correct', (done) => {
    request.post(loginURl)
      .send({
        user: {
          password: 'wrongpassword',
          email: 'john_doe@gmail.com',
        }
      })
      .end((err, res) => {
        const wrongPasswordToken = res.body.token;
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Wrong email or password');
        expect(wrongPasswordToken).to.be.a('undefined');
        done();
      });
  });

  it('should not login user if user field is not provided', (done) => {
    request.post(loginURl)
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('User property is required on request body, see documentation!');
        done();
      });
  });

  it('should not login user if password is not provided', (done) => {
    request.post(loginURl)
      .send({
        user: {
          email: 'john_doe@gmail.com'
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email and password are required');
        done();
      });
  });

  it('should not login user if email address is not provided', (done) => {
    request.post(loginURl)
      .send({
        user: {
          password: 'john_doe'
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email and password are required');
        done();
      });
  });

  it('should not login user if email address use doesnot exist on our databse', (done) => {
    request.post(loginURl)
      .send({
        user: {
          email: 'userdefdoesntexist@email.com',
          password: 'john_doe'
        }
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Wrong email or password');
        done();
      });
  });
});
