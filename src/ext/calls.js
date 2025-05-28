import BaseSubClient from '../baseSubClient.js'

export default class Calls extends BaseSubClient {
  fetch() {
    return this.base.get('/calls')
  }

  fetchV2() {
    return this.base.get('/v2/calls')
  }
}
