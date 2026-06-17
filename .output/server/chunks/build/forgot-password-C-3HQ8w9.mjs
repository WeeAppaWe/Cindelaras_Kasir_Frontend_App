import { defineComponent, ref, mergeProps, unref, computed, withCtx, createTextVNode, toDisplayString, createVNode, isRef, openBlock, createBlock, createCommentVNode, Fragment, renderList, renderSlot, useModel, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-B5v6N24G.mjs';
import { ArrowLeft, MinusIcon } from 'lucide-vue-next';
import { _ as _sfc_main$2$1, a as _sfc_main$1$1 } from './index-rcdgmEu2.mjs';
import { _ as _sfc_main$a } from './index-BZG70idc.mjs';
import { useForwardPropsEmits, useForwardProps } from 'reka-ui';
import { OTPInput, useVueOTPContext } from 'vue-input-otp';
import { c as cn } from './index-H80jjgLf.mjs';
import { n as navigateTo, r as reactiveOmit } from './server.mjs';
import { _ as _sfc_main$9 } from './Label-Cd3JlovY.mjs';
import { a as _sfc_main$b, _ as _sfc_main$1$2 } from './Spinner-nalFRPxS.mjs';
import { A as AuthPasswordInput } from './AuthPasswordInput-DY3sueUF.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAuth } from './useAuth-DEEW40N4.mjs';
import { toast } from 'vue-sonner';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './api-endpoints-aT5YyZ8V.mjs';
import './state-Dw1r7BQr.mjs';

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "InputOTP",
  __ssrInlineRender: true,
  props: {
    maxlength: {},
    textAlign: {},
    inputmode: {},
    containerClass: {},
    pushPasswordManagerStrategy: {},
    noScriptCssFallback: {},
    defaultValue: {},
    pasteTransformer: { type: Function },
    accept: {},
    alt: {},
    autocomplete: {},
    autofocus: { type: Boolean },
    capture: { type: [Boolean, String] },
    checked: { type: [Boolean, Array, Set] },
    crossorigin: {},
    disabled: { type: Boolean },
    enterKeyHint: {},
    form: {},
    formaction: {},
    formenctype: {},
    formmethod: {},
    formnovalidate: { type: Boolean },
    formtarget: {},
    height: {},
    indeterminate: { type: Boolean },
    list: {},
    max: {},
    min: {},
    minlength: {},
    multiple: { type: Boolean },
    name: {},
    pattern: {},
    placeholder: {},
    readonly: { type: Boolean },
    required: { type: Boolean },
    size: {},
    src: {},
    step: {},
    type: {},
    value: {},
    width: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  emits: ["complete", "change", "select", "input", "focus", "blur", "mouseover", "mouseleave", "paste"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(OTPInput), mergeProps(unref(forwarded), {
        "container-class": unref(cn)("flex items-center gap-2 has-disabled:opacity-50", props.class),
        "data-slot": "input-otp",
        class: "disabled:cursor-not-allowed"
      }, _attrs), {
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/input-otp/InputOTP.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "InputOTPGroup",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ "data-slot": "input-otp-group" }, unref(forwarded), {
        class: unref(cn)("flex items-center", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/input-otp/InputOTPGroup.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "InputOTPSeparator",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const forwarded = useForwardProps(props);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "input-otp-separator",
        role: "separator"
      }, unref(forwarded), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(ssrRenderComponent(unref(MinusIcon), null, null, _parent));
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/input-otp/InputOTPSeparator.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "InputOTPSlot",
  __ssrInlineRender: true,
  props: {
    index: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    const context = useVueOTPContext();
    const slot = computed(() => context?.value.slots[props.index]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps(unref(forwarded), {
        "data-slot": "input-otp-slot",
        "data-active": slot.value?.isActive,
        class: unref(cn)("data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]", props.class)
      }, _attrs))}>${ssrInterpolate(slot.value?.char)} `);
      if (slot.value?.hasFakeCaret) {
        _push(`<div class="pointer-events-none absolute inset-0 flex items-center justify-center"><div class="animate-caret-blink bg-foreground h-4 w-px duration-1000"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/ui/input-otp/InputOTPSlot.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AuthWhatsappInput",
  __ssrInlineRender: true,
  props: {
    "modelValue": { default: "" },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const modelValue = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$1$2), mergeProps({
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event,
        type: "tel",
        class: "h-11",
        autocomplete: "tel",
        inputmode: "tel",
        placeholder: "08xxxxxxxxxx"
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/components/atoms/AuthWhatsappInput.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const AuthWhatsappInput = Object.assign(_sfc_main$4, { __name: "AtomsAuthWhatsappInput" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ForgotPasswordFormHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {},
    stepLabel: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}><p class="text-sm font-medium text-primary">${ssrInterpolate(__props.stepLabel)}</p><div class="space-y-1"><h1 class="text-2xl font-semibold tracking-normal text-foreground">${ssrInterpolate(__props.title)}</h1><p class="text-sm leading-6 text-muted-foreground">${ssrInterpolate(__props.description)}</p></div></header>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/components/molecules/ForgotPasswordFormHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ForgotPasswordFormHeader = Object.assign(_sfc_main$3, { __name: "MoleculesForgotPasswordFormHeader" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ForgotPasswordStepIndicator",
  __ssrInlineRender: true,
  props: {
    currentStep: {}
  },
  setup(__props) {
    const props = __props;
    const steps = ["WhatsApp", "Kode", "Password"];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ol${ssrRenderAttrs(mergeProps({
        class: "grid grid-cols-3 gap-2",
        "aria-label": "Tahapan lupa password"
      }, _attrs))}><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<li class="${ssrRenderClass([index + 1 <= props.currentStep ? "bg-primary" : "bg-muted", "h-1.5 rounded-full"])}"><span class="sr-only">${ssrInterpolate(step)}</span></li>`);
      });
      _push(`<!--]--></ol>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/components/molecules/ForgotPasswordStepIndicator.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ForgotPasswordStepIndicator = Object.assign(_sfc_main$2, { __name: "MoleculesForgotPasswordStepIndicator" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ForgotPasswordForm",
  __ssrInlineRender: true,
  props: {
    errorMessage: { default: "" },
    isSubmitting: { type: Boolean, default: false },
    successMessage: { default: "" }
  },
  emits: ["requestCode", "verifyCode", "resetPassword"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const step = ref(1);
    const whatsapp = ref("");
    const code = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");
    const validationMessage = ref("");
    const displayErrorMessage = computed(() => validationMessage.value || props.errorMessage);
    const headerContent = computed(() => {
      if (step.value === 1) {
        return {
          title: "Lupa password",
          description: "Masukkan nomor WhatsApp untuk menerima kode verifikasi.",
          stepLabel: "Langkah 1 dari 3"
        };
      }
      if (step.value === 2) {
        return {
          title: "Masukkan kode",
          description: "Masukkan kode OTP 6 digit yang dikirim ke WhatsApp.",
          stepLabel: "Langkah 2 dari 3"
        };
      }
      return {
        title: "Buat password baru",
        description: "Ketik password baru dua kali untuk memastikan tidak salah.",
        stepLabel: "Langkah 3 dari 3"
      };
    });
    function goBack() {
      validationMessage.value = "";
      if (step.value > 1) {
        step.value -= 1;
      }
    }
    function goToCodeStep() {
      step.value = 2;
    }
    function goToPasswordStep() {
      step.value = 3;
    }
    __expose({
      goToCodeStep,
      goToPasswordStep
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(ForgotPasswordStepIndicator, { "current-step": unref(step) }, null, _parent));
      _push(ssrRenderComponent(ForgotPasswordFormHeader, unref(headerContent), null, _parent));
      if (unref(displayErrorMessage)) {
        _push(ssrRenderComponent(unref(_sfc_main$2$1), { variant: "destructive" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$1$1), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(displayErrorMessage))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(displayErrorMessage)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$1$1), null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(displayErrorMessage)), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (__props.successMessage) {
        _push(ssrRenderComponent(unref(_sfc_main$2$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$1$1), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.successMessage)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.successMessage), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$1$1), null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(__props.successMessage), 1)
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
      if (unref(step) === 1) {
        _push(`<form class="space-y-5"${ssrRenderAttr("aria-busy", props.isSubmitting)}><div class="space-y-2">`);
        _push(ssrRenderComponent(unref(_sfc_main$9), { for: "whatsapp" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Nomor WhatsApp`);
            } else {
              return [
                createTextVNode("Nomor WhatsApp")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(AuthWhatsappInput, {
          id: "whatsapp",
          modelValue: unref(whatsapp),
          "onUpdate:modelValue": ($event) => isRef(whatsapp) ? whatsapp.value = $event : null,
          disabled: props.isSubmitting
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          type: "submit",
          class: "h-11 w-full",
          disabled: __props.isSubmitting
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (__props.isSubmitting) {
                _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "size-4" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(__props.isSubmitting ? "Mengirim..." : "Kirim kode")}`);
            } else {
              return [
                __props.isSubmitting ? (openBlock(), createBlock(unref(_sfc_main$b), {
                  key: 0,
                  class: "size-4"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(__props.isSubmitting ? "Mengirim..." : "Kirim kode"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</form>`);
      } else if (unref(step) === 2) {
        _push(`<form class="space-y-5"${ssrRenderAttr("aria-busy", props.isSubmitting)}><div class="space-y-2">`);
        _push(ssrRenderComponent(unref(_sfc_main$9), { for: "reset-code" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Kode verifikasi`);
            } else {
              return [
                createTextVNode("Kode verifikasi")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$8), {
          id: "reset-code",
          modelValue: unref(code),
          "onUpdate:modelValue": ($event) => isRef(code) ? code.value = $event : null,
          maxlength: 6,
          disabled: props.isSubmitting
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$7), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(6, (index) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        key: index,
                        index: index - 1,
                        class: "h-11 w-11"
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(6, (index) => {
                        return createVNode(unref(_sfc_main$5), {
                          key: index,
                          index: index - 1,
                          class: "h-11 w-11"
                        }, null, 8, ["index"]);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$7), null, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(6, (index) => {
                      return createVNode(unref(_sfc_main$5), {
                        key: index,
                        index: index - 1,
                        class: "h-11 w-11"
                      }, null, 8, ["index"]);
                    }), 64))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex gap-2">`);
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          type: "button",
          variant: "outline",
          size: "icon-lg",
          disabled: props.isSubmitting,
          onClick: goBack
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "size-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          type: "submit",
          class: "h-11 flex-1",
          disabled: __props.isSubmitting
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (__props.isSubmitting) {
                _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "size-4" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(__props.isSubmitting ? "Memverifikasi..." : "Verifikasi")}`);
            } else {
              return [
                __props.isSubmitting ? (openBlock(), createBlock(unref(_sfc_main$b), {
                  key: 0,
                  class: "size-4"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(__props.isSubmitting ? "Memverifikasi..." : "Verifikasi"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></form>`);
      } else {
        _push(`<form class="space-y-5"${ssrRenderAttr("aria-busy", props.isSubmitting)}><div class="space-y-2">`);
        _push(ssrRenderComponent(unref(_sfc_main$9), { for: "new-password" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Password baru`);
            } else {
              return [
                createTextVNode("Password baru")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(AuthPasswordInput, {
          id: "new-password",
          modelValue: unref(password),
          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
          autocomplete: "new-password",
          placeholder: "Masukkan password baru",
          disabled: props.isSubmitting
        }, null, _parent));
        _push(`</div><div class="space-y-2">`);
        _push(ssrRenderComponent(unref(_sfc_main$9), { for: "password-confirmation" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Ketik ulang password`);
            } else {
              return [
                createTextVNode("Ketik ulang password")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(AuthPasswordInput, {
          id: "password-confirmation",
          modelValue: unref(passwordConfirmation),
          "onUpdate:modelValue": ($event) => isRef(passwordConfirmation) ? passwordConfirmation.value = $event : null,
          autocomplete: "new-password",
          placeholder: "Ketik ulang password baru",
          disabled: props.isSubmitting
        }, null, _parent));
        _push(`</div><div class="flex gap-2">`);
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          type: "button",
          variant: "outline",
          size: "icon-lg",
          disabled: props.isSubmitting,
          onClick: goBack
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "size-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          type: "submit",
          class: "h-11 flex-1",
          disabled: __props.isSubmitting
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (__props.isSubmitting) {
                _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "size-4" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(__props.isSubmitting ? "Menyimpan..." : "Simpan password")}`);
            } else {
              return [
                __props.isSubmitting ? (openBlock(), createBlock(unref(_sfc_main$b), {
                  key: 0,
                  class: "size-4"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(__props.isSubmitting ? "Menyimpan..." : "Simpan password"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></form>`);
      }
      _push(`<div class="text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-sm font-medium text-primary underline-offset-4 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kembali ke login `);
          } else {
            return [
              createTextVNode(" Kembali ke login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/components/organisms/ForgotPasswordForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ForgotPasswordForm = Object.assign(_sfc_main$1, { __name: "OrganismsForgotPasswordForm" });
function useAuthActionFeedback() {
  async function runAuthAction(action, options) {
    if (options.loading?.value) {
      return null;
    }
    try {
      const result = await action();
      if (result) {
        showSuccessToast(options, result);
      }
      return result;
    } catch (error) {
      if (options.showErrorToast) {
        toast.error(getErrorMessage(error, options.errorMessage));
      }
      return null;
    }
  }
  return {
    runAuthAction
  };
}
function showSuccessToast(options, result) {
  const message = resolveFeedbackMessage(options.successMessage, result);
  const description = resolveFeedbackMessage(options.successDescription, result);
  if (description) {
    toast.success(message, { description });
    return;
  }
  toast.success(message);
}
function resolveFeedbackMessage(message, result) {
  if (!message) {
    return "";
  }
  return typeof message === "function" ? message(result) : message;
}
function getErrorMessage(error, fallback = "Aksi autentikasi gagal diproses.") {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "forgot-password",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Lupa Password"
    });
    const {
      errorMessage,
      isLoading,
      requestPasswordReset,
      resetPassword,
      verifyPasswordResetCode
    } = useAuth();
    const formRef = ref();
    const { runAuthAction } = useAuthActionFeedback();
    async function handleRequestCode(payload) {
      const isSent = await runAuthAction(() => requestPasswordReset(payload), {
        loading: isLoading,
        successMessage: "OTP berhasil dikirim",
        successDescription: "Periksa WhatsApp lalu masukkan kode 6 digit."
      });
      if (isSent) {
        formRef.value?.goToCodeStep();
      }
    }
    async function handleVerifyCode(payload) {
      const isVerified = await runAuthAction(() => verifyPasswordResetCode(payload), {
        loading: isLoading,
        successMessage: "Kode berhasil diverifikasi",
        successDescription: "Silakan buat password baru."
      });
      if (isVerified) {
        formRef.value?.goToPasswordStep();
      }
    }
    async function handleResetPassword(payload) {
      const isReset = await runAuthAction(() => resetPassword(payload), {
        loading: isLoading,
        successMessage: "Password berhasil diubah",
        successDescription: "Silakan login dengan password baru."
      });
      if (isReset) {
        await navigateTo("/login");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(ForgotPasswordForm, mergeProps({
        ref_key: "formRef",
        ref: formRef,
        "error-message": unref(errorMessage),
        "is-submitting": unref(isLoading),
        onRequestCode: handleRequestCode,
        onResetPassword: handleResetPassword,
        onVerifyCode: handleVerifyCode
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/pages/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forgot-password-C-3HQ8w9.mjs.map
