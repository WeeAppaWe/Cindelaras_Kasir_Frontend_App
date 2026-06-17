<script setup lang="ts">
import { AlertTriangle, BarChart3, ReceiptText, WalletCards } from 'lucide-vue-next'
import { Alert, AlertDescription } from '#layers/base/app/components/ui/alert'
import AdminDashboardMetric from '../../components/molecules/AdminDashboardMetric.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminInventoryStatusPanel from '../../components/organisms/AdminInventoryStatusPanel.vue'
import AdminPopularMenuPanel from '../../components/organisms/AdminPopularMenuPanel.vue'
import AdminSalesTrendPanel from '../../components/organisms/AdminSalesTrendPanel.vue'
import AdminStockMovementPanel from '../../components/organisms/AdminStockMovementPanel.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Dashboard Admin',
})

const {
  errorMessage,
  inventoryStatus,
  isLoading,
  loadDashboard,
  popularMenus,
  salesTrend,
  stockMovements,
  summaryMetrics,
} = useAdminDashboard()

const summaryMetricIcons = {
  'today-revenue': WalletCards,
  'today-transactions': ReceiptText,
  'estimated-profit': BarChart3,
  'low-stock': AlertTriangle,
}

function getSummaryMetricIcon(metricId: string) {
  return summaryMetricIcons[metricId as keyof typeof summaryMetricIcons] ?? BarChart3
}

onMounted(() => {
  void loadDashboard()
})
</script>

<template>
  <div class="flex min-h-full flex-col gap-3 p-3 sm:p-4" :aria-busy="isLoading">
    <AdminPageHeader
      title="Dashboard Admin"
      description="Ringkasan operasional, transaksi, profit, dan kondisi stok restoran Cindelaras."
    />

    <Alert v-if="errorMessage" variant="destructive">
      <AlertDescription>{{ errorMessage }}</AlertDescription>
    </Alert>

    <section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan dashboard admin">
      <AdminDashboardMetric
        v-for="item in summaryMetrics"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        :helper="item.helper"
        :tone="item.tone"
        :trend-label="item.trendLabel"
      >
        <template #icon>
          <component :is="getSummaryMetricIcon(item.id)" class="size-4" aria-hidden="true" />
        </template>
      </AdminDashboardMetric>
    </section>

    <div>
      <AdminSalesTrendPanel :items="salesTrend" />
    </div>

    <div class="grid items-stretch gap-3 xl:grid-cols-[minmax(360px,0.95fr)_minmax(0,1.2fr)]">
      <div class="grid gap-3">
        <AdminPopularMenuPanel :items="popularMenus" />
        <AdminInventoryStatusPanel :items="inventoryStatus" />
      </div>
      <AdminStockMovementPanel :items="stockMovements" class="h-full" />
    </div>
  </div>
</template>
