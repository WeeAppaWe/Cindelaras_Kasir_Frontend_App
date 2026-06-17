import type { ApiPaginationPage } from '#layers/base/app/types/api-response'

export type AdminSpkIngredientType = 'all' | 'raw' | 'semi'

export interface AdminSpkAnalysisQuery {
  target_days?: number
  buffer_percent?: number
  lookback_days?: number
  ingredient_type?: AdminSpkIngredientType
  supplier_id?: string
}

export interface AdminSpkAnalysisConfig {
  target_days: number
  buffer_percent: number
  lookback_days: number
}

export interface AdminSpkLookbackPeriod {
  start_date: string
  end_date: string
}

export interface AdminSpkSummary {
  total_ingredients_analyzed: number
  total_needing_restock: number
  total_estimated_cost: number
  total_suppliers: number
}

export interface AdminSpkSupplierItem {
  ingredient_id: string
  name: string
  unit: string
  suggested_qty: number
  unit_price: number
  estimated_cost: number
}

export interface AdminSpkSupplierGroup {
  supplier_id?: string | null
  supplier_name?: string | null
  contact?: string | null
  items: AdminSpkSupplierItem[]
  total_items: number
  total_estimated_cost: number
}

export interface AdminSpkAnalysisItem {
  ingredient_id: string
  name: string
  type: 'raw' | 'semi' | string
  unit: string
  wma_daily_average: number
  current_stock: number
  min_stock: number
  suggested_qty: number
  avg_cost: number
  estimated_cost: number
  supplier_id?: string | null
  supplier_name?: string | null
}

export interface AdminSpkAnalysisResponse {
  config: AdminSpkAnalysisConfig
  analysis_date: string
  lookback_period: AdminSpkLookbackPeriod
  summary: AdminSpkSummary
  by_supplier: AdminSpkSupplierGroup[]
  all_items: AdminSpkAnalysisItem[]
}

export interface AdminSpkSupplierOption {
  id: string
  name: string
  contact: string
}

export interface AdminSpkSupplierListResponse {
  page?: ApiPaginationPage
  records?: Array<{
    supplier_id: string
    name: string
    phone?: string | null
  }>
}
