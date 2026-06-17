<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '#layers/base/app/components/ui/input'

const props = withDefaults(defineProps<{
  modelValue?: string
  searchId: string
  searchLabel: string
  searchPlaceholder: string
  disabled?: boolean
}>(), {
  modelValue: '',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const searchValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div class="relative w-full sm:max-w-xs">
      <label :for="searchId" class="sr-only">{{ searchLabel }}</label>
      <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input
        :id="searchId"
        v-model="searchValue"
        type="search"
        class="h-9 pl-9"
        :placeholder="searchPlaceholder"
        :disabled="props.disabled"
      />
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <slot name="filters" />
      <div v-if="$slots.action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>
