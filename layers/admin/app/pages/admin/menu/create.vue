<script setup lang="ts">
import type { AdminMenuCategoryOption, AdminMenuFormPayload, AdminMenuRecipeOption } from '../../../types/admin-menu'
import { ArrowLeft } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import AdminPageHeader from '../../../components/molecules/AdminPageHeader.vue'
import AdminMenuForm from '../../../components/organisms/AdminMenuForm.vue'
import {
  createAdminMenuMutationPayload,
  createAdminMenuRecipePayload,
  mapAdminMenuCategoryOption,
  mapAdminMenuIngredientOption,
} from '../../../utils/admin-menu'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Tambah Menu',
})

const adminMenuApi = useAdminMenuApi()
const { runAdminAction } = useAdminActionFeedback()
const isLoadingOptions = ref(false)
const isSaving = ref(false)
const loadError = ref('')
const categoryOptions = ref<AdminMenuCategoryOption[]>([])
const recipeOptions = ref<AdminMenuRecipeOption[]>([])

onMounted(() => {
  loadOptions()
})

async function loadOptions() {
  if (isLoadingOptions.value) {
    return
  }

  isLoadingOptions.value = true
  loadError.value = ''

  try {
    const [categories, ingredients] = await Promise.all([
      adminMenuApi.getCategories(),
      adminMenuApi.getIngredientOptions(),
    ])

    categoryOptions.value = categories.map(mapAdminMenuCategoryOption)
    recipeOptions.value = ingredients.map(mapAdminMenuIngredientOption)
  }
  catch (error) {
    loadError.value = getErrorMessage(error, 'Gagal memuat pilihan kategori dan bahan.')
  }
  finally {
    isLoadingOptions.value = false
  }
}

async function handleSubmit(payload: AdminMenuFormPayload) {
  const succeeded = await runAdminAction(async () => {
    const imageUrl = await resolveImageUrl(payload)
    const menu = await adminMenuApi.createMenu(createAdminMenuMutationPayload(payload, imageUrl))

    if (!menu.menu_id) {
      throw new Error('ID menu tidak tersedia dari response API.')
    }

    await adminMenuApi.bulkUpdateMenuRecipes(menu.menu_id, createAdminMenuRecipePayload(payload))
  }, {
    loading: isSaving,
    successMessage: 'Menu berhasil ditambahkan.',
    errorMessage: 'Gagal menyimpan menu.',
  })

  if (succeeded) {
    await navigateTo('/admin/menu')
  }
}

async function resolveImageUrl(payload: AdminMenuFormPayload) {
  if (!payload.imageFile) {
    return payload.imageUrl || null
  }

  const upload = await adminMenuApi.uploadMenuImage(payload.imageFile)

  if (!upload.url) {
    throw new Error('URL gambar tidak tersedia dari response upload.')
  }

  return upload.url
}

function handleCancel() {
  return navigateTo('/admin/menu')
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
</script>

<template>
  <div class="flex h-full min-h-full flex-col gap-3 p-3 sm:p-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <AdminPageHeader
        title="Tambah Menu"
        description="Lengkapi identitas menu, gambar, harga jual, ketersediaan, dan resep HPP."
      />

      <Button type="button" variant="outline" size="sm" class="shrink-0" @click="handleCancel">
        <ArrowLeft class="size-4" aria-hidden="true" />
        Kembali
      </Button>
    </div>

    <div v-if="loadError" class="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
      {{ loadError }}
    </div>

    <AdminMenuForm
      :category-options="categoryOptions"
      :recipe-options="recipeOptions"
      :submitting="isSaving || isLoadingOptions"
      @submit="handleSubmit"
    />
  </div>
</template>
