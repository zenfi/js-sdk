const Dom = require('../dom');
const Cookies = require('../cookies');
const Fetcher = require('../fetcher');

const ID = 'ZENFI_ID';
const TOKEN = 'ZENFI_TOKEN';

const cookieMock = {
  setId: jest.fn(),
  getId: jest.fn(),
  setToken: jest.fn(),
  getToken: jest.fn(),
};

describe('ZenfiSDK', () => {
  jest.spyOn(Cookies, 'buildCookies').mockImplementation(() => cookieMock);
  jest.spyOn(Dom, 'fillTarget').mockImplementation();
  jest.spyOn(Fetcher, 'fetchLeadInfo');
  jest.spyOn(Fetcher, 'trackEvent');

  const ZenfiSDK = require('../index'); // eslint-disable-line global-require
  const historyMock = {
    replaceState: jest.fn(),
  };
  const defaultParams = {
    partnerName: 'Yotepresto',
    cookiesDomain: 'example.com',
    targets: [],
  };

  const getSDK = (params = {}) => new ZenfiSDK({ ...defaultParams, ...params });

  beforeEach(() => {
    const urlSearch = `?zfid=${ID}&zftoken=${TOKEN}`;
    global.location = {
      href: `https://example.com/index.html${urlSearch}`,
      search: urlSearch,
    };
    global.history = historyMock;
    Dom.fillTarget.mockClear();
    Fetcher.trackEvent.mockClear();
    Fetcher.fetchLeadInfo.mockClear();
    Cookies.buildCookies.mockClear();
    cookieMock.setId.mockClear();
    cookieMock.setToken.mockClear();
    historyMock.replaceState.mockClear();
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
      expect(Cookies.buildCookies).toBeCalledTimes(1);
      expect(Cookies.buildCookies).toHaveBeenLastCalledWith({
        domain: defaultParams.cookiesDomain,
      });
    });

    it('parses id and token from the url', () => {
      const zenfi = getSDK();
      expect(zenfi.id).toEqual(ID);
      expect(zenfi.token).toEqual(TOKEN);
    });

    it('replaces the URL to remove the token parameter', () => {
      getSDK();
      expect(historyMock.replaceState).toBeCalledTimes(1);
      expect(historyMock.replaceState).toHaveBeenLastCalledWith(
        null,
        null,
        `https://example.com/index.html?zfid=${ID}`,
      );
    });
  });

  describe('#set id', () => {
    it('sets the new id property and stores it in a cookie', () => {
      const value = 'NewID';
      const zenfi = getSDK();
      zenfi.id = value;
      expect(zenfi.id).toEqual(value);
      expect(cookieMock.setId).toBeCalledTimes(2);
      expect(cookieMock.setId).toHaveBeenLastCalledWith(value);
    });
  });

  describe('#get id', () => {
    const storedValue = 'StoredId';

    beforeEach(() => cookieMock.getId.mockImplementationOnce(() => storedValue));

    it('returns value stored in cookie and sets in "_id" variable', () => {
      const zenfi = getSDK();
      zenfi._id = undefined;

      const result = zenfi.id;
      expect(result).toEqual(storedValue);
      expect(zenfi._id).toEqual(storedValue);
      expect(cookieMock.getId).toBeCalledTimes(1);
      expect(cookieMock.getId).toHaveBeenLastCalledWith();
    });
  });

  describe('#set token', () => {
    it('sets the new token property and stores it in a cookie', () => {
      const value = 'NewToken';
      const zenfi = getSDK();
      zenfi.token = value;
      expect(zenfi.token).toEqual(value);
      expect(cookieMock.setToken).toBeCalledTimes(2);
      expect(cookieMock.setToken).toHaveBeenLastCalledWith(value);
    });
  });

  describe('#get token', () => {
    const storedValue = 'StoredToken';

    beforeEach(() => cookieMock.getToken.mockImplementationOnce(() => storedValue));

    it('returns value stored in cookie and sets in "_token" variable', () => {
      const zenfi = getSDK();
      zenfi._token = undefined;

      const result = zenfi.token;
      expect(result).toEqual(storedValue);
      expect(zenfi._token).toEqual(storedValue);
      expect(cookieMock.getToken).toBeCalledTimes(1);
      expect(cookieMock.getToken).toHaveBeenLastCalledWith();
    });
  });

  describe('#fetchData', () => {
    const leadInfo = { name: 'Chewbacca' };

    Fetcher.fetchLeadInfo.mockImplementation(() => Promise.resolve(leadInfo));

    it('calls fetcher.fetchLeadInfo with token', async () => {
      const zenfi = getSDK();
      const results = await zenfi.fetchData();
      expect(results).toEqual(leadInfo);
      expect(zenfi.leadInfo).toEqual(leadInfo);
      expect(Fetcher.fetchLeadInfo).toBeCalledTimes(1);
      expect(Fetcher.fetchLeadInfo).toHaveBeenLastCalledWith(TOKEN);
    });

    it('calls fetchLeadInfo only once', async () => {
      const zenfi = getSDK();
      for (let i = 0; i < 5; i += 1) {
        await zenfi.fetchData(); // eslint-disable-line no-await-in-loop
      }
      expect(Fetcher.fetchLeadInfo).toBeCalledTimes(1);
    });
  });

  describe('#fillTargets', () => {
    const target1 = { dataKey: 'name', selector: '.nameInput' };
    const target2 = { dataKey: 'phone', selector: '.phoneInput', strategy: 'html' };
    const target3 = { dataKey: 'email', selector: '.emailInput', strategy: 'value' };
    const emptyTarget = { dataKey: 'age', selector: '.ageInput' };
    const leadInfo = {
      name: 'Chewbacca',
      phone: '12345678',
      email: 'chewy@lucasfilm.com',
    };

    const expectFill = (call, target, value) => {
      const { selector, strategy } = target;
      expect(call).toEqual([{ selector, strategy, value }]);
    };

    it('fetches lead info if not available', async () => {
      const zenfi = getSDK({ targets: [] });
      await zenfi.fillTargets();

      expect(Dom.fillTarget).toBeCalledTimes(0);
      expect(Fetcher.fetchLeadInfo).toBeCalledTimes(1);
    });

    it('calls fillTarget for each target', async () => {
      const targets = [target1, target2, target3];
      const zenfi = getSDK({ targets });
      zenfi.leadInfo = leadInfo;
      await zenfi.fillTargets();

      expect(Dom.fillTarget).toBeCalledTimes(targets.length);
      const [call1, call2, call3] = Dom.fillTarget.mock.calls;
      expectFill(call1, target1, leadInfo.name);
      expectFill(call2, target2, leadInfo.phone);
      expectFill(call3, target3, leadInfo.email);
    });

    it('skips targets with no data', async () => {
      const targets = [target1, emptyTarget, target2];
      const zenfi = getSDK({ targets });
      zenfi.leadInfo = leadInfo;
      await zenfi.fillTargets();

      expect(Dom.fillTarget).toBeCalledTimes(targets.length - 1);
      const [call1, call2] = Dom.fillTarget.mock.calls;
      expectFill(call1, target1, leadInfo.name);
      expectFill(call2, target2, leadInfo.phone);
    });
  });

  describe('Events tracking', () => {
    Fetcher.trackEvent.mockImplementation();

    const eventName = 'SAMPLE_EVENT';
    const eventProperties = { foo: 'bar' };

    const expectPartnerException = (testCase) => () => {
      const zenfi = getSDK({ partnerName: null });
      expect(() => testCase(zenfi)).toThrow('Parameter "partnerName" is required to track events');
    };

    const expectSendingEvent = (expectedType, testCase) => () => {
      const zenfi = getSDK();
      testCase(zenfi);
      expect(Fetcher.trackEvent).toBeCalledTimes(1);
      expect(Fetcher.trackEvent).toHaveBeenLastCalledWith({
        type: expectedType,
        partner: defaultParams.partnerName,
        zenfiId: ID,
        event: eventName,
        meta: eventProperties,
      });
    };

    describe('#trackEvent', () => {
      const eventType = 'EVENT_TYPE';
      const testCase = (zenfi) => {
        zenfi.trackEvent(eventType, eventName, eventProperties);
      };

      // eslint-disable-next-line jest/expect-expect
      it('throws error when partnerName is falsy', expectPartnerException(testCase));

      // eslint-disable-next-line jest/expect-expect
      it('sends an event to fetcher', expectSendingEvent(eventType, testCase));
    });

    describe('#trackConversion', () => {
      const eventType = 'converted';
      const testCase = (zenfi) => {
        zenfi.trackConversion(eventName, eventProperties);
      };

      // eslint-disable-next-line jest/expect-expect
      it('throws error when partnerName is falsy', expectPartnerException(testCase));

      // eslint-disable-next-line jest/expect-expect
      it('sends an event to fetcher', expectSendingEvent(eventType, testCase));
    });

    describe('#trackAbortion', () => {
      const eventType = 'aborted';
      const testCase = (zenfi) => {
        zenfi.trackAbortion(eventName, eventProperties);
      };

      // eslint-disable-next-line jest/expect-expect
      it('throws error when partnerName is falsy', expectPartnerException(testCase));

      // eslint-disable-next-line jest/expect-expect
      it('sends an event to fetcher', expectSendingEvent(eventType, testCase));
    });
  });
});
