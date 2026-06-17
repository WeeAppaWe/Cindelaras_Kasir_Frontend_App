import type { AdminRawIngredientApiRecord } from '../types/admin-ingredient'
import type { AdminSupplierViewItem } from '../types/admin-supplier'
import type {
  AdminInventoryIngredientOption,
  AdminInventoryIngredientOptionRecord,
  AdminInventoryMovementKind,
  AdminInventoryMovementRecord,
  AdminInventoryMovementViewItem,
  AdminInventoryStockInCreateRequest,
  AdminInventoryStockInFormPayload,
  AdminInventoryStockOutCreateRequest,
  AdminInventoryStockOutFormPayload,
  AdminInventoryStockOutReason,
  AdminInventoryStockTypeOption,
  AdminInventoryStockTypeRecord,
  AdminInventorySupplierOption,
} from '../types/admin-inventory'

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})
const numberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 2,
})
const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function mapAdminInventoryMovementRecordToViewItem(
  record: AdminInventoryMovementRecord,
): AdminInventoryMovementViewItem {
  const qty = toNumber(record.qty)
  const absQty = Math.abs(qty)
  const unitCost = toNumber(record.unit_cost ?? 0)
  const currentStock = toNumber(record.current_stock)
  const unitName = record.ingredient?.unit?.name?.trim() || '-'
  const stockTypeName = record.stock_type?.name || ''
  const movementKind = getInventoryMovementKind(stockTypeName, qty)
  const type = getInventoryMovementTypePresentation(stockTypeName, movementKind)
  const isOutgoing = movementKind === 'out' || movementKind === 'sale'
  const totalCost = Math.round(absQty * unitCost)
  const supplierName = record.supplier?.name || ''
  const userName = record.user?.name || '-'

  return {
    id: record.stock_movement_id,
    date: formatAdminInventoryDateTime(record.created_at),
    ingredientId: record.ingredient_id,
    ingredientName: record.ingredient?.name || record.ingredient_id,
    unitName,
    supplierId: record.supplier_id ?? '',
    supplierName: supplierName || '-',
    stockTypeId: record.stock_type_id,
    stockTypeName,
    stockTypeLabel: formatStockTypeLabel(stockTypeName),
    userName,
    qty,
    absQty,
    unitCost,
    currentStock,
    notes: record.notes?.trim() || '-',
    movementKind,
    typeLabel: type.label,
    typeTone: type.tone,
    source: supplierName || userName || '-',
    quantityLabel: `${isOutgoing ? '-' : '+'}${formatNumber(absQty)} ${unitName}`,
    balanceLabel: `${formatNumber(currentStock)} ${unitName}`,
    unitCostLabel: unitCost > 0 ? formatCurrency(unitCost) : '-',
    totalCost,
    totalCostLabel: unitCost > 0 ? formatCurrency(totalCost) : '-',
    reason: getStockOutReason(stockTypeName, record.notes),
    reasonLabel: getStockOutReasonLabel(getStockOutReason(stockTypeName, record.notes)),
  }
}

export function mapAdminInventoryStockTypeRecordToOption(
  record: AdminInventoryStockTypeRecord,
): AdminInventoryStockTypeOption {
  return {
    id: record.stock_type_id,
    name: record.name,
    label: formatStockTypeLabel(record.name),
  }
}

export function hydrateAdminInventoryMovementStockType(
  record: AdminInventoryMovementRecord,
  stockTypes: AdminInventoryStockTypeOption[],
): AdminInventoryMovementRecord {
  if (record.stock_type?.name) {
    return record
  }

  const stockType = stockTypes.find(item => item.id === record.stock_type_id)

  if (!stockType) {
    return record
  }

  return {
    ...record,
    stock_type: {
      stock_type_id: stockType.id,
      name: stockType.name,
    },
  }
}

export function mapAdminInventoryIngredientOptionRecordToOption(
  record: AdminInventoryIngredientOptionRecord,
): AdminInventoryIngredientOption {
  return {
    id: record.ingredient_id,
    name: record.name,
    type: record.type ?? '',
    unitName: record.unit?.name?.trim() || '-',
  }
}

export function mapAdminRawIngredientRecordToInventoryOption(
  record: AdminRawIngredientApiRecord,
): AdminInventoryIngredientOption {
  return {
    id: record.ingredient_id,
    name: record.name,
    type: record.type,
    unitName: record.unit?.name?.trim() || '-',
  }
}

export function mapAdminSupplierViewItemToInventoryOption(
  item: AdminSupplierViewItem,
): AdminInventorySupplierOption {
  return {
    id: item.id,
    name: item.name,
  }
}

export function createAdminInventoryStockInPayload(
  payload: AdminInventoryStockInFormPayload,
): AdminInventoryStockInCreateRequest {
  return {
    ingredient_id: payload.ingredientId,
    supplier_id: payload.supplierId,
    qty: payload.qty,
    unit_cost: payload.unitCost,
    notes: payload.notes.trim() || undefined,
  }
}

export function createAdminInventoryStockOutPayload(
  payload: AdminInventoryStockOutFormPayload,
): AdminInventoryStockOutCreateRequest {
  return {
    ingredient_id: payload.ingredientId,
    qty: payload.qty,
    reason: payload.reason,
    notes: payload.notes.trim() || undefined,
  }
}

export function getAdminInventoryStockInValidationMessage(payload: AdminInventoryStockInFormPayload) {
  if (!payload.ingredientId) {
    return 'Bahan wajib dipilih.'
  }

  if (!payload.supplierId) {
    return 'Pemasok wajib dipilih.'
  }

  if (!Number.isFinite(payload.qty) || payload.qty <= 0) {
    return 'Qty stok masuk harus lebih dari 0.'
  }

  if (!Number.isFinite(payload.unitCost) || payload.unitCost < 0) {
    return 'Harga satuan harus 0 atau lebih.'
  }

  if (payload.notes.length > 500) {
    return 'Catatan maksimal 500 karakter.'
  }

  return ''
}

export function getAdminInventoryStockOutValidationMessage(payload: AdminInventoryStockOutFormPayload) {
  if (!payload.ingredientId) {
    return 'Bahan wajib dipilih.'
  }

  if (!Number.isFinite(payload.qty) || payload.qty <= 0) {
    return 'Qty stok keluar harus lebih dari 0.'
  }

  if (!isStockOutReason(payload.reason)) {
    return 'Alasan stok keluar tidak valid.'
  }

  if (payload.notes.length > 500) {
    return 'Catatan maksimal 500 karakter.'
  }

  return ''
}

export function isStockInTypeName(name: string) {
  const normalized = normalizeStockTypeName(name)

  return normalized === 'STOCK_IN'
    || normalized === 'IN_PURCHASE'
    || (normalized.includes('IN') && !normalized.includes('OUT'))
}

export function isManualStockOutTypeName(name: string) {
  const normalized = normalizeStockTypeName(name)

  if (normalized === 'STOCK_OUT' || normalized === 'OUT_DAMAGED' || normalized === 'OUT_EXPIRED') {
    return true
  }

  return normalized.startsWith('OUT_')
    && !normalized.includes('SALES')
    && !normalized.includes('SALE')
}

export function isOutgoingMovement(item: AdminInventoryMovementViewItem) {
  return item.movementKind === 'out' || item.movementKind === 'sale'
}

export function formatAdminInventoryCurrency(value: number) {
  return formatCurrency(value)
}

export function formatAdminInventoryDateTime(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}

export function formatStockTypeLabel(name: string) {
  const normalized = normalizeStockTypeName(name)

  if (normalized === 'STOCK_IN' || normalized === 'IN_PURCHASE') {
    return 'Stok Masuk'
  }

  if (normalized === 'STOCK_OUT') {
    return 'Stok Keluar'
  }

  if (normalized === 'OUT_DAMAGED') {
    return 'Rusak'
  }

  if (normalized === 'OUT_EXPIRED') {
    return 'Kedaluwarsa'
  }

  if (normalized === 'OUT_SALES' || normalized === 'SALES') {
    return 'Penjualan'
  }

  if (normalized === 'IN_PRODUCTION') {
    return 'Hasil Produksi'
  }

  if (normalized === 'OUT_PRODUCTION') {
    return 'Pemakaian Produksi'
  }

  if (normalized.includes('OPNAME')) {
    return 'Opname'
  }

  if (!normalized) {
    return '-'
  }

  return normalized
    .split('_')
    .filter(Boolean)
    .map(segment => `${segment.charAt(0)}${segment.slice(1).toLowerCase()}`)
    .join(' ')
}

export function getStockOutReasonLabel(reason: AdminInventoryStockOutReason) {
  if (reason === 'DAMAGED') {
    return 'Rusak'
  }

  if (reason === 'EXPIRED') {
    return 'Kedaluwarsa'
  }

  return 'Lainnya'
}

function getInventoryMovementKind(stockTypeName: string, qty: number): AdminInventoryMovementKind {
  const normalized = normalizeStockTypeName(stockTypeName)

  if (normalized.includes('SALES') || normalized === 'SALES') {
    return 'sale'
  }

  if (normalized.includes('OPNAME')) {
    return 'opname'
  }

  if (isManualStockOutTypeName(normalized) || qty < 0) {
    return 'out'
  }

  if (isStockInTypeName(normalized) || qty > 0) {
    return 'in'
  }

  return 'adjustment'
}

function getInventoryMovementTypePresentation(stockTypeName: string, movementKind: AdminInventoryMovementKind) {
  if (movementKind === 'in') {
    return {
      label: formatStockTypeLabel(stockTypeName) || 'Stok Masuk',
      tone: 'success' as const,
    }
  }

  if (movementKind === 'out') {
    return {
      label: formatStockTypeLabel(stockTypeName) || 'Stok Keluar',
      tone: 'warning' as const,
    }
  }

  if (movementKind === 'sale') {
    return {
      label: 'Penjualan',
      tone: 'info' as const,
    }
  }

  if (movementKind === 'opname') {
    return {
      label: 'Opname',
      tone: 'default' as const,
    }
  }

  return {
    label: formatStockTypeLabel(stockTypeName) || 'Penyesuaian',
    tone: 'default' as const,
  }
}

function getStockOutReason(stockTypeName: string, notes: string | null | undefined): AdminInventoryStockOutReason {
  const normalizedType = normalizeStockTypeName(stockTypeName)
  const normalizedNotes = normalizeStockTypeName(notes ?? '')

  if (normalizedType.includes('EXPIRED') || normalizedNotes.includes('KEDALUWARSA')) {
    return 'EXPIRED'
  }

  if (normalizedType.includes('DAMAGED') || normalizedNotes.includes('RUSAK')) {
    return 'DAMAGED'
  }

  return 'OTHER'
}

function isStockOutReason(value: string): value is AdminInventoryStockOutReason {
  return value === 'DAMAGED' || value === 'EXPIRED' || value === 'OTHER'
}

function normalizeStockTypeName(value: string) {
  return value.trim().toUpperCase().replace(/[\s-]+/g, '_')
}

function toNumber(value: number | string | null | undefined) {
  const parsed = Number(value ?? 0)

  return Number.isFinite(parsed) ? parsed : 0
}

function formatCurrency(value: number) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0).replace(/\s/g, '')
}

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0)
}
