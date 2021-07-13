function isNil(value) {
  return value === null || value === undefined;
}

function isFunction(fn) {
  return fn && {}.toString.call(fn) === '[object Function]';
}

module.exports = {
  isNil,
  isFunction,
};
