function getUrlParams(location) {
  const URL_PARAMS = {
    id: 'zfid',
    token: 'zftoken',
  };
  const searchParams = new URLSearchParams(location.search);

  return {
    id: searchParams.get(URL_PARAMS.id) || null,
    token: searchParams.get(URL_PARAMS.token) || null,
  };
}

module.exports = {
  getUrlParams,
};
