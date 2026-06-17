import { defineComponent, reactive, ref, watch, computed, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { ImageIcon, Upload, X, Calculator, Plus, Trash2 } from 'lucide-vue-next';
import { _ as _sfc_main$4 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1, a as _sfc_main$5 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { _ as _sfc_main$3 } from './Textarea-DYkcGDV8.mjs';
import { i as isValidImageReference, A as ADMIN_IMAGE_UPLOAD_ACCEPT } from './image-upload-BN8fXv4v.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminMenuForm",
  __ssrInlineRender: true,
  props: {
    categoryOptions: { default: () => [] },
    recipeOptions: { default: () => [] },
    initialValue: { default: null },
    submitting: { type: Boolean, default: false }
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
      categoryId: "",
      description: "",
      imageUrl: "",
      sellingPrice: "",
      availability: "available"
    });
    const errors = reactive({
      name: "",
      categoryId: "",
      description: "",
      imageUrl: "",
      sellingPrice: "",
      availability: "",
      recipe: ""
    });
    const recipeRows = ref([]);
    const imageFileInput = ref(null);
    const selectedImageFile = ref(null);
    const selectedImageFileName = ref("");
    const imagePreviewDataUrl = ref("");
    watch(() => props.initialValue, (value) => resetForm(value), { immediate: true });
    watch(() => props.categoryOptions, (options) => {
      if (!form.categoryId && options.length) {
        form.categoryId = options[0]?.id ?? "";
      }
    }, { immediate: true });
    watch(() => props.recipeOptions, () => {
      recipeRows.value.forEach((row) => {
        const selectedOption = props.recipeOptions.find((option) => option.id === row.itemId);
        if (selectedOption) {
          row.type = selectedOption.type;
          row.itemName = selectedOption.name;
          row.unit = selectedOption.unit;
          row.costPerUnit = selectedOption.costPerUnit ?? row.costPerUnit;
          return;
        }
        const typedOptions = getOptionsByType(row.type);
        if (!row.itemId && typedOptions.length) {
          const option = typedOptions[0];
          row.itemId = option?.id ?? "";
          row.itemName = option?.name ?? "";
          row.unit = option?.unit ?? "";
          row.costPerUnit = option?.costPerUnit;
        }
      });
    }, { immediate: true });
    const imagePreviewUrl = computed(() => imagePreviewDataUrl.value || form.imageUrl.trim());
    const imageReferenceInputValue = computed(
      () => selectedImageFile.value ? selectedImageFileName.value : form.imageUrl
    );
    const canShowImagePreview = computed(() => Boolean(
      imagePreviewUrl.value && isValidImageReference(imagePreviewUrl.value)
    ));
    const selectedCategoryName = computed(() => props.categoryOptions.find((category) => category.id === form.categoryId)?.name ?? "");
    const validRecipeItems = computed(
      () => recipeRows.value.map((row) => {
        const quantity = toNumber(row.quantity);
        if (!row.itemId || !Number.isFinite(quantity) || quantity <= 0) {
          return null;
        }
        return {
          ingredientId: row.itemId,
          qtyNeeded: roundQuantity(quantity)
        };
      }).filter((item) => Boolean(item))
    );
    const recipePreviewItems = computed(() => recipeRows.value.map((row) => {
      const option = getRecipeOption(row);
      const quantity = toNumber(row.quantity);
      const costPerUnit = normalizeCost(option?.costPerUnit ?? row.costPerUnit);
      const subtotal = Number.isFinite(quantity) && quantity > 0 && costPerUnit > 0 ? Math.round(quantity * costPerUnit) : 0;
      return {
        row,
        option,
        quantity,
        costPerUnit,
        subtotal
      };
    }));
    const calculatedRecipeCost = computed(() => recipePreviewItems.value.reduce((total, item) => total + item.subtotal, 0));
    const totalRecipeCost = computed(() => calculatedRecipeCost.value || props.initialValue?.currentCost || 0);
    const sellingPriceValue = computed(() => toNumber(form.sellingPrice));
    const marginValue = computed(() => sellingPriceValue.value - totalRecipeCost.value);
    const marginPercent = computed(() => {
      if (sellingPriceValue.value <= 0) {
        return 0;
      }
      return Math.round(marginValue.value / sellingPriceValue.value * 100);
    });
    const hasCostPreview = computed(() => totalRecipeCost.value > 0);
    const recipeSummary = computed(() => {
      const names = recipePreviewItems.value.map((item) => item.option?.name || item.row.itemName).filter(Boolean);
      if (!names.length) {
        return "Belum ada bahan resep";
      }
      return names.join(", ");
    });
    const marginToneClass = computed(
      () => marginValue.value < 0 ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-success/40 bg-success/10 text-foreground"
    );
    const canSubmit = computed(() => {
      const hasValidIdentity = Boolean(
        form.name.trim() && form.categoryId && (!form.imageUrl.trim() || isValidImageReference(form.imageUrl.trim()))
      );
      const hasValidPrice = Boolean(
        form.sellingPrice.trim() && Number.isFinite(sellingPriceValue.value) && sellingPriceValue.value > 0
      );
      const hasValidRecipe = recipeRows.value.length > 0 && validRecipeItems.value.length === recipeRows.value.length && !hasDuplicateRecipeIngredients();
      return hasValidIdentity && hasValidPrice && hasValidRecipe;
    });
    function resetForm(value) {
      form.name = value?.name ?? "";
      form.categoryId = value?.categoryId || props.categoryOptions[0]?.id || "";
      form.description = value?.description ?? "";
      form.imageUrl = value?.imageUrl ?? "";
      form.sellingPrice = value?.sellingPrice ? String(value.sellingPrice) : "";
      form.availability = value?.isAvailable === false ? "unavailable" : "available";
      recipeRows.value = (value?.recipeItems ?? []).map((item) => createRecipeRow({
        type: item.type,
        itemId: item.ingredientId,
        itemName: item.ingredientName,
        quantity: item.qtyNeeded,
        unit: item.unit,
        costPerUnit: item.costPerUnit
      }));
      selectedImageFile.value = null;
      selectedImageFileName.value = "";
      imagePreviewDataUrl.value = "";
      clearErrors();
      if (imageFileInput.value) {
        imageFileInput.value.value = "";
      }
    }
    function createRecipeRow(initial) {
      const option = initial?.itemId ? props.recipeOptions.find((candidate) => candidate.id === initial.itemId) : void 0;
      const type = option?.type ?? initial?.type ?? "ingredient";
      const fallbackOption = option ?? getOptionsByType(type)[0] ?? props.recipeOptions[0];
      return {
        localId: `recipe-row-${recipeRowSequence++}`,
        type: fallbackOption?.type ?? type,
        itemId: initial?.itemId ?? fallbackOption?.id ?? "",
        itemName: initial?.itemName ?? fallbackOption?.name ?? "",
        quantity: initial?.quantity ? String(initial.quantity) : "",
        unit: initial?.unit ?? fallbackOption?.unit ?? "",
        costPerUnit: initial?.costPerUnit ?? fallbackOption?.costPerUnit
      };
    }
    function getOptionsByType(type) {
      return props.recipeOptions.filter((option) => option.type === type);
    }
    function getRecipeOption(row) {
      return props.recipeOptions.find((option) => option.id === row.itemId) ?? (row.itemId ? {
        id: row.itemId,
        name: row.itemName || "Bahan tersimpan",
        type: row.type,
        unit: row.unit || "-",
        costPerUnit: row.costPerUnit
      } : void 0);
    }
    function updateRecipeType(row, value) {
      const type = value === "semi_finished" ? "semi_finished" : "ingredient";
      const option = getOptionsByType(type)[0];
      row.type = type;
      row.itemId = option?.id ?? "";
      row.itemName = option?.name ?? "";
      row.unit = option?.unit ?? "";
      row.costPerUnit = option?.costPerUnit;
    }
    function updateRecipeItem(row, value) {
      const option = props.recipeOptions.find((candidate) => candidate.id === String(value));
      row.itemId = option?.id ?? String(value);
      row.itemName = option?.name ?? row.itemName;
      row.unit = option?.unit ?? row.unit;
      row.costPerUnit = option?.costPerUnit ?? row.costPerUnit;
    }
    function addRecipeRow() {
      recipeRows.value = [...recipeRows.value, createRecipeRow()];
      errors.recipe = "";
    }
    function removeRecipeRow(localId) {
      recipeRows.value = recipeRows.value.filter((row) => row.localId !== localId);
      errors.recipe = "";
    }
    function openImageFilePicker() {
      if (props.submitting) {
        return;
      }
      imageFileInput.value?.click();
    }
    function handleImageReferenceInput(value) {
      form.imageUrl = String(value);
      selectedImageFile.value = null;
      selectedImageFileName.value = "";
      imagePreviewDataUrl.value = "";
      errors.imageUrl = "";
    }
    function clearImageReference() {
      form.imageUrl = "";
      selectedImageFile.value = null;
      selectedImageFileName.value = "";
      imagePreviewDataUrl.value = "";
      errors.imageUrl = "";
      if (imageFileInput.value) {
        imageFileInput.value.value = "";
      }
    }
    function clearErrors() {
      Object.keys(errors).forEach((key) => {
        errors[key] = "";
      });
    }
    function hasDuplicateRecipeIngredients() {
      const selectedIds = recipeRows.value.map((row) => row.itemId).filter(Boolean);
      return new Set(selectedIds).size !== selectedIds.length;
    }
    function toNumber(value) {
      const parsed = Number(String(value || "").replace(",", "."));
      return Number.isFinite(parsed) ? parsed : 0;
    }
    function normalizeCost(value) {
      return Number.isFinite(value) ? Number(value) : 0;
    }
    function roundQuantity(value) {
      return Math.round(value * 100) / 100;
    }
    function formatCurrency(value) {
      return currencyFormatter.format(value).replace(/\s/g, "");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({
        class: "flex flex-1 flex-col",
        "aria-busy": props.submitting
      }, _attrs))}><div class="grid flex-1 gap-3 xl:grid-cols-[minmax(17rem,23rem)_minmax(0,1fr)] xl:items-stretch"><section class="flex h-full flex-col rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="menu-identity-title"><div class="mb-3"><h2 id="menu-identity-title" class="text-base font-semibold tracking-normal"> Identitas Menu </h2><p class="mt-1 text-sm text-muted-foreground"> Data dasar menu yang tampil di admin dan kasir. </p></div><div class="space-y-3"><div class="flex min-h-40 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground">`);
      if (unref(canShowImagePreview)) {
        _push(`<img${ssrRenderAttr("src", unref(imagePreviewUrl))}${ssrRenderAttr("alt", unref(form).name || "Preview gambar menu")} class="size-full object-cover">`);
      } else {
        _push(`<div class="flex flex-col items-center gap-2 text-xs">`);
        _push(ssrRenderComponent(unref(ImageIcon), {
          class: "size-9",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<span>Preview gambar</span></div>`);
      }
      _push(`</div><div class="space-y-3"><div class="space-y-1.5"><label for="admin-menu-name" class="text-sm font-medium">Nama menu</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "admin-menu-name",
        modelValue: unref(form).name,
        "onUpdate:modelValue": ($event) => unref(form).name = $event,
        disabled: props.submitting,
        "aria-invalid": unref(errors).name ? true : void 0,
        "aria-describedby": "admin-menu-name-error",
        placeholder: "Nasi Goreng Spesial"
      }, null, _parent));
      if (unref(errors).name) {
        _push(`<p id="admin-menu-name-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-1.5"><label for="admin-menu-category" class="text-sm font-medium">Kategori</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        id: "admin-menu-category",
        modelValue: unref(form).categoryId,
        "onUpdate:modelValue": ($event) => unref(form).categoryId = $event,
        class: "w-full",
        disabled: props.submitting || !__props.categoryOptions.length,
        "aria-invalid": unref(errors).categoryId ? true : void 0,
        "aria-describedby": "admin-menu-category-error"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!__props.categoryOptions.length) {
              _push2(`<option value=""${_scopeId}>Belum ada kategori</option>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.categoryOptions, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              !__props.categoryOptions.length ? (openBlock(), createBlock("option", {
                key: 0,
                value: ""
              }, "Belum ada kategori")) : createCommentVNode("", true),
              (openBlock(true), createBlock(Fragment, null, renderList(__props.categoryOptions, (category) => {
                return openBlock(), createBlock("option", {
                  key: category.id,
                  value: category.id
                }, toDisplayString(category.name), 9, ["value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(errors).categoryId) {
        _push(`<p id="admin-menu-category-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).categoryId)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-1.5"><label for="admin-menu-status" class="text-sm font-medium">Status</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        id: "admin-menu-status",
        modelValue: unref(form).availability,
        "onUpdate:modelValue": ($event) => unref(form).availability = $event,
        class: "w-full",
        disabled: props.submitting
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="available"${_scopeId}>Tersedia</option><option value="unavailable"${_scopeId}>Habis</option>`);
          } else {
            return [
              createVNode("option", { value: "available" }, "Tersedia"),
              createVNode("option", { value: "unavailable" }, "Habis")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-1.5"><label for="admin-menu-description" class="text-sm font-medium">Deskripsi</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        id: "admin-menu-description",
        modelValue: unref(form).description,
        "onUpdate:modelValue": ($event) => unref(form).description = $event,
        disabled: props.submitting,
        class: "min-h-20",
        placeholder: "Deskripsi singkat menu"
      }, null, _parent));
      _push(`</div><div class="space-y-1.5"><label for="admin-menu-image-url" class="text-sm font-medium">Gambar menu</label><div class="flex flex-col gap-2 sm:flex-row">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "admin-menu-image-url",
        "model-value": unref(imageReferenceInputValue),
        disabled: props.submitting,
        readonly: Boolean(unref(selectedImageFile)),
        "aria-invalid": unref(errors).imageUrl ? true : void 0,
        "aria-describedby": "admin-menu-image-url-error",
        inputmode: "url",
        placeholder: "https://... atau pilih file",
        class: "sm:flex-1",
        "onUpdate:modelValue": handleImageReferenceInput
      }, null, _parent));
      _push(`<input type="file" class="sr-only"${ssrRenderAttr("accept", unref(ADMIN_IMAGE_UPLOAD_ACCEPT))}${ssrIncludeBooleanAttr(props.submitting) ? " disabled" : ""}><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        type: "button",
        variant: "outline",
        class: "flex-1 sm:flex-none",
        disabled: props.submitting,
        onClick: openImageFilePicker
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Upload), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(` Pilih File `);
          } else {
            return [
              createVNode(unref(Upload), {
                class: "size-4",
                "aria-hidden": "true"
              }),
              createTextVNode(" Pilih File ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(form).imageUrl || unref(selectedImageFile)) {
        _push(ssrRenderComponent(unref(_sfc_main$4), {
          type: "button",
          variant: "ghost",
          size: "icon",
          disabled: props.submitting,
          "aria-label": "Hapus gambar menu",
          onClick: clearImageReference
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(X), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(X), {
                  class: "size-4",
                  "aria-hidden": "true"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(errors).imageUrl) {
        _push(`<p id="admin-menu-image-url-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).imageUrl)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="rounded-md border bg-muted/30 px-3 py-2 text-sm"><p class="text-xs font-medium text-muted-foreground">Kategori dipilih</p><p class="mt-1 truncate font-medium text-foreground">${ssrInterpolate(unref(selectedCategoryName) || "-")}</p></div><div class="border-t pt-3">`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        type: "submit",
        class: "w-full",
        disabled: props.submitting || !unref(canSubmit)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.submitting) {
              _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(props.submitting ? "Menyimpan..." : "Simpan Menu")}`);
          } else {
            return [
              props.submitting ? (openBlock(), createBlock(unref(_sfc_main$5), {
                key: 0,
                class: "size-4"
              })) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(props.submitting ? "Menyimpan..." : "Simpan Menu"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section><div class="flex min-w-0 flex-col gap-3 xl:h-full"><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="menu-price-title"><div class="mb-3"><h2 id="menu-price-title" class="text-base font-semibold tracking-normal"> Harga &amp; HPP </h2><p class="mt-1 text-sm text-muted-foreground"> HPP final dihitung backend dari resep setelah menu disimpan. </p></div><div class="grid gap-2 md:grid-cols-3"><div class="space-y-1.5"><label for="admin-menu-price" class="text-sm font-medium">Harga jual</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        id: "admin-menu-price",
        modelValue: unref(form).sellingPrice,
        "onUpdate:modelValue": ($event) => unref(form).sellingPrice = $event,
        disabled: props.submitting,
        "aria-invalid": unref(errors).sellingPrice ? true : void 0,
        "aria-describedby": "admin-menu-price-error",
        inputmode: "numeric",
        placeholder: "25000"
      }, null, _parent));
      if (unref(errors).sellingPrice) {
        _push(`<p id="admin-menu-price-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).sellingPrice)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="rounded-md border px-3 py-2"><p class="text-xs font-medium text-muted-foreground">HPP resep</p><p class="mt-1 truncate text-base font-semibold">${ssrInterpolate(unref(hasCostPreview) ? formatCurrency(unref(totalRecipeCost)) : "-")}</p><p class="mt-1 text-xs text-muted-foreground">${ssrInterpolate(unref(recipeRows).length)} bahan</p></div><div class="${ssrRenderClass([unref(marginToneClass), "rounded-md border px-3 py-2"])}"><div class="flex items-start gap-2">`);
      _push(ssrRenderComponent(unref(Calculator), {
        class: "mt-0.5 size-4 shrink-0",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`<div class="min-w-0"><p class="text-xs font-medium text-muted-foreground">Margin</p><p class="mt-1 truncate text-base font-semibold">${ssrInterpolate(unref(hasCostPreview) ? formatCurrency(unref(marginValue)) : "-")}</p><p class="mt-1 text-xs text-muted-foreground">${ssrInterpolate(unref(hasCostPreview) ? `${unref(marginPercent)}% dari harga jual` : "Menunggu HPP backend")}</p></div></div></div></div></section><section class="flex flex-1 flex-col rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="menu-recipe-title"><div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="menu-recipe-title" class="text-base font-semibold tracking-normal"> Resep Menu </h2><p class="mt-1 text-sm text-muted-foreground"> Pilihan bahan diambil dari endpoint bahan aktif RAW dan SEMI. </p></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        type: "button",
        variant: "outline",
        size: "sm",
        disabled: props.submitting || !__props.recipeOptions.length,
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
        _push(`</div><p class="mt-3 text-sm font-medium"> Belum ada bahan resep </p><p class="mt-1 max-w-md text-sm text-muted-foreground"> Klik Tambah Bahan untuk memasukkan bahan baku atau bahan setengah jadi. </p></div>`);
      } else {
        _push(`<div class="space-y-2"><!--[-->`);
        ssrRenderList(unref(recipeRows), (row, index) => {
          _push(`<div class="grid gap-2 rounded-md border bg-background p-2.5 md:grid-cols-[8rem_minmax(10rem,1fr)_6rem_5rem_7rem_7rem_auto] md:items-end"><div class="space-y-1.5"><label${ssrRenderAttr("for", `recipe-type-${row.localId}`)} class="text-sm font-medium">Jenis</label>`);
          _push(ssrRenderComponent(unref(_sfc_main$2), {
            id: `recipe-type-${row.localId}`,
            "model-value": row.type,
            class: "w-full",
            disabled: props.submitting,
            "onUpdate:modelValue": (value) => updateRecipeType(row, value)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<option value="ingredient"${_scopeId}>Bahan baku</option><option value="semi_finished"${_scopeId}>Setengah jadi</option>`);
              } else {
                return [
                  createVNode("option", { value: "ingredient" }, "Bahan baku"),
                  createVNode("option", { value: "semi_finished" }, "Setengah jadi")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="space-y-1.5"><label${ssrRenderAttr("for", `recipe-item-${row.localId}`)} class="text-sm font-medium">Bahan</label>`);
          _push(ssrRenderComponent(unref(_sfc_main$2), {
            id: `recipe-item-${row.localId}`,
            "model-value": row.itemId,
            class: "w-full",
            disabled: props.submitting || !getOptionsByType(row.type).length,
            "onUpdate:modelValue": (value) => updateRecipeItem(row, value)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (row.itemId && !getOptionsByType(row.type).some((option) => option.id === row.itemId)) {
                  _push2(`<option${ssrRenderAttr("value", row.itemId)}${_scopeId}>${ssrInterpolate(row.itemName || "Bahan tersimpan")}</option>`);
                } else {
                  _push2(`<!---->`);
                }
                if (!getOptionsByType(row.type).length) {
                  _push2(`<option value=""${_scopeId}>Belum ada bahan</option>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--[-->`);
                ssrRenderList(getOptionsByType(row.type), (option) => {
                  _push2(`<option${ssrRenderAttr("value", option.id)}${_scopeId}>${ssrInterpolate(option.name)}</option>`);
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  row.itemId && !getOptionsByType(row.type).some((option) => option.id === row.itemId) ? (openBlock(), createBlock("option", {
                    key: 0,
                    value: row.itemId
                  }, toDisplayString(row.itemName || "Bahan tersimpan"), 9, ["value"])) : createCommentVNode("", true),
                  !getOptionsByType(row.type).length ? (openBlock(), createBlock("option", {
                    key: 1,
                    value: ""
                  }, "Belum ada bahan")) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(getOptionsByType(row.type), (option) => {
                    return openBlock(), createBlock("option", {
                      key: option.id,
                      value: option.id
                    }, toDisplayString(option.name), 9, ["value"]);
                  }), 128))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="space-y-1.5"><label${ssrRenderAttr("for", `recipe-qty-${row.localId}`)} class="text-sm font-medium">Jumlah</label>`);
          _push(ssrRenderComponent(unref(_sfc_main$1), {
            id: `recipe-qty-${row.localId}`,
            modelValue: row.quantity,
            "onUpdate:modelValue": ($event) => row.quantity = $event,
            disabled: props.submitting,
            inputmode: "decimal",
            placeholder: "1"
          }, null, _parent));
          _push(`</div><div class="space-y-1.5"><p class="text-sm font-medium">Satuan</p><p class="flex h-9 items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">${ssrInterpolate((getRecipeOption(row)?.unit ?? row.unit) || "-")}</p></div><div class="space-y-1.5"><p class="text-sm font-medium">HPP/unit</p><p class="flex h-9 items-center justify-end rounded-md border bg-muted px-3 text-sm font-medium">${ssrInterpolate(unref(recipePreviewItems)[index]?.costPerUnit ? formatCurrency(unref(recipePreviewItems)[index]?.costPerUnit ?? 0) : "-")}</p></div><div class="space-y-1.5"><p class="text-sm font-medium">Subtotal</p><p class="flex h-9 items-center justify-end rounded-md border bg-muted px-3 text-sm font-medium">${ssrInterpolate(unref(recipePreviewItems)[index]?.subtotal ? formatCurrency(unref(recipePreviewItems)[index]?.subtotal ?? 0) : "-")}</p></div>`);
          _push(ssrRenderComponent(unref(_sfc_main$4), {
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
      _push(`</div><div class="mt-3 rounded-md border bg-muted/30 px-3 py-2 text-sm"><p class="text-xs font-medium text-muted-foreground">Ringkasan resep</p><p class="mt-1 line-clamp-2 text-foreground">${ssrInterpolate(unref(recipeSummary))}</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/organisms/AdminMenuForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminMenuForm = Object.assign(_sfc_main, { __name: "OrganismsAdminMenuForm" });

export { AdminMenuForm as A };
//# sourceMappingURL=AdminMenuForm-By1tymty.mjs.map
