import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminInventoryIngredientOptionRecord,
  AdminInventoryListQuery,
  AdminInventoryMovementListResponse,
  AdminInventoryMovementRecord,
  AdminInventoryStockInCreateRequest,
  AdminInventoryStockOutCreateRequest,
  AdminInventoryStockTypeRecord,
} from '../types/admin-inventory'

export function useAdminInventoryApi() {
  const api = useApiClient()

  async function getInventoryMovements(query: AdminInventoryListQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.inventory.list, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminInventoryMovementListResponse>(payload)
  }

  async function getInventoryMovementDetail(stockMovementId: string) {
    const payload = await api.get<unknown>(apiEndpoints.inventory.detail(stockMovementId))

    return extractApiPayload<AdminInventoryMovementRecord>(payload)
  }

  async function getIngredientInventoryHistory(ingredientId: string, query: AdminInventoryListQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.inventory.ingredientHistory(ingredientId), {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminInventoryMovementListResponse>(payload)
  }

  async function createStockIn(payload: AdminInventoryStockInCreateRequest) {
    const result = await api.post<unknown, AdminInventoryStockInCreateRequest>(
      apiEndpoints.inventory.stockIn,
      payload,
    )

    return extractApiPayload<AdminInventoryMovementRecord>(result)
  }

  async function createStockOut(payload: AdminInventoryStockOutCreateRequest) {
    const result = await api.post<unknown, AdminInventoryStockOutCreateRequest>(
      apiEndpoints.inventory.stockOut,
      payload,
    )

    return extractApiPayload<AdminInventoryMovementRecord>(result)
  }

  async function getStockTypes() {
    const payload = await api.get<unknown>(apiEndpoints.stockType.list)

    return extractApiPayload<AdminInventoryStockTypeRecord[]>(payload)
  }

  async function getIngredientOptions() {
    const payload = await api.get<unknown>(apiEndpoints.ingredient.options)

    return extractApiPayload<AdminInventoryIngredientOptionRecord[]>(payload)
  }

  return {
    getInventoryMovements,
    getInventoryMovementDetail,
    getIngredientInventoryHistory,
    createStockIn,
    createStockOut,
    getStockTypes,
    getIngredientOptions,
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
