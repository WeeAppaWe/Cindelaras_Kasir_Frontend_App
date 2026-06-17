<script setup lang="ts">
import type { CashierStatus } from '../../types/cashier'
import { Badge } from '#layers/base/app/components/ui/badge'

const props = withDefaults(defineProps<{
  status?: CashierStatus
}>(), {
  status: 'neutral',
})

const statusClass = computed(() => {
  if (props.status === 'success') {
    return 'border-transparent bg-success text-success-foreground'
  }

  if (props.status === 'warning') {
    return 'border-transparent bg-warning text-warning-foreground'
  }

  if (props.status === 'info') {
    return 'border-transparent bg-info text-info-foreground'
  }

  return 'border-border bg-secondary text-secondary-foreground'
})
</script>

<template>
  <Badge variant="outline" :class="statusClass">
    <slot />
  </Badge>
</template>
