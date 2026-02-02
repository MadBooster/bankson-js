import BaseSubClient from '../baseSubClient.js'
import type { BankAccountStatementResponse, BaseResponse } from '../types.js'

export default class BankAccountStatements extends BaseSubClient {
  fetchV2() {
    return this.base.get<BaseResponse<BankAccountStatementResponse>>('/v2/bankaccountstatements')
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
