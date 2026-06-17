import type { ApiQueryValue } from '#layers/base/app/types/api-client'
import type { ApiPaginatedResponse } from '#layers/base/app/types/api-response'
import type {
  CashierCancelOrderResponse,
  CashierCategoryApiRecord,
  CashAdjustmentApiRecord,
  CashAdjustmentCreateRequest,
  CashAdjustmentCreateResponse,
  CashAdjustmentListQuery,
  CashAdjustmentListResponse,
  CashierConfirmOrderRequest,
  CashierConfirmOrderResponse,
  CashierCreateOrderRequest,
  CashierCreateOrderResponse,
  CashierMenuApiRecord,
  CashierMenuListQuery,
  CashierOrderListQuery,
  CashierApiOrderRecord,
  CashierReceiptApiPreview,
  CashierSendReceiptRequest,
  CashierSendReceiptResponse,
} from '../types/cashier'

export function useCashierApi() {
  const api = useApiClient()

  function getCategories() {
    return api.get<CashierCategoryApiRecord[]>(apiEndpoints.category.options)
  }

  function getMenus(query: CashierMenuListQuery = {}) {
    return api.get<ApiPaginatedResponse<CashierMenuApiRecord>>(apiEndpoints.menu.list, {
      query: normalizeQuery(query),
    })
  }

  function createOrder(payload: CashierCreateOrderRequest) {
    return api.post<CashierCreateOrderResponse, CashierCreateOrderRequest>(apiEndpoints.order.create, payload)
  }

  function getOrders(query: CashierOrderListQuery = {}) {
    return api.get<ApiPaginatedResponse<CashierApiOrderRecord>>(apiEndpoints.order.list, {
      query: normalizeQuery(query),
    })
  }

  function getOrderDetail(orderId: string) {
    return api.get<CashierApiOrderRecord>(apiEndpoints.order.detail(orderId))
  }

  function getCashMovements(query: CashAdjustmentListQuery = {}) {
    return api.get<CashAdjustmentListResponse>(apiEndpoints.cashMovement.list, {
      query: normalizeQuery(query),
    })
  }

  function createCashMovement(payload: CashAdjustmentCreateRequest) {
    return api.post<CashAdjustmentCreateResponse, CashAdjustmentCreateRequest>(
      apiEndpoints.cashMovement.create,
      payload,
    )
  }

  function getCashMovementDetail(cashMovementId: string) {
    return api.get<CashAdjustmentApiRecord>(apiEndpoints.cashMovement.detail(cashMovementId))
  }

  function confirmOrder(orderId: string, payload: CashierConfirmOrderRequest) {
    return api.patch<CashierConfirmOrderResponse, CashierConfirmOrderRequest>(
      apiEndpoints.order.confirm(orderId),
      payload,
    )
  }

  function cancelOrder(orderId: string) {
    return api.patch<CashierCancelOrderResponse>(apiEndpoints.order.cancel(orderId))
  }

  function getReceiptPreview(orderId: string) {
    return api.get<CashierReceiptApiPreview>(apiEndpoints.receipt.preview(orderId))
  }

  function sendReceipt(orderId: string, payload: CashierSendReceiptRequest) {
    return api.post<CashierSendReceiptResponse, CashierSendReceiptRequest>(
      apiEndpoints.receipt.send(orderId),
      payload,
    )
  }

  return {
    getCategories,
    getMenus,
    createOrder,
    getOrders,
    getOrderDetail,
    getCashMovements,
    createCashMovement,
    getCashMovementDetail,
    confirmOrder,
    cancelOrder,
    getReceiptPreview,
    sendReceipt,
  }
}

function normalizeQuery<TQuery extends object>(query: TQuery) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined && value !== ''),
  ) as Record<string, ApiQueryValue | ApiQueryValue[]>
}
