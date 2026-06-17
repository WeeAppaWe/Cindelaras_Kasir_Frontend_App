import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './Sonner-ympm_ln7.mjs';
import { u as useFlashToast } from './useFlashToast-HgpcM5Qo.mjs';
import { u as usePublicStoreProfile } from './usePublicStoreProfile-BNIGua-8.mjs';
import 'lucide-vue-next';
import 'vue-sonner';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './state-Dw1r7BQr.mjs';
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
import './api-endpoints-aT5YyZ8V.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    useFlashToast();
    const { publicStoreProfile } = usePublicStoreProfile();
    const brandLogoUrl = computed(() => publicStoreProfile.value.logoUrl.trim());
    const brandDisplayName = computed(() => publicStoreProfile.value.storeName.trim() || "Sistem Kasir");
    const brandSubtitle = computed(() => publicStoreProfile.value.storeAddress.trim() || "Universitas Teknologi Yogyakarta");
    const brandInitials = computed(() => {
      const words = brandDisplayName.value.split(/\s+/).filter(Boolean);
      const initials = words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("");
      return initials || "SK";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-dvh bg-background text-foreground" }, _attrs))}><main class="grid min-h-dvh lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"><section class="relative hidden min-h-dvh overflow-hidden bg-primary bg-cover bg-center lg:block" style="${ssrRenderStyle({ "background-image": "var(--auth-hero-image, none)" })}" aria-label="Informasi aplikasi"><div class="absolute inset-0 bg-primary/85" aria-hidden="true"></div><div class="relative z-10 flex min-h-dvh flex-col justify-between px-10 py-8 text-primary-foreground"><div class="flex items-center gap-3"><div class="flex size-10 items-center justify-center overflow-hidden rounded-md bg-primary-foreground text-sm font-semibold text-primary">`);
      if (unref(brandLogoUrl)) {
        _push(`<img${ssrRenderAttr("src", unref(brandLogoUrl))}${ssrRenderAttr("alt", `Logo ${unref(brandDisplayName)}`)} class="size-full object-contain p-1">`);
      } else {
        _push(`<span>${ssrInterpolate(unref(brandInitials))}</span>`);
      }
      _push(`</div><div><p class="text-sm font-semibold leading-none">${ssrInterpolate(unref(brandDisplayName))}</p><p class="mt-1 text-xs text-primary-foreground/90">${ssrInterpolate(unref(brandSubtitle))}</p></div></div><div class="max-w-md"><p class="text-3xl font-semibold leading-tight tracking-normal"> Panel operasional untuk transaksi yang rapi dan cepat. </p><p class="mt-4 text-sm leading-6 text-primary-foreground/90"> Kelola akses pengguna sebelum masuk ke area admin atau kasir. </p></div><div class="h-4" aria-hidden="true"></div></div></section><section class="flex min-h-dvh items-center justify-center px-5 py-8 sm:px-8 lg:px-14"><div class="w-full max-w-md"><div class="mb-8 flex items-center gap-3 lg:hidden"><div class="flex size-10 items-center justify-center overflow-hidden rounded-md bg-primary text-sm font-semibold text-primary-foreground">`);
      if (unref(brandLogoUrl)) {
        _push(`<img${ssrRenderAttr("src", unref(brandLogoUrl))}${ssrRenderAttr("alt", `Logo ${unref(brandDisplayName)}`)} class="size-full object-contain p-1">`);
      } else {
        _push(`<span>${ssrInterpolate(unref(brandInitials))}</span>`);
      }
      _push(`</div><div><p class="text-sm font-semibold leading-none">${ssrInterpolate(unref(brandDisplayName))}</p><p class="mt-1 text-xs text-muted-foreground">${ssrInterpolate(unref(brandSubtitle))}</p></div></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section></main>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        "rich-colors": "",
        "close-button": "",
        position: "top-right"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/layouts/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-6QqsNAFA.mjs.map
