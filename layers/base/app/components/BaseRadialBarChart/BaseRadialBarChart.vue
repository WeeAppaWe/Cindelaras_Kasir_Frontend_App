<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BaseApexChartOptions } from '../../types/base-apex-chart'
import {
  clampBaseApexPercentage,
  mergeBaseApexChartOptions,
} from '../../utils/base-apex-chart'
import BaseApexChart from '../BaseApexChart/BaseApexChart.vue'

const props = withDefaults(defineProps<{
  series: number[]
  labels: string[]
  title?: string
  height?: number | string
  colors?: string[]
  hollowSize?: string
  totalLabel?: string
  showLegend?: boolean
  showTotal?: boolean
  startAngle?: number
  endAngle?: number
  loading?: boolean
  empty?: boolean
  emptyText?: string
  options?: BaseApexChartOptions
  class?: HTMLAttributes['class']
}>(), {
  height: 320,
  colors: () => ['#0369a1', '#16a34a', '#f59e0b', '#dc2626'],
  hollowSize: '68%',
  totalLabel: 'Rata-rata',
  showLegend: true,
  showTotal: true,
  startAngle: -135,
  endAngle: 135,
  loading: false,
  empty: false,
  emptyText: 'Data chart belum tersedia.',
})

const normalizedSeries = computed(() => props.series.map(clampBaseApexPercentage))

const chartOptions = computed<BaseApexChartOptions>(() => {
  const baseOptions: BaseApexChartOptions = {
    chart: {
      type: 'radialBar',
      fontFamily: 'var(--font-sans)',
      toolbar: { show: false },
    },
    colors: props.colors,
    labels: [...props.labels],
    legend: {
      fontSize: '12px',
      labels: {
        colors: 'var(--foreground)',
      },
      position: 'bottom',
      show: props.showLegend && props.labels.length > 1,
    },
    plotOptions: {
      radialBar: {
        endAngle: props.endAngle,
        hollow: {
          background: 'transparent',
          size: props.hollowSize,
        },
        startAngle: props.startAngle,
        track: {
          background: 'var(--muted)',
          margin: 6,
          strokeWidth: '97%',
        },
        dataLabels: {
          name: {
            color: 'var(--muted-foreground)',
            fontSize: '12px',
            fontWeight: 500,
          },
          value: {
            color: 'var(--foreground)',
            fontSize: '20px',
            fontWeight: 700,
            formatter: value => `${Math.round(Number(value))}%`,
          },
          total: {
            show: props.showTotal,
            color: 'var(--foreground)',
            fontSize: '20px',
            fontWeight: 700,
            label: props.totalLabel,
            formatter: (context) => {
              const totals = context.globals.seriesTotals as number[]

              if (!totals.length) {
                return '0%'
              }

              const average = totals.reduce((sum, value) => sum + value, 0) / totals.length

              return `${Math.round(average)}%`
            },
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
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
    type="radialBar"
    :height="height"
    :options="chartOptions"
    :series="normalizedSeries"
    :loading="loading"
    :empty="empty"
    :empty-text="emptyText"
    :class="props.class"
  />
</template>
