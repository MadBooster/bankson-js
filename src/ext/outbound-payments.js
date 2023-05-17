import Qs from 'qs'

export default class Payments {
  constructor(base) {
    this.base = base
  }

  fetch() {
    return this.base.get('/payments')
  }

  fetchFeedback() {
    return this.base.post('/payments/feedback', {})
  }

  fetchV2(opts) {
    return this.base.get('/v2/outbound-payments?' + Qs.stringify(opts))
  }

  addV2(data) {
    return this.base.post('/v2/outbound-payments', data)
  }

  removeV2(id) {
    return this.base.delete(`/v2/outbound-payments/${id}`)
  }

  fetchFeedbackV2() {
    throw new Error('Not implemented')
  }
}
