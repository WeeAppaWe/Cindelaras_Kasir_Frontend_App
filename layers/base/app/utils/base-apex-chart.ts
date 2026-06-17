import type { BaseApexChartOptions } from '../types/base-apex-chart'

export function mergeBaseApexChartOptions(
  baseOptions: BaseApexChartOptions,
  overrideOptions?: BaseApexChartOptions,
): BaseApexChartOptions {
  if (!overrideOptions) {
    return baseOptions
  }

  return mergeRecords(
    baseOptions as Record<string, unknown>,
    overrideOptions as Record<string, unknown>,
  ) as BaseApexChartOptions
}

export function formatBaseApexChartValue(value: unknown, prefix = '', suffix = '') {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return '-'
  }

  return `${prefix}${numericValue.toLocaleString('id-ID')}${suffix}`
}

export function clampBaseApexPercentage(value: unknown) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return 0
  }

  return Math.min(100, Math.max(0, numericValue))
}

function mergeRecords(baseRecord: Record<string, unknown>, overrideRecord: Record<string, unknown>) {
  const mergedRecord: Record<string, unknown> = { ...baseRecord }

  for (const [key, overrideValue] of Object.entries(overrideRecord)) {
    const baseValue = mergedRecord[key]

    mergedRecord[key] = isPlainRecord(baseValue) && isPlainRecord(overrideValue)
      ? mergeRecords(baseValue, overrideValue)
      : overrideValue
  }

  return mergedRecord
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}
