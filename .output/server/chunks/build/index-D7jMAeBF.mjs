import { defineComponent, ref, computed, watch, mergeProps, unref, isRef, nextTick, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createTextVNode, withModifiers, createCommentVNode, Transition, withDirectives, vModelCheckbox, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderSlot } from 'vue/server-renderer';
import { toast } from 'vue-sonner';
import { C as CashierPageHeader } from './CashierPageHeader-B7q-Byt4.mjs';
import { Search, SlidersHorizontal, PackageSearch, RotateCcw, ShoppingCart, Trash2, PanelRightClose, PanelRightOpen, Receipt, ChevronDown, UserRound, Phone, Utensils, Package, Check, CreditCard, Banknote, QrCode, ReceiptText, CheckCircle2, AlertTriangle, Send, ImageIcon, Minus, Plus } from 'lucide-vue-next';
import { _ as _sfc_main$q } from './index-BZG70idc.mjs';
import { c as cn } from './index-H80jjgLf.mjs';
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaCorner, useForwardPropsEmits, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent, ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui';
import { cva } from 'class-variance-authority';
import { _ as _sfc_main$1$1, a as _sfc_main$u } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$s } from './Label-Cd3JlovY.mjs';
import { r as reactiveOmit } from './server.mjs';
import { _ as _sfc_main$t } from './Separator-DD0IdWG4.mjs';
import { u as useCashierStore, C as CashierCurrency, a as useCashierActionFeedback } from './useCashierStore-FX-02Sh4.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$2, d as _sfc_main$5$1, e as _sfc_main$4$1 } from './DialogTrigger-B5C6UhMx.mjs';
import { a as getCashierReceiptDisplayCode } from './cashier-display-BleBnxPh.mjs';
import { _ as _sfc_main$2$1 } from './NativeSelectOption-BTdv0zYA.mjs';
import { _ as _sfc_main$r } from './Skeleton-CQWwuiK0.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useState } from './state-Dw1r7BQr.mjs';
import 'clsx';
import 'tailwind-merge';
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
import './api-endpoints-aT5YyZ8V.mjs';

const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "card",
        class: unref(cn)(
          "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/card/Card.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "CardAction",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "card-action",
        class: unref(cn)("col-start-2 row-span-2 row-start-1 self-start justify-self-end", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/card/CardAction.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "CardContent",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "card-content",
        class: unref(cn)("px-6", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/card/CardContent.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "CardDescription",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        "data-slot": "card-description",
        class: unref(cn)("text-muted-foreground text-sm", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/card/CardDescription.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "CardFooter",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "card-footer",
        class: unref(cn)("flex items-center px-6 [.border-t]:pt-6", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/card/CardFooter.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "CardHeader",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "card-header",
        class: unref(cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/card/CardHeader.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "CardTitle",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<h3${ssrRenderAttrs(mergeProps({
        "data-slot": "card-title",
        class: unref(cn)("leading-none font-semibold", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</h3>`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/card/CardTitle.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "Collapsible",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    disabled: { type: Boolean },
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleRoot), mergeProps({ "data-slot": "collapsible" }, unref(forwarded), _attrs), {
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
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/collapsible/Collapsible.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleContent), mergeProps({ "data-slot": "collapsible-content" }, props, _attrs), {
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
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/collapsible/CollapsibleContent.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleTrigger), mergeProps({ "data-slot": "collapsible-trigger" }, props, _attrs), {
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
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/collapsible/CollapsibleTrigger.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Empty",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "empty",
        class: unref(cn)(
          "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/empty/Empty.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "EmptyContent",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "empty-content",
        class: unref(cn)(
          "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/empty/EmptyContent.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "EmptyDescription",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        "data-slot": "empty-description",
        class: unref(cn)(
          "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
          _ctx.$attrs.class ?? ""
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/empty/EmptyDescription.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "EmptyHeader",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "empty-header",
        class: unref(cn)(
          "flex max-w-sm flex-col items-center gap-2 text-center",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/empty/EmptyHeader.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "EmptyMedia",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] },
    variant: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "empty-icon",
        "data-variant": __props.variant,
        class: unref(cn)(unref(emptyMediaVariants)({ variant: __props.variant }), props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/empty/EmptyMedia.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "EmptyTitle",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "empty-title",
        class: unref(cn)("text-lg font-medium tracking-tight", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/empty/EmptyTitle.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ScrollBar",
  __ssrInlineRender: true,
  props: {
    orientation: { default: "vertical" },
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ScrollAreaScrollbar), mergeProps({ "data-slot": "scroll-area-scrollbar" }, unref(delegatedProps), {
        class: unref(cn)(
          "flex touch-none p-px transition-colors select-none",
          __props.orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
          __props.orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ScrollAreaThumb), {
              "data-slot": "scroll-area-thumb",
              class: "bg-border relative flex-1 rounded-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ScrollAreaThumb), {
                "data-slot": "scroll-area-thumb",
                class: "bg-border relative flex-1 rounded-full"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/scroll-area/ScrollBar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ScrollArea",
  __ssrInlineRender: true,
  props: {
    type: {},
    dir: {},
    scrollHideDelay: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ScrollAreaRoot), mergeProps({ "data-slot": "scroll-area" }, unref(delegatedProps), {
        class: unref(cn)("relative", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ScrollAreaViewport), {
              "data-slot": "scroll-area-viewport",
              class: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
            }, {
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
            _push2(ssrRenderComponent(_sfc_main$9, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ScrollAreaCorner), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ScrollAreaViewport), {
                "data-slot": "scroll-area-viewport",
                class: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              createVNode(_sfc_main$9),
              createVNode(unref(ScrollAreaCorner))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/scroll-area/ScrollArea.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CashierQuantityControl",
  __ssrInlineRender: true,
  props: {
    label: {},
    quantity: {},
    canIncrement: { type: Boolean, default: true }
  },
  emits: ["decrement", "increment"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex items-center gap-1",
        "aria-label": __props.label
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$q), {
        type: "button",
        variant: "outline",
        size: "icon-sm",
        "aria-label": `Kurangi ${__props.label}`,
        onClick: ($event) => emit("decrement")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Minus), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Minus), {
                class: "size-4",
                "aria-hidden": "true"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<output class="flex h-8 min-w-10 items-center justify-center rounded-md border bg-background px-2 text-sm font-medium">${ssrInterpolate(props.quantity)}</output>`);
      _push(ssrRenderComponent(unref(_sfc_main$q), {
        type: "button",
        variant: "outline",
        size: "icon-sm",
        "aria-label": `Tambah ${__props.label}`,
        disabled: !props.canIncrement,
        onClick: ($event) => emit("increment")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Plus), {
                class: "size-4",
                "aria-hidden": "true"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/molecules/CashierQuantityControl.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const CashierQuantityControl = Object.assign(_sfc_main$7, { __name: "MoleculesCashierQuantityControl" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CashierCartItemRow",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  emits: ["decrement", "increment", "remove"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const canIncrement = computed(() => props.item.quantity < props.item.stock);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "rounded-md border bg-background p-2.5" }, _attrs))}><div class="flex items-start justify-between gap-2"><div class="min-w-0"><p class="truncate text-sm font-medium">${ssrInterpolate(props.item.name)}</p><p class="truncate text-xs text-muted-foreground">`);
      _push(ssrRenderComponent(CashierCurrency, {
        value: props.item.price
      }, null, _parent));
      _push(` per item </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$q), {
        type: "button",
        variant: "ghost",
        size: "icon-sm",
        "aria-label": `Hapus ${props.item.name}`,
        onClick: ($event) => emit("remove", props.item.productId)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Trash2), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Trash2), {
                class: "size-4",
                "aria-hidden": "true"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-2 flex items-center justify-between gap-3">`);
      _push(ssrRenderComponent(CashierQuantityControl, {
        label: props.item.name,
        quantity: props.item.quantity,
        "can-increment": unref(canIncrement),
        onDecrement: ($event) => emit("decrement", props.item.productId),
        onIncrement: ($event) => emit("increment", props.item.productId)
      }, null, _parent));
      _push(`<p class="text-sm font-semibold">`);
      _push(ssrRenderComponent(CashierCurrency, {
        value: props.item.quantity * props.item.price
      }, null, _parent));
      _push(`</p></div></li>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/molecules/CashierCartItemRow.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const CashierCartItemRow = Object.assign(_sfc_main$6, { __name: "MoleculesCashierCartItemRow" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "CashierCartPanel",
  __ssrInlineRender: true,
  props: {
    items: {},
    itemCount: {},
    subtotal: {},
    total: {},
    paymentMethod: {},
    customerName: {},
    customerPhone: {},
    diningOption: {},
    open: { type: Boolean }
  },
  emits: ["decrement", "increment", "remove", "clear", "checkout", "update:open", "update:paymentMethod", "update:customerName", "update:customerPhone", "update:diningOption"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const paymentMethods = ["Tunai", "QRIS"];
    const diningOptions = ["Makan di Tempat", "Bungkus"];
    const areCheckoutDetailsOpen = ref(false);
    const currencyFormatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    const isCartPanelOpen = computed({
      get: () => props.open,
      set: (value) => emit("update:open", value)
    });
    const customerNameModel = computed({
      get: () => props.customerName,
      set: (value) => emit("update:customerName", String(value))
    });
    const customerPhoneModel = computed({
      get: () => props.customerPhone,
      set: (value) => emit("update:customerPhone", String(value))
    });
    const canCheckout = computed(() => props.items.length > 0 && props.customerName.trim().length > 0);
    const checkoutHint = computed(() => {
      if (!props.items.length) {
        return "Tambahkan item ke keranjang untuk melanjutkan.";
      }
      if (!props.customerName.trim()) {
        return areCheckoutDetailsOpen.value ? "Isi nama pelanggan untuk melanjutkan." : "Buka detail transaksi untuk mengisi nama pelanggan.";
      }
      return "";
    });
    const cartPanelToggleTitle = computed(() => {
      const action = isCartPanelOpen.value ? "Tutup panel keranjang" : "Buka panel keranjang";
      return `${action}. ${props.itemCount} item, total ${currencyFormatter.format(props.total).replace(/\s/g, " ")}.`;
    });
    function handleCheckout() {
      if (!canCheckout.value) {
        return;
      }
      emit("checkout");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$p), mergeProps({
        class: ["flex min-h-0 gap-0 overflow-hidden rounded-md py-0 shadow-xs transition-[width] duration-200 ease-linear motion-reduce:transition-none lg:shrink-0", unref(isCartPanelOpen) ? "lg:h-full lg:w-[24rem] lg:self-stretch xl:w-[26rem] 2xl:w-[28rem]" : "w-full lg:h-full lg:w-14 lg:self-stretch"],
        "aria-labelledby": "cart-title"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(``);
            if (unref(isCartPanelOpen)) {
              _push2(ssrRenderComponent(unref(_sfc_main$k), {
                key: "open-header",
                class: "shrink-0 border-b p-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-start justify-between gap-3"${_scopeId2}><div class="min-w-0"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$j), {
                      id: "cart-title",
                      class: "flex items-center gap-2 text-base tracking-normal"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ShoppingCart), {
                            class: "size-4 text-muted-foreground",
                            "aria-hidden": "true"
                          }, null, _parent4, _scopeId3));
                          _push4(` Keranjang `);
                        } else {
                          return [
                            createVNode(unref(ShoppingCart), {
                              class: "size-4 text-muted-foreground",
                              "aria-hidden": "true"
                            }),
                            createTextVNode(" Keranjang ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$m), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(props.itemCount)} item dalam transaksi. `);
                        } else {
                          return [
                            createTextVNode(toDisplayString(props.itemCount) + " item dalam transaksi. ", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="flex shrink-0 items-center gap-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$q), {
                      type: "button",
                      variant: "ghost",
                      size: "icon-sm",
                      disabled: !props.items.length,
                      "aria-label": "Kosongkan keranjang",
                      title: "Kosongkan keranjang",
                      onClick: ($event) => emit("clear")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Trash2), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Trash2), {
                              class: "size-4",
                              "aria-hidden": "true"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$q), {
                      type: "button",
                      variant: "outline",
                      size: "icon-sm",
                      "aria-expanded": unref(isCartPanelOpen),
                      "aria-controls": "cart-panel-body",
                      "aria-label": unref(cartPanelToggleTitle),
                      title: unref(cartPanelToggleTitle),
                      onClick: ($event) => isCartPanelOpen.value = !unref(isCartPanelOpen)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (unref(isCartPanelOpen)) {
                            _push4(ssrRenderComponent(unref(PanelRightClose), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(unref(PanelRightOpen), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }, null, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            unref(isCartPanelOpen) ? (openBlock(), createBlock(unref(PanelRightClose), {
                              key: 0,
                              class: "size-4",
                              "aria-hidden": "true"
                            })) : (openBlock(), createBlock(unref(PanelRightOpen), {
                              key: 1,
                              class: "size-4",
                              "aria-hidden": "true"
                            }))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode(unref(_sfc_main$j), {
                            id: "cart-title",
                            class: "flex items-center gap-2 text-base tracking-normal"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ShoppingCart), {
                                class: "size-4 text-muted-foreground",
                                "aria-hidden": "true"
                              }),
                              createTextVNode(" Keranjang ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(props.itemCount) + " item dalam transaksi. ", 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "flex shrink-0 items-center gap-1" }, [
                          createVNode(unref(_sfc_main$q), {
                            type: "button",
                            variant: "ghost",
                            size: "icon-sm",
                            disabled: !props.items.length,
                            "aria-label": "Kosongkan keranjang",
                            title: "Kosongkan keranjang",
                            onClick: ($event) => emit("clear")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), {
                                class: "size-4",
                                "aria-hidden": "true"
                              })
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode(unref(_sfc_main$q), {
                            type: "button",
                            variant: "outline",
                            size: "icon-sm",
                            "aria-expanded": unref(isCartPanelOpen),
                            "aria-controls": "cart-panel-body",
                            "aria-label": unref(cartPanelToggleTitle),
                            title: unref(cartPanelToggleTitle),
                            onClick: ($event) => isCartPanelOpen.value = !unref(isCartPanelOpen)
                          }, {
                            default: withCtx(() => [
                              unref(isCartPanelOpen) ? (openBlock(), createBlock(unref(PanelRightClose), {
                                key: 0,
                                class: "size-4",
                                "aria-hidden": "true"
                              })) : (openBlock(), createBlock(unref(PanelRightOpen), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              }))
                            ]),
                            _: 1
                          }, 8, ["aria-expanded", "aria-label", "title", "onClick"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(_sfc_main$k), {
                key: "closed-header",
                class: "flex min-h-14 grid-rows-none flex-row items-center justify-between gap-3 border-b-0 p-2 lg:h-full lg:flex-col lg:justify-start"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p id="cart-title" class="sr-only"${_scopeId2}>Keranjang</p>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$q), {
                      type: "button",
                      variant: "outline",
                      size: "icon-sm",
                      "aria-expanded": unref(isCartPanelOpen),
                      "aria-controls": "cart-panel-body",
                      "aria-label": unref(cartPanelToggleTitle),
                      title: unref(cartPanelToggleTitle),
                      onClick: ($event) => isCartPanelOpen.value = true
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(PanelRightOpen), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(PanelRightOpen), {
                              class: "size-4",
                              "aria-hidden": "true"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="flex items-center gap-2 text-center lg:flex-col"${_scopeId2}><span class="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ShoppingCart), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`</span><span class="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground"${_scopeId2}>${ssrInterpolate(props.itemCount)}</span></div><p class="sr-only"${_scopeId2}> Total keranjang `);
                    _push3(ssrRenderComponent(CashierCurrency, {
                      value: props.total
                    }, null, _parent3, _scopeId2));
                    _push3(`. </p>`);
                  } else {
                    return [
                      createVNode("p", {
                        id: "cart-title",
                        class: "sr-only"
                      }, "Keranjang"),
                      createVNode(unref(_sfc_main$q), {
                        type: "button",
                        variant: "outline",
                        size: "icon-sm",
                        "aria-expanded": unref(isCartPanelOpen),
                        "aria-controls": "cart-panel-body",
                        "aria-label": unref(cartPanelToggleTitle),
                        title: unref(cartPanelToggleTitle),
                        onClick: ($event) => isCartPanelOpen.value = true
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(PanelRightOpen), {
                            class: "size-4",
                            "aria-hidden": "true"
                          })
                        ]),
                        _: 1
                      }, 8, ["aria-expanded", "aria-label", "title", "onClick"]),
                      createVNode("div", { class: "flex items-center gap-2 text-center lg:flex-col" }, [
                        createVNode("span", { class: "flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground" }, [
                          createVNode(unref(ShoppingCart), {
                            class: "size-4",
                            "aria-hidden": "true"
                          })
                        ]),
                        createVNode("span", { class: "flex min-h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground" }, toDisplayString(props.itemCount), 1)
                      ]),
                      createVNode("p", { class: "sr-only" }, [
                        createTextVNode(" Total keranjang "),
                        createVNode(CashierCurrency, {
                          value: props.total
                        }, null, 8, ["value"]),
                        createTextVNode(". ")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(``);
            if (unref(isCartPanelOpen)) {
              _push2(`<div id="cart-panel-body" class="flex min-h-0 flex-1 flex-col"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(_sfc_main$n), { class: "min-h-0 flex-1 p-0" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$8), { class: "h-full" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="p-3"${_scopeId3}>`);
                          if (props.items.length) {
                            _push4(`<ul class="space-y-2" aria-label="Item keranjang"${_scopeId3}><!--[-->`);
                            ssrRenderList(props.items, (item) => {
                              _push4(ssrRenderComponent(CashierCartItemRow, {
                                key: item.productId,
                                item,
                                onDecrement: ($event) => emit("decrement", $event),
                                onIncrement: ($event) => emit("increment", $event),
                                onRemove: ($event) => emit("remove", $event)
                              }, null, _parent4, _scopeId3));
                            });
                            _push4(`<!--]--></ul>`);
                          } else {
                            _push4(ssrRenderComponent(unref(_sfc_main$f), { class: "min-h-48 rounded-md border p-6 md:p-6" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$c), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(_sfc_main$b), { variant: "icon" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(Receipt), {
                                                class: "size-5",
                                                "aria-hidden": "true"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(Receipt), {
                                                  class: "size-5",
                                                  "aria-hidden": "true"
                                                })
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(_sfc_main$a), { class: "text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`Belum ada item`);
                                            } else {
                                              return [
                                                createTextVNode("Belum ada item")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(_sfc_main$d), null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(` Pilih produk untuk mulai transaksi. `);
                                            } else {
                                              return [
                                                createTextVNode(" Pilih produk untuk mulai transaksi. ")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(_sfc_main$b), { variant: "icon" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Receipt), {
                                                class: "size-5",
                                                "aria-hidden": "true"
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$a), { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Belum ada item")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$d), null, {
                                            default: withCtx(() => [
                                              createTextVNode(" Pilih produk untuk mulai transaksi. ")
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$b), { variant: "icon" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Receipt), {
                                              class: "size-5",
                                              "aria-hidden": "true"
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$a), { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Belum ada item")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$d), null, {
                                          default: withCtx(() => [
                                            createTextVNode(" Pilih produk untuk mulai transaksi. ")
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
                            }, _parent4, _scopeId3));
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "p-3" }, [
                              props.items.length ? (openBlock(), createBlock("ul", {
                                key: 0,
                                class: "space-y-2",
                                "aria-label": "Item keranjang"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(props.items, (item) => {
                                  return openBlock(), createBlock(CashierCartItemRow, {
                                    key: item.productId,
                                    item,
                                    onDecrement: ($event) => emit("decrement", $event),
                                    onIncrement: ($event) => emit("increment", $event),
                                    onRemove: ($event) => emit("remove", $event)
                                  }, null, 8, ["item", "onDecrement", "onIncrement", "onRemove"]);
                                }), 128))
                              ])) : (openBlock(), createBlock(unref(_sfc_main$f), {
                                key: 1,
                                class: "min-h-48 rounded-md border p-6 md:p-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$b), { variant: "icon" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Receipt), {
                                            class: "size-5",
                                            "aria-hidden": "true"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { class: "text-sm" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Belum ada item")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Pilih produk untuk mulai transaksi. ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }))
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$8), { class: "h-full" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-3" }, [
                            props.items.length ? (openBlock(), createBlock("ul", {
                              key: 0,
                              class: "space-y-2",
                              "aria-label": "Item keranjang"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(props.items, (item) => {
                                return openBlock(), createBlock(CashierCartItemRow, {
                                  key: item.productId,
                                  item,
                                  onDecrement: ($event) => emit("decrement", $event),
                                  onIncrement: ($event) => emit("increment", $event),
                                  onRemove: ($event) => emit("remove", $event)
                                }, null, 8, ["item", "onDecrement", "onIncrement", "onRemove"]);
                              }), 128))
                            ])) : (openBlock(), createBlock(unref(_sfc_main$f), {
                              key: 1,
                              class: "min-h-48 rounded-md border p-6 md:p-6"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$c), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$b), { variant: "icon" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Receipt), {
                                          class: "size-5",
                                          "aria-hidden": "true"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$a), { class: "text-sm" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Belum ada item")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$d), null, {
                                      default: withCtx(() => [
                                        createTextVNode(" Pilih produk untuk mulai transaksi. ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }))
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$l), { class: "block shrink-0 border-t p-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<form class="space-y-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$i), {
                      open: unref(areCheckoutDetailsOpen),
                      "onUpdate:open": ($event) => isRef(areCheckoutDetailsOpen) ? areCheckoutDetailsOpen.value = $event : null
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2"${_scopeId3}><div class="min-w-0"${_scopeId3}><p class="truncate text-sm font-medium"${_scopeId3}>Detail transaksi</p><p class="truncate text-xs text-muted-foreground"${_scopeId3}> Nama pelanggan, tipe pesanan, dan pembayaran. </p></div>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$g), { "as-child": "" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$q), {
                                  type: "button",
                                  variant: "outline",
                                  size: "icon-sm",
                                  "aria-label": unref(areCheckoutDetailsOpen) ? "Sembunyikan detail transaksi" : "Tampilkan detail transaksi",
                                  title: unref(areCheckoutDetailsOpen) ? "Sembunyikan detail transaksi" : "Tampilkan detail transaksi"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(ChevronDown), {
                                        class: ["size-4 transition-transform duration-200 ease-out motion-reduce:transition-none", unref(areCheckoutDetailsOpen) ? "rotate-180" : ""],
                                        "aria-hidden": "true"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(ChevronDown), {
                                          class: ["size-4 transition-transform duration-200 ease-out motion-reduce:transition-none", unref(areCheckoutDetailsOpen) ? "rotate-180" : ""],
                                          "aria-hidden": "true"
                                        }, null, 8, ["class"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$q), {
                                    type: "button",
                                    variant: "outline",
                                    size: "icon-sm",
                                    "aria-label": unref(areCheckoutDetailsOpen) ? "Sembunyikan detail transaksi" : "Tampilkan detail transaksi",
                                    title: unref(areCheckoutDetailsOpen) ? "Sembunyikan detail transaksi" : "Tampilkan detail transaksi"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ChevronDown), {
                                        class: ["size-4 transition-transform duration-200 ease-out motion-reduce:transition-none", unref(areCheckoutDetailsOpen) ? "rotate-180" : ""],
                                        "aria-hidden": "true"
                                      }, null, 8, ["class"])
                                    ]),
                                    _: 1
                                  }, 8, ["aria-label", "title"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                          _push4(ssrRenderComponent(unref(_sfc_main$h), { class: "group/checkout-details overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down motion-reduce:animate-none" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="space-y-3 pt-3 transition-[opacity,transform] duration-200 ease-out group-data-[state=closed]/checkout-details:-translate-y-1 group-data-[state=closed]/checkout-details:opacity-0 group-data-[state=open]/checkout-details:translate-y-0 group-data-[state=open]/checkout-details:opacity-100 motion-reduce:transition-none"${_scopeId4}><div class="grid gap-3"${_scopeId4}><div${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(_sfc_main$s), {
                                  for: "customer-name",
                                  class: "mb-1.5"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(UserRound), {
                                        class: "size-4 text-muted-foreground",
                                        "aria-hidden": "true"
                                      }, null, _parent6, _scopeId5));
                                      _push6(` Nama pelanggan `);
                                    } else {
                                      return [
                                        createVNode(unref(UserRound), {
                                          class: "size-4 text-muted-foreground",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Nama pelanggan ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$1$1), {
                                  id: "customer-name",
                                  modelValue: unref(customerNameModel),
                                  "onUpdate:modelValue": ($event) => isRef(customerNameModel) ? customerNameModel.value = $event : null,
                                  class: "h-10",
                                  placeholder: "Nama pelanggan",
                                  autocomplete: "name",
                                  required: ""
                                }, null, _parent5, _scopeId4));
                                _push5(`</div><div${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(_sfc_main$s), {
                                  for: "customer-phone",
                                  class: "mb-1.5"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(Phone), {
                                        class: "size-4 text-muted-foreground",
                                        "aria-hidden": "true"
                                      }, null, _parent6, _scopeId5));
                                      _push6(` Nomor telepon (opsional) `);
                                    } else {
                                      return [
                                        createVNode(unref(Phone), {
                                          class: "size-4 text-muted-foreground",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Nomor telepon (opsional) ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(_sfc_main$1$1), {
                                  id: "customer-phone",
                                  modelValue: unref(customerPhoneModel),
                                  "onUpdate:modelValue": ($event) => isRef(customerPhoneModel) ? customerPhoneModel.value = $event : null,
                                  type: "tel",
                                  inputmode: "tel",
                                  class: "h-10",
                                  placeholder: "08xxxxxxxxxx",
                                  autocomplete: "tel"
                                }, null, _parent5, _scopeId4));
                                _push5(`</div></div><div${_scopeId4}><p class="mb-2 flex items-center gap-2 text-sm font-medium"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Utensils), {
                                  class: "size-4 text-muted-foreground",
                                  "aria-hidden": "true"
                                }, null, _parent5, _scopeId4));
                                _push5(` Tipe pesanan </p><div class="grid grid-cols-2 gap-2" aria-label="Pilih tipe pesanan"${_scopeId4}><!--[-->`);
                                ssrRenderList(diningOptions, (option) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$q), {
                                    key: option,
                                    type: "button",
                                    size: "sm",
                                    variant: props.diningOption === option ? "default" : "outline",
                                    "aria-pressed": props.diningOption === option,
                                    class: "h-10 justify-between",
                                    onClick: ($event) => emit("update:diningOption", option)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<span class="inline-flex min-w-0 items-center gap-2"${_scopeId5}>`);
                                        if (option === "Makan di Tempat") {
                                          _push6(ssrRenderComponent(unref(Utensils), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(ssrRenderComponent(unref(Package), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }, null, _parent6, _scopeId5));
                                        }
                                        _push6(`<span class="truncate"${_scopeId5}>${ssrInterpolate(option)}</span></span>`);
                                        _push6(ssrRenderComponent(unref(Check), {
                                          class: ["size-4", props.diningOption === option ? "opacity-100" : "opacity-0"],
                                          "aria-hidden": "true"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode("span", { class: "inline-flex min-w-0 items-center gap-2" }, [
                                            option === "Makan di Tempat" ? (openBlock(), createBlock(unref(Utensils), {
                                              key: 0,
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            })) : (openBlock(), createBlock(unref(Package), {
                                              key: 1,
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            })),
                                            createVNode("span", { class: "truncate" }, toDisplayString(option), 1)
                                          ]),
                                          createVNode(unref(Check), {
                                            class: ["size-4", props.diningOption === option ? "opacity-100" : "opacity-0"],
                                            "aria-hidden": "true"
                                          }, null, 8, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]--></div></div><div${_scopeId4}><p class="mb-2 flex items-center gap-2 text-sm font-medium"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(CreditCard), {
                                  class: "size-4 text-muted-foreground",
                                  "aria-hidden": "true"
                                }, null, _parent5, _scopeId4));
                                _push5(` Metode pembayaran </p><div class="grid grid-cols-2 gap-2" aria-label="Pilih metode pembayaran"${_scopeId4}><!--[-->`);
                                ssrRenderList(paymentMethods, (method) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$q), {
                                    key: method,
                                    type: "button",
                                    size: "sm",
                                    variant: props.paymentMethod === method ? "default" : "outline",
                                    "aria-pressed": props.paymentMethod === method,
                                    class: "h-10 justify-between",
                                    onClick: ($event) => emit("update:paymentMethod", method)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<span${_scopeId5}>${ssrInterpolate(method)}</span>`);
                                        _push6(ssrRenderComponent(unref(Check), {
                                          class: ["size-4", props.paymentMethod === method ? "opacity-100" : "opacity-0"],
                                          "aria-hidden": "true"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode("span", null, toDisplayString(method), 1),
                                          createVNode(unref(Check), {
                                            class: ["size-4", props.paymentMethod === method ? "opacity-100" : "opacity-0"],
                                            "aria-hidden": "true"
                                          }, null, 8, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]--></div></div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "space-y-3 pt-3 transition-[opacity,transform] duration-200 ease-out group-data-[state=closed]/checkout-details:-translate-y-1 group-data-[state=closed]/checkout-details:opacity-0 group-data-[state=open]/checkout-details:translate-y-0 group-data-[state=open]/checkout-details:opacity-100 motion-reduce:transition-none" }, [
                                    createVNode("div", { class: "grid gap-3" }, [
                                      createVNode("div", null, [
                                        createVNode(unref(_sfc_main$s), {
                                          for: "customer-name",
                                          class: "mb-1.5"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(UserRound), {
                                              class: "size-4 text-muted-foreground",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Nama pelanggan ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$1$1), {
                                          id: "customer-name",
                                          modelValue: unref(customerNameModel),
                                          "onUpdate:modelValue": ($event) => isRef(customerNameModel) ? customerNameModel.value = $event : null,
                                          class: "h-10",
                                          placeholder: "Nama pelanggan",
                                          autocomplete: "name",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode(unref(_sfc_main$s), {
                                          for: "customer-phone",
                                          class: "mb-1.5"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Phone), {
                                              class: "size-4 text-muted-foreground",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Nomor telepon (opsional) ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$1$1), {
                                          id: "customer-phone",
                                          modelValue: unref(customerPhoneModel),
                                          "onUpdate:modelValue": ($event) => isRef(customerPhoneModel) ? customerPhoneModel.value = $event : null,
                                          type: "tel",
                                          inputmode: "tel",
                                          class: "h-10",
                                          placeholder: "08xxxxxxxxxx",
                                          autocomplete: "tel"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "mb-2 flex items-center gap-2 text-sm font-medium" }, [
                                        createVNode(unref(Utensils), {
                                          class: "size-4 text-muted-foreground",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Tipe pesanan ")
                                      ]),
                                      createVNode("div", {
                                        class: "grid grid-cols-2 gap-2",
                                        "aria-label": "Pilih tipe pesanan"
                                      }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(diningOptions, (option) => {
                                          return createVNode(unref(_sfc_main$q), {
                                            key: option,
                                            type: "button",
                                            size: "sm",
                                            variant: props.diningOption === option ? "default" : "outline",
                                            "aria-pressed": props.diningOption === option,
                                            class: "h-10 justify-between",
                                            onClick: ($event) => emit("update:diningOption", option)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("span", { class: "inline-flex min-w-0 items-center gap-2" }, [
                                                option === "Makan di Tempat" ? (openBlock(), createBlock(unref(Utensils), {
                                                  key: 0,
                                                  class: "size-4",
                                                  "aria-hidden": "true"
                                                })) : (openBlock(), createBlock(unref(Package), {
                                                  key: 1,
                                                  class: "size-4",
                                                  "aria-hidden": "true"
                                                })),
                                                createVNode("span", { class: "truncate" }, toDisplayString(option), 1)
                                              ]),
                                              createVNode(unref(Check), {
                                                class: ["size-4", props.diningOption === option ? "opacity-100" : "opacity-0"],
                                                "aria-hidden": "true"
                                              }, null, 8, ["class"])
                                            ]),
                                            _: 2
                                          }, 1032, ["variant", "aria-pressed", "onClick"]);
                                        }), 64))
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "mb-2 flex items-center gap-2 text-sm font-medium" }, [
                                        createVNode(unref(CreditCard), {
                                          class: "size-4 text-muted-foreground",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Metode pembayaran ")
                                      ]),
                                      createVNode("div", {
                                        class: "grid grid-cols-2 gap-2",
                                        "aria-label": "Pilih metode pembayaran"
                                      }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(paymentMethods, (method) => {
                                          return createVNode(unref(_sfc_main$q), {
                                            key: method,
                                            type: "button",
                                            size: "sm",
                                            variant: props.paymentMethod === method ? "default" : "outline",
                                            "aria-pressed": props.paymentMethod === method,
                                            class: "h-10 justify-between",
                                            onClick: ($event) => emit("update:paymentMethod", method)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("span", null, toDisplayString(method), 1),
                                              createVNode(unref(Check), {
                                                class: ["size-4", props.paymentMethod === method ? "opacity-100" : "opacity-0"],
                                                "aria-hidden": "true"
                                              }, null, 8, ["class"])
                                            ]),
                                            _: 2
                                          }, 1032, ["variant", "aria-pressed", "onClick"]);
                                        }), 64))
                                      ])
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("div", { class: "flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2" }, [
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "truncate text-sm font-medium" }, "Detail transaksi"),
                                createVNode("p", { class: "truncate text-xs text-muted-foreground" }, " Nama pelanggan, tipe pesanan, dan pembayaran. ")
                              ]),
                              createVNode(unref(_sfc_main$g), { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$q), {
                                    type: "button",
                                    variant: "outline",
                                    size: "icon-sm",
                                    "aria-label": unref(areCheckoutDetailsOpen) ? "Sembunyikan detail transaksi" : "Tampilkan detail transaksi",
                                    title: unref(areCheckoutDetailsOpen) ? "Sembunyikan detail transaksi" : "Tampilkan detail transaksi"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ChevronDown), {
                                        class: ["size-4 transition-transform duration-200 ease-out motion-reduce:transition-none", unref(areCheckoutDetailsOpen) ? "rotate-180" : ""],
                                        "aria-hidden": "true"
                                      }, null, 8, ["class"])
                                    ]),
                                    _: 1
                                  }, 8, ["aria-label", "title"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(unref(_sfc_main$h), { class: "group/checkout-details overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down motion-reduce:animate-none" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-3 pt-3 transition-[opacity,transform] duration-200 ease-out group-data-[state=closed]/checkout-details:-translate-y-1 group-data-[state=closed]/checkout-details:opacity-0 group-data-[state=open]/checkout-details:translate-y-0 group-data-[state=open]/checkout-details:opacity-100 motion-reduce:transition-none" }, [
                                  createVNode("div", { class: "grid gap-3" }, [
                                    createVNode("div", null, [
                                      createVNode(unref(_sfc_main$s), {
                                        for: "customer-name",
                                        class: "mb-1.5"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(UserRound), {
                                            class: "size-4 text-muted-foreground",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Nama pelanggan ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$1$1), {
                                        id: "customer-name",
                                        modelValue: unref(customerNameModel),
                                        "onUpdate:modelValue": ($event) => isRef(customerNameModel) ? customerNameModel.value = $event : null,
                                        class: "h-10",
                                        placeholder: "Nama pelanggan",
                                        autocomplete: "name",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode(unref(_sfc_main$s), {
                                        for: "customer-phone",
                                        class: "mb-1.5"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Phone), {
                                            class: "size-4 text-muted-foreground",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Nomor telepon (opsional) ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$1$1), {
                                        id: "customer-phone",
                                        modelValue: unref(customerPhoneModel),
                                        "onUpdate:modelValue": ($event) => isRef(customerPhoneModel) ? customerPhoneModel.value = $event : null,
                                        type: "tel",
                                        inputmode: "tel",
                                        class: "h-10",
                                        placeholder: "08xxxxxxxxxx",
                                        autocomplete: "tel"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "mb-2 flex items-center gap-2 text-sm font-medium" }, [
                                      createVNode(unref(Utensils), {
                                        class: "size-4 text-muted-foreground",
                                        "aria-hidden": "true"
                                      }),
                                      createTextVNode(" Tipe pesanan ")
                                    ]),
                                    createVNode("div", {
                                      class: "grid grid-cols-2 gap-2",
                                      "aria-label": "Pilih tipe pesanan"
                                    }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(diningOptions, (option) => {
                                        return createVNode(unref(_sfc_main$q), {
                                          key: option,
                                          type: "button",
                                          size: "sm",
                                          variant: props.diningOption === option ? "default" : "outline",
                                          "aria-pressed": props.diningOption === option,
                                          class: "h-10 justify-between",
                                          onClick: ($event) => emit("update:diningOption", option)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("span", { class: "inline-flex min-w-0 items-center gap-2" }, [
                                              option === "Makan di Tempat" ? (openBlock(), createBlock(unref(Utensils), {
                                                key: 0,
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              })) : (openBlock(), createBlock(unref(Package), {
                                                key: 1,
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              })),
                                              createVNode("span", { class: "truncate" }, toDisplayString(option), 1)
                                            ]),
                                            createVNode(unref(Check), {
                                              class: ["size-4", props.diningOption === option ? "opacity-100" : "opacity-0"],
                                              "aria-hidden": "true"
                                            }, null, 8, ["class"])
                                          ]),
                                          _: 2
                                        }, 1032, ["variant", "aria-pressed", "onClick"]);
                                      }), 64))
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "mb-2 flex items-center gap-2 text-sm font-medium" }, [
                                      createVNode(unref(CreditCard), {
                                        class: "size-4 text-muted-foreground",
                                        "aria-hidden": "true"
                                      }),
                                      createTextVNode(" Metode pembayaran ")
                                    ]),
                                    createVNode("div", {
                                      class: "grid grid-cols-2 gap-2",
                                      "aria-label": "Pilih metode pembayaran"
                                    }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(paymentMethods, (method) => {
                                        return createVNode(unref(_sfc_main$q), {
                                          key: method,
                                          type: "button",
                                          size: "sm",
                                          variant: props.paymentMethod === method ? "default" : "outline",
                                          "aria-pressed": props.paymentMethod === method,
                                          class: "h-10 justify-between",
                                          onClick: ($event) => emit("update:paymentMethod", method)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("span", null, toDisplayString(method), 1),
                                            createVNode(unref(Check), {
                                              class: ["size-4", props.paymentMethod === method ? "opacity-100" : "opacity-0"],
                                              "aria-hidden": "true"
                                            }, null, 8, ["class"])
                                          ]),
                                          _: 2
                                        }, 1032, ["variant", "aria-pressed", "onClick"]);
                                      }), 64))
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<dl class="space-y-2 text-sm"${_scopeId2}><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Subtotal</dt><dd class="font-medium"${_scopeId2}>`);
                    _push3(ssrRenderComponent(CashierCurrency, {
                      value: props.subtotal
                    }, null, _parent3, _scopeId2));
                    _push3(`</dd></div>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$t), null, null, _parent3, _scopeId2));
                    _push3(`<div class="flex justify-between gap-3 text-base" aria-live="polite"${_scopeId2}><dt class="font-semibold"${_scopeId2}>Total</dt><dd class="font-semibold"${_scopeId2}>`);
                    _push3(ssrRenderComponent(CashierCurrency, {
                      value: props.total
                    }, null, _parent3, _scopeId2));
                    _push3(`</dd></div></dl>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$q), {
                      type: "submit",
                      class: "mt-3 h-11 w-full",
                      disabled: !unref(canCheckout)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Bayar Sekarang `);
                        } else {
                          return [
                            createTextVNode(" Bayar Sekarang ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (unref(checkoutHint)) {
                      _push3(`<p class="text-xs text-muted-foreground" aria-live="polite"${_scopeId2}>${ssrInterpolate(unref(checkoutHint))}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</form>`);
                  } else {
                    return [
                      createVNode("form", {
                        class: "space-y-3",
                        onSubmit: withModifiers(handleCheckout, ["prevent"])
                      }, [
                        createVNode(unref(_sfc_main$i), {
                          open: unref(areCheckoutDetailsOpen),
                          "onUpdate:open": ($event) => isRef(areCheckoutDetailsOpen) ? areCheckoutDetailsOpen.value = $event : null
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2" }, [
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "truncate text-sm font-medium" }, "Detail transaksi"),
                                createVNode("p", { class: "truncate text-xs text-muted-foreground" }, " Nama pelanggan, tipe pesanan, dan pembayaran. ")
                              ]),
                              createVNode(unref(_sfc_main$g), { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$q), {
                                    type: "button",
                                    variant: "outline",
                                    size: "icon-sm",
                                    "aria-label": unref(areCheckoutDetailsOpen) ? "Sembunyikan detail transaksi" : "Tampilkan detail transaksi",
                                    title: unref(areCheckoutDetailsOpen) ? "Sembunyikan detail transaksi" : "Tampilkan detail transaksi"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ChevronDown), {
                                        class: ["size-4 transition-transform duration-200 ease-out motion-reduce:transition-none", unref(areCheckoutDetailsOpen) ? "rotate-180" : ""],
                                        "aria-hidden": "true"
                                      }, null, 8, ["class"])
                                    ]),
                                    _: 1
                                  }, 8, ["aria-label", "title"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(unref(_sfc_main$h), { class: "group/checkout-details overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down motion-reduce:animate-none" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-3 pt-3 transition-[opacity,transform] duration-200 ease-out group-data-[state=closed]/checkout-details:-translate-y-1 group-data-[state=closed]/checkout-details:opacity-0 group-data-[state=open]/checkout-details:translate-y-0 group-data-[state=open]/checkout-details:opacity-100 motion-reduce:transition-none" }, [
                                  createVNode("div", { class: "grid gap-3" }, [
                                    createVNode("div", null, [
                                      createVNode(unref(_sfc_main$s), {
                                        for: "customer-name",
                                        class: "mb-1.5"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(UserRound), {
                                            class: "size-4 text-muted-foreground",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Nama pelanggan ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$1$1), {
                                        id: "customer-name",
                                        modelValue: unref(customerNameModel),
                                        "onUpdate:modelValue": ($event) => isRef(customerNameModel) ? customerNameModel.value = $event : null,
                                        class: "h-10",
                                        placeholder: "Nama pelanggan",
                                        autocomplete: "name",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode(unref(_sfc_main$s), {
                                        for: "customer-phone",
                                        class: "mb-1.5"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Phone), {
                                            class: "size-4 text-muted-foreground",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Nomor telepon (opsional) ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$1$1), {
                                        id: "customer-phone",
                                        modelValue: unref(customerPhoneModel),
                                        "onUpdate:modelValue": ($event) => isRef(customerPhoneModel) ? customerPhoneModel.value = $event : null,
                                        type: "tel",
                                        inputmode: "tel",
                                        class: "h-10",
                                        placeholder: "08xxxxxxxxxx",
                                        autocomplete: "tel"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "mb-2 flex items-center gap-2 text-sm font-medium" }, [
                                      createVNode(unref(Utensils), {
                                        class: "size-4 text-muted-foreground",
                                        "aria-hidden": "true"
                                      }),
                                      createTextVNode(" Tipe pesanan ")
                                    ]),
                                    createVNode("div", {
                                      class: "grid grid-cols-2 gap-2",
                                      "aria-label": "Pilih tipe pesanan"
                                    }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(diningOptions, (option) => {
                                        return createVNode(unref(_sfc_main$q), {
                                          key: option,
                                          type: "button",
                                          size: "sm",
                                          variant: props.diningOption === option ? "default" : "outline",
                                          "aria-pressed": props.diningOption === option,
                                          class: "h-10 justify-between",
                                          onClick: ($event) => emit("update:diningOption", option)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("span", { class: "inline-flex min-w-0 items-center gap-2" }, [
                                              option === "Makan di Tempat" ? (openBlock(), createBlock(unref(Utensils), {
                                                key: 0,
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              })) : (openBlock(), createBlock(unref(Package), {
                                                key: 1,
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              })),
                                              createVNode("span", { class: "truncate" }, toDisplayString(option), 1)
                                            ]),
                                            createVNode(unref(Check), {
                                              class: ["size-4", props.diningOption === option ? "opacity-100" : "opacity-0"],
                                              "aria-hidden": "true"
                                            }, null, 8, ["class"])
                                          ]),
                                          _: 2
                                        }, 1032, ["variant", "aria-pressed", "onClick"]);
                                      }), 64))
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", { class: "mb-2 flex items-center gap-2 text-sm font-medium" }, [
                                      createVNode(unref(CreditCard), {
                                        class: "size-4 text-muted-foreground",
                                        "aria-hidden": "true"
                                      }),
                                      createTextVNode(" Metode pembayaran ")
                                    ]),
                                    createVNode("div", {
                                      class: "grid grid-cols-2 gap-2",
                                      "aria-label": "Pilih metode pembayaran"
                                    }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(paymentMethods, (method) => {
                                        return createVNode(unref(_sfc_main$q), {
                                          key: method,
                                          type: "button",
                                          size: "sm",
                                          variant: props.paymentMethod === method ? "default" : "outline",
                                          "aria-pressed": props.paymentMethod === method,
                                          class: "h-10 justify-between",
                                          onClick: ($event) => emit("update:paymentMethod", method)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("span", null, toDisplayString(method), 1),
                                            createVNode(unref(Check), {
                                              class: ["size-4", props.paymentMethod === method ? "opacity-100" : "opacity-0"],
                                              "aria-hidden": "true"
                                            }, null, 8, ["class"])
                                          ]),
                                          _: 2
                                        }, 1032, ["variant", "aria-pressed", "onClick"]);
                                      }), 64))
                                    ])
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["open", "onUpdate:open"]),
                        createVNode("dl", { class: "space-y-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Subtotal"),
                            createVNode("dd", { class: "font-medium" }, [
                              createVNode(CashierCurrency, {
                                value: props.subtotal
                              }, null, 8, ["value"])
                            ])
                          ]),
                          createVNode(unref(_sfc_main$t)),
                          createVNode("div", {
                            class: "flex justify-between gap-3 text-base",
                            "aria-live": "polite"
                          }, [
                            createVNode("dt", { class: "font-semibold" }, "Total"),
                            createVNode("dd", { class: "font-semibold" }, [
                              createVNode(CashierCurrency, {
                                value: props.total
                              }, null, 8, ["value"])
                            ])
                          ])
                        ]),
                        createVNode(unref(_sfc_main$q), {
                          type: "submit",
                          class: "mt-3 h-11 w-full",
                          disabled: !unref(canCheckout)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Bayar Sekarang ")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        unref(checkoutHint) ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-muted-foreground",
                          "aria-live": "polite"
                        }, toDisplayString(unref(checkoutHint)), 1)) : createCommentVNode("", true)
                      ], 32)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(Transition, {
                mode: "out-in",
                "enter-active-class": "transition-opacity duration-150 ease-linear motion-reduce:transition-none",
                "enter-from-class": "opacity-0",
                "enter-to-class": "opacity-100",
                "leave-active-class": "transition-opacity duration-100 ease-linear motion-reduce:transition-none",
                "leave-from-class": "opacity-100",
                "leave-to-class": "opacity-0"
              }, {
                default: withCtx(() => [
                  unref(isCartPanelOpen) ? (openBlock(), createBlock(unref(_sfc_main$k), {
                    key: "open-header",
                    class: "shrink-0 border-b p-3"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-start justify-between gap-3" }, [
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode(unref(_sfc_main$j), {
                            id: "cart-title",
                            class: "flex items-center gap-2 text-base tracking-normal"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ShoppingCart), {
                                class: "size-4 text-muted-foreground",
                                "aria-hidden": "true"
                              }),
                              createTextVNode(" Keranjang ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(props.itemCount) + " item dalam transaksi. ", 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "flex shrink-0 items-center gap-1" }, [
                          createVNode(unref(_sfc_main$q), {
                            type: "button",
                            variant: "ghost",
                            size: "icon-sm",
                            disabled: !props.items.length,
                            "aria-label": "Kosongkan keranjang",
                            title: "Kosongkan keranjang",
                            onClick: ($event) => emit("clear")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), {
                                class: "size-4",
                                "aria-hidden": "true"
                              })
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode(unref(_sfc_main$q), {
                            type: "button",
                            variant: "outline",
                            size: "icon-sm",
                            "aria-expanded": unref(isCartPanelOpen),
                            "aria-controls": "cart-panel-body",
                            "aria-label": unref(cartPanelToggleTitle),
                            title: unref(cartPanelToggleTitle),
                            onClick: ($event) => isCartPanelOpen.value = !unref(isCartPanelOpen)
                          }, {
                            default: withCtx(() => [
                              unref(isCartPanelOpen) ? (openBlock(), createBlock(unref(PanelRightClose), {
                                key: 0,
                                class: "size-4",
                                "aria-hidden": "true"
                              })) : (openBlock(), createBlock(unref(PanelRightOpen), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              }))
                            ]),
                            _: 1
                          }, 8, ["aria-expanded", "aria-label", "title", "onClick"])
                        ])
                      ])
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(unref(_sfc_main$k), {
                    key: "closed-header",
                    class: "flex min-h-14 grid-rows-none flex-row items-center justify-between gap-3 border-b-0 p-2 lg:h-full lg:flex-col lg:justify-start"
                  }, {
                    default: withCtx(() => [
                      createVNode("p", {
                        id: "cart-title",
                        class: "sr-only"
                      }, "Keranjang"),
                      createVNode(unref(_sfc_main$q), {
                        type: "button",
                        variant: "outline",
                        size: "icon-sm",
                        "aria-expanded": unref(isCartPanelOpen),
                        "aria-controls": "cart-panel-body",
                        "aria-label": unref(cartPanelToggleTitle),
                        title: unref(cartPanelToggleTitle),
                        onClick: ($event) => isCartPanelOpen.value = true
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(PanelRightOpen), {
                            class: "size-4",
                            "aria-hidden": "true"
                          })
                        ]),
                        _: 1
                      }, 8, ["aria-expanded", "aria-label", "title", "onClick"]),
                      createVNode("div", { class: "flex items-center gap-2 text-center lg:flex-col" }, [
                        createVNode("span", { class: "flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground" }, [
                          createVNode(unref(ShoppingCart), {
                            class: "size-4",
                            "aria-hidden": "true"
                          })
                        ]),
                        createVNode("span", { class: "flex min-h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground" }, toDisplayString(props.itemCount), 1)
                      ]),
                      createVNode("p", { class: "sr-only" }, [
                        createTextVNode(" Total keranjang "),
                        createVNode(CashierCurrency, {
                          value: props.total
                        }, null, 8, ["value"]),
                        createTextVNode(". ")
                      ])
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(Transition, {
                "enter-active-class": "transition-opacity duration-150 ease-linear motion-reduce:transition-none",
                "enter-from-class": "opacity-0",
                "enter-to-class": "opacity-100",
                "leave-active-class": "transition-opacity duration-100 ease-linear motion-reduce:transition-none",
                "leave-from-class": "opacity-100",
                "leave-to-class": "opacity-0"
              }, {
                default: withCtx(() => [
                  unref(isCartPanelOpen) ? (openBlock(), createBlock("div", {
                    key: 0,
                    id: "cart-panel-body",
                    class: "flex min-h-0 flex-1 flex-col"
                  }, [
                    createVNode(unref(_sfc_main$n), { class: "min-h-0 flex-1 p-0" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$8), { class: "h-full" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "p-3" }, [
                              props.items.length ? (openBlock(), createBlock("ul", {
                                key: 0,
                                class: "space-y-2",
                                "aria-label": "Item keranjang"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(props.items, (item) => {
                                  return openBlock(), createBlock(CashierCartItemRow, {
                                    key: item.productId,
                                    item,
                                    onDecrement: ($event) => emit("decrement", $event),
                                    onIncrement: ($event) => emit("increment", $event),
                                    onRemove: ($event) => emit("remove", $event)
                                  }, null, 8, ["item", "onDecrement", "onIncrement", "onRemove"]);
                                }), 128))
                              ])) : (openBlock(), createBlock(unref(_sfc_main$f), {
                                key: 1,
                                class: "min-h-48 rounded-md border p-6 md:p-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$c), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$b), { variant: "icon" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Receipt), {
                                            class: "size-5",
                                            "aria-hidden": "true"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$a), { class: "text-sm" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Belum ada item")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$d), null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Pilih produk untuk mulai transaksi. ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }))
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$l), { class: "block shrink-0 border-t p-3" }, {
                      default: withCtx(() => [
                        createVNode("form", {
                          class: "space-y-3",
                          onSubmit: withModifiers(handleCheckout, ["prevent"])
                        }, [
                          createVNode(unref(_sfc_main$i), {
                            open: unref(areCheckoutDetailsOpen),
                            "onUpdate:open": ($event) => isRef(areCheckoutDetailsOpen) ? areCheckoutDetailsOpen.value = $event : null
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2" }, [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "truncate text-sm font-medium" }, "Detail transaksi"),
                                  createVNode("p", { class: "truncate text-xs text-muted-foreground" }, " Nama pelanggan, tipe pesanan, dan pembayaran. ")
                                ]),
                                createVNode(unref(_sfc_main$g), { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$q), {
                                      type: "button",
                                      variant: "outline",
                                      size: "icon-sm",
                                      "aria-label": unref(areCheckoutDetailsOpen) ? "Sembunyikan detail transaksi" : "Tampilkan detail transaksi",
                                      title: unref(areCheckoutDetailsOpen) ? "Sembunyikan detail transaksi" : "Tampilkan detail transaksi"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(ChevronDown), {
                                          class: ["size-4 transition-transform duration-200 ease-out motion-reduce:transition-none", unref(areCheckoutDetailsOpen) ? "rotate-180" : ""],
                                          "aria-hidden": "true"
                                        }, null, 8, ["class"])
                                      ]),
                                      _: 1
                                    }, 8, ["aria-label", "title"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(unref(_sfc_main$h), { class: "group/checkout-details overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down motion-reduce:animate-none" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-3 pt-3 transition-[opacity,transform] duration-200 ease-out group-data-[state=closed]/checkout-details:-translate-y-1 group-data-[state=closed]/checkout-details:opacity-0 group-data-[state=open]/checkout-details:translate-y-0 group-data-[state=open]/checkout-details:opacity-100 motion-reduce:transition-none" }, [
                                    createVNode("div", { class: "grid gap-3" }, [
                                      createVNode("div", null, [
                                        createVNode(unref(_sfc_main$s), {
                                          for: "customer-name",
                                          class: "mb-1.5"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(UserRound), {
                                              class: "size-4 text-muted-foreground",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Nama pelanggan ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$1$1), {
                                          id: "customer-name",
                                          modelValue: unref(customerNameModel),
                                          "onUpdate:modelValue": ($event) => isRef(customerNameModel) ? customerNameModel.value = $event : null,
                                          class: "h-10",
                                          placeholder: "Nama pelanggan",
                                          autocomplete: "name",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode(unref(_sfc_main$s), {
                                          for: "customer-phone",
                                          class: "mb-1.5"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Phone), {
                                              class: "size-4 text-muted-foreground",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Nomor telepon (opsional) ")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$1$1), {
                                          id: "customer-phone",
                                          modelValue: unref(customerPhoneModel),
                                          "onUpdate:modelValue": ($event) => isRef(customerPhoneModel) ? customerPhoneModel.value = $event : null,
                                          type: "tel",
                                          inputmode: "tel",
                                          class: "h-10",
                                          placeholder: "08xxxxxxxxxx",
                                          autocomplete: "tel"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "mb-2 flex items-center gap-2 text-sm font-medium" }, [
                                        createVNode(unref(Utensils), {
                                          class: "size-4 text-muted-foreground",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Tipe pesanan ")
                                      ]),
                                      createVNode("div", {
                                        class: "grid grid-cols-2 gap-2",
                                        "aria-label": "Pilih tipe pesanan"
                                      }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(diningOptions, (option) => {
                                          return createVNode(unref(_sfc_main$q), {
                                            key: option,
                                            type: "button",
                                            size: "sm",
                                            variant: props.diningOption === option ? "default" : "outline",
                                            "aria-pressed": props.diningOption === option,
                                            class: "h-10 justify-between",
                                            onClick: ($event) => emit("update:diningOption", option)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("span", { class: "inline-flex min-w-0 items-center gap-2" }, [
                                                option === "Makan di Tempat" ? (openBlock(), createBlock(unref(Utensils), {
                                                  key: 0,
                                                  class: "size-4",
                                                  "aria-hidden": "true"
                                                })) : (openBlock(), createBlock(unref(Package), {
                                                  key: 1,
                                                  class: "size-4",
                                                  "aria-hidden": "true"
                                                })),
                                                createVNode("span", { class: "truncate" }, toDisplayString(option), 1)
                                              ]),
                                              createVNode(unref(Check), {
                                                class: ["size-4", props.diningOption === option ? "opacity-100" : "opacity-0"],
                                                "aria-hidden": "true"
                                              }, null, 8, ["class"])
                                            ]),
                                            _: 2
                                          }, 1032, ["variant", "aria-pressed", "onClick"]);
                                        }), 64))
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "mb-2 flex items-center gap-2 text-sm font-medium" }, [
                                        createVNode(unref(CreditCard), {
                                          class: "size-4 text-muted-foreground",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Metode pembayaran ")
                                      ]),
                                      createVNode("div", {
                                        class: "grid grid-cols-2 gap-2",
                                        "aria-label": "Pilih metode pembayaran"
                                      }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(paymentMethods, (method) => {
                                          return createVNode(unref(_sfc_main$q), {
                                            key: method,
                                            type: "button",
                                            size: "sm",
                                            variant: props.paymentMethod === method ? "default" : "outline",
                                            "aria-pressed": props.paymentMethod === method,
                                            class: "h-10 justify-between",
                                            onClick: ($event) => emit("update:paymentMethod", method)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("span", null, toDisplayString(method), 1),
                                              createVNode(unref(Check), {
                                                class: ["size-4", props.paymentMethod === method ? "opacity-100" : "opacity-0"],
                                                "aria-hidden": "true"
                                              }, null, 8, ["class"])
                                            ]),
                                            _: 2
                                          }, 1032, ["variant", "aria-pressed", "onClick"]);
                                        }), 64))
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["open", "onUpdate:open"]),
                          createVNode("dl", { class: "space-y-2 text-sm" }, [
                            createVNode("div", { class: "flex justify-between gap-3" }, [
                              createVNode("dt", { class: "text-muted-foreground" }, "Subtotal"),
                              createVNode("dd", { class: "font-medium" }, [
                                createVNode(CashierCurrency, {
                                  value: props.subtotal
                                }, null, 8, ["value"])
                              ])
                            ]),
                            createVNode(unref(_sfc_main$t)),
                            createVNode("div", {
                              class: "flex justify-between gap-3 text-base",
                              "aria-live": "polite"
                            }, [
                              createVNode("dt", { class: "font-semibold" }, "Total"),
                              createVNode("dd", { class: "font-semibold" }, [
                                createVNode(CashierCurrency, {
                                  value: props.total
                                }, null, 8, ["value"])
                              ])
                            ])
                          ]),
                          createVNode(unref(_sfc_main$q), {
                            type: "submit",
                            class: "mt-3 h-11 w-full",
                            disabled: !unref(canCheckout)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Bayar Sekarang ")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          unref(checkoutHint) ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-muted-foreground",
                            "aria-live": "polite"
                          }, toDisplayString(unref(checkoutHint)), 1)) : createCommentVNode("", true)
                        ], 32)
                      ]),
                      _: 1
                    })
                  ])) : createCommentVNode("", true)
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/CashierCartPanel.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const CashierCartPanel = Object.assign(_sfc_main$5, { __name: "OrganismsCashierCartPanel" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CashierPaymentDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    paymentMethod: {},
    items: {},
    total: {},
    itemCount: {},
    customerName: {},
    diningOption: {},
    submitting: { type: Boolean, default: false }
  },
  emits: ["update:open", "update:paymentMethod", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const paymentMethods = ["Tunai", "QRIS"];
    const cashReceived = ref("");
    const errorMessage = ref("");
    const qrisConfirmed = ref(false);
    const dialogOpen = computed({
      get: () => props.open,
      set: (value) => emit("update:open", value)
    });
    const isCashPayment = computed(() => props.paymentMethod === "Tunai");
    const cashReceivedText = computed(() => String(cashReceived.value).trim());
    const hasCashReceived = computed(() => cashReceivedText.value.length > 0);
    const normalizedCashReceived = computed(() => Number(cashReceivedText.value));
    const hasValidCashReceived = computed(() => hasCashReceived.value && Number.isFinite(normalizedCashReceived.value) && normalizedCashReceived.value >= 0);
    const cashChange = computed(() => {
      if (!hasValidCashReceived.value) {
        return 0;
      }
      return normalizedCashReceived.value - props.total;
    });
    const canCompletePayment = computed(() => {
      if (props.itemCount <= 0) {
        return false;
      }
      if (isCashPayment.value) {
        return hasValidCashReceived.value && cashChange.value >= 0;
      }
      return qrisConfirmed.value === true;
    });
    const changeStateClass = computed(() => {
      if (!hasCashReceived.value) {
        return "border-muted bg-muted/30 text-muted-foreground";
      }
      if (!hasValidCashReceived.value || cashChange.value < 0) {
        return "border-destructive/40 bg-destructive/10 text-destructive";
      }
      return "border-success/40 bg-success/10 text-success";
    });
    const changeLabel = computed(() => {
      if (!hasCashReceived.value) {
        return "Masukkan uang diterima untuk menghitung kembalian.";
      }
      if (!hasValidCashReceived.value) {
        return "Nominal uang diterima tidak valid.";
      }
      if (cashChange.value < 0) {
        return "Uang diterima masih kurang.";
      }
      if (cashChange.value === 0) {
        return "Uang diterima pas.";
      }
      return "Kembalian pelanggan.";
    });
    const cashRecommendations = computed(() => {
      const roundUp = (value, step) => Math.ceil(value / step) * step;
      const candidates = [
        props.total,
        roundUp(props.total, 5e3),
        roundUp(props.total, 1e4),
        roundUp(props.total, 5e4),
        roundUp(props.total, 1e5)
      ];
      return [...new Set(candidates)].filter((value) => value >= props.total).slice(0, 4);
    });
    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        cashReceived.value = "";
        errorMessage.value = "";
        qrisConfirmed.value = false;
      }
    });
    watch(() => props.paymentMethod, () => {
      cashReceived.value = "";
      errorMessage.value = "";
      qrisConfirmed.value = false;
    });
    function applyCashRecommendation(value) {
      cashReceived.value = String(value);
      errorMessage.value = "";
    }
    function selectPaymentMethod(method) {
      emit("update:paymentMethod", method);
      cashReceived.value = "";
      errorMessage.value = "";
      qrisConfirmed.value = false;
    }
    function handleSubmit() {
      if (props.submitting) {
        return;
      }
      errorMessage.value = "";
      if (props.itemCount <= 0) {
        errorMessage.value = "Keranjang kosong.";
        return;
      }
      if (isCashPayment.value) {
        if (!hasCashReceived.value) {
          errorMessage.value = "Nominal tunai yang diterima wajib diisi.";
          return;
        }
        if (!hasValidCashReceived.value) {
          errorMessage.value = "Nominal tunai tidak valid.";
          return;
        }
        if (cashChange.value < 0) {
          errorMessage.value = "Nominal tunai belum mencukupi total pesanan.";
          return;
        }
      } else if (!canCompletePayment.value) {
        errorMessage.value = "Konfirmasi pembayaran QRIS wajib dicentang.";
        return;
      }
      emit("submit", {
        cashReceived: isCashPayment.value ? normalizedCashReceived.value : null,
        cashChange: isCashPayment.value ? cashChange.value : 0
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
                        if (unref(isCashPayment)) {
                          _push4(ssrRenderComponent(unref(Banknote), {
                            class: "size-5",
                            "aria-hidden": "true"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(QrCode), {
                            class: "size-5",
                            "aria-hidden": "true"
                          }, null, _parent4, _scopeId3));
                        }
                        _push4(`</span><div class="min-w-0"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(isCashPayment) ? "Pembayaran Tunai" : "Konfirmasi QRIS Statis")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(isCashPayment) ? "Pembayaran Tunai" : "Konfirmasi QRIS Statis"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), { class: "mt-1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(isCashPayment) ? "Masukkan uang tunai yang diterima dari pelanggan." : "Pastikan pembayaran QRIS statis sudah diterima sebelum transaksi disimpan.")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(isCashPayment) ? "Masukkan uang tunai yang diterima dari pelanggan." : "Pastikan pembayaran QRIS statis sudah diterima sebelum transaksi disimpan."), 1)
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
                              unref(isCashPayment) ? (openBlock(), createBlock(unref(Banknote), {
                                key: 0,
                                class: "size-5",
                                "aria-hidden": "true"
                              })) : (openBlock(), createBlock(unref(QrCode), {
                                key: 1,
                                class: "size-5",
                                "aria-hidden": "true"
                              }))
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode(unref(_sfc_main$1$2), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(isCashPayment) ? "Pembayaran Tunai" : "Konfirmasi QRIS Statis"), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(isCashPayment) ? "Masukkan uang tunai yang diterima dari pelanggan." : "Pastikan pembayaran QRIS statis sudah diterima sebelum transaksi disimpan."), 1)
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
                  _push3(`<form class="space-y-4 px-5 py-5"${ssrRenderAttr("aria-busy", props.submitting)}${_scopeId2}>`);
                  if (unref(errorMessage)) {
                    _push3(`<p id="payment-error" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"${_scopeId2}>${ssrInterpolate(unref(errorMessage))}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="rounded-md border border-primary/20 bg-primary/10 p-4"${_scopeId2}><div class="flex items-center justify-between gap-3"${_scopeId2}><div class="flex min-w-0 items-center gap-2 text-sm font-medium text-primary"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ReceiptText), {
                    class: "size-4 shrink-0",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="truncate"${_scopeId2}>${ssrInterpolate(props.itemCount)} item untuk ${ssrInterpolate(props.customerName)}</span></div><span class="shrink-0 rounded-md border border-primary/20 bg-background/80 px-2 py-1 text-xs font-medium text-primary"${_scopeId2}>${ssrInterpolate(props.paymentMethod)}</span></div><dl class="mt-3 grid gap-2 text-sm"${_scopeId2}><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Tipe pesanan</dt><dd class="font-medium"${_scopeId2}>${ssrInterpolate(props.diningOption)}</dd></div><div class="flex justify-between gap-3 text-lg"${_scopeId2}><dt class="font-semibold"${_scopeId2}>Total</dt><dd class="font-semibold"${_scopeId2}>`);
                  _push3(ssrRenderComponent(CashierCurrency, {
                    value: props.total
                  }, null, _parent3, _scopeId2));
                  _push3(`</dd></div></dl></div><section class="rounded-md border bg-card p-3" aria-labelledby="payment-items-title"${_scopeId2}><div class="mb-2 flex items-center justify-between gap-3"${_scopeId2}><h3 id="payment-items-title" class="text-sm font-semibold tracking-normal"${_scopeId2}> Detail pesanan </h3><span class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(props.itemCount)} item</span></div><ul class="max-h-40 space-y-2 overflow-y-auto pr-1" aria-label="Item yang dipesan"${_scopeId2}><!--[-->`);
                  ssrRenderList(props.items, (item) => {
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
                  _push3(`<!--]--></ul></section><section class="space-y-2" aria-labelledby="payment-method-title"${_scopeId2}><h3 id="payment-method-title" class="text-sm font-medium"${_scopeId2}> Metode pembayaran </h3><div class="grid grid-cols-2 gap-2" role="radiogroup" aria-labelledby="payment-method-title"${_scopeId2}><!--[-->`);
                  ssrRenderList(paymentMethods, (method) => {
                    _push3(`<button type="button" role="radio" class="${ssrRenderClass([props.paymentMethod === method ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : "bg-background hover:bg-accent hover:text-accent-foreground", "inline-flex h-10 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"])}"${ssrRenderAttr("aria-checked", props.paymentMethod === method)}${ssrIncludeBooleanAttr(props.submitting) ? " disabled" : ""}${_scopeId2}>`);
                    if (method === "Tunai") {
                      _push3(ssrRenderComponent(unref(Banknote), {
                        class: "size-4",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(QrCode), {
                        class: "size-4",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                    }
                    _push3(` ${ssrInterpolate(method)}</button>`);
                  });
                  _push3(`<!--]--></div></section>`);
                  if (unref(isCashPayment)) {
                    _push3(`<!--[--><div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$s), { for: "cash-received" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Uang diterima`);
                        } else {
                          return [
                            createTextVNode("Uang diterima")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$1$1), {
                      id: "cash-received",
                      modelValue: unref(cashReceived),
                      "onUpdate:modelValue": ($event) => isRef(cashReceived) ? cashReceived.value = $event : null,
                      class: "h-11 text-base font-medium",
                      inputmode: "numeric",
                      min: "0",
                      type: "number",
                      placeholder: "Contoh: 50000",
                      required: "",
                      "aria-invalid": unref(errorMessage) ? true : void 0,
                      "aria-describedby": unref(errorMessage) ? "payment-error cash-change" : "cash-change",
                      disabled: props.submitting
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Rekomendasi uang diterima"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(cashRecommendations), (recommendation) => {
                      _push3(`<button type="button" class="inline-flex h-9 min-w-0 items-center justify-center rounded-md border bg-background px-2 text-xs font-medium transition-colors hover:bg-accent focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"${ssrIncludeBooleanAttr(props.submitting) ? " disabled" : ""}${_scopeId2}><span class="truncate"${_scopeId2}>`);
                      _push3(ssrRenderComponent(CashierCurrency, { value: recommendation }, null, _parent3, _scopeId2));
                      _push3(`</span></button>`);
                    });
                    _push3(`<!--]--></div></div><div id="cash-change" aria-live="polite" class="${ssrRenderClass(["rounded-md border p-3 text-sm", unref(changeStateClass)])}"${_scopeId2}><div class="flex items-center justify-between gap-3"${_scopeId2}><div class="flex min-w-0 items-center gap-3"${_scopeId2}><span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-background/70"${_scopeId2}>`);
                    if (unref(hasValidCashReceived) && unref(cashChange) >= 0) {
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
                    _push3(`</span><div class="min-w-0"${_scopeId2}><p class="font-medium"${_scopeId2}>${ssrInterpolate(unref(changeLabel))}</p><p class="mt-0.5 text-xs opacity-90"${_scopeId2}>Kembalian</p></div></div><strong class="shrink-0 text-base"${_scopeId2}>`);
                    _push3(ssrRenderComponent(CashierCurrency, { value: unref(cashChange) }, null, _parent3, _scopeId2));
                    _push3(`</strong></div></div><!--]-->`);
                  } else {
                    _push3(`<!--[--><div class="rounded-md border border-info/30 bg-info/10 p-4"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}><span class="flex size-10 shrink-0 items-center justify-center rounded-md bg-background/70 text-info"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(QrCode), {
                      class: "size-5",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`</span><div class="min-w-0"${_scopeId2}><p class="text-sm font-medium text-info"${_scopeId2}>QRIS statis restoran</p><p class="mt-1 text-sm text-muted-foreground"${_scopeId2}> Sistem tidak membuat QRIS baru. Minta pelanggan membayar ke QRIS statis restoran, lalu konfirmasi setelah pembayaran diterima. </p></div></div></div><div class="flex items-start gap-3 rounded-md border bg-background p-3"${_scopeId2}><input id="qris-confirmed"${ssrIncludeBooleanAttr(Array.isArray(unref(qrisConfirmed)) ? ssrLooseContain(unref(qrisConfirmed), null) : unref(qrisConfirmed)) ? " checked" : ""} type="checkbox" class="mt-0.5 size-4 shrink-0 accent-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"${ssrRenderAttr("aria-invalid", unref(errorMessage) ? true : void 0)}${ssrRenderAttr("aria-describedby", unref(errorMessage) ? "payment-error" : void 0)}${ssrIncludeBooleanAttr(props.submitting) ? " disabled" : ""}${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$s), {
                      for: "qris-confirmed",
                      class: "grid gap-1 leading-normal"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span${_scopeId3}>Pembayaran QRIS sudah diterima</span><span class="text-xs font-normal text-muted-foreground"${_scopeId3}>Centang setelah saldo/pembayaran sudah dipastikan masuk.</span>`);
                        } else {
                          return [
                            createVNode("span", null, "Pembayaran QRIS sudah diterima"),
                            createVNode("span", { class: "text-xs font-normal text-muted-foreground" }, "Centang setelah saldo/pembayaran sudah dipastikan masuk.")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div><!--]-->`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$4$1), { class: "grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 sm:justify-normal" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$q), {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$q), {
                          type: "submit",
                          class: "h-11 w-full",
                          disabled: !unref(canCompletePayment) || props.submitting
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (props.submitting) {
                                _push5(ssrRenderComponent(unref(_sfc_main$u), { class: "size-4" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(CreditCard), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(` ${ssrInterpolate(props.submitting ? "Memproses..." : "Selesaikan Pembayaran")}`);
                            } else {
                              return [
                                props.submitting ? (openBlock(), createBlock(unref(_sfc_main$u), {
                                  key: 0,
                                  class: "size-4"
                                })) : (openBlock(), createBlock(unref(CreditCard), {
                                  key: 1,
                                  class: "size-4",
                                  "aria-hidden": "true"
                                })),
                                createTextVNode(" " + toDisplayString(props.submitting ? "Memproses..." : "Selesaikan Pembayaran"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$q), {
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
                          createVNode(unref(_sfc_main$q), {
                            type: "submit",
                            class: "h-11 w-full",
                            disabled: !unref(canCompletePayment) || props.submitting
                          }, {
                            default: withCtx(() => [
                              props.submitting ? (openBlock(), createBlock(unref(_sfc_main$u), {
                                key: 0,
                                class: "size-4"
                              })) : (openBlock(), createBlock(unref(CreditCard), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              })),
                              createTextVNode(" " + toDisplayString(props.submitting ? "Memproses..." : "Selesaikan Pembayaran"), 1)
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
                    createVNode(unref(_sfc_main$3$1), { class: "border-b px-5 pt-5 pb-4" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" }, [
                            unref(isCashPayment) ? (openBlock(), createBlock(unref(Banknote), {
                              key: 0,
                              class: "size-5",
                              "aria-hidden": "true"
                            })) : (openBlock(), createBlock(unref(QrCode), {
                              key: 1,
                              class: "size-5",
                              "aria-hidden": "true"
                            }))
                          ]),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode(unref(_sfc_main$1$2), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(isCashPayment) ? "Pembayaran Tunai" : "Konfirmasi QRIS Statis"), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(isCashPayment) ? "Masukkan uang tunai yang diterima dari pelanggan." : "Pastikan pembayaran QRIS statis sudah diterima sebelum transaksi disimpan."), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4 px-5 py-5",
                      "aria-busy": props.submitting,
                      onSubmit: withModifiers(handleSubmit, ["prevent"])
                    }, [
                      unref(errorMessage) ? (openBlock(), createBlock("p", {
                        key: 0,
                        id: "payment-error",
                        class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                      }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "rounded-md border border-primary/20 bg-primary/10 p-4" }, [
                        createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                          createVNode("div", { class: "flex min-w-0 items-center gap-2 text-sm font-medium text-primary" }, [
                            createVNode(unref(ReceiptText), {
                              class: "size-4 shrink-0",
                              "aria-hidden": "true"
                            }),
                            createVNode("span", { class: "truncate" }, toDisplayString(props.itemCount) + " item untuk " + toDisplayString(props.customerName), 1)
                          ]),
                          createVNode("span", { class: "shrink-0 rounded-md border border-primary/20 bg-background/80 px-2 py-1 text-xs font-medium text-primary" }, toDisplayString(props.paymentMethod), 1)
                        ]),
                        createVNode("dl", { class: "mt-3 grid gap-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Tipe pesanan"),
                            createVNode("dd", { class: "font-medium" }, toDisplayString(props.diningOption), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between gap-3 text-lg" }, [
                            createVNode("dt", { class: "font-semibold" }, "Total"),
                            createVNode("dd", { class: "font-semibold" }, [
                              createVNode(CashierCurrency, {
                                value: props.total
                              }, null, 8, ["value"])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "payment-items-title"
                      }, [
                        createVNode("div", { class: "mb-2 flex items-center justify-between gap-3" }, [
                          createVNode("h3", {
                            id: "payment-items-title",
                            class: "text-sm font-semibold tracking-normal"
                          }, " Detail pesanan "),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(props.itemCount) + " item", 1)
                        ]),
                        createVNode("ul", {
                          class: "max-h-40 space-y-2 overflow-y-auto pr-1",
                          "aria-label": "Item yang dipesan"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.items, (item) => {
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
                        ])
                      ]),
                      createVNode("section", {
                        class: "space-y-2",
                        "aria-labelledby": "payment-method-title"
                      }, [
                        createVNode("h3", {
                          id: "payment-method-title",
                          class: "text-sm font-medium"
                        }, " Metode pembayaran "),
                        createVNode("div", {
                          class: "grid grid-cols-2 gap-2",
                          role: "radiogroup",
                          "aria-labelledby": "payment-method-title"
                        }, [
                          (openBlock(), createBlock(Fragment, null, renderList(paymentMethods, (method) => {
                            return createVNode("button", {
                              key: method,
                              type: "button",
                              role: "radio",
                              class: ["inline-flex h-10 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none", props.paymentMethod === method ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : "bg-background hover:bg-accent hover:text-accent-foreground"],
                              "aria-checked": props.paymentMethod === method,
                              disabled: props.submitting,
                              onClick: ($event) => selectPaymentMethod(method)
                            }, [
                              method === "Tunai" ? (openBlock(), createBlock(unref(Banknote), {
                                key: 0,
                                class: "size-4",
                                "aria-hidden": "true"
                              })) : (openBlock(), createBlock(unref(QrCode), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              })),
                              createTextVNode(" " + toDisplayString(method), 1)
                            ], 10, ["aria-checked", "disabled", "onClick"]);
                          }), 64))
                        ])
                      ]),
                      unref(isCashPayment) ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$s), { for: "cash-received" }, {
                            default: withCtx(() => [
                              createTextVNode("Uang diterima")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$1$1), {
                            id: "cash-received",
                            modelValue: unref(cashReceived),
                            "onUpdate:modelValue": ($event) => isRef(cashReceived) ? cashReceived.value = $event : null,
                            class: "h-11 text-base font-medium",
                            inputmode: "numeric",
                            min: "0",
                            type: "number",
                            placeholder: "Contoh: 50000",
                            required: "",
                            "aria-invalid": unref(errorMessage) ? true : void 0,
                            "aria-describedby": unref(errorMessage) ? "payment-error cash-change" : "cash-change",
                            disabled: props.submitting
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled"]),
                          createVNode("div", {
                            class: "grid grid-cols-2 gap-2 sm:grid-cols-4",
                            "aria-label": "Rekomendasi uang diterima"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(cashRecommendations), (recommendation) => {
                              return openBlock(), createBlock("button", {
                                key: recommendation,
                                type: "button",
                                class: "inline-flex h-9 min-w-0 items-center justify-center rounded-md border bg-background px-2 text-xs font-medium transition-colors hover:bg-accent focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                                disabled: props.submitting,
                                onClick: ($event) => applyCashRecommendation(recommendation)
                              }, [
                                createVNode("span", { class: "truncate" }, [
                                  createVNode(CashierCurrency, { value: recommendation }, null, 8, ["value"])
                                ])
                              ], 8, ["disabled", "onClick"]);
                            }), 128))
                          ])
                        ]),
                        createVNode("div", {
                          id: "cash-change",
                          "aria-live": "polite",
                          class: ["rounded-md border p-3 text-sm", unref(changeStateClass)]
                        }, [
                          createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                            createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [
                              createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center rounded-md bg-background/70" }, [
                                unref(hasValidCashReceived) && unref(cashChange) >= 0 ? (openBlock(), createBlock(unref(CheckCircle2), {
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
                                createVNode("p", { class: "font-medium" }, toDisplayString(unref(changeLabel)), 1),
                                createVNode("p", { class: "mt-0.5 text-xs opacity-90" }, "Kembalian")
                              ])
                            ]),
                            createVNode("strong", { class: "shrink-0 text-base" }, [
                              createVNode(CashierCurrency, { value: unref(cashChange) }, null, 8, ["value"])
                            ])
                          ])
                        ], 2)
                      ], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                        createVNode("div", { class: "rounded-md border border-info/30 bg-info/10 p-4" }, [
                          createVNode("div", { class: "flex items-start gap-3" }, [
                            createVNode("span", { class: "flex size-10 shrink-0 items-center justify-center rounded-md bg-background/70 text-info" }, [
                              createVNode(unref(QrCode), {
                                class: "size-5",
                                "aria-hidden": "true"
                              })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "text-sm font-medium text-info" }, "QRIS statis restoran"),
                              createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Sistem tidak membuat QRIS baru. Minta pelanggan membayar ke QRIS statis restoran, lalu konfirmasi setelah pembayaran diterima. ")
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex items-start gap-3 rounded-md border bg-background p-3" }, [
                          withDirectives(createVNode("input", {
                            id: "qris-confirmed",
                            "onUpdate:modelValue": ($event) => isRef(qrisConfirmed) ? qrisConfirmed.value = $event : null,
                            type: "checkbox",
                            class: "mt-0.5 size-4 shrink-0 accent-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                            "aria-invalid": unref(errorMessage) ? true : void 0,
                            "aria-describedby": unref(errorMessage) ? "payment-error" : void 0,
                            disabled: props.submitting,
                            onChange: ($event) => errorMessage.value = ""
                          }, null, 40, ["onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled", "onChange"]), [
                            [vModelCheckbox, unref(qrisConfirmed)]
                          ]),
                          createVNode(unref(_sfc_main$s), {
                            for: "qris-confirmed",
                            class: "grid gap-1 leading-normal"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, "Pembayaran QRIS sudah diterima"),
                              createVNode("span", { class: "text-xs font-normal text-muted-foreground" }, "Centang setelah saldo/pembayaran sudah dipastikan masuk.")
                            ]),
                            _: 1
                          })
                        ])
                      ], 64)),
                      createVNode(unref(_sfc_main$4$1), { class: "grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 sm:justify-normal" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$q), {
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
                          createVNode(unref(_sfc_main$q), {
                            type: "submit",
                            class: "h-11 w-full",
                            disabled: !unref(canCompletePayment) || props.submitting
                          }, {
                            default: withCtx(() => [
                              props.submitting ? (openBlock(), createBlock(unref(_sfc_main$u), {
                                key: 0,
                                class: "size-4"
                              })) : (openBlock(), createBlock(unref(CreditCard), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              })),
                              createTextVNode(" " + toDisplayString(props.submitting ? "Memproses..." : "Selesaikan Pembayaran"), 1)
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
              createVNode(unref(_sfc_main$6$1), { class: "gap-0 p-0 sm:max-w-lg" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$1), { class: "border-b px-5 pt-5 pb-4" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" }, [
                          unref(isCashPayment) ? (openBlock(), createBlock(unref(Banknote), {
                            key: 0,
                            class: "size-5",
                            "aria-hidden": "true"
                          })) : (openBlock(), createBlock(unref(QrCode), {
                            key: 1,
                            class: "size-5",
                            "aria-hidden": "true"
                          }))
                        ]),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode(unref(_sfc_main$1$2), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(isCashPayment) ? "Pembayaran Tunai" : "Konfirmasi QRIS Statis"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(isCashPayment) ? "Masukkan uang tunai yang diterima dari pelanggan." : "Pastikan pembayaran QRIS statis sudah diterima sebelum transaksi disimpan."), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4 px-5 py-5",
                    "aria-busy": props.submitting,
                    onSubmit: withModifiers(handleSubmit, ["prevent"])
                  }, [
                    unref(errorMessage) ? (openBlock(), createBlock("p", {
                      key: 0,
                      id: "payment-error",
                      class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true),
                    createVNode("div", { class: "rounded-md border border-primary/20 bg-primary/10 p-4" }, [
                      createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                        createVNode("div", { class: "flex min-w-0 items-center gap-2 text-sm font-medium text-primary" }, [
                          createVNode(unref(ReceiptText), {
                            class: "size-4 shrink-0",
                            "aria-hidden": "true"
                          }),
                          createVNode("span", { class: "truncate" }, toDisplayString(props.itemCount) + " item untuk " + toDisplayString(props.customerName), 1)
                        ]),
                        createVNode("span", { class: "shrink-0 rounded-md border border-primary/20 bg-background/80 px-2 py-1 text-xs font-medium text-primary" }, toDisplayString(props.paymentMethod), 1)
                      ]),
                      createVNode("dl", { class: "mt-3 grid gap-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Tipe pesanan"),
                          createVNode("dd", { class: "font-medium" }, toDisplayString(props.diningOption), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between gap-3 text-lg" }, [
                          createVNode("dt", { class: "font-semibold" }, "Total"),
                          createVNode("dd", { class: "font-semibold" }, [
                            createVNode(CashierCurrency, {
                              value: props.total
                            }, null, 8, ["value"])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "payment-items-title"
                    }, [
                      createVNode("div", { class: "mb-2 flex items-center justify-between gap-3" }, [
                        createVNode("h3", {
                          id: "payment-items-title",
                          class: "text-sm font-semibold tracking-normal"
                        }, " Detail pesanan "),
                        createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(props.itemCount) + " item", 1)
                      ]),
                      createVNode("ul", {
                        class: "max-h-40 space-y-2 overflow-y-auto pr-1",
                        "aria-label": "Item yang dipesan"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(props.items, (item) => {
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
                      ])
                    ]),
                    createVNode("section", {
                      class: "space-y-2",
                      "aria-labelledby": "payment-method-title"
                    }, [
                      createVNode("h3", {
                        id: "payment-method-title",
                        class: "text-sm font-medium"
                      }, " Metode pembayaran "),
                      createVNode("div", {
                        class: "grid grid-cols-2 gap-2",
                        role: "radiogroup",
                        "aria-labelledby": "payment-method-title"
                      }, [
                        (openBlock(), createBlock(Fragment, null, renderList(paymentMethods, (method) => {
                          return createVNode("button", {
                            key: method,
                            type: "button",
                            role: "radio",
                            class: ["inline-flex h-10 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none", props.paymentMethod === method ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : "bg-background hover:bg-accent hover:text-accent-foreground"],
                            "aria-checked": props.paymentMethod === method,
                            disabled: props.submitting,
                            onClick: ($event) => selectPaymentMethod(method)
                          }, [
                            method === "Tunai" ? (openBlock(), createBlock(unref(Banknote), {
                              key: 0,
                              class: "size-4",
                              "aria-hidden": "true"
                            })) : (openBlock(), createBlock(unref(QrCode), {
                              key: 1,
                              class: "size-4",
                              "aria-hidden": "true"
                            })),
                            createTextVNode(" " + toDisplayString(method), 1)
                          ], 10, ["aria-checked", "disabled", "onClick"]);
                        }), 64))
                      ])
                    ]),
                    unref(isCashPayment) ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$s), { for: "cash-received" }, {
                          default: withCtx(() => [
                            createTextVNode("Uang diterima")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$1$1), {
                          id: "cash-received",
                          modelValue: unref(cashReceived),
                          "onUpdate:modelValue": ($event) => isRef(cashReceived) ? cashReceived.value = $event : null,
                          class: "h-11 text-base font-medium",
                          inputmode: "numeric",
                          min: "0",
                          type: "number",
                          placeholder: "Contoh: 50000",
                          required: "",
                          "aria-invalid": unref(errorMessage) ? true : void 0,
                          "aria-describedby": unref(errorMessage) ? "payment-error cash-change" : "cash-change",
                          disabled: props.submitting
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled"]),
                        createVNode("div", {
                          class: "grid grid-cols-2 gap-2 sm:grid-cols-4",
                          "aria-label": "Rekomendasi uang diterima"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(cashRecommendations), (recommendation) => {
                            return openBlock(), createBlock("button", {
                              key: recommendation,
                              type: "button",
                              class: "inline-flex h-9 min-w-0 items-center justify-center rounded-md border bg-background px-2 text-xs font-medium transition-colors hover:bg-accent focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                              disabled: props.submitting,
                              onClick: ($event) => applyCashRecommendation(recommendation)
                            }, [
                              createVNode("span", { class: "truncate" }, [
                                createVNode(CashierCurrency, { value: recommendation }, null, 8, ["value"])
                              ])
                            ], 8, ["disabled", "onClick"]);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", {
                        id: "cash-change",
                        "aria-live": "polite",
                        class: ["rounded-md border p-3 text-sm", unref(changeStateClass)]
                      }, [
                        createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                          createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [
                            createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center rounded-md bg-background/70" }, [
                              unref(hasValidCashReceived) && unref(cashChange) >= 0 ? (openBlock(), createBlock(unref(CheckCircle2), {
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
                              createVNode("p", { class: "font-medium" }, toDisplayString(unref(changeLabel)), 1),
                              createVNode("p", { class: "mt-0.5 text-xs opacity-90" }, "Kembalian")
                            ])
                          ]),
                          createVNode("strong", { class: "shrink-0 text-base" }, [
                            createVNode(CashierCurrency, { value: unref(cashChange) }, null, 8, ["value"])
                          ])
                        ])
                      ], 2)
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                      createVNode("div", { class: "rounded-md border border-info/30 bg-info/10 p-4" }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode("span", { class: "flex size-10 shrink-0 items-center justify-center rounded-md bg-background/70 text-info" }, [
                            createVNode(unref(QrCode), {
                              class: "size-5",
                              "aria-hidden": "true"
                            })
                          ]),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-info" }, "QRIS statis restoran"),
                            createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, " Sistem tidak membuat QRIS baru. Minta pelanggan membayar ke QRIS statis restoran, lalu konfirmasi setelah pembayaran diterima. ")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex items-start gap-3 rounded-md border bg-background p-3" }, [
                        withDirectives(createVNode("input", {
                          id: "qris-confirmed",
                          "onUpdate:modelValue": ($event) => isRef(qrisConfirmed) ? qrisConfirmed.value = $event : null,
                          type: "checkbox",
                          class: "mt-0.5 size-4 shrink-0 accent-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                          "aria-invalid": unref(errorMessage) ? true : void 0,
                          "aria-describedby": unref(errorMessage) ? "payment-error" : void 0,
                          disabled: props.submitting,
                          onChange: ($event) => errorMessage.value = ""
                        }, null, 40, ["onUpdate:modelValue", "aria-invalid", "aria-describedby", "disabled", "onChange"]), [
                          [vModelCheckbox, unref(qrisConfirmed)]
                        ]),
                        createVNode(unref(_sfc_main$s), {
                          for: "qris-confirmed",
                          class: "grid gap-1 leading-normal"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Pembayaran QRIS sudah diterima"),
                            createVNode("span", { class: "text-xs font-normal text-muted-foreground" }, "Centang setelah saldo/pembayaran sudah dipastikan masuk.")
                          ]),
                          _: 1
                        })
                      ])
                    ], 64)),
                    createVNode(unref(_sfc_main$4$1), { class: "grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 sm:justify-normal" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$q), {
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
                        createVNode(unref(_sfc_main$q), {
                          type: "submit",
                          class: "h-11 w-full",
                          disabled: !unref(canCompletePayment) || props.submitting
                        }, {
                          default: withCtx(() => [
                            props.submitting ? (openBlock(), createBlock(unref(_sfc_main$u), {
                              key: 0,
                              class: "size-4"
                            })) : (openBlock(), createBlock(unref(CreditCard), {
                              key: 1,
                              class: "size-4",
                              "aria-hidden": "true"
                            })),
                            createTextVNode(" " + toDisplayString(props.submitting ? "Memproses..." : "Selesaikan Pembayaran"), 1)
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/CashierPaymentDialog.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const CashierPaymentDialog = Object.assign(_sfc_main$4, { __name: "OrganismsCashierPaymentDialog" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CashierPaymentSuccessDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    receipt: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isSendingReceipt = ref(false);
    const { runCashierAction } = useCashierActionFeedback();
    const { sendReceiptToCustomer } = useCashierStore();
    const dialogOpen = computed({
      get: () => props.open,
      set: (value) => emit("update:open", value)
    });
    const receiptPhone = computed(() => {
      const phone = props.receipt?.customerPhone.trim() ?? "";
      if (!phone || phone === "-") {
        return "";
      }
      return phone;
    });
    const canSendReceipt = computed(() => Boolean(props.receipt && receiptPhone.value));
    const receiptDisplayCode = computed(() => props.receipt ? getCashierReceiptDisplayCode(props.receipt) : "-");
    const successDescription = computed(() => {
      if (!props.receipt) {
        return "Data struk belum tersedia.";
      }
      if (canSendReceipt.value) {
        return "Transaksi sudah tersimpan dan struk siap dikirim lewat WhatsApp.";
      }
      return "Transaksi sudah tersimpan. Nomor WhatsApp tidak diisi di detail transaksi.";
    });
    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        isSendingReceipt.value = false;
      }
    });
    async function sendReceipt() {
      const receipt = props.receipt;
      await runCashierAction(async () => {
        if (!receipt) {
          throw new Error("Data struk belum tersedia.");
        }
        if (!receiptPhone.value) {
          throw new Error("Nomor WhatsApp pelanggan tidak diisi.");
        }
        return await sendReceiptToCustomer(receipt);
      }, {
        loading: isSendingReceipt,
        successMessage: "Struk dikirim ke WhatsApp",
        successDescription: (result) => result.message,
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
                        _push4(`<div class="flex items-start gap-3"${_scopeId3}><span class="flex size-11 shrink-0 items-center justify-center rounded-md bg-success/10 text-success"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(CheckCircle2), {
                          class: "size-5",
                          "aria-hidden": "true"
                        }, null, _parent4, _scopeId3));
                        _push4(`</span><div class="min-w-0"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pembayaran berhasil`);
                            } else {
                              return [
                                createTextVNode("Pembayaran berhasil")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), { class: "mt-1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(successDescription))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(successDescription)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-start gap-3" }, [
                            createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md bg-success/10 text-success" }, [
                              createVNode(unref(CheckCircle2), {
                                class: "size-5",
                                "aria-hidden": "true"
                              })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode(unref(_sfc_main$1$2), null, {
                                default: withCtx(() => [
                                  createTextVNode("Pembayaran berhasil")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(successDescription)), 1)
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
                  if (props.receipt) {
                    _push3(`<div class="space-y-4 px-5 py-5"${_scopeId2}><div class="rounded-md border border-success/30 bg-success/10 p-4"${_scopeId2}><div class="flex items-center justify-between gap-3"${_scopeId2}><div class="min-w-0"${_scopeId2}><p class="text-sm font-medium text-success"${_scopeId2}>Transaksi lunas</p><p class="mt-1 truncate text-lg font-semibold"${_scopeId2}>${ssrInterpolate(unref(receiptDisplayCode))}</p></div><span class="shrink-0 rounded-md border border-success/30 bg-background/80 px-2 py-1 text-xs font-medium text-success"${_scopeId2}>${ssrInterpolate(props.receipt.paymentMethod)}</span></div></div><section class="rounded-md border bg-card p-3" aria-labelledby="receipt-summary-title"${_scopeId2}><div class="mb-3 flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ReceiptText), {
                      class: "size-4 text-muted-foreground",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 id="receipt-summary-title" class="text-sm font-semibold"${_scopeId2}> Ringkasan struk </h3></div><dl class="grid gap-2 text-sm"${_scopeId2}><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Waktu</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.receipt.paidAt)}</dd></div><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Pelanggan</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.receipt.customerName)}</dd></div>`);
                    if (props.receipt.customerPhone !== "-") {
                      _push3(`<div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>WhatsApp</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.receipt.customerPhone)}</dd></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Tipe pesanan</dt><dd class="text-right font-medium"${_scopeId2}>${ssrInterpolate(props.receipt.diningOption)}</dd></div></dl></section><section class="rounded-md border bg-card p-3" aria-labelledby="receipt-items-title"${_scopeId2}><div class="mb-2 flex items-center justify-between gap-3"${_scopeId2}><h3 id="receipt-items-title" class="text-sm font-semibold"${_scopeId2}> Item pesanan </h3><span class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(props.receipt.itemCount)} item</span></div><ul class="max-h-44 space-y-2 overflow-y-auto pr-1" aria-label="Item yang dibayar"${_scopeId2}><!--[-->`);
                    ssrRenderList(props.receipt.items, (item) => {
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
                    _push3(`<!--]--></ul></section><section class="rounded-md border bg-card p-3" aria-labelledby="receipt-total-title"${_scopeId2}><h3 id="receipt-total-title" class="sr-only"${_scopeId2}> Ringkasan pembayaran </h3><dl class="grid gap-2 text-sm"${_scopeId2}><div class="flex justify-between gap-3 text-base"${_scopeId2}><dt class="font-semibold"${_scopeId2}>Total</dt><dd class="font-semibold"${_scopeId2}>`);
                    _push3(ssrRenderComponent(CashierCurrency, {
                      value: props.receipt.total
                    }, null, _parent3, _scopeId2));
                    _push3(`</dd></div>`);
                    if (props.receipt.cashReceived !== null) {
                      _push3(`<!--[--><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Uang diterima</dt><dd class="font-medium"${_scopeId2}>`);
                      _push3(ssrRenderComponent(CashierCurrency, {
                        value: props.receipt.cashReceived
                      }, null, _parent3, _scopeId2));
                      _push3(`</dd></div><div class="flex justify-between gap-3"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Kembalian</dt><dd class="font-medium"${_scopeId2}>`);
                      _push3(ssrRenderComponent(CashierCurrency, {
                        value: props.receipt.cashChange
                      }, null, _parent3, _scopeId2));
                      _push3(`</dd></div><!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</dl></section>`);
                    if (props.receipt && !unref(canSendReceipt)) {
                      _push3(`<p class="flex items-start gap-2 rounded-md border border-warning/50 bg-warning/15 px-3 py-2 text-sm text-muted-foreground" aria-live="polite"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(AlertTriangle), {
                        class: "mt-0.5 size-4 shrink-0 text-warning",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>Nomor WhatsApp tidak diisi di awal transaksi, jadi struk tidak bisa dikirim.</span></p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="px-5 py-5"${_scopeId2}><p class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"${_scopeId2}> Data struk tidak tersedia. </p></div>`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$4$1), { class: "grid grid-cols-1 gap-2 border-t px-5 py-4 sm:grid-cols-2 sm:justify-normal" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$q), {
                          type: "button",
                          variant: "outline",
                          class: "h-11 w-full",
                          onClick: ($event) => dialogOpen.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(RotateCcw), {
                                class: "size-4",
                                "aria-hidden": "true"
                              }, null, _parent5, _scopeId4));
                              _push5(` Transaksi Baru `);
                            } else {
                              return [
                                createVNode(unref(RotateCcw), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                }),
                                createTextVNode(" Transaksi Baru ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$q), {
                          type: "button",
                          class: "h-11 w-full",
                          disabled: !unref(canSendReceipt) || unref(isSendingReceipt),
                          title: unref(canSendReceipt) ? "Kirim struk ke WhatsApp pelanggan" : "Nomor WhatsApp belum diisi",
                          onClick: sendReceipt
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(isSendingReceipt)) {
                                _push5(ssrRenderComponent(unref(_sfc_main$u), { class: "size-4" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(Send), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(` ${ssrInterpolate(unref(isSendingReceipt) ? "Mengirim..." : "Kirim Struk")}`);
                            } else {
                              return [
                                unref(isSendingReceipt) ? (openBlock(), createBlock(unref(_sfc_main$u), {
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
                          createVNode(unref(_sfc_main$q), {
                            type: "button",
                            variant: "outline",
                            class: "h-11 w-full",
                            onClick: ($event) => dialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(RotateCcw), {
                                class: "size-4",
                                "aria-hidden": "true"
                              }),
                              createTextVNode(" Transaksi Baru ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$q), {
                            type: "button",
                            class: "h-11 w-full",
                            disabled: !unref(canSendReceipt) || unref(isSendingReceipt),
                            title: unref(canSendReceipt) ? "Kirim struk ke WhatsApp pelanggan" : "Nomor WhatsApp belum diisi",
                            onClick: sendReceipt
                          }, {
                            default: withCtx(() => [
                              unref(isSendingReceipt) ? (openBlock(), createBlock(unref(_sfc_main$u), {
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
                          createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md bg-success/10 text-success" }, [
                            createVNode(unref(CheckCircle2), {
                              class: "size-5",
                              "aria-hidden": "true"
                            })
                          ]),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode(unref(_sfc_main$1$2), null, {
                              default: withCtx(() => [
                                createTextVNode("Pembayaran berhasil")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(successDescription)), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    props.receipt ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4 px-5 py-5"
                    }, [
                      createVNode("div", { class: "rounded-md border border-success/30 bg-success/10 p-4" }, [
                        createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-success" }, "Transaksi lunas"),
                            createVNode("p", { class: "mt-1 truncate text-lg font-semibold" }, toDisplayString(unref(receiptDisplayCode)), 1)
                          ]),
                          createVNode("span", { class: "shrink-0 rounded-md border border-success/30 bg-background/80 px-2 py-1 text-xs font-medium text-success" }, toDisplayString(props.receipt.paymentMethod), 1)
                        ])
                      ]),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "receipt-summary-title"
                      }, [
                        createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                          createVNode(unref(ReceiptText), {
                            class: "size-4 text-muted-foreground",
                            "aria-hidden": "true"
                          }),
                          createVNode("h3", {
                            id: "receipt-summary-title",
                            class: "text-sm font-semibold"
                          }, " Ringkasan struk ")
                        ]),
                        createVNode("dl", { class: "grid gap-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Waktu"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.receipt.paidAt), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Pelanggan"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.receipt.customerName), 1)
                          ]),
                          props.receipt.customerPhone !== "-" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-between gap-3"
                          }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "WhatsApp"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.receipt.customerPhone), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Tipe pesanan"),
                            createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.receipt.diningOption), 1)
                          ])
                        ])
                      ]),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "receipt-items-title"
                      }, [
                        createVNode("div", { class: "mb-2 flex items-center justify-between gap-3" }, [
                          createVNode("h3", {
                            id: "receipt-items-title",
                            class: "text-sm font-semibold"
                          }, " Item pesanan "),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(props.receipt.itemCount) + " item", 1)
                        ]),
                        createVNode("ul", {
                          class: "max-h-44 space-y-2 overflow-y-auto pr-1",
                          "aria-label": "Item yang dibayar"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.receipt.items, (item) => {
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
                        ])
                      ]),
                      createVNode("section", {
                        class: "rounded-md border bg-card p-3",
                        "aria-labelledby": "receipt-total-title"
                      }, [
                        createVNode("h3", {
                          id: "receipt-total-title",
                          class: "sr-only"
                        }, " Ringkasan pembayaran "),
                        createVNode("dl", { class: "grid gap-2 text-sm" }, [
                          createVNode("div", { class: "flex justify-between gap-3 text-base" }, [
                            createVNode("dt", { class: "font-semibold" }, "Total"),
                            createVNode("dd", { class: "font-semibold" }, [
                              createVNode(CashierCurrency, {
                                value: props.receipt.total
                              }, null, 8, ["value"])
                            ])
                          ]),
                          props.receipt.cashReceived !== null ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode("div", { class: "flex justify-between gap-3" }, [
                              createVNode("dt", { class: "text-muted-foreground" }, "Uang diterima"),
                              createVNode("dd", { class: "font-medium" }, [
                                createVNode(CashierCurrency, {
                                  value: props.receipt.cashReceived
                                }, null, 8, ["value"])
                              ])
                            ]),
                            createVNode("div", { class: "flex justify-between gap-3" }, [
                              createVNode("dt", { class: "text-muted-foreground" }, "Kembalian"),
                              createVNode("dd", { class: "font-medium" }, [
                                createVNode(CashierCurrency, {
                                  value: props.receipt.cashChange
                                }, null, 8, ["value"])
                              ])
                            ])
                          ], 64)) : createCommentVNode("", true)
                        ])
                      ]),
                      props.receipt && !unref(canSendReceipt) ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "flex items-start gap-2 rounded-md border border-warning/50 bg-warning/15 px-3 py-2 text-sm text-muted-foreground",
                        "aria-live": "polite"
                      }, [
                        createVNode(unref(AlertTriangle), {
                          class: "mt-0.5 size-4 shrink-0 text-warning",
                          "aria-hidden": "true"
                        }),
                        createVNode("span", null, "Nomor WhatsApp tidak diisi di awal transaksi, jadi struk tidak bisa dikirim.")
                      ])) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "px-5 py-5"
                    }, [
                      createVNode("p", { class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" }, " Data struk tidak tersedia. ")
                    ])),
                    createVNode(unref(_sfc_main$4$1), { class: "grid grid-cols-1 gap-2 border-t px-5 py-4 sm:grid-cols-2 sm:justify-normal" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$q), {
                          type: "button",
                          variant: "outline",
                          class: "h-11 w-full",
                          onClick: ($event) => dialogOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(RotateCcw), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }),
                            createTextVNode(" Transaksi Baru ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$q), {
                          type: "button",
                          class: "h-11 w-full",
                          disabled: !unref(canSendReceipt) || unref(isSendingReceipt),
                          title: unref(canSendReceipt) ? "Kirim struk ke WhatsApp pelanggan" : "Nomor WhatsApp belum diisi",
                          onClick: sendReceipt
                        }, {
                          default: withCtx(() => [
                            unref(isSendingReceipt) ? (openBlock(), createBlock(unref(_sfc_main$u), {
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
                        createVNode("span", { class: "flex size-11 shrink-0 items-center justify-center rounded-md bg-success/10 text-success" }, [
                          createVNode(unref(CheckCircle2), {
                            class: "size-5",
                            "aria-hidden": "true"
                          })
                        ]),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode(unref(_sfc_main$1$2), null, {
                            default: withCtx(() => [
                              createTextVNode("Pembayaran berhasil")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), { class: "mt-1" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(successDescription)), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  props.receipt ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4 px-5 py-5"
                  }, [
                    createVNode("div", { class: "rounded-md border border-success/30 bg-success/10 p-4" }, [
                      createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("p", { class: "text-sm font-medium text-success" }, "Transaksi lunas"),
                          createVNode("p", { class: "mt-1 truncate text-lg font-semibold" }, toDisplayString(unref(receiptDisplayCode)), 1)
                        ]),
                        createVNode("span", { class: "shrink-0 rounded-md border border-success/30 bg-background/80 px-2 py-1 text-xs font-medium text-success" }, toDisplayString(props.receipt.paymentMethod), 1)
                      ])
                    ]),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "receipt-summary-title"
                    }, [
                      createVNode("div", { class: "mb-3 flex items-center gap-2" }, [
                        createVNode(unref(ReceiptText), {
                          class: "size-4 text-muted-foreground",
                          "aria-hidden": "true"
                        }),
                        createVNode("h3", {
                          id: "receipt-summary-title",
                          class: "text-sm font-semibold"
                        }, " Ringkasan struk ")
                      ]),
                      createVNode("dl", { class: "grid gap-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Waktu"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.receipt.paidAt), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Pelanggan"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.receipt.customerName), 1)
                        ]),
                        props.receipt.customerPhone !== "-" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between gap-3"
                        }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "WhatsApp"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.receipt.customerPhone), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between gap-3" }, [
                          createVNode("dt", { class: "text-muted-foreground" }, "Tipe pesanan"),
                          createVNode("dd", { class: "text-right font-medium" }, toDisplayString(props.receipt.diningOption), 1)
                        ])
                      ])
                    ]),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "receipt-items-title"
                    }, [
                      createVNode("div", { class: "mb-2 flex items-center justify-between gap-3" }, [
                        createVNode("h3", {
                          id: "receipt-items-title",
                          class: "text-sm font-semibold"
                        }, " Item pesanan "),
                        createVNode("span", { class: "text-xs text-muted-foreground" }, toDisplayString(props.receipt.itemCount) + " item", 1)
                      ]),
                      createVNode("ul", {
                        class: "max-h-44 space-y-2 overflow-y-auto pr-1",
                        "aria-label": "Item yang dibayar"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(props.receipt.items, (item) => {
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
                      ])
                    ]),
                    createVNode("section", {
                      class: "rounded-md border bg-card p-3",
                      "aria-labelledby": "receipt-total-title"
                    }, [
                      createVNode("h3", {
                        id: "receipt-total-title",
                        class: "sr-only"
                      }, " Ringkasan pembayaran "),
                      createVNode("dl", { class: "grid gap-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between gap-3 text-base" }, [
                          createVNode("dt", { class: "font-semibold" }, "Total"),
                          createVNode("dd", { class: "font-semibold" }, [
                            createVNode(CashierCurrency, {
                              value: props.receipt.total
                            }, null, 8, ["value"])
                          ])
                        ]),
                        props.receipt.cashReceived !== null ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Uang diterima"),
                            createVNode("dd", { class: "font-medium" }, [
                              createVNode(CashierCurrency, {
                                value: props.receipt.cashReceived
                              }, null, 8, ["value"])
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-between gap-3" }, [
                            createVNode("dt", { class: "text-muted-foreground" }, "Kembalian"),
                            createVNode("dd", { class: "font-medium" }, [
                              createVNode(CashierCurrency, {
                                value: props.receipt.cashChange
                              }, null, 8, ["value"])
                            ])
                          ])
                        ], 64)) : createCommentVNode("", true)
                      ])
                    ]),
                    props.receipt && !unref(canSendReceipt) ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "flex items-start gap-2 rounded-md border border-warning/50 bg-warning/15 px-3 py-2 text-sm text-muted-foreground",
                      "aria-live": "polite"
                    }, [
                      createVNode(unref(AlertTriangle), {
                        class: "mt-0.5 size-4 shrink-0 text-warning",
                        "aria-hidden": "true"
                      }),
                      createVNode("span", null, "Nomor WhatsApp tidak diisi di awal transaksi, jadi struk tidak bisa dikirim.")
                    ])) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "px-5 py-5"
                  }, [
                    createVNode("p", { class: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" }, " Data struk tidak tersedia. ")
                  ])),
                  createVNode(unref(_sfc_main$4$1), { class: "grid grid-cols-1 gap-2 border-t px-5 py-4 sm:grid-cols-2 sm:justify-normal" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$q), {
                        type: "button",
                        variant: "outline",
                        class: "h-11 w-full",
                        onClick: ($event) => dialogOpen.value = false
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(RotateCcw), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }),
                          createTextVNode(" Transaksi Baru ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(unref(_sfc_main$q), {
                        type: "button",
                        class: "h-11 w-full",
                        disabled: !unref(canSendReceipt) || unref(isSendingReceipt),
                        title: unref(canSendReceipt) ? "Kirim struk ke WhatsApp pelanggan" : "Nomor WhatsApp belum diisi",
                        onClick: sendReceipt
                      }, {
                        default: withCtx(() => [
                          unref(isSendingReceipt) ? (openBlock(), createBlock(unref(_sfc_main$u), {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/CashierPaymentSuccessDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CashierPaymentSuccessDialog = Object.assign(_sfc_main$3, { __name: "OrganismsCashierPaymentSuccessDialog" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CashierProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  emits: ["add"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isAvailable = computed(() => props.product.isAvailable ?? props.product.stock > 0);
    function handleAdd() {
      if (!isAvailable.value) {
        return;
      }
      emit("add", props.product);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$p), mergeProps({
        role: "button",
        tabindex: unref(isAvailable) ? 0 : -1,
        "aria-disabled": !unref(isAvailable),
        "aria-label": unref(isAvailable) ? `Tambah ${props.product.name} ke keranjang` : `${props.product.name} tidak tersedia`,
        class: ["group min-w-0 cursor-pointer gap-0 overflow-hidden rounded-md py-0 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", !unref(isAvailable) ? "cursor-not-allowed opacity-75 hover:border-border" : ""],
        onClick: handleAdd,
        onKeydown: [handleAdd, handleAdd]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative h-48 shrink-0 overflow-hidden bg-muted sm:h-52 xl:h-56"${_scopeId}>`);
            if (props.product.imageUrl) {
              _push2(`<img${ssrRenderAttr("src", props.product.imageUrl)}${ssrRenderAttr("alt", props.product.name)} class="${ssrRenderClass([unref(isAvailable) ? "group-hover:scale-105" : "grayscale", "size-full object-cover transition-transform duration-200"])}" loading="lazy"${_scopeId}>`);
            } else {
              _push2(`<div class="flex size-full items-center justify-center text-muted-foreground"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ImageIcon), {
                class: "size-9",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            if (!unref(isAvailable)) {
              _push2(`<span class="absolute left-3 top-3 rounded-md border border-destructive/40 bg-destructive px-2 py-1 text-xs font-medium text-white shadow-xs"${_scopeId}> Tidak tersedia </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(_sfc_main$n), { class: "flex min-h-24 flex-col justify-between gap-2 p-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="line-clamp-2 min-h-10 text-base font-semibold leading-5"${_scopeId2}>${ssrInterpolate(props.product.name)}</h3><p class="text-lg font-semibold tracking-normal text-primary"${_scopeId2}>`);
                  _push3(ssrRenderComponent(CashierCurrency, {
                    value: props.product.price
                  }, null, _parent3, _scopeId2));
                  _push3(`</p>`);
                } else {
                  return [
                    createVNode("h3", { class: "line-clamp-2 min-h-10 text-base font-semibold leading-5" }, toDisplayString(props.product.name), 1),
                    createVNode("p", { class: "text-lg font-semibold tracking-normal text-primary" }, [
                      createVNode(CashierCurrency, {
                        value: props.product.price
                      }, null, 8, ["value"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "relative h-48 shrink-0 overflow-hidden bg-muted sm:h-52 xl:h-56" }, [
                props.product.imageUrl ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: props.product.imageUrl,
                  alt: props.product.name,
                  class: ["size-full object-cover transition-transform duration-200", unref(isAvailable) ? "group-hover:scale-105" : "grayscale"],
                  loading: "lazy"
                }, null, 10, ["src", "alt"])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex size-full items-center justify-center text-muted-foreground"
                }, [
                  createVNode(unref(ImageIcon), {
                    class: "size-9",
                    "aria-hidden": "true"
                  })
                ])),
                !unref(isAvailable) ? (openBlock(), createBlock("span", {
                  key: 2,
                  class: "absolute left-3 top-3 rounded-md border border-destructive/40 bg-destructive px-2 py-1 text-xs font-medium text-white shadow-xs"
                }, " Tidak tersedia ")) : createCommentVNode("", true)
              ]),
              createVNode(unref(_sfc_main$n), { class: "flex min-h-24 flex-col justify-between gap-2 p-4" }, {
                default: withCtx(() => [
                  createVNode("h3", { class: "line-clamp-2 min-h-10 text-base font-semibold leading-5" }, toDisplayString(props.product.name), 1),
                  createVNode("p", { class: "text-lg font-semibold tracking-normal text-primary" }, [
                    createVNode(CashierCurrency, {
                      value: props.product.price
                    }, null, 8, ["value"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/molecules/CashierProductCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CashierProductCard = Object.assign(_sfc_main$2, { __name: "MoleculesCashierProductCard" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CashierProductSection",
  __ssrInlineRender: true,
  props: {
    products: {},
    categories: {},
    searchTerm: {},
    selectedCategoryId: {},
    availabilityFilter: { default: "all" },
    desktopColumnCount: { default: 3 },
    cartQuantities: { default: () => ({}) },
    loading: { type: Boolean, default: false },
    loadingItemCount: { default: 6 }
  },
  emits: ["update:searchTerm", "update:selectedCategoryId", "update:availabilityFilter", "addProduct"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const availabilityFilters = [
      { label: "Semua status", value: "all" },
      { label: "Tersedia", value: "available" },
      { label: "Tidak tersedia", value: "unavailable" }
    ];
    const searchValue = computed({
      get: () => props.searchTerm,
      set: (value) => emit("update:searchTerm", value)
    });
    const availabilityValue = computed({
      get: () => props.availabilityFilter,
      set: (value) => emit("update:availabilityFilter", value)
    });
    const filteredProducts = computed(() => {
      const keyword = props.searchTerm.trim().toLowerCase();
      return props.products.filter((product) => {
        const matchCategory = !props.selectedCategoryId || product.categoryId === props.selectedCategoryId;
        const isAvailable = product.isAvailable ?? product.stock > 0;
        const matchAvailability = props.availabilityFilter === "all" || props.availabilityFilter === "available" && isAvailable || props.availabilityFilter === "unavailable" && !isAvailable;
        const matchKeyword = !keyword || [
          product.name,
          product.sku,
          product.category
        ].some((value) => value.toLowerCase().includes(keyword));
        return matchCategory && matchAvailability && matchKeyword;
      });
    });
    const isEmptyStateVisible = computed(() => !props.loading && !filteredProducts.value.length);
    const hasActiveFilters = computed(() => {
      return Boolean(
        props.searchTerm.trim() || props.selectedCategoryId || props.availabilityFilter !== "all"
      );
    });
    const activeFilterLabels = computed(() => {
      const labels = [];
      const searchTerm = props.searchTerm.trim();
      const activeAvailability = availabilityFilters.find((filter) => filter.value === props.availabilityFilter);
      const activeCategory = props.categories.find((category) => category.id === props.selectedCategoryId);
      if (searchTerm) {
        labels.push(`Kata kunci: ${searchTerm}`);
      }
      if (props.selectedCategoryId) {
        labels.push(`Kategori: ${activeCategory?.name ?? props.selectedCategoryId}`);
      }
      if (props.availabilityFilter !== "all" && activeAvailability) {
        labels.push(`Status: ${activeAvailability.label}`);
      }
      return labels;
    });
    const emptyStateTitle = computed(() => {
      if (props.availabilityFilter === "unavailable") {
        return "Semua produk tersedia";
      }
      if (hasActiveFilters.value) {
        return "Produk tidak ditemukan";
      }
      return "Belum ada produk";
    });
    const emptyStateDescription = computed(() => {
      if (props.availabilityFilter === "unavailable") {
        return "Tidak ada produk berstatus tidak tersedia pada filter yang sedang aktif.";
      }
      if (hasActiveFilters.value) {
        return "Coba longgarkan filter untuk melihat menu yang tersedia pada shift ini.";
      }
      return "Produk akan tampil di sini setelah daftar menu tersedia.";
    });
    const productGridClass = computed(() => {
      if (props.desktopColumnCount === 5) {
        return "lg:grid-cols-5";
      }
      if (props.desktopColumnCount === 4) {
        return "lg:grid-cols-4";
      }
      return "lg:grid-cols-3";
    });
    const productListSpacingClass = computed(() => {
      return isEmptyStateVisible.value ? "p-0 pb-6" : "p-1 pb-6 sm:p-2 sm:pb-6";
    });
    function resetProductFilters() {
      emit("update:searchTerm", "");
      emit("update:selectedCategoryId", "");
      emit("update:availabilityFilter", "all");
    }
    function showAvailableProducts() {
      emit("update:availabilityFilter", "available");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "flex min-h-0 min-w-0 flex-1 flex-col gap-3",
        "aria-labelledby": "cashier-products-title",
        "aria-busy": props.loading
      }, _attrs))}><div class="flex flex-col gap-3 rounded-md border bg-card p-3 text-card-foreground shadow-xs"><div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><h2 id="cashier-products-title" class="text-base font-semibold tracking-normal"> Daftar Menu </h2><p class="text-sm text-muted-foreground">${ssrInterpolate(props.loading ? "Memuat daftar menu..." : `${unref(filteredProducts).length} item ditampilkan.`)}</p></div><div class="relative w-full sm:max-w-sm"><label for="product-search" class="sr-only">Cari produk</label>`);
      _push(ssrRenderComponent(unref(Search), {
        class: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
        "aria-hidden": "true"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1$1), {
        id: "product-search",
        modelValue: unref(searchValue),
        "onUpdate:modelValue": ($event) => isRef(searchValue) ? searchValue.value = $event : null,
        type: "search",
        class: "h-10 pl-9",
        placeholder: "Cari produk",
        disabled: props.loading
      }, null, _parent));
      _push(`</div></div><div class="flex items-center gap-2 overflow-x-auto pb-1" aria-label="Filter daftar menu">`);
      _push(ssrRenderComponent(unref(SlidersHorizontal), {
        class: "size-4 shrink-0 text-muted-foreground",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<div class="shrink-0"><label for="product-availability-filter" class="sr-only">Filter ketersediaan menu</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$2$1), {
        id: "product-availability-filter",
        modelValue: unref(availabilityValue),
        "onUpdate:modelValue": ($event) => isRef(availabilityValue) ? availabilityValue.value = $event : null,
        class: "w-40",
        disabled: props.loading
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(availabilityFilters, (filter) => {
              _push2(`<option${ssrRenderAttr("value", filter.value)}${_scopeId}>${ssrInterpolate(filter.label)}</option>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(availabilityFilters, (filter) => {
                return createVNode("option", {
                  key: filter.value,
                  value: filter.value
                }, toDisplayString(filter.label), 9, ["value"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(props.categories, (category) => {
        _push(ssrRenderComponent(unref(_sfc_main$q), {
          key: category.id || "all",
          type: "button",
          size: "sm",
          variant: props.selectedCategoryId === category.id ? "default" : "outline",
          "aria-pressed": props.selectedCategoryId === category.id,
          class: "shrink-0",
          disabled: props.loading,
          onClick: ($event) => emit("update:selectedCategoryId", category.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(category.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(category.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="${ssrRenderClass([[unref(productGridClass), unref(productListSpacingClass)], "cashier-scrollbar grid min-h-0 min-w-0 flex-1 auto-rows-max grid-cols-1 content-start items-start gap-4 overflow-y-auto overflow-x-hidden sm:grid-cols-2 sm:gap-5"])}">`);
      if (props.loading) {
        _push(`<!--[-->`);
        ssrRenderList(props.loadingItemCount, (index) => {
          _push(`<div class="overflow-hidden rounded-md border bg-card">`);
          _push(ssrRenderComponent(unref(_sfc_main$r), { class: "h-48 rounded-none sm:h-52 xl:h-56" }, null, _parent));
          _push(`<div class="space-y-3 p-4">`);
          _push(ssrRenderComponent(unref(_sfc_main$r), { class: "h-4 w-3/4" }, null, _parent));
          _push(ssrRenderComponent(unref(_sfc_main$r), { class: "h-4 w-1/2" }, null, _parent));
          _push(ssrRenderComponent(unref(_sfc_main$r), { class: "h-5 w-24" }, null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(filteredProducts), (product) => {
          _push(ssrRenderComponent(CashierProductCard, {
            key: product.id,
            product,
            onAdd: ($event) => emit("addProduct", product)
          }, null, _parent));
        });
        _push(`<!--]-->`);
      }
      if (unref(isEmptyStateVisible)) {
        _push(`<div role="status" class="col-span-full flex min-h-80 items-center justify-center rounded-md border bg-card px-6 py-8 text-center shadow-xs sm:min-h-96 sm:px-8"><div class="mx-auto flex w-full max-w-md flex-col items-center gap-4"><span class="flex size-14 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">`);
        _push(ssrRenderComponent(unref(PackageSearch), {
          class: "size-7",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</span><div class="space-y-2"><h3 class="text-base font-semibold tracking-normal text-card-foreground">${ssrInterpolate(unref(emptyStateTitle))}</h3><p class="text-sm leading-6 text-muted-foreground">${ssrInterpolate(unref(emptyStateDescription))}</p></div>`);
        if (unref(activeFilterLabels).length) {
          _push(`<div class="flex flex-wrap justify-center gap-2"><!--[-->`);
          ssrRenderList(unref(activeFilterLabels), (label) => {
            _push(`<span class="rounded-md border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">${ssrInterpolate(label)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(hasActiveFilters)) {
          _push(`<div class="flex w-full max-w-sm flex-col items-stretch justify-center gap-2 sm:flex-row">`);
          _push(ssrRenderComponent(unref(_sfc_main$q), {
            type: "button",
            size: "sm",
            class: "w-full justify-center sm:w-44",
            onClick: resetProductFilters
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(RotateCcw), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
                _push2(` Reset filter `);
              } else {
                return [
                  createVNode(unref(RotateCcw), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Reset filter ")
                ];
              }
            }),
            _: 1
          }, _parent));
          if (props.availabilityFilter !== "available") {
            _push(ssrRenderComponent(unref(_sfc_main$q), {
              type: "button",
              size: "sm",
              variant: "outline",
              class: "w-full justify-center sm:w-44",
              onClick: showAvailableProducts
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Lihat produk tersedia `);
                } else {
                  return [
                    createTextVNode(" Lihat produk tersedia ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/organisms/CashierProductSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CashierProductSection = Object.assign(_sfc_main$1, { __name: "OrganismsCashierProductSection" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Kasir"
    });
    const {
      products,
      productCategories,
      cartItems,
      cartQuantities,
      cartItemCount,
      subtotal,
      total,
      addProductToCart,
      incrementCartItem,
      decrementCartItem,
      removeCartItem,
      clearCart,
      checkoutCart,
      isProductListLoading,
      isCategoryListLoading,
      loadProducts
    } = useCashierStore();
    const productSearch = ref("");
    const selectedCategoryId = ref("");
    const availabilityFilter = ref("all");
    const customerName = ref("");
    const customerPhone = ref("");
    const diningOption = ref("Makan di Tempat");
    const paymentMethod = ref("Tunai");
    const isPaymentDialogOpen = ref(false);
    const isPaymentSubmitting = ref(false);
    const isPaymentSuccessDialogOpen = ref(false);
    const lastReceipt = ref(null);
    const isCartPanelOpen = ref(true);
    const isSidebarOpen = useState("cashier:sidebar-open", () => true);
    const { runCashierAction } = useCashierActionFeedback();
    const productDesktopColumnCount = computed(() => {
      if (isSidebarOpen.value && isCartPanelOpen.value) {
        return 3;
      }
      if (!isSidebarOpen.value && !isCartPanelOpen.value) {
        return 5;
      }
      return 4;
    });
    watch(selectedCategoryId, async (categoryId) => {
      try {
        await loadProducts({
          force: true,
          categoryId
        });
      } catch (error) {
        toast.error(getErrorMessage(error, "Gagal memuat daftar menu."));
      }
    });
    function handleCheckoutRequest() {
      isPaymentDialogOpen.value = true;
    }
    async function handlePaymentComplete(paymentResult) {
      await runCashierAction(async () => {
        await nextTick();
        const checkoutResult = await checkoutCart({
          customerName: customerName.value,
          customerPhone: customerPhone.value,
          diningOption: diningOption.value,
          paymentMethod: paymentMethod.value,
          cashReceived: paymentResult.cashReceived,
          cashChange: paymentResult.cashChange
        });
        if (!checkoutResult) {
          throw new Error("Transaksi gagal disimpan. Periksa keranjang dan nama pelanggan.");
        }
        lastReceipt.value = checkoutResult.receipt;
        isPaymentDialogOpen.value = false;
        isPaymentSuccessDialogOpen.value = true;
        customerName.value = "";
        customerPhone.value = "";
        diningOption.value = "Makan di Tempat";
        paymentMethod.value = "Tunai";
        return checkoutResult.transaction;
      }, {
        loading: isPaymentSubmitting,
        successMessage: "Pembayaran berhasil",
        successDescription: (transaction) => `Transaksi ${transaction.id} tersimpan. Struk siap dikirim.`,
        errorMessage: "Pembayaran gagal diproses."
      });
    }
    function getErrorMessage(error, fallback) {
      if (error instanceof Error && error.message) {
        return error.message;
      }
      return fallback;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-full min-h-0 flex-col gap-3 p-3 sm:p-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_minmax(0,1fr)]" }, _attrs))}>`);
      _push(ssrRenderComponent(CashierPageHeader, {
        class: "lg:col-start-1 lg:row-start-1",
        title: "Kasir",
        description: "Input transaksi, pilih produk, dan proses pembayaran dari satu layar."
      }, null, _parent));
      _push(ssrRenderComponent(CashierProductSection, {
        "search-term": unref(productSearch),
        "onUpdate:searchTerm": ($event) => isRef(productSearch) ? productSearch.value = $event : null,
        "selected-category-id": unref(selectedCategoryId),
        "onUpdate:selectedCategoryId": ($event) => isRef(selectedCategoryId) ? selectedCategoryId.value = $event : null,
        "availability-filter": unref(availabilityFilter),
        "onUpdate:availabilityFilter": ($event) => isRef(availabilityFilter) ? availabilityFilter.value = $event : null,
        class: "lg:col-start-1 lg:row-start-2",
        products: unref(products),
        categories: unref(productCategories),
        "cart-quantities": unref(cartQuantities),
        "desktop-column-count": unref(productDesktopColumnCount),
        loading: unref(isProductListLoading) || unref(isCategoryListLoading),
        onAddProduct: unref(addProductToCart)
      }, null, _parent));
      _push(ssrRenderComponent(CashierCartPanel, {
        open: unref(isCartPanelOpen),
        "onUpdate:open": ($event) => isRef(isCartPanelOpen) ? isCartPanelOpen.value = $event : null,
        "payment-method": unref(paymentMethod),
        "onUpdate:paymentMethod": ($event) => isRef(paymentMethod) ? paymentMethod.value = $event : null,
        "customer-name": unref(customerName),
        "onUpdate:customerName": ($event) => isRef(customerName) ? customerName.value = $event : null,
        "customer-phone": unref(customerPhone),
        "onUpdate:customerPhone": ($event) => isRef(customerPhone) ? customerPhone.value = $event : null,
        "dining-option": unref(diningOption),
        "onUpdate:diningOption": ($event) => isRef(diningOption) ? diningOption.value = $event : null,
        class: "lg:col-start-2 lg:row-span-2 lg:row-start-1",
        items: unref(cartItems),
        "item-count": unref(cartItemCount),
        subtotal: unref(subtotal),
        total: unref(total),
        onDecrement: unref(decrementCartItem),
        onIncrement: unref(incrementCartItem),
        onRemove: unref(removeCartItem),
        onClear: unref(clearCart),
        onCheckout: handleCheckoutRequest
      }, null, _parent));
      _push(ssrRenderComponent(CashierPaymentDialog, {
        open: unref(isPaymentDialogOpen),
        "onUpdate:open": ($event) => isRef(isPaymentDialogOpen) ? isPaymentDialogOpen.value = $event : null,
        "payment-method": unref(paymentMethod),
        "onUpdate:paymentMethod": ($event) => isRef(paymentMethod) ? paymentMethod.value = $event : null,
        items: unref(cartItems),
        total: unref(total),
        "item-count": unref(cartItemCount),
        "customer-name": unref(customerName),
        "dining-option": unref(diningOption),
        submitting: unref(isPaymentSubmitting),
        onSubmit: handlePaymentComplete
      }, null, _parent));
      _push(ssrRenderComponent(CashierPaymentSuccessDialog, {
        open: unref(isPaymentSuccessDialogOpen),
        "onUpdate:open": ($event) => isRef(isPaymentSuccessDialogOpen) ? isPaymentSuccessDialogOpen.value = $event : null,
        receipt: unref(lastReceipt)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/pages/cashier/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D7jMAeBF.mjs.map
