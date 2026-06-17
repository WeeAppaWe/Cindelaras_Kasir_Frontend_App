<script setup lang="ts">
import type {
  AdminCrudDetailItem,
  AdminCrudField,
  AdminDataMetric as AdminDataMetricItem,
  AdminDataTableColumn,
  AdminDataTableRow,
} from '../../types/admin-management'
import type {
  AdminRawIngredientFormPayload,
  AdminRawIngredientUnitOption,
  AdminRawIngredientViewItem,
} from '../../types/admin-ingredient'
import { AlertTriangle, Boxes, PackageCheck, Plus, WalletCards } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import AdminDataMetric from '../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminCrudDialog from '../../components/organisms/AdminCrudDialog.vue'
import AdminDataTable from '../../components/organisms/AdminDataTable.vue'
import {
  createAdminRawIngredientCreatePayload,
  createAdminRawIngredientUpdatePayload,
  formatAdminIngredientCurrency,
  getAdminRawIngredientValidationMessage,
  mapAdminRawIngredientRecordToViewItem,
  mapAdminRawIngredientUnitRecordToOption,
} from '../../utils/admin-ingredient'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Bahan Baku',
})

type CrudMode = 'create' | 'detail' | 'edit' | 'delete'
type StockFilter = 'all' | 'safe' | 'low' | 'critical'

const adminRawIngredientApi = useAdminRawIngredientApi()
const { runAdminAction } = useAdminActionFeedback()

const search = ref('')
const stockFilter = ref<StockFilter>('all')
const unitFilter = ref('all')
const isLoading = ref(false)
const isCrudLoading = ref(false)
const isCrudDialogOpen = ref(false)
const crudMode = ref<CrudMode>('detail')
const loadError = ref('')
const formError = ref('')
const totalRecordCount = ref(0)
const lowStockCount = ref(0)
const rawIngredients = ref<AdminRawIngredientViewItem[]>([])
const unitOptions = ref<AdminRawIngredientUnitOption[]>([])
const selectedIngredient = ref<AdminRawIngredientViewItem | null>(null)
const selectedIngredientDetail = ref<AdminRawIngredientViewItem | null>(null)
const crudForm = ref<Record<string, string>>(createIngredientForm())

let searchTimer: ReturnType<typeof setTimeout> | null = null
let ingredientRequestId = 0

const hasSearch = computed(() => Boolean(search.value.trim()))
const canMutate = computed(() => unitOptions.value.length > 0)
const visibleIngredients = computed(() => {
  if (stockFilter.value === 'all') {
    return rawIngredients.value
  }

  return rawIngredients.value.filter(item => item.statusKey === stockFilter.value)
})
const visibleRecordCount = computed(() => stockFilter.value === 'all' ? totalRecordCount.value : visibleIngredients.value.length)
const inventoryValue = computed(() => visibleIngredients.value.reduce((total, item) => total + item.inventoryValue, 0))
const safeStockCount = computed(() => rawIngredients.value.filter(item => item.statusKey === 'safe').length)
const attentionStockCount = computed(() => rawIngredients.value.filter(item => item.statusKey !== 'safe').length)

const ingredientFields = computed<AdminCrudField[]>(() => {
  const fields: AdminCrudField[] = [
    {
      key: 'name',
      label: 'Nama Bahan',
      placeholder: 'Contoh: Gula Pasir',
      required: true,
      colSpan: 'full',
    },
    {
      key: 'unitId',
      label: 'Satuan',
      type: 'select',
      required: true,
      options: unitOptions.value.map(unit => ({ label: unit.name, value: unit.id })),
    },
  ]

  if (crudMode.value === 'create') {
    fields.push({
      key: 'stockQty',
      label: 'Stok Awal',
      type: 'number',
      inputmode: 'decimal',
      required: true,
    })
  }

  fields.push(
    {
      key: 'minStock',
      label: 'Stok Minimum',
      type: 'number',
      inputmode: 'decimal',
      required: true,
    },
    {
      key: 'avgCost',
      label: 'Harga Rata-Rata',
      type: 'number',
      inputmode: 'decimal',
      required: true,
    },
  )

  return fields
})

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Total Bahan',
    value: String(visibleRecordCount.value),
    helper: hasSearch.value || unitFilter.value !== 'all' || stockFilter.value !== 'all' ? 'Sesuai filter aktif' : 'Bahan baku aktif',
    tone: 'info',
  },
  {
    id: 'safe',
    label: 'Stok Aman',
    value: String(safeStockCount.value),
    helper: 'Di atas minimum',
    tone: 'success',
  },
  {
    id: 'attention',
    label: 'Perlu Restock',
    value: String(lowStockCount.value || attentionStockCount.value),
    helper: 'Stok <= minimum',
    tone: (lowStockCount.value || attentionStockCount.value) > 0 ? 'warning' : 'default',
  },
  {
    id: 'value',
    label: 'Nilai Stok',
    value: formatAdminIngredientCurrency(inventoryValue.value),
    helper: 'Stok x avg cost',
    tone: 'default',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'name', label: 'Bahan', class: 'min-w-64' },
  { key: 'stock', label: 'Stok', align: 'right' },
  { key: 'minimumStock', label: 'Minimum', align: 'right' },
  { key: 'avgCost', label: 'Harga Rata-rata', align: 'right' },
  { key: 'inventoryValue', label: 'Nilai Stok', align: 'right' },
  { key: 'status', label: 'Status' },
]

const rows = computed<AdminDataTableRow[]>(() => visibleIngredients.value.map(item => ({
  id: item.id,
  cells: {
    name: {
      label: item.name,
      description: `Satuan ${item.unitName}`,
    },
    stock: {
      label: item.stockLabel,
      monospace: true,
    },
    minimumStock: {
      label: item.minStockLabel,
      monospace: true,
    },
    avgCost: {
      label: item.avgCostLabel,
      monospace: true,
    },
    inventoryValue: {
      label: item.inventoryValueLabel,
      monospace: true,
    },
    status: {
      label: item.statusLabel,
      tone: item.statusTone,
    },
  },
})))

const dialogTitle = computed(() => {
  if (crudMode.value === 'create') {
    return 'Tambah Bahan Baku'
  }

  if (crudMode.value === 'edit') {
    return 'Ubah Bahan Baku'
  }

  if (crudMode.value === 'delete') {
    return 'Hapus Bahan Baku'
  }

  return 'Detail Bahan Baku'
})
const dialogDescription = computed(() => {
  if (crudMode.value === 'delete') {
    return 'Bahan baku akan dihapus secara soft delete oleh backend.'
  }

  if (crudMode.value === 'detail') {
    return isCrudLoading.value ? 'Memuat detail bahan baku...' : 'Informasi bahan baku yang tercatat di backend.'
  }

  if (crudMode.value === 'edit') {
    return 'Stok aktual tidak diubah dari form ini. Perubahan stok dilakukan melalui stok masuk atau stok opname.'
  }

  return 'Stok awal hanya dipakai saat membuat bahan baku baru.'
})
const detailItems = computed<AdminCrudDetailItem[]>(() => {
  const item = selectedIngredientDetail.value ?? selectedIngredient.value

  if (!item) {
    return []
  }

  return [
    { label: 'Nama Bahan', value: item.name },
    { label: 'Satuan', value: item.unitName },
    { label: 'Stok Saat Ini', value: item.stockLabel },
    { label: 'Stok Minimum', value: item.minStockLabel },
    { label: 'Harga Rata-rata', value: item.avgCostLabel, monospace: true },
    { label: 'Nilai Stok', value: item.inventoryValueLabel, monospace: true },
    { label: 'Status Stok', value: item.statusLabel, tone: item.statusTone },
    { label: 'Dibuat', value: item.createdAt },
    { label: 'Diperbarui', value: item.updatedAt, description: item.hasBeenUpdated ? 'Perubahan terakhir dari backend.' : 'Belum pernah diperbarui.' },
  ]
})

onMounted(async () => {
  await loadUnitOptions()
  await loadRawIngredients()
  void loadLowStockCount()
})

onBeforeUnmount(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})

watch([search, stockFilter, unitFilter], () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    loadRawIngredients()
  }, 300)
})

watch(crudForm, () => {
  formError.value = ''
}, { deep: true })

async function loadRawIngredients() {
  const requestId = ++ingredientRequestId
  isLoading.value = true
  loadError.value = ''

  try {
    const result = await adminRawIngredientApi.getRawIngredients({
      batch: 1,
      size: 100,
      search: search.value.trim() || undefined,
      unit_id: unitFilter.value === 'all' ? undefined : unitFilter.value,
      low_stock: stockFilter.value === 'low' || stockFilter.value === 'critical' ? true : undefined,
    })
    const records = Array.isArray(result.records) ? result.records : []

    if (requestId !== ingredientRequestId) {
      return
    }

    rawIngredients.value = records.map(mapAdminRawIngredientRecordToViewItem)
    totalRecordCount.value = result.page?.total_record_count ?? records.length
  }
  catch (error) {
    if (requestId !== ingredientRequestId) {
      return
    }

    loadError.value = getErrorMessage(error, 'Gagal memuat daftar bahan baku.')
    rawIngredients.value = []
    totalRecordCount.value = 0
  }
  finally {
    if (requestId === ingredientRequestId) {
      isLoading.value = false
    }
  }
}

async function loadLowStockCount() {
  try {
    const result = await adminRawIngredientApi.getLowStockRawIngredients()

    lowStockCount.value = Number(result.total_count ?? 0)
  }
  catch {
    lowStockCount.value = 0
  }
}

async function loadUnitOptions() {
  try {
    const result = await adminRawIngredientApi.getRawIngredientUnitOptions()
    const records = Array.isArray(result) ? result : []

    unitOptions.value = records.map(mapAdminRawIngredientUnitRecordToOption)
  }
  catch (error) {
    loadError.value = getErrorMessage(error, 'Gagal memuat pilihan satuan ukur.')
    unitOptions.value = []
  }
}

function createIngredientForm(item?: AdminRawIngredientViewItem): Record<string, string> {
  return {
    name: item?.name ?? '',
    unitId: item?.unitId || unitOptions.value[0]?.id || '',
    stockQty: String(item?.stockQty ?? 0),
    minStock: String(item?.minStock ?? 0),
    avgCost: String(item?.avgCost ?? 0),
  }
}

function createIngredientPayload(): AdminRawIngredientFormPayload | null {
  const payload = {
    name: (crudForm.value.name ?? '').trim(),
    unitId: crudForm.value.unitId ?? '',
    stockQty: toNumber(crudForm.value.stockQty),
    minStock: toNumber(crudForm.value.minStock),
    avgCost: toNumber(crudForm.value.avgCost),
  }
  const validationMessage = getAdminRawIngredientValidationMessage(payload)

  if (validationMessage) {
    formError.value = validationMessage
    return null
  }

  return payload
}

function findIngredient(id: string) {
  return rawIngredients.value.find(item => item.id === id) ?? null
}

function openCreateDialog() {
  selectedIngredient.value = null
  selectedIngredientDetail.value = null
  formError.value = ''
  crudMode.value = 'create'
  crudForm.value = createIngredientForm()
  isCrudDialogOpen.value = true
}

async function openDetailDialog(id: string) {
  const item = findIngredient(id)

  if (!item) {
    return
  }

  selectedIngredient.value = item
  selectedIngredientDetail.value = item
  formError.value = ''
  crudMode.value = 'detail'
  isCrudDialogOpen.value = true
  isCrudLoading.value = true

  try {
    const detail = await adminRawIngredientApi.getRawIngredientDetail(id)
    selectedIngredientDetail.value = mapAdminRawIngredientRecordToViewItem(detail)
  }
  catch {
    selectedIngredientDetail.value = item
  }
  finally {
    isCrudLoading.value = false
  }
}

function openEditDialog(id: string) {
  const item = findIngredient(id)

  if (!item) {
    return
  }

  selectedIngredient.value = item
  selectedIngredientDetail.value = item
  formError.value = ''
  crudMode.value = 'edit'
  crudForm.value = createIngredientForm(item)
  isCrudDialogOpen.value = true
}

function openDeleteDialog(id: string) {
  selectedIngredient.value = findIngredient(id)
  selectedIngredientDetail.value = selectedIngredient.value
  formError.value = ''
  crudMode.value = 'delete'
  isCrudDialogOpen.value = Boolean(selectedIngredient.value)
}

async function handleCrudSubmit() {
  const payload = createIngredientPayload()

  if (!payload) {
    return
  }

  const successMessage = crudMode.value === 'create'
    ? 'Bahan baku berhasil ditambahkan.'
    : 'Bahan baku berhasil diperbarui.'

  const succeeded = await runAdminAction(async () => {
    if (crudMode.value === 'create') {
      await adminRawIngredientApi.createRawIngredient(createAdminRawIngredientCreatePayload(payload))
      await reloadIngredientData()
      return
    }

    if (crudMode.value === 'edit' && selectedIngredient.value) {
      await adminRawIngredientApi.updateRawIngredient(
        selectedIngredient.value.id,
        createAdminRawIngredientUpdatePayload(payload),
      )
      await reloadIngredientData()
    }
  }, {
    loading: isCrudLoading,
    successMessage,
    errorMessage: 'Gagal menyimpan bahan baku.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
}

async function handleDelete() {
  if (!selectedIngredient.value) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    await adminRawIngredientApi.deleteRawIngredient(selectedIngredient.value!.id)
    await reloadIngredientData()
  }, {
    loading: isCrudLoading,
    successMessage: 'Bahan baku berhasil dihapus.',
    errorMessage: 'Gagal menghapus bahan baku.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
}

async function reloadIngredientData() {
  await loadRawIngredients()
  await loadLowStockCount()
}

function getMetricIcon(metricId: string) {
  if (metricId === 'total') {
    return Boxes
  }

  if (metricId === 'safe') {
    return PackageCheck
  }

  if (metricId === 'value') {
    return WalletCards
  }

  return AlertTriangle
}

function toNumber(value: string | undefined) {
  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : 0
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
      title="Bahan Baku"
      description="Kelola bahan baku aktif, satuan ukur, stok minimum, harga rata-rata, dan notifikasi stok menipis."
    />

    <section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan bahan baku">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <component :is="getMetricIcon(item.id)" class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="ingredient-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="ingredient-table-title" class="text-base font-semibold tracking-normal">
            Daftar Bahan Baku
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Data diambil dari endpoint bahan baku utama dengan filter pencarian, satuan, dan status stok.
          </p>
        </div>
      </div>

      <div v-if="loadError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ loadError }}
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="ingredient-search"
        search-label="Cari bahan baku"
        search-placeholder="Cari nama bahan atau satuan"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="ingredient-stock-filter" class="sr-only">Filter status stok</label>
            <NativeSelect id="ingredient-stock-filter" v-model="stockFilter" class="w-36" :disabled="isLoading">
              <option value="all">Semua stok</option>
              <option value="safe">Aman</option>
              <option value="low">Menipis</option>
              <option value="critical">Kritis</option>
            </NativeSelect>
          </div>

          <div>
            <label for="ingredient-unit-filter" class="sr-only">Filter satuan bahan</label>
            <NativeSelect id="ingredient-unit-filter" v-model="unitFilter" class="w-40" :disabled="isLoading">
              <option value="all">Semua satuan</option>
              <option v-for="unit in unitOptions" :key="unit.id" :value="unit.id">
                {{ unit.name }}
              </option>
            </NativeSelect>
          </div>
        </template>

        <template #action>
          <Button type="button" size="sm" :disabled="isLoading || !canMutate" @click="openCreateDialog">
            <Plus class="size-4" aria-hidden="true" />
            Tambah Bahan
          </Button>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          label="bahan baku"
          empty-title="Bahan baku tidak ditemukan"
          empty-description="Ubah kata kunci, status stok, atau filter satuan."
          @view="openDetailDialog"
          @edit="openEditDialog"
          @delete="openDeleteDialog"
        />
      </div>
    </section>

    <AdminCrudDialog
      v-model:open="isCrudDialogOpen"
      v-model:form="crudForm"
      :mode="crudMode"
      :title="dialogTitle"
      :description="dialogDescription"
      :fields="ingredientFields"
      :detail-items="detailItems"
      :target-name="selectedIngredient?.name"
      :loading="isCrudLoading"
      :form-error="formError"
      @submit="handleCrudSubmit"
      @delete="handleDelete"
    />
  </div>
</template>
