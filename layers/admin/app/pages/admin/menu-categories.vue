<script setup lang="ts">
import type {
  AdminCategoryFormPayload,
  AdminCategoryViewItem,
} from '../../types/admin-category'
import type {
  AdminCrudDetailItem,
  AdminCrudField,
  AdminDataMetric as AdminDataMetricItem,
  AdminDataTableColumn,
  AdminDataTableRow,
} from '../../types/admin-management'
import { FolderTree, ListChecks, Plus, Tags } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import AdminDataMetric from '../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminCrudDialog from '../../components/organisms/AdminCrudDialog.vue'
import AdminDataTable from '../../components/organisms/AdminDataTable.vue'
import {
  createAdminCategoryMutationPayload,
  getAdminCategoryNameValidationMessage,
  mapAdminCategoryRecordToViewItem,
} from '../../utils/admin-category'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Kategori Menu',
})

type CrudMode = 'create' | 'detail' | 'edit' | 'delete'

const adminCategoryApi = useAdminCategoryApi()
const { runAdminAction } = useAdminActionFeedback()
const search = ref('')
const isLoading = ref(false)
const isCrudLoading = ref(false)
const isCrudDialogOpen = ref(false)
const crudMode = ref<CrudMode>('detail')
const loadError = ref('')
const formError = ref('')
const totalRecordCount = ref(0)
const categories = ref<AdminCategoryViewItem[]>([])
const selectedCategory = ref<AdminCategoryViewItem | null>(null)
const selectedCategoryDetail = ref<AdminCategoryViewItem | null>(null)
const crudForm = ref<Record<string, string>>(createCategoryForm())

let searchTimer: ReturnType<typeof setTimeout> | null = null
let categoryRequestId = 0

const categoryFields: AdminCrudField[] = [
  {
    key: 'name',
    label: 'Nama Kategori',
    placeholder: 'Contoh: Minuman Dingin',
    required: true,
    colSpan: 'full',
  },
]

const totalLinkedMenus = computed(() => categories.value.reduce((total, item) => total + item.menuCount, 0))
const usedCategories = computed(() => categories.value.filter(item => item.menuCount > 0))
const hasSearch = computed(() => Boolean(search.value.trim()))

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Total Kategori',
    value: String(totalRecordCount.value),
    helper: hasSearch.value ? 'Dalam hasil pencarian' : 'Kategori aktif',
    tone: 'info',
  },
  {
    id: 'used',
    label: 'Kategori Terpakai',
    value: String(usedCategories.value.length),
    helper: 'Memiliki menu aktif',
    tone: 'success',
  },
  {
    id: 'menus',
    label: 'Menu Terhubung',
    value: String(totalLinkedMenus.value),
    helper: 'Dari data termuat',
    tone: 'default',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'name', label: 'Kategori', class: 'min-w-64' },
  { key: 'menus', label: 'Menu', align: 'right', class: 'min-w-32' },
  { key: 'createdAt', label: 'Dibuat', class: 'min-w-40' },
  { key: 'updatedAt', label: 'Diperbarui', class: 'min-w-40' },
]

const rows = computed<AdminDataTableRow[]>(() => categories.value.map(item => ({
  id: item.id,
  cells: {
    name: {
      label: item.name,
      description: item.menuCount > 0 ? 'Dipakai pada menu aktif' : 'Belum dipakai menu',
    },
    menus: {
      label: item.menuCountLabel,
      description: item.menuCount > 0 ? 'Terhubung ke menu' : 'Belum dipakai',
    },
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  },
})))

const dialogTitle = computed(() => {
  if (crudMode.value === 'create') {
    return 'Tambah Kategori'
  }

  if (crudMode.value === 'edit') {
    return 'Ubah Kategori'
  }

  if (crudMode.value === 'delete') {
    return 'Hapus Kategori'
  }

  return 'Detail Kategori'
})
const dialogDescription = computed(() => {
  if (crudMode.value === 'delete') {
    if ((selectedCategory.value?.menuCount ?? 0) > 0) {
      return 'Kategori masih memiliki menu aktif sehingga backend akan menolak proses hapus.'
    }

    return 'Konfirmasi penghapusan kategori dari data sistem.'
  }

  if (crudMode.value === 'detail') {
    return isCrudLoading.value ? 'Memuat detail kategori...' : 'Informasi kategori menu yang tercatat.'
  }

  return 'Nama kategori dipakai untuk pengelompokan menu di admin dan kasir.'
})
const detailItems = computed<AdminCrudDetailItem[]>(() => {
  const item = selectedCategoryDetail.value ?? selectedCategory.value

  if (!item) {
    return []
  }

  return [
    { label: 'Nama Kategori', value: item.name },
    { label: 'Menu Terhubung', value: item.menuCountLabel },
    { label: 'Dibuat', value: item.createdAt },
    { label: 'Diperbarui', value: item.updatedAt },
  ]
})

onMounted(() => {
  loadCategories()
})

onBeforeUnmount(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})

watch(search, () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    loadCategories()
  }, 300)
})

watch(crudForm, () => {
  formError.value = ''
}, { deep: true })

async function loadCategories() {
  const requestId = ++categoryRequestId
  isLoading.value = true
  loadError.value = ''

  try {
    const result = await adminCategoryApi.getCategories({
      batch: 1,
      size: 100,
      search: search.value.trim() || undefined,
    })
    const records = Array.isArray(result.records) ? result.records : []

    if (requestId !== categoryRequestId) {
      return
    }

    categories.value = records.map(mapAdminCategoryRecordToViewItem)
    totalRecordCount.value = result.page?.total_record_count ?? records.length
  }
  catch (error) {
    if (requestId !== categoryRequestId) {
      return
    }

    loadError.value = getErrorMessage(error, 'Gagal memuat daftar kategori.')
    categories.value = []
    totalRecordCount.value = 0
  }
  finally {
    if (requestId === categoryRequestId) {
      isLoading.value = false
    }
  }
}

function createCategoryForm(item?: AdminCategoryViewItem): Record<string, string> {
  return {
    name: item?.name ?? '',
  }
}

function createCategoryPayload(): AdminCategoryFormPayload | null {
  const name = (crudForm.value.name ?? '').trim()
  const validationMessage = getAdminCategoryNameValidationMessage(name)

  if (validationMessage) {
    formError.value = validationMessage
    return null
  }

  return {
    name,
  }
}

function findCategory(id: string) {
  return categories.value.find(item => item.id === id) ?? null
}

function openCreateDialog() {
  selectedCategory.value = null
  selectedCategoryDetail.value = null
  formError.value = ''
  crudMode.value = 'create'
  crudForm.value = createCategoryForm()
  isCrudDialogOpen.value = true
}

async function openDetailDialog(id: string) {
  const item = findCategory(id)

  if (!item) {
    return
  }

  selectedCategory.value = item
  selectedCategoryDetail.value = item
  formError.value = ''
  crudMode.value = 'detail'
  isCrudDialogOpen.value = true
  isCrudLoading.value = true

  try {
    const detail = await adminCategoryApi.getCategoryDetail(id)
    selectedCategoryDetail.value = mapAdminCategoryRecordToViewItem({
      ...detail,
      _count: detail._count ?? {
        menus: item.menuCount,
      },
    })
  }
  catch {
    selectedCategoryDetail.value = item
  }
  finally {
    isCrudLoading.value = false
  }
}

function openEditDialog(id: string) {
  const item = findCategory(id)

  if (!item) {
    return
  }

  selectedCategory.value = item
  selectedCategoryDetail.value = item
  formError.value = ''
  crudMode.value = 'edit'
  crudForm.value = createCategoryForm(item)
  isCrudDialogOpen.value = true
}

function openDeleteDialog(id: string) {
  selectedCategory.value = findCategory(id)
  selectedCategoryDetail.value = selectedCategory.value
  formError.value = ''
  crudMode.value = 'delete'
  isCrudDialogOpen.value = Boolean(selectedCategory.value)
}

async function handleCrudSubmit() {
  const payload = createCategoryPayload()

  if (!payload) {
    return
  }

  const successMessage = crudMode.value === 'create'
    ? 'Kategori berhasil ditambahkan.'
    : 'Kategori berhasil diperbarui.'

  const succeeded = await runAdminAction(async () => {
    const requestPayload = createAdminCategoryMutationPayload(payload)

    if (crudMode.value === 'create') {
      await adminCategoryApi.createCategory(requestPayload)
      await loadCategories()
      return
    }

    if (crudMode.value === 'edit' && selectedCategory.value) {
      await adminCategoryApi.updateCategory(selectedCategory.value.id, requestPayload)
      await loadCategories()
    }
  }, {
    loading: isCrudLoading,
    successMessage,
    errorMessage: 'Gagal menyimpan kategori.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
}

async function handleDelete() {
  if (!selectedCategory.value) {
    return
  }

  if (selectedCategory.value.menuCount > 0) {
    formError.value = 'Kategori masih memiliki menu aktif dan tidak dapat dihapus.'
    return
  }

  const succeeded = await runAdminAction(async () => {
    await adminCategoryApi.deleteCategory(selectedCategory.value!.id)
    await loadCategories()
  }, {
    loading: isCrudLoading,
    successMessage: 'Kategori berhasil dihapus.',
    errorMessage: 'Gagal menghapus kategori.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
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
      title="Kategori Menu"
      description="Kelola kategori menu aktif, jumlah menu terhubung, dan perubahan nama kategori."
    />

    <section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan kategori menu">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <FolderTree v-if="item.id === 'total'" class="size-4" aria-hidden="true" />
          <Tags v-else-if="item.id === 'used'" class="size-4" aria-hidden="true" />
          <ListChecks v-else class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="category-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="category-table-title" class="text-base font-semibold tracking-normal">
            Daftar Kategori
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Data diambil dari kategori aktif dan menampilkan jumlah menu yang terhubung.
          </p>
        </div>
      </div>

      <div v-if="loadError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ loadError }}
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="category-search"
        search-label="Cari kategori"
        search-placeholder="Cari nama kategori"
        :disabled="isLoading"
      >
        <template #action>
          <Button type="button" size="sm" :disabled="isLoading" @click="openCreateDialog">
            <Plus class="size-4" aria-hidden="true" />
            Tambah Kategori
          </Button>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          label="kategori"
          empty-title="Kategori tidak ditemukan"
          empty-description="Ubah kata kunci pencarian kategori."
          @view="openDetailDialog"
          @edit="openEditDialog"
          @delete="openDeleteDialog"
        />
      </div>
    </section>

    <AdminCrudDialog
      v-model:open="isCrudDialogOpen"
      v-model:form="crudForm"
      :mode="crudMode"
      :title="dialogTitle"
      :description="dialogDescription"
      :fields="categoryFields"
      :detail-items="detailItems"
      :target-name="selectedCategory?.name"
      :loading="isCrudLoading"
      :form-error="formError"
      @submit="handleCrudSubmit"
      @delete="handleDelete"
    />
  </div>
</template>
