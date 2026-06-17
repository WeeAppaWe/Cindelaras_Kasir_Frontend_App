interface PublicStoreProfile {
  storeName: string
  logoUrl: string
  storeAddress: string
}

interface PublicStoreProfilePayload {
  store_name?: string | null
  store_logo?: string | null
  store_address?: string | null
  storeName?: string | null
  logoUrl?: string | null
  storeAddress?: string | null
}

const initialPublicStoreProfile: PublicStoreProfile = {
  storeName: '',
  logoUrl: '',
  storeAddress: '',
}

export function usePublicStoreProfile() {
  const api = useApiClient()
  const publicStoreProfile = useState<PublicStoreProfile>('public:store-profile', () => ({ ...initialPublicStoreProfile }))
  const isPublicStoreProfileLoading = useState('public:store-profile:is-loading', () => false)
  const hasLoadedPublicStoreProfile = useState('public:store-profile:has-loaded', () => false)
  const publicStoreProfileError = useState('public:store-profile:error-message', () => '')

  async function loadPublicStoreProfile(options: { force?: boolean } = {}) {
    if (isPublicStoreProfileLoading.value || (hasLoadedPublicStoreProfile.value && !options.force)) {
      return publicStoreProfile.value
    }

    isPublicStoreProfileLoading.value = true
    publicStoreProfileError.value = ''

    try {
      const payload = await api.get<unknown>(apiEndpoints.storeSetting.publicInfo, { auth: false })
      const profilePayload = extractApiPayload<PublicStoreProfilePayload>(payload)

      setPublicStoreProfile(profilePayload)
      hasLoadedPublicStoreProfile.value = true

      return publicStoreProfile.value
    }
    catch (error) {
      publicStoreProfileError.value = getErrorMessage(error, 'Gagal memuat profil toko.')
      return null
    }
    finally {
      isPublicStoreProfileLoading.value = false
    }
  }

  function setPublicStoreProfile(payload: PublicStoreProfilePayload) {
    publicStoreProfile.value = {
      storeName: getStringValue(payload.storeName ?? payload.store_name),
      logoUrl: getStringValue(payload.logoUrl ?? payload.store_logo),
      storeAddress: getStringValue(payload.storeAddress ?? payload.store_address),
    }
    hasLoadedPublicStoreProfile.value = true
  }

  return {
    publicStoreProfile,
    isPublicStoreProfileLoading,
    hasLoadedPublicStoreProfile,
    publicStoreProfileError,
    loadPublicStoreProfile,
    setPublicStoreProfile,
  }
}

function getStringValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
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
