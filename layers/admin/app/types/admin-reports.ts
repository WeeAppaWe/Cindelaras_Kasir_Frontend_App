import type { AdminStatusTone } from './admin-management'

export interface AdminFinanceDailyReport {
  id: string
  day: string
  date: string
  transactionCount: number
  itemCount: number
  cashRevenue: number
  qrisRevenue: number
  grossRevenue: number
  refund: number
  netRevenue: number
  cogs: number
  grossProfit: number
  marginPercent: number
  averageOrder: number
}

export interface AdminPaymentBreakdownReport {
  id: 'cash' | 'qris'
  label: string
  amount: number
  transactionCount: number
  ratio: number
  tone: AdminStatusTone
}

export interface AdminInventoryValuationReport {
  id: string
  ingredientName: string
  unit: string
  stock: number
  minimumStock: number
  costPerUnit: number
  inventoryValue: number
  statusLabel: string
  statusTone: AdminStatusTone
}

export interface AdminInventoryMovementReport {
  id: string
  date: string
  ingredientName: string
  typeLabel: string
  typeTone: AdminStatusTone
  source: string
  quantityLabel: string
  balanceLabel: string
  note: string
}

export interface AdminOperationalDailyReport {
  id: string
  day: string
  date: string
  transactionCount: number
  itemCount: number
  revenue: number
  averageOrder: number
  dineInTransactions: number
  takeawayTransactions: number
  whatsappReceiptCount: number
  refundCount: number
}

export interface AdminCashierPerformanceReport {
  id: string
  cashierName: string
  shiftCount: number
  transactionCount: number
  revenue: number
  averageOrder: number
  refundCount: number
  statusLabel: string
  statusTone: AdminStatusTone
}

export interface AdminHourlyPerformanceReport {
  id: string
  timeRange: string
  transactionCount: number
  revenue: number
  averageOrder: number
  activityLabel: string
  activityTone: AdminStatusTone
}

export interface AdminMenuPerformanceReport {
  id: string
  menuName: string
  category: string
  soldQuantity: number
  revenue: number
  grossProfit: number
  marginPercent: number
  statusLabel: string
  statusTone: AdminStatusTone
}
