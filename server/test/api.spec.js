import testSetup from './test-utils/test-setup';

const { request, expect } = testSetup;

describe('API General Tests', () => {
  it('return 404 for any api end-point not provided', (done) => {
    request.post('/api/wrong')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Not Found');
        done();
      });
  });

  it('should return html for react app', (done) => {
    request.get('/')
      .send({})
      .end((err, res) => {
        expect(res.headers['content-type'], 'text/html; charset=UTF-8');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return html for api docs', (done) => {
    request.get('/api/docs')
      .send({})
      .end((err, res) => {
        expect(res.headers['content-type'], 'text/html; charset=UTF-8');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
