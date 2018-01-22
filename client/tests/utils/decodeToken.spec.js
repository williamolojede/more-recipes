import decodeToken from '../../utils/decodeToken';

describe('decodeToken', () => {
  it('should get token from localstorage, decode it and return the id and expiry date', () => {
    const { id, exp } = decodeToken();
    expect(id).toBe(8);
    expect(exp).toBeTruthy();
  });
});
