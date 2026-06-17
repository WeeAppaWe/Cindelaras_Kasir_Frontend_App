import type {
  CashierReceiptPreview,
  TransactionHistoryItem,
} from '../types/cashier'

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function getCashierTransactionDisplayCode(transaction: TransactionHistoryItem) {
  return getDisplayCode(transaction.receiptNumber || transaction.id, 'Tanpa nomor struk')
}

export function getCashierReceiptDisplayCode(receipt: CashierReceiptPreview) {
  return getDisplayCode(receipt.receiptNumber || receipt.id, 'Struk digital')
}

export function isUuidLike(value: string | null | undefined) {
  return uuidPattern.test((value ?? '').trim())
}

function getDisplayCode(value: string | null | undefined, fallback: string) {
  const normalizedValue = (value ?? '').trim()

  if (!normalizedValue || isUuidLike(normalizedValue)) {
    return fallback
  }

  return normalizedValue
}
