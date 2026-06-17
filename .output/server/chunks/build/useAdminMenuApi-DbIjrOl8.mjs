import { u as useApiClient, a as apiEndpoints } from './api-endpoints-aT5YyZ8V.mjs';

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});
const numberFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 2
});
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});
function mapAdminMenuRecordToViewItem(record) {
  const price = normalizeAdminMenuAmount(record.price);
  const cost = normalizeAdminMenuAmount(record.cost_summary?.hpp ?? record.cost);
  const profit = normalizeAdminMenuAmount(record.cost_summary?.profit ?? record.profit ?? price - cost);
  const marginPercent = normalizeAdminMenuAmount(record.cost_summary?.margin_percent ?? record.margin_percent ?? (price > 0 ? profit / price * 100 : 0));
  const recipeCount = record.recipes?.length ?? record._count?.recipes ?? 0;
  const isAvailable = Boolean(record.is_available);
  return {
    id: record.menu_id,
    name: record.name,
    categoryId: record.category?.category_id ?? "",
    categoryName: record.category?.name ?? "Tanpa kategori",
    description: record.description?.trim() || "-",
    imageUrl: record.image_url || void 0,
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
    statusLabel: isAvailable ? "Tersedia" : "Habis",
    statusTone: isAvailable ? "success" : "warning",
    createdAt: formatAdminMenuDateTime(record.created_at),
    updatedAt: formatAdminMenuDateTime(record.updated_at || record.created_at),
    recipes: record.recipes?.map(mapRecipeToFormItem)
  };
}
function createAdminMenuMutationPayload(payload, imageUrl) {
  return {
    name: payload.name,
    category_id: payload.categoryId,
    price: payload.sellingPrice,
    description: payload.description || null,
    image_url: imageUrl || null,
    is_available: payload.isAvailable
  };
}
function createAdminMenuRecipePayload(payload) {
  return {
    recipes: payload.recipeItems.map((item) => ({
      ingredient_id: item.ingredientId,
      qty_needed: item.qtyNeeded
    }))
  };
}
function normalizeAdminMenuAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}
function formatAdminMenuCurrency(value) {
  return currencyFormatter.format(value).replace(/\s/g, "");
}
function formatAdminMenuNumber(value) {
  return numberFormatter.format(value);
}
function formatAdminMenuDateTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateFormatter.format(date);
}
function mapRecipeToFormItem(recipe) {
  return {
    ingredientId: recipe.ingredient_id,
    ingredientName: recipe.ingredient_name ?? recipe.ingredient?.name ?? "",
    type: recipe.ingredient?.type ? mapIngredientType(recipe.ingredient.type) : void 0,
    qtyNeeded: normalizeAdminMenuAmount(recipe.qty_needed),
    unit: recipe.unit_name ?? recipe.ingredient?.unit?.name ?? "",
    costPerUnit: normalizeAdminMenuAmount(recipe.unit_cost ?? recipe.ingredient?.avg_cost),
    subtotal: normalizeAdminMenuAmount(recipe.subtotal)
  };
}
function summarizeRecipes(recipes, recipeCount) {
  if (recipes?.length) {
    return recipes.map((recipe) => recipe.ingredient_name ?? recipe.ingredient?.name).filter(Boolean).join(", ");
  }
  if (recipeCount > 0) {
    return `${recipeCount} bahan resep`;
  }
  return "Belum ada resep";
}
function mapIngredientType(type) {
  return type === "SEMI" ? "semi_finished" : "ingredient";
}
function useAdminMenuApi() {
  const api = useApiClient();
  async function getCategories() {
    const payload = await api.get(apiEndpoints.category.options);
    return extractApiPayload(payload);
  }
  async function getIngredientOptions() {
    const payload = await api.get(apiEndpoints.ingredient.options);
    return extractApiPayload(payload);
  }
  async function getMenus(query = {}) {
    const payload = await api.get(apiEndpoints.menu.list, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getMenuDetail(menuId) {
    const payload = await api.get(apiEndpoints.menu.detail(menuId));
    return extractApiPayload(payload);
  }
  async function createMenu(payload) {
    const result = await api.post(apiEndpoints.menu.create, payload);
    return extractApiPayload(result);
  }
  async function updateMenu(menuId, payload) {
    const result = await api.patch(apiEndpoints.menu.update(menuId), payload);
    return extractApiPayload(result);
  }
  async function toggleMenuAvailability(menuId) {
    const payload = await api.patch(apiEndpoints.menu.toggleAvailability(menuId));
    return extractApiPayload(payload);
  }
  async function deleteMenu(menuId) {
    const payload = await api.delete(apiEndpoints.menu.remove(menuId));
    return extractApiPayload(payload);
  }
  async function getMenuRecipes(menuId) {
    const payload = await api.get(apiEndpoints.menu.recipe.list(menuId));
    return extractApiPayload(payload);
  }
  async function bulkUpdateMenuRecipes(menuId, payload) {
    const result = await api.patch(
      apiEndpoints.menu.recipe.bulkUpdate(menuId),
      payload
    );
    return extractApiPayload(result);
  }
  async function uploadMenuImage(file) {
    const body = new FormData();
    body.append("image", file);
    const payload = await api.post(apiEndpoints.upload.image("menu"), body);
    return extractApiPayload(payload);
  }
  return {
    getCategories,
    getIngredientOptions,
    getMenus,
    getMenuDetail,
    createMenu,
    updateMenu,
    toggleMenuAvailability,
    deleteMenu,
    getMenuRecipes,
    bulkUpdateMenuRecipes,
    uploadMenuImage
  };
}
function normalizeQuery(query) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== void 0 && value !== null && value !== "")
  );
}
function extractApiPayload(payload) {
  if (isRecord(payload)) {
    if ("data" in payload && isDirectResponseShape(payload)) {
      return payload.data;
    }
    if ("response" in payload && isDirectResponseShape(payload)) {
      return payload.response;
    }
  }
  return payload;
}
function isDirectResponseShape(value) {
  return typeof value.code === "number" && typeof value.message === "string";
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}

export { createAdminMenuRecipePayload as a, formatAdminMenuCurrency as b, createAdminMenuMutationPayload as c, formatAdminMenuNumber as f, mapAdminMenuRecordToViewItem as m, useAdminMenuApi as u };
//# sourceMappingURL=useAdminMenuApi-DbIjrOl8.mjs.map
