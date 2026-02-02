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

interface Opts {
  beforeRequest?: () => Promise<{ bearerToken?: string, test?: boolean }>
  bearerToken?: string
  baseUrl?: string
  test?: boolean
  privateKey?: string
  apiKey?: string
}

interface GetOptions {
  headers?: { Accept?: string }
  responseType?: string
}

class InternalError extends Error {
  public status: number
  public statusText: string
}

class ValidationError extends Error {
  public status: number
  public body: object
}

export default class Client {
  private beforeRequest: Opts['beforeRequest']
  private bearerToken: string | boolean
  private baseUrl: string
  private testMode: boolean
  private privateKey: NodeRSA
  private apiKey: string

  public applications: Applications
  public webhooks: Webhooks
  public certificates: Certificates
  public calls: Calls
  public bankAccounts: BankAccounts
  public bankAccountStatements: BankAccountStatements
  public outboundPayments: Payments
  public apikeys: ApiKeys
  public inboundPayments: InboundPayments

  constructor(opts: Opts = {}) {
    this.applications = new Applications(this)
    this.webhooks = new Webhooks(this)
    this.certificates = new Certificates(this)
    this.calls = new Calls(this)
    this.bankAccounts = new BankAccounts(this)
    this.bankAccountStatements = new BankAccountStatements(this)
    this.outboundPayments = new Payments(this)
    this.apikeys = new ApiKeys(this)
    this.inboundPayments = new InboundPayments(this)
    this.beforeRequest = opts.beforeRequest ?? (() => Promise.resolve({}))
    this.bearerToken = opts.bearerToken || '-'
    this.baseUrl = opts.baseUrl || 'https://api.bankson.fi'
    this.testMode = opts.test ?? false
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

  authorizationHeader(bearerToken: string | boolean) {
    if(this.bearerToken) return 'Bearer ' + bearerToken
    const timestamp = Date.now()
    const str = this.apiKey + timestamp
    const signature = this.privateKey.sign(str, 'base64')
    return 'BanksonRSA ' + [
      'ApiKey=' + this.apiKey,
      'Timestamp=' + timestamp,
      'Signature=' + signature,
    ].join(', ')
  }

  async headers(additionalHeaders: { Accept?: string } = {}) {
    const result = await this.beforeRequest?.()
    const bearerToken = result?.bearerToken || this.bearerToken
    const banksonTest = result?.test ?? this.testMode
    const headers = new Headers()
    headers.append('Accept', additionalHeaders.Accept || 'application/json')
    headers.append('Authorization', this.authorizationHeader(bearerToken))
    if(banksonTest) headers.append('X-Bankson-Environment', 'Test')
    return headers
  }

  async get<TResponse>(path: string, options: GetOptions = {}) {
    const headers = await this.headers(options.headers)
    const resp = await fetch(`${this.baseUrl}${path}`, { headers })
    return this.handleResponse<TResponse>(resp, options)
  }

  post<TData, TResponse>(path: string, data: TData) {
    return this.request<TData, TResponse>('POST', path, data)
  }

  put<TData, TResponse>(path: string, data: TData) {
    return this.request<TData, TResponse>('PUT', path, data)
  }

  async request<TData, TResponse>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, data: TData) {
    const headers = await this.headers()
    const isFormData = data instanceof FormData
    if(!isFormData) {
      headers.append('Content-Type', 'application/json')
    }
    const resp = await fetch(`${this.baseUrl}${path}`, {
      method,
      body: isFormData ? data : JSON.stringify(data),
      headers,
    })
    return this.handleResponse<TResponse>(resp)
  }

  async delete(path: string) {
    const headers = await this.headers()
    const resp = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers,
    })
    return this.handleResponse<void>(resp)
  }

  handleResponse<TResponse>(resp: Response, options: GetOptions = {}): Promise<TResponse> {
    if(!resp.ok) {
      if(resp.status >= 500 || resp.status < 400) {
        const err = new InternalError(`Internal error (${resp.status}): ${resp.statusText}`)
        err.status = resp.status
        err.statusText = resp.statusText
        throw err
      }
      return getBody(resp).then(json => {
        const err = new ValidationError('Request unsuccessfull')
        err.status = resp.status
        err.body = json as object
        throw err
      })
    }
    return getBody(resp)

    async function getBody(resp: Response): Promise<TResponse> {
      if(!(resp.headers.get('Content-Type') ?? '').includes('application/json')) {
        if(options.responseType === 'arraybuffer') return resp.arrayBuffer() as Promise<TResponse>
        return resp.text() as Promise<TResponse>
      }
      return resp.json() as Promise<TResponse>
    }
  }
}
