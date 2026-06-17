import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminMenuApiRecord,
  AdminMenuCategoryApiRecord,
  AdminMenuCreateRequest,
  AdminMenuDeleteResponse,
  AdminMenuIngredientOptionApiRecord,
  AdminMenuListQuery,
  AdminMenuListResponse,
  AdminMenuRecipeBulkUpdateRequest,
  AdminMenuRecipeListResponse,
  AdminMenuToggleAvailabilityResponse,
  AdminMenuUpdateRequest,
  AdminMenuUploadImageResponse,
} from '../types/admin-menu'

export function useAdminMenuApi() {
  const api = useApiClient()

  async function getCategories() {
    const payload = await api.get<unknown>(apiEndpoints.category.options)

    return extractApiPayload<AdminMenuCategoryApiRecord[]>(payload)
  }

  async function getIngredientOptions() {
    const payload = await api.get<unknown>(apiEndpoints.ingredient.options)

    return extractApiPayload<AdminMenuIngredientOptionApiRecord[]>(payload)
  }

  async function getMenus(query: AdminMenuListQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.menu.list, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminMenuListResponse>(payload)
  }

  async function getMenuDetail(menuId: string) {
    const payload = await api.get<unknown>(apiEndpoints.menu.detail(menuId))

    return extractApiPayload<AdminMenuApiRecord>(payload)
  }

  async function createMenu(payload: AdminMenuCreateRequest) {
    const result = await api.post<unknown, AdminMenuCreateRequest>(apiEndpoints.menu.create, payload)

    return extractApiPayload<AdminMenuApiRecord>(result)
  }

  async function updateMenu(menuId: string, payload: AdminMenuUpdateRequest) {
    const result = await api.patch<unknown, AdminMenuUpdateRequest>(apiEndpoints.menu.update(menuId), payload)

    return extractApiPayload<AdminMenuApiRecord>(result)
  }

  async function toggleMenuAvailability(menuId: string) {
    const payload = await api.patch<unknown>(apiEndpoints.menu.toggleAvailability(menuId))

    return extractApiPayload<AdminMenuToggleAvailabilityResponse>(payload)
  }

  async function deleteMenu(menuId: string) {
    const payload = await api.delete<unknown>(apiEndpoints.menu.remove(menuId))

    return extractApiPayload<AdminMenuDeleteResponse>(payload)
  }

  async function getMenuRecipes(menuId: string) {
    const payload = await api.get<unknown>(apiEndpoints.menu.recipe.list(menuId))

    return extractApiPayload<AdminMenuRecipeListResponse>(payload)
  }

  async function bulkUpdateMenuRecipes(menuId: string, payload: AdminMenuRecipeBulkUpdateRequest) {
    const result = await api.patch<unknown, AdminMenuRecipeBulkUpdateRequest>(
      apiEndpoints.menu.recipe.bulkUpdate(menuId),
      payload,
    )

    return extractApiPayload<AdminMenuRecipeListResponse>(result)
  }

  async function uploadMenuImage(file: File) {
    const body = new FormData()
    body.append('image', file)

    const payload = await api.post<unknown, FormData>(apiEndpoints.upload.image('menu'), body)

    return extractApiPayload<AdminMenuUploadImageResponse>(payload)
  }

  return {
    getCategories,
    getIngredientOptions,
    getMenus,
    getMenuDetail,
    createMenu,
    updateMenu,
    toggleMenuAvailability,
    deleteMenu,
    getMenuRecipes,
    bulkUpdateMenuRecipes,
    uploadMenuImage,
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
