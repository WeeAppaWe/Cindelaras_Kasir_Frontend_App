import { u as useApiClient, a as apiEndpoints } from './api-endpoints-BXkjOpII.mjs';

function useAdminReportApi() {
  const api = useApiClient();
  async function getFinancialReport(query) {
    return await api.get(apiEndpoints.report.financial.full, {
      query: normalizeQuery(query)
    });
  }
  async function getInventoryReport(query) {
    return await api.get(apiEndpoints.report.inventory.full, {
      query: normalizeQuery(query)
    });
  }
  async function getOperationalReport(query) {
    return await api.get(apiEndpoints.report.operational.full, {
      query: normalizeQuery(query)
    });
  }
  return {
    getFinancialReport,
    getInventoryReport,
    getOperationalReport
  };
}
function normalizeQuery(query) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== void 0 && value !== null && value !== "")
  );
}

export { useAdminReportApi as u };
//# sourceMappingURL=useAdminReportApi-T8WpX7qB.mjs.map
