<script setup lang="ts">
import { AlertTriangle, Calculator, CheckCircle2, LogOut, ReceiptText, Scale, WalletCards } from 'lucide-vue-next'
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
import { Textarea } from '#layers/base/app/components/ui/textarea'
import CashierCurrency from '../atoms/CashierCurrency.vue'

interface CashierCloseShiftPayload {
  physicalCash: number
  notes?: string
}

const props = withDefaults(defineProps<{
  open: boolean
  openingCash: number
  salesTotal: number
  cashSalesTotal: number
  expectedCash: number
  submitting?: boolean
}>(), {
  submitting: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  submit: [payload: CashierCloseShiftPayload]
}>()

const physicalCash = ref<string | number>('')
const notes = ref('')
const errorMessage = ref('')

const dialogOpen = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})

const physicalCashText = computed(() => String(physicalCash.value).trim())
const notesText = computed(() => notes.value.trim())
const hasPhysicalCash = computed(() => physicalCashText.value.length > 0)
const normalizedPhysicalCash = computed(() => Number(physicalCashText.value))
const hasValidPhysicalCash = computed(() => hasPhysicalCash.value && Number.isFinite(normalizedPhysicalCash.value) && normalizedPhysicalCash.value >= 0)
const hasValidNotes = computed(() => notes.value.length <= 500)
const cashDifference = computed(() => {
  if (!hasValidPhysicalCash.value) {
    return 0
  }

  return normalizedPhysicalCash.value - props.expectedCash
})
const differenceLabel = computed(() => {
  if (!hasValidPhysicalCash.value) {
    return 'Masukkan uang fisik untuk menghitung selisih.'
  }

  if (cashDifference.value === 0) {
    return 'Kas fisik sesuai.'
  }

  return cashDifference.value > 0
    ? 'Kas fisik lebih.'
    : 'Kas fisik kurang.'
})
const differenceStateClass = computed(() => {
  if (!hasValidPhysicalCash.value) {
    return 'border-muted bg-muted/30 text-muted-foreground'
  }

  if (cashDifference.value === 0) {
    return 'border-success/40 bg-success/10 text-success'
  }

  if (cashDifference.value > 0) {
    return 'border-info/40 bg-info/10 text-info'
  }

  return 'border-destructive/40 bg-destructive/10 text-destructive'
})

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    physicalCash.value = ''
    notes.value = ''
    errorMessage.value = ''
  }
})

function applyExpectedCashRecommendation() {
  physicalCash.value = String(props.expectedCash)
  errorMessage.value = ''
}

function handleSubmit() {
  if (props.submitting) {
    return
  }

  errorMessage.value = ''

  if (!hasPhysicalCash.value) {
    errorMessage.value = 'Total uang fisik wajib diisi.'
    return
  }

  if (!Number.isFinite(normalizedPhysicalCash.value) || normalizedPhysicalCash.value < 0) {
    errorMessage.value = 'Total uang fisik tidak boleh kurang dari 0.'
    return
  }

  if (!hasValidNotes.value) {
    errorMessage.value = 'Catatan maksimal 500 karakter.'
    return
  }

  emit('submit', {
    physicalCash: normalizedPhysicalCash.value,
    ...(notesText.value ? { notes: notesText.value } : {}),
  })
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="gap-0 p-0 sm:max-w-xl">
      <DialogHeader class="border-b px-5 pt-5 pb-4">
        <div class="flex items-start gap-3">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive">
            <Scale class="size-5" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <DialogTitle>Tutup Shift</DialogTitle>
            <DialogDescription class="mt-1">
              Cocokkan kas sistem dengan uang fisik sebelum keluar.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form class="space-y-5 px-5 py-5" :aria-busy="props.submitting" @submit.prevent="handleSubmit">
        <div class="rounded-md border border-primary/20 bg-primary/10 p-4">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2 text-sm font-medium text-primary">
              <Calculator class="size-4" aria-hidden="true" />
              <span>Kas yang diharapkan</span>
            </div>
            <span class="rounded-md border border-primary/20 bg-background/80 px-2 py-1 text-xs font-medium text-primary">
              Wajib cocok
            </span>
          </div>
          <p class="mt-3 text-2xl font-semibold tracking-normal text-foreground">
            <CashierCurrency :value="props.expectedCash" />
          </p>
        </div>

        <dl class="grid gap-2 sm:grid-cols-3">
          <div class="rounded-md border bg-secondary/70 p-3">
            <dt class="flex items-center gap-2 text-xs font-medium text-secondary-foreground">
              <WalletCards class="size-4" aria-hidden="true" />
              Kas awal
            </dt>
            <dd class="mt-2 text-sm font-semibold text-foreground"><CashierCurrency :value="props.openingCash" /></dd>
          </div>

          <div class="rounded-md border border-success/30 bg-success/10 p-3">
            <dt class="flex items-center gap-2 text-xs font-medium text-success">
              <ReceiptText class="size-4" aria-hidden="true" />
              Total penjualan
            </dt>
            <dd class="mt-2 text-sm font-semibold text-foreground"><CashierCurrency :value="props.salesTotal" /></dd>
          </div>

          <div class="rounded-md border border-warning/40 bg-warning/10 p-3">
            <dt class="flex items-center gap-2 text-xs font-medium text-warning">
              <WalletCards class="size-4" aria-hidden="true" />
              Tunai
            </dt>
            <dd class="mt-2 text-sm font-semibold text-foreground"><CashierCurrency :value="props.cashSalesTotal" /></dd>
          </div>
        </dl>

        <p v-if="errorMessage" id="close-shift-error" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {{ errorMessage }}
        </p>

        <div class="space-y-2">
          <Label for="physical-cash">Total uang fisik</Label>
          <Input
            id="physical-cash"
            v-model="physicalCash"
            class="h-11 text-base font-medium"
            inputmode="numeric"
            min="0"
            type="number"
            placeholder="Contoh: 850000"
            :aria-invalid="errorMessage ? true : undefined"
            :aria-describedby="errorMessage ? 'close-shift-error close-shift-difference' : 'close-shift-difference'"
            :disabled="props.submitting"
          />
          <button
            type="button"
            class="flex w-full items-center justify-between gap-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-left transition-colors hover:bg-primary/10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            :disabled="props.submitting"
            @click="applyExpectedCashRecommendation"
          >
            <span class="min-w-0">
              <span class="block text-xs font-medium text-primary">Rekomendasi</span>
              <span class="block truncate text-xs text-muted-foreground">Isi sesuai kas yang diharapkan</span>
            </span>
            <span class="shrink-0 text-sm font-semibold text-foreground">
              <CashierCurrency :value="props.expectedCash" />
            </span>
          </button>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between gap-3">
            <Label for="close-shift-notes">Catatan</Label>
            <span :class="['text-xs', hasValidNotes ? 'text-muted-foreground' : 'text-destructive']">
              {{ notes.length }}/500
            </span>
          </div>
          <Textarea
            id="close-shift-notes"
            v-model="notes"
            class="min-h-20 resize-none"
            maxlength="500"
            placeholder="Opsional"
            :aria-invalid="!hasValidNotes ? true : undefined"
            :disabled="props.submitting"
          />
        </div>

        <div
          id="close-shift-difference"
          aria-live="polite"
          :class="['rounded-md border p-3 text-sm', differenceStateClass]"
        >
          <div class="flex items-center justify-between gap-3">
            <div class="flex min-w-0 items-center gap-3">
              <span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-background/70">
                <CheckCircle2 v-if="hasValidPhysicalCash && cashDifference === 0" class="size-4" aria-hidden="true" />
                <AlertTriangle v-else class="size-4" aria-hidden="true" />
              </span>
              <div class="min-w-0">
                <p class="font-medium">{{ differenceLabel }}</p>
                <p class="mt-0.5 text-xs opacity-90">Selisih kas</p>
              </div>
            </div>
            <strong class="shrink-0 text-base"><CashierCurrency :value="cashDifference" /></strong>
          </div>
        </div>

        <DialogFooter class="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 sm:justify-normal">
          <Button type="button" variant="outline" class="h-11 w-full" :disabled="props.submitting" @click="dialogOpen = false">
            Batal
          </Button>
          <Button type="submit" class="h-11 w-full bg-destructive text-white hover:bg-destructive/90" :disabled="props.submitting">
            <Spinner v-if="props.submitting" class="size-4" />
            <LogOut v-else class="size-4" aria-hidden="true" />
            {{ props.submitting ? 'Menutup Shift...' : 'Tutup Shift & Keluar' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
