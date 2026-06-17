import type {
  AdminRawIngredientApiRecord,
  AdminRawIngredientFormPayload,
  AdminRawIngredientMutationRequest,
  AdminRawIngredientUnitOption,
  AdminRawIngredientUnitRecord,
  AdminRawIngredientViewItem,
} from '../types/admin-ingredient'

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

export function mapAdminRawIngredientRecordToViewItem(
  record: AdminRawIngredientApiRecord,
): AdminRawIngredientViewItem {
  const stockQty = toNumber(record.stock_qty)
  const minStock = toNumber(record.min_stock)
  const avgCost = toNumber(record.avg_cost)
  const status = getStockStatus(stockQty, minStock)
  const unitName = record.unit?.name?.trim() || '-'
  const inventoryValue = Math.round(stockQty * avgCost)

  return {
    id: record.ingredient_id,
    name: record.name,
    type: record.type,
    unitId: record.unit?.unit_measure_id ?? '',
    unitName,
    stockQty,
    minStock,
    avgCost,
    stockLabel: `${formatNumber(stockQty)} ${unitName}`,
    minStockLabel: `${formatNumber(minStock)} ${unitName}`,
    avgCostLabel: formatCurrency(avgCost),
    inventoryValue,
    inventoryValueLabel: formatCurrency(inventoryValue),
    statusLabel: status.label,
    statusTone: status.tone,
    statusKey: status.key,
    createdAt: formatAdminIngredientDateTime(record.created_at),
    updatedAt: formatAdminIngredientDateTime(record.updated_at),
    hasBeenUpdated: Boolean(record.updated_at),
  }
}

export function mapAdminRawIngredientUnitRecordToOption(
  record: AdminRawIngredientUnitRecord,
): AdminRawIngredientUnitOption {
  return {
    id: record.unit_measure_id,
    name: record.name,
  }
}

export function createAdminRawIngredientCreatePayload(
  payload: AdminRawIngredientFormPayload,
): AdminRawIngredientMutationRequest {
  return {
    name: payload.name.trim(),
    unit_id: payload.unitId,
    stock_qty: payload.stockQty,
    min_stock: payload.minStock,
    avg_cost: payload.avgCost,
  }
}

export function createAdminRawIngredientUpdatePayload(
  payload: AdminRawIngredientFormPayload,
): AdminRawIngredientMutationRequest {
  return {
    name: payload.name.trim(),
    unit_id: payload.unitId,
    min_stock: payload.minStock,
    avg_cost: payload.avgCost,
  }
}

export function getAdminRawIngredientValidationMessage(payload: AdminRawIngredientFormPayload) {
  const name = payload.name.trim()

  if (!name) {
    return 'Nama bahan baku wajib diisi.'
  }

  if (name.length < 2) {
    return 'Nama bahan baku minimal 2 karakter.'
  }

  if (name.length > 100) {
    return 'Nama bahan baku maksimal 100 karakter.'
  }

  if (!payload.unitId) {
    return 'Satuan wajib dipilih.'
  }

  if (!Number.isFinite(payload.stockQty) || payload.stockQty < 0) {
    return 'Stok awal harus 0 atau lebih.'
  }

  if (!Number.isFinite(payload.minStock) || payload.minStock < 0) {
    return 'Stok minimum harus 0 atau lebih.'
  }

  if (!Number.isFinite(payload.avgCost) || payload.avgCost < 0) {
    return 'Harga rata-rata harus 0 atau lebih.'
  }

  return ''
}

export function formatAdminIngredientDateTime(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}

export function formatAdminIngredientCurrency(value: number) {
  return formatCurrency(value)
}

function getStockStatus(stockQty: number, minStock: number) {
  if (stockQty <= 0 && minStock > 0) {
    return {
      key: 'critical' as const,
      label: 'Kritis',
      tone: 'destructive' as const,
    }
  }

  if (stockQty <= minStock) {
    return {
      key: 'low' as const,
      label: 'Menipis',
      tone: 'warning' as const,
    }
  }

  return {
    key: 'safe' as const,
    label: 'Aman',
    tone: 'success' as const,
  }
}

function toNumber(value: number | string) {
  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : 0
}

function formatCurrency(value: number) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0).replace(/\s/g, '')
}

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0)
}
