<script setup lang="ts">
import type {
  AdminSupplierFormPayload,
  AdminSupplierViewItem,
} from '../../types/admin-supplier'
import type {
  AdminCrudDetailItem,
  AdminCrudField,
  AdminDataMetric as AdminDataMetricItem,
  AdminDataTableColumn,
  AdminDataTableRow,
} from '../../types/admin-management'
import { History, Phone, Plus, Truck } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import AdminDataMetric from '../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminCrudDialog from '../../components/organisms/AdminCrudDialog.vue'
import AdminDataTable from '../../components/organisms/AdminDataTable.vue'
import {
  createAdminSupplierMutationPayload,
  getAdminSupplierValidationMessage,
  mapAdminSupplierRecordToViewItem,
} from '../../utils/admin-supplier'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Pemasok',
})

type CrudMode = 'create' | 'detail' | 'edit' | 'delete'

const adminSupplierApi = useAdminSupplierApi()
const { runAdminAction } = useAdminActionFeedback()
const search = ref('')
const isLoading = ref(false)
const isCrudLoading = ref(false)
const isCrudDialogOpen = ref(false)
const crudMode = ref<CrudMode>('detail')
const loadError = ref('')
const formError = ref('')
const totalRecordCount = ref(0)
const suppliers = ref<AdminSupplierViewItem[]>([])
const selectedSupplier = ref<AdminSupplierViewItem | null>(null)
const selectedSupplierDetail = ref<AdminSupplierViewItem | null>(null)
const crudForm = ref<Record<string, string>>(createSupplierForm())

let searchTimer: ReturnType<typeof setTimeout> | null = null
let supplierRequestId = 0

const supplierFields: AdminCrudField[] = [
  {
    key: 'name',
    label: 'Nama Pemasok',
    placeholder: 'Contoh: PT Sumber Pangan Abadi',
    required: true,
    colSpan: 'full',
  },
  {
    key: 'phone',
    label: 'Nomor Telepon',
    inputmode: 'tel',
    placeholder: '08xx',
    colSpan: 'full',
  },
  {
    key: 'address',
    label: 'Alamat',
    type: 'textarea',
    placeholder: 'Alamat pemasok',
    colSpan: 'full',
  },
]

const suppliersWithPhone = computed(() => suppliers.value.filter(item => item.phone))
const suppliersWithHistory = computed(() => suppliers.value.filter(item => item.stockMovementCount > 0))
const totalStockMovementCount = computed(() => suppliers.value.reduce((total, item) => total + item.stockMovementCount, 0))
const hasSearch = computed(() => Boolean(search.value.trim()))

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Total Pemasok',
    value: String(totalRecordCount.value),
    helper: hasSearch.value ? 'Dalam hasil pencarian' : 'Pemasok aktif',
    tone: 'info',
  },
  {
    id: 'contact',
    label: 'Kontak Tersedia',
    value: String(suppliersWithPhone.value.length),
    helper: 'Memiliki nomor telepon',
    tone: 'success',
  },
  {
    id: 'history',
    label: 'Riwayat Stok',
    value: String(totalStockMovementCount.value),
    helper: `${suppliersWithHistory.value.length} pemasok terkait`,
    tone: 'default',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'name', label: 'Pemasok', class: 'min-w-64' },
  { key: 'phone', label: 'Telepon', class: 'min-w-36' },
  { key: 'address', label: 'Alamat', class: 'min-w-64' },
  { key: 'stockMovements', label: 'Riwayat Stok', align: 'right', class: 'min-w-36' },
  { key: 'updatedAt', label: 'Diperbarui', class: 'min-w-40' },
]

const rows = computed<AdminDataTableRow[]>(() => suppliers.value.map(item => ({
  id: item.id,
  cells: {
    name: {
      label: item.name,
      description: item.phoneLabel !== '-' ? item.phoneLabel : item.addressLabel,
    },
    phone: item.phoneLabel,
    address: item.addressLabel,
    stockMovements: {
      label: item.stockMovementCountLabel,
      description: item.stockMovementCount > 0 ? 'Referensi stok tersimpan' : 'Belum ada riwayat',
    },
    updatedAt: {
      label: item.updatedAt,
      description: item.hasBeenUpdated ? 'Perubahan tersimpan' : 'Belum pernah diubah',
    },
  },
})))

const dialogTitle = computed(() => {
  if (crudMode.value === 'create') {
    return 'Tambah Pemasok'
  }

  if (crudMode.value === 'edit') {
    return 'Ubah Pemasok'
  }

  if (crudMode.value === 'delete') {
    return 'Hapus Pemasok'
  }

  return 'Detail Pemasok'
})
const dialogDescription = computed(() => {
  if (crudMode.value === 'delete') {
    return 'Pemasok akan dihapus secara soft delete. Riwayat stok lama tetap menyimpan referensi pemasok.'
  }

  if (crudMode.value === 'detail') {
    return isCrudLoading.value ? 'Memuat detail pemasok...' : 'Informasi pemasok dan relasi riwayat stok.'
  }

  return 'Nama pemasok wajib diisi. Nomor telepon dan alamat boleh dikosongkan.'
})
const detailItems = computed<AdminCrudDetailItem[]>(() => {
  const item = selectedSupplierDetail.value ?? selectedSupplier.value

  if (!item) {
    return []
  }

  return [
    { label: 'Nama Pemasok', value: item.name },
    { label: 'Nomor Telepon', value: item.phoneLabel },
    { label: 'Riwayat Stok', value: item.stockMovementCountLabel, description: 'Jumlah pergerakan stok yang terkait pemasok.' },
    { label: 'Dibuat', value: item.createdAt },
    { label: 'Diperbarui', value: item.updatedAt, description: item.hasBeenUpdated ? 'Data pernah diperbarui.' : 'Belum ada perubahan setelah dibuat.' },
    { label: 'Alamat', value: item.addressLabel, description: 'Alamat pemasok untuk kebutuhan pembelian.' },
  ]
})

onMounted(() => {
  loadSuppliers()
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
    loadSuppliers()
  }, 300)
})

watch(crudForm, () => {
  formError.value = ''
}, { deep: true })

async function loadSuppliers() {
  const requestId = ++supplierRequestId
  isLoading.value = true
  loadError.value = ''

  try {
    const result = await adminSupplierApi.getSuppliers({
      batch: 1,
      size: 100,
      search: search.value.trim() || undefined,
    })
    const records = Array.isArray(result.records) ? result.records : []

    if (requestId !== supplierRequestId) {
      return
    }

    suppliers.value = records.map(mapAdminSupplierRecordToViewItem)
    totalRecordCount.value = result.page?.total_record_count ?? records.length
  }
  catch (error) {
    if (requestId !== supplierRequestId) {
      return
    }

    loadError.value = getErrorMessage(error, 'Gagal memuat daftar pemasok.')
    suppliers.value = []
    totalRecordCount.value = 0
  }
  finally {
    if (requestId === supplierRequestId) {
      isLoading.value = false
    }
  }
}

function createSupplierForm(item?: AdminSupplierViewItem): Record<string, string> {
  return {
    name: item?.name ?? '',
    phone: item?.phone ?? '',
    address: item?.address ?? '',
  }
}

function createSupplierPayload(): AdminSupplierFormPayload | null {
  const payload = {
    name: crudForm.value.name ?? '',
    phone: crudForm.value.phone ?? '',
    address: crudForm.value.address ?? '',
  }
  const validationMessage = getAdminSupplierValidationMessage(payload)

  if (validationMessage) {
    formError.value = validationMessage
    return null
  }

  return payload
}

function findSupplier(id: string) {
  return suppliers.value.find(item => item.id === id) ?? null
}

function openCreateDialog() {
  selectedSupplier.value = null
  selectedSupplierDetail.value = null
  formError.value = ''
  crudMode.value = 'create'
  crudForm.value = createSupplierForm()
  isCrudDialogOpen.value = true
}

async function openDetailDialog(id: string) {
  const item = findSupplier(id)

  if (!item) {
    return
  }

  selectedSupplier.value = item
  selectedSupplierDetail.value = item
  formError.value = ''
  crudMode.value = 'detail'
  isCrudDialogOpen.value = true
  isCrudLoading.value = true

  try {
    const detail = await adminSupplierApi.getSupplierDetail(id)
    selectedSupplierDetail.value = mapAdminSupplierRecordToViewItem({
      ...detail,
      _count: detail._count ?? {
        stock_movements: item.stockMovementCount,
      },
    })
  }
  catch {
    selectedSupplierDetail.value = item
  }
  finally {
    isCrudLoading.value = false
  }
}

function openEditDialog(id: string) {
  const item = findSupplier(id)

  if (!item) {
    return
  }

  selectedSupplier.value = item
  selectedSupplierDetail.value = item
  formError.value = ''
  crudMode.value = 'edit'
  crudForm.value = createSupplierForm(item)
  isCrudDialogOpen.value = true
}

function openDeleteDialog(id: string) {
  selectedSupplier.value = findSupplier(id)
  selectedSupplierDetail.value = selectedSupplier.value
  formError.value = ''
  crudMode.value = 'delete'
  isCrudDialogOpen.value = Boolean(selectedSupplier.value)
}

async function handleCrudSubmit() {
  const payload = createSupplierPayload()

  if (!payload) {
    return
  }

  const successMessage = crudMode.value === 'create'
    ? 'Pemasok berhasil ditambahkan.'
    : 'Pemasok berhasil diperbarui.'

  const succeeded = await runAdminAction(async () => {
    const requestPayload = createAdminSupplierMutationPayload(payload)

    if (crudMode.value === 'create') {
      await adminSupplierApi.createSupplier(requestPayload)
      await loadSuppliers()
      return
    }

    if (crudMode.value === 'edit' && selectedSupplier.value) {
      await adminSupplierApi.updateSupplier(selectedSupplier.value.id, requestPayload)
      await loadSuppliers()
    }
  }, {
    loading: isCrudLoading,
    successMessage,
    errorMessage: 'Gagal menyimpan pemasok.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
}

async function handleDelete() {
  if (!selectedSupplier.value) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    await adminSupplierApi.deleteSupplier(selectedSupplier.value!.id)
    await loadSuppliers()
  }, {
    loading: isCrudLoading,
    successMessage: 'Pemasok berhasil dihapus.',
    errorMessage: 'Gagal menghapus pemasok.',
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
      title="Pemasok"
      description="Kelola data pemasok untuk pembelian bahan dan riwayat pergerakan stok."
    />

    <section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan pemasok">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <Truck v-if="item.id === 'total'" class="size-4" aria-hidden="true" />
          <Phone v-else-if="item.id === 'contact'" class="size-4" aria-hidden="true" />
          <History v-else class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="supplier-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="supplier-table-title" class="text-base font-semibold tracking-normal">
            Daftar Pemasok
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Pencarian mencakup nama, nomor telepon, dan alamat pemasok.
          </p>
        </div>
      </div>

      <div v-if="loadError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ loadError }}
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="supplier-search"
        search-label="Cari pemasok"
        search-placeholder="Cari nama, telepon, atau alamat"
        :disabled="isLoading"
      >
        <template #action>
          <Button type="button" size="sm" :disabled="isLoading" @click="openCreateDialog">
            <Plus class="size-4" aria-hidden="true" />
            Tambah Pemasok
          </Button>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          label="pemasok"
          empty-title="Pemasok tidak ditemukan"
          empty-description="Ubah kata kunci pencarian pemasok."
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
      :fields="supplierFields"
      :detail-items="detailItems"
      :target-name="selectedSupplier?.name"
      :loading="isCrudLoading"
      :form-error="formError"
      @submit="handleCrudSubmit"
      @delete="handleDelete"
    />
  </div>
</template>
