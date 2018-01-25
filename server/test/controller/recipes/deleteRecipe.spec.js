import testSetup from '../../test-utils/test-setup';
import tokenAuthentication from '../../test-utils/tokenAutentication';

const {
  rootURL,
  request,
  expect,
  tokens: { johnToken, janeToken }
} = testSetup;


describe('Delete Recipe', () => {
  const recipesUrl = `${rootURL}/recipes`;
  tokenAuthentication(request, 'delete', `${recipesUrl}/3`, expect);

  it('should not allow recipe to be deleted if request is made by not the owner', (done) => {
    request.delete(`${recipesUrl}/1`)
      .send({ token: janeToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Not authorized to delete this recipe');
        done();
      });
  });

  it('should return 404 if recipe is not found', (done) => {
    request.delete(`${recipesUrl}/15`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        done();
      });
  });

  it('should return a success message if recipe is deleted', (done) => {
    request.delete(`${recipesUrl}/3`)
      .send({ token: johnToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Recipe deleted successfully');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
});
