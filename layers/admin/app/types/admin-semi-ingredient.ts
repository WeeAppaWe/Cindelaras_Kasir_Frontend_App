import type { ApiPaginationPage } from '#layers/base/app/types/api-response'
import type { AdminStatusTone } from './admin-management'

export interface AdminSemiIngredientListQuery {
  batch?: number
  size?: number
  search?: string
  unit_id?: string
}

export interface AdminSemiIngredientUnitRecord {
  unit_measure_id: string
  name: string
}

export interface AdminSemiIngredientBaseRecord {
  ingredient_id: string
  name: string
  type: 'SEMI' | string
  stock_qty: number | string
  min_stock: number | string
  avg_cost: number | string
  created_at?: string
  updated_at?: string | null
  deleted_at?: string | null
  unit?: AdminSemiIngredientUnitRecord | null
}

export interface AdminSemiIngredientCompositionRecord {
  ingredient_composition_id: string
  parent_id?: string
  child_id: string
  qty_needed: number | string
  child_ingredient?: {
    ingredient_id: string
    name: string
    avg_cost: number | string
    unit?: AdminSemiIngredientUnitRecord | null
  } | null
}

export interface AdminSemiIngredientDetailRecord extends AdminSemiIngredientBaseRecord {
  total_hpp?: number | string
  target_yield?: number | string
  child_compositions?: AdminSemiIngredientCompositionRecord[]
  compositions?: AdminSemiIngredientCompositionRecord[]
}

export interface AdminSemiIngredientListResponse {
  page: ApiPaginationPage
  records: AdminSemiIngredientBaseRecord[]
}

export interface AdminSemiIngredientMutationRequest {
  name?: string
  unit_id?: string
  min_stock?: number
}

export interface AdminSemiIngredientDeleteResponse {
  success: boolean
  message?: string
}

export interface AdminSemiIngredientCompositionRequest {
  child_id: string
  qty_needed: number
}

export interface AdminSemiIngredientBulkCompositionRequest {
  compositions: AdminSemiIngredientCompositionRequest[]
}

export interface AdminSemiIngredientCreateAndProduceRequest {
  name: string
  unit_id: string
  min_stock: number
  qty: number
  notes?: string
  compositions: AdminSemiIngredientCompositionRequest[]
}

export interface AdminSemiIngredientBulkCompositionResponse {
  parent_id: string
  total_hpp: number | string
  hpp_per_unit: number | string
  compositions: AdminSemiIngredientCompositionRecord[]
}

export interface AdminSemiIngredientAvailableRawRecord {
  ingredient_id: string
  name: string
  type?: 'RAW' | 'SEMI' | string
  avg_cost: number | string
  stock_qty?: number | string
  unit?: AdminSemiIngredientUnitRecord | null
}

export interface AdminSemiIngredientPreviewHppRequest {
  target_yield: number
  compositions: AdminSemiIngredientCompositionRequest[]
}

export interface AdminSemiIngredientPreviewHppComposition {
  ingredient_name: string
  qty_needed: number | string
  unit_name: string
  unit_cost: number | string
  subtotal: number | string
}

export interface AdminSemiIngredientPreviewHppResponse {
  total_hpp: number | string
  target_yield: number | string
  hpp_per_unit: number | string
  composition_count: number
  compositions: AdminSemiIngredientPreviewHppComposition[]
}

export interface AdminSemiIngredientUnitOption {
  id: string
  name: string
}

export interface AdminSemiIngredientAvailableRawOption {
  id: string
  name: string
  type: string
  unit: string
  unitName: string
  avgCost: number
  costPerUnit: number
}

export interface AdminSemiIngredientFormPayload {
  name: string
  unitId: string
  minStock: number
  compositions: AdminSemiIngredientCompositionRequest[]
}

export interface AdminSemiIngredientCompositionViewItem {
  id: string
  childId: string
  ingredientName: string
  qtyNeeded: number
  unitName: string
  avgCost: number
  subtotal: number
  qtyLabel: string
  avgCostLabel: string
  subtotalLabel: string
}

export interface AdminSemiIngredientViewItem {
  id: string
  name: string
  type: string
  unitId: string
  unitName: string
  stockQty: number
  minStock: number
  avgCost: number
  totalHpp: number
  stockLabel: string
  minStockLabel: string
  avgCostLabel: string
  totalHppLabel: string
  inventoryValue: number
  inventoryValueLabel: string
  compositionCount: number
  compositionSummary: string
  statusLabel: string
  statusTone: AdminStatusTone
  statusKey: 'safe' | 'low' | 'critical'
  createdAt: string
  updatedAt: string
  hasBeenUpdated: boolean
  compositions: AdminSemiIngredientCompositionViewItem[]
}

export interface AdminSemiIngredientProduceRequest {
  qty: number
  notes?: string
}

export interface AdminSemiIngredientProduceDeductedItem {
  ingredient_id: string
  ingredient_name: string
  qty_deducted: number
  remaining_stock: number
}

export interface AdminSemiIngredientProduceResult {
  ingredient_id: string
  name: string
  type: string
  stock_qty: number
  min_stock: number
  avg_cost: number
  unit?: AdminSemiIngredientUnitRecord | null
  produced_qty: number
  deducted_ingredients: AdminSemiIngredientProduceDeductedItem[]
}
