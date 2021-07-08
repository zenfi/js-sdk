const ENDPOINTS = {
  leadsInfo: {
    url: 'https://api.zenfi.mx/products/leads/info',
    method: 'GET',
  },
  trackEvent: {
    url: 'https://api.zenfi.mx/webhooks/leads/:partner/:type',
    method: 'POST',
  },
};

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function fetchLeadInfo(token) {
  const { url: baseUrl, method } = ENDPOINTS.leadsInfo;
  const url = `${baseUrl}?token=${token}`;

  return fetch(url, {
    method,
    headers: DEFAULT_HEADERS,
  })
    .then((response) => response.json())
    .then((data) => data.info || {});
}

function trackEvent({
  partner, type, zenfiId, event, meta,
}) {
  const { url: baseUrl, method } = ENDPOINTS.trackEvent;
  const url = baseUrl
    .replace(':type', type)
    .replace(':partner', partner);

  const body = {
    zenfiId,
    event,
    meta,
  };

  return fetch(url, {
    method,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body),
  })
    .then((response) => response.json());
}

module.exports = {
  fetchLeadInfo,
  trackEvent,
};
