<script setup lang="ts">
import type {
  PasswordResetPayload,
  PasswordResetRequestPayload,
  PasswordResetVerifyPayload,
} from '../../types/auth'
import { ArrowLeft } from 'lucide-vue-next'
import { Alert, AlertDescription } from '#layers/base/app/components/ui/alert'
import { Button } from '#layers/base/app/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '#layers/base/app/components/ui/input-otp'
import { Label } from '#layers/base/app/components/ui/label'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import AuthPasswordInput from '../atoms/AuthPasswordInput.vue'
import AuthWhatsappInput from '../atoms/AuthWhatsappInput.vue'
import ForgotPasswordFormHeader from '../molecules/ForgotPasswordFormHeader.vue'
import ForgotPasswordStepIndicator from '../molecules/ForgotPasswordStepIndicator.vue'

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
  requestCode: [payload: PasswordResetRequestPayload]
  verifyCode: [payload: PasswordResetVerifyPayload]
  resetPassword: [payload: PasswordResetPayload]
}>()

const step = ref(1)
const whatsapp = ref('')
const code = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const validationMessage = ref('')

const displayErrorMessage = computed(() => validationMessage.value || props.errorMessage)
const headerContent = computed(() => {
  if (step.value === 1) {
    return {
      title: 'Lupa password',
      description: 'Masukkan nomor WhatsApp untuk menerima kode verifikasi.',
      stepLabel: 'Langkah 1 dari 3',
    }
  }

  if (step.value === 2) {
    return {
      title: 'Masukkan kode',
      description: 'Masukkan kode OTP 6 digit yang dikirim ke WhatsApp.',
      stepLabel: 'Langkah 2 dari 3',
    }
  }

  return {
    title: 'Buat password baru',
    description: 'Ketik password baru dua kali untuk memastikan tidak salah.',
    stepLabel: 'Langkah 3 dari 3',
  }
})

function submitWhatsapp() {
  validationMessage.value = ''

  if (!whatsapp.value) {
    validationMessage.value = 'Nomor WhatsApp wajib diisi.'
    return
  }

  emit('requestCode', { whatsapp: whatsapp.value })
}

function submitCode() {
  validationMessage.value = ''

  if (code.value.length !== 6) {
    validationMessage.value = 'Kode verifikasi harus 6 digit.'
    return
  }

  emit('verifyCode', {
    whatsapp: whatsapp.value,
    code: code.value,
  })
}

function submitPassword() {
  validationMessage.value = ''

  if (!password.value || !passwordConfirmation.value) {
    validationMessage.value = 'Password baru wajib diketik dua kali.'
    return
  }

  if (password.value.length < 6) {
    validationMessage.value = 'Password minimal 6 karakter.'
    return
  }

  if (password.value !== passwordConfirmation.value) {
    validationMessage.value = 'Konfirmasi password tidak sama.'
    return
  }

  emit('resetPassword', {
    whatsapp: whatsapp.value,
    code: code.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
  })
}

function goBack() {
  validationMessage.value = ''

  if (step.value > 1) {
    step.value -= 1
  }
}

function goToCodeStep() {
  step.value = 2
}

function goToPasswordStep() {
  step.value = 3
}

defineExpose({
  goToCodeStep,
  goToPasswordStep,
})
</script>

<template>
  <div class="space-y-6">
    <ForgotPasswordStepIndicator :current-step="step" />
    <ForgotPasswordFormHeader v-bind="headerContent" />

    <Alert v-if="displayErrorMessage" variant="destructive">
      <AlertDescription>
        {{ displayErrorMessage }}
      </AlertDescription>
    </Alert>

    <Alert v-else-if="successMessage">
      <AlertDescription>
        {{ successMessage }}
      </AlertDescription>
    </Alert>

    <form v-if="step === 1" class="space-y-5" :aria-busy="props.isSubmitting" @submit.prevent="submitWhatsapp">
      <div class="space-y-2">
        <Label for="whatsapp">Nomor WhatsApp</Label>
        <AuthWhatsappInput id="whatsapp" v-model="whatsapp" :disabled="props.isSubmitting" />
      </div>

      <Button type="submit" class="h-11 w-full" :disabled="isSubmitting">
        <Spinner v-if="isSubmitting" class="size-4" />
        {{ isSubmitting ? 'Mengirim...' : 'Kirim kode' }}
      </Button>
    </form>

    <form v-else-if="step === 2" class="space-y-5" :aria-busy="props.isSubmitting" @submit.prevent="submitCode">
      <div class="space-y-2">
        <Label for="reset-code">Kode verifikasi</Label>
        <InputOTP id="reset-code" v-model="code" :maxlength="6" :disabled="props.isSubmitting">
          <InputOTPGroup>
            <InputOTPSlot v-for="index in 6" :key="index" :index="index - 1" class="h-11 w-11" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div class="flex gap-2">
        <Button type="button" variant="outline" size="icon-lg" :disabled="props.isSubmitting" @click="goBack">
          <ArrowLeft class="size-4" />
        </Button>
        <Button type="submit" class="h-11 flex-1" :disabled="isSubmitting">
          <Spinner v-if="isSubmitting" class="size-4" />
          {{ isSubmitting ? 'Memverifikasi...' : 'Verifikasi' }}
        </Button>
      </div>
    </form>

    <form v-else class="space-y-5" :aria-busy="props.isSubmitting" @submit.prevent="submitPassword">
      <div class="space-y-2">
        <Label for="new-password">Password baru</Label>
        <AuthPasswordInput
          id="new-password"
          v-model="password"
          autocomplete="new-password"
          placeholder="Masukkan password baru"
          :disabled="props.isSubmitting"
        />
      </div>

      <div class="space-y-2">
        <Label for="password-confirmation">Ketik ulang password</Label>
        <AuthPasswordInput
          id="password-confirmation"
          v-model="passwordConfirmation"
          autocomplete="new-password"
          placeholder="Ketik ulang password baru"
          :disabled="props.isSubmitting"
        />
      </div>

      <div class="flex gap-2">
        <Button type="button" variant="outline" size="icon-lg" :disabled="props.isSubmitting" @click="goBack">
          <ArrowLeft class="size-4" />
        </Button>
        <Button type="submit" class="h-11 flex-1" :disabled="isSubmitting">
          <Spinner v-if="isSubmitting" class="size-4" />
          {{ isSubmitting ? 'Menyimpan...' : 'Simpan password' }}
        </Button>
      </div>
    </form>

    <div class="text-center">
      <NuxtLink to="/login" class="text-sm font-medium text-primary underline-offset-4 hover:underline">
        Kembali ke login
      </NuxtLink>
    </div>
  </div>
</template>
