import Qs from 'qs'

import BaseSubClient from '../baseSubClient.js'
import type { BaseResponse, InboundPaymentResponse, PaginationOptions } from '../types.js'

interface InboundPaymentFilters extends PaginationOptions {
  updated_after?: string | null
  bank_account?: string | null
  payment_date_min?: string | null
  payment_date_max?: string | null
}

export default class InboundPayments extends BaseSubClient {
  fetchV2(opts: InboundPaymentFilters) {
    return this.base.get<BaseResponse<InboundPaymentResponse>>('/v2/inbound-payments?' + Qs.stringify(opts))
  }

  refreshV2(certificateId: string) {
    throw new Error('Not implemented')
  }

  batchV2(batchId: string, type = 'json') {
    throw new Error('Not implemented')
  }
}
