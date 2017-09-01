import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
const rootURL = '/api/v1';
let userdata = {};

describe('API Integration Tests', () => {
  describe('User signup', () => {
    const signupURl = `${rootURL}/users/signup`;

    beforeEach(() => {
      userdata = {
        fullname: 'example user',
        password: '123456',
        email: 'example@user.com',
      };
    });

    it('return 201 for a successful account creation', (done) => {
      request.post(signupURl)
        .send(userdata)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('success');
          done();
        });
    });

    it('return 400 for an already existing email ', (done) => {
      const invalidUserData = Object.assign({}, userdata);
      invalidUserData.username = 'exampleuser2';
      request.post(signupURl)
        .send(invalidUserData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('email must be unique');
          done();
        });
    });
  });
});
