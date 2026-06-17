<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'

const props = withDefaults(defineProps<{
  label: string
  quantity: number
  canIncrement?: boolean
}>(), {
  canIncrement: true,
})

const emit = defineEmits<{
  decrement: []
  increment: []
}>()
</script>

<template>
  <div class="flex items-center gap-1" :aria-label="label">
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      :aria-label="`Kurangi ${label}`"
      @click="emit('decrement')"
    >
      <Minus class="size-4" aria-hidden="true" />
    </Button>

    <output class="flex h-8 min-w-10 items-center justify-center rounded-md border bg-background px-2 text-sm font-medium">
      {{ props.quantity }}
    </output>

    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      :aria-label="`Tambah ${label}`"
      :disabled="!props.canIncrement"
      @click="emit('increment')"
    >
      <Plus class="size-4" aria-hidden="true" />
    </Button>
  </div>
</template>
