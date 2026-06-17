export const ADMIN_SYSTEM_PROFILE_SETTING_KEYS = {
  logoUrl: 'store_logo',
  storeName: 'store_name',
  storeAddress: 'store_address',
  storePhone: 'store_phone',
  receiptHeader: 'receipt_header',
  receiptFooter: 'receipt_footer',
  systemDisplayName: 'system_display_name',
} as const

export type AdminSystemProfileSettingKey =
  typeof ADMIN_SYSTEM_PROFILE_SETTING_KEYS[keyof typeof ADMIN_SYSTEM_PROFILE_SETTING_KEYS]

export interface AdminSystemProfile {
  logoUrl: string
  storeName: string
  storeAddress: string
  storePhone: string
  receiptHeader: string
  receiptFooter: string
  systemDisplayName: string
  updatedAt: string
}

export interface AdminSystemProfileFormPayload {
  logoUrl: string
  logoFile?: File | null
  storeName: string
  storeAddress: string
  storePhone: string
  receiptHeader: string
  receiptFooter: string
  systemDisplayName: string
}

export interface AdminSystemSettingEntry {
  setting_key: AdminSystemProfileSettingKey
  setting_value: string
}

export interface AdminSystemSettingsPayload {
  settings: AdminSystemSettingEntry[]
}

export type AdminSystemSettingsMap = Partial<Record<AdminSystemProfileSettingKey, string>>
  & Record<string, string | undefined>

export interface AdminSystemBatchUpdateResponse {
  success: boolean
  message?: string
  updated_count?: number
}

export interface AdminSystemUploadImageResponse {
  filename: string
  folder: string
  path: string
  originalname: string
  mimetype: string
  size: number
  url: string
}
