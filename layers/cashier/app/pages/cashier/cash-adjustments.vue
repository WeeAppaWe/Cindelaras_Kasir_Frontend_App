<script setup lang="ts">
import type { CashAdjustmentDraft, CashAdjustmentItem } from '../../types/cashier'
import { ArrowDownToLine, ArrowUpFromLine, Plus, WalletCards } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { Button } from '#layers/base/app/components/ui/button'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import CashierMetric from '../../components/molecules/CashierMetric.vue'
import CashierPageHeader from '../../components/molecules/CashierPageHeader.vue'
import CashierTablePagination from '../../components/molecules/CashierTablePagination.vue'
import CashAdjustmentDetailDialog from '../../components/organisms/CashAdjustmentDetailDialog.vue'
import CashAdjustmentDialog from '../../components/organisms/CashAdjustmentDialog.vue'
import CashAdjustmentTable from '../../components/organisms/CashAdjustmentTable.vue'

definePageMeta({
  layout: 'cashier',
  middleware: 'cashier-only',
})

useHead({
  title: 'Penyesuaian Kas',
})

type CashAdjustmentTypeFilter = 'all' | 'IN' | 'OUT'

const typeFilter = ref<CashAdjustmentTypeFilter>('all')
const currentPage = ref(1)
const pageSize = ref(10)
const isDialogOpen = ref(false)
const isAdjustmentSubmitting = ref(false)
const selectedAdjustment = ref<CashAdjustmentItem | null>(null)
const isDetailDialogOpen = ref(false)
const { runCashierAction } = useCashierActionFeedback()
const {
  activeShift,
  adjustments,
  cashAdjustmentPage,
  cashAdjustmentSummary,
  cashInTotal,
  cashOutTotal,
  createCashAdjustment,
  formatCurrency,
  isCashAdjustmentListLoading,
  isCashAdjustmentDetailLoading,
  loadActiveShift,
  loadCashAdjustments,
  loadCashAdjustmentDetail,
} = useCashierStore()

const totalAdjustments = computed(() => cashAdjustmentPage.value?.total_record_count ?? adjustments.value.length)
const netCashAdjustment = computed(() => Number(cashAdjustmentSummary.value?.net_amount ?? cashInTotal.value - cashOutTotal.value))
let skipNextPageLoad = false

onMounted(() => {
  void loadCashAdjustmentPage()
})

watch([typeFilter, pageSize], () => {
  resetPageAndLoadCashAdjustments()
})

watch(currentPage, () => {
  if (skipNextPageLoad) {
    skipNextPageLoad = false
    return
  }

  void loadCashAdjustmentPage()
})

async function loadCashAdjustmentPage() {
  try {
    const shift = activeShift.value ?? await loadActiveShift()

    if (!shift?.id) {
      adjustments.value = []
      cashAdjustmentPage.value = null
      cashAdjustmentSummary.value = null
      return
    }

    await loadCashAdjustments({
      batch: currentPage.value,
      size: pageSize.value,
      shift_id: shift.id,
      ...(typeFilter.value !== 'all' ? { type: typeFilter.value } : {}),
    })
  }
  catch (error) {
    toast.error(getErrorMessage(error, 'Gagal memuat penyesuaian kas.'))
  }
}

function resetPageAndLoadCashAdjustments() {
  if (currentPage.value !== 1) {
    currentPage.value = 1
    return
  }

  void loadCashAdjustmentPage()
}

function openCreateDialog() {
  selectedAdjustment.value = null
  isDialogOpen.value = true
}

async function handleSubmitAdjustment(payload: CashAdjustmentDraft) {
  const adjustment = await runCashierAction(async () => {
    const shift = activeShift.value ?? await loadActiveShift()

    if (!shift?.id) {
      throw new Error('Shift belum dibuka.')
    }

    const createdAdjustment = await createCashAdjustment(payload)

    if (currentPage.value !== 1) {
      skipNextPageLoad = true
      currentPage.value = 1
    }

    await loadCashAdjustments({
      batch: currentPage.value,
      size: pageSize.value,
      shift_id: shift.id,
      ...(typeFilter.value !== 'all' ? { type: typeFilter.value } : {}),
    })

    return createdAdjustment
  }, {
    loading: isAdjustmentSubmitting,
    successMessage: 'Penyesuaian kas dicatat',
    successDescription: 'Data tersimpan pada shift aktif.',
    errorMessage: 'Penyesuaian kas gagal diproses.',
  })

  if (adjustment) {
    isDialogOpen.value = false
  }
}

async function handleViewDetail(item: CashAdjustmentItem) {
  selectedAdjustment.value = item
  isDetailDialogOpen.value = true

  try {
    selectedAdjustment.value = await loadCashAdjustmentDetail(item.id)
  }
  catch (error) {
    toast.error(getErrorMessage(error, 'Gagal memuat detail penyesuaian kas.'))
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
    <CashierPageHeader
      title="Penyesuaian Kas"
      description="Catat dan pantau mutasi kas manual dalam shift."
    />

    <div class="grid gap-2 sm:grid-cols-3">
      <CashierMetric label="Kas masuk" :value="formatCurrency(cashInTotal)" helper="Sesuai filter" tone="success">
        <template #icon>
          <ArrowDownToLine class="size-4" aria-hidden="true" />
        </template>
      </CashierMetric>
      <CashierMetric label="Kas keluar" :value="formatCurrency(cashOutTotal)" helper="Sesuai filter" tone="destructive">
        <template #icon>
          <ArrowUpFromLine class="size-4" aria-hidden="true" />
        </template>
      </CashierMetric>
      <CashierMetric label="Net kas" :value="formatCurrency(netCashAdjustment)" helper="Masuk dikurangi keluar" tone="info">
        <template #icon>
          <WalletCards class="size-4" aria-hidden="true" />
        </template>
      </CashierMetric>
    </div>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="adjustments-table-title">
      <div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="adjustments-table-title" class="text-base font-semibold tracking-normal">
            Tabel Penyesuaian Kas
          </h2>
          <p class="text-sm text-muted-foreground">
            {{ isCashAdjustmentListLoading ? 'Memuat penyesuaian kas...' : `${totalAdjustments} penyesuaian kas.` }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <div>
            <label for="cash-adjustment-type-filter" class="sr-only">Filter tipe penyesuaian kas</label>
            <NativeSelect id="cash-adjustment-type-filter" v-model="typeFilter" class="w-40" :disabled="isCashAdjustmentListLoading">
              <option value="all">Semua tipe</option>
              <option value="IN">Kas masuk</option>
              <option value="OUT">Kas keluar</option>
            </NativeSelect>
          </div>

          <Button
            type="button"
            size="sm"
            :disabled="isCashAdjustmentListLoading"
            @click="openCreateDialog"
          >
            <Plus class="size-4" aria-hidden="true" />
            Tambah
          </Button>
        </div>
      </div>

      <div class="space-y-3">
        <CashAdjustmentTable
          :items="adjustments"
          :loading="isCashAdjustmentListLoading"
          @view-detail="handleViewDetail"
        />
        <CashierTablePagination
          v-model:page="currentPage"
          v-model:page-size="pageSize"
          :total-items="totalAdjustments"
          :disabled="isCashAdjustmentListLoading"
          label="penyesuaian"
        />
      </div>
    </section>

    <CashAdjustmentDialog
      v-model:open="isDialogOpen"
      :adjustment="selectedAdjustment"
      :submitting="isAdjustmentSubmitting"
      @submit="handleSubmitAdjustment"
    />

    <CashAdjustmentDetailDialog
      v-model:open="isDetailDialogOpen"
      :adjustment="selectedAdjustment"
      :loading="isCashAdjustmentDetailLoading"
    />
  </div>
</template>
