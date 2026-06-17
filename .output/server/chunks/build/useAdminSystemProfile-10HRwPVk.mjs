import { u as useApiClient, a as apiEndpoints } from './api-endpoints-aT5YyZ8V.mjs';
import { u as usePublicStoreProfile } from './usePublicStoreProfile-BNIGua-8.mjs';
import { u as useState } from './state-Dw1r7BQr.mjs';

const ADMIN_SYSTEM_PROFILE_SETTING_KEYS = {
  logoUrl: "store_logo",
  storeName: "store_name",
  storeAddress: "store_address",
  storePhone: "store_phone",
  receiptHeader: "receipt_header",
  receiptFooter: "receipt_footer",
  systemDisplayName: "system_display_name"
};
const initialSystemProfile = {
  logoUrl: "",
  storeName: "",
  storeAddress: "",
  storePhone: "",
  receiptHeader: "",
  receiptFooter: "",
  systemDisplayName: "Sistem Kasir",
  updatedAt: "-"
};
function useAdminSystemProfile() {
  const api = useApiClient();
  const { setPublicStoreProfile } = usePublicStoreProfile();
  const systemProfile = useState("admin:system-profile", () => ({ ...initialSystemProfile }));
  const isLoading = useState("admin:system-profile:is-loading", () => false);
  const isSaving = useState("admin:system-profile:is-saving", () => false);
  const hasLoaded = useState("admin:system-profile:has-loaded", () => false);
  const errorMessage = useState("admin:system-profile:error-message", () => "");
  const successMessage = useState("admin:system-profile:success-message", () => "");
  const lastSubmittedSettings = useState(
    "admin:system-profile:last-submitted-settings",
    () => null
  );
  async function loadSystemProfile(options = {}) {
    if (isLoading.value || hasLoaded.value && !options.force) {
      return systemProfile.value;
    }
    errorMessage.value = "";
    successMessage.value = "";
    isLoading.value = true;
    try {
      const payload = await api.get(apiEndpoints.storeSetting.map);
      const rawSettings = extractApiPayload(payload);
      const settings = isRecord(rawSettings) ? rawSettings : {};
      systemProfile.value = mapSettingsToSystemProfile(settings);
      setPublicStoreProfile(toPublicStoreProfilePayload(systemProfile.value));
      hasLoaded.value = true;
      return systemProfile.value;
    } catch (error) {
      errorMessage.value = getErrorMessage(error, "Gagal memuat profil sistem.");
      return null;
    } finally {
      isLoading.value = false;
    }
  }
  async function saveSystemProfile(payload) {
    errorMessage.value = "";
    successMessage.value = "";
    isSaving.value = true;
    try {
      const normalizedProfile = normalizeSystemProfilePayload(payload);
      const logoUrl = await resolveLogoUrl(normalizedProfile);
      const nextProfile = {
        ...normalizedProfile,
        logoUrl,
        logoFile: null
      };
      const settingsPayload = createAdminSystemSettingsPayload(nextProfile);
      const result = await api.patch(
        apiEndpoints.storeSetting.batchUpdate,
        settingsPayload
      );
      const response = extractApiPayload(result);
      systemProfile.value = {
        ...toProfileState(nextProfile),
        updatedAt: formatSavedAt(/* @__PURE__ */ new Date())
      };
      setPublicStoreProfile(toPublicStoreProfilePayload(systemProfile.value));
      lastSubmittedSettings.value = settingsPayload;
      hasLoaded.value = true;
      successMessage.value = response.message || "Profil sistem berhasil disimpan.";
      return settingsPayload;
    } catch (error) {
      errorMessage.value = getErrorMessage(error, "Gagal menyimpan profil sistem.");
      return null;
    } finally {
      isSaving.value = false;
    }
  }
  async function resolveLogoUrl(payload) {
    if (!payload.logoFile) {
      return payload.logoUrl;
    }
    const body = new FormData();
    body.append("image", payload.logoFile);
    const result = await api.post(apiEndpoints.upload.image("logo"), body);
    const upload = extractApiPayload(result);
    if (!upload.url) {
      throw new Error("URL logo tidak tersedia dari response upload.");
    }
    return upload.url;
  }
  return {
    systemProfile,
    isLoading,
    isSaving,
    errorMessage,
    successMessage,
    lastSubmittedSettings,
    loadSystemProfile,
    saveSystemProfile
  };
}
function createAdminSystemSettingsPayload(payload) {
  const normalizedProfile = normalizeSystemProfilePayload(payload);
  const keys = ADMIN_SYSTEM_PROFILE_SETTING_KEYS;
  return {
    settings: [
      { setting_key: keys.logoUrl, setting_value: normalizedProfile.logoUrl },
      { setting_key: keys.storeName, setting_value: normalizedProfile.storeName },
      { setting_key: keys.storeAddress, setting_value: normalizedProfile.storeAddress },
      { setting_key: keys.storePhone, setting_value: normalizedProfile.storePhone },
      { setting_key: keys.receiptHeader, setting_value: normalizedProfile.receiptHeader },
      { setting_key: keys.receiptFooter, setting_value: normalizedProfile.receiptFooter },
      { setting_key: keys.systemDisplayName, setting_value: normalizedProfile.systemDisplayName }
    ]
  };
}
function mapSettingsToSystemProfile(settings) {
  const keys = ADMIN_SYSTEM_PROFILE_SETTING_KEYS;
  return {
    logoUrl: getSettingValue(settings, keys.logoUrl),
    storeName: getSettingValue(settings, keys.storeName),
    storeAddress: getSettingValue(settings, keys.storeAddress),
    storePhone: getSettingValue(settings, keys.storePhone),
    receiptHeader: getSettingValue(settings, keys.receiptHeader),
    receiptFooter: getSettingValue(settings, keys.receiptFooter),
    systemDisplayName: getSettingValue(settings, keys.systemDisplayName) || initialSystemProfile.systemDisplayName,
    updatedAt: "Dimuat dari backend"
  };
}
function normalizeSystemProfilePayload(payload) {
  return {
    logoUrl: payload.logoUrl.trim(),
    logoFile: payload.logoFile ?? null,
    storeName: payload.storeName.trim(),
    storeAddress: payload.storeAddress.trim(),
    storePhone: payload.storePhone.trim(),
    receiptHeader: payload.receiptHeader.trim(),
    receiptFooter: payload.receiptFooter.trim(),
    systemDisplayName: payload.systemDisplayName.trim()
  };
}
function toProfileState(payload) {
  return {
    logoUrl: payload.logoUrl,
    storeName: payload.storeName,
    storeAddress: payload.storeAddress,
    storePhone: payload.storePhone,
    receiptHeader: payload.receiptHeader,
    receiptFooter: payload.receiptFooter,
    systemDisplayName: payload.systemDisplayName,
    updatedAt: "-"
  };
}
function toPublicStoreProfilePayload(profile) {
  return {
    storeName: profile.storeName || profile.systemDisplayName,
    logoUrl: profile.logoUrl,
    storeAddress: profile.storeAddress
  };
}
function getSettingValue(settings, key) {
  const value = settings[key];
  return typeof value === "string" ? value : "";
}
function formatSavedAt(date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
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

export { useAdminSystemProfile as u };
//# sourceMappingURL=useAdminSystemProfile-10HRwPVk.mjs.map
