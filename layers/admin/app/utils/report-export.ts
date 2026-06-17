export interface AdminReportExportColumn {
  key: string
  label: string
  align?: 'left' | 'right' | 'center'
  format?: 'text' | 'number' | 'currency' | 'date' | 'datetime' | 'percent' | 'boolean'
}

export type AdminReportExportRow = Record<string, string | number | boolean | null>

export interface AdminReportExportSummary {
  label: string
  value: string | number | boolean | null
  format?: 'text' | 'number' | 'currency' | 'date' | 'datetime' | 'percent' | 'boolean'
}

export interface AdminReportExportPayload {
  title: string
  description?: string
  filename: string
  columns: AdminReportExportColumn[]
  rows: AdminReportExportRow[]
  summary?: AdminReportExportSummary[]
  period?: {
    start_date: string
    end_date: string
  }
  tableTitle?: string
  sheetName?: string
  storeName?: string
  orientation?: 'portrait' | 'landscape'
}

interface AdminReportBackendExportPayload {
  data: {
    title: string
    subtitle?: string
    generated_at: string
    period?: {
      start_date: string
      end_date: string
    }
    summaries?: AdminReportExportSummary[]
    tables: Array<{
      title?: string
      columns: Array<{
        key: string
        header: string
        align?: 'left' | 'right' | 'center'
        format?: AdminReportExportColumn['format']
      }>
      rows: AdminReportExportRow[]
      empty_message: string
    }>
  }
  options: {
    file_name: string
    store_name?: string
    page_size?: 'A4' | 'LETTER'
    orientation?: 'portrait' | 'landscape'
    sheet_name?: string
  }
}

export async function exportReportToExcel(payload: AdminReportExportPayload) {
  if (import.meta.server) {
    return
  }

  const result = await exportReportFile(
    apiEndpoints.report.export.excel,
    createBackendPayload(payload, 'excel'),
    'application/vnd.ms-excel',
    `${sanitizeFilename(payload.filename)}.xls`,
  )
  downloadBlob(result.blob, result.filename)
}

export async function exportReportToPdf(payload: AdminReportExportPayload) {
  if (import.meta.server) {
    return
  }

  const result = await exportReportFile(
    apiEndpoints.report.export.pdf,
    createBackendPayload(payload, 'pdf'),
    'application/pdf',
    `${sanitizeFilename(payload.filename)}.pdf`,
  )
  downloadBlob(result.blob, result.filename)
}

async function exportReportFile(
  endpoint: string,
  payload: AdminReportBackendExportPayload,
  fallbackType: string,
  fallbackFilename: string,
) {
  const api = useApiClient()
  const response = await api.raw<Blob, AdminReportBackendExportPayload>(endpoint, {
    method: 'POST',
    body: payload,
    responseType: 'blob',
  })
  const data = response._data
  const blob = data instanceof Blob
    ? data
    : new Blob(data === undefined ? [] : [data as BlobPart], { type: fallbackType })
  const filename = parseContentDispositionFilename(response.headers.get('Content-Disposition'))
    ?? parseContentDispositionFilename(response.headers.get('content-disposition'))
    ?? fallbackFilename

  return {
    blob,
    filename,
  }
}

function createBackendPayload(payload: AdminReportExportPayload, format: 'pdf' | 'excel'): AdminReportBackendExportPayload {
  const fileName = sanitizeFilename(payload.filename)

  return {
    data: {
      title: payload.title,
      subtitle: payload.description,
      generated_at: new Date().toISOString(),
      period: payload.period,
      summaries: payload.summary,
      tables: [
        {
          title: payload.tableTitle ?? payload.title,
          columns: payload.columns.map(column => ({
            key: column.key,
            header: column.label,
            align: column.align,
            format: column.format,
          })),
          rows: payload.rows,
          empty_message: 'Tidak ada data',
        },
      ],
    },
    options: {
      file_name: fileName,
      store_name: payload.storeName,
      page_size: format === 'pdf' ? 'A4' : undefined,
      orientation: format === 'pdf' ? payload.orientation ?? 'landscape' : undefined,
      sheet_name: format === 'excel' ? sanitizeSheetName(payload.sheetName ?? payload.title) : undefined,
    },
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function sanitizeFilename(value: string) {
  const normalizedValue = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-|-$/g, '')

  return normalizedValue || 'laporan'
}

function sanitizeSheetName(value: string) {
  const normalizedValue = value
    .trim()
    .replace(/[\\/?*[\]:]/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 31)

  return normalizedValue || 'Laporan'
}

function parseContentDispositionFilename(value: string | null) {
  if (!value) {
    return null
  }

  const utf8Match = value.match(/filename\*=UTF-8''([^;]+)/i)

  if (utf8Match?.[1]) {
    try {
      return decodeURIComponent(utf8Match[1].trim().replace(/^"|"$/g, ''))
    }
    catch {
      return utf8Match[1].trim().replace(/^"|"$/g, '')
    }
  }

  const filenameMatch = value.match(/filename="?([^";]+)"?/i)

  return filenameMatch?.[1]?.trim() || null
}
