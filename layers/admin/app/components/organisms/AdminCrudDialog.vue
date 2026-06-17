<script setup lang="ts">
import type { AdminCrudDetailItem, AdminCrudField } from '../../types/admin-management'
import type { ComponentPublicInstance } from 'vue'
import { AlertTriangle, Upload, X } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#layers/base/app/components/ui/dialog'
import { Input } from '#layers/base/app/components/ui/input'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import { Textarea } from '#layers/base/app/components/ui/textarea'
import AdminStatusBadge from '../atoms/AdminStatusBadge.vue'
import {
  ADMIN_IMAGE_UPLOAD_ACCEPT,
  getImageFileValidationMessage,
  isImageDataUrl,
  readImageFileAsDataUrl,
} from '../../utils/image-upload'

type AdminCrudMode = 'create' | 'detail' | 'edit' | 'delete'
type AdminCrudForm = Record<string, string>

const props = withDefaults(defineProps<{
  open: boolean
  mode: AdminCrudMode
  title: string
  description?: string
  form: AdminCrudForm
  fields?: AdminCrudField[]
  detailItems?: AdminCrudDetailItem[]
  targetName?: string
  submitLabel?: string
  loading?: boolean
  formError?: string
}>(), {
  description: '',
  fields: () => [],
  detailItems: () => [],
  targetName: '',
  submitLabel: '',
  loading: false,
  formError: '',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'update:form': [value: AdminCrudForm]
  submit: []
  delete: []
}>()

const isOpen = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})
const imageInputRefs = ref<Record<string, HTMLInputElement | null>>({})
const imageErrors = reactive<Record<string, string>>({})

const isFormMode = computed(() => props.mode === 'create' || props.mode === 'edit')
const primaryLabel = computed(() => {
  if (props.submitLabel) {
    return props.submitLabel
  }

  if (props.mode === 'create') {
    return 'Simpan'
  }

  if (props.mode === 'edit') {
    return 'Simpan Perubahan'
  }

  if (props.mode === 'delete') {
    return 'Hapus'
  }

  return 'Tutup'
})

function updateField(key: string, value: string | number) {
  emit('update:form', {
    ...props.form,
    [key]: String(value),
  })
}

function updateSelectField(key: string, event: Event) {
  updateField(key, (event.target as HTMLSelectElement).value)
}

function setImageInputRef(key: string, element: Element | ComponentPublicInstance | null) {
  imageInputRefs.value[key] = element instanceof HTMLInputElement ? element : null
}

function openImageFilePicker(key: string) {
  if (props.loading) {
    return
  }

  imageInputRefs.value[key]?.click()
}

async function handleImageFileChange(field: AdminCrudField, event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    return
  }

  const validationMessage = getImageFileValidationMessage(file)

  if (validationMessage) {
    imageErrors[field.key] = validationMessage
    input.value = ''
    return
  }

  try {
    const dataUrl = await readImageFileAsDataUrl(file)

    updateField(field.key, dataUrl)
    imageErrors[field.key] = ''
  }
  catch (error) {
    imageErrors[field.key] = error instanceof Error ? error.message : 'Gagal membaca file gambar.'
  }
  finally {
    input.value = ''
  }
}

function handleImageReferenceInput(key: string, value: string | number) {
  imageErrors[key] = ''
  updateField(key, String(value))
}

function clearImageReference(key: string) {
  imageErrors[key] = ''
  updateField(key, '')

  const input = imageInputRefs.value[key]

  if (input) {
    input.value = ''
  }
}

function getImageReferenceInputValue(key: string) {
  const value = props.form[key] ?? ''

  if (isImageDataUrl(value)) {
    return 'Gambar dari file lokal'
  }

  return value
}

function closeDialog() {
  isOpen.value = false
}

function handleSubmit() {
  if (props.loading) {
    return
  }

  if (props.mode === 'delete') {
    emit('delete')
    return
  }

  emit('submit')
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-h-[calc(100vh-2rem)] overflow-x-hidden overflow-y-auto sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <div
        v-if="formError"
        class="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        role="alert"
      >
        {{ formError }}
      </div>

      <form v-if="isFormMode" class="grid gap-4 sm:grid-cols-2" @submit.prevent="handleSubmit">
        <div
          v-for="field in fields"
          :key="field.key"
          class="grid gap-2"
          :class="field.colSpan === 'full' || field.type === 'textarea' ? 'sm:col-span-2' : ''"
        >
          <label :for="field.key" class="text-sm font-medium text-foreground">
            {{ field.label }}
          </label>

          <Textarea
            v-if="field.type === 'textarea'"
            :id="field.key"
            :model-value="form[field.key] ?? ''"
            :placeholder="field.placeholder"
            :required="field.required"
            :disabled="loading"
            class="min-h-24"
            @update:model-value="value => updateField(field.key, String(value))"
          />

          <NativeSelect
            v-else-if="field.type === 'select'"
            :id="field.key"
            :model-value="form[field.key] ?? ''"
            :required="field.required"
            :disabled="loading"
            @change="updateSelectField(field.key, $event)"
          >
            <option
              v-for="option in field.options"
              :key="`${field.key}-${option.value}`"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </NativeSelect>

          <div v-else-if="field.type === 'image'" class="grid gap-2">
            <div class="flex flex-col gap-2 sm:flex-row">
              <Input
                :id="field.key"
                :model-value="getImageReferenceInputValue(field.key)"
                :placeholder="field.placeholder"
                :required="field.required"
                :disabled="loading"
                :readonly="isImageDataUrl(form[field.key] ?? '')"
                :aria-invalid="imageErrors[field.key] ? true : undefined"
                inputmode="url"
                class="sm:flex-1"
                @update:model-value="value => handleImageReferenceInput(field.key, String(value))"
              />
              <input
                :ref="element => setImageInputRef(field.key, element)"
                type="file"
                class="sr-only"
                :accept="ADMIN_IMAGE_UPLOAD_ACCEPT"
                :disabled="loading"
                @change="event => handleImageFileChange(field, event)"
              >
              <div class="flex gap-2">
                <Button type="button" variant="outline" class="flex-1 sm:flex-none" :disabled="loading" @click="openImageFilePicker(field.key)">
                  <Upload class="size-4" aria-hidden="true" />
                  Pilih File
                </Button>
                <Button
                  v-if="form[field.key]"
                  type="button"
                  variant="ghost"
                  size="icon"
                  :disabled="loading"
                  :aria-label="`Hapus ${field.label}`"
                  @click="clearImageReference(field.key)"
                >
                  <X class="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <p v-if="imageErrors[field.key]" class="text-xs text-destructive">
              {{ imageErrors[field.key] }}
            </p>
          </div>

          <Input
            v-else
            :id="field.key"
            :type="field.type === 'number' ? 'number' : field.type === 'password' ? 'password' : 'text'"
            :inputmode="field.inputmode"
            :model-value="form[field.key] ?? ''"
            :placeholder="field.placeholder"
            :required="field.required"
            :disabled="loading"
            step="any"
            @update:model-value="value => updateField(field.key, String(value))"
          />
        </div>
      </form>

      <div v-else-if="mode === 'detail'" class="space-y-3">
        <div class="grid gap-3 sm:grid-cols-2">
          <div
            v-for="item in detailItems"
            :key="item.label"
            class="rounded-md border bg-muted/30 p-3"
            :class="item.description ? 'sm:col-span-2' : ''"
          >
            <p class="text-xs font-medium uppercase text-muted-foreground">
              {{ item.label }}
            </p>
            <AdminStatusBadge v-if="item.tone" :tone="item.tone" class="mt-2">
              {{ item.value }}
            </AdminStatusBadge>
            <p
              v-else
              class="mt-1 text-sm font-medium text-foreground"
              :class="item.monospace ? 'font-mono tabular-nums' : ''"
            >
              {{ item.value }}
            </p>
            <p v-if="item.description" class="mt-1 text-sm text-muted-foreground">
              {{ item.description }}
            </p>
          </div>
        </div>
        <slot name="detail" />
      </div>

      <div v-else class="flex gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm">
        <AlertTriangle class="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
        <div>
          <p class="font-medium text-foreground">
            Hapus {{ targetName || 'data ini' }}?
          </p>
          <p class="mt-1 text-muted-foreground">
            Data akan dihapus dan tabel akan diperbarui setelah proses berhasil.
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" :disabled="loading" @click="closeDialog">
          {{ mode === 'detail' ? 'Tutup' : 'Batal' }}
        </Button>
        <Button
          v-if="mode !== 'detail'"
          type="button"
          :variant="mode === 'delete' ? 'destructive' : 'default'"
          :disabled="loading"
          @click="handleSubmit"
        >
          <Spinner v-if="loading" class="size-4" />
          {{ loading ? 'Memproses...' : primaryLabel }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
