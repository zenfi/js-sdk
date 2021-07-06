const Cookies = require('js-cookie');

function buildCookies({ domain }) {
  const ONE_YEAR = 365;
  const COOKIE_NAMES = {
    id: 'zenfi_id',
    token: 'zenfi_token',
  };

  const setCookie = (name, value) => Cookies.set(name, value, {
    domain,
    path: '/',
    secure: true,
    expires: ONE_YEAR,
  });

  const getId = () => Cookies.get(COOKIE_NAMES.id);

  const setId = (value) => setCookie(COOKIE_NAMES.id, value);

  const getToken = () => Cookies.get(COOKIE_NAMES.token);

  const setToken = (value) => setCookie(COOKIE_NAMES.token, value);

  return {
    getId,
    setId,
    getToken,
    setToken,
  };
}

module.exports = {
  buildCookies,
};
