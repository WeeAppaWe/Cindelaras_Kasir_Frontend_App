import { defineComponent, ref, computed, mergeProps, unref, isRef, withCtx, openBlock, createBlock, createTextVNode, toDisplayString, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { RefreshCcw, Users, Clock3, ReceiptText, Banknote, Scale } from 'lucide-vue-next';
import { _ as _sfc_main$2$1, a as _sfc_main$1$1 } from './index-rcdgmEu2.mjs';
import { _ as _sfc_main$2 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1, a as _sfc_main$3 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { A as AdminReportExportActions, e as exportReportToPdf, a as exportReportToExcel } from './AdminReportExportActions-ByBpbXoz.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminReportApi } from './useAdminReportApi-T8WpX7qB.mjs';
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
import './api-endpoints-BXkjOpII.mjs';
import 'vue-sonner';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "operations",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Laporan Operasional"
    });
    const currencyFormatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    });
    const numberFormatter = new Intl.NumberFormat("id-ID");
    const dateFormatter = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium"
    });
    useAdminReportApi();
    const { runAdminExportAction } = useAdminActionFeedback();
    const startDate = ref(getMonthStartDate());
    const endDate = ref(getTodayDate());
    const search = ref("");
    const statusFilter = ref("all");
    const varianceFilter = ref("all");
    const isLoading = ref(false);
    const errorMessage = ref("");
    const report = ref(null);
    const exporting = ref(null);
    const shiftItems = computed(() => report.value?.shifts ?? []);
    const filteredShifts = computed(() => {
      const keyword = search.value.trim().toLowerCase();
      return shiftItems.value.filter((item) => {
        const status = item.status.toUpperCase();
        const matchKeyword = !keyword || [
          item.date,
          formatDate(item.date),
          item.start_time,
          item.end_time ?? "",
          item.cashier_name,
          formatCurrency(item.total_sales),
          formatNumber(item.transaction_count)
        ].some((value) => value.toLowerCase().includes(keyword));
        const matchStatus = statusFilter.value === "all" || status === statusFilter.value;
        const matchVariance = varianceFilter.value === "all" || varianceFilter.value === "active" && item.variance === null || varianceFilter.value === "balanced" && item.variance === 0 || varianceFilter.value === "over" && item.variance !== null && item.variance > 0 || varianceFilter.value === "short" && item.variance !== null && item.variance < 0;
        return matchKeyword && matchStatus && matchVariance;
      });
    });
    const operationalSummary = computed(() => {
      const transactionCount = shiftItems.value.reduce((total, item) => total + item.transaction_count, 0);
      const totalSales = shiftItems.value.reduce((total, item) => total + item.total_sales, 0);
      const expectedCash = shiftItems.value.reduce((total, item) => total + item.expected_cash, 0);
      const cashIn = shiftItems.value.reduce((total, item) => total + item.cash_in, 0);
      const cashOut = shiftItems.value.reduce((total, item) => total + item.cash_out, 0);
      const closedShifts = shiftItems.value.filter((item) => item.variance !== null);
      const variance = closedShifts.reduce((total, item) => total + (item.variance ?? 0), 0);
      return {
        transactionCount,
        totalSales,
        expectedCash,
        cashIn,
        cashOut,
        variance,
        totalShifts: report.value?.total_shifts ?? 0,
        activeShifts: shiftItems.value.filter((item) => item.status.toUpperCase() === "ACTIVE").length,
        closedShifts: closedShifts.length
      };
    });
    const periodLabel = computed(() => {
      const period = report.value?.period;
      if (!period) {
        return `${formatDate(startDate.value)} - ${formatDate(endDate.value)}`;
      }
      return `${formatDate(period.start_date)} - ${formatDate(period.end_date)}`;
    });
    const metrics = computed(() => [
      {
        id: "shifts",
        label: "Total Shift",
        value: formatNumber(operationalSummary.value.totalShifts),
        helper: `${formatNumber(operationalSummary.value.activeShifts)} aktif`,
        tone: "info"
      },
      {
        id: "sales",
        label: "Total Penjualan",
        value: formatCurrency(operationalSummary.value.totalSales),
        helper: `${formatNumber(operationalSummary.value.transactionCount)} transaksi`,
        tone: "success"
      },
      {
        id: "expected-cash",
        label: "Kas Sistem",
        value: formatCurrency(operationalSummary.value.expectedCash),
        helper: `${formatCurrency(operationalSummary.value.cashIn)} masuk / ${formatCurrency(operationalSummary.value.cashOut)} keluar`,
        tone: "default"
      },
      {
        id: "variance",
        label: "Total Selisih",
        value: formatCurrency(operationalSummary.value.variance),
        helper: `${formatNumber(operationalSummary.value.closedShifts)} shift tertutup`,
        tone: getVarianceTone(operationalSummary.value.variance)
      }
    ]);
    const columns = [
      { key: "shift", label: "Shift" },
      { key: "cashier", label: "Kasir" },
      { key: "transactions", label: "Transaksi", align: "right" },
      { key: "sales", label: "Penjualan", align: "right" },
      { key: "cashFlow", label: "Kas Masuk/Keluar", align: "right" },
      { key: "expectedCash", label: "Kas Sistem", align: "right" },
      { key: "actualCash", label: "Kas Aktual", align: "right" },
      { key: "variance", label: "Selisih" },
      { key: "status", label: "Status" }
    ];
    const rows = computed(() => filteredShifts.value.map((item) => ({
      id: item.shift_id,
      cells: {
        shift: {
          label: formatDate(item.date),
          description: `${formatTime(item.start_time)} - ${item.end_time ? formatTime(item.end_time) : "Berjalan"}`
        },
        cashier: item.cashier_name || "-",
        transactions: `${formatNumber(item.transaction_count)} trx`,
        sales: formatCurrency(item.total_sales),
        cashFlow: {
          label: `${formatCurrency(item.cash_in)} / ${formatCurrency(item.cash_out)}`,
          description: `Kas awal ${formatCurrency(item.start_cash)}`
        },
        expectedCash: formatCurrency(item.expected_cash),
        actualCash: item.actual_cash === null ? "-" : formatCurrency(item.actual_cash),
        variance: {
          label: formatVariance(item.variance),
          tone: getVarianceTone(item.variance)
        },
        status: {
          label: getShiftStatusLabel(item.status),
          tone: getShiftStatusTone(item.status)
        }
      }
    })));
    const exportSummary = computed(() => [
      { label: "Periode", value: periodLabel.value },
      { label: "Total Shift", value: formatNumber(operationalSummary.value.totalShifts) },
      { label: "Total Penjualan", value: formatCurrency(operationalSummary.value.totalSales) },
      { label: "Total Selisih", value: formatCurrency(operationalSummary.value.variance) }
    ]);
    const exportRows = computed(() => filteredShifts.value.map((item) => ({
      shift: `${formatDate(item.date)} ${formatTime(item.start_time)}-${item.end_time ? formatTime(item.end_time) : "Berjalan"}`,
      cashier: item.cashier_name || "-",
      transactions: `${formatNumber(item.transaction_count)} trx`,
      sales: formatCurrency(item.total_sales),
      cashFlow: `${formatCurrency(item.cash_in)} / ${formatCurrency(item.cash_out)}`,
      expectedCash: formatCurrency(item.expected_cash),
      actualCash: item.actual_cash === null ? "-" : formatCurrency(item.actual_cash),
      variance: formatVariance(item.variance),
      status: getShiftStatusLabel(item.status)
    })));
    async function exportOperationalReport(format) {
      ({
        description: `Ringkasan shift kasir periode ${periodLabel.value}.`,
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
        successMessage: "Laporan operasional berhasil disiapkan.",
        errorMessage: "Gagal mengekspor laporan operasional."
      });
    }
    function getMetricIcon(metricId) {
      if (metricId === "shifts") {
        return Clock3;
      }
      if (metricId === "sales") {
        return ReceiptText;
      }
      if (metricId === "expected-cash") {
        return Banknote;
      }
      return Scale;
    }
    function getShiftStatusLabel(value) {
      return value.toUpperCase() === "ACTIVE" ? "Aktif" : "Tutup";
    }
    function getShiftStatusTone(value) {
      return value.toUpperCase() === "ACTIVE" ? "info" : "success";
    }
    function getVarianceTone(value) {
      if (value === null) {
        return "info";
      }
      if (value < 0) {
        return "destructive";
      }
      if (value > 0) {
        return "warning";
      }
      return "success";
    }
    function formatVariance(value) {
      if (value === null) {
        return "Belum tutup";
      }
      return formatCurrency(value);
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
      return dateFormatter.format(date);
    }
    function formatTime(value) {
      return value.split(":").slice(0, 2).join(".");
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
        title: "Laporan Operasional",
        description: "Pantau shift kasir, total penjualan, kas sistem, kas aktual, dan selisih kas."
      }, null, _parent));
      _push(`<section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="operational-filter-title"><div class="mb-3 flex flex-col gap-1"><h2 id="operational-filter-title" class="text-base font-semibold tracking-normal">Filter laporan</h2><p class="text-sm text-muted-foreground">Filter memakai tanggal mulai shift sebagai acuan periode laporan.</p></div><form class="grid gap-3 md:grid-cols-[repeat(2,minmax(0,12rem))_auto]"><div class="space-y-1.5"><label for="operational-start-date" class="text-sm font-medium">Tanggal awal</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "operational-start-date",
        modelValue: unref(startDate),
        "onUpdate:modelValue": ($event) => isRef(startDate) ? startDate.value = $event : null,
        type: "date",
        disabled: unref(isLoading)
      }, null, _parent));
      _push(`</div><div class="space-y-1.5"><label for="operational-end-date" class="text-sm font-medium">Tanggal akhir</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "operational-end-date",
        modelValue: unref(endDate),
        "onUpdate:modelValue": ($event) => isRef(endDate) ? endDate.value = $event : null,
        type: "date",
        disabled: unref(isLoading)
      }, null, _parent));
      _push(`</div><div class="flex items-end">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        type: "submit",
        class: "h-9",
        disabled: unref(isLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isLoading)) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(RefreshCcw), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            }
            _push2(` ${ssrInterpolate(unref(isLoading) ? "Memuat..." : "Terapkan")}`);
          } else {
            return [
              unref(isLoading) ? (openBlock(), createBlock(unref(_sfc_main$3), {
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
      _push(`<section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan laporan operasional"><!--[-->`);
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
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="operational-table-title"><div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div class="flex min-w-0 items-start gap-3"><span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">`);
      _push(ssrRenderComponent(unref(Users), {
        class: "size-4",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><div class="min-w-0"><h2 id="operational-table-title" class="text-base font-semibold tracking-normal"> Rekap Shift Kasir </h2><p class="mt-1 text-sm text-muted-foreground"> Periode ${ssrInterpolate(unref(periodLabel))}. </p></div></div>`);
      _push(ssrRenderComponent(AdminReportExportActions, {
        disabled: unref(isLoading) || !unref(exportRows).length,
        exporting: unref(exporting),
        onExportPdf: ($event) => exportOperationalReport("pdf"),
        onExportExcel: ($event) => exportOperationalReport("excel")
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "operational-report-search",
        "search-label": "Cari laporan operasional",
        "search-placeholder": "Cari tanggal, jam, kasir, penjualan, atau transaksi",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="operational-status-filter" class="sr-only"${_scopeId}>Filter status shift</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2$2), {
              id: "operational-status-filter",
              modelValue: unref(statusFilter),
              "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
              class: "w-32",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua shift</option><option value="ACTIVE"${_scopeId2}>Aktif</option><option value="CLOSED"${_scopeId2}>Tutup</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua shift"),
                    createVNode("option", { value: "ACTIVE" }, "Aktif"),
                    createVNode("option", { value: "CLOSED" }, "Tutup")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="operational-variance-filter" class="sr-only"${_scopeId}>Filter selisih kas</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2$2), {
              id: "operational-variance-filter",
              modelValue: unref(varianceFilter),
              "onUpdate:modelValue": ($event) => isRef(varianceFilter) ? varianceFilter.value = $event : null,
              class: "w-40",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua selisih</option><option value="balanced"${_scopeId2}>Kas pas</option><option value="over"${_scopeId2}>Kas lebih</option><option value="short"${_scopeId2}>Kas kurang</option><option value="active"${_scopeId2}>Belum tutup</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua selisih"),
                    createVNode("option", { value: "balanced" }, "Kas pas"),
                    createVNode("option", { value: "over" }, "Kas lebih"),
                    createVNode("option", { value: "short" }, "Kas kurang"),
                    createVNode("option", { value: "active" }, "Belum tutup")
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
                  for: "operational-status-filter",
                  class: "sr-only"
                }, "Filter status shift"),
                createVNode(unref(_sfc_main$2$2), {
                  id: "operational-status-filter",
                  modelValue: unref(statusFilter),
                  "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                  class: "w-32",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua shift"),
                    createVNode("option", { value: "ACTIVE" }, "Aktif"),
                    createVNode("option", { value: "CLOSED" }, "Tutup")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "operational-variance-filter",
                  class: "sr-only"
                }, "Filter selisih kas"),
                createVNode(unref(_sfc_main$2$2), {
                  id: "operational-variance-filter",
                  modelValue: unref(varianceFilter),
                  "onUpdate:modelValue": ($event) => isRef(varianceFilter) ? varianceFilter.value = $event : null,
                  class: "w-40",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua selisih"),
                    createVNode("option", { value: "balanced" }, "Kas pas"),
                    createVNode("option", { value: "over" }, "Kas lebih"),
                    createVNode("option", { value: "short" }, "Kas kurang"),
                    createVNode("option", { value: "active" }, "Belum tutup")
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
        label: "laporan operasional",
        "empty-title": "Laporan operasional tidak ditemukan",
        "empty-description": "Ubah periode, kata kunci, status shift, atau filter selisih."
      }, null, _parent));
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/reports/operations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=operations-CiZJnZVz.mjs.map
