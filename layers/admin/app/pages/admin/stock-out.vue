<script setup lang="ts">
import type {
  AdminCrudDetailItem,
  AdminCrudField,
  AdminDataMetric as AdminDataMetricItem,
  AdminDataTableColumn,
  AdminDataTableRow,
} from '../../types/admin-management'
import type {
  AdminInventoryIngredientOption,
  AdminInventoryMovementRecord,
  AdminInventoryMovementViewItem,
  AdminInventoryStockOutFormPayload,
  AdminInventoryStockOutReason,
  AdminInventoryStockTypeOption,
} from '../../types/admin-inventory'
import { AlertTriangle, ClipboardCheck, PackageMinus, Plus } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import AdminDataMetric from '../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminCrudDialog from '../../components/organisms/AdminCrudDialog.vue'
import AdminDataTable from '../../components/organisms/AdminDataTable.vue'
import {
  createAdminInventoryStockOutPayload,
  getAdminInventoryStockOutValidationMessage,
  hydrateAdminInventoryMovementStockType,
  isManualStockOutTypeName,
  mapAdminInventoryMovementRecordToViewItem,
  mapAdminInventoryStockTypeRecordToOption,
  mapAdminRawIngredientRecordToInventoryOption,
} from '../../utils/admin-inventory'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Stok Keluar',
})

type CrudMode = 'create' | 'detail'
type ReasonFilter = 'all' | AdminInventoryStockOutReason

const adminInventoryApi = useAdminInventoryApi()
const adminRawIngredientApi = useAdminRawIngredientApi()
const { runAdminAction } = useAdminActionFeedback()

const search = ref('')
const ingredientFilter = ref('all')
const reasonFilter = ref<ReasonFilter>('all')
const dateFrom = ref('')
const dateTo = ref('')
const isLoading = ref(false)
const isCrudLoading = ref(false)
const isCrudDialogOpen = ref(false)
const crudMode = ref<CrudMode>('detail')
const loadError = ref('')
const formError = ref('')
const stockOutItems = ref<AdminInventoryMovementViewItem[]>([])
const stockTypeOptions = ref<AdminInventoryStockTypeOption[]>([])
const ingredientOptions = ref<AdminInventoryIngredientOption[]>([])
const selectedStockOut = ref<AdminInventoryMovementViewItem | null>(null)
const selectedStockOutDetail = ref<AdminInventoryMovementViewItem | null>(null)
const crudForm = ref<Record<string, string>>(createStockOutForm())

let searchTimer: ReturnType<typeof setTimeout> | null = null
let stockOutRequestId = 0

const stockOutTypeIds = computed(() => stockTypeOptions.value
  .filter(type => isManualStockOutTypeName(type.name))
  .map(type => type.id))
const canCreate = computed(() => ingredientOptions.value.length > 0)
const hasActiveFilter = computed(() => Boolean(
  search.value.trim()
  || ingredientFilter.value !== 'all'
  || reasonFilter.value !== 'all'
  || dateFrom.value
  || dateTo.value,
))
const visibleStockOutItems = computed(() => {
  if (reasonFilter.value === 'all') {
    return stockOutItems.value
  }

  return stockOutItems.value.filter(item => item.reason === reasonFilter.value)
})
const totalQty = computed(() => visibleStockOutItems.value.reduce((total, item) => total + item.absQty, 0))
const damagedCount = computed(() => visibleStockOutItems.value.filter(item => item.reason === 'DAMAGED').length)
const expiredCount = computed(() => visibleStockOutItems.value.filter(item => item.reason === 'EXPIRED').length)

const stockOutFields = computed<AdminCrudField[]>(() => [
  {
    key: 'ingredientId',
    label: 'Bahan',
    type: 'select',
    required: true,
    options: ingredientOptions.value.map(item => ({
      label: `${item.name} (${item.unitName})`,
      value: item.id,
    })),
    colSpan: 'full',
  },
  {
    key: 'qty',
    label: 'Qty Keluar',
    type: 'number',
    inputmode: 'decimal',
    required: true,
  },
  {
    key: 'reason',
    label: 'Alasan',
    type: 'select',
    required: true,
    options: [
      { label: 'Rusak', value: 'DAMAGED' },
      { label: 'Kedaluwarsa', value: 'EXPIRED' },
      { label: 'Lainnya', value: 'OTHER' },
    ],
  },
  {
    key: 'notes',
    label: 'Catatan',
    type: 'textarea',
    placeholder: 'Contoh: Tumpah di meja racik',
    colSpan: 'full',
  },
])

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Transaksi Keluar',
    value: String(visibleStockOutItems.value.length),
    helper: hasActiveFilter.value ? 'Sesuai filter aktif' : 'Pengeluaran manual',
    tone: 'info',
  },
  {
    id: 'qty',
    label: 'Qty Keluar',
    value: formatNumber(totalQty.value),
    helper: 'Dalam data termuat',
    tone: 'warning',
  },
  {
    id: 'attention',
    label: 'Perlu Perhatian',
    value: String(damagedCount.value + expiredCount.value),
    helper: `${damagedCount.value} rusak, ${expiredCount.value} kedaluwarsa`,
    tone: damagedCount.value + expiredCount.value > 0 ? 'warning' : 'default',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'date', label: 'Waktu', class: 'min-w-44' },
  { key: 'ingredient', label: 'Bahan', class: 'min-w-60' },
  { key: 'reason', label: 'Alasan', class: 'min-w-36' },
  { key: 'quantity', label: 'Qty', align: 'right' },
  { key: 'balance', label: 'Saldo', align: 'right' },
  { key: 'handledBy', label: 'Dicatat Oleh', class: 'min-w-44' },
]

const rows = computed<AdminDataTableRow[]>(() => visibleStockOutItems.value.map(item => ({
  id: item.id,
  cells: {
    date: {
      label: item.date,
      description: item.reasonLabel,
    },
    ingredient: {
      label: item.ingredientName,
      description: item.notes,
    },
    reason: item.reasonLabel,
    quantity: {
      label: item.quantityLabel,
      monospace: true,
    },
    balance: {
      label: item.balanceLabel,
      monospace: true,
    },
    handledBy: item.userName,
  },
})))

const dialogTitle = computed(() => crudMode.value === 'create' ? 'Catat Stok Keluar' : 'Detail Stok Keluar')
const dialogDescription = computed(() => {
  if (crudMode.value === 'detail') {
    return isCrudLoading.value ? 'Memuat detail stok keluar...' : 'Informasi pengeluaran stok manual yang tercatat.'
  }

  return 'Pilih bahan, qty, dan alasan pengeluaran manual. Stok akan berkurang setelah tersimpan.'
})
const detailItems = computed<AdminCrudDetailItem[]>(() => {
  const item = selectedStockOutDetail.value ?? selectedStockOut.value

  if (!item) {
    return []
  }

  return [
    { label: 'Waktu', value: item.date },
    { label: 'Tipe Stok', value: item.stockTypeLabel },
    { label: 'Bahan', value: item.ingredientName, description: `Satuan ${item.unitName}` },
    { label: 'Alasan', value: item.reasonLabel },
    { label: 'Qty Keluar', value: item.quantityLabel, monospace: true },
    { label: 'Saldo Setelah Keluar', value: item.balanceLabel, monospace: true },
    { label: 'Dicatat Oleh', value: item.userName },
    { label: 'Catatan', value: item.notes, description: 'Catatan pengeluaran stok.' },
  ]
})

onMounted(async () => {
  await loadLookupOptions()
  await loadStockOutItems()
})

onBeforeUnmount(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})

watch([search, ingredientFilter, dateFrom, dateTo], () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    void loadStockOutItems()
  }, 300)
})

watch(crudForm, () => {
  formError.value = ''
}, { deep: true })

async function loadLookupOptions() {
  loadError.value = ''

  try {
    const [stockTypes, ingredients] = await Promise.all([
      adminInventoryApi.getStockTypes(),
      adminRawIngredientApi.getRawIngredients({ batch: 1, size: 100 }),
    ])

    stockTypeOptions.value = (Array.isArray(stockTypes) ? stockTypes : []).map(mapAdminInventoryStockTypeRecordToOption)
    ingredientOptions.value = (Array.isArray(ingredients.records) ? ingredients.records : []).map(mapAdminRawIngredientRecordToInventoryOption)
    crudForm.value = createStockOutForm()
  }
  catch (error) {
    loadError.value = getErrorMessage(error, 'Gagal memuat bahan atau tipe stok.')
    stockTypeOptions.value = []
    ingredientOptions.value = []
  }
}

async function loadStockOutItems() {
  const requestId = ++stockOutRequestId
  isLoading.value = true
  loadError.value = ''

  try {
    const records = await loadStockOutMovementRecords()

    if (requestId !== stockOutRequestId) {
      return
    }

    stockOutItems.value = records
      .map(record => hydrateAdminInventoryMovementStockType(record, stockTypeOptions.value))
      .map(mapAdminInventoryMovementRecordToViewItem)
      .filter(item => item.movementKind === 'out')
  }
  catch (error) {
    if (requestId !== stockOutRequestId) {
      return
    }

    loadError.value = getErrorMessage(error, 'Gagal memuat daftar stok keluar.')
    stockOutItems.value = []
  }
  finally {
    if (requestId === stockOutRequestId) {
      isLoading.value = false
    }
  }
}

async function loadStockOutMovementRecords() {
  const baseQuery = {
    batch: 1,
    size: 100,
    search: search.value.trim() || undefined,
    ingredient_id: ingredientFilter.value === 'all' ? undefined : ingredientFilter.value,
    date_from: dateFrom.value || undefined,
    date_to: dateTo.value || undefined,
  }

  if (!stockOutTypeIds.value.length) {
    const result = await adminInventoryApi.getInventoryMovements(baseQuery)

    return Array.isArray(result.records) ? result.records : []
  }

  const results = await Promise.all(stockOutTypeIds.value.map(stockTypeId => adminInventoryApi.getInventoryMovements({
    ...baseQuery,
    stock_type_id: stockTypeId,
  })))

  return dedupeMovementRecords(results.flatMap(result => Array.isArray(result.records) ? result.records : []))
}

function createStockOutForm(): Record<string, string> {
  return {
    ingredientId: ingredientOptions.value[0]?.id ?? '',
    qty: '',
    reason: 'DAMAGED',
    notes: '',
  }
}

function createStockOutPayload(): AdminInventoryStockOutFormPayload | null {
  const payload = {
    ingredientId: crudForm.value.ingredientId ?? '',
    qty: toNumber(crudForm.value.qty),
    reason: getStockOutReason(crudForm.value.reason),
    notes: (crudForm.value.notes ?? '').trim(),
  }
  const validationMessage = getAdminInventoryStockOutValidationMessage(payload)

  if (validationMessage) {
    formError.value = validationMessage
    return null
  }

  return payload
}

function openCreateDialog() {
  selectedStockOut.value = null
  selectedStockOutDetail.value = null
  formError.value = ''
  crudMode.value = 'create'
  crudForm.value = createStockOutForm()
  isCrudDialogOpen.value = true
}

async function openDetailDialog(id: string) {
  const item = stockOutItems.value.find(stockOut => stockOut.id === id)

  if (!item) {
    return
  }

  selectedStockOut.value = item
  selectedStockOutDetail.value = item
  formError.value = ''
  crudMode.value = 'detail'
  isCrudDialogOpen.value = true
  isCrudLoading.value = true

  try {
    const detail = await adminInventoryApi.getInventoryMovementDetail(id)

    selectedStockOutDetail.value = mapAdminInventoryMovementRecordToViewItem(
      hydrateAdminInventoryMovementStockType(detail, stockTypeOptions.value),
    )
  }
  catch {
    selectedStockOutDetail.value = item
  }
  finally {
    isCrudLoading.value = false
  }
}

async function handleCrudSubmit() {
  const payload = createStockOutPayload()

  if (!payload) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    await adminInventoryApi.createStockOut(createAdminInventoryStockOutPayload(payload))
    await loadStockOutItems()
  }, {
    loading: isCrudLoading,
    successMessage: 'Stok keluar berhasil dicatat.',
    errorMessage: 'Gagal mencatat stok keluar.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
}

function dedupeMovementRecords(records: AdminInventoryMovementRecord[]) {
  const recordMap = new Map<string, AdminInventoryMovementRecord>()

  records.forEach((record) => {
    recordMap.set(record.stock_movement_id, record)
  })

  return Array.from(recordMap.values()).sort((first, second) => new Date(second.created_at).getTime() - new Date(first.created_at).getTime())
}

function getStockOutReason(value: string | undefined): AdminInventoryStockOutReason {
  if (value === 'DAMAGED' || value === 'EXPIRED' || value === 'OTHER') {
    return value
  }

  return 'OTHER'
}

function toNumber(value: string | undefined) {
  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : 0
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(value)
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
</script>

<template>
  <div class="flex min-h-full flex-col gap-3 p-3 sm:p-4">
    <AdminPageHeader
      title="Stok Keluar"
      description="Catat pengeluaran stok manual untuk kerusakan, kedaluwarsa, atau kebutuhan koreksi."
    />

    <section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan stok keluar">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <PackageMinus v-if="item.id === 'total'" class="size-4" aria-hidden="true" />
          <ClipboardCheck v-else-if="item.id === 'qty'" class="size-4" aria-hidden="true" />
          <AlertTriangle v-else class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="stock-out-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="stock-out-table-title" class="text-base font-semibold tracking-normal">
            Daftar Stok Keluar
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Pengeluaran manual mengurangi stok bahan tanpa mengubah harga rata-rata.
          </p>
        </div>
      </div>

      <div v-if="loadError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ loadError }}
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="stock-out-search"
        search-label="Cari stok keluar"
        search-placeholder="Cari bahan, alasan, atau catatan"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="stock-out-ingredient-filter" class="sr-only">Filter bahan stok keluar</label>
            <NativeSelect id="stock-out-ingredient-filter" v-model="ingredientFilter" class="w-44" :disabled="isLoading">
              <option value="all">Semua bahan</option>
              <option v-for="ingredient in ingredientOptions" :key="ingredient.id" :value="ingredient.id">
                {{ ingredient.name }}
              </option>
            </NativeSelect>
          </div>

          <div>
            <label for="stock-out-reason-filter" class="sr-only">Filter alasan stok keluar</label>
            <NativeSelect id="stock-out-reason-filter" v-model="reasonFilter" class="w-40" :disabled="isLoading">
              <option value="all">Semua alasan</option>
              <option value="DAMAGED">Rusak</option>
              <option value="EXPIRED">Kedaluwarsa</option>
              <option value="OTHER">Lainnya</option>
            </NativeSelect>
          </div>

          <div class="flex gap-2">
            <label for="stock-out-date-from" class="sr-only">Tanggal mulai stok keluar</label>
            <Input id="stock-out-date-from" v-model="dateFrom" type="date" class="w-36" :disabled="isLoading" />
            <label for="stock-out-date-to" class="sr-only">Tanggal akhir stok keluar</label>
            <Input id="stock-out-date-to" v-model="dateTo" type="date" class="w-36" :disabled="isLoading" />
          </div>
        </template>

        <template #action>
          <Button type="button" size="sm" :disabled="isLoading || !canCreate" @click="openCreateDialog">
            <Plus class="size-4" aria-hidden="true" />
            Catat Keluar
          </Button>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          :actions="['view']"
          label="stok keluar"
          empty-title="Stok keluar tidak ditemukan"
          empty-description="Ubah kata kunci, bahan, alasan, atau rentang tanggal."
          @view="openDetailDialog"
        />
      </div>
    </section>

    <AdminCrudDialog
      v-model:open="isCrudDialogOpen"
      v-model:form="crudForm"
      :mode="crudMode"
      :title="dialogTitle"
      :description="dialogDescription"
      :fields="stockOutFields"
      :detail-items="detailItems"
      :target-name="selectedStockOut?.ingredientName"
      :loading="isCrudLoading"
      :form-error="formError"
      @submit="handleCrudSubmit"
    />
  </div>
</template>
