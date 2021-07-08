const { fillTarget } = require('../dom');

describe('.fillTarget', () => {
  const value = 'NEW_VALUE';
  const selector = '.input';
  const element = { type: 'HTML_NODE' };
  const querySelector = jest.fn(() => element);

  beforeEach(() => {
    global.document = { querySelector };
    querySelector.mockClear();
  });

  const expectSelectionCall = () => {
    expect(querySelector).toBeCalledTimes(1);
    expect(querySelector).toHaveBeenLastCalledWith(selector);
  };

  const expectValue = (result, property) => {
    expect(result.type).toEqual(element.type);
    expect(result[property]).toEqual(value);
    expectSelectionCall();
  };

  describe('when element is not found', () => {
    querySelector.mockImplementationOnce(() => null);

    const strategy = 'value';

    it('does nothing and returns null', () => {
      const result = fillTarget({ selector, value, strategy });
      expect(result).toEqual(null);
    });
  });

  describe('strategy is "value"', () => {
    const strategy = 'value';

    // eslint-disable-next-line jest/expect-expect
    it('sets the value of the element and returns it', () => {
      const result = fillTarget({ selector, value, strategy });
      expectValue(result, 'value');
    });
  });

  describe('strategy is "html"', () => {
    const strategy = 'html';

    // eslint-disable-next-line jest/expect-expect
    it('sets the innerText of the element and returns it', () => {
      const result = fillTarget({ selector, value, strategy });
      expectValue(result, 'innerText');
    });
  });

  describe('strategy is falsy', () => {
    const strategy = null;

    // eslint-disable-next-line jest/expect-expect
    it('uses value strategy by default', () => {
      const result = fillTarget({ selector, value, strategy });
      expectValue(result, 'value');
    });
  });
});