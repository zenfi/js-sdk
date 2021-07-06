const Cookies = require('js-cookie');
const { buildCookies } = require('../cookies');

describe('.buildCookies', () => {
  const domain = 'example.com';
  const storedValue = 'StoredValue';
  const cookies = buildCookies({ domain });
  const expectedCookieOptions = {
    domain,
    path: '/',
    secure: true,
    expires: 365,
  };

  jest.spyOn(Cookies, 'get').mockImplementation(() => storedValue);
  jest.spyOn(Cookies, 'set').mockImplementation();

  beforeEach(() => {
    Cookies.get.mockClear();
    Cookies.set.mockClear();
  });

  describe('#getId', () => {
    it('calls Cookie.get with the correct parameters', () => {
      const value = cookies.getId();
      expect(value).toEqual(storedValue);
      expect(Cookies.get).toBeCalledTimes(1);
      expect(Cookies.get).toHaveBeenLastCalledWith('zenfi_id');
    });
  });

  describe('#setId', () => {
    it('calls Cookie.set with the correct parameters', () => {
      const value = 'NewID';
      cookies.setId(value);
      expect(Cookies.set).toBeCalledTimes(1);
      expect(Cookies.set).toHaveBeenLastCalledWith(
        'zenfi_id',
        value,
        expectedCookieOptions,
      );
    });
  });

  describe('#getToken', () => {
    it('calls Cookie.get with the correct parameters', () => {
      const value = cookies.getToken();
      expect(value).toEqual(storedValue);
      expect(Cookies.get).toBeCalledTimes(1);
      expect(Cookies.get).toHaveBeenLastCalledWith('zenfi_token');
    });
  });

  describe('#setToken', () => {
    it('calls Cookie.set with the correct parameters', () => {
      const value = 'NewToken';
      cookies.setToken(value);
      expect(Cookies.set).toBeCalledTimes(1);
      expect(Cookies.set).toHaveBeenLastCalledWith(
        'zenfi_token',
        value,
        expectedCookieOptions,
      );
    });
  });
});
