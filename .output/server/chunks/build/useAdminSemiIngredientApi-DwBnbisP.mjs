import { u as useApiClient, a as apiEndpoints } from './api-endpoints-aT5YyZ8V.mjs';

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
function mapAdminSemiIngredientRecordToViewItem(record) {
  const detailRecord = record;
  const stockQty = toNumber(record.stock_qty);
  const minStock = toNumber(record.min_stock);
  const avgCost = toNumber(record.avg_cost);
  const unitName = record.unit?.name?.trim() || "-";
  const compositionRecords = Array.isArray(detailRecord.child_compositions) ? detailRecord.child_compositions : Array.isArray(detailRecord.compositions) ? detailRecord.compositions : [];
  const compositions = compositionRecords.map(mapAdminSemiIngredientCompositionRecordToViewItem);
  const totalHpp = toNumber(
    detailRecord.total_hpp ?? compositions.reduce((total, item) => total + item.subtotal, 0)
  );
  const inventoryValue = Math.round(stockQty * avgCost);
  const status = getStockStatus(stockQty, minStock);
  return {
    id: record.ingredient_id,
    name: record.name,
    type: record.type,
    unitId: record.unit?.unit_measure_id ?? "",
    unitName,
    stockQty,
    minStock,
    avgCost,
    totalHpp,
    stockLabel: `${formatNumber(stockQty)} ${unitName}`,
    minStockLabel: `${formatNumber(minStock)} ${unitName}`,
    avgCostLabel: formatCurrency(avgCost),
    totalHppLabel: formatCurrency(totalHpp),
    inventoryValue,
    inventoryValueLabel: formatCurrency(inventoryValue),
    compositionCount: compositions.length,
    compositionSummary: createCompositionSummary(compositions),
    statusLabel: status.label,
    statusTone: status.tone,
    statusKey: status.key,
    createdAt: formatAdminSemiIngredientDateTime(record.created_at),
    updatedAt: formatAdminSemiIngredientDateTime(record.updated_at),
    hasBeenUpdated: Boolean(record.updated_at),
    compositions
  };
}
function mapAdminSemiIngredientCompositionRecordToViewItem(record) {
  const qtyNeeded = toNumber(record.qty_needed);
  const avgCost = toNumber(record.child_ingredient?.avg_cost ?? 0);
  const subtotal = Math.round(qtyNeeded * avgCost);
  const unitName = record.child_ingredient?.unit?.name?.trim() || "-";
  return {
    id: record.ingredient_composition_id,
    childId: record.child_id,
    ingredientName: record.child_ingredient?.name || record.child_id,
    qtyNeeded,
    unitName,
    avgCost,
    subtotal,
    qtyLabel: `${formatNumber(qtyNeeded)} ${unitName}`,
    avgCostLabel: formatCurrency(avgCost),
    subtotalLabel: formatCurrency(subtotal)
  };
}
function createAdminSemiIngredientProfilePayload(payload) {
  return {
    name: payload.name.trim(),
    unit_id: payload.unitId,
    min_stock: payload.minStock
  };
}
function createAdminSemiIngredientBulkCompositionPayload(payload) {
  return {
    compositions: payload.compositions.map((item) => ({
      child_id: item.child_id,
      qty_needed: item.qty_needed
    }))
  };
}
function getAdminSemiIngredientValidationMessage(payload) {
  const name = payload.name.trim();
  if (!name) {
    return "Nama bahan setengah jadi wajib diisi.";
  }
  if (name.length < 2) {
    return "Nama bahan setengah jadi minimal 2 karakter.";
  }
  if (name.length > 100) {
    return "Nama bahan setengah jadi maksimal 100 karakter.";
  }
  if (!payload.unitId) {
    return "Satuan hasil wajib dipilih.";
  }
  if (!Number.isFinite(payload.minStock) || payload.minStock < 0) {
    return "Stok minimum harus 0 atau lebih.";
  }
  if (!payload.compositions.length) {
    return "Tambahkan minimal 1 bahan baku penyusun.";
  }
  const usedChildIds = /* @__PURE__ */ new Set();
  for (const composition of payload.compositions) {
    if (!composition.child_id) {
      return "Setiap baris resep wajib memilih bahan baku.";
    }
    if (usedChildIds.has(composition.child_id)) {
      return "Bahan baku penyusun tidak boleh duplikat.";
    }
    if (!Number.isFinite(composition.qty_needed) || composition.qty_needed <= 0) {
      return "Jumlah bahan penyusun harus lebih dari 0.";
    }
    usedChildIds.add(composition.child_id);
  }
  return "";
}
function formatAdminSemiIngredientApiError(error, fallback = "Gagal menyimpan bahan setengah jadi.") {
  const message = getApiErrorMessage(error) || fallback;
  const entries = getApiErrorEntries(error);
  const detailEntries = entries.map(formatApiErrorEntry).filter((item) => item !== `- ${message}`).filter(Boolean).filter((item, index, items) => items.indexOf(item) === index);
  if (!detailEntries.length) {
    return message;
  }
  return [message, ...detailEntries].join("\n");
}
function formatAdminSemiIngredientCurrency(value) {
  return formatCurrency(value);
}
function formatAdminSemiIngredientDateTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateFormatter.format(date);
}
function createCompositionSummary(compositions) {
  if (!compositions.length) {
    return "Buka detail untuk melihat atau lengkapi komposisi.";
  }
  const names = compositions.slice(0, 3).map((item) => `${item.ingredientName} ${item.qtyLabel}`);
  const remainingCount = compositions.length - names.length;
  return remainingCount > 0 ? `${names.join(", ")} +${remainingCount} bahan` : names.join(", ");
}
function getStockStatus(stockQty, minStock) {
  if (stockQty <= 0 && minStock > 0) {
    return {
      key: "critical",
      label: "Kritis",
      tone: "destructive"
    };
  }
  if (stockQty <= minStock) {
    return {
      key: "low",
      label: "Menipis",
      tone: "warning"
    };
  }
  return {
    key: "safe",
    label: "Aman",
    tone: "success"
  };
}
function getApiErrorMessage(error) {
  const candidates = [
    error,
    isRecord$1(error) ? error.data : null,
    isRecord$1(error) ? error.raw : null,
    isRecord$1(error) && isRecord$1(error.raw) ? error.raw.data : null
  ];
  for (const candidate of candidates) {
    if (isRecord$1(candidate) && typeof candidate.message === "string" && candidate.message.trim()) {
      return candidate.message.trim();
    }
  }
  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }
  return "";
}
function getApiErrorEntries(error) {
  const candidates = [
    isRecord$1(error) ? error.errors : null,
    isRecord$1(error) ? error.data : null,
    isRecord$1(error) ? error.raw : null,
    isRecord$1(error) && isRecord$1(error.raw) ? error.raw.data : null
  ];
  const entries = [];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      entries.push(...candidate);
      continue;
    }
    if (isRecord$1(candidate)) {
      if (Array.isArray(candidate.errors)) {
        entries.push(...candidate.errors);
      }
      if (Array.isArray(candidate.error)) {
        entries.push(...candidate.error);
      }
    }
  }
  return entries;
}
function formatApiErrorEntry(entry) {
  if (!isRecord$1(entry)) {
    return "";
  }
  const field = typeof entry.field === "string" ? entry.field.trim() : "";
  const message = typeof entry.message === "string" ? entry.message.trim() : "";
  if (!message) {
    return "";
  }
  if (!field || field === "qty") {
    return `- ${message}`;
  }
  return `- ${field}: ${message}`;
}
function isRecord$1(value) {
  return typeof value === "object" && value !== null;
}
function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
function formatCurrency(value) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0).replace(/\s/g, "");
}
function formatNumber(value) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}
function useAdminSemiIngredientApi() {
  const api = useApiClient();
  async function getSemiIngredients(query = {}) {
    return await api.get(apiEndpoints.ingredient.semi.list, {
      query: normalizeQuery(query)
    });
  }
  async function getSemiIngredientDetail(ingredientId) {
    const payload = await api.get(apiEndpoints.ingredient.semi.detail(ingredientId));
    return normalizeSemiIngredientDetailPayload(payload);
  }
  async function createSemiIngredient(payload) {
    return await api.post(
      apiEndpoints.ingredient.semi.create,
      payload
    );
  }
  async function createAndProduceSemiIngredient(payload) {
    return await api.post(
      apiEndpoints.ingredient.semi.createAndProduce,
      payload
    );
  }
  async function updateSemiIngredient(ingredientId, payload) {
    return await api.patch(
      apiEndpoints.ingredient.semi.update(ingredientId),
      payload
    );
  }
  async function deleteSemiIngredient(ingredientId) {
    return await api.delete(apiEndpoints.ingredient.semi.remove(ingredientId));
  }
  async function getSemiIngredientUnitOptions() {
    return await api.get(apiEndpoints.unitMeasure.options);
  }
  async function getAvailableRawIngredientsForComposition(excludeIngredientId) {
    const query = excludeIngredientId ? { exclude_id: excludeIngredientId } : {};
    return await api.get(
      apiEndpoints.ingredient.semi.composition.availableIngredients,
      { query }
    );
  }
  async function previewSemiIngredientHpp(payload) {
    return await api.post(
      apiEndpoints.ingredient.semi.composition.previewHpp,
      payload
    );
  }
  async function createSemiIngredientComposition(ingredientId, payload) {
    return await api.post(
      apiEndpoints.ingredient.semi.composition.create(ingredientId),
      payload
    );
  }
  async function bulkReplaceSemiIngredientCompositions(ingredientId, payload) {
    return await api.post(
      apiEndpoints.ingredient.semi.composition.bulkReplace(ingredientId),
      payload
    );
  }
  async function updateSemiIngredientComposition(ingredientId, compositionId, payload) {
    return await api.patch(
      apiEndpoints.ingredient.semi.composition.update(ingredientId, compositionId),
      payload
    );
  }
  async function deleteSemiIngredientComposition(ingredientId, compositionId) {
    return await api.delete(
      apiEndpoints.ingredient.semi.composition.remove(ingredientId, compositionId)
    );
  }
  async function getSemiIngredientHpp(ingredientId) {
    return await api.get(apiEndpoints.ingredient.semi.hpp(ingredientId));
  }
  async function recalculateSemiIngredientHpp(ingredientId) {
    return await api.post(
      apiEndpoints.ingredient.semi.recalculateHpp(ingredientId),
      void 0
    );
  }
  async function produceSemiIngredient(ingredientId, payload) {
    return await api.post(
      apiEndpoints.ingredient.semi.produce(ingredientId),
      payload
    );
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
    produceSemiIngredient
  };
}
function normalizeQuery(query) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== void 0 && value !== null && value !== "")
  );
}
function normalizeSemiIngredientDetailPayload(payload) {
  if (!isRecord(payload)) {
    return payload;
  }
  if (isRecord(payload.response)) {
    return normalizeSemiIngredientDetailPayload(payload.response);
  }
  if (isRecord(payload.data)) {
    return normalizeSemiIngredientDetailPayload(payload.data);
  }
  return payload;
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}

export { createAdminSemiIngredientBulkCompositionPayload as a, formatAdminSemiIngredientCurrency as b, createAdminSemiIngredientProfilePayload as c, formatAdminSemiIngredientApiError as f, getAdminSemiIngredientValidationMessage as g, mapAdminSemiIngredientRecordToViewItem as m, useAdminSemiIngredientApi as u };
//# sourceMappingURL=useAdminSemiIngredientApi-DwBnbisP.mjs.map
