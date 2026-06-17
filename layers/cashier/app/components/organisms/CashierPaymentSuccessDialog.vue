<script setup lang="ts">
import type { CashierReceiptPreview } from '../../types/cashier'
import { AlertTriangle, CheckCircle2, ReceiptText, RotateCcw, Send } from 'lucide-vue-next'
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
import { getCashierReceiptDisplayCode } from '../../utils/cashier-display'
import CashierCurrency from '../atoms/CashierCurrency.vue'

const props = defineProps<{
  open: boolean
  receipt: CashierReceiptPreview | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isSendingReceipt = ref(false)
const { runCashierAction } = useCashierActionFeedback()
const { sendReceiptToCustomer } = useCashierStore()

const dialogOpen = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})

const receiptPhone = computed(() => {
  const phone = props.receipt?.customerPhone.trim() ?? ''

  if (!phone || phone === '-') {
    return ''
  }

  return phone
})

const canSendReceipt = computed(() => Boolean(props.receipt && receiptPhone.value))
const receiptDisplayCode = computed(() => props.receipt ? getCashierReceiptDisplayCode(props.receipt) : '-')
const successDescription = computed(() => {
  if (!props.receipt) {
    return 'Data struk belum tersedia.'
  }

  if (canSendReceipt.value) {
    return 'Transaksi sudah tersimpan dan struk siap dikirim lewat WhatsApp.'
  }

  return 'Transaksi sudah tersimpan. Nomor WhatsApp tidak diisi di detail transaksi.'
})

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    isSendingReceipt.value = false
  }
})

async function sendReceipt() {
  const receipt = props.receipt

  await runCashierAction(async () => {
    if (!receipt) {
      throw new Error('Data struk belum tersedia.')
    }

    if (!receiptPhone.value) {
      throw new Error('Nomor WhatsApp pelanggan tidak diisi.')
    }

    return await sendReceiptToCustomer(receipt)
  }, {
    loading: isSendingReceipt,
    successMessage: 'Struk dikirim ke WhatsApp',
    successDescription: result => result.message,
    errorMessage: 'Struk gagal dikirim.',
  })
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="gap-0 p-0 sm:max-w-lg">
      <DialogHeader class="border-b px-5 pt-5 pb-4">
        <div class="flex items-start gap-3">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-md bg-success/10 text-success">
            <CheckCircle2 class="size-5" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <DialogTitle>Pembayaran berhasil</DialogTitle>
            <DialogDescription class="mt-1">
              {{ successDescription }}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div v-if="props.receipt" class="space-y-4 px-5 py-5">
        <div class="rounded-md border border-success/30 bg-success/10 p-4">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <p class="text-sm font-medium text-success">Transaksi lunas</p>
              <p class="mt-1 truncate text-lg font-semibold">{{ receiptDisplayCode }}</p>
            </div>
            <span class="shrink-0 rounded-md border border-success/30 bg-background/80 px-2 py-1 text-xs font-medium text-success">
              {{ props.receipt.paymentMethod }}
            </span>
          </div>
        </div>

        <section class="rounded-md border bg-card p-3" aria-labelledby="receipt-summary-title">
          <div class="mb-3 flex items-center gap-2">
            <ReceiptText class="size-4 text-muted-foreground" aria-hidden="true" />
            <h3 id="receipt-summary-title" class="text-sm font-semibold">
              Ringkasan struk
            </h3>
          </div>

          <dl class="grid gap-2 text-sm">
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Waktu</dt>
              <dd class="text-right font-medium">{{ props.receipt.paidAt }}</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Pelanggan</dt>
              <dd class="text-right font-medium">{{ props.receipt.customerName }}</dd>
            </div>
            <div v-if="props.receipt.customerPhone !== '-'" class="flex justify-between gap-3">
              <dt class="text-muted-foreground">WhatsApp</dt>
              <dd class="text-right font-medium">{{ props.receipt.customerPhone }}</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Tipe pesanan</dt>
              <dd class="text-right font-medium">{{ props.receipt.diningOption }}</dd>
            </div>
          </dl>
        </section>

        <section class="rounded-md border bg-card p-3" aria-labelledby="receipt-items-title">
          <div class="mb-2 flex items-center justify-between gap-3">
            <h3 id="receipt-items-title" class="text-sm font-semibold">
              Item pesanan
            </h3>
            <span class="text-xs text-muted-foreground">{{ props.receipt.itemCount }} item</span>
          </div>

          <ul class="max-h-44 space-y-2 overflow-y-auto pr-1" aria-label="Item yang dibayar">
            <li
              v-for="item in props.receipt.items"
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
        </section>

        <section class="rounded-md border bg-card p-3" aria-labelledby="receipt-total-title">
          <h3 id="receipt-total-title" class="sr-only">
            Ringkasan pembayaran
          </h3>
          <dl class="grid gap-2 text-sm">
            <div class="flex justify-between gap-3 text-base">
              <dt class="font-semibold">Total</dt>
              <dd class="font-semibold"><CashierCurrency :value="props.receipt.total" /></dd>
            </div>
            <template v-if="props.receipt.cashReceived !== null">
              <div class="flex justify-between gap-3">
                <dt class="text-muted-foreground">Uang diterima</dt>
                <dd class="font-medium"><CashierCurrency :value="props.receipt.cashReceived" /></dd>
              </div>
              <div class="flex justify-between gap-3">
                <dt class="text-muted-foreground">Kembalian</dt>
                <dd class="font-medium"><CashierCurrency :value="props.receipt.cashChange" /></dd>
              </div>
            </template>
          </dl>
        </section>

        <p
          v-if="props.receipt && !canSendReceipt"
          class="flex items-start gap-2 rounded-md border border-warning/50 bg-warning/15 px-3 py-2 text-sm text-muted-foreground"
          aria-live="polite"
        >
          <AlertTriangle class="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
          <span>Nomor WhatsApp tidak diisi di awal transaksi, jadi struk tidak bisa dikirim.</span>
        </p>
      </div>

      <div v-else class="px-5 py-5">
        <p class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Data struk tidak tersedia.
        </p>
      </div>

      <DialogFooter class="grid grid-cols-1 gap-2 border-t px-5 py-4 sm:grid-cols-2 sm:justify-normal">
        <Button type="button" variant="outline" class="h-11 w-full" @click="dialogOpen = false">
          <RotateCcw class="size-4" aria-hidden="true" />
          Transaksi Baru
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
