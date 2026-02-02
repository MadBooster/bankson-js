import Qs from 'qs'

import BaseSubClient from '../baseSubClient.js'
import type { BaseResponse, OutboundPaymentResponse } from '../types.js'

interface OutboundPaymentFilters {
  offset?: number
  limit?: number
  updated_after?: string | null
  bank_account?: string | null
  payment_date_min?: string | null
  payment_date_max?: string | null
}

type OutboundPaymentData = Pick<OutboundPaymentResponse, 'source' | 'recipient_name' | 'recipient_iban' | 'recipient_bic' | 'amount' | 'reference_number' | 'message' | 'payment_date' | 'vendor_reference'>

export default class Payments extends BaseSubClient {
  fetchV2(opts: OutboundPaymentFilters) {
    return this.base.get<BaseResponse<OutboundPaymentResponse>>('/v2/outbound-payments?' + Qs.stringify(opts))
  }

  addV2(data: OutboundPaymentData) {
    return this.base.post<OutboundPaymentData, {
      failed: OutboundPaymentData[]
      succeeded: OutboundPaymentResponse[]
      failed_count: number
      succeeded_count: number
    }>('/v2/outbound-payments', data)
  }

  removeV2(id: string) {
    return this.base.delete(`/v2/outbound-payments/${id}`)
  }

  fetchFeedbackV2() {
    throw new Error('Not implemented')
  }
}
