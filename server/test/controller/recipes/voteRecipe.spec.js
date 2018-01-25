import testSetup from '../../test-utils/test-setup';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken }
} = testSetup;

describe('Vote {up, down} a recipe', () => {
  const recipeUrl = `${rootURL}/recipes/1`;

  it('should reject request if no token is passed', (done) => {
    request.post(`${recipeUrl}/vote-up`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('user authorization token required');
        done();
      });
  });

  it('should reject request if no token is passed', (done) => {
    request.post(`${recipeUrl}/vote-down`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('user authorization token required');
        done();
      });
  });

  // if recipe doesnt exist no vote => 404
  it('should return 404 if recipe is not found', (done) => {
    request.post(`${rootURL}/recipes/100/vote-up`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        done();
      });
  });

  it('should return 404 if recipe is not found', (done) => {
    request.post(`${rootURL}/recipes/100/vote-down`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        done();
      });
  });

  // if not vote-{up, down} => 404
  it('should return 404 if not a valid vote direction', (done) => {
    request.post(`${recipeUrl}/vote-whatever`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Not Found');
        done();
      });
  });

  it('should increase up vote by 1', (done) => {
    request.post(`${recipeUrl}/vote-up`)
      .send({ token: johnToken })
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
  it('should decrease upvote and increase down vote by 1', (done) => {
    request.post(`${recipeUrl}/vote-down`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.recipe.upVoteCount).to.equal(0);
        expect(res.body.recipe.downVoteCount).to.equal(1);
        expect(res.body.message).to.equal('You disliked this recipe');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  // if user tries voting in an already voted direction delete vote
  it('should delete vote', (done) => {
    request.post(`${recipeUrl}/vote-down`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.recipe.upVoteCount).to.equal(0);
        expect(res.body.recipe.downVoteCount).to.equal(0);
        expect(res.body.message).to.equal('Vote removed');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  // just to increase the upvote count of recipe 1
  it('should increase up vote by 1', (done) => {
    request.post(`${recipeUrl}/vote-up`)
      .send({ token: johnToken })
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
