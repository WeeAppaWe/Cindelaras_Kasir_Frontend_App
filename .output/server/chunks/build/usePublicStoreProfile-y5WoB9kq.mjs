import { u as useApiClient, a as apiEndpoints } from './api-endpoints-BXkjOpII.mjs';
import { u as useState } from './state-Dw1r7BQr.mjs';

const initialPublicStoreProfile = {
  storeName: "",
  logoUrl: "",
  storeAddress: ""
};
function usePublicStoreProfile() {
  const api = useApiClient();
  const publicStoreProfile = useState("public:store-profile", () => ({ ...initialPublicStoreProfile }));
  const isPublicStoreProfileLoading = useState("public:store-profile:is-loading", () => false);
  const hasLoadedPublicStoreProfile = useState("public:store-profile:has-loaded", () => false);
  const publicStoreProfileError = useState("public:store-profile:error-message", () => "");
  async function loadPublicStoreProfile(options = {}) {
    if (isPublicStoreProfileLoading.value || hasLoadedPublicStoreProfile.value && !options.force) {
      return publicStoreProfile.value;
    }
    isPublicStoreProfileLoading.value = true;
    publicStoreProfileError.value = "";
    try {
      const payload = await api.get(apiEndpoints.storeSetting.publicInfo, { auth: false });
      const profilePayload = extractApiPayload(payload);
      setPublicStoreProfile(profilePayload);
      hasLoadedPublicStoreProfile.value = true;
      return publicStoreProfile.value;
    } catch (error) {
      publicStoreProfileError.value = getErrorMessage(error, "Gagal memuat profil toko.");
      return null;
    } finally {
      isPublicStoreProfileLoading.value = false;
    }
  }
  function setPublicStoreProfile(payload) {
    publicStoreProfile.value = {
      storeName: getStringValue(payload.storeName ?? payload.store_name),
      logoUrl: getStringValue(payload.logoUrl ?? payload.store_logo),
      storeAddress: getStringValue(payload.storeAddress ?? payload.store_address)
    };
    hasLoadedPublicStoreProfile.value = true;
  }
  return {
    publicStoreProfile,
    isPublicStoreProfileLoading,
    hasLoadedPublicStoreProfile,
    publicStoreProfileError,
    loadPublicStoreProfile,
    setPublicStoreProfile
  };
}
function getStringValue(value) {
  return typeof value === "string" ? value.trim() : "";
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
function getErrorMessage(error, fallback) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

export { usePublicStoreProfile as u };
//# sourceMappingURL=usePublicStoreProfile-y5WoB9kq.mjs.map
