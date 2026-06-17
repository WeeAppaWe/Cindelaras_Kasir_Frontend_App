<script setup lang="ts">
import type { CashAdjustmentItem } from '../../types/cashier'
import { ArrowDownToLine, ArrowUpFromLine, Banknote, CalendarClock, FileText, UserRound } from 'lucide-vue-next'
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
import CashierCurrency from '../atoms/CashierCurrency.vue'
import CashierStatusBadge from '../atoms/CashierStatusBadge.vue'

const props = defineProps<{
  open: boolean
  adjustment: CashAdjustmentItem | null
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const dialogOpen = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})

const isCashIn = computed(() => props.adjustment?.type === 'in')
const typeLabel = computed(() => (isCashIn.value ? 'Kas masuk' : 'Kas keluar'))
const typeBadgeClass = computed(() => (
  isCashIn.value
    ? 'border-success/40 bg-success/10 text-success'
    : 'border-destructive/40 bg-destructive/10 text-destructive'
))
const headerToneClass = computed(() => (
  isCashIn.value
    ? 'border-success/30 bg-success/10 text-success'
    : 'border-destructive/30 bg-destructive/10 text-destructive'
))
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent class="gap-0 p-0 sm:max-w-lg">
      <DialogHeader class="border-b px-5 pt-5 pb-4">
        <div class="flex items-start gap-3">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Banknote class="size-5" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <DialogTitle>Detail penyesuaian kas</DialogTitle>
            <DialogDescription class="mt-1">
              Lihat informasi mutasi kas manual pada shift.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div v-if="props.adjustment" class="space-y-4 px-5 py-5">
        <p
          v-if="props.loading"
          class="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground"
          aria-live="polite"
        >
          <Spinner class="size-4" />
          Memuat detail penyesuaian kas...
        </p>

        <div class="rounded-md border p-4" :class="headerToneClass">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="text-sm font-medium">{{ typeLabel }}</p>
              <p class="mt-1 truncate text-lg font-semibold">
                <CashierCurrency :value="props.adjustment.amount" />
              </p>
            </div>
            <span class="inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium" :class="typeBadgeClass">
              <ArrowDownToLine v-if="isCashIn" class="size-3.5" aria-hidden="true" />
              <ArrowUpFromLine v-else class="size-3.5" aria-hidden="true" />
              {{ typeLabel }}
            </span>
          </div>
        </div>

        <section class="rounded-md border bg-card p-3" aria-labelledby="adjustment-identity-title">
          <div class="mb-3 flex items-center gap-2">
            <FileText class="size-4 text-muted-foreground" aria-hidden="true" />
            <h3 id="adjustment-identity-title" class="text-sm font-semibold">
              Informasi penyesuaian
            </h3>
          </div>

          <dl class="grid gap-2 text-sm">
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Status</dt>
              <dd class="text-right">
                <CashierStatusBadge :status="props.adjustment.status">
                  {{ props.adjustment.statusLabel }}
                </CashierStatusBadge>
              </dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Nominal</dt>
              <dd class="text-right font-semibold">
                <CashierCurrency :value="props.adjustment.amount" />
              </dd>
            </div>
          </dl>
        </section>

        <section class="rounded-md border bg-card p-3" aria-labelledby="adjustment-meta-title">
          <div class="mb-3 flex items-center gap-2">
            <CalendarClock class="size-4 text-muted-foreground" aria-hidden="true" />
            <h3 id="adjustment-meta-title" class="text-sm font-semibold">
              Catatan shift
            </h3>
          </div>

          <dl class="grid gap-2 text-sm">
            <div class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Waktu</dt>
              <dd class="text-right font-medium">{{ props.adjustment.createdAt }}</dd>
            </div>
            <div v-if="props.adjustment.shiftStartedAt" class="flex justify-between gap-3">
              <dt class="text-muted-foreground">Shift dibuka</dt>
              <dd class="text-right font-medium">{{ props.adjustment.shiftStartedAt }}</dd>
            </div>
          </dl>
        </section>

        <section class="rounded-md border bg-card p-3" aria-labelledby="adjustment-reason-title">
          <div class="mb-3 flex items-center gap-2">
            <UserRound class="size-4 text-muted-foreground" aria-hidden="true" />
            <h3 id="adjustment-reason-title" class="text-sm font-semibold">
              Catatan
            </h3>
          </div>
          <p class="whitespace-pre-wrap text-sm leading-6 text-card-foreground">
            {{ props.adjustment.reason }}
          </p>
        </section>
      </div>

      <div v-else class="px-5 py-5">
        <p class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Data penyesuaian kas tidak tersedia.
        </p>
      </div>

      <DialogFooter class="border-t px-5 py-4">
        <Button type="button" class="h-10 w-full sm:w-auto" @click="dialogOpen = false">
          Tutup
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
