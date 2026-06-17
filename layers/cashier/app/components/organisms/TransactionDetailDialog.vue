<script setup lang="ts">
import type { TransactionHistoryItem } from '../../types/cashier'
import { AlertTriangle, CreditCard, ReceiptText, Send, UserRound, Utensils, WalletCards } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#layers/base/app/components/ui/dialog'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import { getCashierTransactionDisplayCode } from '../../utils/cashier-display'
import CashierCurrency from '../atoms/CashierCurrency.vue'
import CashierStatusBadge from '../atoms/CashierStatusBadge.vue'

const props = defineProps<{
  open: boolean
  transaction: TransactionHistoryItem | null
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isSendingReceipt = ref(false)
const { runCashierAction } = useCashierActionFeedback()
const { sendTransactionReceipt } = useCashierStore()

const dialogOpen = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})

const transactionItems = computed(() => props.transaction?.items ?? [])
const hasItems = computed(() => transactionItems.value.length > 0)
const transactionDisplayCode = computed(() => props.transaction ? getCashierTransactionDisplayCode(props.transaction) : '-')
const hasCustomerPhone = computed(() => {
  const phone = props.transaction?.customerPhone.trim() ?? ''

  if (!phone || phone === '-') {
    return false
  }

  return Boolean(phone.replace(/\D/g, ''))
})

const canSendReceipt = computed(() => Boolean(props.transaction?.orderId && hasCustomerPhone.value && !props.loading))
const receiptWarningMessage = computed(() => {
  if (!props.transaction?.orderId) {
    return 'Data order tidak tersedia, jadi struk tidak bisa dikirim.'
  }

  if (!hasCustomerPhone.value) {
    return 'Nomor WhatsApp tidak diisi di awal transaksi, jadi struk tidak bisa dikirim.'
  }

  return ''
})

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    isSendingReceipt.value = false
  }
})

async function sendReceipt() {
  const transaction = props.transaction

  await runCashierAction(async () => {
    if (!transaction) {
      throw new Error('Data transaksi tidak tersedia.')
    }

    const result = await sendTransactionReceipt(transaction)

    return {
      transaction,
      result,
    }
  }, {
    loading: isSendingReceipt,
    successMessage: 'Struk dikirim ke WhatsApp',
    successDescription: payload => payload.result.message || 'Struk berhasil dikirim.',
    errorMessage: 'Struk gagal dikirim.',
  })
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="gap-0 p-0 sm:max-w-lg">
      <DialogHeader class="border-b px-5 pt-5 pb-4">
        <div class="flex items-start gap-3">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ReceiptText class="size-5" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <DialogTitle>Detail transaksi</DialogTitle>
            <DialogDescription class="mt-1">
              Lihat informasi pembayaran dan pesanan transaksi.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div v-if="props.transaction" class="space-y-4 px-5 py-5">
        <p
          v-if="props.loading"
          class="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground"
          aria-live="polite"
        >
          <Spinner class="size-4" />
          Memuat detail transaksi...
        </p>

        <div class="rounded-md border border-primary/20 bg-primary/10 p-4">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <p class="text-sm font-medium text-primary">Kode transaksi</p>
              <p class="mt-1 truncate text-lg font-semibold">{{ transactionDisplayCode }}</p>
            </div>
            <CashierStatusBadge :status="props.transaction.status">
              {{ props.transaction.statusLabel }}
            </CashierStatusBadge>
          </div>
        </div>

        <section class="rounded-md border bg-card p-3" aria-labelledby="transaction-customer-title">
          <div class="mb-3 flex items-center gap-2">
            <UserRound class="size-4 text-muted-foreground" aria-hidden="true" />
            <h3 id="transaction-customer-title" class="text-sm font-semibold">
              Pelanggan
            </h3>
          </div>
          <dl class="grid gap-2 text-sm">
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Nama</dt>
              <dd class="text-right font-medium">{{ props.transaction.customerName }}</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">WhatsApp</dt>
              <dd class="text-right font-medium">{{ props.transaction.customerPhone }}</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Kasir</dt>
              <dd class="text-right font-medium">{{ props.transaction.cashierName }}</dd>
            </div>
          </dl>
        </section>

        <section class="rounded-md border bg-card p-3" aria-labelledby="transaction-payment-title">
          <div class="mb-3 flex items-center gap-2">
            <CreditCard class="size-4 text-muted-foreground" aria-hidden="true" />
            <h3 id="transaction-payment-title" class="text-sm font-semibold">
              Pembayaran
            </h3>
          </div>
          <dl class="grid gap-2 text-sm">
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Waktu</dt>
              <dd class="text-right font-medium">{{ props.transaction.paidAt }}</dd>
            </div>
            <div v-if="props.transaction.shiftStartedAt" class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Shift dibuka</dt>
              <dd class="text-right font-medium">{{ props.transaction.shiftStartedAt }}</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Metode</dt>
              <dd class="text-right font-medium">{{ props.transaction.paymentMethod }}</dd>
            </div>
            <div v-if="props.transaction.diningOption" class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Tipe pesanan</dt>
              <dd class="text-right font-medium">{{ props.transaction.diningOption }}</dd>
            </div>
            <template v-if="props.transaction.cashReceived !== undefined && props.transaction.cashReceived !== null">
              <div class="flex justify-between gap-3">
                <dt class="text-muted-foreground">Uang diterima</dt>
                <dd class="text-right font-medium"><CashierCurrency :value="props.transaction.cashReceived" /></dd>
              </div>
              <div class="flex justify-between gap-3">
                <dt class="text-muted-foreground">Kembalian</dt>
                <dd class="text-right font-medium"><CashierCurrency :value="props.transaction.cashChange ?? 0" /></dd>
              </div>
            </template>
          </dl>
        </section>

        <section class="rounded-md border bg-card p-3" aria-labelledby="transaction-items-title">
          <div class="mb-2 flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <Utensils class="size-4 text-muted-foreground" aria-hidden="true" />
              <h3 id="transaction-items-title" class="text-sm font-semibold">
                Item pesanan
              </h3>
            </div>
            <span class="text-xs text-muted-foreground">{{ props.transaction.itemCount }} item</span>
          </div>

          <ul v-if="hasItems" class="max-h-44 space-y-2 overflow-y-auto pr-1" aria-label="Item transaksi">
            <li
              v-for="item in transactionItems"
              :key="item.productId"
              class="rounded-md border bg-background p-2"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="truncate text-sm font-medium">{{ item.name }}</p>
                  <p class="mt-0.5 text-xs text-muted-foreground">
                    {{ item.quantity }} x <CashierCurrency :value="item.price" />
                  </p>
                </div>
                <p class="shrink-0 text-sm font-semibold">
                  <CashierCurrency :value="item.quantity * item.price" />
                </p>
              </div>
            </li>
          </ul>

          <p v-else class="rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
            Rincian item belum tersedia untuk transaksi ini.
          </p>
        </section>

        <section class="rounded-md border bg-card p-3" aria-labelledby="transaction-total-title">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <WalletCards class="size-4 text-muted-foreground" aria-hidden="true" />
              <h3 id="transaction-total-title" class="text-sm font-semibold">
                Total
              </h3>
            </div>
            <p class="text-base font-semibold">
              <CashierCurrency :value="props.transaction.total" />
            </p>
          </div>
        </section>

        <p
          v-if="!props.loading && receiptWarningMessage"
          class="flex items-start gap-2 rounded-md border border-warning/50 bg-warning/15 px-3 py-2 text-sm text-muted-foreground"
          aria-live="polite"
        >
          <AlertTriangle class="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
          <span>{{ receiptWarningMessage }}</span>
        </p>
      </div>

      <div v-else class="px-5 py-5">
        <p class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Data transaksi tidak tersedia.
        </p>
      </div>

      <DialogFooter class="grid grid-cols-1 gap-2 border-t px-5 py-4 sm:grid-cols-2 sm:justify-normal">
        <Button type="button" variant="outline" class="h-11 w-full" @click="dialogOpen = false">
          Tutup
        </Button>
        <Button
          type="button"
          class="h-11 w-full"
          :disabled="!canSendReceipt || isSendingReceipt"
          :title="canSendReceipt ? 'Kirim struk ke WhatsApp pelanggan' : 'Nomor WhatsApp belum diisi'"
          @click="sendReceipt"
        >
          <Spinner v-if="isSendingReceipt" class="size-4" />
          <Send v-else class="size-4" aria-hidden="true" />
          {{ isSendingReceipt ? 'Mengirim...' : 'Kirim Struk' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
