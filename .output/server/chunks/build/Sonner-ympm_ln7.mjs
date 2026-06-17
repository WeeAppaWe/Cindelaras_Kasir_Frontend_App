import { defineComponent, unref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { XIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon, InfoIcon, CircleCheckIcon } from 'lucide-vue-next';
import { Toaster } from 'vue-sonner';
import { c as cn } from './index-H80jjgLf.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Sonner",
  __ssrInlineRender: true,
  props: {
    id: {},
    invert: { type: Boolean },
    theme: {},
    position: {},
    closeButtonPosition: {},
    hotkey: {},
    richColors: { type: Boolean },
    expand: { type: Boolean },
    duration: {},
    gap: {},
    visibleToasts: {},
    closeButton: { type: Boolean },
    toastOptions: {},
    class: {},
    style: {},
    offset: {},
    mobileOffset: {},
    dir: {},
    swipeDirections: {},
    icons: {},
    containerAriaLabel: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Toaster), mergeProps({
        class: unref(cn)("toaster group", props.class),
        style: {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        }
      }, props, _attrs), {
        "success-icon": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CircleCheckIcon), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(CircleCheckIcon), { class: "size-4" })
            ];
          }
        }),
        "info-icon": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(InfoIcon), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(InfoIcon), { class: "size-4" })
            ];
          }
        }),
        "warning-icon": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TriangleAlertIcon), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TriangleAlertIcon), { class: "size-4" })
            ];
          }
        }),
        "error-icon": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(OctagonXIcon), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(OctagonXIcon), { class: "size-4" })
            ];
          }
        }),
        "loading-icon": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Loader2Icon), { class: "size-4 animate-spin" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(unref(Loader2Icon), { class: "size-4 animate-spin" })
              ])
            ];
          }
        }),
        "close-icon": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(XIcon), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(XIcon), { class: "size-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/sonner/Sonner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Sonner-ympm_ln7.mjs.map
