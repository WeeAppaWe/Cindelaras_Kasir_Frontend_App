import type {
  AuthApiUser,
  AuthSession,
  AuthUser,
  LoginFormPayload,
  PasswordResetPayload,
  PasswordResetRequestPayload,
  PasswordResetVerifyPayload,
} from '../types/auth'
import { useAuthApi } from '../services/auth-api'

export function useAuth() {
  const config = useRuntimeConfig()
  const authCookieName = String(config.public.authCookieName || 'auth_session')
  const authApi = useAuthApi()
  const session = useCookie<AuthSession | null>(authCookieName, {
    default: () => null,
    path: '/',
    sameSite: 'lax',
  })

  const isLoading = useState('auth:is-loading', () => false)
  const errorMessage = useState('auth:error-message', () => '')
  const resetWhatsapp = useState('auth:reset-whatsapp', () => '')
  const resetCodeVerified = useState('auth:reset-code-verified', () => false)
  const resetToken = useState('auth:reset-token', () => '')
  const resetTokenExpiresAt = useState('auth:reset-token-expires-at', () => 0)

  if (session.value && session.value.expiresAt <= Date.now()) {
    session.value = null
  }

  const user = computed(() => session.value?.user ?? null)
  const isAuthenticated = computed(() => Boolean(session.value?.token && user.value))

  const defaultAuthenticatedPath = computed(() => {
    return getDefaultAuthenticatedPath(user.value?.role)
  })

  async function login(payload: LoginFormPayload) {
    errorMessage.value = ''
    isLoading.value = true

    try {
      const result = await authApi.login({
        username: payload.username.trim(),
        password: payload.password,
      })
      const ttl = Math.max(result.token.expires_in, 1) * 1000
      const nextSession: AuthSession = {
        token: result.token.access_token,
        apiKey: result.token.api_key,
        tokenType: result.token.token_type,
        user: normalizeAuthUser(result.user),
        expiresAt: Date.now() + ttl,
      }

      session.value = nextSession
      return nextSession
    }
    catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Login gagal.'
      return null
    }
    finally {
      isLoading.value = false
    }
  }

  async function logout() {
    errorMessage.value = ''

    try {
      if (session.value?.token) {
        await authApi.logout()
      }
    }
    catch {
      // Client-side logout should still clear local session when the remote session is already invalid.
    }
    finally {
      session.value = null
      await navigateTo('/login')
    }
  }

  async function requestPasswordReset(payload: PasswordResetRequestPayload) {
    errorMessage.value = ''
    isLoading.value = true

    try {
      if (!isValidWhatsAppNumber(payload.whatsapp)) {
        throw new Error('Nomor WhatsApp tidak valid.')
      }

      const normalizedWhatsapp = normalizeWhatsAppNumber(payload.whatsapp)
      await authApi.requestPasswordResetOtp({
        phone_number: normalizedWhatsapp,
      })

      resetWhatsapp.value = normalizedWhatsapp
      resetCodeVerified.value = false
      resetToken.value = ''
      resetTokenExpiresAt.value = 0
      return true
    }
    catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Gagal mengirim kode.'
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  async function verifyPasswordResetCode(payload: PasswordResetVerifyPayload) {
    errorMessage.value = ''
    isLoading.value = true

    try {
      if (normalizeWhatsAppNumber(payload.whatsapp) !== resetWhatsapp.value) {
        throw new Error('Nomor WhatsApp tidak sesuai.')
      }

      if (!/^\d{6}$/.test(payload.code)) {
        throw new Error('Kode verifikasi harus 6 digit.')
      }

      const result = await authApi.verifyPasswordResetOtp({
        phone_number: resetWhatsapp.value,
        otp: payload.code,
      })

      resetCodeVerified.value = true
      resetToken.value = result.reset_token
      resetTokenExpiresAt.value = Date.now() + Math.max(result.expires_in ?? 1, 1) * 1000
      return true
    }
    catch (error) {
      resetCodeVerified.value = false
      resetToken.value = ''
      resetTokenExpiresAt.value = 0
      errorMessage.value = error instanceof Error ? error.message : 'Kode tidak valid.'
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  async function resetPassword(payload: PasswordResetPayload) {
    errorMessage.value = ''
    isLoading.value = true

    try {
      const normalizedWhatsapp = normalizeWhatsAppNumber(payload.whatsapp)

      if (!resetCodeVerified.value || normalizedWhatsapp !== resetWhatsapp.value || !resetToken.value) {
        throw new Error('Kode verifikasi belum valid.')
      }

      if (resetTokenExpiresAt.value <= Date.now()) {
        throw new Error('Token reset password sudah kedaluwarsa.')
      }

      if (payload.password.length < 6) {
        throw new Error('Kata sandi minimal 6 karakter.')
      }

      if (payload.password !== payload.passwordConfirmation) {
        throw new Error('Konfirmasi kata sandi tidak sama.')
      }

      await authApi.resetPassword({
        phone_number: normalizedWhatsapp,
        reset_token: resetToken.value,
        password: payload.password,
        confirm_password: payload.passwordConfirmation,
      })

      resetWhatsapp.value = ''
      resetCodeVerified.value = false
      resetToken.value = ''
      resetTokenExpiresAt.value = 0
      return true
    }
    catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Gagal membuat kata sandi baru.'
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    session,
    user,
    isLoading,
    errorMessage,
    isAuthenticated,
    defaultAuthenticatedPath,
    resetWhatsapp,
    resetCodeVerified,
    resetToken,
    resetTokenExpiresAt,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    verifyPasswordResetCode,
  }
}

export function getDefaultAuthenticatedPath(role?: AuthUser['role']) {
  if (role === 'admin') {
    return '/admin'
  }

  if (role === 'cashier') {
    return '/cashier'
  }

  return '/'
}

function normalizeWhatsAppNumber(value: string) {
  return value.replace(/[^\d+]/g, '')
}

function isValidWhatsAppNumber(value: string) {
  return /^(?:\+?62|0)8\d{8,12}$/.test(normalizeWhatsAppNumber(value))
}

function normalizeAuthUser(user: AuthApiUser): AuthUser {
  return {
    id: user.user_id,
    name: user.name,
    username: user.username,
    role: normalizeAuthRole(user.role.name),
    status: user.status.name,
  }
}

function normalizeAuthRole(role: string): AuthUser['role'] {
  const normalizedRole = role.toUpperCase()

  if (normalizedRole === 'ADMIN') {
    return 'admin'
  }

  if (normalizedRole === 'CASHIER') {
    return 'cashier'
  }

  return 'unknown'
}
