<script setup lang="ts">
import { Banknote } from 'lucide-vue-next'
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

const props = defineProps<{
  open: boolean
}>()

const { openShift } = useCashierStore()

const openingCash = ref<string | number>('')
const errorMessage = ref('')
const isSubmitting = ref(false)
const isDialogVisible = ref(props.open)
const { runCashierAction } = useCashierActionFeedback()
const openingCashText = computed(() => String(openingCash.value).trim())
const normalizedOpeningCash = computed(() => Number(openingCashText.value))
const canStartShift = computed(() => (
  openingCashText.value.length > 0
  && Number.isFinite(normalizedOpeningCash.value)
  && normalizedOpeningCash.value >= 0
))

watch(() => props.open, (isOpen) => {
  isDialogVisible.value = isOpen

  if (isOpen) {
    openingCash.value = ''
    errorMessage.value = ''
    isSubmitting.value = false
  }
})

async function handleSubmit() {
  if (isSubmitting.value) {
    return
  }

  errorMessage.value = ''

  if (!openingCashText.value) {
    errorMessage.value = 'Total kas awal wajib diisi.'
    return
  }

  if (!Number.isFinite(normalizedOpeningCash.value) || normalizedOpeningCash.value < 0) {
    errorMessage.value = 'Total kas awal tidak boleh kurang dari 0.'
    return
  }

  const shift = await runCashierAction(async () => {
    await nextTick()
    const openedShift = await openShift(normalizedOpeningCash.value)

    if (!openedShift) {
      throw new Error('Shift gagal dibuka.')
    }

    return openedShift
  }, {
    loading: isSubmitting,
    successMessage: 'Shift dibuka',
    successDescription: shift => `${shift.id} siap menerima transaksi.`,
    errorMessage: 'Shift gagal dibuka.',
  })

  if (shift) {
    isDialogVisible.value = false
  }
}
</script>

<template>
  <Dialog v-if="isDialogVisible" :open="true">
    <DialogContent
      class="gap-5 p-0 sm:max-w-md"
      :show-close-button="false"
      @escape-key-down.prevent
      @interact-outside.prevent
      @pointer-down-outside.prevent
    >
      <DialogHeader class="border-b px-5 pt-5 pb-4">
        <div class="flex items-start gap-3">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Banknote class="size-5" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <DialogTitle>Buka Shift</DialogTitle>
            <DialogDescription class="mt-1">
              Masukkan total uang kas awal sebelum menerima transaksi.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <form class="space-y-5 px-5 pb-5" @submit.prevent="handleSubmit">
        <p v-if="errorMessage" id="open-shift-error" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {{ errorMessage }}
        </p>

        <div class="space-y-2">
          <Label for="opening-cash">Total kas awal</Label>
          <Input
            id="opening-cash"
            v-model="openingCash"
            autofocus
            class="h-11 text-base font-medium"
            inputmode="numeric"
            min="0"
            type="number"
            placeholder="Contoh: 500000"
            required
            :aria-invalid="errorMessage ? true : undefined"
            :aria-describedby="errorMessage ? 'open-shift-error' : undefined"
            :disabled="isSubmitting"
          />
        </div>

        <DialogFooter class="pt-1 sm:justify-center">
          <button
            type="submit"
            class="inline-flex h-11 w-full max-w-72 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground outline-none transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 sm:w-72 [&_svg]:pointer-events-none [&_svg]:shrink-0"
            :disabled="!canStartShift || isSubmitting"
          >
            <Spinner v-if="isSubmitting" class="size-4" />
            {{ isSubmitting ? 'Membuka Shift...' : 'Mulai Shift' }}
          </button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
