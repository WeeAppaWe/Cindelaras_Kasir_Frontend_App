<script setup lang="ts">
import type { CashierCartItem } from '../../types/cashier'
import { Trash2 } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import CashierCurrency from '../atoms/CashierCurrency.vue'
import CashierQuantityControl from './CashierQuantityControl.vue'

const props = defineProps<{
  item: CashierCartItem
}>()

const emit = defineEmits<{
  decrement: [productId: string]
  increment: [productId: string]
  remove: [productId: string]
}>()

const canIncrement = computed(() => props.item.quantity < props.item.stock)
</script>

<template>
  <li class="rounded-md border bg-background p-2.5">
    <div class="flex items-start justify-between gap-2">
      <div class="min-w-0">
        <p class="truncate text-sm font-medium">{{ props.item.name }}</p>
        <p class="truncate text-xs text-muted-foreground">
          <CashierCurrency :value="props.item.price" /> per item
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        :aria-label="`Hapus ${props.item.name}`"
        @click="emit('remove', props.item.productId)"
      >
        <Trash2 class="size-4" aria-hidden="true" />
      </Button>
    </div>

    <div class="mt-2 flex items-center justify-between gap-3">
      <CashierQuantityControl
        :label="props.item.name"
        :quantity="props.item.quantity"
        :can-increment="canIncrement"
        @decrement="emit('decrement', props.item.productId)"
        @increment="emit('increment', props.item.productId)"
      />

      <p class="text-sm font-semibold">
        <CashierCurrency :value="props.item.quantity * props.item.price" />
      </p>
    </div>
  </li>
</template>
