import { defineComponent, reactive, ref, watch, computed, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { Plus, Trash2 } from 'lucide-vue-next';
import { _ as _sfc_main$3 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1, a as _sfc_main$4 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminSemiFinishedIngredientForm",
  __ssrInlineRender: true,
  props: {
    unitOptions: {},
    ingredientOptions: {},
    initialValue: { default: null },
    submitting: { type: Boolean, default: false },
    submitLabel: { default: "Simpan Olahan" }
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const currencyFormatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    });
    let recipeRowSequence = 0;
    const form = reactive({
      name: "",
      unitId: "",
      minStock: "0"
    });
    const errors = reactive({
      name: "",
      unitId: "",
      minStock: "",
      recipe: ""
    });
    const recipeRows = ref([]);
    watch(() => props.initialValue, (value) => {
      if (value) {
        applyFormPayload(value);
        return;
      }
      if (!form.unitId && props.unitOptions.length) {
        form.unitId = props.unitOptions[0]?.id ?? "";
      }
    }, { immediate: true, deep: true });
    watch(() => props.unitOptions, (options) => {
      if (!form.unitId && options.length) {
        form.unitId = options[0]?.id ?? "";
      }
    }, { immediate: true });
    const minStockValue = computed(() => toNumber(form.minStock));
    const targetUnitName = computed(() => getUnitOption(form.unitId)?.name ?? "");
    const recipeItems = computed(() => {
      return recipeRows.value.map((row) => {
        const option = getIngredientOption(row.itemId);
        const quantity = toNumber(row.quantity);
        if (!option || !Number.isFinite(quantity) || quantity <= 0) {
          return null;
        }
        return {
          childId: option.id,
          itemName: option.name,
          quantity,
          unit: option.unitName,
          costPerUnit: option.costPerUnit,
          subtotal: Math.round(quantity * option.costPerUnit)
        };
      }).filter((item) => Boolean(item));
    });
    const hasDuplicateRecipe = computed(() => {
      const childIds = recipeItems.value.map((item) => item.childId);
      return new Set(childIds).size !== childIds.length;
    });
    const totalRecipeCost = computed(() => recipeItems.value.reduce((total, item) => total + item.subtotal, 0));
    const canSubmit = computed(() => {
      const hasValidIdentity = Boolean(form.name.trim() && form.unitId);
      const hasValidMinimumStock = Boolean(
        form.minStock.trim() && Number.isFinite(minStockValue.value) && minStockValue.value >= 0
      );
      const hasValidRecipe = recipeRows.value.length > 0 && recipeItems.value.length === recipeRows.value.length && !hasDuplicateRecipe.value;
      return hasValidIdentity && hasValidMinimumStock && hasValidRecipe;
    });
    function applyFormPayload(value) {
      form.name = value.name;
      form.unitId = value.unitId || props.unitOptions[0]?.id || "";
      form.minStock = String(value.minStock ?? 0);
      recipeRows.value = value.compositions.map((composition) => createRecipeRow(composition.child_id, composition.qty_needed));
    }
    function createRecipeRow(itemId = props.ingredientOptions[0]?.id ?? "", quantity = "") {
      return {
        localId: `semi-recipe-row-${recipeRowSequence++}`,
        itemId,
        quantity: String(quantity)
      };
    }
    function getUnitOption(id) {
      return props.unitOptions.find((option) => option.id === id);
    }
    function getIngredientOption(id) {
      return props.ingredientOptions.find((option) => option.id === id);
    }
    function addRecipeRow() {
      recipeRows.value = [...recipeRows.value, createRecipeRow()];
      errors.recipe = "";
    }
    function removeRecipeRow(localId) {
      recipeRows.value = recipeRows.value.filter((row) => row.localId !== localId);
      errors.recipe = "";
    }
    function toNumber(value) {
      const parsed = Number(value || 0);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    function formatCurrency(value) {
      return currencyFormatter.format(value).replace(/\s/g, "");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({
        class: "flex flex-1 flex-col",
        "aria-busy": props.submitting
      }, _attrs))}><div class="grid flex-1 gap-3 xl:grid-cols-[minmax(17rem,23rem)_minmax(0,1fr)] xl:items-stretch"><section class="flex h-full flex-col rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="semi-finished-identity-title"><div class="mb-3"><h2 id="semi-finished-identity-title" class="text-base font-semibold tracking-normal"> Identitas Olahan </h2><p class="mt-1 text-sm text-muted-foreground"> Data dasar bahan setengah jadi untuk resep menu dan produksi dapur. </p></div><div class="space-y-3"><div class="space-y-1.5"><label for="admin-semi-finished-name" class="text-sm font-medium">Nama bahan</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "admin-semi-finished-name",
        modelValue: unref(form).name,
        "onUpdate:modelValue": ($event) => unref(form).name = $event,
        disabled: props.submitting,
        "aria-invalid": unref(errors).name ? true : void 0,
        "aria-describedby": "admin-semi-finished-name-error",
        placeholder: "Sambal Bawang"
      }, null, _parent));
      if (unref(errors).name) {
        _push(`<p id="admin-semi-finished-name-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-1.5"><label for="admin-semi-finished-unit" class="text-sm font-medium">Satuan hasil</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        id: "admin-semi-finished-unit",
        modelValue: unref(form).unitId,
        "onUpdate:modelValue": ($event) => unref(form).unitId = $event,
        class: "w-full",
        disabled: props.submitting || !props.unitOptions.length,
        "aria-invalid": unref(errors).unitId ? true : void 0,
        "aria-describedby": "admin-semi-finished-unit-error"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!props.unitOptions.length) {
              _push2(`<option value=""${_scopeId}>Belum ada satuan</option>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(props.unitOptions, (unit) => {
              _push2(`<option${ssrRenderAttr("value", unit.id)}${_scopeId}>${ssrInterpolate(unit.name)}</option>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              !props.unitOptions.length ? (openBlock(), createBlock("option", {
                key: 0,
                value: ""
              }, "Belum ada satuan")) : createCommentVNode("", true),
              (openBlock(true), createBlock(Fragment, null, renderList(props.unitOptions, (unit) => {
                return openBlock(), createBlock("option", {
                  key: unit.id,
                  value: unit.id
                }, toDisplayString(unit.name), 9, ["value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(errors).unitId) {
        _push(`<p id="admin-semi-finished-unit-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).unitId)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-1.5"><label for="admin-semi-finished-min-stock" class="text-sm font-medium">Stok minimum</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "admin-semi-finished-min-stock",
        modelValue: unref(form).minStock,
        "onUpdate:modelValue": ($event) => unref(form).minStock = $event,
        disabled: props.submitting,
        "aria-invalid": unref(errors).minStock ? true : void 0,
        "aria-describedby": "admin-semi-finished-min-stock-error",
        inputmode: "decimal",
        placeholder: "0"
      }, null, _parent));
      if (unref(errors).minStock) {
        _push(`<p id="admin-semi-finished-min-stock-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).minStock)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="border-t pt-3">`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        type: "submit",
        class: "w-full",
        disabled: props.submitting || !unref(canSubmit)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.submitting) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(props.submitting ? "Menyimpan..." : props.submitLabel)}`);
          } else {
            return [
              props.submitting ? (openBlock(), createBlock(unref(_sfc_main$4), {
                key: 0,
                class: "size-4"
              })) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(props.submitting ? "Menyimpan..." : props.submitLabel), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><div class="flex min-w-0 flex-col gap-3 xl:h-full"><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="semi-finished-cost-title"><div class="mb-3"><h2 id="semi-finished-cost-title" class="text-base font-semibold tracking-normal"> Resep &amp; HPP </h2><p class="mt-1 text-sm text-muted-foreground"> Ringkasan biaya dihitung dari seluruh bahan baku penyusun. </p></div><div class="grid gap-2 md:grid-cols-3"><div class="rounded-md border px-3 py-2"><p class="text-xs font-medium text-muted-foreground">Total biaya resep</p><p class="mt-1 truncate text-base font-semibold">${ssrInterpolate(formatCurrency(unref(totalRecipeCost)))}</p><p class="mt-1 text-xs text-muted-foreground">${ssrInterpolate(unref(recipeItems).length)} bahan</p></div><div class="rounded-md border px-3 py-2"><p class="text-xs font-medium text-muted-foreground">Komposisi</p><p class="mt-1 truncate text-base font-semibold">${ssrInterpolate(unref(recipeItems).length)} bahan</p><p class="mt-1 text-xs text-muted-foreground">Bahan aktif di resep</p></div><div class="rounded-md border border-info/40 bg-info/10 px-3 py-2"><p class="text-xs font-medium text-muted-foreground">Satuan hasil</p><p class="mt-1 truncate text-base font-semibold">${ssrInterpolate(unref(targetUnitName) || "-")}</p><p class="mt-1 text-xs text-muted-foreground">Satuan stok olahan</p></div></div></section><section class="flex flex-1 flex-col rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="semi-finished-recipe-title"><div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="semi-finished-recipe-title" class="text-base font-semibold tracking-normal"> Komposisi Bahan </h2><p class="mt-1 text-sm text-muted-foreground"> Susun bahan baku dan bahan setengah jadi beserta takarannya untuk sekali proses produksi. </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        type: "button",
        variant: "outline",
        size: "sm",
        disabled: props.submitting || !props.ingredientOptions.length,
        onClick: addRecipeRow
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(` Tambah Bahan `);
          } else {
            return [
              createVNode(unref(Plus), {
                class: "size-4",
                "aria-hidden": "true"
              }),
              createTextVNode(" Tambah Bahan ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-1 flex-col">`);
      if (!unref(recipeRows).length) {
        _push(`<div class="flex min-h-40 flex-1 flex-col items-center justify-center rounded-md border border-dashed bg-muted/30 px-4 py-6 text-center"><div class="flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground">`);
        _push(ssrRenderComponent(unref(Plus), {
          class: "size-5",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`</div><p class="mt-3 text-sm font-medium"> Belum ada bahan resep </p><p class="mt-1 max-w-md text-sm text-muted-foreground"> Klik Tambah Bahan untuk memasukkan komponen produksi. </p></div>`);
      } else {
        _push(`<div class="space-y-2"><!--[-->`);
        ssrRenderList(unref(recipeRows), (row, index) => {
          _push(`<div class="grid gap-2 rounded-md border bg-background p-2.5 md:grid-cols-[minmax(12rem,1fr)_7rem_5rem_7rem_8rem_auto] md:items-end"><div class="space-y-1.5"><label${ssrRenderAttr("for", `semi-recipe-item-${row.localId}`)} class="text-sm font-medium">Bahan</label>`);
          _push(ssrRenderComponent(unref(_sfc_main$2), {
            id: `semi-recipe-item-${row.localId}`,
            modelValue: row.itemId,
            "onUpdate:modelValue": ($event) => row.itemId = $event,
            class: "w-full",
            disabled: props.submitting || !props.ingredientOptions.length
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (!props.ingredientOptions.length) {
                  _push2(`<option value=""${_scopeId}>Belum ada bahan</option>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--[-->`);
                ssrRenderList(props.ingredientOptions, (option) => {
                  _push2(`<option${ssrRenderAttr("value", option.id)}${_scopeId}>${ssrInterpolate(option.type === "SEMI" ? `[SEMI] ${option.name}` : option.name)}</option>`);
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  !props.ingredientOptions.length ? (openBlock(), createBlock("option", {
                    key: 0,
                    value: ""
                  }, "Belum ada bahan")) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(props.ingredientOptions, (option) => {
                    return openBlock(), createBlock("option", {
                      key: option.id,
                      value: option.id
                    }, toDisplayString(option.type === "SEMI" ? `[SEMI] ${option.name}` : option.name), 9, ["value"]);
                  }), 128))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="space-y-1.5"><label${ssrRenderAttr("for", `semi-recipe-qty-${row.localId}`)} class="text-sm font-medium">Jumlah</label>`);
          _push(ssrRenderComponent(unref(_sfc_main$1), {
            id: `semi-recipe-qty-${row.localId}`,
            modelValue: row.quantity,
            "onUpdate:modelValue": ($event) => row.quantity = $event,
            disabled: props.submitting,
            inputmode: "decimal",
            placeholder: "1"
          }, null, _parent));
          _push(`</div><div class="space-y-1.5"><p class="text-sm font-medium">Satuan</p><p class="flex h-9 items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">${ssrInterpolate(getIngredientOption(row.itemId)?.unitName ?? "-")}</p></div><div class="space-y-1.5"><p class="text-sm font-medium">HPP/unit</p><p class="flex h-9 items-center justify-end rounded-md border bg-muted px-3 text-sm font-medium">${ssrInterpolate(getIngredientOption(row.itemId)?.costPerUnit ? formatCurrency(getIngredientOption(row.itemId)?.costPerUnit ?? 0) : "-")}</p></div><div class="space-y-1.5"><p class="text-sm font-medium">Subtotal</p><p class="flex h-9 items-center justify-end rounded-md border bg-muted px-3 text-sm font-medium">${ssrInterpolate(formatCurrency(Math.round(toNumber(row.quantity) * (getIngredientOption(row.itemId)?.costPerUnit ?? 0))))}</p></div>`);
          _push(ssrRenderComponent(unref(_sfc_main$3), {
            type: "button",
            variant: "ghost",
            size: "sm",
            class: "text-destructive hover:bg-destructive/10 hover:text-destructive md:mb-0.5",
            disabled: props.submitting,
            "aria-label": `Hapus bahan resep baris ${index + 1}`,
            onClick: ($event) => removeRecipeRow(row.localId)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Trash2), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
                _push2(` Hapus `);
              } else {
                return [
                  createVNode(unref(Trash2), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Hapus ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      if (unref(errors).recipe) {
        _push(`<p class="mt-3 text-sm text-destructive">${ssrInterpolate(unref(errors).recipe)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section></div></div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/organisms/AdminSemiFinishedIngredientForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminSemiFinishedIngredientForm = Object.assign(_sfc_main, { __name: "OrganismsAdminSemiFinishedIngredientForm" });

export { AdminSemiFinishedIngredientForm as A };
//# sourceMappingURL=AdminSemiFinishedIngredientForm-Dsd4QIN6.mjs.map
