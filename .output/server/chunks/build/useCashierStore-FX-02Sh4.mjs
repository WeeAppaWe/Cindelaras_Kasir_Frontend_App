import { computed, defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { toast } from 'vue-sonner';
import { u as useApiClient, a as apiEndpoints } from './api-endpoints-aT5YyZ8V.mjs';
import { u as useState } from './state-Dw1r7BQr.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CashierCurrency",
  __ssrInlineRender: true,
  props: {
    value: {}
  },
  setup(__props) {
    const props = __props;
    const formattedValue = computed(() => new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(props.value));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(_attrs)}>${ssrInterpolate(unref(formattedValue))}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/atoms/CashierCurrency.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CashierCurrency = Object.assign(_sfc_main, { __name: "AtomsCashierCurrency" });
const defaultMinimumLoadingMs = 300;
function useCashierActionFeedback() {
  async function runCashierAction(action, options) {
    if (options.loading.value) {
      return null;
    }
    options.loading.value = true;
    const startedAt = Date.now();
    try {
      const result = await action();
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs);
      showSuccessToast(options, result);
      return result;
    } catch (error) {
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs);
      toast.error(getErrorMessage(error, options.errorMessage));
      return null;
    } finally {
      options.loading.value = false;
    }
  }
  return {
    runCashierAction
  };
}
async function waitForMinimumDuration(startedAt, minimumLoadingMs) {
  const remainingMs = minimumLoadingMs - (Date.now() - startedAt);
  if (remainingMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, remainingMs));
  }
}
function showSuccessToast(options, result) {
  const message = resolveFeedbackMessage(options.successMessage, result);
  const description = resolveFeedbackMessage(options.successDescription, result);
  if (description) {
    toast.success(message, { description });
    return;
  }
  toast.success(message);
}
function resolveFeedbackMessage(message, result) {
  if (!message) {
    return "";
  }
  return typeof message === "function" ? message(result) : message;
}
function getErrorMessage(error, fallback = "Aksi kasir gagal diproses.") {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
function useCashierApi() {
  const api = useApiClient();
  function getCategories() {
    return api.get(apiEndpoints.category.options);
  }
  function getMenus(query = {}) {
    return api.get(apiEndpoints.menu.list, {
      query: normalizeQuery(query)
    });
  }
  function createOrder(payload) {
    return api.post(apiEndpoints.order.create, payload);
  }
  function getOrders(query = {}) {
    return api.get(apiEndpoints.order.list, {
      query: normalizeQuery(query)
    });
  }
  function getOrderDetail(orderId) {
    return api.get(apiEndpoints.order.detail(orderId));
  }
  function getCashMovements(query = {}) {
    return api.get(apiEndpoints.cashMovement.list, {
      query: normalizeQuery(query)
    });
  }
  function createCashMovement(payload) {
    return api.post(
      apiEndpoints.cashMovement.create,
      payload
    );
  }
  function getCashMovementDetail(cashMovementId) {
    return api.get(apiEndpoints.cashMovement.detail(cashMovementId));
  }
  function confirmOrder(orderId, payload) {
    return api.patch(
      apiEndpoints.order.confirm(orderId),
      payload
    );
  }
  function cancelOrder(orderId) {
    return api.patch(apiEndpoints.order.cancel(orderId));
  }
  function getReceiptPreview(orderId) {
    return api.get(apiEndpoints.receipt.preview(orderId));
  }
  function sendReceipt(orderId, payload) {
    return api.post(
      apiEndpoints.receipt.send(orderId),
      payload
    );
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
    sendReceipt
  };
}
function normalizeQuery(query) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== void 0 && value !== "")
  );
}
function useShiftApi() {
  const api = useApiClient();
  function getActiveShift() {
    return requestShiftData(apiEndpoints.shift.active);
  }
  function startShift(payload) {
    return requestShiftData(apiEndpoints.shift.start, {
      method: "POST",
      body: payload
    });
  }
  function endShift(payload) {
    return requestShiftData(apiEndpoints.shift.end, {
      method: "POST",
      body: payload
    });
  }
  function getMyShifts(query = {}) {
    return requestShiftData(apiEndpoints.shift.my, {
      query
    });
  }
  function getShifts(query = {}) {
    return requestShiftData(apiEndpoints.shift.list, {
      query
    });
  }
  function getShiftDetail(shiftId) {
    return requestShiftData(apiEndpoints.shift.detail(shiftId));
  }
  function getShiftSummary(shiftId) {
    return requestShiftData(apiEndpoints.shift.summary(shiftId));
  }
  function requestShiftData(endpoint, options = {}) {
    return api.request(endpoint, {
      method: options.method ?? "GET",
      body: options.body,
      query: normalizeShiftQuery(options.query)
    });
  }
  return {
    getActiveShift,
    getMyShifts,
    getShiftDetail,
    getShiftSummary,
    getShifts,
    startShift,
    endShift
  };
}
function normalizeShiftQuery(query) {
  if (!query) {
    return void 0;
  }
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== void 0)
  );
}
const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});
function useCashierStore() {
  const cashierApi = useCashierApi();
  const shiftApi = useShiftApi();
  const products = useState("cashier:products", () => []);
  const categories = useState("cashier:product-categories", () => []);
  const isProductListLoading = useState("cashier:product-list-loading", () => false);
  const hasLoadedProducts = useState("cashier:products-loaded", () => false);
  const productListError = useState("cashier:product-list-error", () => "");
  const isCategoryListLoading = useState("cashier:category-list-loading", () => false);
  const hasLoadedCategories = useState("cashier:categories-loaded", () => false);
  const categoryListError = useState("cashier:category-list-error", () => "");
  const cartItems = useState("cashier:cart-items", () => []);
  const activeShift = useState("cashier:active-shift", () => null);
  const activeShiftSummary = useState("cashier:active-shift-summary", () => null);
  const closedShifts = useState("cashier:closed-shifts", () => []);
  const isShiftStatusLoading = useState("cashier:shift-status-loading", () => false);
  const hasLoadedShiftStatus = useState("cashier:shift-status-loaded", () => false);
  const shiftStatusError = useState("cashier:shift-status-error", () => "");
  const transactions = useState("cashier:transactions", () => []);
  const transactionPage = useState("cashier:transaction-page", () => null);
  const isTransactionListLoading = useState("cashier:transaction-list-loading", () => false);
  const hasLoadedTransactions = useState("cashier:transactions-loaded", () => false);
  const transactionListError = useState("cashier:transaction-list-error", () => "");
  const isTransactionDetailLoading = useState("cashier:transaction-detail-loading", () => false);
  const transactionDetailError = useState("cashier:transaction-detail-error", () => "");
  const adjustments = useState("cashier:adjustments", () => []);
  const cashAdjustmentPage = useState("cashier:cash-adjustment-page", () => null);
  const cashAdjustmentSummary = useState("cashier:cash-adjustment-summary", () => null);
  const isCashAdjustmentListLoading = useState("cashier:cash-adjustment-list-loading", () => false);
  const hasLoadedCashAdjustments = useState("cashier:cash-adjustments-loaded", () => false);
  const cashAdjustmentListError = useState("cashier:cash-adjustment-list-error", () => "");
  const isCashAdjustmentDetailLoading = useState("cashier:cash-adjustment-detail-loading", () => false);
  const cashAdjustmentDetailError = useState("cashier:cash-adjustment-detail-error", () => "");
  const productCategories = computed(() => [
    { id: "", name: "Semua" },
    ...categories.value
  ]);
  const cartQuantities = computed(() => cartItems.value.reduce((result, item) => {
    result[item.productId] = item.quantity;
    return result;
  }, {}));
  const cartItemCount = computed(() => cartItems.value.reduce((total2, item) => total2 + item.quantity, 0));
  const subtotal = computed(() => cartItems.value.reduce((total2, item) => total2 + item.quantity * item.price, 0));
  const total = computed(() => subtotal.value);
  const shiftRevenue = computed(() => activeShiftSummary.value ? normalizeApiAmount(activeShiftSummary.value.sold_total) : transactions.value.reduce((sum, item) => sum + item.total, 0));
  const cashSalesTotal = computed(() => activeShiftSummary.value ? normalizeApiAmount(activeShiftSummary.value.cash_sales) : transactions.value.filter((item) => item.paymentMethod === "Tunai").reduce((sum, item) => sum + item.total, 0));
  const expectedCashTotal = computed(() => activeShiftSummary.value ? normalizeApiAmount(activeShiftSummary.value.expected_cash) : (activeShift.value?.openingCash ?? 0) + cashSalesTotal.value);
  const soldItemCount = computed(() => transactions.value.reduce((sum, item) => sum + item.itemCount, 0));
  const refundCount = computed(() => transactions.value.filter((item) => item.status === "warning").length);
  const cashInTotal = computed(() => cashAdjustmentSummary.value ? normalizeApiAmount(cashAdjustmentSummary.value.total_in) : adjustments.value.filter((item) => item.type === "in").reduce((sum, item) => sum + item.amount, 0));
  const cashOutTotal = computed(() => cashAdjustmentSummary.value ? normalizeApiAmount(cashAdjustmentSummary.value.total_out) : adjustments.value.filter((item) => item.type === "out").reduce((sum, item) => sum + item.amount, 0));
  const pendingAdjustmentCount = computed(() => adjustments.value.filter((item) => item.status === "warning").length);
  async function loadCategories(options = {}) {
    if (isCategoryListLoading.value) {
      return categories.value;
    }
    if (hasLoadedCategories.value && !options.force) {
      return categories.value;
    }
    isCategoryListLoading.value = true;
    categoryListError.value = "";
    try {
      const result = await cashierApi.getCategories();
      categories.value = result.map(mapCategoryRecordToProductCategory);
      hasLoadedCategories.value = true;
      return categories.value;
    } catch (error) {
      categoryListError.value = getApiErrorMessage(error, "Gagal memuat daftar kategori.");
      hasLoadedCategories.value = true;
      throw error;
    } finally {
      isCategoryListLoading.value = false;
    }
  }
  async function loadProducts(options = {}) {
    if (isProductListLoading.value) {
      return products.value;
    }
    const categoryId = options.categoryId?.trim();
    const hasQueryFilter = Boolean(categoryId);
    if (hasLoadedProducts.value && !options.force && !hasQueryFilter) {
      return products.value;
    }
    isProductListLoading.value = true;
    productListError.value = "";
    try {
      const result = await cashierApi.getMenus({
        batch: 1,
        size: 100,
        ...categoryId ? { category_id: categoryId } : {}
      });
      products.value = result.records.map(mapMenuRecordToProduct);
      hasLoadedProducts.value = true;
      return products.value;
    } catch (error) {
      productListError.value = getApiErrorMessage(error, "Gagal memuat daftar menu.");
      hasLoadedProducts.value = true;
      throw error;
    } finally {
      isProductListLoading.value = false;
    }
  }
  function addProductToCart(product) {
    if (product.isAvailable === false || product.stock <= 0) {
      return;
    }
    const existingItem = cartItems.value.find((item) => item.productId === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      }
      return;
    }
    cartItems.value.push({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      quantity: 1,
      price: product.price,
      stock: product.stock
    });
  }
  function incrementCartItem(productId) {
    const item = cartItems.value.find((candidate) => candidate.productId === productId);
    if (item && item.quantity < item.stock) {
      item.quantity += 1;
    }
  }
  function decrementCartItem(productId) {
    const item = cartItems.value.find((candidate) => candidate.productId === productId);
    if (!item) {
      return;
    }
    if (item.quantity <= 1) {
      removeCartItem(productId);
      return;
    }
    item.quantity -= 1;
  }
  function removeCartItem(productId) {
    cartItems.value = cartItems.value.filter((item) => item.productId !== productId);
  }
  function clearCart() {
    cartItems.value = [];
  }
  async function checkoutCart(payload) {
    if (!cartItems.value.length) {
      return null;
    }
    const customerName = payload.customerName.trim();
    const customerPhone = payload.customerPhone.trim();
    if (!customerName) {
      return null;
    }
    if (!activeShift.value) {
      throw new Error("Shift belum dibuka.");
    }
    const orderResult = await cashierApi.createOrder({
      customer_name: customerName,
      ...customerPhone ? { customer_phone: customerPhone } : {},
      payment_type: mapPaymentMethodToApi(payload.paymentMethod),
      order_type: mapDiningOptionToApiOrderType(payload.diningOption),
      items: cartItems.value.map((item) => ({
        menu_id: item.productId,
        qty: item.quantity,
        price: item.price
      }))
    });
    if (!orderResult.order?.order_id) {
      throw new Error(orderResult.message || "Pesanan gagal dibuat.");
    }
    const confirmResult = await cashierApi.confirmOrder(orderResult.order.order_id, {
      paid_amount: payload.cashReceived ?? total.value
    });
    if (!confirmResult.success || !confirmResult.order) {
      throw new Error(confirmResult.message || "Pembayaran gagal dikonfirmasi.");
    }
    const nextTransaction = mapOrderRecordToTransaction(confirmResult.order, payload.diningOption);
    const receipt = await resolveReceiptPreview(confirmResult.order, payload.diningOption);
    transactions.value = [nextTransaction, ...transactions.value];
    clearCart();
    return {
      transaction: nextTransaction,
      receipt
    };
  }
  async function sendReceiptToCustomer(receipt) {
    const phone = receipt.customerPhone.trim();
    if (!receipt.orderId) {
      throw new Error("Data order tidak tersedia.");
    }
    if (!phone || phone === "-") {
      throw new Error("Nomor WhatsApp pelanggan tidak diisi.");
    }
    const result = await cashierApi.sendReceipt(receipt.orderId, {
      phone
    });
    return {
      success: result.success,
      message: result.message,
      receiptUrl: result.receipt_url,
      whatsappStatus: result.whatsapp_status
    };
  }
  async function resolveReceiptPreview(order, diningOption) {
    try {
      const preview = await cashierApi.getReceiptPreview(order.order_id);
      return mapReceiptApiPreviewToReceiptPreview(preview, order, diningOption);
    } catch {
      return mapOrderRecordToReceiptPreview(order, diningOption);
    }
  }
  async function loadTransactions(query = {}) {
    if (isTransactionListLoading.value) {
      return {
        records: transactions.value,
        page: transactionPage.value
      };
    }
    isTransactionListLoading.value = true;
    transactionListError.value = "";
    try {
      const result = await cashierApi.getOrders(query);
      transactions.value = result.records.map((record) => mapOrderRecordToTransaction(record));
      transactionPage.value = result.page;
      hasLoadedTransactions.value = true;
      return {
        records: transactions.value,
        page: transactionPage.value
      };
    } catch (error) {
      transactionListError.value = getApiErrorMessage(error, "Gagal memuat riwayat transaksi.");
      hasLoadedTransactions.value = true;
      throw error;
    } finally {
      isTransactionListLoading.value = false;
    }
  }
  async function loadTransactionDetail(orderId) {
    const normalizedOrderId = orderId.trim();
    if (!normalizedOrderId) {
      throw new Error("Data order tidak tersedia.");
    }
    isTransactionDetailLoading.value = true;
    transactionDetailError.value = "";
    try {
      const result = await cashierApi.getOrderDetail(normalizedOrderId);
      const nextTransaction = mapOrderRecordToTransaction(result);
      const existingIndex = transactions.value.findIndex((item) => item.orderId === nextTransaction.orderId || item.id === nextTransaction.id || item.receiptNumber === nextTransaction.receiptNumber);
      if (existingIndex >= 0) {
        transactions.value = transactions.value.map((item, index) => index === existingIndex ? nextTransaction : item);
      }
      return nextTransaction;
    } catch (error) {
      transactionDetailError.value = getApiErrorMessage(error, "Gagal memuat detail transaksi.");
      throw error;
    } finally {
      isTransactionDetailLoading.value = false;
    }
  }
  async function sendTransactionReceipt(transaction) {
    const orderId = transaction.orderId?.trim();
    const phone = transaction.customerPhone.trim().replace(/\D/g, "");
    if (!orderId) {
      throw new Error("Data order tidak tersedia.");
    }
    if (!phone) {
      throw new Error("Nomor WhatsApp pelanggan tidak diisi.");
    }
    const result = await cashierApi.sendReceipt(orderId, {
      phone
    });
    return {
      success: result.success,
      message: result.message,
      receiptUrl: result.receipt_url,
      whatsappStatus: result.whatsapp_status
    };
  }
  function addTransaction(payload) {
    const now = /* @__PURE__ */ new Date();
    const nextTransaction = {
      id: createDatedSequenceId("TRX", transactions.value.map((item) => item.id)),
      cashierName: "Kasir Demo",
      paidAt: payload.paidAt.trim() || dateFormatter.format(now),
      paymentMethod: payload.paymentMethod,
      customerName: payload.customerName.trim() || "Pelanggan Umum",
      customerPhone: payload.customerPhone.trim() || "-",
      diningOption: payload.diningOption,
      itemCount: normalizePositiveInteger(payload.itemCount, 1),
      total: normalizePositiveAmount(payload.total),
      cashReceived: normalizeOptionalAmount(payload.cashReceived),
      cashChange: normalizeAmount(payload.cashChange ?? 0),
      status: payload.status,
      statusLabel: payload.statusLabel.trim() || getTransactionStatusLabel(payload.status)
    };
    transactions.value = [nextTransaction, ...transactions.value];
    return nextTransaction;
  }
  function updateTransaction(id, payload) {
    let updatedTransaction = null;
    transactions.value = transactions.value.map((item) => {
      if (item.id !== id) {
        return item;
      }
      updatedTransaction = {
        ...item,
        paidAt: payload.paidAt.trim() || item.paidAt,
        paymentMethod: payload.paymentMethod,
        customerName: payload.customerName.trim() || "Pelanggan Umum",
        customerPhone: payload.customerPhone.trim() || "-",
        diningOption: payload.diningOption,
        itemCount: normalizePositiveInteger(payload.itemCount, item.itemCount),
        total: normalizePositiveAmount(payload.total),
        cashReceived: normalizeOptionalAmount(payload.cashReceived),
        cashChange: normalizeAmount(payload.cashChange ?? 0),
        status: payload.status,
        statusLabel: payload.statusLabel.trim() || getTransactionStatusLabel(payload.status)
      };
      return updatedTransaction;
    });
    return updatedTransaction;
  }
  function deleteTransaction(id) {
    const deletedTransaction = transactions.value.find((item) => item.id === id) ?? null;
    if (!deletedTransaction) {
      return null;
    }
    transactions.value = transactions.value.filter((item) => item.id !== id);
    return deletedTransaction;
  }
  async function loadActiveShift(options = {}) {
    if (isShiftStatusLoading.value) {
      return activeShift.value;
    }
    if (hasLoadedShiftStatus.value && !options.force) {
      return activeShift.value;
    }
    isShiftStatusLoading.value = true;
    shiftStatusError.value = "";
    try {
      const result = await shiftApi.getActiveShift();
      const nextShift = result.is_active && result.shift ? mapShiftRecordToSession(result.shift) : null;
      activeShift.value = nextShift;
      activeShiftSummary.value = nextShift && activeShiftSummary.value?.shift_id === nextShift.id ? activeShiftSummary.value : null;
      hasLoadedShiftStatus.value = true;
      return nextShift;
    } catch (error) {
      shiftStatusError.value = getApiErrorMessage(error, "Gagal mengecek shift aktif.");
      hasLoadedShiftStatus.value = true;
      throw error;
    } finally {
      isShiftStatusLoading.value = false;
    }
  }
  async function loadActiveShiftSummary() {
    if (!activeShift.value) {
      activeShiftSummary.value = null;
      return null;
    }
    activeShiftSummary.value = await shiftApi.getShiftSummary(activeShift.value.id);
    return activeShiftSummary.value;
  }
  async function openShift(openingCash) {
    const result = await shiftApi.startShift({
      start_cash: normalizeAmount(openingCash)
    });
    if (!result.success || !result.shift) {
      throw new Error(result.message || "Shift gagal dibuka.");
    }
    const nextShift = mapShiftRecordToSession(result.shift);
    activeShift.value = nextShift;
    activeShiftSummary.value = null;
    hasLoadedShiftStatus.value = true;
    return nextShift;
  }
  async function closeShift(physicalCash, notes = "") {
    if (!activeShift.value) {
      throw new Error("Tidak ada shift aktif yang perlu ditutup.");
    }
    const trimmedNotes = notes.trim();
    const result = await shiftApi.endShift({
      end_cash: normalizeAmount(physicalCash),
      ...trimmedNotes ? { notes: trimmedNotes } : {}
    });
    if (!result.success || !result.summary) {
      throw new Error(result.message || "Shift gagal ditutup.");
    }
    const nextClosedShift = mapShiftSummaryToClosedShift(result.summary, activeShift.value);
    closedShifts.value = [nextClosedShift, ...closedShifts.value];
    activeShift.value = null;
    activeShiftSummary.value = null;
    hasLoadedShiftStatus.value = true;
    return nextClosedShift;
  }
  async function loadCashAdjustments(query = {}) {
    if (isCashAdjustmentListLoading.value) {
      return {
        records: adjustments.value,
        page: cashAdjustmentPage.value,
        summary: cashAdjustmentSummary.value
      };
    }
    isCashAdjustmentListLoading.value = true;
    cashAdjustmentListError.value = "";
    try {
      const result = await cashierApi.getCashMovements(query);
      adjustments.value = result.records.map(mapCashMovementRecordToAdjustment);
      cashAdjustmentPage.value = result.page;
      cashAdjustmentSummary.value = result.summary;
      hasLoadedCashAdjustments.value = true;
      return {
        records: adjustments.value,
        page: cashAdjustmentPage.value,
        summary: cashAdjustmentSummary.value
      };
    } catch (error) {
      cashAdjustmentListError.value = getApiErrorMessage(error, "Gagal memuat penyesuaian kas.");
      hasLoadedCashAdjustments.value = true;
      throw error;
    } finally {
      isCashAdjustmentListLoading.value = false;
    }
  }
  async function loadCashAdjustmentDetail(cashMovementId) {
    const normalizedCashMovementId = cashMovementId.trim();
    if (!normalizedCashMovementId) {
      throw new Error("ID penyesuaian kas tidak tersedia.");
    }
    isCashAdjustmentDetailLoading.value = true;
    cashAdjustmentDetailError.value = "";
    try {
      const result = await cashierApi.getCashMovementDetail(normalizedCashMovementId);
      const nextAdjustment = mapCashMovementRecordToAdjustment(result);
      const existingIndex = adjustments.value.findIndex((item) => item.id === nextAdjustment.id);
      if (existingIndex >= 0) {
        adjustments.value = adjustments.value.map((item, index) => index === existingIndex ? nextAdjustment : item);
      }
      return nextAdjustment;
    } catch (error) {
      cashAdjustmentDetailError.value = getApiErrorMessage(error, "Gagal memuat detail penyesuaian kas.");
      throw error;
    } finally {
      isCashAdjustmentDetailLoading.value = false;
    }
  }
  async function createCashAdjustment(payload) {
    const note = payload.reason.trim();
    const result = await cashierApi.createCashMovement({
      type: mapCashAdjustmentTypeToApi(payload.type),
      amount: normalizePositiveAmount(payload.amount),
      ...note ? { note } : {}
    });
    if (!result.success || !result.cash_movement) {
      throw new Error(result.message || "Penyesuaian kas gagal dicatat.");
    }
    const nextAdjustment = mapCashMovementRecordToAdjustment(result.cash_movement);
    adjustments.value = [nextAdjustment, ...adjustments.value];
    return nextAdjustment;
  }
  function addCashAdjustment(payload) {
    const now = /* @__PURE__ */ new Date();
    const nextAdjustment = {
      id: createDatedSequenceId("ADJ", adjustments.value.map((item) => item.id)),
      createdAt: dateFormatter.format(now),
      type: payload.type,
      reason: payload.reason.trim(),
      amount: normalizePositiveAmount(payload.amount),
      cashierName: "Kasir Demo",
      status: "info",
      statusLabel: "Tercatat"
    };
    adjustments.value = [nextAdjustment, ...adjustments.value];
    return nextAdjustment;
  }
  function updateCashAdjustment(id, payload) {
    let updatedAdjustment = null;
    adjustments.value = adjustments.value.map((item) => {
      if (item.id !== id) {
        return item;
      }
      updatedAdjustment = {
        ...item,
        type: payload.type,
        reason: payload.reason.trim(),
        amount: normalizePositiveAmount(payload.amount)
      };
      return updatedAdjustment;
    });
    return updatedAdjustment;
  }
  function deleteCashAdjustment(id) {
    const deletedAdjustment = adjustments.value.find((item) => item.id === id) ?? null;
    if (!deletedAdjustment) {
      return null;
    }
    adjustments.value = adjustments.value.filter((item) => item.id !== id);
    return deletedAdjustment;
  }
  function formatCurrency(value) {
    return currencyFormatter.format(value);
  }
  return {
    products,
    productCategories,
    isProductListLoading,
    hasLoadedProducts,
    productListError,
    isCategoryListLoading,
    hasLoadedCategories,
    categoryListError,
    activeShift,
    activeShiftSummary,
    isShiftStatusLoading,
    hasLoadedShiftStatus,
    shiftStatusError,
    closedShifts,
    cartItems,
    cartQuantities,
    cartItemCount,
    subtotal,
    total,
    transactions,
    transactionPage,
    isTransactionListLoading,
    hasLoadedTransactions,
    transactionListError,
    isTransactionDetailLoading,
    transactionDetailError,
    adjustments,
    cashAdjustmentPage,
    cashAdjustmentSummary,
    isCashAdjustmentListLoading,
    hasLoadedCashAdjustments,
    cashAdjustmentListError,
    isCashAdjustmentDetailLoading,
    cashAdjustmentDetailError,
    shiftRevenue,
    cashSalesTotal,
    expectedCashTotal,
    soldItemCount,
    refundCount,
    cashInTotal,
    cashOutTotal,
    pendingAdjustmentCount,
    addProductToCart,
    incrementCartItem,
    decrementCartItem,
    removeCartItem,
    clearCart,
    loadCategories,
    loadProducts,
    checkoutCart,
    sendReceiptToCustomer,
    loadTransactions,
    loadTransactionDetail,
    sendTransactionReceipt,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    loadActiveShift,
    loadActiveShiftSummary,
    openShift,
    closeShift,
    loadCashAdjustments,
    loadCashAdjustmentDetail,
    createCashAdjustment,
    addCashAdjustment,
    updateCashAdjustment,
    deleteCashAdjustment,
    formatCurrency
  };
}
function mapCategoryRecordToProductCategory(record) {
  return {
    id: record.category_id,
    name: record.name,
    menuCount: record._count?.menus
  };
}
function mapCashMovementRecordToAdjustment(record) {
  return {
    id: record.cash_movement_id,
    shiftId: record.shift_id,
    createdAt: formatApiDateTime(record.created_at),
    type: mapApiCashAdjustmentType(record.type),
    reason: record.note?.trim() || "-",
    amount: normalizeApiAmount(record.amount),
    cashierName: "Kasir",
    shiftStartedAt: formatApiDateTime(record.shift?.start_time),
    shiftEndedAt: formatApiDateTime(record.shift?.end_time),
    status: "info",
    statusLabel: "Tercatat"
  };
}
function mapApiCashAdjustmentType(type) {
  return type === "OUT" ? "out" : "in";
}
function mapCashAdjustmentTypeToApi(type) {
  return type === "out" ? "OUT" : "IN";
}
function mapMenuRecordToProduct(record) {
  const isAvailable = Boolean(record.is_available);
  const categoryName = record.category?.name?.trim() || "Tanpa kategori";
  return {
    id: record.menu_id,
    name: record.name,
    sku: createProductSku(record),
    category: categoryName,
    categoryId: record.category?.category_id,
    imageUrl: record.image_url || void 0,
    price: normalizeApiAmount(record.price),
    stock: isAvailable ? 999 : 0,
    soldToday: 0,
    isFavorite: false,
    isAvailable
  };
}
function createProductSku(record) {
  const compactName = record.name.split(/\s+/).filter(Boolean).map((part) => part.slice(0, 1).toUpperCase()).join("").slice(0, 3);
  const idSegment = record.menu_id.replace(/-/g, "").slice(0, 5).toUpperCase();
  return `${compactName || "MNU"}-${idSegment || "ITEM"}`;
}
function mapPaymentMethodToApi(method) {
  return method === "Tunai" ? "CASH" : "QRIS";
}
function mapApiPaymentType(paymentType) {
  return paymentType === "CASH" ? "Tunai" : "QRIS";
}
function mapApiOrderType(orderType) {
  return orderType === "TAKE_AWAY" ? "Bungkus" : "Makan di Tempat";
}
function mapDiningOptionToApiOrderType(diningOption) {
  return diningOption === "Bungkus" ? "TAKE_AWAY" : "DINE_IN";
}
function mapOrderRecordToTransaction(order, diningOption) {
  const paymentMethod = mapApiPaymentType(order.payment_type);
  const resolvedDiningOption = diningOption ?? mapApiOrderType(order.order_type);
  const items = mapOrderItemsToCartItems(order);
  const itemCount = items.length ? items.reduce((sum, item) => sum + item.quantity, 0) : normalizeApiAmount(order._count?.order_items);
  return {
    id: order.receipt || order.order_id,
    orderId: order.order_id,
    shiftId: order.shift_id,
    receiptNumber: order.receipt,
    cashierName: order.user?.name ?? "Kasir",
    paidAt: formatApiDateTime(order.updated_at || order.created_at),
    paymentMethod,
    customerName: order.customer_name || "Pelanggan Umum",
    customerPhone: order.customer_phone || "-",
    diningOption: resolvedDiningOption,
    itemCount,
    total: normalizeApiAmount(order.total_amount),
    items,
    cashReceived: paymentMethod === "Tunai" ? normalizeApiAmount(order.paid_amount) : null,
    cashChange: normalizeApiAmount(order.change_amount),
    shiftStartedAt: formatApiDateTime(order.shift?.start_time),
    shiftEndedAt: formatApiDateTime(order.shift?.end_time),
    status: getOrderStatusTone(order.status),
    statusLabel: getOrderStatusLabel(order.status)
  };
}
function mapReceiptApiPreviewToReceiptPreview(preview, order, diningOption) {
  const paymentMethod = mapApiPaymentType(preview.payment_type);
  const receiptNumber = preview.receipt || order.receipt;
  const resolvedDiningOption = preview.order_type ? mapApiOrderType(preview.order_type) : diningOption;
  const items = preview.items.map((item, index) => ({
    productId: `${order.order_id}-${index}`,
    name: item.name,
    sku: `ITEM-${String(index + 1).padStart(2, "0")}`,
    quantity: normalizePositiveInteger(item.qty, 1),
    price: normalizeApiAmount(item.price),
    stock: 999
  }));
  return {
    id: receiptNumber || order.order_id,
    orderId: order.order_id,
    receiptNumber,
    cashierName: preview.cashier_name || order.user?.name || "Kasir",
    paidAt: [preview.order_date, preview.order_time].filter(Boolean).join(" ") || formatApiDateTime(order.updated_at || order.created_at),
    paymentMethod,
    customerName: preview.customer_name || order.customer_name || "Pelanggan Umum",
    customerPhone: preview.customer_phone || order.customer_phone || "-",
    diningOption: resolvedDiningOption,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    total: normalizeApiAmount(preview.total),
    items,
    cashReceived: paymentMethod === "Tunai" ? normalizeApiAmount(preview.paid_amount) : null,
    cashChange: normalizeApiAmount(preview.change_amount)
  };
}
function mapOrderRecordToReceiptPreview(order, diningOption) {
  const paymentMethod = mapApiPaymentType(order.payment_type);
  const items = mapOrderItemsToCartItems(order);
  return {
    id: order.receipt || order.order_id,
    orderId: order.order_id,
    receiptNumber: order.receipt,
    cashierName: order.user?.name ?? "Kasir",
    paidAt: formatApiDateTime(order.updated_at || order.created_at),
    paymentMethod,
    customerName: order.customer_name || "Pelanggan Umum",
    customerPhone: order.customer_phone || "-",
    diningOption,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    total: normalizeApiAmount(order.total_amount),
    items,
    cashReceived: paymentMethod === "Tunai" ? normalizeApiAmount(order.paid_amount) : null,
    cashChange: normalizeApiAmount(order.change_amount)
  };
}
function mapOrderItemsToCartItems(order) {
  return (order.order_items ?? []).map((item) => ({
    productId: item.menu_id,
    name: item.menu?.name || item.menu_id,
    sku: item.menu_id.replace(/-/g, "").slice(0, 8).toUpperCase(),
    quantity: normalizePositiveInteger(item.qty, 1),
    price: normalizeApiAmount(item.price),
    stock: 999
  }));
}
function getOrderStatusTone(status) {
  if (status === "COMPLETED") {
    return "success";
  }
  if (status === "CANCELLED") {
    return "warning";
  }
  return "neutral";
}
function getOrderStatusLabel(status) {
  if (status === "COMPLETED") {
    return "Lunas";
  }
  if (status === "CANCELLED") {
    return "Dibatalkan";
  }
  return "Pending";
}
function createDatedSequenceId(prefix, existingIds) {
  const now = /* @__PURE__ */ new Date();
  const dateSegment = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const idPrefix = `${prefix}-${dateSegment}-`;
  const maxSequence = existingIds.reduce((max, id) => {
    if (!id.startsWith(idPrefix)) {
      return max;
    }
    const sequence = Number(id.slice(idPrefix.length));
    return Number.isFinite(sequence) ? Math.max(max, sequence) : max;
  }, 0);
  return `${idPrefix}${String(maxSequence + 1).padStart(3, "0")}`;
}
function normalizeAmount(value) {
  return Math.max(0, Math.round(Number.isFinite(value) ? value : 0));
}
function normalizePositiveAmount(value) {
  return Math.max(1, normalizeAmount(value));
}
function normalizeOptionalAmount(value) {
  if (value === null || value === void 0 || !Number.isFinite(value)) {
    return null;
  }
  return normalizeAmount(value);
}
function normalizePositiveInteger(value, fallback) {
  if (!Number.isFinite(value)) {
    return fallback;
  }
  return Math.max(1, Math.round(value));
}
function getTransactionStatusLabel(status) {
  if (status === "success") {
    return "Lunas";
  }
  if (status === "info") {
    return "Sinkron";
  }
  if (status === "warning") {
    return "Refund parsial";
  }
  return "Draft";
}
function mapShiftRecordToSession(record) {
  return {
    id: record.shift_id,
    openedAt: formatApiDateTime(record.start_time),
    openingCash: normalizeApiAmount(record.start_cash),
    cashierName: record.user?.name ?? "Kasir"
  };
}
function mapShiftSummaryToClosedShift(summary, fallbackShift) {
  return {
    id: summary.shift_id || fallbackShift.id,
    openedAt: formatApiDateTime(summary.start_time) || fallbackShift.openedAt,
    closedAt: formatApiDateTime(summary.end_time) || dateFormatter.format(/* @__PURE__ */ new Date()),
    openingCash: normalizeApiAmount(summary.start_cash),
    salesTotal: normalizeApiAmount(summary.sold_total),
    cashSalesTotal: normalizeApiAmount(summary.cash_sales),
    expectedCash: normalizeApiAmount(summary.expected_cash),
    physicalCash: normalizeApiAmount(summary.end_cash),
    difference: normalizeApiAmount(summary.difference),
    cashierName: summary.user_name || fallbackShift.cashierName
  };
}
function normalizeApiAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}
function formatApiDateTime(value) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateFormatter.format(date);
}
function getApiErrorMessage(error, fallback) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

export { CashierCurrency as C, useCashierActionFeedback as a, useCashierStore as u };
//# sourceMappingURL=useCashierStore-FX-02Sh4.mjs.map
