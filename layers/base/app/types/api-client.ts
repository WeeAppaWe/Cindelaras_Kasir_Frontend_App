export type ApiHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type ApiQueryValue = string | number | boolean | null | undefined
export type ApiResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer'

export interface ApiAuthSession {
  token?: string | null
  apiKey?: string | null
}

export interface ApiRequestOptions<TBody = unknown> {
  method?: ApiHttpMethod
  body?: TBody
  query?: Record<string, ApiQueryValue | ApiQueryValue[]>
  headers?: HeadersInit
  credentials?: RequestCredentials
  timeout?: number
  auth?: boolean
  unwrap?: boolean
  responseType?: ApiResponseType
}
