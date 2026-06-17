import type {
  AdminMenuApiRecord,
  AdminMenuCategoryApiRecord,
  AdminMenuCategoryOption,
  AdminMenuCreateRequest,
  AdminMenuFormInitialValue,
  AdminMenuFormPayload,
  AdminMenuIngredientOptionApiRecord,
  AdminMenuRecipeApiRecord,
  AdminMenuRecipeComponentType,
  AdminMenuRecipeListResponse,
  AdminMenuRecipeOption,
  AdminMenuViewItem,
} from '../types/admin-menu'

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function mapAdminMenuCategoryOption(record: AdminMenuCategoryApiRecord): AdminMenuCategoryOption {
  return {
    id: record.category_id,
    name: record.name,
  }
}

export function mapAdminMenuIngredientOption(record: AdminMenuIngredientOptionApiRecord): AdminMenuRecipeOption {
  return {
    id: record.ingredient_id,
    name: record.name,
    type: mapIngredientType(record.type),
    unit: record.unit?.name ?? '-',
    costPerUnit: normalizeAdminMenuAmount(record.avg_cost),
  }
}

export function mapAdminMenuRecordToViewItem(record: AdminMenuApiRecord): AdminMenuViewItem {
  const price = normalizeAdminMenuAmount(record.price)
  const cost = normalizeAdminMenuAmount(record.cost_summary?.hpp ?? record.cost)
  const profit = normalizeAdminMenuAmount(record.cost_summary?.profit ?? record.profit ?? price - cost)
  const marginPercent = normalizeAdminMenuAmount(record.cost_summary?.margin_percent ?? record.margin_percent ?? (
    price > 0 ? (profit / price) * 100 : 0
  ))
  const recipeCount = record.recipes?.length ?? record._count?.recipes ?? 0
  const isAvailable = Boolean(record.is_available)

  return {
    id: record.menu_id,
    name: record.name,
    categoryId: record.category?.category_id ?? '',
    categoryName: record.category?.name ?? 'Tanpa kategori',
    description: record.description?.trim() || '-',
    imageUrl: record.image_url || undefined,
    recipeCount,
    recipeSummary: summarizeRecipes(record.recipes, recipeCount),
    cost,
    costLabel: formatAdminMenuCurrency(cost),
    price,
    priceLabel: formatAdminMenuCurrency(price),
    profit,
    profitLabel: formatAdminMenuCurrency(profit),
    marginPercent: Math.round(marginPercent),
    marginPercentLabel: `${formatAdminMenuNumber(Math.round(marginPercent))}% dari harga jual`,
    isAvailable,
    statusLabel: isAvailable ? 'Tersedia' : 'Habis',
    statusTone: isAvailable ? 'success' : 'warning',
    createdAt: formatAdminMenuDateTime(record.created_at),
    updatedAt: formatAdminMenuDateTime(record.updated_at || record.created_at),
    recipes: record.recipes?.map(mapRecipeToFormItem),
  }
}

export function mapAdminMenuDetailToFormInitial(
  record: AdminMenuApiRecord,
  recipeData?: AdminMenuRecipeListResponse | null,
): AdminMenuFormInitialValue {
  const recipes = recipeData?.recipes?.length ? recipeData.recipes : record.recipes ?? []

  return {
    name: record.name,
    categoryId: record.category?.category_id ?? '',
    description: record.description ?? '',
    imageUrl: record.image_url || '',
    sellingPrice: normalizeAdminMenuAmount(record.price),
    isAvailable: Boolean(record.is_available),
    currentCost: normalizeAdminMenuAmount(recipeData?.total_hpp ?? record.cost_summary?.hpp ?? record.cost),
    recipeItems: recipes.map(mapRecipeToFormItem),
  }
}

export function createAdminMenuMutationPayload(
  payload: AdminMenuFormPayload,
  imageUrl: string | null | undefined,
): AdminMenuCreateRequest {
  return {
    name: payload.name,
    category_id: payload.categoryId,
    price: payload.sellingPrice,
    description: payload.description || null,
    image_url: imageUrl || null,
    is_available: payload.isAvailable,
  }
}

export function createAdminMenuRecipePayload(payload: AdminMenuFormPayload) {
  return {
    recipes: payload.recipeItems.map(item => ({
      ingredient_id: item.ingredientId,
      qty_needed: item.qtyNeeded,
    })),
  }
}

export function normalizeAdminMenuAmount(value: unknown) {
  const amount = Number(value)

  return Number.isFinite(amount) ? amount : 0
}

export function formatAdminMenuCurrency(value: number) {
  return currencyFormatter.format(value).replace(/\s/g, '')
}

export function formatAdminMenuNumber(value: number) {
  return numberFormatter.format(value)
}

export function formatAdminMenuDateTime(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}

function mapRecipeToFormItem(recipe: AdminMenuRecipeApiRecord) {
  return {
    ingredientId: recipe.ingredient_id,
    ingredientName: recipe.ingredient_name ?? recipe.ingredient?.name ?? '',
    type: recipe.ingredient?.type ? mapIngredientType(recipe.ingredient.type) : undefined,
    qtyNeeded: normalizeAdminMenuAmount(recipe.qty_needed),
    unit: recipe.unit_name ?? recipe.ingredient?.unit?.name ?? '',
    costPerUnit: normalizeAdminMenuAmount(recipe.unit_cost ?? recipe.ingredient?.avg_cost),
    subtotal: normalizeAdminMenuAmount(recipe.subtotal),
  }
}

function summarizeRecipes(recipes: AdminMenuRecipeApiRecord[] | undefined, recipeCount: number) {
  if (recipes?.length) {
    return recipes
      .map(recipe => recipe.ingredient_name ?? recipe.ingredient?.name)
      .filter(Boolean)
      .join(', ')
  }

  if (recipeCount > 0) {
    return `${recipeCount} bahan resep`
  }

  return 'Belum ada resep'
}

function mapIngredientType(type: string): AdminMenuRecipeComponentType {
  return type === 'SEMI' ? 'semi_finished' : 'ingredient'
}
