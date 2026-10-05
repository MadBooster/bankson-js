import Qs from 'qs'

import BaseSubClient from '../baseSubClient.js'
import type { BankAccountStatementResponse, BaseResponse, PaginationOptions } from '../types.js'

interface BankAccountStatementFilters extends PaginationOptions {
  updated_after?: string | null
  bank_account?: string | null
}

export default class BankAccountStatements extends BaseSubClient {
  fetchV2(opts: BankAccountStatementFilters) {
    return this.base.get<BaseResponse<Omit<BankAccountStatementResponse, 'entries'>>>('/v2/bankaccountstatements?' + Qs.stringify(opts))
  }

  statementJsonV2(id: string) {
    return this.base.get<BankAccountStatementResponse>(`/v2/bankaccountstatements/${id}`)
  }

  statementHtmlV2(id: string) {
    return this.base.get<ArrayBuffer>(`/v2/bankaccountstatements/${id}`, {
      headers: {
        Accept: 'text/html',
      },
      responseType: 'arraybuffer',
    })
  }

  statementXmlV2(id: string) {
    return this.base.get<ArrayBuffer>(`/v2/bankaccountstatements/${id}`, {
      headers: {
        Accept: 'application/xml',
      },
      responseType: 'arraybuffer',
    })
  }

  statementTextV2(id: string) {
    return this.base.get<ArrayBuffer>(`/v2/bankaccountstatements/${id}`, {
      headers: {
        Accept: 'text/plain',
      },
      responseType: 'arraybuffer',
    })
  }

  refreshV2(id: string) {
    throw new Error('Not implemented')
  }
}
