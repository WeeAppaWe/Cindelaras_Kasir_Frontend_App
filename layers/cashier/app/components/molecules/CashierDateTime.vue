<script setup lang="ts">
import { CalendarDays, Clock3 } from 'lucide-vue-next'

const now = ref<Date | null>(null)

const timeFormatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const timeLabel = computed(() => {
  if (!now.value) {
    return '--:--:--'
  }

  return timeFormatter.format(now.value).replace(/\./g, ':')
})

const dateLabel = computed(() => {
  if (!now.value) {
    return 'Memuat tanggal'
  }

  return dateFormatter.format(now.value)
})

let intervalId: ReturnType<typeof setInterval> | undefined

function updateDateTime() {
  now.value = new Date()
}

onMounted(() => {
  updateDateTime()
  intervalId = setInterval(updateDateTime, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div
    class="flex h-9 shrink-0 items-center gap-2 rounded-md border bg-card px-3 text-card-foreground shadow-xs"
    aria-label="Jam dan tanggal saat ini"
  >
    <Clock3 class="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
    <span class="font-mono text-sm font-semibold tabular-nums leading-none tracking-normal">
      {{ timeLabel }}
    </span>
    <span class="h-4 w-px shrink-0 bg-border" aria-hidden="true" />
    <CalendarDays class="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
    <span class="max-w-36 truncate text-xs leading-none text-muted-foreground sm:max-w-48">
      {{ dateLabel }}
    </span>
  </div>
</template>
