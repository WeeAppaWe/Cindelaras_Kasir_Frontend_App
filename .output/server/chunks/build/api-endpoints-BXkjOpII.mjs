import { c as useNuxtApp, d as useRuntimeConfig } from './server.mjs';
import { ref, customRef } from 'vue';
import { y as klona, z as parse, A as getRequestHeader, B as isEqual, C as setCookie, D as getCookie, E as deleteCookie } from '../_/nitro.mjs';

const explicitErrorResponseCodes = /* @__PURE__ */ new Set(["5505", "5542", "5574"]);
class ApiClientError extends Error {
  statusCode;
  statusMessage;
  responseCode;
  data;
  errors;
  raw;
  constructor(message, options) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = options.statusCode;
    this.statusMessage = options.statusMessage;
    this.responseCode = options.responseCode;
    this.data = options.data;
    this.errors = options.errors;
    this.raw = options.raw;
  }
}
function unwrapApiResponse(payload) {
  if (!isApiResponseEnvelope(payload)) {
    return payload;
  }
  assertSuccessfulApiResponse(payload);
  return payload.response;
}
function parseApiResponseEnvelope(payload) {
  if (!isApiResponseEnvelope(payload)) {
    throw new ApiClientError("Format response API tidak valid.", {
      statusCode: 0,
      statusMessage: "",
      data: payload,
      raw: payload
    });
  }
  assertSuccessfulApiResponse(payload);
  return payload;
}
function isApiResponseEnvelope(value) {
  if (!isRecord(value)) {
    return false;
  }
  return "response" in value && isApiMetaData(value.metaData);
}
function normalizeApiClientError(error) {
  if (error instanceof ApiClientError) {
    return error;
  }
  const fetchError = error;
  if (isApiResponseEnvelope(fetchError.data)) {
    return createApiClientErrorFromEnvelope(fetchError.data, error);
  }
  if (isDirectApiResponse(fetchError.data)) {
    return new ApiClientError(fetchError.data.message, {
      statusCode: fetchError.data.code,
      statusMessage: fetchError.data.message,
      data: fetchError.data.response,
      raw: error
    });
  }
  if (isDataDirectApiResponse(fetchError.data)) {
    return new ApiClientError(fetchError.data.message, {
      statusCode: fetchError.data.code,
      statusMessage: fetchError.data.message,
      data: fetchError.data.data,
      raw: error
    });
  }
  const statusCode = fetchError.statusCode ?? fetchError.status ?? fetchError.response?.status ?? 0;
  const statusMessage = fetchError.statusMessage ?? fetchError.response?.statusText ?? "";
  const message = getErrorMessage(fetchError.data) || fetchError.message || "Gagal terhubung ke server.";
  return new ApiClientError(message, {
    statusCode,
    statusMessage,
    data: fetchError.data,
    errors: getErrorDetails(fetchError.data),
    raw: error
  });
}
function assertSuccessfulApiResponse(envelope) {
  if (isSuccessfulApiResponse(envelope)) {
    return;
  }
  throw createApiClientErrorFromEnvelope(envelope, envelope);
}
function isSuccessfulApiResponse(envelope) {
  const code = envelope.metaData.code;
  const responseCode = envelope.metaData.response_code;
  if (code < 200 || code >= 300) {
    return false;
  }
  if (explicitErrorResponseCodes.has(responseCode)) {
    return false;
  }
  if (code === 200) {
    return responseCode === "0000";
  }
  return true;
}
function createApiClientErrorFromEnvelope(envelope, raw) {
  return new ApiClientError(envelope.metaData.message || "Gagal memproses response API.", {
    statusCode: envelope.metaData.code,
    statusMessage: envelope.metaData.message,
    responseCode: envelope.metaData.response_code,
    data: envelope.response,
    errors: getErrorDetails(envelope.response),
    raw
  });
}
function isApiMetaData(value) {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.message === "string" && typeof value.code === "number" && typeof value.response_code === "string";
}
function isDirectApiResponse(value) {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.code === "number" && typeof value.message === "string" && "response" in value;
}
function isDataDirectApiResponse(value) {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.code === "number" && typeof value.message === "string" && "data" in value;
}
function getErrorMessage(value) {
  if (!isRecord(value)) {
    return "";
  }
  if (typeof value.message === "string") {
    return value.message;
  }
  return "";
}
function getErrorDetails(value) {
  if (!isRecord(value)) {
    return void 0;
  }
  if ("error" in value) {
    return value.error;
  }
  return void 0;
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function parseCookieValue(value) {
  if (value === "undefined") {
    return void 0;
  }
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === "number" && String(parsed) !== value) {
      return value;
    }
    return parsed;
  } catch {
    return value;
  }
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => parseCookieValue(decodeURIComponent(val)),
  encode: (val) => {
    if (typeof val !== "string" || val === "undefined") {
      return encodeURIComponent(JSON.stringify(val));
    }
    try {
      if (typeof JSON.parse(val) !== "string") {
        return encodeURIComponent(JSON.stringify(val));
      }
    } catch {
    }
    return encodeURIComponent(val);
  },
  refresh: false
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = cookieServerRef(name, cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      const valueIsSame = isEqual(cookie.value, cookies[name]);
      if (opts.readonly || valueIsSame && !opts.refresh) {
        return;
      }
      nuxtApp._cookiesChanged ||= {};
      if (valueIsSame && opts.refresh && !nuxtApp._cookiesChanged[name]) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function cookieServerRef(name, value) {
  const internalRef = ref(value);
  const nuxtApp = useNuxtApp();
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return internalRef.value;
      },
      set(newValue) {
        nuxtApp._cookiesChanged ||= {};
        nuxtApp._cookiesChanged[name] = true;
        internalRef.value = newValue;
        trigger();
      }
    };
  });
}
function useApiClient() {
  const config = useRuntimeConfig();
  const authCookieName = String(config.public.authCookieName || "auth_session");
  const apiPrefix = normalizePath(String(config.public.apiPrefix || "/api"));
  const baseURL = ensureApiPrefix(String(config.public.apiBaseUrl || ""), apiPrefix);
  const timeout = Number(config.public.apiTimeoutMs || 1e4);
  const api = $fetch.create({
    baseURL,
    timeout,
    credentials: "same-origin",
    onRequest({ options }) {
      const requestOptions = options;
      if (requestOptions.auth === false) {
        return;
      }
      const authCredentials = getAuthCredentials(authCookieName);
      if (!authCredentials.token && !authCredentials.apiKey) {
        return;
      }
      const headers = new Headers(options.headers);
      if (authCredentials.token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${authCredentials.token}`);
      }
      if (authCredentials.apiKey && !headers.has("APIKey")) {
        headers.set("APIKey", authCredentials.apiKey);
      }
      if (authCredentials.apiKey && !headers.has("x-api-key")) {
        headers.set("x-api-key", authCredentials.apiKey);
      }
      options.headers = headers;
    }
  });
  async function request(endpoint, options = {}) {
    try {
      const payload = await api(endpoint, options);
      if (options.unwrap === false) {
        return payload;
      }
      return unwrapApiResponse(payload);
    } catch (error) {
      throw normalizeApiClientError(error);
    }
  }
  async function requestEnvelope(endpoint, options = {}) {
    try {
      const payload = await api(endpoint, {
        ...options,
        unwrap: false
      });
      return parseApiResponseEnvelope(payload);
    } catch (error) {
      throw normalizeApiClientError(error);
    }
  }
  async function raw(endpoint, options = {}) {
    try {
      return await api.raw(endpoint, options);
    } catch (error) {
      throw normalizeApiClientError(error);
    }
  }
  function get(endpoint, options = {}) {
    return request(endpoint, {
      ...options,
      method: "GET"
    });
  }
  function post(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "POST",
      body
    });
  }
  function put(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "PUT",
      body
    });
  }
  function patch(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "PATCH",
      body
    });
  }
  function remove(endpoint, options = {}) {
    return request(endpoint, {
      ...options,
      method: "DELETE"
    });
  }
  return {
    baseURL,
    request,
    requestEnvelope,
    raw,
    get,
    post,
    put,
    patch,
    delete: remove
  };
}
function ensureApiPrefix(baseUrl, prefix) {
  const normalizedBaseUrl = normalizeUrl(baseUrl);
  if (!prefix || normalizedBaseUrl.endsWith(prefix)) {
    return normalizedBaseUrl;
  }
  return `${normalizedBaseUrl}${prefix}`;
}
function normalizeUrl(value) {
  return value.trim().replace(/\/+$/g, "");
}
function normalizePath(value) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return "";
  }
  const path = trimmedValue.startsWith("/") ? trimmedValue : `/${trimmedValue}`;
  return path === "/" ? "" : path.replace(/\/+$/g, "");
}
function getAuthCredentials(cookieName) {
  const session = useCookie(cookieName);
  const value = session.value;
  if (!value) {
    return {
      token: "",
      apiKey: ""
    };
  }
  if (typeof value === "string") {
    return {
      token: value,
      apiKey: ""
    };
  }
  return {
    token: typeof value.token === "string" ? value.token : "",
    apiKey: typeof value.apiKey === "string" ? value.apiKey : ""
  };
}
const apiEndpoints = {
  dashboard: {
    kpi: "/dashboard/kpi",
    salesTrend: "/dashboard/sales-trend",
    topMenus: "/dashboard/top-menus",
    stockStatus: "/dashboard/stock-status",
    recentStockMovements: "/dashboard/recent-stock-movements"
  },
  auth: {
    login: "/auth/login",
    forgotPasswordRequestOtp: "/auth/forgot-password/request-otp",
    forgotPasswordVerifyOtp: "/auth/forgot-password/verify-otp",
    forgotPasswordResetPassword: "/auth/forgot-password/reset-password",
    logout: "/auth/logout"
  },
  user: {
    roles: "/user/roles",
    statuses: "/user/statuses",
    list: "/user",
    detail: (userId) => `/user/${userId}`,
    create: "/user",
    update: (userId) => `/user/${userId}`,
    remove: (userId) => `/user/${userId}`
  },
  category: {
    options: "/category/options",
    list: "/category",
    detail: (categoryId) => `/category/${categoryId}`,
    create: "/category",
    update: (categoryId) => `/category/${categoryId}`,
    remove: (categoryId) => `/category/${categoryId}`
  },
  unitMeasure: {
    options: "/unit-measure/options",
    list: "/unit-measure",
    detail: (unitMeasureId) => `/unit-measure/${unitMeasureId}`,
    create: "/unit-measure",
    update: (unitMeasureId) => `/unit-measure/${unitMeasureId}`,
    remove: (unitMeasureId) => `/unit-measure/${unitMeasureId}`
  },
  ingredient: {
    options: "/ingredient/options",
    raw: {
      units: "/ingredient/raw/units",
      options: "/ingredient/raw/options",
      lowStock: "/ingredient/raw/low-stock",
      list: "/ingredient/raw",
      detail: (ingredientId) => `/ingredient/raw/${ingredientId}`,
      create: "/ingredient/raw",
      update: (ingredientId) => `/ingredient/raw/${ingredientId}`,
      remove: (ingredientId) => `/ingredient/raw/${ingredientId}`
    },
    semi: {
      units: "/ingredient/semi/units",
      list: "/ingredient/semi",
      detail: (ingredientId) => `/ingredient/semi/${ingredientId}`,
      create: "/ingredient/semi",
      createAndProduce: "/ingredient/semi/create-and-produce",
      update: (ingredientId) => `/ingredient/semi/${ingredientId}`,
      remove: (ingredientId) => `/ingredient/semi/${ingredientId}`,
      hpp: (ingredientId) => `/ingredient/semi/${ingredientId}/hpp`,
      produce: (ingredientId) => `/ingredient/semi/${ingredientId}/produce`,
      recalculateHpp: (ingredientId) => `/ingredient/semi/${ingredientId}/recalculate-hpp`,
      composition: {
        availableIngredients: "/ingredient/semi/composition/available-ingredients",
        previewHpp: "/ingredient/semi/composition/preview-hpp",
        list: (ingredientId) => `/ingredient/semi/${ingredientId}/composition`,
        create: (ingredientId) => `/ingredient/semi/${ingredientId}/composition`,
        bulkReplace: (ingredientId) => `/ingredient/semi/${ingredientId}/composition/bulk`,
        update: (ingredientId, compositionId) => `/ingredient/semi/${ingredientId}/composition/${compositionId}`,
        remove: (ingredientId, compositionId) => `/ingredient/semi/${ingredientId}/composition/${compositionId}`
      }
    }
  },
  menu: {
    list: "/menu",
    detail: (menuId) => `/menu/${menuId}`,
    create: "/menu",
    update: (menuId) => `/menu/${menuId}`,
    toggleAvailability: (menuId) => `/menu/${menuId}/toggle-availability`,
    remove: (menuId) => `/menu/${menuId}`,
    recipe: {
      list: (menuId) => `/menu/${menuId}/recipe`,
      create: (menuId) => `/menu/${menuId}/recipe`,
      bulkUpdate: (menuId) => `/menu/${menuId}/recipe`,
      update: (menuId, recipeId) => `/menu/${menuId}/recipe/${recipeId}`,
      remove: (menuId, recipeId) => `/menu/${menuId}/recipe/${recipeId}`
    }
  },
  supplier: {
    list: "/supplier",
    detail: (supplierId) => `/supplier/${supplierId}`,
    create: "/supplier",
    update: (supplierId) => `/supplier/${supplierId}`,
    remove: (supplierId) => `/supplier/${supplierId}`
  },
  inventory: {
    stockTypes: "/inventory/stock-types",
    stockIn: "/inventory/stock-in",
    stockOut: "/inventory/stock-out",
    ingredientHistory: (ingredientId) => `/inventory/ingredient/${ingredientId}`,
    list: "/inventory",
    detail: (stockMovementId) => `/inventory/${stockMovementId}`
  },
  stockType: {
    list: "/stock-type",
    detail: (stockTypeId) => `/stock-type/${stockTypeId}`
  },
  opname: {
    ingredients: "/opname/ingredients",
    list: "/opname",
    detail: (stockOpnameId) => `/opname/${stockOpnameId}`,
    create: "/opname",
    update: (stockOpnameId) => `/opname/${stockOpnameId}`,
    updateStatus: (stockOpnameId) => `/opname/${stockOpnameId}/status`,
    apply: (stockOpnameId) => `/opname/${stockOpnameId}/apply`,
    remove: (stockOpnameId) => `/opname/${stockOpnameId}`
  },
  shift: {
    active: "/shift/active",
    my: "/shift/my",
    start: "/shift/start",
    end: "/shift/end",
    list: "/shift",
    detail: (shiftId) => `/shift/${shiftId}`,
    summary: (shiftId) => `/shift/${shiftId}/summary`
  },
  cashMovement: {
    list: "/cash-movement",
    detail: (cashMovementId) => `/cash-movement/${cashMovementId}`,
    create: "/cash-movement"
  },
  order: {
    list: "/order",
    detail: (orderId) => `/order/${orderId}`,
    create: "/order",
    confirm: (orderId) => `/order/${orderId}/confirm`,
    cancel: (orderId) => `/order/${orderId}/cancel`,
    receipt: (orderId) => `/order/${orderId}/receipt`
  },
  receipt: {
    pdf: (orderId) => `/receipt/${orderId}/pdf`,
    previewSample: "/receipt/preview-sample",
    previewPdf: "/receipt/preview-pdf",
    preview: (orderId) => `/receipt/${orderId}/preview`,
    send: (orderId) => `/receipt/${orderId}/send`
  },
  storeSetting: {
    publicInfo: "/store-setting/public/info",
    list: "/store-setting",
    map: "/store-setting/map",
    batchUpdate: "/store-setting/batch",
    detail: (settingKey) => `/store-setting/${settingKey}`,
    upsert: "/store-setting",
    update: (settingKey) => `/store-setting/${settingKey}`,
    remove: (settingKey) => `/store-setting/${settingKey}`
  },
  upload: {
    image: (folder) => `/upload/image/${folder}`,
    imageDefault: "/upload/image",
    removeImage: (folder, filename) => `/upload/image/${folder}/${filename}`,
    removeDefaultImage: (filename) => `/upload/image/${filename}`
  },
  report: {
    financial: {
      full: "/report/financial",
      summary: "/report/financial/summary",
      payment: "/report/financial/payment",
      cashFlow: "/report/financial/cash-flow",
      topMenus: "/report/financial/top-menus",
      byCategory: "/report/financial/by-category"
    },
    inventory: {
      full: "/report/inventory",
      current: "/report/inventory/current",
      movement: "/report/inventory/movement",
      alerts: "/report/inventory/alerts",
      valuation: "/report/inventory/valuation",
      opname: "/report/inventory/opname",
      card: "/report/inventory/card"
    },
    operational: {
      full: "/report/operational",
      cashier: "/report/operational/cashier",
      shift: "/report/operational/shift",
      transactions: "/report/operational/transactions",
      menu: "/report/operational/menu",
      orderStatus: "/report/operational/order-status"
    },
    export: {
      pdf: "/report/export/pdf",
      excel: "/report/export/excel"
    }
  },
  spk: {
    analysis: "/spk/analysis"
  }
};

export { apiEndpoints as a, useCookie as b, useApiClient as u };
//# sourceMappingURL=api-endpoints-BXkjOpII.mjs.map
