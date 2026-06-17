<script setup lang="ts">
import type {
  AdminUnitMeasureFormPayload,
  AdminUnitMeasureViewItem,
} from '../../types/admin-unit-measure'
import type {
  AdminCrudDetailItem,
  AdminCrudField,
  AdminDataMetric as AdminDataMetricItem,
  AdminDataTableColumn,
  AdminDataTableRow,
} from '../../types/admin-management'
import { History, Plus, Ruler, Scale } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import AdminDataMetric from '../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminCrudDialog from '../../components/organisms/AdminCrudDialog.vue'
import AdminDataTable from '../../components/organisms/AdminDataTable.vue'
import {
  createAdminUnitMeasureMutationPayload,
  getAdminUnitMeasureNameValidationMessage,
  mapAdminUnitMeasureRecordToViewItem,
} from '../../utils/admin-unit-measure'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Satuan Ukur',
})

type CrudMode = 'create' | 'detail' | 'edit' | 'delete'

const adminUnitMeasureApi = useAdminUnitMeasureApi()
const { runAdminAction } = useAdminActionFeedback()
const search = ref('')
const isLoading = ref(false)
const isCrudLoading = ref(false)
const isCrudDialogOpen = ref(false)
const crudMode = ref<CrudMode>('detail')
const loadError = ref('')
const formError = ref('')
const totalRecordCount = ref(0)
const unitMeasures = ref<AdminUnitMeasureViewItem[]>([])
const selectedUnit = ref<AdminUnitMeasureViewItem | null>(null)
const selectedUnitDetail = ref<AdminUnitMeasureViewItem | null>(null)
const crudForm = ref<Record<string, string>>(createUnitForm())

let searchTimer: ReturnType<typeof setTimeout> | null = null
let unitRequestId = 0

const unitFields: AdminCrudField[] = [
  {
    key: 'name',
    label: 'Nama Satuan',
    placeholder: 'Contoh: Kilogram',
    required: true,
    colSpan: 'full',
  },
]

const updatedUnits = computed(() => unitMeasures.value.filter(item => item.hasBeenUpdated))
const neverUpdatedUnits = computed(() => unitMeasures.value.filter(item => !item.hasBeenUpdated))
const hasSearch = computed(() => Boolean(search.value.trim()))

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Total Satuan',
    value: String(totalRecordCount.value),
    helper: hasSearch.value ? 'Dalam hasil pencarian' : 'Satuan aktif',
    tone: 'info',
  },
  {
    id: 'loaded',
    label: 'Data Termuat',
    value: String(unitMeasures.value.length),
    helper: 'Maksimal 100 record',
    tone: 'success',
  },
  {
    id: 'updated',
    label: 'Pernah Diperbarui',
    value: String(updatedUnits.value.length),
    helper: `${neverUpdatedUnits.value.length} belum diubah`,
    tone: 'default',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'name', label: 'Satuan', class: 'min-w-64' },
  { key: 'createdAt', label: 'Dibuat', class: 'min-w-40' },
  { key: 'updatedAt', label: 'Diperbarui', class: 'min-w-40' },
]

const rows = computed<AdminDataTableRow[]>(() => unitMeasures.value.map(item => ({
  id: item.id,
  cells: {
    name: {
      label: item.name,
      description: item.hasBeenUpdated ? 'Perubahan tersimpan' : 'Belum pernah diubah',
    },
    createdAt: item.createdAt,
    updatedAt: {
      label: item.updatedAt,
      description: item.hasBeenUpdated ? 'Perubahan tersimpan' : 'Belum pernah diubah',
    },
  },
})))

const dialogTitle = computed(() => {
  if (crudMode.value === 'create') {
    return 'Tambah Satuan'
  }

  if (crudMode.value === 'edit') {
    return 'Ubah Satuan'
  }

  if (crudMode.value === 'delete') {
    return 'Hapus Satuan'
  }

  return 'Detail Satuan'
})
const dialogDescription = computed(() => {
  if (crudMode.value === 'delete') {
    return 'Satuan tidak dapat dihapus jika masih digunakan oleh bahan aktif.'
  }

  if (crudMode.value === 'detail') {
    return isCrudLoading.value ? 'Memuat detail satuan...' : 'Informasi satuan ukur yang tercatat.'
  }

  return 'Nama satuan dipakai pada bahan baku, bahan setengah jadi, stok, dan resep.'
})
const detailItems = computed<AdminCrudDetailItem[]>(() => {
  const item = selectedUnitDetail.value ?? selectedUnit.value

  if (!item) {
    return []
  }

  return [
    { label: 'Nama Satuan', value: item.name },
    { label: 'Dibuat', value: item.createdAt },
    { label: 'Diperbarui', value: item.updatedAt, description: item.hasBeenUpdated ? 'Data pernah diperbarui.' : 'Belum ada perubahan setelah dibuat.' },
  ]
})

onMounted(() => {
  loadUnitMeasures()
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
    loadUnitMeasures()
  }, 300)
})

watch(crudForm, () => {
  formError.value = ''
}, { deep: true })

async function loadUnitMeasures() {
  const requestId = ++unitRequestId
  isLoading.value = true
  loadError.value = ''

  try {
    const result = await adminUnitMeasureApi.getUnitMeasures({
      batch: 1,
      size: 100,
      search: search.value.trim() || undefined,
    })
    const records = Array.isArray(result.records) ? result.records : []

    if (requestId !== unitRequestId) {
      return
    }

    unitMeasures.value = records.map(mapAdminUnitMeasureRecordToViewItem)
    totalRecordCount.value = result.page?.total_record_count ?? records.length
  }
  catch (error) {
    if (requestId !== unitRequestId) {
      return
    }

    loadError.value = getErrorMessage(error, 'Gagal memuat daftar satuan ukur.')
    unitMeasures.value = []
    totalRecordCount.value = 0
  }
  finally {
    if (requestId === unitRequestId) {
      isLoading.value = false
    }
  }
}

function createUnitForm(item?: AdminUnitMeasureViewItem): Record<string, string> {
  return {
    name: item?.name ?? '',
  }
}

function createUnitPayload(): AdminUnitMeasureFormPayload | null {
  const name = (crudForm.value.name ?? '').trim()
  const validationMessage = getAdminUnitMeasureNameValidationMessage(name)

  if (validationMessage) {
    formError.value = validationMessage
    return null
  }

  return {
    name,
  }
}

function findUnit(id: string) {
  return unitMeasures.value.find(item => item.id === id) ?? null
}

function openCreateDialog() {
  selectedUnit.value = null
  selectedUnitDetail.value = null
  formError.value = ''
  crudMode.value = 'create'
  crudForm.value = createUnitForm()
  isCrudDialogOpen.value = true
}

async function openDetailDialog(id: string) {
  const item = findUnit(id)

  if (!item) {
    return
  }

  selectedUnit.value = item
  selectedUnitDetail.value = item
  formError.value = ''
  crudMode.value = 'detail'
  isCrudDialogOpen.value = true
  isCrudLoading.value = true

  try {
    const detail = await adminUnitMeasureApi.getUnitMeasureDetail(id)
    selectedUnitDetail.value = mapAdminUnitMeasureRecordToViewItem(detail)
  }
  catch {
    selectedUnitDetail.value = item
  }
  finally {
    isCrudLoading.value = false
  }
}

function openEditDialog(id: string) {
  const item = findUnit(id)

  if (!item) {
    return
  }

  selectedUnit.value = item
  selectedUnitDetail.value = item
  formError.value = ''
  crudMode.value = 'edit'
  crudForm.value = createUnitForm(item)
  isCrudDialogOpen.value = true
}

function openDeleteDialog(id: string) {
  selectedUnit.value = findUnit(id)
  selectedUnitDetail.value = selectedUnit.value
  formError.value = ''
  crudMode.value = 'delete'
  isCrudDialogOpen.value = Boolean(selectedUnit.value)
}

async function handleCrudSubmit() {
  const payload = createUnitPayload()

  if (!payload) {
    return
  }

  const successMessage = crudMode.value === 'create'
    ? 'Satuan berhasil ditambahkan.'
    : 'Satuan berhasil diperbarui.'

  const succeeded = await runAdminAction(async () => {
    const requestPayload = createAdminUnitMeasureMutationPayload(payload)

    if (crudMode.value === 'create') {
      await adminUnitMeasureApi.createUnitMeasure(requestPayload)
      await loadUnitMeasures()
      return
    }

    if (crudMode.value === 'edit' && selectedUnit.value) {
      await adminUnitMeasureApi.updateUnitMeasure(selectedUnit.value.id, requestPayload)
      await loadUnitMeasures()
    }
  }, {
    loading: isCrudLoading,
    successMessage,
    errorMessage: 'Gagal menyimpan satuan.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
}

async function handleDelete() {
  if (!selectedUnit.value) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    await adminUnitMeasureApi.deleteUnitMeasure(selectedUnit.value!.id)
    await loadUnitMeasures()
  }, {
    loading: isCrudLoading,
    successMessage: 'Satuan berhasil dihapus.',
    errorMessage: 'Gagal menghapus satuan.',
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
      title="Satuan Ukur"
      description="Kelola master satuan aktif untuk bahan, resep, stok masuk, stok keluar, dan stok opname."
    />

    <section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan satuan ukur">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <Scale v-if="item.id === 'total'" class="size-4" aria-hidden="true" />
          <Ruler v-else-if="item.id === 'loaded'" class="size-4" aria-hidden="true" />
          <History v-else class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="unit-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="unit-table-title" class="text-base font-semibold tracking-normal">
            Daftar Satuan
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Data diambil dari satuan aktif dan bisa dicari berdasarkan nama satuan.
          </p>
        </div>
      </div>

      <div v-if="loadError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ loadError }}
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="unit-search"
        search-label="Cari satuan ukur"
        search-placeholder="Cari nama satuan"
        :disabled="isLoading"
      >
        <template #action>
          <Button type="button" size="sm" :disabled="isLoading" @click="openCreateDialog">
            <Plus class="size-4" aria-hidden="true" />
            Tambah Satuan
          </Button>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          label="satuan"
          empty-title="Satuan tidak ditemukan"
          empty-description="Ubah kata kunci pencarian satuan."
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
      :fields="unitFields"
      :detail-items="detailItems"
      :target-name="selectedUnit?.name"
      :loading="isCrudLoading"
      :form-error="formError"
      @submit="handleCrudSubmit"
      @delete="handleDelete"
    />
  </div>
</template>
