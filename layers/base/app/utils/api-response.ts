import type {
  ApiDataDirectResponse,
  ApiDirectResponse,
  ApiMetaData,
  ApiResponseEnvelope,
} from '../types/api-response'

const explicitErrorResponseCodes = new Set(['5505', '5542', '5574'])

export interface ApiClientErrorOptions<TData = unknown> {
  statusCode: number
  statusMessage: string
  responseCode?: string
  data?: TData
  errors?: unknown
  raw: unknown
}

export class ApiClientError<TData = unknown> extends Error {
  statusCode: number
  statusMessage: string
  responseCode?: string
  data?: TData
  errors?: unknown
  raw: unknown

  constructor(message: string, options: ApiClientErrorOptions<TData>) {
    super(message)
    this.name = 'ApiClientError'
    this.statusCode = options.statusCode
    this.statusMessage = options.statusMessage
    this.responseCode = options.responseCode
    this.data = options.data
    this.errors = options.errors
    this.raw = options.raw
  }
}

export function unwrapApiResponse<TResponse>(payload: unknown) {
  if (!isApiResponseEnvelope(payload)) {
    return payload as TResponse
  }

  assertSuccessfulApiResponse(payload)

  return payload.response as TResponse
}

export function parseApiResponseEnvelope<TResponse>(payload: unknown) {
  if (!isApiResponseEnvelope<TResponse>(payload)) {
    throw new ApiClientError('Format response API tidak valid.', {
      statusCode: 0,
      statusMessage: '',
      data: payload,
      raw: payload,
    })
  }

  assertSuccessfulApiResponse(payload)

  return payload
}

export function isApiResponseEnvelope<TResponse = unknown>(value: unknown): value is ApiResponseEnvelope<TResponse> {
  if (!isRecord(value)) {
    return false
  }

  return 'response' in value && isApiMetaData(value.metaData)
}

export function normalizeApiClientError(error: unknown) {
  if (error instanceof ApiClientError) {
    return error
  }

  const fetchError = error as {
    status?: number
    statusCode?: number
    statusMessage?: string
    message?: string
    data?: unknown
    response?: {
      status?: number
      statusText?: string
    }
  }

  if (isApiResponseEnvelope(fetchError.data)) {
    return createApiClientErrorFromEnvelope(fetchError.data, error)
  }

  if (isDirectApiResponse(fetchError.data)) {
    return new ApiClientError(fetchError.data.message, {
      statusCode: fetchError.data.code,
      statusMessage: fetchError.data.message,
      data: fetchError.data.response,
      raw: error,
    })
  }

  if (isDataDirectApiResponse(fetchError.data)) {
    return new ApiClientError(fetchError.data.message, {
      statusCode: fetchError.data.code,
      statusMessage: fetchError.data.message,
      data: fetchError.data.data,
      raw: error,
    })
  }

  const statusCode = fetchError.statusCode ?? fetchError.status ?? fetchError.response?.status ?? 0
  const statusMessage = fetchError.statusMessage ?? fetchError.response?.statusText ?? ''
  const message = getErrorMessage(fetchError.data) || fetchError.message || 'Gagal terhubung ke server.'

  return new ApiClientError(message, {
    statusCode,
    statusMessage,
    data: fetchError.data,
    errors: getErrorDetails(fetchError.data),
    raw: error,
  })
}

function assertSuccessfulApiResponse(envelope: ApiResponseEnvelope) {
  if (isSuccessfulApiResponse(envelope)) {
    return
  }

  throw createApiClientErrorFromEnvelope(envelope, envelope)
}

function isSuccessfulApiResponse(envelope: ApiResponseEnvelope) {
  const code = envelope.metaData.code
  const responseCode = envelope.metaData.response_code

  if (code < 200 || code >= 300) {
    return false
  }

  if (explicitErrorResponseCodes.has(responseCode)) {
    return false
  }

  if (code === 200) {
    return responseCode === '0000'
  }

  return true
}

function createApiClientErrorFromEnvelope(envelope: ApiResponseEnvelope, raw: unknown) {
  return new ApiClientError(envelope.metaData.message || 'Gagal memproses response API.', {
    statusCode: envelope.metaData.code,
    statusMessage: envelope.metaData.message,
    responseCode: envelope.metaData.response_code,
    data: envelope.response,
    errors: getErrorDetails(envelope.response),
    raw,
  })
}

function isApiMetaData(value: unknown): value is ApiMetaData {
  if (!isRecord(value)) {
    return false
  }

  return typeof value.message === 'string'
    && typeof value.code === 'number'
    && typeof value.response_code === 'string'
}

function isDirectApiResponse(value: unknown): value is ApiDirectResponse {
  if (!isRecord(value)) {
    return false
  }

  return typeof value.code === 'number'
    && typeof value.message === 'string'
    && 'response' in value
}

function isDataDirectApiResponse(value: unknown): value is ApiDataDirectResponse {
  if (!isRecord(value)) {
    return false
  }

  return typeof value.code === 'number'
    && typeof value.message === 'string'
    && 'data' in value
}

function getErrorMessage(value: unknown) {
  if (!isRecord(value)) {
    return ''
  }

  if (typeof value.message === 'string') {
    return value.message
  }

  return ''
}

function getErrorDetails(value: unknown) {
  if (!isRecord(value)) {
    return undefined
  }

  if ('error' in value) {
    return value.error
  }

  return undefined
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
