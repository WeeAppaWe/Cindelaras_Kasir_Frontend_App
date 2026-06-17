<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  value: string
  helper?: string
  tone?: 'default' | 'success' | 'warning' | 'info' | 'destructive'
}>(), {
  helper: '',
  tone: 'default',
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

  if (props.tone === 'destructive') {
    return 'border-destructive/40 bg-destructive/10'
  }

  return 'bg-card'
})
</script>

<template>
  <section class="rounded-md border px-3 py-2 text-card-foreground shadow-xs" :class="toneClass" :aria-label="props.label">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="truncate text-xs font-medium text-muted-foreground">
          {{ props.label }}
        </p>
        <p class="mt-1 truncate text-lg font-semibold tracking-normal">
          {{ props.value }}
        </p>
        <p v-if="props.helper" class="mt-1 truncate text-xs text-muted-foreground">
          {{ props.helper }}
        </p>
      </div>

      <div v-if="$slots.icon" class="flex size-8 shrink-0 items-center justify-center rounded-md bg-background/80 text-muted-foreground">
        <slot name="icon" />
      </div>
    </div>
  </section>
</template>
