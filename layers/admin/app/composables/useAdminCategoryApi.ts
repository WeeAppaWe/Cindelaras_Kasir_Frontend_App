import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminCategoryApiRecord,
  AdminCategoryDeleteResponse,
  AdminCategoryListQuery,
  AdminCategoryListResponse,
  AdminCategoryMutationRequest,
} from '../types/admin-category'

export function useAdminCategoryApi() {
  const api = useApiClient()

  async function getCategories(query: AdminCategoryListQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.category.list, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminCategoryListResponse>(payload)
  }

  async function getCategoryDetail(categoryId: string) {
    const payload = await api.get<unknown>(apiEndpoints.category.detail(categoryId))

    return extractApiPayload<AdminCategoryApiRecord>(payload)
  }

  async function createCategory(payload: AdminCategoryMutationRequest) {
    const result = await api.post<unknown, AdminCategoryMutationRequest>(apiEndpoints.category.create, payload)

    return extractApiPayload<AdminCategoryApiRecord>(result)
  }

  async function updateCategory(categoryId: string, payload: AdminCategoryMutationRequest) {
    const result = await api.patch<unknown, AdminCategoryMutationRequest>(
      apiEndpoints.category.update(categoryId),
      payload,
    )

    return extractApiPayload<AdminCategoryApiRecord>(result)
  }

  async function deleteCategory(categoryId: string) {
    const payload = await api.delete<unknown>(apiEndpoints.category.remove(categoryId))

    return extractApiPayload<AdminCategoryDeleteResponse>(payload)
  }

  return {
    getCategories,
    getCategoryDetail,
    createCategory,
    updateCategory,
    deleteCategory,
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
