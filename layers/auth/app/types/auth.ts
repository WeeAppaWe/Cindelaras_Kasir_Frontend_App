export interface LoginFormPayload {
  username: string
  password: string
}

export interface PasswordResetRequestPayload {
  whatsapp: string
}

export interface PasswordResetVerifyPayload {
  whatsapp: string
  code: string
}

export interface PasswordResetPayload {
  whatsapp: string
  code: string
  password: string
  passwordConfirmation: string
}

export type AuthRole = 'admin' | 'cashier' | 'unknown'
export type AuthApiRole = 'ADMIN' | 'CASHIER' | string
export type AuthUserStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED' | string

export interface AuthUser {
  id: string
  name: string
  username: string
  email?: string
  role: AuthRole
  status?: AuthUserStatus
}

export interface AuthSession {
  token: string
  apiKey: string
  tokenType: string
  user: AuthUser
  expiresAt: number
}

export interface AuthApiToken {
  access_token: string
  api_key: string
  token_type: string
  expires_in: number
}

export interface AuthApiUser {
  user_id: string
  username: string
  name: string
  role: {
    role_id: string
    name: AuthApiRole
  }
  status: {
    user_status_id: string
    name: AuthUserStatus
  }
}

export interface AuthLoginResponse {
  token: AuthApiToken
  user: AuthApiUser
}

export interface AuthActionResponse {
  success: boolean
  message: string
  expires_in?: number
}

export interface AuthVerifyPasswordResetOtpResponse extends AuthActionResponse {
  reset_token: string
}

export interface AuthLoginRequest {
  username: string
  password: string
}

export interface AuthForgotPasswordRequestOtpRequest {
  phone_number: string
}

export interface AuthVerifyPasswordResetOtpRequest {
  phone_number: string
  otp: string
}

export interface AuthResetPasswordRequest {
  phone_number: string
  reset_token: string
  password: string
  confirm_password: string
}
