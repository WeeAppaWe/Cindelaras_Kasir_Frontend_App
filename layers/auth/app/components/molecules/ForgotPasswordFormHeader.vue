<script setup lang="ts">
defineProps<{
  title: string
  description: string
  stepLabel: string
}>()
</script>

<template>
  <header class="space-y-3">
    <p class="text-sm font-medium text-primary">
      {{ stepLabel }}
    </p>
    <div class="space-y-1">
      <h1 class="text-2xl font-semibold tracking-normal text-foreground">
        {{ title }}
      </h1>
      <p class="text-sm leading-6 text-muted-foreground">
        {{ description }}
      </p>
    </div>
  </header>
</template>
