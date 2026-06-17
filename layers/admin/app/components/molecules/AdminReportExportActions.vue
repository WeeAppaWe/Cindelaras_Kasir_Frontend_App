<script setup lang="ts">
import { FileSpreadsheet, FileText } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { Spinner } from '#layers/base/app/components/ui/spinner'

withDefaults(defineProps<{
  disabled?: boolean
  exporting?: 'pdf' | 'excel' | null
}>(), {
  disabled: false,
  exporting: null,
})

const emit = defineEmits<{
  'export-pdf': []
  'export-excel': []
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button
      type="button"
      variant="outline"
      size="sm"
      class="border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/15 hover:text-destructive"
      :disabled="disabled || Boolean(exporting)"
      @click="emit('export-pdf')"
    >
      <Spinner v-if="exporting === 'pdf'" class="size-4" />
      <FileText v-else class="size-4" aria-hidden="true" />
      {{ exporting === 'pdf' ? 'Mengekspor...' : 'Export PDF' }}
    </Button>
    <Button
      type="button"
      variant="outline"
      size="sm"
      class="border-success/40 bg-success/10 text-success hover:bg-success/15 hover:text-success"
      :disabled="disabled || Boolean(exporting)"
      @click="emit('export-excel')"
    >
      <Spinner v-if="exporting === 'excel'" class="size-4" />
      <FileSpreadsheet v-else class="size-4" aria-hidden="true" />
      {{ exporting === 'excel' ? 'Mengekspor...' : 'Export Excel' }}
    </Button>
  </div>
</template>
