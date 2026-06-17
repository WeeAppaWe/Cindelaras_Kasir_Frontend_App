import type { ApiPaginationPage } from '#layers/base/app/types/api-response'
import type { AdminStatusTone } from './admin-management'

export type AdminOpnameStatus = 'DRAFT' | 'COMPLETED' | 'APPLIED' | 'CANCELLED'
export type AdminOpnameStatusMutation = 'COMPLETED' | 'CANCELLED'

export interface AdminOpnameListQuery {
  batch?: number
  size?: number
  search?: string
  status?: AdminOpnameStatus
  start_date?: string
  end_date?: string
}

export interface AdminOpnameUnitRecord {
  unit_measure_id: string
  name: string
}

export interface AdminOpnameIngredientRecord {
  ingredient_id: string
  name: string
  stock_qty?: number | string
  unit?: AdminOpnameUnitRecord | null
}

export interface AdminOpnameUserRecord {
  user_id: string
  name: string
}

export interface AdminOpnameItemRecord {
  stock_opname_item_id: string
  ingredient_id: string
  system_qty: number | string
  physical_qty: number | string
  difference: number | string
  ingredient?: AdminOpnameIngredientRecord | null
}

export interface AdminOpnameRecord {
  stock_opname_id: string
  opname_date: string
  status: AdminOpnameStatus | string
  notes?: string | null
  created_at: string
  updated_at?: string | null
  user?: AdminOpnameUserRecord | null
  _count?: {
    items?: number
  } | null
  items?: AdminOpnameItemRecord[]
}

export interface AdminOpnameListResponse {
  page: ApiPaginationPage
  records: AdminOpnameRecord[]
}

export interface AdminOpnameMutationItemRequest {
  ingredient_id: string
  physical_qty: number
}

export interface AdminOpnameCreateRequest {
  opname_date: string
  notes?: string
  items: AdminOpnameMutationItemRequest[]
}

export interface AdminOpnameUpdateRequest {
  opname_date?: string
  notes?: string
  items?: AdminOpnameMutationItemRequest[]
}

export interface AdminOpnameStatusUpdateRequest {
  status: AdminOpnameStatusMutation
}

export interface AdminOpnameApplyResponse {
  success: boolean
  message: string
  adjustments_count: number
}

export interface AdminOpnameDeleteResponse {
  success: boolean
  message: string
}

export interface AdminOpnameIngredientOption {
  id: string
  name: string
  stockQty: number
  unitName: string
  stockLabel: string
}

export interface AdminOpnameDetailLineViewItem {
  id: string
  ingredientId: string
  ingredientName: string
  unitName: string
  systemQty: number
  physicalQty: number
  difference: number
  systemQtyLabel: string
  physicalQtyLabel: string
  differenceLabel: string
  differenceTone: AdminStatusTone
}

export interface AdminOpnameViewItem {
  id: string
  opnameDate: string
  opnameDateInput: string
  status: AdminOpnameStatus
  statusLabel: string
  statusTone: AdminStatusTone
  notes: string
  userName: string
  itemCount: number
  itemCountLabel: string
  createdAt: string
  updatedAt: string
  totalDifference: number
  totalDifferenceLabel: string
  totalDifferenceTone: AdminStatusTone
  items: AdminOpnameDetailLineViewItem[]
}

export interface AdminOpnameFormLinePayload {
  ingredientId: string
  physicalQty: number
}

export interface AdminOpnameFormPayload {
  opnameDate: string
  notes: string
  items: AdminOpnameFormLinePayload[]
}
