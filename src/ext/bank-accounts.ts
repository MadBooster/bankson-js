import Qs from 'qs'

import BaseSubClient from '../baseSubClient.js'
import type { BankAccountResponse, BaseResponse } from '../types.js'

export type BankAccountCreateData = Omit<BankAccountResponse, 'id' | 'customer_information'> & {
  customer_information: Pick<NonNullable<BankAccountResponse['customer_information']>, 'name' | 'business_id'>
}

export type BankAccountUpdateData = Pick<BankAccountCreateData, 'contract_id'> & { customer_information?: Partial<BankAccountCreateData['customer_information']> | null }

interface BankAccountFilters {
  offset?: number
  limit?: number
}

export default class BankAccounts extends BaseSubClient {
  fetchV2(opts: BankAccountFilters) {
    return this.base.get<BaseResponse<BankAccountResponse>>('/v2/bank-accounts?' + Qs.stringify(opts))
  }

  createV2(data: BankAccountCreateData) {
    return this.base.post<BankAccountCreateData, BankAccountResponse>('/v2/bank-accounts', data)
  }

  updateV2(id: string, data: BankAccountUpdateData) {
    return this.base.put<BankAccountUpdateData, BankAccountResponse>(`/v2/bank-accounts/${id}`, data)
  }
}
