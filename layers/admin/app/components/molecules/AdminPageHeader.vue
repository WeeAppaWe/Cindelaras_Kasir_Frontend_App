<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
}>()

const headingId = computed(() => {
  const slug = props.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `admin-${slug || 'page'}-title`
})
</script>

<template>
  <section class="flex flex-col gap-1" :aria-labelledby="headingId">
    <h1 :id="headingId" class="text-xl font-semibold tracking-normal">
      {{ title }}
    </h1>
    <p v-if="description" class="max-w-3xl text-sm text-muted-foreground">
      {{ description }}
    </p>
  </section>
</template>
