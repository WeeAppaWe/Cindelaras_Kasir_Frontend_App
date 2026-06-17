import type { ApiAuthSession, ApiRequestOptions } from '../types/api-client'
import {
  normalizeApiClientError,
  parseApiResponseEnvelope,
  unwrapApiResponse,
} from '../utils/api-response'

export function useApiClient() {
  const config = useRuntimeConfig()
  const authCookieName = String(config.public.authCookieName || 'auth_session')
  const apiPrefix = normalizePath(String(config.public.apiPrefix || '/api'))
  const baseURL = ensureApiPrefix(String(config.public.apiBaseUrl || ''), apiPrefix)
  const timeout = Number(config.public.apiTimeoutMs || 10000)

  const api = $fetch.create({
    baseURL,
    timeout,
    credentials: 'same-origin',
    onRequest({ options }) {
      const requestOptions = options as ApiRequestOptions

      if (requestOptions.auth === false) {
        return
      }

      const authCredentials = getAuthCredentials(authCookieName)

      if (!authCredentials.token && !authCredentials.apiKey) {
        return
      }

      const headers = new Headers(options.headers as HeadersInit)

      if (authCredentials.token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${authCredentials.token}`)
      }

      if (authCredentials.apiKey && !headers.has('APIKey')) {
        headers.set('APIKey', authCredentials.apiKey)
      }

      if (authCredentials.apiKey && !headers.has('x-api-key')) {
        headers.set('x-api-key', authCredentials.apiKey)
      }

      options.headers = headers
    },
  })

  async function request<TResponse, TBody = unknown>(
    endpoint: string,
    options: ApiRequestOptions<TBody> = {},
  ) {
    try {
      const payload = await api<unknown>(endpoint, options as Record<string, unknown>)

      if (options.unwrap === false) {
        return payload as TResponse
      }

      return unwrapApiResponse<TResponse>(payload)
    }
    catch (error) {
      throw normalizeApiClientError(error)
    }
  }

  async function requestEnvelope<TResponse, TBody = unknown>(
    endpoint: string,
    options: ApiRequestOptions<TBody> = {},
  ) {
    try {
      const payload = await api<unknown>(endpoint, {
        ...options,
        unwrap: false,
      } as Record<string, unknown>)

      return parseApiResponseEnvelope<TResponse>(payload)
    }
    catch (error) {
      throw normalizeApiClientError(error)
    }
  }

  async function raw<TResponse, TBody = unknown>(
    endpoint: string,
    options: ApiRequestOptions<TBody> = {},
  ) {
    try {
      return await api.raw<TResponse>(endpoint, options as Record<string, unknown>)
    }
    catch (error) {
      throw normalizeApiClientError(error)
    }
  }

  function get<TResponse>(endpoint: string, options: ApiRequestOptions = {}) {
    return request<TResponse>(endpoint, {
      ...options,
      method: 'GET',
    })
  }

  function post<TResponse, TBody = unknown>(endpoint: string, body?: TBody, options: ApiRequestOptions<TBody> = {}) {
    return request<TResponse, TBody>(endpoint, {
      ...options,
      method: 'POST',
      body,
    })
  }

  function put<TResponse, TBody = unknown>(endpoint: string, body?: TBody, options: ApiRequestOptions<TBody> = {}) {
    return request<TResponse, TBody>(endpoint, {
      ...options,
      method: 'PUT',
      body,
    })
  }

  function patch<TResponse, TBody = unknown>(endpoint: string, body?: TBody, options: ApiRequestOptions<TBody> = {}) {
    return request<TResponse, TBody>(endpoint, {
      ...options,
      method: 'PATCH',
      body,
    })
  }

  function remove<TResponse>(endpoint: string, options: ApiRequestOptions = {}) {
    return request<TResponse>(endpoint, {
      ...options,
      method: 'DELETE',
    })
  }

  return {
    baseURL,
    request,
    requestEnvelope,
    raw,
    get,
    post,
    put,
    patch,
    delete: remove,
  }
}

function ensureApiPrefix(baseUrl: string, prefix: string) {
  const normalizedBaseUrl = normalizeUrl(baseUrl)

  if (!prefix || normalizedBaseUrl.endsWith(prefix)) {
    return normalizedBaseUrl
  }

  return `${normalizedBaseUrl}${prefix}`
}

function normalizeUrl(value: string) {
  return value.trim().replace(/\/+$/g, '')
}

function normalizePath(value: string) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return ''
  }

  const path = trimmedValue.startsWith('/') ? trimmedValue : `/${trimmedValue}`

  return path === '/' ? '' : path.replace(/\/+$/g, '')
}

function getAuthCredentials(cookieName: string) {
  const session = useCookie<ApiAuthSession | string | null>(cookieName)
  const value = session.value

  if (!value) {
    return {
      token: '',
      apiKey: '',
    }
  }

  if (typeof value === 'string') {
    return {
      token: value,
      apiKey: '',
    }
  }

  return {
    token: typeof value.token === 'string' ? value.token : '',
    apiKey: typeof value.apiKey === 'string' ? value.apiKey : '',
  }
}
