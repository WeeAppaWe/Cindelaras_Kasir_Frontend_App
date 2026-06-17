import { defineComponent, useModel, useAttrs, ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, mergeModels, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { EyeOff, Eye } from 'lucide-vue-next';
import { _ as _sfc_main$2 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1 } from './Spinner-nalFRPxS.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "AuthPasswordInput",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    autocomplete: { default: "current-password" },
    placeholder: { default: "Masukkan kata sandi" }
  }, {
    "modelValue": { default: "" },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const modelValue = useModel(__props, "modelValue");
    const attrs = useAttrs();
    const isVisible = ref(false);
    const isDisabled = computed(() => attrs.disabled === true || attrs.disabled === "");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), mergeProps(unref(attrs), {
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event,
        type: unref(isVisible) ? "text" : "password",
        class: "h-11 pr-11",
        autocomplete: __props.autocomplete,
        placeholder: __props.placeholder
      }), null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        type: "button",
        variant: "ghost",
        size: "icon-sm",
        class: "absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
        "aria-label": unref(isVisible) ? "Sembunyikan kata sandi" : "Tampilkan kata sandi",
        disabled: unref(isDisabled),
        onClick: ($event) => isVisible.value = !unref(isVisible)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isVisible)) {
              _push2(ssrRenderComponent(unref(EyeOff), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Eye), { class: "size-4" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(isVisible) ? (openBlock(), createBlock(unref(EyeOff), {
                key: 0,
                class: "size-4"
              })) : (openBlock(), createBlock(unref(Eye), {
                key: 1,
                class: "size-4"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/components/atoms/AuthPasswordInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AuthPasswordInput = Object.assign(_sfc_main, { __name: "AtomsAuthPasswordInput" });

export { AuthPasswordInput as A };
//# sourceMappingURL=AuthPasswordInput-DY3sueUF.mjs.map
