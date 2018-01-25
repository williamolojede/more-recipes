import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken, janeToken }
} = testSetup;

describe('Modify a recipe', () => {
  const updateUrl = `${rootURL}/recipes/1`;
  tokenAuthentication(request, 'put', updateUrl, expect);

  it('should reject request if update field is not passed', (done) => {
    request.put(updateUrl)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Update property required or can not be empty');
        done();
      });
  });

  it('should not allow recipe to be updated if request is made by not the owner', (done) => {
    request.put(updateUrl)
      .send({ token: janeToken, update: { name: 'Jollof Rice' } })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Not authorized to modify this recipe');
        done();
      });
  });

  it('should return 404 if recipe is not found', (done) => {
    request.put(`${rootURL}/recipes/15`)
      .send({ token: johnToken, update: { name: 'Jollof Rice' } })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        done();
      });
  });

  it('should reject request if update object has an invalid key name', (done) => {
    request.put(updateUrl)
      .send({ token: johnToken, update: { test: 'Jollof Rice' } })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Invalid property name(s) on update object');
        done();
      });
  });

  it('should reject request if property\'s value contains whitespace(s) only', (done) => {
    request.put(updateUrl)
      .send({ token: johnToken, update: { name: '' } })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe name can not be empty');
        done();
      });
  });

  // TODO: should return conflict error if user has a recipe with the provide name already

  it('should update recipe and return a success message and the updated recipe', (done) => {
    request.put(updateUrl)
      .send({ token: johnToken, update: { name: 'Jollof Rice' } })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Recipe updated successfully');
        expect(res.body.recipe.name).to.equal('Jollof Rice');
        done();
      });
  });
});
