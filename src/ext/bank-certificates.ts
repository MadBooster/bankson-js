import BaseSubClient from '../baseSubClient.js'
import type { BaseResponse, CertificateResponse } from '../types.js'

interface UploadParams {
  bank_customer_id: string
  bank_target_id?: string
  transfer_key1: string
  transfer_key2?: string
  bic: string
}

export default class Certificates extends BaseSubClient {
  fetchV2() {
    return this.base.get<BaseResponse<CertificateResponse>>('/v2/bank-certificates')
  }

  requestV2(data: UploadParams) {
    return this.base.post<UploadParams, CertificateResponse>('/v2/bank-certificates/request', data)
  }

  removeV2(id: string) {
    return this.base.delete(`/v2/bank-certificates/${id}`)
  }
}
