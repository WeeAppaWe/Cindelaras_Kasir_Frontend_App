export type AdminStatusTone = 'default' | 'success' | 'warning' | 'info' | 'destructive'

export interface AdminDataMetric {
  id: string
  label: string
  value: string
  helper: string
  tone?: AdminStatusTone
}

export interface AdminDataTableColumn {
  key: string
  label: string
  align?: 'left' | 'right' | 'center'
  class?: string
}

export interface AdminDataTableCell {
  label: string
  type?: 'switch'
  description?: string
  imageUrl?: string
  imageAlt?: string
  tone?: AdminStatusTone
  monospace?: boolean
  checked?: boolean
  disabled?: boolean
}

export interface AdminDataTableRow {
  id: string
  cells: Record<string, string | number | AdminDataTableCell>
}

export interface AdminMenuCategory {
  id: string
  name: string
  description: string
  totalMenus: number
  activeMenus: number
  status: 'active' | 'inactive'
  statusLabel: string
  statusTone: AdminStatusTone
  updatedAt: string
}

export interface AdminMenuCategoryFormPayload {
  name: string
  description: string
  totalMenus: number
  activeMenus: number
  status: AdminMenuCategory['status']
}

export interface AdminMenuItem {
  id: string
  name: string
  sku: string
  category: string
  imageUrl?: string
  recipeItemCount: number
  recipeSummary: string
  totalRecipeCost: number
  totalRecipeCostLabel: string
  sellingPrice: number
  sellingPriceLabel: string
  margin: number
  marginLabel: string
  marginPercent: number
  marginPercentLabel: string
  recipeItems?: AdminMenuRecipeItem[]
  status: 'active' | 'inactive'
  statusLabel: string
  statusTone: AdminStatusTone
  updatedAt: string
}

export type AdminMenuRecipeComponentType = 'ingredient' | 'semi_finished'

export interface AdminMenuRecipeItem {
  type: AdminMenuRecipeComponentType
  itemId: string
  itemName: string
  quantity: number
  unit: string
  costPerUnit: number
  subtotal: number
}

export interface AdminMenuFormPayload {
  name: string
  sku: string
  category: string
  imageUrl?: string
  recipeItemCount: number
  recipeSummary: string
  totalRecipeCost: number
  sellingPrice: number
  recipeItems: AdminMenuRecipeItem[]
  status: AdminMenuItem['status']
}

export interface AdminUnit {
  id: string
  name: string
  symbol: string
  usage: string
  precision: string
  itemCount: number
  status: 'active' | 'inactive'
  statusLabel: string
  statusTone: AdminStatusTone
}

export interface AdminUnitFormPayload {
  name: string
  symbol: string
  usage: string
  precision: string
  itemCount: number
  status: AdminUnit['status']
}

export interface AdminIngredient {
  id: string
  name: string
  unit: string
  stock: number
  minimumStock: number
  costPerUnit: number
  stockLabel: string
  minimumStockLabel: string
  costPerUnitLabel: string
  supplierName: string
  stockStatus: 'safe' | 'low' | 'critical'
  stockStatusLabel: string
  stockStatusTone: AdminStatusTone
}

export interface AdminIngredientFormPayload {
  name: string
  unit: string
  stock: number
  minimumStock: number
  costPerUnit: number
  supplierName: string
}

export interface AdminSemiFinishedIngredient {
  id: string
  name: string
  unit: string
  stock: number
  stockLabel: string
  recipeItemCount: number
  recipeSummary: string
  recipeItems?: AdminSemiFinishedIngredientRecipeItem[]
  targetYield: number
  targetYieldLabel: string
  totalRecipeCost: number
  totalRecipeCostLabel: string
  costPerUnit: number
  costPerUnitLabel: string
  status: 'active' | 'inactive'
  statusLabel: string
  statusTone: AdminStatusTone
  updatedAt: string
}

export interface AdminSemiFinishedIngredientRecipeItem {
  itemId: string
  itemName: string
  quantity: number
  unit: string
  costPerUnit: number
  subtotal: number
}

export interface AdminSemiFinishedIngredientFormPayload {
  name: string
  unit: string
  recipeItemCount: number
  recipeSummary: string
  recipeItems: AdminSemiFinishedIngredientRecipeItem[]
  targetYield: number
  totalRecipeCost: number
  status: AdminSemiFinishedIngredient['status']
}

export type AdminStockMovementType = 'in' | 'out' | 'sale' | 'opname'

export interface AdminStockHistoryItem {
  id: string
  date: string
  ingredientName: string
  type: AdminStockMovementType
  typeLabel: string
  typeTone: AdminStatusTone
  source: string
  quantityLabel: string
  balanceLabel: string
  note: string
}

export interface AdminStockInItem {
  id: string
  date: string
  supplierName: string
  itemCount: number
  totalQuantityLabel: string
  totalCostLabel: string
  status: 'draft' | 'posted' | 'checked'
  statusLabel: string
  statusTone: AdminStatusTone
}

export interface AdminStockInFormPayload {
  id?: string
  date: string
  supplierName: string
  itemCount: number
  totalQuantityLabel: string
  totalCost: number
  status: AdminStockInItem['status']
}

export type AdminStockOpnameItemType = 'ingredient' | 'semi_finished'

export interface AdminStockOpnameItem {
  id: string
  date: string
  itemType: AdminStockOpnameItemType
  itemTypeLabel: string
  ingredientName: string
  unit: string
  systemStock: number
  physicalStock: number
  difference: number
  systemStockLabel: string
  physicalStockLabel: string
  differenceLabel: string
  differenceTone: AdminStatusTone
  note: string
  handledBy: string
  status: 'balanced' | 'adjusted'
  statusLabel: string
  statusTone: AdminStatusTone
}

export interface AdminStockOpnameFormLine {
  itemType: AdminStockOpnameItemType
  ingredientId: string
  ingredientName: string
  unit: string
  systemStock: number
  physicalStock: number
  note: string
}

export interface AdminStockOpnameFormPayload {
  lines: AdminStockOpnameFormLine[]
  handledBy: string
}

export interface AdminStockOutItem {
  id: string
  date: string
  reason: 'damaged' | 'lost' | 'operational' | 'manual'
  reasonLabel: string
  ingredientName: string
  quantityLabel: string
  handledBy: string
  status: 'draft' | 'posted'
  statusLabel: string
  statusTone: AdminStatusTone
}

export interface AdminStockOutFormPayload {
  id?: string
  date: string
  reason: AdminStockOutItem['reason']
  ingredientName: string
  quantityLabel: string
  handledBy: string
  status: AdminStockOutItem['status']
}

export interface AdminSupplier {
  id: string
  name: string
  contactName: string
  phone: string
  address: string
  itemCount: number
  status: 'active' | 'inactive'
  statusLabel: string
  statusTone: AdminStatusTone
}

export interface AdminSupplierFormPayload {
  name: string
  contactName: string
  phone: string
  address: string
  itemCount: number
  status: AdminSupplier['status']
}

export interface AdminUser {
  id: string
  name: string
  username: string
  email: string
  role: 'admin' | 'cashier'
  roleLabel: string
  status: 'active' | 'inactive'
  statusLabel: string
  statusTone: AdminStatusTone
  lastLogin: string
}

export interface AdminUserFormPayload {
  name: string
  username: string
  email: string
  role: AdminUser['role']
  status: AdminUser['status']
  lastLogin: string
}

export interface AdminCrudFieldOption {
  label: string
  value: string
}

export interface AdminCrudField {
  key: string
  label: string
  type?: 'text' | 'number' | 'password' | 'textarea' | 'select' | 'image'
  placeholder?: string
  inputmode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url'
  required?: boolean
  options?: AdminCrudFieldOption[]
  colSpan?: 'full'
}

export interface AdminCrudDetailItem {
  label: string
  value: string
  description?: string
  tone?: AdminStatusTone
  monospace?: boolean
}
