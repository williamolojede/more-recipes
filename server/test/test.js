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
const invalidToken = jwt.sign({ user: { id: 15 } }, process.env.JWT_SECRET, { expiresIn: '3 days' });
const expiredToken = jwt.sign({ user: { id: 15 } }, process.env.JWT_SECRET, { expiresIn: '2s' });
let recipeId;

/**
 * Test suite for authenticating a user before performing actions on / accessing an endpoint
 * @param {string} url - api endpoint
 * @param {string} method - http method
 * @return {undefined}
 */
const tokenAuthentication = (url, method) => {
  describe('token authentication', () => {
    // check if token is passed
    it('return 400 if token is not present', (done) => {
      request[method](url)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    // check if a token(expired) not on the user table is used
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
        .send({ token: `${userToken1}hfdgnh` })
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

describe('API Integration Tests', () => {
  it('return 404 for any route asides /api', (done) => {
    request.post('/wrong')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Not Found');
        done();
      });
  });

  it('should return html for react app', (done) => {
    request.get('/')
      .send(data)
      .end((err, res) => {
        expect(res.headers['content-type'], 'text/html; charset=UTF-8');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return html for api docs', (done) => {
    request.get('/api/docs')
      .send(data)
      .end((err, res) => {
        expect(res.headers['content-type'], 'text/html; charset=UTF-8');
        expect(res.status).to.equal(200);
        done();
      });
  });

  describe('User signup', () => {
    const signupURl = `${rootURL}/users/signup`;

    beforeEach(() => {
      data = {
        user: {
          fullname: 'example user',
          password: '123456',
          email: 'example@user.com',
        }
      };
    });

    it('return 201 for a successful account creation', (done) => {
      request.post(signupURl)
        .send(data)
        .end((err, res) => {
          const { user } = jwt.decode(res.body.token);

          // Ensures that only the id is used to create the token
          expect(Object.keys(user).length).to.equal(1);
          expect(user.id).to.equal(res.body.user.id);

          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Account created');
          expect(res.body.token).to.be.a('string');
          expect(res.body.user.id).to.equal(1);
          expect(res.body.user.email).to.equal('example@user.com');
          expect(res.body.user.fullname).to.equal('example user');
          done();
        });
    });

    // another user signup
    it('return 201 for a successful account creation', (done) => {
      userdata2 = Object.assign({}, data);
      userdata2.user.email = 'test@test.com';
      request.post(signupURl)
        .send(userdata2)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Account created');
          expect(res.body.token).to.be.a('string');
          expect(res.body.user.id).to.equal(2);
          expect(res.body.user.email).to.equal('test@test.com');
          expect(res.body.user.fullname).to.equal('example user');
          done();
        });
    });

    it('return 400 for an already existing email ', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.user.fullname = 'example user2';
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('User with email already exists');
          done();
        });
    });

    it('return 400 for if no email property is passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.user.email;
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Email field is required');
          done();
        });
    });

    it('return 400 for if email contains only whitespace(s)', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.user.email = '';
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Email can not be empty');
          done();
        });
    });

    it('return 400 for if password contains only whitespace(s)', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.user.password = '';
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Password can not be empty');
          done();
        });
    });

    it('return 400 for if password is less than 6 characters', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.user.password = '12345';
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Password must be minimum of 6 characters');
          done();
        });
    });

    it('return 400 for if no password is passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.user.password;

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Password field is required');
          done();
        });
    });

    it('return 400 for if both email and password aren\'t passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.user.password;
      delete invalidData.user.email;

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Email and password fields are required');
          done();
        });
    });

    it('return 400 for if fullname isn\'t passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.user.fullname;

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Fullname field is required');
          done();
        });
    });
  });

  describe('User login', () => {
    const loginURl = `${rootURL}/users/login`;

    beforeEach(() => {
      data = {
        user: {
          password: '123456',
          email: 'example@user.com',
        }
      };
    });

    // main user login
    it('return 200 for a successful login', (done) => {
      request.post(loginURl)
        .send(data)
        .end((err, res) => {
          userToken1 = res.body.token;
          const { user } = jwt.decode(userToken1);

          // Ensures that only the id is used to create the token
          expect(Object.keys(user).length).to.equal(1);
          expect(user.id).to.equal(res.body.user.id);

          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.user.id).to.equal(1);
          expect(res.body.user.email).to.equal('example@user.com');
          expect(userToken1).to.be.a('string');
          done();
        });
    });

    // wrong password for user 1
    it('return 401 for wrong password', (done) => {
      const wrongPassword = Object.assign({}, data);
      wrongPassword.user.password = 'wrongpassword';

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
      userdata2.user.email = 'test@test.com';
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

    it('return 400 if user property is not is not passed', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.user;

      request.post(loginURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('User property is required on request body, see documentation!');
          done();
        });
    });

    it('return 400 for if no password is passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.user.password;

      request.post(loginURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Email and password are required');
          done();
        });
    });

    it('return 400 for if no email is passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.user.email;

      request.post(loginURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Email and password are required');
          done();
        });
    });

    it('return 401 for if user is not found for the email passed ', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.user.email = 'userdefdoesntexist@email.com';
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
        recipe: {
          name: 'Fried Rice',
          description: 'Nigerian Fried Rice puts a spicy, flavorful spin on the traditional fried rice and is appealing on its own or served with a variety of other African food.',
          img_url: 'http://www.africanbites.com/wp-content/uploads/2014/05/IMG_9677-2-1-150x150.jpg',
          ingredients: ['rice', 'canola oil'],
          instructions: ['Break up the clumpy rice before starting.', 'Garnish with chopped scallion and serve'],
        }
      };
    });

    tokenAuthentication(recipesUrl, 'post');

    it('return 400 if recipe property is not is not passed', (done) => {
      const noName = Object.assign({}, data);
      delete noName.recipe;
      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Recipe property is required on request body, see documentation');
          done();
        });
    });

    it('return 400 if recipe name is not passed', (done) => {
      const noName = Object.assign({}, data);
      delete noName.recipe.name;
      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Recipe name is required');
          done();
        });
    });

    it('return 400 if recipe name contains only whitespace(s)', (done) => {
      const whitespaceName = Object.assign({}, data);
      whitespaceName.recipe.name = '';

      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(whitespaceName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Recipe name can not be empty');
          done();
        });
    });

    // test if decription is passed when creating a recipe
    it('return 400 if recipe description is not passed', (done) => {
      const noDescription = Object.assign({}, data);
      delete noDescription.recipe.description;
      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(noDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Recipe description is required');
          done();
        });
    });

    it('return 400 if recipe description contains only whitespace(s)', (done) => {
      const whitespaceDescription = Object.assign({}, data);
      whitespaceDescription.recipe.description = '';

      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(whitespaceDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('recipe description can not be empty');
          done();
        });
    });

    // test if both name and decription are passed when creating a recipe
    it('return 400 if recipe name and description are not passed', (done) => {
      const noNameDescription = Object.assign({}, data);
      delete noNameDescription.recipe.description;
      delete noNameDescription.recipe.name;

      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(noNameDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Recipe name and description are required');
          done();
        });
    });

    it('return 400 if recipe img url contains only whitespace(s)', (done) => {
      const emptyUrl = Object.assign({}, data);
      emptyUrl.recipe.img_url = '';

      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(emptyUrl)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('recipe img url can not be empty');
          done();
        });
    });

    it('return 400 if recipe instructions is empty', (done) => {
      const emptyInstructions = Object.assign({}, data);
      emptyInstructions.recipe.instructions = [''];

      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(emptyInstructions)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('recipe instructions can not be empty');
          done();
        });
    });

    it('return 400 if recipe ingredients is empty', (done) => {
      const emptyIngredients = Object.assign({}, data);
      emptyIngredients.recipe.ingredients = [''];

      request.post(`${recipesUrl}?token=${userToken1}`)
        .send(emptyIngredients)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('recipe ingredients can not be empty');
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
          expect(res.body.recipe.name).to.equal(data.recipe.name);
          expect(res.body.recipe.description).to.equal(data.recipe.description);
          expect(res.body.recipe.upVoteCount).to.equal(0);
          expect(res.body.recipe.downVoteCount).to.equal(0);
          expect(res.body.recipe.favoriteCount).to.equal(0);
          expect(res.body.recipe.viewCount).to.equal(0);
          expect(res.body.recipe.owner).to.equal(1);
          expect(res.body.recipe.id).to.equal(1);
          done();
        });
    });

    // CREATE RECIPE FOR USER 2
    it('return 201 for a successful recipe creation', (done) => {
      const user2Recipe = Object.assign({}, data);
      user2Recipe.recipe.name = 'Jollof Rice';
      user2Recipe.recipe.description = 'It is simply better than ghanian jollof';

      request.post(`${recipesUrl}?token=${userToken2}`)
        .send(user2Recipe)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('recipe created successfully');
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe).to.be.a('object');
          expect(res.body.recipe.name).to.equal(user2Recipe.recipe.name);
          expect(res.body.recipe.description).to.equal(user2Recipe.recipe.description);
          expect(res.body.recipe.upVoteCount).to.equal(0);
          expect(res.body.recipe.downVoteCount).to.equal(0);
          expect(res.body.recipe.favoriteCount).to.equal(0);
          expect(res.body.recipe.viewCount).to.equal(0);
          expect(res.body.recipe.owner).to.equal(2);
          expect(res.body.recipe.id).to.equal(2);
          done();
        });
    });
  });

  describe('Get User Detail', () => {
    tokenAuthentication(`${usersUrl}/1`, 'get');

    it('return 400 if invalid recipe id used', (done) => {
      request.get(`${usersUrl}/-15`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal("-15 isn't a valid User id value, see documentation!");
          done();
        });
    });

    it('return 400 if invalid recipe id used', (done) => {
      request.get(`${usersUrl}/giberrish`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal("giberrish isn't a valid User id value, see documentation!");
          done();
        });
    });
    // user doesn't exist
    it('return 404 if user not found', (done) => {
      request.get(`${usersUrl}/3`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('return 200 when a user is found(requested by another user)', (done) => {
      request.get(`${usersUrl}/1`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.user).to.be.a('object');
          expect(res.body.user.username).to.be.a('null');
          expect(res.body.user.imgUrl).to.be.a('null');
          expect(res.body.user.email).to.equal('example@user.com');
          expect(res.body.user.fullname).to.equal('example user');
          expect(res.body.user.id).to.equal(1);
          expect(res.body.message).to.equal('user found');
          expect(res.body.asOwner).to.equal(false);
          done();
        });
    });

    it('return 200 when a user is found(requested by the user)', (done) => {
      request.get(`${usersUrl}/1`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.user).to.be.a('object');
          expect(res.body.user.username).to.be.a('null');
          expect(res.body.user.imgUrl).to.be.a('null');
          expect(res.body.user.email).to.equal('example@user.com');
          expect(res.body.user.fullname).to.equal('example user');
          expect(res.body.user.id).to.equal(1);
          expect(res.body.message).to.equal('user found');
          expect(res.body.asOwner).to.equal(true);
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
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    it('return 400 if no token is passed', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-down`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('user authorization token required');
          done();
        });
    });

    // check if a token(invalid) not on the user table is used
    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-up`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('invalid user authorization token');
          done();
        });
    });

    it('return 403 for invalid user token used', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-down`)
        .send({ token: invalidToken })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('fail');
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
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('return 404 if recipe is not found', (done) => {
      request.post(`${recipesUrl}/15/vote-down`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
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
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });

    // if owner tries vote everything good => 200
    it('return 200 for valid upVote', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-up`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.upVoteCount).to.equal(1);
          expect(res.body.recipe.downVoteCount).to.equal(0);
          expect(res.body.message).to.equal('You liked this recipe');
          expect(res.body.status).to.equal('success');
          done();
        });
    });

    // if try vote in a not voted direction => 200 vote gets updated
    it('return 200 for user downVote after upVote', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-down`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.upVoteCount).to.equal(0);
          expect(res.body.recipe.downVoteCount).to.equal(1);
          expect(res.body.message).to.equal('You disliked this recipe');
          expect(res.body.status).to.equal('success');
          done();
        });
    });

    // if another user tries everything good => 200
    it('return 200 for valid downVote', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-down`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.upVoteCount).to.equal(0);
          expect(res.body.recipe.downVoteCount).to.equal(2);
          expect(res.body.message).to.equal('You disliked this recipe');
          expect(res.body.status).to.equal('success');
          done();
        });
    });

    // if user try vote in an already vote direction delete vote
    it('return 200 for downVote after downVote', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-down`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.upVoteCount).to.equal(0);
          expect(res.body.recipe.downVoteCount).to.equal(1);
          expect(res.body.message).to.equal('Vote removed');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    // just to increase the upvote count of recipe 1
    it('return 200 for valid owner vote up', (done) => {
      request.post(`${recipesUrl}/${recipeId}/vote-up`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.upVoteCount).to.equal(1);
          expect(res.body.recipe.downVoteCount).to.equal(0);
          expect(res.body.message).to.equal('You liked this recipe');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });

  describe('Get a single recipe', () => {
    tokenAuthentication(`${recipesUrl}/${recipeId}`, 'get');

    it('return 400 if invalid recipe id used', (done) => {
      request.get(`${recipesUrl}/-15`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal("-15 isn't a valid Recipe id value, see documentation!");
          done();
        });
    });

    it('return 400 if invalid recipe id used', (done) => {
      request.get(`${recipesUrl}/giberrish`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal("giberrish isn't a valid Recipe id value, see documentation!");
          done();
        });
    });

    // if recipe doesnt exist => 404
    it('return 404 if recipe is not found', (done) => {
      request.get(`${recipesUrl}/15`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    // Vote Count is unique to the user id
    it('return 200 for successfully getting all recipes', (done) => {
      request.get(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe.name).to.equal('Fried Rice');
          expect(res.body.recipe.User.id).to.equal(1);
          expect(res.body.recipe.img_url).to.equal('http://www.africanbites.com/wp-content/uploads/2014/05/IMG_9677-2-1-150x150.jpg');
          expect(res.body.recipe.downVoteCount).to.equal(0);
          expect(res.body.recipe.upVoteCount).to.equal(1);
          expect(res.body.recipe.viewCount).to.equal(1);
          done();
        });
    });

    it('voteCount remains the same for the same user', (done) => {
      request.get(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe.viewCount).to.equal(1);
          done();
        });
    });

    it('voteCount increases for another user', (done) => {
      request.get(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.body.recipe.viewCount).to.equal(2);
          done();
        });
    });
  });

  describe('Get all recipes', () => {
    tokenAuthentication(recipesUrl, 'get');

    it('return 200 for successfully getting all recipes', (done) => {
      request.get(`${recipesUrl}`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.recipes.length).to.equal(2);
          expect(res.body.recipes[0].name).to.equal('Jollof Rice');
          expect(res.body.recipes[1].name).to.equal('Fried Rice');
          expect(res.body.recipes[0].User.id).to.equal(2);
          expect(res.body.recipes[0].downVoteCount).to.equal(0);
          expect(res.body.recipes[0].upVoteCount).to.equal(0);
          expect(res.body.recipes[1].upVoteCount).to.equal(1);
          expect(res.body.recipes[1].downVoteCount).to.equal(0);
          expect(res.body.recipes[1].User.id).to.equal(1);
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

    it('should return 400 for a wrong sort order', (done) => {
      request.get(`${recipesUrl}?sort=notupvoteordownvote&order=descending`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('invalid sort type');
          done();
        });
    });

    it('should return 200 for successfully returning a sorted recipe list', (done) => {
      request.get(`${recipesUrl}?sort=upvotes&order=descending&page=1&limit=6`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          expect(res.body.recipes[0].name).to.equal('Fried Rice');
          expect(res.body.pagination.totalCount).to.equal(2);
          expect(res.body.pagination.pages.length).to.equal(1);
          expect(res.body.pagination.pageSize).to.equal(2);
          done();
        });
    });

    // Search
    it('should return list of recipes that match search term by name', (done) => {
      request.get(`${recipesUrl}?search=Fried+Rice`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipes.length).to.equal(1);
          done();
        });
    });

    it('should return list of recipes that match search term by ingredient name', (done) => {
      request.get(`${recipesUrl}?search=canola+oil`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipes.length).to.equal(2);
          done();
        });
    });
  });

  describe('Review a recipe', () => {
    tokenAuthentication(`${recipesUrl}/${recipeId}/reviews`, 'post');

    // if recipe doesnt exist no review => 404
    it('should return 404 if recipe is not found', (done) => {
      request.post(`${recipesUrl}/15/reviews`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('should return 400 if no content is passed', (done) => {
      request.post(`${recipesUrl}/${recipeId}/reviews`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('the content of your review can not be empty');
          done();
        });
    });

    it('should return 400 if content is passed but is an empty string', (done) => {
      request.post(`${recipesUrl}/${recipeId}/reviews`)
        .send({ token: userToken2, content: '     ' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('the content of your review can not be empty');
          done();
        });
    });

    // if everything good => 201
    it('should return 201 if owner tries to review', (done) => {
      request.post(`${recipesUrl}/${recipeId}/reviews`)
        .send({ token: userToken1, content: 'i created a shitty recipe' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.reviews).to.be.a('array');
          expect(res.body.reviews.length).to.be.equal(1);
          expect(res.body.reviews[0].content).to.be.equal('i created a shitty recipe');
          expect(res.body.message).to.equal('Your review has been recorded');
          expect(res.body.pagination.pageSize).to.equal(1);
          done();
        });
    });

    // if everything good => 201
    it('should return 201 if another user tries to review', (done) => {
      request.post(`${recipesUrl}/${recipeId}/reviews`)
        .send({ token: userToken2, content: 'this recipe is shit' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.reviews).to.be.a('array');
          expect(res.body.status).to.equal('success');
          expect(res.body.reviews.length).to.be.equal(2);
          expect(res.body.reviews[0].content).to.be.equal('this recipe is shit');
          expect(res.body.reviews[1].content).to.be.equal('i created a shitty recipe');
          expect(res.body.message).to.equal('Your review has been recorded');
          expect(res.body.pagination.pageSize).to.equal(2);
          done();
        });
    });
  });

  describe('Get all reviews for a recipe', () => {
    tokenAuthentication(`${recipesUrl}/${recipeId}/reviews`, 'get');

    // if recipe doesnt exist no review => 404
    it('should return 404 if recipe is not found', (done) => {
      request.get(`${recipesUrl}/15/reviews`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('should return 200 for successfully getting all reviews', (done) => {
      request.get(`${recipesUrl}/${recipeId}/reviews`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.reviews.length).to.equal(2);
          expect(res.body.reviews[0].content).to.equal('this recipe is shit');
          expect(res.body.reviews[1].content).to.equal('i created a shitty recipe');
          expect(res.body.reviews[0].User.id).to.equal(2);
          expect(res.body.reviews[1].User.id).to.equal(1);
          expect(res.body.pagination.pageSize).to.equal(2);
          done();
        });
    });
  });

  describe('Favorite a recipe', () => {
    tokenAuthentication(`${recipesUrl}/${recipeId}/favorite`, 'post');

    // if recipe doesnt exist => 404
    it('should return 404 if recipe is not found', (done) => {
      request.post(`${recipesUrl}/15/favorite`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    // if owner tries to favorite on his/her recipe => 403
    it('should return 403 if owner tries to favorite', (done) => {
      request.post(`${recipesUrl}/${recipeId}/favorite`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('You are not allowed to perform this action on your own recipe');
          done();
        });
    });

    // if everything good => 200
    it('should add recipe to favorite list if user favorites', (done) => {
      request.post(`${recipesUrl}/${recipeId}/favorite`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.favoriteCount).to.equal(1);
          expect(res.body.message).to.equal('Recipe added to your favorite list');
          expect(res.body.status).to.equal('success');
          done();
        });
    });

    // if user request again it will undo the favorite
    it('should remove recipe from favorite list if user favorite again', (done) => {
      request.post(`${recipesUrl}/${recipeId}/favorite`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.favoriteCount).to.equal(0);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Recipe removed from your favorite list');
          done();
        });
    });

    // if everything good => 200
    // this is just to make sure the favorite table isn't empty when its to be tested
    it('should add recipe to favorite list if user favorites', (done) => {
      request.post(`${recipesUrl}/${recipeId}/favorite`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipe.favoriteCount).to.equal(1);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Recipe added to your favorite list');
          done();
        });
    });
  });

  describe('Get all user\'s personal recipe(s)', () => {
    // note: i'm using two here because only user 2 has favorited something
    tokenAuthentication(`${usersUrl}/2/recipes`, 'get');

    // user doesn't exist
    it('should return 404 for a non existing user id', (done) => {
      request.get(`${usersUrl}/3/recipes`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('should return 200 for a user with a personal recipes', (done) => {
      request.get(`${usersUrl}/2/recipes`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipes).to.be.a('array');
          expect(res.body.recipes[0].name).to.equal('Jollof Rice');
          expect(res.body.status).to.equal('success');
          expect(res.body.pagination.pageSize).to.equal(1);
          done();
        });
    });
  });

  describe('Get all user\'s favorite recipe(s)', () => {
    // note: i'm using two here because only user 2 has favorited something
    tokenAuthentication(`${usersUrl}/2/favorites`, 'get');

    // user doesn't exist
    it('should return 404 for a non existing user id', (done) => {
      request.get(`${usersUrl}/3/favorites`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    // user has no favorites
    it('should return 200 for user has no recipes in favorite list', (done) => {
      request.get(`${usersUrl}/1/favorites`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipes).to.be.a('array');
          expect(res.body.recipes.length).to.equal(0);
          expect(res.body.status).to.equal('success');
          expect(res.body.pagination.pageSize).to.equal(0);
          done();
        });
    });

    it('should return 200 for a user with a favorite list', (done) => {
      request.get(`${usersUrl}/2/favorites`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipes).to.be.a('array');
          expect(res.body.recipes[0].name).to.equal('Fried Rice');
          expect(res.body.status).to.equal('success');
          expect(res.body.pagination.pageSize).to.equal(1);
          done();
        });
    });
  });

  describe('Modify a recipe', () => {
    tokenAuthentication(`${recipesUrl}/${recipeId}`, 'put');

    it('return 400 if update data is not passed', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Update property required or can not be empty');
          done();
        });
    });

    it('return 403 if a user is not the owner of the recipe', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken2, update: { name: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Not authorized to modify this recipe');
          done();
        });
    });

    it('return 404 if recipe is not found', (done) => {
      request.put(`${recipesUrl}/15`)
        .send({ token: userToken1, update: { name: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });


    it('return 400 update object has an invalid key name', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1, update: { test: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Invalid property name(s) on update object');
          done();
        });
    });

    it('return 400 if property\'s value contains whitespace(s) only', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1, update: { name: '' } })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Recipe name can not be empty');
          done();
        });
    });

    it('return 200 if the recipe is updated', (done) => {
      request.put(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1, update: { name: 'Jollof Rice' } })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Recipe updated successfully');
          expect(res.body.recipe.name).to.equal('Jollof Rice');
          done();
        });
    });
  });

  describe('Delete Recipe', () => {
    console.log(recipeId, '<<<recipeID>>>');
    tokenAuthentication(`${recipesUrl}/${recipeId}`, 'delete');

    it('return 403 if a user user is not the owner of the recipe', (done) => {
      request.delete(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Not authorized to delete this recipe');
          done();
        });
    });

    it('return 404 if recipe is not found', (done) => {
      request.delete(`${recipesUrl}/15`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('return 204 if recipe is deleted', (done) => {
      request.delete(`${recipesUrl}/${recipeId}`)
        .send({ token: userToken1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Recipe deleted successfully');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
  });
});
