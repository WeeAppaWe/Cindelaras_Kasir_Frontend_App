import { defineComponent, ref, computed, unref, mergeProps, isRef, withCtx, createVNode, toDisplayString, renderSlot, openBlock, createBlock, createTextVNode, resolveDynamicComponent, Fragment, renderList, watch, createCommentVNode, withModifiers, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrRenderList, ssrRenderVNode, ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { toast } from 'vue-sonner';
import { _ as _sfc_main$3$1, a as _sfc_main$i, b as _sfc_main$5, c as _sfc_main$r, d as _sfc_main$k, e as _sfc_main$q, f as _sfc_main$o, g as _sfc_main$l, h as _sfc_main$m, i as _sfc_main$h, j as _sfc_main$8, k as _sfc_main$9, l as _sfc_main$p, m as _sfc_main$1$1 } from './index-bJ2IbZGU.mjs';
import { _ as _sfc_main$6 } from './Sonner-ympm_ln7.mjs';
import { ReceiptText, History, WalletCards, Banknote, Settings, Clock3, CalendarDays, Scale, Calculator, CheckCircle2, AlertTriangle, LogOut } from 'lucide-vue-next';
import { u as useRoute } from './server.mjs';
import { _ as _sfc_main$c } from './index-BZG70idc.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$2, c as _sfc_main$1$2, d as _sfc_main$5$1, e as _sfc_main$4$1 } from './DialogTrigger-B5C6UhMx.mjs';
import { _ as _sfc_main$1$3, a as _sfc_main$a } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$7 } from './Label-Cd3JlovY.mjs';
import { _ as _sfc_main$b } from './Textarea-DYkcGDV8.mjs';
import { u as useCashierStore, C as CashierCurrency, a as useCashierActionFeedback } from './useCashierStore-BzXm0Spj.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-B5v6N24G.mjs';
import { u as useAuth } from './useAuth-CSrxgwfa.mjs';
import { u as usePublicStoreProfile } from './usePublicStoreProfile-y5WoB9kq.mjs';
import { u as useFlashToast } from './useFlashToast-HgpcM5Qo.mjs';
import { b as useCookie } from './api-endpoints-BXkjOpII.mjs';
import { u as useState } from './state-Dw1r7BQr.mjs';
import 'class-variance-authority';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import './Skeleton-CQWwuiK0.mjs';
import './Separator-DD0IdWG4.mjs';
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

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CashierDateTime",
  __ssrInlineRender: true,
  setup(__props) {
    const now = ref(null);
    const timeFormatter = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    const dateFormatter = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    const timeLabel = computed(() => {
      if (!now.value) {
        return "--:--:--";
      }
      return timeFormatter.format(now.value).replace(/\./g, ":");
    });
    const dateLabel = computed(() => {
      if (!now.value) {
        return "Memuat tanggal";
      }
      return dateFormatter.format(now.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex h-9 shrink-0 items-center gap-2 rounded-md border bg-card px-3 text-card-foreground shadow-xs",
        "aria-label": "Jam dan tanggal saat ini"
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Clock3), {
        class: "size-3.5 shrink-0 text-muted-foreground",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="font-mono text-sm font-semibold tabular-nums leading-none tracking-normal">${ssrInterpolate(unref(timeLabel))}</span><span class="h-4 w-px shrink-0 bg-border" aria-hidden="true"></span>`);
      _push(ssrRenderComponent(unref(CalendarDays), {
        class: "size-3.5 shrink-0 text-muted-foreground",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<span class="max-w-36 truncate text-xs leading-none text-muted-foreground sm:max-w-48">${ssrInterpolate(unref(dateLabel))}</span></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/molecules/CashierDateTime.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const CashierDateTime = Object.assign(_sfc_main$4, { __name: "MoleculesCashierDateTime" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CashierCloseShiftDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    openingCash: {},
    salesTotal: {},
    cashSalesTotal: {},
    expectedCash: {},
    submitting: { type: Boolean, default: false }
  },
  emits: ["update:open", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const physicalCash = ref("");
    const notes = ref("");
    const errorMessage = ref("");
    const dialogOpen = computed({
      get: () => props.open,
      set: (value) => emit("update:open", value)
    });
    const physicalCashText = computed(() => String(physicalCash.value).trim());
    const notesText = computed(() => notes.value.trim());
    const hasPhysicalCash = computed(() => physicalCashText.value.length > 0);
    const normalizedPhysicalCash = computed(() => Number(physicalCashText.value));
    const hasValidPhysicalCash = computed(() => hasPhysicalCash.value && Number.isFinite(normalizedPhysicalCash.value) && normalizedPhysicalCash.value >= 0);
    const hasValidNotes = computed(() => notes.value.length <= 500);
    const cashDifference = computed(() => {
      if (!hasValidPhysicalCash.value) {
        return 0;
      }
      return normalizedPhysicalCash.value - props.expectedCash;
    });
    const differenceLabel = computed(() => {
      if (!hasValidPhysicalCash.value) {
        return "Masukkan uang fisik untuk menghitung selisih.";
      }
      if (cashDifference.value === 0) {
        return "Kas fisik sesuai.";
      }
      return cashDifference.value > 0 ? "Kas fisik lebih." : "Kas fisik kurang.";
    });
    const differenceStateClass = computed(() => {
      if (!hasValidPhysicalCash.value) {
        return "border-muted bg-muted/30 text-muted-foreground";
      }
      if (cashDifference.value === 0) {
        return "border-success/40 bg-success/10 text-success";
      }
      if (cashDifference.value > 0) {
        return "border-info/40 bg-info/10 text-info";
      }
      return "border-destructive/40 bg-destructive/10 text-destructive";
    });
    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        physicalCash.value = "";
        notes.value = "";
        errorMessage.value = "";
      }
    });
    function applyExpectedCashRecommendation() {
      physicalCash.value = String(props.expectedCash);
      errorMessage.value = "";
    }
    function handleSubmit() {
      if (props.submitting) {
        return;
      }
      errorMessage.value = "";
      if (!hasPhysicalCash.value) {
        errorMessage.value = "Total uang fisik wajib diisi.";
        return;
      }
      if (!Number.isFinite(normalizedPhysicalCash.value) || normalizedPhysicalCash.value < 0) {
        errorMessage.value = "Total uang fisik tidak boleh kurang dari 0.";
        return;
      }
      if (!hasValidNotes.value) {
        errorMessage.value = "Catatan maksimal 500 karakter.";
        return;
      }
      emit("submit", {
        physicalCash: normalizedPhysicalCash.value,
        ...notesText.value ? { notes: notesText.value } : {}
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$9$1), mergeProps({
        open: unref(dialogOpen),
        "onUpdate:open": ($event) => isRef(dialogOpen) ? dialogOpen.value = $event : null
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6$1), { class: "gap-0 p-0 sm:max-w-xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3$2), { class: "border-b px-5 pt-5 pb-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-start gap-3"${_scopeId3}><span class="flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Scale), {
                          class: "size-5",
                          "aria-hidden": "true"
                        }, null, _parent4, _scopeId3));
                        _push4(`</span><div class="min-w-0"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tutup Shift`);
                            } else {
                              return [
                                createTextVNode("Tutup Shift")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), { class: "mt-1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Cocokkan kas sistem dengan uang fisik sebelum keluar. `);
                            } else {
                              return [
                                createTextVNode(" Cocokkan kas sistem dengan uang fisik sebelum keluar. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-start gap-3" }, [
                            createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive" }, [
                              createVNode(unref(Scale), {
                                class: "size-5",
                                "aria-hidden": "true"
                              })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode(unref(_sfc_main$1$2), null, {
                                default: withCtx(() => [
                                  createTextVNode("Tutup Shift")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Cocokkan kas sistem dengan uang fisik sebelum keluar. ")
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
                  _push3(`<form class="space-y-5 px-5 py-5"${ssrRenderAttr("aria-busy", props.submitting)}${_scopeId2}><div class="rounded-md border border-primary/20 bg-primary/10 p-4"${_scopeId2}><div class="flex items-center justify-between gap-3"${_scopeId2}><div class="flex items-center gap-2 text-sm font-medium text-primary"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Calculator), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Kas yang diharapkan</span></div><span class="rounded-md border border-primary/20 bg-background/80 px-2 py-1 text-xs font-medium text-primary"${_scopeId2}> Wajib cocok </span></div><p class="mt-3 text-2xl font-semibold tracking-normal text-foreground"${_scopeId2}>`);
                  _push3(ssrRenderComponent(CashierCurrency, {
                    value: props.expectedCash
                  }, null, _parent3, _scopeId2));
                  _push3(`</p></div><dl class="grid gap-2 sm:grid-cols-3"${_scopeId2}><div class="rounded-md border bg-secondary/70 p-3"${_scopeId2}><dt class="flex items-center gap-2 text-xs font-medium text-secondary-foreground"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(WalletCards), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(` Kas awal </dt><dd class="mt-2 text-sm font-semibold text-foreground"${_scopeId2}>`);
                  _push3(ssrRenderComponent(CashierCurrency, {
                    value: props.openingCash
                  }, null, _parent3, _scopeId2));
                  _push3(`</dd></div><div class="rounded-md border border-success/30 bg-success/10 p-3"${_scopeId2}><dt class="flex items-center gap-2 text-xs font-medium text-success"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ReceiptText), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(` Total penjualan </dt><dd class="mt-2 text-sm font-semibold text-foreground"${_scopeId2}>`);
                  _push3(ssrRenderComponent(CashierCurrency, {
                    value: props.salesTotal
                  }, null, _parent3, _scopeId2));
                  _push3(`</dd></div><div class="rounded-md border border-warning/40 bg-warning/10 p-3"${_scopeId2}><dt class="flex items-center gap-2 text-xs font-medium text-warning"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(WalletCards), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tunai </dt><dd class="mt-2 text-sm font-semibold text-foreground"${_scopeId2}>`);
                  _push3(ssrRenderComponent(CashierCurrency, {
                    value: props.cashSalesTotal
                  }, null, _parent3, _scopeId2));
                  _push3(`</dd></div></dl>`);
                  if (unref(errorMessage)) {
                    _push3(`<p id="close-shift-error" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(errorMessage))}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "physical-cash" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Total uang fisik`);
                      } else {
                        return [
                          createTextVNode("Total uang fisik")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1$3), {
                    id: "physical-cash",
                    modelValue: unref(physicalCash),
                    "onUpdate:modelValue": ($event) => isRef(physicalCash) ? physicalCash.value = $event : null,
                    class: "h-11 text-base font-medium",
                    inputmode: "numeric",
                    min: "0",
                    type: "number",
                    placeholder: "Contoh: 850000",
                    "aria-invalid": unref(errorMessage) ? true : void 0,
                    "aria-describedby": unref(errorMessage) ? "close-shift-error close-shift-difference" : "close-shift-difference",
                    disabled: props.submitting
                  }, null, _parent3, _scopeId2));
                  _push3(`<button type="button" class="flex w-full items-center justify-between gap-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-left transition-colors hover:bg-primary/10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"${ssrIncludeBooleanAttr(props.submitting) ? " disabled" : ""}${_scopeId2}><span class="min-w-0"${_scopeId2}><span class="block text-xs font-medium text-primary"${_scopeId2}>Rekomendasi</span><span class="block truncate text-xs text-muted-foreground"${_scopeId2}>Isi sesuai kas yang diharapkan</span></span><span class="shrink-0 text-sm font-semibold text-foreground"${_scopeId2}>`);
                  _push3(ssrRenderComponent(CashierCurrency, {
                    value: props.expectedCash
                  }, null, _parent3, _scopeId2));
                  _push3(`</span></button></div><div class="space-y-2"${_scopeId2}><div class="flex items-center justify-between gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "close-shift-notes" }, {
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
                  _push3(`<span class="${ssrRenderClass(["text-xs", unref(hasValidNotes) ? "text-muted-foreground" : "text-destructive"])}"${_scopeId2}>${ssrInterpolate(unref(notes).length)}/500 </span></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$b), {
                    id: "close-shift-notes",
                    modelValue: unref(notes),
                    "onUpdate:modelValue": ($event) => isRef(notes) ? notes.value = $event : null,
                    class: "min-h-20 resize-none",
                    maxlength: "500",
                    placeholder: "Opsional",
                    "aria-invalid": !unref(hasValidNotes) ? true : void 0,
                    disabled: props.submitting
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div id="close-shift-difference" aria-live="polite" class="${ssrRenderClass(["rounded-md border p-3 text-sm", unref(differenceStateClass)])}"${_scopeId2}><div class="flex items-center justify-between gap-3"${_scopeId2}><div class="flex min-w-0 items-center gap-3"${_scopeId2}><span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-background/70"${_scopeId2}>`);
                  if (unref(hasValidPhysicalCash) && unref(cashDifference) === 0) {
                    _push3(ssrRenderComponent(unref(CheckCircle2), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(AlertTriangle), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                  }
                  _push3(`</span><div class="min-w-0"${_scopeId2}><p class="font-medium"${_scopeId2}>${ssrInterpolate(unref(differenceLabel))}</p><p class="mt-0.5 text-xs opacity-90"${_scopeId2}>Selisih kas</p></div></div><strong class="shrink-0 text-base"${_scopeId2}>`);
                  _push3(ssrRenderComponent(CashierCurrency, { value: unref(cashDifference) }, null, _parent3, _scopeId2));
                  _push3(`</strong></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4$1), { class: "grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 sm:justify-normal" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          type: "button",
                          variant: "outline",
                          class: "h-11 w-full",
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
                        _push4(ssrRenderComponent(unref(_sfc_main$c), {
                          type: "submit",
                          class: "h-11 w-full bg-destructive text-white hover:bg-destructive/90",
                          disabled: props.submitting
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (props.submitting) {
                                _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "size-4" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(LogOut), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(` ${ssrInterpolate(props.submitting ? "Menutup Shift..." : "Tutup Shift & Keluar")}`);
                            } else {
                              return [
                                props.submitting ? (openBlock(), createBlock(unref(_sfc_main$a), {
                                  key: 0,
                                  class: "size-4"
                                })) : (openBlock(), createBlock(unref(LogOut), {
                                  key: 1,
                                  class: "size-4",
                                  "aria-hidden": "true"
                                })),
                                createTextVNode(" " + toDisplayString(props.submitting ? "Menutup Shift..." : "Tutup Shift & Keluar"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$c), {
                            type: "button",
                            variant: "outline",
                            class: "h-11 w-full",
                            disabled: props.submitting,
                            onClick: ($event) => dialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode(unref(_sfc_main$c), {
                            type: "submit",
                            class: "h-11 w-full bg-destructive text-white hover:bg-destructive/90",
                            disabled: props.submitting
                          }, {
                            default: withCtx(() => [
                              props.submitting ? (openBlock(), createBlock(unref(_sfc_main$a), {
                                key: 0,
                                class: "size-4"
                              })) : (openBlock(), createBlock(unref(LogOut), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              })),
                              createTextVNode(" " + toDisplayString(props.submitting ? "Menutup Shift..." : "Tutup Shift & Keluar"), 1)
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
                    createVNode(unref(_sfc_main$3$2), { class: "border-b px-5 pt-5 pb-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive" }, [
                            createVNode(unref(Scale), {
                              class: "size-5",
                              "aria-hidden": "true"
                            })
                          ]),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode(unref(_sfc_main$1$2), null, {
                              default: withCtx(() => [
                                createTextVNode("Tutup Shift")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                              default: withCtx(() => [
                                createTextVNode(" Cocokkan kas sistem dengan uang fisik sebelum keluar. ")
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-5 px-5 py-5",
                      "aria-busy": props.submitting,
                      onSubmit: withModifiers(handleSubmit, ["prevent"])
                    }, [
                      createVNode("div", { class: "rounded-md border border-primary/20 bg-primary/10 p-4" }, [
                        createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-sm font-medium text-primary" }, [
                            createVNode(unref(Calculator), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }),
                            createVNode("span", null, "Kas yang diharapkan")
                          ]),
                          createVNode("span", { class: "rounded-md border border-primary/20 bg-background/80 px-2 py-1 text-xs font-medium text-primary" }, " Wajib cocok ")
                        ]),
                        createVNode("p", { class: "mt-3 text-2xl font-semibold tracking-normal text-foreground" }, [
                          createVNode(CashierCurrency, {
                            value: props.expectedCash
                          }, null, 8, ["value"])
                        ])
                      ]),
                      createVNode("dl", { class: "grid gap-2 sm:grid-cols-3" }, [
                        createVNode("div", { class: "rounded-md border bg-secondary/70 p-3" }, [
                          createVNode("dt", { class: "flex items-center gap-2 text-xs font-medium text-secondary-foreground" }, [
                            createVNode(unref(WalletCards), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }),
                            createTextVNode(" Kas awal ")
                          ]),
                          createVNode("dd", { class: "mt-2 text-sm font-semibold text-foreground" }, [
                            createVNode(CashierCurrency, {
                              value: props.openingCash
                            }, null, 8, ["value"])
                          ])
                        ]),
                        createVNode("div", { class: "rounded-md border border-success/30 bg-success/10 p-3" }, [
                          createVNode("dt", { class: "flex items-center gap-2 text-xs font-medium text-success" }, [
                            createVNode(unref(ReceiptText), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }),
                            createTextVNode(" Total penjualan ")
                          ]),
                          createVNode("dd", { class: "mt-2 text-sm font-semibold text-foreground" }, [
                            createVNode(CashierCurrency, {
                              value: props.salesTotal
                            }, null, 8, ["value"])
                          ])
                        ]),
                        createVNode("div", { class: "rounded-md border border-warning/40 bg-warning/10 p-3" }, [
                          createVNode("dt", { class: "flex items-center gap-2 text-xs font-medium text-warning" }, [
                            createVNode(unref(WalletCards), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }),
                            createTextVNode(" Tunai ")
                          ]),
                          createVNode("dd", { class: "mt-2 text-sm font-semibold text-foreground" }, [
                            createVNode(CashierCurrency, {
                              value: props.cashSalesTotal
                            }, null, 8, ["value"])
                          ])
                        ])
                      ]),
                      unref(errorMessage) ? (openBlock(), createBlock("p", {
                        key: 0,
                        id: "close-shift-error",
                        class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                      }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "physical-cash" }, {
                          default: withCtx(() => [
                            createTextVNode("Total uang fisik")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$1$3), {
                          id: "physical-cash",
                          modelValue: unref(physicalCash),
                          "onUpdate:modelValue": ($event) => isRef(physicalCash) ? physicalCash.value = $event : null,
                          class: "h-11 text-base font-medium",
                          inputmode: "numeric",
                          min: "0",
                          type: "number",
                          placeholder: "Contoh: 850000",
                          "aria-invalid": unref(errorMessage) ? true : void 0,
                          "aria-describedby": unref(errorMessage) ? "close-shift-error close-shift-difference" : "close-shift-difference",
                          disabled: props.submitting
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled"]),
                        createVNode("button", {
                          type: "button",
                          class: "flex w-full items-center justify-between gap-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-left transition-colors hover:bg-primary/10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                          disabled: props.submitting,
                          onClick: applyExpectedCashRecommendation
                        }, [
                          createVNode("span", { class: "min-w-0" }, [
                            createVNode("span", { class: "block text-xs font-medium text-primary" }, "Rekomendasi"),
                            createVNode("span", { class: "block truncate text-xs text-muted-foreground" }, "Isi sesuai kas yang diharapkan")
                          ]),
                          createVNode("span", { class: "shrink-0 text-sm font-semibold text-foreground" }, [
                            createVNode(CashierCurrency, {
                              value: props.expectedCash
                            }, null, 8, ["value"])
                          ])
                        ], 8, ["disabled"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                          createVNode(unref(_sfc_main$7), { for: "close-shift-notes" }, {
                            default: withCtx(() => [
                              createTextVNode("Catatan")
                            ]),
                            _: 1
                          }),
                          createVNode("span", {
                            class: ["text-xs", unref(hasValidNotes) ? "text-muted-foreground" : "text-destructive"]
                          }, toDisplayString(unref(notes).length) + "/500 ", 3)
                        ]),
                        createVNode(unref(_sfc_main$b), {
                          id: "close-shift-notes",
                          modelValue: unref(notes),
                          "onUpdate:modelValue": ($event) => isRef(notes) ? notes.value = $event : null,
                          class: "min-h-20 resize-none",
                          maxlength: "500",
                          placeholder: "Opsional",
                          "aria-invalid": !unref(hasValidNotes) ? true : void 0,
                          disabled: props.submitting
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "disabled"])
                      ]),
                      createVNode("div", {
                        id: "close-shift-difference",
                        "aria-live": "polite",
                        class: ["rounded-md border p-3 text-sm", unref(differenceStateClass)]
                      }, [
                        createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                          createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [
                            createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center rounded-md bg-background/70" }, [
                              unref(hasValidPhysicalCash) && unref(cashDifference) === 0 ? (openBlock(), createBlock(unref(CheckCircle2), {
                                key: 0,
                                class: "size-4",
                                "aria-hidden": "true"
                              })) : (openBlock(), createBlock(unref(AlertTriangle), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              }))
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(unref(differenceLabel)), 1),
                              createVNode("p", { class: "mt-0.5 text-xs opacity-90" }, "Selisih kas")
                            ])
                          ]),
                          createVNode("strong", { class: "shrink-0 text-base" }, [
                            createVNode(CashierCurrency, { value: unref(cashDifference) }, null, 8, ["value"])
                          ])
                        ])
                      ], 2),
                      createVNode(unref(_sfc_main$4$1), { class: "grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 sm:justify-normal" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$c), {
                            type: "button",
                            variant: "outline",
                            class: "h-11 w-full",
                            disabled: props.submitting,
                            onClick: ($event) => dialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode(unref(_sfc_main$c), {
                            type: "submit",
                            class: "h-11 w-full bg-destructive text-white hover:bg-destructive/90",
                            disabled: props.submitting
                          }, {
                            default: withCtx(() => [
                              props.submitting ? (openBlock(), createBlock(unref(_sfc_main$a), {
                                key: 0,
                                class: "size-4"
                              })) : (openBlock(), createBlock(unref(LogOut), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              })),
                              createTextVNode(" " + toDisplayString(props.submitting ? "Menutup Shift..." : "Tutup Shift & Keluar"), 1)
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
              createVNode(unref(_sfc_main$6$1), { class: "gap-0 p-0 sm:max-w-xl" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$2), { class: "border-b px-5 pt-5 pb-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive" }, [
                          createVNode(unref(Scale), {
                            class: "size-5",
                            "aria-hidden": "true"
                          })
                        ]),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode(unref(_sfc_main$1$2), null, {
                            default: withCtx(() => [
                              createTextVNode("Tutup Shift")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                            default: withCtx(() => [
                              createTextVNode(" Cocokkan kas sistem dengan uang fisik sebelum keluar. ")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-5 px-5 py-5",
                    "aria-busy": props.submitting,
                    onSubmit: withModifiers(handleSubmit, ["prevent"])
                  }, [
                    createVNode("div", { class: "rounded-md border border-primary/20 bg-primary/10 p-4" }, [
                      createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                        createVNode("div", { class: "flex items-center gap-2 text-sm font-medium text-primary" }, [
                          createVNode(unref(Calculator), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }),
                          createVNode("span", null, "Kas yang diharapkan")
                        ]),
                        createVNode("span", { class: "rounded-md border border-primary/20 bg-background/80 px-2 py-1 text-xs font-medium text-primary" }, " Wajib cocok ")
                      ]),
                      createVNode("p", { class: "mt-3 text-2xl font-semibold tracking-normal text-foreground" }, [
                        createVNode(CashierCurrency, {
                          value: props.expectedCash
                        }, null, 8, ["value"])
                      ])
                    ]),
                    createVNode("dl", { class: "grid gap-2 sm:grid-cols-3" }, [
                      createVNode("div", { class: "rounded-md border bg-secondary/70 p-3" }, [
                        createVNode("dt", { class: "flex items-center gap-2 text-xs font-medium text-secondary-foreground" }, [
                          createVNode(unref(WalletCards), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }),
                          createTextVNode(" Kas awal ")
                        ]),
                        createVNode("dd", { class: "mt-2 text-sm font-semibold text-foreground" }, [
                          createVNode(CashierCurrency, {
                            value: props.openingCash
                          }, null, 8, ["value"])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-md border border-success/30 bg-success/10 p-3" }, [
                        createVNode("dt", { class: "flex items-center gap-2 text-xs font-medium text-success" }, [
                          createVNode(unref(ReceiptText), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }),
                          createTextVNode(" Total penjualan ")
                        ]),
                        createVNode("dd", { class: "mt-2 text-sm font-semibold text-foreground" }, [
                          createVNode(CashierCurrency, {
                            value: props.salesTotal
                          }, null, 8, ["value"])
                        ])
                      ]),
                      createVNode("div", { class: "rounded-md border border-warning/40 bg-warning/10 p-3" }, [
                        createVNode("dt", { class: "flex items-center gap-2 text-xs font-medium text-warning" }, [
                          createVNode(unref(WalletCards), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }),
                          createTextVNode(" Tunai ")
                        ]),
                        createVNode("dd", { class: "mt-2 text-sm font-semibold text-foreground" }, [
                          createVNode(CashierCurrency, {
                            value: props.cashSalesTotal
                          }, null, 8, ["value"])
                        ])
                      ])
                    ]),
                    unref(errorMessage) ? (openBlock(), createBlock("p", {
                      key: 0,
                      id: "close-shift-error",
                      class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "physical-cash" }, {
                        default: withCtx(() => [
                          createTextVNode("Total uang fisik")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$1$3), {
                        id: "physical-cash",
                        modelValue: unref(physicalCash),
                        "onUpdate:modelValue": ($event) => isRef(physicalCash) ? physicalCash.value = $event : null,
                        class: "h-11 text-base font-medium",
                        inputmode: "numeric",
                        min: "0",
                        type: "number",
                        placeholder: "Contoh: 850000",
                        "aria-invalid": unref(errorMessage) ? true : void 0,
                        "aria-describedby": unref(errorMessage) ? "close-shift-error close-shift-difference" : "close-shift-difference",
                        disabled: props.submitting
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled"]),
                      createVNode("button", {
                        type: "button",
                        class: "flex w-full items-center justify-between gap-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-left transition-colors hover:bg-primary/10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                        disabled: props.submitting,
                        onClick: applyExpectedCashRecommendation
                      }, [
                        createVNode("span", { class: "min-w-0" }, [
                          createVNode("span", { class: "block text-xs font-medium text-primary" }, "Rekomendasi"),
                          createVNode("span", { class: "block truncate text-xs text-muted-foreground" }, "Isi sesuai kas yang diharapkan")
                        ]),
                        createVNode("span", { class: "shrink-0 text-sm font-semibold text-foreground" }, [
                          createVNode(CashierCurrency, {
                            value: props.expectedCash
                          }, null, 8, ["value"])
                        ])
                      ], 8, ["disabled"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                        createVNode(unref(_sfc_main$7), { for: "close-shift-notes" }, {
                          default: withCtx(() => [
                            createTextVNode("Catatan")
                          ]),
                          _: 1
                        }),
                        createVNode("span", {
                          class: ["text-xs", unref(hasValidNotes) ? "text-muted-foreground" : "text-destructive"]
                        }, toDisplayString(unref(notes).length) + "/500 ", 3)
                      ]),
                      createVNode(unref(_sfc_main$b), {
                        id: "close-shift-notes",
                        modelValue: unref(notes),
                        "onUpdate:modelValue": ($event) => isRef(notes) ? notes.value = $event : null,
                        class: "min-h-20 resize-none",
                        maxlength: "500",
                        placeholder: "Opsional",
                        "aria-invalid": !unref(hasValidNotes) ? true : void 0,
                        disabled: props.submitting
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "disabled"])
                    ]),
                    createVNode("div", {
                      id: "close-shift-difference",
                      "aria-live": "polite",
                      class: ["rounded-md border p-3 text-sm", unref(differenceStateClass)]
                    }, [
                      createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                        createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [
                          createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center rounded-md bg-background/70" }, [
                            unref(hasValidPhysicalCash) && unref(cashDifference) === 0 ? (openBlock(), createBlock(unref(CheckCircle2), {
                              key: 0,
                              class: "size-4",
                              "aria-hidden": "true"
                            })) : (openBlock(), createBlock(unref(AlertTriangle), {
                              key: 1,
                              class: "size-4",
                              "aria-hidden": "true"
                            }))
                          ]),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode("p", { class: "font-medium" }, toDisplayString(unref(differenceLabel)), 1),
                            createVNode("p", { class: "mt-0.5 text-xs opacity-90" }, "Selisih kas")
                          ])
                        ]),
                        createVNode("strong", { class: "shrink-0 text-base" }, [
                          createVNode(CashierCurrency, { value: unref(cashDifference) }, null, 8, ["value"])
                        ])
                      ])
                    ], 2),
                    createVNode(unref(_sfc_main$4$1), { class: "grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 sm:justify-normal" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$c), {
                          type: "button",
                          variant: "outline",
                          class: "h-11 w-full",
                          disabled: props.submitting,
                          onClick: ($event) => dialogOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(unref(_sfc_main$c), {
                          type: "submit",
                          class: "h-11 w-full bg-destructive text-white hover:bg-destructive/90",
                          disabled: props.submitting
                        }, {
                          default: withCtx(() => [
                            props.submitting ? (openBlock(), createBlock(unref(_sfc_main$a), {
                              key: 0,
                              class: "size-4"
                            })) : (openBlock(), createBlock(unref(LogOut), {
                              key: 1,
                              class: "size-4",
                              "aria-hidden": "true"
                            })),
                            createTextVNode(" " + toDisplayString(props.submitting ? "Menutup Shift..." : "Tutup Shift & Keluar"), 1)
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/CashierCloseShiftDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CashierCloseShiftDialog = Object.assign(_sfc_main$3, { __name: "OrganismsCashierCloseShiftDialog" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CashierOpenShiftDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { openShift } = useCashierStore();
    const openingCash = ref("");
    const errorMessage = ref("");
    const isSubmitting = ref(false);
    const isDialogVisible = ref(props.open);
    const { runCashierAction } = useCashierActionFeedback();
    const openingCashText = computed(() => String(openingCash.value).trim());
    const normalizedOpeningCash = computed(() => Number(openingCashText.value));
    const canStartShift = computed(() => openingCashText.value.length > 0 && Number.isFinite(normalizedOpeningCash.value) && normalizedOpeningCash.value >= 0);
    watch(() => props.open, (isOpen) => {
      isDialogVisible.value = isOpen;
      if (isOpen) {
        openingCash.value = "";
        errorMessage.value = "";
        isSubmitting.value = false;
      }
    });
    async function handleSubmit() {
      if (isSubmitting.value) {
        return;
      }
      errorMessage.value = "";
      if (!openingCashText.value) {
        errorMessage.value = "Total kas awal wajib diisi.";
        return;
      }
      if (!Number.isFinite(normalizedOpeningCash.value) || normalizedOpeningCash.value < 0) {
        errorMessage.value = "Total kas awal tidak boleh kurang dari 0.";
        return;
      }
      const shift = await runCashierAction(async () => {
        await nextTick();
        const openedShift = await openShift(normalizedOpeningCash.value);
        if (!openedShift) {
          throw new Error("Shift gagal dibuka.");
        }
        return openedShift;
      }, {
        loading: isSubmitting,
        successMessage: "Shift dibuka",
        successDescription: (shift2) => `${shift2.id} siap menerima transaksi.`,
        errorMessage: "Shift gagal dibuka."
      });
      if (shift) {
        isDialogVisible.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isDialogVisible)) {
        _push(ssrRenderComponent(unref(_sfc_main$9$1), mergeProps({ open: true }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$6$1), {
                class: "gap-5 p-0 sm:max-w-md",
                "show-close-button": false,
                onEscapeKeyDown: () => {
                },
                onInteractOutside: () => {
                },
                onPointerDownOutside: () => {
                }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3$2), { class: "border-b px-5 pt-5 pb-4" }, {
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
                                _push5(`Buka Shift`);
                              } else {
                                return [
                                  createTextVNode("Buka Shift")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$5$1), { class: "mt-1" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Masukkan total uang kas awal sebelum menerima transaksi. `);
                              } else {
                                return [
                                  createTextVNode(" Masukkan total uang kas awal sebelum menerima transaksi. ")
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
                                    createTextVNode("Buka Shift")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Masukkan total uang kas awal sebelum menerima transaksi. ")
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
                    _push3(`<form class="space-y-5 px-5 pb-5"${_scopeId2}>`);
                    if (unref(errorMessage)) {
                      _push3(`<p id="open-shift-error" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(errorMessage))}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "opening-cash" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Total kas awal`);
                        } else {
                          return [
                            createTextVNode("Total kas awal")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$1$3), {
                      id: "opening-cash",
                      modelValue: unref(openingCash),
                      "onUpdate:modelValue": ($event) => isRef(openingCash) ? openingCash.value = $event : null,
                      autofocus: "",
                      class: "h-11 text-base font-medium",
                      inputmode: "numeric",
                      min: "0",
                      type: "number",
                      placeholder: "Contoh: 500000",
                      required: "",
                      "aria-invalid": unref(errorMessage) ? true : void 0,
                      "aria-describedby": unref(errorMessage) ? "open-shift-error" : void 0,
                      disabled: unref(isSubmitting)
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$4$1), { class: "pt-1 sm:justify-center" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<button type="submit" class="inline-flex h-11 w-full max-w-72 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground outline-none transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 sm:w-72 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0"${ssrIncludeBooleanAttr(!unref(canStartShift) || unref(isSubmitting)) ? " disabled" : ""}${_scopeId3}>`);
                          if (unref(isSubmitting)) {
                            _push4(ssrRenderComponent(unref(_sfc_main$a), { class: "size-4" }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(` ${ssrInterpolate(unref(isSubmitting) ? "Membuka Shift..." : "Mulai Shift")}</button>`);
                        } else {
                          return [
                            createVNode("button", {
                              type: "submit",
                              class: "inline-flex h-11 w-full max-w-72 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground outline-none transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 sm:w-72 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                              disabled: !unref(canStartShift) || unref(isSubmitting)
                            }, [
                              unref(isSubmitting) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                                key: 0,
                                class: "size-4"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(unref(isSubmitting) ? "Membuka Shift..." : "Mulai Shift"), 1)
                            ], 8, ["disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</form>`);
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3$2), { class: "border-b px-5 pt-5 pb-4" }, {
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
                                  createTextVNode("Buka Shift")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Masukkan total uang kas awal sebelum menerima transaksi. ")
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("form", {
                        class: "space-y-5 px-5 pb-5",
                        onSubmit: withModifiers(handleSubmit, ["prevent"])
                      }, [
                        unref(errorMessage) ? (openBlock(), createBlock("p", {
                          key: 0,
                          id: "open-shift-error",
                          class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                        }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$7), { for: "opening-cash" }, {
                            default: withCtx(() => [
                              createTextVNode("Total kas awal")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$1$3), {
                            id: "opening-cash",
                            modelValue: unref(openingCash),
                            "onUpdate:modelValue": ($event) => isRef(openingCash) ? openingCash.value = $event : null,
                            autofocus: "",
                            class: "h-11 text-base font-medium",
                            inputmode: "numeric",
                            min: "0",
                            type: "number",
                            placeholder: "Contoh: 500000",
                            required: "",
                            "aria-invalid": unref(errorMessage) ? true : void 0,
                            "aria-describedby": unref(errorMessage) ? "open-shift-error" : void 0,
                            disabled: unref(isSubmitting)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled"])
                        ]),
                        createVNode(unref(_sfc_main$4$1), { class: "pt-1 sm:justify-center" }, {
                          default: withCtx(() => [
                            createVNode("button", {
                              type: "submit",
                              class: "inline-flex h-11 w-full max-w-72 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground outline-none transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 sm:w-72 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                              disabled: !unref(canStartShift) || unref(isSubmitting)
                            }, [
                              unref(isSubmitting) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                                key: 0,
                                class: "size-4"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(unref(isSubmitting) ? "Membuka Shift..." : "Mulai Shift"), 1)
                            ], 8, ["disabled"])
                          ]),
                          _: 1
                        })
                      ], 32)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$6$1), {
                  class: "gap-5 p-0 sm:max-w-md",
                  "show-close-button": false,
                  onEscapeKeyDown: withModifiers(() => {
                  }, ["prevent"]),
                  onInteractOutside: withModifiers(() => {
                  }, ["prevent"]),
                  onPointerDownOutside: withModifiers(() => {
                  }, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3$2), { class: "border-b px-5 pt-5 pb-4" }, {
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
                                createTextVNode("Buka Shift")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                              default: withCtx(() => [
                                createTextVNode(" Masukkan total uang kas awal sebelum menerima transaksi. ")
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-5 px-5 pb-5",
                      onSubmit: withModifiers(handleSubmit, ["prevent"])
                    }, [
                      unref(errorMessage) ? (openBlock(), createBlock("p", {
                        key: 0,
                        id: "open-shift-error",
                        class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                      }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "opening-cash" }, {
                          default: withCtx(() => [
                            createTextVNode("Total kas awal")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$1$3), {
                          id: "opening-cash",
                          modelValue: unref(openingCash),
                          "onUpdate:modelValue": ($event) => isRef(openingCash) ? openingCash.value = $event : null,
                          autofocus: "",
                          class: "h-11 text-base font-medium",
                          inputmode: "numeric",
                          min: "0",
                          type: "number",
                          placeholder: "Contoh: 500000",
                          required: "",
                          "aria-invalid": unref(errorMessage) ? true : void 0,
                          "aria-describedby": unref(errorMessage) ? "open-shift-error" : void 0,
                          disabled: unref(isSubmitting)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled"])
                      ]),
                      createVNode(unref(_sfc_main$4$1), { class: "pt-1 sm:justify-center" }, {
                        default: withCtx(() => [
                          createVNode("button", {
                            type: "submit",
                            class: "inline-flex h-11 w-full max-w-72 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground outline-none transition-all hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 sm:w-72 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                            disabled: !unref(canStartShift) || unref(isSubmitting)
                          }, [
                            unref(isSubmitting) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                              key: 0,
                              class: "size-4"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(unref(isSubmitting) ? "Membuka Shift..." : "Mulai Shift"), 1)
                          ], 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ], 32)
                  ]),
                  _: 1
                }, 8, ["onEscapeKeyDown", "onInteractOutside", "onPointerDownOutside"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/CashierOpenShiftDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CashierOpenShiftDialog = Object.assign(_sfc_main$2, { __name: "OrganismsCashierOpenShiftDialog" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CashierSidebar",
  __ssrInlineRender: true,
  emits: ["request-logout"],
  setup(__props, { emit: __emit }) {
    const route = useRoute();
    const { user } = useAuth();
    const { activeShift } = useCashierStore();
    const { publicStoreProfile } = usePublicStoreProfile();
    const emit = __emit;
    const navItems = [
      {
        label: "Kasir",
        to: "/cashier",
        description: "Transaksi aktif",
        icon: ReceiptText
      },
      {
        label: "Riwayat Transaksi",
        to: "/cashier/transactions",
        description: "Daftar transaksi",
        icon: History
      },
      {
        label: "Penyesuaian Kas",
        to: "/cashier/cash-adjustments",
        description: "Mutasi kas manual",
        icon: WalletCards
      }
    ];
    const systemLogoUrl = computed(() => publicStoreProfile.value.logoUrl.trim());
    const systemDisplayName = computed(() => publicStoreProfile.value.storeName.trim() || "Sistem Kasir");
    const systemInitials = computed(() => {
      const words = systemDisplayName.value.split(/\s+/).filter(Boolean);
      const initials = words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("");
      return initials || "SK";
    });
    function isActive(path) {
      return route.path === path;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(unref(_sfc_main$r), mergeProps({ collapsible: "icon" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$k), { class: "border-b border-sidebar-border px-2 py-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/cashier",
                    class: "flex min-h-10 items-center gap-3 rounded-md px-2 text-sidebar-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                    "aria-label": `Beranda kasir ${unref(systemDisplayName)}`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground"${_scopeId3}>`);
                        if (unref(systemLogoUrl)) {
                          _push4(`<img${ssrRenderAttr("src", unref(systemLogoUrl))}${ssrRenderAttr("alt", `Logo ${unref(systemDisplayName)}`)} class="size-full object-contain p-1"${_scopeId3}>`);
                        } else {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(unref(systemInitials))}</span>`);
                        }
                        _push4(`</span><span class="min-w-0 group-data-[collapsible=icon]:hidden"${_scopeId3}><span class="block truncate text-sm font-semibold"${_scopeId3}>${ssrInterpolate(unref(systemDisplayName))}</span><span class="block truncate text-xs text-sidebar-foreground/90"${_scopeId3}>Mode kasir</span></span>`);
                      } else {
                        return [
                          createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground" }, [
                            unref(systemLogoUrl) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: unref(systemLogoUrl),
                              alt: `Logo ${unref(systemDisplayName)}`,
                              class: "size-full object-contain p-1"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(systemInitials)), 1))
                          ]),
                          createVNode("span", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                            createVNode("span", { class: "block truncate text-sm font-semibold" }, toDisplayString(unref(systemDisplayName)), 1),
                            createVNode("span", { class: "block truncate text-xs text-sidebar-foreground/90" }, "Mode kasir")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, {
                      to: "/cashier",
                      class: "flex min-h-10 items-center gap-3 rounded-md px-2 text-sidebar-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                      "aria-label": `Beranda kasir ${unref(systemDisplayName)}`
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground" }, [
                          unref(systemLogoUrl) ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: unref(systemLogoUrl),
                            alt: `Logo ${unref(systemDisplayName)}`,
                            class: "size-full object-contain p-1"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(systemInitials)), 1))
                        ]),
                        createVNode("span", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                          createVNode("span", { class: "block truncate text-sm font-semibold" }, toDisplayString(unref(systemDisplayName)), 1),
                          createVNode("span", { class: "block truncate text-xs text-sidebar-foreground/90" }, "Mode kasir")
                        ])
                      ]),
                      _: 1
                    }, 8, ["aria-label"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$q), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<nav aria-label="Navigasi utama kasir"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$o), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$l), { class: "text-sidebar-foreground/90" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Menu utama `);
                            } else {
                              return [
                                createTextVNode(" Menu utama ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$h), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(navItems, (item) => {
                                      _push6(ssrRenderComponent(unref(_sfc_main$8), {
                                        key: item.to
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$9), {
                                              "as-child": "",
                                              "is-active": isActive(item.to),
                                              tooltip: item.label
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_NuxtLink, {
                                                    to: item.to,
                                                    "aria-label": item.label,
                                                    "aria-current": isActive(item.to) ? "page" : void 0
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        ssrRenderVNode(_push9, createVNode(resolveDynamicComponent(item.icon), { "aria-hidden": "true" }, null), _parent9, _scopeId8);
                                                        _push9(`<span${_scopeId8}>${ssrInterpolate(item.label)}</span>`);
                                                      } else {
                                                        return [
                                                          (openBlock(), createBlock(resolveDynamicComponent(item.icon), { "aria-hidden": "true" })),
                                                          createVNode("span", null, toDisplayString(item.label), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_NuxtLink, {
                                                      to: item.to,
                                                      "aria-label": item.label,
                                                      "aria-current": isActive(item.to) ? "page" : void 0
                                                    }, {
                                                      default: withCtx(() => [
                                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), { "aria-hidden": "true" })),
                                                        createVNode("span", null, toDisplayString(item.label), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["to", "aria-label", "aria-current"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$9), {
                                                "as-child": "",
                                                "is-active": isActive(item.to),
                                                tooltip: item.label
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtLink, {
                                                    to: item.to,
                                                    "aria-label": item.label,
                                                    "aria-current": isActive(item.to) ? "page" : void 0
                                                  }, {
                                                    default: withCtx(() => [
                                                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), { "aria-hidden": "true" })),
                                                      createVNode("span", null, toDisplayString(item.label), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["to", "aria-label", "aria-current"])
                                                ]),
                                                _: 2
                                              }, 1032, ["is-active", "tooltip"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                                        return createVNode(unref(_sfc_main$8), {
                                          key: item.to
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$9), {
                                              "as-child": "",
                                              "is-active": isActive(item.to),
                                              tooltip: item.label
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtLink, {
                                                  to: item.to,
                                                  "aria-label": item.label,
                                                  "aria-current": isActive(item.to) ? "page" : void 0
                                                }, {
                                                  default: withCtx(() => [
                                                    (openBlock(), createBlock(resolveDynamicComponent(item.icon), { "aria-hidden": "true" })),
                                                    createVNode("span", null, toDisplayString(item.label), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to", "aria-label", "aria-current"])
                                              ]),
                                              _: 2
                                            }, 1032, ["is-active", "tooltip"])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 64))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$h), null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                                      return createVNode(unref(_sfc_main$8), {
                                        key: item.to
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$9), {
                                            "as-child": "",
                                            "is-active": isActive(item.to),
                                            tooltip: item.label
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtLink, {
                                                to: item.to,
                                                "aria-label": item.label,
                                                "aria-current": isActive(item.to) ? "page" : void 0
                                              }, {
                                                default: withCtx(() => [
                                                  (openBlock(), createBlock(resolveDynamicComponent(item.icon), { "aria-hidden": "true" })),
                                                  createVNode("span", null, toDisplayString(item.label), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["to", "aria-label", "aria-current"])
                                            ]),
                                            _: 2
                                          }, 1032, ["is-active", "tooltip"])
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$l), { class: "text-sidebar-foreground/90" }, {
                            default: withCtx(() => [
                              createTextVNode(" Menu utama ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                                    return createVNode(unref(_sfc_main$8), {
                                      key: item.to
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$9), {
                                          "as-child": "",
                                          "is-active": isActive(item.to),
                                          tooltip: item.label
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtLink, {
                                              to: item.to,
                                              "aria-label": item.label,
                                              "aria-current": isActive(item.to) ? "page" : void 0
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(item.icon), { "aria-hidden": "true" })),
                                                createVNode("span", null, toDisplayString(item.label), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["to", "aria-label", "aria-current"])
                                          ]),
                                          _: 2
                                        }, 1032, ["is-active", "tooltip"])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 64))
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
                  }, _parent3, _scopeId2));
                  _push3(`</nav>`);
                } else {
                  return [
                    createVNode("nav", { "aria-label": "Navigasi utama kasir" }, [
                      createVNode(unref(_sfc_main$o), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$l), { class: "text-sidebar-foreground/90" }, {
                            default: withCtx(() => [
                              createTextVNode(" Menu utama ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                                    return createVNode(unref(_sfc_main$8), {
                                      key: item.to
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$9), {
                                          "as-child": "",
                                          "is-active": isActive(item.to),
                                          tooltip: item.label
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtLink, {
                                              to: item.to,
                                              "aria-label": item.label,
                                              "aria-current": isActive(item.to) ? "page" : void 0
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(item.icon), { "aria-hidden": "true" })),
                                                createVNode("span", null, toDisplayString(item.label), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["to", "aria-label", "aria-current"])
                                          ]),
                                          _: 2
                                        }, 1032, ["is-active", "tooltip"])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "p-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$1$1), { class: "mx-2 mb-1" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$h), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$9), {
                                as: "div",
                                class: "h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Banknote), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</span><div class="min-w-0 group-data-[collapsible=icon]:hidden"${_scopeId5}><p class="truncate text-sm font-medium"${_scopeId5}>${ssrInterpolate(unref(user)?.name ?? "Kasir")}</p><p class="truncate text-xs text-sidebar-foreground/90"${_scopeId5}>${ssrInterpolate(unref(activeShift) ? "Shift aktif" : "Belum buka shift")}</p></div>`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6" }, [
                                        createVNode(unref(Banknote), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        })
                                      ]),
                                      createVNode("div", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                                        createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Kasir"), 1),
                                        createVNode("p", { class: "truncate text-xs text-sidebar-foreground/90" }, toDisplayString(unref(activeShift) ? "Shift aktif" : "Belum buka shift"), 1)
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$9), {
                                  as: "div",
                                  class: "h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6" }, [
                                      createVNode(unref(Banknote), {
                                        class: "size-4",
                                        "aria-hidden": "true"
                                      })
                                    ]),
                                    createVNode("div", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                                      createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Kasir"), 1),
                                      createVNode("p", { class: "truncate text-xs text-sidebar-foreground/90" }, toDisplayString(unref(activeShift) ? "Shift aktif" : "Belum buka shift"), 1)
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$9), {
                                type: "button",
                                class: "cashier-logout-button",
                                tooltip: "Keluar",
                                "aria-label": "Keluar dari akun kasir",
                                onClick: ($event) => emit("request-logout")
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Settings), { "aria-hidden": "true" }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>Keluar</span>`);
                                  } else {
                                    return [
                                      createVNode(unref(Settings), { "aria-hidden": "true" }),
                                      createVNode("span", null, "Keluar")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$9), {
                                  type: "button",
                                  class: "cashier-logout-button",
                                  tooltip: "Keluar",
                                  "aria-label": "Keluar dari akun kasir",
                                  onClick: ($event) => emit("request-logout")
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Settings), { "aria-hidden": "true" }),
                                    createVNode("span", null, "Keluar")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), {
                                as: "div",
                                class: "h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6" }, [
                                    createVNode(unref(Banknote), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    })
                                  ]),
                                  createVNode("div", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                                    createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Kasir"), 1),
                                    createVNode("p", { class: "truncate text-xs text-sidebar-foreground/90" }, toDisplayString(unref(activeShift) ? "Shift aktif" : "Belum buka shift"), 1)
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), {
                                type: "button",
                                class: "cashier-logout-button",
                                tooltip: "Keluar",
                                "aria-label": "Keluar dari akun kasir",
                                onClick: ($event) => emit("request-logout")
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Settings), { "aria-hidden": "true" }),
                                  createVNode("span", null, "Keluar")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$1$1), { class: "mx-2 mb-1" }),
                    createVNode(unref(_sfc_main$h), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              as: "div",
                              class: "h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6" }, [
                                  createVNode(unref(Banknote), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  })
                                ]),
                                createVNode("div", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                                  createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Kasir"), 1),
                                  createVNode("p", { class: "truncate text-xs text-sidebar-foreground/90" }, toDisplayString(unref(activeShift) ? "Shift aktif" : "Belum buka shift"), 1)
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              type: "button",
                              class: "cashier-logout-button",
                              tooltip: "Keluar",
                              "aria-label": "Keluar dari akun kasir",
                              onClick: ($event) => emit("request-logout")
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Settings), { "aria-hidden": "true" }),
                                createVNode("span", null, "Keluar")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$k), { class: "border-b border-sidebar-border px-2 py-3" }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtLink, {
                    to: "/cashier",
                    class: "flex min-h-10 items-center gap-3 rounded-md px-2 text-sidebar-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                    "aria-label": `Beranda kasir ${unref(systemDisplayName)}`
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground" }, [
                        unref(systemLogoUrl) ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: unref(systemLogoUrl),
                          alt: `Logo ${unref(systemDisplayName)}`,
                          class: "size-full object-contain p-1"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(systemInitials)), 1))
                      ]),
                      createVNode("span", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                        createVNode("span", { class: "block truncate text-sm font-semibold" }, toDisplayString(unref(systemDisplayName)), 1),
                        createVNode("span", { class: "block truncate text-xs text-sidebar-foreground/90" }, "Mode kasir")
                      ])
                    ]),
                    _: 1
                  }, 8, ["aria-label"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$q), null, {
                default: withCtx(() => [
                  createVNode("nav", { "aria-label": "Navigasi utama kasir" }, [
                    createVNode(unref(_sfc_main$o), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$l), { class: "text-sidebar-foreground/90" }, {
                          default: withCtx(() => [
                            createTextVNode(" Menu utama ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$h), null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(navItems, (item) => {
                                  return createVNode(unref(_sfc_main$8), {
                                    key: item.to
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$9), {
                                        "as-child": "",
                                        "is-active": isActive(item.to),
                                        tooltip: item.label
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtLink, {
                                            to: item.to,
                                            "aria-label": item.label,
                                            "aria-current": isActive(item.to) ? "page" : void 0
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(), createBlock(resolveDynamicComponent(item.icon), { "aria-hidden": "true" })),
                                              createVNode("span", null, toDisplayString(item.label), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["to", "aria-label", "aria-current"])
                                        ]),
                                        _: 2
                                      }, 1032, ["is-active", "tooltip"])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), { class: "p-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$1$1), { class: "mx-2 mb-1" }),
                  createVNode(unref(_sfc_main$h), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), {
                            as: "div",
                            class: "h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6" }, [
                                createVNode(unref(Banknote), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                })
                              ]),
                              createVNode("div", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                                createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Kasir"), 1),
                                createVNode("p", { class: "truncate text-xs text-sidebar-foreground/90" }, toDisplayString(unref(activeShift) ? "Shift aktif" : "Belum buka shift"), 1)
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), {
                            type: "button",
                            class: "cashier-logout-button",
                            tooltip: "Keluar",
                            "aria-label": "Keluar dari akun kasir",
                            onClick: ($event) => emit("request-logout")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Settings), { "aria-hidden": "true" }),
                              createVNode("span", null, "Keluar")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
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
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/CashierSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CashierSidebar = Object.assign(_sfc_main$1, { __name: "OrganismsCashierSidebar" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cashier",
  __ssrInlineRender: true,
  setup(__props) {
    const { logout, user } = useAuth();
    const {
      activeShift,
      cashSalesTotal,
      closeShift,
      expectedCashTotal,
      formatCurrency,
      hasLoadedShiftStatus,
      isShiftStatusLoading,
      loadActiveShiftSummary,
      shiftRevenue
    } = useCashierStore();
    const { setFlashToast } = useFlashToast();
    usePublicStoreProfile();
    const isCloseShiftDialogOpen = ref(false);
    const isLoggingOut = ref(false);
    const isShiftBootstrapping = ref(true);
    const sidebarCookie = useCookie("sidebar_state");
    const isSidebarOpen = useState("cashier:sidebar-open", () => sidebarCookie.value !== "false");
    const shouldShowOpenShiftDialog = computed(() => hasLoadedShiftStatus.value && !isShiftBootstrapping.value && !isShiftStatusLoading.value && !activeShift.value && !isLoggingOut.value);
    if (sidebarCookie.value === "false") {
      isSidebarOpen.value = false;
    }
    async function handleRequestLogout() {
      if (isLoggingOut.value) {
        return;
      }
      if (!activeShift.value) {
        isLoggingOut.value = true;
        try {
          setFlashToast({
            type: "success",
            title: "Logout kasir berhasil",
            description: `${user.value?.name ?? "Kasir"} sudah keluar dari area kasir.`
          });
          await logout();
        } finally {
          isLoggingOut.value = false;
        }
        return;
      }
      isLoggingOut.value = true;
      try {
        await loadActiveShiftSummary();
        isCloseShiftDialogOpen.value = true;
      } catch (error) {
        toast.error(getErrorMessage(error, "Gagal mengambil ringkasan shift."));
      } finally {
        isLoggingOut.value = false;
      }
    }
    async function handleCloseShift(payload) {
      if (isLoggingOut.value) {
        return;
      }
      isLoggingOut.value = true;
      try {
        const closedShift = await closeShift(payload.physicalCash, payload.notes);
        isCloseShiftDialogOpen.value = false;
        setFlashToast({
          type: "success",
          title: "Shift ditutup dan logout berhasil",
          description: `${user.value?.name ?? "Kasir"} keluar. Selisih kas ${formatCurrency(closedShift.difference)}.`
        });
        await logout();
      } catch (error) {
        toast.error(getErrorMessage(error, "Shift gagal ditutup."));
      } finally {
        isLoggingOut.value = false;
      }
    }
    function getErrorMessage(error, fallback) {
      if (error instanceof Error && error.message) {
        return error.message;
      }
      return fallback;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$3$1), mergeProps({
        open: unref(isSidebarOpen),
        "onUpdate:open": ($event) => isRef(isSidebarOpen) ? isSidebarOpen.value = $event : null,
        class: "cashier-blue-sidebar h-dvh min-h-dvh overflow-hidden"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="#cashier-main-content" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring"${_scopeId}> Lewati menu kasir </a>`);
            _push2(ssrRenderComponent(CashierSidebar, { onRequestLogout: handleRequestLogout }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$i), {
              id: "cashier-main-content",
              class: "h-dvh min-h-0 overflow-hidden"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<header class="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background px-3 sm:px-4"${_scopeId2}><div class="flex min-w-0 items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$5), {
                    class: "h-8 w-8",
                    label: "Buka atau tutup menu kasir",
                    title: "Buka atau tutup menu kasir"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="min-w-0"${_scopeId2}><p class="truncate text-sm font-medium"${_scopeId2}>${ssrInterpolate(unref(user)?.name ?? "Kasir")}</p><p class="truncate text-xs text-muted-foreground"${_scopeId2}> Area kerja kasir </p></div></div><div class="flex shrink-0 items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(CashierDateTime, null, null, _parent3, _scopeId2));
                  _push3(`</div></header><div class="cashier-scrollbar min-h-0 flex-1 overflow-y-auto bg-muted/50"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("header", { class: "sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background px-3 sm:px-4" }, [
                      createVNode("div", { class: "flex min-w-0 items-center gap-2" }, [
                        createVNode(unref(_sfc_main$5), {
                          class: "h-8 w-8",
                          label: "Buka atau tutup menu kasir",
                          title: "Buka atau tutup menu kasir"
                        }),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Kasir"), 1),
                          createVNode("p", { class: "truncate text-xs text-muted-foreground" }, " Area kerja kasir ")
                        ])
                      ]),
                      createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                        createVNode(CashierDateTime)
                      ])
                    ]),
                    createVNode("div", { class: "cashier-scrollbar min-h-0 flex-1 overflow-y-auto bg-muted/50" }, [
                      renderSlot(_ctx.$slots, "default")
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(CashierOpenShiftDialog, { open: unref(shouldShowOpenShiftDialog) }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(CashierCloseShiftDialog, {
              open: unref(isCloseShiftDialogOpen),
              "onUpdate:open": ($event) => isRef(isCloseShiftDialogOpen) ? isCloseShiftDialogOpen.value = $event : null,
              "opening-cash": unref(activeShift)?.openingCash ?? 0,
              "sales-total": unref(shiftRevenue),
              "cash-sales-total": unref(cashSalesTotal),
              "expected-cash": unref(expectedCashTotal),
              submitting: unref(isLoggingOut),
              onSubmit: handleCloseShift
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$6), {
              "rich-colors": "",
              "close-button": "",
              position: "top-right"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("a", {
                href: "#cashier-main-content",
                class: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring"
              }, " Lewati menu kasir "),
              createVNode(CashierSidebar, { onRequestLogout: handleRequestLogout }),
              createVNode(unref(_sfc_main$i), {
                id: "cashier-main-content",
                class: "h-dvh min-h-0 overflow-hidden"
              }, {
                default: withCtx(() => [
                  createVNode("header", { class: "sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background px-3 sm:px-4" }, [
                    createVNode("div", { class: "flex min-w-0 items-center gap-2" }, [
                      createVNode(unref(_sfc_main$5), {
                        class: "h-8 w-8",
                        label: "Buka atau tutup menu kasir",
                        title: "Buka atau tutup menu kasir"
                      }),
                      createVNode("div", { class: "min-w-0" }, [
                        createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Kasir"), 1),
                        createVNode("p", { class: "truncate text-xs text-muted-foreground" }, " Area kerja kasir ")
                      ])
                    ]),
                    createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                      createVNode(CashierDateTime)
                    ])
                  ]),
                  createVNode("div", { class: "cashier-scrollbar min-h-0 flex-1 overflow-y-auto bg-muted/50" }, [
                    renderSlot(_ctx.$slots, "default")
                  ])
                ]),
                _: 3
              }),
              createVNode(CashierOpenShiftDialog, { open: unref(shouldShowOpenShiftDialog) }, null, 8, ["open"]),
              createVNode(CashierCloseShiftDialog, {
                open: unref(isCloseShiftDialogOpen),
                "onUpdate:open": ($event) => isRef(isCloseShiftDialogOpen) ? isCloseShiftDialogOpen.value = $event : null,
                "opening-cash": unref(activeShift)?.openingCash ?? 0,
                "sales-total": unref(shiftRevenue),
                "cash-sales-total": unref(cashSalesTotal),
                "expected-cash": unref(expectedCashTotal),
                submitting: unref(isLoggingOut),
                onSubmit: handleCloseShift
              }, null, 8, ["open", "onUpdate:open", "opening-cash", "sales-total", "cash-sales-total", "expected-cash", "submitting"]),
              createVNode(unref(_sfc_main$6), {
                "rich-colors": "",
                "close-button": "",
                position: "top-right"
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/layouts/cashier.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cashier-DHVGQVTu.mjs.map
