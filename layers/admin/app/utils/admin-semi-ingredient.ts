import type {
  AdminSemiIngredientAvailableRawOption,
  AdminSemiIngredientAvailableRawRecord,
  AdminSemiIngredientBaseRecord,
  AdminSemiIngredientBulkCompositionRequest,
  AdminSemiIngredientCompositionRecord,
  AdminSemiIngredientDetailRecord,
  AdminSemiIngredientFormPayload,
  AdminSemiIngredientMutationRequest,
  AdminSemiIngredientUnitOption,
  AdminSemiIngredientUnitRecord,
  AdminSemiIngredientViewItem,
} from '../types/admin-semi-ingredient'

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

export function mapAdminSemiIngredientRecordToViewItem(
  record: AdminSemiIngredientBaseRecord | AdminSemiIngredientDetailRecord,
): AdminSemiIngredientViewItem {
  const detailRecord = record as AdminSemiIngredientDetailRecord
  const stockQty = toNumber(record.stock_qty)
  const minStock = toNumber(record.min_stock)
  const avgCost = toNumber(record.avg_cost)
  const unitName = record.unit?.name?.trim() || '-'
  const compositionRecords = Array.isArray(detailRecord.child_compositions)
    ? detailRecord.child_compositions
    : Array.isArray(detailRecord.compositions)
      ? detailRecord.compositions
      : []
  const compositions = compositionRecords.map(mapAdminSemiIngredientCompositionRecordToViewItem)
  const totalHpp = toNumber(
    detailRecord.total_hpp
    ?? compositions.reduce((total, item) => total + item.subtotal, 0),
  )
  const inventoryValue = Math.round(stockQty * avgCost)
  const status = getStockStatus(stockQty, minStock)

  return {
    id: record.ingredient_id,
    name: record.name,
    type: record.type,
    unitId: record.unit?.unit_measure_id ?? '',
    unitName,
    stockQty,
    minStock,
    avgCost,
    totalHpp,
    stockLabel: `${formatNumber(stockQty)} ${unitName}`,
    minStockLabel: `${formatNumber(minStock)} ${unitName}`,
    avgCostLabel: formatCurrency(avgCost),
    totalHppLabel: formatCurrency(totalHpp),
    inventoryValue,
    inventoryValueLabel: formatCurrency(inventoryValue),
    compositionCount: compositions.length,
    compositionSummary: createCompositionSummary(compositions),
    statusLabel: status.label,
    statusTone: status.tone,
    statusKey: status.key,
    createdAt: formatAdminSemiIngredientDateTime(record.created_at),
    updatedAt: formatAdminSemiIngredientDateTime(record.updated_at),
    hasBeenUpdated: Boolean(record.updated_at),
    compositions,
  }
}

export function mapAdminSemiIngredientCompositionRecordToViewItem(
  record: AdminSemiIngredientCompositionRecord,
) {
  const qtyNeeded = toNumber(record.qty_needed)
  const avgCost = toNumber(record.child_ingredient?.avg_cost ?? 0)
  const subtotal = Math.round(qtyNeeded * avgCost)
  const unitName = record.child_ingredient?.unit?.name?.trim() || '-'

  return {
    id: record.ingredient_composition_id,
    childId: record.child_id,
    ingredientName: record.child_ingredient?.name || record.child_id,
    qtyNeeded,
    unitName,
    avgCost,
    subtotal,
    qtyLabel: `${formatNumber(qtyNeeded)} ${unitName}`,
    avgCostLabel: formatCurrency(avgCost),
    subtotalLabel: formatCurrency(subtotal),
  }
}

export function mapAdminSemiIngredientUnitRecordToOption(
  record: AdminSemiIngredientUnitRecord,
): AdminSemiIngredientUnitOption {
  return {
    id: record.unit_measure_id,
    name: record.name,
  }
}

export function mapAdminSemiIngredientAvailableRawRecordToOption(
  record: AdminSemiIngredientAvailableRawRecord,
): AdminSemiIngredientAvailableRawOption {
  const unitName = record.unit?.name?.trim() || '-'
  const avgCost = toNumber(record.avg_cost)
  const type = record.type ?? 'RAW'

  return {
    id: record.ingredient_id,
    name: record.name,
    type,
    unit: unitName,
    unitName,
    avgCost,
    costPerUnit: avgCost,
  }
}

export function createAdminSemiIngredientProfilePayload(
  payload: AdminSemiIngredientFormPayload,
): AdminSemiIngredientMutationRequest {
  return {
    name: payload.name.trim(),
    unit_id: payload.unitId,
    min_stock: payload.minStock,
  }
}

export function createAdminSemiIngredientBulkCompositionPayload(
  payload: AdminSemiIngredientFormPayload,
): AdminSemiIngredientBulkCompositionRequest {
  return {
    compositions: payload.compositions.map(item => ({
      child_id: item.child_id,
      qty_needed: item.qty_needed,
    })),
  }
}

export function createAdminSemiIngredientFormPayloadFromViewItem(
  item: AdminSemiIngredientViewItem,
): AdminSemiIngredientFormPayload {
  return {
    name: item.name,
    unitId: item.unitId,
    minStock: item.minStock,
    compositions: item.compositions.map(composition => ({
      child_id: composition.childId,
      qty_needed: composition.qtyNeeded,
    })),
  }
}

export function getAdminSemiIngredientValidationMessage(payload: AdminSemiIngredientFormPayload) {
  const name = payload.name.trim()

  if (!name) {
    return 'Nama bahan setengah jadi wajib diisi.'
  }

  if (name.length < 2) {
    return 'Nama bahan setengah jadi minimal 2 karakter.'
  }

  if (name.length > 100) {
    return 'Nama bahan setengah jadi maksimal 100 karakter.'
  }

  if (!payload.unitId) {
    return 'Satuan hasil wajib dipilih.'
  }

  if (!Number.isFinite(payload.minStock) || payload.minStock < 0) {
    return 'Stok minimum harus 0 atau lebih.'
  }

  if (!payload.compositions.length) {
    return 'Tambahkan minimal 1 bahan baku penyusun.'
  }

  const usedChildIds = new Set<string>()

  for (const composition of payload.compositions) {
    if (!composition.child_id) {
      return 'Setiap baris resep wajib memilih bahan baku.'
    }

    if (usedChildIds.has(composition.child_id)) {
      return 'Bahan baku penyusun tidak boleh duplikat.'
    }

    if (!Number.isFinite(composition.qty_needed) || composition.qty_needed <= 0) {
      return 'Jumlah bahan penyusun harus lebih dari 0.'
    }

    usedChildIds.add(composition.child_id)
  }

  return ''
}

export function formatAdminSemiIngredientApiError(error: unknown, fallback = 'Gagal menyimpan bahan setengah jadi.') {
  const message = getApiErrorMessage(error) || fallback
  const entries = getApiErrorEntries(error)
  const detailEntries = entries
    .map(formatApiErrorEntry)
    .filter(item => item !== `- ${message}`)
    .filter(Boolean)
    .filter((item, index, items) => items.indexOf(item) === index)

  if (!detailEntries.length) {
    return message
  }

  return [message, ...detailEntries].join('\n')
}

export function formatAdminSemiIngredientCurrency(value: number) {
  return formatCurrency(value)
}

export function formatAdminSemiIngredientDateTime(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}

function createCompositionSummary(compositions: ReturnType<typeof mapAdminSemiIngredientCompositionRecordToViewItem>[]) {
  if (!compositions.length) {
    return 'Buka detail untuk melihat atau lengkapi komposisi.'
  }

  const names = compositions.slice(0, 3).map(item => `${item.ingredientName} ${item.qtyLabel}`)
  const remainingCount = compositions.length - names.length

  return remainingCount > 0
    ? `${names.join(', ')} +${remainingCount} bahan`
    : names.join(', ')
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

function getApiErrorMessage(error: unknown) {
  const candidates = [
    error,
    isRecord(error) ? error.data : null,
    isRecord(error) ? error.raw : null,
    isRecord(error) && isRecord(error.raw) ? error.raw.data : null,
  ]

  for (const candidate of candidates) {
    if (isRecord(candidate) && typeof candidate.message === 'string' && candidate.message.trim()) {
      return candidate.message.trim()
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message.trim()
  }

  return ''
}

function getApiErrorEntries(error: unknown) {
  const candidates = [
    isRecord(error) ? error.errors : null,
    isRecord(error) ? error.data : null,
    isRecord(error) ? error.raw : null,
    isRecord(error) && isRecord(error.raw) ? error.raw.data : null,
  ]
  const entries: unknown[] = []

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      entries.push(...candidate)
      continue
    }

    if (isRecord(candidate)) {
      if (Array.isArray(candidate.errors)) {
        entries.push(...candidate.errors)
      }

      if (Array.isArray(candidate.error)) {
        entries.push(...candidate.error)
      }
    }
  }

  return entries
}

function formatApiErrorEntry(entry: unknown) {
  if (!isRecord(entry)) {
    return ''
  }

  const field = typeof entry.field === 'string' ? entry.field.trim() : ''
  const message = typeof entry.message === 'string' ? entry.message.trim() : ''

  if (!message) {
    return ''
  }

  if (!field || field === 'qty') {
    return `- ${message}`
  }

  return `- ${field}: ${message}`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
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
