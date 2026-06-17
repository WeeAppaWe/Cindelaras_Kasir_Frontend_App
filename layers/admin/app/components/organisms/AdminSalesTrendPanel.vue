<script setup lang="ts">
import type { AdminSalesTrendPoint } from '../../types/admin-dashboard'
import type { BaseApexChartOptions, BaseMixedChartSeries } from '#layers/base/app/types/base-apex-chart'
import BaseMixedChart from '#layers/base/app/components/BaseMixedChart/BaseMixedChart.vue'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'

type SalesTrendRange = '7' | '14' | '30'

const props = defineProps<{
  items: AdminSalesTrendPoint[]
}>()

const rangeOptions: Array<{ label: string, value: SalesTrendRange }> = [
  { label: '7 hari', value: '7' },
  { label: '14 hari', value: '14' },
  { label: '30 hari', value: '30' },
]

const selectedRange = ref<SalesTrendRange>('7')
const filteredItems = computed(() => props.items.slice(-Number(selectedRange.value)))
const chartCategories = computed(() => filteredItems.value.map(item => item.label))
const chartSeries = computed<BaseMixedChartSeries[]>(() => [
  {
    name: 'Omset',
    type: 'column',
    data: filteredItems.value.map(item => item.revenue),
  },
  {
    name: 'Transaksi',
    type: 'line',
    data: filteredItems.value.map(item => item.transactions),
  },
])
const chartOptions = computed<BaseApexChartOptions>(() => ({
  tooltip: {
    y: {
      formatter: (value: number, context?: { seriesIndex?: number }) => {
        if (context?.seriesIndex === 1) {
          return `${formatNumber(Number(value))} transaksi`
        }

        return formatCurrency(Number(value))
      },
    },
  },
  yaxis: [
    {
      labels: {
        formatter: (value: number) => formatCompactCurrency(Number(value)),
      },
      title: {
        text: 'Omset',
      },
    },
    {
      labels: {
        formatter: (value: number) => formatNumber(Number(value)),
      },
      opposite: true,
      title: {
        text: 'Transaksi',
      },
    },
  ],
}))

function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value).replace(/\s/g, '')
}

function formatCompactCurrency(value: number) {
  if (!Number.isFinite(value)) {
    return '-'
  }

  return `Rp${Math.round(value / 1000000)} jt`
}

function formatNumber(value: number) {
  return Number.isFinite(value) ? new Intl.NumberFormat('id-ID').format(value) : '-'
}
</script>

<template>
  <section class="rounded-md border bg-card p-4 text-card-foreground shadow-xs" aria-labelledby="admin-sales-trend-title">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div class="min-w-0">
        <h2 id="admin-sales-trend-title" class="text-base font-semibold tracking-normal">
          Tren Penjualan
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          Omset dan transaksi berdasarkan rentang waktu.
        </p>
      </div>

      <div>
        <label for="admin-sales-trend-range" class="sr-only">Filter waktu tren penjualan</label>
        <NativeSelect id="admin-sales-trend-range" v-model="selectedRange" class="w-32">
          <option v-for="option in rangeOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </NativeSelect>
      </div>
    </div>

    <div v-if="filteredItems.length" class="mt-4">
      <BaseMixedChart
        :categories="chartCategories"
        :series="chartSeries"
        :options="chartOptions"
        :stroke-widths="[0, 3]"
        :colors="['#0369a1', '#16a34a']"
        primary-y-axis-title="Omset"
        secondary-y-axis-title="Transaksi"
        class="rounded-md border bg-muted/20 p-2"
        height="280"
      />
    </div>

    <p v-else class="mt-4 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
      Belum ada data penjualan.
    </p>
  </section>
</template>
