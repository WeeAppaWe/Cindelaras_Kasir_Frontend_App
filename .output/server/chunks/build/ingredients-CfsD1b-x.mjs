import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, isRef, createTextVNode, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { Plus, Boxes, PackageCheck, WalletCards, AlertTriangle } from 'lucide-vue-next';
import { _ as _sfc_main$1 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminCrudDialog } from './AdminCrudDialog-GXCLLFMD.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminRawIngredientApi } from './useAdminRawIngredientApi-ru1YQE4X.mjs';
import { u as useAdminActionFeedback } from './useAdminActionFeedback-BRkOE1ij.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './Spinner-nalFRPxS.mjs';
import './index-DSBdqIS4.mjs';
import './DialogTrigger-B5C6UhMx.mjs';
import './Textarea-DYkcGDV8.mjs';
import './image-upload-BN8fXv4v.mjs';
import './PaginationPrevious-DSL0-rZ8.mjs';
import './Skeleton-CQWwuiK0.mjs';
import './api-endpoints-BXkjOpII.mjs';
import 'vue-sonner';

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
function mapAdminRawIngredientRecordToViewItem(record) {
  const stockQty = toNumber(record.stock_qty);
  const minStock = toNumber(record.min_stock);
  const avgCost = toNumber(record.avg_cost);
  const status = getStockStatus(stockQty, minStock);
  const unitName = record.unit?.name?.trim() || "-";
  const inventoryValue = Math.round(stockQty * avgCost);
  return {
    id: record.ingredient_id,
    name: record.name,
    type: record.type,
    unitId: record.unit?.unit_measure_id ?? "",
    unitName,
    stockQty,
    minStock,
    avgCost,
    stockLabel: `${formatNumber(stockQty)} ${unitName}`,
    minStockLabel: `${formatNumber(minStock)} ${unitName}`,
    avgCostLabel: formatCurrency(avgCost),
    inventoryValue,
    inventoryValueLabel: formatCurrency(inventoryValue),
    statusLabel: status.label,
    statusTone: status.tone,
    statusKey: status.key,
    createdAt: formatAdminIngredientDateTime(record.created_at),
    updatedAt: formatAdminIngredientDateTime(record.updated_at),
    hasBeenUpdated: Boolean(record.updated_at)
  };
}
function createAdminRawIngredientCreatePayload(payload) {
  return {
    name: payload.name.trim(),
    unit_id: payload.unitId,
    stock_qty: payload.stockQty,
    min_stock: payload.minStock,
    avg_cost: payload.avgCost
  };
}
function createAdminRawIngredientUpdatePayload(payload) {
  return {
    name: payload.name.trim(),
    unit_id: payload.unitId,
    min_stock: payload.minStock,
    avg_cost: payload.avgCost
  };
}
function getAdminRawIngredientValidationMessage(payload) {
  const name = payload.name.trim();
  if (!name) {
    return "Nama bahan baku wajib diisi.";
  }
  if (name.length < 2) {
    return "Nama bahan baku minimal 2 karakter.";
  }
  if (name.length > 100) {
    return "Nama bahan baku maksimal 100 karakter.";
  }
  if (!payload.unitId) {
    return "Satuan wajib dipilih.";
  }
  if (!Number.isFinite(payload.stockQty) || payload.stockQty < 0) {
    return "Stok awal harus 0 atau lebih.";
  }
  if (!Number.isFinite(payload.minStock) || payload.minStock < 0) {
    return "Stok minimum harus 0 atau lebih.";
  }
  if (!Number.isFinite(payload.avgCost) || payload.avgCost < 0) {
    return "Harga rata-rata harus 0 atau lebih.";
  }
  return "";
}
function formatAdminIngredientDateTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateFormatter.format(date);
}
function formatAdminIngredientCurrency(value) {
  return formatCurrency(value);
}
function getStockStatus(stockQty, minStock) {
  if (stockQty <= 0 && minStock > 0) {
    return {
      key: "critical",
      label: "Kritis",
      tone: "destructive"
    };
  }
  if (stockQty <= minStock) {
    return {
      key: "low",
      label: "Menipis",
      tone: "warning"
    };
  }
  return {
    key: "safe",
    label: "Aman",
    tone: "success"
  };
}
function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
function formatCurrency(value) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0).replace(/\s/g, "");
}
function formatNumber(value) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ingredients",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Bahan Baku"
    });
    const adminRawIngredientApi = useAdminRawIngredientApi();
    const { runAdminAction } = useAdminActionFeedback();
    const search = ref("");
    const stockFilter = ref("all");
    const unitFilter = ref("all");
    const isLoading = ref(false);
    const isCrudLoading = ref(false);
    const isCrudDialogOpen = ref(false);
    const crudMode = ref("detail");
    const loadError = ref("");
    const formError = ref("");
    const totalRecordCount = ref(0);
    const lowStockCount = ref(0);
    const rawIngredients = ref([]);
    const unitOptions = ref([]);
    const selectedIngredient = ref(null);
    const selectedIngredientDetail = ref(null);
    const crudForm = ref(createIngredientForm());
    let searchTimer = null;
    let ingredientRequestId = 0;
    const hasSearch = computed(() => Boolean(search.value.trim()));
    const canMutate = computed(() => unitOptions.value.length > 0);
    const visibleIngredients = computed(() => {
      if (stockFilter.value === "all") {
        return rawIngredients.value;
      }
      return rawIngredients.value.filter((item) => item.statusKey === stockFilter.value);
    });
    const visibleRecordCount = computed(() => stockFilter.value === "all" ? totalRecordCount.value : visibleIngredients.value.length);
    const inventoryValue = computed(() => visibleIngredients.value.reduce((total, item) => total + item.inventoryValue, 0));
    const safeStockCount = computed(() => rawIngredients.value.filter((item) => item.statusKey === "safe").length);
    const attentionStockCount = computed(() => rawIngredients.value.filter((item) => item.statusKey !== "safe").length);
    const ingredientFields = computed(() => {
      const fields = [
        {
          key: "name",
          label: "Nama Bahan",
          placeholder: "Contoh: Gula Pasir",
          required: true,
          colSpan: "full"
        },
        {
          key: "unitId",
          label: "Satuan",
          type: "select",
          required: true,
          options: unitOptions.value.map((unit) => ({ label: unit.name, value: unit.id }))
        }
      ];
      if (crudMode.value === "create") {
        fields.push({
          key: "stockQty",
          label: "Stok Awal",
          type: "number",
          inputmode: "decimal",
          required: true
        });
      }
      fields.push(
        {
          key: "minStock",
          label: "Stok Minimum",
          type: "number",
          inputmode: "decimal",
          required: true
        },
        {
          key: "avgCost",
          label: "Harga Rata-Rata",
          type: "number",
          inputmode: "decimal",
          required: true
        }
      );
      return fields;
    });
    const metrics = computed(() => [
      {
        id: "total",
        label: "Total Bahan",
        value: String(visibleRecordCount.value),
        helper: hasSearch.value || unitFilter.value !== "all" || stockFilter.value !== "all" ? "Sesuai filter aktif" : "Bahan baku aktif",
        tone: "info"
      },
      {
        id: "safe",
        label: "Stok Aman",
        value: String(safeStockCount.value),
        helper: "Di atas minimum",
        tone: "success"
      },
      {
        id: "attention",
        label: "Perlu Restock",
        value: String(lowStockCount.value || attentionStockCount.value),
        helper: "Stok <= minimum",
        tone: (lowStockCount.value || attentionStockCount.value) > 0 ? "warning" : "default"
      },
      {
        id: "value",
        label: "Nilai Stok",
        value: formatAdminIngredientCurrency(inventoryValue.value),
        helper: "Stok x avg cost",
        tone: "default"
      }
    ]);
    const columns = [
      { key: "name", label: "Bahan", class: "min-w-64" },
      { key: "stock", label: "Stok", align: "right" },
      { key: "minimumStock", label: "Minimum", align: "right" },
      { key: "avgCost", label: "Harga Rata-rata", align: "right" },
      { key: "inventoryValue", label: "Nilai Stok", align: "right" },
      { key: "status", label: "Status" }
    ];
    const rows = computed(() => visibleIngredients.value.map((item) => ({
      id: item.id,
      cells: {
        name: {
          label: item.name,
          description: `Satuan ${item.unitName}`
        },
        stock: {
          label: item.stockLabel,
          monospace: true
        },
        minimumStock: {
          label: item.minStockLabel,
          monospace: true
        },
        avgCost: {
          label: item.avgCostLabel,
          monospace: true
        },
        inventoryValue: {
          label: item.inventoryValueLabel,
          monospace: true
        },
        status: {
          label: item.statusLabel,
          tone: item.statusTone
        }
      }
    })));
    const dialogTitle = computed(() => {
      if (crudMode.value === "create") {
        return "Tambah Bahan Baku";
      }
      if (crudMode.value === "edit") {
        return "Ubah Bahan Baku";
      }
      if (crudMode.value === "delete") {
        return "Hapus Bahan Baku";
      }
      return "Detail Bahan Baku";
    });
    const dialogDescription = computed(() => {
      if (crudMode.value === "delete") {
        return "Bahan baku akan dihapus secara soft delete oleh backend.";
      }
      if (crudMode.value === "detail") {
        return isCrudLoading.value ? "Memuat detail bahan baku..." : "Informasi bahan baku yang tercatat di backend.";
      }
      if (crudMode.value === "edit") {
        return "Stok aktual tidak diubah dari form ini. Perubahan stok dilakukan melalui stok masuk atau stok opname.";
      }
      return "Stok awal hanya dipakai saat membuat bahan baku baru.";
    });
    const detailItems = computed(() => {
      const item = selectedIngredientDetail.value ?? selectedIngredient.value;
      if (!item) {
        return [];
      }
      return [
        { label: "Nama Bahan", value: item.name },
        { label: "Satuan", value: item.unitName },
        { label: "Stok Saat Ini", value: item.stockLabel },
        { label: "Stok Minimum", value: item.minStockLabel },
        { label: "Harga Rata-rata", value: item.avgCostLabel, monospace: true },
        { label: "Nilai Stok", value: item.inventoryValueLabel, monospace: true },
        { label: "Status Stok", value: item.statusLabel, tone: item.statusTone },
        { label: "Dibuat", value: item.createdAt },
        { label: "Diperbarui", value: item.updatedAt, description: item.hasBeenUpdated ? "Perubahan terakhir dari backend." : "Belum pernah diperbarui." }
      ];
    });
    watch([search, stockFilter, unitFilter], () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      searchTimer = setTimeout(() => {
        loadRawIngredients();
      }, 300);
    });
    watch(crudForm, () => {
      formError.value = "";
    }, { deep: true });
    async function loadRawIngredients() {
      const requestId = ++ingredientRequestId;
      isLoading.value = true;
      loadError.value = "";
      try {
        const result = await adminRawIngredientApi.getRawIngredients({
          batch: 1,
          size: 100,
          search: search.value.trim() || void 0,
          unit_id: unitFilter.value === "all" ? void 0 : unitFilter.value,
          low_stock: stockFilter.value === "low" || stockFilter.value === "critical" ? true : void 0
        });
        const records = Array.isArray(result.records) ? result.records : [];
        if (requestId !== ingredientRequestId) {
          return;
        }
        rawIngredients.value = records.map(mapAdminRawIngredientRecordToViewItem);
        totalRecordCount.value = result.page?.total_record_count ?? records.length;
      } catch (error) {
        if (requestId !== ingredientRequestId) {
          return;
        }
        loadError.value = getErrorMessage(error, "Gagal memuat daftar bahan baku.");
        rawIngredients.value = [];
        totalRecordCount.value = 0;
      } finally {
        if (requestId === ingredientRequestId) {
          isLoading.value = false;
        }
      }
    }
    async function loadLowStockCount() {
      try {
        const result = await adminRawIngredientApi.getLowStockRawIngredients();
        lowStockCount.value = Number(result.total_count ?? 0);
      } catch {
        lowStockCount.value = 0;
      }
    }
    function createIngredientForm(item) {
      return {
        name: item?.name ?? "",
        unitId: item?.unitId || unitOptions.value[0]?.id || "",
        stockQty: String(item?.stockQty ?? 0),
        minStock: String(item?.minStock ?? 0),
        avgCost: String(item?.avgCost ?? 0)
      };
    }
    function createIngredientPayload() {
      const payload = {
        name: (crudForm.value.name ?? "").trim(),
        unitId: crudForm.value.unitId ?? "",
        stockQty: toNumber2(crudForm.value.stockQty),
        minStock: toNumber2(crudForm.value.minStock),
        avgCost: toNumber2(crudForm.value.avgCost)
      };
      const validationMessage = getAdminRawIngredientValidationMessage(payload);
      if (validationMessage) {
        formError.value = validationMessage;
        return null;
      }
      return payload;
    }
    function findIngredient(id) {
      return rawIngredients.value.find((item) => item.id === id) ?? null;
    }
    function openCreateDialog() {
      selectedIngredient.value = null;
      selectedIngredientDetail.value = null;
      formError.value = "";
      crudMode.value = "create";
      crudForm.value = createIngredientForm();
      isCrudDialogOpen.value = true;
    }
    async function openDetailDialog(id) {
      const item = findIngredient(id);
      if (!item) {
        return;
      }
      selectedIngredient.value = item;
      selectedIngredientDetail.value = item;
      formError.value = "";
      crudMode.value = "detail";
      isCrudDialogOpen.value = true;
      isCrudLoading.value = true;
      try {
        const detail = await adminRawIngredientApi.getRawIngredientDetail(id);
        selectedIngredientDetail.value = mapAdminRawIngredientRecordToViewItem(detail);
      } catch {
        selectedIngredientDetail.value = item;
      } finally {
        isCrudLoading.value = false;
      }
    }
    function openEditDialog(id) {
      const item = findIngredient(id);
      if (!item) {
        return;
      }
      selectedIngredient.value = item;
      selectedIngredientDetail.value = item;
      formError.value = "";
      crudMode.value = "edit";
      crudForm.value = createIngredientForm(item);
      isCrudDialogOpen.value = true;
    }
    function openDeleteDialog(id) {
      selectedIngredient.value = findIngredient(id);
      selectedIngredientDetail.value = selectedIngredient.value;
      formError.value = "";
      crudMode.value = "delete";
      isCrudDialogOpen.value = Boolean(selectedIngredient.value);
    }
    async function handleCrudSubmit() {
      const payload = createIngredientPayload();
      if (!payload) {
        return;
      }
      const successMessage = crudMode.value === "create" ? "Bahan baku berhasil ditambahkan." : "Bahan baku berhasil diperbarui.";
      const succeeded = await runAdminAction(async () => {
        if (crudMode.value === "create") {
          await adminRawIngredientApi.createRawIngredient(createAdminRawIngredientCreatePayload(payload));
          await reloadIngredientData();
          return;
        }
        if (crudMode.value === "edit" && selectedIngredient.value) {
          await adminRawIngredientApi.updateRawIngredient(
            selectedIngredient.value.id,
            createAdminRawIngredientUpdatePayload(payload)
          );
          await reloadIngredientData();
        }
      }, {
        loading: isCrudLoading,
        successMessage,
        errorMessage: "Gagal menyimpan bahan baku."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
      }
    }
    async function handleDelete() {
      if (!selectedIngredient.value) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        await adminRawIngredientApi.deleteRawIngredient(selectedIngredient.value.id);
        await reloadIngredientData();
      }, {
        loading: isCrudLoading,
        successMessage: "Bahan baku berhasil dihapus.",
        errorMessage: "Gagal menghapus bahan baku."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
      }
    }
    async function reloadIngredientData() {
      await loadRawIngredients();
      await loadLowStockCount();
    }
    function getMetricIcon(metricId) {
      if (metricId === "total") {
        return Boxes;
      }
      if (metricId === "safe") {
        return PackageCheck;
      }
      if (metricId === "value") {
        return WalletCards;
      }
      return AlertTriangle;
    }
    function toNumber2(value) {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    function getErrorMessage(error, fallback) {
      if (error instanceof Error && error.message) {
        return error.message;
      }
      return fallback;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-full flex-col gap-3 p-3 sm:p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(AdminPageHeader, {
        title: "Bahan Baku",
        description: "Kelola bahan baku aktif, satuan ukur, stok minimum, harga rata-rata, dan notifikasi stok menipis."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan bahan baku"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(getMetricIcon(item.id)), {
                class: "size-4",
                "aria-hidden": "true"
              }, null), _parent2, _scopeId);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(getMetricIcon(item.id)), {
                  class: "size-4",
                  "aria-hidden": "true"
                }))
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="ingredient-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="ingredient-table-title" class="text-base font-semibold tracking-normal"> Daftar Bahan Baku </h2><p class="mt-1 text-sm text-muted-foreground"> Data diambil dari endpoint bahan baku utama dengan filter pencarian, satuan, dan status stok. </p></div></div>`);
      if (unref(loadError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "ingredient-search",
        "search-label": "Cari bahan baku",
        "search-placeholder": "Cari nama bahan atau satuan",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="ingredient-stock-filter" class="sr-only"${_scopeId}>Filter status stok</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "ingredient-stock-filter",
              modelValue: unref(stockFilter),
              "onUpdate:modelValue": ($event) => isRef(stockFilter) ? stockFilter.value = $event : null,
              class: "w-36",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua stok</option><option value="safe"${_scopeId2}>Aman</option><option value="low"${_scopeId2}>Menipis</option><option value="critical"${_scopeId2}>Kritis</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua stok"),
                    createVNode("option", { value: "safe" }, "Aman"),
                    createVNode("option", { value: "low" }, "Menipis"),
                    createVNode("option", { value: "critical" }, "Kritis")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="ingredient-unit-filter" class="sr-only"${_scopeId}>Filter satuan bahan</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "ingredient-unit-filter",
              modelValue: unref(unitFilter),
              "onUpdate:modelValue": ($event) => isRef(unitFilter) ? unitFilter.value = $event : null,
              class: "w-40",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua satuan</option><!--[-->`);
                  ssrRenderList(unref(unitOptions), (unit) => {
                    _push3(`<option${ssrRenderAttr("value", unit.id)}${_scopeId2}>${ssrInterpolate(unit.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua satuan"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(unitOptions), (unit) => {
                      return openBlock(), createBlock("option", {
                        key: unit.id,
                        value: unit.id
                      }, toDisplayString(unit.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("label", {
                  for: "ingredient-stock-filter",
                  class: "sr-only"
                }, "Filter status stok"),
                createVNode(unref(_sfc_main$2), {
                  id: "ingredient-stock-filter",
                  modelValue: unref(stockFilter),
                  "onUpdate:modelValue": ($event) => isRef(stockFilter) ? stockFilter.value = $event : null,
                  class: "w-36",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua stok"),
                    createVNode("option", { value: "safe" }, "Aman"),
                    createVNode("option", { value: "low" }, "Menipis"),
                    createVNode("option", { value: "critical" }, "Kritis")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "ingredient-unit-filter",
                  class: "sr-only"
                }, "Filter satuan bahan"),
                createVNode(unref(_sfc_main$2), {
                  id: "ingredient-unit-filter",
                  modelValue: unref(unitFilter),
                  "onUpdate:modelValue": ($event) => isRef(unitFilter) ? unitFilter.value = $event : null,
                  class: "w-40",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua satuan"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(unitOptions), (unit) => {
                      return openBlock(), createBlock("option", {
                        key: unit.id,
                        value: unit.id
                      }, toDisplayString(unit.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ])
            ];
          }
        }),
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              type: "button",
              size: "sm",
              disabled: unref(isLoading) || !unref(canMutate),
              onClick: openCreateDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tambah Bahan `);
                } else {
                  return [
                    createVNode(unref(Plus), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Tambah Bahan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1), {
                type: "button",
                size: "sm",
                disabled: unref(isLoading) || !unref(canMutate),
                onClick: openCreateDialog
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Tambah Bahan ")
                ]),
                _: 1
              }, 8, ["disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3">`);
      _push(ssrRenderComponent(AdminDataTable, {
        columns,
        rows: unref(rows),
        loading: unref(isLoading),
        label: "bahan baku",
        "empty-title": "Bahan baku tidak ditemukan",
        "empty-description": "Ubah kata kunci, status stok, atau filter satuan.",
        onView: openDetailDialog,
        onEdit: openEditDialog,
        onDelete: openDeleteDialog
      }, null, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(AdminCrudDialog, {
        open: unref(isCrudDialogOpen),
        "onUpdate:open": ($event) => isRef(isCrudDialogOpen) ? isCrudDialogOpen.value = $event : null,
        form: unref(crudForm),
        "onUpdate:form": ($event) => isRef(crudForm) ? crudForm.value = $event : null,
        mode: unref(crudMode),
        title: unref(dialogTitle),
        description: unref(dialogDescription),
        fields: unref(ingredientFields),
        "detail-items": unref(detailItems),
        "target-name": unref(selectedIngredient)?.name,
        loading: unref(isCrudLoading),
        "form-error": unref(formError),
        onSubmit: handleCrudSubmit,
        onDelete: handleDelete
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/ingredients.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ingredients-CfsD1b-x.mjs.map
