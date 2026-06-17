<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type {
  BaseApexChartOptions,
  BaseMixedChartSeries,
} from '../../types/base-apex-chart'
import { mergeBaseApexChartOptions } from '../../utils/base-apex-chart'
import BaseApexChart from '../BaseApexChart/BaseApexChart.vue'

const props = withDefaults(defineProps<{
  series: BaseMixedChartSeries[]
  categories: string[]
  title?: string
  height?: number | string
  primaryYAxisTitle?: string
  secondaryYAxisTitle?: string
  colors?: string[]
  strokeWidths?: number[]
  dataLabelSeriesIndexes?: number[]
  showDataLabels?: boolean
  loading?: boolean
  empty?: boolean
  emptyText?: string
  options?: BaseApexChartOptions
  class?: HTMLAttributes['class']
}>(), {
  height: 320,
  colors: () => ['#0369a1', '#16a34a', '#f59e0b'],
  strokeWidths: () => [0, 3],
  dataLabelSeriesIndexes: () => [1],
  showDataLabels: false,
  loading: false,
  empty: false,
  emptyText: 'Data chart belum tersedia.',
})

const normalizedSeries = computed(() => props.series.map(item => ({
  ...item,
  data: [...item.data],
})))
const normalizedStrokeWidths = computed(() => props.series.map((item, index) => props.strokeWidths[index] ?? (item.type === 'column' ? 0 : 3)))

const chartOptions = computed<BaseApexChartOptions>(() => {
  const primarySeries = props.series.find(item => item.type === 'column') ?? props.series[0]
  const secondarySeries = props.series.find(item => item.type === 'line' || item.type === 'area') ?? props.series[1] ?? props.series[0]
  const baseOptions: BaseApexChartOptions = {
    chart: {
      type: 'line',
      fontFamily: 'var(--font-sans)',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: props.colors,
    dataLabels: {
      enabled: props.showDataLabels,
      enabledOnSeries: props.dataLabelSeriesIndexes,
    },
    fill: {
      opacity: [0.9, 1, 0.25],
    },
    grid: {
      borderColor: 'var(--border)',
      strokeDashArray: 4,
    },
    labels: [...props.categories],
    legend: {
      fontSize: '12px',
      horizontalAlign: 'right',
      labels: {
        colors: 'var(--foreground)',
      },
      position: 'top',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        columnWidth: '44%',
      },
    },
    stroke: {
      curve: 'smooth',
      width: normalizedStrokeWidths.value,
    },
    tooltip: {
      intersect: false,
      shared: true,
    },
    xaxis: {
      labels: {
        rotate: -30,
        style: {
          colors: 'var(--muted-foreground)',
          fontSize: '12px',
        },
        trim: true,
      },
    },
    yaxis: [
      {
        title: {
          text: props.primaryYAxisTitle ?? primarySeries?.name ?? '',
        },
      },
      {
        opposite: true,
        title: {
          text: props.secondaryYAxisTitle ?? secondarySeries?.name ?? '',
        },
      },
    ],
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
    type="line"
    :height="height"
    :options="chartOptions"
    :series="normalizedSeries"
    :loading="loading"
    :empty="empty"
    :empty-text="emptyText"
    :class="props.class"
  />
</template>
