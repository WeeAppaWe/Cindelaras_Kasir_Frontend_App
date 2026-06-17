<script setup lang="ts">
import { Toaster } from '#layers/base/app/components/ui/sonner'

const { consumeFlashToast } = useFlashToast()
const { loadPublicStoreProfile, publicStoreProfile } = usePublicStoreProfile()

const brandLogoUrl = computed(() => publicStoreProfile.value.logoUrl.trim())
const brandDisplayName = computed(() => publicStoreProfile.value.storeName.trim() || 'Sistem Kasir')
const brandSubtitle = computed(() => publicStoreProfile.value.storeAddress.trim() || 'Universitas Teknologi Yogyakarta')
const brandInitials = computed(() => {
  const words = brandDisplayName.value.split(/\s+/).filter(Boolean)
  const initials = words.slice(0, 2).map(word => word[0]?.toUpperCase()).join('')

  return initials || 'SK'
})

onMounted(() => {
  consumeFlashToast()
  void loadPublicStoreProfile()
})
</script>

<template>
  <div class="min-h-dvh bg-background text-foreground">
    <main class="grid min-h-dvh lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <section
        class="relative hidden min-h-dvh overflow-hidden bg-primary bg-cover bg-center lg:block"
        style="background-image: var(--auth-hero-image, none);"
        aria-label="Informasi aplikasi"
      >
        <div class="absolute inset-0 bg-primary/85" aria-hidden="true" />

        <div class="relative z-10 flex min-h-dvh flex-col justify-between px-10 py-8 text-primary-foreground">
          <div class="flex items-center gap-3">
            <div class="flex size-10 items-center justify-center overflow-hidden rounded-md bg-primary-foreground text-sm font-semibold text-primary">
              <img
                v-if="brandLogoUrl"
                :src="brandLogoUrl"
                :alt="`Logo ${brandDisplayName}`"
                class="size-full object-contain p-1"
              >
              <span v-else>{{ brandInitials }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold leading-none">{{ brandDisplayName }}</p>
              <p class="mt-1 text-xs text-primary-foreground/90">{{ brandSubtitle }}</p>
            </div>
          </div>

          <div class="max-w-md">
            <p class="text-3xl font-semibold leading-tight tracking-normal">
              Panel operasional untuk transaksi yang rapi dan cepat.
            </p>
            <p class="mt-4 text-sm leading-6 text-primary-foreground/90">
              Kelola akses pengguna sebelum masuk ke area admin atau kasir.
            </p>
          </div>

          <div class="h-4" aria-hidden="true" />
        </div>
      </section>

      <section class="flex min-h-dvh items-center justify-center px-5 py-8 sm:px-8 lg:px-14">
        <div class="w-full max-w-md">
          <div class="mb-8 flex items-center gap-3 lg:hidden">
            <div class="flex size-10 items-center justify-center overflow-hidden rounded-md bg-primary text-sm font-semibold text-primary-foreground">
              <img
                v-if="brandLogoUrl"
                :src="brandLogoUrl"
                :alt="`Logo ${brandDisplayName}`"
                class="size-full object-contain p-1"
              >
              <span v-else>{{ brandInitials }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold leading-none">{{ brandDisplayName }}</p>
              <p class="mt-1 text-xs text-muted-foreground">{{ brandSubtitle }}</p>
            </div>
          </div>

          <slot />
        </div>
      </section>
    </main>

    <Toaster rich-colors close-button position="top-right" />
  </div>
</template>
