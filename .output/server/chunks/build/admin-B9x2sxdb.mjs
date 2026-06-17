import { defineComponent, ref, unref, mergeProps, isRef, withCtx, createVNode, toDisplayString, renderSlot, createTextVNode, openBlock, createBlock, withModifiers, computed, resolveDynamicComponent, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { ShieldAlert, LogOut, LayoutDashboard, Tags, UtensilsCrossed, Scale, Boxes, PackageCheck, History, ClipboardCheck, PackagePlus, PackageMinus, Truck, ShoppingCart, BarChart3, ReceiptText, Warehouse, UserCog, Settings, ShieldCheck, Clock3, CalendarDays } from 'lucide-vue-next';
import { useForwardPropsEmits, AlertDialogRoot, AlertDialogPortal, AlertDialogOverlay, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from 'reka-ui';
import { c as cn } from './index-H80jjgLf.mjs';
import { b as buttonVariants } from './index-BZG70idc.mjs';
import { _ as _export_sfc, r as reactiveOmit, u as useRoute } from './server.mjs';
import { _ as _sfc_main$3$1, a as _sfc_main$i, b as _sfc_main$c, c as _sfc_main$r, d as _sfc_main$k, e as _sfc_main$q, f as _sfc_main$o, g as _sfc_main$l, h as _sfc_main$m, i as _sfc_main$h, j as _sfc_main$8$1, k as _sfc_main$9$1, l as _sfc_main$p, m as _sfc_main$1$1 } from './index-bJ2IbZGU.mjs';
import { _ as _sfc_main$d } from './Sonner-ympm_ln7.mjs';
import { a as _sfc_main$e } from './Spinner-nalFRPxS.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-B5v6N24G.mjs';
import { u as useAuth } from './useAuth-DEEW40N4.mjs';
import { u as useAdminSystemProfile } from './useAdminSystemProfile-10HRwPVk.mjs';
import { u as useFlashToast } from './useFlashToast-HgpcM5Qo.mjs';
import { b as useCookie } from './api-endpoints-aT5YyZ8V.mjs';
import { u as useState } from './state-Dw1r7BQr.mjs';
import 'clsx';
import 'tailwind-merge';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './Skeleton-CQWwuiK0.mjs';
import './Separator-DD0IdWG4.mjs';
import 'vue-sonner';
import './usePublicStoreProfile-BNIGua-8.mjs';

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "AlertDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AlertDialogRoot), mergeProps({ "data-slot": "alert-dialog" }, unref(forwarded), _attrs), {
        default: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", slotProps)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/alert-dialog/AlertDialog.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogAction",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AlertDialogAction), mergeProps(unref(delegatedProps), {
        class: unref(cn)(unref(buttonVariants)(), props.class)
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/alert-dialog/AlertDialogAction.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogCancel",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AlertDialogCancel), mergeProps(unref(delegatedProps), {
        class: unref(cn)(
          unref(buttonVariants)({ variant: "outline" }),
          "mt-2 sm:mt-0",
          props.class
        )
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/alert-dialog/AlertDialogCancel.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "AlertDialogContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AlertDialogPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(AlertDialogOverlay), {
              "data-slot": "alert-dialog-overlay",
              class: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(AlertDialogContent), mergeProps({ "data-slot": "alert-dialog-content" }, { ..._ctx.$attrs, ...unref(forwarded) }, {
              class: unref(cn)(
                "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(AlertDialogOverlay), {
                "data-slot": "alert-dialog-overlay",
                class: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
              }),
              createVNode(unref(AlertDialogContent), mergeProps({ "data-slot": "alert-dialog-content" }, { ..._ctx.$attrs, ...unref(forwarded) }, {
                class: unref(cn)(
                  "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/alert-dialog/AlertDialogContent.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogDescription",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AlertDialogDescription), mergeProps({ "data-slot": "alert-dialog-description" }, unref(delegatedProps), {
        class: unref(cn)("text-muted-foreground text-sm", props.class)
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/alert-dialog/AlertDialogDescription.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogFooter",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "alert-dialog-footer",
        class: unref(cn)(
          "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/alert-dialog/AlertDialogFooter.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogHeader",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "alert-dialog-header",
        class: unref(cn)("flex flex-col gap-2 text-center sm:text-left", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/alert-dialog/AlertDialogHeader.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogTitle",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AlertDialogTitle), mergeProps({ "data-slot": "alert-dialog-title" }, unref(delegatedProps), {
        class: unref(cn)("text-lg font-semibold", props.class)
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/alert-dialog/AlertDialogTitle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AlertDialogTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AlertDialogTrigger), mergeProps({ "data-slot": "alert-dialog-trigger" }, props, _attrs), {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/alert-dialog/AlertDialogTrigger.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AdminDateTime",
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/molecules/AdminDateTime.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AdminDateTime = Object.assign(_sfc_main$2, { __name: "MoleculesAdminDateTime" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  props: {
    loggingOut: { type: Boolean, default: false }
  },
  emits: ["request-logout"],
  setup(__props, { emit: __emit }) {
    const route = useRoute();
    const { user } = useAuth();
    const { systemProfile } = useAdminSystemProfile();
    const emit = __emit;
    const navigationGroups = [
      {
        label: "Ringkasan",
        items: [
          {
            label: "Dashboard",
            to: "/admin",
            icon: LayoutDashboard
          }
        ]
      },
      {
        label: "Kategori & Menu",
        items: [
          {
            label: "Kategori Menu",
            to: "/admin/menu-categories",
            icon: Tags
          },
          {
            label: "Menu",
            to: "/admin/menu",
            icon: UtensilsCrossed
          }
        ]
      },
      {
        label: "Persediaan",
        items: [
          {
            label: "Satuan Ukur",
            to: "/admin/units",
            icon: Scale
          },
          {
            label: "Bahan Baku",
            to: "/admin/ingredients",
            icon: Boxes
          },
          {
            label: "Bahan Setengah Jadi",
            to: "/admin/semi-finished-ingredients",
            icon: PackageCheck
          },
          {
            label: "Riwayat Stok",
            to: "/admin/stock-history",
            icon: History
          },
          {
            label: "Stok Opname",
            to: "/admin/stock-opname",
            icon: ClipboardCheck
          },
          {
            label: "Stok Masuk",
            to: "/admin/stock-in",
            icon: PackagePlus
          },
          {
            label: "Stok Keluar",
            to: "/admin/stock-out",
            icon: PackageMinus
          }
        ]
      },
      {
        label: "Pembelian",
        items: [
          {
            label: "Pemasok",
            to: "/admin/suppliers",
            icon: Truck
          },
          {
            label: "Rekomendasi Belanja",
            to: "/admin/purchase-recommendations",
            icon: ShoppingCart
          }
        ]
      },
      {
        label: "Laporan",
        items: [
          {
            label: "Keuangan",
            to: "/admin/reports/finance",
            icon: BarChart3
          },
          {
            label: "Operasional",
            to: "/admin/reports/operations",
            icon: ReceiptText
          },
          {
            label: "Persediaan",
            to: "/admin/reports/inventory",
            icon: Warehouse
          }
        ]
      },
      {
        label: "Sistem",
        items: [
          {
            label: "Pengguna",
            to: "/admin/users",
            icon: UserCog
          },
          {
            label: "Profil Sistem",
            to: "/admin/system-profile",
            icon: Settings
          }
        ]
      }
    ];
    const systemLogoUrl = computed(() => systemProfile.value.logoUrl.trim());
    const systemDisplayName = computed(() => systemProfile.value.systemDisplayName.trim() || "Sistem Kasir");
    const storeName = computed(() => systemProfile.value.storeName.trim() || "Panel admin");
    const systemInitials = computed(() => {
      const words = systemDisplayName.value.split(/\s+/).filter(Boolean);
      const initials = words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("");
      return initials || "SK";
    });
    function isActive(path) {
      if (path === "/admin") {
        return route.path === path;
      }
      return route.path === path || route.path.startsWith(`${path}/`);
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
                    to: "/admin",
                    class: "flex min-h-10 items-center gap-3 rounded-md px-2 text-sidebar-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                    "aria-label": `Beranda admin ${unref(systemDisplayName)}`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground"${_scopeId3}>`);
                        if (unref(systemLogoUrl)) {
                          _push4(`<img${ssrRenderAttr("src", unref(systemLogoUrl))}${ssrRenderAttr("alt", `Logo ${unref(storeName)}`)} class="size-full object-contain p-1"${_scopeId3}>`);
                        } else {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(unref(systemInitials))}</span>`);
                        }
                        _push4(`</span><span class="min-w-0 group-data-[collapsible=icon]:hidden"${_scopeId3}><span class="block truncate text-sm font-semibold"${_scopeId3}>${ssrInterpolate(unref(systemDisplayName))}</span><span class="block truncate text-xs text-sidebar-foreground/90"${_scopeId3}>${ssrInterpolate(unref(storeName))}</span></span>`);
                      } else {
                        return [
                          createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground" }, [
                            unref(systemLogoUrl) ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: unref(systemLogoUrl),
                              alt: `Logo ${unref(storeName)}`,
                              class: "size-full object-contain p-1"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(systemInitials)), 1))
                          ]),
                          createVNode("span", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                            createVNode("span", { class: "block truncate text-sm font-semibold" }, toDisplayString(unref(systemDisplayName)), 1),
                            createVNode("span", { class: "block truncate text-xs text-sidebar-foreground/90" }, toDisplayString(unref(storeName)), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, {
                      to: "/admin",
                      class: "flex min-h-10 items-center gap-3 rounded-md px-2 text-sidebar-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                      "aria-label": `Beranda admin ${unref(systemDisplayName)}`
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground" }, [
                          unref(systemLogoUrl) ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: unref(systemLogoUrl),
                            alt: `Logo ${unref(storeName)}`,
                            class: "size-full object-contain p-1"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(systemInitials)), 1))
                        ]),
                        createVNode("span", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                          createVNode("span", { class: "block truncate text-sm font-semibold" }, toDisplayString(unref(systemDisplayName)), 1),
                          createVNode("span", { class: "block truncate text-xs text-sidebar-foreground/90" }, toDisplayString(unref(storeName)), 1)
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
                  _push3(`<nav aria-label="Navigasi utama admin"${_scopeId2}><!--[-->`);
                  ssrRenderList(navigationGroups, (group) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$o), {
                      key: group.label
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$l), { class: "text-sidebar-foreground/90" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(group.label)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(group.label), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$h), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(group.items, (item) => {
                                        _push6(ssrRenderComponent(unref(_sfc_main$8$1), {
                                          key: item.to
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$9$1), {
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
                                                createVNode(unref(_sfc_main$9$1), {
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item) => {
                                          return openBlock(), createBlock(unref(_sfc_main$8$1), {
                                            key: item.to
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$9$1), {
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
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$h), null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item) => {
                                        return openBlock(), createBlock(unref(_sfc_main$8$1), {
                                          key: item.to
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$9$1), {
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
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$l), { class: "text-sidebar-foreground/90" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(group.label), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$m), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$h), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item) => {
                                      return openBlock(), createBlock(unref(_sfc_main$8$1), {
                                        key: item.to
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$9$1), {
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
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></nav>`);
                } else {
                  return [
                    createVNode("nav", { "aria-label": "Navigasi utama admin" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(navigationGroups, (group) => {
                        return createVNode(unref(_sfc_main$o), {
                          key: group.label
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$l), { class: "text-sidebar-foreground/90" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(group.label), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$m), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$h), null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item) => {
                                      return openBlock(), createBlock(unref(_sfc_main$8$1), {
                                        key: item.to
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$9$1), {
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
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 64))
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
                        _push4(ssrRenderComponent(unref(_sfc_main$8$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$9$1), {
                                as: "div",
                                class: "h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(ShieldCheck), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</span><div class="min-w-0 group-data-[collapsible=icon]:hidden"${_scopeId5}><p class="truncate text-sm font-medium"${_scopeId5}>${ssrInterpolate(unref(user)?.name ?? "Admin")}</p><p class="truncate text-xs text-sidebar-foreground/90"${_scopeId5}>Administrator</p></div>`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6" }, [
                                        createVNode(unref(ShieldCheck), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        })
                                      ]),
                                      createVNode("div", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                                        createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Admin"), 1),
                                        createVNode("p", { class: "truncate text-xs text-sidebar-foreground/90" }, "Administrator")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$9$1), {
                                  as: "div",
                                  class: "h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6" }, [
                                      createVNode(unref(ShieldCheck), {
                                        class: "size-4",
                                        "aria-hidden": "true"
                                      })
                                    ]),
                                    createVNode("div", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                                      createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Admin"), 1),
                                      createVNode("p", { class: "truncate text-xs text-sidebar-foreground/90" }, "Administrator")
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$9$1), {
                                type: "button",
                                class: "admin-logout-button disabled:opacity-50",
                                tooltip: "Keluar",
                                "aria-label": "Keluar dari akun admin",
                                disabled: __props.loggingOut,
                                onClick: ($event) => emit("request-logout")
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (__props.loggingOut) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), { class: "size-4" }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(ssrRenderComponent(unref(LogOut), { "aria-hidden": "true" }, null, _parent6, _scopeId5));
                                    }
                                    _push6(`<span${_scopeId5}>${ssrInterpolate(__props.loggingOut ? "Keluar..." : "Keluar")}</span>`);
                                  } else {
                                    return [
                                      __props.loggingOut ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                        key: 0,
                                        class: "size-4"
                                      })) : (openBlock(), createBlock(unref(LogOut), {
                                        key: 1,
                                        "aria-hidden": "true"
                                      })),
                                      createVNode("span", null, toDisplayString(__props.loggingOut ? "Keluar..." : "Keluar"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$9$1), {
                                  type: "button",
                                  class: "admin-logout-button disabled:opacity-50",
                                  tooltip: "Keluar",
                                  "aria-label": "Keluar dari akun admin",
                                  disabled: __props.loggingOut,
                                  onClick: ($event) => emit("request-logout")
                                }, {
                                  default: withCtx(() => [
                                    __props.loggingOut ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                      key: 0,
                                      class: "size-4"
                                    })) : (openBlock(), createBlock(unref(LogOut), {
                                      key: 1,
                                      "aria-hidden": "true"
                                    })),
                                    createVNode("span", null, toDisplayString(__props.loggingOut ? "Keluar..." : "Keluar"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled", "onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$8$1), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9$1), {
                                as: "div",
                                class: "h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6" }, [
                                    createVNode(unref(ShieldCheck), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    })
                                  ]),
                                  createVNode("div", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                                    createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Admin"), 1),
                                    createVNode("p", { class: "truncate text-xs text-sidebar-foreground/90" }, "Administrator")
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8$1), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9$1), {
                                type: "button",
                                class: "admin-logout-button disabled:opacity-50",
                                tooltip: "Keluar",
                                "aria-label": "Keluar dari akun admin",
                                disabled: __props.loggingOut,
                                onClick: ($event) => emit("request-logout")
                              }, {
                                default: withCtx(() => [
                                  __props.loggingOut ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                    key: 0,
                                    class: "size-4"
                                  })) : (openBlock(), createBlock(unref(LogOut), {
                                    key: 1,
                                    "aria-hidden": "true"
                                  })),
                                  createVNode("span", null, toDisplayString(__props.loggingOut ? "Keluar..." : "Keluar"), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"])
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
                        createVNode(unref(_sfc_main$8$1), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9$1), {
                              as: "div",
                              class: "h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6" }, [
                                  createVNode(unref(ShieldCheck), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  })
                                ]),
                                createVNode("div", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                                  createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Admin"), 1),
                                  createVNode("p", { class: "truncate text-xs text-sidebar-foreground/90" }, "Administrator")
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8$1), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9$1), {
                              type: "button",
                              class: "admin-logout-button disabled:opacity-50",
                              tooltip: "Keluar",
                              "aria-label": "Keluar dari akun admin",
                              disabled: __props.loggingOut,
                              onClick: ($event) => emit("request-logout")
                            }, {
                              default: withCtx(() => [
                                __props.loggingOut ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                  key: 0,
                                  class: "size-4"
                                })) : (openBlock(), createBlock(unref(LogOut), {
                                  key: 1,
                                  "aria-hidden": "true"
                                })),
                                createVNode("span", null, toDisplayString(__props.loggingOut ? "Keluar..." : "Keluar"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"])
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
                    to: "/admin",
                    class: "flex min-h-10 items-center gap-3 rounded-md px-2 text-sidebar-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                    "aria-label": `Beranda admin ${unref(systemDisplayName)}`
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground" }, [
                        unref(systemLogoUrl) ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: unref(systemLogoUrl),
                          alt: `Logo ${unref(storeName)}`,
                          class: "size-full object-contain p-1"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(systemInitials)), 1))
                      ]),
                      createVNode("span", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                        createVNode("span", { class: "block truncate text-sm font-semibold" }, toDisplayString(unref(systemDisplayName)), 1),
                        createVNode("span", { class: "block truncate text-xs text-sidebar-foreground/90" }, toDisplayString(unref(storeName)), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["aria-label"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$q), null, {
                default: withCtx(() => [
                  createVNode("nav", { "aria-label": "Navigasi utama admin" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(navigationGroups, (group) => {
                      return createVNode(unref(_sfc_main$o), {
                        key: group.label
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$l), { class: "text-sidebar-foreground/90" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(group.label), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item) => {
                                    return openBlock(), createBlock(unref(_sfc_main$8$1), {
                                      key: item.to
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$9$1), {
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
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 64))
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$p), { class: "p-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$1$1), { class: "mx-2 mb-1" }),
                  createVNode(unref(_sfc_main$h), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$8$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9$1), {
                            as: "div",
                            class: "h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6" }, [
                                createVNode(unref(ShieldCheck), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                })
                              ]),
                              createVNode("div", { class: "min-w-0 group-data-[collapsible=icon]:hidden" }, [
                                createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Admin"), 1),
                                createVNode("p", { class: "truncate text-xs text-sidebar-foreground/90" }, "Administrator")
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9$1), {
                            type: "button",
                            class: "admin-logout-button disabled:opacity-50",
                            tooltip: "Keluar",
                            "aria-label": "Keluar dari akun admin",
                            disabled: __props.loggingOut,
                            onClick: ($event) => emit("request-logout")
                          }, {
                            default: withCtx(() => [
                              __props.loggingOut ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                key: 0,
                                class: "size-4"
                              })) : (openBlock(), createBlock(unref(LogOut), {
                                key: 1,
                                "aria-hidden": "true"
                              })),
                              createVNode("span", null, toDisplayString(__props.loggingOut ? "Keluar..." : "Keluar"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/organisms/AdminSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AdminSidebar = Object.assign(_sfc_main$1, { __name: "OrganismsAdminSidebar" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const { logout, user } = useAuth();
    const { setFlashToast } = useFlashToast();
    useAdminSystemProfile();
    const isLogoutDialogOpen = ref(false);
    const isLoggingOut = ref(false);
    const sidebarCookie = useCookie("sidebar_state");
    const isSidebarOpen = useState("admin:sidebar-open", () => sidebarCookie.value !== "false");
    if (sidebarCookie.value === "false") {
      isSidebarOpen.value = false;
    }
    async function handleRequestLogout() {
      if (isLoggingOut.value) {
        return;
      }
      isLogoutDialogOpen.value = true;
    }
    async function handleConfirmLogout() {
      if (isLoggingOut.value) {
        return;
      }
      isLoggingOut.value = true;
      try {
        setFlashToast({
          type: "success",
          title: "Logout admin berhasil",
          description: `${user.value?.name ?? "Admin"} sudah keluar dari area admin.`
        });
        await logout();
        isLogoutDialogOpen.value = false;
      } finally {
        isLoggingOut.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$3$1), mergeProps({
        open: unref(isSidebarOpen),
        "onUpdate:open": ($event) => isRef(isSidebarOpen) ? isSidebarOpen.value = $event : null,
        class: "admin-blue-sidebar h-dvh min-h-dvh overflow-hidden"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="#admin-main-content" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring" data-v-85650260${_scopeId}> Lewati menu admin </a>`);
            _push2(ssrRenderComponent(AdminSidebar, {
              "logging-out": unref(isLoggingOut),
              onRequestLogout: handleRequestLogout
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$i), {
              id: "admin-main-content",
              class: "h-dvh min-h-0 overflow-hidden"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<header class="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background px-3 sm:px-4" data-v-85650260${_scopeId2}><div class="flex min-w-0 items-center gap-2" data-v-85650260${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    class: "h-8 w-8",
                    label: "Buka atau tutup menu admin",
                    title: "Buka atau tutup menu admin"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="min-w-0" data-v-85650260${_scopeId2}><p class="truncate text-sm font-medium" data-v-85650260${_scopeId2}>${ssrInterpolate(unref(user)?.name ?? "Admin")}</p><p class="truncate text-xs text-muted-foreground" data-v-85650260${_scopeId2}> Area kerja admin </p></div></div><div class="flex shrink-0 items-center gap-2" data-v-85650260${_scopeId2}><div class="hidden sm:block" data-v-85650260${_scopeId2}>`);
                  _push3(ssrRenderComponent(AdminDateTime, null, null, _parent3, _scopeId2));
                  _push3(`</div></div></header><div class="admin-scrollbar min-h-0 flex-1 overflow-y-auto bg-muted/50" data-v-85650260${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("header", { class: "sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background px-3 sm:px-4" }, [
                      createVNode("div", { class: "flex min-w-0 items-center gap-2" }, [
                        createVNode(unref(_sfc_main$c), {
                          class: "h-8 w-8",
                          label: "Buka atau tutup menu admin",
                          title: "Buka atau tutup menu admin"
                        }),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Admin"), 1),
                          createVNode("p", { class: "truncate text-xs text-muted-foreground" }, " Area kerja admin ")
                        ])
                      ]),
                      createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                        createVNode("div", { class: "hidden sm:block" }, [
                          createVNode(AdminDateTime)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "admin-scrollbar min-h-0 flex-1 overflow-y-auto bg-muted/50" }, [
                      renderSlot(_ctx.$slots, "default", {}, void 0, true)
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$d), {
              "rich-colors": "",
              "close-button": "",
              position: "top-right"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$b), {
              open: unref(isLogoutDialogOpen),
              "onUpdate:open": ($event) => isRef(isLogoutDialogOpen) ? isLogoutDialogOpen.value = $event : null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "gap-0 overflow-hidden p-0 sm:max-w-md" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { class: "border-b bg-muted/40 px-5 pt-5 pb-4 text-left" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex items-start gap-3" data-v-85650260${_scopeId4}><span class="flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive" data-v-85650260${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(ShieldAlert), {
                                class: "size-5",
                                "aria-hidden": "true"
                              }, null, _parent5, _scopeId4));
                              _push5(`</span><div class="min-w-0" data-v-85650260${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(_sfc_main$4), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Keluar dari akun admin?`);
                                  } else {
                                    return [
                                      createTextVNode("Keluar dari akun admin?")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "mt-1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Pastikan pekerjaan yang belum disimpan sudah selesai sebelum sesi admin diakhiri. `);
                                  } else {
                                    return [
                                      createTextVNode(" Pastikan pekerjaan yang belum disimpan sudah selesai sebelum sesi admin diakhiri. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-start gap-3" }, [
                                  createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive" }, [
                                    createVNode(unref(ShieldAlert), {
                                      class: "size-5",
                                      "aria-hidden": "true"
                                    })
                                  ]),
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode(unref(_sfc_main$4), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Keluar dari akun admin?")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$7), { class: "mt-1" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Pastikan pekerjaan yang belum disimpan sudah selesai sebelum sesi admin diakhiri. ")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="space-y-4 px-5 py-5" data-v-85650260${_scopeId3}><div class="rounded-md border bg-card p-3 text-card-foreground" data-v-85650260${_scopeId3}><div class="flex items-center justify-between gap-3" data-v-85650260${_scopeId3}><div class="min-w-0" data-v-85650260${_scopeId3}><p class="text-xs font-medium text-muted-foreground" data-v-85650260${_scopeId3}>Sesi aktif</p><p class="mt-1 truncate text-sm font-semibold" data-v-85650260${_scopeId3}>${ssrInterpolate(unref(user)?.name ?? "Admin")}</p></div><span class="shrink-0 rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary" data-v-85650260${_scopeId3}> Administrator </span></div></div><div class="rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-warning-foreground" data-v-85650260${_scopeId3}> Anda akan diarahkan ke halaman login dan perlu masuk kembali untuk mengakses area admin. </div></div>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "border-t bg-muted/30 px-5 py-4 sm:grid sm:grid-cols-2 sm:justify-normal" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$9), {
                                class: "h-10 w-full",
                                disabled: unref(isLoggingOut)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Tetap di Admin`);
                                  } else {
                                    return [
                                      createTextVNode("Tetap di Admin")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$a), {
                                class: "h-10 w-full bg-destructive text-white hover:bg-destructive/90",
                                disabled: unref(isLoggingOut),
                                onClick: handleConfirmLogout
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(isLoggingOut)) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$e), { class: "size-4" }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(ssrRenderComponent(unref(LogOut), {
                                        class: "size-4",
                                        "aria-hidden": "true"
                                      }, null, _parent6, _scopeId5));
                                    }
                                    _push6(` ${ssrInterpolate(unref(isLoggingOut) ? "Mengakhiri sesi..." : "Keluar Sekarang")}`);
                                  } else {
                                    return [
                                      unref(isLoggingOut) ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                        key: 0,
                                        class: "size-4"
                                      })) : (openBlock(), createBlock(unref(LogOut), {
                                        key: 1,
                                        class: "size-4",
                                        "aria-hidden": "true"
                                      })),
                                      createTextVNode(" " + toDisplayString(unref(isLoggingOut) ? "Mengakhiri sesi..." : "Keluar Sekarang"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$9), {
                                  class: "h-10 w-full",
                                  disabled: unref(isLoggingOut)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Tetap di Admin")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"]),
                                createVNode(unref(_sfc_main$a), {
                                  class: "h-10 w-full bg-destructive text-white hover:bg-destructive/90",
                                  disabled: unref(isLoggingOut),
                                  onClick: withModifiers(handleConfirmLogout, ["prevent"])
                                }, {
                                  default: withCtx(() => [
                                    unref(isLoggingOut) ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                      key: 0,
                                      class: "size-4"
                                    })) : (openBlock(), createBlock(unref(LogOut), {
                                      key: 1,
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    })),
                                    createTextVNode(" " + toDisplayString(unref(isLoggingOut) ? "Mengakhiri sesi..." : "Keluar Sekarang"), 1)
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), { class: "border-b bg-muted/40 px-5 pt-5 pb-4 text-left" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-start gap-3" }, [
                                createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive" }, [
                                  createVNode(unref(ShieldAlert), {
                                    class: "size-5",
                                    "aria-hidden": "true"
                                  })
                                ]),
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode(unref(_sfc_main$4), null, {
                                    default: withCtx(() => [
                                      createTextVNode("Keluar dari akun admin?")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$7), { class: "mt-1" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Pastikan pekerjaan yang belum disimpan sudah selesai sebelum sesi admin diakhiri. ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "space-y-4 px-5 py-5" }, [
                            createVNode("div", { class: "rounded-md border bg-card p-3 text-card-foreground" }, [
                              createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Sesi aktif"),
                                  createVNode("p", { class: "mt-1 truncate text-sm font-semibold" }, toDisplayString(unref(user)?.name ?? "Admin"), 1)
                                ]),
                                createVNode("span", { class: "shrink-0 rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary" }, " Administrator ")
                              ])
                            ]),
                            createVNode("div", { class: "rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-warning-foreground" }, " Anda akan diarahkan ke halaman login dan perlu masuk kembali untuk mengakses area admin. ")
                          ]),
                          createVNode(unref(_sfc_main$6), { class: "border-t bg-muted/30 px-5 py-4 sm:grid sm:grid-cols-2 sm:justify-normal" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), {
                                class: "h-10 w-full",
                                disabled: unref(isLoggingOut)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Tetap di Admin")
                                ]),
                                _: 1
                              }, 8, ["disabled"]),
                              createVNode(unref(_sfc_main$a), {
                                class: "h-10 w-full bg-destructive text-white hover:bg-destructive/90",
                                disabled: unref(isLoggingOut),
                                onClick: withModifiers(handleConfirmLogout, ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  unref(isLoggingOut) ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                    key: 0,
                                    class: "size-4"
                                  })) : (openBlock(), createBlock(unref(LogOut), {
                                    key: 1,
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  })),
                                  createTextVNode(" " + toDisplayString(unref(isLoggingOut) ? "Mengakhiri sesi..." : "Keluar Sekarang"), 1)
                                ]),
                                _: 1
                              }, 8, ["disabled"])
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
                    createVNode(unref(_sfc_main$8), { class: "gap-0 overflow-hidden p-0 sm:max-w-md" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { class: "border-b bg-muted/40 px-5 pt-5 pb-4 text-left" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-start gap-3" }, [
                              createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive" }, [
                                createVNode(unref(ShieldAlert), {
                                  class: "size-5",
                                  "aria-hidden": "true"
                                })
                              ]),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode(unref(_sfc_main$4), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Keluar dari akun admin?")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$7), { class: "mt-1" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Pastikan pekerjaan yang belum disimpan sudah selesai sebelum sesi admin diakhiri. ")
                                  ]),
                                  _: 1
                                })
                              ])
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "space-y-4 px-5 py-5" }, [
                          createVNode("div", { class: "rounded-md border bg-card p-3 text-card-foreground" }, [
                            createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Sesi aktif"),
                                createVNode("p", { class: "mt-1 truncate text-sm font-semibold" }, toDisplayString(unref(user)?.name ?? "Admin"), 1)
                              ]),
                              createVNode("span", { class: "shrink-0 rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary" }, " Administrator ")
                            ])
                          ]),
                          createVNode("div", { class: "rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-warning-foreground" }, " Anda akan diarahkan ke halaman login dan perlu masuk kembali untuk mengakses area admin. ")
                        ]),
                        createVNode(unref(_sfc_main$6), { class: "border-t bg-muted/30 px-5 py-4 sm:grid sm:grid-cols-2 sm:justify-normal" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), {
                              class: "h-10 w-full",
                              disabled: unref(isLoggingOut)
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Tetap di Admin")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(unref(_sfc_main$a), {
                              class: "h-10 w-full bg-destructive text-white hover:bg-destructive/90",
                              disabled: unref(isLoggingOut),
                              onClick: withModifiers(handleConfirmLogout, ["prevent"])
                            }, {
                              default: withCtx(() => [
                                unref(isLoggingOut) ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                  key: 0,
                                  class: "size-4"
                                })) : (openBlock(), createBlock(unref(LogOut), {
                                  key: 1,
                                  class: "size-4",
                                  "aria-hidden": "true"
                                })),
                                createTextVNode(" " + toDisplayString(unref(isLoggingOut) ? "Mengakhiri sesi..." : "Keluar Sekarang"), 1)
                              ]),
                              _: 1
                            }, 8, ["disabled"])
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
              createVNode("a", {
                href: "#admin-main-content",
                class: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring"
              }, " Lewati menu admin "),
              createVNode(AdminSidebar, {
                "logging-out": unref(isLoggingOut),
                onRequestLogout: handleRequestLogout
              }, null, 8, ["logging-out"]),
              createVNode(unref(_sfc_main$i), {
                id: "admin-main-content",
                class: "h-dvh min-h-0 overflow-hidden"
              }, {
                default: withCtx(() => [
                  createVNode("header", { class: "sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background px-3 sm:px-4" }, [
                    createVNode("div", { class: "flex min-w-0 items-center gap-2" }, [
                      createVNode(unref(_sfc_main$c), {
                        class: "h-8 w-8",
                        label: "Buka atau tutup menu admin",
                        title: "Buka atau tutup menu admin"
                      }),
                      createVNode("div", { class: "min-w-0" }, [
                        createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(unref(user)?.name ?? "Admin"), 1),
                        createVNode("p", { class: "truncate text-xs text-muted-foreground" }, " Area kerja admin ")
                      ])
                    ]),
                    createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                      createVNode("div", { class: "hidden sm:block" }, [
                        createVNode(AdminDateTime)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "admin-scrollbar min-h-0 flex-1 overflow-y-auto bg-muted/50" }, [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ])
                ]),
                _: 3
              }),
              createVNode(unref(_sfc_main$d), {
                "rich-colors": "",
                "close-button": "",
                position: "top-right"
              }),
              createVNode(unref(_sfc_main$b), {
                open: unref(isLogoutDialogOpen),
                "onUpdate:open": ($event) => isRef(isLogoutDialogOpen) ? isLogoutDialogOpen.value = $event : null
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$8), { class: "gap-0 overflow-hidden p-0 sm:max-w-md" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), { class: "border-b bg-muted/40 px-5 pt-5 pb-4 text-left" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-start gap-3" }, [
                            createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive" }, [
                              createVNode(unref(ShieldAlert), {
                                class: "size-5",
                                "aria-hidden": "true"
                              })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode(unref(_sfc_main$4), null, {
                                default: withCtx(() => [
                                  createTextVNode("Keluar dari akun admin?")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), { class: "mt-1" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Pastikan pekerjaan yang belum disimpan sudah selesai sebelum sesi admin diakhiri. ")
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "space-y-4 px-5 py-5" }, [
                        createVNode("div", { class: "rounded-md border bg-card p-3 text-card-foreground" }, [
                          createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Sesi aktif"),
                              createVNode("p", { class: "mt-1 truncate text-sm font-semibold" }, toDisplayString(unref(user)?.name ?? "Admin"), 1)
                            ]),
                            createVNode("span", { class: "shrink-0 rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary" }, " Administrator ")
                          ])
                        ]),
                        createVNode("div", { class: "rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-warning-foreground" }, " Anda akan diarahkan ke halaman login dan perlu masuk kembali untuk mengakses area admin. ")
                      ]),
                      createVNode(unref(_sfc_main$6), { class: "border-t bg-muted/30 px-5 py-4 sm:grid sm:grid-cols-2 sm:justify-normal" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$9), {
                            class: "h-10 w-full",
                            disabled: unref(isLoggingOut)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Tetap di Admin")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(unref(_sfc_main$a), {
                            class: "h-10 w-full bg-destructive text-white hover:bg-destructive/90",
                            disabled: unref(isLoggingOut),
                            onClick: withModifiers(handleConfirmLogout, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              unref(isLoggingOut) ? (openBlock(), createBlock(unref(_sfc_main$e), {
                                key: 0,
                                class: "size-4"
                              })) : (openBlock(), createBlock(unref(LogOut), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              })),
                              createTextVNode(" " + toDisplayString(unref(isLoggingOut) ? "Mengakhiri sesi..." : "Keluar Sekarang"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85650260"]]);

export { admin as default };
//# sourceMappingURL=admin-B9x2sxdb.mjs.map
