<script setup lang="ts">
const props = defineProps<{
  currentStep: number
}>()

const steps = ['WhatsApp', 'Kode', 'Password']
</script>

<template>
  <ol class="grid grid-cols-3 gap-2" aria-label="Tahapan lupa password">
    <li
      v-for="(step, index) in steps"
      :key="step"
      class="h-1.5 rounded-full"
      :class="index + 1 <= props.currentStep ? 'bg-primary' : 'bg-muted'"
    >
      <span class="sr-only">{{ step }}</span>
    </li>
  </ol>
</template>
