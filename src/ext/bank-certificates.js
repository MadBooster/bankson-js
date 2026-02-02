import FormData from 'form-data'

import BaseSubClient from '../baseSubClient.js'

export default class Certificates extends BaseSubClient {
  fetchV2() {
    return this.base.get('/v2/bank-certificates')
  }

  uploadV2(file, params) {
    const data = new FormData()
    Object.keys(params).forEach(k => data.append(k, params[k]))
    data.append('certificate', file)
    return this.base.post('/v2/bank-certificates/upload', data)
  }

  requestV2(data) {
    return this.base.post('/v2/bank-certificates/request', data)
  }

  removeV2(id) {
    return this.base.delete(`/v2/bank-certificates/${id}`)
  }

  renewV2(id, data = {}) {
    return this.base.post(`/v2/bank-certificates/${id}/renew`, data)
  }
}
