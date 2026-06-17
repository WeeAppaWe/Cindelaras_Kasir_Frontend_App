import type {
  AdminSystemBatchUpdateResponse,
  AdminSystemProfile,
  AdminSystemProfileFormPayload,
  AdminSystemSettingsMap,
  AdminSystemSettingsPayload,
  AdminSystemUploadImageResponse,
} from '../types/admin-system'
import { ADMIN_SYSTEM_PROFILE_SETTING_KEYS } from '../types/admin-system'

const initialSystemProfile: AdminSystemProfile = {
  logoUrl: '',
  storeName: '',
  storeAddress: '',
  storePhone: '',
  receiptHeader: '',
  receiptFooter: '',
  systemDisplayName: 'Sistem Kasir',
  updatedAt: '-',
}

export function useAdminSystemProfile() {
  const api = useApiClient()
  const { setPublicStoreProfile } = usePublicStoreProfile()
  const systemProfile = useState<AdminSystemProfile>('admin:system-profile', () => ({ ...initialSystemProfile }))
  const isLoading = useState('admin:system-profile:is-loading', () => false)
  const isSaving = useState('admin:system-profile:is-saving', () => false)
  const hasLoaded = useState('admin:system-profile:has-loaded', () => false)
  const errorMessage = useState('admin:system-profile:error-message', () => '')
  const successMessage = useState('admin:system-profile:success-message', () => '')
  const lastSubmittedSettings = useState<AdminSystemSettingsPayload | null>(
    'admin:system-profile:last-submitted-settings',
    () => null,
  )

  async function loadSystemProfile(options: { force?: boolean } = {}) {
    if (isLoading.value || (hasLoaded.value && !options.force)) {
      return systemProfile.value
    }

    errorMessage.value = ''
    successMessage.value = ''
    isLoading.value = true

    try {
      const payload = await api.get<unknown>(apiEndpoints.storeSetting.map)
      const rawSettings = extractApiPayload<unknown>(payload)
      const settings: AdminSystemSettingsMap = isRecord(rawSettings) ? rawSettings as AdminSystemSettingsMap : {}

      systemProfile.value = mapSettingsToSystemProfile(settings)
      setPublicStoreProfile(toPublicStoreProfilePayload(systemProfile.value))
      hasLoaded.value = true

      return systemProfile.value
    }
    catch (error) {
      errorMessage.value = getErrorMessage(error, 'Gagal memuat profil sistem.')
      return null
    }
    finally {
      isLoading.value = false
    }
  }

  async function saveSystemProfile(payload: AdminSystemProfileFormPayload) {
    errorMessage.value = ''
    successMessage.value = ''
    isSaving.value = true

    try {
      const normalizedProfile = normalizeSystemProfilePayload(payload)
      const logoUrl = await resolveLogoUrl(normalizedProfile)
      const nextProfile = {
        ...normalizedProfile,
        logoUrl,
        logoFile: null,
      }
      const settingsPayload = createAdminSystemSettingsPayload(nextProfile)
      const result = await api.patch<unknown, AdminSystemSettingsPayload>(
        apiEndpoints.storeSetting.batchUpdate,
        settingsPayload,
      )
      const response = extractApiPayload<AdminSystemBatchUpdateResponse>(result)

      systemProfile.value = {
        ...toProfileState(nextProfile),
        updatedAt: formatSavedAt(new Date()),
      }
      setPublicStoreProfile(toPublicStoreProfilePayload(systemProfile.value))
      lastSubmittedSettings.value = settingsPayload
      hasLoaded.value = true
      successMessage.value = response.message || 'Profil sistem berhasil disimpan.'

      return settingsPayload
    }
    catch (error) {
      errorMessage.value = getErrorMessage(error, 'Gagal menyimpan profil sistem.')
      return null
    }
    finally {
      isSaving.value = false
    }
  }

  async function resolveLogoUrl(payload: AdminSystemProfileFormPayload) {
    if (!payload.logoFile) {
      return payload.logoUrl
    }

    const body = new FormData()
    body.append('image', payload.logoFile)

    const result = await api.post<unknown, FormData>(apiEndpoints.upload.image('logo'), body)
    const upload = extractApiPayload<AdminSystemUploadImageResponse>(result)

    if (!upload.url) {
      throw new Error('URL logo tidak tersedia dari response upload.')
    }

    return upload.url
  }

  return {
    systemProfile,
    isLoading,
    isSaving,
    errorMessage,
    successMessage,
    lastSubmittedSettings,
    loadSystemProfile,
    saveSystemProfile,
  }
}

export function createAdminSystemSettingsPayload(payload: AdminSystemProfileFormPayload): AdminSystemSettingsPayload {
  const normalizedProfile = normalizeSystemProfilePayload(payload)
  const keys = ADMIN_SYSTEM_PROFILE_SETTING_KEYS

  return {
    settings: [
      { setting_key: keys.logoUrl, setting_value: normalizedProfile.logoUrl },
      { setting_key: keys.storeName, setting_value: normalizedProfile.storeName },
      { setting_key: keys.storeAddress, setting_value: normalizedProfile.storeAddress },
      { setting_key: keys.storePhone, setting_value: normalizedProfile.storePhone },
      { setting_key: keys.receiptHeader, setting_value: normalizedProfile.receiptHeader },
      { setting_key: keys.receiptFooter, setting_value: normalizedProfile.receiptFooter },
      { setting_key: keys.systemDisplayName, setting_value: normalizedProfile.systemDisplayName },
    ],
  }
}

function mapSettingsToSystemProfile(settings: AdminSystemSettingsMap): AdminSystemProfile {
  const keys = ADMIN_SYSTEM_PROFILE_SETTING_KEYS

  return {
    logoUrl: getSettingValue(settings, keys.logoUrl),
    storeName: getSettingValue(settings, keys.storeName),
    storeAddress: getSettingValue(settings, keys.storeAddress),
    storePhone: getSettingValue(settings, keys.storePhone),
    receiptHeader: getSettingValue(settings, keys.receiptHeader),
    receiptFooter: getSettingValue(settings, keys.receiptFooter),
    systemDisplayName: getSettingValue(settings, keys.systemDisplayName) || initialSystemProfile.systemDisplayName,
    updatedAt: 'Dimuat dari backend',
  }
}

function normalizeSystemProfilePayload(payload: AdminSystemProfileFormPayload): AdminSystemProfileFormPayload {
  return {
    logoUrl: payload.logoUrl.trim(),
    logoFile: payload.logoFile ?? null,
    storeName: payload.storeName.trim(),
    storeAddress: payload.storeAddress.trim(),
    storePhone: payload.storePhone.trim(),
    receiptHeader: payload.receiptHeader.trim(),
    receiptFooter: payload.receiptFooter.trim(),
    systemDisplayName: payload.systemDisplayName.trim(),
  }
}

function toProfileState(payload: AdminSystemProfileFormPayload): AdminSystemProfile {
  return {
    logoUrl: payload.logoUrl,
    storeName: payload.storeName,
    storeAddress: payload.storeAddress,
    storePhone: payload.storePhone,
    receiptHeader: payload.receiptHeader,
    receiptFooter: payload.receiptFooter,
    systemDisplayName: payload.systemDisplayName,
    updatedAt: '-',
  }
}

function toPublicStoreProfilePayload(profile: AdminSystemProfile) {
  return {
    storeName: profile.storeName || profile.systemDisplayName,
    logoUrl: profile.logoUrl,
    storeAddress: profile.storeAddress,
  }
}

function getSettingValue(settings: AdminSystemSettingsMap, key: string) {
  const value = settings[key]

  return typeof value === 'string' ? value : ''
}

function formatSavedAt(date: Date) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function extractApiPayload<TPayload>(payload: unknown): TPayload {
  if (isRecord(payload)) {
    if ('data' in payload && isDirectResponseShape(payload)) {
      return payload.data as TPayload
    }

    if ('response' in payload && isDirectResponseShape(payload)) {
      return payload.response as TPayload
    }
  }

  return payload as TPayload
}

function isDirectResponseShape(value: Record<string, unknown>) {
  return typeof value.code === 'number' && typeof value.message === 'string'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
