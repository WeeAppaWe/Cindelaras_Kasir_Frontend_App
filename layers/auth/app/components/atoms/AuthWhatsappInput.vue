<script setup lang="ts">
import { Input } from '#layers/base/app/components/ui/input'

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <Input
    v-model="modelValue"
    type="tel"
    class="h-11"
    autocomplete="tel"
    inputmode="tel"
    placeholder="08xxxxxxxxxx"
  />
</template>
