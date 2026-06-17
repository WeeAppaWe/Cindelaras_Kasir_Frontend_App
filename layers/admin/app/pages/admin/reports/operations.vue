<script setup lang="ts">
import type { AdminDataMetric as AdminDataMetricItem, AdminDataTableColumn, AdminDataTableRow, AdminStatusTone } from '../../../types/admin-management'
import type { AdminOperationalReportResponse } from '../../../types/admin-report-api'
import { Banknote, Clock3, RefreshCcw, ReceiptText, Scale, Users } from 'lucide-vue-next'
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
  title: 'Laporan Operasional',
})

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})
const numberFormatter = new Intl.NumberFormat('id-ID')
const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
})

const { getOperationalReport } = useAdminReportApi()
const { runAdminExportAction } = useAdminActionFeedback()

const startDate = ref(getMonthStartDate())
const endDate = ref(getTodayDate())
const search = ref('')
const statusFilter = ref('all')
const varianceFilter = ref('all')
const isLoading = ref(false)
const errorMessage = ref('')
const report = ref<AdminOperationalReportResponse | null>(null)
const exporting = ref<'pdf' | 'excel' | null>(null)

const shiftItems = computed(() => report.value?.shifts ?? [])
const filteredShifts = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  return shiftItems.value.filter((item) => {
    const status = item.status.toUpperCase()
    const matchKeyword = !keyword || [
      item.date,
      formatDate(item.date),
      item.start_time,
      item.end_time ?? '',
      item.cashier_name,
      formatCurrency(item.total_sales),
      formatNumber(item.transaction_count),
    ].some(value => value.toLowerCase().includes(keyword))
    const matchStatus = statusFilter.value === 'all' || status === statusFilter.value
    const matchVariance = varianceFilter.value === 'all'
      || (varianceFilter.value === 'active' && item.variance === null)
      || (varianceFilter.value === 'balanced' && item.variance === 0)
      || (varianceFilter.value === 'over' && item.variance !== null && item.variance > 0)
      || (varianceFilter.value === 'short' && item.variance !== null && item.variance < 0)

    return matchKeyword && matchStatus && matchVariance
  })
})
const operationalSummary = computed(() => {
  const transactionCount = shiftItems.value.reduce((total, item) => total + item.transaction_count, 0)
  const totalSales = shiftItems.value.reduce((total, item) => total + item.total_sales, 0)
  const expectedCash = shiftItems.value.reduce((total, item) => total + item.expected_cash, 0)
  const cashIn = shiftItems.value.reduce((total, item) => total + item.cash_in, 0)
  const cashOut = shiftItems.value.reduce((total, item) => total + item.cash_out, 0)
  const closedShifts = shiftItems.value.filter(item => item.variance !== null)
  const variance = closedShifts.reduce((total, item) => total + (item.variance ?? 0), 0)

  return {
    transactionCount,
    totalSales,
    expectedCash,
    cashIn,
    cashOut,
    variance,
    totalShifts: report.value?.total_shifts ?? 0,
    activeShifts: shiftItems.value.filter(item => item.status.toUpperCase() === 'ACTIVE').length,
    closedShifts: closedShifts.length,
  }
})
const periodLabel = computed(() => {
  const period = report.value?.period

  if (!period) {
    return `${formatDate(startDate.value)} - ${formatDate(endDate.value)}`
  }

  return `${formatDate(period.start_date)} - ${formatDate(period.end_date)}`
})
const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'shifts',
    label: 'Total Shift',
    value: formatNumber(operationalSummary.value.totalShifts),
    helper: `${formatNumber(operationalSummary.value.activeShifts)} aktif`,
    tone: 'info',
  },
  {
    id: 'sales',
    label: 'Total Penjualan',
    value: formatCurrency(operationalSummary.value.totalSales),
    helper: `${formatNumber(operationalSummary.value.transactionCount)} transaksi`,
    tone: 'success',
  },
  {
    id: 'expected-cash',
    label: 'Kas Sistem',
    value: formatCurrency(operationalSummary.value.expectedCash),
    helper: `${formatCurrency(operationalSummary.value.cashIn)} masuk / ${formatCurrency(operationalSummary.value.cashOut)} keluar`,
    tone: 'default',
  },
  {
    id: 'variance',
    label: 'Total Selisih',
    value: formatCurrency(operationalSummary.value.variance),
    helper: `${formatNumber(operationalSummary.value.closedShifts)} shift tertutup`,
    tone: getVarianceTone(operationalSummary.value.variance),
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'shift', label: 'Shift' },
  { key: 'cashier', label: 'Kasir' },
  { key: 'transactions', label: 'Transaksi', align: 'right' },
  { key: 'sales', label: 'Penjualan', align: 'right' },
  { key: 'cashFlow', label: 'Kas Masuk/Keluar', align: 'right' },
  { key: 'expectedCash', label: 'Kas Sistem', align: 'right' },
  { key: 'actualCash', label: 'Kas Aktual', align: 'right' },
  { key: 'variance', label: 'Selisih' },
  { key: 'status', label: 'Status' },
]
const rows = computed<AdminDataTableRow[]>(() => filteredShifts.value.map(item => ({
  id: item.shift_id,
  cells: {
    shift: {
      label: formatDate(item.date),
      description: `${formatTime(item.start_time)} - ${item.end_time ? formatTime(item.end_time) : 'Berjalan'}`,
    },
    cashier: item.cashier_name || '-',
    transactions: `${formatNumber(item.transaction_count)} trx`,
    sales: formatCurrency(item.total_sales),
    cashFlow: {
      label: `${formatCurrency(item.cash_in)} / ${formatCurrency(item.cash_out)}`,
      description: `Kas awal ${formatCurrency(item.start_cash)}`,
    },
    expectedCash: formatCurrency(item.expected_cash),
    actualCash: item.actual_cash === null ? '-' : formatCurrency(item.actual_cash),
    variance: {
      label: formatVariance(item.variance),
      tone: getVarianceTone(item.variance),
    },
    status: {
      label: getShiftStatusLabel(item.status),
      tone: getShiftStatusTone(item.status),
    },
  },
})))
const exportSummary = computed(() => [
  { label: 'Periode', value: periodLabel.value },
  { label: 'Total Shift', value: formatNumber(operationalSummary.value.totalShifts) },
  { label: 'Total Penjualan', value: formatCurrency(operationalSummary.value.totalSales) },
  { label: 'Total Selisih', value: formatCurrency(operationalSummary.value.variance) },
])
const exportRows = computed(() => filteredShifts.value.map(item => ({
  shift: `${formatDate(item.date)} ${formatTime(item.start_time)}-${item.end_time ? formatTime(item.end_time) : 'Berjalan'}`,
  cashier: item.cashier_name || '-',
  transactions: `${formatNumber(item.transaction_count)} trx`,
  sales: formatCurrency(item.total_sales),
  cashFlow: `${formatCurrency(item.cash_in)} / ${formatCurrency(item.cash_out)}`,
  expectedCash: formatCurrency(item.expected_cash),
  actualCash: item.actual_cash === null ? '-' : formatCurrency(item.actual_cash),
  variance: formatVariance(item.variance),
  status: getShiftStatusLabel(item.status),
})))

onMounted(() => {
  void loadOperationalReport()
})

async function loadOperationalReport() {
  if (isLoading.value) {
    return
  }

  if (!isValidDateRange()) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    report.value = await getOperationalReport({
      start_date: startDate.value,
      end_date: endDate.value,
    })
  }
  catch (error) {
    errorMessage.value = getErrorMessage(error, 'Gagal memuat laporan operasional.')
    report.value = null
  }
  finally {
    isLoading.value = false
  }
}

async function exportOperationalReport(format: 'pdf' | 'excel') {
  const payload = {
    title: 'Laporan Operasional',
    description: `Ringkasan shift kasir periode ${periodLabel.value}.`,
    filename: 'laporan-operasional',
    tableTitle: 'Rekap Shift Kasir',
    sheetName: 'Operasional',
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
    successMessage: 'Laporan operasional berhasil disiapkan.',
    errorMessage: 'Gagal mengekspor laporan operasional.',
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
  if (metricId === 'shifts') {
    return Clock3
  }

  if (metricId === 'sales') {
    return ReceiptText
  }

  if (metricId === 'expected-cash') {
    return Banknote
  }

  return Scale
}

function getShiftStatusLabel(value: string) {
  return value.toUpperCase() === 'ACTIVE' ? 'Aktif' : 'Tutup'
}

function getShiftStatusTone(value: string): AdminStatusTone {
  return value.toUpperCase() === 'ACTIVE' ? 'info' : 'success'
}

function getVarianceTone(value: number | null): AdminStatusTone {
  if (value === null) {
    return 'info'
  }

  if (value < 0) {
    return 'destructive'
  }

  if (value > 0) {
    return 'warning'
  }

  return 'success'
}

function formatVariance(value: number | null) {
  if (value === null) {
    return 'Belum tutup'
  }

  return formatCurrency(value)
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

  return dateFormatter.format(date)
}

function formatTime(value: string) {
  return value.split(':').slice(0, 2).join('.')
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
      title="Laporan Operasional"
      description="Pantau shift kasir, total penjualan, kas sistem, kas aktual, dan selisih kas."
    />

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="operational-filter-title">
      <div class="mb-3 flex flex-col gap-1">
        <h2 id="operational-filter-title" class="text-base font-semibold tracking-normal">Filter laporan</h2>
        <p class="text-sm text-muted-foreground">Filter memakai tanggal mulai shift sebagai acuan periode laporan.</p>
      </div>

      <form class="grid gap-3 md:grid-cols-[repeat(2,minmax(0,12rem))_auto]" @submit.prevent="loadOperationalReport">
        <div class="space-y-1.5">
          <label for="operational-start-date" class="text-sm font-medium">Tanggal awal</label>
          <Input id="operational-start-date" v-model="startDate" type="date" :disabled="isLoading" />
        </div>
        <div class="space-y-1.5">
          <label for="operational-end-date" class="text-sm font-medium">Tanggal akhir</label>
          <Input id="operational-end-date" v-model="endDate" type="date" :disabled="isLoading" />
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

    <section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan laporan operasional">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <component :is="getMetricIcon(item.id)" class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="operational-table-title">
      <div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex min-w-0 items-start gap-3">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Users class="size-4" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <h2 id="operational-table-title" class="text-base font-semibold tracking-normal">
              Rekap Shift Kasir
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Periode {{ periodLabel }}.
            </p>
          </div>
        </div>
        <AdminReportExportActions
          :disabled="isLoading || !exportRows.length"
          :exporting="exporting"
          @export-pdf="exportOperationalReport('pdf')"
          @export-excel="exportOperationalReport('excel')"
        />
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="operational-report-search"
        search-label="Cari laporan operasional"
        search-placeholder="Cari tanggal, jam, kasir, penjualan, atau transaksi"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="operational-status-filter" class="sr-only">Filter status shift</label>
            <NativeSelect id="operational-status-filter" v-model="statusFilter" class="w-32" :disabled="isLoading">
              <option value="all">Semua shift</option>
              <option value="ACTIVE">Aktif</option>
              <option value="CLOSED">Tutup</option>
            </NativeSelect>
          </div>
          <div>
            <label for="operational-variance-filter" class="sr-only">Filter selisih kas</label>
            <NativeSelect id="operational-variance-filter" v-model="varianceFilter" class="w-40" :disabled="isLoading">
              <option value="all">Semua selisih</option>
              <option value="balanced">Kas pas</option>
              <option value="over">Kas lebih</option>
              <option value="short">Kas kurang</option>
              <option value="active">Belum tutup</option>
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
          label="laporan operasional"
          empty-title="Laporan operasional tidak ditemukan"
          empty-description="Ubah periode, kata kunci, status shift, atau filter selisih."
        />
      </div>
    </section>
  </div>
</template>
