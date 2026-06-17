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
  AdminInventoryStockInFormPayload,
  AdminInventoryStockTypeOption,
  AdminInventorySupplierOption,
} from '../../types/admin-inventory'
import { ClipboardCheck, PackagePlus, Plus, ReceiptText } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import AdminDataMetric from '../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminCrudDialog from '../../components/organisms/AdminCrudDialog.vue'
import AdminDataTable from '../../components/organisms/AdminDataTable.vue'
import {
  createAdminInventoryStockInPayload,
  formatAdminInventoryCurrency,
  getAdminInventoryStockInValidationMessage,
  hydrateAdminInventoryMovementStockType,
  isStockInTypeName,
  mapAdminInventoryMovementRecordToViewItem,
  mapAdminInventoryStockTypeRecordToOption,
  mapAdminRawIngredientRecordToInventoryOption,
} from '../../utils/admin-inventory'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Stok Masuk',
})

type CrudMode = 'create' | 'detail'

const adminInventoryApi = useAdminInventoryApi()
const adminRawIngredientApi = useAdminRawIngredientApi()
const adminSupplierApi = useAdminSupplierApi()
const { runAdminAction } = useAdminActionFeedback()

const search = ref('')
const ingredientFilter = ref('all')
const supplierFilter = ref('all')
const dateFrom = ref('')
const dateTo = ref('')
const isLoading = ref(false)
const isCrudLoading = ref(false)
const isCrudDialogOpen = ref(false)
const crudMode = ref<CrudMode>('detail')
const loadError = ref('')
const formError = ref('')
const totalRecordCount = ref(0)
const stockInItems = ref<AdminInventoryMovementViewItem[]>([])
const stockTypeOptions = ref<AdminInventoryStockTypeOption[]>([])
const ingredientOptions = ref<AdminInventoryIngredientOption[]>([])
const supplierOptions = ref<AdminInventorySupplierOption[]>([])
const selectedStockIn = ref<AdminInventoryMovementViewItem | null>(null)
const selectedStockInDetail = ref<AdminInventoryMovementViewItem | null>(null)
const crudForm = ref<Record<string, string>>(createStockInForm())

let searchTimer: ReturnType<typeof setTimeout> | null = null
let stockInRequestId = 0

const stockInTypeIds = computed(() => stockTypeOptions.value
  .filter(type => isStockInTypeName(type.name))
  .map(type => type.id))
const canCreate = computed(() => ingredientOptions.value.length > 0 && supplierOptions.value.length > 0)
const hasActiveFilter = computed(() => Boolean(
  search.value.trim()
  || ingredientFilter.value !== 'all'
  || supplierFilter.value !== 'all'
  || dateFrom.value
  || dateTo.value,
))
const totalQty = computed(() => stockInItems.value.reduce((total, item) => total + item.absQty, 0))
const totalValue = computed(() => stockInItems.value.reduce((total, item) => total + item.totalCost, 0))
const supplierCount = computed(() => new Set(stockInItems.value.map(item => item.supplierId).filter(Boolean)).size)

const stockInFields = computed<AdminCrudField[]>(() => [
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
    key: 'supplierId',
    label: 'Pemasok',
    type: 'select',
    required: true,
    options: supplierOptions.value.map(item => ({
      label: item.name,
      value: item.id,
    })),
    colSpan: 'full',
  },
  {
    key: 'qty',
    label: 'Qty Masuk',
    type: 'number',
    inputmode: 'decimal',
    required: true,
  },
  {
    key: 'unitCost',
    label: 'Harga Satuan',
    type: 'number',
    inputmode: 'decimal',
    required: true,
  },
  {
    key: 'notes',
    label: 'Catatan',
    type: 'textarea',
    placeholder: 'Nomor nota atau catatan penerimaan',
    colSpan: 'full',
  },
])

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Transaksi Masuk',
    value: String(totalRecordCount.value),
    helper: hasActiveFilter.value ? 'Sesuai filter aktif' : 'Penerimaan tercatat',
    tone: 'info',
  },
  {
    id: 'qty',
    label: 'Qty Diterima',
    value: formatNumber(totalQty.value),
    helper: 'Dalam data termuat',
    tone: 'success',
  },
  {
    id: 'value',
    label: 'Nilai Pembelian',
    value: formatAdminInventoryCurrency(totalValue.value),
    helper: `${supplierCount.value} pemasok terkait`,
    tone: 'default',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'date', label: 'Waktu', class: 'min-w-44' },
  { key: 'ingredient', label: 'Bahan', class: 'min-w-60' },
  { key: 'supplier', label: 'Pemasok', class: 'min-w-48' },
  { key: 'quantity', label: 'Qty', align: 'right' },
  { key: 'unitCost', label: 'Harga Satuan', align: 'right' },
  { key: 'totalCost', label: 'Total', align: 'right' },
]

const rows = computed<AdminDataTableRow[]>(() => stockInItems.value.map(item => ({
  id: item.id,
  cells: {
    date: {
      label: item.date,
      description: item.supplierName,
    },
    ingredient: {
      label: item.ingredientName,
      description: item.notes,
    },
    supplier: item.supplierName,
    quantity: {
      label: item.quantityLabel,
      description: `Saldo ${item.balanceLabel}`,
      monospace: true,
    },
    unitCost: {
      label: item.unitCostLabel,
      monospace: true,
    },
    totalCost: {
      label: item.totalCostLabel,
      monospace: true,
    },
  },
})))

const dialogTitle = computed(() => crudMode.value === 'create' ? 'Catat Stok Masuk' : 'Detail Stok Masuk')
const dialogDescription = computed(() => {
  if (crudMode.value === 'detail') {
    return isCrudLoading.value ? 'Memuat detail stok masuk...' : 'Informasi penerimaan stok yang tercatat.'
  }

  return 'Pilih bahan dan pemasok, lalu isi kuantitas dan harga beli per satuan.'
})
const detailItems = computed<AdminCrudDetailItem[]>(() => {
  const item = selectedStockInDetail.value ?? selectedStockIn.value

  if (!item) {
    return []
  }

  return [
    { label: 'Waktu', value: item.date },
    { label: 'Pemasok', value: item.supplierName },
    { label: 'Bahan', value: item.ingredientName, description: `Satuan ${item.unitName}` },
    { label: 'Qty Masuk', value: item.quantityLabel, monospace: true },
    { label: 'Harga Satuan', value: item.unitCostLabel, monospace: true },
    { label: 'Total Nilai', value: item.totalCostLabel, monospace: true },
    { label: 'Saldo Setelah Masuk', value: item.balanceLabel, monospace: true },
    { label: 'Dicatat Oleh', value: item.userName },
    { label: 'Catatan', value: item.notes, description: 'Catatan penerimaan stok.' },
  ]
})

onMounted(async () => {
  await loadLookupOptions()
  await loadStockInItems()
})

onBeforeUnmount(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})

watch([search, ingredientFilter, supplierFilter, dateFrom, dateTo], () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    void loadStockInItems()
  }, 300)
})

watch(crudForm, () => {
  formError.value = ''
}, { deep: true })

async function loadLookupOptions() {
  loadError.value = ''

  try {
    const [stockTypes, ingredients, suppliers] = await Promise.all([
      adminInventoryApi.getStockTypes(),
      adminRawIngredientApi.getRawIngredients({ batch: 1, size: 100 }),
      adminSupplierApi.getSuppliers({ batch: 1, size: 100 }),
    ])

    stockTypeOptions.value = (Array.isArray(stockTypes) ? stockTypes : []).map(mapAdminInventoryStockTypeRecordToOption)
    ingredientOptions.value = (Array.isArray(ingredients.records) ? ingredients.records : []).map(mapAdminRawIngredientRecordToInventoryOption)
    supplierOptions.value = (Array.isArray(suppliers.records) ? suppliers.records : []).map(item => ({
      id: item.supplier_id,
      name: item.name,
    }))
    crudForm.value = createStockInForm()
  }
  catch (error) {
    loadError.value = getErrorMessage(error, 'Gagal memuat bahan, pemasok, atau tipe stok.')
    stockTypeOptions.value = []
    ingredientOptions.value = []
    supplierOptions.value = []
  }
}

async function loadStockInItems() {
  const requestId = ++stockInRequestId
  isLoading.value = true
  loadError.value = ''

  try {
    const records = await loadStockInMovementRecords()

    if (requestId !== stockInRequestId) {
      return
    }

    stockInItems.value = records
      .map(record => hydrateAdminInventoryMovementStockType(record, stockTypeOptions.value))
      .map(mapAdminInventoryMovementRecordToViewItem)
      .filter(item => item.movementKind === 'in')
    totalRecordCount.value = stockInItems.value.length
  }
  catch (error) {
    if (requestId !== stockInRequestId) {
      return
    }

    loadError.value = getErrorMessage(error, 'Gagal memuat daftar stok masuk.')
    stockInItems.value = []
    totalRecordCount.value = 0
  }
  finally {
    if (requestId === stockInRequestId) {
      isLoading.value = false
    }
  }
}

async function loadStockInMovementRecords() {
  const baseQuery = {
    batch: 1,
    size: 100,
    search: search.value.trim() || undefined,
    ingredient_id: ingredientFilter.value === 'all' ? undefined : ingredientFilter.value,
    supplier_id: supplierFilter.value === 'all' ? undefined : supplierFilter.value,
    date_from: dateFrom.value || undefined,
    date_to: dateTo.value || undefined,
  }

  if (!stockInTypeIds.value.length) {
    const result = await adminInventoryApi.getInventoryMovements(baseQuery)

    return Array.isArray(result.records) ? result.records : []
  }

  const results = await Promise.all(stockInTypeIds.value.map(stockTypeId => adminInventoryApi.getInventoryMovements({
    ...baseQuery,
    stock_type_id: stockTypeId,
  })))

  return dedupeMovementRecords(results.flatMap(result => Array.isArray(result.records) ? result.records : []))
}

function createStockInForm(): Record<string, string> {
  return {
    ingredientId: ingredientOptions.value[0]?.id ?? '',
    supplierId: supplierOptions.value[0]?.id ?? '',
    qty: '',
    unitCost: '',
    notes: '',
  }
}

function createStockInPayload(): AdminInventoryStockInFormPayload | null {
  const payload = {
    ingredientId: crudForm.value.ingredientId ?? '',
    supplierId: crudForm.value.supplierId ?? '',
    qty: toNumber(crudForm.value.qty),
    unitCost: toNumber(crudForm.value.unitCost),
    notes: (crudForm.value.notes ?? '').trim(),
  }
  const validationMessage = getAdminInventoryStockInValidationMessage(payload)

  if (validationMessage) {
    formError.value = validationMessage
    return null
  }

  return payload
}

function openCreateDialog() {
  selectedStockIn.value = null
  selectedStockInDetail.value = null
  formError.value = ''
  crudMode.value = 'create'
  crudForm.value = createStockInForm()
  isCrudDialogOpen.value = true
}

async function openDetailDialog(id: string) {
  const item = stockInItems.value.find(stockIn => stockIn.id === id)

  if (!item) {
    return
  }

  selectedStockIn.value = item
  selectedStockInDetail.value = item
  formError.value = ''
  crudMode.value = 'detail'
  isCrudDialogOpen.value = true
  isCrudLoading.value = true

  try {
    const detail = await adminInventoryApi.getInventoryMovementDetail(id)

    selectedStockInDetail.value = mapAdminInventoryMovementRecordToViewItem(
      hydrateAdminInventoryMovementStockType(detail, stockTypeOptions.value),
    )
  }
  catch {
    selectedStockInDetail.value = item
  }
  finally {
    isCrudLoading.value = false
  }
}

async function handleCrudSubmit() {
  const payload = createStockInPayload()

  if (!payload) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    await adminInventoryApi.createStockIn(createAdminInventoryStockInPayload(payload))
    await loadStockInItems()
  }, {
    loading: isCrudLoading,
    successMessage: 'Stok masuk berhasil dicatat.',
    errorMessage: 'Gagal mencatat stok masuk.',
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
      title="Stok Masuk"
      description="Catat penerimaan bahan dari pemasok dan pantau nilai pembelian yang menambah stok."
    />

    <section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan stok masuk">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <PackagePlus v-if="item.id === 'total'" class="size-4" aria-hidden="true" />
          <ClipboardCheck v-else-if="item.id === 'qty'" class="size-4" aria-hidden="true" />
          <ReceiptText v-else class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="stock-in-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="stock-in-table-title" class="text-base font-semibold tracking-normal">
            Daftar Stok Masuk
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Penerimaan bahan memperbarui stok dan harga rata-rata bahan di backend.
          </p>
        </div>
      </div>

      <div v-if="loadError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ loadError }}
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="stock-in-search"
        search-label="Cari stok masuk"
        search-placeholder="Cari bahan, pemasok, atau catatan"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="stock-in-ingredient-filter" class="sr-only">Filter bahan stok masuk</label>
            <NativeSelect id="stock-in-ingredient-filter" v-model="ingredientFilter" class="w-44" :disabled="isLoading">
              <option value="all">Semua bahan</option>
              <option v-for="ingredient in ingredientOptions" :key="ingredient.id" :value="ingredient.id">
                {{ ingredient.name }}
              </option>
            </NativeSelect>
          </div>

          <div>
            <label for="stock-in-supplier-filter" class="sr-only">Filter pemasok stok masuk</label>
            <NativeSelect id="stock-in-supplier-filter" v-model="supplierFilter" class="w-44" :disabled="isLoading">
              <option value="all">Semua pemasok</option>
              <option v-for="supplier in supplierOptions" :key="supplier.id" :value="supplier.id">
                {{ supplier.name }}
              </option>
            </NativeSelect>
          </div>

          <div class="flex gap-2">
            <label for="stock-in-date-from" class="sr-only">Tanggal mulai stok masuk</label>
            <Input id="stock-in-date-from" v-model="dateFrom" type="date" class="w-36" :disabled="isLoading" />
            <label for="stock-in-date-to" class="sr-only">Tanggal akhir stok masuk</label>
            <Input id="stock-in-date-to" v-model="dateTo" type="date" class="w-36" :disabled="isLoading" />
          </div>
        </template>

        <template #action>
          <Button type="button" size="sm" :disabled="isLoading || !canCreate" @click="openCreateDialog">
            <Plus class="size-4" aria-hidden="true" />
            Catat Masuk
          </Button>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          :actions="['view']"
          label="stok masuk"
          empty-title="Stok masuk tidak ditemukan"
          empty-description="Ubah kata kunci, bahan, pemasok, atau rentang tanggal."
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
      :fields="stockInFields"
      :detail-items="detailItems"
      :target-name="selectedStockIn?.ingredientName"
      :loading="isCrudLoading"
      :form-error="formError"
      @submit="handleCrudSubmit"
    />
  </div>
</template>
