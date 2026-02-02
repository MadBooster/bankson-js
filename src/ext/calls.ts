import BaseSubClient from '../baseSubClient.js'
import type { BaseResponse, CallResponse } from '../types.js'

export default class Calls extends BaseSubClient {
  fetchV2() {
    return this.base.get < BaseResponse<CallResponse>>('/v2/calls')
  }
}
