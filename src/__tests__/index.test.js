const cookiesUtils = require('../cookies');

const ID = 'ZENFI_ID';
const TOKEN = 'ZENFI_TOKEN';

describe('ZenfiSDK', () => {
  jest.spyOn(cookiesUtils, 'buildCookies').mockImplementation(() => cookieMock);

  const ZenfiSDK = require('../index');
  const cookieMock = {
    setId: jest.fn(),
    setToken: jest.fn(),
  };
  const defaultParams = {
    partnerName: 'Yotepresto',
    cookiesDomain: 'example.com',
    targets: [],
  };

  const getSDK = (params = {}) => new ZenfiSDK({ ...defaultParams, ...params });

  beforeEach(() => {
    global.location = {
      search: `?zfid=${ID}&zftoken=${TOKEN}`,
    };
    cookiesUtils.buildCookies.mockClear();
    cookieMock.setId.mockClear();
    cookieMock.setToken.mockClear();
  });

  describe('#constructor', () => {
    it('sets the passed params', () => {
      const zenfi = getSDK();
      expect(zenfi.partnerName).toEqual(defaultParams.partnerName);
      expect(zenfi.targets).toEqual(defaultParams.targets);
    });

    it('builds a cookies object with domain', () => {
      const zenfi = getSDK();
      expect(zenfi.cookies).toBeTruthy();
      expect(cookiesUtils.buildCookies).toBeCalledTimes(1);
      expect(cookiesUtils.buildCookies).toHaveBeenLastCalledWith({
        domain: defaultParams.cookiesDomain,
      });
    });

    it('parses id and token from the url', () => {
      const zenfi = getSDK();
      expect(zenfi.id).toEqual(ID);
      expect(zenfi.token).toEqual(TOKEN);
    });
  });

  describe('#setId', () => {
    it('sets the new id property and stores it in a cookie', () => {
      const value = 'NewID';
      const zenfi = getSDK();
      zenfi.setId(value);
      expect(zenfi.id).toEqual(value);
      expect(cookieMock.setId).toBeCalledTimes(2);
      expect(cookieMock.setId).toHaveBeenLastCalledWith(value);
    });
  });

  describe('#setToken', () => {
    it('sets the new token property and stores it in a cookie', () => {
      const value = 'NewToken';
      const zenfi = getSDK();
      zenfi.setToken(value);
      expect(zenfi.token).toEqual(value);
      expect(cookieMock.setToken).toBeCalledTimes(2);
      expect(cookieMock.setToken).toHaveBeenLastCalledWith(value);
    });
  });
});
