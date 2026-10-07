import BaseSubClient from '../baseSubClient.js'
import type { CallListResponse } from '../types.js'

export default class Calls extends BaseSubClient {
  fetchV2() {
    return this.base.get<CallListResponse>('/v2/calls')
  }
}
