<script setup lang="ts">
import type {
  AdminMenuCategoryOption,
  AdminMenuFormInitialValue,
  AdminMenuFormPayload,
  AdminMenuRecipeOption,
} from '../../../types/admin-menu'
import { ArrowLeft } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import AdminPageHeader from '../../../components/molecules/AdminPageHeader.vue'
import AdminMenuForm from '../../../components/organisms/AdminMenuForm.vue'
import {
  createAdminMenuMutationPayload,
  createAdminMenuRecipePayload,
  mapAdminMenuCategoryOption,
  mapAdminMenuDetailToFormInitial,
  mapAdminMenuIngredientOption,
} from '../../../utils/admin-menu'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Ubah Menu',
})

const route = useRoute()
const adminMenuApi = useAdminMenuApi()
const { runAdminAction } = useAdminActionFeedback()
const isLoading = ref(false)
const isSaving = ref(false)
const loadError = ref('')
const categoryOptions = ref<AdminMenuCategoryOption[]>([])
const recipeOptions = ref<AdminMenuRecipeOption[]>([])
const initialValue = ref<AdminMenuFormInitialValue | null>(null)

const menuId = computed(() => {
  const value = route.params.menuId

  return Array.isArray(value) ? value[0] ?? '' : String(value ?? '')
})

const title = computed(() => initialValue.value?.name ? `Ubah ${initialValue.value.name}` : 'Ubah Menu')

onMounted(() => {
  loadPageData()
})

async function loadPageData() {
  if (isLoading.value) {
    return
  }

  if (!menuId.value) {
    loadError.value = 'ID menu tidak tersedia.'
    return
  }

  isLoading.value = true
  loadError.value = ''

  try {
    const [categories, ingredients, detail] = await Promise.all([
      adminMenuApi.getCategories(),
      adminMenuApi.getIngredientOptions(),
      adminMenuApi.getMenuDetail(menuId.value),
    ])

    categoryOptions.value = categories.map(mapAdminMenuCategoryOption)
    recipeOptions.value = ingredients.map(mapAdminMenuIngredientOption)
    initialValue.value = mapAdminMenuDetailToFormInitial(detail)
  }
  catch (error) {
    loadError.value = getErrorMessage(error, 'Gagal memuat detail menu.')
  }
  finally {
    isLoading.value = false
  }
}

async function handleSubmit(payload: AdminMenuFormPayload) {
  if (!menuId.value) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    const imageUrl = await resolveImageUrl(payload)

    await adminMenuApi.updateMenu(menuId.value, createAdminMenuMutationPayload(payload, imageUrl))
    await adminMenuApi.bulkUpdateMenuRecipes(menuId.value, createAdminMenuRecipePayload(payload))
  }, {
    loading: isSaving,
    successMessage: 'Menu berhasil diperbarui.',
    errorMessage: 'Gagal memperbarui menu.',
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
        :title="title"
        description="Perbarui identitas menu, gambar, harga jual, ketersediaan, dan resep HPP."
      />

      <Button type="button" variant="outline" size="sm" class="shrink-0" @click="handleCancel">
        <ArrowLeft class="size-4" aria-hidden="true" />
        Kembali
      </Button>
    </div>

    <div v-if="loadError" class="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
      {{ loadError }}
    </div>

    <div v-if="isLoading" class="flex min-h-64 items-center justify-center rounded-md border bg-card text-muted-foreground">
      <Spinner class="mr-2 size-4" />
      Memuat detail menu...
    </div>

    <AdminMenuForm
      v-else-if="initialValue"
      :category-options="categoryOptions"
      :recipe-options="recipeOptions"
      :initial-value="initialValue"
      :submitting="isSaving"
      @submit="handleSubmit"
    />
  </div>
</template>
