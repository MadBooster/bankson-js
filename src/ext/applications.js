import BaseSubClient from '../baseSubClient.js'

export default class Applications extends BaseSubClient {
  fetchV2() {
    return this.base.get('/v2/applications')
  }

  createV2(data) {
    return this.base.post('/v2/applications', data)
  }
}
