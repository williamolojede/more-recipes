import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken }
} = testSetup;

describe('Add Recipe', () => {
  tokenAuthentication(request, 'post', `${rootURL}/recipes`, expect);

  let requestBody;
  const recipesUrl = `${rootURL}/recipes?token=${johnToken}`;

  beforeEach(() => {
    requestBody = {
      recipe: {
        name: 'Fried Rice',
        description: 'Nigerian Fried Rice puts a spicy, flavorful spin on the traditional fried rice and is appealing on its own or served with a variety of other African food.',
        img_url: 'http://www.africanbites.com/wp-content/uploads/2014/05/IMG_9677-2-1-150x150.jpg',
        ingredients: ['rice', 'canola oil'],
        instructions: ['Break up the clumpy rice before starting.', 'Garnish with chopped scallion and serve'],
      }
    };
  });

  it('should reject request if recipe field is not provided', (done) => {
    request.post(recipesUrl)
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Recipe property is required on request body, see documentation');
        done();
      });
  });

  it('should reject request if recipe name is not provided', (done) => {
    const noName = Object.assign({}, requestBody);
    delete noName.recipe.name;
    request.post(recipesUrl)
      .send(noName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Recipe name is required');
        done();
      });
  });

  it('should reject request if recipe name contains only whitespace(s)', (done) => {
    const whitespaceName = Object.assign({}, requestBody);
    whitespaceName.recipe.name = '';

    request.post(recipesUrl)
      .send(whitespaceName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Recipe name can not be empty');
        done();
      });
  });

  // test if decription is provided when creating a recipe
  it('should reject request if recipe description is not provided', (done) => {
    const noDescription = Object.assign({}, requestBody);
    delete noDescription.recipe.description;
    request.post(recipesUrl)
      .send(noDescription)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Recipe description is required');
        done();
      });
  });

  it('should reject request if recipe description contains only whitespace(s)', (done) => {
    const whitespaceDescription = Object.assign({}, requestBody);
    whitespaceDescription.recipe.description = '';

    request.post(recipesUrl)
      .send(whitespaceDescription)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('recipe description can not be empty');
        done();
      });
  });

  // test if both name and decription are provided when creating a recipe
  it('should reject request if recipe name and description are not provided', (done) => {
    const noNameDescription = Object.assign({}, requestBody);
    delete noNameDescription.recipe.description;
    delete noNameDescription.recipe.name;

    request.post(recipesUrl)
      .send(noNameDescription)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Recipe name and description are required');
        done();
      });
  });

  it('should reject request if recipe img url contains only whitespace(s)', (done) => {
    const emptyUrl = Object.assign({}, requestBody);
    emptyUrl.recipe.img_url = '';

    request.post(recipesUrl)
      .send(emptyUrl)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('recipe img url can not be empty');
        done();
      });
  });

  it('should reject request if recipe instructions is empty', (done) => {
    const emptyInstructions = Object.assign({}, requestBody);
    emptyInstructions.recipe.instructions = [''];

    request.post(recipesUrl)
      .send(emptyInstructions)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('recipe instructions can not be empty');
        done();
      });
  });

  it('should reject request if recipe ingredients is empty', (done) => {
    const emptyIngredients = Object.assign({}, requestBody);
    emptyIngredients.recipe.ingredients = [''];

    request.post(recipesUrl)
      .send(emptyIngredients)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('recipe ingredients can not be empty');
        done();
      });
  });

  it('should create recipe and return a recipe object', (done) => {
    request.post(recipesUrl)
      .send(requestBody)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('recipe created successfully');
        expect(res.body.status).to.equal('success');
        expect(res.body.recipe).to.be.a('object');
        expect(res.body.recipe.name).to.equal(requestBody.recipe.name);
        expect(res.body.recipe.description).to.equal(requestBody.recipe.description);
        expect(res.body.recipe.upVoteCount).to.equal(0);
        expect(res.body.recipe.downVoteCount).to.equal(0);
        expect(res.body.recipe.favoriteCount).to.equal(0);
        expect(res.body.recipe.viewCount).to.equal(0);
        expect(res.body.recipe.owner).to.equal(1);
        expect(res.body.recipe.id).to.equal(5);
        done();
      });
  });

  it('should return conflict error if user has a recipe with the provided name already', (done) => {
    request.post(recipesUrl)
      .send(requestBody)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('You already created a recipe with this name!');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});
