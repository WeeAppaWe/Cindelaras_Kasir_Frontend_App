import { defineComponent, mergeProps, unref, ref, reactive, computed, withCtx, createTextVNode, toDisplayString, createVNode, isRef, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-B5v6N24G.mjs';
import { _ as _sfc_main$2$1, a as _sfc_main$1$1 } from './index-rcdgmEu2.mjs';
import { _ as _sfc_main$4 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1$2, a as _sfc_main$5 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$3 } from './Label-Cd3JlovY.mjs';
import { A as AuthPasswordInput } from './AuthPasswordInput-DY3sueUF.mjs';
import { u as usePublicStoreProfile } from './usePublicStoreProfile-CH3P6Syh.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useRoute, n as navigateTo } from './server.mjs';
import { u as useAuth, g as getDefaultAuthenticatedPath } from './useAuth-BBn1Hfu0.mjs';
import { u as useFlashToast } from './useFlashToast-HgpcM5Qo.mjs';
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
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import 'lucide-vue-next';
import './api-endpoints-Bk94Aoou.mjs';
import './state-Dw1r7BQr.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'vue-sonner';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LoginFormHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { publicStoreProfile } = usePublicStoreProfile();
    const brandDisplayName = computed(() => publicStoreProfile.value.storeName.trim() || "Sistem Kasir");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}><p class="text-sm font-medium text-primary">${ssrInterpolate(unref(brandDisplayName))}</p><div class="space-y-1"><h1 class="text-2xl font-semibold tracking-normal text-foreground"> Masuk ke akun </h1><p class="text-sm leading-6 text-muted-foreground"> Gunakan akun yang sudah terdaftar. </p></div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/components/molecules/LoginFormHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const LoginFormHeader = Object.assign(_sfc_main$2, { __name: "MoleculesLoginFormHeader" });
const FORM_MESSAGE_ID = "login-form-message";
const USERNAME_ERROR_ID = "username-error";
const PASSWORD_ERROR_ID = "password-error";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LoginForm",
  __ssrInlineRender: true,
  props: {
    errorMessage: { default: "" },
    isSubmitting: { type: Boolean, default: false },
    successMessage: { default: "" }
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const username = ref("");
    const password = ref("");
    const validationMessage = ref("");
    const fieldErrors = reactive({
      username: "",
      password: ""
    });
    const displayErrorMessage = computed(() => validationMessage.value || props.errorMessage);
    const hasAuthError = computed(() => Boolean(props.errorMessage));
    const isUsernameInvalid = computed(() => Boolean(fieldErrors.username || hasAuthError.value));
    const isPasswordInvalid = computed(() => Boolean(fieldErrors.password || hasAuthError.value));
    const usernameDescribedBy = computed(() => [
      fieldErrors.username ? USERNAME_ERROR_ID : "",
      hasAuthError.value ? FORM_MESSAGE_ID : ""
    ].filter(Boolean).join(" ") || void 0);
    const passwordDescribedBy = computed(() => [
      fieldErrors.password ? PASSWORD_ERROR_ID : "",
      hasAuthError.value ? FORM_MESSAGE_ID : ""
    ].filter(Boolean).join(" ") || void 0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<form${ssrRenderAttrs(mergeProps({
        class: "space-y-6",
        "aria-busy": props.isSubmitting
      }, _attrs))}>`);
      _push(ssrRenderComponent(LoginFormHeader, null, null, _parent));
      if (unref(displayErrorMessage)) {
        _push(ssrRenderComponent(unref(_sfc_main$2$1), {
          id: FORM_MESSAGE_ID,
          variant: "destructive"
        }, {
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
      _push(`<div class="space-y-4"><div class="space-y-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$3), { for: "username" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Username`);
          } else {
            return [
              createTextVNode("Username")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1$2), {
        id: "username",
        modelValue: unref(username),
        "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
        type: "text",
        class: "h-11",
        autocomplete: "username",
        placeholder: "Masukkan username",
        "aria-invalid": unref(isUsernameInvalid) || void 0,
        "aria-describedby": unref(usernameDescribedBy),
        disabled: props.isSubmitting
      }, null, _parent));
      if (unref(fieldErrors).username) {
        _push(`<p${ssrRenderAttr("id", USERNAME_ERROR_ID)} class="text-sm text-destructive">${ssrInterpolate(unref(fieldErrors).username)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-2"><div class="flex items-center justify-between gap-3">`);
      _push(ssrRenderComponent(unref(_sfc_main$3), { for: "password" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kata sandi`);
          } else {
            return [
              createTextVNode("Kata sandi")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/forgot-password",
        class: "text-sm font-medium text-primary underline-offset-4 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lupa password? `);
          } else {
            return [
              createTextVNode(" Lupa password? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(AuthPasswordInput, {
        id: "password",
        modelValue: unref(password),
        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
        "aria-invalid": unref(isPasswordInvalid) || void 0,
        "aria-describedby": unref(passwordDescribedBy),
        disabled: props.isSubmitting
      }, null, _parent));
      if (unref(fieldErrors).password) {
        _push(`<p${ssrRenderAttr("id", PASSWORD_ERROR_ID)} class="text-sm text-destructive">${ssrInterpolate(unref(fieldErrors).password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        type: "submit",
        class: "h-11 w-full",
        disabled: __props.isSubmitting
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.isSubmitting) {
              _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(__props.isSubmitting ? "Masuk..." : "Masuk")}`);
          } else {
            return [
              __props.isSubmitting ? (openBlock(), createBlock(unref(_sfc_main$5), {
                key: 0,
                class: "size-4"
              })) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(__props.isSubmitting ? "Masuk..." : "Masuk"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/components/organisms/LoginForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LoginForm = Object.assign(_sfc_main$1, { __name: "OrganismsLoginForm" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Login"
    });
    const route = useRoute();
    const { errorMessage, isLoading, login } = useAuth();
    const { setFlashToast } = useFlashToast();
    async function handleLogin(payload) {
      const session = await login(payload);
      if (!session) {
        return;
      }
      const defaultPath = getDefaultAuthenticatedPath(session.user.role);
      const redirectPath = typeof route.query.redirect === "string" ? route.query.redirect : defaultPath;
      const targetPath = isAllowedRedirect(redirectPath, session.user.role) ? redirectPath : defaultPath;
      setFlashToast({
        type: "success",
        title: `Login berhasil sebagai ${session.user.name}`,
        description: getLoginSuccessDescription(session.user.role)
      });
      await navigateTo(targetPath);
    }
    function isAllowedRedirect(path, role) {
      const defaultPath = getDefaultAuthenticatedPath(role);
      return path === defaultPath || path.startsWith(`${defaultPath}/`);
    }
    function getLoginSuccessDescription(role) {
      if (role === "admin") {
        return "Anda masuk ke area admin.";
      }
      if (role === "cashier") {
        return "Anda masuk ke area kasir.";
      }
      return "Role akun belum dikenali oleh frontend.";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LoginForm, mergeProps({
        "error-message": unref(errorMessage),
        "is-submitting": unref(isLoading),
        onSubmit: handleLogin
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-B6e-Qifk.mjs.map
