export default class BankAccounts {
  constructor(base) {
    this.base = base;
  }

  fetch() {
    return this.base.get('/bankaccounts');
  }

  create(data) {
    return this.base.post('/bankaccounts', data);
  }

  fetchV2() {
    return this.base.get('/v2/bank-accounts');
  }

  createV2(data) {
    return this.base.post('/v2/bank-accounts', data);
  }
}
