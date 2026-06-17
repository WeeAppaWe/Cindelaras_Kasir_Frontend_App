import type { ApiPaginationPage } from '#layers/base/app/types/api-response'

export interface AdminCategoryListQuery {
  batch?: number
  size?: number
  search?: string
}

export interface AdminCategoryApiRecord {
  category_id: string
  name: string
  created_at?: string
  updated_at?: string | null
  deleted_at?: string | null
  _count?: {
    menus?: number
  }
}

export interface AdminCategoryListResponse {
  page: ApiPaginationPage
  records: AdminCategoryApiRecord[]
}

export interface AdminCategoryMutationRequest {
  name: string
}

export interface AdminCategoryDeleteResponse {
  success: boolean
  message?: string
}

export interface AdminCategoryFormPayload {
  name: string
}

export interface AdminCategoryViewItem {
  id: string
  name: string
  menuCount: number
  menuCountLabel: string
  createdAt: string
  updatedAt: string
}
