<script setup lang="ts">
import type {
  AdminSemiIngredientAvailableRawOption,
  AdminSemiIngredientFormPayload,
  AdminSemiIngredientUnitOption,
  AdminSemiIngredientViewItem,
} from '../../../types/admin-semi-ingredient'
import { ArrowLeft } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import AdminPageHeader from '../../../components/molecules/AdminPageHeader.vue'
import AdminSemiFinishedIngredientForm from '../../../components/organisms/AdminSemiFinishedIngredientForm.vue'
import {
  createAdminSemiIngredientBulkCompositionPayload,
  createAdminSemiIngredientFormPayloadFromViewItem,
  createAdminSemiIngredientProfilePayload,
  getAdminSemiIngredientValidationMessage,
  mapAdminSemiIngredientAvailableRawRecordToOption,
  mapAdminSemiIngredientRecordToViewItem,
  mapAdminSemiIngredientUnitRecordToOption,
} from '../../../utils/admin-semi-ingredient'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Ubah Bahan Setengah Jadi',
})

const route = useRoute()
const adminSemiIngredientApi = useAdminSemiIngredientApi()
const { runAdminAction } = useAdminActionFeedback()

const ingredientId = computed(() => {
  const value = route.params.semiFinishedIngredientsId

  return Array.isArray(value) ? value[0] ?? '' : String(value ?? '')
})
const unitOptions = ref<AdminSemiIngredientUnitOption[]>([])
const ingredientOptions = ref<AdminSemiIngredientAvailableRawOption[]>([])
const initialValue = ref<AdminSemiIngredientFormPayload | null>(null)
const isLoading = ref(false)
const isSaving = ref(false)
const loadError = ref('')
const formError = ref('')
const titleName = ref('')

onMounted(() => {
  void loadFormData()
})

async function loadFormData() {
  if (!ingredientId.value) {
    loadError.value = 'ID bahan setengah jadi tidak valid.'
    return
  }

  isLoading.value = true
  loadError.value = ''

  try {
    const [units, ingredients, detail] = await Promise.all([
      adminSemiIngredientApi.getSemiIngredientUnitOptions(),
      adminSemiIngredientApi.getAvailableRawIngredientsForComposition(ingredientId.value),
      adminSemiIngredientApi.getSemiIngredientDetail(ingredientId.value),
    ])
    const viewItem = mapAdminSemiIngredientRecordToViewItem(detail)

    unitOptions.value = (Array.isArray(units) ? units : []).map(mapAdminSemiIngredientUnitRecordToOption)
    ingredientOptions.value = mergeCompositionIngredientOptions(
      (Array.isArray(ingredients) ? ingredients : []).map(mapAdminSemiIngredientAvailableRawRecordToOption),
      viewItem,
    )
    initialValue.value = createAdminSemiIngredientFormPayloadFromViewItem(viewItem)
    titleName.value = viewItem.name
  }
  catch (error) {
    loadError.value = getErrorMessage(error, 'Gagal memuat bahan setengah jadi.')
    initialValue.value = null
  }
  finally {
    isLoading.value = false
  }
}

async function handleSubmit(payload: AdminSemiIngredientFormPayload) {
  formError.value = getAdminSemiIngredientValidationMessage(payload)

  if (formError.value || !ingredientId.value) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    await adminSemiIngredientApi.updateSemiIngredient(
      ingredientId.value,
      createAdminSemiIngredientProfilePayload(payload),
    )
    await adminSemiIngredientApi.bulkReplaceSemiIngredientCompositions(
      ingredientId.value,
      createAdminSemiIngredientBulkCompositionPayload(payload),
    )
  }, {
    loading: isSaving,
    successMessage: 'Bahan setengah jadi berhasil diperbarui.',
    errorMessage: 'Gagal menyimpan perubahan bahan setengah jadi.',
  })

  if (succeeded) {
    await navigateTo('/admin/semi-finished-ingredients')
  }
}

function mergeCompositionIngredientOptions(
  options: AdminSemiIngredientAvailableRawOption[],
  item: AdminSemiIngredientViewItem,
) {
  const optionMap = new Map(options.map(option => [option.id, option]))

  item.compositions.forEach((composition) => {
    if (optionMap.has(composition.childId)) {
      return
    }

    optionMap.set(composition.childId, {
      id: composition.childId,
      name: composition.ingredientName,
      unit: composition.unitName,
      unitName: composition.unitName,
      avgCost: composition.avgCost,
      costPerUnit: composition.avgCost,
    })
  })

  return Array.from(optionMap.values())
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
        title="Ubah Bahan Setengah Jadi"
        :description="titleName ? `Perbarui profil dan komposisi ${titleName}.` : 'Perbarui profil dan komposisi bahan setengah jadi.'"
      />

      <Button type="button" variant="outline" size="sm" class="shrink-0" @click="handleCancel">
        <ArrowLeft class="size-4" aria-hidden="true" />
        Kembali
      </Button>
    </div>

    <div v-if="loadError" class="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
      {{ loadError }}
    </div>

    <div v-if="formError" class="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
      {{ formError }}
    </div>

    <div v-if="isLoading" class="rounded-md border bg-card px-3 py-4 text-sm text-muted-foreground">
      Memuat data bahan setengah jadi...
    </div>

    <AdminSemiFinishedIngredientForm
      v-else-if="initialValue"
      :unit-options="unitOptions"
      :ingredient-options="ingredientOptions"
      :initial-value="initialValue"
      :submitting="isSaving"
      submit-label="Simpan Perubahan"
      @submit="handleSubmit"
    />
  </div>
</template>
