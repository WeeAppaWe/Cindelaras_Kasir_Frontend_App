<script setup lang="ts">
import type { AdminDataMetric as AdminDataMetricItem, AdminDataTableColumn, AdminDataTableRow } from '../../../types/admin-management'
import type { AdminFinancialReportResponse } from '../../../types/admin-report-api'
import { Calculator, RefreshCcw, ReceiptText, TrendingDown, TrendingUp, WalletCards } from 'lucide-vue-next'
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
  title: 'Laporan Keuangan',
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
const dayFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
})

const { getFinancialReport } = useAdminReportApi()
const { runAdminExportAction } = useAdminActionFeedback()

const startDate = ref(getMonthStartDate())
const endDate = ref(getTodayDate())
const search = ref('')
const profitFilter = ref('all')
const isLoading = ref(false)
const errorMessage = ref('')
const report = ref<AdminFinancialReportResponse | null>(null)
const exporting = ref<'pdf' | 'excel' | null>(null)

const filteredItems = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  return financialItems.value.filter((item) => {
    const matchKeyword = !keyword || [
      item.date,
      formatDate(item.date),
      formatCurrency(item.total_revenue),
      formatCurrency(item.net_profit),
      formatNumber(item.transaction_count),
    ].some(value => value.toLowerCase().includes(keyword))
    const matchProfit = profitFilter.value === 'all'
      || (profitFilter.value === 'profit' && item.net_profit >= 0)
      || (profitFilter.value === 'loss' && item.net_profit < 0)

    return matchKeyword && matchProfit
  })
})
const financialItems = computed(() => report.value?.items ?? [])
const financialSummary = computed(() => {
  const transactionCount = financialItems.value.reduce((total, item) => total + item.transaction_count, 0)
  const totalRevenue = financialItems.value.reduce((total, item) => total + item.total_revenue, 0)
  const totalCogs = financialItems.value.reduce((total, item) => total + item.total_cogs, 0)
  const grossProfit = financialItems.value.reduce((total, item) => total + item.gross_profit, 0)
  const expenses = financialItems.value.reduce((total, item) => total + item.expenses, 0)
  const netProfit = financialItems.value.reduce((total, item) => total + item.net_profit, 0)

  return {
    transactionCount,
    totalRevenue,
    totalCogs,
    grossProfit,
    expenses,
    netProfit,
    averageTransaction: transactionCount > 0 ? Math.round(totalRevenue / transactionCount) : 0,
    marginPercent: totalRevenue > 0 ? Math.round((grossProfit / totalRevenue) * 100) : 0,
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
    id: 'revenue',
    label: 'Total Pendapatan',
    value: formatCurrency(financialSummary.value.totalRevenue),
    helper: `${formatNumber(financialSummary.value.transactionCount)} transaksi`,
    tone: 'success',
  },
  {
    id: 'net-profit',
    label: 'Laba Bersih',
    value: formatCurrency(financialSummary.value.netProfit),
    helper: `${formatCurrency(financialSummary.value.grossProfit)} laba kotor`,
    tone: financialSummary.value.netProfit < 0 ? 'destructive' : 'success',
  },
  {
    id: 'cogs',
    label: 'HPP',
    value: formatCurrency(financialSummary.value.totalCogs),
    helper: `${financialSummary.value.marginPercent}% margin kotor`,
    tone: 'default',
  },
  {
    id: 'expenses',
    label: 'Pengeluaran',
    value: formatCurrency(financialSummary.value.expenses),
    helper: `Rata-rata ${formatCurrency(financialSummary.value.averageTransaction)}`,
    tone: financialSummary.value.expenses > 0 ? 'warning' : 'info',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'date', label: 'Tanggal' },
  { key: 'transactions', label: 'Transaksi', align: 'right' },
  { key: 'revenue', label: 'Pendapatan', align: 'right' },
  { key: 'cogs', label: 'HPP', align: 'right' },
  { key: 'grossProfit', label: 'Laba Kotor', align: 'right' },
  { key: 'expenses', label: 'Pengeluaran', align: 'right' },
  { key: 'netProfit', label: 'Laba Bersih', align: 'right' },
]
const rows = computed<AdminDataTableRow[]>(() => filteredItems.value.map(item => ({
  id: `financial-${item.date}`,
  cells: {
    date: {
      label: formatDate(item.date),
      description: formatDay(item.date),
    },
    transactions: `${formatNumber(item.transaction_count)} trx`,
    revenue: formatCurrency(item.total_revenue),
    cogs: formatCurrency(item.total_cogs),
    grossProfit: formatCurrency(item.gross_profit),
    expenses: formatCurrency(item.expenses),
    netProfit: {
      label: formatCurrency(item.net_profit),
      tone: item.net_profit < 0 ? 'destructive' : 'success',
    },
  },
})))
const exportSummary = computed(() => [
  { label: 'Periode', value: periodLabel.value },
  { label: 'Total Pendapatan', value: formatCurrency(financialSummary.value.totalRevenue) },
  { label: 'Laba Bersih', value: formatCurrency(financialSummary.value.netProfit) },
  { label: 'Transaksi', value: formatNumber(financialSummary.value.transactionCount) },
])
const exportRows = computed(() => filteredItems.value.map(item => ({
  date: formatDate(item.date),
  transactions: `${formatNumber(item.transaction_count)} trx`,
  revenue: formatCurrency(item.total_revenue),
  cogs: formatCurrency(item.total_cogs),
  grossProfit: formatCurrency(item.gross_profit),
  expenses: formatCurrency(item.expenses),
  netProfit: formatCurrency(item.net_profit),
})))

onMounted(() => {
  void loadFinancialReport()
})

async function loadFinancialReport() {
  if (isLoading.value) {
    return
  }

  if (!isValidDateRange()) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    report.value = await getFinancialReport({
      start_date: startDate.value,
      end_date: endDate.value,
    })
  }
  catch (error) {
    errorMessage.value = getErrorMessage(error, 'Gagal memuat laporan keuangan.')
    report.value = null
  }
  finally {
    isLoading.value = false
  }
}

async function exportFinancialReport(format: 'pdf' | 'excel') {
  const payload = {
    title: 'Laporan Keuangan',
    description: `Pendapatan, HPP, pengeluaran, dan laba bersih periode ${periodLabel.value}.`,
    filename: 'laporan-keuangan',
    tableTitle: 'Rincian Keuangan Harian',
    sheetName: 'Keuangan',
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
    successMessage: 'Laporan keuangan berhasil disiapkan.',
    errorMessage: 'Gagal mengekspor laporan keuangan.',
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
  if (metricId === 'revenue') {
    return WalletCards
  }

  if (metricId === 'net-profit') {
    return financialSummary.value.netProfit < 0 ? TrendingDown : TrendingUp
  }

  if (metricId === 'cogs') {
    return ReceiptText
  }

  return Calculator
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value).replace(/\s/g, '')
}

function formatNumber(value: number) {
  return numberFormatter.format(value)
}

function formatDate(value: string) {
  const date = parseDate(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return dateFormatter.format(date)
}

function formatDay(value: string) {
  const date = parseDate(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return dayFormatter.format(date)
}

function parseDate(value: string) {
  return new Date(`${value}T00:00:00`)
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
      title="Laporan Keuangan"
      description="Pantau pendapatan, HPP, pengeluaran, laba kotor, dan laba bersih harian."
    />

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="finance-filter-title">
      <div class="mb-3 flex flex-col gap-1">
        <h2 id="finance-filter-title" class="text-base font-semibold tracking-normal">Filter laporan</h2>
        <p class="text-sm text-muted-foreground">Endpoint laporan keuangan membutuhkan tanggal awal dan akhir.</p>
      </div>

      <form class="grid gap-3 md:grid-cols-[repeat(2,minmax(0,12rem))_auto]" @submit.prevent="loadFinancialReport">
        <div class="space-y-1.5">
          <label for="finance-start-date" class="text-sm font-medium">Tanggal awal</label>
          <Input id="finance-start-date" v-model="startDate" type="date" :disabled="isLoading" />
        </div>
        <div class="space-y-1.5">
          <label for="finance-end-date" class="text-sm font-medium">Tanggal akhir</label>
          <Input id="finance-end-date" v-model="endDate" type="date" :disabled="isLoading" />
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

    <section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan laporan keuangan">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <component :is="getMetricIcon(item.id)" class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="finance-table-title">
      <div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="finance-table-title" class="text-base font-semibold tracking-normal">
            Rincian Keuangan Harian
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Periode {{ periodLabel }}.
          </p>
        </div>
        <AdminReportExportActions
          :disabled="isLoading || !exportRows.length"
          :exporting="exporting"
          @export-pdf="exportFinancialReport('pdf')"
          @export-excel="exportFinancialReport('excel')"
        />
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="finance-report-search"
        search-label="Cari laporan keuangan"
        search-placeholder="Cari tanggal, pendapatan, laba, atau transaksi"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="finance-profit-filter" class="sr-only">Filter laba laporan keuangan</label>
            <NativeSelect id="finance-profit-filter" v-model="profitFilter" class="w-40" :disabled="isLoading">
              <option value="all">Semua laba</option>
              <option value="profit">Laba positif</option>
              <option value="loss">Laba negatif</option>
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
          label="laporan keuangan"
          empty-title="Laporan keuangan tidak ditemukan"
          empty-description="Ubah periode, kata kunci, atau filter laba."
        />
      </div>
    </section>
  </div>
</template>
