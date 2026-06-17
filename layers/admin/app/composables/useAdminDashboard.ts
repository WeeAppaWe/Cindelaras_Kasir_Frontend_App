import type {
  AdminDashboardAmount,
  AdminDashboardKpiResponse,
  AdminDashboardMetric,
  AdminDashboardMetricTone,
  AdminDashboardRecentStockMovementRecord,
  AdminDashboardSalesTrendPointRecord,
  AdminDashboardStockStatusCategory,
  AdminDashboardStockStatusName,
  AdminDashboardStockStatusResponse,
  AdminDashboardTopMenuRecord,
  AdminInventoryStatusItem,
  AdminInventoryStatusTone,
  AdminPopularMenuItem,
  AdminSalesTrendPoint,
  AdminStockMovementItem,
  AdminStockMovementType,
} from '../types/admin-dashboard'

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 2,
})

const compactNumberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
})

export function useAdminDashboard() {
  const dashboardApi = useAdminDashboardApi()
  const isLoading = ref(false)
  const errorMessage = ref('')
  const kpi = ref<AdminDashboardKpiResponse | null>(null)
  const salesTrendRecords = ref<AdminDashboardSalesTrendPointRecord[]>([])
  const topMenuRecords = ref<AdminDashboardTopMenuRecord[]>([])
  const stockStatus = ref<AdminDashboardStockStatusResponse | null>(null)
  const stockMovementRecords = ref<AdminDashboardRecentStockMovementRecord[]>([])

  const summaryMetrics = computed<AdminDashboardMetric[]>(() => createSummaryMetrics(kpi.value))
  const salesTrend = computed<AdminSalesTrendPoint[]>(() => mapSalesTrendRecords(salesTrendRecords.value))
  const popularMenus = computed<AdminPopularMenuItem[]>(() => topMenuRecords.value.map(mapTopMenuRecord))
  const inventoryStatus = computed<AdminInventoryStatusItem[]>(() => mapStockStatusResponse(stockStatus.value))
  const stockMovements = computed<AdminStockMovementItem[]>(() => stockMovementRecords.value.map(mapRecentStockMovementRecord))

  async function loadDashboard() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const [kpiResult, trendResult, menusResult, statusResult, movementsResult] = await Promise.all([
        dashboardApi.getKpi(),
        dashboardApi.getSalesTrend({ days: 30 }),
        dashboardApi.getTopMenus(),
        dashboardApi.getStockStatus(),
        dashboardApi.getRecentStockMovements(),
      ])

      kpi.value = kpiResult
      salesTrendRecords.value = Array.isArray(trendResult.data) ? trendResult.data : []
      topMenuRecords.value = Array.isArray(menusResult.items) ? menusResult.items : []
      stockStatus.value = statusResult
      stockMovementRecords.value = Array.isArray(movementsResult.items) ? movementsResult.items : []
    }
    catch (error) {
      errorMessage.value = getErrorMessage(error, 'Gagal memuat data dashboard.')
      kpi.value = null
      salesTrendRecords.value = []
      topMenuRecords.value = []
      stockStatus.value = null
      stockMovementRecords.value = []
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    errorMessage,
    inventoryStatus,
    isLoading,
    loadDashboard,
    popularMenus,
    salesTrend,
    stockMovements,
    summaryMetrics,
  }
}

function createSummaryMetrics(kpi: AdminDashboardKpiResponse | null): AdminDashboardMetric[] {
  if (!kpi) {
    return createEmptySummaryMetrics()
  }

  const revenueToday = toNumber(kpi?.revenue.today)
  const revenueChangeAmount = toNumber(kpi?.revenue.change_amount)
  const revenueChangePercentage = toNullableNumber(kpi?.revenue.change_percentage)
  const transactionsToday = toNumber(kpi?.transactions.today)
  const transactionChange = toNumber(kpi?.transactions.change)
  const grossProfit = toNumber(kpi?.profit.gross_profit)
  const marginPercentage = toNumber(kpi?.profit.margin_percentage)
  const lowStockCount = toNumber(kpi?.low_stock.count)

  return [
    {
      id: 'today-revenue',
      label: 'Omset Hari Ini',
      value: formatCurrency(revenueToday),
      helper: 'Akumulasi transaksi hari ini',
      tone: getRevenueTone(revenueChangeAmount),
      trendLabel: formatPercentageTrend(revenueChangePercentage, 'dari kemarin'),
    },
    {
      id: 'today-transactions',
      label: 'Total Transaksi',
      value: compactNumberFormatter.format(transactionsToday),
      helper: 'Semua metode pembayaran',
      tone: 'info',
      trendLabel: `${formatSignedNumber(transactionChange)} transaksi`,
    },
    {
      id: 'estimated-profit',
      label: 'Estimasi Profit',
      value: formatCurrency(grossProfit),
      helper: 'Berdasarkan modal resep',
      tone: 'profit',
      trendLabel: `${formatNumber(marginPercentage)}% margin kotor`,
    },
    {
      id: 'low-stock',
      label: 'Stok Menipis',
      value: compactNumberFormatter.format(lowStockCount),
      helper: 'Kritis atau mendekati minimum',
      tone: lowStockCount > 0 ? 'warning' : 'success',
      trendLabel: lowStockCount > 0 ? 'Cek persediaan' : 'Stok aman',
    },
  ]
}

function createEmptySummaryMetrics(): AdminDashboardMetric[] {
  return [
    {
      id: 'today-revenue',
      label: 'Omset Hari Ini',
      value: '-',
      helper: 'Akumulasi transaksi hari ini',
      tone: 'default',
    },
    {
      id: 'today-transactions',
      label: 'Total Transaksi',
      value: '-',
      helper: 'Semua metode pembayaran',
      tone: 'info',
    },
    {
      id: 'estimated-profit',
      label: 'Estimasi Profit',
      value: '-',
      helper: 'Berdasarkan modal resep',
      tone: 'profit',
    },
    {
      id: 'low-stock',
      label: 'Stok Menipis',
      value: '-',
      helper: 'Kritis atau mendekati minimum',
      tone: 'warning',
    },
  ]
}

function mapSalesTrendRecords(records: AdminDashboardSalesTrendPointRecord[]): AdminSalesTrendPoint[] {
  const highestRevenue = Math.max(0, ...records.map(item => toNumber(item.revenue)))

  return records.map((item) => {
    const revenue = toNumber(item.revenue)

    return {
      label: item.label,
      revenue,
      transactions: toNumber(item.transaction_count),
      revenueLabel: formatCurrency(revenue),
      ratio: highestRevenue > 0 ? Math.max(8, Math.round((revenue / highestRevenue) * 100)) : 0,
    }
  })
}

function mapTopMenuRecord(record: AdminDashboardTopMenuRecord): AdminPopularMenuItem {
  const revenue = toNumber(record.revenue)

  return {
    id: record.menu_id,
    name: record.menu_name,
    category: record.category_name,
    sold: toNumber(record.qty_sold),
    revenue,
    marginPercent: Math.round(toNumber(record.margin_percentage)),
    revenueLabel: formatCurrency(revenue),
  }
}

function mapStockStatusResponse(response: AdminDashboardStockStatusResponse | null): AdminInventoryStatusItem[] {
  const categories = response?.categories ?? []

  return [
    mapStockStatusCategory(categories, 'KRITIS'),
    mapStockStatusCategory(categories, 'MENIPIS'),
    mapStockStatusCategory(categories, 'AMAN'),
  ]
}

function mapStockStatusCategory(
  categories: AdminDashboardStockStatusCategory[],
  status: 'KRITIS' | 'MENIPIS' | 'AMAN',
): AdminInventoryStatusItem {
  const category = categories.find(item => normalizeStockStatus(item.status) === status)
  const tone = getInventoryToneFromStatus(status)

  return {
    id: status.toLowerCase(),
    status,
    count: toNumber(category?.count),
    percentage: toNumber(category?.percentage),
    statusLabel: getInventoryStatusLabel(tone),
    tone,
  }
}

function mapRecentStockMovementRecord(record: AdminDashboardRecentStockMovementRecord): AdminStockMovementItem {
  const qty = toNumber(record.qty)
  const absQty = Math.abs(qty)
  const type = getStockMovementType(record.stock_type_name, qty)

  return {
    id: record.stock_movement_id,
    time: formatTime(record.created_at),
    ingredientName: record.ingredient_name,
    type,
    typeLabel: formatStockTypeLabel(record.stock_type_name),
    quantityLabel: `${qty < 0 ? '-' : '+'}${formatNumber(absQty)}`,
    balanceLabel: formatNumber(toNumber(record.current_stock)),
  }
}

function getInventoryToneFromStatus(status: AdminDashboardStockStatusName): AdminInventoryStatusTone {
  const normalized = normalizeStockStatus(status)

  if (normalized === 'KRITIS') {
    return 'destructive'
  }

  if (normalized === 'MENIPIS') {
    return 'warning'
  }

  return 'success'
}

function getInventoryStatusLabel(tone: AdminInventoryStatusTone) {
  if (tone === 'destructive') {
    return 'Kritis'
  }

  if (tone === 'warning') {
    return 'Menipis'
  }

  return 'Aman'
}

function getStockMovementType(stockTypeName: string, qty: number): AdminStockMovementType {
  const normalized = normalizeStockTypeName(stockTypeName)

  if (normalized.includes('SALES') || normalized === 'SALES') {
    return 'sale'
  }

  if (normalized.includes('OPNAME')) {
    return 'opname'
  }

  if (normalized.startsWith('OUT_') || normalized === 'STOCK_OUT' || qty < 0) {
    return 'out'
  }

  if (normalized.startsWith('IN_') || normalized === 'STOCK_IN' || qty > 0) {
    return 'in'
  }

  return 'adjustment'
}

function formatStockTypeLabel(name: string) {
  const normalized = normalizeStockTypeName(name)

  if (normalized === 'STOCK_IN' || normalized === 'IN_PURCHASE') {
    return 'Stok masuk'
  }

  if (normalized === 'STOCK_OUT') {
    return 'Stok keluar'
  }

  if (normalized === 'OUT_DAMAGED') {
    return 'Rusak'
  }

  if (normalized === 'OUT_EXPIRED') {
    return 'Kedaluwarsa'
  }

  if (normalized === 'OUT_SALES' || normalized === 'SALES') {
    return 'Penjualan'
  }

  if (normalized === 'IN_PRODUCTION') {
    return 'Hasil produksi'
  }

  if (normalized === 'OUT_PRODUCTION') {
    return 'Pemakaian produksi'
  }

  if (normalized.includes('PRODUCTION')) {
    return 'Produksi'
  }

  if (normalized.includes('OPNAME')) {
    return 'Opname'
  }

  if (normalized.includes('ADJUSTMENT')) {
    return 'Penyesuaian'
  }

  if (!normalized) {
    return '-'
  }

  return normalized
    .split('_')
    .filter(Boolean)
    .map(segment => `${segment.charAt(0)}${segment.slice(1).toLowerCase()}`)
    .join(' ')
}

function getRevenueTone(changeAmount: number): AdminDashboardMetricTone {
  if (changeAmount < 0) {
    return 'warning'
  }

  return 'success'
}

function formatCurrency(value: number) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0).replace(/\s/g, '')
}

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0)
}

function formatSignedNumber(value: number) {
  if (value === 0) {
    return '0'
  }

  return `${value > 0 ? '+' : '-'}${formatNumber(Math.abs(value))}`
}

function formatPercentageTrend(value: number | null, suffix: string) {
  if (value === null) {
    return 'Belum ada pembanding'
  }

  return `${formatSignedNumber(value)}% ${suffix}`
}

function formatTime(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function normalizeStockTypeName(value: string) {
  return value.trim().toUpperCase().replace(/[\s-]+/g, '_')
}

function normalizeStockStatus(value: AdminDashboardStockStatusName) {
  return String(value).trim().toUpperCase()
}

function toNumber(value: AdminDashboardAmount) {
  const parsed = Number(value ?? 0)

  return Number.isFinite(parsed) ? parsed : 0
}

function toNullableNumber(value: AdminDashboardAmount) {
  if (value === null || value === undefined || value === '') {
    return null
  }

  return toNumber(value)
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
