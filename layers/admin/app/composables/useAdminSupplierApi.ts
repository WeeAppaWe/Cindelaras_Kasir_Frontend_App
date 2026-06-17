import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type {
  AdminSupplierApiRecord,
  AdminSupplierDeleteResponse,
  AdminSupplierListQuery,
  AdminSupplierListResponse,
  AdminSupplierMutationRequest,
} from '../types/admin-supplier'

export function useAdminSupplierApi() {
  const api = useApiClient()

  async function getSuppliers(query: AdminSupplierListQuery = {}) {
    const payload = await api.get<unknown>(apiEndpoints.supplier.list, {
      query: normalizeQuery(query),
    })

    return extractApiPayload<AdminSupplierListResponse>(payload)
  }

  async function getSupplierDetail(supplierId: string) {
    const payload = await api.get<unknown>(apiEndpoints.supplier.detail(supplierId))

    return extractApiPayload<AdminSupplierApiRecord>(payload)
  }

  async function createSupplier(payload: AdminSupplierMutationRequest) {
    const result = await api.post<unknown, AdminSupplierMutationRequest>(apiEndpoints.supplier.create, payload)

    return extractApiPayload<AdminSupplierApiRecord>(result)
  }

  async function updateSupplier(supplierId: string, payload: AdminSupplierMutationRequest) {
    const result = await api.patch<unknown, AdminSupplierMutationRequest>(
      apiEndpoints.supplier.update(supplierId),
      payload,
    )

    return extractApiPayload<AdminSupplierApiRecord>(result)
  }

  async function deleteSupplier(supplierId: string) {
    const payload = await api.delete<unknown>(apiEndpoints.supplier.remove(supplierId))

    return extractApiPayload<AdminSupplierDeleteResponse>(payload)
  }

  return {
    getSuppliers,
    getSupplierDetail,
    createSupplier,
    updateSupplier,
    deleteSupplier,
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
