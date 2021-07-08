const STRATEGIES = {
  value: 'value',
  html: 'html',
};

function fillTarget({ selector, value, ...params }) {
  const strategy = params.strategy || STRATEGIES.value;
  const element = document.querySelector(selector);

  if (!element) return null;
  if (strategy === STRATEGIES.value) element.value = value;
  if (strategy === STRATEGIES.html) element.innerText = value;
  return element;
}

module.exports = {
  fillTarget,
};
