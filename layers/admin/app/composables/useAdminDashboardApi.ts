import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminDashboardDateQuery,
  AdminDashboardKpiResponse,
  AdminDashboardRecentStockMovementsResponse,
  AdminDashboardSalesTrendQuery,
  AdminDashboardSalesTrendResponse,
  AdminDashboardStockStatusResponse,
  AdminDashboardTopMenusResponse,
} from '../types/admin-dashboard'

export function useAdminDashboardApi() {
  const api = useApiClient()

  async function getKpi(query: AdminDashboardDateQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.dashboard.kpi, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminDashboardKpiResponse>(payload)
  }

  async function getSalesTrend(query: AdminDashboardSalesTrendQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.dashboard.salesTrend, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminDashboardSalesTrendResponse>(payload)
  }

  async function getTopMenus(query: AdminDashboardDateQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.dashboard.topMenus, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminDashboardTopMenusResponse>(payload)
  }

  async function getStockStatus() {
    const payload = await api.get<unknown>(apiEndpoints.dashboard.stockStatus)

    return extractApiPayload<AdminDashboardStockStatusResponse>(payload)
  }

  async function getRecentStockMovements() {
    const payload = await api.get<unknown>(apiEndpoints.dashboard.recentStockMovements)

    return extractApiPayload<AdminDashboardRecentStockMovementsResponse>(payload)
  }

  return {
    getKpi,
    getSalesTrend,
    getTopMenus,
    getStockStatus,
    getRecentStockMovements,
  }
}

function normalizeQuery<TQuery extends object>(query: TQuery) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  ) as Record<string, ApiQueryValue | ApiQueryValue[]>
}

function extractApiPayload<TPayload>(payload: unknown): TPayload {
  if (isRecord(payload)) {
    if ('data' in payload && isDirectResponseShape(payload)) {
      return payload.data as TPayload
    }

    if ('response' in payload && isDirectResponseShape(payload)) {
      return payload.response as TPayload
    }

    if ('response' in payload && isStandardEnvelopeShape(payload)) {
      return payload.response as TPayload
    }
  }

  return payload as TPayload
}

function isDirectResponseShape(value: Record<string, unknown>) {
  return typeof value.code === 'number' && typeof value.message === 'string'
}

function isStandardEnvelopeShape(value: Record<string, unknown>) {
  return isRecord(value.metaData)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
