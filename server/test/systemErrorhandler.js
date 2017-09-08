import { expect } from 'chai';
import systemErrorHandler from '../helpers/systemErrorHandler';

let error;

systemErrorHandler('some error', (err) => {
  error = err;
});

describe('Error Handler', () => {
  it('corect error', (done) => {
    expect(error).to.be.a('error');
    expect(error.status).to.equal(500);
    expect(error.message).to.equal('some error');
    done();
  });
});
