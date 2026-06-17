import { defineComponent, computed, mergeProps, unref, isRef, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { Search } from 'lucide-vue-next';
import { _ as _sfc_main$1$1 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$3 } from './index-DSBdqIS4.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AdminDataMetric",
  __ssrInlineRender: true,
  props: {
    label: {},
    value: {},
    helper: {},
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
        "aria-label": __props.label
      }, _attrs))}><div class="flex items-start justify-between gap-3"><div class="min-w-0"><p class="truncate text-xs font-medium text-muted-foreground">${ssrInterpolate(__props.label)}</p><p class="mt-1 truncate text-lg font-semibold tracking-normal">${ssrInterpolate(__props.value)}</p><p class="mt-1 truncate text-xs text-muted-foreground">${ssrInterpolate(__props.helper)}</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/molecules/AdminDataMetric.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AdminDataMetric = Object.assign(_sfc_main$2, { __name: "MoleculesAdminDataMetric" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminDataToolbar",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
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
      set: (value) => emit("update:modelValue", String(value))
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between" }, _attrs))}><div class="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center"><div class="relative min-w-0 flex-1 lg:max-w-md"><label${ssrRenderAttr("for", __props.searchId)} class="sr-only">${ssrInterpolate(__props.searchLabel)}</label>`);
      _push(ssrRenderComponent(unref(Search), {
        class: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
        "aria-hidden": "true"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1$1), {
        id: __props.searchId,
        modelValue: unref(searchValue),
        "onUpdate:modelValue": ($event) => isRef(searchValue) ? searchValue.value = $event : null,
        class: "h-9 pl-9",
        disabled: __props.disabled,
        placeholder: __props.searchPlaceholder,
        type: "search"
      }, null, _parent));
      _push(`</div>`);
      if (_ctx.$slots.filters) {
        _push(`<div class="flex flex-wrap items-center gap-2">`);
        ssrRenderSlot(_ctx.$slots, "filters", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (_ctx.$slots.action) {
        _push(`<div class="flex shrink-0 items-center justify-end gap-2">`);
        ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/molecules/AdminDataToolbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AdminDataToolbar = Object.assign(_sfc_main$1, { __name: "MoleculesAdminDataToolbar" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminStatusBadge",
  __ssrInlineRender: true,
  props: {
    tone: { default: "default" }
  },
  setup(__props) {
    const props = __props;
    const toneClass = computed(() => {
      if (props.tone === "success") {
        return "border-transparent bg-success text-success-foreground";
      }
      if (props.tone === "warning") {
        return "border-transparent bg-warning text-warning-foreground";
      }
      if (props.tone === "info") {
        return "border-transparent bg-primary text-primary-foreground";
      }
      if (props.tone === "destructive") {
        return "border-transparent bg-destructive text-white";
      }
      return "border-transparent bg-secondary text-secondary-foreground";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$3), mergeProps({ class: unref(toneClass) }, _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/atoms/AdminStatusBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminStatusBadge = Object.assign(_sfc_main, { __name: "AtomsAdminStatusBadge" });

export { AdminDataMetric as A, AdminDataToolbar as a, AdminStatusBadge as b };
//# sourceMappingURL=AdminStatusBadge-BmT7CMZl.mjs.map
