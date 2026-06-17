<script setup lang="ts">
import type { AdminDataMetric as AdminDataMetricItem, AdminDataTableColumn, AdminDataTableRow, AdminStatusTone } from '../../../types/admin-management'
import type { AdminInventoryIngredientType, AdminInventoryReportResponse } from '../../../types/admin-report-api'
import { AlertTriangle, Boxes, PackageCheck, RefreshCcw, Warehouse } from 'lucide-vue-next'
import { Alert, AlertDescription } from '#layers/base/app/components/ui/alert'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import { exportReportToExcel, exportReportToPdf } from '../../../utils/report-export'
import AdminDataMetric from '../../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../../components/molecules/AdminPageHeader.vue'
import AdminReportExportActions from '../../../components/molecules/AdminReportExportActions.vue'
import AdminDataTable from '../../../components/organisms/AdminDataTable.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Laporan Persediaan',
})

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})
const numberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 2,
})

const { getInventoryReport } = useAdminReportApi()
const { runAdminExportAction } = useAdminActionFeedback()

const startDate = ref(getMonthStartDate())
const endDate = ref(getTodayDate())
const ingredientTypeFilter = ref<'all' | AdminInventoryIngredientType>('all')
const statusFilter = ref('all')
const search = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const report = ref<AdminInventoryReportResponse | null>(null)
const exporting = ref<'pdf' | 'excel' | null>(null)

const inventoryItems = computed(() => report.value?.items ?? [])
const filteredItems = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  return inventoryItems.value.filter((item) => {
    const status = item.status.toUpperCase()
    const matchKeyword = !keyword || [
      item.name,
      getIngredientTypeLabel(item.type),
      item.unit,
      getStockStatusLabel(status),
      formatCurrency(item.stock_value),
    ].some(value => value.toLowerCase().includes(keyword))
    const matchStatus = statusFilter.value === 'all' || status === statusFilter.value

    return matchKeyword && matchStatus
  })
})
const inventorySummary = computed(() => ({
  totalItems: report.value?.total_items ?? 0,
  totalValue: report.value?.total_value ?? 0,
  lowStockCount: report.value?.low_stock_count ?? 0,
  outOfStockCount: report.value?.out_of_stock_count ?? 0,
  normalStockCount: inventoryItems.value.filter(item => item.status.toUpperCase() === 'NORMAL').length,
}))
const periodLabel = computed(() => `${formatDate(startDate.value)} - ${formatDate(endDate.value)}`)
const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total-value',
    label: 'Nilai Persediaan',
    value: formatCurrency(inventorySummary.value.totalValue),
    helper: 'Stok saat ini x HPP rata-rata',
    tone: 'info',
  },
  {
    id: 'total-items',
    label: 'Total Bahan',
    value: formatNumber(inventorySummary.value.totalItems),
    helper: `${formatNumber(inventorySummary.value.normalStockCount)} stok aman`,
    tone: 'success',
  },
  {
    id: 'low-stock',
    label: 'Stok Menipis',
    value: formatNumber(inventorySummary.value.lowStockCount),
    helper: 'Di bawah batas minimum',
    tone: inventorySummary.value.lowStockCount > 0 ? 'warning' : 'default',
  },
  {
    id: 'out-stock',
    label: 'Stok Habis',
    value: formatNumber(inventorySummary.value.outOfStockCount),
    helper: 'Perlu segera ditindaklanjuti',
    tone: inventorySummary.value.outOfStockCount > 0 ? 'destructive' : 'default',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'ingredient', label: 'Bahan' },
  { key: 'type', label: 'Tipe' },
  { key: 'stock', label: 'Stok Saat Ini', align: 'right' },
  { key: 'minimumStock', label: 'Minimum', align: 'right' },
  { key: 'averageCost', label: 'HPP Rata-rata', align: 'right' },
  { key: 'stockValue', label: 'Nilai Stok', align: 'right' },
  { key: 'status', label: 'Status' },
]
const rows = computed<AdminDataTableRow[]>(() => filteredItems.value.map(item => ({
  id: item.ingredient_id,
  cells: {
    ingredient: {
      label: item.name,
      description: `Satuan ${item.unit || '-'}`,
    },
    type: getIngredientTypeLabel(item.type),
    stock: `${formatNumber(item.current_stock)} ${item.unit || ''}`.trim(),
    minimumStock: `${formatNumber(item.min_stock)} ${item.unit || ''}`.trim(),
    averageCost: formatCurrency(item.avg_cost),
    stockValue: formatCurrency(item.stock_value),
    status: {
      label: getStockStatusLabel(item.status),
      tone: getStockStatusTone(item.status),
    },
  },
})))
const exportSummary = computed(() => [
  { label: 'Periode validasi', value: periodLabel.value },
  { label: 'Nilai Persediaan', value: formatCurrency(inventorySummary.value.totalValue) },
  { label: 'Total Bahan', value: formatNumber(inventorySummary.value.totalItems) },
  { label: 'Stok Menipis/Habis', value: `${formatNumber(inventorySummary.value.lowStockCount)} / ${formatNumber(inventorySummary.value.outOfStockCount)}` },
])
const exportRows = computed(() => filteredItems.value.map(item => ({
  ingredient: item.name,
  type: getIngredientTypeLabel(item.type),
  stock: `${formatNumber(item.current_stock)} ${item.unit || ''}`.trim(),
  minimumStock: `${formatNumber(item.min_stock)} ${item.unit || ''}`.trim(),
  averageCost: formatCurrency(item.avg_cost),
  stockValue: formatCurrency(item.stock_value),
  status: getStockStatusLabel(item.status),
})))

onMounted(() => {
  void loadInventoryReport()
})

async function loadInventoryReport() {
  if (isLoading.value) {
    return
  }

  if (!isValidDateRange()) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    report.value = await getInventoryReport({
      start_date: startDate.value,
      end_date: endDate.value,
      ingredient_type: ingredientTypeFilter.value === 'all' ? undefined : ingredientTypeFilter.value,
    })
  }
  catch (error) {
    errorMessage.value = getErrorMessage(error, 'Gagal memuat laporan persediaan.')
    report.value = null
  }
  finally {
    isLoading.value = false
  }
}

async function exportInventoryReport(format: 'pdf' | 'excel') {
  const payload = {
    title: 'Laporan Persediaan',
    description: `Kondisi stok dan nilai aset persediaan periode validasi ${periodLabel.value}.`,
    filename: 'laporan-persediaan',
    tableTitle: 'Nilai dan Kondisi Persediaan',
    sheetName: 'Persediaan',
    period: {
      start_date: startDate.value,
      end_date: endDate.value,
    },
    columns,
    rows: exportRows.value,
    summary: exportSummary.value,
  }

  await runAdminExportAction(() => {
    if (format === 'pdf') {
      return exportReportToPdf(payload)
    }

    return exportReportToExcel(payload)
  }, {
    exporting,
    format,
    successMessage: 'Laporan persediaan berhasil disiapkan.',
    errorMessage: 'Gagal mengekspor laporan persediaan.',
  })
}

function isValidDateRange() {
  if (!startDate.value || !endDate.value) {
    errorMessage.value = 'Tanggal awal dan tanggal akhir wajib diisi.'
    return false
  }

  if (startDate.value > endDate.value) {
    errorMessage.value = 'Tanggal awal tidak boleh melebihi tanggal akhir.'
    return false
  }

  return true
}

function getMetricIcon(metricId: string) {
  if (metricId === 'total-value') {
    return Warehouse
  }

  if (metricId === 'total-items') {
    return PackageCheck
  }

  if (metricId === 'low-stock') {
    return AlertTriangle
  }

  return Boxes
}

function getIngredientTypeLabel(value: string) {
  if (value === 'raw') {
    return 'Bahan baku'
  }

  if (value === 'semi') {
    return 'Bahan setengah jadi'
  }

  return value || '-'
}

function getStockStatusLabel(value: string) {
  const status = value.toUpperCase()

  if (status === 'OUT') {
    return 'Habis'
  }

  if (status === 'LOW') {
    return 'Menipis'
  }

  return 'Aman'
}

function getStockStatusTone(value: string): AdminStatusTone {
  const status = value.toUpperCase()

  if (status === 'OUT') {
    return 'destructive'
  }

  if (status === 'LOW') {
    return 'warning'
  }

  return 'success'
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value).replace(/\s/g, '')
}

function formatNumber(value: number) {
  return numberFormatter.format(value)
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(date)
}

function getTodayDate() {
  return formatDateInput(new Date())
}

function getMonthStartDate() {
  const today = new Date()

  return formatDateInput(new Date(today.getFullYear(), today.getMonth(), 1))
}

function formatDateInput(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
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
      title="Laporan Persediaan"
      description="Pantau stok bahan, nilai aset persediaan, dan status stok saat ini."
    />

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="inventory-filter-title">
      <div class="mb-3 flex flex-col gap-1">
        <h2 id="inventory-filter-title" class="text-base font-semibold tracking-normal">Filter laporan</h2>
        <p class="text-sm text-muted-foreground">Tanggal dipakai backend untuk validasi format; stok yang tampil adalah kondisi saat ini.</p>
      </div>

      <form class="grid gap-3 md:grid-cols-[repeat(3,minmax(0,12rem))_auto]" @submit.prevent="loadInventoryReport">
        <div class="space-y-1.5">
          <label for="inventory-start-date" class="text-sm font-medium">Tanggal awal</label>
          <Input id="inventory-start-date" v-model="startDate" type="date" :disabled="isLoading" />
        </div>
        <div class="space-y-1.5">
          <label for="inventory-end-date" class="text-sm font-medium">Tanggal akhir</label>
          <Input id="inventory-end-date" v-model="endDate" type="date" :disabled="isLoading" />
        </div>
        <div class="space-y-1.5">
          <label for="inventory-type-filter" class="text-sm font-medium">Tipe bahan</label>
          <NativeSelect id="inventory-type-filter" v-model="ingredientTypeFilter" :disabled="isLoading">
            <option value="all">Semua bahan</option>
            <option value="raw">Bahan baku</option>
            <option value="semi">Bahan setengah jadi</option>
          </NativeSelect>
        </div>
        <div class="flex items-end">
          <Button type="submit" class="h-9" :disabled="isLoading">
            <Spinner v-if="isLoading" class="size-4" />
            <RefreshCcw v-else class="size-4" aria-hidden="true" />
            {{ isLoading ? 'Memuat...' : 'Terapkan' }}
          </Button>
        </div>
      </form>
    </section>

    <Alert v-if="errorMessage" variant="destructive">
      <AlertDescription>{{ errorMessage }}</AlertDescription>
    </Alert>

    <section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan laporan persediaan">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <component :is="getMetricIcon(item.id)" class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="inventory-table-title">
      <div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex min-w-0 items-start gap-3">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Boxes class="size-4" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <h2 id="inventory-table-title" class="text-base font-semibold tracking-normal">
              Nilai dan Kondisi Persediaan
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Periode validasi {{ periodLabel }}.
            </p>
          </div>
        </div>
        <AdminReportExportActions
          :disabled="isLoading || !exportRows.length"
          :exporting="exporting"
          @export-pdf="exportInventoryReport('pdf')"
          @export-excel="exportInventoryReport('excel')"
        />
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="inventory-report-search"
        search-label="Cari laporan persediaan"
        search-placeholder="Cari bahan, tipe, satuan, status, atau nilai"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="inventory-status-filter" class="sr-only">Filter status stok</label>
            <NativeSelect id="inventory-status-filter" v-model="statusFilter" class="w-36" :disabled="isLoading">
              <option value="all">Semua status</option>
              <option value="NORMAL">Aman</option>
              <option value="LOW">Menipis</option>
              <option value="OUT">Habis</option>
            </NativeSelect>
          </div>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          :actions="[]"
          label="laporan persediaan"
          empty-title="Persediaan tidak ditemukan"
          empty-description="Ubah periode, tipe bahan, kata kunci, atau status stok."
        />
      </div>
    </section>
  </div>
</template>
