import type { ApiPaginationPage } from '#layers/base/app/types/api-response'

export interface AdminUnitMeasureListQuery {
  batch?: number
  size?: number
  search?: string
}

export interface AdminUnitMeasureApiRecord {
  unit_measure_id: string
  name: string
  created_at?: string
  updated_at?: string | null
  deleted_at?: string | null
}

export interface AdminUnitMeasureListResponse {
  page: ApiPaginationPage
  records: AdminUnitMeasureApiRecord[]
}

export interface AdminUnitMeasureMutationRequest {
  name: string
}

export interface AdminUnitMeasureDeleteResponse {
  success: boolean
  message?: string
}

export interface AdminUnitMeasureFormPayload {
  name: string
}

export interface AdminUnitMeasureViewItem {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  hasBeenUpdated: boolean
}
