import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, isRef, createTextVNode, openBlock, createBlock, createCommentVNode, nextTick, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderList } from 'vue/server-renderer';
import { ReceiptText, WalletCards, RotateCcw, Search, Eye, UserRound, CreditCard, Utensils, AlertTriangle, Send } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { _ as _sfc_main$4 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$b } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2$1 } from './NativeSelectOption-BTdv0zYA.mjs';
import { C as CashierMetric, a as CashierTablePagination, b as CashierStatusBadge } from './CashierStatusBadge-D7tHIaMY.mjs';
import { C as CashierPageHeader } from './CashierPageHeader-B7q-Byt4.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$3, d as _sfc_main$5$1, e as _sfc_main$4$2 } from './DialogTrigger-B5C6UhMx.mjs';
import { g as getCashierTransactionDisplayCode } from './cashier-display-BleBnxPh.mjs';
import { u as useCashierStore, C as CashierCurrency, a as useCashierActionFeedback } from './useCashierStore-BzXm0Spj.mjs';
import { _ as _sfc_main$a } from './Skeleton-CQWwuiK0.mjs';
import { a as _sfc_main$9, h as _sfc_main$7, b as _sfc_main$1$2, c as _sfc_main$5, d as _sfc_main$2$2, e as _sfc_main$8, f as _sfc_main$6, g as _sfc_main$4$1 } from './index-DSBdqIS4.mjs';
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
import './api-endpoints-BXkjOpII.mjs';
import './state-Dw1r7BQr.mjs';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CashierTableToolbar",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: "" },
    searchId: {},
    searchLabel: {},
    searchPlaceholder: {},
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const searchValue = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between" }, _attrs))}><div class="relative w-full sm:max-w-xs"><label${ssrRenderAttr("for", __props.searchId)} class="sr-only">${ssrInterpolate(__props.searchLabel)}</label>`);
      _push(ssrRenderComponent(unref(Search), {
        class: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
        "aria-hidden": "true"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1$1), {
        id: __props.searchId,
        modelValue: unref(searchValue),
        "onUpdate:modelValue": ($event) => isRef(searchValue) ? searchValue.value = $event : null,
        type: "search",
        class: "h-9 pl-9",
        placeholder: __props.searchPlaceholder,
        disabled: props.disabled
      }, null, _parent));
      _push(`</div><div class="flex flex-wrap items-center gap-2">`);
      ssrRenderSlot(_ctx.$slots, "filters", {}, null, _push, _parent);
      if (_ctx.$slots.action) {
        _push(`<div>`);
        ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/molecules/CashierTableToolbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CashierTableToolbar = Object.assign(_sfc_main$3, { __name: "MoleculesCashierTableToolbar" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TransactionDetailDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    transaction: {},
    loading: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isSendingReceipt = ref(false);
    const { runCashierAction } = useCashierActionFeedback();
    const { sendTransactionReceipt } = useCashierStore();
    const dialogOpen = computed({
      get: () => props.open,
      set: (value) => emit("update:open", value)
    });
    const transactionItems = computed(() => props.transaction?.items ?? []);
    const hasItems = computed(() => transactionItems.value.length > 0);
    const transactionDisplayCode = computed(() => props.transaction ? getCashierTransactionDisplayCode(props.transaction) : "-");
    const hasCustomerPhone = computed(() => {
      const phone = props.transaction?.customerPhone.trim() ?? "";
      if (!phone || phone === "-") {
        return false;
      }
      return Boolean(phone.replace(/\D/g, ""));
    });
    const canSendReceipt = computed(() => Boolean(props.transaction?.orderId && hasCustomerPhone.value && !props.loading));
    const receiptWarningMessage = computed(() => {
      if (!props.transaction?.orderId) {
        return "Data order tidak tersedia, jadi struk tidak bisa dikirim.";
      }
      if (!hasCustomerPhone.value) {
        return "Nomor WhatsApp tidak diisi di awal transaksi, jadi struk tidak bisa dikirim.";
      }
      return "";
    });
    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        isSendingReceipt.value = false;
      }
    });
    async function sendReceipt() {
      const transaction = props.transaction;
      await runCashierAction(async () => {
        if (!transaction) {
          throw new Error("Data transaksi tidak tersedia.");
        }
        const result = await sendTransactionReceipt(transaction);
        return {
          transaction,
          result
        };
      }, {
        loading: isSendingReceipt,
        successMessage: "Struk dikirim ke WhatsApp",
        successDescription: (payload) => payload.result.message || "Struk berhasil dikirim.",
        errorMessage: "Struk gagal dikirim."
      });
    }
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
                        _push4(ssrRenderComponent(unref(ReceiptText), {
                          class: "size-5",
                          "aria-hidden": "true"
                        }, null, _parent4, _scopeId3));
                        _push4(`</span><div class="min-w-0"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$1$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Detail transaksi`);
                            } else {
                              return [
                                createTextVNode("Detail transaksi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), { class: "mt-1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Lihat informasi pembayaran dan pesanan transaksi. `);
                            } else {
                              return [
                                createTextVNode(" Lihat informasi pembayaran dan pesanan transaksi. ")
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
                              createVNode(unref(ReceiptText), {
                                class: "size-5",
                                "aria-hidden": "true"
                              })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode(unref(_sfc_main$1$3), null, {
                                default: withCtx(() => [
                                  createTextVNode("Detail transaksi")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Lihat informasi pembayaran dan pesanan transaksi. ")
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
                  if (props.transaction) {
                    _push3(`<div class="space-y-4 px-5 py-5"${_scopeId2}>`);
                    if (props.loading) {
                      _push3(`<p class="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground" aria-live="polite"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(_sfc_main$b), { class: "size-4" }, null, _parent3, _scopeId2));
                      _push3(` Memuat detail transaksi... </p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="rounded-md border border-primary/20 bg-primary/10 p-4"${_scopeId2}><div class="flex items-center justify-between gap-3"${_scopeId2}><div class="min-w-0"${_scopeId2}><p class="text-sm font-medium text-primary"${_scopeId2}>Kode transaksi</p><p class="mt-1 truncate text-lg font-semibold"${_scopeId2}>${ssrInterpolate(unref(transactionDisplayCode))}</p></div>`);
                    _push3(ssrRenderComponent(CashierStatusBadge, {
                      status: props.transaction.status
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(props.transaction.statusLabel)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(props.transaction.statusLabel), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div><section class="rounded-md border bg-card p-3" aria-labelledby="transaction-customer-title"${_scopeId2}><div class="mb-3 flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(UserRound), {
                      class: "size-4 text-muted-foreground",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 id="transaction-customer-title" class="text-sm font-semibold"${_scopeId2}> Pelanggan </h3></div><dl class="grid gap-2 text-sm"${_scopeId2}><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Nama</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.transaction.customerName)}</dd></div><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>WhatsApp</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.transaction.customerPhone)}</dd></div><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Kasir</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.transaction.cashierName)}</dd></div></dl></section><section class="rounded-md border bg-card p-3" aria-labelledby="transaction-payment-title"${_scopeId2}><div class="mb-3 flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(CreditCard), {
                      class: "size-4 text-muted-foreground",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 id="transaction-payment-title" class="text-sm font-semibold"${_scopeId2}> Pembayaran </h3></div><dl class="grid gap-2 text-sm"${_scopeId2}><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Waktu</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.transaction.paidAt)}</dd></div>`);
                    if (props.transaction.shiftStartedAt) {
                      _push3(`<div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Shift dibuka</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.transaction.shiftStartedAt)}</dd></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Metode</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.transaction.paymentMethod)}</dd></div>`);
                    if (props.transaction.diningOption) {
                      _push3(`<div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Tipe pesanan</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.transaction.diningOption)}</dd></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (props.transaction.cashReceived !== void 0 && props.transaction.cashReceived !== null) {
                      _push3(`<!--[--><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Uang diterima</dt><dd class="text-right font-medium"${_scopeId2}>`);
                      _push3(ssrRenderComponent(CashierCurrency, {
                        value: props.transaction.cashReceived
                      }, null, _parent3, _scopeId2));
                      _push3(`</dd></div><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Kembalian</dt><dd class="text-right font-medium"${_scopeId2}>`);
                      _push3(ssrRenderComponent(CashierCurrency, {
                        value: props.transaction.cashChange ?? 0
                      }, null, _parent3, _scopeId2));
                      _push3(`</dd></div><!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</dl></section><section class="rounded-md border bg-card p-3" aria-labelledby="transaction-items-title"${_scopeId2}><div class="mb-2 flex items-center justify-between gap-3"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Utensils), {
                      class: "size-4 text-muted-foreground",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 id="transaction-items-title" class="text-sm font-semibold"${_scopeId2}> Item pesanan </h3></div><span class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(props.transaction.itemCount)} item</span></div>`);
                    if (unref(hasItems)) {
                      _push3(`<ul class="max-h-44 space-y-2 overflow-y-auto pr-1" aria-label="Item transaksi"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(transactionItems), (item) => {
                        _push3(`<li class="rounded-md border bg-background p-2"${_scopeId2}><div class="flex items-start justify-between gap-3"${_scopeId2}><div class="min-w-0"${_scopeId2}><p class="truncate text-sm font-medium"${_scopeId2}>${ssrInterpolate(item.name)}</p><p class="mt-0.5 text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(item.quantity)} x `);
                        _push3(ssrRenderComponent(CashierCurrency, {
                          value: item.price
                        }, null, _parent3, _scopeId2));
                        _push3(`</p></div><p class="shrink-0 text-sm font-semibold"${_scopeId2}>`);
                        _push3(ssrRenderComponent(CashierCurrency, {
                          value: item.quantity * item.price
                        }, null, _parent3, _scopeId2));
                        _push3(`</p></div></li>`);
                      });
                      _push3(`<!--]--></ul>`);
                    } else {
                      _push3(`<p class="rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground"${_scopeId2}> Rincian item belum tersedia untuk transaksi ini. </p>`);
                    }
                    _push3(`</section><section class="rounded-md border bg-card p-3" aria-labelledby="transaction-total-title"${_scopeId2}><div class="flex items-center justify-between gap-3"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(WalletCards), {
                      class: "size-4 text-muted-foreground",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 id="transaction-total-title" class="text-sm font-semibold"${_scopeId2}> Total </h3></div><p class="text-base font-semibold"${_scopeId2}>`);
                    _push3(ssrRenderComponent(CashierCurrency, {
                      value: props.transaction.total
                    }, null, _parent3, _scopeId2));
                    _push3(`</p></div></section>`);
                    if (!props.loading && unref(receiptWarningMessage)) {
                      _push3(`<p class="flex items-start gap-2 rounded-md border border-warning/50 bg-warning/15 px-3 py-2 text-sm text-muted-foreground" aria-live="polite"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(AlertTriangle), {
                        class: "mt-0.5 size-4 shrink-0 text-warning",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>${ssrInterpolate(unref(receiptWarningMessage))}</span></p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="px-5 py-5"${_scopeId2}><p class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"${_scopeId2}> Data transaksi tidak tersedia. </p></div>`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$4$2), { class: "grid grid-cols-1 gap-2 border-t px-5 py-4 sm:grid-cols-2 sm:justify-normal" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          type: "button",
                          variant: "outline",
                          class: "h-11 w-full",
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
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          type: "button",
                          class: "h-11 w-full",
                          disabled: !unref(canSendReceipt) || unref(isSendingReceipt),
                          title: unref(canSendReceipt) ? "Kirim struk ke WhatsApp pelanggan" : "Nomor WhatsApp belum diisi",
                          onClick: sendReceipt
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(isSendingReceipt)) {
                                _push5(ssrRenderComponent(unref(_sfc_main$b), { class: "size-4" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(Send), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(` ${ssrInterpolate(unref(isSendingReceipt) ? "Mengirim..." : "Kirim Struk")}`);
                            } else {
                              return [
                                unref(isSendingReceipt) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                  key: 0,
                                  class: "size-4"
                                })) : (openBlock(), createBlock(unref(Send), {
                                  key: 1,
                                  class: "size-4",
                                  "aria-hidden": "true"
                                })),
                                createTextVNode(" " + toDisplayString(unref(isSendingReceipt) ? "Mengirim..." : "Kirim Struk"), 1)
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
                            class: "h-11 w-full",
                            onClick: ($event) => dialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Tutup ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$4), {
                            type: "button",
                            class: "h-11 w-full",
                            disabled: !unref(canSendReceipt) || unref(isSendingReceipt),
                            title: unref(canSendReceipt) ? "Kirim struk ke WhatsApp pelanggan" : "Nomor WhatsApp belum diisi",
                            onClick: sendReceipt
                          }, {
                            default: withCtx(() => [
                              unref(isSendingReceipt) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                                key: 0,
                                class: "size-4"
                              })) : (openBlock(), createBlock(unref(Send), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              })),
                              createTextVNode(" " + toDisplayString(unref(isSendingReceipt) ? "Mengirim..." : "Kirim Struk"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled", "title"])
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
                            createVNode(unref(ReceiptText), {
                              class: "size-5",
                              "aria-hidden": "true"
                            })
                          ]),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode(unref(_sfc_main$1$3), null, {
                              default: withCtx(() => [
                                createTextVNode("Detail transaksi")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                              default: withCtx(() => [
                                createTextVNode(" Lihat informasi pembayaran dan pesanan transaksi. ")
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    props.transaction ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4 px-5 py-5"
                    }, [
                      props.loading ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground",
                        "aria-live": "polite"
                      }, [
                        createVNode(unref(_sfc_main$b), { class: "size-4" }),
                        createTextVNode(" Memuat detail transaksi... ")
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "rounded-md border border-primary/20 bg-primary/10 p-4" }, [
                        createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-primary" }, "Kode transaksi"),
                            createVNode("p", { class: "mt-1 truncate text-lg font-semibold" }, toDisplayString(unref(transactionDisplayCode)), 1)
                          ]),
                          createVNode(CashierStatusBadge, {
                            status: props.transaction.status
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(props.transaction.statusLabel), 1)
                            ]),
                            _: 1
                          }, 8, ["status"])
                        ])
                      ]),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "transaction-customer-title"
                      }, [
                        createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                          createVNode(unref(UserRound), {
                            class: "size-4 text-muted-foreground",
                            "aria-hidden": "true"
                          }),
                          createVNode("h3", {
                            id: "transaction-customer-title",
                            class: "text-sm font-semibold"
                          }, " Pelanggan ")
                        ]),
                        createVNode("dl", { class: "grid gap-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Nama"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.customerName), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "WhatsApp"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.customerPhone), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Kasir"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.cashierName), 1)
                          ])
                        ])
                      ]),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "transaction-payment-title"
                      }, [
                        createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                          createVNode(unref(CreditCard), {
                            class: "size-4 text-muted-foreground",
                            "aria-hidden": "true"
                          }),
                          createVNode("h3", {
                            id: "transaction-payment-title",
                            class: "text-sm font-semibold"
                          }, " Pembayaran ")
                        ]),
                        createVNode("dl", { class: "grid gap-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Waktu"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.paidAt), 1)
                          ]),
                          props.transaction.shiftStartedAt ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between gap-3"
                          }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Shift dibuka"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.shiftStartedAt), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Metode"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.paymentMethod), 1)
                          ]),
                          props.transaction.diningOption ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex justify-between gap-3"
                          }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Tipe pesanan"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.diningOption), 1)
                          ])) : createCommentVNode("", true),
                          props.transaction.cashReceived !== void 0 && props.transaction.cashReceived !== null ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                            createVNode("div", { class: "flex justify-between gap-3" }, [
                              createVNode("dt", { class: "text-muted-foreground" }, "Uang diterima"),
                              createVNode("dd", { class: "text-right font-medium" }, [
                                createVNode(CashierCurrency, {
                                  value: props.transaction.cashReceived
                                }, null, 8, ["value"])
                              ])
                            ]),
                            createVNode("div", { class: "flex justify-between gap-3" }, [
                              createVNode("dt", { class: "text-muted-foreground" }, "Kembalian"),
                              createVNode("dd", { class: "text-right font-medium" }, [
                                createVNode(CashierCurrency, {
                                  value: props.transaction.cashChange ?? 0
                                }, null, 8, ["value"])
                              ])
                            ])
                          ], 64)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "transaction-items-title"
                      }, [
                        createVNode("div", { class: "mb-2 flex items-center justify-between gap-3" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Utensils), {
                              class: "size-4 text-muted-foreground",
                              "aria-hidden": "true"
                            }),
                            createVNode("h3", {
                              id: "transaction-items-title",
                              class: "text-sm font-semibold"
                            }, " Item pesanan ")
                          ]),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(props.transaction.itemCount) + " item", 1)
                        ]),
                        unref(hasItems) ? (openBlock(), createBlock("ul", {
                          key: 0,
                          class: "max-h-44 space-y-2 overflow-y-auto pr-1",
                          "aria-label": "Item transaksi"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(transactionItems), (item) => {
                            return openBlock(), createBlock("li", {
                              key: item.productId,
                              class: "rounded-md border bg-background p-2"
                            }, [
                              createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(item.name), 1),
                                  createVNode("p", { class: "mt-0.5 text-xs text-muted-foreground" }, [
                                    createTextVNode(toDisplayString(item.quantity) + " x ", 1),
                                    createVNode(CashierCurrency, {
                                      value: item.price
                                    }, null, 8, ["value"])
                                  ])
                                ]),
                                createVNode("p", { class: "shrink-0 text-sm font-semibold" }, [
                                  createVNode(CashierCurrency, {
                                    value: item.quantity * item.price
                                  }, null, 8, ["value"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground"
                        }, " Rincian item belum tersedia untuk transaksi ini. "))
                      ]),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "transaction-total-title"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(WalletCards), {
                              class: "size-4 text-muted-foreground",
                              "aria-hidden": "true"
                            }),
                            createVNode("h3", {
                              id: "transaction-total-title",
                              class: "text-sm font-semibold"
                            }, " Total ")
                          ]),
                          createVNode("p", { class: "text-base font-semibold" }, [
                            createVNode(CashierCurrency, {
                              value: props.transaction.total
                            }, null, 8, ["value"])
                          ])
                        ])
                      ]),
                      !props.loading && unref(receiptWarningMessage) ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "flex items-start gap-2 rounded-md border border-warning/50 bg-warning/15 px-3 py-2 text-sm text-muted-foreground",
                        "aria-live": "polite"
                      }, [
                        createVNode(unref(AlertTriangle), {
                          class: "mt-0.5 size-4 shrink-0 text-warning",
                          "aria-hidden": "true"
                        }),
                        createVNode("span", null, toDisplayString(unref(receiptWarningMessage)), 1)
                      ])) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "px-5 py-5"
                    }, [
                      createVNode("p", { class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" }, " Data transaksi tidak tersedia. ")
                    ])),
                    createVNode(unref(_sfc_main$4$2), { class: "grid grid-cols-1 gap-2 border-t px-5 py-4 sm:grid-cols-2 sm:justify-normal" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), {
                          type: "button",
                          variant: "outline",
                          class: "h-11 w-full",
                          onClick: ($event) => dialogOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tutup ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$4), {
                          type: "button",
                          class: "h-11 w-full",
                          disabled: !unref(canSendReceipt) || unref(isSendingReceipt),
                          title: unref(canSendReceipt) ? "Kirim struk ke WhatsApp pelanggan" : "Nomor WhatsApp belum diisi",
                          onClick: sendReceipt
                        }, {
                          default: withCtx(() => [
                            unref(isSendingReceipt) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                              key: 0,
                              class: "size-4"
                            })) : (openBlock(), createBlock(unref(Send), {
                              key: 1,
                              class: "size-4",
                              "aria-hidden": "true"
                            })),
                            createTextVNode(" " + toDisplayString(unref(isSendingReceipt) ? "Mengirim..." : "Kirim Struk"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled", "title"])
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
                          createVNode(unref(ReceiptText), {
                            class: "size-5",
                            "aria-hidden": "true"
                          })
                        ]),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode(unref(_sfc_main$1$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Detail transaksi")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                            default: withCtx(() => [
                              createTextVNode(" Lihat informasi pembayaran dan pesanan transaksi. ")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  props.transaction ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4 px-5 py-5"
                  }, [
                    props.loading ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground",
                      "aria-live": "polite"
                    }, [
                      createVNode(unref(_sfc_main$b), { class: "size-4" }),
                      createTextVNode(" Memuat detail transaksi... ")
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "rounded-md border border-primary/20 bg-primary/10 p-4" }, [
                      createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("p", { class: "text-sm font-medium text-primary" }, "Kode transaksi"),
                          createVNode("p", { class: "mt-1 truncate text-lg font-semibold" }, toDisplayString(unref(transactionDisplayCode)), 1)
                        ]),
                        createVNode(CashierStatusBadge, {
                          status: props.transaction.status
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(props.transaction.statusLabel), 1)
                          ]),
                          _: 1
                        }, 8, ["status"])
                      ])
                    ]),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "transaction-customer-title"
                    }, [
                      createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                        createVNode(unref(UserRound), {
                          class: "size-4 text-muted-foreground",
                          "aria-hidden": "true"
                        }),
                        createVNode("h3", {
                          id: "transaction-customer-title",
                          class: "text-sm font-semibold"
                        }, " Pelanggan ")
                      ]),
                      createVNode("dl", { class: "grid gap-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Nama"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.customerName), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "WhatsApp"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.customerPhone), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Kasir"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.cashierName), 1)
                        ])
                      ])
                    ]),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "transaction-payment-title"
                    }, [
                      createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                        createVNode(unref(CreditCard), {
                          class: "size-4 text-muted-foreground",
                          "aria-hidden": "true"
                        }),
                        createVNode("h3", {
                          id: "transaction-payment-title",
                          class: "text-sm font-semibold"
                        }, " Pembayaran ")
                      ]),
                      createVNode("dl", { class: "grid gap-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Waktu"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.paidAt), 1)
                        ]),
                        props.transaction.shiftStartedAt ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between gap-3"
                        }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Shift dibuka"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.shiftStartedAt), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Metode"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.paymentMethod), 1)
                        ]),
                        props.transaction.diningOption ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between gap-3"
                        }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Tipe pesanan"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.transaction.diningOption), 1)
                        ])) : createCommentVNode("", true),
                        props.transaction.cashReceived !== void 0 && props.transaction.cashReceived !== null ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Uang diterima"),
                            createVNode("dd", { class: "text-right font-medium" }, [
                              createVNode(CashierCurrency, {
                                value: props.transaction.cashReceived
                              }, null, 8, ["value"])
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Kembalian"),
                            createVNode("dd", { class: "text-right font-medium" }, [
                              createVNode(CashierCurrency, {
                                value: props.transaction.cashChange ?? 0
                              }, null, 8, ["value"])
                            ])
                          ])
                        ], 64)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "transaction-items-title"
                    }, [
                      createVNode("div", { class: "mb-2 flex items-center justify-between gap-3" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Utensils), {
                            class: "size-4 text-muted-foreground",
                            "aria-hidden": "true"
                          }),
                          createVNode("h3", {
                            id: "transaction-items-title",
                            class: "text-sm font-semibold"
                          }, " Item pesanan ")
                        ]),
                        createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(props.transaction.itemCount) + " item", 1)
                      ]),
                      unref(hasItems) ? (openBlock(), createBlock("ul", {
                        key: 0,
                        class: "max-h-44 space-y-2 overflow-y-auto pr-1",
                        "aria-label": "Item transaksi"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(transactionItems), (item) => {
                          return openBlock(), createBlock("li", {
                            key: item.productId,
                            class: "rounded-md border bg-background p-2"
                          }, [
                            createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(item.name), 1),
                                createVNode("p", { class: "mt-0.5 text-xs text-muted-foreground" }, [
                                  createTextVNode(toDisplayString(item.quantity) + " x ", 1),
                                  createVNode(CashierCurrency, {
                                    value: item.price
                                  }, null, 8, ["value"])
                                ])
                              ]),
                              createVNode("p", { class: "shrink-0 text-sm font-semibold" }, [
                                createVNode(CashierCurrency, {
                                  value: item.quantity * item.price
                                }, null, 8, ["value"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground"
                      }, " Rincian item belum tersedia untuk transaksi ini. "))
                    ]),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "transaction-total-title"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(WalletCards), {
                            class: "size-4 text-muted-foreground",
                            "aria-hidden": "true"
                          }),
                          createVNode("h3", {
                            id: "transaction-total-title",
                            class: "text-sm font-semibold"
                          }, " Total ")
                        ]),
                        createVNode("p", { class: "text-base font-semibold" }, [
                          createVNode(CashierCurrency, {
                            value: props.transaction.total
                          }, null, 8, ["value"])
                        ])
                      ])
                    ]),
                    !props.loading && unref(receiptWarningMessage) ? (openBlock(), createBlock("p", {
                      key: 1,
                      class: "flex items-start gap-2 rounded-md border border-warning/50 bg-warning/15 px-3 py-2 text-sm text-muted-foreground",
                      "aria-live": "polite"
                    }, [
                      createVNode(unref(AlertTriangle), {
                        class: "mt-0.5 size-4 shrink-0 text-warning",
                        "aria-hidden": "true"
                      }),
                      createVNode("span", null, toDisplayString(unref(receiptWarningMessage)), 1)
                    ])) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "px-5 py-5"
                  }, [
                    createVNode("p", { class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" }, " Data transaksi tidak tersedia. ")
                  ])),
                  createVNode(unref(_sfc_main$4$2), { class: "grid grid-cols-1 gap-2 border-t px-5 py-4 sm:grid-cols-2 sm:justify-normal" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), {
                        type: "button",
                        variant: "outline",
                        class: "h-11 w-full",
                        onClick: ($event) => dialogOpen.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tutup ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(unref(_sfc_main$4), {
                        type: "button",
                        class: "h-11 w-full",
                        disabled: !unref(canSendReceipt) || unref(isSendingReceipt),
                        title: unref(canSendReceipt) ? "Kirim struk ke WhatsApp pelanggan" : "Nomor WhatsApp belum diisi",
                        onClick: sendReceipt
                      }, {
                        default: withCtx(() => [
                          unref(isSendingReceipt) ? (openBlock(), createBlock(unref(_sfc_main$b), {
                            key: 0,
                            class: "size-4"
                          })) : (openBlock(), createBlock(unref(Send), {
                            key: 1,
                            class: "size-4",
                            "aria-hidden": "true"
                          })),
                          createTextVNode(" " + toDisplayString(unref(isSendingReceipt) ? "Mengirim..." : "Kirim Struk"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled", "title"])
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/TransactionDetailDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TransactionDetailDialog = Object.assign(_sfc_main$2, { __name: "OrganismsTransactionDetailDialog" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TransactionHistoryTable",
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
                  _push3(` Riwayat transaksi kasir. `);
                } else {
                  return [
                    createTextVNode(" Riwayat transaksi kasir. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$1$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Kode`);
                            } else {
                              return [
                                createTextVNode("Kode")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { scope: "col" }, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Kasir`);
                            } else {
                              return [
                                createTextVNode("Kasir")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pelanggan`);
                            } else {
                              return [
                                createTextVNode("Pelanggan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Metode`);
                            } else {
                              return [
                                createTextVNode("Metode")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), {
                          scope: "col",
                          class: "text-right"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Item`);
                            } else {
                              return [
                                createTextVNode("Item")
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
                              _push5(`Total`);
                            } else {
                              return [
                                createTextVNode("Total")
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
                              createTextVNode("Kode")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                            default: withCtx(() => [
                              createTextVNode("Waktu")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                            default: withCtx(() => [
                              createTextVNode("Kasir")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                            default: withCtx(() => [
                              createTextVNode("Pelanggan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                            default: withCtx(() => [
                              createTextVNode("Metode")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                            default: withCtx(() => [
                              createTextVNode("Tipe")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), {
                            scope: "col",
                            class: "text-right"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Item")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), {
                            scope: "col",
                            class: "text-right"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Total")
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
                            createTextVNode("Kode")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx(() => [
                            createTextVNode("Waktu")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx(() => [
                            createTextVNode("Kasir")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx(() => [
                            createTextVNode("Pelanggan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx(() => [
                            createTextVNode("Metode")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                          default: withCtx(() => [
                            createTextVNode("Tipe")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), {
                          scope: "col",
                          class: "text-right"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Item")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), {
                          scope: "col",
                          class: "text-right"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Total")
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
                        key: `transaction-loading-${index}`
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "h-4 w-32" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "h-4 w-32" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
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
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "h-4 w-24" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "h-4 w-24" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "h-4 w-28" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "h-4 w-28" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "h-4 w-16" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "h-4 w-16" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "h-4 w-20" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "h-4 w-20" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "ml-auto h-4 w-8" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$a), { class: "ml-auto h-4 w-8" })
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
                                  createVNode(unref(_sfc_main$a), { class: "h-4 w-32" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "h-4 w-36" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "h-4 w-24" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "h-4 w-28" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "h-4 w-16" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "h-4 w-20" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { class: "ml-auto h-4 w-8" })
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
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "font-medium" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(unref(getCashierTransactionDisplayCode)(item))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(unref(getCashierTransactionDisplayCode)(item)), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.paidAt)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.paidAt), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.cashierName)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.cashierName), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.customerName)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.customerName), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.paymentMethod)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.paymentMethod), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.diningOption ?? "-")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.diningOption ?? "-"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.itemCount)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.itemCount), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right font-medium" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(CashierCurrency, {
                                    value: item.total
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(CashierCurrency, {
                                      value: item.total
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
                                    "aria-label": `Lihat detail transaksi ${unref(getCashierTransactionDisplayCode)(item)}`,
                                    title: `Lihat detail transaksi ${unref(getCashierTransactionDisplayCode)(item)}`,
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
                                        "aria-label": `Lihat detail transaksi ${unref(getCashierTransactionDisplayCode)(item)}`,
                                        title: `Lihat detail transaksi ${unref(getCashierTransactionDisplayCode)(item)}`,
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
                              createVNode(unref(_sfc_main$6), { class: "font-medium" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(getCashierTransactionDisplayCode)(item)), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.paidAt), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.cashierName), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.customerName), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.paymentMethod), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.diningOption ?? "-"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.itemCount), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), { class: "text-right font-medium" }, {
                                default: withCtx(() => [
                                  createVNode(CashierCurrency, {
                                    value: item.total
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
                                      "aria-label": `Lihat detail transaksi ${unref(getCashierTransactionDisplayCode)(item)}`,
                                      title: `Lihat detail transaksi ${unref(getCashierTransactionDisplayCode)(item)}`,
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
                    _push3(ssrRenderComponent(unref(_sfc_main$4$1), { colspan: 10 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Tidak ada transaksi. `);
                        } else {
                          return [
                            createTextVNode(" Tidak ada transaksi. ")
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
                        key: `transaction-loading-${index}`
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-4 w-32" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-4 w-36" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-4 w-24" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-4 w-28" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-4 w-16" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "h-4 w-20" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$a), { class: "ml-auto h-4 w-8" })
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
                          createVNode(unref(_sfc_main$6), { class: "font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(getCashierTransactionDisplayCode)(item)), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.paidAt), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.cashierName), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.customerName), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.paymentMethod), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.diningOption ?? "-"), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.itemCount), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), { class: "text-right font-medium" }, {
                            default: withCtx(() => [
                              createVNode(CashierCurrency, {
                                value: item.total
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
                                  "aria-label": `Lihat detail transaksi ${unref(getCashierTransactionDisplayCode)(item)}`,
                                  title: `Lihat detail transaksi ${unref(getCashierTransactionDisplayCode)(item)}`,
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
                      colspan: 10
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Tidak ada transaksi. ")
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
                  createTextVNode(" Riwayat transaksi kasir. ")
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$1$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Kode")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Waktu")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Kasir")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Pelanggan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Metode")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { scope: "col" }, {
                        default: withCtx(() => [
                          createTextVNode("Tipe")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), {
                        scope: "col",
                        class: "text-right"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Item")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), {
                        scope: "col",
                        class: "text-right"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Total")
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
                      key: `transaction-loading-${index}`
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-4 w-32" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-4 w-36" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-4 w-24" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-4 w-28" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-4 w-16" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "h-4 w-20" })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$a), { class: "ml-auto h-4 w-8" })
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
                        createVNode(unref(_sfc_main$6), { class: "font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(getCashierTransactionDisplayCode)(item)), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.paidAt), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.cashierName), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.customerName), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.paymentMethod), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.diningOption ?? "-"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.itemCount), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), { class: "text-right font-medium" }, {
                          default: withCtx(() => [
                            createVNode(CashierCurrency, {
                              value: item.total
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
                                "aria-label": `Lihat detail transaksi ${unref(getCashierTransactionDisplayCode)(item)}`,
                                title: `Lihat detail transaksi ${unref(getCashierTransactionDisplayCode)(item)}`,
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
                    colspan: 10
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Tidak ada transaksi. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/TransactionHistoryTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TransactionHistoryTable = Object.assign(_sfc_main$1, { __name: "OrganismsTransactionHistoryTable" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transactions",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Riwayat Transaksi"
    });
    const search = ref("");
    const statusFilter = ref("all");
    const methodFilter = ref("all");
    const orderTypeFilter = ref("all");
    const startDate = ref("");
    const endDate = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const selectedTransaction = ref(null);
    const isDetailDialogOpen = ref(false);
    const {
      activeShift,
      formatCurrency,
      transactions,
      transactionPage,
      isTransactionListLoading,
      isTransactionDetailLoading,
      loadActiveShift,
      loadTransactions,
      loadTransactionDetail
    } = useCashierStore();
    const totalTransactions = computed(() => transactionPage.value?.total_record_count ?? transactions.value.length);
    const visibleRevenue = computed(() => transactions.value.reduce((sum, item) => sum + item.total, 0));
    const hasActiveFilters = computed(() => Boolean(
      search.value.trim() || statusFilter.value !== "all" || methodFilter.value !== "all" || orderTypeFilter.value !== "all" || startDate.value || endDate.value
    ));
    let searchDebounceTimer = null;
    let isResettingFilters = false;
    watch([statusFilter, methodFilter, orderTypeFilter, startDate, endDate, pageSize], () => {
      if (isResettingFilters) {
        return;
      }
      resetPageAndLoadTransactions();
    });
    watch(currentPage, () => {
      void loadTransactionPage();
    });
    watch(search, () => {
      if (isResettingFilters) {
        return;
      }
      clearSearchDebounce();
      searchDebounceTimer = setTimeout(() => {
        resetPageAndLoadTransactions();
      }, 350);
    });
    async function loadTransactionPage() {
      try {
        const shift = activeShift.value ?? await loadActiveShift();
        if (!shift?.id) {
          transactions.value = [];
          transactionPage.value = null;
          return;
        }
        await loadTransactions({
          batch: currentPage.value,
          size: pageSize.value,
          shift_id: shift.id,
          ...search.value.trim() ? { search: search.value.trim() } : {},
          ...statusFilter.value !== "all" ? { status: statusFilter.value } : {},
          ...methodFilter.value !== "all" ? { payment_type: methodFilter.value } : {},
          ...orderTypeFilter.value !== "all" ? { order_type: orderTypeFilter.value } : {},
          ...startDate.value ? { start_date: startDate.value } : {},
          ...endDate.value ? { end_date: endDate.value } : {}
        });
      } catch (error) {
        toast.error(getErrorMessage(error, "Gagal memuat riwayat transaksi."));
      }
    }
    function resetPageAndLoadTransactions() {
      if (currentPage.value !== 1) {
        currentPage.value = 1;
        return;
      }
      void loadTransactionPage();
    }
    function clearSearchDebounce() {
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = null;
      }
    }
    async function resetFilters() {
      clearSearchDebounce();
      isResettingFilters = true;
      search.value = "";
      statusFilter.value = "all";
      methodFilter.value = "all";
      orderTypeFilter.value = "all";
      startDate.value = "";
      endDate.value = "";
      await nextTick();
      isResettingFilters = false;
      resetPageAndLoadTransactions();
    }
    async function handleViewDetail(item) {
      selectedTransaction.value = item;
      isDetailDialogOpen.value = true;
      if (!item.orderId) {
        toast.error("Data order tidak tersedia.");
        return;
      }
      try {
        selectedTransaction.value = await loadTransactionDetail(item.orderId);
      } catch (error) {
        toast.error(getErrorMessage(error, "Gagal memuat detail transaksi."));
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
        title: "Riwayat Transaksi",
        description: "Pantau transaksi shift kasir dengan tabel ringkas."
      }, null, _parent));
      _push(`<div class="grid gap-2 sm:grid-cols-2">`);
      _push(ssrRenderComponent(CashierMetric, {
        label: "Total transaksi",
        value: String(unref(totalTransactions)),
        helper: "Sesuai filter",
        tone: "info"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ReceiptText), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ReceiptText), {
                class: "size-4",
                "aria-hidden": "true"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(CashierMetric, {
        label: "Nominal halaman",
        value: unref(formatCurrency)(unref(visibleRevenue)),
        helper: "Data yang tampil",
        tone: "success"
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
      _push(`</div><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="transactions-table-title"><div class="mb-3"><h2 id="transactions-table-title" class="text-base font-semibold tracking-normal"> Tabel Transaksi </h2></div>`);
      _push(ssrRenderComponent(CashierTableToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "transaction-search",
        "search-label": "Cari transaksi",
        "search-placeholder": "Cari kode, pelanggan, kasir, metode",
        disabled: unref(isTransactionListLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="transaction-status-filter" class="sr-only"${_scopeId}>Filter status transaksi</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2$1), {
              id: "transaction-status-filter",
              modelValue: unref(statusFilter),
              "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
              class: "w-40",
              disabled: unref(isTransactionListLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua status</option><option value="COMPLETED"${_scopeId2}>Lunas</option><option value="PENDING"${_scopeId2}>Pending</option><option value="CANCELLED"${_scopeId2}>Dibatalkan</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua status"),
                    createVNode("option", { value: "COMPLETED" }, "Lunas"),
                    createVNode("option", { value: "PENDING" }, "Pending"),
                    createVNode("option", { value: "CANCELLED" }, "Dibatalkan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="transaction-method-filter" class="sr-only"${_scopeId}>Filter metode pembayaran</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2$1), {
              id: "transaction-method-filter",
              modelValue: unref(methodFilter),
              "onUpdate:modelValue": ($event) => isRef(methodFilter) ? methodFilter.value = $event : null,
              class: "w-36",
              disabled: unref(isTransactionListLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua metode</option><option value="CASH"${_scopeId2}>Tunai</option><option value="QRIS"${_scopeId2}>QRIS</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua metode"),
                    createVNode("option", { value: "CASH" }, "Tunai"),
                    createVNode("option", { value: "QRIS" }, "QRIS")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="transaction-order-type-filter" class="sr-only"${_scopeId}>Filter tipe pesanan</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2$1), {
              id: "transaction-order-type-filter",
              modelValue: unref(orderTypeFilter),
              "onUpdate:modelValue": ($event) => isRef(orderTypeFilter) ? orderTypeFilter.value = $event : null,
              class: "w-40",
              disabled: unref(isTransactionListLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua tipe</option><option value="DINE_IN"${_scopeId2}>Makan di Tempat</option><option value="TAKE_AWAY"${_scopeId2}>Bungkus</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua tipe"),
                    createVNode("option", { value: "DINE_IN" }, "Makan di Tempat"),
                    createVNode("option", { value: "TAKE_AWAY" }, "Bungkus")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="transaction-start-date" class="sr-only"${_scopeId}>Tanggal mulai transaksi</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), {
              id: "transaction-start-date",
              modelValue: unref(startDate),
              "onUpdate:modelValue": ($event) => isRef(startDate) ? startDate.value = $event : null,
              type: "date",
              class: "h-9 w-40",
              disabled: unref(isTransactionListLoading)
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="transaction-end-date" class="sr-only"${_scopeId}>Tanggal akhir transaksi</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), {
              id: "transaction-end-date",
              modelValue: unref(endDate),
              "onUpdate:modelValue": ($event) => isRef(endDate) ? endDate.value = $event : null,
              type: "date",
              class: "h-9 w-40",
              disabled: unref(isTransactionListLoading)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("label", {
                  for: "transaction-status-filter",
                  class: "sr-only"
                }, "Filter status transaksi"),
                createVNode(unref(_sfc_main$2$1), {
                  id: "transaction-status-filter",
                  modelValue: unref(statusFilter),
                  "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                  class: "w-40",
                  disabled: unref(isTransactionListLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua status"),
                    createVNode("option", { value: "COMPLETED" }, "Lunas"),
                    createVNode("option", { value: "PENDING" }, "Pending"),
                    createVNode("option", { value: "CANCELLED" }, "Dibatalkan")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "transaction-method-filter",
                  class: "sr-only"
                }, "Filter metode pembayaran"),
                createVNode(unref(_sfc_main$2$1), {
                  id: "transaction-method-filter",
                  modelValue: unref(methodFilter),
                  "onUpdate:modelValue": ($event) => isRef(methodFilter) ? methodFilter.value = $event : null,
                  class: "w-36",
                  disabled: unref(isTransactionListLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua metode"),
                    createVNode("option", { value: "CASH" }, "Tunai"),
                    createVNode("option", { value: "QRIS" }, "QRIS")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "transaction-order-type-filter",
                  class: "sr-only"
                }, "Filter tipe pesanan"),
                createVNode(unref(_sfc_main$2$1), {
                  id: "transaction-order-type-filter",
                  modelValue: unref(orderTypeFilter),
                  "onUpdate:modelValue": ($event) => isRef(orderTypeFilter) ? orderTypeFilter.value = $event : null,
                  class: "w-40",
                  disabled: unref(isTransactionListLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua tipe"),
                    createVNode("option", { value: "DINE_IN" }, "Makan di Tempat"),
                    createVNode("option", { value: "TAKE_AWAY" }, "Bungkus")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "transaction-start-date",
                  class: "sr-only"
                }, "Tanggal mulai transaksi"),
                createVNode(unref(_sfc_main$1$1), {
                  id: "transaction-start-date",
                  modelValue: unref(startDate),
                  "onUpdate:modelValue": ($event) => isRef(startDate) ? startDate.value = $event : null,
                  type: "date",
                  class: "h-9 w-40",
                  disabled: unref(isTransactionListLoading)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "transaction-end-date",
                  class: "sr-only"
                }, "Tanggal akhir transaksi"),
                createVNode(unref(_sfc_main$1$1), {
                  id: "transaction-end-date",
                  modelValue: unref(endDate),
                  "onUpdate:modelValue": ($event) => isRef(endDate) ? endDate.value = $event : null,
                  type: "date",
                  class: "h-9 w-40",
                  disabled: unref(isTransactionListLoading)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ])
            ];
          }
        }),
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(hasActiveFilters)) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: unref(isTransactionListLoading),
                onClick: resetFilters
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(RotateCcw), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(` Reset `);
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
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(hasActiveFilters) ? (openBlock(), createBlock(unref(_sfc_main$4), {
                key: 0,
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: unref(isTransactionListLoading),
                onClick: resetFilters
              }, {
                default: withCtx(() => [
                  createVNode(unref(RotateCcw), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Reset ")
                ]),
                _: 1
              }, 8, ["disabled"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3 space-y-3">`);
      _push(ssrRenderComponent(TransactionHistoryTable, {
        items: unref(transactions),
        loading: unref(isTransactionListLoading),
        onViewDetail: handleViewDetail
      }, null, _parent));
      _push(ssrRenderComponent(CashierTablePagination, {
        page: unref(currentPage),
        "onUpdate:page": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
        "page-size": unref(pageSize),
        "onUpdate:pageSize": ($event) => isRef(pageSize) ? pageSize.value = $event : null,
        "total-items": unref(totalTransactions),
        disabled: unref(isTransactionListLoading),
        label: "transaksi"
      }, null, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(TransactionDetailDialog, {
        open: unref(isDetailDialogOpen),
        "onUpdate:open": ($event) => isRef(isDetailDialogOpen) ? isDetailDialogOpen.value = $event : null,
        transaction: unref(selectedTransaction),
        loading: unref(isTransactionDetailLoading)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/pages/cashier/transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transactions-DLBQ_Xsu.mjs.map
