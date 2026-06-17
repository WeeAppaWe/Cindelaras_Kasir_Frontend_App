<script setup lang="ts">
import type { AdminDataTableCell, AdminDataTableColumn, AdminDataTableRow } from '../../types/admin-management'
import { ChevronLeft, ChevronRight, Eye, Factory, ImageIcon, MoreHorizontal, Pencil, ToggleLeft, Trash2 } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '#layers/base/app/components/ui/pagination'
import { Skeleton } from '#layers/base/app/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from '#layers/base/app/components/ui/table'
import { Switch } from '#layers/base/app/components/ui/switch'
import AdminStatusBadge from '../atoms/AdminStatusBadge.vue'

const props = withDefaults(defineProps<{
  columns: AdminDataTableColumn[]
  rows: AdminDataTableRow[]
  loading?: boolean
  loadingRowCount?: number
  emptyTitle?: string
  emptyDescription?: string
  label?: string
  pageSizeOptions?: number[]
  actions?: Array<'view' | 'toggle' | 'edit' | 'produce' | 'delete'>
}>(), {
  loading: false,
  loadingRowCount: 5,
  emptyTitle: 'Data tidak ditemukan',
  emptyDescription: 'Ubah kata kunci atau filter untuk melihat data lain.',
  label: 'data',
  pageSizeOptions: () => [5, 10, 25],
  actions: () => ['view', 'edit', 'delete'] as Array<'view' | 'toggle' | 'edit' | 'produce' | 'delete'>,
})

const emit = defineEmits<{
  view: [id: string]
  toggle: [id: string]
  edit: [id: string]
  produce: [id: string]
  delete: [id: string]
}>()

const columnCount = computed(() => props.columns.length + (props.actions.length ? 1 : 0))
const currentPage = ref(1)
const pageSize = ref(5)
const totalPages = computed(() => Math.max(1, Math.ceil(props.rows.length / pageSize.value)))
const firstItem = computed(() => props.rows.length ? (currentPage.value - 1) * pageSize.value + 1 : 0)
const lastItem = computed(() => Math.min(currentPage.value * pageSize.value, props.rows.length))
const pageSizeId = computed(() => `${props.label.replace(/\s+/g, '-')}-admin-page-size`)
const pageSizeLabel = computed(() => `${props.label.charAt(0).toUpperCase()}${props.label.slice(1)} per halaman`)
const pageValue = computed({
  get: () => currentPage.value,
  set: value => currentPage.value = value,
})
const pageSizeValue = computed({
  get: () => String(pageSize.value),
  set: (value) => {
    pageSize.value = Number(value)
    currentPage.value = 1
  },
})
const summaryText = computed(() => {
  if (props.loading) {
    return `Memuat ${props.label}...`
  }

  return `Menampilkan ${firstItem.value}-${lastItem.value} dari ${props.rows.length} ${props.label}.`
})
const actionColumnClass = computed(() => {
  if (props.actions.length >= 5) {
    return 'w-[26rem] min-w-[26rem] text-right'
  }

  if (props.actions.length === 4) {
    return 'w-92 min-w-92 text-right'
  }

  if (props.actions.length === 3) {
    return 'w-68 min-w-68 text-right'
  }

  if (props.actions.length === 2) {
    return 'w-44 min-w-44 text-right'
  }

  return 'w-24 min-w-24 text-right'
})
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return props.rows.slice(start, start + pageSize.value)
})

watch(() => props.rows, () => {
  currentPage.value = 1
})

watch(totalPages, (value) => {
  if (currentPage.value > value) {
    currentPage.value = value
  }
})

function getCell(row: AdminDataTableRow, key: string): AdminDataTableCell {
  const cell = row.cells[key]

  if (cell && typeof cell === 'object' && 'label' in cell) {
    return cell
  }

  return {
    label: String(cell ?? '-'),
  }
}

function getAlignClass(align: AdminDataTableColumn['align']) {
  if (align === 'right') {
    return 'text-right'
  }

  if (align === 'center') {
    return 'text-center'
  }

  return 'text-left'
}

function getRowActionLabel(row: AdminDataTableRow) {
  const primaryColumn = props.columns[0]

  if (!primaryColumn) {
    return props.label
  }

  return getCell(row, primaryColumn.key).label
}
</script>

<template>
  <div class="rounded-md border">
    <div class="overflow-x-auto">
      <Table class="min-w-[820px]" :aria-busy="loading">
        <TableHeader>
          <TableRow>
            <TableHead
              v-for="column in columns"
              :key="column.key"
              :class="[getAlignClass(column.align), column.class]"
            >
              {{ column.label }}
            </TableHead>
            <TableHead v-if="actions.length" :class="actionColumnClass">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="loading">
            <TableRow v-for="index in loadingRowCount" :key="`admin-data-loading-${index}`">
              <TableCell v-for="column in columns" :key="`${index}-${column.key}`">
                <Skeleton class="h-4 w-full" />
              </TableCell>
              <TableCell v-if="actions.length">
                <Skeleton class="ml-auto h-8 w-28" />
              </TableCell>
            </TableRow>
          </template>

          <template v-else-if="rows.length">
            <TableRow v-for="row in paginatedRows" :key="row.id" class="last:border-b-0">
              <TableCell
                v-for="column in columns"
                :key="`${row.id}-${column.key}`"
                :class="[getAlignClass(column.align), column.class]"
              >
                <template v-if="getCell(row, column.key).type === 'switch'">
                  <div
                    class="flex items-center gap-2"
                    :class="column.align === 'right' ? 'justify-end' : column.align === 'center' ? 'justify-center' : 'justify-start'"
                  >
                    <Switch
                      :model-value="Boolean(getCell(row, column.key).checked)"
                      :disabled="loading || getCell(row, column.key).disabled"
                      :aria-label="`Ubah status ${getRowActionLabel(row)}`"
                      @update:model-value="emit('toggle', row.id)"
                    />
                    <span
                      class="whitespace-nowrap text-sm font-medium"
                      :class="getCell(row, column.key).checked ? 'text-success' : 'text-muted-foreground'"
                    >
                      {{ getCell(row, column.key).label }}
                    </span>
                  </div>
                </template>

                <template v-else-if="getCell(row, column.key).tone">
                  <AdminStatusBadge :tone="getCell(row, column.key).tone">
                    {{ getCell(row, column.key).label }}
                  </AdminStatusBadge>
                </template>

                <template v-else>
                  <div
                    class="min-w-0"
                    :class="getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt ? 'flex items-center gap-3' : ''"
                  >
                    <div
                      v-if="getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt"
                      class="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground"
                    >
                      <img
                        v-if="getCell(row, column.key).imageUrl"
                        :src="getCell(row, column.key).imageUrl"
                        :alt="getCell(row, column.key).imageAlt ?? getCell(row, column.key).label"
                        class="size-full object-cover"
                        loading="lazy"
                        decoding="async"
                      >
                      <ImageIcon v-else class="size-5" aria-hidden="true" />
                    </div>

                    <div class="min-w-0">
                      <p
                        class="truncate text-sm"
                        :class="[
                          getCell(row, column.key).description ? 'font-medium text-foreground' : 'text-foreground',
                          getCell(row, column.key).monospace ? 'font-mono tabular-nums' : '',
                        ]"
                      >
                        {{ getCell(row, column.key).label }}
                      </p>
                      <p v-if="getCell(row, column.key).description" class="mt-0.5 truncate text-xs text-muted-foreground">
                        {{ getCell(row, column.key).description }}
                      </p>
                    </div>
                  </div>
                </template>
              </TableCell>

              <TableCell v-if="actions.length" :class="actionColumnClass">
                <div class="flex flex-nowrap items-center justify-end gap-1.5">
                  <Button
                    v-if="actions.includes('view')"
                    type="button"
                    variant="ghost"
                    size="sm"
                    class="h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary"
                    :aria-label="`Lihat detail ${getRowActionLabel(row)}`"
                    @click="emit('view', row.id)"
                  >
                    <Eye class="size-4" aria-hidden="true" />
                    Detail
                  </Button>
                  <Button
                    v-if="actions.includes('toggle')"
                    type="button"
                    variant="ghost"
                    size="sm"
                    class="h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary"
                    :aria-label="`Ubah status ${getRowActionLabel(row)}`"
                    @click="emit('toggle', row.id)"
                  >
                    <ToggleLeft class="size-4" aria-hidden="true" />
                    Status
                  </Button>
                  <Button
                    v-if="actions.includes('edit')"
                    type="button"
                    variant="ghost"
                    size="sm"
                    class="h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground"
                    :aria-label="`Ubah data ${getRowActionLabel(row)}`"
                    @click="emit('edit', row.id)"
                  >
                    <Pencil class="size-4" aria-hidden="true" />
                    Ubah
                  </Button>
                  <Button
                    v-if="actions.includes('produce')"
                    type="button"
                    variant="ghost"
                    size="sm"
                    class="h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success"
                    :aria-label="`Catat produksi ${getRowActionLabel(row)}`"
                    @click="emit('produce', row.id)"
                  >
                    <Factory class="size-4" aria-hidden="true" />
                    Produksi
                  </Button>
                  <Button
                    v-if="actions.includes('delete')"
                    type="button"
                    variant="ghost"
                    size="sm"
                    class="h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    :aria-label="`Hapus data ${getRowActionLabel(row)}`"
                    @click="emit('delete', row.id)"
                  >
                    <Trash2 class="size-4" aria-hidden="true" />
                    Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </template>

          <TableEmpty v-else :colspan="columnCount">
            <div class="text-center">
              <p class="text-sm font-medium">{{ emptyTitle }}</p>
              <p class="mt-1 text-sm text-muted-foreground">{{ emptyDescription }}</p>
            </div>
          </TableEmpty>
        </TableBody>
      </Table>
    </div>

    <div class="flex flex-col gap-3 border-t p-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <p class="text-sm text-muted-foreground" aria-live="polite">
          {{ summaryText }}
        </p>

        <div class="flex items-center gap-2">
          <label :for="pageSizeId" class="text-sm text-muted-foreground">
            {{ pageSizeLabel }}
          </label>
          <NativeSelect
            :id="pageSizeId"
            v-model="pageSizeValue"
            class="w-24"
            :disabled="loading"
          >
            <option v-for="option in pageSizeOptions" :key="option" :value="String(option)">
              {{ option }}
            </option>
          </NativeSelect>
        </div>
      </div>

      <Pagination
        v-if="totalPages > 1 && !loading"
        v-model:page="pageValue"
        :items-per-page="pageSize"
        :total="rows.length"
        :sibling-count="1"
        show-edges
        class="mx-0 w-auto justify-start sm:justify-end"
      >
        <PaginationContent v-slot="{ items }">
          <PaginationPrevious>
            <ChevronLeft class="size-4" aria-hidden="true" />
            Sebelumnya
          </PaginationPrevious>

          <template v-for="(item, index) in items" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === pageValue"
              :aria-label="`Halaman ${item.value}`"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else :index="index">
              <MoreHorizontal class="size-4" aria-hidden="true" />
              <span class="sr-only">Halaman lainnya</span>
            </PaginationEllipsis>
          </template>

          <PaginationNext>
            Berikutnya
            <ChevronRight class="size-4" aria-hidden="true" />
          </PaginationNext>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>
