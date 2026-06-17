<script setup lang="ts">
import type { AdminPopularMenuItem } from '../../types/admin-dashboard'
import type { BaseApexChartOptions, BaseBarChartSeries } from '#layers/base/app/types/base-apex-chart'
import BaseBarChart from '#layers/base/app/components/BaseBarChart/BaseBarChart.vue'

const props = defineProps<{
  items: AdminPopularMenuItem[]
}>()

const chartCategories = computed(() => props.items.map(item => item.name))
const chartHeight = computed(() => Math.max(260, props.items.length * 58))
const chartSeries = computed<BaseBarChartSeries[]>(() => [
  {
    name: 'Terjual',
    data: props.items.map(item => item.sold),
  },
])
const chartOptions = computed<BaseApexChartOptions>(() => ({
  tooltip: {
    y: {
      formatter: (value: number) => `${formatNumber(Number(value))} porsi`,
    },
  },
  xaxis: {
    labels: {
      formatter: (value: string | number) => formatNumber(Number(value)),
    },
  },
}))

function formatNumber(value: number) {
  return Number.isFinite(value) ? new Intl.NumberFormat('id-ID').format(value) : '-'
}
</script>

<template>
  <section class="rounded-md border bg-card p-4 text-card-foreground shadow-xs" aria-labelledby="admin-popular-menu-title">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <h2 id="admin-popular-menu-title" class="text-base font-semibold tracking-normal">
          Menu Terlaris
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          Urutan berdasarkan jumlah terjual sepanjang masa.
        </p>
      </div>
    </div>

    <div v-if="items.length" class="mt-4">
      <BaseBarChart
        :categories="chartCategories"
        :height="chartHeight"
        :options="chartOptions"
        :series="chartSeries"
        :colors="['#0369a1']"
        horizontal
        value-suffix=" porsi"
        class="rounded-md border bg-muted/20 p-2"
      />
    </div>

    <p v-else class="mt-4 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
      Belum ada menu terjual.
    </p>
  </section>
</template>
