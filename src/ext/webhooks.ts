import Qs from 'qs'

import BaseSubClient from '../baseSubClient.js'
import type { BaseResponse, PaginationOptions, WebhookResponse } from '../types.js'

type WebhookOptions = PaginationOptions

type WebhookData = Pick<WebhookResponse, 'description' | 'url' | 'test' | 'production'>

export default class Webhooks extends BaseSubClient {
  fetchV2(opts: WebhookOptions) {
    return this.base.get<BaseResponse<WebhookResponse>>('/v2/webhooks?' + Qs.stringify(opts))
  }

  createV2(data: WebhookData) {
    return this.base.post<WebhookData, WebhookResponse>('/v2/webhooks', data)
  }

  updateV2(id: string, data: WebhookData) {
    return this.base.put<WebhookData, WebhookResponse>(`/v2/webhooks/${id}`, data)
  }
}
