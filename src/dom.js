const STRATEGIES = {
  value: 'value',
  click: 'click',
  text: 'text',
};

function fillTarget({ selector, value, ...params }) {
  const strategy = params.strategy || STRATEGIES.value;
  const element = document.querySelector(selector);

  if (!element) return null;
  if (strategy === STRATEGIES.value) element.value = value;
  if (strategy === STRATEGIES.text) element.innerText = value;
  if (strategy === STRATEGIES.click) element.click();
  return element;
}

module.exports = {
  fillTarget,
};
