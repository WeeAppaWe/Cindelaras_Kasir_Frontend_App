import type { ApiPaginationPage } from '#layers/base/app/types/api-response'
import type { AdminStatusTone } from './admin-management'

export interface AdminRawIngredientListQuery {
  batch?: number
  size?: number
  search?: string
  unit_id?: string
  low_stock?: boolean
}

export interface AdminRawIngredientUnitRecord {
  unit_measure_id: string
  name: string
}

export interface AdminRawIngredientApiRecord {
  ingredient_id: string
  name: string
  type: 'RAW' | string
  stock_qty: number | string
  min_stock: number | string
  avg_cost: number | string
  created_at?: string
  updated_at?: string | null
  deleted_at?: string | null
  unit?: AdminRawIngredientUnitRecord | null
}

export interface AdminRawIngredientListResponse {
  page: ApiPaginationPage
  records: AdminRawIngredientApiRecord[]
}

export interface AdminRawIngredientLowStockResponse {
  total_count: number
  records: AdminRawIngredientApiRecord[]
}

export interface AdminRawIngredientMutationRequest {
  name?: string
  unit_id?: string
  min_stock?: number
  avg_cost?: number
  stock_qty?: number
}

export interface AdminRawIngredientDeleteResponse {
  success: boolean
  message?: string
}

export interface AdminRawIngredientUnitOption {
  id: string
  name: string
}

export interface AdminRawIngredientFormPayload {
  name: string
  unitId: string
  stockQty: number
  minStock: number
  avgCost: number
}

export interface AdminRawIngredientViewItem {
  id: string
  name: string
  type: string
  unitId: string
  unitName: string
  stockQty: number
  minStock: number
  avgCost: number
  stockLabel: string
  minStockLabel: string
  avgCostLabel: string
  inventoryValue: number
  inventoryValueLabel: string
  statusLabel: string
  statusTone: AdminStatusTone
  statusKey: 'safe' | 'low' | 'critical'
  createdAt: string
  updatedAt: string
  hasBeenUpdated: boolean
}
