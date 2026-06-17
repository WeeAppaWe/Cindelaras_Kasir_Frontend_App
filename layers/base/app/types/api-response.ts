export type ApiResponseCode = '0000' | '0001' | '5505' | '5542' | '5574' | string

export interface ApiMetaData {
  message: string
  code: number
  response_code: ApiResponseCode
}

export interface ApiResponseEnvelope<TResponse = unknown> {
  response: TResponse
  metaData: ApiMetaData
}

export interface ApiPaginationPage {
  total_record_count: number
  batch_number: number
  batch_size: number
  max_batch_size: number
}

export interface ApiPaginatedResponse<TRecord = unknown> {
  page: ApiPaginationPage
  records: TRecord[]
}

export interface ApiValidationFieldError {
  location?: string
  field: string
  message: string
}

export interface ApiValidationResponse {
  error: ApiValidationFieldError[] | ApiValidationFieldError | null
}

export interface ApiDirectResponse<TResponse = unknown> {
  code: number
  message: string
  response: TResponse
}

export interface ApiDataDirectResponse<TData = unknown> {
  code: number
  message: string
  data: TData
}
