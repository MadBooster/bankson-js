import FormData from 'form-data'

export default class Certificates {
  constructor(base) {
    this.base = base
  }

  fetch() {
    return this.base.get('/certificates')
  }

  upload(file, params) {
    const data = new FormData()
    Object.keys(params).forEach(k => data.append(k, params[k]))
    data.append('certificate', file)
    return this.base.post('/certificates/upload', data)
  }

  request(data) {
    return this.base.post('/certificates/request', data)
  }

  remove(id) {
    return this.base.delete(`/certificates/${id}`)
  }

  renew(id, data = {}) {
    return this.base.post(`/certificates/${id}/renew`, data)
  }

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
