<script setup lang="ts">
import type {
  AdminCrudDetailItem,
  AdminDataMetric as AdminDataMetricItem,
  AdminDataTableColumn,
  AdminDataTableRow,
} from '../../../types/admin-management'
import type {
  AdminSemiIngredientProduceRequest,
  AdminSemiIngredientUnitOption,
  AdminSemiIngredientViewItem,
} from '../../../types/admin-semi-ingredient'
import { AlertTriangle, Boxes, Calculator, Factory, ListChecks, PackageCheck, Plus, WalletCards } from 'lucide-vue-next'
import { buttonVariants, Button } from '#layers/base/app/components/ui/button'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#layers/base/app/components/ui/dialog'
import { Input } from '#layers/base/app/components/ui/input'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import { Textarea } from '#layers/base/app/components/ui/textarea'
import AdminDataMetric from '../../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../../components/molecules/AdminPageHeader.vue'
import AdminCrudDialog from '../../../components/organisms/AdminCrudDialog.vue'
import AdminDataTable from '../../../components/organisms/AdminDataTable.vue'
import {
  formatAdminSemiIngredientCurrency,
  mapAdminSemiIngredientRecordToViewItem,
  mapAdminSemiIngredientUnitRecordToOption,
} from '../../../utils/admin-semi-ingredient'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Bahan Setengah Jadi',
})

type CrudMode = 'detail' | 'delete'
type StockFilter = 'all' | 'safe' | 'low' | 'critical'

const adminSemiIngredientApi = useAdminSemiIngredientApi()
const { runAdminAction } = useAdminActionFeedback()

const search = ref('')
const stockFilter = ref<StockFilter>('all')
const unitFilter = ref('all')
const isLoading = ref(false)
const isCrudLoading = ref(false)
const isCrudDialogOpen = ref(false)
const crudMode = ref<CrudMode>('detail')
const crudForm = ref<Record<string, string>>({})
const loadError = ref('')
const crudError = ref('')
const totalRecordCount = ref(0)
const semiIngredients = ref<AdminSemiIngredientViewItem[]>([])
const unitOptions = ref<AdminSemiIngredientUnitOption[]>([])
const selectedSemiIngredient = ref<AdminSemiIngredientViewItem | null>(null)
const selectedSemiIngredientDetail = ref<AdminSemiIngredientViewItem | null>(null)

const isProduceDialogOpen = ref(false)
const isProduceLoading = ref(false)
const produceError = ref('')
const selectedProduceTarget = ref<AdminSemiIngredientViewItem | null>(null)
const produceForm = ref({ qty: '', notes: '' })

let searchTimer: ReturnType<typeof setTimeout> | null = null
let semiIngredientRequestId = 0

const hasSearch = computed(() => Boolean(search.value.trim()))
const visibleIngredients = computed(() => {
  if (stockFilter.value === 'all') {
    return semiIngredients.value
  }

  return semiIngredients.value.filter(item => item.statusKey === stockFilter.value)
})
const visibleRecordCount = computed(() => stockFilter.value === 'all' ? totalRecordCount.value : visibleIngredients.value.length)
const safeStockCount = computed(() => semiIngredients.value.filter(item => item.statusKey === 'safe').length)
const attentionStockCount = computed(() => semiIngredients.value.filter(item => item.statusKey !== 'safe').length)
const inventoryValue = computed(() => visibleIngredients.value.reduce((total, item) => total + item.inventoryValue, 0))
const totalCompositionCount = computed(() => visibleIngredients.value.reduce((total, item) => total + item.compositionCount, 0))

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Total Olahan',
    value: String(visibleRecordCount.value),
    helper: hasSearch.value || unitFilter.value !== 'all' || stockFilter.value !== 'all' ? 'Sesuai filter aktif' : 'Bahan setengah jadi aktif',
    tone: 'info',
  },
  {
    id: 'safe',
    label: 'Stok Aman',
    value: String(safeStockCount.value),
    helper: 'Di atas minimum',
    tone: 'success',
  },
  {
    id: 'attention',
    label: 'Perlu Produksi',
    value: String(attentionStockCount.value),
    helper: 'Stok <= minimum',
    tone: attentionStockCount.value > 0 ? 'warning' : 'default',
  },
  {
    id: 'value',
    label: 'Nilai Stok',
    value: formatAdminSemiIngredientCurrency(inventoryValue.value),
    helper: totalCompositionCount.value > 0 ? `${totalCompositionCount.value} komposisi termuat` : 'Stok x HPP',
    tone: 'default',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'name', label: 'Bahan', class: 'min-w-64' },
  { key: 'stock', label: 'Stok', align: 'right' },
  { key: 'minimumStock', label: 'Minimum', align: 'right' },
  { key: 'hpp', label: 'HPP/Unit', align: 'right' },
  { key: 'recipe', label: 'Komposisi' },
  { key: 'status', label: 'Status Stok' },
]

const rows = computed<AdminDataTableRow[]>(() => visibleIngredients.value.map(item => ({
  id: item.id,
  cells: {
    name: {
      label: item.name,
      description: `Satuan ${item.unitName}`,
    },
    stock: {
      label: item.stockLabel,
      monospace: true,
    },
    minimumStock: {
      label: item.minStockLabel,
      monospace: true,
    },
    hpp: {
      label: item.avgCostLabel,
      description: `Nilai stok ${item.inventoryValueLabel}`,
      monospace: true,
    },
    recipe: {
      label: item.compositionCount > 0 ? `${item.compositionCount} bahan` : 'Detail komposisi',
      description: item.compositionSummary,
    },
    status: {
      label: item.statusLabel,
      tone: item.statusTone,
    },
  },
})))

const dialogTitle = computed(() => {
  if (crudMode.value === 'delete') {
    return 'Hapus Bahan Setengah Jadi'
  }

  return 'Detail Bahan Setengah Jadi'
})
const dialogDescription = computed(() => {
  if (crudMode.value === 'delete') {
    return 'Bahan setengah jadi akan dihapus secara soft delete oleh backend.'
  }

  return isCrudLoading.value ? 'Memuat detail bahan setengah jadi...' : 'Informasi profil, stok, HPP, dan komposisi dari backend.'
})
const detailItems = computed<AdminCrudDetailItem[]>(() => {
  const item = selectedSemiIngredientDetail.value ?? selectedSemiIngredient.value

  if (!item) {
    return []
  }

  return [
    { label: 'Nama Olahan', value: item.name },
    { label: 'Satuan', value: item.unitName },
    { label: 'Stok Saat Ini', value: item.stockLabel },
    { label: 'Stok Minimum', value: item.minStockLabel },
    { label: 'HPP per Unit', value: item.avgCostLabel, monospace: true },
    { label: 'Total HPP Resep', value: item.totalHppLabel, monospace: true },
    { label: 'Status Stok', value: item.statusLabel, tone: item.statusTone },
    { label: 'Dibuat', value: item.createdAt },
    { label: 'Diperbarui', value: item.updatedAt, description: item.hasBeenUpdated ? 'Perubahan terakhir dari backend.' : 'Belum pernah diperbarui.' },
  ]
})

onMounted(async () => {
  await Promise.all([
    loadUnitOptions(),
    loadSemiIngredients(),
  ])
})

onBeforeUnmount(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})

watch([search, unitFilter], () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    void loadSemiIngredients()
  }, 300)
})

watch(produceForm, () => {
  produceError.value = ''
}, { deep: true })

async function loadSemiIngredients() {
  const requestId = ++semiIngredientRequestId
  isLoading.value = true
  loadError.value = ''

  try {
    const result = await adminSemiIngredientApi.getSemiIngredients({
      batch: 1,
      size: 100,
      search: search.value.trim() || undefined,
      unit_id: unitFilter.value === 'all' ? undefined : unitFilter.value,
    })
    const records = Array.isArray(result.records) ? result.records : []

    if (requestId !== semiIngredientRequestId) {
      return
    }

    semiIngredients.value = records.map(mapAdminSemiIngredientRecordToViewItem)
    totalRecordCount.value = result.page?.total_record_count ?? records.length
  }
  catch (error) {
    if (requestId !== semiIngredientRequestId) {
      return
    }

    loadError.value = getErrorMessage(error, 'Gagal memuat daftar bahan setengah jadi.')
    semiIngredients.value = []
    totalRecordCount.value = 0
  }
  finally {
    if (requestId === semiIngredientRequestId) {
      isLoading.value = false
    }
  }
}

async function loadUnitOptions() {
  try {
    const result = await adminSemiIngredientApi.getSemiIngredientUnitOptions()
    const records = Array.isArray(result) ? result : []

    unitOptions.value = records.map(mapAdminSemiIngredientUnitRecordToOption)
  }
  catch (error) {
    loadError.value = getErrorMessage(error, 'Gagal memuat pilihan satuan ukur.')
    unitOptions.value = []
  }
}

function findSemiIngredient(id: string) {
  return semiIngredients.value.find(item => item.id === id) ?? null
}

async function openDetailDialog(id: string) {
  const item = findSemiIngredient(id)

  if (!item) {
    return
  }

  selectedSemiIngredient.value = item
  selectedSemiIngredientDetail.value = item
  crudMode.value = 'detail'
  crudError.value = ''
  isCrudDialogOpen.value = true
  isCrudLoading.value = true

  try {
    const detail = await adminSemiIngredientApi.getSemiIngredientDetail(id)
    const mappedDetail = mapAdminSemiIngredientRecordToViewItem(detail)

    if (import.meta.dev) {
      console.debug('[admin:semi-ingredient-detail]', {
        id,
        hasChildCompositions: Array.isArray(detail.child_compositions),
        childCompositionCount: Array.isArray(detail.child_compositions) ? detail.child_compositions.length : 0,
        mappedCompositionCount: mappedDetail.compositionCount,
        detail,
      })
    }

    selectedSemiIngredientDetail.value = mappedDetail
  }
  catch (error) {
    selectedSemiIngredientDetail.value = item
    crudError.value = getErrorMessage(error, 'Gagal memuat detail komposisi bahan setengah jadi.')
  }
  finally {
    isCrudLoading.value = false
  }
}

function openEditPage(id: string) {
  return navigateTo(`/admin/semi-finished-ingredients/${id}`)
}

function openDeleteDialog(id: string) {
  selectedSemiIngredient.value = findSemiIngredient(id)
  selectedSemiIngredientDetail.value = selectedSemiIngredient.value
  crudMode.value = 'delete'
  crudError.value = ''
  isCrudDialogOpen.value = Boolean(selectedSemiIngredient.value)
}

async function handleDelete() {
  if (!selectedSemiIngredient.value) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    await adminSemiIngredientApi.deleteSemiIngredient(selectedSemiIngredient.value!.id)
    await loadSemiIngredients()
  }, {
    loading: isCrudLoading,
    successMessage: 'Bahan setengah jadi berhasil dihapus.',
    errorMessage: 'Gagal menghapus bahan setengah jadi.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
}

function openProduceDialog(id: string) {
  const item = findSemiIngredient(id)

  if (!item) {
    return
  }

  selectedProduceTarget.value = item
  produceError.value = ''
  produceForm.value = { qty: '', notes: '' }
  isProduceDialogOpen.value = true
}

async function handleProduce() {
  const qty = Number(produceForm.value.qty)

  if (!Number.isFinite(qty) || qty <= 0) {
    produceError.value = 'Jumlah produksi harus lebih dari 0.'
    return
  }

  if (!selectedProduceTarget.value) {
    return
  }

  const payload: AdminSemiIngredientProduceRequest = {
    qty,
    notes: produceForm.value.notes.trim() || undefined,
  }

  isProduceLoading.value = true
  produceError.value = ''

  try {
    await adminSemiIngredientApi.produceSemiIngredient(selectedProduceTarget.value.id, payload)
    await loadSemiIngredients()
    isProduceDialogOpen.value = false
  }
  catch (error) {
    produceError.value = formatProduceError(error)
  }
  finally {
    isProduceLoading.value = false
  }
}

function formatProduceError(error: unknown): string {
  const fallback = 'Gagal mencatat produksi.'

  if (!isErrorRecord(error)) {
    return error instanceof Error ? error.message : fallback
  }

  const candidates = [error, error.data, error.raw, isErrorRecord(error.raw) ? error.raw.data : null]
  let message = fallback

  for (const candidate of candidates) {
    if (isErrorRecord(candidate) && typeof candidate.message === 'string' && candidate.message.trim()) {
      message = candidate.message.trim()
      break
    }
  }

  const errors: unknown[] = []
  for (const candidate of candidates) {
    if (isErrorRecord(candidate) && Array.isArray(candidate.errors)) {
      errors.push(...candidate.errors)
    }
  }

  const details = errors
    .filter(isErrorRecord)
    .map((entry) => {
      const field = typeof entry.field === 'string' ? entry.field.trim() : ''
      const msg = typeof entry.message === 'string' ? entry.message.trim() : ''
      if (!msg) return ''
      if (!field || field === 'qty') return `- ${msg}`
      return `- ${field}: ${msg}`
    })
    .filter((line, index, arr) => line && arr.indexOf(line) === index)

  if (!details.length) return message
  return [message, ...details].join('\n')
}

function isErrorRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getMetricIcon(metricId: string) {
  if (metricId === 'total') {
    return Boxes
  }

  if (metricId === 'safe') {
    return PackageCheck
  }

  if (metricId === 'attention') {
    return AlertTriangle
  }

  if (metricId === 'value') {
    return WalletCards
  }

  if (metricId === 'recipe') {
    return ListChecks
  }

  return Calculator
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
      title="Bahan Setengah Jadi"
      description="Kelola bahan olahan, HPP, dan komposisi bahan baku."
    />

    <section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan bahan setengah jadi">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <component :is="getMetricIcon(item.id)" class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="semi-finished-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="semi-finished-table-title" class="text-base font-semibold tracking-normal">
            Daftar Bahan Setengah Jadi
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Pantau stok, HPP per unit, dan komposisi produksi setiap olahan.
          </p>
        </div>
      </div>

      <div v-if="loadError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ loadError }}
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="semi-finished-search"
        search-label="Cari bahan setengah jadi"
        search-placeholder="Cari nama bahan atau satuan"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="semi-finished-stock-filter" class="sr-only">Filter status stok bahan setengah jadi</label>
            <NativeSelect id="semi-finished-stock-filter" v-model="stockFilter" class="w-36" :disabled="isLoading">
              <option value="all">Semua stok</option>
              <option value="safe">Aman</option>
              <option value="low">Menipis</option>
              <option value="critical">Kritis</option>
            </NativeSelect>
          </div>

          <div>
            <label for="semi-finished-unit-filter" class="sr-only">Filter satuan bahan setengah jadi</label>
            <NativeSelect id="semi-finished-unit-filter" v-model="unitFilter" class="w-40" :disabled="isLoading">
              <option value="all">Semua satuan</option>
              <option v-for="unit in unitOptions" :key="unit.id" :value="unit.id">
                {{ unit.name }}
              </option>
            </NativeSelect>
          </div>
        </template>

        <template #action>
          <NuxtLink
            to="/admin/semi-finished-ingredients/create"
            :class="[buttonVariants({ size: 'sm' }), isLoading ? 'pointer-events-none opacity-50' : '']"
            :aria-disabled="isLoading"
          >
            <Plus class="size-4" aria-hidden="true" />
            Tambah Olahan
          </NuxtLink>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          :actions="['view', 'produce', 'edit', 'delete']"
          label="bahan setengah jadi"
          empty-title="Bahan setengah jadi tidak ditemukan"
          empty-description="Ubah kata kunci, status stok, atau filter satuan."
          @view="openDetailDialog"
          @edit="openEditPage"
          @produce="openProduceDialog"
          @delete="openDeleteDialog"
        />
      </div>
    </section>

    <!-- Dialog detail & delete -->
    <AdminCrudDialog
      v-model:open="isCrudDialogOpen"
      v-model:form="crudForm"
      :mode="crudMode"
      :title="dialogTitle"
      :description="dialogDescription"
      :fields="[]"
      :detail-items="detailItems"
      :target-name="selectedSemiIngredient?.name"
      :loading="isCrudLoading"
      :form-error="crudError"
      @delete="handleDelete"
    >
      <template #detail>
        <section
          v-if="selectedSemiIngredientDetail || selectedSemiIngredient"
          class="rounded-md border bg-muted/20 p-3"
          aria-labelledby="semi-finished-recipe-detail-title"
        >
          <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div class="min-w-0">
              <h3 id="semi-finished-recipe-detail-title" class="text-sm font-semibold tracking-normal">
                Komposisi Resep
              </h3>
              <p class="mt-1 text-sm text-muted-foreground">
                {{ isCrudLoading ? 'Detail bahan penyusun sedang dimuat.' : `${(selectedSemiIngredientDetail ?? selectedSemiIngredient)?.compositionCount ?? 0} bahan penyusun` }}
              </p>
            </div>
            <p class="text-sm font-medium tabular-nums">
              {{ (selectedSemiIngredientDetail ?? selectedSemiIngredient)?.totalHppLabel ?? '-' }}
            </p>
          </div>

          <div v-if="isCrudLoading" class="rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground">
            Memuat komposisi...
          </div>

          <div
            v-else-if="!(selectedSemiIngredientDetail ?? selectedSemiIngredient)?.compositions.length"
            class="rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground"
          >
            Belum ada bahan penyusun aktif yang tersimpan.
          </div>

          <div v-else class="overflow-hidden rounded-md border bg-background">
            <table class="w-full table-fixed text-xs sm:text-sm">
              <colgroup>
                <col class="w-9">
                <col class="w-[32%]">
                <col class="w-[22%]">
                <col class="w-[20%]">
                <col class="w-[20%]">
              </colgroup>
              <thead class="bg-muted/60 text-xs uppercase text-muted-foreground">
                <tr>
                  <th class="px-2 py-2 text-left font-medium">No</th>
                  <th class="px-2 py-2 text-left font-medium">Bahan</th>
                  <th class="px-2 py-2 text-right font-medium">Jumlah</th>
                  <th class="px-2 py-2 text-right font-medium">HPP</th>
                  <th class="px-2 py-2 text-right font-medium">Subtotal</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr
                  v-for="(composition, index) in (selectedSemiIngredientDetail ?? selectedSemiIngredient)?.compositions ?? []"
                  :key="composition.id"
                >
                  <td class="px-2 py-2 text-muted-foreground">{{ index + 1 }}</td>
                  <td class="break-words px-2 py-2 font-medium text-foreground">{{ composition.ingredientName }}</td>
                  <td class="break-words px-2 py-2 text-right tabular-nums">{{ composition.qtyLabel }}</td>
                  <td class="break-words px-2 py-2 text-right tabular-nums">{{ composition.avgCostLabel }}</td>
                  <td class="break-words px-2 py-2 text-right font-medium tabular-nums">{{ composition.subtotalLabel }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </template>
    </AdminCrudDialog>

    <!-- Dialog Catat Produksi -->
    <Dialog v-model:open="isProduceDialogOpen">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle class="flex items-center gap-2">
            <Factory class="size-5 text-success" aria-hidden="true" />
            Catat Produksi
          </DialogTitle>
          <DialogDescription v-if="selectedProduceTarget">
            Produksi <span class="font-medium text-foreground">{{ selectedProduceTarget.name }}</span>. Stok bahan baku penyusun akan dipotong otomatis sesuai resep.
          </DialogDescription>
        </DialogHeader>

        <div
          v-if="produceError"
          class="whitespace-pre-line rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {{ produceError }}
        </div>

        <div v-if="selectedProduceTarget" class="rounded-md border bg-muted/30 px-3 py-2 text-sm">
          <div class="flex justify-between gap-4">
            <span class="text-muted-foreground">Stok saat ini</span>
            <span class="font-mono font-medium tabular-nums">{{ selectedProduceTarget.stockLabel }}</span>
          </div>
          <div class="mt-1 flex justify-between gap-4">
            <span class="text-muted-foreground">Bahan penyusun</span>
            <span class="font-medium">
              {{ selectedProduceTarget.compositionCount > 0 ? `${selectedProduceTarget.compositionCount} bahan` : 'Belum ada resep' }}
            </span>
          </div>
        </div>

        <div class="grid gap-4">
          <div class="grid gap-1.5">
            <label for="produce-qty" class="text-sm font-medium">
              Jumlah Produksi <span class="text-destructive" aria-hidden="true">*</span>
            </label>
            <Input
              id="produce-qty"
              v-model="produceForm.qty"
              type="number"
              inputmode="decimal"
              placeholder="Masukkan jumlah yang diproduksi"
              min="0.001"
              step="any"
              :disabled="isProduceLoading"
            />
            <p v-if="selectedProduceTarget" class="text-xs text-muted-foreground">
              Satuan: {{ selectedProduceTarget.unitName }}
            </p>
          </div>

          <div class="grid gap-1.5">
            <label for="produce-notes" class="text-sm font-medium">
              Catatan <span class="text-xs font-normal text-muted-foreground">(opsional)</span>
            </label>
            <Textarea
              id="produce-notes"
              v-model="produceForm.notes"
              placeholder="Catatan tambahan untuk produksi ini..."
              :disabled="isProduceLoading"
              class="min-h-20 resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            :disabled="isProduceLoading"
            @click="isProduceDialogOpen = false"
          >
            Batal
          </Button>
          <Button
            type="button"
            :disabled="isProduceLoading || !produceForm.qty"
            @click="handleProduce"
          >
            <Spinner v-if="isProduceLoading" class="size-4" />
            <Factory v-else class="size-4" aria-hidden="true" />
            {{ isProduceLoading ? 'Memproses...' : 'Catat Produksi' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
