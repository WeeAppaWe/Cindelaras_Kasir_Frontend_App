import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminSemiIngredientAvailableRawRecord,
  AdminSemiIngredientBaseRecord,
  AdminSemiIngredientBulkCompositionRequest,
  AdminSemiIngredientBulkCompositionResponse,
  AdminSemiIngredientCreateAndProduceRequest,
  AdminSemiIngredientCompositionRequest,
  AdminSemiIngredientDeleteResponse,
  AdminSemiIngredientDetailRecord,
  AdminSemiIngredientListQuery,
  AdminSemiIngredientListResponse,
  AdminSemiIngredientMutationRequest,
  AdminSemiIngredientPreviewHppRequest,
  AdminSemiIngredientPreviewHppResponse,
  AdminSemiIngredientProduceRequest,
  AdminSemiIngredientProduceResult,
  AdminSemiIngredientUnitRecord,
} from '../types/admin-semi-ingredient'

export function useAdminSemiIngredientApi() {
  const api = useApiClient()

  async function getSemiIngredients(query: AdminSemiIngredientListQuery = {}) {
    return await api.get<AdminSemiIngredientListResponse>(apiEndpoints.ingredient.semi.list, {
      query: normalizeQuery(query),
    })
  }

  async function getSemiIngredientDetail(ingredientId: string) {
    const payload = await api.get<unknown>(apiEndpoints.ingredient.semi.detail(ingredientId))

    return normalizeSemiIngredientDetailPayload(payload)
  }

  async function createSemiIngredient(payload: AdminSemiIngredientMutationRequest) {
    return await api.post<AdminSemiIngredientBaseRecord, AdminSemiIngredientMutationRequest>(
      apiEndpoints.ingredient.semi.create,
      payload,
    )
  }

  async function createAndProduceSemiIngredient(payload: AdminSemiIngredientCreateAndProduceRequest) {
    return await api.post<AdminSemiIngredientBaseRecord, AdminSemiIngredientCreateAndProduceRequest>(
      apiEndpoints.ingredient.semi.createAndProduce,
      payload,
    )
  }

  async function updateSemiIngredient(ingredientId: string, payload: AdminSemiIngredientMutationRequest) {
    return await api.patch<AdminSemiIngredientBaseRecord, AdminSemiIngredientMutationRequest>(
      apiEndpoints.ingredient.semi.update(ingredientId),
      payload,
    )
  }

  async function deleteSemiIngredient(ingredientId: string) {
    return await api.delete<AdminSemiIngredientDeleteResponse>(apiEndpoints.ingredient.semi.remove(ingredientId))
  }

  async function getSemiIngredientUnitOptions() {
    return await api.get<AdminSemiIngredientUnitRecord[]>(apiEndpoints.unitMeasure.options)
  }

  async function getAvailableRawIngredientsForComposition(excludeIngredientId?: string) {
    const query = excludeIngredientId ? { exclude_id: excludeIngredientId } : {}
    return await api.get<AdminSemiIngredientAvailableRawRecord[]>(
      apiEndpoints.ingredient.semi.composition.availableIngredients,
      { query },
    )
  }

  async function previewSemiIngredientHpp(payload: AdminSemiIngredientPreviewHppRequest) {
    return await api.post<AdminSemiIngredientPreviewHppResponse, AdminSemiIngredientPreviewHppRequest>(
      apiEndpoints.ingredient.semi.composition.previewHpp,
      payload,
    )
  }

  async function createSemiIngredientComposition(ingredientId: string, payload: AdminSemiIngredientCompositionRequest) {
    return await api.post<unknown, AdminSemiIngredientCompositionRequest>(
      apiEndpoints.ingredient.semi.composition.create(ingredientId),
      payload,
    )
  }

  async function bulkReplaceSemiIngredientCompositions(
    ingredientId: string,
    payload: AdminSemiIngredientBulkCompositionRequest,
  ) {
    return await api.post<AdminSemiIngredientBulkCompositionResponse, AdminSemiIngredientBulkCompositionRequest>(
      apiEndpoints.ingredient.semi.composition.bulkReplace(ingredientId),
      payload,
    )
  }

  async function updateSemiIngredientComposition(
    ingredientId: string,
    compositionId: string,
    payload: Pick<AdminSemiIngredientCompositionRequest, 'qty_needed'>,
  ) {
    return await api.patch<unknown, Pick<AdminSemiIngredientCompositionRequest, 'qty_needed'>>(
      apiEndpoints.ingredient.semi.composition.update(ingredientId, compositionId),
      payload,
    )
  }

  async function deleteSemiIngredientComposition(ingredientId: string, compositionId: string) {
    return await api.delete<unknown>(
      apiEndpoints.ingredient.semi.composition.remove(ingredientId, compositionId),
    )
  }

  async function getSemiIngredientHpp(ingredientId: string) {
    return await api.get<AdminSemiIngredientPreviewHppResponse>(apiEndpoints.ingredient.semi.hpp(ingredientId))
  }

  async function recalculateSemiIngredientHpp(ingredientId: string) {
    return await api.post<AdminSemiIngredientBaseRecord, undefined>(
      apiEndpoints.ingredient.semi.recalculateHpp(ingredientId),
      undefined,
    )
  }

  async function produceSemiIngredient(ingredientId: string, payload: AdminSemiIngredientProduceRequest) {
    return await api.post<AdminSemiIngredientProduceResult, AdminSemiIngredientProduceRequest>(
      apiEndpoints.ingredient.semi.produce(ingredientId),
      payload,
    )
  }

  return {
    getSemiIngredients,
    getSemiIngredientDetail,
    createSemiIngredient,
    createAndProduceSemiIngredient,
    updateSemiIngredient,
    deleteSemiIngredient,
    getSemiIngredientUnitOptions,
    getAvailableRawIngredientsForComposition,
    previewSemiIngredientHpp,
    createSemiIngredientComposition,
    bulkReplaceSemiIngredientCompositions,
    updateSemiIngredientComposition,
    deleteSemiIngredientComposition,
    getSemiIngredientHpp,
    recalculateSemiIngredientHpp,
    produceSemiIngredient,
  }
}

function normalizeQuery<TQuery extends object>(query: TQuery) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  ) as Record<string, ApiQueryValue | ApiQueryValue[]>
}

function normalizeSemiIngredientDetailPayload(payload: unknown): AdminSemiIngredientDetailRecord {
  if (!isRecord(payload)) {
    return payload as AdminSemiIngredientDetailRecord
  }

  if (isRecord(payload.response)) {
    return normalizeSemiIngredientDetailPayload(payload.response)
  }

  if (isRecord(payload.data)) {
    return normalizeSemiIngredientDetailPayload(payload.data)
  }

  return payload as unknown as AdminSemiIngredientDetailRecord
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
