import { u as useApiClient, a as apiEndpoints } from './api-endpoints-Bk94Aoou.mjs';

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});
const numberFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 2
});
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});
function mapAdminInventoryMovementRecordToViewItem(record) {
  const qty = toNumber(record.qty);
  const absQty = Math.abs(qty);
  const unitCost = toNumber(record.unit_cost ?? 0);
  const currentStock = toNumber(record.current_stock);
  const unitName = record.ingredient?.unit?.name?.trim() || "-";
  const stockTypeName = record.stock_type?.name || "";
  const movementKind = getInventoryMovementKind(stockTypeName, qty);
  const type = getInventoryMovementTypePresentation(stockTypeName, movementKind);
  const isOutgoing = movementKind === "out" || movementKind === "sale";
  const totalCost = Math.round(absQty * unitCost);
  const supplierName = record.supplier?.name || "";
  const userName = record.user?.name || "-";
  return {
    id: record.stock_movement_id,
    date: formatAdminInventoryDateTime(record.created_at),
    ingredientId: record.ingredient_id,
    ingredientName: record.ingredient?.name || record.ingredient_id,
    unitName,
    supplierId: record.supplier_id ?? "",
    supplierName: supplierName || "-",
    stockTypeId: record.stock_type_id,
    stockTypeName,
    stockTypeLabel: formatStockTypeLabel(stockTypeName),
    userName,
    qty,
    absQty,
    unitCost,
    currentStock,
    notes: record.notes?.trim() || "-",
    movementKind,
    typeLabel: type.label,
    typeTone: type.tone,
    source: supplierName || userName || "-",
    quantityLabel: `${isOutgoing ? "-" : "+"}${formatNumber(absQty)} ${unitName}`,
    balanceLabel: `${formatNumber(currentStock)} ${unitName}`,
    unitCostLabel: unitCost > 0 ? formatCurrency(unitCost) : "-",
    totalCost,
    totalCostLabel: unitCost > 0 ? formatCurrency(totalCost) : "-",
    reason: getStockOutReason(stockTypeName, record.notes),
    reasonLabel: getStockOutReasonLabel(getStockOutReason(stockTypeName, record.notes))
  };
}
function hydrateAdminInventoryMovementStockType(record, stockTypes) {
  if (record.stock_type?.name) {
    return record;
  }
  const stockType = stockTypes.find((item) => item.id === record.stock_type_id);
  if (!stockType) {
    return record;
  }
  return {
    ...record,
    stock_type: {
      stock_type_id: stockType.id,
      name: stockType.name
    }
  };
}
function createAdminInventoryStockInPayload(payload) {
  return {
    ingredient_id: payload.ingredientId,
    supplier_id: payload.supplierId,
    qty: payload.qty,
    unit_cost: payload.unitCost,
    notes: payload.notes.trim() || void 0
  };
}
function createAdminInventoryStockOutPayload(payload) {
  return {
    ingredient_id: payload.ingredientId,
    qty: payload.qty,
    reason: payload.reason,
    notes: payload.notes.trim() || void 0
  };
}
function getAdminInventoryStockInValidationMessage(payload) {
  if (!payload.ingredientId) {
    return "Bahan wajib dipilih.";
  }
  if (!payload.supplierId) {
    return "Pemasok wajib dipilih.";
  }
  if (!Number.isFinite(payload.qty) || payload.qty <= 0) {
    return "Qty stok masuk harus lebih dari 0.";
  }
  if (!Number.isFinite(payload.unitCost) || payload.unitCost < 0) {
    return "Harga satuan harus 0 atau lebih.";
  }
  if (payload.notes.length > 500) {
    return "Catatan maksimal 500 karakter.";
  }
  return "";
}
function getAdminInventoryStockOutValidationMessage(payload) {
  if (!payload.ingredientId) {
    return "Bahan wajib dipilih.";
  }
  if (!Number.isFinite(payload.qty) || payload.qty <= 0) {
    return "Qty stok keluar harus lebih dari 0.";
  }
  if (!isStockOutReason(payload.reason)) {
    return "Alasan stok keluar tidak valid.";
  }
  if (payload.notes.length > 500) {
    return "Catatan maksimal 500 karakter.";
  }
  return "";
}
function isStockInTypeName(name) {
  const normalized = normalizeStockTypeName(name);
  return normalized === "STOCK_IN" || normalized === "IN_PURCHASE" || normalized.includes("IN") && !normalized.includes("OUT");
}
function isManualStockOutTypeName(name) {
  const normalized = normalizeStockTypeName(name);
  if (normalized === "STOCK_OUT" || normalized === "OUT_DAMAGED" || normalized === "OUT_EXPIRED") {
    return true;
  }
  return normalized.startsWith("OUT_") && !normalized.includes("SALES") && !normalized.includes("SALE");
}
function formatAdminInventoryCurrency(value) {
  return formatCurrency(value);
}
function formatAdminInventoryDateTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateFormatter.format(date);
}
function formatStockTypeLabel(name) {
  const normalized = normalizeStockTypeName(name);
  if (normalized === "STOCK_IN" || normalized === "IN_PURCHASE") {
    return "Stok Masuk";
  }
  if (normalized === "STOCK_OUT") {
    return "Stok Keluar";
  }
  if (normalized === "OUT_DAMAGED") {
    return "Rusak";
  }
  if (normalized === "OUT_EXPIRED") {
    return "Kedaluwarsa";
  }
  if (normalized === "OUT_SALES" || normalized === "SALES") {
    return "Penjualan";
  }
  if (normalized === "IN_PRODUCTION") {
    return "Hasil Produksi";
  }
  if (normalized === "OUT_PRODUCTION") {
    return "Pemakaian Produksi";
  }
  if (normalized.includes("OPNAME")) {
    return "Opname";
  }
  if (!normalized) {
    return "-";
  }
  return normalized.split("_").filter(Boolean).map((segment) => `${segment.charAt(0)}${segment.slice(1).toLowerCase()}`).join(" ");
}
function getStockOutReasonLabel(reason) {
  if (reason === "DAMAGED") {
    return "Rusak";
  }
  if (reason === "EXPIRED") {
    return "Kedaluwarsa";
  }
  return "Lainnya";
}
function getInventoryMovementKind(stockTypeName, qty) {
  const normalized = normalizeStockTypeName(stockTypeName);
  if (normalized.includes("SALES") || normalized === "SALES") {
    return "sale";
  }
  if (normalized.includes("OPNAME")) {
    return "opname";
  }
  if (isManualStockOutTypeName(normalized) || qty < 0) {
    return "out";
  }
  if (isStockInTypeName(normalized) || qty > 0) {
    return "in";
  }
  return "adjustment";
}
function getInventoryMovementTypePresentation(stockTypeName, movementKind) {
  if (movementKind === "in") {
    return {
      label: formatStockTypeLabel(stockTypeName) || "Stok Masuk",
      tone: "success"
    };
  }
  if (movementKind === "out") {
    return {
      label: formatStockTypeLabel(stockTypeName) || "Stok Keluar",
      tone: "warning"
    };
  }
  if (movementKind === "sale") {
    return {
      label: "Penjualan",
      tone: "info"
    };
  }
  if (movementKind === "opname") {
    return {
      label: "Opname",
      tone: "default"
    };
  }
  return {
    label: formatStockTypeLabel(stockTypeName) || "Penyesuaian",
    tone: "default"
  };
}
function getStockOutReason(stockTypeName, notes) {
  const normalizedType = normalizeStockTypeName(stockTypeName);
  const normalizedNotes = normalizeStockTypeName(notes ?? "");
  if (normalizedType.includes("EXPIRED") || normalizedNotes.includes("KEDALUWARSA")) {
    return "EXPIRED";
  }
  if (normalizedType.includes("DAMAGED") || normalizedNotes.includes("RUSAK")) {
    return "DAMAGED";
  }
  return "OTHER";
}
function isStockOutReason(value) {
  return value === "DAMAGED" || value === "EXPIRED" || value === "OTHER";
}
function normalizeStockTypeName(value) {
  return value.trim().toUpperCase().replace(/[\s-]+/g, "_");
}
function toNumber(value) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}
function formatCurrency(value) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0).replace(/\s/g, "");
}
function formatNumber(value) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}
function useAdminInventoryApi() {
  const api = useApiClient();
  async function getInventoryMovements(query = {}) {
    const payload = await api.get(apiEndpoints.inventory.list, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getInventoryMovementDetail(stockMovementId) {
    const payload = await api.get(apiEndpoints.inventory.detail(stockMovementId));
    return extractApiPayload(payload);
  }
  async function getIngredientInventoryHistory(ingredientId, query = {}) {
    const payload = await api.get(apiEndpoints.inventory.ingredientHistory(ingredientId), {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function createStockIn(payload) {
    const result = await api.post(
      apiEndpoints.inventory.stockIn,
      payload
    );
    return extractApiPayload(result);
  }
  async function createStockOut(payload) {
    const result = await api.post(
      apiEndpoints.inventory.stockOut,
      payload
    );
    return extractApiPayload(result);
  }
  async function getStockTypes() {
    const payload = await api.get(apiEndpoints.stockType.list);
    return extractApiPayload(payload);
  }
  async function getIngredientOptions() {
    const payload = await api.get(apiEndpoints.ingredient.options);
    return extractApiPayload(payload);
  }
  return {
    getInventoryMovements,
    getInventoryMovementDetail,
    getIngredientInventoryHistory,
    createStockIn,
    createStockOut,
    getStockTypes,
    getIngredientOptions
  };
}
function normalizeQuery(query) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== void 0 && value !== null && value !== "")
  );
}
function extractApiPayload(payload) {
  if (isRecord(payload)) {
    if ("data" in payload && isDirectResponseShape(payload)) {
      return payload.data;
    }
    if ("response" in payload && isDirectResponseShape(payload)) {
      return payload.response;
    }
    if ("response" in payload && isStandardEnvelopeShape(payload)) {
      return payload.response;
    }
  }
  return payload;
}
function isDirectResponseShape(value) {
  return typeof value.code === "number" && typeof value.message === "string";
}
function isStandardEnvelopeShape(value) {
  return isRecord(value.metaData);
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}

export { isManualStockOutTypeName as a, createAdminInventoryStockOutPayload as b, createAdminInventoryStockInPayload as c, getAdminInventoryStockOutValidationMessage as d, formatAdminInventoryCurrency as f, getAdminInventoryStockInValidationMessage as g, hydrateAdminInventoryMovementStockType as h, isStockInTypeName as i, mapAdminInventoryMovementRecordToViewItem as m, useAdminInventoryApi as u };
//# sourceMappingURL=useAdminInventoryApi-vibdbRLd.mjs.map
