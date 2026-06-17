import type {
  AdminCategoryApiRecord,
  AdminCategoryFormPayload,
  AdminCategoryMutationRequest,
  AdminCategoryViewItem,
} from '../types/admin-category'

const numberFormatter = new Intl.NumberFormat('id-ID')

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function mapAdminCategoryRecordToViewItem(record: AdminCategoryApiRecord): AdminCategoryViewItem {
  const menuCount = Number(record._count?.menus ?? 0)
  const normalizedMenuCount = Number.isFinite(menuCount) ? menuCount : 0

  return {
    id: record.category_id,
    name: record.name,
    menuCount: normalizedMenuCount,
    menuCountLabel: `${numberFormatter.format(normalizedMenuCount)} menu`,
    createdAt: formatAdminCategoryDateTime(record.created_at),
    updatedAt: formatAdminCategoryDateTime(record.updated_at),
  }
}

export function createAdminCategoryMutationPayload(payload: AdminCategoryFormPayload): AdminCategoryMutationRequest {
  return {
    name: payload.name.trim(),
  }
}

export function getAdminCategoryNameValidationMessage(name: string) {
  const trimmedName = name.trim()

  if (!trimmedName) {
    return 'Nama kategori wajib diisi.'
  }

  if (trimmedName.length < 2) {
    return 'Nama kategori minimal 2 karakter.'
  }

  if (trimmedName.length > 50) {
    return 'Nama kategori maksimal 50 karakter.'
  }

  return ''
}

export function formatAdminCategoryDateTime(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}
