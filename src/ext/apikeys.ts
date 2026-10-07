import BaseSubClient from '../baseSubClient.js'
import type { ApiKeyResponse } from '../types.js'

interface ApiKeyData {
  description: string
}

export default class ApiKeys extends BaseSubClient {
  createV2(data: ApiKeyData) {
    return this.base.post<ApiKeyData, ApiKeyResponse>('/v2/apikeys', data)
  }
}
