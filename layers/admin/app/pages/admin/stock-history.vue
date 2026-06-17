<script setup lang="ts">
import type {
  AdminCrudDetailItem,
  AdminDataMetric as AdminDataMetricItem,
  AdminDataTableColumn,
  AdminDataTableRow,
} from '../../types/admin-management'
import type {
  AdminInventoryIngredientOption,
  AdminInventoryMovementViewItem,
  AdminInventoryStockTypeOption,
  AdminInventorySupplierOption,
} from '../../types/admin-inventory'
import { History, PackageMinus, PackagePlus, SlidersHorizontal } from 'lucide-vue-next'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import AdminDataMetric from '../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminCrudDialog from '../../components/organisms/AdminCrudDialog.vue'
import AdminDataTable from '../../components/organisms/AdminDataTable.vue'
import {
  hydrateAdminInventoryMovementStockType,
  mapAdminInventoryIngredientOptionRecordToOption,
  mapAdminInventoryMovementRecordToViewItem,
  mapAdminInventoryStockTypeRecordToOption,
} from '../../utils/admin-inventory'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Riwayat Stok',
})

const adminInventoryApi = useAdminInventoryApi()
const adminSupplierApi = useAdminSupplierApi()

const search = ref('')
const typeFilter = ref('all')
const ingredientFilter = ref('all')
const supplierFilter = ref('all')
const dateFrom = ref('')
const dateTo = ref('')
const isLoading = ref(false)
const isDetailLoading = ref(false)
const isDetailDialogOpen = ref(false)
const loadError = ref('')
const totalRecordCount = ref(0)
const stockHistory = ref<AdminInventoryMovementViewItem[]>([])
const stockTypeOptions = ref<AdminInventoryStockTypeOption[]>([])
const ingredientOptions = ref<AdminInventoryIngredientOption[]>([])
const supplierOptions = ref<AdminInventorySupplierOption[]>([])
const selectedHistory = ref<AdminInventoryMovementViewItem | null>(null)
const selectedHistoryDetail = ref<AdminInventoryMovementViewItem | null>(null)
const detailForm = ref<Record<string, string>>({})

let searchTimer: ReturnType<typeof setTimeout> | null = null
let historyRequestId = 0

const hasActiveFilter = computed(() => Boolean(
  search.value.trim()
  || typeFilter.value !== 'all'
  || ingredientFilter.value !== 'all'
  || supplierFilter.value !== 'all'
  || dateFrom.value
  || dateTo.value,
))
const incomingCount = computed(() => stockHistory.value.filter(item => item.movementKind === 'in').length)
const outgoingCount = computed(() => stockHistory.value.filter(item => item.movementKind === 'out' || item.movementKind === 'sale').length)

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Total Mutasi',
    value: String(totalRecordCount.value),
    helper: hasActiveFilter.value ? 'Sesuai filter aktif' : 'Perubahan stok tercatat',
    tone: 'info',
  },
  {
    id: 'in',
    label: 'Stok Masuk',
    value: String(incomingCount.value),
    helper: 'Dalam data termuat',
    tone: 'success',
  },
  {
    id: 'out',
    label: 'Stok Keluar',
    value: String(outgoingCount.value),
    helper: 'Manual atau penjualan',
    tone: 'warning',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'date', label: 'Waktu', class: 'min-w-44' },
  { key: 'ingredient', label: 'Bahan', class: 'min-w-60' },
  { key: 'type', label: 'Tipe', class: 'min-w-36' },
  { key: 'source', label: 'Sumber', class: 'min-w-48' },
  { key: 'quantity', label: 'Jumlah', align: 'right' },
  { key: 'balance', label: 'Saldo', align: 'right' },
]

const rows = computed<AdminDataTableRow[]>(() => stockHistory.value.map(item => ({
  id: item.id,
  cells: {
    date: {
      label: item.date,
      description: item.stockTypeLabel,
    },
    ingredient: {
      label: item.ingredientName,
      description: item.notes,
    },
    type: {
      label: item.typeLabel,
      tone: item.typeTone,
    },
    source: item.source,
    quantity: {
      label: item.quantityLabel,
      monospace: true,
    },
    balance: {
      label: item.balanceLabel,
      monospace: true,
    },
  },
})))

const detailItems = computed<AdminCrudDetailItem[]>(() => {
  const item = selectedHistoryDetail.value ?? selectedHistory.value

  if (!item) {
    return []
  }

  return [
    { label: 'Waktu', value: item.date },
    { label: 'Bahan', value: item.ingredientName, description: `Satuan ${item.unitName}` },
    { label: 'Tipe', value: item.typeLabel, tone: item.typeTone },
    { label: 'Sumber', value: item.source },
    { label: 'Pemasok', value: item.supplierName },
    { label: 'Dicatat Oleh', value: item.userName },
    { label: 'Jumlah', value: item.quantityLabel, monospace: true },
    { label: 'Saldo Setelah Mutasi', value: item.balanceLabel, monospace: true },
    { label: 'Harga Satuan', value: item.unitCostLabel, monospace: true },
    { label: 'Total Nilai', value: item.totalCostLabel, monospace: true },
    { label: 'Catatan', value: item.notes, description: 'Catatan yang tersimpan pada riwayat stok.' },
  ]
})

onMounted(async () => {
  await loadFilterOptions()
  await loadStockHistory()
})

onBeforeUnmount(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})

watch([search, typeFilter, ingredientFilter, supplierFilter, dateFrom, dateTo], () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    void loadStockHistory()
  }, 300)
})

async function loadFilterOptions() {
  try {
    const [types, ingredients, suppliers] = await Promise.all([
      adminInventoryApi.getStockTypes(),
      adminInventoryApi.getIngredientOptions(),
      adminSupplierApi.getSuppliers({ batch: 1, size: 100 }),
    ])

    stockTypeOptions.value = (Array.isArray(types) ? types : []).map(mapAdminInventoryStockTypeRecordToOption)
    ingredientOptions.value = (Array.isArray(ingredients) ? ingredients : []).map(mapAdminInventoryIngredientOptionRecordToOption)
    supplierOptions.value = (Array.isArray(suppliers.records) ? suppliers.records : []).map(item => ({
      id: item.supplier_id,
      name: item.name,
    }))
  }
  catch (error) {
    loadError.value = getErrorMessage(error, 'Gagal memuat pilihan filter riwayat stok.')
  }
}

async function loadStockHistory() {
  const requestId = ++historyRequestId
  isLoading.value = true
  loadError.value = ''

  try {
    const result = await adminInventoryApi.getInventoryMovements({
      batch: 1,
      size: 100,
      search: search.value.trim() || undefined,
      stock_type_id: typeFilter.value === 'all' ? undefined : typeFilter.value,
      ingredient_id: ingredientFilter.value === 'all' ? undefined : ingredientFilter.value,
      supplier_id: supplierFilter.value === 'all' ? undefined : supplierFilter.value,
      date_from: dateFrom.value || undefined,
      date_to: dateTo.value || undefined,
    })
    const records = Array.isArray(result.records) ? result.records : []

    if (requestId !== historyRequestId) {
      return
    }

    stockHistory.value = records
      .map(record => hydrateAdminInventoryMovementStockType(record, stockTypeOptions.value))
      .map(mapAdminInventoryMovementRecordToViewItem)
    totalRecordCount.value = result.page?.total_record_count ?? records.length
  }
  catch (error) {
    if (requestId !== historyRequestId) {
      return
    }

    loadError.value = getErrorMessage(error, 'Gagal memuat riwayat stok.')
    stockHistory.value = []
    totalRecordCount.value = 0
  }
  finally {
    if (requestId === historyRequestId) {
      isLoading.value = false
    }
  }
}

async function openDetailDialog(id: string) {
  const item = stockHistory.value.find(history => history.id === id)

  if (!item) {
    return
  }

  selectedHistory.value = item
  selectedHistoryDetail.value = item
  isDetailDialogOpen.value = true
  isDetailLoading.value = true

  try {
    const detail = await adminInventoryApi.getInventoryMovementDetail(id)

    selectedHistoryDetail.value = mapAdminInventoryMovementRecordToViewItem(
      hydrateAdminInventoryMovementStockType(detail, stockTypeOptions.value),
    )
  }
  catch {
    selectedHistoryDetail.value = item
  }
  finally {
    isDetailLoading.value = false
  }
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
      title="Riwayat Stok"
      description="Pantau audit keluar-masuk stok bahan, pemasok, tipe mutasi, dan saldo akhir."
    />

    <section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan riwayat stok">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <History v-if="item.id === 'total'" class="size-4" aria-hidden="true" />
          <PackagePlus v-else-if="item.id === 'in'" class="size-4" aria-hidden="true" />
          <PackageMinus v-else class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="stock-history-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="stock-history-table-title" class="text-base font-semibold tracking-normal">
            Tabel Riwayat Stok
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Filter riwayat berdasarkan bahan, pemasok, tipe pergerakan, dan rentang tanggal.
          </p>
        </div>
      </div>

      <div v-if="loadError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ loadError }}
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="stock-history-search"
        search-label="Cari riwayat stok"
        search-placeholder="Cari bahan atau catatan"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="stock-history-type-filter" class="sr-only">Filter tipe mutasi stok</label>
            <NativeSelect id="stock-history-type-filter" v-model="typeFilter" class="w-40" :disabled="isLoading">
              <option value="all">Semua tipe</option>
              <option v-for="type in stockTypeOptions" :key="type.id" :value="type.id">
                {{ type.label }}
              </option>
            </NativeSelect>
          </div>

          <div>
            <label for="stock-history-ingredient-filter" class="sr-only">Filter bahan</label>
            <NativeSelect id="stock-history-ingredient-filter" v-model="ingredientFilter" class="w-44" :disabled="isLoading">
              <option value="all">Semua bahan</option>
              <option v-for="ingredient in ingredientOptions" :key="ingredient.id" :value="ingredient.id">
                {{ ingredient.name }}
              </option>
            </NativeSelect>
          </div>

          <div>
            <label for="stock-history-supplier-filter" class="sr-only">Filter pemasok</label>
            <NativeSelect id="stock-history-supplier-filter" v-model="supplierFilter" class="w-44" :disabled="isLoading">
              <option value="all">Semua pemasok</option>
              <option v-for="supplier in supplierOptions" :key="supplier.id" :value="supplier.id">
                {{ supplier.name }}
              </option>
            </NativeSelect>
          </div>

          <div class="flex items-center gap-2">
            <SlidersHorizontal class="size-4 text-muted-foreground" aria-hidden="true" />
            <label for="stock-history-date-from" class="sr-only">Tanggal mulai</label>
            <Input id="stock-history-date-from" v-model="dateFrom" type="date" class="w-36" :disabled="isLoading" />
            <label for="stock-history-date-to" class="sr-only">Tanggal akhir</label>
            <Input id="stock-history-date-to" v-model="dateTo" type="date" class="w-36" :disabled="isLoading" />
          </div>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          :actions="['view']"
          label="mutasi stok"
          empty-title="Riwayat stok tidak ditemukan"
          empty-description="Ubah kata kunci atau filter riwayat stok."
          @view="openDetailDialog"
        />
      </div>
    </section>

    <AdminCrudDialog
      v-model:open="isDetailDialogOpen"
      v-model:form="detailForm"
      mode="detail"
      title="Detail Riwayat Stok"
      :description="isDetailLoading ? 'Memuat detail riwayat stok...' : 'Informasi mutasi stok yang tercatat.'"
      :detail-items="detailItems"
      :loading="isDetailLoading"
    />
  </div>
</template>
