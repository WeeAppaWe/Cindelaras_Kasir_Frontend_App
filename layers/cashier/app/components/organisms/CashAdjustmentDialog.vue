<script setup lang="ts">
import type { CashAdjustmentDraft, CashAdjustmentItem } from '../../types/cashier'
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

const props = withDefaults(defineProps<{
  open: boolean
  mode?: 'create' | 'edit'
  adjustment?: CashAdjustmentItem | null
  submitting?: boolean
}>(), {
  mode: 'create',
  adjustment: null,
  submitting: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  submit: [payload: CashAdjustmentDraft]
}>()

const adjustmentType = ref<CashAdjustmentDraft['type']>('in')
const amount = ref('')
const reason = ref('')
const errorMessage = ref('')

const dialogOpen = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})
const dialogTitle = computed(() => props.mode === 'edit' ? 'Ubah Penyesuaian Kas' : 'Tambah Penyesuaian Kas')
const dialogDescription = computed(() => props.mode === 'edit'
  ? 'Ubah kas masuk atau keluar untuk simulasi shift berjalan.'
  : 'Catat kas masuk atau keluar untuk shift berjalan.',
)
const submitLabel = computed(() => props.mode === 'edit' ? 'Simpan Perubahan' : 'Simpan')

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    hydrateForm()
    return
  }

  resetForm()
})

watch(() => props.adjustment, () => {
  if (props.open) {
    hydrateForm()
  }
})

function hydrateForm() {
  adjustmentType.value = props.adjustment?.type ?? 'in'
  amount.value = props.adjustment ? String(props.adjustment.amount) : ''
  reason.value = props.adjustment?.reason ?? ''
  errorMessage.value = ''
}

function resetForm() {
  adjustmentType.value = 'in'
  amount.value = ''
  reason.value = ''
  errorMessage.value = ''
}

function handleSubmit() {
  if (props.submitting) {
    return
  }

  errorMessage.value = ''
  const normalizedAmount = Number(amount.value)

  if (reason.value.trim().length > 255) {
    errorMessage.value = 'Catatan maksimal 255 karakter.'
    return
  }

  if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
    errorMessage.value = 'Nominal wajib lebih dari 0.'
    return
  }

  emit('submit', {
    type: adjustmentType.value,
    reason: reason.value.trim(),
    amount: normalizedAmount,
  })
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{{ dialogTitle }}</DialogTitle>
        <DialogDescription>
          {{ dialogDescription }}
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-4" :aria-busy="props.submitting" @submit.prevent="handleSubmit">
        <p v-if="errorMessage" id="cash-adjustment-error" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {{ errorMessage }}
        </p>

        <div class="space-y-2">
          <Label id="cash-adjustment-type-label">Tipe</Label>
          <div class="grid grid-cols-2 gap-2" role="radiogroup" aria-labelledby="cash-adjustment-type-label">
            <button
              type="button"
              role="radio"
              class="inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              :class="adjustmentType === 'in' ? 'border-success bg-success text-success-foreground hover:bg-success/90' : 'border-success/40 bg-success/10 text-success hover:bg-success/15'"
              :aria-checked="adjustmentType === 'in'"
              :disabled="props.submitting"
              @click="adjustmentType = 'in'"
            >
              Kas masuk
            </button>
            <button
              type="button"
              role="radio"
              class="inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              :class="adjustmentType === 'out' ? 'border-destructive bg-destructive text-white hover:bg-destructive/90' : 'border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/15'"
              :aria-checked="adjustmentType === 'out'"
              :disabled="props.submitting"
              @click="adjustmentType = 'out'"
            >
              Kas keluar
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="cash-adjustment-amount">Nominal</Label>
          <Input
            id="cash-adjustment-amount"
            v-model="amount"
            inputmode="numeric"
            type="number"
            min="1"
            placeholder="Contoh: 50000"
            :aria-invalid="Boolean(errorMessage)"
            :aria-describedby="errorMessage ? 'cash-adjustment-error' : undefined"
            :disabled="props.submitting"
          />
        </div>

        <div class="space-y-2">
          <Label for="cash-adjustment-reason">Catatan</Label>
          <Textarea
            id="cash-adjustment-reason"
            v-model="reason"
            rows="3"
            maxlength="255"
            placeholder="Opsional, tulis catatan penyesuaian kas"
            :aria-invalid="Boolean(errorMessage)"
            :aria-describedby="errorMessage ? 'cash-adjustment-error' : undefined"
            :disabled="props.submitting"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" :disabled="props.submitting" @click="dialogOpen = false">
            Batal
          </Button>
          <Button type="submit" :disabled="props.submitting">
            <Spinner v-if="props.submitting" class="size-4" />
            {{ props.submitting ? 'Menyimpan...' : submitLabel }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
