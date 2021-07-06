const { getUrlParams } = require('../url');

describe('.getUrlParams', () => {
  describe('when url contains all parameters', () => {
    const id = 'ZENFI_ID';
    const token = 'ZENFI_TOKEN';
    const search = `?zfid=${id}&zftoken=${token}`;
    const location = { search };

    it('returns all parameters as null', () => {
      const results = getUrlParams(location);
      expect(results).toEqual({ id, token });
    });
  });

  describe('when url contains no parameters', () => {
    const search = '';
    const location = { search };

    it('returns all parameters as null', () => {
      const results = getUrlParams(location);
      expect(results).toEqual({
        id: null,
        token: null,
      });
    });
  });
});
