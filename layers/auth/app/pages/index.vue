<script setup lang="ts">
definePageMeta({
  layout: false,
})

const { defaultAuthenticatedPath, isAuthenticated } = useAuth()

await navigateTo(isAuthenticated.value ? defaultAuthenticatedPath.value : '/login', {
  replace: true,
})
</script>

<template>
  <div />
</template>
