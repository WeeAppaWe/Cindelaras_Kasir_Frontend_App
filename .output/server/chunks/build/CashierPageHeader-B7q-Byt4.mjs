import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CashierPageHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }, _attrs))}><div class="min-w-0"><h1 class="truncate text-xl font-semibold tracking-normal text-foreground">${ssrInterpolate(__props.title)}</h1><p class="mt-1 max-w-2xl text-sm text-muted-foreground">${ssrInterpolate(__props.description)}</p></div>`);
      if (_ctx.$slots.actions) {
        _push(`<div class="flex shrink-0 items-center gap-2">`);
        ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/cashier/app/components/molecules/CashierPageHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CashierPageHeader = Object.assign(_sfc_main, { __name: "MoleculesCashierPageHeader" });

export { CashierPageHeader as C };
//# sourceMappingURL=CashierPageHeader-B7q-Byt4.mjs.map
