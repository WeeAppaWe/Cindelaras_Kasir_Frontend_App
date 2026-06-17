import type { ApiPaginationPage } from '#layers/base/app/types/api-response'

export type AdminMenuAmount = number | string | null | undefined
export type AdminMenuRecipeComponentType = 'ingredient' | 'semi_finished'

export interface AdminMenuCategoryOption {
  id: string
  name: string
}

export interface AdminMenuRecipeOption {
  id: string
  name: string
  type: AdminMenuRecipeComponentType
  unit: string
  costPerUnit?: number
}

export interface AdminMenuRecipeFormItem {
  ingredientId: string
  ingredientName?: string
  type?: AdminMenuRecipeComponentType
  qtyNeeded: number
  unit?: string
  costPerUnit?: number
  subtotal?: number
}

export interface AdminMenuFormInitialValue {
  name: string
  categoryId: string
  description: string
  imageUrl?: string
  sellingPrice: number
  isAvailable: boolean
  currentCost?: number
  recipeItems: AdminMenuRecipeFormItem[]
}

export interface AdminMenuFormPayload {
  name: string
  categoryId: string
  description: string
  imageUrl?: string
  imageFile?: File | null
  sellingPrice: number
  isAvailable: boolean
  recipeItems: Array<{
    ingredientId: string
    qtyNeeded: number
  }>
}

export interface AdminMenuListQuery {
  batch?: number
  size?: number
  search?: string
  category_id?: string
  is_available?: boolean
}

export interface AdminMenuCategoryApiRecord {
  category_id: string
  name: string
  created_at?: string
  updated_at?: string | null
  _count?: {
    menus?: number
  }
}

export interface AdminMenuApiCategory {
  category_id: string
  name: string
}

export interface AdminMenuApiUnit {
  unit_measure_id: string
  name: string
}

export interface AdminMenuIngredientOptionApiRecord {
  ingredient_id: string
  name: string
  type: 'RAW' | 'SEMI' | string
  avg_cost?: AdminMenuAmount
  unit?: AdminMenuApiUnit | null
}

export interface AdminMenuApiIngredient {
  ingredient_id: string
  name: string
  type?: 'RAW' | 'SEMI' | string
  stock_qty?: AdminMenuAmount
  avg_cost?: AdminMenuAmount
  unit?: AdminMenuApiUnit | null
}

export interface AdminMenuRecipeApiRecord {
  menu_recipe_id: string
  menu_id?: string
  ingredient_id: string
  ingredient_name?: string
  qty_needed: AdminMenuAmount
  unit_name?: string
  unit_cost?: AdminMenuAmount
  subtotal?: AdminMenuAmount
  created_at?: string
  updated_at?: string | null
  ingredient?: AdminMenuApiIngredient | null
}

export interface AdminMenuApiRecord {
  menu_id: string
  name: string
  price: AdminMenuAmount
  cost?: AdminMenuAmount
  description?: string | null
  image_url?: string | null
  is_available: boolean
  created_at?: string
  updated_at?: string | null
  category?: AdminMenuApiCategory | null
  _count?: {
    recipes?: number
  }
  margin_percent?: AdminMenuAmount
  profit?: AdminMenuAmount
  recipes?: AdminMenuRecipeApiRecord[]
  cost_summary?: {
    hpp?: AdminMenuAmount
    price?: AdminMenuAmount
    margin_percent?: AdminMenuAmount
    profit?: AdminMenuAmount
  }
}

export interface AdminMenuListResponse {
  page: ApiPaginationPage
  records: AdminMenuApiRecord[]
}

export interface AdminMenuCreateRequest {
  name: string
  category_id: string
  price: number
  description?: string | null
  image_url?: string | null
  is_available: boolean
}

export type AdminMenuUpdateRequest = Partial<AdminMenuCreateRequest>

export interface AdminMenuRecipeBulkUpdateRequest {
  recipes: Array<{
    ingredient_id: string
    qty_needed: number
  }>
}

export interface AdminMenuRecipeListResponse {
  menu_id: string
  total_hpp: AdminMenuAmount
  recipes: AdminMenuRecipeApiRecord[]
}

export interface AdminMenuToggleAvailabilityResponse {
  success: boolean
  is_available: boolean
}

export interface AdminMenuDeleteResponse {
  success: boolean
  message?: string
}

export interface AdminMenuUploadImageResponse {
  filename: string
  folder: string
  path: string
  originalname: string
  mimetype: string
  size: number
  url: string
}

export interface AdminMenuViewItem {
  id: string
  name: string
  categoryId: string
  categoryName: string
  description: string
  imageUrl?: string
  recipeCount: number
  recipeSummary: string
  cost: number
  costLabel: string
  price: number
  priceLabel: string
  profit: number
  profitLabel: string
  marginPercent: number
  marginPercentLabel: string
  isAvailable: boolean
  statusLabel: string
  statusTone: 'success' | 'warning' | 'default'
  createdAt: string
  updatedAt: string
  recipes?: AdminMenuRecipeFormItem[]
}
