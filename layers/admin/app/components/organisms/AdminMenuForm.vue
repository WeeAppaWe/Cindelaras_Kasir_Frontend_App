<script setup lang="ts">
import type {
  AdminMenuCategoryOption,
  AdminMenuFormInitialValue,
  AdminMenuFormPayload,
  AdminMenuRecipeComponentType,
  AdminMenuRecipeOption,
} from '../../types/admin-menu'
import { Calculator, ImageIcon, Plus, Trash2, Upload, X } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import { Textarea } from '#layers/base/app/components/ui/textarea'
import {
  ADMIN_IMAGE_UPLOAD_ACCEPT,
  getImageFileValidationMessage,
  isValidImageReference,
  readImageFileAsDataUrl,
} from '../../utils/image-upload'

interface RecipeRowState {
  localId: string
  type: AdminMenuRecipeComponentType
  itemId: string
  itemName: string
  quantity: string
  unit: string
  costPerUnit?: number
}

interface AdminMenuFormState {
  name: string
  categoryId: string
  description: string
  imageUrl: string
  sellingPrice: string
  availability: 'available' | 'unavailable'
}

type FormField = keyof AdminMenuFormState | 'recipe'

const props = withDefaults(defineProps<{
  categoryOptions?: AdminMenuCategoryOption[]
  recipeOptions?: AdminMenuRecipeOption[]
  initialValue?: AdminMenuFormInitialValue | null
  submitting?: boolean
}>(), {
  categoryOptions: () => [],
  recipeOptions: () => [],
  initialValue: null,
  submitting: false,
})

const emit = defineEmits<{
  submit: [payload: AdminMenuFormPayload]
}>()

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 2,
})

let recipeRowSequence = 0

const form = reactive<AdminMenuFormState>({
  name: '',
  categoryId: '',
  description: '',
  imageUrl: '',
  sellingPrice: '',
  availability: 'available',
})

const errors = reactive<Record<FormField, string>>({
  name: '',
  categoryId: '',
  description: '',
  imageUrl: '',
  sellingPrice: '',
  availability: '',
  recipe: '',
})

const recipeRows = ref<RecipeRowState[]>([])
const imageFileInput = ref<HTMLInputElement | null>(null)
const selectedImageFile = ref<File | null>(null)
const selectedImageFileName = ref('')
const imagePreviewDataUrl = ref('')

watch(() => props.initialValue, value => resetForm(value), { immediate: true })

watch(() => props.categoryOptions, (options) => {
  if (!form.categoryId && options.length) {
    form.categoryId = options[0]?.id ?? ''
  }
}, { immediate: true })

watch(() => props.recipeOptions, () => {
  recipeRows.value.forEach((row) => {
    const selectedOption = props.recipeOptions.find(option => option.id === row.itemId)

    if (selectedOption) {
      row.type = selectedOption.type
      row.itemName = selectedOption.name
      row.unit = selectedOption.unit
      row.costPerUnit = selectedOption.costPerUnit ?? row.costPerUnit
      return
    }

    const typedOptions = getOptionsByType(row.type)

    if (!row.itemId && typedOptions.length) {
      const option = typedOptions[0]
      row.itemId = option?.id ?? ''
      row.itemName = option?.name ?? ''
      row.unit = option?.unit ?? ''
      row.costPerUnit = option?.costPerUnit
    }
  })
}, { immediate: true })

const imagePreviewUrl = computed(() => imagePreviewDataUrl.value || form.imageUrl.trim())
const imageReferenceInputValue = computed(() => selectedImageFile.value
  ? selectedImageFileName.value
  : form.imageUrl
)
const canShowImagePreview = computed(() => Boolean(
  imagePreviewUrl.value && isValidImageReference(imagePreviewUrl.value),
))
const selectedCategoryName = computed(() => (
  props.categoryOptions.find(category => category.id === form.categoryId)?.name ?? ''
))
const validRecipeItems = computed(() => recipeRows.value
  .map((row) => {
    const quantity = toNumber(row.quantity)

    if (!row.itemId || !Number.isFinite(quantity) || quantity <= 0) {
      return null
    }

    return {
      ingredientId: row.itemId,
      qtyNeeded: roundQuantity(quantity),
    }
  })
  .filter((item): item is AdminMenuFormPayload['recipeItems'][number] => Boolean(item)),
)
const recipePreviewItems = computed(() => recipeRows.value.map((row) => {
  const option = getRecipeOption(row)
  const quantity = toNumber(row.quantity)
  const costPerUnit = normalizeCost(option?.costPerUnit ?? row.costPerUnit)
  const subtotal = Number.isFinite(quantity) && quantity > 0 && costPerUnit > 0
    ? Math.round(quantity * costPerUnit)
    : 0

  return {
    row,
    option,
    quantity,
    costPerUnit,
    subtotal,
  }
}))
const calculatedRecipeCost = computed(() => recipePreviewItems.value.reduce((total, item) => total + item.subtotal, 0))
const totalRecipeCost = computed(() => calculatedRecipeCost.value || props.initialValue?.currentCost || 0)
const sellingPriceValue = computed(() => toNumber(form.sellingPrice))
const marginValue = computed(() => sellingPriceValue.value - totalRecipeCost.value)
const marginPercent = computed(() => {
  if (sellingPriceValue.value <= 0) {
    return 0
  }

  return Math.round((marginValue.value / sellingPriceValue.value) * 100)
})
const hasCostPreview = computed(() => totalRecipeCost.value > 0)
const recipeSummary = computed(() => {
  const names = recipePreviewItems.value
    .map(item => item.option?.name || item.row.itemName)
    .filter(Boolean)

  if (!names.length) {
    return 'Belum ada bahan resep'
  }

  return names.join(', ')
})
const marginToneClass = computed(() => marginValue.value < 0
  ? 'border-destructive/40 bg-destructive/10 text-destructive'
  : 'border-success/40 bg-success/10 text-foreground',
)
const canSubmit = computed(() => {
  const hasValidIdentity = Boolean(
    form.name.trim()
    && form.categoryId
    && (!form.imageUrl.trim() || isValidImageReference(form.imageUrl.trim())),
  )
  const hasValidPrice = Boolean(
    form.sellingPrice.trim()
    && Number.isFinite(sellingPriceValue.value)
    && sellingPriceValue.value > 0,
  )
  const hasValidRecipe = recipeRows.value.length > 0
    && validRecipeItems.value.length === recipeRows.value.length
    && !hasDuplicateRecipeIngredients()

  return hasValidIdentity && hasValidPrice && hasValidRecipe
})

function resetForm(value: AdminMenuFormInitialValue | null) {
  form.name = value?.name ?? ''
  form.categoryId = value?.categoryId || props.categoryOptions[0]?.id || ''
  form.description = value?.description ?? ''
  form.imageUrl = value?.imageUrl ?? ''
  form.sellingPrice = value?.sellingPrice ? String(value.sellingPrice) : ''
  form.availability = value?.isAvailable === false ? 'unavailable' : 'available'
  recipeRows.value = (value?.recipeItems ?? []).map(item => createRecipeRow({
    type: item.type,
    itemId: item.ingredientId,
    itemName: item.ingredientName,
    quantity: item.qtyNeeded,
    unit: item.unit,
    costPerUnit: item.costPerUnit,
  }))
  selectedImageFile.value = null
  selectedImageFileName.value = ''
  imagePreviewDataUrl.value = ''
  clearErrors()

  if (imageFileInput.value) {
    imageFileInput.value.value = ''
  }
}

function createRecipeRow(initial?: {
  type?: AdminMenuRecipeComponentType
  itemId?: string
  itemName?: string
  quantity?: number
  unit?: string
  costPerUnit?: number
}): RecipeRowState {
  const option = initial?.itemId
    ? props.recipeOptions.find(candidate => candidate.id === initial.itemId)
    : undefined
  const type = option?.type ?? initial?.type ?? 'ingredient'
  const fallbackOption = option ?? getOptionsByType(type)[0] ?? props.recipeOptions[0]

  return {
    localId: `recipe-row-${recipeRowSequence++}`,
    type: fallbackOption?.type ?? type,
    itemId: initial?.itemId ?? fallbackOption?.id ?? '',
    itemName: initial?.itemName ?? fallbackOption?.name ?? '',
    quantity: initial?.quantity ? String(initial.quantity) : '',
    unit: initial?.unit ?? fallbackOption?.unit ?? '',
    costPerUnit: initial?.costPerUnit ?? fallbackOption?.costPerUnit,
  }
}

function getOptionsByType(type: AdminMenuRecipeComponentType) {
  return props.recipeOptions.filter(option => option.type === type)
}

function getRecipeOption(row: RecipeRowState) {
  return props.recipeOptions.find(option => option.id === row.itemId) ?? (
    row.itemId
      ? {
          id: row.itemId,
          name: row.itemName || 'Bahan tersimpan',
          type: row.type,
          unit: row.unit || '-',
          costPerUnit: row.costPerUnit,
        }
      : undefined
  )
}

function updateRecipeType(row: RecipeRowState, value: string | number) {
  const type = value === 'semi_finished' ? 'semi_finished' : 'ingredient'
  const option = getOptionsByType(type)[0]

  row.type = type
  row.itemId = option?.id ?? ''
  row.itemName = option?.name ?? ''
  row.unit = option?.unit ?? ''
  row.costPerUnit = option?.costPerUnit
}

function updateRecipeItem(row: RecipeRowState, value: string | number) {
  const option = props.recipeOptions.find(candidate => candidate.id === String(value))

  row.itemId = option?.id ?? String(value)
  row.itemName = option?.name ?? row.itemName
  row.unit = option?.unit ?? row.unit
  row.costPerUnit = option?.costPerUnit ?? row.costPerUnit
}

function addRecipeRow() {
  recipeRows.value = [...recipeRows.value, createRecipeRow()]
  errors.recipe = ''
}

function removeRecipeRow(localId: string) {
  recipeRows.value = recipeRows.value.filter(row => row.localId !== localId)
  errors.recipe = ''
}

function openImageFilePicker() {
  if (props.submitting) {
    return
  }

  imageFileInput.value?.click()
}

async function handleImageFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    return
  }

  const validationMessage = getImageFileValidationMessage(file)

  if (validationMessage) {
    errors.imageUrl = validationMessage
    input.value = ''
    return
  }

  try {
    imagePreviewDataUrl.value = await readImageFileAsDataUrl(file)
    selectedImageFile.value = file
    selectedImageFileName.value = file.name
    errors.imageUrl = ''
  }
  catch (error) {
    errors.imageUrl = error instanceof Error ? error.message : 'Gagal membaca file gambar.'
  }
  finally {
    input.value = ''
  }
}

function handleImageReferenceInput(value: string | number) {
  form.imageUrl = String(value)
  selectedImageFile.value = null
  selectedImageFileName.value = ''
  imagePreviewDataUrl.value = ''
  errors.imageUrl = ''
}

function clearImageReference() {
  form.imageUrl = ''
  selectedImageFile.value = null
  selectedImageFileName.value = ''
  imagePreviewDataUrl.value = ''
  errors.imageUrl = ''

  if (imageFileInput.value) {
    imageFileInput.value.value = ''
  }
}

function handleSubmit() {
  if (props.submitting || !validateForm()) {
    return
  }

  emit('submit', {
    name: form.name.trim(),
    categoryId: form.categoryId,
    description: form.description.trim(),
    imageUrl: form.imageUrl.trim() || undefined,
    imageFile: selectedImageFile.value,
    sellingPrice: Math.round(sellingPriceValue.value),
    isAvailable: form.availability === 'available',
    recipeItems: validRecipeItems.value,
  })
}

function validateForm() {
  clearErrors()

  if (!form.name.trim()) {
    errors.name = 'Nama menu wajib diisi.'
  }

  if (!form.categoryId) {
    errors.categoryId = 'Kategori menu wajib dipilih.'
  }

  if (form.imageUrl.trim() && !isValidImageReference(form.imageUrl)) {
    errors.imageUrl = 'Gambar harus berupa URL atau path gambar yang valid.'
  }

  if (!form.sellingPrice.trim()) {
    errors.sellingPrice = 'Harga jual wajib diisi.'
  }
  else if (!Number.isFinite(sellingPriceValue.value) || sellingPriceValue.value <= 0) {
    errors.sellingPrice = 'Harga jual harus lebih dari 0.'
  }

  if (!recipeRows.value.length) {
    errors.recipe = 'Tambahkan minimal 1 bahan resep.'
  }
  else if (validRecipeItems.value.length !== recipeRows.value.length) {
    errors.recipe = 'Setiap baris resep wajib memilih bahan dan jumlah lebih dari 0.'
  }
  else if (hasDuplicateRecipeIngredients()) {
    errors.recipe = 'Bahan resep tidak boleh duplikat.'
  }

  return !Object.values(errors).some(Boolean)
}

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key as FormField] = ''
  })
}

function hasDuplicateRecipeIngredients() {
  const selectedIds = recipeRows.value
    .map(row => row.itemId)
    .filter(Boolean)

  return new Set(selectedIds).size !== selectedIds.length
}

function toNumber(value: string) {
  const parsed = Number(String(value || '').replace(',', '.'))

  return Number.isFinite(parsed) ? parsed : 0
}

function normalizeCost(value: number | undefined) {
  return Number.isFinite(value) ? Number(value) : 0
}

function roundQuantity(value: number) {
  return Math.round(value * 100) / 100
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value).replace(/\s/g, '')
}

function formatNumber(value: number) {
  return numberFormatter.format(roundQuantity(value))
}
</script>

<template>
  <form class="flex flex-1 flex-col" :aria-busy="props.submitting" @submit.prevent="handleSubmit">
    <div class="grid flex-1 gap-3 xl:grid-cols-[minmax(17rem,23rem)_minmax(0,1fr)] xl:items-stretch">
      <section class="flex h-full flex-col rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="menu-identity-title">
        <div class="mb-3">
          <h2 id="menu-identity-title" class="text-base font-semibold tracking-normal">
            Identitas Menu
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Data dasar menu yang tampil di admin dan kasir.
          </p>
        </div>

        <div class="space-y-3">
          <div class="flex min-h-40 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground">
            <img
              v-if="canShowImagePreview"
              :src="imagePreviewUrl"
              :alt="form.name || 'Preview gambar menu'"
              class="size-full object-cover"
            >
            <div v-else class="flex flex-col items-center gap-2 text-xs">
              <ImageIcon class="size-9" aria-hidden="true" />
              <span>Preview gambar</span>
            </div>
          </div>

          <div class="space-y-3">
            <div class="space-y-1.5">
              <label for="admin-menu-name" class="text-sm font-medium">Nama menu</label>
              <Input
                id="admin-menu-name"
                v-model="form.name"
                :disabled="props.submitting"
                :aria-invalid="errors.name ? true : undefined"
                aria-describedby="admin-menu-name-error"
                placeholder="Nasi Goreng Spesial"
              />
              <p v-if="errors.name" id="admin-menu-name-error" class="text-xs text-destructive">
                {{ errors.name }}
              </p>
            </div>

            <div class="space-y-1.5">
              <label for="admin-menu-category" class="text-sm font-medium">Kategori</label>
              <NativeSelect
                id="admin-menu-category"
                v-model="form.categoryId"
                class="w-full"
                :disabled="props.submitting || !categoryOptions.length"
                :aria-invalid="errors.categoryId ? true : undefined"
                aria-describedby="admin-menu-category-error"
              >
                <option v-if="!categoryOptions.length" value="">Belum ada kategori</option>
                <option v-for="category in categoryOptions" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </NativeSelect>
              <p v-if="errors.categoryId" id="admin-menu-category-error" class="text-xs text-destructive">
                {{ errors.categoryId }}
              </p>
            </div>

            <div class="space-y-1.5">
              <label for="admin-menu-status" class="text-sm font-medium">Status</label>
              <NativeSelect id="admin-menu-status" v-model="form.availability" class="w-full" :disabled="props.submitting">
                <option value="available">Tersedia</option>
                <option value="unavailable">Habis</option>
              </NativeSelect>
            </div>

            <div class="space-y-1.5">
              <label for="admin-menu-description" class="text-sm font-medium">Deskripsi</label>
              <Textarea
                id="admin-menu-description"
                v-model="form.description"
                :disabled="props.submitting"
                class="min-h-20"
                placeholder="Deskripsi singkat menu"
              />
            </div>

            <div class="space-y-1.5">
              <label for="admin-menu-image-url" class="text-sm font-medium">Gambar menu</label>
              <div class="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="admin-menu-image-url"
                  :model-value="imageReferenceInputValue"
                  :disabled="props.submitting"
                  :readonly="Boolean(selectedImageFile)"
                  :aria-invalid="errors.imageUrl ? true : undefined"
                  aria-describedby="admin-menu-image-url-error"
                  inputmode="url"
                  placeholder="https://... atau pilih file"
                  class="sm:flex-1"
                  @update:model-value="handleImageReferenceInput"
                />
                <input
                  ref="imageFileInput"
                  type="file"
                  class="sr-only"
                  :accept="ADMIN_IMAGE_UPLOAD_ACCEPT"
                  :disabled="props.submitting"
                  @change="handleImageFileChange"
                >
                <div class="flex gap-2">
                  <Button type="button" variant="outline" class="flex-1 sm:flex-none" :disabled="props.submitting" @click="openImageFilePicker">
                    <Upload class="size-4" aria-hidden="true" />
                    Pilih File
                  </Button>
                  <Button
                    v-if="form.imageUrl || selectedImageFile"
                    type="button"
                    variant="ghost"
                    size="icon"
                    :disabled="props.submitting"
                    aria-label="Hapus gambar menu"
                    @click="clearImageReference"
                  >
                    <X class="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <p v-if="errors.imageUrl" id="admin-menu-image-url-error" class="text-xs text-destructive">
                {{ errors.imageUrl }}
              </p>
            </div>

            <div class="rounded-md border bg-muted/30 px-3 py-2 text-sm">
              <p class="text-xs font-medium text-muted-foreground">Kategori dipilih</p>
              <p class="mt-1 truncate font-medium text-foreground">{{ selectedCategoryName || '-' }}</p>
            </div>

            <div class="border-t pt-3">
              <Button type="submit" class="w-full" :disabled="props.submitting || !canSubmit">
                <Spinner v-if="props.submitting" class="size-4" />
                {{ props.submitting ? 'Menyimpan...' : 'Simpan Menu' }}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div class="flex min-w-0 flex-col gap-3 xl:h-full">
        <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="menu-price-title">
          <div class="mb-3">
            <h2 id="menu-price-title" class="text-base font-semibold tracking-normal">
              Harga & HPP
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">
              HPP final dihitung backend dari resep setelah menu disimpan.
            </p>
          </div>

          <div class="grid gap-2 md:grid-cols-3">
            <div class="space-y-1.5">
              <label for="admin-menu-price" class="text-sm font-medium">Harga jual</label>
              <Input
                id="admin-menu-price"
                v-model="form.sellingPrice"
                :disabled="props.submitting"
                :aria-invalid="errors.sellingPrice ? true : undefined"
                aria-describedby="admin-menu-price-error"
                inputmode="numeric"
                placeholder="25000"
              />
              <p v-if="errors.sellingPrice" id="admin-menu-price-error" class="text-xs text-destructive">
                {{ errors.sellingPrice }}
              </p>
            </div>

            <div class="rounded-md border px-3 py-2">
              <p class="text-xs font-medium text-muted-foreground">HPP resep</p>
              <p class="mt-1 truncate text-base font-semibold">
                {{ hasCostPreview ? formatCurrency(totalRecipeCost) : '-' }}
              </p>
              <p class="mt-1 text-xs text-muted-foreground">{{ recipeRows.length }} bahan</p>
            </div>

            <div class="rounded-md border px-3 py-2" :class="marginToneClass">
              <div class="flex items-start gap-2">
                <Calculator class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <div class="min-w-0">
                  <p class="text-xs font-medium text-muted-foreground">Margin</p>
                  <p class="mt-1 truncate text-base font-semibold">
                    {{ hasCostPreview ? formatCurrency(marginValue) : '-' }}
                  </p>
                  <p class="mt-1 text-xs text-muted-foreground">
                    {{ hasCostPreview ? `${marginPercent}% dari harga jual` : 'Menunggu HPP backend' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="flex flex-1 flex-col rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="menu-recipe-title">
          <div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div class="min-w-0">
              <h2 id="menu-recipe-title" class="text-base font-semibold tracking-normal">
                Resep Menu
              </h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Pilihan bahan diambil dari endpoint bahan aktif RAW dan SEMI.
              </p>
            </div>

            <Button type="button" variant="outline" size="sm" :disabled="props.submitting || !recipeOptions.length" @click="addRecipeRow">
              <Plus class="size-4" aria-hidden="true" />
              Tambah Bahan
            </Button>
          </div>

          <div class="flex flex-1 flex-col">
            <div
              v-if="!recipeRows.length"
              class="flex min-h-40 flex-1 flex-col items-center justify-center rounded-md border border-dashed bg-muted/30 px-4 py-6 text-center"
            >
              <div class="flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground">
                <Plus class="size-5" aria-hidden="true" />
              </div>
              <p class="mt-3 text-sm font-medium">
                Belum ada bahan resep
              </p>
              <p class="mt-1 max-w-md text-sm text-muted-foreground">
                Klik Tambah Bahan untuk memasukkan bahan baku atau bahan setengah jadi.
              </p>
            </div>

            <div v-else class="space-y-2">
              <div
                v-for="(row, index) in recipeRows"
                :key="row.localId"
                class="grid gap-2 rounded-md border bg-background p-2.5 md:grid-cols-[8rem_minmax(10rem,1fr)_6rem_5rem_7rem_7rem_auto] md:items-end"
              >
                <div class="space-y-1.5">
                  <label :for="`recipe-type-${row.localId}`" class="text-sm font-medium">Jenis</label>
                  <NativeSelect
                    :id="`recipe-type-${row.localId}`"
                    :model-value="row.type"
                    class="w-full"
                    :disabled="props.submitting"
                    @update:model-value="value => updateRecipeType(row, value)"
                  >
                    <option value="ingredient">Bahan baku</option>
                    <option value="semi_finished">Setengah jadi</option>
                  </NativeSelect>
                </div>

                <div class="space-y-1.5">
                  <label :for="`recipe-item-${row.localId}`" class="text-sm font-medium">Bahan</label>
                  <NativeSelect
                    :id="`recipe-item-${row.localId}`"
                    :model-value="row.itemId"
                    class="w-full"
                    :disabled="props.submitting || !getOptionsByType(row.type).length"
                    @update:model-value="value => updateRecipeItem(row, value)"
                  >
                    <option v-if="row.itemId && !getOptionsByType(row.type).some(option => option.id === row.itemId)" :value="row.itemId">
                      {{ row.itemName || 'Bahan tersimpan' }}
                    </option>
                    <option v-if="!getOptionsByType(row.type).length" value="">Belum ada bahan</option>
                    <option v-for="option in getOptionsByType(row.type)" :key="option.id" :value="option.id">
                      {{ option.name }}
                    </option>
                  </NativeSelect>
                </div>

                <div class="space-y-1.5">
                  <label :for="`recipe-qty-${row.localId}`" class="text-sm font-medium">Jumlah</label>
                  <Input
                    :id="`recipe-qty-${row.localId}`"
                    v-model="row.quantity"
                    :disabled="props.submitting"
                    inputmode="decimal"
                    placeholder="1"
                  />
                </div>

                <div class="space-y-1.5">
                  <p class="text-sm font-medium">Satuan</p>
                  <p class="flex h-9 items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">
                    {{ (getRecipeOption(row)?.unit ?? row.unit) || '-' }}
                  </p>
                </div>

                <div class="space-y-1.5">
                  <p class="text-sm font-medium">HPP/unit</p>
                  <p class="flex h-9 items-center justify-end rounded-md border bg-muted px-3 text-sm font-medium">
                    {{ recipePreviewItems[index]?.costPerUnit ? formatCurrency(recipePreviewItems[index]?.costPerUnit ?? 0) : '-' }}
                  </p>
                </div>

                <div class="space-y-1.5">
                  <p class="text-sm font-medium">Subtotal</p>
                  <p class="flex h-9 items-center justify-end rounded-md border bg-muted px-3 text-sm font-medium">
                    {{ recipePreviewItems[index]?.subtotal ? formatCurrency(recipePreviewItems[index]?.subtotal ?? 0) : '-' }}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  class="text-destructive hover:bg-destructive/10 hover:text-destructive md:mb-0.5"
                  :disabled="props.submitting"
                  :aria-label="`Hapus bahan resep baris ${index + 1}`"
                  @click="removeRecipeRow(row.localId)"
                >
                  <Trash2 class="size-4" aria-hidden="true" />
                  Hapus
                </Button>
              </div>
            </div>
          </div>

          <div class="mt-3 rounded-md border bg-muted/30 px-3 py-2 text-sm">
            <p class="text-xs font-medium text-muted-foreground">Ringkasan resep</p>
            <p class="mt-1 line-clamp-2 text-foreground">{{ recipeSummary }}</p>
          </div>

          <p v-if="errors.recipe" class="mt-3 text-sm text-destructive">
            {{ errors.recipe }}
          </p>
        </section>
      </div>
    </div>
  </form>
</template>
