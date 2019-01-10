module.exports = class Webhooks {
  constructor(base) {
    this.base = base;
  }

  fetch() {
    return this.base.get('/webhooks');
  }

  create(data) {
    return this.base.post('/webhooks', data);
  }

  fetchV2() {
    return this.base.get('/v2/webhooks');
  }

  createV2(data) {
    return this.base.post('/v2/webhooks', data);
  }

  updateV2(id, data) {
    return this.base.put(`/v2/webhooks/${id}`, data)
  }
}
