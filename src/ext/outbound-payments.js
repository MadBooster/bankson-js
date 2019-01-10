module.exports = class Payments {
  constructor(base) {
    this.base = base;
  }

  fetch() {
    return this.base.get('/payments');
  }

  fetchFeedback() {
    return this.base.post('/payments/feedback', {});
  }

  fetchV2() {
    return this.base.get('/v2/outbound-payments');
  }

  addV2(data) {
    return this.base.post('/v2/outbound-payments', data);
  }

  fetchFeedbackV2() {
    throw new Error('Not implemented');
  }
}
