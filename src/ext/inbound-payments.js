const Qs = require('qs');

module.exports = class InboundPayments {
  constructor(base) {
    this.base = base;
  }

  fetch(opts) {
    return this.base.get('/inboundpayments?' + Qs.stringify(opts));
  }

  refresh(certificateId) {
    return this.base.post('/inboundpayments', {certificate_id: certificateId});
  }

  batch(batchId, type = 'json') {
    let opts;
    if (type !== 'json') {
      opts = {
        headers: {
          'Accept': type === 'xml' ? 'application/xml' : 'text/plain'
        },
        responseType: 'arraybuffer'
      };
    }
    return this.base.get(`/inboundpayments/batches/${batchId}`, opts);
  }

  fetchV2(opts) {
    return this.base.get('/v2/inbound-payments?' + Qs.stringify(opts));
  }

  refreshV2(certificateId) {
    throw new Error('Not implemented');
  }

  batchV2(batchId, type = 'json') {
    throw new Error('Not implemented');
  }
}
