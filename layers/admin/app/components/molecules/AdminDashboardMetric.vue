<script setup lang="ts">
import type { AdminDashboardMetricTone } from '../../types/admin-dashboard'

const props = withDefaults(defineProps<{
  label: string
  value: string
  helper: string
  tone?: AdminDashboardMetricTone
  trendLabel?: string
}>(), {
  tone: 'default',
  trendLabel: '',
})

const toneClass = computed(() => {
  if (props.tone === 'success') {
    return 'border-success/40 bg-success/10'
  }

  if (props.tone === 'warning') {
    return 'border-warning/50 bg-warning/15'
  }

  if (props.tone === 'info') {
    return 'border-info/40 bg-info/10'
  }

  if (props.tone === 'profit') {
    return 'border-profit/40 bg-profit/10'
  }

  if (props.tone === 'destructive') {
    return 'border-destructive/40 bg-destructive/10'
  }

  return 'bg-card'
})
</script>

<template>
  <section
    class="rounded-md border p-3 text-card-foreground shadow-xs"
    :class="toneClass"
    :aria-label="label"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="truncate text-xs font-medium text-muted-foreground">
          {{ label }}
        </p>
        <p class="mt-1 truncate text-2xl font-semibold tracking-normal">
          {{ value }}
        </p>
      </div>

      <div v-if="$slots.icon" class="flex size-9 shrink-0 items-center justify-center rounded-md bg-background/80 text-muted-foreground">
        <slot name="icon" />
      </div>
    </div>

    <div class="mt-3 flex min-w-0 items-center justify-between gap-2">
      <p class="min-w-0 truncate text-xs text-muted-foreground">
        {{ helper }}
      </p>
      <p v-if="trendLabel" class="shrink-0 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-foreground">
        {{ trendLabel }}
      </p>
    </div>
  </section>
</template>
