import { defineComponent, ref, computed, mergeProps, unref, isRef, withCtx, openBlock, createBlock, createTextVNode, toDisplayString, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { RefreshCcw, WalletCards, TrendingDown, TrendingUp, ReceiptText, Calculator } from 'lucide-vue-next';
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
  __name: "finance",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Laporan Keuangan"
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
    const dayFormatter = new Intl.DateTimeFormat("id-ID", {
      weekday: "long"
    });
    useAdminReportApi();
    const { runAdminExportAction } = useAdminActionFeedback();
    const startDate = ref(getMonthStartDate());
    const endDate = ref(getTodayDate());
    const search = ref("");
    const profitFilter = ref("all");
    const isLoading = ref(false);
    const errorMessage = ref("");
    const report = ref(null);
    const exporting = ref(null);
    const filteredItems = computed(() => {
      const keyword = search.value.trim().toLowerCase();
      return financialItems.value.filter((item) => {
        const matchKeyword = !keyword || [
          item.date,
          formatDate(item.date),
          formatCurrency(item.total_revenue),
          formatCurrency(item.net_profit),
          formatNumber(item.transaction_count)
        ].some((value) => value.toLowerCase().includes(keyword));
        const matchProfit = profitFilter.value === "all" || profitFilter.value === "profit" && item.net_profit >= 0 || profitFilter.value === "loss" && item.net_profit < 0;
        return matchKeyword && matchProfit;
      });
    });
    const financialItems = computed(() => report.value?.items ?? []);
    const financialSummary = computed(() => {
      const transactionCount = financialItems.value.reduce((total, item) => total + item.transaction_count, 0);
      const totalRevenue = financialItems.value.reduce((total, item) => total + item.total_revenue, 0);
      const totalCogs = financialItems.value.reduce((total, item) => total + item.total_cogs, 0);
      const grossProfit = financialItems.value.reduce((total, item) => total + item.gross_profit, 0);
      const expenses = financialItems.value.reduce((total, item) => total + item.expenses, 0);
      const netProfit = financialItems.value.reduce((total, item) => total + item.net_profit, 0);
      return {
        transactionCount,
        totalRevenue,
        totalCogs,
        grossProfit,
        expenses,
        netProfit,
        averageTransaction: transactionCount > 0 ? Math.round(totalRevenue / transactionCount) : 0,
        marginPercent: totalRevenue > 0 ? Math.round(grossProfit / totalRevenue * 100) : 0
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
        id: "revenue",
        label: "Total Pendapatan",
        value: formatCurrency(financialSummary.value.totalRevenue),
        helper: `${formatNumber(financialSummary.value.transactionCount)} transaksi`,
        tone: "success"
      },
      {
        id: "net-profit",
        label: "Laba Bersih",
        value: formatCurrency(financialSummary.value.netProfit),
        helper: `${formatCurrency(financialSummary.value.grossProfit)} laba kotor`,
        tone: financialSummary.value.netProfit < 0 ? "destructive" : "success"
      },
      {
        id: "cogs",
        label: "HPP",
        value: formatCurrency(financialSummary.value.totalCogs),
        helper: `${financialSummary.value.marginPercent}% margin kotor`,
        tone: "default"
      },
      {
        id: "expenses",
        label: "Pengeluaran",
        value: formatCurrency(financialSummary.value.expenses),
        helper: `Rata-rata ${formatCurrency(financialSummary.value.averageTransaction)}`,
        tone: financialSummary.value.expenses > 0 ? "warning" : "info"
      }
    ]);
    const columns = [
      { key: "date", label: "Tanggal" },
      { key: "transactions", label: "Transaksi", align: "right" },
      { key: "revenue", label: "Pendapatan", align: "right" },
      { key: "cogs", label: "HPP", align: "right" },
      { key: "grossProfit", label: "Laba Kotor", align: "right" },
      { key: "expenses", label: "Pengeluaran", align: "right" },
      { key: "netProfit", label: "Laba Bersih", align: "right" }
    ];
    const rows = computed(() => filteredItems.value.map((item) => ({
      id: `financial-${item.date}`,
      cells: {
        date: {
          label: formatDate(item.date),
          description: formatDay(item.date)
        },
        transactions: `${formatNumber(item.transaction_count)} trx`,
        revenue: formatCurrency(item.total_revenue),
        cogs: formatCurrency(item.total_cogs),
        grossProfit: formatCurrency(item.gross_profit),
        expenses: formatCurrency(item.expenses),
        netProfit: {
          label: formatCurrency(item.net_profit),
          tone: item.net_profit < 0 ? "destructive" : "success"
        }
      }
    })));
    const exportSummary = computed(() => [
      { label: "Periode", value: periodLabel.value },
      { label: "Total Pendapatan", value: formatCurrency(financialSummary.value.totalRevenue) },
      { label: "Laba Bersih", value: formatCurrency(financialSummary.value.netProfit) },
      { label: "Transaksi", value: formatNumber(financialSummary.value.transactionCount) }
    ]);
    const exportRows = computed(() => filteredItems.value.map((item) => ({
      date: formatDate(item.date),
      transactions: `${formatNumber(item.transaction_count)} trx`,
      revenue: formatCurrency(item.total_revenue),
      cogs: formatCurrency(item.total_cogs),
      grossProfit: formatCurrency(item.gross_profit),
      expenses: formatCurrency(item.expenses),
      netProfit: formatCurrency(item.net_profit)
    })));
    async function exportFinancialReport(format) {
      ({
        description: `Pendapatan, HPP, pengeluaran, dan laba bersih periode ${periodLabel.value}.`,
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
        successMessage: "Laporan keuangan berhasil disiapkan.",
        errorMessage: "Gagal mengekspor laporan keuangan."
      });
    }
    function getMetricIcon(metricId) {
      if (metricId === "revenue") {
        return WalletCards;
      }
      if (metricId === "net-profit") {
        return financialSummary.value.netProfit < 0 ? TrendingDown : TrendingUp;
      }
      if (metricId === "cogs") {
        return ReceiptText;
      }
      return Calculator;
    }
    function formatCurrency(value) {
      return currencyFormatter.format(value).replace(/\s/g, "");
    }
    function formatNumber(value) {
      return numberFormatter.format(value);
    }
    function formatDate(value) {
      const date = parseDate(value);
      if (Number.isNaN(date.getTime())) {
        return "-";
      }
      return dateFormatter.format(date);
    }
    function formatDay(value) {
      const date = parseDate(value);
      if (Number.isNaN(date.getTime())) {
        return "-";
      }
      return dayFormatter.format(date);
    }
    function parseDate(value) {
      return /* @__PURE__ */ new Date(`${value}T00:00:00`);
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
        title: "Laporan Keuangan",
        description: "Pantau pendapatan, HPP, pengeluaran, laba kotor, dan laba bersih harian."
      }, null, _parent));
      _push(`<section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="finance-filter-title"><div class="mb-3 flex flex-col gap-1"><h2 id="finance-filter-title" class="text-base font-semibold tracking-normal">Filter laporan</h2><p class="text-sm text-muted-foreground">Endpoint laporan keuangan membutuhkan tanggal awal dan akhir.</p></div><form class="grid gap-3 md:grid-cols-[repeat(2,minmax(0,12rem))_auto]"><div class="space-y-1.5"><label for="finance-start-date" class="text-sm font-medium">Tanggal awal</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "finance-start-date",
        modelValue: unref(startDate),
        "onUpdate:modelValue": ($event) => isRef(startDate) ? startDate.value = $event : null,
        type: "date",
        disabled: unref(isLoading)
      }, null, _parent));
      _push(`</div><div class="space-y-1.5"><label for="finance-end-date" class="text-sm font-medium">Tanggal akhir</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "finance-end-date",
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
      _push(`<section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan laporan keuangan"><!--[-->`);
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
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="finance-table-title"><div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="finance-table-title" class="text-base font-semibold tracking-normal"> Rincian Keuangan Harian </h2><p class="mt-1 text-sm text-muted-foreground"> Periode ${ssrInterpolate(unref(periodLabel))}. </p></div>`);
      _push(ssrRenderComponent(AdminReportExportActions, {
        disabled: unref(isLoading) || !unref(exportRows).length,
        exporting: unref(exporting),
        onExportPdf: ($event) => exportFinancialReport("pdf"),
        onExportExcel: ($event) => exportFinancialReport("excel")
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "finance-report-search",
        "search-label": "Cari laporan keuangan",
        "search-placeholder": "Cari tanggal, pendapatan, laba, atau transaksi",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="finance-profit-filter" class="sr-only"${_scopeId}>Filter laba laporan keuangan</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2$2), {
              id: "finance-profit-filter",
              modelValue: unref(profitFilter),
              "onUpdate:modelValue": ($event) => isRef(profitFilter) ? profitFilter.value = $event : null,
              class: "w-40",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua laba</option><option value="profit"${_scopeId2}>Laba positif</option><option value="loss"${_scopeId2}>Laba negatif</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua laba"),
                    createVNode("option", { value: "profit" }, "Laba positif"),
                    createVNode("option", { value: "loss" }, "Laba negatif")
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
                  for: "finance-profit-filter",
                  class: "sr-only"
                }, "Filter laba laporan keuangan"),
                createVNode(unref(_sfc_main$2$2), {
                  id: "finance-profit-filter",
                  modelValue: unref(profitFilter),
                  "onUpdate:modelValue": ($event) => isRef(profitFilter) ? profitFilter.value = $event : null,
                  class: "w-40",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua laba"),
                    createVNode("option", { value: "profit" }, "Laba positif"),
                    createVNode("option", { value: "loss" }, "Laba negatif")
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
        label: "laporan keuangan",
        "empty-title": "Laporan keuangan tidak ditemukan",
        "empty-description": "Ubah periode, kata kunci, atau filter laba."
      }, null, _parent));
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/reports/finance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=finance-v3P8dSZQ.mjs.map
