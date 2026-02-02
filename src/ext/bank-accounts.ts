import Qs from 'qs'

import BaseSubClient from '../baseSubClient.js'
import type { BankAccountResponse, BaseResponse } from '../types.js'

type BankAccountData = Omit<BankAccountResponse, 'id' | 'customer_information'> | {
  customer_information: Pick<NonNullable<BankAccountResponse['customer_information']>, 'name' | 'business_id'>
}

interface BankAccountFilters {
  offset?: number
  limit?: number
}

export default class BankAccounts extends BaseSubClient {
  fetchV2(opts: BankAccountFilters) {
    return this.base.get<BaseResponse<BankAccountResponse>>('/v2/bank-accounts?' + Qs.stringify(opts))
  }

  createV2(data: BankAccountData) {
    return this.base.post<BankAccountData, BankAccountResponse>('/v2/bank-accounts', data)
  }

  updateV2(id: string, data: BankAccountData) {
    return this.base.put<BankAccountData, BankAccountResponse>(`/v2/bank-accounts/${id}`, data)
  }
}
