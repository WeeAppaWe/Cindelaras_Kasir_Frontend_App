import type {
  AdminUnitMeasureApiRecord,
  AdminUnitMeasureFormPayload,
  AdminUnitMeasureMutationRequest,
  AdminUnitMeasureViewItem,
} from '../types/admin-unit-measure'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function mapAdminUnitMeasureRecordToViewItem(record: AdminUnitMeasureApiRecord): AdminUnitMeasureViewItem {
  return {
    id: record.unit_measure_id,
    name: record.name,
    createdAt: formatAdminUnitMeasureDateTime(record.created_at),
    updatedAt: formatAdminUnitMeasureDateTime(record.updated_at),
    hasBeenUpdated: Boolean(record.updated_at),
  }
}

export function createAdminUnitMeasureMutationPayload(
  payload: AdminUnitMeasureFormPayload,
): AdminUnitMeasureMutationRequest {
  return {
    name: payload.name.trim(),
  }
}

export function getAdminUnitMeasureNameValidationMessage(name: string) {
  const trimmedName = name.trim()

  if (!trimmedName) {
    return 'Nama satuan wajib diisi.'
  }

  if (trimmedName.length > 50) {
    return 'Nama satuan maksimal 50 karakter.'
  }

  return ''
}

export function formatAdminUnitMeasureDateTime(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}
