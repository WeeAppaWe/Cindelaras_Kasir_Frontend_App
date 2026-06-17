import type { ApexOptions } from 'apexcharts'

export type BaseApexChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'scatter'
  | 'bubble'
  | 'rangeArea'
  | 'rangeBar'
  | 'candlestick'
  | 'boxPlot'
  | 'heatmap'
  | 'treemap'
  | 'radar'
  | 'pie'
  | 'donut'
  | 'polarArea'
  | 'radialBar'

export type BaseApexSeriesValue = number | null

export interface BaseApexAxisSeriesItem {
  name: string
  type?: string
  data: BaseApexSeriesValue[]
}

export type BaseApexAxisSeries = BaseApexAxisSeriesItem[]
export type BaseApexNonAxisSeries = BaseApexSeriesValue[]
export type BaseApexSeries = BaseApexAxisSeries | BaseApexNonAxisSeries
export type BaseApexChartOptions = ApexOptions

export type BaseBarChartSeries = BaseApexAxisSeriesItem

export interface BaseMixedChartSeries extends BaseApexAxisSeriesItem {
  type: 'column' | 'line' | 'area'
}
