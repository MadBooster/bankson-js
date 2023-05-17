export default class ApiKeys {
  constructor(base) {
    this.base = base
  }

  fetch() {
    return this.base.get('/apikeys')
  }

  create(data) {
    return this.base.post('/apikeys', data)
  }

  remove(id) {
    return this.base.delete(`/apikeys/${id}`)
  }

  fetchV2() {
    return this.base.get('/v2/apikeys')
  }

  createV2(data) {
    return this.base.post('/v2/apikeys', data)
  }

  removeV2(id) {
    return this.base.delete(`/v2/apikeys/${id}`)
  }
}
