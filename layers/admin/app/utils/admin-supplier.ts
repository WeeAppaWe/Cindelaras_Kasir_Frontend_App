import type {
  AdminSupplierApiRecord,
  AdminSupplierFormPayload,
  AdminSupplierMutationRequest,
  AdminSupplierViewItem,
} from '../types/admin-supplier'

const numberFormatter = new Intl.NumberFormat('id-ID')

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function mapAdminSupplierRecordToViewItem(record: AdminSupplierApiRecord): AdminSupplierViewItem {
  const stockMovementCount = Number(record._count?.stock_movements ?? 0)
  const normalizedStockMovementCount = Number.isFinite(stockMovementCount) ? stockMovementCount : 0
  const phone = record.phone?.trim() ?? ''
  const address = record.address?.trim() ?? ''

  return {
    id: record.supplier_id,
    name: record.name,
    phone,
    phoneLabel: phone || '-',
    address,
    addressLabel: address || '-',
    stockMovementCount: normalizedStockMovementCount,
    stockMovementCountLabel: `${numberFormatter.format(normalizedStockMovementCount)} riwayat`,
    createdAt: formatAdminSupplierDateTime(record.created_at),
    updatedAt: formatAdminSupplierDateTime(record.updated_at),
    hasBeenUpdated: Boolean(record.updated_at),
  }
}

export function createAdminSupplierMutationPayload(payload: AdminSupplierFormPayload): AdminSupplierMutationRequest {
  return {
    name: payload.name.trim(),
    phone: payload.phone.trim() || null,
    address: payload.address.trim() || null,
  }
}

export function getAdminSupplierValidationMessage(payload: AdminSupplierFormPayload) {
  const name = payload.name.trim()
  const phone = payload.phone.trim()
  const address = payload.address.trim()

  if (!name) {
    return 'Nama pemasok wajib diisi.'
  }

  if (name.length < 2) {
    return 'Nama pemasok minimal 2 karakter.'
  }

  if (name.length > 100) {
    return 'Nama pemasok maksimal 100 karakter.'
  }

  if (phone.length > 20) {
    return 'Nomor telepon maksimal 20 karakter.'
  }

  if (address.length > 500) {
    return 'Alamat maksimal 500 karakter.'
  }

  return ''
}

export function formatAdminSupplierDateTime(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}
