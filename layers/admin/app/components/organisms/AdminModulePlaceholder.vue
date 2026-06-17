<script setup lang="ts">
import { PanelsTopLeft } from 'lucide-vue-next'
import AdminPageHeader from '../molecules/AdminPageHeader.vue'

defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex min-h-full flex-col gap-3 p-3 sm:p-4">
    <AdminPageHeader :title="title" :description="description" />

    <section class="rounded-md border bg-card p-6 text-card-foreground shadow-xs" aria-label="Status halaman">
      <div class="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
        <span class="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          <PanelsTopLeft class="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 class="text-base font-semibold tracking-normal">
            Konten Belum Tersedia
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Data modul ini belum tersedia.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
