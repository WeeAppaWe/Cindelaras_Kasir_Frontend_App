import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminSpkAnalysisQuery,
  AdminSpkAnalysisResponse,
  AdminSpkSupplierListResponse,
  AdminSpkSupplierOption,
} from '../types/admin-spk'

export function useAdminSpkApi() {
  const api = useApiClient()

  async function getAnalysis(query: AdminSpkAnalysisQuery = {}) {
    return await api.get<AdminSpkAnalysisResponse>(apiEndpoints.spk.analysis, {
      query: normalizeQuery(query),
    })
  }

  async function getSupplierOptions() {
    const payload = await api.get<AdminSpkSupplierListResponse>(apiEndpoints.supplier.list, {
      query: {
        batch: 1,
        size: 100,
      },
    })

    return (payload.records ?? []).map<AdminSpkSupplierOption>(record => ({
      id: record.supplier_id,
      name: record.name,
      contact: record.phone?.trim() ?? '',
    }))
  }

  return {
    getAnalysis,
    getSupplierOptions,
  }
}

function normalizeQuery<TQuery extends object>(query: TQuery) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  ) as Record<string, ApiQueryValue | ApiQueryValue[]>
}
