import type Client from './client.js'

export default class BaseSubClient {
  protected base: Client
  constructor(base: Client) {
    this.base = base
  }
}
