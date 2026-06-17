import type { ApiPaginatedResponse } from '#layers/base/app/types/api-response'

export type ShiftAmount = number | string | null

export interface ShiftApiUser {
  user_id: string
  name: string
}

export interface ShiftApiRecord {
  shift_id: string
  user_id: string
  start_cash: ShiftAmount
  end_cash: ShiftAmount
  sold_total: ShiftAmount
  start_time: string
  end_time: string | null
  created_at: string
  updated_at: string | null
  user?: ShiftApiUser
  _count?: {
    orders?: number
  }
}

export interface ShiftActiveResponse {
  is_active: boolean
  shift: ShiftApiRecord | null
}

export interface ShiftStartRequest {
  start_cash: number
}

export interface ShiftStartResponse {
  success: boolean
  message: string
  shift: ShiftApiRecord
}

export interface ShiftEndRequest {
  end_cash: number
  notes?: string
}

export interface ShiftEndResponse {
  success: boolean
  message: string
  summary: ShiftSummary
}

export interface ShiftSummary {
  shift_id: string
  user_name: string
  start_time: string
  end_time: string | null
  start_cash: ShiftAmount
  end_cash: ShiftAmount
  sold_total: ShiftAmount
  expected_cash: ShiftAmount
  difference: ShiftAmount
  total_orders: number
  completed_orders: number
  cancelled_orders: number
  pending_orders?: number
  cash_sales: ShiftAmount
  qris_sales: ShiftAmount
}

export interface ShiftListQuery {
  batch?: number
  size?: number
  user_id?: string
  start_date?: string
  end_date?: string
  is_active?: boolean
}

export type ShiftListResponse = ApiPaginatedResponse<ShiftApiRecord>
