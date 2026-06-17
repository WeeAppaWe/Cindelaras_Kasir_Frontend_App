<script setup lang="ts">
import type {
  AdminCrudDetailItem,
  AdminDataMetric as AdminDataMetricItem,
  AdminDataTableColumn,
  AdminDataTableRow,
} from '../../../types/admin-management'
import type { AdminMenuCategoryOption, AdminMenuRecipeFormItem, AdminMenuViewItem } from '../../../types/admin-menu'
import { Percent, Plus, ToggleRight, UtensilsCrossed } from 'lucide-vue-next'
import { buttonVariants } from '#layers/base/app/components/ui/button'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import AdminDataMetric from '../../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../../components/molecules/AdminPageHeader.vue'
import AdminCrudDialog from '../../../components/organisms/AdminCrudDialog.vue'
import AdminDataTable from '../../../components/organisms/AdminDataTable.vue'
import {
  formatAdminMenuCurrency,
  formatAdminMenuNumber,
  mapAdminMenuCategoryOption,
  mapAdminMenuRecordToViewItem,
} from '../../../utils/admin-menu'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Manajemen Menu',
})

type CrudMode = 'detail' | 'delete'
type StatusFilter = 'all' | 'available' | 'unavailable'

const adminMenuApi = useAdminMenuApi()
const { runAdminAction } = useAdminActionFeedback()
const search = ref('')
const statusFilter = ref<StatusFilter>('all')
const categoryFilter = ref('all')
const isLoading = ref(false)
const isCrudLoading = ref(false)
const isCrudDialogOpen = ref(false)
const crudMode = ref<CrudMode>('detail')
const loadError = ref('')
const menus = ref<AdminMenuViewItem[]>([])
const categoryOptions = ref<AdminMenuCategoryOption[]>([])
const selectedMenu = ref<AdminMenuViewItem | null>(null)
const selectedMenuDetail = ref<AdminMenuViewItem | null>(null)

let filterTimer: ReturnType<typeof setTimeout> | null = null

const availableMenus = computed(() => menus.value.filter(item => item.isAvailable))
const averageMarginPercent = computed(() => {
  if (!menus.value.length) {
    return 0
  }

  const totalMarginPercent = menus.value.reduce((total, item) => total + item.marginPercent, 0)

  return Math.round(totalMarginPercent / menus.value.length)
})
const averageMarginLabel = computed(() => `${formatAdminMenuNumber(averageMarginPercent.value)}%`)

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Total Menu',
    value: String(menus.value.length),
    helper: 'Dalam hasil filter',
    tone: 'info',
  },
  {
    id: 'available',
    label: 'Tersedia',
    value: String(availableMenus.value.length),
    helper: 'Aktif di kasir',
    tone: 'success',
  },
  {
    id: 'margin',
    label: 'Rata-rata Margin',
    value: averageMarginLabel.value,
    helper: 'Dari harga jual',
    tone: 'default',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'menu', label: 'Menu', class: 'min-w-64' },
  { key: 'category', label: 'Kategori', class: 'min-w-36' },
  { key: 'recipe', label: 'Resep', class: 'min-w-56' },
  { key: 'cost', label: 'HPP', align: 'right', class: 'min-w-32' },
  { key: 'price', label: 'Harga Jual', align: 'right', class: 'min-w-32' },
  { key: 'margin', label: 'Margin', align: 'right', class: 'min-w-40' },
  { key: 'status', label: 'Status', class: 'min-w-28' },
]

const rows = computed<AdminDataTableRow[]>(() => menus.value.map(item => ({
  id: item.id,
  cells: {
    menu: {
      label: item.name,
      description: item.description,
      imageUrl: item.imageUrl,
      imageAlt: item.name,
    },
    category: item.categoryName,
    recipe: {
      label: `${item.recipeCount} bahan`,
      description: item.recipeSummary,
    },
    cost: {
      label: item.costLabel,
      description: 'HPP menu',
    },
    price: item.priceLabel,
    margin: {
      label: item.profitLabel,
      description: item.marginPercentLabel,
    },
    status: {
      type: 'switch',
      label: item.statusLabel,
      checked: item.isAvailable,
      disabled: isCrudLoading.value,
    },
  },
})))

const dialogTitle = computed(() => crudMode.value === 'delete' ? 'Hapus Menu' : 'Detail Menu')
const dialogDescription = computed(() => {
  if (crudMode.value === 'delete') {
    return 'Konfirmasi penghapusan menu dari data sistem.'
  }

  return isCrudLoading.value ? 'Memuat detail dan resep menu...' : 'Informasi lengkap menu yang tercatat.'
})
const detailMenu = computed(() => selectedMenuDetail.value ?? selectedMenu.value)
const detailItems = computed<AdminCrudDetailItem[]>(() => {
  const item = detailMenu.value

  if (!item) {
    return []
  }

  return [
    { label: 'Nama Menu', value: item.name },
    { label: 'Kategori', value: item.categoryName },
    { label: 'HPP', value: item.costLabel },
    { label: 'Harga Jual', value: item.priceLabel },
    { label: 'Margin', value: `${item.profitLabel} (${item.marginPercentLabel})` },
    { label: 'Status', value: item.statusLabel, tone: item.statusTone },
    { label: 'Dibuat', value: item.createdAt },
    { label: 'Diperbarui', value: item.updatedAt },
    { label: 'Deskripsi', value: item.description, description: 'Deskripsi yang tampil untuk menu.' },
  ]
})

onMounted(async () => {
  await Promise.all([
    loadCategoryOptions(),
    loadMenus(),
  ])
})

onBeforeUnmount(() => {
  if (filterTimer) {
    clearTimeout(filterTimer)
  }
})

watch([search, categoryFilter, statusFilter], () => {
  if (filterTimer) {
    clearTimeout(filterTimer)
  }

  filterTimer = setTimeout(() => {
    loadMenus()
  }, 300)
})

async function loadCategoryOptions() {
  try {
    const result = await adminMenuApi.getCategories()
    categoryOptions.value = result.map(mapAdminMenuCategoryOption)
  }
  catch {
    categoryOptions.value = []
  }
}

async function loadMenus() {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  loadError.value = ''

  try {
    const result = await adminMenuApi.getMenus({
      batch: 1,
      size: 100,
      search: search.value.trim() || undefined,
      category_id: categoryFilter.value === 'all' ? undefined : categoryFilter.value,
      is_available: getAvailabilityFilterValue(),
    })

    menus.value = result.records.map(mapAdminMenuRecordToViewItem)
  }
  catch (error) {
    loadError.value = getErrorMessage(error, 'Gagal memuat daftar menu.')
    menus.value = []
  }
  finally {
    isLoading.value = false
  }
}

function getAvailabilityFilterValue() {
  if (statusFilter.value === 'available') {
    return true
  }

  if (statusFilter.value === 'unavailable') {
    return false
  }

  return undefined
}

function findMenu(id: string) {
  return menus.value.find(item => item.id === id) ?? null
}

async function openDetailDialog(id: string) {
  const item = findMenu(id)

  if (!item) {
    return
  }

  selectedMenu.value = item
  selectedMenuDetail.value = item
  crudMode.value = 'detail'
  isCrudDialogOpen.value = true
  isCrudLoading.value = true

  try {
    const detail = await adminMenuApi.getMenuDetail(id)

    selectedMenuDetail.value = mapAdminMenuRecordToViewItem(detail)
  }
  catch {
    selectedMenuDetail.value = item
  }
  finally {
    isCrudLoading.value = false
  }
}

function openEditPage(id: string) {
  return navigateTo(`/admin/menu/${id}`)
}

function openDeleteDialog(id: string) {
  selectedMenu.value = findMenu(id)
  selectedMenuDetail.value = selectedMenu.value
  crudMode.value = 'delete'
  isCrudDialogOpen.value = Boolean(selectedMenu.value)
}

async function handleToggleAvailability(id: string) {
  const item = findMenu(id)

  if (!item) {
    return
  }

  const previousIsAvailable = item.isAvailable
  const nextIsAvailable = !item.isAvailable

  await runAdminAction(async () => {
    updateMenuAvailability(id, nextIsAvailable)

    try {
      await adminMenuApi.toggleMenuAvailability(id)
      await loadMenus()
    }
    catch (error) {
      updateMenuAvailability(id, previousIsAvailable)
      throw error
    }
  }, {
    loading: isCrudLoading,
    successMessage: item.isAvailable ? 'Menu ditandai habis.' : 'Menu ditandai tersedia.',
    errorMessage: 'Gagal mengubah status menu.',
  })
}

function updateMenuAvailability(id: string, isAvailable: boolean) {
  menus.value = menus.value.map(item => item.id === id
    ? {
        ...item,
        isAvailable,
        statusLabel: isAvailable ? 'Tersedia' : 'Habis',
        statusTone: isAvailable ? 'success' : 'warning',
      }
    : item)
}

async function handleDelete() {
  if (!selectedMenu.value) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    await adminMenuApi.deleteMenu(selectedMenu.value!.id)
    await loadMenus()
  }, {
    loading: isCrudLoading,
    successMessage: 'Menu berhasil dihapus.',
    errorMessage: 'Gagal menghapus menu.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
}

function getRecipeTypeLabel(type: AdminMenuRecipeFormItem['type']) {
  if (type === 'semi_finished') {
    return 'Setengah jadi'
  }

  return 'Bahan baku'
}

function getRecipeQuantityLabel(quantity: number, unit: string | undefined) {
  const value = formatAdminMenuNumber(quantity)
  const unitLabel = unit?.trim()

  return unitLabel ? `${value} ${unitLabel}` : value
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
</script>

<template>
  <div class="flex min-h-full flex-col gap-3 p-3 sm:p-4">
    <AdminPageHeader
      title="Menu"
      description="Kelola gambar, ketersediaan, resep, HPP, harga jual, dan margin menu."
    />

    <section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan menu">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <UtensilsCrossed v-if="item.id === 'total'" class="size-4" aria-hidden="true" />
          <ToggleRight v-else-if="item.id === 'available'" class="size-4" aria-hidden="true" />
          <Percent v-else class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="menu-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="menu-table-title" class="text-base font-semibold tracking-normal">
            Daftar Menu
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Pantau komposisi resep, HPP, harga jual, margin, dan status tampil di kasir.
          </p>
        </div>
      </div>

      <div v-if="loadError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ loadError }}
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="menu-search"
        search-label="Cari menu"
        search-placeholder="Cari nama menu"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="menu-category-filter" class="sr-only">Filter kategori menu</label>
            <NativeSelect id="menu-category-filter" v-model="categoryFilter" class="w-44" :disabled="isLoading">
              <option value="all">Semua kategori</option>
              <option v-for="category in categoryOptions" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </NativeSelect>
          </div>

          <div>
            <label for="menu-status-filter" class="sr-only">Filter status menu</label>
            <NativeSelect id="menu-status-filter" v-model="statusFilter" class="w-36" :disabled="isLoading">
              <option value="all">Semua status</option>
              <option value="available">Tersedia</option>
              <option value="unavailable">Habis</option>
            </NativeSelect>
          </div>
        </template>

        <template #action>
          <a
            href="/admin/menu/create"
            :class="buttonVariants({ size: 'sm' })"
          >
            <Plus class="size-4" aria-hidden="true" />
            Tambah Menu
          </a>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          :actions="['view', 'edit', 'delete']"
          label="menu"
          empty-title="Menu tidak ditemukan"
          empty-description="Ubah kata kunci, kategori, atau filter status menu."
          @view="openDetailDialog"
          @toggle="handleToggleAvailability"
          @edit="openEditPage"
          @delete="openDeleteDialog"
        />
      </div>
    </section>

    <AdminCrudDialog
      v-model:open="isCrudDialogOpen"
      :form="{}"
      :mode="crudMode"
      :title="dialogTitle"
      :description="dialogDescription"
      :detail-items="detailItems"
      :target-name="selectedMenu?.name"
      :loading="isCrudLoading"
      @delete="handleDelete"
    >
      <template #detail>
        <section
          v-if="detailMenu"
          class="rounded-md border bg-muted/20 p-3"
          aria-labelledby="menu-recipe-detail-title"
        >
          <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div class="min-w-0">
              <h3 id="menu-recipe-detail-title" class="text-sm font-semibold tracking-normal">
                Komposisi Resep
              </h3>
              <p class="mt-1 text-sm text-muted-foreground">
                {{ isCrudLoading ? 'Detail resep sedang dimuat.' : `${detailMenu.recipeCount} bahan penyusun` }}
              </p>
            </div>
            <p class="text-sm font-medium tabular-nums">
              {{ detailMenu.costLabel }}
            </p>
          </div>

          <div v-if="isCrudLoading" class="rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground">
            Memuat resep...
          </div>

          <div
            v-else-if="!detailMenu.recipes?.length"
            class="rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground"
          >
            Belum ada resep aktif yang tersimpan.
          </div>

          <div v-else class="overflow-hidden rounded-md border bg-background">
            <table class="w-full table-fixed text-xs sm:text-sm">
              <colgroup>
                <col class="w-9">
                <col class="w-[24%]">
                <col class="w-[15%]">
                <col class="w-[17%]">
                <col class="w-[16%]">
                <col class="w-[16%]">
              </colgroup>
              <thead class="bg-muted/60 text-xs uppercase text-muted-foreground">
                <tr>
                  <th class="px-2 py-2 text-left font-medium">
                    No
                  </th>
                  <th class="px-2 py-2 text-left font-medium">
                    Bahan
                  </th>
                  <th class="px-2 py-2 text-left font-medium">
                    Jenis
                  </th>
                  <th class="px-2 py-2 text-right font-medium">
                    Jumlah
                  </th>
                  <th class="px-2 py-2 text-right font-medium">
                    HPP
                  </th>
                  <th class="px-2 py-2 text-right font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="(recipe, index) in detailMenu.recipes" :key="`${recipe.ingredientId}-${index}`">
                  <td class="px-2 py-2 text-muted-foreground">
                    {{ index + 1 }}
                  </td>
                  <td class="break-words px-2 py-2 font-medium text-foreground">
                    {{ recipe.ingredientName || recipe.ingredientId }}
                  </td>
                  <td class="break-words px-2 py-2 text-muted-foreground">
                    {{ getRecipeTypeLabel(recipe.type) }}
                  </td>
                  <td class="break-words px-2 py-2 text-right tabular-nums">
                    {{ getRecipeQuantityLabel(recipe.qtyNeeded, recipe.unit) }}
                  </td>
                  <td class="break-words px-2 py-2 text-right tabular-nums">
                    {{ formatAdminMenuCurrency(recipe.costPerUnit ?? 0) }}
                  </td>
                  <td class="break-words px-2 py-2 text-right font-medium tabular-nums">
                    {{ formatAdminMenuCurrency(recipe.subtotal ?? 0) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </template>
    </AdminCrudDialog>
  </div>
</template>
