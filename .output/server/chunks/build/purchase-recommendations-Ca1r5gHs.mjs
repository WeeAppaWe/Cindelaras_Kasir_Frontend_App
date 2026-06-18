import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, resolveDynamicComponent, isRef, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderVNode, ssrRenderClass } from 'vue/server-renderer';
import { Settings2, AlertCircle, RotateCcw, BrainCircuit, ArrowRight, RefreshCcw, CalendarRange, ClipboardList, PackageSearch, ChevronUp, ChevronDown, ShieldCheck, Boxes, WalletCards, Store } from 'lucide-vue-next';
import { _ as _sfc_main$2$1, a as _sfc_main$1$1 } from './index-rcdgmEu2.mjs';
import { _ as _sfc_main$6, a as _sfc_main$9, b as _sfc_main$1$2, c as _sfc_main$5$1, d as _sfc_main$2$2, e as _sfc_main$8, f as _sfc_main$6$1 } from './index-DSBdqIS4.mjs';
import { _ as _sfc_main$3 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1, a as _sfc_main$5 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { _ as _sfc_main$4 } from './Separator-DD0IdWG4.mjs';
import { A as AdminReportExportActions, e as exportReportToPdf, a as exportReportToExcel } from './AdminReportExportActions-ByBpbXoz.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useApiClient, a as apiEndpoints } from './api-endpoints-aT5YyZ8V.mjs';
import { u as useAdminActionFeedback } from './useAdminActionFeedback-BRkOE1ij.mjs';
import 'class-variance-authority';
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
import 'reka-ui';
import './PaginationPrevious-DSL0-rZ8.mjs';
import './Skeleton-CQWwuiK0.mjs';
import 'vue-sonner';

function useAdminSpkApi() {
  const api = useApiClient();
  async function getAnalysis(query = {}) {
    return await api.get(apiEndpoints.spk.analysis, {
      query: normalizeQuery(query)
    });
  }
  async function getSupplierOptions() {
    const payload = await api.get(apiEndpoints.supplier.list, {
      query: {
        batch: 1,
        size: 100
      }
    });
    return (payload.records ?? []).map((record) => ({
      id: record.supplier_id,
      name: record.name,
      contact: record.phone?.trim() ?? ""
    }));
  }
  return {
    getAnalysis,
    getSupplierOptions
  };
}
function normalizeQuery(query) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== void 0 && value !== null && value !== "")
  );
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "purchase-recommendations",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Rekomendasi Belanja"
    });
    const defaultParameters = {
      targetDays: "7",
      bufferPercent: "10",
      lookbackDays: "7",
      ingredientType: "all",
      supplierId: "all"
    };
    const ingredientTypeOptions = [
      { value: "all", label: "Semua bahan", description: "Bahan baku dan setengah jadi" },
      { value: "raw", label: "Bahan baku", description: "Hanya bahan mentah" },
      { value: "semi", label: "Setengah jadi", description: "Hanya bahan olahan" }
    ];
    const currencyFormatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    });
    const numberFormatter = new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 2
    });
    const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short"
    });
    useAdminSpkApi();
    const { runAdminExportAction } = useAdminActionFeedback();
    const currentView = ref("input");
    const parameters = reactive({ ...defaultParameters });
    const supplierOptions = ref([]);
    const analysis = ref(null);
    const processedQuery = ref(null);
    const orderOverrides = reactive({});
    const expandedSuppliers = reactive({});
    const search = ref("");
    const isLoadingSuppliers = ref(false);
    const supplierErrorMessage = ref("");
    const analysisErrorMessage = ref("");
    const exporting = ref(null);
    const targetDaysValue = computed(() => Number(parameters.targetDays));
    const bufferPercentValue = computed(() => Number(parameters.bufferPercent));
    const lookbackDaysValue = computed(() => Number(parameters.lookbackDays));
    const parameterErrors = computed(() => ({
      targetDays: getRangeError(targetDaysValue.value, "Target stok aman", 1, 90),
      bufferPercent: getRangeError(bufferPercentValue.value, "Cadangan stok", 0, 100, true),
      lookbackDays: getRangeError(lookbackDaysValue.value, "Histori pemakaian", 7, 90)
    }));
    const hasParameterError = computed(() => Object.values(parameterErrors.value).some(Boolean));
    computed(() => ingredientTypeOptions.find((option) => option.value === parameters.ingredientType) ?? ingredientTypeOptions[1]);
    const selectedSupplierLabel = computed(() => {
      if (parameters.supplierId === "all") {
        return "Semua pemasok";
      }
      return supplierOptions.value.find((s) => s.id === parameters.supplierId)?.name ?? "Pemasok terpilih";
    });
    const processedSupplierId = computed(() => processedQuery.value?.supplier_id ?? "all");
    const displayedItems = computed(() => {
      const items = analysis.value?.all_items ?? [];
      if (processedSupplierId.value === "all") {
        return items;
      }
      return items.filter((item) => item.supplier_id === processedSupplierId.value);
    });
    const visibleItems = computed(() => {
      const keyword = search.value.trim().toLowerCase();
      if (!keyword) {
        return displayedItems.value;
      }
      return displayedItems.value.filter((item) => {
        return [
          item.name,
          item.type,
          item.unit,
          item.supplier_name ?? "",
          formatCurrency(getItemEstimatedCost(item)),
          formatQuantity(getEffectiveSuggestedQty(item), item.unit)
        ].some((value) => value.toLowerCase().includes(keyword));
      });
    });
    const supplierContactById = computed(() => {
      const contacts = /* @__PURE__ */ new Map();
      supplierOptions.value.forEach((supplier) => contacts.set(supplier.id, supplier.contact));
      analysis.value?.by_supplier.forEach((supplier) => {
        const id = normalizeSupplierId(supplier.supplier_id);
        if (supplier.contact?.trim()) {
          contacts.set(id, supplier.contact.trim());
        }
      });
      return contacts;
    });
    const supplierDrafts = computed(() => {
      const drafts = /* @__PURE__ */ new Map();
      visibleItems.value.forEach((item) => {
        const id = normalizeSupplierId(item.supplier_id);
        const draft = drafts.get(id) ?? {
          id,
          name: item.supplier_name?.trim() || "Pemasok belum terdeteksi",
          contact: supplierContactById.value.get(id) || "-",
          items: [],
          totalEstimatedCost: 0,
          isExpanded: true
        };
        draft.items.push(item);
        draft.totalEstimatedCost += getItemEstimatedCost(item);
        drafts.set(id, draft);
      });
      return Array.from(drafts.values()).sort((a, b) => b.totalEstimatedCost - a.totalEstimatedCost);
    });
    const totalEstimatedCost = computed(
      () => displayedItems.value.reduce((total, item) => total + getItemEstimatedCost(item), 0)
    );
    const visibleEstimatedCost = computed(
      () => visibleItems.value.reduce((total, item) => total + getItemEstimatedCost(item), 0)
    );
    const analysisDateLabel = computed(() => formatDateTime(analysis.value?.analysis_date));
    const lookbackPeriodLabel = computed(() => {
      const period = analysis.value?.lookback_period;
      if (!period) return "-";
      return `${formatDate(period.start_date)} – ${formatDate(period.end_date)}`;
    });
    const resultDescription = computed(() => {
      if (!analysis.value || !processedQuery.value) {
        return "Jalankan analisa untuk menampilkan draf order pembelian per pemasok.";
      }
      const targetDays = processedQuery.value.target_days ?? analysis.value.config.target_days;
      const bufferPercent = processedQuery.value.buffer_percent ?? analysis.value.config.buffer_percent;
      const lookbackDays = processedQuery.value.lookback_days ?? analysis.value.config.lookback_days;
      const supplierLabel = processedSupplierId.value === "all" ? "semua pemasok" : supplierDrafts.value[0]?.name ?? "pemasok terpilih";
      return `${supplierLabel.charAt(0).toUpperCase() + supplierLabel.slice(1)}. Target ${formatNumber(targetDays)} hari, cadangan ${formatNumber(bufferPercent)}%, histori ${formatNumber(lookbackDays)} hari.`;
    });
    const metrics = computed(() => [
      {
        id: "analyzed",
        label: "Bahan Dianalisis",
        value: formatNumber(analysis.value?.summary.total_ingredients_analyzed ?? 0),
        helper: lookbackPeriodLabel.value,
        tone: "info"
      },
      {
        id: "restock",
        label: "Perlu Restock",
        value: formatNumber(displayedItems.value.length),
        helper: `${formatNumber(visibleItems.value.length)} tampil di tabel`,
        tone: displayedItems.value.length ? "warning" : "success"
      },
      {
        id: "cost",
        label: "Estimasi Biaya",
        value: formatCurrency(totalEstimatedCost.value),
        helper: "Mengikuti qty final",
        tone: totalEstimatedCost.value ? "info" : "default"
      },
      {
        id: "suppliers",
        label: "Pemasok",
        value: formatNumber(supplierDrafts.value.length),
        helper: analysisDateLabel.value,
        tone: "default"
      }
    ]);
    const columns = [
      { key: "ingredient", label: "Bahan" },
      { key: "supplier", label: "Pemasok" },
      { key: "usage", label: "Rata-rata/Hari", align: "right" },
      { key: "stock", label: "Stok", align: "right" },
      { key: "minimum", label: "Minimum", align: "right" },
      { key: "suggested", label: "Saran Order", align: "right" },
      { key: "estimated", label: "Estimasi", align: "right" },
      { key: "status", label: "Status" }
    ];
    const rows = computed(() => visibleItems.value.map((item) => ({
      id: item.ingredient_id,
      cells: {
        ingredient: {
          label: item.name,
          description: getIngredientTypeLabel(item.type)
        },
        supplier: {
          label: item.supplier_name?.trim() || "Belum ada pemasok",
          description: supplierContactById.value.get(normalizeSupplierId(item.supplier_id)) || "-"
        },
        usage: formatQuantity(item.wma_daily_average, item.unit),
        stock: formatQuantity(item.current_stock, item.unit),
        minimum: formatQuantity(item.min_stock, item.unit),
        suggested: {
          label: formatQuantity(getEffectiveSuggestedQty(item), item.unit),
          description: `${formatCurrency(item.avg_cost)}/unit`,
          monospace: true
        },
        estimated: {
          label: formatCurrency(getItemEstimatedCost(item)),
          monospace: true
        },
        status: {
          label: getRestockStatus(item).label,
          tone: getRestockStatus(item).tone
        }
      }
    })));
    const exportRows = computed(() => visibleItems.value.map((item) => ({
      ingredient: item.name,
      type: getIngredientTypeLabel(item.type),
      supplier: item.supplier_name?.trim() || "Belum ada pemasok",
      dailyUsage: formatQuantity(item.wma_daily_average, item.unit),
      currentStock: formatQuantity(item.current_stock, item.unit),
      minimumStock: formatQuantity(item.min_stock, item.unit),
      suggestedQty: formatQuantity(getEffectiveSuggestedQty(item), item.unit),
      unitCost: formatCurrency(item.avg_cost),
      estimatedCost: formatCurrency(getItemEstimatedCost(item)),
      status: getRestockStatus(item).label
    })));
    function handleBackToInput() {
      currentView.value = "input";
    }
    function resetParameters() {
      Object.assign(parameters, defaultParameters);
      analysisErrorMessage.value = "";
    }
    function resetOrderOverrides() {
      Object.keys(orderOverrides).forEach((key) => delete orderOverrides[key]);
    }
    function isSupplierExpanded(id) {
      return expandedSuppliers[id] !== false;
    }
    function updateSuggestedQty(itemId, value) {
      orderOverrides[itemId] = String(value);
    }
    function getOrderQuantityInputValue(item) {
      return orderOverrides[item.ingredient_id] ?? String(item.suggested_qty);
    }
    function getEffectiveSuggestedQty(item) {
      const override = orderOverrides[item.ingredient_id];
      if (override === void 0 || override.trim() === "") return item.suggested_qty;
      const value = Number(override);
      if (!Number.isFinite(value) || value < 0) return item.suggested_qty;
      return value;
    }
    function getItemEstimatedCost(item) {
      return Math.round(getEffectiveSuggestedQty(item) * item.avg_cost);
    }
    async function handleExport(format) {
      ({
        description: resultDescription.value,
        rows: exportRows.value,
        summary: [
          { label: "Bahan dianalisis", value: metrics.value[0]?.value ?? "0" },
          { label: "Perlu restock", value: formatNumber(visibleItems.value.length) },
          { label: "Pemasok", value: formatNumber(supplierDrafts.value.length) },
          { label: "Estimasi biaya", value: formatCurrency(visibleEstimatedCost.value) }
        ]
      });
      await runAdminExportAction(() => {
        if (format === "pdf") {
          exportReportToPdf();
          return;
        }
        exportReportToExcel();
      }, {
        exporting,
        format,
        successMessage: `SPK berhasil disiapkan sebagai ${format.toUpperCase()}.`,
        errorMessage: `Gagal mengekspor SPK ${format.toUpperCase()}.`
      });
    }
    function getRangeError(value, label, min, max, allowZero = false) {
      if (!Number.isFinite(value)) return `${label} harus berupa angka.`;
      if (!allowZero && value < min) return `${label} minimal ${min}.`;
      if (allowZero && value < min) return `${label} minimal ${min}.`;
      if (value > max) return `${label} maksimal ${max}.`;
      return "";
    }
    function normalizeSupplierId(value) {
      return value?.trim() || "unassigned";
    }
    function getIngredientTypeLabel(value) {
      if (value === "raw") return "Bahan baku";
      if (value === "semi") return "Bahan setengah jadi";
      return value || "-";
    }
    function getRestockStatus(item) {
      if (item.current_stock <= item.min_stock) return { label: "Prioritas", tone: "destructive" };
      if (item.suggested_qty > 0) return { label: "Perlu order", tone: "warning" };
      return { label: "Pantau", tone: "info" };
    }
    function getMetricIcon(metricId) {
      if (metricId === "analyzed") return Boxes;
      if (metricId === "restock") return PackageSearch;
      if (metricId === "cost") return WalletCards;
      return Store;
    }
    function formatCurrency(value) {
      return currencyFormatter.format(Number.isFinite(value) ? value : 0).replace(/\s/g, "");
    }
    function formatNumber(value) {
      return numberFormatter.format(Number.isFinite(value) ? value : 0);
    }
    function formatQuantity(value, unit) {
      return `${formatNumber(value)} ${unit || ""}`.trim();
    }
    function formatDateTime(value) {
      if (!value) return "-";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return dateTimeFormatter.format(date);
    }
    function formatDate(value) {
      if (!value) return "-";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(date);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-full flex-col gap-3 p-3 sm:p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(AdminPageHeader, {
        title: "Rekomendasi Belanja",
        description: "Sistem pendukung keputusan berbasis WMA untuk menghasilkan draf order pembelian berdasarkan histori pemakaian dan target stok aman."
      }, null, _parent));
      if (unref(currentView) === "input") {
        _push(`<div class="grid gap-3 lg:grid-cols-[1fr_auto]"><section class="rounded-xl border bg-card text-card-foreground shadow-xs" aria-labelledby="spk-param-title"><div class="flex items-start gap-3 border-b px-4 py-4"><span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">`);
        _push(ssrRenderComponent(unref(Settings2), {
          class: "size-4",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</span><div class="min-w-0 flex-1"><h2 id="spk-param-title" class="text-base font-semibold"> Konfigurasi Analisa </h2><p class="mt-0.5 text-sm text-muted-foreground"> Atur parameter sebelum menjalankan SPK. </p></div></div><div class="p-4"><form class="space-y-4"><div class="grid gap-3 sm:grid-cols-3"><div class="rounded-lg border bg-muted/30 p-3"><div class="mb-2 flex items-center justify-between"><label for="spk-target-days" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"> Target stok aman </label><span class="rounded-md bg-info/10 px-1.5 py-0.5 text-xs font-medium text-info">hari</span></div><div class="relative">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          id: "spk-target-days",
          modelValue: unref(parameters).targetDays,
          "onUpdate:modelValue": ($event) => unref(parameters).targetDays = $event,
          type: "number",
          min: "1",
          max: "90",
          inputmode: "numeric",
          class: "bg-background pr-12",
          "aria-invalid": unref(parameterErrors).targetDays ? true : void 0
        }, null, _parent));
        _push(`<span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">hari</span></div>`);
        if (unref(parameterErrors).targetDays) {
          _push(`<p class="mt-1.5 text-xs text-destructive">${ssrInterpolate(unref(parameterErrors).targetDays)}</p>`);
        } else {
          _push(`<p class="mt-1.5 text-xs text-muted-foreground"> Stok aman untuk ${ssrInterpolate(unref(parameters).targetDays || "?")} hari ke depan · maks 90 </p>`);
        }
        _push(`</div><div class="rounded-lg border bg-muted/30 p-3"><div class="mb-2 flex items-center justify-between"><label for="spk-buffer-percent" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"> Cadangan stok </label><span class="rounded-md bg-warning/10 px-1.5 py-0.5 text-xs font-medium text-warning-foreground">%</span></div><div class="relative">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          id: "spk-buffer-percent",
          modelValue: unref(parameters).bufferPercent,
          "onUpdate:modelValue": ($event) => unref(parameters).bufferPercent = $event,
          type: "number",
          min: "0",
          max: "100",
          inputmode: "numeric",
          class: "bg-background pr-8",
          "aria-invalid": unref(parameterErrors).bufferPercent ? true : void 0
        }, null, _parent));
        _push(`<span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">%</span></div>`);
        if (unref(parameterErrors).bufferPercent) {
          _push(`<p class="mt-1.5 text-xs text-destructive">${ssrInterpolate(unref(parameterErrors).bufferPercent)}</p>`);
        } else {
          _push(`<p class="mt-1.5 text-xs text-muted-foreground"> Tambahan ${ssrInterpolate(unref(parameters).bufferPercent || "0")}% antisipasi lonjakan · maks 100% </p>`);
        }
        _push(`</div><div class="rounded-lg border bg-muted/30 p-3"><div class="mb-2 flex items-center justify-between"><label for="spk-lookback-days" class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"> Histori pemakaian </label><span class="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">hari</span></div><div class="relative">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          id: "spk-lookback-days",
          modelValue: unref(parameters).lookbackDays,
          "onUpdate:modelValue": ($event) => unref(parameters).lookbackDays = $event,
          type: "number",
          min: "7",
          max: "90",
          inputmode: "numeric",
          class: "bg-background pr-12",
          "aria-invalid": unref(parameterErrors).lookbackDays ? true : void 0
        }, null, _parent));
        _push(`<span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">hari</span></div>`);
        if (unref(parameterErrors).lookbackDays) {
          _push(`<p class="mt-1.5 text-xs text-destructive">${ssrInterpolate(unref(parameterErrors).lookbackDays)}</p>`);
        } else {
          _push(`<p class="mt-1.5 text-xs text-muted-foreground"> Basis WMA dari ${ssrInterpolate(unref(parameters).lookbackDays || "?")} hari terakhir · min 7, maks 90 </p>`);
        }
        _push(`</div></div><div class="grid gap-3"><div class="rounded-lg border bg-muted/30 p-3"><label for="spk-supplier" class="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"> Pemasok </label>`);
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          id: "spk-supplier",
          modelValue: unref(parameters).supplierId,
          "onUpdate:modelValue": ($event) => unref(parameters).supplierId = $event,
          class: "w-full bg-background",
          disabled: unref(isLoadingSuppliers)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<option value="all"${_scopeId}>Semua pemasok</option><!--[-->`);
              ssrRenderList(unref(supplierOptions), (supplier) => {
                _push2(`<option${ssrRenderAttr("value", supplier.id)}${_scopeId}>${ssrInterpolate(supplier.name)}</option>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                createVNode("option", { value: "all" }, "Semua pemasok"),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(supplierOptions), (supplier) => {
                  return openBlock(), createBlock("option", {
                    key: supplier.id,
                    value: supplier.id
                  }, toDisplayString(supplier.name), 9, ["value"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<p class="mt-1.5 text-xs text-muted-foreground">${ssrInterpolate(unref(isLoadingSuppliers) ? "Memuat pemasok..." : unref(selectedSupplierLabel))}</p></div></div>`);
        if (unref(supplierErrorMessage)) {
          _push(ssrRenderComponent(unref(_sfc_main$2$1), { variant: "destructive" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(AlertCircle), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(_sfc_main$1$1), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(supplierErrorMessage))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(supplierErrorMessage)), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(AlertCircle), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createVNode(unref(_sfc_main$1$1), null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(supplierErrorMessage)), 1)
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(analysisErrorMessage)) {
          _push(ssrRenderComponent(unref(_sfc_main$2$1), { variant: "destructive" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(AlertCircle), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(unref(_sfc_main$1$1), null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(analysisErrorMessage))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(analysisErrorMessage)), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(AlertCircle), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createVNode(unref(_sfc_main$1$1), null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(analysisErrorMessage)), 1)
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p class="text-xs text-muted-foreground"> Klik &quot;Jalankan Analisa&quot; untuk memproses data dengan parameter di atas. </p><div class="flex gap-2">`);
        _push(ssrRenderComponent(unref(_sfc_main$3), {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: resetParameters
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(RotateCcw), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(` Reset `);
            } else {
              return [
                createVNode(unref(RotateCcw), {
                  class: "size-4",
                  "aria-hidden": "true"
                }),
                createTextVNode(" Reset ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$3), {
          type: "submit",
          disabled: unref(hasParameterError)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(BrainCircuit), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(` Jalankan Analisa `);
              _push2(ssrRenderComponent(unref(ArrowRight), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(BrainCircuit), {
                  class: "size-4",
                  "aria-hidden": "true"
                }),
                createTextVNode(" Jalankan Analisa "),
                createVNode(unref(ArrowRight), {
                  class: "size-4",
                  "aria-hidden": "true"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></form></div></section><aside class="hidden lg:flex lg:w-72 lg:flex-col lg:gap-3"><div class="rounded-xl border bg-muted/40 p-4 text-sm"><p class="mb-3 font-semibold text-foreground">Ringkasan parameter</p><dl class="space-y-2"><div class="flex justify-between gap-2"><dt class="text-muted-foreground">Target stok</dt><dd class="font-medium tabular-nums">${ssrInterpolate(unref(parameters).targetDays)} hari</dd></div><div class="flex justify-between gap-2"><dt class="text-muted-foreground">Cadangan stok</dt><dd class="font-medium tabular-nums">${ssrInterpolate(unref(parameters).bufferPercent)}%</dd></div><div class="flex justify-between gap-2"><dt class="text-muted-foreground">Histori</dt><dd class="font-medium tabular-nums">${ssrInterpolate(unref(parameters).lookbackDays)} hari</dd></div>`);
        _push(ssrRenderComponent(unref(_sfc_main$4), { class: "my-1" }, null, _parent));
        _push(`<div class="flex justify-between gap-2"><dt class="text-muted-foreground">Pemasok</dt><dd class="text-right font-medium">${ssrInterpolate(unref(selectedSupplierLabel))}</dd></div></dl></div><div class="rounded-xl border bg-card p-4 text-sm"><div class="mb-3 flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(BrainCircuit), {
          class: "size-4 text-primary",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<p class="font-semibold">Kriteria &amp; Bobot</p></div><div class="mb-3 space-y-1.5 rounded-lg bg-muted/50 px-3 py-2.5"><p class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Formula perhitungan</p><p class="font-mono text-xs leading-relaxed text-foreground"> ① Kebutuhan = WMA × Target hari </p><p class="font-mono text-xs leading-relaxed text-foreground"> ② Cadangan = Kebutuhan × Cadangan% </p><p class="font-mono text-xs leading-relaxed text-foreground"> ③ Total = Kebutuhan + Cadangan </p><p class="font-mono text-xs leading-relaxed text-foreground"> ④ Saran order = max(0, Total − Stok) </p></div><div class="space-y-2.5"><div><div class="mb-1 flex items-center justify-between"><span class="text-xs text-muted-foreground">Histori pemakaian</span><span class="text-xs font-medium text-foreground">${ssrInterpolate(unref(parameters).lookbackDays)} hari</span></div><div class="h-1.5 overflow-hidden rounded-full bg-muted"><div class="h-full rounded-full bg-primary transition-all" style="${ssrRenderStyle({ width: `${Math.min(100, unref(lookbackDaysValue) / 90 * 100)}%` })}"></div></div><p class="mt-0.5 text-xs text-muted-foreground">Mempengaruhi kualitas WMA — makin panjang makin stabil</p></div><div><div class="mb-1 flex items-center justify-between"><span class="text-xs text-muted-foreground">Target stok aman</span><span class="text-xs font-medium text-foreground">${ssrInterpolate(unref(parameters).targetDays)} hari</span></div><div class="h-1.5 overflow-hidden rounded-full bg-muted"><div class="h-full rounded-full bg-info transition-all" style="${ssrRenderStyle({ width: `${Math.min(100, unref(targetDaysValue) / 90 * 100)}%` })}"></div></div><p class="mt-0.5 text-xs text-muted-foreground">Pengali WMA — makin besar → qty order makin banyak</p></div><div><div class="mb-1 flex items-center justify-between"><span class="text-xs text-muted-foreground">Cadangan stok</span><span class="text-xs font-medium text-foreground">${ssrInterpolate(unref(parameters).bufferPercent)}%</span></div><div class="h-1.5 overflow-hidden rounded-full bg-muted"><div class="h-full rounded-full bg-warning transition-all" style="${ssrRenderStyle({ width: `${Math.min(100, unref(bufferPercentValue))}%` })}"></div></div><p class="mt-0.5 text-xs text-muted-foreground">Tambahan % dari kebutuhan dasar sebagai penyangga</p></div></div></div><div class="rounded-xl border bg-primary/5 p-4 text-sm"><p class="mb-3 font-semibold text-primary">Alur proses</p><ol class="space-y-2.5"><li class="flex items-start gap-2.5"><span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span><div><p class="font-medium text-foreground">Recipe Explosion (MRP)</p><p class="text-xs text-muted-foreground">Telusuri resep menu → hitung pemakaian bahan dari histori transaksi</p></div></li><li class="flex items-start gap-2.5"><span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span><div><p class="font-medium text-foreground">Forecasting (WMA)</p><p class="text-xs text-muted-foreground">Hitung rata-rata pemakaian harian — data terbaru diberi bobot lebih tinggi</p></div></li><li class="flex items-start gap-2.5"><span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span><div><p class="font-medium text-foreground">Reorder Point + Safety Stock</p><p class="text-xs text-muted-foreground">Hitung total kebutuhan beserta cadangan, kurangi stok saat ini</p></div></li><li class="flex items-start gap-2.5"><span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span><div><p class="font-medium text-foreground">Susun draf order</p><p class="text-xs text-muted-foreground">Kelompokkan rekomendasi per pemasok + estimasi biaya total</p></div></li></ol></div></aside></div>`);
      } else if (unref(currentView) === "loading") {
        _push(`<div class="flex min-h-112 flex-1 flex-col items-center justify-center rounded-xl border bg-card px-4 text-center shadow-xs"><div class="flex flex-col items-center gap-5"><div class="relative flex size-20 items-center justify-center"><div class="absolute inset-0 animate-ping rounded-full bg-primary/15"></div><div class="absolute inset-2 animate-pulse rounded-full bg-primary/20"></div>`);
        _push(ssrRenderComponent(unref(BrainCircuit), {
          class: "relative size-8 text-primary",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</div><div><p class="text-lg font-semibold">Menganalisa kebutuhan restock...</p><p class="mt-1 text-sm text-muted-foreground"> Backend sedang menghitung WMA dan menyusun rekomendasi order. </p></div><div class="flex w-full max-w-xs flex-col gap-2 rounded-lg border bg-muted/30 px-4 py-3 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Target stok</span><span class="font-medium">${ssrInterpolate(unref(parameters).targetDays)} hari</span></div><div class="flex justify-between"><span class="text-muted-foreground">Cadangan stok</span><span class="font-medium">${ssrInterpolate(unref(parameters).bufferPercent)}%</span></div><div class="flex justify-between"><span class="text-muted-foreground">Histori pemakaian</span><span class="font-medium">${ssrInterpolate(unref(parameters).lookbackDays)} hari</span></div></div><div class="flex items-center gap-2 text-sm text-muted-foreground">`);
        _push(ssrRenderComponent(unref(_sfc_main$5), { class: "size-4" }, null, _parent));
        _push(` Memproses data... </div></div></div>`);
      } else if (unref(currentView) === "result") {
        _push(`<!--[--><div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">`);
        _push(ssrRenderComponent(unref(_sfc_main$3), {
          variant: "outline",
          size: "sm",
          onClick: handleBackToInput
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(RefreshCcw), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(` Ubah Parameter `);
            } else {
              return [
                createVNode(unref(RefreshCcw), {
                  class: "size-4",
                  "aria-hidden": "true"
                }),
                createTextVNode(" Ubah Parameter ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex items-center gap-2 text-sm text-muted-foreground">`);
        _push(ssrRenderComponent(unref(CalendarRange), {
          class: "size-4 shrink-0",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(lookbackPeriodLabel))}</span>`);
        _push(ssrRenderComponent(unref(_sfc_main$4), {
          orientation: "vertical",
          class: "h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(analysisDateLabel))}</span></div></div><div class="rounded-xl border bg-muted/30 px-4 py-3"><div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"><div class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-primary"></span><span class="text-muted-foreground">Histori pemakaian:</span><span class="font-medium tabular-nums">${ssrInterpolate(unref(processedQuery)?.lookback_days ?? "-")} hari</span></div><div class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-info"></span><span class="text-muted-foreground">Target stok:</span><span class="font-medium tabular-nums">${ssrInterpolate(unref(processedQuery)?.target_days ?? "-")} hari</span></div><div class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-warning"></span><span class="text-muted-foreground">Cadangan stok:</span><span class="font-medium tabular-nums">${ssrInterpolate(unref(processedQuery)?.buffer_percent ?? "-")}%</span></div><div class="ml-auto flex items-center gap-1.5 font-mono text-xs text-muted-foreground"><span>Saran = max(0, WMA×Target×(1+Cadangan%) − Stok)</span></div></div></div><section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan rekomendasi belanja"><!--[-->`);
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
        _push(`<!--]--></section><section class="rounded-xl border bg-card shadow-xs" aria-labelledby="spk-draft-title"><div class="flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-start sm:justify-between"><div class="flex min-w-0 items-start gap-3"><span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-info/10 text-info">`);
        _push(ssrRenderComponent(unref(ClipboardList), {
          class: "size-4",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</span><div class="min-w-0"><h2 id="spk-draft-title" class="text-base font-semibold"> Draf Order per Pemasok </h2><p class="mt-0.5 text-sm text-muted-foreground">${ssrInterpolate(unref(resultDescription))}</p></div></div>`);
        _push(ssrRenderComponent(AdminReportExportActions, {
          disabled: !unref(visibleItems).length,
          exporting: unref(exporting),
          onExportPdf: ($event) => handleExport("pdf"),
          onExportExcel: ($event) => handleExport("excel")
        }, null, _parent));
        _push(`</div><div class="border-b px-4 py-3">`);
        _push(ssrRenderComponent(AdminDataToolbar, {
          modelValue: unref(search),
          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
          "search-id": "spk-result-search",
          "search-label": "Cari rekomendasi belanja",
          "search-placeholder": "Cari bahan, pemasok, satuan, atau estimasi"
        }, {
          action: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (Object.keys(unref(orderOverrides)).length) {
                _push2(ssrRenderComponent(unref(_sfc_main$3), {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: resetOrderOverrides
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(RotateCcw), {
                        class: "size-4",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                      _push3(` Reset Qty `);
                    } else {
                      return [
                        createVNode(unref(RotateCcw), {
                          class: "size-4",
                          "aria-hidden": "true"
                        }),
                        createTextVNode(" Reset Qty ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                Object.keys(unref(orderOverrides)).length ? (openBlock(), createBlock(unref(_sfc_main$3), {
                  key: 0,
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: resetOrderOverrides
                }, {
                  default: withCtx(() => [
                    createVNode(unref(RotateCcw), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Reset Qty ")
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (!unref(supplierDrafts).length) {
          _push(`<div class="flex min-h-64 flex-col items-center justify-center gap-3 px-4 py-10 text-center"><span class="flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">`);
          _push(ssrRenderComponent(unref(PackageSearch), {
            class: "size-6",
            "aria-hidden": "true"
          }, null, _parent));
          _push(`</span><div><p class="text-sm font-medium">Tidak ada bahan yang perlu direstock</p><p class="mt-1 text-sm text-muted-foreground"> Tidak ada rekomendasi untuk parameter dan filter saat ini. </p></div></div>`);
        } else {
          _push(`<div class="divide-y"><!--[-->`);
          ssrRenderList(unref(supplierDrafts), (supplier) => {
            _push(`<article><button type="button" class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"${ssrRenderAttr("aria-expanded", isSupplierExpanded(supplier.id))}><span class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">${ssrInterpolate(supplier.name.charAt(0).toUpperCase())}</span><div class="min-w-0 flex-1"><div class="flex flex-wrap items-center gap-2"><p class="truncate text-sm font-semibold">${ssrInterpolate(supplier.name)}</p>`);
            _push(ssrRenderComponent(unref(_sfc_main$6), {
              variant: "secondary",
              class: "shrink-0 font-mono text-xs"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(supplier.items.length)} item `);
                } else {
                  return [
                    createTextVNode(toDisplayString(supplier.items.length) + " item ", 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div><p class="mt-0.5 truncate text-xs text-muted-foreground">${ssrInterpolate(supplier.contact)} · ${ssrInterpolate(formatCurrency(supplier.totalEstimatedCost))}</p></div>`);
            if (isSupplierExpanded(supplier.id)) {
              _push(ssrRenderComponent(unref(ChevronUp), {
                class: "size-4 shrink-0 text-muted-foreground",
                "aria-hidden": "true"
              }, null, _parent));
            } else {
              _push(ssrRenderComponent(unref(ChevronDown), {
                class: "size-4 shrink-0 text-muted-foreground",
                "aria-hidden": "true"
              }, null, _parent));
            }
            _push(`</button>`);
            if (isSupplierExpanded(supplier.id)) {
              _push(`<div class="overflow-x-auto border-t bg-muted/20">`);
              _push(ssrRenderComponent(unref(_sfc_main$9), { class: "min-w-[720px]" }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(unref(_sfc_main$5$1), null, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(ssrRenderComponent(unref(_sfc_main$2$2), null, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Bahan`);
                                    } else {
                                      return [
                                        createTextVNode("Bahan")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "text-right" }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Stok`);
                                    } else {
                                      return [
                                        createTextVNode("Stok")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "text-right" }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Rata-rata/Hari`);
                                    } else {
                                      return [
                                        createTextVNode("Rata-rata/Hari")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Qty Order`);
                                    } else {
                                      return [
                                        createTextVNode("Qty Order")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "text-right" }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Harga/Unit`);
                                    } else {
                                      return [
                                        createTextVNode("Harga/Unit")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "text-right" }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Estimasi`);
                                    } else {
                                      return [
                                        createTextVNode("Estimasi")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                                _push4(ssrRenderComponent(unref(_sfc_main$2$2), null, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`Status`);
                                    } else {
                                      return [
                                        createTextVNode("Status")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$2$2), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Bahan")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Stok")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Rata-rata/Hari")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Qty Order")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Harga/Unit")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Estimasi")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Status")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$5$1), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$2$2), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Bahan")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Stok")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Rata-rata/Hari")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Qty Order")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Harga/Unit")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Estimasi")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$2$2), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Status")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                    _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<!--[-->`);
                          ssrRenderList(supplier.items, (item) => {
                            _push3(ssrRenderComponent(unref(_sfc_main$5$1), {
                              key: `${supplier.id}-${item.ingredient_id}`,
                              class: "bg-background"
                            }, {
                              default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                                if (_push4) {
                                  _push4(ssrRenderComponent(unref(_sfc_main$6$1), null, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(`<p class="text-sm font-medium"${_scopeId4}>${ssrInterpolate(item.name)}</p><p class="text-xs text-muted-foreground"${_scopeId4}>${ssrInterpolate(getIngredientTypeLabel(item.type))}</p>`);
                                      } else {
                                        return [
                                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.name), 1),
                                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(getIngredientTypeLabel(item.type)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(ssrRenderComponent(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(`${ssrInterpolate(formatQuantity(item.current_stock, item.unit))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(formatQuantity(item.current_stock, item.unit)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(ssrRenderComponent(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(`${ssrInterpolate(formatQuantity(item.wma_daily_average, item.unit))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(formatQuantity(item.wma_daily_average, item.unit)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(ssrRenderComponent(unref(_sfc_main$6$1), { class: "text-right" }, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(ssrRenderComponent(unref(_sfc_main$1), {
                                          "model-value": getOrderQuantityInputValue(item),
                                          type: "number",
                                          min: "0",
                                          step: "any",
                                          inputmode: "decimal",
                                          class: "ml-auto w-32 text-right",
                                          "aria-label": `Qty order ${item.name}`,
                                          "onUpdate:modelValue": (value) => updateSuggestedQty(item.ingredient_id, value)
                                        }, null, _parent5, _scopeId4));
                                      } else {
                                        return [
                                          createVNode(unref(_sfc_main$1), {
                                            "model-value": getOrderQuantityInputValue(item),
                                            type: "number",
                                            min: "0",
                                            step: "any",
                                            inputmode: "decimal",
                                            class: "ml-auto w-32 text-right",
                                            "aria-label": `Qty order ${item.name}`,
                                            "onUpdate:modelValue": (value) => updateSuggestedQty(item.ingredient_id, value)
                                          }, null, 8, ["model-value", "aria-label", "onUpdate:modelValue"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(ssrRenderComponent(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(`${ssrInterpolate(formatCurrency(item.avg_cost))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(formatCurrency(item.avg_cost)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(ssrRenderComponent(unref(_sfc_main$6$1), { class: "text-right text-sm font-medium tabular-nums" }, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(`${ssrInterpolate(formatCurrency(getItemEstimatedCost(item)))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(formatCurrency(getItemEstimatedCost(item))), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                  _push4(ssrRenderComponent(unref(_sfc_main$6$1), null, {
                                    default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        _push5(`<span class="${ssrRenderClass([{
                                          "bg-destructive/15 text-destructive": getRestockStatus(item).tone === "destructive",
                                          "bg-warning/15 text-warning-foreground": getRestockStatus(item).tone === "warning",
                                          "bg-info/15 text-info": getRestockStatus(item).tone === "info"
                                        }, "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"])}"${_scopeId4}>${ssrInterpolate(getRestockStatus(item).label)}</span>`);
                                      } else {
                                        return [
                                          createVNode("span", {
                                            class: ["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", {
                                              "bg-destructive/15 text-destructive": getRestockStatus(item).tone === "destructive",
                                              "bg-warning/15 text-warning-foreground": getRestockStatus(item).tone === "warning",
                                              "bg-info/15 text-info": getRestockStatus(item).tone === "info"
                                            }]
                                          }, toDisplayString(getRestockStatus(item).label), 3)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$6$1), null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.name), 1),
                                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(getIngredientTypeLabel(item.type)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatQuantity(item.current_stock, item.unit)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatQuantity(item.wma_daily_average, item.unit)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6$1), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$1), {
                                          "model-value": getOrderQuantityInputValue(item),
                                          type: "number",
                                          min: "0",
                                          step: "any",
                                          inputmode: "decimal",
                                          class: "ml-auto w-32 text-right",
                                          "aria-label": `Qty order ${item.name}`,
                                          "onUpdate:modelValue": (value) => updateSuggestedQty(item.ingredient_id, value)
                                        }, null, 8, ["model-value", "aria-label", "onUpdate:modelValue"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(item.avg_cost)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm font-medium tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(formatCurrency(getItemEstimatedCost(item))), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6$1), null, {
                                      default: withCtx(() => [
                                        createVNode("span", {
                                          class: ["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", {
                                            "bg-destructive/15 text-destructive": getRestockStatus(item).tone === "destructive",
                                            "bg-warning/15 text-warning-foreground": getRestockStatus(item).tone === "warning",
                                            "bg-info/15 text-info": getRestockStatus(item).tone === "info"
                                          }]
                                        }, toDisplayString(getRestockStatus(item).label), 3)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent3, _scopeId2));
                          });
                          _push3(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(supplier.items, (item) => {
                              return openBlock(), createBlock(unref(_sfc_main$5$1), {
                                key: `${supplier.id}-${item.ingredient_id}`,
                                class: "bg-background"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$6$1), null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.name), 1),
                                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(getIngredientTypeLabel(item.type)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(formatQuantity(item.current_stock, item.unit)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(formatQuantity(item.wma_daily_average, item.unit)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$6$1), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$1), {
                                        "model-value": getOrderQuantityInputValue(item),
                                        type: "number",
                                        min: "0",
                                        step: "any",
                                        inputmode: "decimal",
                                        class: "ml-auto w-32 text-right",
                                        "aria-label": `Qty order ${item.name}`,
                                        "onUpdate:modelValue": (value) => updateSuggestedQty(item.ingredient_id, value)
                                      }, null, 8, ["model-value", "aria-label", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(formatCurrency(item.avg_cost)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm font-medium tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(formatCurrency(getItemEstimatedCost(item))), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(unref(_sfc_main$6$1), null, {
                                    default: withCtx(() => [
                                      createVNode("span", {
                                        class: ["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", {
                                          "bg-destructive/15 text-destructive": getRestockStatus(item).tone === "destructive",
                                          "bg-warning/15 text-warning-foreground": getRestockStatus(item).tone === "warning",
                                          "bg-info/15 text-info": getRestockStatus(item).tone === "info"
                                        }]
                                      }, toDisplayString(getRestockStatus(item).label), 3)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$1$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$5$1), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2$2), null, {
                                default: withCtx(() => [
                                  createTextVNode("Bahan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Stok")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Rata-rata/Hari")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Qty Order")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Harga/Unit")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Estimasi")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$2$2), null, {
                                default: withCtx(() => [
                                  createTextVNode("Status")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(supplier.items, (item) => {
                            return openBlock(), createBlock(unref(_sfc_main$5$1), {
                              key: `${supplier.id}-${item.ingredient_id}`,
                              class: "bg-background"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$6$1), null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.name), 1),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(getIngredientTypeLabel(item.type)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatQuantity(item.current_stock, item.unit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatQuantity(item.wma_daily_average, item.unit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$6$1), { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$1), {
                                      "model-value": getOrderQuantityInputValue(item),
                                      type: "number",
                                      min: "0",
                                      step: "any",
                                      inputmode: "decimal",
                                      class: "ml-auto w-32 text-right",
                                      "aria-label": `Qty order ${item.name}`,
                                      "onUpdate:modelValue": (value) => updateSuggestedQty(item.ingredient_id, value)
                                    }, null, 8, ["model-value", "aria-label", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm tabular-nums" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatCurrency(item.avg_cost)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$6$1), { class: "text-right text-sm font-medium tabular-nums" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatCurrency(getItemEstimatedCost(item))), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(unref(_sfc_main$6$1), null, {
                                  default: withCtx(() => [
                                    createVNode("span", {
                                      class: ["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", {
                                        "bg-destructive/15 text-destructive": getRestockStatus(item).tone === "destructive",
                                        "bg-warning/15 text-warning-foreground": getRestockStatus(item).tone === "warning",
                                        "bg-info/15 text-info": getRestockStatus(item).tone === "info"
                                      }]
                                    }, toDisplayString(getRestockStatus(item).label), 3)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`<div class="flex items-center justify-between border-t bg-background/60 px-4 py-2"><p class="text-xs text-muted-foreground">${ssrInterpolate(supplier.items.length)} bahan · ${ssrInterpolate(supplier.name)}</p><p class="text-sm font-semibold tabular-nums">${ssrInterpolate(formatCurrency(supplier.totalEstimatedCost))}</p></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</article>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</section><section class="rounded-xl border bg-card shadow-xs" aria-labelledby="spk-table-title"><div class="flex min-w-0 items-start gap-3 border-b px-4 py-4"><span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">`);
        _push(ssrRenderComponent(unref(ShieldCheck), {
          class: "size-4",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</span><div class="min-w-0"><h2 id="spk-table-title" class="text-base font-semibold"> Detail Semua Bahan </h2><p class="mt-0.5 text-sm text-muted-foreground"> Tabel lengkap hasil analisa WMA untuk semua bahan yang difilter. </p></div></div><div class="p-4">`);
        _push(ssrRenderComponent(AdminDataTable, {
          columns,
          rows: unref(rows),
          loading: false,
          actions: [],
          label: "rekomendasi belanja",
          "empty-title": "Rekomendasi belanja tidak ditemukan",
          "empty-description": "Coba ubah kata kunci pencarian."
        }, null, _parent));
        _push(`</div></section><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/purchase-recommendations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=purchase-recommendations-Ca1r5gHs.mjs.map
