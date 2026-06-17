<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '#layers/base/app/components/ui/input'

const props = withDefaults(defineProps<{
  modelValue: string
  searchId: string
  searchLabel: string
  searchPlaceholder: string
  disabled?: boolean
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const searchValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', String(value)),
})
</script>

<template>
  <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
    <div class="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
      <div class="relative min-w-0 flex-1 lg:max-w-md">
        <label :for="searchId" class="sr-only">{{ searchLabel }}</label>
        <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          :id="searchId"
          v-model="searchValue"
          class="h-9 pl-9"
          :disabled="disabled"
          :placeholder="searchPlaceholder"
          type="search"
        />
      </div>

      <div v-if="$slots.filters" class="flex flex-wrap items-center gap-2">
        <slot name="filters" />
      </div>
    </div>

    <div v-if="$slots.action" class="flex shrink-0 items-center justify-end gap-2">
      <slot name="action" />
    </div>
  </div>
</template>
