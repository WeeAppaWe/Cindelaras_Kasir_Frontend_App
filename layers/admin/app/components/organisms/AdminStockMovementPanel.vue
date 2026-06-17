<script setup lang="ts">
import type { AdminStockMovementItem } from '../../types/admin-dashboard'
import { Badge } from '#layers/base/app/components/ui/badge'
import { Button } from '#layers/base/app/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#layers/base/app/components/ui/table'

defineProps<{
  items: AdminStockMovementItem[]
}>()

function getTypeClass(type: AdminStockMovementItem['type']) {
  if (type === 'in') {
    return 'bg-success text-success-foreground'
  }

  if (type === 'out') {
    return 'bg-warning text-warning-foreground'
  }

  if (type === 'sale') {
    return 'bg-primary text-primary-foreground'
  }

  return 'bg-secondary text-secondary-foreground'
}
</script>

<template>
  <section class="rounded-md border bg-card p-4 text-card-foreground shadow-xs" aria-labelledby="admin-stock-movement-title">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <h2 id="admin-stock-movement-title" class="text-base font-semibold tracking-normal">
          Mutasi Stok
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          Pergerakan bahan terbaru dari transaksi dan aktivitas persediaan.
        </p>
      </div>

      <Button as-child variant="outline" size="sm" class="shrink-0">
        <NuxtLink to="/admin/stock-history">
          Lihat semua
        </NuxtLink>
      </Button>
    </div>

    <div v-if="items.length" class="mt-4 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Waktu</TableHead>
            <TableHead>Bahan</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead class="text-right">Jumlah</TableHead>
            <TableHead class="text-right">Saldo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in items" :key="item.id" class="last:border-b-0">
            <TableCell class="font-mono text-xs tabular-nums">{{ item.time }}</TableCell>
            <TableCell class="font-medium">{{ item.ingredientName }}</TableCell>
            <TableCell>
              <Badge :class="getTypeClass(item.type)">
                {{ item.typeLabel }}
              </Badge>
            </TableCell>
            <TableCell class="text-right font-medium">{{ item.quantityLabel }}</TableCell>
            <TableCell class="text-right text-muted-foreground">{{ item.balanceLabel }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <p v-else class="mt-4 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
      Belum ada mutasi stok.
    </p>
  </section>
</template>
