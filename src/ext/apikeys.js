import BaseSubClient from '../baseSubClient.js'

export default class ApiKeys extends BaseSubClient {
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
