import { defineComponent, computed, mergeProps, unref, isRef, withCtx, openBlock, createBlock, Fragment, renderList, toDisplayString, createVNode, createTextVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { ChevronLeft, MoreHorizontal, ChevronRight } from 'lucide-vue-next';
import { _ as _sfc_main$7, a as _sfc_main$6, b as _sfc_main$3, c as _sfc_main$3$1, d as _sfc_main$5, e as _sfc_main$1$1 } from './PaginationPrevious-DSL0-rZ8.mjs';
import { _ as _sfc_main$2$1 } from './NativeSelectOption-BTdv0zYA.mjs';
import { _ as _sfc_main$4 } from './index-DSBdqIS4.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CashierMetric",
  __ssrInlineRender: true,
  props: {
    label: {},
    value: {},
    helper: { default: "" },
    tone: { default: "default" }
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
      if (props.tone === "destructive") {
        return "border-destructive/40 bg-destructive/10";
      }
      return "bg-card";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["rounded-md border px-3 py-2 text-card-foreground shadow-xs", unref(toneClass)],
        "aria-label": props.label
      }, _attrs))}><div class="flex items-start justify-between gap-3"><div class="min-w-0"><p class="truncate text-xs font-medium text-muted-foreground">${ssrInterpolate(props.label)}</p><p class="mt-1 truncate text-lg font-semibold tracking-normal">${ssrInterpolate(props.value)}</p>`);
      if (props.helper) {
        _push(`<p class="mt-1 truncate text-xs text-muted-foreground">${ssrInterpolate(props.helper)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (_ctx.$slots.icon) {
        _push(`<div class="flex size-8 shrink-0 items-center justify-center rounded-md bg-background/80 text-muted-foreground">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/molecules/CashierMetric.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CashierMetric = Object.assign(_sfc_main$2, { __name: "MoleculesCashierMetric" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CashierTablePagination",
  __ssrInlineRender: true,
  props: {
    page: {},
    pageSize: { default: 5 },
    totalItems: {},
    label: {},
    disabled: { type: Boolean, default: false },
    pageSizeOptions: { default: () => [5, 10, 25] }
  },
  emits: ["update:page", "update:pageSize"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const pageValue = computed({
      get: () => props.page,
      set: (value) => emit("update:page", value)
    });
    const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.pageSize)));
    const firstItem = computed(() => props.totalItems ? (props.page - 1) * props.pageSize + 1 : 0);
    const lastItem = computed(() => Math.min(props.page * props.pageSize, props.totalItems));
    const pageSizeId = computed(() => `${props.label.replace(/\s+/g, "-")}-page-size`);
    const pageSizeLabel = computed(() => `${props.label.charAt(0).toUpperCase()}${props.label.slice(1)} per halaman`);
    const summaryText = computed(() => {
      if (props.disabled) {
        return `Memuat ${props.label}...`;
      }
      return `Menampilkan ${firstItem.value}-${lastItem.value} dari ${props.totalItems} ${props.label}.`;
    });
    const pageSizeValue = computed({
      get: () => String(props.pageSize),
      set: (value) => emit("update:pageSize", Number(value))
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between" }, _attrs))}><div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"><p class="text-sm text-muted-foreground" aria-live="polite">${ssrInterpolate(unref(summaryText))}</p><div class="flex items-center gap-2"><label${ssrRenderAttr("for", unref(pageSizeId))} class="text-sm text-muted-foreground">${ssrInterpolate(unref(pageSizeLabel))}</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$2$1), {
        id: unref(pageSizeId),
        modelValue: unref(pageSizeValue),
        "onUpdate:modelValue": ($event) => isRef(pageSizeValue) ? pageSizeValue.value = $event : null,
        class: "w-24",
        disabled: props.disabled
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(props.pageSizeOptions, (option) => {
              _push2(`<option${ssrRenderAttr("value", String(option))}${_scopeId}>${ssrInterpolate(option)}</option>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(props.pageSizeOptions, (option) => {
                return openBlock(), createBlock("option", {
                  key: option,
                  value: String(option)
                }, toDisplayString(option), 9, ["value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(totalPages) > 1 && !props.disabled) {
        _push(ssrRenderComponent(unref(_sfc_main$7), {
          page: unref(pageValue),
          "onUpdate:page": ($event) => isRef(pageValue) ? pageValue.value = $event : null,
          "items-per-page": props.pageSize,
          total: props.totalItems,
          "sibling-count": 1,
          "show-edges": "",
          class: "mx-0 w-auto justify-start sm:justify-end"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$6), null, {
                default: withCtx(({ items }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ChevronLeft), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }, null, _parent4, _scopeId3));
                          _push4(` Sebelumnya `);
                        } else {
                          return [
                            createVNode(unref(ChevronLeft), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }),
                            createTextVNode(" Sebelumnya ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<!--[-->`);
                    ssrRenderList(items, (item, index) => {
                      _push3(`<!--[-->`);
                      if (item.type === "page") {
                        _push3(ssrRenderComponent(unref(_sfc_main$3$1), {
                          value: item.value,
                          "is-active": item.value === unref(pageValue),
                          "aria-label": `Halaman ${item.value}`
                        }, {
                          default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(item.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(item.value), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(ssrRenderComponent(unref(_sfc_main$5), { index }, {
                          default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(MoreHorizontal), {
                                class: "size-4",
                                "aria-hidden": "true"
                              }, null, _parent4, _scopeId3));
                              _push4(`<span class="sr-only"${_scopeId3}>Halaman lainnya</span>`);
                            } else {
                              return [
                                createVNode(unref(MoreHorizontal), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                }),
                                createVNode("span", { class: "sr-only" }, "Halaman lainnya")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$1$1), null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Berikutnya `);
                          _push4(ssrRenderComponent(unref(ChevronRight), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createTextVNode(" Berikutnya "),
                            createVNode(unref(ChevronRight), {
                              class: "size-4",
                              "aria-hidden": "true"
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), null, {
                        default: withCtx(() => [
                          createVNode(unref(ChevronLeft), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }),
                          createTextVNode(" Sebelumnya ")
                        ]),
                        _: 1
                      }),
                      (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                        return openBlock(), createBlock(Fragment, { key: index }, [
                          item.type === "page" ? (openBlock(), createBlock(unref(_sfc_main$3$1), {
                            key: 0,
                            value: item.value,
                            "is-active": item.value === unref(pageValue),
                            "aria-label": `Halaman ${item.value}`
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.value), 1)
                            ]),
                            _: 2
                          }, 1032, ["value", "is-active", "aria-label"])) : (openBlock(), createBlock(unref(_sfc_main$5), {
                            key: 1,
                            index
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(MoreHorizontal), {
                                class: "size-4",
                                "aria-hidden": "true"
                              }),
                              createVNode("span", { class: "sr-only" }, "Halaman lainnya")
                            ]),
                            _: 1
                          }, 8, ["index"]))
                        ], 64);
                      }), 128)),
                      createVNode(unref(_sfc_main$1$1), null, {
                        default: withCtx(() => [
                          createTextVNode(" Berikutnya "),
                          createVNode(unref(ChevronRight), {
                            class: "size-4",
                            "aria-hidden": "true"
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$6), null, {
                  default: withCtx(({ items }) => [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(ChevronLeft), {
                          class: "size-4",
                          "aria-hidden": "true"
                        }),
                        createTextVNode(" Sebelumnya ")
                      ]),
                      _: 1
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                      return openBlock(), createBlock(Fragment, { key: index }, [
                        item.type === "page" ? (openBlock(), createBlock(unref(_sfc_main$3$1), {
                          key: 0,
                          value: item.value,
                          "is-active": item.value === unref(pageValue),
                          "aria-label": `Halaman ${item.value}`
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.value), 1)
                          ]),
                          _: 2
                        }, 1032, ["value", "is-active", "aria-label"])) : (openBlock(), createBlock(unref(_sfc_main$5), {
                          key: 1,
                          index
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(MoreHorizontal), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }),
                            createVNode("span", { class: "sr-only" }, "Halaman lainnya")
                          ]),
                          _: 1
                        }, 8, ["index"]))
                      ], 64);
                    }), 128)),
                    createVNode(unref(_sfc_main$1$1), null, {
                      default: withCtx(() => [
                        createTextVNode(" Berikutnya "),
                        createVNode(unref(ChevronRight), {
                          class: "size-4",
                          "aria-hidden": "true"
                        })
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
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/molecules/CashierTablePagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CashierTablePagination = Object.assign(_sfc_main$1, { __name: "MoleculesCashierTablePagination" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CashierStatusBadge",
  __ssrInlineRender: true,
  props: {
    status: { default: "neutral" }
  },
  setup(__props) {
    const props = __props;
    const statusClass = computed(() => {
      if (props.status === "success") {
        return "border-transparent bg-success text-success-foreground";
      }
      if (props.status === "warning") {
        return "border-transparent bg-warning text-warning-foreground";
      }
      if (props.status === "info") {
        return "border-transparent bg-info text-info-foreground";
      }
      return "border-border bg-secondary text-secondary-foreground";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$4), mergeProps({
        variant: "outline",
        class: unref(statusClass)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/atoms/CashierStatusBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CashierStatusBadge = Object.assign(_sfc_main, { __name: "AtomsCashierStatusBadge" });

export { CashierMetric as C, CashierTablePagination as a, CashierStatusBadge as b };
//# sourceMappingURL=CashierStatusBadge-D7tHIaMY.mjs.map
