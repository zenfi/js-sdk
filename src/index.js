const { getUrlParams } = require('./url');
const { buildCookies } = require('./cookies');

class ZenfiSDK {
  leadData = null;
  token = null;
  id = null;

  constructor({ partnerName, cookiesDomain, targets } = {}) {
    this.partnerName = partnerName;
    this.targets = targets;
    this.cookies = buildCookies({ domain: cookiesDomain });

    const { id, token } = getUrlParams(location);
    if (id) this.setId(id);
    if (token) this.setToken(token);
  }

  setId(id) {
    this.id = id || null;
    this.cookies.setId(this.id);
  }

  setToken(token) {
    this.token = token || null;
    this.cookies.setToken(this.token);
  }

  async fetchData() {
    if (this.leadData) return self;
    // Fetch data from Zenfi API
    // Set results to leadData
  }

  fillForm() {
    this.fetchData();
    // Iterate all targets
  }

  trackConversion(name, properties) {
    // Track event with type "conversion"
  }

  trackAbortion(name, properties) {
    // Track event with type "abortion"
  }
}

module.exports = ZenfiSDK;
