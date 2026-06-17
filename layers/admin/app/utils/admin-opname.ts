import type {
  AdminOpnameCreateRequest,
  AdminOpnameDetailLineViewItem,
  AdminOpnameFormPayload,
  AdminOpnameIngredientOption,
  AdminOpnameIngredientRecord,
  AdminOpnameItemRecord,
  AdminOpnameRecord,
  AdminOpnameStatus,
  AdminOpnameUpdateRequest,
  AdminOpnameViewItem,
} from '../types/admin-opname'
import type { AdminStatusTone } from '../types/admin-management'

const numberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 2,
})
const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})
const dateTimeFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function mapAdminOpnameIngredientRecordToOption(
  record: AdminOpnameIngredientRecord,
): AdminOpnameIngredientOption {
  const stockQty = toNumber(record.stock_qty)
  const unitName = record.unit?.name?.trim() || '-'

  return {
    id: record.ingredient_id,
    name: record.name,
    stockQty,
    unitName,
    stockLabel: formatAdminOpnameQuantity(stockQty, unitName),
  }
}

export function mapAdminOpnameRecordToViewItem(record: AdminOpnameRecord): AdminOpnameViewItem {
  const items = (Array.isArray(record.items) ? record.items : []).map(mapAdminOpnameItemRecordToViewItem)
  const totalDifference = roundQty(items.reduce((total, item) => total + item.difference, 0))
  const status = normalizeAdminOpnameStatus(record.status)
  const itemCount = record._count?.items ?? items.length

  return {
    id: record.stock_opname_id,
    opnameDate: formatAdminOpnameDate(record.opname_date),
    opnameDateInput: formatAdminOpnameDateInput(record.opname_date),
    status,
    statusLabel: getAdminOpnameStatusLabel(status),
    statusTone: getAdminOpnameStatusTone(status),
    notes: record.notes?.trim() || '-',
    userName: record.user?.name || '-',
    itemCount,
    itemCountLabel: `${itemCount} bahan`,
    createdAt: formatAdminOpnameDateTime(record.created_at),
    updatedAt: record.updated_at ? formatAdminOpnameDateTime(record.updated_at) : '-',
    totalDifference,
    totalDifferenceLabel: items.length ? formatAdminOpnameSignedQuantity(totalDifference, '') : '-',
    totalDifferenceTone: getAdminOpnameDifferenceTone(totalDifference),
    items,
  }
}

export function createAdminOpnameCreatePayload(payload: AdminOpnameFormPayload): AdminOpnameCreateRequest {
  return {
    opname_date: payload.opnameDate,
    notes: payload.notes.trim() || undefined,
    items: payload.items.map(item => ({
      ingredient_id: item.ingredientId,
      physical_qty: item.physicalQty,
    })),
  }
}

export function createAdminOpnameUpdatePayload(payload: AdminOpnameFormPayload): AdminOpnameUpdateRequest {
  return {
    opname_date: payload.opnameDate,
    notes: payload.notes.trim(),
    items: payload.items.map(item => ({
      ingredient_id: item.ingredientId,
      physical_qty: item.physicalQty,
    })),
  }
}

export function getAdminOpnameValidationMessage(payload: AdminOpnameFormPayload) {
  if (!payload.opnameDate) {
    return 'Tanggal opname wajib diisi.'
  }

  if (payload.notes.length > 500) {
    return 'Catatan maksimal 500 karakter.'
  }

  if (!payload.items.length) {
    return 'Tambahkan minimal 1 bahan ke sesi stok opname.'
  }

  const selectedIds = new Set<string>()

  for (const item of payload.items) {
    if (!item.ingredientId) {
      return 'Setiap baris opname wajib memilih bahan.'
    }

    if (selectedIds.has(item.ingredientId)) {
      return 'Bahan yang sama tidak boleh dipilih lebih dari satu kali.'
    }

    selectedIds.add(item.ingredientId)

    if (!Number.isFinite(item.physicalQty) || item.physicalQty < 0) {
      return 'Stok fisik setiap bahan harus berupa angka 0 atau lebih.'
    }
  }

  return ''
}

export function isAdminOpnameEditable(status: AdminOpnameStatus) {
  return status === 'DRAFT'
}

export function canCompleteAdminOpname(status: AdminOpnameStatus) {
  return status === 'DRAFT'
}

export function canCancelAdminOpname(status: AdminOpnameStatus) {
  return status === 'DRAFT'
}

export function canApplyAdminOpname(status: AdminOpnameStatus) {
  return status === 'COMPLETED'
}

export function canDeleteAdminOpname(status: AdminOpnameStatus) {
  return status === 'DRAFT' || status === 'CANCELLED'
}

export function getAdminOpnameStatusLabel(status: AdminOpnameStatus) {
  if (status === 'DRAFT') {
    return 'Draft'
  }

  if (status === 'COMPLETED') {
    return 'Selesai'
  }

  if (status === 'APPLIED') {
    return 'Diterapkan'
  }

  return 'Dibatalkan'
}

export function getAdminOpnameStatusTone(status: AdminOpnameStatus): AdminStatusTone {
  if (status === 'COMPLETED') {
    return 'info'
  }

  if (status === 'APPLIED') {
    return 'success'
  }

  if (status === 'CANCELLED') {
    return 'destructive'
  }

  return 'warning'
}

export function getAdminOpnameDifferenceTone(value: number): AdminStatusTone {
  if (value === 0) {
    return 'success'
  }

  if (value < 0) {
    return 'destructive'
  }

  return 'warning'
}

export function formatAdminOpnameQuantity(value: number, unit: string) {
  const suffix = unit.trim()

  return suffix ? `${formatNumber(value)} ${suffix}` : formatNumber(value)
}

export function formatAdminOpnameSignedQuantity(value: number, unit: string) {
  if (value > 0) {
    return `+${formatAdminOpnameQuantity(value, unit)}`
  }

  return formatAdminOpnameQuantity(value, unit)
}

export function normalizeAdminOpnameStatus(value: string): AdminOpnameStatus {
  const normalized = value.trim().toUpperCase()

  if (normalized === 'COMPLETED' || normalized === 'APPLIED' || normalized === 'CANCELLED') {
    return normalized
  }

  return 'DRAFT'
}

export function parseAdminOpnameQtyInput(value: string) {
  const normalizedValue = value.trim().replace(',', '.')

  if (!normalizedValue) {
    return null
  }

  const parsedValue = Number(normalizedValue)

  if (!Number.isFinite(parsedValue)) {
    return null
  }

  return roundQty(parsedValue)
}

export function roundAdminOpnameQty(value: number) {
  return roundQty(value)
}

function mapAdminOpnameItemRecordToViewItem(record: AdminOpnameItemRecord): AdminOpnameDetailLineViewItem {
  const systemQty = toNumber(record.system_qty)
  const physicalQty = toNumber(record.physical_qty)
  const difference = toNumber(record.difference)
  const unitName = record.ingredient?.unit?.name?.trim() || '-'

  return {
    id: record.stock_opname_item_id,
    ingredientId: record.ingredient_id,
    ingredientName: record.ingredient?.name || record.ingredient_id,
    unitName,
    systemQty,
    physicalQty,
    difference,
    systemQtyLabel: formatAdminOpnameQuantity(systemQty, unitName),
    physicalQtyLabel: formatAdminOpnameQuantity(physicalQty, unitName),
    differenceLabel: formatAdminOpnameSignedQuantity(difference, unitName),
    differenceTone: getAdminOpnameDifferenceTone(difference),
  }
}

function formatAdminOpnameDate(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}

function formatAdminOpnameDateTime(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateTimeFormatter.format(date)
}

function formatAdminOpnameDateInput(value: string | null | undefined) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10)
  }

  return date.toISOString().slice(0, 10)
}

function toNumber(value: number | string | null | undefined) {
  const parsedValue = Number(value ?? 0)

  return Number.isFinite(parsedValue) ? roundQty(parsedValue) : 0
}

function roundQty(value: number) {
  return Math.round(value * 100) / 100
}

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0)
}
