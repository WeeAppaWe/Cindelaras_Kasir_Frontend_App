import type { ApiPaginationPage } from '#layers/base/app/types/api-response'
import type { AdminStatusTone } from './admin-management'

export interface AdminUserListQuery {
  batch?: number
  size?: number
  search?: string
  role_id?: string
  user_status_id?: string
}

export interface AdminUserRoleApiRecord {
  role_id: string
  name: string
}

export interface AdminUserStatusApiRecord {
  user_status_id: string
  name: string
}

export interface AdminUserApiRecord {
  user_id: string
  username: string
  name: string
  phone_number?: string | null
  last_login?: string | null
  created_at?: string
  updated_at?: string | null
  deleted_at?: string | null
  role?: AdminUserRoleApiRecord | null
  user_status?: AdminUserStatusApiRecord | null
}

export interface AdminUserListResponse {
  page: ApiPaginationPage
  records: AdminUserApiRecord[]
}

export interface AdminUserCreateRequest {
  username: string
  password: string
  name: string
  role_id: string
  user_status_id?: string
  phone_number?: string | null
}

export interface AdminUserUpdateRequest {
  username?: string
  password?: string
  name?: string
  role_id?: string
  user_status_id?: string
  phone_number?: string | null
}

export interface AdminUserDeleteResponse {
  success: boolean
  message?: string
}

export interface AdminUserOption {
  id: string
  name: string
  label: string
}

export interface AdminUserFormPayload {
  name: string
  username: string
  password: string
  phoneNumber: string
  roleId: string
  statusId: string
}

export interface AdminUserViewItem {
  id: string
  name: string
  username: string
  phoneNumber: string
  phoneNumberLabel: string
  roleId: string
  roleName: string
  roleLabel: string
  roleTone: AdminStatusTone
  statusId: string
  statusName: string
  statusLabel: string
  statusTone: AdminStatusTone
  lastLogin: string
  createdAt: string
  updatedAt: string
  hasBeenUpdated: boolean
}
