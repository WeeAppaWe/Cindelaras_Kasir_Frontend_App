<script setup lang="ts">
import type { CashAdjustmentItem } from '../../types/cashier'
import { Eye } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { Skeleton } from '#layers/base/app/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from '#layers/base/app/components/ui/table'
import CashierCurrency from '../atoms/CashierCurrency.vue'
import CashierStatusBadge from '../atoms/CashierStatusBadge.vue'

const props = withDefaults(defineProps<{
  items: CashAdjustmentItem[]
  loading?: boolean
  loadingRowCount?: number
}>(), {
  loading: false,
  loadingRowCount: 6,
})

const emit = defineEmits<{
  viewDetail: [item: CashAdjustmentItem]
}>()
</script>

<template>
  <Table :aria-busy="props.loading">
    <TableCaption class="sr-only">
      Tabel penyesuaian kas.
    </TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead scope="col">Tanggal</TableHead>
        <TableHead scope="col">Tipe</TableHead>
        <TableHead scope="col">Catatan</TableHead>
        <TableHead scope="col">Shift</TableHead>
        <TableHead scope="col" class="text-right">Nominal</TableHead>
        <TableHead scope="col">Status</TableHead>
        <TableHead scope="col" class="text-right">Aksi</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="props.loading">
        <TableRow v-for="index in props.loadingRowCount" :key="`adjustment-loading-${index}`">
          <TableCell><Skeleton class="h-4 w-36" /></TableCell>
          <TableCell><Skeleton class="h-6 w-16" /></TableCell>
          <TableCell><Skeleton class="h-4 w-48 max-w-full" /></TableCell>
          <TableCell><Skeleton class="h-4 w-24" /></TableCell>
          <TableCell class="text-right"><Skeleton class="ml-auto h-4 w-24" /></TableCell>
          <TableCell><Skeleton class="h-6 w-20" /></TableCell>
          <TableCell class="text-right"><Skeleton class="ml-auto h-8 w-24" /></TableCell>
        </TableRow>
      </template>

      <template v-else>
        <TableRow v-for="item in props.items" :key="item.id">
          <TableCell>{{ item.createdAt }}</TableCell>
          <TableCell>
            <CashierStatusBadge :status="item.type === 'in' ? 'success' : 'warning'">
              {{ item.type === 'in' ? 'Masuk' : 'Keluar' }}
            </CashierStatusBadge>
          </TableCell>
          <TableCell class="max-w-70 truncate">{{ item.reason }}</TableCell>
          <TableCell>{{ item.shiftStartedAt || '-' }}</TableCell>
          <TableCell class="text-right font-medium">
            <CashierCurrency :value="item.amount" />
          </TableCell>
          <TableCell>
            <CashierStatusBadge :status="item.status">
              {{ item.statusLabel }}
            </CashierStatusBadge>
          </TableCell>
          <TableCell class="text-right">
            <div class="flex flex-wrap items-center justify-end gap-1.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                class="text-primary hover:bg-primary/10 hover:text-primary"
                :aria-label="`Lihat detail penyesuaian ${item.createdAt}`"
                :title="`Lihat detail penyesuaian ${item.createdAt}`"
                @click="emit('viewDetail', item)"
              >
                <Eye class="size-4" aria-hidden="true" />
                Detail
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </template>
      <TableEmpty v-if="!props.loading && !props.items.length" :colspan="7">
        Tidak ada penyesuaian kas.
      </TableEmpty>
    </TableBody>
  </Table>
</template>
