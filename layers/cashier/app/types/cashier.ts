import type { ApiPaginationPage } from '#layers/base/app/types/api-response'

export type CashierStatus = 'success' | 'warning' | 'info' | 'neutral'
export type CashierPaymentMethod = 'Tunai' | 'QRIS'
export type CashierDiningOption = 'Makan di Tempat' | 'Bungkus'
export type CashierApiPaymentType = 'CASH' | 'QRIS' | string
export type CashierApiOrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED' | string
export type CashierApiOrderType = 'DINE_IN' | 'TAKE_AWAY' | string
export type CashierAmount = number | string | null

export interface CashierNavItem {
  label: string
  to: string
  description: string
}

export interface CashierProduct {
  id: string
  name: string
  sku: string
  category: string
  categoryId?: string
  imageUrl?: string
  price: number
  stock: number
  soldToday: number
  isFavorite?: boolean
  isAvailable?: boolean
}

export interface CashierProductCategory {
  id: string
  name: string
  menuCount?: number
}

export interface CashierCartItem {
  productId: string
  name: string
  sku: string
  quantity: number
  price: number
  stock: number
}

export interface CashierPaymentResult {
  cashReceived: number | null
  cashChange: number
}

export interface CashierReceiptPreview {
  id: string
  orderId: string
  receiptNumber?: string | null
  cashierName: string
  paidAt: string
  paymentMethod: CashierPaymentMethod
  customerName: string
  customerPhone: string
  diningOption: CashierDiningOption
  itemCount: number
  total: number
  items: CashierCartItem[]
  cashReceived: number | null
  cashChange: number
}

export interface CashierReceiptSendResult {
  success: boolean
  message: string
  receiptUrl?: string
  whatsappStatus?: boolean
}

export interface TransactionHistoryItem {
  id: string
  orderId?: string
  shiftId?: string
  receiptNumber?: string | null
  cashierName: string
  paidAt: string
  paymentMethod: string
  customerName: string
  customerPhone: string
  diningOption?: CashierDiningOption
  itemCount: number
  total: number
  items?: CashierCartItem[]
  cashReceived?: number | null
  cashChange?: number
  shiftStartedAt?: string
  shiftEndedAt?: string
  status: CashierStatus
  statusLabel: string
}

export interface TransactionHistoryDraft {
  paidAt: string
  paymentMethod: CashierPaymentMethod
  customerName: string
  customerPhone: string
  diningOption: CashierDiningOption
  itemCount: number
  total: number
  cashReceived?: number | null
  cashChange?: number
  status: CashierStatus
  statusLabel: string
}

export interface CashierCheckoutDraft {
  customerName: string
  customerPhone: string
  diningOption: CashierDiningOption
  paymentMethod: CashierPaymentMethod
  cashReceived?: number | null
  cashChange?: number
}

export interface CashierCheckoutResult {
  transaction: TransactionHistoryItem
  receipt: CashierReceiptPreview
}

export interface CashAdjustmentItem {
  id: string
  shiftId?: string
  createdAt: string
  type: 'in' | 'out'
  reason: string
  amount: number
  cashierName: string
  shiftStartedAt?: string
  shiftEndedAt?: string
  status: CashierStatus
  statusLabel: string
}

export interface CashAdjustmentDraft {
  type: 'in' | 'out'
  reason: string
  amount: number
}

export type CashAdjustmentApiType = 'IN' | 'OUT' | string

export interface CashAdjustmentApiShift {
  shift_id: string
  start_time: string
  end_time?: string | null
}

export interface CashAdjustmentApiRecord {
  cash_movement_id: string
  shift_id: string
  type: CashAdjustmentApiType
  amount: CashierAmount
  note?: string | null
  created_at: string
  updated_at?: string | null
  shift?: CashAdjustmentApiShift
}

export interface CashAdjustmentSummary {
  total_in: CashierAmount
  total_out: CashierAmount
  net_amount: CashierAmount
}

export interface CashAdjustmentListResponse {
  page: ApiPaginationPage
  summary: CashAdjustmentSummary
  records: CashAdjustmentApiRecord[]
}

export interface CashAdjustmentListQuery {
  batch?: number
  size?: number
  type?: CashAdjustmentApiType
  shift_id?: string
}

export interface CashAdjustmentCreateRequest {
  type: CashAdjustmentApiType
  amount: number
  note?: string
}

export interface CashAdjustmentCreateResponse {
  success: boolean
  message: string
  cash_movement: CashAdjustmentApiRecord
}

export interface CashierShiftSession {
  id: string
  openedAt: string
  openingCash: number
  cashierName: string
}

export interface CashierClosedShift {
  id: string
  openedAt: string
  closedAt: string
  openingCash: number
  salesTotal: number
  cashSalesTotal: number
  expectedCash: number
  physicalCash: number
  difference: number
  cashierName: string
}

export interface CashierMenuApiCategory {
  category_id: string
  name: string
}

export interface CashierCategoryApiRecord {
  category_id: string
  name: string
  created_at?: string
  updated_at?: string | null
  _count?: {
    menus?: number
  }
}

export interface CashierCategoryListQuery {
  batch?: number
  size?: number
  search?: string
}

export interface CashierMenuApiRecord {
  menu_id: string
  name: string
  price: CashierAmount
  cost?: CashierAmount
  description?: string | null
  image_url?: string | null
  is_available: boolean
  created_at?: string
  updated_at?: string | null
  category?: CashierMenuApiCategory | null
  _count?: {
    recipes?: number
  }
  margin_percent?: CashierAmount
  profit?: CashierAmount
}

export interface CashierMenuListQuery {
  batch?: number
  size?: number
  search?: string
  category_id?: string
  is_available?: boolean
}

export interface CashierCheckoutRequestItem {
  menu_id: string
  qty: number
  price: number
}

export interface CashierCreateOrderRequest {
  customer_name: string
  customer_phone?: string
  payment_type: CashierApiPaymentType
  order_type: CashierApiOrderType
  items: CashierCheckoutRequestItem[]
}

export interface CashierConfirmOrderRequest {
  paid_amount?: number
}

export interface CashierApiUser {
  user_id: string
  name: string
}

export interface CashierApiShift {
  shift_id: string
  start_time: string
  end_time?: string | null
}

export interface CashierApiOrderItem {
  order_item_id: string
  menu_id: string
  qty: number
  price: CashierAmount
  subtotal: CashierAmount
  menu?: {
    menu_id: string
    name: string
    image_url?: string | null
  }
}

export interface CashierApiOrderRecord {
  order_id: string
  shift_id: string
  user_id: string
  customer_name: string | null
  customer_phone: string | null
  receipt: string | null
  total_amount: CashierAmount
  paid_amount: CashierAmount
  change_amount: CashierAmount
  payment_type: CashierApiPaymentType
  order_type: CashierApiOrderType
  status: CashierApiOrderStatus
  created_at: string
  updated_at: string | null
  user?: CashierApiUser
  shift?: CashierApiShift
  order_items?: CashierApiOrderItem[]
  _count?: {
    order_items?: number
  }
}

export interface CashierOrderListQuery {
  batch?: number
  size?: number
  search?: string
  status?: CashierApiOrderStatus
  payment_type?: CashierApiPaymentType
  order_type?: CashierApiOrderType
  shift_id?: string
  start_date?: string
  end_date?: string
}

export interface CashierCreateOrderResponse {
  message: string
  change_amount: CashierAmount
  order: CashierApiOrderRecord
}

export interface CashierConfirmOrderResponse {
  success: boolean
  message: string
  order: CashierApiOrderRecord
}

export interface CashierCancelOrderResponse {
  success: boolean
  message: string
}

export interface CashierReceiptPreviewItem {
  name: string
  qty: number
  price: CashierAmount
  subtotal: CashierAmount
}

export interface CashierReceiptApiPreview {
  store_name: string
  store_address: string
  receipt_header: string
  receipt_footer: string
  order_id: string
  receipt?: string | null
  order_date: string
  order_time: string
  cashier_name: string
  customer_name: string
  customer_phone: string
  items: CashierReceiptPreviewItem[]
  total: CashierAmount
  payment_type: CashierApiPaymentType
  order_type?: CashierApiOrderType
  order_status?: CashierApiOrderStatus
  paid_amount: CashierAmount
  change_amount: CashierAmount
}

export interface CashierSendReceiptRequest {
  phone: string
}

export interface CashierSendReceiptResponse {
  success: boolean
  message: string
  receipt_url?: string
  whatsapp_status?: boolean
}
