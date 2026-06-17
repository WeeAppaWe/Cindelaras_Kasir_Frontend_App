<script setup lang="ts">
import type { AdminStatusTone } from '../../types/admin-management'
import { Badge } from '#layers/base/app/components/ui/badge'

const props = withDefaults(defineProps<{
  tone?: AdminStatusTone
}>(), {
  tone: 'default',
})

const toneClass = computed(() => {
  if (props.tone === 'success') {
    return 'border-transparent bg-success text-success-foreground'
  }

  if (props.tone === 'warning') {
    return 'border-transparent bg-warning text-warning-foreground'
  }

  if (props.tone === 'info') {
    return 'border-transparent bg-primary text-primary-foreground'
  }

  if (props.tone === 'destructive') {
    return 'border-transparent bg-destructive text-white'
  }

  return 'border-transparent bg-secondary text-secondary-foreground'
})
</script>

<template>
  <Badge :class="toneClass">
    <slot />
  </Badge>
</template>
