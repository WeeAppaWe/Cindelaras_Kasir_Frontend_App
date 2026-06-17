import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminRawIngredientApiRecord,
  AdminRawIngredientDeleteResponse,
  AdminRawIngredientListQuery,
  AdminRawIngredientListResponse,
  AdminRawIngredientLowStockResponse,
  AdminRawIngredientMutationRequest,
  AdminRawIngredientUnitRecord,
} from '../types/admin-ingredient'

export function useAdminRawIngredientApi() {
  const api = useApiClient()

  async function getRawIngredients(query: AdminRawIngredientListQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.ingredient.raw.list, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminRawIngredientListResponse>(payload)
  }

  async function getLowStockRawIngredients() {
    const payload = await api.get<unknown>(apiEndpoints.ingredient.raw.lowStock)

    return extractApiPayload<AdminRawIngredientLowStockResponse>(payload)
  }

  async function getRawIngredientDetail(ingredientId: string) {
    const payload = await api.get<unknown>(apiEndpoints.ingredient.raw.detail(ingredientId))

    return extractApiPayload<AdminRawIngredientApiRecord>(payload)
  }

  async function createRawIngredient(payload: AdminRawIngredientMutationRequest) {
    const result = await api.post<unknown, AdminRawIngredientMutationRequest>(
      apiEndpoints.ingredient.raw.create,
      payload,
    )

    return extractApiPayload<AdminRawIngredientApiRecord>(result)
  }

  async function updateRawIngredient(ingredientId: string, payload: AdminRawIngredientMutationRequest) {
    const result = await api.patch<unknown, AdminRawIngredientMutationRequest>(
      apiEndpoints.ingredient.raw.update(ingredientId),
      payload,
    )

    return extractApiPayload<AdminRawIngredientApiRecord>(result)
  }

  async function deleteRawIngredient(ingredientId: string) {
    const payload = await api.delete<unknown>(apiEndpoints.ingredient.raw.remove(ingredientId))

    return extractApiPayload<AdminRawIngredientDeleteResponse>(payload)
  }

  async function getRawIngredientUnitOptions() {
    const payload = await api.get<unknown>(apiEndpoints.unitMeasure.options)

    return extractApiPayload<AdminRawIngredientUnitRecord[]>(payload)
  }

  return {
    getRawIngredients,
    getLowStockRawIngredients,
    getRawIngredientDetail,
    createRawIngredient,
    updateRawIngredient,
    deleteRawIngredient,
    getRawIngredientUnitOptions,
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
