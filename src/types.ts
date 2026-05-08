export interface PaginationOptions {
  offset?: number
  limit?: number
}

export interface BaseResponse <T> {
  total_count: number
  items: T[]
}

export interface BankAccountResponse {
  id: string
  bic: string
  iban: string
  contract_id: string
  customer_information: {
    name: string
    business_id: string | null
    contact_person: string | null
    contact_person_ssn: string | null
    contact_person_email: string | null
    contact_person_phone: string | null
  } | null | undefined
  balance?: number | null
  balance_date?: string | null
}

export interface BankAccountStatementResponse {
  id: string
  from: string
  to: string
  legal_sequence_number: string
  entries: {
    entry_reference: number
    archive_id: string
    booking_date: string
    value_date: string
    payment_date: string
    booking_information: string
    amount: number
    receiver: string
    receiver_account: string
    debitor: string
    reference_number: string
    additional_information: string[]
  }[]
  balances: {
    booking_date: string
    amount: number
    available_amount?: number
  }[]
  created_at: string
  updated_at: string
  servicer_name: string
  servicer_bic: string
  account_owner_name: string
  currency: string
  test: boolean
  transaction_summary: {
    entry_count: number
    credit_count: number
    credit_amount: number
    debit_count: number
    debit_amount: number
  }
  bank_account: BankAccountResponse & {
    deleted_at: string | null
    restored_at: string | null
  }
}

export interface OutboundPaymentResponse {
  id: string
  source: string
  recipient_name: string
  recipient_iban: string
  recipient_bic: string
  amount: number
  reference_number: string | null
  message: string | null
  payment_date: string
  vendor_reference: string | null
  idempotency_key: string | null
  status: string | null
  status_details: string | null
  created_at: string
  updated_at: string
  bank_account: BankAccountResponse
}

export interface InboundPaymentResponse {
  id: string
  bank_account_id: string
  debitor_name: string
  amount: number
  reference_number: string | null
  message: string | null
  payment_date: string
  archive_id: string | null
  booking_date: string | null
  created_at: string
  updated_at: string
  bank_account: BankAccountResponse
}

export interface WebhookResponse {
  id: string
  description: string | null
  url: string | null
  test: boolean
  production: boolean
  created_at: string
  updated_at: string
}

export interface CallResponse {
  id: string
  certificate_id: string
  file_type: string
  content: string
  response: string
  created_at: string
}

export type CertificateResponse = {
  id: string
  shared: boolean
  bic: string
} | {
  id: string
  not_after: string
  not_before: string
  subject: string
  bank_customer_id: string | null
  bank_target_id: string | null
  bic: string | null
  certificate_type: string | null
  test: boolean
}

export interface ApiKeyResponse {
  id: string
  description: string
  user_id: number
  public_key: string
  private_key: string
  api_key: string
}
