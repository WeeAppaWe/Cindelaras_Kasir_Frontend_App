import { defineComponent, ref, computed, mergeProps, unref, isRef, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { RefreshCcw, Boxes, Warehouse, PackageCheck, AlertTriangle } from 'lucide-vue-next';
import { _ as _sfc_main$2$1, a as _sfc_main$1$1 } from './index-rcdgmEu2.mjs';
import { _ as _sfc_main$3 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1, a as _sfc_main$4 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { A as AdminReportExportActions, e as exportReportToPdf, a as exportReportToExcel } from './AdminReportExportActions-ByBpbXoz.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminReportApi } from './useAdminReportApi-Cd9wyiHe.mjs';
import { u as useAdminActionFeedback } from './useAdminActionFeedback-BRkOE1ij.mjs';
import 'class-variance-authority';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
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
import './index-DSBdqIS4.mjs';
import './PaginationPrevious-DSL0-rZ8.mjs';
import './Skeleton-CQWwuiK0.mjs';
import './api-endpoints-aT5YyZ8V.mjs';
import 'vue-sonner';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "inventory",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Laporan Persediaan"
    });
    const currencyFormatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    });
    const numberFormatter = new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 2
    });
    useAdminReportApi();
    const { runAdminExportAction } = useAdminActionFeedback();
    const startDate = ref(getMonthStartDate());
    const endDate = ref(getTodayDate());
    const ingredientTypeFilter = ref("all");
    const statusFilter = ref("all");
    const search = ref("");
    const isLoading = ref(false);
    const errorMessage = ref("");
    const report = ref(null);
    const exporting = ref(null);
    const inventoryItems = computed(() => report.value?.items ?? []);
    const filteredItems = computed(() => {
      const keyword = search.value.trim().toLowerCase();
      return inventoryItems.value.filter((item) => {
        const status = item.status.toUpperCase();
        const matchKeyword = !keyword || [
          item.name,
          getIngredientTypeLabel(item.type),
          item.unit,
          getStockStatusLabel(status),
          formatCurrency(item.stock_value)
        ].some((value) => value.toLowerCase().includes(keyword));
        const matchStatus = statusFilter.value === "all" || status === statusFilter.value;
        return matchKeyword && matchStatus;
      });
    });
    const inventorySummary = computed(() => ({
      totalItems: report.value?.total_items ?? 0,
      totalValue: report.value?.total_value ?? 0,
      lowStockCount: report.value?.low_stock_count ?? 0,
      outOfStockCount: report.value?.out_of_stock_count ?? 0,
      normalStockCount: inventoryItems.value.filter((item) => item.status.toUpperCase() === "NORMAL").length
    }));
    const periodLabel = computed(() => `${formatDate(startDate.value)} - ${formatDate(endDate.value)}`);
    const metrics = computed(() => [
      {
        id: "total-value",
        label: "Nilai Persediaan",
        value: formatCurrency(inventorySummary.value.totalValue),
        helper: "Stok saat ini x HPP rata-rata",
        tone: "info"
      },
      {
        id: "total-items",
        label: "Total Bahan",
        value: formatNumber(inventorySummary.value.totalItems),
        helper: `${formatNumber(inventorySummary.value.normalStockCount)} stok aman`,
        tone: "success"
      },
      {
        id: "low-stock",
        label: "Stok Menipis",
        value: formatNumber(inventorySummary.value.lowStockCount),
        helper: "Di bawah batas minimum",
        tone: inventorySummary.value.lowStockCount > 0 ? "warning" : "default"
      },
      {
        id: "out-stock",
        label: "Stok Habis",
        value: formatNumber(inventorySummary.value.outOfStockCount),
        helper: "Perlu segera ditindaklanjuti",
        tone: inventorySummary.value.outOfStockCount > 0 ? "destructive" : "default"
      }
    ]);
    const columns = [
      { key: "ingredient", label: "Bahan" },
      { key: "type", label: "Tipe" },
      { key: "stock", label: "Stok Saat Ini", align: "right" },
      { key: "minimumStock", label: "Minimum", align: "right" },
      { key: "averageCost", label: "HPP Rata-rata", align: "right" },
      { key: "stockValue", label: "Nilai Stok", align: "right" },
      { key: "status", label: "Status" }
    ];
    const rows = computed(() => filteredItems.value.map((item) => ({
      id: item.ingredient_id,
      cells: {
        ingredient: {
          label: item.name,
          description: `Satuan ${item.unit || "-"}`
        },
        type: getIngredientTypeLabel(item.type),
        stock: `${formatNumber(item.current_stock)} ${item.unit || ""}`.trim(),
        minimumStock: `${formatNumber(item.min_stock)} ${item.unit || ""}`.trim(),
        averageCost: formatCurrency(item.avg_cost),
        stockValue: formatCurrency(item.stock_value),
        status: {
          label: getStockStatusLabel(item.status),
          tone: getStockStatusTone(item.status)
        }
      }
    })));
    const exportSummary = computed(() => [
      { label: "Periode validasi", value: periodLabel.value },
      { label: "Nilai Persediaan", value: formatCurrency(inventorySummary.value.totalValue) },
      { label: "Total Bahan", value: formatNumber(inventorySummary.value.totalItems) },
      { label: "Stok Menipis/Habis", value: `${formatNumber(inventorySummary.value.lowStockCount)} / ${formatNumber(inventorySummary.value.outOfStockCount)}` }
    ]);
    const exportRows = computed(() => filteredItems.value.map((item) => ({
      ingredient: item.name,
      type: getIngredientTypeLabel(item.type),
      stock: `${formatNumber(item.current_stock)} ${item.unit || ""}`.trim(),
      minimumStock: `${formatNumber(item.min_stock)} ${item.unit || ""}`.trim(),
      averageCost: formatCurrency(item.avg_cost),
      stockValue: formatCurrency(item.stock_value),
      status: getStockStatusLabel(item.status)
    })));
    async function exportInventoryReport(format) {
      ({
        description: `Kondisi stok dan nilai aset persediaan periode validasi ${periodLabel.value}.`,
        period: {
          start_date: startDate.value,
          end_date: endDate.value
        },
        rows: exportRows.value,
        summary: exportSummary.value
      });
      await runAdminExportAction(() => {
        if (format === "pdf") {
          return exportReportToPdf();
        }
        return exportReportToExcel();
      }, {
        exporting,
        format,
        successMessage: "Laporan persediaan berhasil disiapkan.",
        errorMessage: "Gagal mengekspor laporan persediaan."
      });
    }
    function getMetricIcon(metricId) {
      if (metricId === "total-value") {
        return Warehouse;
      }
      if (metricId === "total-items") {
        return PackageCheck;
      }
      if (metricId === "low-stock") {
        return AlertTriangle;
      }
      return Boxes;
    }
    function getIngredientTypeLabel(value) {
      if (value === "raw") {
        return "Bahan baku";
      }
      if (value === "semi") {
        return "Bahan setengah jadi";
      }
      return value || "-";
    }
    function getStockStatusLabel(value) {
      const status = value.toUpperCase();
      if (status === "OUT") {
        return "Habis";
      }
      if (status === "LOW") {
        return "Menipis";
      }
      return "Aman";
    }
    function getStockStatusTone(value) {
      const status = value.toUpperCase();
      if (status === "OUT") {
        return "destructive";
      }
      if (status === "LOW") {
        return "warning";
      }
      return "success";
    }
    function formatCurrency(value) {
      return currencyFormatter.format(value).replace(/\s/g, "");
    }
    function formatNumber(value) {
      return numberFormatter.format(value);
    }
    function formatDate(value) {
      const date = /* @__PURE__ */ new Date(`${value}T00:00:00`);
      if (Number.isNaN(date.getTime())) {
        return "-";
      }
      return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(date);
    }
    function getTodayDate() {
      return formatDateInput(/* @__PURE__ */ new Date());
    }
    function getMonthStartDate() {
      const today = /* @__PURE__ */ new Date();
      return formatDateInput(new Date(today.getFullYear(), today.getMonth(), 1));
    }
    function formatDateInput(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-full flex-col gap-3 p-3 sm:p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(AdminPageHeader, {
        title: "Laporan Persediaan",
        description: "Pantau stok bahan, nilai aset persediaan, dan status stok saat ini."
      }, null, _parent));
      _push(`<section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="inventory-filter-title"><div class="mb-3 flex flex-col gap-1"><h2 id="inventory-filter-title" class="text-base font-semibold tracking-normal">Filter laporan</h2><p class="text-sm text-muted-foreground">Tanggal dipakai backend untuk validasi format; stok yang tampil adalah kondisi saat ini.</p></div><form class="grid gap-3 md:grid-cols-[repeat(3,minmax(0,12rem))_auto]"><div class="space-y-1.5"><label for="inventory-start-date" class="text-sm font-medium">Tanggal awal</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "inventory-start-date",
        modelValue: unref(startDate),
        "onUpdate:modelValue": ($event) => isRef(startDate) ? startDate.value = $event : null,
        type: "date",
        disabled: unref(isLoading)
      }, null, _parent));
      _push(`</div><div class="space-y-1.5"><label for="inventory-end-date" class="text-sm font-medium">Tanggal akhir</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "inventory-end-date",
        modelValue: unref(endDate),
        "onUpdate:modelValue": ($event) => isRef(endDate) ? endDate.value = $event : null,
        type: "date",
        disabled: unref(isLoading)
      }, null, _parent));
      _push(`</div><div class="space-y-1.5"><label for="inventory-type-filter" class="text-sm font-medium">Tipe bahan</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        id: "inventory-type-filter",
        modelValue: unref(ingredientTypeFilter),
        "onUpdate:modelValue": ($event) => isRef(ingredientTypeFilter) ? ingredientTypeFilter.value = $event : null,
        disabled: unref(isLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="all"${_scopeId}>Semua bahan</option><option value="raw"${_scopeId}>Bahan baku</option><option value="semi"${_scopeId}>Bahan setengah jadi</option>`);
          } else {
            return [
              createVNode("option", { value: "all" }, "Semua bahan"),
              createVNode("option", { value: "raw" }, "Bahan baku"),
              createVNode("option", { value: "semi" }, "Bahan setengah jadi")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-end">`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        type: "submit",
        class: "h-9",
        disabled: unref(isLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isLoading)) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(RefreshCcw), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            }
            _push2(` ${ssrInterpolate(unref(isLoading) ? "Memuat..." : "Terapkan")}`);
          } else {
            return [
              unref(isLoading) ? (openBlock(), createBlock(unref(_sfc_main$4), {
                key: 0,
                class: "size-4"
              })) : (openBlock(), createBlock(unref(RefreshCcw), {
                key: 1,
                class: "size-4",
                "aria-hidden": "true"
              })),
              createTextVNode(" " + toDisplayString(unref(isLoading) ? "Memuat..." : "Terapkan"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></section>`);
      if (unref(errorMessage)) {
        _push(ssrRenderComponent(unref(_sfc_main$2$1), { variant: "destructive" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$1$1), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(errorMessage))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(errorMessage)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$1$1), null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(errorMessage)), 1)
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
      _push(`<section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan laporan persediaan"><!--[-->`);
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
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="inventory-table-title"><div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div class="flex min-w-0 items-start gap-3"><span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">`);
      _push(ssrRenderComponent(unref(Boxes), {
        class: "size-4",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><div class="min-w-0"><h2 id="inventory-table-title" class="text-base font-semibold tracking-normal"> Nilai dan Kondisi Persediaan </h2><p class="mt-1 text-sm text-muted-foreground"> Periode validasi ${ssrInterpolate(unref(periodLabel))}. </p></div></div>`);
      _push(ssrRenderComponent(AdminReportExportActions, {
        disabled: unref(isLoading) || !unref(exportRows).length,
        exporting: unref(exporting),
        onExportPdf: ($event) => exportInventoryReport("pdf"),
        onExportExcel: ($event) => exportInventoryReport("excel")
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "inventory-report-search",
        "search-label": "Cari laporan persediaan",
        "search-placeholder": "Cari bahan, tipe, satuan, status, atau nilai",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="inventory-status-filter" class="sr-only"${_scopeId}>Filter status stok</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "inventory-status-filter",
              modelValue: unref(statusFilter),
              "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
              class: "w-36",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua status</option><option value="NORMAL"${_scopeId2}>Aman</option><option value="LOW"${_scopeId2}>Menipis</option><option value="OUT"${_scopeId2}>Habis</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua status"),
                    createVNode("option", { value: "NORMAL" }, "Aman"),
                    createVNode("option", { value: "LOW" }, "Menipis"),
                    createVNode("option", { value: "OUT" }, "Habis")
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
                  for: "inventory-status-filter",
                  class: "sr-only"
                }, "Filter status stok"),
                createVNode(unref(_sfc_main$2), {
                  id: "inventory-status-filter",
                  modelValue: unref(statusFilter),
                  "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                  class: "w-36",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua status"),
                    createVNode("option", { value: "NORMAL" }, "Aman"),
                    createVNode("option", { value: "LOW" }, "Menipis"),
                    createVNode("option", { value: "OUT" }, "Habis")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ])
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
        actions: [],
        label: "laporan persediaan",
        "empty-title": "Persediaan tidak ditemukan",
        "empty-description": "Ubah periode, tipe bahan, kata kunci, atau status stok."
      }, null, _parent));
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/reports/inventory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=inventory-BxFDkaM1.mjs.map
