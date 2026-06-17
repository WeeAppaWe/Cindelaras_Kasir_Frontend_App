import { defineComponent, computed, ref, reactive, unref, mergeProps, isRef, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, withModifiers, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderSlot } from 'vue/server-renderer';
import { Upload, X, AlertTriangle } from 'lucide-vue-next';
import { _ as _sfc_main$4 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6, b as _sfc_main$3, c as _sfc_main$1, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-B5C6UhMx.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$7 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2$1 } from './NativeSelectOption-BTdv0zYA.mjs';
import { _ as _sfc_main$2 } from './Textarea-DYkcGDV8.mjs';
import { b as AdminStatusBadge } from './AdminStatusBadge-BmT7CMZl.mjs';
import { a as isImageDataUrl, A as ADMIN_IMAGE_UPLOAD_ACCEPT, g as getImageFileValidationMessage, r as readImageFileAsDataUrl } from './image-upload-BN8fXv4v.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminCrudDialog",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    mode: {},
    title: {},
    description: { default: "" },
    form: {},
    fields: { default: () => [] },
    detailItems: { default: () => [] },
    targetName: { default: "" },
    submitLabel: { default: "" },
    loading: { type: Boolean, default: false },
    formError: { default: "" }
  },
  emits: ["update:open", "update:form", "submit", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isOpen = computed({
      get: () => props.open,
      set: (value) => emit("update:open", value)
    });
    const imageInputRefs = ref({});
    const imageErrors = reactive({});
    const isFormMode = computed(() => props.mode === "create" || props.mode === "edit");
    const primaryLabel = computed(() => {
      if (props.submitLabel) {
        return props.submitLabel;
      }
      if (props.mode === "create") {
        return "Simpan";
      }
      if (props.mode === "edit") {
        return "Simpan Perubahan";
      }
      if (props.mode === "delete") {
        return "Hapus";
      }
      return "Tutup";
    });
    function updateField(key, value) {
      emit("update:form", {
        ...props.form,
        [key]: String(value)
      });
    }
    function updateSelectField(key, event) {
      updateField(key, event.target.value);
    }
    function setImageInputRef(key, element) {
      imageInputRefs.value[key] = element instanceof HTMLInputElement ? element : null;
    }
    function openImageFilePicker(key) {
      if (props.loading) {
        return;
      }
      imageInputRefs.value[key]?.click();
    }
    async function handleImageFileChange(field, event) {
      const input = event.target;
      const file = input.files?.[0];
      if (!file) {
        return;
      }
      const validationMessage = getImageFileValidationMessage(file);
      if (validationMessage) {
        imageErrors[field.key] = validationMessage;
        input.value = "";
        return;
      }
      try {
        const dataUrl = await readImageFileAsDataUrl(file);
        updateField(field.key, dataUrl);
        imageErrors[field.key] = "";
      } catch (error) {
        imageErrors[field.key] = error instanceof Error ? error.message : "Gagal membaca file gambar.";
      } finally {
        input.value = "";
      }
    }
    function handleImageReferenceInput(key, value) {
      imageErrors[key] = "";
      updateField(key, String(value));
    }
    function clearImageReference(key) {
      imageErrors[key] = "";
      updateField(key, "");
      const input = imageInputRefs.value[key];
      if (input) {
        input.value = "";
      }
    }
    function getImageReferenceInputValue(key) {
      const value = props.form[key] ?? "";
      if (isImageDataUrl(value)) {
        return "Gambar dari file lokal";
      }
      return value;
    }
    function closeDialog() {
      isOpen.value = false;
    }
    function handleSubmit() {
      if (props.loading) {
        return;
      }
      if (props.mode === "delete") {
        emit("delete");
        return;
      }
      emit("submit");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$9), mergeProps({
        open: unref(isOpen),
        "onUpdate:open": ($event) => isRef(isOpen) ? isOpen.value = $event : null
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "max-h-[calc(100vh-2rem)] overflow-x-hidden overflow-y-auto sm:max-w-2xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.title)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.title), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (__props.description) {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(__props.description)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.title), 1)
                            ]),
                            _: 1
                          }),
                          __props.description ? (openBlock(), createBlock(unref(_sfc_main$5), { key: 0 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.description), 1)
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (__props.formError) {
                    _push3(`<div class="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive" role="alert"${_scopeId2}>${ssrInterpolate(__props.formError)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(isFormMode)) {
                    _push3(`<form class="grid gap-4 sm:grid-cols-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.fields, (field) => {
                      _push3(`<div class="${ssrRenderClass([field.colSpan === "full" || field.type === "textarea" ? "sm:col-span-2" : "", "grid gap-2"])}"${_scopeId2}><label${ssrRenderAttr("for", field.key)} class="text-sm font-medium text-foreground"${_scopeId2}>${ssrInterpolate(field.label)}</label>`);
                      if (field.type === "textarea") {
                        _push3(ssrRenderComponent(unref(_sfc_main$2), {
                          id: field.key,
                          "model-value": __props.form[field.key] ?? "",
                          placeholder: field.placeholder,
                          required: field.required,
                          disabled: __props.loading,
                          class: "min-h-24",
                          "onUpdate:modelValue": (value) => updateField(field.key, String(value))
                        }, null, _parent3, _scopeId2));
                      } else if (field.type === "select") {
                        _push3(ssrRenderComponent(unref(_sfc_main$2$1), {
                          id: field.key,
                          "model-value": __props.form[field.key] ?? "",
                          required: field.required,
                          disabled: __props.loading,
                          onChange: ($event) => updateSelectField(field.key, $event)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<!--[-->`);
                              ssrRenderList(field.options, (option) => {
                                _push4(`<option${ssrRenderAttr("value", option.value)}${_scopeId3}>${ssrInterpolate(option.label)}</option>`);
                              });
                              _push4(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.options, (option) => {
                                  return openBlock(), createBlock("option", {
                                    key: `${field.key}-${option.value}`,
                                    value: option.value
                                  }, toDisplayString(option.label), 9, ["value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else if (field.type === "image") {
                        _push3(`<div class="grid gap-2"${_scopeId2}><div class="flex flex-col gap-2 sm:flex-row"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(_sfc_main$1$1), {
                          id: field.key,
                          "model-value": getImageReferenceInputValue(field.key),
                          placeholder: field.placeholder,
                          required: field.required,
                          disabled: __props.loading,
                          readonly: unref(isImageDataUrl)(__props.form[field.key] ?? ""),
                          "aria-invalid": unref(imageErrors)[field.key] ? true : void 0,
                          inputmode: "url",
                          class: "sm:flex-1",
                          "onUpdate:modelValue": (value) => handleImageReferenceInput(field.key, String(value))
                        }, null, _parent3, _scopeId2));
                        _push3(`<input type="file" class="sr-only"${ssrRenderAttr("accept", unref(ADMIN_IMAGE_UPLOAD_ACCEPT))}${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""}${_scopeId2}><div class="flex gap-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(_sfc_main$4), {
                          type: "button",
                          variant: "outline",
                          class: "flex-1 sm:flex-none",
                          disabled: __props.loading,
                          onClick: ($event) => openImageFilePicker(field.key)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(Upload), {
                                class: "size-4",
                                "aria-hidden": "true"
                              }, null, _parent4, _scopeId3));
                              _push4(` Pilih File `);
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
                          _: 2
                        }, _parent3, _scopeId2));
                        if (__props.form[field.key]) {
                          _push3(ssrRenderComponent(unref(_sfc_main$4), {
                            type: "button",
                            variant: "ghost",
                            size: "icon",
                            disabled: __props.loading,
                            "aria-label": `Hapus ${field.label}`,
                            onClick: ($event) => clearImageReference(field.key)
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(ssrRenderComponent(unref(X), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                }, null, _parent4, _scopeId3));
                              } else {
                                return [
                                  createVNode(unref(X), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div></div>`);
                        if (unref(imageErrors)[field.key]) {
                          _push3(`<p class="text-xs text-destructive"${_scopeId2}>${ssrInterpolate(unref(imageErrors)[field.key])}</p>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        _push3(ssrRenderComponent(unref(_sfc_main$1$1), {
                          id: field.key,
                          type: field.type === "number" ? "number" : field.type === "password" ? "password" : "text",
                          inputmode: field.inputmode,
                          "model-value": __props.form[field.key] ?? "",
                          placeholder: field.placeholder,
                          required: field.required,
                          disabled: __props.loading,
                          step: "any",
                          "onUpdate:modelValue": (value) => updateField(field.key, String(value))
                        }, null, _parent3, _scopeId2));
                      }
                      _push3(`</div>`);
                    });
                    _push3(`<!--]--></form>`);
                  } else if (__props.mode === "detail") {
                    _push3(`<div class="space-y-3"${_scopeId2}><div class="grid gap-3 sm:grid-cols-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(__props.detailItems, (item) => {
                      _push3(`<div class="${ssrRenderClass([item.description ? "sm:col-span-2" : "", "rounded-md border bg-muted/30 p-3"])}"${_scopeId2}><p class="text-xs font-medium uppercase text-muted-foreground"${_scopeId2}>${ssrInterpolate(item.label)}</p>`);
                      if (item.tone) {
                        _push3(ssrRenderComponent(AdminStatusBadge, {
                          tone: item.tone,
                          class: "mt-2"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(item.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(item.value), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<p class="${ssrRenderClass([item.monospace ? "font-mono tabular-nums" : "", "mt-1 text-sm font-medium text-foreground"])}"${_scopeId2}>${ssrInterpolate(item.value)}</p>`);
                      }
                      if (item.description) {
                        _push3(`<p class="mt-1 text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(item.description)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    });
                    _push3(`<!--]--></div>`);
                    ssrRenderSlot(_ctx.$slots, "detail", {}, null, _push3, _parent3, _scopeId2);
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="flex gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(AlertTriangle), {
                      class: "mt-0.5 size-4 shrink-0 text-destructive",
                      "aria-hidden": "true"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}><p class="font-medium text-foreground"${_scopeId2}> Hapus ${ssrInterpolate(__props.targetName || "data ini")}? </p><p class="mt-1 text-muted-foreground"${_scopeId2}> Data akan dihapus dan tabel akan diperbarui setelah proses berhasil. </p></div></div>`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$4$1), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$4), {
                          type: "button",
                          variant: "outline",
                          disabled: __props.loading,
                          onClick: closeDialog
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(__props.mode === "detail" ? "Tutup" : "Batal")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(__props.mode === "detail" ? "Tutup" : "Batal"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (__props.mode !== "detail") {
                          _push4(ssrRenderComponent(unref(_sfc_main$4), {
                            type: "button",
                            variant: __props.mode === "delete" ? "destructive" : "default",
                            disabled: __props.loading,
                            onClick: handleSubmit
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.loading) {
                                  _push5(ssrRenderComponent(unref(_sfc_main$7), { class: "size-4" }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(` ${ssrInterpolate(__props.loading ? "Memproses..." : unref(primaryLabel))}`);
                              } else {
                                return [
                                  __props.loading ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                    key: 0,
                                    class: "size-4"
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" " + toDisplayString(__props.loading ? "Memproses..." : unref(primaryLabel)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(_sfc_main$4), {
                            type: "button",
                            variant: "outline",
                            disabled: __props.loading,
                            onClick: closeDialog
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.mode === "detail" ? "Tutup" : "Batal"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          __props.mode !== "detail" ? (openBlock(), createBlock(unref(_sfc_main$4), {
                            key: 0,
                            type: "button",
                            variant: __props.mode === "delete" ? "destructive" : "default",
                            disabled: __props.loading,
                            onClick: handleSubmit
                          }, {
                            default: withCtx(() => [
                              __props.loading ? (openBlock(), createBlock(unref(_sfc_main$7), {
                                key: 0,
                                class: "size-4"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(__props.loading ? "Memproses..." : unref(primaryLabel)), 1)
                            ]),
                            _: 1
                          }, 8, ["variant", "disabled"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.title), 1)
                          ]),
                          _: 1
                        }),
                        __props.description ? (openBlock(), createBlock(unref(_sfc_main$5), { key: 0 }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.description), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    __props.formError ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive",
                      role: "alert"
                    }, toDisplayString(__props.formError), 1)) : createCommentVNode("", true),
                    unref(isFormMode) ? (openBlock(), createBlock("form", {
                      key: 1,
                      class: "grid gap-4 sm:grid-cols-2",
                      onSubmit: withModifiers(handleSubmit, ["prevent"])
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.fields, (field) => {
                        return openBlock(), createBlock("div", {
                          key: field.key,
                          class: ["grid gap-2", field.colSpan === "full" || field.type === "textarea" ? "sm:col-span-2" : ""]
                        }, [
                          createVNode("label", {
                            for: field.key,
                            class: "text-sm font-medium text-foreground"
                          }, toDisplayString(field.label), 9, ["for"]),
                          field.type === "textarea" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                            key: 0,
                            id: field.key,
                            "model-value": __props.form[field.key] ?? "",
                            placeholder: field.placeholder,
                            required: field.required,
                            disabled: __props.loading,
                            class: "min-h-24",
                            "onUpdate:modelValue": (value) => updateField(field.key, String(value))
                          }, null, 8, ["id", "model-value", "placeholder", "required", "disabled", "onUpdate:modelValue"])) : field.type === "select" ? (openBlock(), createBlock(unref(_sfc_main$2$1), {
                            key: 1,
                            id: field.key,
                            "model-value": __props.form[field.key] ?? "",
                            required: field.required,
                            disabled: __props.loading,
                            onChange: ($event) => updateSelectField(field.key, $event)
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.options, (option) => {
                                return openBlock(), createBlock("option", {
                                  key: `${field.key}-${option.value}`,
                                  value: option.value
                                }, toDisplayString(option.label), 9, ["value"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["id", "model-value", "required", "disabled", "onChange"])) : field.type === "image" ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "grid gap-2"
                          }, [
                            createVNode("div", { class: "flex flex-col gap-2 sm:flex-row" }, [
                              createVNode(unref(_sfc_main$1$1), {
                                id: field.key,
                                "model-value": getImageReferenceInputValue(field.key),
                                placeholder: field.placeholder,
                                required: field.required,
                                disabled: __props.loading,
                                readonly: unref(isImageDataUrl)(__props.form[field.key] ?? ""),
                                "aria-invalid": unref(imageErrors)[field.key] ? true : void 0,
                                inputmode: "url",
                                class: "sm:flex-1",
                                "onUpdate:modelValue": (value) => handleImageReferenceInput(field.key, String(value))
                              }, null, 8, ["id", "model-value", "placeholder", "required", "disabled", "readonly", "aria-invalid", "onUpdate:modelValue"]),
                              createVNode("input", {
                                ref_for: true,
                                ref: (element) => setImageInputRef(field.key, element),
                                type: "file",
                                class: "sr-only",
                                accept: unref(ADMIN_IMAGE_UPLOAD_ACCEPT),
                                disabled: __props.loading,
                                onChange: (event) => handleImageFileChange(field, event)
                              }, null, 40, ["accept", "disabled", "onChange"]),
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode(unref(_sfc_main$4), {
                                  type: "button",
                                  variant: "outline",
                                  class: "flex-1 sm:flex-none",
                                  disabled: __props.loading,
                                  onClick: ($event) => openImageFilePicker(field.key)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Upload), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Pilih File ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled", "onClick"]),
                                __props.form[field.key] ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                  key: 0,
                                  type: "button",
                                  variant: "ghost",
                                  size: "icon",
                                  disabled: __props.loading,
                                  "aria-label": `Hapus ${field.label}`,
                                  onClick: ($event) => clearImageReference(field.key)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(X), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["disabled", "aria-label", "onClick"])) : createCommentVNode("", true)
                              ])
                            ]),
                            unref(imageErrors)[field.key] ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, toDisplayString(unref(imageErrors)[field.key]), 1)) : createCommentVNode("", true)
                          ])) : (openBlock(), createBlock(unref(_sfc_main$1$1), {
                            key: 3,
                            id: field.key,
                            type: field.type === "number" ? "number" : field.type === "password" ? "password" : "text",
                            inputmode: field.inputmode,
                            "model-value": __props.form[field.key] ?? "",
                            placeholder: field.placeholder,
                            required: field.required,
                            disabled: __props.loading,
                            step: "any",
                            "onUpdate:modelValue": (value) => updateField(field.key, String(value))
                          }, null, 8, ["id", "type", "inputmode", "model-value", "placeholder", "required", "disabled", "onUpdate:modelValue"]))
                        ], 2);
                      }), 128))
                    ], 32)) : __props.mode === "detail" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-3"
                    }, [
                      createVNode("div", { class: "grid gap-3 sm:grid-cols-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.detailItems, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.label,
                            class: ["rounded-md border bg-muted/30 p-3", item.description ? "sm:col-span-2" : ""]
                          }, [
                            createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, toDisplayString(item.label), 1),
                            item.tone ? (openBlock(), createBlock(AdminStatusBadge, {
                              key: 0,
                              tone: item.tone,
                              class: "mt-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.value), 1)
                              ]),
                              _: 2
                            }, 1032, ["tone"])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: ["mt-1 text-sm font-medium text-foreground", item.monospace ? "font-mono tabular-nums" : ""]
                            }, toDisplayString(item.value), 3)),
                            item.description ? (openBlock(), createBlock("p", {
                              key: 2,
                              class: "mt-1 text-sm text-muted-foreground"
                            }, toDisplayString(item.description), 1)) : createCommentVNode("", true)
                          ], 2);
                        }), 128))
                      ]),
                      renderSlot(_ctx.$slots, "detail")
                    ])) : (openBlock(), createBlock("div", {
                      key: 3,
                      class: "flex gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm"
                    }, [
                      createVNode(unref(AlertTriangle), {
                        class: "mt-0.5 size-4 shrink-0 text-destructive",
                        "aria-hidden": "true"
                      }),
                      createVNode("div", null, [
                        createVNode("p", { class: "font-medium text-foreground" }, " Hapus " + toDisplayString(__props.targetName || "data ini") + "? ", 1),
                        createVNode("p", { class: "mt-1 text-muted-foreground" }, " Data akan dihapus dan tabel akan diperbarui setelah proses berhasil. ")
                      ])
                    ])),
                    createVNode(unref(_sfc_main$4$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), {
                          type: "button",
                          variant: "outline",
                          disabled: __props.loading,
                          onClick: closeDialog
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.mode === "detail" ? "Tutup" : "Batal"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        __props.mode !== "detail" ? (openBlock(), createBlock(unref(_sfc_main$4), {
                          key: 0,
                          type: "button",
                          variant: __props.mode === "delete" ? "destructive" : "default",
                          disabled: __props.loading,
                          onClick: handleSubmit
                        }, {
                          default: withCtx(() => [
                            __props.loading ? (openBlock(), createBlock(unref(_sfc_main$7), {
                              key: 0,
                              class: "size-4"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(__props.loading ? "Memproses..." : unref(primaryLabel)), 1)
                          ]),
                          _: 1
                        }, 8, ["variant", "disabled"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$6), { class: "max-h-[calc(100vh-2rem)] overflow-x-hidden overflow-y-auto sm:max-w-2xl" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.title), 1)
                        ]),
                        _: 1
                      }),
                      __props.description ? (openBlock(), createBlock(unref(_sfc_main$5), { key: 0 }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.description), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  __props.formError ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive",
                    role: "alert"
                  }, toDisplayString(__props.formError), 1)) : createCommentVNode("", true),
                  unref(isFormMode) ? (openBlock(), createBlock("form", {
                    key: 1,
                    class: "grid gap-4 sm:grid-cols-2",
                    onSubmit: withModifiers(handleSubmit, ["prevent"])
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.fields, (field) => {
                      return openBlock(), createBlock("div", {
                        key: field.key,
                        class: ["grid gap-2", field.colSpan === "full" || field.type === "textarea" ? "sm:col-span-2" : ""]
                      }, [
                        createVNode("label", {
                          for: field.key,
                          class: "text-sm font-medium text-foreground"
                        }, toDisplayString(field.label), 9, ["for"]),
                        field.type === "textarea" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                          key: 0,
                          id: field.key,
                          "model-value": __props.form[field.key] ?? "",
                          placeholder: field.placeholder,
                          required: field.required,
                          disabled: __props.loading,
                          class: "min-h-24",
                          "onUpdate:modelValue": (value) => updateField(field.key, String(value))
                        }, null, 8, ["id", "model-value", "placeholder", "required", "disabled", "onUpdate:modelValue"])) : field.type === "select" ? (openBlock(), createBlock(unref(_sfc_main$2$1), {
                          key: 1,
                          id: field.key,
                          "model-value": __props.form[field.key] ?? "",
                          required: field.required,
                          disabled: __props.loading,
                          onChange: ($event) => updateSelectField(field.key, $event)
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(field.options, (option) => {
                              return openBlock(), createBlock("option", {
                                key: `${field.key}-${option.value}`,
                                value: option.value
                              }, toDisplayString(option.label), 9, ["value"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["id", "model-value", "required", "disabled", "onChange"])) : field.type === "image" ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "grid gap-2"
                        }, [
                          createVNode("div", { class: "flex flex-col gap-2 sm:flex-row" }, [
                            createVNode(unref(_sfc_main$1$1), {
                              id: field.key,
                              "model-value": getImageReferenceInputValue(field.key),
                              placeholder: field.placeholder,
                              required: field.required,
                              disabled: __props.loading,
                              readonly: unref(isImageDataUrl)(__props.form[field.key] ?? ""),
                              "aria-invalid": unref(imageErrors)[field.key] ? true : void 0,
                              inputmode: "url",
                              class: "sm:flex-1",
                              "onUpdate:modelValue": (value) => handleImageReferenceInput(field.key, String(value))
                            }, null, 8, ["id", "model-value", "placeholder", "required", "disabled", "readonly", "aria-invalid", "onUpdate:modelValue"]),
                            createVNode("input", {
                              ref_for: true,
                              ref: (element) => setImageInputRef(field.key, element),
                              type: "file",
                              class: "sr-only",
                              accept: unref(ADMIN_IMAGE_UPLOAD_ACCEPT),
                              disabled: __props.loading,
                              onChange: (event) => handleImageFileChange(field, event)
                            }, null, 40, ["accept", "disabled", "onChange"]),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(unref(_sfc_main$4), {
                                type: "button",
                                variant: "outline",
                                class: "flex-1 sm:flex-none",
                                disabled: __props.loading,
                                onClick: ($event) => openImageFilePicker(field.key)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Upload), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Pilih File ")
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"]),
                              __props.form[field.key] ? (openBlock(), createBlock(unref(_sfc_main$4), {
                                key: 0,
                                type: "button",
                                variant: "ghost",
                                size: "icon",
                                disabled: __props.loading,
                                "aria-label": `Hapus ${field.label}`,
                                onClick: ($event) => clearImageReference(field.key)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(X), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  })
                                ]),
                                _: 1
                              }, 8, ["disabled", "aria-label", "onClick"])) : createCommentVNode("", true)
                            ])
                          ]),
                          unref(imageErrors)[field.key] ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-destructive"
                          }, toDisplayString(unref(imageErrors)[field.key]), 1)) : createCommentVNode("", true)
                        ])) : (openBlock(), createBlock(unref(_sfc_main$1$1), {
                          key: 3,
                          id: field.key,
                          type: field.type === "number" ? "number" : field.type === "password" ? "password" : "text",
                          inputmode: field.inputmode,
                          "model-value": __props.form[field.key] ?? "",
                          placeholder: field.placeholder,
                          required: field.required,
                          disabled: __props.loading,
                          step: "any",
                          "onUpdate:modelValue": (value) => updateField(field.key, String(value))
                        }, null, 8, ["id", "type", "inputmode", "model-value", "placeholder", "required", "disabled", "onUpdate:modelValue"]))
                      ], 2);
                    }), 128))
                  ], 32)) : __props.mode === "detail" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-3"
                  }, [
                    createVNode("div", { class: "grid gap-3 sm:grid-cols-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.detailItems, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.label,
                          class: ["rounded-md border bg-muted/30 p-3", item.description ? "sm:col-span-2" : ""]
                        }, [
                          createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, toDisplayString(item.label), 1),
                          item.tone ? (openBlock(), createBlock(AdminStatusBadge, {
                            key: 0,
                            tone: item.tone,
                            class: "mt-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.value), 1)
                            ]),
                            _: 2
                          }, 1032, ["tone"])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: ["mt-1 text-sm font-medium text-foreground", item.monospace ? "font-mono tabular-nums" : ""]
                          }, toDisplayString(item.value), 3)),
                          item.description ? (openBlock(), createBlock("p", {
                            key: 2,
                            class: "mt-1 text-sm text-muted-foreground"
                          }, toDisplayString(item.description), 1)) : createCommentVNode("", true)
                        ], 2);
                      }), 128))
                    ]),
                    renderSlot(_ctx.$slots, "detail")
                  ])) : (openBlock(), createBlock("div", {
                    key: 3,
                    class: "flex gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm"
                  }, [
                    createVNode(unref(AlertTriangle), {
                      class: "mt-0.5 size-4 shrink-0 text-destructive",
                      "aria-hidden": "true"
                    }),
                    createVNode("div", null, [
                      createVNode("p", { class: "font-medium text-foreground" }, " Hapus " + toDisplayString(__props.targetName || "data ini") + "? ", 1),
                      createVNode("p", { class: "mt-1 text-muted-foreground" }, " Data akan dihapus dan tabel akan diperbarui setelah proses berhasil. ")
                    ])
                  ])),
                  createVNode(unref(_sfc_main$4$1), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$4), {
                        type: "button",
                        variant: "outline",
                        disabled: __props.loading,
                        onClick: closeDialog
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.mode === "detail" ? "Tutup" : "Batal"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      __props.mode !== "detail" ? (openBlock(), createBlock(unref(_sfc_main$4), {
                        key: 0,
                        type: "button",
                        variant: __props.mode === "delete" ? "destructive" : "default",
                        disabled: __props.loading,
                        onClick: handleSubmit
                      }, {
                        default: withCtx(() => [
                          __props.loading ? (openBlock(), createBlock(unref(_sfc_main$7), {
                            key: 0,
                            class: "size-4"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(__props.loading ? "Memproses..." : unref(primaryLabel)), 1)
                        ]),
                        _: 1
                      }, 8, ["variant", "disabled"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 3
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/organisms/AdminCrudDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminCrudDialog = Object.assign(_sfc_main, { __name: "OrganismsAdminCrudDialog" });

export { AdminCrudDialog as A };
//# sourceMappingURL=AdminCrudDialog-GXCLLFMD.mjs.map
