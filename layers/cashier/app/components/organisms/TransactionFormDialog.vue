<script setup lang="ts">
import type {
  CashierDiningOption,
  CashierPaymentMethod,
  CashierStatus,
  TransactionHistoryDraft,
  TransactionHistoryItem,
} from '../../types/cashier'
import { ReceiptText, Save } from 'lucide-vue-next'
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
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import { Spinner } from '#layers/base/app/components/ui/spinner'

interface TransactionFormState {
  paidAt: string
  paymentMethod: CashierPaymentMethod
  customerName: string
  customerPhone: string
  diningOption: CashierDiningOption
  itemCount: string
  total: string
  cashReceived: string
  cashChange: string
  status: CashierStatus
  statusLabel: string
}

const props = withDefaults(defineProps<{
  open: boolean
  mode?: 'create' | 'edit'
  transaction?: TransactionHistoryItem | null
  submitting?: boolean
}>(), {
  mode: 'create',
  transaction: null,
  submitting: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  submit: [payload: TransactionHistoryDraft]
}>()

const form = reactive<TransactionFormState>(createFormState())
const errorMessage = ref('')

const dialogOpen = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})
const dialogTitle = computed(() => props.mode === 'edit' ? 'Ubah Transaksi' : 'Tambah Transaksi')
const dialogDescription = computed(() => props.mode === 'edit'
  ? 'Ubah data transaksi untuk simulasi riwayat kasir.'
  : 'Tambahkan transaksi manual untuk simulasi riwayat kasir.',
)
const submitLabel = computed(() => props.mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Transaksi')

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    hydrateForm()
    return
  }

  errorMessage.value = ''
})

watch(() => props.transaction, () => {
  if (props.open) {
    hydrateForm()
  }
})

function hydrateForm() {
  Object.assign(form, createFormState(props.transaction))
  errorMessage.value = ''
}

function createFormState(transaction?: TransactionHistoryItem | null): TransactionFormState {
  const status = transaction?.status ?? 'success'

  return {
    paidAt: transaction?.paidAt ?? formatCurrentDateTime(),
    paymentMethod: getPaymentMethod(transaction?.paymentMethod),
    customerName: transaction?.customerName ?? 'Pelanggan Umum',
    customerPhone: transaction?.customerPhone === '-' ? '' : transaction?.customerPhone ?? '',
    diningOption: transaction?.diningOption ?? 'Makan di Tempat',
    itemCount: String(transaction?.itemCount ?? 1),
    total: String(transaction?.total ?? 0),
    cashReceived: transaction?.cashReceived === null || transaction?.cashReceived === undefined
      ? ''
      : String(transaction.cashReceived),
    cashChange: String(transaction?.cashChange ?? 0),
    status,
    statusLabel: transaction?.statusLabel ?? getStatusLabel(status),
  }
}

function handleStatusChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  form.status = getStatus(value)
  form.statusLabel = getStatusLabel(form.status)
}

function handleSubmit() {
  if (props.submitting) {
    return
  }

  errorMessage.value = ''
  const itemCount = Number(form.itemCount)
  const total = Number(form.total)
  const cashReceived = form.cashReceived.trim() ? Number(form.cashReceived) : null
  const cashChange = form.cashChange.trim() ? Number(form.cashChange) : 0

  if (!form.customerName.trim()) {
    errorMessage.value = 'Nama pelanggan wajib diisi.'
    return
  }

  if (!Number.isFinite(itemCount) || itemCount <= 0) {
    errorMessage.value = 'Jumlah item wajib lebih dari 0.'
    return
  }

  if (!Number.isFinite(total) || total <= 0) {
    errorMessage.value = 'Total transaksi wajib lebih dari 0.'
    return
  }

  if (cashReceived !== null && (!Number.isFinite(cashReceived) || cashReceived < 0)) {
    errorMessage.value = 'Uang diterima harus angka 0 atau lebih.'
    return
  }

  if (!Number.isFinite(cashChange) || cashChange < 0) {
    errorMessage.value = 'Kembalian harus angka 0 atau lebih.'
    return
  }

  emit('submit', {
    paidAt: form.paidAt.trim(),
    paymentMethod: form.paymentMethod,
    customerName: form.customerName.trim(),
    customerPhone: form.customerPhone.trim(),
    diningOption: form.diningOption,
    itemCount,
    total,
    cashReceived,
    cashChange,
    status: form.status,
    statusLabel: form.statusLabel.trim() || getStatusLabel(form.status),
  })
}

function getPaymentMethod(value?: string): CashierPaymentMethod {
  return value === 'QRIS' ? 'QRIS' : 'Tunai'
}

function getStatus(value: string): CashierStatus {
  if (value === 'warning' || value === 'info' || value === 'neutral') {
    return value
  }

  return 'success'
}

function getStatusLabel(status: CashierStatus) {
  if (status === 'warning') {
    return 'Refund parsial'
  }

  if (status === 'info') {
    return 'Sinkron'
  }

  if (status === 'neutral') {
    return 'Draft'
  }

  return 'Lunas'
}

function formatCurrentDateTime() {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-2xl">
      <DialogHeader>
        <div class="flex items-start gap-3">
          <span class="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ReceiptText class="size-5" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <DialogTitle>{{ dialogTitle }}</DialogTitle>
            <DialogDescription class="mt-1">
              {{ dialogDescription }}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form class="grid gap-4 sm:grid-cols-2" :aria-busy="props.submitting" @submit.prevent="handleSubmit">
        <p v-if="errorMessage" id="transaction-form-error" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive sm:col-span-2">
          {{ errorMessage }}
        </p>

        <div class="space-y-2">
          <Label for="transaction-paid-at">Waktu</Label>
          <Input id="transaction-paid-at" v-model="form.paidAt" :disabled="props.submitting" />
        </div>

        <div class="space-y-2">
          <Label for="transaction-payment-method">Metode pembayaran</Label>
          <NativeSelect id="transaction-payment-method" v-model="form.paymentMethod" class="w-full" :disabled="props.submitting">
            <option value="Tunai">Tunai</option>
            <option value="QRIS">QRIS</option>
          </NativeSelect>
        </div>

        <div class="space-y-2">
          <Label for="transaction-customer-name">Nama pelanggan</Label>
          <Input
            id="transaction-customer-name"
            v-model="form.customerName"
            :disabled="props.submitting"
            :aria-invalid="Boolean(errorMessage)"
            :aria-describedby="errorMessage ? 'transaction-form-error' : undefined"
          />
        </div>

        <div class="space-y-2">
          <Label for="transaction-customer-phone">WhatsApp</Label>
          <Input id="transaction-customer-phone" v-model="form.customerPhone" inputmode="tel" placeholder="08xx" :disabled="props.submitting" />
        </div>

        <div class="space-y-2">
          <Label for="transaction-dining-option">Tipe pesanan</Label>
          <NativeSelect id="transaction-dining-option" v-model="form.diningOption" class="w-full" :disabled="props.submitting">
            <option value="Makan di Tempat">Makan di Tempat</option>
            <option value="Bungkus">Bungkus</option>
          </NativeSelect>
        </div>

        <div class="space-y-2">
          <Label for="transaction-item-count">Jumlah item</Label>
          <Input
            id="transaction-item-count"
            v-model="form.itemCount"
            type="number"
            min="1"
            inputmode="numeric"
            :disabled="props.submitting"
            :aria-invalid="Boolean(errorMessage)"
            :aria-describedby="errorMessage ? 'transaction-form-error' : undefined"
          />
        </div>

        <div class="space-y-2">
          <Label for="transaction-total">Total</Label>
          <Input
            id="transaction-total"
            v-model="form.total"
            type="number"
            min="1"
            inputmode="numeric"
            :disabled="props.submitting"
            :aria-invalid="Boolean(errorMessage)"
            :aria-describedby="errorMessage ? 'transaction-form-error' : undefined"
          />
        </div>

        <div class="space-y-2">
          <Label for="transaction-status">Status</Label>
          <NativeSelect id="transaction-status" :model-value="form.status" class="w-full" :disabled="props.submitting" @change="handleStatusChange">
            <option value="success">Lunas</option>
            <option value="info">Sinkron</option>
            <option value="warning">Refund parsial</option>
            <option value="neutral">Draft</option>
          </NativeSelect>
        </div>

        <div class="space-y-2">
          <Label for="transaction-cash-received">Uang diterima</Label>
          <Input
            id="transaction-cash-received"
            v-model="form.cashReceived"
            type="number"
            min="0"
            inputmode="numeric"
            placeholder="Opsional"
            :disabled="props.submitting"
            :aria-invalid="Boolean(errorMessage)"
            :aria-describedby="errorMessage ? 'transaction-form-error' : undefined"
          />
        </div>

        <div class="space-y-2">
          <Label for="transaction-cash-change">Kembalian</Label>
          <Input
            id="transaction-cash-change"
            v-model="form.cashChange"
            type="number"
            min="0"
            inputmode="numeric"
            :disabled="props.submitting"
            :aria-invalid="Boolean(errorMessage)"
            :aria-describedby="errorMessage ? 'transaction-form-error' : undefined"
          />
        </div>

        <div class="space-y-2 sm:col-span-2">
          <Label for="transaction-status-label">Label status</Label>
          <Input id="transaction-status-label" v-model="form.statusLabel" :disabled="props.submitting" />
        </div>

        <DialogFooter class="sm:col-span-2">
          <Button type="button" variant="outline" :disabled="props.submitting" @click="dialogOpen = false">
            Batal
          </Button>
          <Button type="submit" :disabled="props.submitting">
            <Spinner v-if="props.submitting" class="size-4" />
            <Save v-else class="size-4" aria-hidden="true" />
            {{ props.submitting ? 'Menyimpan...' : submitLabel }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
