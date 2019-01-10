module.exports = class Applications {
  constructor(base) {
    this.base = base;
  }

  fetch() {
    return this.base.get('/applications');
  }

  create(data) {
    return this.base.post('/applications', data);
  }

  fetchV2() {
    return this.base.get('/v2/applications');
  }

  createV2(data) {
    return this.base.post('/v2/applications', data);
  }
}
