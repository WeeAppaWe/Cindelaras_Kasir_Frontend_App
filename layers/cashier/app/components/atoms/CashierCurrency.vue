<script setup lang="ts">
const props = defineProps<{
  value: number
}>()

const formattedValue = computed(() => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
}).format(props.value))
</script>

<template>
  <span>{{ formattedValue }}</span>
</template>
