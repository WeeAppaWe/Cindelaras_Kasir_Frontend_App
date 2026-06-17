import type {
  AuthActionResponse,
  AuthForgotPasswordRequestOtpRequest,
  AuthLoginRequest,
  AuthLoginResponse,
  AuthResetPasswordRequest,
  AuthVerifyPasswordResetOtpRequest,
  AuthVerifyPasswordResetOtpResponse,
} from '../types/auth'

export function useAuthApi() {
  const api = useApiClient()

  function login(payload: AuthLoginRequest) {
    return requestAuthData<AuthLoginResponse>(apiEndpoints.auth.login, payload, {
      auth: false,
    })
  }

  function requestPasswordResetOtp(payload: AuthForgotPasswordRequestOtpRequest) {
    return requestAuthData<AuthActionResponse>(apiEndpoints.auth.forgotPasswordRequestOtp, payload, {
      auth: false,
    })
  }

  function verifyPasswordResetOtp(payload: AuthVerifyPasswordResetOtpRequest) {
    return requestAuthData<AuthVerifyPasswordResetOtpResponse>(apiEndpoints.auth.forgotPasswordVerifyOtp, payload, {
      auth: false,
    })
  }

  function resetPassword(payload: AuthResetPasswordRequest) {
    return requestAuthData<AuthActionResponse>(apiEndpoints.auth.forgotPasswordResetPassword, payload, {
      auth: false,
    })
  }

  function logout() {
    return requestAuthData<AuthActionResponse>(apiEndpoints.auth.logout)
  }

  function requestAuthData<TResponse>(
    endpoint: string,
    body?: unknown,
    options: { auth?: boolean } = {},
  ) {
    return api.post<TResponse, unknown>(endpoint, body, {
      auth: options.auth,
    })
  }

  return {
    login,
    logout,
    requestPasswordResetOtp,
    verifyPasswordResetOtp,
    resetPassword,
  }
}
