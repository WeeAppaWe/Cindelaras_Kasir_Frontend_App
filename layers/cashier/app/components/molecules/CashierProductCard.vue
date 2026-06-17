<script setup lang="ts">
import type { CashierProduct } from '../../types/cashier'
import { ImageIcon } from 'lucide-vue-next'
import { Card, CardContent } from '#layers/base/app/components/ui/card'
import CashierCurrency from '../atoms/CashierCurrency.vue'

const props = defineProps<{
  product: CashierProduct
}>()

const emit = defineEmits<{
  add: [product: CashierProduct]
}>()

const isAvailable = computed(() => props.product.isAvailable ?? props.product.stock > 0)

function handleAdd() {
  if (!isAvailable.value) {
    return
  }

  emit('add', props.product)
}
</script>

<template>
  <Card
    role="button"
    :tabindex="isAvailable ? 0 : -1"
    :aria-disabled="!isAvailable"
    :aria-label="isAvailable ? `Tambah ${props.product.name} ke keranjang` : `${props.product.name} tidak tersedia`"
    class="group min-w-0 cursor-pointer gap-0 overflow-hidden rounded-md py-0 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    :class="!isAvailable ? 'cursor-not-allowed opacity-75 hover:border-border' : ''"
    @click="handleAdd"
    @keydown.enter.prevent="handleAdd"
    @keydown.space.prevent="handleAdd"
  >
    <div class="relative h-48 shrink-0 overflow-hidden bg-muted sm:h-52 xl:h-56">
      <img
        v-if="props.product.imageUrl"
        :src="props.product.imageUrl"
        :alt="props.product.name"
        class="size-full object-cover transition-transform duration-200"
        :class="isAvailable ? 'group-hover:scale-105' : 'grayscale'"
        loading="lazy"
      >
      <div v-else class="flex size-full items-center justify-center text-muted-foreground">
        <ImageIcon class="size-9" aria-hidden="true" />
      </div>
      <span
        v-if="!isAvailable"
        class="absolute left-3 top-3 rounded-md border border-destructive/40 bg-destructive px-2 py-1 text-xs font-medium text-white shadow-xs"
      >
        Tidak tersedia
      </span>
    </div>

    <CardContent class="flex min-h-24 flex-col justify-between gap-2 p-4">
      <h3 class="line-clamp-2 min-h-10 text-base font-semibold leading-5">
        {{ props.product.name }}
      </h3>
      <p class="text-lg font-semibold tracking-normal text-primary">
        <CashierCurrency :value="props.product.price" />
      </p>
    </CardContent>
  </Card>
</template>
