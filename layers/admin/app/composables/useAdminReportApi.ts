import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminFinancialReportResponse,
  AdminInventoryReportQuery,
  AdminInventoryReportResponse,
  AdminOperationalReportResponse,
  AdminReportDateRangeQuery,
} from '../types/admin-report-api'

export function useAdminReportApi() {
  const api = useApiClient()

  async function getFinancialReport(query: AdminReportDateRangeQuery) {
    return await api.get<AdminFinancialReportResponse>(apiEndpoints.report.financial.full, {
      query: normalizeQuery(query),
    })
  }

  async function getInventoryReport(query: AdminInventoryReportQuery) {
    return await api.get<AdminInventoryReportResponse>(apiEndpoints.report.inventory.full, {
      query: normalizeQuery(query),
    })
  }

  async function getOperationalReport(query: AdminReportDateRangeQuery) {
    return await api.get<AdminOperationalReportResponse>(apiEndpoints.report.operational.full, {
      query: normalizeQuery(query),
    })
  }

  return {
    getFinancialReport,
    getInventoryReport,
    getOperationalReport,
  }
}

function normalizeQuery<TQuery extends object>(query: TQuery) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  ) as Record<string, ApiQueryValue | ApiQueryValue[]>
}
