const { fillTarget } = require('./dom');
const { getUrlParams } = require('./url');
const { buildCookies } = require('./cookies');
const { fetchLeadInfo, trackEvent } = require('./fetcher');

class ZenfiSDK {
  constructor({ partnerName, cookiesDomain, targets } = {}) {
    this.partnerName = partnerName;
    this.targets = targets;
    this.cookies = buildCookies({ domain: cookiesDomain });

    // eslint-disable-next-line no-restricted-globals
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
    if (!this.leadInfo) this.leadInfo = await fetchLeadInfo(this.token);
    return this.leadInfo;
  }

  async fillTargets() {
    await this.fetchData();
    (this.targets || []).forEach(({ dataKey, selector, strategy }) => {
      const value = (this.leadInfo || {})[dataKey];
      if (value) fillTarget({ selector, value, strategy });
    });
  }

  trackEvent(type, name, properties) {
    if (!this.partnerName) throw new Error('Parameter "partnerName" is required to track events');
    return trackEvent({
      type,
      partner: this.partnerName,
      zenfiId: this.id,
      event: name,
      meta: properties,
    });
  }

  trackConversion(name, properties) {
    this.trackEvent('converted', name, properties);
  }

  trackAbortion(name, properties) {
    this.trackEvent('aborted', name, properties);
  }
}

module.exports = ZenfiSDK;
