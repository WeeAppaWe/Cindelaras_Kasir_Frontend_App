import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, isRef, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { ArrowDownToLine, ArrowUpFromLine, WalletCards, Plus, Eye, Banknote, FileText, CalendarClock, UserRound } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { _ as _sfc_main$4 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$2$1 } from './NativeSelectOption-BTdv0zYA.mjs';
import { C as CashierMetric, a as CashierTablePagination, b as CashierStatusBadge } from './CashierStatusBadge-D7tHIaMY.mjs';
import { C as CashierPageHeader } from './CashierPageHeader-B7q-Byt4.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$2, d as _sfc_main$5$1, e as _sfc_main$4$2 } from './DialogTrigger-B5C6UhMx.mjs';
import { _ as _sfc_main$1$3, a as _sfc_main$d } from './Spinner-nalFRPxS.mjs';
import { u as useCashierStore, C as CashierCurrency, a as useCashierActionFeedback } from './useCashierStore-Cv1WdPrz.mjs';
import { _ as _sfc_main$b } from './Label-Cd3JlovY.mjs';
import { _ as _sfc_main$c } from './Textarea-DYkcGDV8.mjs';
import { _ as _sfc_main$a } from './Skeleton-CQWwuiK0.mjs';
import { a as _sfc_main$9, h as _sfc_main$7, b as _sfc_main$1$1, c as _sfc_main$5, d as _sfc_main$2$2, e as _sfc_main$8, f as _sfc_main$6, g as _sfc_main$4$1 } from './index-DSBdqIS4.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
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
import './PaginationPrevious-DSL0-rZ8.mjs';
import './api-endpoints-Bk94Aoou.mjs';
import './state-Dw1r7BQr.mjs';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CashAdjustmentDetailDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    adjustment: {},
    loading: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const dialogOpen = computed({
      get: () => props.open,
      set: (value) => emit("update:open", value)
    });
    const isCashIn = computed(() => props.adjustment?.type === "in");
    const typeLabel = computed(() => isCashIn.value ? "Kas masuk" : "Kas keluar");
    const typeBadgeClass = computed(() => isCashIn.value ? "border-success/40 bg-success/10 text-success" : "border-destructive/40 bg-destructive/10 text-destructive");
    const headerToneClass = computed(() => isCashIn.value ? "border-success/30 bg-success/10 text-success" : "border-destructive/30 bg-destructive/10 text-destructive");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$9$1), mergeProps({
        open: unref(dialogOpen),
        "onUpdate:open": ($event) => isRef(dialogOpen) ? dialogOpen.value = $event : null
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6$1), { class: "gap-0 p-0 sm:max-w-lg" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3$1), { class: "border-b px-5 pt-5 pb-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-start gap-3"${_scopeId3}><span class="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Banknote), {
                          class: "size-5",
                          "aria-hidden": "true"
                        }, null, _parent4, _scopeId3));
                        _push4(`</span><div class="min-w-0"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Detail penyesuaian kas`);
                            } else {
                              return [
                                createTextVNode("Detail penyesuaian kas")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), { class: "mt-1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Lihat informasi mutasi kas manual pada shift. `);
                            } else {
                              return [
                                createTextVNode(" Lihat informasi mutasi kas manual pada shift. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-start gap-3" }, [
                            createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" }, [
                              createVNode(unref(Banknote), {
                                class: "size-5",
                                "aria-hidden": "true"
                              })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode(unref(_sfc_main$1$2), null, {
                                default: withCtx(() => [
                                  createTextVNode("Detail penyesuaian kas")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Lihat informasi mutasi kas manual pada shift. ")
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (props.adjustment) {
                    _push3(`<div class="space-y-4 px-5 py-5"${_scopeId2}>`);
                    if (props.loading) {
                      _push3(`<p class="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground" aria-live="polite"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$d), { class: "size-4" }, null, _parent3, _scopeId2));
                      _push3(` Memuat detail penyesuaian kas... </p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="${ssrRenderClass([unref(headerToneClass), "rounded-md border p-4"])}"${_scopeId2}><div class="flex items-start justify-between gap-3"${_scopeId2}><div class="min-w-0"${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(unref(typeLabel))}</p><p class="mt-1 truncate text-lg font-semibold"${_scopeId2}>`);
                    _push3(ssrRenderComponent(CashierCurrency, {
                      value: props.adjustment.amount
                    }, null, _parent3, _scopeId2));
                    _push3(`</p></div><span class="${ssrRenderClass([unref(typeBadgeClass), "inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium"])}"${_scopeId2}>`);
                    if (unref(isCashIn)) {
                      _push3(ssrRenderComponent(unref(ArrowDownToLine), {
                        class: "size-3.5",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(ArrowUpFromLine), {
                        class: "size-3.5",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                    }
                    _push3(` ${ssrInterpolate(unref(typeLabel))}</span></div></div><section class="rounded-md border bg-card p-3" aria-labelledby="adjustment-identity-title"${_scopeId2}><div class="mb-3 flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(FileText), {
                      class: "size-4 text-muted-foreground",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 id="adjustment-identity-title" class="text-sm font-semibold"${_scopeId2}> Informasi penyesuaian </h3></div><dl class="grid gap-2 text-sm"${_scopeId2}><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Status</dt><dd class="text-right"${_scopeId2}>`);
                    _push3(ssrRenderComponent(CashierStatusBadge, {
                      status: props.adjustment.status
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(props.adjustment.statusLabel)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(props.adjustment.statusLabel), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</dd></div><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Nominal</dt><dd class="text-right font-semibold"${_scopeId2}>`);
                    _push3(ssrRenderComponent(CashierCurrency, {
                      value: props.adjustment.amount
                    }, null, _parent3, _scopeId2));
                    _push3(`</dd></div></dl></section><section class="rounded-md border bg-card p-3" aria-labelledby="adjustment-meta-title"${_scopeId2}><div class="mb-3 flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CalendarClock), {
                      class: "size-4 text-muted-foreground",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 id="adjustment-meta-title" class="text-sm font-semibold"${_scopeId2}> Catatan shift </h3></div><dl class="grid gap-2 text-sm"${_scopeId2}><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Waktu</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.adjustment.createdAt)}</dd></div>`);
                    if (props.adjustment.shiftStartedAt) {
                      _push3(`<div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Shift dibuka</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.adjustment.shiftStartedAt)}</dd></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</dl></section><section class="rounded-md border bg-card p-3" aria-labelledby="adjustment-reason-title"${_scopeId2}><div class="mb-3 flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(UserRound), {
                      class: "size-4 text-muted-foreground",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 id="adjustment-reason-title" class="text-sm font-semibold"${_scopeId2}> Catatan </h3></div><p class="whitespace-pre-wrap text-sm leading-6 text-card-foreground"${_scopeId2}>${ssrInterpolate(props.adjustment.reason)}</p></section></div>`);
                  } else {
                    _push3(`<div class="px-5 py-5"${_scopeId2}><p class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"${_scopeId2}> Data penyesuaian kas tidak tersedia. </p></div>`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$4$2), { class: "border-t px-5 py-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          type: "button",
                          class: "h-10 w-full sm:w-auto",
                          onClick: ($event) => dialogOpen.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Tutup `);
                            } else {
                              return [
                                createTextVNode(" Tutup ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), {
                            type: "button",
                            class: "h-10 w-full sm:w-auto",
                            onClick: ($event) => dialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Tutup ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3$1), { class: "border-b px-5 pt-5 pb-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" }, [
                            createVNode(unref(Banknote), {
                              class: "size-5",
                              "aria-hidden": "true"
                            })
                          ]),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode(unref(_sfc_main$1$2), null, {
                              default: withCtx(() => [
                                createTextVNode("Detail penyesuaian kas")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                              default: withCtx(() => [
                                createTextVNode(" Lihat informasi mutasi kas manual pada shift. ")
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    props.adjustment ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4 px-5 py-5"
                    }, [
                      props.loading ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground",
                        "aria-live": "polite"
                      }, [
                        createVNode(unref(_sfc_main$d), { class: "size-4" }),
                        createTextVNode(" Memuat detail penyesuaian kas... ")
                      ])) : createCommentVNode("", true),
                      createVNode("div", {
                        class: ["rounded-md border p-4", unref(headerToneClass)]
                      }, [
                        createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(typeLabel)), 1),
                            createVNode("p", { class: "mt-1 truncate text-lg font-semibold" }, [
                              createVNode(CashierCurrency, {
                                value: props.adjustment.amount
                              }, null, 8, ["value"])
                            ])
                          ]),
                          createVNode("span", {
                            class: ["inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium", unref(typeBadgeClass)]
                          }, [
                            unref(isCashIn) ? (openBlock(), createBlock(unref(ArrowDownToLine), {
                              key: 0,
                              class: "size-3.5",
                              "aria-hidden": "true"
                            })) : (openBlock(), createBlock(unref(ArrowUpFromLine), {
                              key: 1,
                              class: "size-3.5",
                              "aria-hidden": "true"
                            })),
                            createTextVNode(" " + toDisplayString(unref(typeLabel)), 1)
                          ], 2)
                        ])
                      ], 2),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "adjustment-identity-title"
                      }, [
                        createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                          createVNode(unref(FileText), {
                            class: "size-4 text-muted-foreground",
                            "aria-hidden": "true"
                          }),
                          createVNode("h3", {
                            id: "adjustment-identity-title",
                            class: "text-sm font-semibold"
                          }, " Informasi penyesuaian ")
                        ]),
                        createVNode("dl", { class: "grid gap-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Status"),
                            createVNode("dd", { class: "text-right" }, [
                              createVNode(CashierStatusBadge, {
                                status: props.adjustment.status
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(props.adjustment.statusLabel), 1)
                                ]),
                                _: 1
                              }, 8, ["status"])
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Nominal"),
                            createVNode("dd", { class: "text-right font-semibold" }, [
                              createVNode(CashierCurrency, {
                                value: props.adjustment.amount
                              }, null, 8, ["value"])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "adjustment-meta-title"
                      }, [
                        createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                          createVNode(unref(CalendarClock), {
                            class: "size-4 text-muted-foreground",
                            "aria-hidden": "true"
                          }),
                          createVNode("h3", {
                            id: "adjustment-meta-title",
                            class: "text-sm font-semibold"
                          }, " Catatan shift ")
                        ]),
                        createVNode("dl", { class: "grid gap-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Waktu"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.adjustment.createdAt), 1)
                          ]),
                          props.adjustment.shiftStartedAt ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between gap-3"
                          }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Shift dibuka"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.adjustment.shiftStartedAt), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "adjustment-reason-title"
                      }, [
                        createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                          createVNode(unref(UserRound), {
                            class: "size-4 text-muted-foreground",
                            "aria-hidden": "true"
                          }),
                          createVNode("h3", {
                            id: "adjustment-reason-title",
                            class: "text-sm font-semibold"
                          }, " Catatan ")
                        ]),
                        createVNode("p", { class: "whitespace-pre-wrap text-sm leading-6 text-card-foreground" }, toDisplayString(props.adjustment.reason), 1)
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "px-5 py-5"
                    }, [
                      createVNode("p", { class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" }, " Data penyesuaian kas tidak tersedia. ")
                    ])),
                    createVNode(unref(_sfc_main$4$2), { class: "border-t px-5 py-4" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), {
                          type: "button",
                          class: "h-10 w-full sm:w-auto",
                          onClick: ($event) => dialogOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tutup ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
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
              createVNode(unref(_sfc_main$6$1), { class: "gap-0 p-0 sm:max-w-lg" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$1), { class: "border-b px-5 pt-5 pb-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" }, [
                          createVNode(unref(Banknote), {
                            class: "size-5",
                            "aria-hidden": "true"
                          })
                        ]),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode(unref(_sfc_main$1$2), null, {
                            default: withCtx(() => [
                              createTextVNode("Detail penyesuaian kas")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                            default: withCtx(() => [
                              createTextVNode(" Lihat informasi mutasi kas manual pada shift. ")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  props.adjustment ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4 px-5 py-5"
                  }, [
                    props.loading ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground",
                      "aria-live": "polite"
                    }, [
                      createVNode(unref(_sfc_main$d), { class: "size-4" }),
                      createTextVNode(" Memuat detail penyesuaian kas... ")
                    ])) : createCommentVNode("", true),
                    createVNode("div", {
                      class: ["rounded-md border p-4", unref(headerToneClass)]
                    }, [
                      createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(typeLabel)), 1),
                          createVNode("p", { class: "mt-1 truncate text-lg font-semibold" }, [
                            createVNode(CashierCurrency, {
                              value: props.adjustment.amount
                            }, null, 8, ["value"])
                          ])
                        ]),
                        createVNode("span", {
                          class: ["inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium", unref(typeBadgeClass)]
                        }, [
                          unref(isCashIn) ? (openBlock(), createBlock(unref(ArrowDownToLine), {
                            key: 0,
                            class: "size-3.5",
                            "aria-hidden": "true"
                          })) : (openBlock(), createBlock(unref(ArrowUpFromLine), {
                            key: 1,
                            class: "size-3.5",
                            "aria-hidden": "true"
                          })),
                          createTextVNode(" " + toDisplayString(unref(typeLabel)), 1)
                        ], 2)
                      ])
                    ], 2),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "adjustment-identity-title"
                    }, [
                      createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                        createVNode(unref(FileText), {
                          class: "size-4 text-muted-foreground",
                          "aria-hidden": "true"
                        }),
                        createVNode("h3", {
                          id: "adjustment-identity-title",
                          class: "text-sm font-semibold"
                        }, " Informasi penyesuaian ")
                      ]),
                      createVNode("dl", { class: "grid gap-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Status"),
                          createVNode("dd", { class: "text-right" }, [
                            createVNode(CashierStatusBadge, {
                              status: props.adjustment.status
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(props.adjustment.statusLabel), 1)
                              ]),
                              _: 1
                            }, 8, ["status"])
                          ])
                        ]),
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Nominal"),
                          createVNode("dd", { class: "text-right font-semibold" }, [
                            createVNode(CashierCurrency, {
                              value: props.adjustment.amount
                            }, null, 8, ["value"])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "adjustment-meta-title"
                    }, [
                      createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                        createVNode(unref(CalendarClock), {
                          class: "size-4 text-muted-foreground",
                          "aria-hidden": "true"
                        }),
                        createVNode("h3", {
                          id: "adjustment-meta-title",
                          class: "text-sm font-semibold"
                        }, " Catatan shift ")
                      ]),
                      createVNode("dl", { class: "grid gap-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Waktu"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.adjustment.createdAt), 1)
                        ]),
                        props.adjustment.shiftStartedAt ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between gap-3"
                        }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Shift dibuka"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.adjustment.shiftStartedAt), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "adjustment-reason-title"
                    }, [
                      createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                        createVNode(unref(UserRound), {
                          class: "size-4 text-muted-foreground",
                          "aria-hidden": "true"
                        }),
                        createVNode("h3", {
                          id: "adjustment-reason-title",
                          class: "text-sm font-semibold"
                        }, " Catatan ")
                      ]),
                      createVNode("p", { class: "whitespace-pre-wrap text-sm leading-6 text-card-foreground" }, toDisplayString(props.adjustment.reason), 1)
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "px-5 py-5"
                  }, [
                    createVNode("p", { class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" }, " Data penyesuaian kas tidak tersedia. ")
                  ])),
                  createVNode(unref(_sfc_main$4$2), { class: "border-t px-5 py-4" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), {
                        type: "button",
                        class: "h-10 w-full sm:w-auto",
                        onClick: ($event) => dialogOpen.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tutup ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/CashAdjustmentDetailDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CashAdjustmentDetailDialog = Object.assign(_sfc_main$3, { __name: "OrganismsCashAdjustmentDetailDialog" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CashAdjustmentDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    mode: { default: "create" },
    adjustment: { default: null },
    submitting: { type: Boolean, default: false }
  },
  emits: ["update:open", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const adjustmentType = ref("in");
    const amount = ref("");
    const reason = ref("");
    const errorMessage = ref("");
    const dialogOpen = computed({
      get: () => props.open,
      set: (value) => emit("update:open", value)
    });
    const dialogTitle = computed(() => props.mode === "edit" ? "Ubah Penyesuaian Kas" : "Tambah Penyesuaian Kas");
    const dialogDescription = computed(
      () => props.mode === "edit" ? "Ubah kas masuk atau keluar untuk simulasi shift berjalan." : "Catat kas masuk atau keluar untuk shift berjalan."
    );
    const submitLabel = computed(() => props.mode === "edit" ? "Simpan Perubahan" : "Simpan");
    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        hydrateForm();
        return;
      }
      resetForm();
    });
    watch(() => props.adjustment, () => {
      if (props.open) {
        hydrateForm();
      }
    });
    function hydrateForm() {
      adjustmentType.value = props.adjustment?.type ?? "in";
      amount.value = props.adjustment ? String(props.adjustment.amount) : "";
      reason.value = props.adjustment?.reason ?? "";
      errorMessage.value = "";
    }
    function resetForm() {
      adjustmentType.value = "in";
      amount.value = "";
      reason.value = "";
      errorMessage.value = "";
    }
    function handleSubmit() {
      if (props.submitting) {
        return;
      }
      errorMessage.value = "";
      const normalizedAmount = Number(amount.value);
      if (reason.value.trim().length > 255) {
        errorMessage.value = "Catatan maksimal 255 karakter.";
        return;
      }
      if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
        errorMessage.value = "Nominal wajib lebih dari 0.";
        return;
      }
      emit("submit", {
        type: adjustmentType.value,
        reason: reason.value.trim(),
        amount: normalizedAmount
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$9$1), mergeProps({
        open: unref(dialogOpen),
        "onUpdate:open": ($event) => isRef(dialogOpen) ? dialogOpen.value = $event : null
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6$1), { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3$1), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(dialogTitle))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(dialogTitle)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(dialogDescription))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(dialogDescription)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1$2), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(dialogTitle)), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(dialogDescription)), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${ssrRenderAttr("aria-busy", props.submitting)}${_scopeId2}>`);
                  if (unref(errorMessage)) {
                    _push3(`<p id="cash-adjustment-error" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(errorMessage))}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$b), { id: "cash-adjustment-type-label" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tipe`);
                      } else {
                        return [
                          createTextVNode("Tipe")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid grid-cols-2 gap-2" role="radiogroup" aria-labelledby="cash-adjustment-type-label"${_scopeId2}><button type="button" role="radio" class="${ssrRenderClass([unref(adjustmentType) === "in" ? "border-success bg-success text-success-foreground hover:bg-success/90" : "border-success/40 bg-success/10 text-success hover:bg-success/15", "inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"])}"${ssrRenderAttr("aria-checked", unref(adjustmentType) === "in")}${ssrIncludeBooleanAttr(props.submitting) ? " disabled" : ""}${_scopeId2}> Kas masuk </button><button type="button" role="radio" class="${ssrRenderClass([unref(adjustmentType) === "out" ? "border-destructive bg-destructive text-white hover:bg-destructive/90" : "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/15", "inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"])}"${ssrRenderAttr("aria-checked", unref(adjustmentType) === "out")}${ssrIncludeBooleanAttr(props.submitting) ? " disabled" : ""}${_scopeId2}> Kas keluar </button></div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$b), { for: "cash-adjustment-amount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Nominal`);
                      } else {
                        return [
                          createTextVNode("Nominal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1$3), {
                    id: "cash-adjustment-amount",
                    modelValue: unref(amount),
                    "onUpdate:modelValue": ($event) => isRef(amount) ? amount.value = $event : null,
                    inputmode: "numeric",
                    type: "number",
                    min: "1",
                    placeholder: "Contoh: 50000",
                    "aria-invalid": Boolean(unref(errorMessage)),
                    "aria-describedby": unref(errorMessage) ? "cash-adjustment-error" : void 0,
                    disabled: props.submitting
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$b), { for: "cash-adjustment-reason" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Catatan`);
                      } else {
                        return [
                          createTextVNode("Catatan")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    id: "cash-adjustment-reason",
                    modelValue: unref(reason),
                    "onUpdate:modelValue": ($event) => isRef(reason) ? reason.value = $event : null,
                    rows: "3",
                    maxlength: "255",
                    placeholder: "Opsional, tulis catatan penyesuaian kas",
                    "aria-invalid": Boolean(unref(errorMessage)),
                    "aria-describedby": unref(errorMessage) ? "cash-adjustment-error" : void 0,
                    disabled: props.submitting
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4$2), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          type: "button",
                          variant: "outline",
                          disabled: props.submitting,
                          onClick: ($event) => dialogOpen.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Batal `);
                            } else {
                              return [
                                createTextVNode(" Batal ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          type: "submit",
                          disabled: props.submitting
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (props.submitting) {
                                _push5(ssrRenderComponent(unref(_sfc_main$d), { class: "size-4" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(` ${ssrInterpolate(props.submitting ? "Menyimpan..." : unref(submitLabel))}`);
                            } else {
                              return [
                                props.submitting ? (openBlock(), createBlock(unref(_sfc_main$d), {
                                  key: 0,
                                  class: "size-4"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(props.submitting ? "Menyimpan..." : unref(submitLabel)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), {
                            type: "button",
                            variant: "outline",
                            disabled: props.submitting,
                            onClick: ($event) => dialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode(unref(_sfc_main$4), {
                            type: "submit",
                            disabled: props.submitting
                          }, {
                            default: withCtx(() => [
                              props.submitting ? (openBlock(), createBlock(unref(_sfc_main$d), {
                                key: 0,
                                class: "size-4"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(props.submitting ? "Menyimpan..." : unref(submitLabel)), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode(unref(_sfc_main$3$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$2), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(dialogTitle)), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5$1), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(dialogDescription)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4",
                      "aria-busy": props.submitting,
                      onSubmit: withModifiers(handleSubmit, ["prevent"])
                    }, [
                      unref(errorMessage) ? (openBlock(), createBlock("p", {
                        key: 0,
                        id: "cash-adjustment-error",
                        class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                      }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$b), { id: "cash-adjustment-type-label" }, {
                          default: withCtx(() => [
                            createTextVNode("Tipe")
                          ]),
                          _: 1
                        }),
                        createVNode("div", {
                          class: "grid grid-cols-2 gap-2",
                          role: "radiogroup",
                          "aria-labelledby": "cash-adjustment-type-label"
                        }, [
                          createVNode("button", {
                            type: "button",
                            role: "radio",
                            class: ["inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none", unref(adjustmentType) === "in" ? "border-success bg-success text-success-foreground hover:bg-success/90" : "border-success/40 bg-success/10 text-success hover:bg-success/15"],
                            "aria-checked": unref(adjustmentType) === "in",
                            disabled: props.submitting,
                            onClick: ($event) => adjustmentType.value = "in"
                          }, " Kas masuk ", 10, ["aria-checked", "disabled", "onClick"]),
                          createVNode("button", {
                            type: "button",
                            role: "radio",
                            class: ["inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none", unref(adjustmentType) === "out" ? "border-destructive bg-destructive text-white hover:bg-destructive/90" : "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/15"],
                            "aria-checked": unref(adjustmentType) === "out",
                            disabled: props.submitting,
                            onClick: ($event) => adjustmentType.value = "out"
                          }, " Kas keluar ", 10, ["aria-checked", "disabled", "onClick"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$b), { for: "cash-adjustment-amount" }, {
                          default: withCtx(() => [
                            createTextVNode("Nominal")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$1$3), {
                          id: "cash-adjustment-amount",
                          modelValue: unref(amount),
                          "onUpdate:modelValue": ($event) => isRef(amount) ? amount.value = $event : null,
                          inputmode: "numeric",
                          type: "number",
                          min: "1",
                          placeholder: "Contoh: 50000",
                          "aria-invalid": Boolean(unref(errorMessage)),
                          "aria-describedby": unref(errorMessage) ? "cash-adjustment-error" : void 0,
                          disabled: props.submitting
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$b), { for: "cash-adjustment-reason" }, {
                          default: withCtx(() => [
                            createTextVNode("Catatan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$c), {
                          id: "cash-adjustment-reason",
                          modelValue: unref(reason),
                          "onUpdate:modelValue": ($event) => isRef(reason) ? reason.value = $event : null,
                          rows: "3",
                          maxlength: "255",
                          placeholder: "Opsional, tulis catatan penyesuaian kas",
                          "aria-invalid": Boolean(unref(errorMessage)),
                          "aria-describedby": unref(errorMessage) ? "cash-adjustment-error" : void 0,
                          disabled: props.submitting
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled"])
                      ]),
                      createVNode(unref(_sfc_main$4$2), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), {
                            type: "button",
                            variant: "outline",
                            disabled: props.submitting,
                            onClick: ($event) => dialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode(unref(_sfc_main$4), {
                            type: "submit",
                            disabled: props.submitting
                          }, {
                            default: withCtx(() => [
                              props.submitting ? (openBlock(), createBlock(unref(_sfc_main$d), {
                                key: 0,
                                class: "size-4"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(props.submitting ? "Menyimpan..." : unref(submitLabel)), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ], 40, ["aria-busy"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$6$1), { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$1), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$2), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(dialogTitle)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5$1), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(dialogDescription)), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4",
                    "aria-busy": props.submitting,
                    onSubmit: withModifiers(handleSubmit, ["prevent"])
                  }, [
                    unref(errorMessage) ? (openBlock(), createBlock("p", {
                      key: 0,
                      id: "cash-adjustment-error",
                      class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$b), { id: "cash-adjustment-type-label" }, {
                        default: withCtx(() => [
                          createTextVNode("Tipe")
                        ]),
                        _: 1
                      }),
                      createVNode("div", {
                        class: "grid grid-cols-2 gap-2",
                        role: "radiogroup",
                        "aria-labelledby": "cash-adjustment-type-label"
                      }, [
                        createVNode("button", {
                          type: "button",
                          role: "radio",
                          class: ["inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none", unref(adjustmentType) === "in" ? "border-success bg-success text-success-foreground hover:bg-success/90" : "border-success/40 bg-success/10 text-success hover:bg-success/15"],
                          "aria-checked": unref(adjustmentType) === "in",
                          disabled: props.submitting,
                          onClick: ($event) => adjustmentType.value = "in"
                        }, " Kas masuk ", 10, ["aria-checked", "disabled", "onClick"]),
                        createVNode("button", {
                          type: "button",
                          role: "radio",
                          class: ["inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none", unref(adjustmentType) === "out" ? "border-destructive bg-destructive text-white hover:bg-destructive/90" : "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/15"],
                          "aria-checked": unref(adjustmentType) === "out",
                          disabled: props.submitting,
                          onClick: ($event) => adjustmentType.value = "out"
                        }, " Kas keluar ", 10, ["aria-checked", "disabled", "onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$b), { for: "cash-adjustment-amount" }, {
                        default: withCtx(() => [
                          createTextVNode("Nominal")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$1$3), {
                        id: "cash-adjustment-amount",
                        modelValue: unref(amount),
                        "onUpdate:modelValue": ($event) => isRef(amount) ? amount.value = $event : null,
                        inputmode: "numeric",
                        type: "number",
                        min: "1",
                        placeholder: "Contoh: 50000",
                        "aria-invalid": Boolean(unref(errorMessage)),
                        "aria-describedby": unref(errorMessage) ? "cash-adjustment-error" : void 0,
                        disabled: props.submitting
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$b), { for: "cash-adjustment-reason" }, {
                        default: withCtx(() => [
                          createTextVNode("Catatan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$c), {
                        id: "cash-adjustment-reason",
                        modelValue: unref(reason),
                        "onUpdate:modelValue": ($event) => isRef(reason) ? reason.value = $event : null,
                        rows: "3",
                        maxlength: "255",
                        placeholder: "Opsional, tulis catatan penyesuaian kas",
                        "aria-invalid": Boolean(unref(errorMessage)),
                        "aria-describedby": unref(errorMessage) ? "cash-adjustment-error" : void 0,
                        disabled: props.submitting
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled"])
                    ]),
                    createVNode(unref(_sfc_main$4$2), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), {
                          type: "button",
                          variant: "outline",
                          disabled: props.submitting,
                          onClick: ($event) => dialogOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(unref(_sfc_main$4), {
                          type: "submit",
                          disabled: props.submitting
                        }, {
                          default: withCtx(() => [
                            props.submitting ? (openBlock(), createBlock(unref(_sfc_main$d), {
                              key: 0,
                              class: "size-4"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(props.submitting ? "Menyimpan..." : unref(submitLabel)), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    })
                  ], 40, ["aria-busy"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/CashAdjustmentDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CashAdjustmentDialog = Object.assign(_sfc_main$2, { __name: "OrganismsCashAdjustmentDialog" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CashAdjustmentTable",
  __ssrInlineRender: true,
  props: {
    items: {},
    loading: { type: Boolean, default: false },
    loadingRowCount: { default: 6 }
  },
  emits: ["viewDetail"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$9), mergeProps({
        "aria-busy": props.loading
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$7), { class: "sr-only" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tabel penyesuaian kas. `);
                } else {
                  return [
                    createTextVNode(" Tabel penyesuaian kas. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tanggal`);
                            } else {
                              return [
                                createTextVNode("Tanggal")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { scope: "col" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Catatan`);
                            } else {
                              return [
                                createTextVNode("Catatan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Shift`);
                            } else {
                              return [
                                createTextVNode("Shift")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), {
                          scope: "col",
                          class: "text-right"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nominal`);
                            } else {
                              return [
                                createTextVNode("Nominal")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Status`);
                            } else {
                              return [
                                createTextVNode("Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), {
                          scope: "col",
                          class: "text-right"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Aksi`);
                            } else {
                              return [
                                createTextVNode("Aksi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                            default: withCtx(() => [
                              createTextVNode("Tanggal")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                            default: withCtx(() => [
                              createTextVNode("Tipe")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                            default: withCtx(() => [
                              createTextVNode("Catatan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                            default: withCtx(() => [
                              createTextVNode("Shift")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), {
                            scope: "col",
                            class: "text-right"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Nominal")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                            default: withCtx(() => [
                              createTextVNode("Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), {
                            scope: "col",
                            class: "text-right"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Aksi")
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
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx(() => [
                            createTextVNode("Tanggal")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx(() => [
                            createTextVNode("Tipe")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx(() => [
                            createTextVNode("Catatan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx(() => [
                            createTextVNode("Shift")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), {
                          scope: "col",
                          class: "text-right"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Nominal")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx(() => [
                            createTextVNode("Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), {
                          scope: "col",
                          class: "text-right"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Aksi")
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
            _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (props.loading) {
                    _push3(`<!--[-->`);
                    ssrRenderList(props.loadingRowCount, (index) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        key: `adjustment-loading-${index}`
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "h-4 w-36" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "h-4 w-36" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "h-6 w-16" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "h-6 w-16" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "h-4 w-48 max-w-full" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "h-4 w-48 max-w-full" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "h-4 w-24" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "h-4 w-24" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "ml-auto h-4 w-24" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "ml-auto h-4 w-24" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "h-6 w-20" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "h-6 w-20" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "ml-auto h-8 w-24" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "ml-auto h-8 w-24" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "h-4 w-36" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "h-6 w-16" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "h-4 w-48 max-w-full" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "h-4 w-24" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "ml-auto h-4 w-24" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "h-6 w-20" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "ml-auto h-8 w-24" })
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(props.items, (item) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        key: item.id
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.createdAt)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.createdAt), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(CashierStatusBadge, {
                                    status: item.type === "in" ? "success" : "warning"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.type === "in" ? "Masuk" : "Keluar")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.type === "in" ? "Masuk" : "Keluar"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(CashierStatusBadge, {
                                      status: item.type === "in" ? "success" : "warning"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.type === "in" ? "Masuk" : "Keluar"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["status"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "max-w-70 truncate" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.reason)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.reason), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.shiftStartedAt || "-")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.shiftStartedAt || "-"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right font-medium" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(CashierCurrency, {
                                    value: item.amount
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(CashierCurrency, {
                                      value: item.amount
                                    }, null, 8, ["value"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(CashierStatusBadge, {
                                    status: item.status
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.statusLabel)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.statusLabel), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(CashierStatusBadge, {
                                      status: item.status
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.statusLabel), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["status"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-wrap items-center justify-end gap-1.5"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$4), {
                                    type: "button",
                                    variant: "ghost",
                                    size: "sm",
                                    class: "text-primary hover:bg-primary/10 hover:text-primary",
                                    "aria-label": `Lihat detail penyesuaian ${item.createdAt}`,
                                    title: `Lihat detail penyesuaian ${item.createdAt}`,
                                    onClick: ($event) => emit("viewDetail", item)
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
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-wrap items-center justify-end gap-1.5" }, [
                                      createVNode(unref(_sfc_main$4), {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "text-primary hover:bg-primary/10 hover:text-primary",
                                        "aria-label": `Lihat detail penyesuaian ${item.createdAt}`,
                                        title: `Lihat detail penyesuaian ${item.createdAt}`,
                                        onClick: ($event) => emit("viewDetail", item)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Eye), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Detail ")
                                        ]),
                                        _: 1
                                      }, 8, ["aria-label", "title", "onClick"])
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.createdAt), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(CashierStatusBadge, {
                                    status: item.type === "in" ? "success" : "warning"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.type === "in" ? "Masuk" : "Keluar"), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["status"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), { class: "max-w-70 truncate" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.reason), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.shiftStartedAt || "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), { class: "text-right font-medium" }, {
                                default: withCtx(() => [
                                  createVNode(CashierCurrency, {
                                    value: item.amount
                                  }, null, 8, ["value"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(CashierStatusBadge, {
                                    status: item.status
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.statusLabel), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["status"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-wrap items-center justify-end gap-1.5" }, [
                                    createVNode(unref(_sfc_main$4), {
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "text-primary hover:bg-primary/10 hover:text-primary",
                                      "aria-label": `Lihat detail penyesuaian ${item.createdAt}`,
                                      title: `Lihat detail penyesuaian ${item.createdAt}`,
                                      onClick: ($event) => emit("viewDetail", item)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Eye), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Detail ")
                                      ]),
                                      _: 1
                                    }, 8, ["aria-label", "title", "onClick"])
                                  ])
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
                  }
                  if (!props.loading && !props.items.length) {
                    _push3(ssrRenderComponent(unref(_sfc_main$4$1), { colspan: 7 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Tidak ada penyesuaian kas. `);
                        } else {
                          return [
                            createTextVNode(" Tidak ada penyesuaian kas. ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    props.loading ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.loadingRowCount, (index) => {
                      return openBlock(), createBlock(unref(_sfc_main$5), {
                        key: `adjustment-loading-${index}`
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-4 w-36" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-6 w-16" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-4 w-48 max-w-full" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-4 w-24" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "ml-auto h-4 w-24" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-6 w-20" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "ml-auto h-8 w-24" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      });
                    }), 128)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(props.items, (item) => {
                      return openBlock(), createBlock(unref(_sfc_main$5), {
                        key: item.id
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.createdAt), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(CashierStatusBadge, {
                                status: item.type === "in" ? "success" : "warning"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.type === "in" ? "Masuk" : "Keluar"), 1)
                                ]),
                                _: 2
                              }, 1032, ["status"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), { class: "max-w-70 truncate" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.reason), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.shiftStartedAt || "-"), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), { class: "text-right font-medium" }, {
                            default: withCtx(() => [
                              createVNode(CashierCurrency, {
                                value: item.amount
                              }, null, 8, ["value"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(CashierStatusBadge, {
                                status: item.status
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.statusLabel), 1)
                                ]),
                                _: 2
                              }, 1032, ["status"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-wrap items-center justify-end gap-1.5" }, [
                                createVNode(unref(_sfc_main$4), {
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "text-primary hover:bg-primary/10 hover:text-primary",
                                  "aria-label": `Lihat detail penyesuaian ${item.createdAt}`,
                                  title: `Lihat detail penyesuaian ${item.createdAt}`,
                                  onClick: ($event) => emit("viewDetail", item)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Eye), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Detail ")
                                  ]),
                                  _: 1
                                }, 8, ["aria-label", "title", "onClick"])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    !props.loading && !props.items.length ? (openBlock(), createBlock(unref(_sfc_main$4$1), {
                      key: 2,
                      colspan: 7
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Tidak ada penyesuaian kas. ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$7), { class: "sr-only" }, {
                default: withCtx(() => [
                  createTextVNode(" Tabel penyesuaian kas. ")
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$1$1), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Tanggal")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Tipe")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Catatan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Shift")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), {
                        scope: "col",
                        class: "text-right"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Nominal")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Status")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), {
                        scope: "col",
                        class: "text-right"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Aksi")
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
                  props.loading ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.loadingRowCount, (index) => {
                    return openBlock(), createBlock(unref(_sfc_main$5), {
                      key: `adjustment-loading-${index}`
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-4 w-36" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-6 w-16" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-4 w-48 max-w-full" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-4 w-24" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "ml-auto h-4 w-24" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-6 w-20" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "ml-auto h-8 w-24" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    });
                  }), 128)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(props.items, (item) => {
                    return openBlock(), createBlock(unref(_sfc_main$5), {
                      key: item.id
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.createdAt), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(CashierStatusBadge, {
                              status: item.type === "in" ? "success" : "warning"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.type === "in" ? "Masuk" : "Keluar"), 1)
                              ]),
                              _: 2
                            }, 1032, ["status"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), { class: "max-w-70 truncate" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.reason), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.shiftStartedAt || "-"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), { class: "text-right font-medium" }, {
                          default: withCtx(() => [
                            createVNode(CashierCurrency, {
                              value: item.amount
                            }, null, 8, ["value"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(CashierStatusBadge, {
                              status: item.status
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.statusLabel), 1)
                              ]),
                              _: 2
                            }, 1032, ["status"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-wrap items-center justify-end gap-1.5" }, [
                              createVNode(unref(_sfc_main$4), {
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "text-primary hover:bg-primary/10 hover:text-primary",
                                "aria-label": `Lihat detail penyesuaian ${item.createdAt}`,
                                title: `Lihat detail penyesuaian ${item.createdAt}`,
                                onClick: ($event) => emit("viewDetail", item)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Eye), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Detail ")
                                ]),
                                _: 1
                              }, 8, ["aria-label", "title", "onClick"])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  !props.loading && !props.items.length ? (openBlock(), createBlock(unref(_sfc_main$4$1), {
                    key: 2,
                    colspan: 7
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Tidak ada penyesuaian kas. ")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/CashAdjustmentTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CashAdjustmentTable = Object.assign(_sfc_main$1, { __name: "OrganismsCashAdjustmentTable" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cash-adjustments",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Penyesuaian Kas"
    });
    const typeFilter = ref("all");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const isDialogOpen = ref(false);
    const isAdjustmentSubmitting = ref(false);
    const selectedAdjustment = ref(null);
    const isDetailDialogOpen = ref(false);
    const { runCashierAction } = useCashierActionFeedback();
    const {
      activeShift,
      adjustments,
      cashAdjustmentPage,
      cashAdjustmentSummary,
      cashInTotal,
      cashOutTotal,
      createCashAdjustment,
      formatCurrency,
      isCashAdjustmentListLoading,
      isCashAdjustmentDetailLoading,
      loadActiveShift,
      loadCashAdjustments,
      loadCashAdjustmentDetail
    } = useCashierStore();
    const totalAdjustments = computed(() => cashAdjustmentPage.value?.total_record_count ?? adjustments.value.length);
    const netCashAdjustment = computed(() => Number(cashAdjustmentSummary.value?.net_amount ?? cashInTotal.value - cashOutTotal.value));
    let skipNextPageLoad = false;
    watch([typeFilter, pageSize], () => {
      resetPageAndLoadCashAdjustments();
    });
    watch(currentPage, () => {
      if (skipNextPageLoad) {
        skipNextPageLoad = false;
        return;
      }
      void loadCashAdjustmentPage();
    });
    async function loadCashAdjustmentPage() {
      try {
        const shift = activeShift.value ?? await loadActiveShift();
        if (!shift?.id) {
          adjustments.value = [];
          cashAdjustmentPage.value = null;
          cashAdjustmentSummary.value = null;
          return;
        }
        await loadCashAdjustments({
          batch: currentPage.value,
          size: pageSize.value,
          shift_id: shift.id,
          ...typeFilter.value !== "all" ? { type: typeFilter.value } : {}
        });
      } catch (error) {
        toast.error(getErrorMessage(error, "Gagal memuat penyesuaian kas."));
      }
    }
    function resetPageAndLoadCashAdjustments() {
      if (currentPage.value !== 1) {
        currentPage.value = 1;
        return;
      }
      void loadCashAdjustmentPage();
    }
    function openCreateDialog() {
      selectedAdjustment.value = null;
      isDialogOpen.value = true;
    }
    async function handleSubmitAdjustment(payload) {
      const adjustment = await runCashierAction(async () => {
        const shift = activeShift.value ?? await loadActiveShift();
        if (!shift?.id) {
          throw new Error("Shift belum dibuka.");
        }
        const createdAdjustment = await createCashAdjustment(payload);
        if (currentPage.value !== 1) {
          skipNextPageLoad = true;
          currentPage.value = 1;
        }
        await loadCashAdjustments({
          batch: currentPage.value,
          size: pageSize.value,
          shift_id: shift.id,
          ...typeFilter.value !== "all" ? { type: typeFilter.value } : {}
        });
        return createdAdjustment;
      }, {
        loading: isAdjustmentSubmitting,
        successMessage: "Penyesuaian kas dicatat",
        successDescription: "Data tersimpan pada shift aktif.",
        errorMessage: "Penyesuaian kas gagal diproses."
      });
      if (adjustment) {
        isDialogOpen.value = false;
      }
    }
    async function handleViewDetail(item) {
      selectedAdjustment.value = item;
      isDetailDialogOpen.value = true;
      try {
        selectedAdjustment.value = await loadCashAdjustmentDetail(item.id);
      } catch (error) {
        toast.error(getErrorMessage(error, "Gagal memuat detail penyesuaian kas."));
      }
    }
    function getErrorMessage(error, fallback) {
      if (error instanceof Error && error.message) {
        return error.message;
      }
      return fallback;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-full flex-col gap-3 p-3 sm:p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(CashierPageHeader, {
        title: "Penyesuaian Kas",
        description: "Catat dan pantau mutasi kas manual dalam shift."
      }, null, _parent));
      _push(`<div class="grid gap-2 sm:grid-cols-3">`);
      _push(ssrRenderComponent(CashierMetric, {
        label: "Kas masuk",
        value: unref(formatCurrency)(unref(cashInTotal)),
        helper: "Sesuai filter",
        tone: "success"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowDownToLine), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ArrowDownToLine), {
                class: "size-4",
                "aria-hidden": "true"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(CashierMetric, {
        label: "Kas keluar",
        value: unref(formatCurrency)(unref(cashOutTotal)),
        helper: "Sesuai filter",
        tone: "destructive"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowUpFromLine), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ArrowUpFromLine), {
                class: "size-4",
                "aria-hidden": "true"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(CashierMetric, {
        label: "Net kas",
        value: unref(formatCurrency)(unref(netCashAdjustment)),
        helper: "Masuk dikurangi keluar",
        tone: "info"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(WalletCards), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(WalletCards), {
                class: "size-4",
                "aria-hidden": "true"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="adjustments-table-title"><div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 id="adjustments-table-title" class="text-base font-semibold tracking-normal"> Tabel Penyesuaian Kas </h2><p class="text-sm text-muted-foreground">${ssrInterpolate(unref(isCashAdjustmentListLoading) ? "Memuat penyesuaian kas..." : `${unref(totalAdjustments)} penyesuaian kas.`)}</p></div><div class="flex flex-wrap items-center gap-2"><div><label for="cash-adjustment-type-filter" class="sr-only">Filter tipe penyesuaian kas</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$2$1), {
        id: "cash-adjustment-type-filter",
        modelValue: unref(typeFilter),
        "onUpdate:modelValue": ($event) => isRef(typeFilter) ? typeFilter.value = $event : null,
        class: "w-40",
        disabled: unref(isCashAdjustmentListLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="all"${_scopeId}>Semua tipe</option><option value="IN"${_scopeId}>Kas masuk</option><option value="OUT"${_scopeId}>Kas keluar</option>`);
          } else {
            return [
              createVNode("option", { value: "all" }, "Semua tipe"),
              createVNode("option", { value: "IN" }, "Kas masuk"),
              createVNode("option", { value: "OUT" }, "Kas keluar")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        type: "button",
        size: "sm",
        disabled: unref(isCashAdjustmentListLoading),
        onClick: openCreateDialog
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(` Tambah `);
          } else {
            return [
              createVNode(unref(Plus), {
                class: "size-4",
                "aria-hidden": "true"
              }),
              createTextVNode(" Tambah ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="space-y-3">`);
      _push(ssrRenderComponent(CashAdjustmentTable, {
        items: unref(adjustments),
        loading: unref(isCashAdjustmentListLoading),
        onViewDetail: handleViewDetail
      }, null, _parent));
      _push(ssrRenderComponent(CashierTablePagination, {
        page: unref(currentPage),
        "onUpdate:page": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
        "page-size": unref(pageSize),
        "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null,
        "total-items": unref(totalAdjustments),
        disabled: unref(isCashAdjustmentListLoading),
        label: "penyesuaian"
      }, null, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(CashAdjustmentDialog, {
        open: unref(isDialogOpen),
        "onUpdate:open": ($event) => isRef(isDialogOpen) ? isDialogOpen.value = $event : null,
        adjustment: unref(selectedAdjustment),
        submitting: unref(isAdjustmentSubmitting),
        onSubmit: handleSubmitAdjustment
      }, null, _parent));
      _push(ssrRenderComponent(CashAdjustmentDetailDialog, {
        open: unref(isDetailDialogOpen),
        "onUpdate:open": ($event) => isRef(isDetailDialogOpen) ? isDetailDialogOpen.value = $event : null,
        adjustment: unref(selectedAdjustment),
        loading: unref(isCashAdjustmentDetailLoading)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/pages/cashier/cash-adjustments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cash-adjustments-DKr_xbup.mjs.map
