<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type {
  BaseApexChartOptions,
  BaseBarChartSeries,
} from '../../types/base-apex-chart'
import {
  formatBaseApexChartValue,
  mergeBaseApexChartOptions,
} from '../../utils/base-apex-chart'
import BaseApexChart from '../BaseApexChart/BaseApexChart.vue'

const props = withDefaults(defineProps<{
  series: BaseBarChartSeries[]
  categories: string[]
  title?: string
  height?: number | string
  horizontal?: boolean
  stacked?: boolean
  stackType?: 'normal' | '100%'
  distributed?: boolean
  colors?: string[]
  valuePrefix?: string
  valueSuffix?: string
  xAxisTitle?: string
  yAxisTitle?: string
  showLegend?: boolean
  showDataLabels?: boolean
  loading?: boolean
  empty?: boolean
  emptyText?: string
  options?: BaseApexChartOptions
  class?: HTMLAttributes['class']
}>(), {
  height: 320,
  horizontal: false,
  stacked: false,
  distributed: false,
  colors: () => ['#0369a1', '#16a34a', '#f59e0b', '#dc2626'],
  valuePrefix: '',
  valueSuffix: '',
  showLegend: true,
  showDataLabels: false,
  loading: false,
  empty: false,
  emptyText: 'Data chart belum tersedia.',
})

const normalizedSeries = computed(() => props.series.map(item => ({
  ...item,
  data: [...item.data],
})))

const chartOptions = computed<BaseApexChartOptions>(() => {
  const baseOptions: BaseApexChartOptions = {
    chart: {
      type: 'bar',
      fontFamily: 'var(--font-sans)',
      stacked: props.stacked,
      stackType: props.stackType,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: props.colors,
    dataLabels: {
      enabled: props.showDataLabels,
      formatter: value => formatBaseApexChartValue(value, props.valuePrefix, props.valueSuffix),
      style: {
        colors: ['var(--foreground)'],
        fontSize: '11px',
      },
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor: 'var(--border)',
      strokeDashArray: 4,
    },
    legend: {
      fontSize: '12px',
      labels: {
        colors: 'var(--foreground)',
      },
      position: 'top',
      show: props.showLegend && props.series.length > 1,
    },
    plotOptions: {
      bar: {
        barHeight: '68%',
        borderRadius: 4,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        columnWidth: '48%',
        distributed: props.distributed,
        horizontal: props.horizontal,
      },
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2,
    },
    tooltip: {
      y: {
        formatter: value => formatBaseApexChartValue(value, props.valuePrefix, props.valueSuffix),
      },
    },
    xaxis: {
      categories: [...props.categories],
      labels: {
        rotate: props.horizontal ? 0 : -30,
        style: {
          colors: 'var(--muted-foreground)',
          fontSize: '12px',
        },
        trim: true,
      },
      title: {
        text: props.xAxisTitle,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'var(--muted-foreground)',
          fontSize: '12px',
        },
      },
      title: {
        text: props.yAxisTitle,
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
    type="bar"
    :height="height"
    :options="chartOptions"
    :series="normalizedSeries"
    :loading="loading"
    :empty="empty"
    :empty-text="emptyText"
    :class="props.class"
  />
</template>
