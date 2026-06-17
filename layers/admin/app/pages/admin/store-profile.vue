<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Profil Sistem',
})

await navigateTo('/admin/system-profile', { replace: true })
</script>

<template>
  <div />
</template>
