export type AdminDashboardMetricTone = 'default' | 'success' | 'warning' | 'info' | 'profit' | 'destructive'

export interface AdminDashboardMetric {
  id: string
  label: string
  value: string
  helper: string
  tone: AdminDashboardMetricTone
  trendLabel?: string
}

export interface AdminSalesTrendPoint {
  label: string
  revenue: number
  transactions: number
  revenueLabel: string
  ratio: number
}

export interface AdminPopularMenuItem {
  id: string
  name: string
  category: string
  sold: number
  revenue: number
  marginPercent: number
  revenueLabel: string
}

export type AdminInventoryStatusTone = 'success' | 'warning' | 'destructive'

export interface AdminInventoryStatusItem {
  id: string
  status: AdminDashboardStockStatusName
  count: number
  percentage: number
  statusLabel: string
  tone: AdminInventoryStatusTone
}

export type AdminStockMovementType = 'in' | 'out' | 'sale' | 'opname' | 'adjustment'

export interface AdminStockMovementItem {
  id: string
  time: string
  ingredientName: string
  type: AdminStockMovementType
  typeLabel: string
  quantityLabel: string
  balanceLabel: string
}

export type AdminDashboardAmount = number | string | null | undefined

export interface AdminDashboardDateQuery {
  date?: string
}

export interface AdminDashboardSalesTrendQuery {
  days?: 7 | 14 | 30
}

export interface AdminDashboardKpiResponse {
  date: string
  revenue: {
    today: AdminDashboardAmount
    yesterday: AdminDashboardAmount
    change_amount: AdminDashboardAmount
    change_percentage: AdminDashboardAmount
  }
  transactions: {
    today: AdminDashboardAmount
    yesterday: AdminDashboardAmount
    change: AdminDashboardAmount
  }
  profit: {
    gross_profit: AdminDashboardAmount
    total_revenue: AdminDashboardAmount
    total_cogs: AdminDashboardAmount
    margin_percentage: AdminDashboardAmount
  }
  low_stock: {
    count: AdminDashboardAmount
  }
}

export interface AdminDashboardSalesTrendPointRecord {
  date: string
  label: string
  revenue: AdminDashboardAmount
  transaction_count: AdminDashboardAmount
}

export interface AdminDashboardSalesTrendResponse {
  period_days: number
  start_date: string
  end_date: string
  data: AdminDashboardSalesTrendPointRecord[]
}

export interface AdminDashboardTopMenuRecord {
  rank: number
  menu_id: string
  menu_name: string
  category_name: string
  qty_sold: AdminDashboardAmount
  revenue: AdminDashboardAmount
  margin_percentage: AdminDashboardAmount
}

export interface AdminDashboardTopMenusResponse {
  date: string
  total_items: number
  items: AdminDashboardTopMenuRecord[]
}

export type AdminDashboardStockStatusName = 'AMAN' | 'MENIPIS' | 'KRITIS' | string

export interface AdminDashboardStockStatusCategory {
  status: AdminDashboardStockStatusName
  count: AdminDashboardAmount
  percentage: AdminDashboardAmount
}

export interface AdminDashboardStockStatusResponse {
  total_ingredients: number
  categories: AdminDashboardStockStatusCategory[]
}

export interface AdminDashboardRecentStockMovementRecord {
  stock_movement_id: string
  created_at: string
  ingredient_name: string
  stock_type_name: string
  qty: AdminDashboardAmount
  current_stock: AdminDashboardAmount
}

export interface AdminDashboardRecentStockMovementsResponse {
  total_items: number
  items: AdminDashboardRecentStockMovementRecord[]
}
