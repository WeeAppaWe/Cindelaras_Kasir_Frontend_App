import type { ApiPaginationPage } from '#layers/base/app/types/api-response'
import type { AdminStatusTone } from './admin-management'

export interface AdminInventoryListQuery {
  batch?: number
  size?: number
  search?: string
  ingredient_id?: string
  supplier_id?: string
  stock_type_id?: string
  date_from?: string
  date_to?: string
}

export interface AdminInventoryUnitRecord {
  unit_measure_id: string
  name: string
}

export interface AdminInventoryIngredientRecord {
  ingredient_id: string
  name: string
  type?: string
  unit?: AdminInventoryUnitRecord | null
}

export interface AdminInventorySupplierRecord {
  supplier_id: string
  name: string
}

export interface AdminInventoryStockTypeRecord {
  stock_type_id: string
  name: string
  created_at?: string
  updated_at?: string | null
}

export interface AdminInventoryUserRecord {
  user_id: string
  name: string
}

export interface AdminInventoryMovementRecord {
  stock_movement_id: string
  supplier_id?: string | null
  ingredient_id: string
  user_id: string
  stock_type_id: string
  qty: number | string
  unit_cost?: number | string | null
  current_stock: number | string
  notes?: string | null
  created_at: string
  updated_at?: string | null
  ingredient?: AdminInventoryIngredientRecord | null
  supplier?: AdminInventorySupplierRecord | null
  stock_type?: AdminInventoryStockTypeRecord | null
  user?: AdminInventoryUserRecord | null
}

export interface AdminInventoryMovementListResponse {
  page: ApiPaginationPage
  records: AdminInventoryMovementRecord[]
}

export interface AdminInventoryIngredientOptionRecord {
  ingredient_id: string
  name: string
  type?: string
  unit?: AdminInventoryUnitRecord | null
}

export interface AdminInventoryStockInCreateRequest {
  ingredient_id: string
  supplier_id: string
  qty: number
  unit_cost: number
  notes?: string
}

export type AdminInventoryStockOutReason = 'DAMAGED' | 'EXPIRED' | 'OTHER'

export interface AdminInventoryStockOutCreateRequest {
  ingredient_id: string
  qty: number
  reason: AdminInventoryStockOutReason
  notes?: string
}

export type AdminInventoryMovementKind = 'in' | 'out' | 'sale' | 'opname' | 'adjustment'

export interface AdminInventoryStockTypeOption {
  id: string
  name: string
  label: string
}

export interface AdminInventoryIngredientOption {
  id: string
  name: string
  type: string
  unitName: string
}

export interface AdminInventorySupplierOption {
  id: string
  name: string
}

export interface AdminInventoryMovementViewItem {
  id: string
  date: string
  ingredientId: string
  ingredientName: string
  unitName: string
  supplierId: string
  supplierName: string
  stockTypeId: string
  stockTypeName: string
  stockTypeLabel: string
  userName: string
  qty: number
  absQty: number
  unitCost: number
  currentStock: number
  notes: string
  movementKind: AdminInventoryMovementKind
  typeLabel: string
  typeTone: AdminStatusTone
  source: string
  quantityLabel: string
  balanceLabel: string
  unitCostLabel: string
  totalCost: number
  totalCostLabel: string
  reason: AdminInventoryStockOutReason
  reasonLabel: string
}

export interface AdminInventoryStockInFormPayload {
  ingredientId: string
  supplierId: string
  qty: number
  unitCost: number
  notes: string
}

export interface AdminInventoryStockOutFormPayload {
  ingredientId: string
  qty: number
  reason: AdminInventoryStockOutReason
  notes: string
}
