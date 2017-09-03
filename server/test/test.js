import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
const rootURL = '/api/v1';
const recipesURl = `${rootURL}/recipes`;
let data = {};
// only used to test actions that requires a logged in user
let userdata2;
let token = '';
let userToken2;
// invalid because it won't exist on the user table
const invalidToken = jwt.sign({ userID: 15, }, 'jsninja', { expiresIn: '3 days' });
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

    // another user signup
    it('return 201 for a successful account creation', (done) => {
      userdata2 = Object.assign({}, data);
      userdata2.email = 'test@test.com';
      request.post(signupURl)
        .send(userdata2)
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
    // main user login
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

    // another user login
    it('return 200 for a successful login', (done) => {
      userdata2 = Object.assign({}, data);
      userdata2.email = 'test@test.com';
      request.post(loginURl)
        .send(userdata2)
        .end((err, res) => {
          userToken2 = res.body.token;
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

    // check if a token(invalid) not on the user table is used
    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesURl}?token=${invalidToken}`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    // check if token is outdated
    // check if token is invalid/tampered with
    // test if name is passed when creating a recipe
    it('return 400 if recipe name is not passed', (done) => {
      const noName = Object.assign({}, data);
      delete noName.name;
      request.post(`${recipesURl}?token=${token}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Recipe name is required');
          done();
        });
    });
    // test if decription is passed when creating a recipe
    it('return 400 if recipe description is not passed', (done) => {
      const noDescription = Object.assign({}, data);
      delete noDescription.description;
      request.post(`${recipesURl}?token=${token}`)
        .send(noDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Recipe description is required');
          done();
        });
    });
    // test if both name and decription are passed when creating a recipe
    it('return 400 if recipe name and description are not passed', (done) => {
      const noNameDescription = Object.assign({}, data);
      delete noNameDescription.description;
      delete noNameDescription.name;

      request.post(`${recipesURl}?token=${token}`)
        .send(noNameDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Recipe name and description are required');
          done();
        });
    });

    it('return 201 for a successful recipe creation', (done) => {
      request.post(`${recipesURl}?token=${token}`)
        .send(data)
        .end((err, res) => {
          recipeId = res.body.recipe.id;
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('success');
          done();
        });
    });
  });

  describe('Get all recipes', () => {
    // no token
    // invalid token
    // succes


    it('return 400 if token is not present', (done) => {
      request.get(`${recipesURl}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    // check if a token(invalid) not on the user table is used
    it('return 403 for invalid user token used', (done) => {
      request.get(`${recipesURl}`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    it('return 200 for successfully getting all recipes', (done) => {
      request.get(`${recipesURl}`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          expect(res.body.recipes[0].name).to.equal('Fried Rice');
          done();
        });
    });
  });

  describe('Vote {up, down} a recipe', () => {
    // if no uid => 400
    it('return 400 if no token is passed', (done) => {
      request.post(`${recipesURl}/${recipeId}/vote-up`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    it('return 400 if no token is passed', (done) => {
      request.post(`${recipesURl}/${recipeId}/vote-down`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    // check if a token(invalid) not on the user table is used
    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesURl}/${recipeId}/vote-up`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesURl}/${recipeId}/vote-down`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    // if recipe doesnt exist no vote => 404
    it('return 404 if recipe is not found', (done) => {
      request.post(`${recipesURl}/15/vote-up`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('return 404 if recipe is not found', (done) => {
      request.post(`${recipesURl}/15/vote-down`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    // if not vote-{up, down} => 404
    it('return 404 if not vote-{up, down}', (done) => {
      request.post(`${recipesURl}/${recipeId}/vote-whatever`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });

    // if owner tries to vote on his/her recipe => 403
    it('return 403 if recipe owner tries to vote', (done) => {
      request.post(`${recipesURl}/${recipeId}/vote-up`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('you are not allowed to vote on your own recipe');
          done();
        });
    });

    // if everything good => 200
    it('return 200 if another user tries to vote', (done) => {
      request.post(`${recipesURl}/${recipeId}/vote-up`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          done();
        });
    });

    // if try vote in an already vote direction => 400
    it('return 403 if trying to vote in same direction', (done) => {
      request.post(`${recipesURl}/${recipeId}/vote-up`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('vote already recorded');
          done();
        });
    });

    // if try vote in a not voted direction => 200 vote gets updated
    it('return 200 if vote is valid', (done) => {
      request.post(`${recipesURl}/${recipeId}/vote-down`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          done();
        });
    });
  });

  describe('Favorite a recipe', () => {
    // no user token => 400
    it('return 400 if no token is passed', (done) => {
      request.post(`${recipesURl}/${recipeId}/favorite`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    // invalid token(not on the user table is used) => 403
    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesURl}/${recipeId}/favorite`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    // if recipe doesnt exist => 404
    it('return 404 if recipe is not found', (done) => {
      request.post(`${recipesURl}/15/favorite`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });
    // if owner tries to favorite on his/her recipe => 403
    it('return 403 if owner tries to favorite', (done) => {
      request.post(`${recipesURl}/${recipeId}/favorite`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('you are not allowed to vote on your own recipe');
          done();
        });
    });
    // if everything good => 200
    it('return 200 if another user tries to favorite', (done) => {
      request.post(`${recipesURl}/${recipeId}/favorite`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('recipe added to your favorite list');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    // if user request again it will undo the favorite
    it('return 200 if another user tries to favorite', (done) => {
      request.post(`${recipesURl}/${recipeId}/favorite`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('recipe removed from your favorite list');
          done();
        });
    });
  });

  describe('Modify a recipe', () => {
    it('return 400 if no token is passed', (done) => {
      request.put(`${recipesURl}/${recipeId}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    it('return 403 for invalid user token used', (done) => {
      request.put(`${recipesURl}/${recipeId}`)
        .send({ token: invalidToken, update: { name: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    it('return 400 if update data is not passed', (done) => {
      request.put(`${recipesURl}/${recipeId}`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('update property required or can not be empty');
          done();
        });
    });

    it('return 403 if a user is not the owner of the recipe', (done) => {
      request.put(`${recipesURl}/${recipeId}`)
        .send({ token: userToken2, update: { name: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Not authorized to modify this recipe');
          done();
        });
    });

    it('return 404 if recipe is not found', (done) => {
      request.put(`${recipesURl}/15`)
        .send({ token, update: { name: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('return 400 update object has an invalid key name', (done) => {
      request.put(`${recipesURl}/${recipeId}`)
        .send({ token, update: { test: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('invalid property name(s) on update object');
          done();
        });
    });

    it('return 200 if the recipe is updated', (done) => {
      request.put(`${recipesURl}/${recipeId}`)
        .send({ token, update: { name: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          expect(res.body.recipe.name).to.equal('Jollof Rice');
          done();
        });
    });
  });

  describe('Delete Recipe', () => {
    it('return 403 if a user user is not the owner of the recipe', (done) => {
      request.delete(`${recipesURl}/${recipeId}`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Not authorized to delete this recipe');
          done();
        });
    });

    it('return 400 if token is not present', (done) => {
      request.delete(`${recipesURl}/${recipeId}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    it('return 403 for invalid user token used', (done) => {
      request.delete(`${recipesURl}/${recipeId}`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
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

    it('return 204 if recipe is deleted', (done) => {
      request.delete(`${recipesURl}/${recipeId}`)
        .send({ token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          done();
        });
    });
  });
});
