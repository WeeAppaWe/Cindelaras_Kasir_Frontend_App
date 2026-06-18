import { u as useApiClient, a as apiEndpoints } from './api-endpoints-BXkjOpII.mjs';

function useAdminSupplierApi() {
  const api = useApiClient();
  async function getSuppliers(query = {}) {
    const payload = await api.get(apiEndpoints.supplier.list, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getSupplierDetail(supplierId) {
    const payload = await api.get(apiEndpoints.supplier.detail(supplierId));
    return extractApiPayload(payload);
  }
  async function createSupplier(payload) {
    const result = await api.post(apiEndpoints.supplier.create, payload);
    return extractApiPayload(result);
  }
  async function updateSupplier(supplierId, payload) {
    const result = await api.patch(
      apiEndpoints.supplier.update(supplierId),
      payload
    );
    return extractApiPayload(result);
  }
  async function deleteSupplier(supplierId) {
    const payload = await api.delete(apiEndpoints.supplier.remove(supplierId));
    return extractApiPayload(payload);
  }
  return {
    getSuppliers,
    getSupplierDetail,
    createSupplier,
    updateSupplier,
    deleteSupplier
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

export { useAdminSupplierApi as u };
//# sourceMappingURL=useAdminSupplierApi-CX9ChO1Y.mjs.map
