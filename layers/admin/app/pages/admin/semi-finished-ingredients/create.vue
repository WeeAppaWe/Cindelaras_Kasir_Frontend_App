<script setup lang="ts">
import type {
  AdminSemiIngredientAvailableRawOption,
  AdminSemiIngredientFormPayload,
  AdminSemiIngredientUnitOption,
} from '../../../types/admin-semi-ingredient'
import { ArrowLeft } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import AdminPageHeader from '../../../components/molecules/AdminPageHeader.vue'
import AdminSemiFinishedIngredientForm from '../../../components/organisms/AdminSemiFinishedIngredientForm.vue'
import {
  createAdminSemiIngredientBulkCompositionPayload,
  createAdminSemiIngredientProfilePayload,
  formatAdminSemiIngredientApiError,
  getAdminSemiIngredientValidationMessage,
  mapAdminSemiIngredientAvailableRawRecordToOption,
  mapAdminSemiIngredientUnitRecordToOption,
} from '../../../utils/admin-semi-ingredient'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Tambah Bahan Setengah Jadi',
})

const adminSemiIngredientApi = useAdminSemiIngredientApi()
const { runAdminAction } = useAdminActionFeedback()

const unitOptions = ref<AdminSemiIngredientUnitOption[]>([])
const ingredientOptions = ref<AdminSemiIngredientAvailableRawOption[]>([])
const isLoading = ref(false)
const isSaving = ref(false)
const loadError = ref('')
const formError = ref('')

onMounted(() => {
  void loadFormOptions()
})

async function loadFormOptions() {
  isLoading.value = true
  loadError.value = ''

  try {
    const [units, ingredients] = await Promise.all([
      adminSemiIngredientApi.getSemiIngredientUnitOptions(),
      adminSemiIngredientApi.getAvailableRawIngredientsForComposition(),
    ])

    unitOptions.value = (Array.isArray(units) ? units : []).map(mapAdminSemiIngredientUnitRecordToOption)
    ingredientOptions.value = (Array.isArray(ingredients) ? ingredients : []).map(mapAdminSemiIngredientAvailableRawRecordToOption)
  }
  catch (error) {
    loadError.value = getErrorMessage(error, 'Gagal memuat pilihan satuan atau bahan baku.')
    unitOptions.value = []
    ingredientOptions.value = []
  }
  finally {
    isLoading.value = false
  }
}

async function handleSubmit(payload: AdminSemiIngredientFormPayload) {
  formError.value = getAdminSemiIngredientValidationMessage(payload)

  if (formError.value) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    const createdIngredient = await adminSemiIngredientApi.createSemiIngredient(
      createAdminSemiIngredientProfilePayload(payload),
    )

    await adminSemiIngredientApi.bulkReplaceSemiIngredientCompositions(
      createdIngredient.ingredient_id,
      createAdminSemiIngredientBulkCompositionPayload(payload),
    )
  }, {
    loading: isSaving,
    successMessage: 'Bahan setengah jadi berhasil dibuat.',
    errorMessage: 'Gagal menyimpan bahan setengah jadi.',
    onError(error) {
      formError.value = formatAdminSemiIngredientApiError(error, 'Gagal menyimpan bahan setengah jadi.')
    },
  })

  if (succeeded) {
    await navigateTo('/admin/semi-finished-ingredients')
  }
}

function handleCancel() {
  return navigateTo('/admin/semi-finished-ingredients')
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
</script>

<template>
  <div class="flex h-full min-h-full flex-col gap-3 p-3 sm:p-4" :aria-busy="isLoading">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <AdminPageHeader
        title="Tambah Bahan Setengah Jadi"
        description="Lengkapi identitas olahan, komposisi bahan baku, dan HPP otomatis."
      />

      <Button type="button" variant="outline" size="sm" class="shrink-0" @click="handleCancel">
        <ArrowLeft class="size-4" aria-hidden="true" />
        Kembali
      </Button>
    </div>

    <div v-if="loadError" class="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
      {{ loadError }}
    </div>

    <div v-if="formError" class="whitespace-pre-line rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
      {{ formError }}
    </div>

    <AdminSemiFinishedIngredientForm
      :unit-options="unitOptions"
      :ingredient-options="ingredientOptions"
      :submitting="isSaving"
      submit-label="Simpan Olahan"
      @submit="handleSubmit"
    />
  </div>
</template>
