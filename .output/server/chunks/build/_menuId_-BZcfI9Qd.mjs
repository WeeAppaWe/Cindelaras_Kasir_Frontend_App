import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { ArrowLeft } from 'lucide-vue-next';
import { _ as _sfc_main$1 } from './index-BZG70idc.mjs';
import { a as _sfc_main$2 } from './Spinner-nalFRPxS.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminMenuForm } from './AdminMenuForm-By1tymty.mjs';
import { u as useAdminMenuApi, c as createAdminMenuMutationPayload, a as createAdminMenuRecipePayload } from './useAdminMenuApi-vXIXiUhL.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useRoute, n as navigateTo } from './server.mjs';
import { u as useAdminActionFeedback } from './useAdminActionFeedback-BRkOE1ij.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './NativeSelectOption-BTdv0zYA.mjs';
import './Textarea-DYkcGDV8.mjs';
import './image-upload-BN8fXv4v.mjs';
import './api-endpoints-Bk94Aoou.mjs';
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
import 'vue-sonner';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[menuId]",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Ubah Menu"
    });
    const route = useRoute();
    const adminMenuApi = useAdminMenuApi();
    const { runAdminAction } = useAdminActionFeedback();
    const isLoading = ref(false);
    const isSaving = ref(false);
    const loadError = ref("");
    const categoryOptions = ref([]);
    const recipeOptions = ref([]);
    const initialValue = ref(null);
    const menuId = computed(() => {
      const value = route.params.menuId;
      return Array.isArray(value) ? value[0] ?? "" : String(value ?? "");
    });
    const title = computed(() => initialValue.value?.name ? `Ubah ${initialValue.value.name}` : "Ubah Menu");
    async function handleSubmit(payload) {
      if (!menuId.value) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        const imageUrl = await resolveImageUrl(payload);
        await adminMenuApi.updateMenu(menuId.value, createAdminMenuMutationPayload(payload, imageUrl));
        await adminMenuApi.bulkUpdateMenuRecipes(menuId.value, createAdminMenuRecipePayload(payload));
      }, {
        loading: isSaving,
        successMessage: "Menu berhasil diperbarui.",
        errorMessage: "Gagal memperbarui menu."
      });
      if (succeeded) {
        await navigateTo("/admin/menu");
      }
    }
    async function resolveImageUrl(payload) {
      if (!payload.imageFile) {
        return payload.imageUrl || null;
      }
      const upload = await adminMenuApi.uploadMenuImage(payload.imageFile);
      if (!upload.url) {
        throw new Error("URL gambar tidak tersedia dari response upload.");
      }
      return upload.url;
    }
    function handleCancel() {
      return navigateTo("/admin/menu");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-full min-h-full flex-col gap-3 p-3 sm:p-4" }, _attrs))}><div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">`);
      _push(ssrRenderComponent(AdminPageHeader, {
        title: unref(title),
        description: "Perbarui identitas menu, gambar, harga jual, ketersediaan, dan resep HPP."
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        type: "button",
        variant: "outline",
        size: "sm",
        class: "shrink-0",
        onClick: handleCancel
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(` Kembali `);
          } else {
            return [
              createVNode(unref(ArrowLeft), {
                class: "size-4",
                "aria-hidden": "true"
              }),
              createTextVNode(" Kembali ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(loadError)) {
        _push(`<div class="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isLoading)) {
        _push(`<div class="flex min-h-64 items-center justify-center rounded-md border bg-card text-muted-foreground">`);
        _push(ssrRenderComponent(unref(_sfc_main$2), { class: "mr-2 size-4" }, null, _parent));
        _push(` Memuat detail menu... </div>`);
      } else if (unref(initialValue)) {
        _push(ssrRenderComponent(AdminMenuForm, {
          "category-options": unref(categoryOptions),
          "recipe-options": unref(recipeOptions),
          "initial-value": unref(initialValue),
          submitting: unref(isSaving),
          onSubmit: handleSubmit
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/menu/[menuId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_menuId_-BZcfI9Qd.mjs.map
