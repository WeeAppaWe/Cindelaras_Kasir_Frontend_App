export interface AdminReportPeriod {
  start_date: string
  end_date: string
}

export interface AdminReportDateRangeQuery {
  start_date: string
  end_date: string
  shift_id?: string
  user_id?: string
}

export interface AdminFinancialReportItem {
  date: string
  transaction_count: number
  total_revenue: number
  total_cogs: number
  gross_profit: number
  expenses: number
  net_profit: number
}

export interface AdminFinancialReportResponse {
  period: AdminReportPeriod
  total_days: number
  items: AdminFinancialReportItem[]
}

export type AdminInventoryIngredientType = 'raw' | 'semi'
export type AdminInventoryStockStatus = 'NORMAL' | 'LOW' | 'OUT'

export interface AdminInventoryReportQuery {
  start_date: string
  end_date: string
  ingredient_type?: AdminInventoryIngredientType
}

export interface AdminInventoryReportItem {
  ingredient_id: string
  name: string
  type: AdminInventoryIngredientType | string
  unit: string
  current_stock: number
  min_stock: number
  avg_cost: number
  stock_value: number
  status: AdminInventoryStockStatus | string
}

export interface AdminInventoryReportResponse {
  total_items: number
  total_value: number
  low_stock_count: number
  out_of_stock_count: number
  items: AdminInventoryReportItem[]
}

export type AdminOperationalShiftStatus = 'ACTIVE' | 'CLOSED'

export interface AdminOperationalShiftReportItem {
  shift_id: string
  date: string
  start_time: string
  end_time: string | null
  cashier_name: string
  start_cash: number
  total_sales: number
  cash_in: number
  cash_out: number
  expected_cash: number
  actual_cash: number | null
  variance: number | null
  transaction_count: number
  status: AdminOperationalShiftStatus | string
}

export interface AdminOperationalReportResponse {
  period: AdminReportPeriod
  total_shifts: number
  shifts: AdminOperationalShiftReportItem[]
}
