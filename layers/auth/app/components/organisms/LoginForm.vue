<script setup lang="ts">
import type { LoginFormPayload } from '../../types/auth'
import { Alert, AlertDescription } from '#layers/base/app/components/ui/alert'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'
import { Label } from '#layers/base/app/components/ui/label'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import AuthPasswordInput from '../atoms/AuthPasswordInput.vue'
import LoginFormHeader from '../molecules/LoginFormHeader.vue'

const props = withDefaults(defineProps<{
  errorMessage?: string
  isSubmitting?: boolean
  successMessage?: string
}>(), {
  errorMessage: '',
  isSubmitting: false,
  successMessage: '',
})

const emit = defineEmits<{
  submit: [payload: LoginFormPayload]
}>()

const username = ref('')
const password = ref('')
const validationMessage = ref('')
const fieldErrors = reactive({
  username: '',
  password: '',
})

const FORM_MESSAGE_ID = 'login-form-message'
const USERNAME_ERROR_ID = 'username-error'
const PASSWORD_ERROR_ID = 'password-error'

const displayErrorMessage = computed(() => validationMessage.value || props.errorMessage)
const hasAuthError = computed(() => Boolean(props.errorMessage))
const isUsernameInvalid = computed(() => Boolean(fieldErrors.username || hasAuthError.value))
const isPasswordInvalid = computed(() => Boolean(fieldErrors.password || hasAuthError.value))
const usernameDescribedBy = computed(() => [
  fieldErrors.username ? USERNAME_ERROR_ID : '',
  hasAuthError.value ? FORM_MESSAGE_ID : '',
].filter(Boolean).join(' ') || undefined)
const passwordDescribedBy = computed(() => [
  fieldErrors.password ? PASSWORD_ERROR_ID : '',
  hasAuthError.value ? FORM_MESSAGE_ID : '',
].filter(Boolean).join(' ') || undefined)

function handleSubmit() {
  validationMessage.value = ''
  fieldErrors.username = ''
  fieldErrors.password = ''

  if (!username.value) {
    fieldErrors.username = 'Username wajib diisi.'
  }

  if (!password.value) {
    fieldErrors.password = 'Kata sandi wajib diisi.'
  }

  if (fieldErrors.username || fieldErrors.password) {
    validationMessage.value = 'Periksa kembali isian login.'
    return
  }

  emit('submit', {
    username: username.value,
    password: password.value,
  })
}
</script>

<template>
  <form class="space-y-6" :aria-busy="props.isSubmitting" @submit.prevent="handleSubmit">
    <LoginFormHeader />

    <Alert v-if="displayErrorMessage" :id="FORM_MESSAGE_ID" variant="destructive">
      <AlertDescription>
        {{ displayErrorMessage }}
      </AlertDescription>
    </Alert>

    <Alert v-else-if="successMessage">
      <AlertDescription>
        {{ successMessage }}
      </AlertDescription>
    </Alert>

    <div class="space-y-4">
      <div class="space-y-2">
        <Label for="username">Username</Label>
        <Input
          id="username"
          v-model="username"
          type="text"
          class="h-11"
          autocomplete="username"
          placeholder="Masukkan username"
          :aria-invalid="isUsernameInvalid || undefined"
          :aria-describedby="usernameDescribedBy"
          :disabled="props.isSubmitting"
        />
        <p v-if="fieldErrors.username" :id="USERNAME_ERROR_ID" class="text-sm text-destructive">
          {{ fieldErrors.username }}
        </p>
      </div>

      <div class="space-y-2">
        <div class="flex items-center justify-between gap-3">
          <Label for="password">Kata sandi</Label>
          <NuxtLink
            to="/forgot-password"
            class="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Lupa password?
          </NuxtLink>
        </div>
        <AuthPasswordInput
          id="password"
          v-model="password"
          :aria-invalid="isPasswordInvalid || undefined"
          :aria-describedby="passwordDescribedBy"
          :disabled="props.isSubmitting"
        />
        <p v-if="fieldErrors.password" :id="PASSWORD_ERROR_ID" class="text-sm text-destructive">
          {{ fieldErrors.password }}
        </p>
      </div>

    </div>

    <Button type="submit" class="h-11 w-full" :disabled="isSubmitting">
      <Spinner v-if="isSubmitting" class="size-4" />
      {{ isSubmitting ? 'Masuk...' : 'Masuk' }}
    </Button>
  </form>
</template>
