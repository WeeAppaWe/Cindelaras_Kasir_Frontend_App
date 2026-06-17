<script setup lang="ts">
import type { TransactionHistoryItem } from '../../types/cashier'
import { ReceiptText, RotateCcw, WalletCards } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import CashierMetric from '../../components/molecules/CashierMetric.vue'
import CashierPageHeader from '../../components/molecules/CashierPageHeader.vue'
import CashierTablePagination from '../../components/molecules/CashierTablePagination.vue'
import CashierTableToolbar from '../../components/molecules/CashierTableToolbar.vue'
import TransactionDetailDialog from '../../components/organisms/TransactionDetailDialog.vue'
import TransactionHistoryTable from '../../components/organisms/TransactionHistoryTable.vue'

definePageMeta({
  layout: 'cashier',
  middleware: 'cashier-only',
})

useHead({
  title: 'Riwayat Transaksi',
})

type TransactionStatusFilter = 'all' | 'PENDING' | 'COMPLETED' | 'CANCELLED'
type TransactionMethodFilter = 'all' | 'CASH' | 'QRIS'
type TransactionOrderTypeFilter = 'all' | 'DINE_IN' | 'TAKE_AWAY'

const search = ref('')
const statusFilter = ref<TransactionStatusFilter>('all')
const methodFilter = ref<TransactionMethodFilter>('all')
const orderTypeFilter = ref<TransactionOrderTypeFilter>('all')
const startDate = ref('')
const endDate = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const selectedTransaction = ref<TransactionHistoryItem | null>(null)
const isDetailDialogOpen = ref(false)
const {
  activeShift,
  formatCurrency,
  transactions,
  transactionPage,
  isTransactionListLoading,
  isTransactionDetailLoading,
  loadActiveShift,
  loadTransactions,
  loadTransactionDetail,
} = useCashierStore()

const totalTransactions = computed(() => transactionPage.value?.total_record_count ?? transactions.value.length)
const visibleRevenue = computed(() => transactions.value.reduce((sum, item) => sum + item.total, 0))
const hasActiveFilters = computed(() => Boolean(
  search.value.trim()
  || statusFilter.value !== 'all'
  || methodFilter.value !== 'all'
  || orderTypeFilter.value !== 'all'
  || startDate.value
  || endDate.value,
))

let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null
let isResettingFilters = false

onMounted(() => {
  void loadTransactionPage()
})

onBeforeUnmount(() => {
  clearSearchDebounce()
})

watch([statusFilter, methodFilter, orderTypeFilter, startDate, endDate, pageSize], () => {
  if (isResettingFilters) {
    return
  }

  resetPageAndLoadTransactions()
})

watch(currentPage, () => {
  void loadTransactionPage()
})

watch(search, () => {
  if (isResettingFilters) {
    return
  }

  clearSearchDebounce()
  searchDebounceTimer = setTimeout(() => {
    resetPageAndLoadTransactions()
  }, 350)
})

async function loadTransactionPage() {
  try {
    const shift = activeShift.value ?? await loadActiveShift()

    if (!shift?.id) {
      transactions.value = []
      transactionPage.value = null
      return
    }

    await loadTransactions({
      batch: currentPage.value,
      size: pageSize.value,
      shift_id: shift.id,
      ...(search.value.trim() ? { search: search.value.trim() } : {}),
      ...(statusFilter.value !== 'all' ? { status: statusFilter.value } : {}),
      ...(methodFilter.value !== 'all' ? { payment_type: methodFilter.value } : {}),
      ...(orderTypeFilter.value !== 'all' ? { order_type: orderTypeFilter.value } : {}),
      ...(startDate.value ? { start_date: startDate.value } : {}),
      ...(endDate.value ? { end_date: endDate.value } : {}),
    })
  }
  catch (error) {
    toast.error(getErrorMessage(error, 'Gagal memuat riwayat transaksi.'))
  }
}

function resetPageAndLoadTransactions() {
  if (currentPage.value !== 1) {
    currentPage.value = 1
    return
  }

  void loadTransactionPage()
}

function clearSearchDebounce() {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
    searchDebounceTimer = null
  }
}

async function resetFilters() {
  clearSearchDebounce()
  isResettingFilters = true
  search.value = ''
  statusFilter.value = 'all'
  methodFilter.value = 'all'
  orderTypeFilter.value = 'all'
  startDate.value = ''
  endDate.value = ''
  await nextTick()
  isResettingFilters = false
  resetPageAndLoadTransactions()
}

async function handleViewDetail(item: TransactionHistoryItem) {
  selectedTransaction.value = item
  isDetailDialogOpen.value = true

  if (!item.orderId) {
    toast.error('Data order tidak tersedia.')
    return
  }

  try {
    selectedTransaction.value = await loadTransactionDetail(item.orderId)
  }
  catch (error) {
    toast.error(getErrorMessage(error, 'Gagal memuat detail transaksi.'))
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
      title="Riwayat Transaksi"
      description="Pantau transaksi shift kasir dengan tabel ringkas."
    />

    <div class="grid gap-2 sm:grid-cols-2">
      <CashierMetric label="Total transaksi" :value="String(totalTransactions)" helper="Sesuai filter" tone="info">
        <template #icon>
          <ReceiptText class="size-4" aria-hidden="true" />
        </template>
      </CashierMetric>
      <CashierMetric label="Nominal halaman" :value="formatCurrency(visibleRevenue)" helper="Data yang tampil" tone="success">
        <template #icon>
          <WalletCards class="size-4" aria-hidden="true" />
        </template>
      </CashierMetric>
    </div>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="transactions-table-title">
      <div class="mb-3">
        <h2 id="transactions-table-title" class="text-base font-semibold tracking-normal">
          Tabel Transaksi
        </h2>
      </div>

      <CashierTableToolbar
        v-model="search"
        search-id="transaction-search"
        search-label="Cari transaksi"
        search-placeholder="Cari kode, pelanggan, kasir, metode"
        :disabled="isTransactionListLoading"
      >
        <template #filters>
          <div>
            <label for="transaction-status-filter" class="sr-only">Filter status transaksi</label>
            <NativeSelect id="transaction-status-filter" v-model="statusFilter" class="w-40" :disabled="isTransactionListLoading">
              <option value="all">Semua status</option>
              <option value="COMPLETED">Lunas</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Dibatalkan</option>
            </NativeSelect>
          </div>

          <div>
            <label for="transaction-method-filter" class="sr-only">Filter metode pembayaran</label>
            <NativeSelect id="transaction-method-filter" v-model="methodFilter" class="w-36" :disabled="isTransactionListLoading">
              <option value="all">Semua metode</option>
              <option value="CASH">Tunai</option>
              <option value="QRIS">QRIS</option>
            </NativeSelect>
          </div>

          <div>
            <label for="transaction-order-type-filter" class="sr-only">Filter tipe pesanan</label>
            <NativeSelect id="transaction-order-type-filter" v-model="orderTypeFilter" class="w-40" :disabled="isTransactionListLoading">
              <option value="all">Semua tipe</option>
              <option value="DINE_IN">Makan di Tempat</option>
              <option value="TAKE_AWAY">Bungkus</option>
            </NativeSelect>
          </div>

          <div>
            <label for="transaction-start-date" class="sr-only">Tanggal mulai transaksi</label>
            <Input
              id="transaction-start-date"
              v-model="startDate"
              type="date"
              class="h-9 w-40"
              :disabled="isTransactionListLoading"
            />
          </div>

          <div>
            <label for="transaction-end-date" class="sr-only">Tanggal akhir transaksi</label>
            <Input
              id="transaction-end-date"
              v-model="endDate"
              type="date"
              class="h-9 w-40"
              :disabled="isTransactionListLoading"
            />
          </div>
        </template>

        <template #action>
          <Button
            v-if="hasActiveFilters"
            type="button"
            variant="outline"
            size="sm"
            :disabled="isTransactionListLoading"
            @click="resetFilters"
          >
            <RotateCcw class="size-4" aria-hidden="true" />
            Reset
          </Button>
        </template>
      </CashierTableToolbar>

      <div class="mt-3 space-y-3">
        <TransactionHistoryTable
          :items="transactions"
          :loading="isTransactionListLoading"
          @view-detail="handleViewDetail"
        />
        <CashierTablePagination
          v-model:page="currentPage"
          v-model:page-size="pageSize"
          :total-items="totalTransactions"
          :disabled="isTransactionListLoading"
          label="transaksi"
        />
      </div>
    </section>

    <TransactionDetailDialog
      v-model:open="isDetailDialogOpen"
      :transaction="selectedTransaction"
      :loading="isTransactionDetailLoading"
    />
  </div>
</template>
