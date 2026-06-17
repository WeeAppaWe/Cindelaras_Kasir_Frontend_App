<script setup lang="ts">
import type { CashierProduct, CashierProductCategory } from '../../types/cashier'
import { PackageSearch, RotateCcw, Search, SlidersHorizontal } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import { Skeleton } from '#layers/base/app/components/ui/skeleton'
import CashierProductCard from '../molecules/CashierProductCard.vue'

type ProductAvailabilityFilter = 'all' | 'available' | 'unavailable'

const props = withDefaults(defineProps<{
  products: CashierProduct[]
  categories: CashierProductCategory[]
  searchTerm: string
  selectedCategoryId: string
  availabilityFilter: ProductAvailabilityFilter
  desktopColumnCount?: 3 | 4 | 5
  cartQuantities?: Record<string, number>
  loading?: boolean
  loadingItemCount?: number
}>(), {
  availabilityFilter: 'all',
  desktopColumnCount: 3,
  cartQuantities: () => ({}),
  loading: false,
  loadingItemCount: 6,
})

const emit = defineEmits<{
  'update:searchTerm': [value: string]
  'update:selectedCategoryId': [value: string]
  'update:availabilityFilter': [value: ProductAvailabilityFilter]
  addProduct: [product: CashierProduct]
}>()

const availabilityFilters: { label: string, value: ProductAvailabilityFilter }[] = [
  { label: 'Semua status', value: 'all' },
  { label: 'Tersedia', value: 'available' },
  { label: 'Tidak tersedia', value: 'unavailable' },
]

const searchValue = computed({
  get: () => props.searchTerm,
  set: value => emit('update:searchTerm', value),
})

const availabilityValue = computed({
  get: () => props.availabilityFilter,
  set: value => emit('update:availabilityFilter', value),
})

const filteredProducts = computed(() => {
  const keyword = props.searchTerm.trim().toLowerCase()

  return props.products.filter((product) => {
    const matchCategory = !props.selectedCategoryId || product.categoryId === props.selectedCategoryId
    const isAvailable = product.isAvailable ?? product.stock > 0
    const matchAvailability = props.availabilityFilter === 'all'
      || (props.availabilityFilter === 'available' && isAvailable)
      || (props.availabilityFilter === 'unavailable' && !isAvailable)
    const matchKeyword = !keyword || [
      product.name,
      product.sku,
      product.category,
    ].some(value => value.toLowerCase().includes(keyword))

    return matchCategory && matchAvailability && matchKeyword
  })
})

const isEmptyStateVisible = computed(() => !props.loading && !filteredProducts.value.length)

const hasActiveFilters = computed(() => {
  return Boolean(
    props.searchTerm.trim()
    || props.selectedCategoryId
    || props.availabilityFilter !== 'all',
  )
})

const activeFilterLabels = computed(() => {
  const labels: string[] = []
  const searchTerm = props.searchTerm.trim()
  const activeAvailability = availabilityFilters.find(filter => filter.value === props.availabilityFilter)
  const activeCategory = props.categories.find(category => category.id === props.selectedCategoryId)

  if (searchTerm) {
    labels.push(`Kata kunci: ${searchTerm}`)
  }

  if (props.selectedCategoryId) {
    labels.push(`Kategori: ${activeCategory?.name ?? props.selectedCategoryId}`)
  }

  if (props.availabilityFilter !== 'all' && activeAvailability) {
    labels.push(`Status: ${activeAvailability.label}`)
  }

  return labels
})

const emptyStateTitle = computed(() => {
  if (props.availabilityFilter === 'unavailable') {
    return 'Semua produk tersedia'
  }

  if (hasActiveFilters.value) {
    return 'Produk tidak ditemukan'
  }

  return 'Belum ada produk'
})

const emptyStateDescription = computed(() => {
  if (props.availabilityFilter === 'unavailable') {
    return 'Tidak ada produk berstatus tidak tersedia pada filter yang sedang aktif.'
  }

  if (hasActiveFilters.value) {
    return 'Coba longgarkan filter untuk melihat menu yang tersedia pada shift ini.'
  }

  return 'Produk akan tampil di sini setelah daftar menu tersedia.'
})

const productGridClass = computed(() => {
  if (props.desktopColumnCount === 5) {
    return 'lg:grid-cols-5'
  }

  if (props.desktopColumnCount === 4) {
    return 'lg:grid-cols-4'
  }

  return 'lg:grid-cols-3'
})

const productListSpacingClass = computed(() => {
  return isEmptyStateVisible.value
    ? 'p-0 pb-6'
    : 'p-1 pb-6 sm:p-2 sm:pb-6'
})

function resetProductFilters() {
  emit('update:searchTerm', '')
  emit('update:selectedCategoryId', '')
  emit('update:availabilityFilter', 'all')
}

function showAvailableProducts() {
  emit('update:availabilityFilter', 'available')
}
</script>

<template>
  <section
    class="flex min-h-0 min-w-0 flex-1 flex-col gap-3"
    aria-labelledby="cashier-products-title"
    :aria-busy="props.loading"
  >
    <div class="flex flex-col gap-3 rounded-md border bg-card p-3 text-card-foreground shadow-xs">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="cashier-products-title" class="text-base font-semibold tracking-normal">
            Daftar Menu
          </h2>
          <p class="text-sm text-muted-foreground">
            {{ props.loading ? 'Memuat daftar menu...' : `${filteredProducts.length} item ditampilkan.` }}
          </p>
        </div>

        <div class="relative w-full sm:max-w-sm">
          <label for="product-search" class="sr-only">Cari produk</label>
          <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="product-search"
            v-model="searchValue"
            type="search"
            class="h-10 pl-9"
            placeholder="Cari produk"
            :disabled="props.loading"
          />
        </div>
      </div>

      <div class="flex items-center gap-2 overflow-x-auto pb-1" aria-label="Filter daftar menu">
        <SlidersHorizontal class="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div class="shrink-0">
          <label for="product-availability-filter" class="sr-only">Filter ketersediaan menu</label>
          <NativeSelect id="product-availability-filter" v-model="availabilityValue" class="w-40" :disabled="props.loading">
            <option
              v-for="filter in availabilityFilters"
              :key="filter.value"
              :value="filter.value"
            >
              {{ filter.label }}
            </option>
          </NativeSelect>
        </div>
        <Button
          v-for="category in props.categories"
          :key="category.id || 'all'"
          type="button"
          size="sm"
          :variant="props.selectedCategoryId === category.id ? 'default' : 'outline'"
          :aria-pressed="props.selectedCategoryId === category.id"
          class="shrink-0"
          :disabled="props.loading"
          @click="emit('update:selectedCategoryId', category.id)"
        >
          {{ category.name }}
        </Button>
      </div>
    </div>

    <div
      class="cashier-scrollbar grid min-h-0 min-w-0 flex-1 auto-rows-max grid-cols-1 content-start items-start gap-4 overflow-y-auto overflow-x-hidden sm:grid-cols-2 sm:gap-5"
      :class="[productGridClass, productListSpacingClass]"
    >
      <template v-if="props.loading">
        <div
          v-for="index in props.loadingItemCount"
          :key="`product-loading-${index}`"
          class="overflow-hidden rounded-md border bg-card"
        >
          <Skeleton class="h-48 rounded-none sm:h-52 xl:h-56" />
          <div class="space-y-3 p-4">
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-4 w-1/2" />
            <Skeleton class="h-5 w-24" />
          </div>
        </div>
      </template>

      <template v-else>
        <CashierProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add="emit('addProduct', product)"
        />
      </template>

      <div
        v-if="isEmptyStateVisible"
        role="status"
        class="col-span-full flex min-h-80 items-center justify-center rounded-md border bg-card px-6 py-8 text-center shadow-xs sm:min-h-96 sm:px-8"
      >
        <div class="mx-auto flex w-full max-w-md flex-col items-center gap-4">
          <span class="flex size-14 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
            <PackageSearch class="size-7" aria-hidden="true" />
          </span>

          <div class="space-y-2">
            <h3 class="text-base font-semibold tracking-normal text-card-foreground">
              {{ emptyStateTitle }}
            </h3>
            <p class="text-sm leading-6 text-muted-foreground">
              {{ emptyStateDescription }}
            </p>
          </div>

          <div v-if="activeFilterLabels.length" class="flex flex-wrap justify-center gap-2">
            <span
              v-for="label in activeFilterLabels"
              :key="label"
              class="rounded-md border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {{ label }}
            </span>
          </div>

          <div v-if="hasActiveFilters" class="flex w-full max-w-sm flex-col items-stretch justify-center gap-2 sm:flex-row">
            <Button type="button" size="sm" class="w-full justify-center sm:w-44" @click="resetProductFilters">
              <RotateCcw class="size-4" aria-hidden="true" />
              Reset filter
            </Button>
            <Button
              v-if="props.availabilityFilter !== 'available'"
              type="button"
              size="sm"
              variant="outline"
              class="w-full justify-center sm:w-44"
              @click="showAvailableProducts"
            >
              Lihat produk tersedia
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
