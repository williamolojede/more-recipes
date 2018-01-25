import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken, janeToken }
} = testSetup;


describe('Get a single recipe', () => {
  const recipeUrl = `${rootURL}/recipes/1`;
  tokenAuthentication(request, 'get', recipeUrl, expect);

  it('should reject request if invalid recipe id used', (done) => {
    request.get(`${rootURL}/recipes/-15`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal("-15 isn't a valid Recipe id value, see documentation!");
        done();
      });
  });

  it('should reject request if invalid recipe id used', (done) => {
    request.get(`${rootURL}/recipes/giberrish`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal("giberrish isn't a valid Recipe id value, see documentation!");
        done();
      });
  });

  it('should return 404 if recipe is not found', (done) => {
    request.get(`${rootURL}/recipes/15`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        done();
      });
  });

  it('should return a full details of the recipe', (done) => {
    request.get(recipeUrl)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.recipe.name).to.equal('Hot Chicken Casserole user1v1');
        expect(res.body.recipe.User.id).to.equal(1);
        expect(res.body.recipe.img_url).to.equal('http://allrecipes.com/recipe/255239/hot-chicken-casserole/photos/3982379/');
        expect(res.body.recipe.viewCount).to.equal(1);
        done();
      });
  });

  describe('viewCount', () => {
    it('should remain the same for the same user', (done) => {
      request.get(recipeUrl)
        .send({ token: johnToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.recipe.viewCount).to.equal(1);
          done();
        });
    });

    it('should increase for another user', (done) => {
      request.get(recipeUrl)
        .send({ token: janeToken })
        .end((err, res) => {
          expect(res.body.recipe.viewCount).to.equal(2);
          done();
        });
    });
  });
});
