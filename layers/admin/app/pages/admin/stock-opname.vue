<script setup lang="ts">
import type {
  AdminDataMetric as AdminDataMetricItem,
  AdminStatusTone,
} from '../../types/admin-management'
import type {
  AdminOpnameFormPayload,
  AdminOpnameIngredientOption,
  AdminOpnameStatus,
  AdminOpnameViewItem,
} from '../../types/admin-opname'
import {
  AlertCircle,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  PackageSearch,
  Pencil,
  Plus,
  Save,
  Send,
  Trash2,
  XCircle,
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { Alert, AlertDescription } from '#layers/base/app/components/ui/alert'
import { Button } from '#layers/base/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#layers/base/app/components/ui/dialog'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import { Skeleton } from '#layers/base/app/components/ui/skeleton'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from '#layers/base/app/components/ui/table'
import { Textarea } from '#layers/base/app/components/ui/textarea'
import AdminStatusBadge from '../../components/atoms/AdminStatusBadge.vue'
import AdminDataMetric from '../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import { useAdminOpnameApi } from '../../composables/useAdminOpnameApi'
import {
  canApplyAdminOpname,
  canCancelAdminOpname,
  canCompleteAdminOpname,
  canDeleteAdminOpname,
  createAdminOpnameCreatePayload,
  createAdminOpnameUpdatePayload,
  formatAdminOpnameQuantity,
  formatAdminOpnameSignedQuantity,
  getAdminOpnameDifferenceTone,
  getAdminOpnameValidationMessage,
  isAdminOpnameEditable,
  mapAdminOpnameIngredientRecordToOption,
  mapAdminOpnameRecordToViewItem,
  parseAdminOpnameQtyInput,
  roundAdminOpnameQty,
} from '../../utils/admin-opname'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Stok Opname',
})

type FormMode = 'create' | 'edit'
type ConfirmActionType = 'complete' | 'cancel' | 'apply' | 'delete'

interface OpnameFormLine {
  localId: string
  ingredientId: string
  ingredientName: string
  unitName: string
  systemQty: number
  physicalQtyInput: string
}

interface OpnameFormState {
  opnameDate: string
  notes: string
  lines: OpnameFormLine[]
}

interface ConfirmAction {
  type: ConfirmActionType
  item: AdminOpnameViewItem
}

const adminOpnameApi = useAdminOpnameApi()
const { runAdminAction } = useAdminActionFeedback()

const search = ref('')
const statusFilter = ref<'all' | AdminOpnameStatus>('all')
const dateFrom = ref('')
const dateTo = ref('')
const loadError = ref('')
const lookupError = ref('')
const formError = ref('')
const isLoading = ref(false)
const isLookupLoading = ref(false)
const isFormDialogOpen = ref(false)
const isFormLoading = ref(false)
const isDetailDialogOpen = ref(false)
const isDetailLoading = ref(false)
const isConfirmDialogOpen = ref(false)
const isConfirmLoading = ref(false)
const formMode = ref<FormMode>('create')
const opnameItems = ref<AdminOpnameViewItem[]>([])
const ingredientOptions = ref<AdminOpnameIngredientOption[]>([])
const totalRecordCount = ref(0)
const selectedOpname = ref<AdminOpnameViewItem | null>(null)
const selectedOpnameDetail = ref<AdminOpnameViewItem | null>(null)
const confirmAction = ref<ConfirmAction | null>(null)
const newLineIngredientId = ref('')
const form = ref<OpnameFormState>(createEmptyForm())

let searchTimer: ReturnType<typeof setTimeout> | null = null
let opnameRequestId = 0
let formLineSequence = 0

const hasActiveFilter = computed(() => Boolean(
  search.value.trim()
  || statusFilter.value !== 'all'
  || dateFrom.value
  || dateTo.value,
))
const draftCount = computed(() => opnameItems.value.filter(item => item.status === 'DRAFT').length)
const completedCount = computed(() => opnameItems.value.filter(item => item.status === 'COMPLETED').length)
const appliedCount = computed(() => opnameItems.value.filter(item => item.status === 'APPLIED').length)
const selectedIngredientIds = computed(() => new Set(form.value.lines.map(line => line.ingredientId).filter(Boolean)))
const availableIngredientOptions = computed(() => ingredientOptions.value.filter(item => !selectedIngredientIds.value.has(item.id)))
const canAddLine = computed(() => Boolean(newLineIngredientId.value) && !selectedIngredientIds.value.has(newLineIngredientId.value))
const canCreateOpname = computed(() => ingredientOptions.value.length > 0)

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Total Sesi',
    value: String(totalRecordCount.value),
    helper: hasActiveFilter.value ? 'Sesuai filter aktif' : 'Riwayat opname tercatat',
    tone: 'info',
  },
  {
    id: 'draft',
    label: 'Draft',
    value: String(draftCount.value),
    helper: 'Masih bisa diubah',
    tone: 'warning',
  },
  {
    id: 'apply',
    label: 'Perlu Apply',
    value: String(completedCount.value),
    helper: `${appliedCount.value} sesi sudah diterapkan`,
    tone: completedCount.value ? 'destructive' : 'success',
  },
])

const formTitle = computed(() => formMode.value === 'create' ? 'Buat Stok Opname' : 'Ubah Draft Stok Opname')
const formDescription = computed(() => formMode.value === 'create'
  ? 'Pilih bahan baku yang dihitung, lalu isi stok fisik hasil opname.'
  : 'Perubahan hanya bisa disimpan selama sesi masih berstatus draft.')
const detailItem = computed(() => selectedOpnameDetail.value ?? selectedOpname.value)
const confirmTitle = computed(() => {
  const action = confirmAction.value

  if (!action) {
    return 'Konfirmasi Stok Opname'
  }

  if (action.type === 'complete') {
    return 'Selesaikan Stok Opname'
  }

  if (action.type === 'cancel') {
    return 'Batalkan Stok Opname'
  }

  if (action.type === 'apply') {
    return 'Apply Penyesuaian Stok'
  }

  return 'Hapus Stok Opname'
})
const confirmDescription = computed(() => {
  const action = confirmAction.value

  if (!action) {
    return ''
  }

  if (action.type === 'complete') {
    return 'Sesi akan dikunci sebagai selesai. Draft tidak bisa diubah setelah status ini.'
  }

  if (action.type === 'cancel') {
    return 'Sesi akan dibatalkan dan tidak bisa diterapkan ke stok asli.'
  }

  if (action.type === 'apply') {
    return 'Stok asli bahan akan diubah mengikuti stok fisik pada sesi opname ini.'
  }

  return 'Data stok opname akan dihapus secara soft delete dari daftar aktif.'
})
const confirmSubmitLabel = computed(() => {
  const action = confirmAction.value?.type

  if (action === 'complete') {
    return 'Selesaikan'
  }

  if (action === 'cancel') {
    return 'Batalkan Opname'
  }

  if (action === 'apply') {
    return 'Apply Stok'
  }

  return 'Hapus'
})
const confirmSubmitVariant = computed(() => {
  const action = confirmAction.value?.type

  return action === 'delete' || action === 'cancel' ? 'destructive' : 'default'
})

onMounted(async () => {
  await loadOpnameIngredients()
  await loadOpnames()
})

onBeforeUnmount(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})

watch([search, statusFilter, dateFrom, dateTo], () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    void loadOpnames()
  }, 300)
})

watch(isFormDialogOpen, (isOpen) => {
  if (!isOpen) {
    formError.value = ''
    newLineIngredientId.value = ''
  }
})

async function loadOpnameIngredients() {
  isLookupLoading.value = true
  lookupError.value = ''

  try {
    const records = await adminOpnameApi.getOpnameIngredients()

    ingredientOptions.value = (Array.isArray(records) ? records : []).map(mapAdminOpnameIngredientRecordToOption)
  }
  catch (error) {
    lookupError.value = getErrorMessage(error, 'Gagal memuat referensi bahan stok opname.')
    ingredientOptions.value = []
  }
  finally {
    isLookupLoading.value = false
  }
}

async function loadOpnames() {
  const requestId = ++opnameRequestId
  isLoading.value = true
  loadError.value = ''

  try {
    const result = await adminOpnameApi.getOpnames({
      batch: 1,
      size: 100,
      search: search.value.trim() || undefined,
      status: statusFilter.value === 'all' ? undefined : statusFilter.value,
      start_date: dateFrom.value || undefined,
      end_date: dateTo.value || undefined,
    })
    const records = Array.isArray(result.records) ? result.records : []

    if (requestId !== opnameRequestId) {
      return
    }

    opnameItems.value = records.map(mapAdminOpnameRecordToViewItem)
    totalRecordCount.value = result.page?.total_record_count ?? records.length
  }
  catch (error) {
    if (requestId !== opnameRequestId) {
      return
    }

    loadError.value = getErrorMessage(error, 'Gagal memuat daftar stok opname.')
    opnameItems.value = []
    totalRecordCount.value = 0
  }
  finally {
    if (requestId === opnameRequestId) {
      isLoading.value = false
    }
  }
}

function openCreateDialog() {
  selectedOpname.value = null
  selectedOpnameDetail.value = null
  formMode.value = 'create'
  formError.value = ''
  form.value = createEmptyForm()
  newLineIngredientId.value = ''
  isFormDialogOpen.value = true
}

async function openEditDialog(id: string) {
  const item = opnameItems.value.find(opname => opname.id === id)

  if (!item) {
    return
  }

  if (!isAdminOpnameEditable(item.status)) {
    toast.error('Stok opname hanya bisa diubah saat masih berstatus draft.')
    return
  }

  selectedOpname.value = item
  selectedOpnameDetail.value = item
  formMode.value = 'edit'
  formError.value = ''
  newLineIngredientId.value = ''
  isFormDialogOpen.value = true
  isFormLoading.value = true

  try {
    const detail = await adminOpnameApi.getOpnameDetail(id)
    const viewItem = mapAdminOpnameRecordToViewItem(detail)

    selectedOpnameDetail.value = viewItem
    form.value = createFormFromOpname(viewItem)
  }
  catch (error) {
    formError.value = getErrorMessage(error, 'Gagal memuat detail stok opname untuk diubah.')
    form.value = createFormFromOpname(item)
  }
  finally {
    isFormLoading.value = false
  }
}

async function openDetailDialog(id: string) {
  const item = opnameItems.value.find(opname => opname.id === id)

  if (!item) {
    return
  }

  selectedOpname.value = item
  selectedOpnameDetail.value = item
  isDetailDialogOpen.value = true
  isDetailLoading.value = true

  try {
    const detail = await adminOpnameApi.getOpnameDetail(id)

    selectedOpnameDetail.value = mapAdminOpnameRecordToViewItem(detail)
  }
  catch {
    selectedOpnameDetail.value = item
  }
  finally {
    isDetailLoading.value = false
  }
}

function openConfirmDialog(id: string, type: ConfirmActionType) {
  const item = opnameItems.value.find(opname => opname.id === id)

  if (!item || !canRunConfirmAction(item, type)) {
    return
  }

  confirmAction.value = {
    type,
    item,
  }
  isConfirmDialogOpen.value = true
}

async function handleFormSubmit() {
  const payload = createFormPayload()

  if (!payload) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    if (formMode.value === 'create') {
      await adminOpnameApi.createOpname(createAdminOpnameCreatePayload(payload))
    }
    else if (selectedOpname.value) {
      await adminOpnameApi.updateOpname(selectedOpname.value.id, createAdminOpnameUpdatePayload(payload))
    }

    await loadOpnames()
  }, {
    loading: isFormLoading,
    successMessage: formMode.value === 'create' ? 'Stok opname berhasil dibuat.' : 'Draft stok opname berhasil diperbarui.',
    errorMessage: formMode.value === 'create' ? 'Gagal membuat stok opname.' : 'Gagal memperbarui stok opname.',
  })

  if (succeeded) {
    isFormDialogOpen.value = false
  }
}

async function handleConfirmSubmit() {
  const action = confirmAction.value

  if (!action) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    if (action.type === 'complete') {
      await adminOpnameApi.updateOpnameStatus(action.item.id, { status: 'COMPLETED' })
    }
    else if (action.type === 'cancel') {
      await adminOpnameApi.updateOpnameStatus(action.item.id, { status: 'CANCELLED' })
    }
    else if (action.type === 'apply') {
      await adminOpnameApi.applyOpname(action.item.id)
      await loadOpnameIngredients()
    }
    else {
      await adminOpnameApi.deleteOpname(action.item.id)
    }

    await loadOpnames()
  }, {
    loading: isConfirmLoading,
    successMessage: getConfirmSuccessMessage(action.type),
    errorMessage: 'Aksi stok opname gagal diproses.',
  })

  if (succeeded) {
    isConfirmDialogOpen.value = false
    confirmAction.value = null
  }
}

function createFormPayload(): AdminOpnameFormPayload | null {
  const payload = {
    opnameDate: form.value.opnameDate,
    notes: form.value.notes.trim(),
    items: form.value.lines.map(line => ({
      ingredientId: line.ingredientId,
      physicalQty: parseAdminOpnameQtyInput(line.physicalQtyInput) ?? Number.NaN,
    })),
  }
  const validationMessage = getAdminOpnameValidationMessage(payload)

  if (validationMessage) {
    formError.value = validationMessage
    return null
  }

  formError.value = ''

  return payload
}

function addFormLine() {
  if (!canAddLine.value) {
    return
  }

  const option = getIngredientOption(newLineIngredientId.value)

  if (!option) {
    return
  }

  form.value.lines = [
    ...form.value.lines,
    createFormLineFromIngredient(option),
  ]
  newLineIngredientId.value = ''
  formError.value = ''
}

function removeFormLine(localId: string) {
  form.value.lines = form.value.lines.filter(line => line.localId !== localId)
  formError.value = ''
}

function handleLineIngredientChange(line: OpnameFormLine, event: Event) {
  const ingredientId = (event.target as HTMLSelectElement).value
  const option = getIngredientOption(ingredientId)

  line.ingredientId = ingredientId

  if (option) {
    line.ingredientName = option.name
    line.unitName = option.unitName
    line.systemQty = option.stockQty
  }

  formError.value = ''
}

function getIngredientOption(ingredientId: string) {
  return ingredientOptions.value.find(item => item.id === ingredientId)
}

function getFormLineSystemQtyLabel(line: OpnameFormLine) {
  return formatAdminOpnameQuantity(line.systemQty, line.unitName)
}

function getFormLinePhysicalQty(line: OpnameFormLine) {
  return parseAdminOpnameQtyInput(line.physicalQtyInput)
}

function getFormLineDifference(line: OpnameFormLine) {
  const physicalQty = getFormLinePhysicalQty(line)

  if (physicalQty === null) {
    return null
  }

  return roundAdminOpnameQty(physicalQty - line.systemQty)
}

function getFormLineDifferenceLabel(line: OpnameFormLine) {
  const difference = getFormLineDifference(line)

  if (difference === null) {
    return '-'
  }

  return formatAdminOpnameSignedQuantity(difference, line.unitName)
}

function getFormLineDifferenceTone(line: OpnameFormLine): AdminStatusTone {
  const difference = getFormLineDifference(line)

  if (difference === null) {
    return 'default'
  }

  return getAdminOpnameDifferenceTone(difference)
}

function createEmptyForm(): OpnameFormState {
  return {
    opnameDate: createLocalDateInput(),
    notes: '',
    lines: [],
  }
}

function createFormFromOpname(item: AdminOpnameViewItem): OpnameFormState {
  return {
    opnameDate: item.opnameDateInput || createLocalDateInput(),
    notes: item.notes === '-' ? '' : item.notes,
    lines: item.items.map(line => ({
      localId: createFormLineLocalId(),
      ingredientId: line.ingredientId,
      ingredientName: line.ingredientName,
      unitName: line.unitName,
      systemQty: line.systemQty,
      physicalQtyInput: String(line.physicalQty),
    })),
  }
}

function createFormLineFromIngredient(option: AdminOpnameIngredientOption): OpnameFormLine {
  return {
    localId: createFormLineLocalId(),
    ingredientId: option.id,
    ingredientName: option.name,
    unitName: option.unitName,
    systemQty: option.stockQty,
    physicalQtyInput: '',
  }
}

function createFormLineLocalId() {
  formLineSequence += 1

  return `opname-line-${Date.now()}-${formLineSequence}`
}

function createLocalDateInput() {
  const date = new Date()
  const timezoneOffsetMs = date.getTimezoneOffset() * 60 * 1000

  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 10)
}

function canRunConfirmAction(item: AdminOpnameViewItem, type: ConfirmActionType) {
  if (type === 'complete') {
    if (canCompleteAdminOpname(item.status)) {
      return true
    }

    toast.error('Hanya stok opname draft yang bisa diselesaikan.')
    return false
  }

  if (type === 'cancel') {
    if (canCancelAdminOpname(item.status)) {
      return true
    }

    toast.error('Hanya stok opname draft yang bisa dibatalkan.')
    return false
  }

  if (type === 'apply') {
    if (canApplyAdminOpname(item.status)) {
      return true
    }

    toast.error('Hanya stok opname selesai yang bisa di-apply.')
    return false
  }

  if (canDeleteAdminOpname(item.status)) {
    return true
  }

  toast.error('Stok opname hanya bisa dihapus saat draft atau dibatalkan.')

  return false
}

function getConfirmSuccessMessage(type: ConfirmActionType) {
  if (type === 'complete') {
    return 'Stok opname berhasil diselesaikan.'
  }

  if (type === 'cancel') {
    return 'Stok opname berhasil dibatalkan.'
  }

  if (type === 'apply') {
    return 'Penyesuaian stok opname berhasil diterapkan.'
  }

  return 'Stok opname berhasil dihapus.'
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
      title="Stok Opname"
      description="Kelola sesi perhitungan stok fisik bahan baku, kunci hasil opname, lalu apply penyesuaian ke stok sistem."
    />

    <section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan stok opname">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <ClipboardCheck v-if="item.id === 'total'" class="size-4" aria-hidden="true" />
          <PackageSearch v-else-if="item.id === 'draft'" class="size-4" aria-hidden="true" />
          <AlertTriangle v-else class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="stock-opname-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="stock-opname-table-title" class="text-base font-semibold tracking-normal">
            Daftar Stok Opname
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Status draft masih bisa diubah, status selesai bisa di-apply ke stok asli.
          </p>
        </div>
      </div>

      <Alert v-if="loadError || lookupError" variant="destructive" class="mb-3">
        <AlertCircle class="size-4" aria-hidden="true" />
        <AlertDescription>{{ loadError || lookupError }}</AlertDescription>
      </Alert>

      <AdminDataToolbar
        v-model="search"
        search-id="stock-opname-search"
        search-label="Cari stok opname"
        search-placeholder="Cari catatan stok opname"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="stock-opname-status-filter" class="sr-only">Filter status stok opname</label>
            <NativeSelect id="stock-opname-status-filter" v-model="statusFilter" class="w-40" :disabled="isLoading">
              <option value="all">Semua status</option>
              <option value="DRAFT">Draft</option>
              <option value="COMPLETED">Selesai</option>
              <option value="APPLIED">Diterapkan</option>
              <option value="CANCELLED">Dibatalkan</option>
            </NativeSelect>
          </div>

          <div class="flex gap-2">
            <label for="stock-opname-date-from" class="sr-only">Tanggal mulai stok opname</label>
            <Input id="stock-opname-date-from" v-model="dateFrom" type="date" class="w-36" :disabled="isLoading" />
            <label for="stock-opname-date-to" class="sr-only">Tanggal akhir stok opname</label>
            <Input id="stock-opname-date-to" v-model="dateTo" type="date" class="w-36" :disabled="isLoading" />
          </div>
        </template>

        <template #action>
          <Button type="button" size="sm" :disabled="isLoading || isLookupLoading || !canCreateOpname" @click="openCreateDialog">
            <Plus class="size-4" aria-hidden="true" />
            Buat Opname
          </Button>
        </template>
      </AdminDataToolbar>

      <div class="mt-3 rounded-md border">
        <div class="overflow-x-auto">
          <Table class="min-w-260" :aria-busy="isLoading">
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-40">Tanggal</TableHead>
                <TableHead class="min-w-72">Catatan</TableHead>
                <TableHead class="min-w-36">Status</TableHead>
                <TableHead class="text-right">Item</TableHead>
                <TableHead class="min-w-44">Pembuat</TableHead>
                <TableHead class="min-w-44">Update</TableHead>
                <TableHead class="w-120 min-w-120 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <template v-if="isLoading">
                <TableRow v-for="index in 5" :key="`stock-opname-loading-${index}`">
                  <TableCell v-for="column in 7" :key="`stock-opname-loading-${index}-${column}`">
                    <Skeleton class="h-4 w-full" />
                  </TableCell>
                </TableRow>
              </template>

              <template v-else-if="opnameItems.length">
                <TableRow v-for="item in opnameItems" :key="item.id">
                  <TableCell>
                    <div class="min-w-0">
                      <p class="text-sm font-medium">{{ item.opnameDate }}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p class="line-clamp-2 text-sm">{{ item.notes }}</p>
                  </TableCell>
                  <TableCell>
                    <AdminStatusBadge :tone="item.statusTone">
                      {{ item.statusLabel }}
                    </AdminStatusBadge>
                  </TableCell>
                  <TableCell class="text-right tabular-nums">
                    {{ item.itemCountLabel }}
                  </TableCell>
                  <TableCell>{{ item.userName }}</TableCell>
                  <TableCell>{{ item.updatedAt }}</TableCell>
                  <TableCell class="text-right">
                    <div class="flex flex-nowrap items-center justify-end gap-1.5">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        class="h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary"
                        @click="openDetailDialog(item.id)"
                      >
                        <Eye class="size-4" aria-hidden="true" />
                        Detail
                      </Button>
                      <Button
                        v-if="isAdminOpnameEditable(item.status)"
                        type="button"
                        variant="ghost"
                        size="sm"
                        class="h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground"
                        @click="openEditDialog(item.id)"
                      >
                        <Pencil class="size-4" aria-hidden="true" />
                        Ubah
                      </Button>
                      <Button
                        v-if="canCompleteAdminOpname(item.status)"
                        type="button"
                        variant="ghost"
                        size="sm"
                        class="h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary"
                        @click="openConfirmDialog(item.id, 'complete')"
                      >
                        <CheckCircle2 class="size-4" aria-hidden="true" />
                        Selesai
                      </Button>
                      <Button
                        v-if="canApplyAdminOpname(item.status)"
                        type="button"
                        variant="ghost"
                        size="sm"
                        class="h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success"
                        @click="openConfirmDialog(item.id, 'apply')"
                      >
                        <Send class="size-4" aria-hidden="true" />
                        Apply
                      </Button>
                      <Button
                        v-if="canCancelAdminOpname(item.status)"
                        type="button"
                        variant="ghost"
                        size="sm"
                        class="h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        @click="openConfirmDialog(item.id, 'cancel')"
                      >
                        <XCircle class="size-4" aria-hidden="true" />
                        Batal
                      </Button>
                      <Button
                        v-if="canDeleteAdminOpname(item.status)"
                        type="button"
                        variant="ghost"
                        size="sm"
                        class="h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        @click="openConfirmDialog(item.id, 'delete')"
                      >
                        <Trash2 class="size-4" aria-hidden="true" />
                        Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </template>

              <TableEmpty v-else :colspan="7">
                <div class="text-center">
                  <p class="text-sm font-medium">Stok opname tidak ditemukan</p>
                  <p class="mt-1 text-sm text-muted-foreground">Ubah kata kunci, status, atau rentang tanggal.</p>
                </div>
              </TableEmpty>
            </TableBody>
          </Table>
        </div>

        <div class="border-t p-3 text-sm text-muted-foreground">
          Menampilkan {{ opnameItems.length }} dari {{ totalRecordCount }} sesi stok opname.
        </div>
      </div>
    </section>

    <Dialog v-model:open="isFormDialogOpen">
      <DialogContent class="max-h-[calc(100vh-2rem)] gap-0 overflow-hidden p-0 sm:max-w-5xl">
        <DialogHeader class="border-b p-4 pr-12">
          <DialogTitle>{{ formTitle }}</DialogTitle>
          <DialogDescription>{{ formDescription }}</DialogDescription>
        </DialogHeader>

        <div class="max-h-[calc(100vh-13rem)] overflow-y-auto px-4 py-4">
          <Alert v-if="formError" variant="destructive" class="mb-4">
            <AlertCircle class="size-4" aria-hidden="true" />
            <AlertDescription>{{ formError }}</AlertDescription>
          </Alert>

          <div class="grid gap-4 sm:grid-cols-[14rem_minmax(0,1fr)]">
            <div class="grid gap-2">
              <label for="stock-opname-form-date" class="text-sm font-medium text-foreground">Tanggal Opname</label>
              <Input id="stock-opname-form-date" v-model="form.opnameDate" type="date" :disabled="isFormLoading" required />
            </div>

            <div class="grid gap-2">
              <label for="stock-opname-form-notes" class="text-sm font-medium text-foreground">Catatan</label>
              <Textarea
                id="stock-opname-form-notes"
                v-model="form.notes"
                class="min-h-20"
                maxlength="500"
                placeholder="Contoh: opname rutin akhir bulan"
                :disabled="isFormLoading"
              />
            </div>
          </div>

          <div class="mt-4 rounded-md border bg-muted/20 p-3">
            <div class="flex flex-col gap-2 lg:flex-row lg:items-end">
              <div class="grid min-w-0 flex-1 gap-2">
                <label for="stock-opname-add-ingredient" class="text-sm font-medium text-foreground">Tambah Bahan</label>
                <NativeSelect
                  id="stock-opname-add-ingredient"
                  v-model="newLineIngredientId"
                  :disabled="isFormLoading || !availableIngredientOptions.length"
                >
                  <option value="">Pilih bahan</option>
                  <option v-for="ingredient in availableIngredientOptions" :key="ingredient.id" :value="ingredient.id">
                    {{ ingredient.name }} - stok sistem {{ ingredient.stockLabel }}
                  </option>
                </NativeSelect>
              </div>

              <Button type="button" class="lg:w-auto" :disabled="isFormLoading || !canAddLine" @click="addFormLine">
                <Plus class="size-4" aria-hidden="true" />
                Tambah
              </Button>
            </div>
          </div>

          <div class="mt-4 rounded-md border">
            <div class="overflow-x-auto">
              <Table class="min-w-210">
                <TableHeader>
                  <TableRow>
                    <TableHead class="min-w-64">Bahan</TableHead>
                    <TableHead class="w-40 text-right">Stok Sistem</TableHead>
                    <TableHead class="w-44">Stok Fisik</TableHead>
                    <TableHead class="w-40 text-right">Selisih</TableHead>
                    <TableHead class="w-24 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <template v-if="form.lines.length">
                    <TableRow v-for="line in form.lines" :key="line.localId" class="align-top">
                      <TableCell>
                        <label :for="`stock-opname-line-ingredient-${line.localId}`" class="sr-only">Bahan opname</label>
                        <NativeSelect
                          :id="`stock-opname-line-ingredient-${line.localId}`"
                          :model-value="line.ingredientId"
                          :disabled="isFormLoading"
                          @change="handleLineIngredientChange(line, $event)"
                        >
                          <option value="">Pilih bahan</option>
                          <option v-for="ingredient in ingredientOptions" :key="ingredient.id" :value="ingredient.id">
                            {{ ingredient.name }}
                          </option>
                        </NativeSelect>
                        <p class="mt-1 text-xs text-muted-foreground">Satuan {{ line.unitName }}</p>
                      </TableCell>
                      <TableCell class="text-right tabular-nums">
                        {{ getFormLineSystemQtyLabel(line) }}
                      </TableCell>
                      <TableCell>
                        <label :for="`stock-opname-line-physical-${line.localId}`" class="sr-only">Stok fisik</label>
                        <Input
                          :id="`stock-opname-line-physical-${line.localId}`"
                          v-model="line.physicalQtyInput"
                          inputmode="decimal"
                          placeholder="0"
                          :disabled="isFormLoading"
                        />
                      </TableCell>
                      <TableCell class="text-right">
                        <AdminStatusBadge :tone="getFormLineDifferenceTone(line)">
                          {{ getFormLineDifferenceLabel(line) }}
                        </AdminStatusBadge>
                      </TableCell>
                      <TableCell class="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          class="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          :disabled="isFormLoading"
                          @click="removeFormLine(line.localId)"
                        >
                          <Trash2 class="size-4" aria-hidden="true" />
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  </template>

                  <TableEmpty v-else :colspan="5">
                    <div class="text-center">
                      <p class="text-sm font-medium">Belum ada bahan dipilih</p>
                      <p class="mt-1 text-sm text-muted-foreground">Tambahkan bahan yang sedang dihitung stok fisiknya.</p>
                    </div>
                  </TableEmpty>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter class="border-t p-4">
          <Button type="button" variant="outline" :disabled="isFormLoading" @click="isFormDialogOpen = false">
            Batal
          </Button>
          <Button type="button" :disabled="isFormLoading" @click="handleFormSubmit">
            <Spinner v-if="isFormLoading" class="size-4" />
            <Save v-else class="size-4" aria-hidden="true" />
            {{ isFormLoading ? 'Menyimpan...' : 'Simpan Opname' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="isDetailDialogOpen">
      <DialogContent class="max-h-[calc(100vh-2rem)] gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader class="border-b p-4 pr-12">
          <DialogTitle>Detail Stok Opname</DialogTitle>
          <DialogDescription>
            {{ isDetailLoading ? 'Memuat detail stok opname...' : 'Rincian bahan, stok sistem, stok fisik, dan selisih opname.' }}
          </DialogDescription>
        </DialogHeader>

        <div class="max-h-[calc(100vh-13rem)] overflow-y-auto px-4 py-4">
          <div v-if="detailItem" class="grid gap-2 sm:grid-cols-4">
            <div class="rounded-md border bg-muted/30 p-3">
              <p class="text-xs font-medium uppercase text-muted-foreground">Tanggal</p>
              <p class="mt-1 text-sm font-medium">{{ detailItem.opnameDate }}</p>
            </div>
            <div class="rounded-md border bg-muted/30 p-3">
              <p class="text-xs font-medium uppercase text-muted-foreground">Status</p>
              <AdminStatusBadge :tone="detailItem.statusTone" class="mt-2">
                {{ detailItem.statusLabel }}
              </AdminStatusBadge>
            </div>
            <div class="rounded-md border bg-muted/30 p-3">
              <p class="text-xs font-medium uppercase text-muted-foreground">Item</p>
              <p class="mt-1 text-sm font-medium">{{ detailItem.itemCountLabel }}</p>
            </div>
            <div class="rounded-md border bg-muted/30 p-3">
              <p class="text-xs font-medium uppercase text-muted-foreground">Pembuat</p>
              <p class="mt-1 text-sm font-medium">{{ detailItem.userName }}</p>
            </div>
          </div>

          <div v-if="detailItem" class="mt-3 rounded-md border bg-muted/30 p-3">
            <p class="text-xs font-medium uppercase text-muted-foreground">Catatan</p>
            <p class="mt-1 text-sm">{{ detailItem.notes }}</p>
          </div>

          <div class="mt-4 rounded-md border">
            <div class="overflow-x-auto">
              <Table class="min-w-190" :aria-busy="isDetailLoading">
                <TableHeader>
                  <TableRow>
                    <TableHead class="min-w-64">Bahan</TableHead>
                    <TableHead class="text-right">Stok Sistem</TableHead>
                    <TableHead class="text-right">Stok Fisik</TableHead>
                    <TableHead class="text-right">Selisih</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <template v-if="isDetailLoading">
                    <TableRow v-for="index in 4" :key="`stock-opname-detail-loading-${index}`">
                      <TableCell v-for="column in 4" :key="`stock-opname-detail-loading-${index}-${column}`">
                        <Skeleton class="h-4 w-full" />
                      </TableCell>
                    </TableRow>
                  </template>

                  <template v-else-if="detailItem?.items.length">
                    <TableRow v-for="line in detailItem.items" :key="line.id">
                      <TableCell>
                        <p class="text-sm font-medium">{{ line.ingredientName }}</p>
                        <p class="mt-0.5 text-xs text-muted-foreground">Satuan {{ line.unitName }}</p>
                      </TableCell>
                      <TableCell class="text-right tabular-nums">{{ line.systemQtyLabel }}</TableCell>
                      <TableCell class="text-right tabular-nums">{{ line.physicalQtyLabel }}</TableCell>
                      <TableCell class="text-right">
                        <AdminStatusBadge :tone="line.differenceTone">
                          {{ line.differenceLabel }}
                        </AdminStatusBadge>
                      </TableCell>
                    </TableRow>
                  </template>

                  <TableEmpty v-else :colspan="4">
                    <div class="text-center">
                      <p class="text-sm font-medium">Detail bahan belum tersedia</p>
                      <p class="mt-1 text-sm text-muted-foreground">Data detail tidak dikembalikan oleh API.</p>
                    </div>
                  </TableEmpty>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter class="border-t p-4">
          <Button type="button" variant="outline" :disabled="isDetailLoading" @click="isDetailDialogOpen = false">
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="isConfirmDialogOpen">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ confirmTitle }}</DialogTitle>
          <DialogDescription>{{ confirmDescription }}</DialogDescription>
        </DialogHeader>

        <div v-if="confirmAction" class="rounded-md border bg-muted/30 p-3">
          <div class="flex items-start gap-3">
            <span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <CalendarDays v-if="confirmAction.type === 'complete'" class="size-4" aria-hidden="true" />
              <Send v-else-if="confirmAction.type === 'apply'" class="size-4" aria-hidden="true" />
              <Trash2 v-else-if="confirmAction.type === 'delete'" class="size-4" aria-hidden="true" />
              <XCircle v-else class="size-4" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <p class="text-sm font-medium">{{ confirmAction.item.opnameDate }}</p>
              <p class="mt-1 line-clamp-2 text-sm text-muted-foreground">{{ confirmAction.item.notes }}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" :disabled="isConfirmLoading" @click="isConfirmDialogOpen = false">
            Batal
          </Button>
          <Button type="button" :variant="confirmSubmitVariant" :disabled="isConfirmLoading" @click="handleConfirmSubmit">
            <Spinner v-if="isConfirmLoading" class="size-4" />
            {{ isConfirmLoading ? 'Memproses...' : confirmSubmitLabel }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
