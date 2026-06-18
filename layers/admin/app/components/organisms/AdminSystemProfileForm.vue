<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import type {
  AdminSystemProfile,
  AdminSystemProfileFormPayload,
} from '../../types/admin-system'
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ImageIcon,
  ReceiptText,
  RefreshCcw,
  Save,
  Store,
  Upload,
  X,
} from 'lucide-vue-next'
import { Alert, AlertDescription } from '#layers/base/app/components/ui/alert'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import { Textarea } from '#layers/base/app/components/ui/textarea'
import {
  ADMIN_IMAGE_UPLOAD_ACCEPT,
  getImageFileValidationMessage,
  isImageDataUrl,
  isValidImageReference,
  readImageFileAsDataUrl,
} from '../../utils/image-upload'

interface FormState {
  logoUrl: string
  storeName: string
  storeAddress: string
  storePhone: string
  receiptHeader: string
  receiptFooter: string
  systemDisplayName: string
}

interface ReceiptPreviewItem {
  name: string
  qty: number
  price: number
  subtotal: number
}

interface ReceiptPreviewSample {
  store_name: string
  store_address: string
  store_phone: string
  store_logo: string
  receipt_header: string
  receipt_footer: string
  order_id: string
  receipt: string | null
  order_date: string
  order_time: string
  cashier_name: string
  customer_name: string | null
  customer_phone: string | null
  items: ReceiptPreviewItem[]
  total: number
  payment_type: string
  paid_amount: number
  change_amount: number
}

interface PreviewPdfPayload {
  store_name: string
  store_address: string
  store_phone: string
  store_logo: string
  receipt_header: string
  receipt_footer: string
}

type FormField = keyof FormState

const props = withDefaults(defineProps<{
  profile: AdminSystemProfile
  submitting?: boolean
  errorMessage?: string
  successMessage?: string
}>(), {
  submitting: false,
  errorMessage: '',
  successMessage: '',
})

const emit = defineEmits<{
  submit: [payload: AdminSystemProfileFormPayload]
}>()

const api = useApiClient()
const form = reactive<FormState>({
  logoUrl: '',
  storeName: '',
  storeAddress: '',
  storePhone: '',
  receiptHeader: '',
  receiptFooter: '',
  systemDisplayName: '',
})

const errors = reactive<Record<FormField, string>>({
  logoUrl: '',
  storeName: '',
  storeAddress: '',
  storePhone: '',
  receiptHeader: '',
  receiptFooter: '',
  systemDisplayName: '',
})

const logoFileInput = ref<HTMLInputElement | null>(null)
const selectedLogoFile = ref<File | null>(null)
const selectedLogoFileName = ref('')
const pdfBlobUrl = ref<string | null>(null)
const isReceiptPreviewLoading = ref(false)
const receiptPreviewError = ref('')

watch(() => props.profile, hydrateForm, { immediate: true })
watch(() => props.successMessage, (message) => {
  if (message) {
    void loadReceiptPreviewPdf({ force: true })
  }
})

onMounted(() => {
  void loadReceiptPreviewPdf()
})

const normalizedFormPayload = computed<AdminSystemProfileFormPayload>(() => createPayloadFromForm())
const savedPayload = computed<AdminSystemProfileFormPayload>(() => createPayloadFromProfile(props.profile))

watchDebounced(normalizedFormPayload, () => {
  void loadReceiptPreviewPdf()
}, { debounce: 1000, maxWait: 5000, deep: true })
const hasChanges = computed(() => !isSamePayload(normalizedFormPayload.value, savedPayload.value))
const logoReferenceInputValue = computed(() => {
  if (isImageDataUrl(form.logoUrl)) {
    return selectedLogoFileName.value || 'Logo dari file lokal'
  }

  return form.logoUrl
})
const canShowLogoPreview = computed(() => {
  const logoUrl = form.logoUrl.trim()

  return Boolean(logoUrl && isValidImageReference(logoUrl))
})
const previewStoreName = computed(() => form.storeName.trim() || 'Nama usaha')
const previewStoreAddress = computed(() => form.storeAddress.trim() || 'Alamat usaha')
const previewStoreContact = computed(() => form.storePhone.trim() || 'Nomor kontak')
const previewSystemDisplayName = computed(() => form.systemDisplayName.trim() || 'Nama aplikasi')
const logoInitials = computed(() => {
  const words = previewStoreName.value.split(/\s+/).filter(Boolean)
  const initials = words.slice(0, 2).map(word => word[0]?.toUpperCase()).join('')

  return initials || 'SK'
})
const canSubmit = computed(() => {
  return Boolean(
    !props.submitting
    && form.storeName.trim()
    && form.systemDisplayName.trim()
  )
})

function hydrateForm(profile: AdminSystemProfile) {
  form.logoUrl = profile.logoUrl
  form.storeName = profile.storeName
  form.storeAddress = profile.storeAddress
  form.storePhone = profile.storePhone
  form.receiptHeader = profile.receiptHeader
  form.receiptFooter = profile.receiptFooter
  form.systemDisplayName = profile.systemDisplayName
  selectedLogoFile.value = null
  selectedLogoFileName.value = ''
  clearErrors()
}

function handleSubmit() {
  if (props.submitting || !validateForm()) {
    return
  }

  emit('submit', normalizedFormPayload.value)
}

function resetForm() {
  hydrateForm(props.profile)
}

async function loadReceiptPreviewPdf(options: { force?: boolean } = {}) {
  if (isReceiptPreviewLoading.value) {
    return
  }

  receiptPreviewError.value = ''
  isReceiptPreviewLoading.value = true

  try {
    const payload: PreviewPdfPayload = {
      store_name: form.storeName.trim() || previewStoreName.value,
      store_address: form.storeAddress.trim() || previewStoreAddress.value,
      store_phone: form.storePhone.trim() || previewStoreContact.value,
      store_logo: form.logoUrl.trim(),
      receipt_header: form.receiptHeader.trim() || 'Terima kasih sudah berbelanja.',
      receipt_footer: form.receiptFooter.trim() || 'Simpan struk ini sebagai bukti pembayaran.',
    }

    const blob = await api.post<Blob>(apiEndpoints.receipt.previewPdf, payload, {
      responseType: 'blob',
      unwrap: false,
    })

    if (pdfBlobUrl.value) {
      URL.revokeObjectURL(pdfBlobUrl.value)
    }

    pdfBlobUrl.value = URL.createObjectURL(blob)
  }
  catch (error) {
    receiptPreviewError.value = getErrorMessage(error, 'Gagal memuat preview struk PDF dari backend.')
  }
  finally {
    isReceiptPreviewLoading.value = false
  }
}

onUnmounted(() => {
  if (pdfBlobUrl.value) {
    URL.revokeObjectURL(pdfBlobUrl.value)
  }
})

function openLogoFilePicker() {
  if (props.submitting) {
    return
  }

  logoFileInput.value?.click()
}

async function handleLogoFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    return
  }

  const validationMessage = getImageFileValidationMessage(file)

  if (validationMessage) {
    errors.logoUrl = validationMessage
    input.value = ''
    return
  }

  try {
    selectedLogoFile.value = file
    form.logoUrl = await readImageFileAsDataUrl(file)
    selectedLogoFileName.value = file.name
    errors.logoUrl = ''
  }
  catch (error) {
    errors.logoUrl = error instanceof Error ? error.message : 'Gagal membaca file logo.'
  }
  finally {
    input.value = ''
  }
}

function handleLogoReferenceInput(value: string | number) {
  form.logoUrl = String(value)
  selectedLogoFile.value = null
  selectedLogoFileName.value = ''
  errors.logoUrl = ''
}

function clearLogoReference() {
  form.logoUrl = ''
  selectedLogoFile.value = null
  selectedLogoFileName.value = ''
  errors.logoUrl = ''

  if (logoFileInput.value) {
    logoFileInput.value.value = ''
  }
}

function validateForm() {
  clearErrors()

  if (!form.storeName.trim()) {
    errors.storeName = 'Nama usaha/toko wajib diisi.'
  }
  else if (form.storeName.trim().length > 80) {
    errors.storeName = 'Nama usaha/toko maksimal 80 karakter.'
  }

  if (form.logoUrl.trim() && !isValidImageReference(form.logoUrl)) {
    errors.logoUrl = 'Logo harus berupa URL, path, atau file gambar yang valid.'
  }

  if (form.storeAddress.trim().length > 160) {
    errors.storeAddress = 'Alamat maksimal 160 karakter.'
  }

  if (form.storePhone.trim() && !isValidPhoneNumber(form.storePhone)) {
    errors.storePhone = 'Nomor kontak hanya boleh berisi angka, spasi, +, -, atau tanda kurung.'
  }

  if (form.receiptHeader.trim().length > 160) {
    errors.receiptHeader = 'Header struk maksimal 160 karakter.'
  }

  if (form.receiptFooter.trim().length > 200) {
    errors.receiptFooter = 'Catatan/footer struk maksimal 200 karakter.'
  }

  if (!form.systemDisplayName.trim()) {
    errors.systemDisplayName = 'Nama aplikasi wajib diisi.'
  }
  else if (form.systemDisplayName.trim().length > 50) {
    errors.systemDisplayName = 'Nama aplikasi maksimal 50 karakter.'
  }

  return !Object.values(errors).some(Boolean)
}

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key as FormField] = ''
  })
}

function createPayloadFromForm(): AdminSystemProfileFormPayload {
  return {
    logoUrl: form.logoUrl.trim(),
    logoFile: selectedLogoFile.value,
    storeName: form.storeName.trim(),
    storeAddress: form.storeAddress.trim(),
    storePhone: form.storePhone.trim(),
    receiptHeader: form.receiptHeader.trim(),
    receiptFooter: form.receiptFooter.trim(),
    systemDisplayName: form.systemDisplayName.trim(),
  }
}

function createPayloadFromProfile(profile: AdminSystemProfile): AdminSystemProfileFormPayload {
  return {
    logoUrl: profile.logoUrl.trim(),
    logoFile: null,
    storeName: profile.storeName.trim(),
    storeAddress: profile.storeAddress.trim(),
    storePhone: profile.storePhone.trim(),
    receiptHeader: profile.receiptHeader.trim(),
    receiptFooter: profile.receiptFooter.trim(),
    systemDisplayName: profile.systemDisplayName.trim(),
  }
}

function isSamePayload(current: AdminSystemProfileFormPayload, saved: AdminSystemProfileFormPayload) {
  return current.logoUrl === saved.logoUrl
    && current.storeName === saved.storeName
    && current.storeAddress === saved.storeAddress
    && current.storePhone === saved.storePhone
    && current.receiptHeader === saved.receiptHeader
    && current.receiptFooter === saved.receiptFooter
    && current.systemDisplayName === saved.systemDisplayName
}

function isValidPhoneNumber(value: string) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return true
  }

  return /^\+?[\d\s().-]{7,24}$/.test(trimmedValue)
}

function normalizeReceiptPreviewItem(value: unknown): ReceiptPreviewItem {
  const record = isRecord(value) ? value : {}

  return {
    name: getStringValue(record.name),
    qty: getNumberValue(record.qty),
    price: getNumberValue(record.price),
    subtotal: getNumberValue(record.subtotal),
  }
}

function getStringValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function getNullableStringValue(value: unknown) {
  const stringValue = getStringValue(value)

  return stringValue || null
}

function getNumberValue(value: unknown) {
  const numberValue = Number(value)

  return Number.isFinite(numberValue) ? numberValue : 0
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
</script>

<template>
  <form
    class="grid flex-1 gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,23rem)] xl:items-start"
    :aria-busy="props.submitting"
    @submit.prevent="handleSubmit"
  >
    <div class="flex min-w-0 flex-col gap-3">
      <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="system-identity-title">
        <div class="mb-4 flex items-start gap-3">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Building2 class="size-4" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <h2 id="system-identity-title" class="text-base font-semibold tracking-normal">
              Identitas Toko
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Informasi ini dipakai untuk identitas aplikasi, struk, dan laporan.
            </p>
          </div>
        </div>

        <div class="grid gap-4 lg:grid-cols-[12rem_minmax(0,1fr)]">
          <div class="space-y-2">
            <div class="flex aspect-square items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground">
              <img
                v-if="canShowLogoPreview"
                :src="form.logoUrl.trim()"
                :alt="`Logo ${previewStoreName}`"
                class="size-full object-contain p-3"
              >
              <div v-else class="flex flex-col items-center gap-2 text-xs">
                <ImageIcon class="size-9" aria-hidden="true" />
                <span>Preview logo</span>
              </div>
            </div>
            <p class="text-xs text-muted-foreground">
              Gunakan gambar dengan rasio mendekati persegi agar tampil rapi.
            </p>
          </div>

          <div class="grid content-start gap-3 sm:grid-cols-2">
            <div class="space-y-1.5 sm:col-span-2">
              <label for="system-store-name" class="text-sm font-medium">Nama usaha/toko</label>
              <Input
                id="system-store-name"
                v-model="form.storeName"
                maxlength="80"
                placeholder="Cindelaras"
                :disabled="props.submitting"
                :aria-invalid="errors.storeName ? true : undefined"
                :aria-describedby="errors.storeName ? 'system-store-name-error' : 'system-store-name-help'"
              />
              <p v-if="errors.storeName" id="system-store-name-error" class="text-xs text-destructive">
                {{ errors.storeName }}
              </p>
              <p v-else id="system-store-name-help" class="text-xs text-muted-foreground">
                Ditampilkan di header sistem, struk, dan laporan.
              </p>
            </div>

            <div class="space-y-1.5 sm:col-span-2">
              <label for="system-logo-url" class="text-sm font-medium">Logo toko</label>
              <div class="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="system-logo-url"
                  :model-value="logoReferenceInputValue"
                  inputmode="url"
                  placeholder="https://... atau /uploads/logo.png"
                  :disabled="props.submitting"
                  :readonly="isImageDataUrl(form.logoUrl)"
                  :aria-invalid="errors.logoUrl ? true : undefined"
                  :aria-describedby="errors.logoUrl ? 'system-logo-url-error' : 'system-logo-url-help'"
                  class="sm:flex-1"
                  @update:model-value="handleLogoReferenceInput"
                />
                <input
                  ref="logoFileInput"
                  type="file"
                  class="sr-only"
                  :accept="ADMIN_IMAGE_UPLOAD_ACCEPT"
                  :disabled="props.submitting"
                  @change="handleLogoFileChange"
                >
                <div class="flex gap-2">
                  <Button type="button" variant="outline" class="flex-1 sm:flex-none" :disabled="props.submitting" @click="openLogoFilePicker">
                    <Upload class="size-4" aria-hidden="true" />
                    Pilih File
                  </Button>
                  <Button
                    v-if="form.logoUrl"
                    type="button"
                    variant="ghost"
                    size="icon"
                    :disabled="props.submitting"
                    aria-label="Hapus logo toko"
                    @click="clearLogoReference"
                  >
                    <X class="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <p v-if="errors.logoUrl" id="system-logo-url-error" class="text-xs text-destructive">
                {{ errors.logoUrl }}
              </p>
              <p v-else id="system-logo-url-help" class="text-xs text-muted-foreground">
                Isi URL atau path logo dari backend.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="receipt-setting-title">
        <div class="mb-4 flex items-start gap-3">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-info/10 text-info">
            <ReceiptText class="size-4" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <h2 id="receipt-setting-title" class="text-base font-semibold tracking-normal">
              Tampilan Struk
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Atur kontak, alamat, dan teks yang muncul pada struk transaksi.
            </p>
          </div>
        </div>

        <div class="grid gap-3 lg:grid-cols-2">
          <div class="space-y-1.5">
            <label for="system-store-phone" class="text-sm font-medium">Kontak toko</label>
            <Input
              id="system-store-phone"
              v-model="form.storePhone"
              inputmode="tel"
              placeholder="0812-3456-7890"
              :disabled="props.submitting"
              :aria-invalid="errors.storePhone ? true : undefined"
              :aria-describedby="errors.storePhone ? 'system-store-phone-error' : 'system-store-phone-help'"
            />
            <p v-if="errors.storePhone" id="system-store-phone-error" class="text-xs text-destructive">
              {{ errors.storePhone }}
            </p>
            <p v-else id="system-store-phone-help" class="text-xs text-muted-foreground">
              Ditampilkan pada bagian identitas struk.
            </p>
          </div>

          <div class="space-y-1.5">
            <label for="system-store-address" class="text-sm font-medium">Alamat toko</label>
            <Input
              id="system-store-address"
              v-model="form.storeAddress"
              maxlength="160"
              placeholder="Jl. Ring Road Utara, Yogyakarta"
              :disabled="props.submitting"
              :aria-invalid="errors.storeAddress ? true : undefined"
              :aria-describedby="errors.storeAddress ? 'system-store-address-error' : 'system-store-address-help'"
            />
            <p v-if="errors.storeAddress" id="system-store-address-error" class="text-xs text-destructive">
              {{ errors.storeAddress }}
            </p>
            <p v-else id="system-store-address-help" class="text-xs text-muted-foreground">
              Ditampilkan pada bagian atas struk.
            </p>
          </div>

          <div class="space-y-1.5">
            <label for="system-receipt-header" class="text-sm font-medium">Header struk</label>
            <Textarea
              id="system-receipt-header"
              v-model="form.receiptHeader"
              maxlength="160"
              class="min-h-24 resize-y"
              placeholder="Terima kasih sudah berbelanja."
              :disabled="props.submitting"
              :aria-invalid="errors.receiptHeader ? true : undefined"
              :aria-describedby="errors.receiptHeader ? 'system-receipt-header-error' : 'system-receipt-header-help'"
            />
            <p v-if="errors.receiptHeader" id="system-receipt-header-error" class="text-xs text-destructive">
              {{ errors.receiptHeader }}
            </p>
            <p v-else id="system-receipt-header-help" class="text-xs text-muted-foreground">
              Maksimal 160 karakter.
            </p>
          </div>

          <div class="space-y-1.5">
            <label for="system-receipt-footer" class="text-sm font-medium">Catatan/footer struk</label>
            <Textarea
              id="system-receipt-footer"
              v-model="form.receiptFooter"
              maxlength="200"
              class="min-h-24 resize-y"
              placeholder="Simpan struk ini sebagai bukti pembayaran."
              :disabled="props.submitting"
              :aria-invalid="errors.receiptFooter ? true : undefined"
              :aria-describedby="errors.receiptFooter ? 'system-receipt-footer-error' : 'system-receipt-footer-help'"
            />
            <p v-if="errors.receiptFooter" id="system-receipt-footer-error" class="text-xs text-destructive">
              {{ errors.receiptFooter }}
            </p>
            <p v-else id="system-receipt-footer-help" class="text-xs text-muted-foreground">
              Maksimal 200 karakter.
            </p>
          </div>
        </div>

      </section>

      <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="system-appearance-title">
        <div class="mb-4 flex items-start gap-3">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Store class="size-4" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <h2 id="system-appearance-title" class="text-base font-semibold tracking-normal">
              Tampilan Sistem
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Nama yang tampil pada navigasi dan halaman aplikasi.
            </p>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="space-y-1.5">
            <label for="system-display-name" class="text-sm font-medium">Nama aplikasi</label>
            <Input
              id="system-display-name"
              v-model="form.systemDisplayName"
              maxlength="50"
              placeholder="Sistem Kasir"
              :disabled="props.submitting"
              :aria-invalid="errors.systemDisplayName ? true : undefined"
              :aria-describedby="errors.systemDisplayName ? 'system-display-name-error' : 'system-display-name-help'"
            />
            <p v-if="errors.systemDisplayName" id="system-display-name-error" class="text-xs text-destructive">
              {{ errors.systemDisplayName }}
            </p>
            <p v-else id="system-display-name-help" class="text-xs text-muted-foreground">
              Ditampilkan pada identitas sistem.
            </p>
          </div>
        </div>
      </section>

      <div class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4">
        <div class="flex flex-col gap-3">
          <Alert v-if="props.errorMessage" variant="destructive">
            <AlertCircle class="size-4" aria-hidden="true" />
            <AlertDescription>
              {{ props.errorMessage }}
            </AlertDescription>
          </Alert>

          <Alert v-else-if="props.successMessage">
            <CheckCircle2 class="size-4 text-success" aria-hidden="true" />
            <AlertDescription>
              {{ props.successMessage }}
            </AlertDescription>
          </Alert>

          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm text-muted-foreground">
              Terakhir diperbarui: {{ props.profile.updatedAt }}
            </p>
            <div class="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                :disabled="props.submitting || !hasChanges"
                @click="resetForm"
              >
                <RefreshCcw class="size-4" aria-hidden="true" />
                Reset
              </Button>
              <Button type="submit" :disabled="!canSubmit">
                <Spinner v-if="props.submitting" class="size-4" />
                <Save v-else class="size-4" aria-hidden="true" />
                {{ props.submitting ? 'Menyimpan...' : 'Simpan Profil Sistem' }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <aside class="flex min-w-0 flex-col gap-3">
      <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="system-preview-title">
        <div class="mb-4 flex items-start gap-3">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Store class="size-4" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <h2 id="system-preview-title" class="text-base font-semibold tracking-normal">
              Preview Sistem
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Gambaran identitas yang akan tampil.
            </p>
          </div>
        </div>

        <div class="space-y-3">
          <div class="rounded-md border bg-background p-3">
            <div class="flex items-center gap-3">
              <span
                class="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary text-sm font-semibold text-primary-foreground"
              >
                <img
                  v-if="canShowLogoPreview"
                  :src="form.logoUrl.trim()"
                  :alt="`Logo ${previewStoreName}`"
                  class="size-full object-contain p-1.5"
                >
                <span v-else>{{ logoInitials }}</span>
              </span>
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold">{{ previewSystemDisplayName }}</p>
                <p class="truncate text-xs text-muted-foreground">{{ previewStoreName }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="receipt-preview-title">
        <div class="mb-4 flex items-start justify-between gap-3">
          <div class="flex min-w-0 items-start gap-3">
            <span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-info/10 text-info">
              <ReceiptText class="size-4" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <h2 id="receipt-preview-title" class="text-base font-semibold tracking-normal">
                Preview Struk
              </h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Contoh struk dari konfigurasi backend.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            :disabled="isReceiptPreviewLoading"
            aria-label="Muat ulang preview struk"
            @click="loadReceiptPreviewPdf({ force: true })"
          >
            <Spinner v-if="isReceiptPreviewLoading" class="size-4" />
            <RefreshCcw v-else class="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div class="mx-auto w-full max-w-[280px] sm:max-w-xs md:max-w-md xl:max-w-full min-h-[480px] h-[550px] rounded-md border bg-background overflow-hidden shadow-xs relative">
          <p v-if="receiptPreviewError" class="absolute inset-x-4 top-4 z-10 rounded-md border border-destructive/30 bg-destructive/10 px-2 py-1.5 font-sans text-xs text-destructive">
            {{ receiptPreviewError }}
          </p>

          <object
            v-if="pdfBlobUrl"
            :data="pdfBlobUrl"
            type="application/pdf"
            class="size-full"
            title="Preview Struk PDF"
          >
            <div class="flex h-full flex-col items-center justify-center p-4 text-center">
              <p class="mb-2 text-sm font-medium">Browser tidak mendukung preview PDF bawaan.</p>
              <a
                :href="pdfBlobUrl"
                target="_blank"
                download="preview-struk.pdf"
                class="text-sm text-primary hover:underline"
              >
                Unduh PDF Preview
              </a>
            </div>
          </object>
          <div v-else-if="isReceiptPreviewLoading" class="flex h-full flex-col items-center justify-center">
            <Spinner class="size-6 text-muted-foreground" />
            <p class="mt-2 text-sm text-muted-foreground">Memuat preview PDF...</p>
          </div>
        </div>
      </section>
    </aside>
  </form>
</template>
