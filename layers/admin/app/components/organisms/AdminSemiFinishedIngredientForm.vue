<script setup lang="ts">
import type {
  AdminSemiIngredientAvailableRawOption,
  AdminSemiIngredientFormPayload,
  AdminSemiIngredientUnitOption,
} from '../../types/admin-semi-ingredient'
import { Plus, Trash2 } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import { Spinner } from '#layers/base/app/components/ui/spinner'

interface RecipeRowState {
  localId: string
  itemId: string
  quantity: string
}

interface RecipeItemView {
  childId: string
  itemName: string
  quantity: number
  unit: string
  costPerUnit: number
  subtotal: number
}

interface FormState {
  name: string
  unitId: string
  minStock: string
}

type FormField = keyof FormState | 'recipe'

const props = withDefaults(defineProps<{
  unitOptions: AdminSemiIngredientUnitOption[]
  ingredientOptions: AdminSemiIngredientAvailableRawOption[]
  initialValue?: AdminSemiIngredientFormPayload | null
  submitting?: boolean
  submitLabel?: string
}>(), {
  initialValue: null,
  submitting: false,
  submitLabel: 'Simpan Olahan',
})

const emit = defineEmits<{
  submit: [payload: AdminSemiIngredientFormPayload]
}>()

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

let recipeRowSequence = 0

const form = reactive<FormState>({
  name: '',
  unitId: '',
  minStock: '0',
})

const errors = reactive<Record<FormField, string>>({
  name: '',
  unitId: '',
  minStock: '',
  recipe: '',
})

const recipeRows = ref<RecipeRowState[]>([])

watch(() => props.initialValue, (value) => {
  if (value) {
    applyFormPayload(value)
    return
  }

  if (!form.unitId && props.unitOptions.length) {
    form.unitId = props.unitOptions[0]?.id ?? ''
  }
}, { immediate: true, deep: true })

watch(() => props.unitOptions, (options) => {
  if (!form.unitId && options.length) {
    form.unitId = options[0]?.id ?? ''
  }
}, { immediate: true })

const minStockValue = computed(() => toNumber(form.minStock))
const targetUnitName = computed(() => getUnitOption(form.unitId)?.name ?? '')
const recipeItems = computed<RecipeItemView[]>(() => {
  return recipeRows.value
    .map((row) => {
      const option = getIngredientOption(row.itemId)
      const quantity = toNumber(row.quantity)

      if (!option || !Number.isFinite(quantity) || quantity <= 0) {
        return null
      }

      return {
        childId: option.id,
        itemName: option.name,
        quantity,
        unit: option.unitName,
        costPerUnit: option.costPerUnit,
        subtotal: Math.round(quantity * option.costPerUnit),
      }
    })
    .filter((item): item is RecipeItemView => Boolean(item))
})
const hasDuplicateRecipe = computed(() => {
  const childIds = recipeItems.value.map(item => item.childId)

  return new Set(childIds).size !== childIds.length
})
const totalRecipeCost = computed(() => recipeItems.value.reduce((total, item) => total + item.subtotal, 0))
const canSubmit = computed(() => {
  const hasValidIdentity = Boolean(form.name.trim() && form.unitId)
  const hasValidMinimumStock = Boolean(
    form.minStock.trim()
    && Number.isFinite(minStockValue.value)
    && minStockValue.value >= 0,
  )
  const hasValidRecipe = recipeRows.value.length > 0
    && recipeItems.value.length === recipeRows.value.length
    && !hasDuplicateRecipe.value

  return hasValidIdentity && hasValidMinimumStock && hasValidRecipe
})

function applyFormPayload(value: AdminSemiIngredientFormPayload) {
  form.name = value.name
  form.unitId = value.unitId || props.unitOptions[0]?.id || ''
  form.minStock = String(value.minStock ?? 0)
  recipeRows.value = value.compositions.map(composition => createRecipeRow(composition.child_id, composition.qty_needed))
}

function createRecipeRow(itemId = props.ingredientOptions[0]?.id ?? '', quantity: number | string = ''): RecipeRowState {
  return {
    localId: `semi-recipe-row-${recipeRowSequence++}`,
    itemId,
    quantity: String(quantity),
  }
}

function getUnitOption(id: string) {
  return props.unitOptions.find(option => option.id === id)
}

function getIngredientOption(id: string) {
  return props.ingredientOptions.find(option => option.id === id)
}

function addRecipeRow() {
  recipeRows.value = [...recipeRows.value, createRecipeRow()]
  errors.recipe = ''
}

function removeRecipeRow(localId: string) {
  recipeRows.value = recipeRows.value.filter(row => row.localId !== localId)
  errors.recipe = ''
}

function handleSubmit() {
  if (props.submitting || !validateForm()) {
    return
  }

  emit('submit', {
    name: form.name.trim(),
    unitId: form.unitId,
    minStock: minStockValue.value,
    compositions: recipeItems.value.map(item => ({
      child_id: item.childId,
      qty_needed: item.quantity,
    })),
  })
}

function validateForm() {
  clearErrors()

  if (!form.name.trim()) {
    errors.name = 'Nama bahan wajib diisi.'
  }

  if (!form.unitId) {
    errors.unitId = 'Satuan hasil wajib dipilih.'
  }

  if (!form.minStock.trim()) {
    errors.minStock = 'Stok minimum wajib diisi.'
  }
  else if (!Number.isFinite(minStockValue.value) || minStockValue.value < 0) {
    errors.minStock = 'Stok minimum harus 0 atau lebih.'
  }

  if (!recipeRows.value.length) {
    errors.recipe = 'Tambahkan minimal 1 bahan resep.'
  }
  else if (recipeItems.value.length !== recipeRows.value.length) {
    errors.recipe = 'Setiap baris resep wajib memilih bahan dan jumlah lebih dari 0.'
  }
  else if (hasDuplicateRecipe.value) {
    errors.recipe = 'Bahan baku penyusun tidak boleh duplikat.'
  }

  return !Object.values(errors).some(Boolean)
}

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key as FormField] = ''
  })
}

function toNumber(value: string | number) {
  const parsed = Number(value || 0)

  return Number.isFinite(parsed) ? parsed : 0
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value).replace(/\s/g, '')
}
</script>

<template>
  <form class="flex flex-1 flex-col" :aria-busy="props.submitting" @submit.prevent="handleSubmit">
    <div class="grid flex-1 gap-3 xl:grid-cols-[minmax(17rem,23rem)_minmax(0,1fr)] xl:items-stretch">
      <section class="flex h-full flex-col rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="semi-finished-identity-title">
        <div class="mb-3">
          <h2 id="semi-finished-identity-title" class="text-base font-semibold tracking-normal">
            Identitas Olahan
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Data dasar bahan setengah jadi untuk resep menu dan produksi dapur.
          </p>
        </div>

        <div class="space-y-3">
          <div class="space-y-1.5">
            <label for="admin-semi-finished-name" class="text-sm font-medium">Nama bahan</label>
            <Input
              id="admin-semi-finished-name"
              v-model="form.name"
              :disabled="props.submitting"
              :aria-invalid="errors.name ? true : undefined"
              aria-describedby="admin-semi-finished-name-error"
              placeholder="Sambal Bawang"
            />
            <p v-if="errors.name" id="admin-semi-finished-name-error" class="text-xs text-destructive">
              {{ errors.name }}
            </p>
          </div>

          <div class="space-y-1.5">
            <label for="admin-semi-finished-unit" class="text-sm font-medium">Satuan hasil</label>
            <NativeSelect
              id="admin-semi-finished-unit"
              v-model="form.unitId"
              class="w-full"
              :disabled="props.submitting || !props.unitOptions.length"
              :aria-invalid="errors.unitId ? true : undefined"
              aria-describedby="admin-semi-finished-unit-error"
            >
              <option v-if="!props.unitOptions.length" value="">Belum ada satuan</option>
              <option v-for="unit in props.unitOptions" :key="unit.id" :value="unit.id">
                {{ unit.name }}
              </option>
            </NativeSelect>
            <p v-if="errors.unitId" id="admin-semi-finished-unit-error" class="text-xs text-destructive">
              {{ errors.unitId }}
            </p>
          </div>

          <div class="space-y-1.5">
            <label for="admin-semi-finished-min-stock" class="text-sm font-medium">Stok minimum</label>
            <Input
              id="admin-semi-finished-min-stock"
              v-model="form.minStock"
              :disabled="props.submitting"
              :aria-invalid="errors.minStock ? true : undefined"
              aria-describedby="admin-semi-finished-min-stock-error"
              inputmode="decimal"
              placeholder="0"
            />
            <p v-if="errors.minStock" id="admin-semi-finished-min-stock-error" class="text-xs text-destructive">
              {{ errors.minStock }}
            </p>
          </div>

          <div class="border-t pt-3">
            <Button type="submit" class="w-full" :disabled="props.submitting || !canSubmit">
              <Spinner v-if="props.submitting" class="size-4" />
              {{ props.submitting ? 'Menyimpan...' : props.submitLabel }}
            </Button>
          </div>
        </div>
      </section>

      <div class="flex min-w-0 flex-col gap-3 xl:h-full">
        <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="semi-finished-cost-title">
          <div class="mb-3">
            <h2 id="semi-finished-cost-title" class="text-base font-semibold tracking-normal">
              Resep & HPP
            </h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Ringkasan biaya dihitung dari seluruh bahan baku penyusun.
            </p>
          </div>

          <div class="grid gap-2 md:grid-cols-3">
            <div class="rounded-md border px-3 py-2">
              <p class="text-xs font-medium text-muted-foreground">Total biaya resep</p>
              <p class="mt-1 truncate text-base font-semibold">{{ formatCurrency(totalRecipeCost) }}</p>
              <p class="mt-1 text-xs text-muted-foreground">{{ recipeItems.length }} bahan</p>
            </div>

            <div class="rounded-md border px-3 py-2">
              <p class="text-xs font-medium text-muted-foreground">Komposisi</p>
              <p class="mt-1 truncate text-base font-semibold">{{ recipeItems.length }} bahan</p>
              <p class="mt-1 text-xs text-muted-foreground">Bahan aktif di resep</p>
            </div>

            <div class="rounded-md border border-info/40 bg-info/10 px-3 py-2">
              <p class="text-xs font-medium text-muted-foreground">Satuan hasil</p>
              <p class="mt-1 truncate text-base font-semibold">{{ targetUnitName || '-' }}</p>
              <p class="mt-1 text-xs text-muted-foreground">Satuan stok olahan</p>
            </div>
          </div>
        </section>

        <section class="flex flex-1 flex-col rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="semi-finished-recipe-title">
          <div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div class="min-w-0">
              <h2 id="semi-finished-recipe-title" class="text-base font-semibold tracking-normal">
                Komposisi Bahan
              </h2>
              <p class="mt-1 text-sm text-muted-foreground">
                Susun bahan baku dan bahan setengah jadi beserta takarannya untuk sekali proses produksi.
              </p>
            </div>

            <Button type="button" variant="outline" size="sm" :disabled="props.submitting || !props.ingredientOptions.length" @click="addRecipeRow">
              <Plus class="size-4" aria-hidden="true" />
              Tambah Bahan
            </Button>
          </div>

          <div class="flex flex-1 flex-col">
            <div
              v-if="!recipeRows.length"
              class="flex min-h-40 flex-1 flex-col items-center justify-center rounded-md border border-dashed bg-muted/30 px-4 py-6 text-center"
            >
              <div class="flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground">
                <Plus class="size-5" aria-hidden="true" />
              </div>
              <p class="mt-3 text-sm font-medium">
                Belum ada bahan resep
              </p>
              <p class="mt-1 max-w-md text-sm text-muted-foreground">
                Klik Tambah Bahan untuk memasukkan komponen produksi.
              </p>
            </div>

            <div v-else class="space-y-2">
              <div
                v-for="(row, index) in recipeRows"
                :key="row.localId"
                class="grid gap-2 rounded-md border bg-background p-2.5 md:grid-cols-[minmax(12rem,1fr)_7rem_5rem_7rem_8rem_auto] md:items-end"
              >
                <div class="space-y-1.5">
                  <label :for="`semi-recipe-item-${row.localId}`" class="text-sm font-medium">Bahan</label>
                  <NativeSelect
                    :id="`semi-recipe-item-${row.localId}`"
                    v-model="row.itemId"
                    class="w-full"
                    :disabled="props.submitting || !props.ingredientOptions.length"
                  >
                    <option v-if="!props.ingredientOptions.length" value="">Belum ada bahan</option>
                    <option v-for="option in props.ingredientOptions" :key="option.id" :value="option.id">
                      {{ option.type === 'SEMI' ? `[SEMI] ${option.name}` : option.name }}
                    </option>
                  </NativeSelect>
                </div>

                <div class="space-y-1.5">
                  <label :for="`semi-recipe-qty-${row.localId}`" class="text-sm font-medium">Jumlah</label>
                  <Input
                    :id="`semi-recipe-qty-${row.localId}`"
                    v-model="row.quantity"
                    :disabled="props.submitting"
                    inputmode="decimal"
                    placeholder="1"
                  />
                </div>

                <div class="space-y-1.5">
                  <p class="text-sm font-medium">Satuan</p>
                  <p class="flex h-9 items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">
                    {{ getIngredientOption(row.itemId)?.unitName ?? '-' }}
                  </p>
                </div>

                <div class="space-y-1.5">
                  <p class="text-sm font-medium">HPP/unit</p>
                  <p class="flex h-9 items-center justify-end rounded-md border bg-muted px-3 text-sm font-medium">
                    {{ getIngredientOption(row.itemId)?.costPerUnit ? formatCurrency(getIngredientOption(row.itemId)?.costPerUnit ?? 0) : '-' }}
                  </p>
                </div>

                <div class="space-y-1.5">
                  <p class="text-sm font-medium">Subtotal</p>
                  <p class="flex h-9 items-center justify-end rounded-md border bg-muted px-3 text-sm font-medium">
                    {{ formatCurrency(Math.round(toNumber(row.quantity) * (getIngredientOption(row.itemId)?.costPerUnit ?? 0))) }}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  class="text-destructive hover:bg-destructive/10 hover:text-destructive md:mb-0.5"
                  :disabled="props.submitting"
                  :aria-label="`Hapus bahan resep baris ${index + 1}`"
                  @click="removeRecipeRow(row.localId)"
                >
                  <Trash2 class="size-4" aria-hidden="true" />
                  Hapus
                </Button>
              </div>
            </div>
          </div>

          <p v-if="errors.recipe" class="mt-3 text-sm text-destructive">
            {{ errors.recipe }}
          </p>
        </section>
      </div>
    </div>
  </form>
</template>
