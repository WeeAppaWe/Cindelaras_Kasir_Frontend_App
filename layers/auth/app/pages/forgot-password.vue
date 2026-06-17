<script setup lang="ts">
import type {
  PasswordResetPayload,
  PasswordResetRequestPayload,
  PasswordResetVerifyPayload,
} from '../types/auth'
import ForgotPasswordForm from '../components/organisms/ForgotPasswordForm.vue'

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useHead({
  title: 'Lupa Password',
})

const {
  errorMessage,
  isLoading,
  requestPasswordReset,
  resetPassword,
  verifyPasswordResetCode,
} = useAuth()

const formRef = ref<InstanceType<typeof ForgotPasswordForm>>()
const { runAuthAction } = useAuthActionFeedback()

async function handleRequestCode(payload: PasswordResetRequestPayload) {
  const isSent = await runAuthAction(() => requestPasswordReset(payload), {
    loading: isLoading,
    successMessage: 'OTP berhasil dikirim',
    successDescription: 'Periksa WhatsApp lalu masukkan kode 6 digit.',
  })

  if (isSent) {
    formRef.value?.goToCodeStep()
  }
}

async function handleVerifyCode(payload: PasswordResetVerifyPayload) {
  const isVerified = await runAuthAction(() => verifyPasswordResetCode(payload), {
    loading: isLoading,
    successMessage: 'Kode berhasil diverifikasi',
    successDescription: 'Silakan buat password baru.',
  })

  if (isVerified) {
    formRef.value?.goToPasswordStep()
  }
}

async function handleResetPassword(payload: PasswordResetPayload) {
  const isReset = await runAuthAction(() => resetPassword(payload), {
    loading: isLoading,
    successMessage: 'Password berhasil diubah',
    successDescription: 'Silakan login dengan password baru.',
  })

  if (isReset) {
    await navigateTo('/login')
  }
}
</script>

<template>
  <ForgotPasswordForm
    ref="formRef"
    :error-message="errorMessage"
    :is-submitting="isLoading"
    @request-code="handleRequestCode"
    @reset-password="handleResetPassword"
    @verify-code="handleVerifyCode"
  />
</template>
