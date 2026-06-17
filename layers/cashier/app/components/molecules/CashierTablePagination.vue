<script setup lang="ts">
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '#layers/base/app/components/ui/pagination'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'

const props = withDefaults(defineProps<{
  page: number
  pageSize: number
  totalItems: number
  label: string
  disabled?: boolean
  pageSizeOptions?: number[]
}>(), {
  pageSize: 5,
  disabled: false,
  pageSizeOptions: () => [5, 10, 25],
})

const emit = defineEmits<{
  'update:page': [value: number]
  'update:pageSize': [value: number]
}>()

const pageValue = computed({
  get: () => props.page,
  set: value => emit('update:page', value),
})

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.pageSize)))
const firstItem = computed(() => props.totalItems ? (props.page - 1) * props.pageSize + 1 : 0)
const lastItem = computed(() => Math.min(props.page * props.pageSize, props.totalItems))
const pageSizeId = computed(() => `${props.label.replace(/\s+/g, '-')}-page-size`)
const pageSizeLabel = computed(() => `${props.label.charAt(0).toUpperCase()}${props.label.slice(1)} per halaman`)
const summaryText = computed(() => {
  if (props.disabled) {
    return `Memuat ${props.label}...`
  }

  return `Menampilkan ${firstItem.value}-${lastItem.value} dari ${props.totalItems} ${props.label}.`
})
const pageSizeValue = computed({
  get: () => String(props.pageSize),
  set: value => emit('update:pageSize', Number(value)),
})
</script>

<template>
  <div class="flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <p class="text-sm text-muted-foreground" aria-live="polite">
        {{ summaryText }}
      </p>

      <div class="flex items-center gap-2">
        <label :for="pageSizeId" class="text-sm text-muted-foreground">
          {{ pageSizeLabel }}
        </label>
        <NativeSelect
          :id="pageSizeId"
          v-model="pageSizeValue"
          class="w-24"
          :disabled="props.disabled"
        >
          <option v-for="option in props.pageSizeOptions" :key="option" :value="String(option)">
            {{ option }}
          </option>
        </NativeSelect>
      </div>
    </div>

    <Pagination
      v-if="totalPages > 1 && !props.disabled"
      v-model:page="pageValue"
      :items-per-page="props.pageSize"
      :total="props.totalItems"
      :sibling-count="1"
      show-edges
      class="mx-0 w-auto justify-start sm:justify-end"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious>
          <ChevronLeft class="size-4" aria-hidden="true" />
          Sebelumnya
        </PaginationPrevious>

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === pageValue"
            :aria-label="`Halaman ${item.value}`"
          >
            {{ item.value }}
          </PaginationItem>
          <PaginationEllipsis v-else :index="index">
            <MoreHorizontal class="size-4" aria-hidden="true" />
            <span class="sr-only">Halaman lainnya</span>
          </PaginationEllipsis>
        </template>

        <PaginationNext>
          Berikutnya
          <ChevronRight class="size-4" aria-hidden="true" />
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  </div>
</template>
