import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { ArrowLeft } from 'lucide-vue-next';
import { _ as _sfc_main$1 } from './index-BZG70idc.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminSemiFinishedIngredientForm } from './AdminSemiFinishedIngredientForm-Dsd4QIN6.mjs';
import { u as useAdminSemiIngredientApi, g as getAdminSemiIngredientValidationMessage, c as createAdminSemiIngredientProfilePayload, a as createAdminSemiIngredientBulkCompositionPayload } from './useAdminSemiIngredientApi--NlKdKb5.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useRoute, n as navigateTo } from './server.mjs';
import { u as useAdminActionFeedback } from './useAdminActionFeedback-BRkOE1ij.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './Spinner-nalFRPxS.mjs';
import './NativeSelectOption-BTdv0zYA.mjs';
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
  __name: "[semiFinishedIngredientsId]",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Ubah Bahan Setengah Jadi"
    });
    const route = useRoute();
    const adminSemiIngredientApi = useAdminSemiIngredientApi();
    const { runAdminAction } = useAdminActionFeedback();
    const ingredientId = computed(() => {
      const value = route.params.semiFinishedIngredientsId;
      return Array.isArray(value) ? value[0] ?? "" : String(value ?? "");
    });
    const unitOptions = ref([]);
    const ingredientOptions = ref([]);
    const initialValue = ref(null);
    const isLoading = ref(false);
    const isSaving = ref(false);
    const loadError = ref("");
    const formError = ref("");
    const titleName = ref("");
    async function handleSubmit(payload) {
      formError.value = getAdminSemiIngredientValidationMessage(payload);
      if (formError.value || !ingredientId.value) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        await adminSemiIngredientApi.updateSemiIngredient(
          ingredientId.value,
          createAdminSemiIngredientProfilePayload(payload)
        );
        await adminSemiIngredientApi.bulkReplaceSemiIngredientCompositions(
          ingredientId.value,
          createAdminSemiIngredientBulkCompositionPayload(payload)
        );
      }, {
        loading: isSaving,
        successMessage: "Bahan setengah jadi berhasil diperbarui.",
        errorMessage: "Gagal menyimpan perubahan bahan setengah jadi."
      });
      if (succeeded) {
        await navigateTo("/admin/semi-finished-ingredients");
      }
    }
    function handleCancel() {
      return navigateTo("/admin/semi-finished-ingredients");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex h-full min-h-full flex-col gap-3 p-3 sm:p-4",
        "aria-busy": unref(isLoading)
      }, _attrs))}><div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">`);
      _push(ssrRenderComponent(AdminPageHeader, {
        title: "Ubah Bahan Setengah Jadi",
        description: unref(titleName) ? `Perbarui profil dan komposisi ${unref(titleName)}.` : "Perbarui profil dan komposisi bahan setengah jadi."
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
      if (unref(formError)) {
        _push(`<div class="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(formError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isLoading)) {
        _push(`<div class="rounded-md border bg-card px-3 py-4 text-sm text-muted-foreground"> Memuat data bahan setengah jadi... </div>`);
      } else if (unref(initialValue)) {
        _push(ssrRenderComponent(AdminSemiFinishedIngredientForm, {
          "unit-options": unref(unitOptions),
          "ingredient-options": unref(ingredientOptions),
          "initial-value": unref(initialValue),
          submitting: unref(isSaving),
          "submit-label": "Simpan Perubahan",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/semi-finished-ingredients/[semiFinishedIngredientsId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_semiFinishedIngredientsId_-DBCWpJ4W.mjs.map
