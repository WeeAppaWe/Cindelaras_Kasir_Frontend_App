import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminUnitMeasureApiRecord,
  AdminUnitMeasureDeleteResponse,
  AdminUnitMeasureListQuery,
  AdminUnitMeasureListResponse,
  AdminUnitMeasureMutationRequest,
} from '../types/admin-unit-measure'

export function useAdminUnitMeasureApi() {
  const api = useApiClient()

  async function getUnitMeasures(query: AdminUnitMeasureListQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.unitMeasure.list, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminUnitMeasureListResponse>(payload)
  }

  async function getUnitMeasureDetail(unitMeasureId: string) {
    const payload = await api.get<unknown>(apiEndpoints.unitMeasure.detail(unitMeasureId))

    return extractApiPayload<AdminUnitMeasureApiRecord>(payload)
  }

  async function createUnitMeasure(payload: AdminUnitMeasureMutationRequest) {
    const result = await api.post<unknown, AdminUnitMeasureMutationRequest>(apiEndpoints.unitMeasure.create, payload)

    return extractApiPayload<AdminUnitMeasureApiRecord>(result)
  }

  async function updateUnitMeasure(unitMeasureId: string, payload: AdminUnitMeasureMutationRequest) {
    const result = await api.patch<unknown, AdminUnitMeasureMutationRequest>(
      apiEndpoints.unitMeasure.update(unitMeasureId),
      payload,
    )

    return extractApiPayload<AdminUnitMeasureApiRecord>(result)
  }

  async function deleteUnitMeasure(unitMeasureId: string) {
    const payload = await api.delete<unknown>(apiEndpoints.unitMeasure.remove(unitMeasureId))

    return extractApiPayload<AdminUnitMeasureDeleteResponse>(payload)
  }

  return {
    getUnitMeasures,
    getUnitMeasureDetail,
    createUnitMeasure,
    updateUnitMeasure,
    deleteUnitMeasure,
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
  }

  return payload as TPayload
}

function isDirectResponseShape(value: Record<string, unknown>) {
  return typeof value.code === 'number' && typeof value.message === 'string'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
