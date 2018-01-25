import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken, janeToken }
} = testSetup;

describe('Favorite a recipe', () => {
  const favoriteUrl = `${rootURL}/recipes/1/favorite`;
  tokenAuthentication(request, 'post', favoriteUrl, expect);

  it('should return 404 if recipe is not found', (done) => {
    request.post(`${rootURL}/recipes/15/favorite`)
      .send({ token: janeToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        done();
      });
  });

  it('should reject request if user requests to favorite his/her own recipe', (done) => {
    request.post(favoriteUrl)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('You are not allowed to favorite your own recipe!');
        done();
      });
  });

  it('should add recipe to favorite list if user favorites', (done) => {
    request.post(favoriteUrl)
      .send({ token: janeToken })
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
    request.post(favoriteUrl)
      .send({ token: janeToken })
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
    request.post(favoriteUrl)
      .send({ token: janeToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.recipe.favoriteCount).to.equal(1);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Recipe added to your favorite list');
        done();
      });
  });
});

