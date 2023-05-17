import FormData from 'form-data'
import NodeRSA from 'node-rsa'

import ApiKeys from './ext/apikeys.js'
import Applications from './ext/applications.js'
import BankAccountStatements from './ext/bank-account-statements.js'
import BankAccounts from './ext/bank-accounts.js'
import Certificates from './ext/bank-certificates.js'
import Calls from './ext/calls.js'
import InboundPayments from './ext/inbound-payments.js'
import Payments from './ext/outbound-payments.js'
import Webhooks from './ext/webhooks.js'

export default class Client {
  constructor(opts = {}) {
    this.applications = new Applications(this)
    this.webhooks = new Webhooks(this)
    this.certificates = new Certificates(this)
    this.calls = new Calls(this)
    this.bankAccounts = new BankAccounts(this)
    this.bankAccountStatements = new BankAccountStatements(this)
    this.outboundPayments = new Payments(this)
    this.apikeys = new ApiKeys(this)
    this.inboundPayments = new InboundPayments(this)
    this.beforeRequest = opts.beforeRequest || (() => Promise.resolve())
    this.bearerToken = opts.bearerToken || '-'
    this.baseUrl = opts.baseUrl || 'https://api.bankson.fi'
    this.testMode = typeof opts.test !== 'undefined' ? opts.test : false
    if(opts.privateKey && opts.apiKey) {
      // ApiKey authentication
      this.bearerToken = false
      this.privateKey = new NodeRSA()
      this.privateKey.importKey(opts.privateKey, 'private')
      if(!this.privateKey.isPrivate()) throw new Error('Invalid private key')
      this.apiKey = opts.apiKey
    }
  }

  me() {
    return this.get('/me')
  }

  meV2() {
    return this.get('/v2/me')
  }

  authorizationHeader(bearerToken) {
    if(this.bearerToken) return 'Bearer ' + bearerToken
    const timestamp = Date.now()
    const str = this.apiKey + timestamp
    const signature = this.privateKey.sign(str, 'base64')
    return 'BanksonRSA ' + [
      'ApiKey=' + this.apiKey,
      'Timestamp=' + timestamp,
      'Signature=' + signature
    ].join(', ')
  }

  headers(additionalHeaders = {}) {
    return this.beforeRequest().then(result => {
      const bearerToken = result?.bearerToken || this.bearerToken
      const banksonTest = result && typeof result.test !== 'undefined' ? result.test : this.testMode
      const headers = new Headers()
      headers.append('Accept', additionalHeaders.Accept || 'application/json')
      headers.append('Authorization', this.authorizationHeader(bearerToken))
      if(banksonTest) headers.append('X-Bankson-Environment', 'Test')
      return headers
    })
  }

  get(path, options = {}) {
    return this.headers(options.headers).then(headers => fetch(`${this.baseUrl}${path}`, { headers }).then(resp => this.handleResponse(resp, options)))
  }

  post(path, data) {
    return this.request('POST', path, data)
  }

  put(path, data) {
    return this.request('PUT', path, data)
  }

  request(method, path, data) {
    return this.headers().then(headers => {
      const isFormData = data instanceof FormData
      if(!isFormData) {
        headers.append('Content-Type', 'application/json')
      }
      return fetch(`${this.baseUrl}${path}`, {
        method,
        body: isFormData ? data : JSON.stringify(data),
        headers
      }).then(this.handleResponse)
    })
  }

  delete(path) {
    return this.headers().then(headers => fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers
    })).then(this.handleResponse)
  }

  handleResponse(resp, options = {}) {
    if(!resp.ok) {
      if(resp.status >= 500 || resp.status < 400) {
        const err = new Error(`Internal error (${resp.status}): ${resp.statusText}`)
        err.status = resp.status
        err.statusText = resp.statusText
        throw err
      }
      return getBody(resp).then(json => {
        const err = new Error('Request unsuccessfull')
        err.status = resp.status
        err.body = json
        throw err
      })
    }
    return getBody(resp)

    function getBody(resp) {
      if(!/application\/json/.test(resp.headers.get('Content-Type'))) {
        if(options.responseType === 'arraybuffer') return resp.arrayBuffer()
        return resp.text()
      }
      return resp.json()
    }
  }
}
