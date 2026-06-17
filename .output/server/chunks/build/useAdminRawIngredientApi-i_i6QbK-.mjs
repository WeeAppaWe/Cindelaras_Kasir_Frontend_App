import { u as useApiClient, a as apiEndpoints } from './api-endpoints-aT5YyZ8V.mjs';

function useAdminRawIngredientApi() {
  const api = useApiClient();
  async function getRawIngredients(query = {}) {
    const payload = await api.get(apiEndpoints.ingredient.raw.list, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getLowStockRawIngredients() {
    const payload = await api.get(apiEndpoints.ingredient.raw.lowStock);
    return extractApiPayload(payload);
  }
  async function getRawIngredientDetail(ingredientId) {
    const payload = await api.get(apiEndpoints.ingredient.raw.detail(ingredientId));
    return extractApiPayload(payload);
  }
  async function createRawIngredient(payload) {
    const result = await api.post(
      apiEndpoints.ingredient.raw.create,
      payload
    );
    return extractApiPayload(result);
  }
  async function updateRawIngredient(ingredientId, payload) {
    const result = await api.patch(
      apiEndpoints.ingredient.raw.update(ingredientId),
      payload
    );
    return extractApiPayload(result);
  }
  async function deleteRawIngredient(ingredientId) {
    const payload = await api.delete(apiEndpoints.ingredient.raw.remove(ingredientId));
    return extractApiPayload(payload);
  }
  async function getRawIngredientUnitOptions() {
    const payload = await api.get(apiEndpoints.unitMeasure.options);
    return extractApiPayload(payload);
  }
  return {
    getRawIngredients,
    getLowStockRawIngredients,
    getRawIngredientDetail,
    createRawIngredient,
    updateRawIngredient,
    deleteRawIngredient,
    getRawIngredientUnitOptions
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
  }
  return payload;
}
function isDirectResponseShape(value) {
  return typeof value.code === "number" && typeof value.message === "string";
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}

export { useAdminRawIngredientApi as u };
//# sourceMappingURL=useAdminRawIngredientApi-i_i6QbK-.mjs.map
