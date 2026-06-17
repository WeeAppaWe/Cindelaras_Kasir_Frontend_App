import type { ApiPaginationPage } from '#layers/base/app/types/api-response'

export interface AdminSupplierListQuery {
  batch?: number
  size?: number
  search?: string
}

export interface AdminSupplierApiRecord {
  supplier_id: string
  name: string
  phone?: string | null
  address?: string | null
  created_at?: string
  updated_at?: string | null
  deleted_at?: string | null
  _count?: {
    stock_movements?: number
  }
}

export interface AdminSupplierListResponse {
  page: ApiPaginationPage
  records: AdminSupplierApiRecord[]
}

export interface AdminSupplierMutationRequest {
  name: string
  phone?: string | null
  address?: string | null
}

export interface AdminSupplierDeleteResponse {
  success: boolean
  message?: string
}

export interface AdminSupplierFormPayload {
  name: string
  phone: string
  address: string
}

export interface AdminSupplierViewItem {
  id: string
  name: string
  phone: string
  phoneLabel: string
  address: string
  addressLabel: string
  stockMovementCount: number
  stockMovementCountLabel: string
  createdAt: string
  updatedAt: string
  hasBeenUpdated: boolean
}
