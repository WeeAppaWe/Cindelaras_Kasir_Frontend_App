import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  ShiftActiveResponse,
  ShiftApiRecord,
  ShiftEndRequest,
  ShiftEndResponse,
  ShiftListQuery,
  ShiftListResponse,
  ShiftStartRequest,
  ShiftStartResponse,
  ShiftSummary,
} from '../types/shift'

export function useShiftApi() {
  const api = useApiClient()

  function getActiveShift() {
    return requestShiftData<ShiftActiveResponse>(apiEndpoints.shift.active)
  }

  function startShift(payload: ShiftStartRequest) {
    return requestShiftData<ShiftStartResponse>(apiEndpoints.shift.start, {
      method: 'POST',
      body: payload,
    })
  }

  function endShift(payload: ShiftEndRequest) {
    return requestShiftData<ShiftEndResponse>(apiEndpoints.shift.end, {
      method: 'POST',
      body: payload,
    })
  }

  function getMyShifts(query: Pick<ShiftListQuery, 'batch' | 'size'> = {}) {
    return requestShiftData<ShiftListResponse>(apiEndpoints.shift.my, {
      query,
    })
  }

  function getShifts(query: ShiftListQuery = {}) {
    return requestShiftData<ShiftListResponse>(apiEndpoints.shift.list, {
      query,
    })
  }

  function getShiftDetail(shiftId: string) {
    return requestShiftData<ShiftApiRecord>(apiEndpoints.shift.detail(shiftId))
  }

  function getShiftSummary(shiftId: string) {
    return requestShiftData<ShiftSummary>(apiEndpoints.shift.summary(shiftId))
  }

  function requestShiftData<TResponse>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST'
      body?: unknown
      query?: ShiftListQuery | Pick<ShiftListQuery, 'batch' | 'size'>
    } = {},
  ) {
    return api.request<TResponse, unknown>(endpoint, {
      method: options.method ?? 'GET',
      body: options.body,
      query: normalizeShiftQuery(options.query),
    })
  }

  return {
    getActiveShift,
    getMyShifts,
    getShiftDetail,
    getShiftSummary,
    getShifts,
    startShift,
    endShift,
  }
}

function normalizeShiftQuery(query: ShiftListQuery | Pick<ShiftListQuery, 'batch' | 'size'> | undefined) {
  if (!query) {
    return undefined
  }

  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined),
  ) as Record<string, ApiQueryValue>
}
