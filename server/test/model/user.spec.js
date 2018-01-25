import testSetup from '../test-utils/test-setup';
import { User } from '../../models';

const { expect } = testSetup;

describe('User model', () => {
  let userData;
  beforeEach(() => {
    userData = {
      fullname: 'john doe',
      email: 'john_doe@gmail.com',
      password: 'password'
    };
  });

  it('should create a user model object', (done) => {
    User.create({ ...userData })
      .then((user) => {
        expect(user).to.instanceof(Object);
        expect(user.imgUrl).to.equal(null);
        expect(user.fullname).to.equal(userData.fullname);
        expect(user.email).to.equal(userData.email);
        expect(user.password).not.to.equal(userData.password);
        done();
      });
  });

  it('should throw an error when fullname is null', (done) => {
    User.create({ ...userData, fullname: null })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        done();
      });
  });

  it('should throw an error when imgUrl is an empty string', () => {
    User.create({ ...userData, imgUrl: '' })
      .catch((error) => {
        expect(error.errors[0].message).to.equal('user img url can not be empty');
      });
  });


  describe('Email', () => {
    before((done) => {
      User.create({ ...userData, email: 'email@email.com' })
        .then(() => {
          done();
        });
    });

    it('should throw an error when email is null', (done) => {
      User.create({ ...userData, email: null })
        .catch((error) => {
          expect(error.name).to.equal('SequelizeValidationError');
          done();
        });
    });

    it('should throw an error when email is not unique', (done) => {
      User.create({ ...userData, email: '' })
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Email can not be empty');
          done();
        });
    });

    it('should throw an error when email is not unique', (done) => {
      User.create({ ...userData, email: 'email@email.com' })
        .catch((error) => {
          expect(error.errors[0].message).to.equal('User with email already exists');
          done();
        });
    });

    it('should throw an error when email is not valid', (done) => {
      User.create({ ...userData, email: 'emailemail.com' })
        .catch((error) => {
          expect(error.errors[0].message).to.equal('enter a valid email address');
          done();
        });
    });
  });
});
