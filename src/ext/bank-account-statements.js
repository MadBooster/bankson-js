export default class BankAccountStatements {
  constructor(base) {
    this.base = base
  }

  fetch() {
    return this.base.get('/bankaccountstatements')
  }

  statementHtml(id) {
    return this.base.get(`/bankaccountstatements/${id}`, {
      headers: {
        Accept: 'text/html'
      },
      responseType: 'arraybuffer'
    })
  }

  statementXml(id) {
    return this.base.get(`/bankaccountstatements/${id}`, {
      headers: {
        Accept: 'application/xml'
      },
      responseType: 'arraybuffer'
    })
  }

  statementText(id) {
    return this.base.get(`/bankaccountstatements/${id}`, {
      headers: {
        Accept: 'text/plain'
      },
      responseType: 'arraybuffer'
    })
  }

  refresh(id) {
    return this.base.post('/bankaccountstatements', {
      certificate_id: id
    })
  }

  fetchV2() {
    return this.base.get('/v2/bankaccountstatements')
  }

  statementHtmlV2(id) {
    return this.base.get(`/v2/bankaccountstatements/${id}`, {
      headers: {
        Accept: 'text/html'
      },
      responseType: 'arraybuffer'
    })
  }

  statementXmlV2(id) {
    return this.base.get(`/v2/bankaccountstatements/${id}`, {
      headers: {
        Accept: 'application/xml'
      },
      responseType: 'arraybuffer'
    })
  }

  statementTextV2(id) {
    return this.base.get(`/v2/bankaccountstatements/${id}`, {
      headers: {
        Accept: 'text/plain'
      },
      responseType: 'arraybuffer'
    })
  }

  refreshV2(id) {
    throw new Error('Not implemented')
  }
}
