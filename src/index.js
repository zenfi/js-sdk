const { isNil, isFunction } = require('./utils');
const { fillTarget } = require('./dom');
const { buildCookies } = require('./cookies');
const { fetchLeadInfo, trackEvent } = require('./fetcher');
const { getUrlParams, removeUrlParams } = require('./url');

class ZenfiSDK {
  constructor({ partnerName, cookiesDomain, targets } = {}) {
    this._id = null;
    this._token = null;
    this.leadInfo = null;
    this.partnerName = partnerName;
    this.targets = targets;
    this.cookies = buildCookies({ domain: cookiesDomain });
    this._handleUrlParams();
  }

  _handleUrlParams() {
    // eslint-disable-next-line no-restricted-globals
    const { id, token } = getUrlParams(location);
    if (id) this.id = id;
    if (token) {
      this.token = token;
      // eslint-disable-next-line no-restricted-globals
      history.replaceState(null, null, removeUrlParams(location.href));
    }
  }

  set id(id) {
    this._id = id || null;
    this.cookies.setId(this._id);
  }

  get id() {
    if (!this._id) this._id = this.cookies.getId();
    return this._id;
  }

  set token(token) {
    this._token = token || null;
    this.cookies.setToken(this._token);
  }

  get token() {
    if (!this._token) this._token = this.cookies.getToken();
    return this._token;
  }

  async fetchData() {
    if (!this.token) return null;
    if (!this.leadInfo) this.leadInfo = await fetchLeadInfo(this.token);
    return this.leadInfo;
  }

  async fillTargets() {
    await this.fetchData();
    (this.targets || []).forEach((config) => {
      const { dataKey, strategy, afterAction } = config || {};
      const value = (this.leadInfo || {})[dataKey];
      if (isNil(value)) return;

      const selector = isFunction(config.selector)
        ? config.selector({ dataKey, strategy, value })
        : config.selector;
      const params = { value, selector, strategy };
      const element = fillTarget(params);
      if (isFunction(afterAction)) afterAction({ ...params, element });
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
