<script setup lang="ts">
import type { AdminSystemProfileFormPayload } from '../../types/admin-system'
import { toast } from 'vue-sonner'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminSystemProfileForm from '../../components/organisms/AdminSystemProfileForm.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Profil Sistem',
})

const {
  systemProfile,
  isLoading,
  isSaving,
  errorMessage,
  successMessage,
  loadSystemProfile,
  saveSystemProfile,
} = useAdminSystemProfile()

onMounted(() => {
  loadSystemProfile()
})

async function handleSubmit(payload: AdminSystemProfileFormPayload) {
  if (isSaving.value || isLoading.value) {
    return
  }

  const settingsPayload = await saveSystemProfile(payload)

  if (settingsPayload) {
    toast.success(successMessage.value || 'Profil sistem berhasil disimpan.')
    return
  }

  toast.error(errorMessage.value || 'Gagal menyimpan profil sistem.')
}
</script>

<template>
  <div class="flex min-h-full flex-col gap-3 p-3 sm:p-4">
    <AdminPageHeader
      title="Profil Sistem"
      description="Kelola identitas toko, tampilan struk, dan nama aplikasi."
    />

    <AdminSystemProfileForm
      :profile="systemProfile"
      :submitting="isSaving || isLoading"
      :error-message="errorMessage"
      :success-message="successMessage"
      @submit="handleSubmit"
    />
  </div>
</template>
