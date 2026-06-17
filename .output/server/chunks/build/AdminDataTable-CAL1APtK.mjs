import { defineComponent, computed, ref, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, createVNode, isRef, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { ImageIcon, Eye, ToggleLeft, Pencil, Factory, Trash2, ChevronLeft, MoreHorizontal, ChevronRight } from 'lucide-vue-next';
import { _ as _sfc_main$4 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$2$1 } from './NativeSelectOption-BTdv0zYA.mjs';
import { _ as _sfc_main$7, a as _sfc_main$6$1, b as _sfc_main$a, c as _sfc_main$3$1, d as _sfc_main$5$1, e as _sfc_main$1$2 } from './PaginationPrevious-DSL0-rZ8.mjs';
import { _ as _sfc_main$3 } from './Skeleton-CQWwuiK0.mjs';
import { a as _sfc_main$9, b as _sfc_main$1$1, c as _sfc_main$5, d as _sfc_main$2, e as _sfc_main$8, f as _sfc_main$6, g as _sfc_main$4$1 } from './index-DSBdqIS4.mjs';
import { useForwardPropsEmits, SwitchRoot, SwitchThumb } from 'reka-ui';
import { c as cn } from './index-H80jjgLf.mjs';
import { r as reactiveOmit } from './server.mjs';
import { b as AdminStatusBadge } from './AdminStatusBadge-BmT7CMZl.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Switch",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    modelValue: {},
    disabled: { type: Boolean },
    id: {},
    value: {},
    trueValue: {},
    falseValue: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SwitchRoot), mergeProps({ "data-slot": "switch" }, unref(forwarded), {
        class: unref(cn)(
          "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          props.class
        )
      }, _attrs), {
        default: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SwitchThumb), {
              "data-slot": "switch-thumb",
              class: unref(cn)("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "thumb", slotProps, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "thumb", slotProps)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(SwitchThumb), {
                "data-slot": "switch-thumb",
                class: unref(cn)("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "thumb", slotProps)
                ]),
                _: 2
              }, 1032, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/switch/Switch.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminDataTable",
  __ssrInlineRender: true,
  props: {
    columns: {},
    rows: {},
    loading: { type: Boolean, default: false },
    loadingRowCount: { default: 5 },
    emptyTitle: { default: "Data tidak ditemukan" },
    emptyDescription: { default: "Ubah kata kunci atau filter untuk melihat data lain." },
    label: { default: "data" },
    pageSizeOptions: { default: () => [5, 10, 25] },
    actions: { default: () => ["view", "edit", "delete"] }
  },
  emits: ["view", "toggle", "edit", "produce", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const columnCount = computed(() => props.columns.length + (props.actions.length ? 1 : 0));
    const currentPage = ref(1);
    const pageSize = ref(5);
    const totalPages = computed(() => Math.max(1, Math.ceil(props.rows.length / pageSize.value)));
    const firstItem = computed(() => props.rows.length ? (currentPage.value - 1) * pageSize.value + 1 : 0);
    const lastItem = computed(() => Math.min(currentPage.value * pageSize.value, props.rows.length));
    const pageSizeId = computed(() => `${props.label.replace(/\s+/g, "-")}-admin-page-size`);
    const pageSizeLabel = computed(() => `${props.label.charAt(0).toUpperCase()}${props.label.slice(1)} per halaman`);
    const pageValue = computed({
      get: () => currentPage.value,
      set: (value) => currentPage.value = value
    });
    const pageSizeValue = computed({
      get: () => String(pageSize.value),
      set: (value) => {
        pageSize.value = Number(value);
        currentPage.value = 1;
      }
    });
    const summaryText = computed(() => {
      if (props.loading) {
        return `Memuat ${props.label}...`;
      }
      return `Menampilkan ${firstItem.value}-${lastItem.value} dari ${props.rows.length} ${props.label}.`;
    });
    const actionColumnClass = computed(() => {
      if (props.actions.length >= 5) {
        return "w-[26rem] min-w-[26rem] text-right";
      }
      if (props.actions.length === 4) {
        return "w-92 min-w-92 text-right";
      }
      if (props.actions.length === 3) {
        return "w-68 min-w-68 text-right";
      }
      if (props.actions.length === 2) {
        return "w-44 min-w-44 text-right";
      }
      return "w-24 min-w-24 text-right";
    });
    const paginatedRows = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      return props.rows.slice(start, start + pageSize.value);
    });
    watch(() => props.rows, () => {
      currentPage.value = 1;
    });
    watch(totalPages, (value) => {
      if (currentPage.value > value) {
        currentPage.value = value;
      }
    });
    function getCell(row, key) {
      const cell = row.cells[key];
      if (cell && typeof cell === "object" && "label" in cell) {
        return cell;
      }
      return {
        label: String(cell ?? "-")
      };
    }
    function getAlignClass(align) {
      if (align === "right") {
        return "text-right";
      }
      if (align === "center") {
        return "text-center";
      }
      return "text-left";
    }
    function getRowActionLabel(row) {
      const primaryColumn = props.columns[0];
      if (!primaryColumn) {
        return props.label;
      }
      return getCell(row, primaryColumn.key).label;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-md border" }, _attrs))}><div class="overflow-x-auto">`);
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        class: "min-w-[820px]",
        "aria-busy": __props.loading
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(__props.columns, (column) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$2), {
                            key: column.key,
                            class: [getAlignClass(column.align), column.class]
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(column.label)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(column.label), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                        if (__props.actions.length) {
                          _push4(ssrRenderComponent(unref(_sfc_main$2), { class: unref(actionColumnClass) }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Aksi `);
                              } else {
                                return [
                                  createTextVNode(" Aksi ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (column) => {
                            return openBlock(), createBlock(unref(_sfc_main$2), {
                              key: column.key,
                              class: [getAlignClass(column.align), column.class]
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(column.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["class"]);
                          }), 128)),
                          __props.actions.length ? (openBlock(), createBlock(unref(_sfc_main$2), {
                            key: 0,
                            class: unref(actionColumnClass)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Aksi ")
                            ]),
                            _: 1
                          }, 8, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (column) => {
                          return openBlock(), createBlock(unref(_sfc_main$2), {
                            key: column.key,
                            class: [getAlignClass(column.align), column.class]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(column.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["class"]);
                        }), 128)),
                        __props.actions.length ? (openBlock(), createBlock(unref(_sfc_main$2), {
                          key: 0,
                          class: unref(actionColumnClass)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Aksi ")
                          ]),
                          _: 1
                        }, 8, ["class"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.loading) {
                    _push3(`<!--[-->`);
                    ssrRenderList(__props.loadingRowCount, (index) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        key: `admin-data-loading-${index}`
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(__props.columns, (column) => {
                              _push4(ssrRenderComponent(unref(_sfc_main$6), {
                                key: `${index}-${column.key}`
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$3), { class: "h-4 w-full" }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$3), { class: "h-4 w-full" })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            });
                            _push4(`<!--]-->`);
                            if (__props.actions.length) {
                              _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$3), { class: "ml-auto h-8 w-28" }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$3), { class: "ml-auto h-8 w-28" })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (column) => {
                                return openBlock(), createBlock(unref(_sfc_main$6), {
                                  key: `${index}-${column.key}`
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$3), { class: "h-4 w-full" })
                                  ]),
                                  _: 1
                                });
                              }), 128)),
                              __props.actions.length ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$3), { class: "ml-auto h-8 w-28" })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else if (__props.rows.length) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(paginatedRows), (row) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        key: row.id,
                        class: "last:border-b-0"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(__props.columns, (column) => {
                              _push4(ssrRenderComponent(unref(_sfc_main$6), {
                                key: `${row.id}-${column.key}`,
                                class: [getAlignClass(column.align), column.class]
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    if (getCell(row, column.key).type === "switch") {
                                      _push5(`<div class="${ssrRenderClass([column.align === "right" ? "justify-end" : column.align === "center" ? "justify-center" : "justify-start", "flex items-center gap-2"])}"${_scopeId4}>`);
                                      _push5(ssrRenderComponent(unref(_sfc_main$1), {
                                        "model-value": Boolean(getCell(row, column.key).checked),
                                        disabled: __props.loading || getCell(row, column.key).disabled,
                                        "aria-label": `Ubah status ${getRowActionLabel(row)}`,
                                        "onUpdate:modelValue": ($event) => emit("toggle", row.id)
                                      }, null, _parent5, _scopeId4));
                                      _push5(`<span class="${ssrRenderClass([getCell(row, column.key).checked ? "text-success" : "text-muted-foreground", "whitespace-nowrap text-sm font-medium"])}"${_scopeId4}>${ssrInterpolate(getCell(row, column.key).label)}</span></div>`);
                                    } else if (getCell(row, column.key).tone) {
                                      _push5(ssrRenderComponent(AdminStatusBadge, {
                                        tone: getCell(row, column.key).tone
                                      }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(`${ssrInterpolate(getCell(row, column.key).label)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(getCell(row, column.key).label), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                    } else {
                                      _push5(`<div class="${ssrRenderClass([getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt ? "flex items-center gap-3" : "", "min-w-0"])}"${_scopeId4}>`);
                                      if (getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt) {
                                        _push5(`<div class="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground"${_scopeId4}>`);
                                        if (getCell(row, column.key).imageUrl) {
                                          _push5(`<img${ssrRenderAttr("src", getCell(row, column.key).imageUrl)}${ssrRenderAttr("alt", getCell(row, column.key).imageAlt ?? getCell(row, column.key).label)} class="size-full object-cover" loading="lazy" decoding="async"${_scopeId4}>`);
                                        } else {
                                          _push5(ssrRenderComponent(unref(ImageIcon), {
                                            class: "size-5",
                                            "aria-hidden": "true"
                                          }, null, _parent5, _scopeId4));
                                        }
                                        _push5(`</div>`);
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      _push5(`<div class="min-w-0"${_scopeId4}><p class="${ssrRenderClass([[
                                        getCell(row, column.key).description ? "font-medium text-foreground" : "text-foreground",
                                        getCell(row, column.key).monospace ? "font-mono tabular-nums" : ""
                                      ], "truncate text-sm"])}"${_scopeId4}>${ssrInterpolate(getCell(row, column.key).label)}</p>`);
                                      if (getCell(row, column.key).description) {
                                        _push5(`<p class="mt-0.5 truncate text-xs text-muted-foreground"${_scopeId4}>${ssrInterpolate(getCell(row, column.key).description)}</p>`);
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      _push5(`</div></div>`);
                                    }
                                  } else {
                                    return [
                                      getCell(row, column.key).type === "switch" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: ["flex items-center gap-2", column.align === "right" ? "justify-end" : column.align === "center" ? "justify-center" : "justify-start"]
                                      }, [
                                        createVNode(unref(_sfc_main$1), {
                                          "model-value": Boolean(getCell(row, column.key).checked),
                                          disabled: __props.loading || getCell(row, column.key).disabled,
                                          "aria-label": `Ubah status ${getRowActionLabel(row)}`,
                                          "onUpdate:modelValue": ($event) => emit("toggle", row.id)
                                        }, null, 8, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]),
                                        createVNode("span", {
                                          class: ["whitespace-nowrap text-sm font-medium", getCell(row, column.key).checked ? "text-success" : "text-muted-foreground"]
                                        }, toDisplayString(getCell(row, column.key).label), 3)
                                      ], 2)) : getCell(row, column.key).tone ? (openBlock(), createBlock(AdminStatusBadge, {
                                        key: 1,
                                        tone: getCell(row, column.key).tone
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(getCell(row, column.key).label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["tone"])) : (openBlock(), createBlock("div", {
                                        key: 2,
                                        class: ["min-w-0", getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt ? "flex items-center gap-3" : ""]
                                      }, [
                                        getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground"
                                        }, [
                                          getCell(row, column.key).imageUrl ? (openBlock(), createBlock("img", {
                                            key: 0,
                                            src: getCell(row, column.key).imageUrl,
                                            alt: getCell(row, column.key).imageAlt ?? getCell(row, column.key).label,
                                            class: "size-full object-cover",
                                            loading: "lazy",
                                            decoding: "async"
                                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(ImageIcon), {
                                            key: 1,
                                            class: "size-5",
                                            "aria-hidden": "true"
                                          }))
                                        ])) : createCommentVNode("", true),
                                        createVNode("div", { class: "min-w-0" }, [
                                          createVNode("p", {
                                            class: ["truncate text-sm", [
                                              getCell(row, column.key).description ? "font-medium text-foreground" : "text-foreground",
                                              getCell(row, column.key).monospace ? "font-mono tabular-nums" : ""
                                            ]]
                                          }, toDisplayString(getCell(row, column.key).label), 3),
                                          getCell(row, column.key).description ? (openBlock(), createBlock("p", {
                                            key: 0,
                                            class: "mt-0.5 truncate text-xs text-muted-foreground"
                                          }, toDisplayString(getCell(row, column.key).description), 1)) : createCommentVNode("", true)
                                        ])
                                      ], 2))
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            });
                            _push4(`<!--]-->`);
                            if (__props.actions.length) {
                              _push4(ssrRenderComponent(unref(_sfc_main$6), { class: unref(actionColumnClass) }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`<div class="flex flex-nowrap items-center justify-end gap-1.5"${_scopeId4}>`);
                                    if (__props.actions.includes("view")) {
                                      _push5(ssrRenderComponent(unref(_sfc_main$4), {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                        "aria-label": `Lihat detail ${getRowActionLabel(row)}`,
                                        onClick: ($event) => emit("view", row.id)
                                      }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent(unref(Eye), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }, null, _parent6, _scopeId5));
                                            _push6(` Detail `);
                                          } else {
                                            return [
                                              createVNode(unref(Eye), {
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              }),
                                              createTextVNode(" Detail ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    if (__props.actions.includes("toggle")) {
                                      _push5(ssrRenderComponent(unref(_sfc_main$4), {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                        "aria-label": `Ubah status ${getRowActionLabel(row)}`,
                                        onClick: ($event) => emit("toggle", row.id)
                                      }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent(unref(ToggleLeft), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }, null, _parent6, _scopeId5));
                                            _push6(` Status `);
                                          } else {
                                            return [
                                              createVNode(unref(ToggleLeft), {
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              }),
                                              createTextVNode(" Status ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    if (__props.actions.includes("edit")) {
                                      _push5(ssrRenderComponent(unref(_sfc_main$4), {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground",
                                        "aria-label": `Ubah data ${getRowActionLabel(row)}`,
                                        onClick: ($event) => emit("edit", row.id)
                                      }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent(unref(Pencil), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }, null, _parent6, _scopeId5));
                                            _push6(` Ubah `);
                                          } else {
                                            return [
                                              createVNode(unref(Pencil), {
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              }),
                                              createTextVNode(" Ubah ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    if (__props.actions.includes("produce")) {
                                      _push5(ssrRenderComponent(unref(_sfc_main$4), {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success",
                                        "aria-label": `Catat produksi ${getRowActionLabel(row)}`,
                                        onClick: ($event) => emit("produce", row.id)
                                      }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent(unref(Factory), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }, null, _parent6, _scopeId5));
                                            _push6(` Produksi `);
                                          } else {
                                            return [
                                              createVNode(unref(Factory), {
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              }),
                                              createTextVNode(" Produksi ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    if (__props.actions.includes("delete")) {
                                      _push5(ssrRenderComponent(unref(_sfc_main$4), {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                        "aria-label": `Hapus data ${getRowActionLabel(row)}`,
                                        onClick: ($event) => emit("delete", row.id)
                                      }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent(unref(Trash2), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }, null, _parent6, _scopeId5));
                                            _push6(` Hapus `);
                                          } else {
                                            return [
                                              createVNode(unref(Trash2), {
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              }),
                                              createTextVNode(" Hapus ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    _push5(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex flex-nowrap items-center justify-end gap-1.5" }, [
                                        __props.actions.includes("view") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                          key: 0,
                                          type: "button",
                                          variant: "ghost",
                                          size: "sm",
                                          class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                          "aria-label": `Lihat detail ${getRowActionLabel(row)}`,
                                          onClick: ($event) => emit("view", row.id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Eye), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Detail ")
                                          ]),
                                          _: 1
                                        }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                        __props.actions.includes("toggle") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                          key: 1,
                                          type: "button",
                                          variant: "ghost",
                                          size: "sm",
                                          class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                          "aria-label": `Ubah status ${getRowActionLabel(row)}`,
                                          onClick: ($event) => emit("toggle", row.id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(ToggleLeft), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Status ")
                                          ]),
                                          _: 1
                                        }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                        __props.actions.includes("edit") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                          key: 2,
                                          type: "button",
                                          variant: "ghost",
                                          size: "sm",
                                          class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground",
                                          "aria-label": `Ubah data ${getRowActionLabel(row)}`,
                                          onClick: ($event) => emit("edit", row.id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Pencil), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Ubah ")
                                          ]),
                                          _: 1
                                        }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                        __props.actions.includes("produce") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                          key: 3,
                                          type: "button",
                                          variant: "ghost",
                                          size: "sm",
                                          class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success",
                                          "aria-label": `Catat produksi ${getRowActionLabel(row)}`,
                                          onClick: ($event) => emit("produce", row.id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Factory), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Produksi ")
                                          ]),
                                          _: 1
                                        }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                        __props.actions.includes("delete") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                          key: 4,
                                          type: "button",
                                          variant: "ghost",
                                          size: "sm",
                                          class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                          "aria-label": `Hapus data ${getRowActionLabel(row)}`,
                                          onClick: ($event) => emit("delete", row.id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Trash2), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Hapus ")
                                          ]),
                                          _: 1
                                        }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true)
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (column) => {
                                return openBlock(), createBlock(unref(_sfc_main$6), {
                                  key: `${row.id}-${column.key}`,
                                  class: [getAlignClass(column.align), column.class]
                                }, {
                                  default: withCtx(() => [
                                    getCell(row, column.key).type === "switch" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: ["flex items-center gap-2", column.align === "right" ? "justify-end" : column.align === "center" ? "justify-center" : "justify-start"]
                                    }, [
                                      createVNode(unref(_sfc_main$1), {
                                        "model-value": Boolean(getCell(row, column.key).checked),
                                        disabled: __props.loading || getCell(row, column.key).disabled,
                                        "aria-label": `Ubah status ${getRowActionLabel(row)}`,
                                        "onUpdate:modelValue": ($event) => emit("toggle", row.id)
                                      }, null, 8, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]),
                                      createVNode("span", {
                                        class: ["whitespace-nowrap text-sm font-medium", getCell(row, column.key).checked ? "text-success" : "text-muted-foreground"]
                                      }, toDisplayString(getCell(row, column.key).label), 3)
                                    ], 2)) : getCell(row, column.key).tone ? (openBlock(), createBlock(AdminStatusBadge, {
                                      key: 1,
                                      tone: getCell(row, column.key).tone
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(getCell(row, column.key).label), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["tone"])) : (openBlock(), createBlock("div", {
                                      key: 2,
                                      class: ["min-w-0", getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt ? "flex items-center gap-3" : ""]
                                    }, [
                                      getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground"
                                      }, [
                                        getCell(row, column.key).imageUrl ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: getCell(row, column.key).imageUrl,
                                          alt: getCell(row, column.key).imageAlt ?? getCell(row, column.key).label,
                                          class: "size-full object-cover",
                                          loading: "lazy",
                                          decoding: "async"
                                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(ImageIcon), {
                                          key: 1,
                                          class: "size-5",
                                          "aria-hidden": "true"
                                        }))
                                      ])) : createCommentVNode("", true),
                                      createVNode("div", { class: "min-w-0" }, [
                                        createVNode("p", {
                                          class: ["truncate text-sm", [
                                            getCell(row, column.key).description ? "font-medium text-foreground" : "text-foreground",
                                            getCell(row, column.key).monospace ? "font-mono tabular-nums" : ""
                                          ]]
                                        }, toDisplayString(getCell(row, column.key).label), 3),
                                        getCell(row, column.key).description ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "mt-0.5 truncate text-xs text-muted-foreground"
                                        }, toDisplayString(getCell(row, column.key).description), 1)) : createCommentVNode("", true)
                                      ])
                                    ], 2))
                                  ]),
                                  _: 2
                                }, 1032, ["class"]);
                              }), 128)),
                              __props.actions.length ? (openBlock(), createBlock(unref(_sfc_main$6), {
                                key: 0,
                                class: unref(actionColumnClass)
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-nowrap items-center justify-end gap-1.5" }, [
                                    __props.actions.includes("view") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                      key: 0,
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                      "aria-label": `Lihat detail ${getRowActionLabel(row)}`,
                                      onClick: ($event) => emit("view", row.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Eye), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Detail ")
                                      ]),
                                      _: 1
                                    }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                    __props.actions.includes("toggle") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                      key: 1,
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                      "aria-label": `Ubah status ${getRowActionLabel(row)}`,
                                      onClick: ($event) => emit("toggle", row.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(ToggleLeft), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Status ")
                                      ]),
                                      _: 1
                                    }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                    __props.actions.includes("edit") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                      key: 2,
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground",
                                      "aria-label": `Ubah data ${getRowActionLabel(row)}`,
                                      onClick: ($event) => emit("edit", row.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Pencil), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Ubah ")
                                      ]),
                                      _: 1
                                    }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                    __props.actions.includes("produce") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                      key: 3,
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success",
                                      "aria-label": `Catat produksi ${getRowActionLabel(row)}`,
                                      onClick: ($event) => emit("produce", row.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Factory), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Produksi ")
                                      ]),
                                      _: 1
                                    }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                    __props.actions.includes("delete") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                      key: 4,
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                      "aria-label": `Hapus data ${getRowActionLabel(row)}`,
                                      onClick: ($event) => emit("delete", row.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Trash2), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Hapus ")
                                      ]),
                                      _: 1
                                    }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["class"])) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    _push3(ssrRenderComponent(unref(_sfc_main$4$1), { colspan: unref(columnCount) }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-center"${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(__props.emptyTitle)}</p><p class="mt-1 text-sm text-muted-foreground"${_scopeId3}>${ssrInterpolate(__props.emptyDescription)}</p></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-center" }, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.emptyTitle), 1),
                              createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, toDisplayString(__props.emptyDescription), 1)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    __props.loading ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.loadingRowCount, (index) => {
                      return openBlock(), createBlock(unref(_sfc_main$5), {
                        key: `admin-data-loading-${index}`
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (column) => {
                            return openBlock(), createBlock(unref(_sfc_main$6), {
                              key: `${index}-${column.key}`
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$3), { class: "h-4 w-full" })
                              ]),
                              _: 1
                            });
                          }), 128)),
                          __props.actions.length ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$3), { class: "ml-auto h-8 w-28" })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)) : __props.rows.length ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(paginatedRows), (row) => {
                      return openBlock(), createBlock(unref(_sfc_main$5), {
                        key: row.id,
                        class: "last:border-b-0"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (column) => {
                            return openBlock(), createBlock(unref(_sfc_main$6), {
                              key: `${row.id}-${column.key}`,
                              class: [getAlignClass(column.align), column.class]
                            }, {
                              default: withCtx(() => [
                                getCell(row, column.key).type === "switch" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: ["flex items-center gap-2", column.align === "right" ? "justify-end" : column.align === "center" ? "justify-center" : "justify-start"]
                                }, [
                                  createVNode(unref(_sfc_main$1), {
                                    "model-value": Boolean(getCell(row, column.key).checked),
                                    disabled: __props.loading || getCell(row, column.key).disabled,
                                    "aria-label": `Ubah status ${getRowActionLabel(row)}`,
                                    "onUpdate:modelValue": ($event) => emit("toggle", row.id)
                                  }, null, 8, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]),
                                  createVNode("span", {
                                    class: ["whitespace-nowrap text-sm font-medium", getCell(row, column.key).checked ? "text-success" : "text-muted-foreground"]
                                  }, toDisplayString(getCell(row, column.key).label), 3)
                                ], 2)) : getCell(row, column.key).tone ? (openBlock(), createBlock(AdminStatusBadge, {
                                  key: 1,
                                  tone: getCell(row, column.key).tone
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(getCell(row, column.key).label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["tone"])) : (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: ["min-w-0", getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt ? "flex items-center gap-3" : ""]
                                }, [
                                  getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground"
                                  }, [
                                    getCell(row, column.key).imageUrl ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: getCell(row, column.key).imageUrl,
                                      alt: getCell(row, column.key).imageAlt ?? getCell(row, column.key).label,
                                      class: "size-full object-cover",
                                      loading: "lazy",
                                      decoding: "async"
                                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(ImageIcon), {
                                      key: 1,
                                      class: "size-5",
                                      "aria-hidden": "true"
                                    }))
                                  ])) : createCommentVNode("", true),
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("p", {
                                      class: ["truncate text-sm", [
                                        getCell(row, column.key).description ? "font-medium text-foreground" : "text-foreground",
                                        getCell(row, column.key).monospace ? "font-mono tabular-nums" : ""
                                      ]]
                                    }, toDisplayString(getCell(row, column.key).label), 3),
                                    getCell(row, column.key).description ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "mt-0.5 truncate text-xs text-muted-foreground"
                                    }, toDisplayString(getCell(row, column.key).description), 1)) : createCommentVNode("", true)
                                  ])
                                ], 2))
                              ]),
                              _: 2
                            }, 1032, ["class"]);
                          }), 128)),
                          __props.actions.length ? (openBlock(), createBlock(unref(_sfc_main$6), {
                            key: 0,
                            class: unref(actionColumnClass)
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-nowrap items-center justify-end gap-1.5" }, [
                                __props.actions.includes("view") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                  key: 0,
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                  "aria-label": `Lihat detail ${getRowActionLabel(row)}`,
                                  onClick: ($event) => emit("view", row.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Eye), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Detail ")
                                  ]),
                                  _: 1
                                }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                __props.actions.includes("toggle") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                  key: 1,
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                  "aria-label": `Ubah status ${getRowActionLabel(row)}`,
                                  onClick: ($event) => emit("toggle", row.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(ToggleLeft), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Status ")
                                  ]),
                                  _: 1
                                }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                __props.actions.includes("edit") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                  key: 2,
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground",
                                  "aria-label": `Ubah data ${getRowActionLabel(row)}`,
                                  onClick: ($event) => emit("edit", row.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Pencil), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Ubah ")
                                  ]),
                                  _: 1
                                }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                __props.actions.includes("produce") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                  key: 3,
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success",
                                  "aria-label": `Catat produksi ${getRowActionLabel(row)}`,
                                  onClick: ($event) => emit("produce", row.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Factory), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Produksi ")
                                  ]),
                                  _: 1
                                }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                                __props.actions.includes("delete") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                  key: 4,
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                  "aria-label": `Hapus data ${getRowActionLabel(row)}`,
                                  onClick: ($event) => emit("delete", row.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash2), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Hapus ")
                                  ]),
                                  _: 1
                                }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["class"])) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                      key: 2,
                      colspan: unref(columnCount)
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.emptyTitle), 1),
                          createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, toDisplayString(__props.emptyDescription), 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["colspan"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1$1), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (column) => {
                        return openBlock(), createBlock(unref(_sfc_main$2), {
                          key: column.key,
                          class: [getAlignClass(column.align), column.class]
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(column.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["class"]);
                      }), 128)),
                      __props.actions.length ? (openBlock(), createBlock(unref(_sfc_main$2), {
                        key: 0,
                        class: unref(actionColumnClass)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Aksi ")
                        ]),
                        _: 1
                      }, 8, ["class"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$8), null, {
                default: withCtx(() => [
                  __props.loading ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.loadingRowCount, (index) => {
                    return openBlock(), createBlock(unref(_sfc_main$5), {
                      key: `admin-data-loading-${index}`
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (column) => {
                          return openBlock(), createBlock(unref(_sfc_main$6), {
                            key: `${index}-${column.key}`
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$3), { class: "h-4 w-full" })
                            ]),
                            _: 1
                          });
                        }), 128)),
                        __props.actions.length ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$3), { class: "ml-auto h-8 w-28" })
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)) : __props.rows.length ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(paginatedRows), (row) => {
                    return openBlock(), createBlock(unref(_sfc_main$5), {
                      key: row.id,
                      class: "last:border-b-0"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (column) => {
                          return openBlock(), createBlock(unref(_sfc_main$6), {
                            key: `${row.id}-${column.key}`,
                            class: [getAlignClass(column.align), column.class]
                          }, {
                            default: withCtx(() => [
                              getCell(row, column.key).type === "switch" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: ["flex items-center gap-2", column.align === "right" ? "justify-end" : column.align === "center" ? "justify-center" : "justify-start"]
                              }, [
                                createVNode(unref(_sfc_main$1), {
                                  "model-value": Boolean(getCell(row, column.key).checked),
                                  disabled: __props.loading || getCell(row, column.key).disabled,
                                  "aria-label": `Ubah status ${getRowActionLabel(row)}`,
                                  "onUpdate:modelValue": ($event) => emit("toggle", row.id)
                                }, null, 8, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"]),
                                createVNode("span", {
                                  class: ["whitespace-nowrap text-sm font-medium", getCell(row, column.key).checked ? "text-success" : "text-muted-foreground"]
                                }, toDisplayString(getCell(row, column.key).label), 3)
                              ], 2)) : getCell(row, column.key).tone ? (openBlock(), createBlock(AdminStatusBadge, {
                                key: 1,
                                tone: getCell(row, column.key).tone
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(getCell(row, column.key).label), 1)
                                ]),
                                _: 2
                              }, 1032, ["tone"])) : (openBlock(), createBlock("div", {
                                key: 2,
                                class: ["min-w-0", getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt ? "flex items-center gap-3" : ""]
                              }, [
                                getCell(row, column.key).imageUrl || getCell(row, column.key).imageAlt ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground"
                                }, [
                                  getCell(row, column.key).imageUrl ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: getCell(row, column.key).imageUrl,
                                    alt: getCell(row, column.key).imageAlt ?? getCell(row, column.key).label,
                                    class: "size-full object-cover",
                                    loading: "lazy",
                                    decoding: "async"
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(ImageIcon), {
                                    key: 1,
                                    class: "size-5",
                                    "aria-hidden": "true"
                                  }))
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", {
                                    class: ["truncate text-sm", [
                                      getCell(row, column.key).description ? "font-medium text-foreground" : "text-foreground",
                                      getCell(row, column.key).monospace ? "font-mono tabular-nums" : ""
                                    ]]
                                  }, toDisplayString(getCell(row, column.key).label), 3),
                                  getCell(row, column.key).description ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "mt-0.5 truncate text-xs text-muted-foreground"
                                  }, toDisplayString(getCell(row, column.key).description), 1)) : createCommentVNode("", true)
                                ])
                              ], 2))
                            ]),
                            _: 2
                          }, 1032, ["class"]);
                        }), 128)),
                        __props.actions.length ? (openBlock(), createBlock(unref(_sfc_main$6), {
                          key: 0,
                          class: unref(actionColumnClass)
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-nowrap items-center justify-end gap-1.5" }, [
                              __props.actions.includes("view") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                key: 0,
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                "aria-label": `Lihat detail ${getRowActionLabel(row)}`,
                                onClick: ($event) => emit("view", row.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Eye), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Detail ")
                                ]),
                                _: 1
                              }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                              __props.actions.includes("toggle") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                key: 1,
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                "aria-label": `Ubah status ${getRowActionLabel(row)}`,
                                onClick: ($event) => emit("toggle", row.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ToggleLeft), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Status ")
                                ]),
                                _: 1
                              }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                              __props.actions.includes("edit") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                key: 2,
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground",
                                "aria-label": `Ubah data ${getRowActionLabel(row)}`,
                                onClick: ($event) => emit("edit", row.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Pencil), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Ubah ")
                                ]),
                                _: 1
                              }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                              __props.actions.includes("produce") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                key: 3,
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success",
                                "aria-label": `Catat produksi ${getRowActionLabel(row)}`,
                                onClick: ($event) => emit("produce", row.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Factory), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Produksi ")
                                ]),
                                _: 1
                              }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true),
                              __props.actions.includes("delete") ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                key: 4,
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                "aria-label": `Hapus data ${getRowActionLabel(row)}`,
                                onClick: ($event) => emit("delete", row.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash2), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Hapus ")
                                ]),
                                _: 1
                              }, 8, ["aria-label", "onClick"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                    key: 2,
                    colspan: unref(columnCount)
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("p", { class: "text-sm font-medium" }, toDisplayString(__props.emptyTitle), 1),
                        createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, toDisplayString(__props.emptyDescription), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["colspan"]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col gap-3 border-t p-3 sm:flex-row sm:items-center sm:justify-between"><div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"><p class="text-sm text-muted-foreground" aria-live="polite">${ssrInterpolate(unref(summaryText))}</p><div class="flex items-center gap-2"><label${ssrRenderAttr("for", unref(pageSizeId))} class="text-sm text-muted-foreground">${ssrInterpolate(unref(pageSizeLabel))}</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$2$1), {
        id: unref(pageSizeId),
        modelValue: unref(pageSizeValue),
        "onUpdate:modelValue": ($event) => isRef(pageSizeValue) ? pageSizeValue.value = $event : null,
        class: "w-24",
        disabled: __props.loading
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.pageSizeOptions, (option) => {
              _push2(`<option${ssrRenderAttr("value", String(option))}${_scopeId}>${ssrInterpolate(option)}</option>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.pageSizeOptions, (option) => {
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
      if (unref(totalPages) > 1 && !__props.loading) {
        _push(ssrRenderComponent(unref(_sfc_main$7), {
          page: unref(pageValue),
          "onUpdate:page": ($event) => isRef(pageValue) ? pageValue.value = $event : null,
          "items-per-page": unref(pageSize),
          total: __props.rows.length,
          "sibling-count": 1,
          "show-edges": "",
          class: "mx-0 w-auto justify-start sm:justify-end"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$6$1), null, {
                default: withCtx(({ items }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$a), null, {
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
                        _push3(ssrRenderComponent(unref(_sfc_main$5$1), { index }, {
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
                    _push3(ssrRenderComponent(unref(_sfc_main$1$2), null, {
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
                      createVNode(unref(_sfc_main$a), null, {
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
                          }, 1032, ["value", "is-active", "aria-label"])) : (openBlock(), createBlock(unref(_sfc_main$5$1), {
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
                      createVNode(unref(_sfc_main$1$2), null, {
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
                createVNode(unref(_sfc_main$6$1), null, {
                  default: withCtx(({ items }) => [
                    createVNode(unref(_sfc_main$a), null, {
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
                        }, 1032, ["value", "is-active", "aria-label"])) : (openBlock(), createBlock(unref(_sfc_main$5$1), {
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
                    createVNode(unref(_sfc_main$1$2), null, {
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/organisms/AdminDataTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminDataTable = Object.assign(_sfc_main, { __name: "OrganismsAdminDataTable" });

export { AdminDataTable as A };
//# sourceMappingURL=AdminDataTable-CAL1APtK.mjs.map
