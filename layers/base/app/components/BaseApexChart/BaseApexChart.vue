<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type {
  BaseApexChartOptions,
  BaseApexChartType,
  BaseApexSeries,
} from '../../types/base-apex-chart'
import { cn } from '#layers/base/app/utils'

const props = withDefaults(defineProps<{
  type: BaseApexChartType
  options: BaseApexChartOptions
  series: BaseApexSeries
  height?: number | string
  loading?: boolean
  empty?: boolean
  emptyText?: string
  class?: HTMLAttributes['class']
}>(), {
  height: 320,
  loading: false,
  empty: false,
  emptyText: 'Data chart belum tersedia.',
})

const normalizedHeight = computed(() => typeof props.height === 'number' ? `${props.height}px` : props.height)
const shouldShowEmpty = computed(() => props.empty || !hasSeriesData(props.series))

function hasSeriesData(series: BaseApexSeries) {
  if (!Array.isArray(series) || !series.length) {
    return false
  }

  return series.some((item) => {
    if (typeof item === 'number') {
      return true
    }

    if (!item || typeof item !== 'object' || !('data' in item) || !Array.isArray(item.data)) {
      return false
    }

    return item.data.some(value => value !== null && value !== undefined)
  })
}
</script>

<template>
  <div :class="cn('w-full min-w-0', props.class)">
    <div
      v-if="loading"
      class="flex w-full animate-pulse items-end gap-2 rounded-md border border-dashed bg-muted/30 p-4"
      :style="{ minHeight: normalizedHeight }"
      aria-hidden="true"
    >
      <span
        v-for="index in 12"
        :key="`base-chart-loading-${index}`"
        class="flex-1 rounded-t-sm bg-muted"
        :style="{ height: `${24 + ((index * 17) % 72)}%` }"
      />
    </div>

    <div
      v-else-if="shouldShowEmpty"
      class="flex w-full items-center justify-center rounded-md border border-dashed bg-muted/20 px-4 text-center text-sm text-muted-foreground"
      :style="{ minHeight: normalizedHeight }"
    >
      {{ emptyText }}
    </div>

    <ClientOnly v-else>
      <apexchart
        :type="type"
        :height="height"
        :options="options"
        :series="series"
      />

      <template #fallback>
        <div
          class="flex w-full animate-pulse items-end gap-2 rounded-md border border-dashed bg-muted/30 p-4"
          :style="{ minHeight: normalizedHeight }"
          aria-hidden="true"
        >
          <span
            v-for="index in 12"
            :key="`base-chart-fallback-${index}`"
            class="flex-1 rounded-t-sm bg-muted"
            :style="{ height: `${24 + ((index * 17) % 72)}%` }"
          />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
