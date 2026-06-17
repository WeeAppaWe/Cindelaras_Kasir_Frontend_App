import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminOpnameApplyResponse,
  AdminOpnameCreateRequest,
  AdminOpnameDeleteResponse,
  AdminOpnameIngredientRecord,
  AdminOpnameListQuery,
  AdminOpnameListResponse,
  AdminOpnameRecord,
  AdminOpnameStatusUpdateRequest,
  AdminOpnameUpdateRequest,
} from '../types/admin-opname'

export function useAdminOpnameApi() {
  const api = useApiClient()

  async function getOpnameIngredients() {
    const payload = await api.get<unknown>(apiEndpoints.opname.ingredients)

    return extractApiPayload<AdminOpnameIngredientRecord[]>(payload)
  }

  async function getOpnames(query: AdminOpnameListQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.opname.list, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminOpnameListResponse>(payload)
  }

  async function getOpnameDetail(stockOpnameId: string) {
    const payload = await api.get<unknown>(apiEndpoints.opname.detail(stockOpnameId))

    return extractApiPayload<AdminOpnameRecord>(payload)
  }

  async function createOpname(payload: AdminOpnameCreateRequest) {
    const result = await api.post<unknown, AdminOpnameCreateRequest>(
      apiEndpoints.opname.create,
      payload,
    )

    return extractApiPayload<AdminOpnameRecord>(result)
  }

  async function updateOpname(stockOpnameId: string, payload: AdminOpnameUpdateRequest) {
    const result = await api.patch<unknown, AdminOpnameUpdateRequest>(
      apiEndpoints.opname.update(stockOpnameId),
      payload,
    )

    return extractApiPayload<AdminOpnameRecord>(result)
  }

  async function updateOpnameStatus(stockOpnameId: string, payload: AdminOpnameStatusUpdateRequest) {
    const result = await api.patch<unknown, AdminOpnameStatusUpdateRequest>(
      apiEndpoints.opname.updateStatus(stockOpnameId),
      payload,
    )

    return extractApiPayload<AdminOpnameRecord>(result)
  }

  async function applyOpname(stockOpnameId: string) {
    const result = await api.post<unknown>(apiEndpoints.opname.apply(stockOpnameId))

    return extractApiPayload<AdminOpnameApplyResponse>(result)
  }

  async function deleteOpname(stockOpnameId: string) {
    const payload = await api.delete<unknown>(apiEndpoints.opname.remove(stockOpnameId))

    return extractApiPayload<AdminOpnameDeleteResponse>(payload)
  }

  return {
    getOpnameIngredients,
    getOpnames,
    getOpnameDetail,
    createOpname,
    updateOpname,
    updateOpnameStatus,
    applyOpname,
    deleteOpname,
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
