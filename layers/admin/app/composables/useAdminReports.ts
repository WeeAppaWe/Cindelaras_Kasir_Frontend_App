import type {
  AdminCashierPerformanceReport,
  AdminFinanceDailyReport,
  AdminHourlyPerformanceReport,
  AdminInventoryMovementReport,
  AdminInventoryValuationReport,
  AdminMenuPerformanceReport,
  AdminOperationalDailyReport,
  AdminPaymentBreakdownReport,
} from '../types/admin-reports'
import type { AdminStatusTone } from '../types/admin-management'

interface FinanceDailySource {
  id: string
  day: string
  date: string
  transactionCount: number
  itemCount: number
  cashRevenue: number
  qrisRevenue: number
  refund: number
  cogs: number
  dineInTransactions: number
  takeawayTransactions: number
  whatsappReceiptCount: number
  refundCount: number
}

const financeDailySource: FinanceDailySource[] = [
  {
    id: 'report-20260527',
    day: 'Rab',
    date: '27 Mei 2026',
    transactionCount: 33,
    itemCount: 116,
    cashRevenue: 1225000,
    qrisRevenue: 1090000,
    refund: 45000,
    cogs: 1320000,
    dineInTransactions: 19,
    takeawayTransactions: 14,
    whatsappReceiptCount: 12,
    refundCount: 1,
  },
  {
    id: 'report-20260528',
    day: 'Kam',
    date: '28 Mei 2026',
    transactionCount: 39,
    itemCount: 142,
    cashRevenue: 1560000,
    qrisRevenue: 1225000,
    refund: 0,
    cogs: 1568000,
    dineInTransactions: 22,
    takeawayTransactions: 17,
    whatsappReceiptCount: 15,
    refundCount: 0,
  },
  {
    id: 'report-20260529',
    day: 'Jum',
    date: '29 Mei 2026',
    transactionCount: 46,
    itemCount: 169,
    cashRevenue: 1785000,
    qrisRevenue: 1455000,
    refund: 85000,
    cogs: 1840000,
    dineInTransactions: 28,
    takeawayTransactions: 18,
    whatsappReceiptCount: 19,
    refundCount: 2,
  },
  {
    id: 'report-20260530',
    day: 'Sab',
    date: '30 Mei 2026',
    transactionCount: 54,
    itemCount: 212,
    cashRevenue: 2260000,
    qrisRevenue: 1665000,
    refund: 40000,
    cogs: 2195000,
    dineInTransactions: 34,
    takeawayTransactions: 20,
    whatsappReceiptCount: 25,
    refundCount: 1,
  },
  {
    id: 'report-20260531',
    day: 'Min',
    date: '31 Mei 2026',
    transactionCount: 41,
    itemCount: 151,
    cashRevenue: 1395000,
    qrisRevenue: 1465000,
    refund: 0,
    cogs: 1605000,
    dineInTransactions: 24,
    takeawayTransactions: 17,
    whatsappReceiptCount: 18,
    refundCount: 0,
  },
  {
    id: 'report-20260601',
    day: 'Sen',
    date: '01 Jun 2026',
    transactionCount: 43,
    itemCount: 158,
    cashRevenue: 1635000,
    qrisRevenue: 1550000,
    refund: 35000,
    cogs: 1770000,
    dineInTransactions: 25,
    takeawayTransactions: 18,
    whatsappReceiptCount: 17,
    refundCount: 1,
  },
  {
    id: 'report-20260602',
    day: 'Sel',
    date: '02 Jun 2026',
    transactionCount: 38,
    itemCount: 137,
    cashRevenue: 1480000,
    qrisRevenue: 1320000,
    refund: 0,
    cogs: 1540000,
    dineInTransactions: 21,
    takeawayTransactions: 17,
    whatsappReceiptCount: 14,
    refundCount: 0,
  },
]

const cashierPerformanceSource: AdminCashierPerformanceReport[] = [
  {
    id: 'cashier-admin-demo',
    cashierName: 'Kasir Demo',
    shiftCount: 6,
    transactionCount: 188,
    revenue: 13745000,
    averageOrder: 73112,
    refundCount: 3,
    statusLabel: 'Stabil',
    statusTone: 'success',
  },
  {
    id: 'cashier-supervisor',
    cashierName: 'Supervisor Dapur',
    shiftCount: 2,
    transactionCount: 61,
    revenue: 4320000,
    averageOrder: 70820,
    refundCount: 1,
    statusLabel: 'Pantau',
    statusTone: 'info',
  },
  {
    id: 'cashier-training',
    cashierName: 'Kasir Training',
    shiftCount: 1,
    transactionCount: 45,
    revenue: 3045000,
    averageOrder: 67667,
    refundCount: 2,
    statusLabel: 'Perlu cek',
    statusTone: 'warning',
  },
]

const hourlyPerformanceSource: AdminHourlyPerformanceReport[] = [
  createHourlyPerformance('hour-08', '08.00 - 10.00', 42, 2460000),
  createHourlyPerformance('hour-10', '10.00 - 12.00', 66, 4285000),
  createHourlyPerformance('hour-12', '12.00 - 14.00', 93, 6810000),
  createHourlyPerformance('hour-14', '14.00 - 16.00', 51, 3295000),
  createHourlyPerformance('hour-16', '16.00 - 18.00', 38, 2420000),
  createHourlyPerformance('hour-18', '18.00 - 20.00', 29, 1865000),
]

const menuSoldQuantityById: Record<string, number> = {
  'menu-ayam-penyet': 86,
  'menu-lele-bakar': 64,
  'menu-ayam-bakar-madu': 58,
  'menu-tempe-penyet': 43,
  'menu-es-teh': 112,
  'menu-paket-lama': 18,
}

export function useAdminReports() {
  const { ingredients, menus, stockHistory } = useAdminManagementData()

  const financeDailyReports = computed<AdminFinanceDailyReport[]>(() => (
    financeDailySource.map(createFinanceDailyReport)
  ))

  const paymentBreakdown = computed<AdminPaymentBreakdownReport[]>(() => {
    const totalCashRevenue = financeDailyReports.value.reduce((total, item) => total + item.cashRevenue, 0)
    const totalQrisRevenue = financeDailyReports.value.reduce((total, item) => total + item.qrisRevenue, 0)
    const totalRevenue = totalCashRevenue + totalQrisRevenue

    return [
      {
        id: 'cash',
        label: 'Tunai',
        amount: totalCashRevenue,
        transactionCount: Math.round(financeDailyReports.value.reduce((total, item) => total + item.transactionCount, 0) * 0.54),
        ratio: totalRevenue > 0 ? Math.round((totalCashRevenue / totalRevenue) * 100) : 0,
        tone: 'success',
      },
      {
        id: 'qris',
        label: 'QRIS',
        amount: totalQrisRevenue,
        transactionCount: Math.round(financeDailyReports.value.reduce((total, item) => total + item.transactionCount, 0) * 0.46),
        ratio: totalRevenue > 0 ? Math.round((totalQrisRevenue / totalRevenue) * 100) : 0,
        tone: 'info',
      },
    ]
  })

  const inventoryValuationReports = computed<AdminInventoryValuationReport[]>(() => (
    ingredients.value.map(item => ({
      id: item.id,
      ingredientName: item.name,
      unit: item.unit,
      stock: item.stock,
      minimumStock: item.minimumStock,
      costPerUnit: item.costPerUnit,
      inventoryValue: Math.round(item.stock * item.costPerUnit),
      statusLabel: item.stockStatusLabel,
      statusTone: item.stockStatusTone,
    }))
  ))

  const inventoryMovementReports = computed<AdminInventoryMovementReport[]>(() => (
    stockHistory.value.map(item => ({
      id: item.id,
      date: item.date,
      ingredientName: item.ingredientName,
      typeLabel: item.typeLabel,
      typeTone: item.typeTone,
      source: item.source,
      quantityLabel: item.quantityLabel,
      balanceLabel: item.balanceLabel,
      note: item.note,
    }))
  ))

  const operationalDailyReports = computed<AdminOperationalDailyReport[]>(() => (
    financeDailyReports.value.map((item) => {
      const source = financeDailySource.find(candidate => candidate.id === item.id)

      return {
        id: item.id,
        day: item.day,
        date: item.date,
        transactionCount: item.transactionCount,
        itemCount: item.itemCount,
        revenue: item.netRevenue,
        averageOrder: item.averageOrder,
        dineInTransactions: source?.dineInTransactions ?? 0,
        takeawayTransactions: source?.takeawayTransactions ?? 0,
        whatsappReceiptCount: source?.whatsappReceiptCount ?? 0,
        refundCount: source?.refundCount ?? 0,
      }
    })
  ))

  const menuPerformanceReports = computed<AdminMenuPerformanceReport[]>(() => (
    menus.value
      .map((item) => {
        const soldQuantity = menuSoldQuantityById[item.id] ?? Math.max(item.recipeItemCount * 5, 8)
        const revenue = soldQuantity * item.sellingPrice
        const cogs = soldQuantity * item.totalRecipeCost
        const grossProfit = revenue - cogs

        return {
          id: item.id,
          menuName: item.name,
          category: item.category,
          soldQuantity,
          revenue,
          grossProfit,
          marginPercent: revenue > 0 ? Math.round((grossProfit / revenue) * 100) : 0,
          statusLabel: item.statusLabel,
          statusTone: item.statusTone,
        }
      })
      .sort((a, b) => b.soldQuantity - a.soldQuantity)
  ))

  return {
    cashierPerformanceReports: computed(() => cashierPerformanceSource),
    financeDailyReports,
    hourlyPerformanceReports: computed(() => hourlyPerformanceSource),
    inventoryMovementReports,
    inventoryValuationReports,
    menuPerformanceReports,
    operationalDailyReports,
    paymentBreakdown,
  }
}

function createFinanceDailyReport(source: FinanceDailySource): AdminFinanceDailyReport {
  const grossRevenue = source.cashRevenue + source.qrisRevenue
  const netRevenue = grossRevenue - source.refund
  const grossProfit = netRevenue - source.cogs

  return {
    id: source.id,
    day: source.day,
    date: source.date,
    transactionCount: source.transactionCount,
    itemCount: source.itemCount,
    cashRevenue: source.cashRevenue,
    qrisRevenue: source.qrisRevenue,
    grossRevenue,
    refund: source.refund,
    netRevenue,
    cogs: source.cogs,
    grossProfit,
    marginPercent: netRevenue > 0 ? Math.round((grossProfit / netRevenue) * 100) : 0,
    averageOrder: source.transactionCount > 0 ? Math.round(netRevenue / source.transactionCount) : 0,
  }
}

function createHourlyPerformance(
  id: string,
  timeRange: string,
  transactionCount: number,
  revenue: number,
): AdminHourlyPerformanceReport {
  const tone = getHourlyActivityTone(transactionCount)

  return {
    id,
    timeRange,
    transactionCount,
    revenue,
    averageOrder: transactionCount > 0 ? Math.round(revenue / transactionCount) : 0,
    activityLabel: getHourlyActivityLabel(tone),
    activityTone: tone,
  }
}

function getHourlyActivityTone(transactionCount: number): AdminStatusTone {
  if (transactionCount >= 80) {
    return 'warning'
  }

  if (transactionCount >= 50) {
    return 'info'
  }

  return 'success'
}

function getHourlyActivityLabel(tone: AdminStatusTone) {
  if (tone === 'warning') {
    return 'Puncak'
  }

  if (tone === 'info') {
    return 'Ramai'
  }

  return 'Normal'
}
