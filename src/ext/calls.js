module.exports = class Calls {
  constructor(base) {
    this.base = base;
  }

  fetch() {
    return this.base.get('/calls');
  }

  fetchV2() {
    return this.base.get('/v2/calls');
  }
}
