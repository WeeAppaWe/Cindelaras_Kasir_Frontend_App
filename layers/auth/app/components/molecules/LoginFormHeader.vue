<script setup lang="ts">
const { publicStoreProfile } = usePublicStoreProfile()

const brandDisplayName = computed(() => publicStoreProfile.value.storeName.trim() || 'Sistem Kasir')
</script>

<template>
  <header class="space-y-2">
    <p class="text-sm font-medium text-primary">
      {{ brandDisplayName }}
    </p>
    <div class="space-y-1">
      <h1 class="text-2xl font-semibold tracking-normal text-foreground">
        Masuk ke akun
      </h1>
      <p class="text-sm leading-6 text-muted-foreground">
        Gunakan akun yang sudah terdaftar.
      </p>
    </div>
  </header>
</template>
