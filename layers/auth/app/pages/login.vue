<script setup lang="ts">
import type { AuthRole, LoginFormPayload } from '../types/auth'
import LoginForm from '../components/organisms/LoginForm.vue'

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useHead({
  title: 'Login',
})

const route = useRoute()
const { errorMessage, isLoading, login } = useAuth()
const { setFlashToast } = useFlashToast()

async function handleLogin(payload: LoginFormPayload) {
  const session = await login(payload)

  if (!session) {
    return
  }

  const defaultPath = getDefaultAuthenticatedPath(session.user.role)
  const redirectPath = typeof route.query.redirect === 'string'
    ? route.query.redirect
    : defaultPath
  const targetPath = isAllowedRedirect(redirectPath, session.user.role) ? redirectPath : defaultPath

  setFlashToast({
    type: 'success',
    title: `Login berhasil sebagai ${session.user.name}`,
    description: getLoginSuccessDescription(session.user.role),
  })

  await navigateTo(targetPath)
}

function isAllowedRedirect(path: string, role: AuthRole) {
  const defaultPath = getDefaultAuthenticatedPath(role)
  return path === defaultPath || path.startsWith(`${defaultPath}/`)
}

function getLoginSuccessDescription(role: AuthRole) {
  if (role === 'admin') {
    return 'Anda masuk ke area admin.'
  }

  if (role === 'cashier') {
    return 'Anda masuk ke area kasir.'
  }

  return 'Role akun belum dikenali oleh frontend.'
}
</script>

<template>
  <LoginForm
    :error-message="errorMessage"
    :is-submitting="isLoading"
    @submit="handleLogin"
  />
</template>
