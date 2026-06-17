<script setup lang="ts">
import type { CashierCartItem, CashierDiningOption, CashierPaymentMethod, CashierPaymentResult } from '../../types/cashier'
import { AlertTriangle, Banknote, CheckCircle2, CreditCard, QrCode, ReceiptText } from 'lucide-vue-next'
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
import { Label } from '#layers/base/app/components/ui/label'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import CashierCurrency from '../atoms/CashierCurrency.vue'

const props = withDefaults(defineProps<{
  open: boolean
  paymentMethod: CashierPaymentMethod
  items: CashierCartItem[]
  total: number
  itemCount: number
  customerName: string
  diningOption: CashierDiningOption
  submitting?: boolean
}>(), {
  submitting: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'update:paymentMethod': [value: CashierPaymentMethod]
  submit: [result: CashierPaymentResult]
}>()

const paymentMethods: CashierPaymentMethod[] = ['Tunai', 'QRIS']
const cashReceived = ref<string | number>('')
const errorMessage = ref('')
const qrisConfirmed = ref(false)

const dialogOpen = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})

const isCashPayment = computed(() => props.paymentMethod === 'Tunai')
const cashReceivedText = computed(() => String(cashReceived.value).trim())
const hasCashReceived = computed(() => cashReceivedText.value.length > 0)
const normalizedCashReceived = computed(() => Number(cashReceivedText.value))
const hasValidCashReceived = computed(() => (
  hasCashReceived.value
  && Number.isFinite(normalizedCashReceived.value)
  && normalizedCashReceived.value >= 0
))
const cashChange = computed(() => {
  if (!hasValidCashReceived.value) {
    return 0
  }

  return normalizedCashReceived.value - props.total
})
const canCompletePayment = computed(() => {
  if (props.itemCount <= 0) {
    return false
  }

  if (isCashPayment.value) {
    return hasValidCashReceived.value && cashChange.value >= 0
  }

  return qrisConfirmed.value === true
})
const changeStateClass = computed(() => {
  if (!hasCashReceived.value) {
    return 'border-muted bg-muted/30 text-muted-foreground'
  }

  if (!hasValidCashReceived.value || cashChange.value < 0) {
    return 'border-destructive/40 bg-destructive/10 text-destructive'
  }

  return 'border-success/40 bg-success/10 text-success'
})
const changeLabel = computed(() => {
  if (!hasCashReceived.value) {
    return 'Masukkan uang diterima untuk menghitung kembalian.'
  }

  if (!hasValidCashReceived.value) {
    return 'Nominal uang diterima tidak valid.'
  }

  if (cashChange.value < 0) {
    return 'Uang diterima masih kurang.'
  }

  if (cashChange.value === 0) {
    return 'Uang diterima pas.'
  }

  return 'Kembalian pelanggan.'
})
const cashRecommendations = computed(() => {
  const roundUp = (value: number, step: number) => Math.ceil(value / step) * step
  const candidates = [
    props.total,
    roundUp(props.total, 5000),
    roundUp(props.total, 10000),
    roundUp(props.total, 50000),
    roundUp(props.total, 100000),
  ]

  return [...new Set(candidates)]
    .filter(value => value >= props.total)
    .slice(0, 4)
})

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    cashReceived.value = ''
    errorMessage.value = ''
    qrisConfirmed.value = false
  }
})

watch(() => props.paymentMethod, () => {
  cashReceived.value = ''
  errorMessage.value = ''
  qrisConfirmed.value = false
})

function applyCashRecommendation(value: number) {
  cashReceived.value = String(value)
  errorMessage.value = ''
}

function selectPaymentMethod(method: CashierPaymentMethod) {
  emit('update:paymentMethod', method)
  cashReceived.value = ''
  errorMessage.value = ''
  qrisConfirmed.value = false
}

function handleSubmit() {
  if (props.submitting) {
    return
  }

  errorMessage.value = ''

  if (props.itemCount <= 0) {
    errorMessage.value = 'Keranjang kosong.'
    return
  }

  if (isCashPayment.value) {
    if (!hasCashReceived.value) {
      errorMessage.value = 'Nominal tunai yang diterima wajib diisi.'
      return
    }

    if (!hasValidCashReceived.value) {
      errorMessage.value = 'Nominal tunai tidak valid.'
      return
    }

    if (cashChange.value < 0) {
      errorMessage.value = 'Nominal tunai belum mencukupi total pesanan.'
      return
    }
  }
  else if (!canCompletePayment.value) {
    errorMessage.value = 'Konfirmasi pembayaran QRIS wajib dicentang.'
    return
  }

  emit('submit', {
    cashReceived: isCashPayment.value ? normalizedCashReceived.value : null,
    cashChange: isCashPayment.value ? cashChange.value : 0,
  })
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="gap-0 p-0 sm:max-w-lg">
      <DialogHeader class="border-b px-5 pt-5 pb-4">
        <div class="flex items-start gap-3">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Banknote v-if="isCashPayment" class="size-5" aria-hidden="true" />
            <QrCode v-else class="size-5" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <DialogTitle>
              {{ isCashPayment ? 'Pembayaran Tunai' : 'Konfirmasi QRIS Statis' }}
            </DialogTitle>
            <DialogDescription class="mt-1">
              {{ isCashPayment ? 'Masukkan uang tunai yang diterima dari pelanggan.' : 'Pastikan pembayaran QRIS statis sudah diterima sebelum transaksi disimpan.' }}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form class="space-y-4 px-5 py-5" :aria-busy="props.submitting" @submit.prevent="handleSubmit">
        <p v-if="errorMessage" id="payment-error" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {{ errorMessage }}
        </p>

        <div class="rounded-md border border-primary/20 bg-primary/10 p-4">
          <div class="flex items-center justify-between gap-3">
            <div class="flex min-w-0 items-center gap-2 text-sm font-medium text-primary">
              <ReceiptText class="size-4 shrink-0" aria-hidden="true" />
              <span class="truncate">{{ props.itemCount }} item untuk {{ props.customerName }}</span>
            </div>
            <span class="shrink-0 rounded-md border border-primary/20 bg-background/80 px-2 py-1 text-xs font-medium text-primary">
              {{ props.paymentMethod }}
            </span>
          </div>
          <dl class="mt-3 grid gap-2 text-sm">
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Tipe pesanan</dt>
              <dd class="font-medium">{{ props.diningOption }}</dd>
            </div>
            <div class="flex justify-between gap-3 text-lg">
              <dt class="font-semibold">Total</dt>
              <dd class="font-semibold"><CashierCurrency :value="props.total" /></dd>
            </div>
          </dl>
        </div>

        <section class="rounded-md border bg-card p-3" aria-labelledby="payment-items-title">
          <div class="mb-2 flex items-center justify-between gap-3">
            <h3 id="payment-items-title" class="text-sm font-semibold tracking-normal">
              Detail pesanan
            </h3>
            <span class="text-xs text-muted-foreground">{{ props.itemCount }} item</span>
          </div>

          <ul class="max-h-40 space-y-2 overflow-y-auto pr-1" aria-label="Item yang dipesan">
            <li
              v-for="item in props.items"
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

        <section class="space-y-2" aria-labelledby="payment-method-title">
          <h3 id="payment-method-title" class="text-sm font-medium">
            Metode pembayaran
          </h3>
          <div class="grid grid-cols-2 gap-2" role="radiogroup" aria-labelledby="payment-method-title">
            <button
              v-for="method in paymentMethods"
              :key="method"
              type="button"
              role="radio"
              class="inline-flex h-10 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              :class="props.paymentMethod === method ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-background hover:bg-accent hover:text-accent-foreground'"
              :aria-checked="props.paymentMethod === method"
              :disabled="props.submitting"
              @click="selectPaymentMethod(method)"
            >
              <Banknote v-if="method === 'Tunai'" class="size-4" aria-hidden="true" />
              <QrCode v-else class="size-4" aria-hidden="true" />
              {{ method }}
            </button>
          </div>
        </section>

        <template v-if="isCashPayment">
          <div class="space-y-2">
            <Label for="cash-received">Uang diterima</Label>
            <Input
              id="cash-received"
              v-model="cashReceived"
              class="h-11 text-base font-medium"
              inputmode="numeric"
              min="0"
              type="number"
              placeholder="Contoh: 50000"
              required
              :aria-invalid="errorMessage ? true : undefined"
              :aria-describedby="errorMessage ? 'payment-error cash-change' : 'cash-change'"
              :disabled="props.submitting"
            />

            <div class="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Rekomendasi uang diterima">
              <button
                v-for="recommendation in cashRecommendations"
                :key="recommendation"
                type="button"
                class="inline-flex h-9 min-w-0 items-center justify-center rounded-md border bg-background px-2 text-xs font-medium transition-colors hover:bg-accent focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                :disabled="props.submitting"
                @click="applyCashRecommendation(recommendation)"
              >
                <span class="truncate"><CashierCurrency :value="recommendation" /></span>
              </button>
            </div>
          </div>

          <div
            id="cash-change"
            aria-live="polite"
            :class="['rounded-md border p-3 text-sm', changeStateClass]"
          >
            <div class="flex items-center justify-between gap-3">
              <div class="flex min-w-0 items-center gap-3">
                <span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-background/70">
                  <CheckCircle2 v-if="hasValidCashReceived && cashChange >= 0" class="size-4" aria-hidden="true" />
                  <AlertTriangle v-else class="size-4" aria-hidden="true" />
                </span>
                <div class="min-w-0">
                  <p class="font-medium">{{ changeLabel }}</p>
                  <p class="mt-0.5 text-xs opacity-90">Kembalian</p>
                </div>
              </div>
              <strong class="shrink-0 text-base"><CashierCurrency :value="cashChange" /></strong>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="rounded-md border border-info/30 bg-info/10 p-4">
            <div class="flex items-start gap-3">
              <span class="flex size-10 shrink-0 items-center justify-center rounded-md bg-background/70 text-info">
                <QrCode class="size-5" aria-hidden="true" />
              </span>
              <div class="min-w-0">
                <p class="text-sm font-medium text-info">QRIS statis restoran</p>
                <p class="mt-1 text-sm text-muted-foreground">
                  Sistem tidak membuat QRIS baru. Minta pelanggan membayar ke QRIS statis restoran, lalu konfirmasi setelah pembayaran diterima.
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-start gap-3 rounded-md border bg-background p-3">
            <input
              id="qris-confirmed"
              v-model="qrisConfirmed"
              type="checkbox"
              class="mt-0.5 size-4 shrink-0 accent-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              :aria-invalid="errorMessage ? true : undefined"
              :aria-describedby="errorMessage ? 'payment-error' : undefined"
              :disabled="props.submitting"
              @change="errorMessage = ''"
            />
            <Label for="qris-confirmed" class="grid gap-1 leading-normal">
              <span>Pembayaran QRIS sudah diterima</span>
              <span class="text-xs font-normal text-muted-foreground">Centang setelah saldo/pembayaran sudah dipastikan masuk.</span>
            </Label>
          </div>
        </template>

        <DialogFooter class="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 sm:justify-normal">
          <Button type="button" variant="outline" class="h-11 w-full" :disabled="props.submitting" @click="dialogOpen = false">
            Batal
          </Button>
          <Button type="submit" class="h-11 w-full" :disabled="!canCompletePayment || props.submitting">
            <Spinner v-if="props.submitting" class="size-4" />
            <CreditCard v-else class="size-4" aria-hidden="true" />
            {{ props.submitting ? 'Memproses...' : 'Selesaikan Pembayaran' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
