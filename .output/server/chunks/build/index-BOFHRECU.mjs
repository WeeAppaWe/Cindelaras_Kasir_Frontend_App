import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, resolveDynamicComponent, openBlock, createBlock, ref, computed, isRef, Fragment, renderList, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode, ssrRenderSlot, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { AlertTriangle, BarChart3, ReceiptText, WalletCards } from 'lucide-vue-next';
import { _ as _sfc_main$2$1, a as _sfc_main$1$1 } from './index-rcdgmEu2.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-B5v6N24G.mjs';
import { c as cn } from './index-H80jjgLf.mjs';
import { _ as _sfc_main$a } from './index-BZG70idc.mjs';
import { _ as _sfc_main$2$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { a as _sfc_main$9$1, b as _sfc_main$1$2, c as _sfc_main$5$1, d as _sfc_main$2$3, e as _sfc_main$8$1, f as _sfc_main$6$1, _ as _sfc_main$b } from './index-DSBdqIS4.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useApiClient, a as apiEndpoints } from './api-endpoints-Bk94Aoou.mjs';
import 'class-variance-authority';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "AdminDashboardMetric",
  __ssrInlineRender: true,
  props: {
    label: {},
    value: {},
    helper: {},
    tone: { default: "default" },
    trendLabel: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const toneClass = computed(() => {
      if (props.tone === "success") {
        return "border-success/40 bg-success/10";
      }
      if (props.tone === "warning") {
        return "border-warning/50 bg-warning/15";
      }
      if (props.tone === "info") {
        return "border-info/40 bg-info/10";
      }
      if (props.tone === "profit") {
        return "border-profit/40 bg-profit/10";
      }
      if (props.tone === "destructive") {
        return "border-destructive/40 bg-destructive/10";
      }
      return "bg-card";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["rounded-md border p-3 text-card-foreground shadow-xs", unref(toneClass)],
        "aria-label": __props.label
      }, _attrs))}><div class="flex items-start justify-between gap-3"><div class="min-w-0"><p class="truncate text-xs font-medium text-muted-foreground">${ssrInterpolate(__props.label)}</p><p class="mt-1 truncate text-2xl font-semibold tracking-normal">${ssrInterpolate(__props.value)}</p></div>`);
      if (_ctx.$slots.icon) {
        _push(`<div class="flex size-9 shrink-0 items-center justify-center rounded-md bg-background/80 text-muted-foreground">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mt-3 flex min-w-0 items-center justify-between gap-2"><p class="min-w-0 truncate text-xs text-muted-foreground">${ssrInterpolate(__props.helper)}</p>`);
      if (__props.trendLabel) {
        _push(`<p class="shrink-0 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-foreground">${ssrInterpolate(__props.trendLabel)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/molecules/AdminDashboardMetric.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const AdminDashboardMetric = Object.assign(_sfc_main$9, { __name: "MoleculesAdminDashboardMetric" });
function mergeBaseApexChartOptions(baseOptions, overrideOptions) {
  if (!overrideOptions) {
    return baseOptions;
  }
  return mergeRecords(
    baseOptions,
    overrideOptions
  );
}
function formatBaseApexChartValue(value, prefix = "", suffix = "") {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return "-";
  }
  return `${prefix}${numericValue.toLocaleString("id-ID")}${suffix}`;
}
function clampBaseApexPercentage(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return 0;
  }
  return Math.min(100, Math.max(0, numericValue));
}
function mergeRecords(baseRecord, overrideRecord) {
  const mergedRecord = { ...baseRecord };
  for (const [key, overrideValue] of Object.entries(overrideRecord)) {
    const baseValue = mergedRecord[key];
    mergedRecord[key] = isPlainRecord(baseValue) && isPlainRecord(overrideValue) ? mergeRecords(baseValue, overrideValue) : overrideValue;
  }
  return mergedRecord;
}
function isPlainRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "BaseApexChart",
  __ssrInlineRender: true,
  props: {
    type: {},
    options: {},
    series: {},
    height: { default: 320 },
    loading: { type: Boolean, default: false },
    empty: { type: Boolean, default: false },
    emptyText: { default: "Data chart belum tersedia." },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const normalizedHeight = computed(() => typeof props.height === "number" ? `${props.height}px` : props.height);
    const shouldShowEmpty = computed(() => props.empty || !hasSeriesData(props.series));
    function hasSeriesData(series) {
      if (!Array.isArray(series) || !series.length) {
        return false;
      }
      return series.some((item) => {
        if (typeof item === "number") {
          return true;
        }
        if (!item || typeof item !== "object" || !("data" in item) || !Array.isArray(item.data)) {
          return false;
        }
        return item.data.some((value) => value !== null && value !== void 0);
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("w-full min-w-0", props.class)
      }, _attrs))}>`);
      if (__props.loading) {
        _push(`<div class="flex w-full animate-pulse items-end gap-2 rounded-md border border-dashed bg-muted/30 p-4" style="${ssrRenderStyle({ minHeight: unref(normalizedHeight) })}" aria-hidden="true"><!--[-->`);
        ssrRenderList(12, (index) => {
          _push(`<span class="flex-1 rounded-t-sm bg-muted" style="${ssrRenderStyle({ height: `${24 + index * 17 % 72}%` })}"></span>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(shouldShowEmpty)) {
        _push(`<div class="flex w-full items-center justify-center rounded-md border border-dashed bg-muted/20 px-4 text-center text-sm text-muted-foreground" style="${ssrRenderStyle({ minHeight: unref(normalizedHeight) })}">${ssrInterpolate(__props.emptyText)}</div>`);
      } else {
        _push(ssrRenderComponent(_component_ClientOnly, null, {
          fallback: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex w-full animate-pulse items-end gap-2 rounded-md border border-dashed bg-muted/30 p-4" style="${ssrRenderStyle({ minHeight: unref(normalizedHeight) })}" aria-hidden="true"${_scopeId}><!--[-->`);
              ssrRenderList(12, (index) => {
                _push2(`<span class="flex-1 rounded-t-sm bg-muted" style="${ssrRenderStyle({ height: `${24 + index * 17 % 72}%` })}"${_scopeId}></span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", {
                  class: "flex w-full animate-pulse items-end gap-2 rounded-md border border-dashed bg-muted/30 p-4",
                  style: { minHeight: unref(normalizedHeight) },
                  "aria-hidden": "true"
                }, [
                  (openBlock(), createBlock(Fragment, null, renderList(12, (index) => {
                    return createVNode("span", {
                      key: `base-chart-fallback-${index}`,
                      class: "flex-1 rounded-t-sm bg-muted",
                      style: { height: `${24 + index * 17 % 72}%` }
                    }, null, 4);
                  }), 64))
                ], 4)
              ];
            }
          })
        }, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/BaseApexChart/BaseApexChart.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const BaseApexChart = Object.assign(_sfc_main$8, { __name: "BaseApexChart" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "BaseRadialBarChart",
  __ssrInlineRender: true,
  props: {
    series: {},
    labels: {},
    title: {},
    height: { default: 320 },
    colors: { default: () => ["#0369a1", "#16a34a", "#f59e0b", "#dc2626"] },
    hollowSize: { default: "68%" },
    totalLabel: { default: "Rata-rata" },
    showLegend: { type: Boolean, default: true },
    showTotal: { type: Boolean, default: true },
    startAngle: { default: -135 },
    endAngle: { default: 135 },
    loading: { type: Boolean, default: false },
    empty: { type: Boolean, default: false },
    emptyText: { default: "Data chart belum tersedia." },
    options: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const normalizedSeries = computed(() => props.series.map(clampBaseApexPercentage));
    const chartOptions = computed(() => {
      const baseOptions = {
        chart: {
          type: "radialBar",
          fontFamily: "var(--font-sans)",
          toolbar: { show: false }
        },
        colors: props.colors,
        labels: [...props.labels],
        legend: {
          fontSize: "12px",
          labels: {
            colors: "var(--foreground)"
          },
          position: "bottom",
          show: props.showLegend && props.labels.length > 1
        },
        plotOptions: {
          radialBar: {
            endAngle: props.endAngle,
            hollow: {
              background: "transparent",
              size: props.hollowSize
            },
            startAngle: props.startAngle,
            track: {
              background: "var(--muted)",
              margin: 6,
              strokeWidth: "97%"
            },
            dataLabels: {
              name: {
                color: "var(--muted-foreground)",
                fontSize: "12px",
                fontWeight: 500
              },
              value: {
                color: "var(--foreground)",
                fontSize: "20px",
                fontWeight: 700,
                formatter: (value) => `${Math.round(Number(value))}%`
              },
              total: {
                show: props.showTotal,
                color: "var(--foreground)",
                fontSize: "20px",
                fontWeight: 700,
                label: props.totalLabel,
                formatter: (context) => {
                  const totals = context.globals.seriesTotals;
                  if (!totals.length) {
                    return "0%";
                  }
                  const average = totals.reduce((sum, value) => sum + value, 0) / totals.length;
                  return `${Math.round(average)}%`;
                }
              }
            }
          }
        },
        stroke: {
          lineCap: "round"
        }
      };
      if (props.title?.trim()) {
        baseOptions.title = {
          align: "left",
          text: props.title,
          style: {
            color: "var(--foreground)",
            fontSize: "14px",
            fontWeight: 600
          }
        };
      }
      return mergeBaseApexChartOptions(baseOptions, props.options);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseApexChart, mergeProps({
        type: "radialBar",
        height: __props.height,
        options: unref(chartOptions),
        series: unref(normalizedSeries),
        loading: __props.loading,
        empty: __props.empty,
        "empty-text": __props.emptyText,
        class: props.class
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/BaseRadialBarChart/BaseRadialBarChart.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const BaseRadialBarChart = Object.assign(_sfc_main$7, { __name: "BaseRadialBarChart" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AdminInventoryStatusPanel",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const props = __props;
    const statusDefinitions = [
      {
        label: "Kritis",
        tone: "destructive",
        color: "#dc2626",
        helper: "Stok < batas minimum"
      },
      {
        label: "Menipis",
        tone: "warning",
        color: "#f59e0b",
        helper: "Stok mendekati batas minimum"
      },
      {
        label: "Aman",
        tone: "success",
        color: "#16a34a",
        helper: "Stok > batas minimum"
      }
    ];
    const totalItems = computed(() => props.items.reduce((total, item) => total + item.count, 0));
    const statusCounts = computed(() => statusDefinitions.map((definition) => getStatusCount(definition.tone)));
    const statusPercentages = computed(() => statusDefinitions.map((definition, index) => {
      const item = getStatusItem(definition.tone);
      if (item?.percentage) {
        return item.percentage;
      }
      const count = statusCounts.value[index] ?? 0;
      return totalItems.value > 0 ? Math.round(count / totalItems.value * 100) : 0;
    }));
    const statusLabels = computed(() => statusDefinitions.map((definition) => definition.label));
    const statusColors = computed(() => statusDefinitions.map((definition) => definition.color));
    const inventoryChartOptions = computed(() => ({
      plotOptions: {
        radialBar: {
          dataLabels: {
            total: {
              formatter: () => `${totalItems.value} item`
            }
          }
        }
      }
    }));
    function getStatusCount(tone) {
      return getStatusItem(tone)?.count ?? 0;
    }
    function getStatusItem(tone) {
      return props.items.find((item) => item.tone === tone);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "rounded-md border bg-card p-4 text-card-foreground shadow-xs",
        "aria-labelledby": "admin-inventory-status-title"
      }, _attrs))}><div class="flex items-start justify-between gap-3"><div class="min-w-0"><h2 id="admin-inventory-status-title" class="text-base font-semibold tracking-normal"> Status Persediaan </h2><p class="mt-1 text-sm text-muted-foreground"> Perbandingan stok saat ini terhadap batas minimum. </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        "as-child": "",
        variant: "outline",
        size: "sm",
        class: "shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/admin/reports/inventory" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lihat semua `);
                } else {
                  return [
                    createTextVNode(" Lihat semua ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, { to: "/admin/reports/inventory" }, {
                default: withCtx(() => [
                  createTextVNode(" Lihat semua ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.items.length) {
        _push(`<div class="mt-4 space-y-4"><div class="rounded-md border bg-muted/20 px-3 py-3"><div class="grid gap-2 lg:grid-cols-[minmax(0,1fr)_9rem] lg:items-center">`);
        _push(ssrRenderComponent(BaseRadialBarChart, {
          colors: unref(statusColors),
          labels: unref(statusLabels),
          options: unref(inventoryChartOptions),
          series: unref(statusPercentages),
          "show-legend": false,
          "total-label": "Total bahan",
          height: "220"
        }, null, _parent));
        _push(`<div class="grid grid-cols-3 gap-2 px-1 pb-1 sm:flex sm:flex-wrap lg:block lg:space-y-3 lg:px-0 lg:pb-0"><!--[-->`);
        ssrRenderList(statusDefinitions, (definition) => {
          _push(`<div class="flex items-center gap-2"><span class="size-2.5 shrink-0 rounded-full" style="${ssrRenderStyle({ backgroundColor: definition.color })}" aria-hidden="true"></span><div class="min-w-0"><p class="text-sm font-medium">${ssrInterpolate(definition.label)}</p></div></div>`);
        });
        _push(`<!--]--></div></div></div><div class="grid gap-2 sm:grid-cols-3"><!--[-->`);
        ssrRenderList(statusDefinitions, (definition) => {
          _push(`<article class="rounded-md border p-3"${ssrRenderAttr("aria-label", `${definition.label}: ${getStatusCount(definition.tone)} item`)}><div class="flex items-center justify-between gap-3"><span class="inline-flex min-w-0 items-center gap-2 text-sm font-medium"><span class="size-2.5 shrink-0 rounded-full" style="${ssrRenderStyle({ backgroundColor: definition.color })}" aria-hidden="true"></span> ${ssrInterpolate(definition.label)}</span><span class="text-lg font-semibold">${ssrInterpolate(getStatusCount(definition.tone))}</span></div></article>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<p class="mt-4 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground"> Belum ada data persediaan. </p>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/organisms/AdminInventoryStatusPanel.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const AdminInventoryStatusPanel = Object.assign(_sfc_main$6, { __name: "OrganismsAdminInventoryStatusPanel" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BaseBarChart",
  __ssrInlineRender: true,
  props: {
    series: {},
    categories: {},
    title: {},
    height: { default: 320 },
    horizontal: { type: Boolean, default: false },
    stacked: { type: Boolean, default: false },
    stackType: {},
    distributed: { type: Boolean, default: false },
    colors: { default: () => ["#0369a1", "#16a34a", "#f59e0b", "#dc2626"] },
    valuePrefix: { default: "" },
    valueSuffix: { default: "" },
    xAxisTitle: {},
    yAxisTitle: {},
    showLegend: { type: Boolean, default: true },
    showDataLabels: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    empty: { type: Boolean, default: false },
    emptyText: { default: "Data chart belum tersedia." },
    options: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const normalizedSeries = computed(() => props.series.map((item) => ({
      ...item,
      data: [...item.data]
    })));
    const chartOptions = computed(() => {
      const baseOptions = {
        chart: {
          type: "bar",
          fontFamily: "var(--font-sans)",
          stacked: props.stacked,
          stackType: props.stackType,
          toolbar: { show: false },
          zoom: { enabled: false }
        },
        colors: props.colors,
        dataLabels: {
          enabled: props.showDataLabels,
          formatter: (value) => formatBaseApexChartValue(value, props.valuePrefix, props.valueSuffix),
          style: {
            colors: ["var(--foreground)"],
            fontSize: "11px"
          }
        },
        fill: {
          opacity: 1
        },
        grid: {
          borderColor: "var(--border)",
          strokeDashArray: 4
        },
        legend: {
          fontSize: "12px",
          labels: {
            colors: "var(--foreground)"
          },
          position: "top",
          show: props.showLegend && props.series.length > 1
        },
        plotOptions: {
          bar: {
            barHeight: "68%",
            borderRadius: 4,
            borderRadiusApplication: "end",
            borderRadiusWhenStacked: "last",
            columnWidth: "48%",
            distributed: props.distributed,
            horizontal: props.horizontal
          }
        },
        stroke: {
          colors: ["transparent"],
          show: true,
          width: 2
        },
        tooltip: {
          y: {
            formatter: (value) => formatBaseApexChartValue(value, props.valuePrefix, props.valueSuffix)
          }
        },
        xaxis: {
          categories: [...props.categories],
          labels: {
            rotate: props.horizontal ? 0 : -30,
            style: {
              colors: "var(--muted-foreground)",
              fontSize: "12px"
            },
            trim: true
          },
          title: {
            text: props.xAxisTitle
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: "var(--muted-foreground)",
              fontSize: "12px"
            }
          },
          title: {
            text: props.yAxisTitle
          }
        }
      };
      if (props.title?.trim()) {
        baseOptions.title = {
          align: "left",
          text: props.title,
          style: {
            color: "var(--foreground)",
            fontSize: "14px",
            fontWeight: 600
          }
        };
      }
      return mergeBaseApexChartOptions(baseOptions, props.options);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseApexChart, mergeProps({
        type: "bar",
        height: __props.height,
        options: unref(chartOptions),
        series: unref(normalizedSeries),
        loading: __props.loading,
        empty: __props.empty,
        "empty-text": __props.emptyText,
        class: props.class
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/BaseBarChart/BaseBarChart.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const BaseBarChart = Object.assign(_sfc_main$5, { __name: "BaseBarChart" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AdminPopularMenuPanel",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const props = __props;
    const chartCategories = computed(() => props.items.map((item) => item.name));
    const chartHeight = computed(() => Math.max(260, props.items.length * 58));
    const chartSeries = computed(() => [
      {
        name: "Terjual",
        data: props.items.map((item) => item.sold)
      }
    ]);
    const chartOptions = computed(() => ({
      tooltip: {
        y: {
          formatter: (value) => `${formatNumber2(Number(value))} porsi`
        }
      },
      xaxis: {
        labels: {
          formatter: (value) => formatNumber2(Number(value))
        }
      }
    }));
    function formatNumber2(value) {
      return Number.isFinite(value) ? new Intl.NumberFormat("id-ID").format(value) : "-";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "rounded-md border bg-card p-4 text-card-foreground shadow-xs",
        "aria-labelledby": "admin-popular-menu-title"
      }, _attrs))}><div class="flex items-start justify-between gap-3"><div class="min-w-0"><h2 id="admin-popular-menu-title" class="text-base font-semibold tracking-normal"> Menu Terlaris </h2><p class="mt-1 text-sm text-muted-foreground"> Urutan berdasarkan jumlah terjual sepanjang masa. </p></div></div>`);
      if (__props.items.length) {
        _push(`<div class="mt-4">`);
        _push(ssrRenderComponent(BaseBarChart, {
          categories: unref(chartCategories),
          height: unref(chartHeight),
          options: unref(chartOptions),
          series: unref(chartSeries),
          colors: ["#0369a1"],
          horizontal: "",
          "value-suffix": " porsi",
          class: "rounded-md border bg-muted/20 p-2"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<p class="mt-4 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground"> Belum ada menu terjual. </p>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/organisms/AdminPopularMenuPanel.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const AdminPopularMenuPanel = Object.assign(_sfc_main$4, { __name: "OrganismsAdminPopularMenuPanel" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BaseMixedChart",
  __ssrInlineRender: true,
  props: {
    series: {},
    categories: {},
    title: {},
    height: { default: 320 },
    primaryYAxisTitle: {},
    secondaryYAxisTitle: {},
    colors: { default: () => ["#0369a1", "#16a34a", "#f59e0b"] },
    strokeWidths: { default: () => [0, 3] },
    dataLabelSeriesIndexes: { default: () => [1] },
    showDataLabels: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    empty: { type: Boolean, default: false },
    emptyText: { default: "Data chart belum tersedia." },
    options: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const normalizedSeries = computed(() => props.series.map((item) => ({
      ...item,
      data: [...item.data]
    })));
    const normalizedStrokeWidths = computed(() => props.series.map((item, index) => props.strokeWidths[index] ?? (item.type === "column" ? 0 : 3)));
    const chartOptions = computed(() => {
      const primarySeries = props.series.find((item) => item.type === "column") ?? props.series[0];
      const secondarySeries = props.series.find((item) => item.type === "line" || item.type === "area") ?? props.series[1] ?? props.series[0];
      const baseOptions = {
        chart: {
          type: "line",
          fontFamily: "var(--font-sans)",
          toolbar: { show: false },
          zoom: { enabled: false }
        },
        colors: props.colors,
        dataLabels: {
          enabled: props.showDataLabels,
          enabledOnSeries: props.dataLabelSeriesIndexes
        },
        fill: {
          opacity: [0.9, 1, 0.25]
        },
        grid: {
          borderColor: "var(--border)",
          strokeDashArray: 4
        },
        labels: [...props.categories],
        legend: {
          fontSize: "12px",
          horizontalAlign: "right",
          labels: {
            colors: "var(--foreground)"
          },
          position: "top"
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: "end",
            columnWidth: "44%"
          }
        },
        stroke: {
          curve: "smooth",
          width: normalizedStrokeWidths.value
        },
        tooltip: {
          intersect: false,
          shared: true
        },
        xaxis: {
          labels: {
            rotate: -30,
            style: {
              colors: "var(--muted-foreground)",
              fontSize: "12px"
            },
            trim: true
          }
        },
        yaxis: [
          {
            title: {
              text: props.primaryYAxisTitle ?? primarySeries?.name ?? ""
            }
          },
          {
            opposite: true,
            title: {
              text: props.secondaryYAxisTitle ?? secondarySeries?.name ?? ""
            }
          }
        ]
      };
      if (props.title?.trim()) {
        baseOptions.title = {
          align: "left",
          text: props.title,
          style: {
            color: "var(--foreground)",
            fontSize: "14px",
            fontWeight: 600
          }
        };
      }
      return mergeBaseApexChartOptions(baseOptions, props.options);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseApexChart, mergeProps({
        type: "line",
        height: __props.height,
        options: unref(chartOptions),
        series: unref(normalizedSeries),
        loading: __props.loading,
        empty: __props.empty,
        "empty-text": __props.emptyText,
        class: props.class
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/BaseMixedChart/BaseMixedChart.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const BaseMixedChart = Object.assign(_sfc_main$3, { __name: "BaseMixedChart" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AdminSalesTrendPanel",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const props = __props;
    const rangeOptions = [
      { label: "7 hari", value: "7" },
      { label: "14 hari", value: "14" },
      { label: "30 hari", value: "30" }
    ];
    const selectedRange = ref("7");
    const filteredItems = computed(() => props.items.slice(-Number(selectedRange.value)));
    const chartCategories = computed(() => filteredItems.value.map((item) => item.label));
    const chartSeries = computed(() => [
      {
        name: "Omset",
        type: "column",
        data: filteredItems.value.map((item) => item.revenue)
      },
      {
        name: "Transaksi",
        type: "line",
        data: filteredItems.value.map((item) => item.transactions)
      }
    ]);
    const chartOptions = computed(() => ({
      tooltip: {
        y: {
          formatter: (value, context) => {
            if (context?.seriesIndex === 1) {
              return `${formatNumber2(Number(value))} transaksi`;
            }
            return formatCurrency2(Number(value));
          }
        }
      },
      yaxis: [
        {
          labels: {
            formatter: (value) => formatCompactCurrency(Number(value))
          },
          title: {
            text: "Omset"
          }
        },
        {
          labels: {
            formatter: (value) => formatNumber2(Number(value))
          },
          opposite: true,
          title: {
            text: "Transaksi"
          }
        }
      ]
    }));
    function formatCurrency2(value) {
      return new Intl.NumberFormat("id-ID", {
        currency: "IDR",
        maximumFractionDigits: 0,
        style: "currency"
      }).format(value).replace(/\s/g, "");
    }
    function formatCompactCurrency(value) {
      if (!Number.isFinite(value)) {
        return "-";
      }
      return `Rp${Math.round(value / 1e6)} jt`;
    }
    function formatNumber2(value) {
      return Number.isFinite(value) ? new Intl.NumberFormat("id-ID").format(value) : "-";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "rounded-md border bg-card p-4 text-card-foreground shadow-xs",
        "aria-labelledby": "admin-sales-trend-title"
      }, _attrs))}><div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="admin-sales-trend-title" class="text-base font-semibold tracking-normal"> Tren Penjualan </h2><p class="mt-1 text-sm text-muted-foreground"> Omset dan transaksi berdasarkan rentang waktu. </p></div><div><label for="admin-sales-trend-range" class="sr-only">Filter waktu tren penjualan</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$2$2), {
        id: "admin-sales-trend-range",
        modelValue: unref(selectedRange),
        "onUpdate:modelValue": ($event) => isRef(selectedRange) ? selectedRange.value = $event : null,
        class: "w-32"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(rangeOptions, (option) => {
              _push2(`<option${ssrRenderAttr("value", option.value)}${_scopeId}>${ssrInterpolate(option.label)}</option>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(rangeOptions, (option) => {
                return createVNode("option", {
                  key: option.value,
                  value: option.value
                }, toDisplayString(option.label), 9, ["value"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(filteredItems).length) {
        _push(`<div class="mt-4">`);
        _push(ssrRenderComponent(BaseMixedChart, {
          categories: unref(chartCategories),
          series: unref(chartSeries),
          options: unref(chartOptions),
          "stroke-widths": [0, 3],
          colors: ["#0369a1", "#16a34a"],
          "primary-y-axis-title": "Omset",
          "secondary-y-axis-title": "Transaksi",
          class: "rounded-md border bg-muted/20 p-2",
          height: "280"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<p class="mt-4 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground"> Belum ada data penjualan. </p>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/organisms/AdminSalesTrendPanel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AdminSalesTrendPanel = Object.assign(_sfc_main$2, { __name: "OrganismsAdminSalesTrendPanel" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminStockMovementPanel",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    function getTypeClass(type) {
      if (type === "in") {
        return "bg-success text-success-foreground";
      }
      if (type === "out") {
        return "bg-warning text-warning-foreground";
      }
      if (type === "sale") {
        return "bg-primary text-primary-foreground";
      }
      return "bg-secondary text-secondary-foreground";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "rounded-md border bg-card p-4 text-card-foreground shadow-xs",
        "aria-labelledby": "admin-stock-movement-title"
      }, _attrs))}><div class="flex items-start justify-between gap-3"><div class="min-w-0"><h2 id="admin-stock-movement-title" class="text-base font-semibold tracking-normal"> Mutasi Stok </h2><p class="mt-1 text-sm text-muted-foreground"> Pergerakan bahan terbaru dari transaksi dan aktivitas persediaan. </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$a), {
        "as-child": "",
        variant: "outline",
        size: "sm",
        class: "shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/admin/stock-history" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lihat semua `);
                } else {
                  return [
                    createTextVNode(" Lihat semua ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, { to: "/admin/stock-history" }, {
                default: withCtx(() => [
                  createTextVNode(" Lihat semua ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.items.length) {
        _push(`<div class="mt-4 rounded-md border">`);
        _push(ssrRenderComponent(unref(_sfc_main$9$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5$1), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$2$3), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Waktu`);
                              } else {
                                return [
                                  createTextVNode("Waktu")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$2$3), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Bahan`);
                              } else {
                                return [
                                  createTextVNode("Bahan")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$2$3), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Tipe`);
                              } else {
                                return [
                                  createTextVNode("Tipe")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$2$3), { class: "text-right" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Jumlah`);
                              } else {
                                return [
                                  createTextVNode("Jumlah")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$2$3), { class: "text-right" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Saldo`);
                              } else {
                                return [
                                  createTextVNode("Saldo")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$2$3), null, {
                              default: withCtx(() => [
                                createTextVNode("Waktu")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$2$3), null, {
                              default: withCtx(() => [
                                createTextVNode("Bahan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$2$3), null, {
                              default: withCtx(() => [
                                createTextVNode("Tipe")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$2$3), { class: "text-right" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$2$3), { class: "text-right" }, {
                              default: withCtx(() => [
                                createTextVNode("Saldo")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$2$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Waktu")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Bahan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Tipe")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$3), { class: "text-right" }, {
                            default: withCtx(() => [
                              createTextVNode("Jumlah")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$3), { class: "text-right" }, {
                            default: withCtx(() => [
                              createTextVNode("Saldo")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$8$1), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(__props.items, (item) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$5$1), {
                        key: item.id,
                        class: "last:border-b-0"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$6$1), { class: "font-mono text-xs tabular-nums" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.time)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.time), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6$1), { class: "font-medium" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.ingredientName)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.ingredientName), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6$1), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$b), {
                                    class: getTypeClass(item.type)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.typeLabel)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.typeLabel), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$b), {
                                      class: getTypeClass(item.type)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.typeLabel), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6$1), { class: "text-right font-medium" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.quantityLabel)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.quantityLabel), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6$1), { class: "text-right text-muted-foreground" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.balanceLabel)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.balanceLabel), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$6$1), { class: "font-mono text-xs tabular-nums" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.time), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6$1), { class: "font-medium" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.ingredientName), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6$1), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$b), {
                                    class: getTypeClass(item.type)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.typeLabel), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6$1), { class: "text-right font-medium" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.quantityLabel), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6$1), { class: "text-right text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.balanceLabel), 1)
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
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                        return openBlock(), createBlock(unref(_sfc_main$5$1), {
                          key: item.id,
                          class: "last:border-b-0"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$6$1), { class: "font-mono text-xs tabular-nums" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.time), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$6$1), { class: "font-medium" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.ingredientName), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$6$1), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$b), {
                                  class: getTypeClass(item.type)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.typeLabel), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["class"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$6$1), { class: "text-right font-medium" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.quantityLabel), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$6$1), { class: "text-right text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.balanceLabel), 1)
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
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$1$2), null, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$5$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2$3), null, {
                          default: withCtx(() => [
                            createTextVNode("Waktu")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$3), null, {
                          default: withCtx(() => [
                            createTextVNode("Bahan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$3), null, {
                          default: withCtx(() => [
                            createTextVNode("Tipe")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$3), { class: "text-right" }, {
                          default: withCtx(() => [
                            createTextVNode("Jumlah")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$3), { class: "text-right" }, {
                          default: withCtx(() => [
                            createTextVNode("Saldo")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$8$1), null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item) => {
                      return openBlock(), createBlock(unref(_sfc_main$5$1), {
                        key: item.id,
                        class: "last:border-b-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6$1), { class: "font-mono text-xs tabular-nums" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.time), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6$1), { class: "font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.ingredientName), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6$1), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$b), {
                                class: getTypeClass(item.type)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.typeLabel), 1)
                                ]),
                                _: 2
                              }, 1032, ["class"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6$1), { class: "text-right font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.quantityLabel), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6$1), { class: "text-right text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.balanceLabel), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<p class="mt-4 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground"> Belum ada mutasi stok. </p>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/organisms/AdminStockMovementPanel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AdminStockMovementPanel = Object.assign(_sfc_main$1, { __name: "OrganismsAdminStockMovementPanel" });
function useAdminDashboardApi() {
  const api = useApiClient();
  async function getKpi(query = {}) {
    const payload = await api.get(apiEndpoints.dashboard.kpi, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getSalesTrend(query = {}) {
    const payload = await api.get(apiEndpoints.dashboard.salesTrend, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getTopMenus(query = {}) {
    const payload = await api.get(apiEndpoints.dashboard.topMenus, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getStockStatus() {
    const payload = await api.get(apiEndpoints.dashboard.stockStatus);
    return extractApiPayload(payload);
  }
  async function getRecentStockMovements() {
    const payload = await api.get(apiEndpoints.dashboard.recentStockMovements);
    return extractApiPayload(payload);
  }
  return {
    getKpi,
    getSalesTrend,
    getTopMenus,
    getStockStatus,
    getRecentStockMovements
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
    if ("response" in payload && isStandardEnvelopeShape(payload)) {
      return payload.response;
    }
  }
  return payload;
}
function isDirectResponseShape(value) {
  return typeof value.code === "number" && typeof value.message === "string";
}
function isStandardEnvelopeShape(value) {
  return isRecord(value.metaData);
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});
const numberFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 2
});
const compactNumberFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0
});
function useAdminDashboard() {
  const dashboardApi = useAdminDashboardApi();
  const isLoading = ref(false);
  const errorMessage = ref("");
  const kpi = ref(null);
  const salesTrendRecords = ref([]);
  const topMenuRecords = ref([]);
  const stockStatus = ref(null);
  const stockMovementRecords = ref([]);
  const summaryMetrics = computed(() => createSummaryMetrics(kpi.value));
  const salesTrend = computed(() => mapSalesTrendRecords(salesTrendRecords.value));
  const popularMenus = computed(() => topMenuRecords.value.map(mapTopMenuRecord));
  const inventoryStatus = computed(() => mapStockStatusResponse(stockStatus.value));
  const stockMovements = computed(() => stockMovementRecords.value.map(mapRecentStockMovementRecord));
  async function loadDashboard() {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const [kpiResult, trendResult, menusResult, statusResult, movementsResult] = await Promise.all([
        dashboardApi.getKpi(),
        dashboardApi.getSalesTrend({ days: 30 }),
        dashboardApi.getTopMenus(),
        dashboardApi.getStockStatus(),
        dashboardApi.getRecentStockMovements()
      ]);
      kpi.value = kpiResult;
      salesTrendRecords.value = Array.isArray(trendResult.data) ? trendResult.data : [];
      topMenuRecords.value = Array.isArray(menusResult.items) ? menusResult.items : [];
      stockStatus.value = statusResult;
      stockMovementRecords.value = Array.isArray(movementsResult.items) ? movementsResult.items : [];
    } catch (error) {
      errorMessage.value = getErrorMessage(error, "Gagal memuat data dashboard.");
      kpi.value = null;
      salesTrendRecords.value = [];
      topMenuRecords.value = [];
      stockStatus.value = null;
      stockMovementRecords.value = [];
    } finally {
      isLoading.value = false;
    }
  }
  return {
    errorMessage,
    inventoryStatus,
    isLoading,
    loadDashboard,
    popularMenus,
    salesTrend,
    stockMovements,
    summaryMetrics
  };
}
function createSummaryMetrics(kpi) {
  if (!kpi) {
    return createEmptySummaryMetrics();
  }
  const revenueToday = toNumber(kpi?.revenue.today);
  const revenueChangeAmount = toNumber(kpi?.revenue.change_amount);
  const revenueChangePercentage = toNullableNumber(kpi?.revenue.change_percentage);
  const transactionsToday = toNumber(kpi?.transactions.today);
  const transactionChange = toNumber(kpi?.transactions.change);
  const grossProfit = toNumber(kpi?.profit.gross_profit);
  const marginPercentage = toNumber(kpi?.profit.margin_percentage);
  const lowStockCount = toNumber(kpi?.low_stock.count);
  return [
    {
      id: "today-revenue",
      label: "Omset Hari Ini",
      value: formatCurrency(revenueToday),
      helper: "Akumulasi transaksi hari ini",
      tone: getRevenueTone(revenueChangeAmount),
      trendLabel: formatPercentageTrend(revenueChangePercentage, "dari kemarin")
    },
    {
      id: "today-transactions",
      label: "Total Transaksi",
      value: compactNumberFormatter.format(transactionsToday),
      helper: "Semua metode pembayaran",
      tone: "info",
      trendLabel: `${formatSignedNumber(transactionChange)} transaksi`
    },
    {
      id: "estimated-profit",
      label: "Estimasi Profit",
      value: formatCurrency(grossProfit),
      helper: "Berdasarkan modal resep",
      tone: "profit",
      trendLabel: `${formatNumber(marginPercentage)}% margin kotor`
    },
    {
      id: "low-stock",
      label: "Stok Menipis",
      value: compactNumberFormatter.format(lowStockCount),
      helper: "Kritis atau mendekati minimum",
      tone: lowStockCount > 0 ? "warning" : "success",
      trendLabel: lowStockCount > 0 ? "Cek persediaan" : "Stok aman"
    }
  ];
}
function createEmptySummaryMetrics() {
  return [
    {
      id: "today-revenue",
      label: "Omset Hari Ini",
      value: "-",
      helper: "Akumulasi transaksi hari ini",
      tone: "default"
    },
    {
      id: "today-transactions",
      label: "Total Transaksi",
      value: "-",
      helper: "Semua metode pembayaran",
      tone: "info"
    },
    {
      id: "estimated-profit",
      label: "Estimasi Profit",
      value: "-",
      helper: "Berdasarkan modal resep",
      tone: "profit"
    },
    {
      id: "low-stock",
      label: "Stok Menipis",
      value: "-",
      helper: "Kritis atau mendekati minimum",
      tone: "warning"
    }
  ];
}
function mapSalesTrendRecords(records) {
  const highestRevenue = Math.max(0, ...records.map((item) => toNumber(item.revenue)));
  return records.map((item) => {
    const revenue = toNumber(item.revenue);
    return {
      label: item.label,
      revenue,
      transactions: toNumber(item.transaction_count),
      revenueLabel: formatCurrency(revenue),
      ratio: highestRevenue > 0 ? Math.max(8, Math.round(revenue / highestRevenue * 100)) : 0
    };
  });
}
function mapTopMenuRecord(record) {
  const revenue = toNumber(record.revenue);
  return {
    id: record.menu_id,
    name: record.menu_name,
    category: record.category_name,
    sold: toNumber(record.qty_sold),
    revenue,
    marginPercent: Math.round(toNumber(record.margin_percentage)),
    revenueLabel: formatCurrency(revenue)
  };
}
function mapStockStatusResponse(response) {
  const categories = response?.categories ?? [];
  return [
    mapStockStatusCategory(categories, "KRITIS"),
    mapStockStatusCategory(categories, "MENIPIS"),
    mapStockStatusCategory(categories, "AMAN")
  ];
}
function mapStockStatusCategory(categories, status) {
  const category = categories.find((item) => normalizeStockStatus(item.status) === status);
  const tone = getInventoryToneFromStatus(status);
  return {
    id: status.toLowerCase(),
    status,
    count: toNumber(category?.count),
    percentage: toNumber(category?.percentage),
    statusLabel: getInventoryStatusLabel(tone),
    tone
  };
}
function mapRecentStockMovementRecord(record) {
  const qty = toNumber(record.qty);
  const absQty = Math.abs(qty);
  const type = getStockMovementType(record.stock_type_name, qty);
  return {
    id: record.stock_movement_id,
    time: formatTime(record.created_at),
    ingredientName: record.ingredient_name,
    type,
    typeLabel: formatStockTypeLabel(record.stock_type_name),
    quantityLabel: `${qty < 0 ? "-" : "+"}${formatNumber(absQty)}`,
    balanceLabel: formatNumber(toNumber(record.current_stock))
  };
}
function getInventoryToneFromStatus(status) {
  const normalized = normalizeStockStatus(status);
  if (normalized === "KRITIS") {
    return "destructive";
  }
  if (normalized === "MENIPIS") {
    return "warning";
  }
  return "success";
}
function getInventoryStatusLabel(tone) {
  if (tone === "destructive") {
    return "Kritis";
  }
  if (tone === "warning") {
    return "Menipis";
  }
  return "Aman";
}
function getStockMovementType(stockTypeName, qty) {
  const normalized = normalizeStockTypeName(stockTypeName);
  if (normalized.includes("SALES") || normalized === "SALES") {
    return "sale";
  }
  if (normalized.includes("OPNAME")) {
    return "opname";
  }
  if (normalized.startsWith("OUT_") || normalized === "STOCK_OUT" || qty < 0) {
    return "out";
  }
  if (normalized.startsWith("IN_") || normalized === "STOCK_IN" || qty > 0) {
    return "in";
  }
  return "adjustment";
}
function formatStockTypeLabel(name) {
  const normalized = normalizeStockTypeName(name);
  if (normalized === "STOCK_IN" || normalized === "IN_PURCHASE") {
    return "Stok masuk";
  }
  if (normalized === "STOCK_OUT") {
    return "Stok keluar";
  }
  if (normalized === "OUT_DAMAGED") {
    return "Rusak";
  }
  if (normalized === "OUT_EXPIRED") {
    return "Kedaluwarsa";
  }
  if (normalized === "OUT_SALES" || normalized === "SALES") {
    return "Penjualan";
  }
  if (normalized === "IN_PRODUCTION") {
    return "Hasil produksi";
  }
  if (normalized === "OUT_PRODUCTION") {
    return "Pemakaian produksi";
  }
  if (normalized.includes("PRODUCTION")) {
    return "Produksi";
  }
  if (normalized.includes("OPNAME")) {
    return "Opname";
  }
  if (normalized.includes("ADJUSTMENT")) {
    return "Penyesuaian";
  }
  if (!normalized) {
    return "-";
  }
  return normalized.split("_").filter(Boolean).map((segment) => `${segment.charAt(0)}${segment.slice(1).toLowerCase()}`).join(" ");
}
function getRevenueTone(changeAmount) {
  if (changeAmount < 0) {
    return "warning";
  }
  return "success";
}
function formatCurrency(value) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0).replace(/\s/g, "");
}
function formatNumber(value) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}
function formatSignedNumber(value) {
  if (value === 0) {
    return "0";
  }
  return `${value > 0 ? "+" : "-"}${formatNumber(Math.abs(value))}`;
}
function formatPercentageTrend(value, suffix) {
  if (value === null) {
    return "Belum ada pembanding";
  }
  return `${formatSignedNumber(value)}% ${suffix}`;
}
function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
function normalizeStockTypeName(value) {
  return value.trim().toUpperCase().replace(/[\s-]+/g, "_");
}
function normalizeStockStatus(value) {
  return String(value).trim().toUpperCase();
}
function toNumber(value) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}
function toNullableNumber(value) {
  if (value === null || value === void 0 || value === "") {
    return null;
  }
  return toNumber(value);
}
function getErrorMessage(error, fallback) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Dashboard Admin"
    });
    const {
      errorMessage,
      inventoryStatus,
      isLoading,
      popularMenus,
      salesTrend,
      stockMovements,
      summaryMetrics
    } = useAdminDashboard();
    const summaryMetricIcons = {
      "today-revenue": WalletCards,
      "today-transactions": ReceiptText,
      "estimated-profit": BarChart3,
      "low-stock": AlertTriangle
    };
    function getSummaryMetricIcon(metricId) {
      return summaryMetricIcons[metricId] ?? BarChart3;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex min-h-full flex-col gap-3 p-3 sm:p-4",
        "aria-busy": unref(isLoading)
      }, _attrs))}>`);
      _push(ssrRenderComponent(AdminPageHeader, {
        title: "Dashboard Admin",
        description: "Ringkasan operasional, transaksi, profit, dan kondisi stok restoran Cindelaras."
      }, null, _parent));
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
      _push(`<section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan dashboard admin"><!--[-->`);
      ssrRenderList(unref(summaryMetrics), (item) => {
        _push(ssrRenderComponent(AdminDashboardMetric, {
          key: item.label,
          label: item.label,
          value: item.value,
          helper: item.helper,
          tone: item.tone,
          "trend-label": item.trendLabel
        }, {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(getSummaryMetricIcon(item.id)), {
                class: "size-4",
                "aria-hidden": "true"
              }, null), _parent2, _scopeId);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(getSummaryMetricIcon(item.id)), {
                  class: "size-4",
                  "aria-hidden": "true"
                }))
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></section><div>`);
      _push(ssrRenderComponent(AdminSalesTrendPanel, { items: unref(salesTrend) }, null, _parent));
      _push(`</div><div class="grid items-stretch gap-3 xl:grid-cols-[minmax(360px,0.95fr)_minmax(0,1.2fr)]"><div class="grid gap-3">`);
      _push(ssrRenderComponent(AdminPopularMenuPanel, { items: unref(popularMenus) }, null, _parent));
      _push(ssrRenderComponent(AdminInventoryStatusPanel, { items: unref(inventoryStatus) }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AdminStockMovementPanel, {
        items: unref(stockMovements),
        class: "h-full"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BOFHRECU.mjs.map
