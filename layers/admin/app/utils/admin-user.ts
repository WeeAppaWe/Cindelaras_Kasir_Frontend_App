import type {
  AdminUserApiRecord,
  AdminUserCreateRequest,
  AdminUserFormPayload,
  AdminUserOption,
  AdminUserRoleApiRecord,
  AdminUserStatusApiRecord,
  AdminUserUpdateRequest,
  AdminUserViewItem,
} from '../types/admin-user'
import type { AdminStatusTone } from '../types/admin-management'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function mapAdminUserRoleOption(record: AdminUserRoleApiRecord): AdminUserOption {
  return {
    id: record.role_id,
    name: record.name,
    label: formatAdminUserRoleName(record.name),
  }
}

export function mapAdminUserStatusOption(record: AdminUserStatusApiRecord): AdminUserOption {
  return {
    id: record.user_status_id,
    name: record.name,
    label: formatAdminUserStatusName(record.name),
  }
}

export function mapAdminUserRecordToViewItem(record: AdminUserApiRecord): AdminUserViewItem {
  const roleName = record.role?.name ?? '-'
  const statusName = record.user_status?.name ?? '-'
  const phoneNumber = record.phone_number?.trim() ?? ''

  return {
    id: record.user_id,
    name: record.name,
    username: record.username,
    phoneNumber,
    phoneNumberLabel: phoneNumber || '-',
    roleId: record.role?.role_id ?? '',
    roleName,
    roleLabel: formatAdminUserRoleName(roleName),
    roleTone: getAdminUserRoleTone(roleName),
    statusId: record.user_status?.user_status_id ?? '',
    statusName,
    statusLabel: formatAdminUserStatusName(statusName),
    statusTone: getAdminUserStatusTone(statusName),
    lastLogin: formatAdminUserDateTime(record.last_login),
    createdAt: formatAdminUserDateTime(record.created_at),
    updatedAt: formatAdminUserDateTime(record.updated_at),
    hasBeenUpdated: Boolean(record.updated_at),
  }
}

export function createAdminUserCreatePayload(payload: AdminUserFormPayload): AdminUserCreateRequest {
  return {
    username: payload.username.trim(),
    password: payload.password,
    name: payload.name.trim(),
    role_id: payload.roleId,
    user_status_id: payload.statusId || undefined,
    phone_number: payload.phoneNumber.trim() || null,
  }
}

export function createAdminUserUpdatePayload(payload: AdminUserFormPayload): AdminUserUpdateRequest {
  const updatePayload: AdminUserUpdateRequest = {
    username: payload.username.trim(),
    name: payload.name.trim(),
    role_id: payload.roleId,
    user_status_id: payload.statusId,
    phone_number: payload.phoneNumber.trim() || null,
  }

  if (payload.password) {
    updatePayload.password = payload.password
  }

  return updatePayload
}

export function getAdminUserValidationMessage(payload: AdminUserFormPayload, mode: 'create' | 'edit') {
  const name = payload.name.trim()
  const username = payload.username.trim()
  const password = payload.password
  const phoneNumber = payload.phoneNumber.trim()

  if (!name) {
    return 'Nama pengguna wajib diisi.'
  }

  if (name.length < 2) {
    return 'Nama pengguna minimal 2 karakter.'
  }

  if (name.length > 100) {
    return 'Nama pengguna maksimal 100 karakter.'
  }

  if (!username) {
    return 'Username wajib diisi.'
  }

  if (username.length < 3) {
    return 'Username minimal 3 karakter.'
  }

  if (username.length > 50) {
    return 'Username maksimal 50 karakter.'
  }

  if (!/^\w+$/.test(username)) {
    return 'Username hanya boleh berisi huruf, angka, dan underscore.'
  }

  if (mode === 'create' && !password) {
    return 'Password wajib diisi.'
  }

  if (password && password.length < 6) {
    return 'Password minimal 6 karakter.'
  }

  if (phoneNumber && (phoneNumber.length < 9 || phoneNumber.length > 20)) {
    return 'Nomor handphone harus 9 sampai 20 karakter.'
  }

  if (!payload.roleId) {
    return 'Role pengguna wajib dipilih.'
  }

  if (!payload.statusId) {
    return 'Status pengguna wajib dipilih.'
  }

  return ''
}

export function formatAdminUserRoleName(value: string) {
  const normalized = value.trim().toUpperCase()

  if (normalized === 'ADMIN') {
    return 'Admin'
  }

  if (normalized === 'CASHIER') {
    return 'Kasir'
  }

  return value || '-'
}

export function formatAdminUserStatusName(value: string) {
  const normalized = value.trim().toUpperCase()

  if (normalized === 'ACTIVE') {
    return 'Aktif'
  }

  if (normalized === 'INACTIVE') {
    return 'Nonaktif'
  }

  if (normalized === 'DELETED') {
    return 'Dihapus'
  }

  return value || '-'
}

export function getAdminUserRoleTone(value: string): AdminStatusTone {
  return value.trim().toUpperCase() === 'ADMIN' ? 'info' : 'default'
}

export function getAdminUserStatusTone(value: string): AdminStatusTone {
  const normalized = value.trim().toUpperCase()

  if (normalized === 'ACTIVE') {
    return 'success'
  }

  if (normalized === 'INACTIVE') {
    return 'warning'
  }

  if (normalized === 'DELETED') {
    return 'destructive'
  }

  return 'default'
}

export function formatAdminUserDateTime(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  if (/^\d{2}:\d{2}(:\d{2})?$/.test(value)) {
    return value.slice(0, 5)
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}
