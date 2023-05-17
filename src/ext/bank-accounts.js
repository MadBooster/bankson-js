import Qs from 'qs'

export default class BankAccounts {
  constructor(base) {
    this.base = base
  }

  fetch() {
    return this.base.get('/bankaccounts')
  }

  create(data) {
    return this.base.post('/bankaccounts', data)
  }

  fetchV2(opts) {
    return this.base.get('/v2/bank-accounts?' + Qs.stringify(opts))
  }

  createV2(data) {
    return this.base.post('/v2/bank-accounts', data)
  }

  updateV2(id, data) {
    return this.base.put(`/v2/bank-accounts/${id}`, data)
  }
}
