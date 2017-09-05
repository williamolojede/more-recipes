import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
const rootURL = '/api/v1';
const recipesUrl = `${rootURL}/recipes`;
const usersUrl = `${rootURL}/users`;
let data = {};
// only used to test actions that requires a logged in user
let userdata2;
// first and second user's token
let userToken1, userToken2;
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
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('account created');
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
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('account created');
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
          userToken1 = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(userToken1).to.be.a('string');
          done();
        });
    });
    // wrong password for user 1
    it('return 401 for wrong password', (done) => {
      const wrongPassword = Object.assign({}, data);
      wrongPassword.password = 'wrongpassword';

      request.post(loginURl)
        .send(wrongPassword)
        .end((err, res) => {
          const wrongPasswordToken = res.body.token;
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Wrong email or password');
          expect(wrongPasswordToken).to.be.a('undefined');
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
          expect(res.body.status).to.equal('success');
          expect(userToken2).to.be.a('string');
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
      request.post(recipesUrl)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    // check if a token(invalid) not on the user table is used
    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesUrl}?token=${invalidToken}`)
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
      request.post(`${recipesUrl}?token=${userToken1}`)
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
      request.post(`${recipesUrl}?token=${userToken1}`)
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

      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(noNameDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Recipe name and description are required');
          done();
        });
    });

    it('return 201 for a successful recipe creation', (done) => {
      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(data)
        .end((err, res) => {
          recipeId = res.body.recipe.id;
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('recipe created successfully');
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe).to.be.a('object');
          expect(res.body.recipe.name).to.equal(data.name);
          expect(res.body.recipe.description).to.equal(data.description);
          done();
        });
    });

    // CREATE RECIPE FOR USER 2
    it('return 201 for a successful recipe creation', (done) => {
      const user2Recipe = Object.assign({}, data);
      user2Recipe.name = 'Jollof Rice';
      user2Recipe.description = 'It is simply better than ghanian jollof';

      request.post(`${recipesUrl}?token=${userToken2}`)
        .send(user2Recipe)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('recipe created successfully');
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe).to.be.a('object');
          expect(res.body.recipe.name).to.equal(user2Recipe.name);
          expect(res.body.recipe.description).to.equal(user2Recipe.description);
          done();
        });
    });
  });

  describe('Vote {up, down} a recipe', () => {
    // if no uid => 400
    it('return 400 if no token is passed', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-up`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    it('return 400 if no token is passed', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-down`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    // check if a token(invalid) not on the user table is used
    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-up`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-down`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    // if recipe doesnt exist no vote => 404
    it('return 404 if recipe is not found', (done) => {
      request.post(`${recipesUrl}/15/vote-up`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('return 404 if recipe is not found', (done) => {
      request.post(`${recipesUrl}/15/vote-down`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    // if not vote-{up, down} => 404
    it('return 404 if not vote-{up, down}', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-whatever`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });

    // if owner tries to vote on his/her recipe => 403
    it('return 403 if recipe owner tries to vote', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-up`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('you are not allowed to perform this action on your own recipe');
          done();
        });
    });

    // if everything good => 200
    it('return 200 if vote is valid', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-down`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          done();
        });
    });

    // if try vote in an already vote direction => 400
    it('return 403 if trying to vote in same direction', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-down`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('vote already recorded');
          done();
        });
    });

    // if try vote in a not voted direction => 200 vote gets updated
    it('return 200 if another user tries to vote', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-up`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
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
      request.get(`${recipesUrl}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    // check if a token(invalid) not on the user table is used
    it('return 403 for invalid user token used', (done) => {
      request.get(`${recipesUrl}`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    it('return 200 for successfully getting all recipes', (done) => {
      request.get(`${recipesUrl}`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          expect(res.body.recipes.length).to.equal(2);
          expect(res.body.recipes[0].name).to.equal('Jollof Rice');
          expect(res.body.recipes[1].name).to.equal('Fried Rice');
          expect(res.body.recipes[0].owner.id).to.equal(2);
          expect(res.body.recipes[0].downVote).to.equal(0);
          expect(res.body.recipes[0].upVote).to.equal(0);
          expect(res.body.recipes[1].upVote).to.equal(1);
          expect(res.body.recipes[1].downVote).to.equal(0);
          expect(res.body.recipes[1].owner.id).to.equal(1);
          done();
        });
    });

    // SORTED LIST OF ALL RECIPES
    it('return 400 for a wrong sort order', (done) => {
      request.get(`${recipesUrl}?sort=upvotes&order=somewrongorder`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('invalid sort order');
          done();
        });
    });
    it('return 200 for successfully returning a sorted recipe list', (done) => {
      request.get(`${recipesUrl}?sort=upvotes&order=descending`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          expect(res.body.recipes[0].name).to.equal('Fried Rice');
          done();
        });
    });
    it('return 200 for successfully returning a sorted recipe list', (done) => {
      request.get(`${recipesUrl}?sort=upvotes&order=ascending`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          expect(res.body.recipes[1].name).to.equal('Fried Rice');
          done();
        });
    });
  });

  describe('Review a recipe', () => {
    // if no uid => 400
    it('return 400 if no token is passed', (done) => {
      request.post(`${recipesUrl}/${recipeId}/reviews`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    // check if a token(invalid) not on the user table is used
    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesUrl}/${recipeId}/reviews`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    // if recipe doesnt exist no review => 404
    it('return 404 if recipe is not found', (done) => {
      request.post(`${recipesUrl}/15/reviews`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    // if owner tries to review his/her recipe => 403
    it('return 403 if recipe owner tries to review', (done) => {
      request.post(`${recipesUrl}/${recipeId}/reviews`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('you are not allowed to perform this action on your own recipe');
          done();
        });
    });

    // if everything good => 200
    it('return 200 if another user tries to review', (done) => {
      request.post(`${recipesUrl}/${recipeId}/reviews`)
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
      request.post(`${recipesUrl}/${recipeId}/favorite`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    // invalid token(not on the user table is used) => 403
    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesUrl}/${recipeId}/favorite`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    // if recipe doesnt exist => 404
    it('return 404 if recipe is not found', (done) => {
      request.post(`${recipesUrl}/15/favorite`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });
    // if owner tries to favorite on his/her recipe => 403
    it('return 403 if owner tries to favorite', (done) => {
      request.post(`${recipesUrl}/${recipeId}/favorite`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('you are not allowed to perform this action on your own recipe');
          done();
        });
    });
    // if everything good => 200
    it('return 200 if another user tries to favorite', (done) => {
      request.post(`${recipesUrl}/${recipeId}/favorite`)
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
      request.post(`${recipesUrl}/${recipeId}/favorite`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('recipe removed from your favorite list');
          done();
        });
    });
    // if everything good => 200
    // this is just to make sure the favorite table isn't empty when its to be tested
    it('return 200 if another user tries to favorite', (done) => {
      request.post(`${recipesUrl}/${recipeId}/favorite`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('recipe added to your favorite list');
          done();
        });
    });
  });

  describe('Get all user\'s favorite recipe(s)', () => {
    // note: i'm using two here because only user 2 has favorited something
    // no user token
    it('return 400 if no token is passed', (done) => {
      request.get(`${usersUrl}/2/recipes`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });
    // invalid user token not on Users table
    it('return 403 for invalid user token used', (done) => {
      request.get(`${usersUrl}/2/recipes`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });
    // user token decoded !== :id
    it('return 403 for invalid user token used', (done) => {
      request.get(`${usersUrl}/2/recipes`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token or user doesn\'t exist');
          done();
        });
    });
    // user doesn't exist
    it('return 403 for invalid user token used', (done) => {
      request.get(`${usersUrl}/3/recipes`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token or user doesn\'t exist');
          done();
        });
    });
    // user has no favorites
    it('return 200 for user has no recipes in favorite list', (done) => {
      request.get(`${usersUrl}/1/recipes`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipes).to.be.a('null');
          expect(res.body.message).to.equal('user has no recipe in his/her favorite list');
          done();
        });
    });
    //
    it('return 200 for a user with a favorite list', (done) => {
      request.get(`${usersUrl}/2/recipes`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipes).to.be.a('array');
          expect(res.body.recipes[0].name).to.equal('Fried Rice');
          expect(res.body.message).to.equal('1 recipe(s) found in user\'s favorite list');
          done();
        });
    });
  });

  describe('Modify a recipe', () => {
    it('return 400 if no token is passed', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    it('return 403 for invalid user token used', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .send({ token: invalidToken, update: { name: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    it('return 400 if update data is not passed', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('update property required or can not be empty');
          done();
        });
    });

    it('return 403 if a user is not the owner of the recipe', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken2, update: { name: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Not authorized to modify this recipe');
          done();
        });
    });

    it('return 404 if recipe is not found', (done) => {
      request.put(`${recipesUrl}/15`)
        .send({ token: userToken1, update: { name: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('return 400 update object has an invalid key name', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1, update: { test: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('invalid property name(s) on update object');
          done();
        });
    });

    it('return 200 if the recipe is updated', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1, update: { name: 'Jollof Rice' } })
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
      request.delete(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Not authorized to delete this recipe');
          done();
        });
    });

    it('return 400 if token is not present', (done) => {
      request.delete(`${recipesUrl}/${recipeId}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    it('return 403 for invalid user token used', (done) => {
      request.delete(`${recipesUrl}/${recipeId}`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    it('return 404 if recipe is not found', (done) => {
      request.delete(`${recipesUrl}/15`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('return 204 if recipe is deleted', (done) => {
      request.delete(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          done();
        });
    });
  });
});
