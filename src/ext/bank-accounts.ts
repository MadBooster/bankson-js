import Qs from 'qs'

import BaseSubClient from '../baseSubClient.js'
import { type BaseResponse } from '../types.js'

interface BankAccountResponse {
  id: string
  bic: string
  iban: string
  contract_id: string
  customer_information: {
    name: string
    business_id: string | null
    contact_person: string | null
    contact_person_ssn: string | null
    contact_person_email: string | null
    contact_person_phone: string | null
  } | null | undefined
}

type BankAccountData = Omit<BankAccountResponse, 'id' | 'customer_information'> | {
  customer_information: Pick<BankAccountResponse['customer_information'], 'name' | 'business_id'>
}

interface BankAccountFilters {
  offset?: number
  limit?: number
}

export default class BankAccounts extends BaseSubClient {
  fetch() {
    return this.base.get('/bankaccounts')
  }

  create(data) {
    return this.base.post('/bankaccounts', data)
  }

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
