const STRATEGIES = {
  value: 'value',
  nativeValue: 'nativeValue',
  click: 'click',
  text: 'text',
};

// Used for react apps. See: https://stackoverflow.com/questions/40894637/how-to-programmatically-fill-input-elements-built-with-react/70848568
function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
}

function fillTarget({ selector, value, ...params }) {
  const strategy = params.strategy || STRATEGIES.value;
  const element = document.querySelector(selector);

  if (!element) return null;
  if (strategy === STRATEGIES.value) element.value = value;
  if (strategy === STRATEGIES.nativeValue) setNativeValue(element, value);
  if (strategy === STRATEGIES.text) element.innerText = value;
  if (strategy === STRATEGIES.click) element.click();
  return element;
}

module.exports = {
  fillTarget,
};
