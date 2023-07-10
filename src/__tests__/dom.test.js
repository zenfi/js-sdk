const { fillTarget } = require('../dom');

describe('.fillTarget', () => {
  const value = 'NEW_VALUE';
  const selector = '.input';
  const element = { __type: 'HTML_NODE', click: jest.fn() };
  const querySelector = jest.fn(() => element);
  const setter = { set: jest.fn() };
  let originalDescriptor;

  beforeAll(() => {
    originalDescriptor = Object.getOwnPropertyDescriptor;
    Object.getOwnPropertyDescriptor = () => setter;
  });

  afterAll(() => { Object.getOwnPropertyDescriptor = originalDescriptor; });

  beforeEach(() => {
    global.document = { querySelector };
    setter.set.mockClear();
    element.click.mockClear();
    querySelector.mockClear();
  });

  const expectSelectionCall = () => {
    expect(querySelector).toBeCalledTimes(1);
    expect(querySelector).toHaveBeenLastCalledWith(selector);
  };

  const expectValue = (result, property) => {
    expect(result.__type).toEqual(element.__type);
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

  describe('strategy is "nativeValue"', () => {
    const strategy = 'nativeValue';

    // eslint-disable-next-line jest/expect-expect
    it('sets the value using its setter function', () => {
      const result = fillTarget({ selector, value, strategy });
      expectSelectionCall();
      expect(result.__type).toEqual(element.__type);
      expect(setter.set).toBeCalledTimes(1);
      expect(setter.set).toBeCalledWith(value);
    });
  });

  describe('strategy is "text"', () => {
    const strategy = 'text';

    // eslint-disable-next-line jest/expect-expect
    it('sets the innerText of the element and returns it', () => {
      const result = fillTarget({ selector, value, strategy });
      expectValue(result, 'innerText');
    });
  });

  describe('strategy is "click"', () => {
    const strategy = 'click';

    it('class the method "click" of the element', () => {
      const result = fillTarget({ selector, value, strategy });
      expect(result.__type).toEqual(element.__type);
      expect(element.click).toBeCalledTimes(1);
      expectSelectionCall();
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
