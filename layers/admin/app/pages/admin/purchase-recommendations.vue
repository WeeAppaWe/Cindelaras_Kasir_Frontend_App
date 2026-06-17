<script setup lang="ts">
import type {
  AdminDataMetric as AdminDataMetricItem,
  AdminDataTableColumn,
  AdminDataTableRow,
  AdminStatusTone,
} from '../../types/admin-management'
import type {
  AdminSpkAnalysisItem,
  AdminSpkAnalysisQuery,
  AdminSpkAnalysisResponse,
  AdminSpkIngredientType,
  AdminSpkSupplierOption,
} from '../../types/admin-spk'
import {
  AlertCircle,
  ArrowRight,
  Boxes,
  BrainCircuit,
  CalendarRange,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  PackageSearch,
  RefreshCcw,
  RotateCcw,
  Settings2,
  ShieldCheck,
  Store,
  WalletCards,
} from 'lucide-vue-next'
import { Alert, AlertDescription } from '#layers/base/app/components/ui/alert'
import { Badge } from '#layers/base/app/components/ui/badge'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import { Separator } from '#layers/base/app/components/ui/separator'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#layers/base/app/components/ui/table'
import { exportReportToExcel, exportReportToPdf } from '../../utils/report-export'
import AdminDataMetric from '../../components/molecules/AdminDataMetric.vue'
import AdminDataTable from '../../components/organisms/AdminDataTable.vue'
import AdminDataToolbar from '../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminReportExportActions from '../../components/molecules/AdminReportExportActions.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Rekomendasi Belanja',
})

type SpkView = 'input' | 'loading' | 'result'

interface SpkParameterState {
  targetDays: string
  bufferPercent: string
  lookbackDays: string
  ingredientType: AdminSpkIngredientType
  supplierId: string
}

interface SpkSupplierDraft {
  id: string
  name: string
  contact: string
  items: AdminSpkAnalysisItem[]
  totalEstimatedCost: number
  isExpanded: boolean
}

const defaultParameters: SpkParameterState = {
  targetDays: '7',
  bufferPercent: '10',
  lookbackDays: '7',
  ingredientType: 'all',
  supplierId: 'all',
}

const ingredientTypeOptions: Array<{ value: AdminSpkIngredientType, label: string, description: string }> = [
  { value: 'all', label: 'Semua bahan', description: 'Bahan baku dan setengah jadi' },
  { value: 'raw', label: 'Bahan baku', description: 'Hanya bahan mentah' },
  { value: 'semi', label: 'Setengah jadi', description: 'Hanya bahan olahan' },
]

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})
const numberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 2,
})
const dateTimeFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const spkApi = useAdminSpkApi()
const { runAdminExportAction } = useAdminActionFeedback()

const currentView = ref<SpkView>('input')
const parameters = reactive<SpkParameterState>({ ...defaultParameters })
const supplierOptions = ref<AdminSpkSupplierOption[]>([])
const analysis = ref<AdminSpkAnalysisResponse | null>(null)
const processedQuery = ref<AdminSpkAnalysisQuery | null>(null)
const orderOverrides = reactive<Record<string, string>>({})
const expandedSuppliers = reactive<Record<string, boolean>>({})
const search = ref('')
const isLoadingSuppliers = ref(false)
const supplierErrorMessage = ref('')
const analysisErrorMessage = ref('')
const exporting = ref<'pdf' | 'excel' | null>(null)

onMounted(() => {
  loadSupplierOptions()
})

// ─── Computed ────────────────────────────────────────────────────────────────

const targetDaysValue = computed(() => Number(parameters.targetDays))
const bufferPercentValue = computed(() => Number(parameters.bufferPercent))
const lookbackDaysValue = computed(() => Number(parameters.lookbackDays))

const parameterErrors = computed(() => ({
  targetDays: getRangeError(targetDaysValue.value, 'Target stok aman', 1, 90),
  bufferPercent: getRangeError(bufferPercentValue.value, 'Cadangan stok', 0, 100, true),
  lookbackDays: getRangeError(lookbackDaysValue.value, 'Histori pemakaian', 7, 90),
}))
const hasParameterError = computed(() => Object.values(parameterErrors.value).some(Boolean))

const selectedIngredientTypeOption = computed(() => (
  ingredientTypeOptions.find(option => option.value === parameters.ingredientType) ?? ingredientTypeOptions[1]!
))
const selectedSupplierLabel = computed(() => {
  if (parameters.supplierId === 'all') {
    return 'Semua pemasok'
  }
  return supplierOptions.value.find(s => s.id === parameters.supplierId)?.name ?? 'Pemasok terpilih'
})

const processedSupplierId = computed(() => processedQuery.value?.supplier_id ?? 'all')
const displayedItems = computed(() => {
  const items = analysis.value?.all_items ?? []
  if (processedSupplierId.value === 'all') {
    return items
  }
  return items.filter(item => item.supplier_id === processedSupplierId.value)
})
const visibleItems = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) {
    return displayedItems.value
  }
  return displayedItems.value.filter((item) => {
    return [
      item.name,
      item.type,
      item.unit,
      item.supplier_name ?? '',
      formatCurrency(getItemEstimatedCost(item)),
      formatQuantity(getEffectiveSuggestedQty(item), item.unit),
    ].some(value => value.toLowerCase().includes(keyword))
  })
})

const supplierContactById = computed(() => {
  const contacts = new Map<string, string>()
  supplierOptions.value.forEach(supplier => contacts.set(supplier.id, supplier.contact))
  analysis.value?.by_supplier.forEach((supplier) => {
    const id = normalizeSupplierId(supplier.supplier_id)
    if (supplier.contact?.trim()) {
      contacts.set(id, supplier.contact.trim())
    }
  })
  return contacts
})

const supplierDrafts = computed<SpkSupplierDraft[]>(() => {
  const drafts = new Map<string, SpkSupplierDraft>()
  visibleItems.value.forEach((item) => {
    const id = normalizeSupplierId(item.supplier_id)
    const draft = drafts.get(id) ?? {
      id,
      name: item.supplier_name?.trim() || 'Pemasok belum terdeteksi',
      contact: supplierContactById.value.get(id) || '-',
      items: [],
      totalEstimatedCost: 0,
      isExpanded: true,
    }
    draft.items.push(item)
    draft.totalEstimatedCost += getItemEstimatedCost(item)
    drafts.set(id, draft)
  })
  return Array.from(drafts.values()).sort((a, b) => b.totalEstimatedCost - a.totalEstimatedCost)
})

const totalEstimatedCost = computed(() =>
  displayedItems.value.reduce((total, item) => total + getItemEstimatedCost(item), 0),
)
const visibleEstimatedCost = computed(() =>
  visibleItems.value.reduce((total, item) => total + getItemEstimatedCost(item), 0),
)
const analysisDateLabel = computed(() => formatDateTime(analysis.value?.analysis_date))
const lookbackPeriodLabel = computed(() => {
  const period = analysis.value?.lookback_period
  if (!period) return '-'
  return `${formatDate(period.start_date)} – ${formatDate(period.end_date)}`
})
const resultDescription = computed(() => {
  if (!analysis.value || !processedQuery.value) {
    return 'Jalankan analisa untuk menampilkan draf order pembelian per pemasok.'
  }
  const targetDays = processedQuery.value.target_days ?? analysis.value.config.target_days
  const bufferPercent = processedQuery.value.buffer_percent ?? analysis.value.config.buffer_percent
  const lookbackDays = processedQuery.value.lookback_days ?? analysis.value.config.lookback_days
  const ingredientTypeLabel = ingredientTypeOptions.find(o => o.value === processedQuery.value?.ingredient_type)?.label ?? 'Semua bahan'
  const supplierLabel = processedSupplierId.value === 'all'
    ? 'semua pemasok'
    : supplierDrafts.value[0]?.name ?? 'pemasok terpilih'
  return `${ingredientTypeLabel}, ${supplierLabel}. Target ${formatNumber(targetDays)} hari, cadangan ${formatNumber(bufferPercent)}%, histori ${formatNumber(lookbackDays)} hari.`
})

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'analyzed',
    label: 'Bahan Dianalisis',
    value: formatNumber(analysis.value?.summary.total_ingredients_analyzed ?? 0),
    helper: lookbackPeriodLabel.value,
    tone: 'info',
  },
  {
    id: 'restock',
    label: 'Perlu Restock',
    value: formatNumber(displayedItems.value.length),
    helper: `${formatNumber(visibleItems.value.length)} tampil di tabel`,
    tone: displayedItems.value.length ? 'warning' : 'success',
  },
  {
    id: 'cost',
    label: 'Estimasi Biaya',
    value: formatCurrency(totalEstimatedCost.value),
    helper: 'Mengikuti qty final',
    tone: totalEstimatedCost.value ? 'info' : 'default',
  },
  {
    id: 'suppliers',
    label: 'Pemasok',
    value: formatNumber(supplierDrafts.value.length),
    helper: analysisDateLabel.value,
    tone: 'default',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'ingredient', label: 'Bahan' },
  { key: 'supplier', label: 'Pemasok' },
  { key: 'usage', label: 'WMA/Hari', align: 'right' },
  { key: 'stock', label: 'Stok', align: 'right' },
  { key: 'minimum', label: 'Minimum', align: 'right' },
  { key: 'suggested', label: 'Saran Order', align: 'right' },
  { key: 'estimated', label: 'Estimasi', align: 'right' },
  { key: 'status', label: 'Status' },
]

const rows = computed<AdminDataTableRow[]>(() => visibleItems.value.map(item => ({
  id: item.ingredient_id,
  cells: {
    ingredient: {
      label: item.name,
      description: getIngredientTypeLabel(item.type),
    },
    supplier: {
      label: item.supplier_name?.trim() || 'Belum ada pemasok',
      description: supplierContactById.value.get(normalizeSupplierId(item.supplier_id)) || '-',
    },
    usage: formatQuantity(item.wma_daily_average, item.unit),
    stock: formatQuantity(item.current_stock, item.unit),
    minimum: formatQuantity(item.min_stock, item.unit),
    suggested: {
      label: formatQuantity(getEffectiveSuggestedQty(item), item.unit),
      description: `${formatCurrency(item.avg_cost)}/unit`,
      monospace: true,
    },
    estimated: {
      label: formatCurrency(getItemEstimatedCost(item)),
      monospace: true,
    },
    status: {
      label: getRestockStatus(item).label,
      tone: getRestockStatus(item).tone,
    },
  },
})))

const exportRows = computed(() => visibleItems.value.map(item => ({
  ingredient: item.name,
  type: getIngredientTypeLabel(item.type),
  supplier: item.supplier_name?.trim() || 'Belum ada pemasok',
  dailyUsage: formatQuantity(item.wma_daily_average, item.unit),
  currentStock: formatQuantity(item.current_stock, item.unit),
  minimumStock: formatQuantity(item.min_stock, item.unit),
  suggestedQty: formatQuantity(getEffectiveSuggestedQty(item), item.unit),
  unitCost: formatCurrency(item.avg_cost),
  estimatedCost: formatCurrency(getItemEstimatedCost(item)),
  status: getRestockStatus(item).label,
})))

// ─── Actions ──────────────────────────────────────────────────────────────────

async function loadSupplierOptions() {
  if (isLoadingSuppliers.value) return
  isLoadingSuppliers.value = true
  supplierErrorMessage.value = ''
  try {
    supplierOptions.value = await spkApi.getSupplierOptions()
  }
  catch (error) {
    supplierErrorMessage.value = getErrorMessage(error, 'Gagal memuat daftar pemasok.')
  }
  finally {
    isLoadingSuppliers.value = false
  }
}

async function handleRunAnalysis() {
  if (hasParameterError.value) return

  currentView.value = 'loading'
  analysisErrorMessage.value = ''

  try {
    const query = createAnalysisQuery()
    const result = await spkApi.getAnalysis(query)
    analysis.value = normalizeAnalysis(result)
    processedQuery.value = query
    resetOrderOverrides()
    search.value = ''
    currentView.value = 'result'
  }
  catch (error) {
    analysisErrorMessage.value = getErrorMessage(error, 'Gagal menjalankan analisa SPK.')
    currentView.value = 'input'
  }
}

function handleBackToInput() {
  currentView.value = 'input'
}

function createAnalysisQuery(): AdminSpkAnalysisQuery {
  return {
    target_days: targetDaysValue.value,
    buffer_percent: bufferPercentValue.value,
    lookback_days: lookbackDaysValue.value,
    ingredient_type: parameters.ingredientType,
    supplier_id: parameters.supplierId === 'all' ? undefined : parameters.supplierId,
  }
}

function resetParameters() {
  Object.assign(parameters, defaultParameters)
  analysisErrorMessage.value = ''
}

function resetOrderOverrides() {
  Object.keys(orderOverrides).forEach(key => delete orderOverrides[key])
}

function toggleSupplier(id: string) {
  expandedSuppliers[id] = !isSupplierExpanded(id)
}

function isSupplierExpanded(id: string) {
  return expandedSuppliers[id] !== false
}

function updateSuggestedQty(itemId: string, value: string | number) {
  orderOverrides[itemId] = String(value)
}

function getOrderQuantityInputValue(item: AdminSpkAnalysisItem) {
  return orderOverrides[item.ingredient_id] ?? String(item.suggested_qty)
}

function getEffectiveSuggestedQty(item: AdminSpkAnalysisItem) {
  const override = orderOverrides[item.ingredient_id]
  if (override === undefined || override.trim() === '') return item.suggested_qty
  const value = Number(override)
  if (!Number.isFinite(value) || value < 0) return item.suggested_qty
  return value
}

function getItemEstimatedCost(item: AdminSpkAnalysisItem) {
  return Math.round(getEffectiveSuggestedQty(item) * item.avg_cost)
}

async function handleExport(format: 'pdf' | 'excel') {
  const payload = {
    title: 'SPK — Rekomendasi Belanja',
    description: resultDescription.value,
    filename: 'spk-rekomendasi-belanja',
    columns: [
      { key: 'ingredient', label: 'Bahan' },
      { key: 'type', label: 'Jenis' },
      { key: 'supplier', label: 'Pemasok' },
      { key: 'dailyUsage', label: 'WMA/Hari', align: 'right' as const },
      { key: 'currentStock', label: 'Stok', align: 'right' as const },
      { key: 'minimumStock', label: 'Minimum', align: 'right' as const },
      { key: 'suggestedQty', label: 'Saran Order', align: 'right' as const },
      { key: 'unitCost', label: 'Harga/Unit', align: 'right' as const },
      { key: 'estimatedCost', label: 'Estimasi', align: 'right' as const },
      { key: 'status', label: 'Status' },
    ],
    rows: exportRows.value,
    summary: [
      { label: 'Bahan dianalisis', value: metrics.value[0]?.value ?? '0' },
      { label: 'Perlu restock', value: formatNumber(visibleItems.value.length) },
      { label: 'Pemasok', value: formatNumber(supplierDrafts.value.length) },
      { label: 'Estimasi biaya', value: formatCurrency(visibleEstimatedCost.value) },
    ],
  }

  await runAdminExportAction(() => {
    if (format === 'pdf') {
      exportReportToPdf(payload)
      return
    }
    exportReportToExcel(payload)
  }, {
    exporting,
    format,
    successMessage: `SPK berhasil disiapkan sebagai ${format.toUpperCase()}.`,
    errorMessage: `Gagal mengekspor SPK ${format.toUpperCase()}.`,
  })
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeAnalysis(payload: AdminSpkAnalysisResponse): AdminSpkAnalysisResponse {
  return {
    ...payload,
    by_supplier: payload.by_supplier ?? [],
    all_items: payload.all_items ?? [],
    summary: payload.summary ?? {
      total_ingredients_analyzed: 0,
      total_needing_restock: 0,
      total_estimated_cost: 0,
      total_suppliers: 0,
    },
  }
}

function getRangeError(value: number, label: string, min: number, max: number, allowZero = false) {
  if (!Number.isFinite(value)) return `${label} harus berupa angka.`
  if (!allowZero && value < min) return `${label} minimal ${min}.`
  if (allowZero && value < min) return `${label} minimal ${min}.`
  if (value > max) return `${label} maksimal ${max}.`
  return ''
}

function normalizeSupplierId(value: string | null | undefined) {
  return value?.trim() || 'unassigned'
}

function getIngredientTypeLabel(value: string) {
  if (value === 'raw') return 'Bahan baku'
  if (value === 'semi') return 'Bahan setengah jadi'
  return value || '-'
}

function getRestockStatus(item: AdminSpkAnalysisItem): { label: string, tone: AdminStatusTone } {
  if (item.current_stock <= item.min_stock) return { label: 'Prioritas', tone: 'destructive' }
  if (item.suggested_qty > 0) return { label: 'Perlu order', tone: 'warning' }
  return { label: 'Pantau', tone: 'info' }
}

function getMetricIcon(metricId: string) {
  if (metricId === 'analyzed') return Boxes
  if (metricId === 'restock') return PackageSearch
  if (metricId === 'cost') return WalletCards
  return Store
}

function formatCurrency(value: number) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0).replace(/\s/g, '')
}

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0)
}

function formatQuantity(value: number, unit: string) {
  return `${formatNumber(value)} ${unit || ''}`.trim()
}

function formatDateTime(value: string | undefined) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return dateTimeFormatter.format(date)
}

function formatDate(value: string | undefined) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message
  return fallback
}
</script>

<template>
  <div class="flex min-h-full flex-col gap-3 p-3 sm:p-4">
    <AdminPageHeader
      title="Rekomendasi Belanja"
      description="Sistem pendukung keputusan berbasis WMA untuk menghasilkan draf order pembelian berdasarkan histori pemakaian dan target stok aman."
    />

    <!-- ── TAMPILAN 1: INPUT PARAMETER ─────────────────────────────────── -->
    <template v-if="currentView === 'input'">
      <div class="grid gap-3 lg:grid-cols-[1fr_auto]">

        <!-- Card parameter utama -->
        <section class="rounded-xl border bg-card text-card-foreground shadow-xs" aria-labelledby="spk-param-title">
          <div class="flex items-start gap-3 border-b px-4 py-4">
            <span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Settings2 class="size-4" aria-hidden="true" />
            </span>
            <div class="min-w-0 flex-1">
              <h2 id="spk-param-title" class="text-base font-semibold">
                Konfigurasi Analisa
              </h2>
              <p class="mt-0.5 text-sm text-muted-foreground">
                Atur parameter sebelum menjalankan SPK.
              </p>
            </div>
          </div>

          <div class="p-4">
            <form class="space-y-4" @submit.prevent="handleRunAnalysis">

              <!-- Baris 1: 3 parameter numerik sebagai card mini -->
              <div class="grid gap-3 sm:grid-cols-3">
                <!-- Target stok aman -->
                <div class="rounded-lg border bg-muted/30 p-3">
                  <div class="mb-2 flex items-center justify-between">
                    <label for="spk-target-days" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Target stok aman
                    </label>
                    <span class="rounded-md bg-info/10 px-1.5 py-0.5 text-xs font-medium text-info">hari</span>
                  </div>
                  <div class="relative">
                    <Input
                      id="spk-target-days"
                      v-model="parameters.targetDays"
                      type="number"
                      min="1"
                      max="90"
                      inputmode="numeric"
                      class="bg-background pr-12"
                      :aria-invalid="parameterErrors.targetDays ? true : undefined"
                    />
                    <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">hari</span>
                  </div>
                  <p v-if="parameterErrors.targetDays" class="mt-1.5 text-xs text-destructive">
                    {{ parameterErrors.targetDays }}
                  </p>
                  <p v-else class="mt-1.5 text-xs text-muted-foreground">
                    Stok aman untuk {{ parameters.targetDays || '?' }} hari ke depan · maks 90
                  </p>
                </div>

                <!-- Cadangan stok -->
                <div class="rounded-lg border bg-muted/30 p-3">
                  <div class="mb-2 flex items-center justify-between">
                    <label for="spk-buffer-percent" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Cadangan stok
                    </label>
                    <span class="rounded-md bg-warning/10 px-1.5 py-0.5 text-xs font-medium text-warning-foreground">%</span>
                  </div>
                  <div class="relative">
                    <Input
                      id="spk-buffer-percent"
                      v-model="parameters.bufferPercent"
                      type="number"
                      min="0"
                      max="100"
                      inputmode="numeric"
                      class="bg-background pr-8"
                      :aria-invalid="parameterErrors.bufferPercent ? true : undefined"
                    />
                    <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">%</span>
                  </div>
                  <p v-if="parameterErrors.bufferPercent" class="mt-1.5 text-xs text-destructive">
                    {{ parameterErrors.bufferPercent }}
                  </p>
                  <p v-else class="mt-1.5 text-xs text-muted-foreground">
                    Tambahan {{ parameters.bufferPercent || '0' }}% antisipasi lonjakan · maks 100%
                  </p>
                </div>

                <!-- Histori pemakaian -->
                <div class="rounded-lg border bg-muted/30 p-3">
                  <div class="mb-2 flex items-center justify-between">
                    <label for="spk-lookback-days" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Histori pemakaian
                    </label>
                    <span class="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">hari</span>
                  </div>
                  <div class="relative">
                    <Input
                      id="spk-lookback-days"
                      v-model="parameters.lookbackDays"
                      type="number"
                      min="7"
                      max="90"
                      inputmode="numeric"
                      class="bg-background pr-12"
                      :aria-invalid="parameterErrors.lookbackDays ? true : undefined"
                    />
                    <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">hari</span>
                  </div>
                  <p v-if="parameterErrors.lookbackDays" class="mt-1.5 text-xs text-destructive">
                    {{ parameterErrors.lookbackDays }}
                  </p>
                  <p v-else class="mt-1.5 text-xs text-muted-foreground">
                    Basis WMA dari {{ parameters.lookbackDays || '?' }} hari terakhir · min 7, maks 90
                  </p>
                </div>
              </div>

              <!-- Baris 2: Filter bahan dan pemasok -->
              <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-lg border bg-muted/30 p-3">
                  <label for="spk-ingredient-type" class="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Jenis bahan
                  </label>
                  <NativeSelect id="spk-ingredient-type" v-model="parameters.ingredientType" class="w-full bg-background">
                    <option v-for="option in ingredientTypeOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </option>
                  </NativeSelect>
                  <p class="mt-1.5 text-xs text-muted-foreground">{{ selectedIngredientTypeOption.description }}</p>
                </div>

                <div class="rounded-lg border bg-muted/30 p-3">
                  <label for="spk-supplier" class="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Pemasok
                  </label>
                  <NativeSelect
                    id="spk-supplier"
                    v-model="parameters.supplierId"
                    class="w-full bg-background"
                    :disabled="isLoadingSuppliers"
                  >
                    <option value="all">Semua pemasok</option>
                    <option v-for="supplier in supplierOptions" :key="supplier.id" :value="supplier.id">
                      {{ supplier.name }}
                    </option>
                  </NativeSelect>
                  <p class="mt-1.5 text-xs text-muted-foreground">
                    {{ isLoadingSuppliers ? 'Memuat pemasok...' : selectedSupplierLabel }}
                  </p>
                </div>
              </div>

              <Alert v-if="supplierErrorMessage" variant="destructive">
                <AlertCircle class="size-4" aria-hidden="true" />
                <AlertDescription>{{ supplierErrorMessage }}</AlertDescription>
              </Alert>

              <Alert v-if="analysisErrorMessage" variant="destructive">
                <AlertCircle class="size-4" aria-hidden="true" />
                <AlertDescription>{{ analysisErrorMessage }}</AlertDescription>
              </Alert>

              <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-xs text-muted-foreground">
                  Klik "Jalankan Analisa" untuk memproses data dengan parameter di atas.
                </p>
                <div class="flex gap-2">
                  <Button type="button" variant="ghost" size="sm" @click="resetParameters">
                    <RotateCcw class="size-4" aria-hidden="true" />
                    Reset
                  </Button>
                  <Button type="submit" :disabled="hasParameterError">
                    <BrainCircuit class="size-4" aria-hidden="true" />
                    Jalankan Analisa
                    <ArrowRight class="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>

            </form>
          </div>
        </section>

        <!-- Sidebar ringkasan parameter + transparansi SPK -->
        <aside class="hidden lg:flex lg:w-72 lg:flex-col lg:gap-3">

          <!-- Ringkasan parameter real-time -->
          <div class="rounded-xl border bg-muted/40 p-4 text-sm">
            <p class="mb-3 font-semibold text-foreground">Ringkasan parameter</p>
            <dl class="space-y-2">
              <div class="flex justify-between gap-2">
                <dt class="text-muted-foreground">Target stok</dt>
                <dd class="font-medium tabular-nums">{{ parameters.targetDays }} hari</dd>
              </div>
              <div class="flex justify-between gap-2">
                <dt class="text-muted-foreground">Cadangan stok</dt>
                <dd class="font-medium tabular-nums">{{ parameters.bufferPercent }}%</dd>
              </div>
              <div class="flex justify-between gap-2">
                <dt class="text-muted-foreground">Histori</dt>
                <dd class="font-medium tabular-nums">{{ parameters.lookbackDays }} hari</dd>
              </div>
              <Separator class="my-1" />
              <div class="flex justify-between gap-2">
                <dt class="text-muted-foreground">Bahan</dt>
                <dd class="text-right font-medium">{{ selectedIngredientTypeOption.label }}</dd>
              </div>
              <div class="flex justify-between gap-2">
                <dt class="text-muted-foreground">Pemasok</dt>
                <dd class="text-right font-medium">{{ selectedSupplierLabel }}</dd>
              </div>
            </dl>
          </div>

          <!-- Formula & bobot kriteria -->
          <div class="rounded-xl border bg-card p-4 text-sm">
            <div class="mb-3 flex items-center gap-2">
              <BrainCircuit class="size-4 text-primary" aria-hidden="true" />
              <p class="font-semibold">Kriteria & Bobot SPK</p>
            </div>

            <!-- Formula bertahap -->
            <div class="mb-3 space-y-1.5 rounded-lg bg-muted/50 px-3 py-2.5">
              <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Formula perhitungan</p>
              <p class="font-mono text-xs leading-relaxed text-foreground">
                ① Kebutuhan = WMA × Target hari
              </p>
              <p class="font-mono text-xs leading-relaxed text-foreground">
                ② Cadangan = Kebutuhan × Cadangan%
              </p>
              <p class="font-mono text-xs leading-relaxed text-foreground">
                ③ Total = Kebutuhan + Cadangan
              </p>
              <p class="font-mono text-xs leading-relaxed text-foreground">
                ④ Saran order = max(0, Total − Stok)
              </p>
            </div>

            <!-- Bobot parameter visual -->
            <div class="space-y-2.5">
              <div>
                <div class="mb-1 flex items-center justify-between">
                  <span class="text-xs text-muted-foreground">Histori pemakaian</span>
                  <span class="text-xs font-medium text-foreground">{{ parameters.lookbackDays }} hari</span>
                </div>
                <div class="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    class="h-full rounded-full bg-primary transition-all"
                    :style="{ width: `${Math.min(100, (lookbackDaysValue / 90) * 100)}%` }"
                  />
                </div>
                <p class="mt-0.5 text-xs text-muted-foreground">Mempengaruhi kualitas WMA — makin panjang makin stabil</p>
              </div>

              <div>
                <div class="mb-1 flex items-center justify-between">
                  <span class="text-xs text-muted-foreground">Target stok aman</span>
                  <span class="text-xs font-medium text-foreground">{{ parameters.targetDays }} hari</span>
                </div>
                <div class="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    class="h-full rounded-full bg-info transition-all"
                    :style="{ width: `${Math.min(100, (targetDaysValue / 90) * 100)}%` }"
                  />
                </div>
                <p class="mt-0.5 text-xs text-muted-foreground">Pengali WMA — makin besar → qty order makin banyak</p>
              </div>

              <div>
                <div class="mb-1 flex items-center justify-between">
                  <span class="text-xs text-muted-foreground">Cadangan stok</span>
                  <span class="text-xs font-medium text-foreground">{{ parameters.bufferPercent }}%</span>
                </div>
                <div class="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    class="h-full rounded-full bg-warning transition-all"
                    :style="{ width: `${Math.min(100, bufferPercentValue)}%` }"
                  />
                </div>
                <p class="mt-0.5 text-xs text-muted-foreground">Tambahan % dari kebutuhan dasar sebagai penyangga</p>
              </div>
            </div>
          </div>

          <!-- Alur proses SPK -->
          <div class="rounded-xl border bg-primary/5 p-4 text-sm">
            <p class="mb-3 font-semibold text-primary">Alur proses</p>
            <ol class="space-y-2.5">
              <li class="flex items-start gap-2.5">
                <span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
                <div>
                  <p class="font-medium text-foreground">Recipe Explosion (MRP)</p>
                  <p class="text-xs text-muted-foreground">Telusuri resep menu → hitung pemakaian bahan dari histori transaksi</p>
                </div>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
                <div>
                  <p class="font-medium text-foreground">Forecasting (WMA)</p>
                  <p class="text-xs text-muted-foreground">Hitung rata-rata pemakaian harian — data terbaru diberi bobot lebih tinggi</p>
                </div>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                <div>
                  <p class="font-medium text-foreground">Reorder Point + Safety Stock</p>
                  <p class="text-xs text-muted-foreground">Hitung total kebutuhan beserta cadangan, kurangi stok saat ini</p>
                </div>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
                <div>
                  <p class="font-medium text-foreground">Susun draf order</p>
                  <p class="text-xs text-muted-foreground">Kelompokkan rekomendasi per pemasok + estimasi biaya total</p>
                </div>
              </li>
            </ol>
          </div>

        </aside>
      </div>
    </template>

    <!-- ── TAMPILAN 2: LOADING ──────────────────────────────────────────── -->
    <template v-else-if="currentView === 'loading'">
      <div class="flex min-h-[28rem] flex-1 flex-col items-center justify-center rounded-xl border bg-card px-4 text-center shadow-xs">
        <div class="flex flex-col items-center gap-5">
          <div class="relative flex size-20 items-center justify-center">
            <div class="absolute inset-0 animate-ping rounded-full bg-primary/15" />
            <div class="absolute inset-2 animate-pulse rounded-full bg-primary/20" />
            <BrainCircuit class="relative size-8 text-primary" aria-hidden="true" />
          </div>

          <div>
            <p class="text-lg font-semibold">Menganalisa kebutuhan restock...</p>
            <p class="mt-1 text-sm text-muted-foreground">
              Backend sedang menghitung WMA dan menyusun rekomendasi order.
            </p>
          </div>

          <div class="flex w-full max-w-xs flex-col gap-2 rounded-lg border bg-muted/30 px-4 py-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Target stok</span>
              <span class="font-medium">{{ parameters.targetDays }} hari</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Cadangan stok</span>
              <span class="font-medium">{{ parameters.bufferPercent }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Histori pemakaian</span>
              <span class="font-medium">{{ parameters.lookbackDays }} hari</span>
            </div>
          </div>

          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner class="size-4" />
            Memproses data...
          </div>
        </div>
      </div>
    </template>

    <!-- ── TAMPILAN 3: HASIL ────────────────────────────────────────────── -->
    <template v-else-if="currentView === 'result'">

      <!-- Toolbar hasil -->
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="outline" size="sm" @click="handleBackToInput">
          <RefreshCcw class="size-4" aria-hidden="true" />
          Ubah Parameter
        </Button>

        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarRange class="size-4 shrink-0" aria-hidden="true" />
          <span>{{ lookbackPeriodLabel }}</span>
          <Separator orientation="vertical" class="h-4" />
          <span>{{ analysisDateLabel }}</span>
        </div>
      </div>

      <!-- Panel transparansi parameter yang dipakai -->
      <div class="rounded-xl border bg-muted/30 px-4 py-3">
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div class="flex items-center gap-1.5">
            <span class="size-2 rounded-full bg-primary" />
            <span class="text-muted-foreground">Histori pemakaian:</span>
            <span class="font-medium tabular-nums">{{ processedQuery?.lookback_days ?? '-' }} hari</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="size-2 rounded-full bg-info" />
            <span class="text-muted-foreground">Target stok:</span>
            <span class="font-medium tabular-nums">{{ processedQuery?.target_days ?? '-' }} hari</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="size-2 rounded-full bg-warning" />
            <span class="text-muted-foreground">Cadangan stok:</span>
            <span class="font-medium tabular-nums">{{ processedQuery?.buffer_percent ?? '-' }}%</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-muted-foreground">Jenis bahan:</span>
            <span class="font-medium">{{ ingredientTypeOptions.find(o => o.value === processedQuery?.ingredient_type)?.label ?? 'Semua' }}</span>
          </div>
          <div class="ml-auto flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <span>Saran = max(0, WMA×Target×(1+Cadangan%) − Stok)</span>
          </div>
        </div>
      </div>

      <!-- Metrik ringkasan -->
      <section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan hasil SPK">
        <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
          <template #icon>
            <component :is="getMetricIcon(item.id)" class="size-4" aria-hidden="true" />
          </template>
        </AdminDataMetric>
      </section>

      <!-- Draf order per pemasok -->
      <section class="rounded-xl border bg-card shadow-xs" aria-labelledby="spk-draft-title">
        <div class="flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex min-w-0 items-start gap-3">
            <span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-info/10 text-info">
              <ClipboardList class="size-4" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <h2 id="spk-draft-title" class="text-base font-semibold">
                Draf Order per Pemasok
              </h2>
              <p class="mt-0.5 text-sm text-muted-foreground">
                {{ resultDescription }}
              </p>
            </div>
          </div>
          <AdminReportExportActions
            :disabled="!visibleItems.length"
            :exporting="exporting"
            @export-pdf="handleExport('pdf')"
            @export-excel="handleExport('excel')"
          />
        </div>

        <div class="border-b px-4 py-3">
          <AdminDataToolbar
            v-model="search"
            search-id="spk-result-search"
            search-label="Cari hasil SPK"
            search-placeholder="Cari bahan, pemasok, satuan, atau estimasi"
          >
            <template #action>
              <Button
                v-if="Object.keys(orderOverrides).length"
                type="button"
                variant="outline"
                size="sm"
                @click="resetOrderOverrides"
              >
                <RotateCcw class="size-4" aria-hidden="true" />
                Reset Qty
              </Button>
            </template>
          </AdminDataToolbar>
        </div>

        <!-- Kosong -->
        <div
          v-if="!supplierDrafts.length"
          class="flex min-h-64 flex-col items-center justify-center gap-3 px-4 py-10 text-center"
        >
          <span class="flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <PackageSearch class="size-6" aria-hidden="true" />
          </span>
          <div>
            <p class="text-sm font-medium">Tidak ada bahan yang perlu direstock</p>
            <p class="mt-1 text-sm text-muted-foreground">
              Tidak ada rekomendasi untuk parameter dan filter saat ini.
            </p>
          </div>
        </div>

        <!-- Daftar per pemasok -->
        <div v-else class="divide-y">
          <article
            v-for="supplier in supplierDrafts"
            :key="supplier.id"
          >
            <!-- Header pemasok -->
            <button
              type="button"
              class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              :aria-expanded="isSupplierExpanded(supplier.id)"
              @click="toggleSupplier(supplier.id)"
            >
              <span class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                {{ supplier.name.charAt(0).toUpperCase() }}
              </span>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <p class="truncate text-sm font-semibold">{{ supplier.name }}</p>
                  <Badge variant="secondary" class="shrink-0 font-mono text-xs">
                    {{ supplier.items.length }} item
                  </Badge>
                </div>
                <p class="mt-0.5 truncate text-xs text-muted-foreground">
                  {{ supplier.contact }} · {{ formatCurrency(supplier.totalEstimatedCost) }}
                </p>
              </div>
              <ChevronUp
                v-if="isSupplierExpanded(supplier.id)"
                class="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <ChevronDown
                v-else
                class="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
            </button>

            <!-- Tabel item pemasok -->
            <div v-if="isSupplierExpanded(supplier.id)" class="overflow-x-auto border-t bg-muted/20">
              <Table class="min-w-[720px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Bahan</TableHead>
                    <TableHead class="text-right">Stok</TableHead>
                    <TableHead class="text-right">WMA/Hari</TableHead>
                    <TableHead class="w-40 text-right">Qty Order</TableHead>
                    <TableHead class="text-right">Harga/Unit</TableHead>
                    <TableHead class="text-right">Estimasi</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    v-for="item in supplier.items"
                    :key="`${supplier.id}-${item.ingredient_id}`"
                    class="bg-background"
                  >
                    <TableCell>
                      <p class="text-sm font-medium">{{ item.name }}</p>
                      <p class="text-xs text-muted-foreground">{{ getIngredientTypeLabel(item.type) }}</p>
                    </TableCell>
                    <TableCell class="text-right text-sm tabular-nums">
                      {{ formatQuantity(item.current_stock, item.unit) }}
                    </TableCell>
                    <TableCell class="text-right text-sm tabular-nums">
                      {{ formatQuantity(item.wma_daily_average, item.unit) }}
                    </TableCell>
                    <TableCell class="text-right">
                      <Input
                        :model-value="getOrderQuantityInputValue(item)"
                        type="number"
                        min="0"
                        step="any"
                        inputmode="decimal"
                        class="ml-auto w-32 text-right"
                        :aria-label="`Qty order ${item.name}`"
                        @update:model-value="value => updateSuggestedQty(item.ingredient_id, value)"
                      />
                    </TableCell>
                    <TableCell class="text-right text-sm tabular-nums">
                      {{ formatCurrency(item.avg_cost) }}
                    </TableCell>
                    <TableCell class="text-right text-sm font-medium tabular-nums">
                      {{ formatCurrency(getItemEstimatedCost(item)) }}
                    </TableCell>
                    <TableCell>
                      <span
                        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                        :class="{
                          'bg-destructive/15 text-destructive': getRestockStatus(item).tone === 'destructive',
                          'bg-warning/15 text-warning-foreground': getRestockStatus(item).tone === 'warning',
                          'bg-info/15 text-info': getRestockStatus(item).tone === 'info',
                        }"
                      >
                        {{ getRestockStatus(item).label }}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div class="flex items-center justify-between border-t bg-background/60 px-4 py-2">
                <p class="text-xs text-muted-foreground">{{ supplier.items.length }} bahan · {{ supplier.name }}</p>
                <p class="text-sm font-semibold tabular-nums">
                  {{ formatCurrency(supplier.totalEstimatedCost) }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Tabel detail semua bahan -->
      <section class="rounded-xl border bg-card shadow-xs" aria-labelledby="spk-table-title">
        <div class="flex min-w-0 items-start gap-3 border-b px-4 py-4">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheck class="size-4" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <h2 id="spk-table-title" class="text-base font-semibold">
              Detail Semua Bahan
            </h2>
            <p class="mt-0.5 text-sm text-muted-foreground">
              Tabel lengkap hasil analisa WMA untuk semua bahan yang difilter.
            </p>
          </div>
        </div>

        <div class="p-4">
          <AdminDataTable
            :columns="columns"
            :rows="rows"
            :loading="false"
            :actions="[]"
            label="hasil SPK"
            empty-title="Hasil SPK tidak ditemukan"
            empty-description="Coba ubah kata kunci pencarian."
          />
        </div>
      </section>
    </template>
  </div>
</template>
