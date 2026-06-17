<script setup lang="ts">
import type { TransactionHistoryItem } from '../../types/cashier'
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
import { getCashierTransactionDisplayCode } from '../../utils/cashier-display'
import CashierCurrency from '../atoms/CashierCurrency.vue'
import CashierStatusBadge from '../atoms/CashierStatusBadge.vue'

const props = withDefaults(defineProps<{
  items: TransactionHistoryItem[]
  loading?: boolean
  loadingRowCount?: number
}>(), {
  loading: false,
  loadingRowCount: 6,
})

const emit = defineEmits<{
  viewDetail: [item: TransactionHistoryItem]
}>()
</script>

<template>
  <Table :aria-busy="props.loading">
    <TableCaption class="sr-only">
      Riwayat transaksi kasir.
    </TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead scope="col">Kode</TableHead>
        <TableHead scope="col">Waktu</TableHead>
        <TableHead scope="col">Kasir</TableHead>
        <TableHead scope="col">Pelanggan</TableHead>
        <TableHead scope="col">Metode</TableHead>
        <TableHead scope="col">Tipe</TableHead>
        <TableHead scope="col" class="text-right">Item</TableHead>
        <TableHead scope="col" class="text-right">Total</TableHead>
        <TableHead scope="col">Status</TableHead>
        <TableHead scope="col" class="text-right">Aksi</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="props.loading">
        <TableRow v-for="index in props.loadingRowCount" :key="`transaction-loading-${index}`">
          <TableCell><Skeleton class="h-4 w-32" /></TableCell>
          <TableCell><Skeleton class="h-4 w-36" /></TableCell>
          <TableCell><Skeleton class="h-4 w-24" /></TableCell>
          <TableCell><Skeleton class="h-4 w-28" /></TableCell>
          <TableCell><Skeleton class="h-4 w-16" /></TableCell>
          <TableCell><Skeleton class="h-4 w-20" /></TableCell>
          <TableCell class="text-right"><Skeleton class="ml-auto h-4 w-8" /></TableCell>
          <TableCell class="text-right"><Skeleton class="ml-auto h-4 w-24" /></TableCell>
          <TableCell><Skeleton class="h-6 w-20" /></TableCell>
          <TableCell class="text-right"><Skeleton class="ml-auto h-8 w-24" /></TableCell>
        </TableRow>
      </template>

      <template v-else>
        <TableRow v-for="item in props.items" :key="item.id">
          <TableCell class="font-medium">{{ getCashierTransactionDisplayCode(item) }}</TableCell>
          <TableCell>{{ item.paidAt }}</TableCell>
          <TableCell>{{ item.cashierName }}</TableCell>
          <TableCell>{{ item.customerName }}</TableCell>
          <TableCell>{{ item.paymentMethod }}</TableCell>
          <TableCell>{{ item.diningOption ?? '-' }}</TableCell>
          <TableCell class="text-right">{{ item.itemCount }}</TableCell>
          <TableCell class="text-right font-medium">
            <CashierCurrency :value="item.total" />
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
                :aria-label="`Lihat detail transaksi ${getCashierTransactionDisplayCode(item)}`"
                :title="`Lihat detail transaksi ${getCashierTransactionDisplayCode(item)}`"
                @click="emit('viewDetail', item)"
              >
                <Eye class="size-4" aria-hidden="true" />
                Detail
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </template>
      <TableEmpty v-if="!props.loading && !props.items.length" :colspan="10">
        Tidak ada transaksi.
      </TableEmpty>
    </TableBody>
  </Table>
</template>
