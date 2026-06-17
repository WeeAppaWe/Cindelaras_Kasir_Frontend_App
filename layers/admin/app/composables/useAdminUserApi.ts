import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminUserApiRecord,
  AdminUserCreateRequest,
  AdminUserDeleteResponse,
  AdminUserListQuery,
  AdminUserListResponse,
  AdminUserRoleApiRecord,
  AdminUserStatusApiRecord,
  AdminUserUpdateRequest,
} from '../types/admin-user'

export function useAdminUserApi() {
  const api = useApiClient()

  async function getRoles() {
    const payload = await api.get<unknown>(apiEndpoints.user.roles)

    return extractApiPayload<AdminUserRoleApiRecord[]>(payload)
  }

  async function getStatuses() {
    const payload = await api.get<unknown>(apiEndpoints.user.statuses)

    return extractApiPayload<AdminUserStatusApiRecord[]>(payload)
  }

  async function getUsers(query: AdminUserListQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.user.list, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminUserListResponse>(payload)
  }

  async function getUserDetail(userId: string) {
    const payload = await api.get<unknown>(apiEndpoints.user.detail(userId))

    return extractApiPayload<AdminUserApiRecord>(payload)
  }

  async function createUser(payload: AdminUserCreateRequest) {
    const result = await api.post<unknown, AdminUserCreateRequest>(apiEndpoints.user.create, payload)

    return extractApiPayload<AdminUserApiRecord>(result)
  }

  async function updateUser(userId: string, payload: AdminUserUpdateRequest) {
    const result = await api.patch<unknown, AdminUserUpdateRequest>(
      apiEndpoints.user.update(userId),
      payload,
    )

    return extractApiPayload<AdminUserApiRecord>(result)
  }

  async function deleteUser(userId: string) {
    const payload = await api.delete<unknown>(apiEndpoints.user.remove(userId))

    return extractApiPayload<AdminUserDeleteResponse>(payload)
  }

  return {
    getRoles,
    getStatuses,
    getUsers,
    getUserDetail,
    createUser,
    updateUser,
    deleteUser,
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
