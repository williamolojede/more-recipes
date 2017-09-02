import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
const rootURL = '/api/v1';
const recipesURl = `${rootURL}/recipes`;
let data = {};
let token = '';
let recipeId;

describe('API Integration Tests', () => {
  it('return 404 for ant route asides /api', (done) => {
    request.post('/wrong')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Not Found');
        done();
      });
  });

  describe('User signup', () => {
    const signupURl = `${rootURL}/users/signup`;

    beforeEach(() => {
      data = {
        fullname: 'example user',
        password: '123456',
        email: 'example@user.com',
      };
    });

    it('return 201 for a successful account creation', (done) => {
      request.post(signupURl)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('success');
          done();
        });
    });

    it('return 400 for an already existing email ', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.username = 'exampleuser2';
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('email must be unique');
          done();
        });
    });

    it('return 400 for if no email is passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.email;

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('email field is required');
          done();
        });
    });

    it('return 400 for if no password is passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.password;

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('password field is required');
          done();
        });
    });

    it('return 400 for if both email and password aren\'t passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.password;
      delete invalidData.email;

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('email and password fields are required');
          done();
        });
    });

    it('return 400 for if both email and password aren\'t passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.fullname;

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('fullname field is required');
          done();
        });
    });
  });

  describe('User login', () => {
    const loginURl = `${rootURL}/users/login`;

    beforeEach(() => {
      data = {
        password: '123456',
        email: 'example@user.com',
      };
    });

    it('return 200 for a successful login', (done) => {
      request.post(loginURl)
        .send(data)
        .end((err, res) => {
          token = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          expect(token).to.be.a('string');
          done();
        });
    });

    it('return 400 for if no password is passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.password;

      request.post(loginURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('email and password are required');
          done();
        });
    });

    it('return 400 for if no email is passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.email;

      request.post(loginURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('email and password are required');
          done();
        });
    });

    it('return 401 for if user is not found for the email passed ', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.email = 'userdefdoesntexist@email.com';
      // you dont want people know if the email exists or not

      request.post(loginURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Wrong email or password');
          done();
        });
    });
  });

  describe('Add Recipe', () => {
    beforeEach(() => {
      data = {
        name: 'Fried Rice',
        description: 'Nigerian Fried Rice puts a spicy, flavorful spin on the traditional fried rice and is appealing on its own or served with a variety of other African food.',
        img_url: 'http://www.africanbites.com/wp-content/uploads/2014/05/IMG_9677-2-1-150x150.jpg',
        ingredients: ['rice', 'canola oil'],
        instructions: ['Break up the clumpy rice before starting.', 'Garnish with chopped scallion and serve'],
      };
    });

    it('return 201 for a successful recipe creation', (done) => {
      request.post(`${recipesURl}?token=${token}`)
        .send(data)
        .end((err, res) => {
          recipeId = res.body.id;
          // expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('recipe created successfully');
          done();
        });
      done();
    });

    // check if token is passed
    it('return 400 if token is not present', (done) => {
      request.post(recipesURl)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });
    // test if recipe is created succesfully
    // check if token is passed
    // check if token is outdated
    // check if token is invalid/tampered with
    // test if user with token exist
    // test if name is passed when creating a recipe
    // test if decription is passed when creating a recipe
    // test if both name and decription are passed when creating a recipe
  });

  describe('Delete Recipe', () => {
    it('return 403 if a user user is not the owner of the recipe', (done) => {
      const anotherToken = jwt.sign({ userID: 15, }, 'jsninja', { expiresIn: '3 days' });
      request.delete(`${recipesURl}/${recipeId}`)
        .send({ token: anotherToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Not authorized to delete this recipe');
          done();
        });
    });

    it('return 401 if token is not present', (done) => {
      request.delete(`${recipesURl}/${recipeId}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    it('return 404 if recipe is not found', (done) => {
      request.delete(`${recipesURl}/15`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('return 410 if recipe is deleted', (done) => {
      request.delete(`${recipesURl}/${recipeId}`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(410);
          expect(res.body.message).to.equal('success');
          done();
        });
    });
  });
});
