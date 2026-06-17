<script setup lang="ts">
import type { AdminInventoryStatusItem } from '../../types/admin-dashboard'
import BaseRadialBarChart from '#layers/base/app/components/BaseRadialBarChart/BaseRadialBarChart.vue'
import { Button } from '#layers/base/app/components/ui/button'

const props = defineProps<{
  items: AdminInventoryStatusItem[]
}>()

const statusDefinitions = [
  {
    label: 'Kritis',
    tone: 'destructive',
    color: '#dc2626',
    helper: 'Stok < batas minimum',
  },
  {
    label: 'Menipis',
    tone: 'warning',
    color: '#f59e0b',
    helper: 'Stok mendekati batas minimum',
  },
  {
    label: 'Aman',
    tone: 'success',
    color: '#16a34a',
    helper: 'Stok > batas minimum',
  },
] as const
const totalItems = computed(() => props.items.reduce((total, item) => total + item.count, 0))
const statusCounts = computed(() => statusDefinitions.map(definition => getStatusCount(definition.tone)))
const statusPercentages = computed(() => statusDefinitions.map((definition, index) => {
  const item = getStatusItem(definition.tone)

  if (item?.percentage) {
    return item.percentage
  }

  const count = statusCounts.value[index] ?? 0

  return totalItems.value > 0 ? Math.round((count / totalItems.value) * 100) : 0
}))
const statusLabels = computed(() => statusDefinitions.map(definition => definition.label))
const statusColors = computed(() => statusDefinitions.map(definition => definition.color))
const inventoryChartOptions = computed(() => ({
  plotOptions: {
    radialBar: {
      dataLabels: {
        total: {
          formatter: () => `${totalItems.value} item`,
        },
      },
    },
  },
}))
function getStatusCount(tone: AdminInventoryStatusItem['tone']) {
  return getStatusItem(tone)?.count ?? 0
}

function getStatusItem(tone: AdminInventoryStatusItem['tone']) {
  return props.items.find(item => item.tone === tone)
}
</script>

<template>
  <section class="rounded-md border bg-card p-4 text-card-foreground shadow-xs" aria-labelledby="admin-inventory-status-title">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <h2 id="admin-inventory-status-title" class="text-base font-semibold tracking-normal">
          Status Persediaan
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">
          Perbandingan stok saat ini terhadap batas minimum.
        </p>
      </div>

      <Button as-child variant="outline" size="sm" class="shrink-0">
        <NuxtLink to="/admin/reports/inventory">
          Lihat semua
        </NuxtLink>
      </Button>
    </div>

    <div v-if="items.length" class="mt-4 space-y-4">
      <div class="rounded-md border bg-muted/20 px-3 py-3">
        <div class="grid gap-2 lg:grid-cols-[minmax(0,1fr)_9rem] lg:items-center">
          <BaseRadialBarChart
            :colors="statusColors"
            :labels="statusLabels"
            :options="inventoryChartOptions"
            :series="statusPercentages"
            :show-legend="false"
            total-label="Total bahan"
            height="220"
          />

          <div class="grid grid-cols-3 gap-2 px-1 pb-1 sm:flex sm:flex-wrap lg:block lg:space-y-3 lg:px-0 lg:pb-0">
            <div
              v-for="definition in statusDefinitions"
              :key="`inventory-status-legend-${definition.label}`"
              class="flex items-center gap-2"
            >
              <span
                class="size-2.5 shrink-0 rounded-full"
                :style="{ backgroundColor: definition.color }"
                aria-hidden="true"
              />
              <div class="min-w-0">
                <p class="text-sm font-medium">{{ definition.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-2 sm:grid-cols-3">
        <article
          v-for="definition in statusDefinitions"
          :key="definition.label"
          class="rounded-md border p-3"
          :aria-label="`${definition.label}: ${getStatusCount(definition.tone)} item`"
        >
          <div class="flex items-center justify-between gap-3">
            <span class="inline-flex min-w-0 items-center gap-2 text-sm font-medium">
              <span
                class="size-2.5 shrink-0 rounded-full"
                :style="{ backgroundColor: definition.color }"
                aria-hidden="true"
              />
              {{ definition.label }}
            </span>
            <span class="text-lg font-semibold">{{ getStatusCount(definition.tone) }}</span>
          </div>
        </article>
      </div>
    </div>

    <p v-else class="mt-4 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
      Belum ada data persediaan.
    </p>
  </section>
</template>
