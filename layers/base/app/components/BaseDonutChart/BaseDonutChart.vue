<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BaseApexChartOptions } from '../../types/base-apex-chart'
import {
  formatBaseApexChartValue,
  mergeBaseApexChartOptions,
} from '../../utils/base-apex-chart'
import BaseApexChart from '../BaseApexChart/BaseApexChart.vue'

const props = withDefaults(defineProps<{
  series: number[]
  labels: string[]
  title?: string
  height?: number | string
  colors?: string[]
  donutSize?: string
  totalLabel?: string
  valuePrefix?: string
  valueSuffix?: string
  showLegend?: boolean
  showDataLabels?: boolean
  loading?: boolean
  empty?: boolean
  emptyText?: string
  options?: BaseApexChartOptions
  class?: HTMLAttributes['class']
}>(), {
  height: 320,
  colors: () => ['#0369a1', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed'],
  donutSize: '64%',
  totalLabel: 'Total',
  valuePrefix: '',
  valueSuffix: '',
  showLegend: true,
  showDataLabels: false,
  loading: false,
  empty: false,
  emptyText: 'Data chart belum tersedia.',
})

const normalizedSeries = computed(() => props.series.map(value => Number.isFinite(Number(value)) ? Number(value) : 0))

const chartOptions = computed<BaseApexChartOptions>(() => {
  const baseOptions: BaseApexChartOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'var(--font-sans)',
      toolbar: { show: false },
    },
    colors: props.colors,
    dataLabels: {
      enabled: props.showDataLabels,
    },
    labels: [...props.labels],
    legend: {
      fontSize: '12px',
      labels: {
        colors: 'var(--foreground)',
      },
      position: props.showLegend ? 'bottom' : 'right',
      show: props.showLegend,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          minAngleToShowLabel: 12,
        },
        donut: {
          size: props.donutSize,
          labels: {
            show: true,
            name: {
              color: 'var(--muted-foreground)',
              fontSize: '12px',
              fontWeight: 500,
            },
            value: {
              color: 'var(--foreground)',
              fontSize: '18px',
              fontWeight: 700,
              formatter: value => formatBaseApexChartValue(value, props.valuePrefix, props.valueSuffix),
            },
            total: {
              show: true,
              color: 'var(--foreground)',
              fontSize: '18px',
              fontWeight: 700,
              label: props.totalLabel,
              formatter: (context) => {
                const totals = context.globals.seriesTotals as number[]
                const total = totals.reduce((sum, value) => sum + value, 0)

                return formatBaseApexChartValue(total, props.valuePrefix, props.valueSuffix)
              },
            },
          },
        },
      },
    },
    stroke: {
      colors: ['var(--card)'],
      width: 2,
    },
    tooltip: {
      y: {
        formatter: value => formatBaseApexChartValue(value, props.valuePrefix, props.valueSuffix),
      },
    },
  }

  if (props.title?.trim()) {
    baseOptions.title = {
      align: 'left',
      text: props.title,
      style: {
        color: 'var(--foreground)',
        fontSize: '14px',
        fontWeight: 600,
      },
    }
  }

  return mergeBaseApexChartOptions(baseOptions, props.options)
})
</script>

<template>
  <BaseApexChart
    type="donut"
    :height="height"
    :options="chartOptions"
    :series="normalizedSeries"
    :loading="loading"
    :empty="empty"
    :empty-text="emptyText"
    :class="props.class"
  />
</template>
