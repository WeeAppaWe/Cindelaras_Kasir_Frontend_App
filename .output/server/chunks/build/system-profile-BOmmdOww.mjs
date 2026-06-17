import { defineComponent, mergeProps, unref, reactive, ref, watch, computed, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
import { toast } from 'vue-sonner';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { Building2, ImageIcon, Upload, X, ReceiptText, Store, AlertCircle, CheckCircle2, RefreshCcw, Save } from 'lucide-vue-next';
import { _ as _sfc_main$2$1, a as _sfc_main$1$2 } from './index-rcdgmEu2.mjs';
import { _ as _sfc_main$2 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$4 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$3 } from './Textarea-DYkcGDV8.mjs';
import { a as isImageDataUrl, i as isValidImageReference, A as ADMIN_IMAGE_UPLOAD_ACCEPT } from './image-upload-BN8fXv4v.mjs';
import { u as useApiClient, a as apiEndpoints } from './api-endpoints-aT5YyZ8V.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminSystemProfile } from './useAdminSystemProfile-10HRwPVk.mjs';
import 'class-variance-authority';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
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
import './usePublicStoreProfile-BNIGua-8.mjs';
import './state-Dw1r7BQr.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminSystemProfileForm",
  __ssrInlineRender: true,
  props: {
    profile: {},
    submitting: { type: Boolean, default: false },
    errorMessage: { default: "" },
    successMessage: { default: "" }
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const api = useApiClient();
    const form = reactive({
      logoUrl: "",
      storeName: "",
      storeAddress: "",
      storePhone: "",
      receiptHeader: "",
      receiptFooter: "",
      systemDisplayName: ""
    });
    const errors = reactive({
      logoUrl: "",
      storeName: "",
      storeAddress: "",
      storePhone: "",
      receiptHeader: "",
      receiptFooter: "",
      systemDisplayName: ""
    });
    const logoFileInput = ref(null);
    const selectedLogoFile = ref(null);
    const selectedLogoFileName = ref("");
    const receiptPreview = ref(null);
    const isReceiptPreviewLoading = ref(false);
    const receiptPreviewError = ref("");
    watch(() => props.profile, hydrateForm, { immediate: true });
    watch(() => props.successMessage, (message) => {
      if (message) {
        void loadReceiptPreviewSample({ force: true });
      }
    });
    const normalizedFormPayload = computed(() => createPayloadFromForm());
    const savedPayload = computed(() => createPayloadFromProfile(props.profile));
    const hasChanges = computed(() => !isSamePayload(normalizedFormPayload.value, savedPayload.value));
    const logoReferenceInputValue = computed(() => {
      if (isImageDataUrl(form.logoUrl)) {
        return selectedLogoFileName.value || "Logo dari file lokal";
      }
      return form.logoUrl;
    });
    const canShowLogoPreview = computed(() => {
      const logoUrl = form.logoUrl.trim();
      return Boolean(logoUrl && isValidImageReference(logoUrl));
    });
    const previewStoreName = computed(() => form.storeName.trim() || "Nama usaha");
    const previewStoreAddress = computed(() => form.storeAddress.trim() || "Alamat usaha");
    const previewStoreContact = computed(() => form.storePhone.trim() || "Nomor kontak");
    const previewSystemDisplayName = computed(() => form.systemDisplayName.trim() || "Nama aplikasi");
    const previewReceiptHeader = computed(() => form.receiptHeader.trim() || "Header struk belum diisi.");
    const previewReceiptFooter = computed(() => form.receiptFooter.trim() || "Catatan/footer struk belum diisi.");
    const fallbackReceiptPreview = computed(() => ({
      store_name: previewStoreName.value,
      store_address: previewStoreAddress.value,
      store_phone: previewStoreContact.value,
      store_logo: form.logoUrl.trim(),
      receipt_header: previewReceiptHeader.value,
      receipt_footer: previewReceiptFooter.value,
      order_id: "00000000-0000-0000-0000-000000000000",
      receipt: "PREVIEW-SAMPLE",
      order_date: "10 Jun 2026",
      order_time: "14.30",
      cashier_name: "Admin Preview",
      customer_name: "Pelanggan Contoh",
      customer_phone: "081234567890",
      items: [
        {
          name: "Nasi Goreng Spesial",
          qty: 1,
          price: 25e3,
          subtotal: 25e3
        },
        {
          name: "Es Teh Manis",
          qty: 2,
          price: 5e3,
          subtotal: 1e4
        }
      ],
      total: 35e3,
      payment_type: "CASH",
      paid_amount: 5e4,
      change_amount: 15e3
    }));
    const activeReceiptPreview = computed(() => receiptPreview.value ?? fallbackReceiptPreview.value);
    const receiptPreviewLogoUrl = computed(() => activeReceiptPreview.value.store_logo.trim());
    const canShowReceiptPreviewLogo = computed(() => {
      const logoUrl = receiptPreviewLogoUrl.value;
      return Boolean(logoUrl && isValidImageReference(logoUrl));
    });
    const receiptPreviewCustomer = computed(() => {
      const customerName = activeReceiptPreview.value.customer_name?.trim();
      const customerPhone = activeReceiptPreview.value.customer_phone?.trim();
      return [customerName, customerPhone].filter(Boolean).join(" - ") || "-";
    });
    const logoInitials = computed(() => {
      const words = previewStoreName.value.split(/\s+/).filter(Boolean);
      const initials = words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("");
      return initials || "SK";
    });
    const canSubmit = computed(() => {
      return Boolean(
        !props.submitting && form.storeName.trim() && form.systemDisplayName.trim()
      );
    });
    function hydrateForm(profile) {
      form.logoUrl = profile.logoUrl;
      form.storeName = profile.storeName;
      form.storeAddress = profile.storeAddress;
      form.storePhone = profile.storePhone;
      form.receiptHeader = profile.receiptHeader;
      form.receiptFooter = profile.receiptFooter;
      form.systemDisplayName = profile.systemDisplayName;
      selectedLogoFile.value = null;
      selectedLogoFileName.value = "";
      clearErrors();
    }
    function resetForm() {
      hydrateForm(props.profile);
    }
    async function loadReceiptPreviewSample(options = {}) {
      if (isReceiptPreviewLoading.value || receiptPreview.value && !options.force) {
        return;
      }
      receiptPreviewError.value = "";
      isReceiptPreviewLoading.value = true;
      try {
        const payload = await api.get(apiEndpoints.receipt.previewSample);
        receiptPreview.value = normalizeReceiptPreviewSample(payload);
      } catch (error) {
        receiptPreviewError.value = getErrorMessage(error, "Gagal memuat preview struk dari backend.");
      } finally {
        isReceiptPreviewLoading.value = false;
      }
    }
    function openLogoFilePicker() {
      if (props.submitting) {
        return;
      }
      logoFileInput.value?.click();
    }
    function handleLogoReferenceInput(value) {
      form.logoUrl = String(value);
      selectedLogoFile.value = null;
      selectedLogoFileName.value = "";
      errors.logoUrl = "";
    }
    function clearLogoReference() {
      form.logoUrl = "";
      selectedLogoFile.value = null;
      selectedLogoFileName.value = "";
      errors.logoUrl = "";
      if (logoFileInput.value) {
        logoFileInput.value.value = "";
      }
    }
    function clearErrors() {
      Object.keys(errors).forEach((key) => {
        errors[key] = "";
      });
    }
    function createPayloadFromForm() {
      return {
        logoUrl: form.logoUrl.trim(),
        logoFile: selectedLogoFile.value,
        storeName: form.storeName.trim(),
        storeAddress: form.storeAddress.trim(),
        storePhone: form.storePhone.trim(),
        receiptHeader: form.receiptHeader.trim(),
        receiptFooter: form.receiptFooter.trim(),
        systemDisplayName: form.systemDisplayName.trim()
      };
    }
    function createPayloadFromProfile(profile) {
      return {
        logoUrl: profile.logoUrl.trim(),
        logoFile: null,
        storeName: profile.storeName.trim(),
        storeAddress: profile.storeAddress.trim(),
        storePhone: profile.storePhone.trim(),
        receiptHeader: profile.receiptHeader.trim(),
        receiptFooter: profile.receiptFooter.trim(),
        systemDisplayName: profile.systemDisplayName.trim()
      };
    }
    function isSamePayload(current, saved) {
      return current.logoUrl === saved.logoUrl && current.storeName === saved.storeName && current.storeAddress === saved.storeAddress && current.storePhone === saved.storePhone && current.receiptHeader === saved.receiptHeader && current.receiptFooter === saved.receiptFooter && current.systemDisplayName === saved.systemDisplayName;
    }
    function normalizeReceiptPreviewSample(payload) {
      const record = isRecord(payload) ? payload : {};
      const items = Array.isArray(record.items) ? record.items : [];
      return {
        store_name: getStringValue(record.store_name),
        store_address: getStringValue(record.store_address),
        store_phone: getStringValue(record.store_phone),
        store_logo: getStringValue(record.store_logo),
        receipt_header: getStringValue(record.receipt_header),
        receipt_footer: getStringValue(record.receipt_footer),
        order_id: getStringValue(record.order_id),
        receipt: getNullableStringValue(record.receipt),
        order_date: getStringValue(record.order_date),
        order_time: getStringValue(record.order_time),
        cashier_name: getStringValue(record.cashier_name),
        customer_name: getNullableStringValue(record.customer_name),
        customer_phone: getNullableStringValue(record.customer_phone),
        items: items.map(normalizeReceiptPreviewItem),
        total: getNumberValue(record.total),
        payment_type: getStringValue(record.payment_type),
        paid_amount: getNumberValue(record.paid_amount),
        change_amount: getNumberValue(record.change_amount)
      };
    }
    function normalizeReceiptPreviewItem(value) {
      const record = isRecord(value) ? value : {};
      return {
        name: getStringValue(record.name),
        qty: getNumberValue(record.qty),
        price: getNumberValue(record.price),
        subtotal: getNumberValue(record.subtotal)
      };
    }
    function formatReceiptAmount(value) {
      return new Intl.NumberFormat("id-ID").format(value);
    }
    function getStringValue(value) {
      return typeof value === "string" ? value.trim() : "";
    }
    function getNullableStringValue(value) {
      const stringValue = getStringValue(value);
      return stringValue || null;
    }
    function getNumberValue(value) {
      const numberValue = Number(value);
      return Number.isFinite(numberValue) ? numberValue : 0;
    }
    function isRecord(value) {
      return typeof value === "object" && value !== null;
    }
    function getErrorMessage(error, fallback) {
      if (error instanceof Error && error.message) {
        return error.message;
      }
      return fallback;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({
        class: "grid flex-1 gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,23rem)] xl:items-start",
        "aria-busy": props.submitting
      }, _attrs))}><div class="flex min-w-0 flex-col gap-3"><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="system-identity-title"><div class="mb-4 flex items-start gap-3"><span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">`);
      _push(ssrRenderComponent(unref(Building2), {
        class: "size-4",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><div class="min-w-0"><h2 id="system-identity-title" class="text-base font-semibold tracking-normal"> Identitas Toko </h2><p class="mt-1 text-sm text-muted-foreground"> Informasi ini dipakai untuk identitas aplikasi, struk, dan laporan. </p></div></div><div class="grid gap-4 lg:grid-cols-[12rem_minmax(0,1fr)]"><div class="space-y-2"><div class="flex aspect-square items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground">`);
      if (unref(canShowLogoPreview)) {
        _push(`<img${ssrRenderAttr("src", unref(form).logoUrl.trim())}${ssrRenderAttr("alt", `Logo ${unref(previewStoreName)}`)} class="size-full object-contain p-3">`);
      } else {
        _push(`<div class="flex flex-col items-center gap-2 text-xs">`);
        _push(ssrRenderComponent(unref(ImageIcon), {
          class: "size-9",
          "aria-hidden": "true"
        }, null, _parent));
        _push(`<span>Preview logo</span></div>`);
      }
      _push(`</div><p class="text-xs text-muted-foreground"> Gunakan gambar dengan rasio mendekati persegi agar tampil rapi. </p></div><div class="grid content-start gap-3 sm:grid-cols-2"><div class="space-y-1.5 sm:col-span-2"><label for="system-store-name" class="text-sm font-medium">Nama usaha/toko</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1$1), {
        id: "system-store-name",
        modelValue: unref(form).storeName,
        "onUpdate:modelValue": ($event) => unref(form).storeName = $event,
        maxlength: "80",
        placeholder: "Cindelaras",
        disabled: props.submitting,
        "aria-invalid": unref(errors).storeName ? true : void 0,
        "aria-describedby": unref(errors).storeName ? "system-store-name-error" : "system-store-name-help"
      }, null, _parent));
      if (unref(errors).storeName) {
        _push(`<p id="system-store-name-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).storeName)}</p>`);
      } else {
        _push(`<p id="system-store-name-help" class="text-xs text-muted-foreground"> Ditampilkan di header sistem, struk, dan laporan. </p>`);
      }
      _push(`</div><div class="space-y-1.5 sm:col-span-2"><label for="system-logo-url" class="text-sm font-medium">Logo toko</label><div class="flex flex-col gap-2 sm:flex-row">`);
      _push(ssrRenderComponent(unref(_sfc_main$1$1), {
        id: "system-logo-url",
        "model-value": unref(logoReferenceInputValue),
        inputmode: "url",
        placeholder: "https://... atau /uploads/logo.png",
        disabled: props.submitting,
        readonly: unref(isImageDataUrl)(unref(form).logoUrl),
        "aria-invalid": unref(errors).logoUrl ? true : void 0,
        "aria-describedby": unref(errors).logoUrl ? "system-logo-url-error" : "system-logo-url-help",
        class: "sm:flex-1",
        "onUpdate:modelValue": handleLogoReferenceInput
      }, null, _parent));
      _push(`<input type="file" class="sr-only"${ssrRenderAttr("accept", unref(ADMIN_IMAGE_UPLOAD_ACCEPT))}${ssrIncludeBooleanAttr(props.submitting) ? " disabled" : ""}><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        type: "button",
        variant: "outline",
        class: "flex-1 sm:flex-none",
        disabled: props.submitting,
        onClick: openLogoFilePicker
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
      if (unref(form).logoUrl) {
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          type: "button",
          variant: "ghost",
          size: "icon",
          disabled: props.submitting,
          "aria-label": "Hapus logo toko",
          onClick: clearLogoReference
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
      if (unref(errors).logoUrl) {
        _push(`<p id="system-logo-url-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).logoUrl)}</p>`);
      } else {
        _push(`<p id="system-logo-url-help" class="text-xs text-muted-foreground"> Isi URL atau path logo dari backend. </p>`);
      }
      _push(`</div></div></div></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="receipt-setting-title"><div class="mb-4 flex items-start gap-3"><span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-info/10 text-info">`);
      _push(ssrRenderComponent(unref(ReceiptText), {
        class: "size-4",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><div class="min-w-0"><h2 id="receipt-setting-title" class="text-base font-semibold tracking-normal"> Tampilan Struk </h2><p class="mt-1 text-sm text-muted-foreground"> Atur kontak, alamat, dan teks yang muncul pada struk transaksi. </p></div></div><div class="grid gap-3 lg:grid-cols-2"><div class="space-y-1.5"><label for="system-store-phone" class="text-sm font-medium">Kontak toko</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1$1), {
        id: "system-store-phone",
        modelValue: unref(form).storePhone,
        "onUpdate:modelValue": ($event) => unref(form).storePhone = $event,
        inputmode: "tel",
        placeholder: "0812-3456-7890",
        disabled: props.submitting,
        "aria-invalid": unref(errors).storePhone ? true : void 0,
        "aria-describedby": unref(errors).storePhone ? "system-store-phone-error" : "system-store-phone-help"
      }, null, _parent));
      if (unref(errors).storePhone) {
        _push(`<p id="system-store-phone-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).storePhone)}</p>`);
      } else {
        _push(`<p id="system-store-phone-help" class="text-xs text-muted-foreground"> Ditampilkan pada bagian identitas struk. </p>`);
      }
      _push(`</div><div class="space-y-1.5"><label for="system-store-address" class="text-sm font-medium">Alamat toko</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1$1), {
        id: "system-store-address",
        modelValue: unref(form).storeAddress,
        "onUpdate:modelValue": ($event) => unref(form).storeAddress = $event,
        maxlength: "160",
        placeholder: "Jl. Ring Road Utara, Yogyakarta",
        disabled: props.submitting,
        "aria-invalid": unref(errors).storeAddress ? true : void 0,
        "aria-describedby": unref(errors).storeAddress ? "system-store-address-error" : "system-store-address-help"
      }, null, _parent));
      if (unref(errors).storeAddress) {
        _push(`<p id="system-store-address-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).storeAddress)}</p>`);
      } else {
        _push(`<p id="system-store-address-help" class="text-xs text-muted-foreground"> Ditampilkan pada bagian atas struk. </p>`);
      }
      _push(`</div><div class="space-y-1.5"><label for="system-receipt-header" class="text-sm font-medium">Header struk</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        id: "system-receipt-header",
        modelValue: unref(form).receiptHeader,
        "onUpdate:modelValue": ($event) => unref(form).receiptHeader = $event,
        maxlength: "160",
        class: "min-h-24 resize-y",
        placeholder: "Terima kasih sudah berbelanja.",
        disabled: props.submitting,
        "aria-invalid": unref(errors).receiptHeader ? true : void 0,
        "aria-describedby": unref(errors).receiptHeader ? "system-receipt-header-error" : "system-receipt-header-help"
      }, null, _parent));
      if (unref(errors).receiptHeader) {
        _push(`<p id="system-receipt-header-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).receiptHeader)}</p>`);
      } else {
        _push(`<p id="system-receipt-header-help" class="text-xs text-muted-foreground"> Maksimal 160 karakter. </p>`);
      }
      _push(`</div><div class="space-y-1.5"><label for="system-receipt-footer" class="text-sm font-medium">Catatan/footer struk</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        id: "system-receipt-footer",
        modelValue: unref(form).receiptFooter,
        "onUpdate:modelValue": ($event) => unref(form).receiptFooter = $event,
        maxlength: "200",
        class: "min-h-24 resize-y",
        placeholder: "Simpan struk ini sebagai bukti pembayaran.",
        disabled: props.submitting,
        "aria-invalid": unref(errors).receiptFooter ? true : void 0,
        "aria-describedby": unref(errors).receiptFooter ? "system-receipt-footer-error" : "system-receipt-footer-help"
      }, null, _parent));
      if (unref(errors).receiptFooter) {
        _push(`<p id="system-receipt-footer-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).receiptFooter)}</p>`);
      } else {
        _push(`<p id="system-receipt-footer-help" class="text-xs text-muted-foreground"> Maksimal 200 karakter. </p>`);
      }
      _push(`</div></div></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="system-appearance-title"><div class="mb-4 flex items-start gap-3"><span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">`);
      _push(ssrRenderComponent(unref(Store), {
        class: "size-4",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><div class="min-w-0"><h2 id="system-appearance-title" class="text-base font-semibold tracking-normal"> Tampilan Sistem </h2><p class="mt-1 text-sm text-muted-foreground"> Nama yang tampil pada navigasi dan halaman aplikasi. </p></div></div><div class="grid gap-3 sm:grid-cols-2"><div class="space-y-1.5"><label for="system-display-name" class="text-sm font-medium">Nama aplikasi</label>`);
      _push(ssrRenderComponent(unref(_sfc_main$1$1), {
        id: "system-display-name",
        modelValue: unref(form).systemDisplayName,
        "onUpdate:modelValue": ($event) => unref(form).systemDisplayName = $event,
        maxlength: "50",
        placeholder: "Sistem Kasir",
        disabled: props.submitting,
        "aria-invalid": unref(errors).systemDisplayName ? true : void 0,
        "aria-describedby": unref(errors).systemDisplayName ? "system-display-name-error" : "system-display-name-help"
      }, null, _parent));
      if (unref(errors).systemDisplayName) {
        _push(`<p id="system-display-name-error" class="text-xs text-destructive">${ssrInterpolate(unref(errors).systemDisplayName)}</p>`);
      } else {
        _push(`<p id="system-display-name-help" class="text-xs text-muted-foreground"> Ditampilkan pada identitas sistem. </p>`);
      }
      _push(`</div></div></section><div class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4"><div class="flex flex-col gap-3">`);
      if (props.errorMessage) {
        _push(ssrRenderComponent(unref(_sfc_main$2$1), { variant: "destructive" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(AlertCircle), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(props.errorMessage)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(props.errorMessage), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(AlertCircle), {
                  class: "size-4",
                  "aria-hidden": "true"
                }),
                createVNode(unref(_sfc_main$1$2), null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(props.errorMessage), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (props.successMessage) {
        _push(ssrRenderComponent(unref(_sfc_main$2$1), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(CheckCircle2), {
                class: "size-4 text-success",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(props.successMessage)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(props.successMessage), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(CheckCircle2), {
                  class: "size-4 text-success",
                  "aria-hidden": "true"
                }),
                createVNode(unref(_sfc_main$1$2), null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(props.successMessage), 1)
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
      _push(`<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p class="text-sm text-muted-foreground"> Terakhir diperbarui: ${ssrInterpolate(props.profile.updatedAt)}</p><div class="flex flex-col gap-2 sm:flex-row sm:justify-end">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        type: "button",
        variant: "outline",
        disabled: props.submitting || !unref(hasChanges),
        onClick: resetForm
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(RefreshCcw), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(` Reset `);
          } else {
            return [
              createVNode(unref(RefreshCcw), {
                class: "size-4",
                "aria-hidden": "true"
              }),
              createTextVNode(" Reset ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        type: "submit",
        disabled: !unref(canSubmit)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.submitting) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Save), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            }
            _push2(` ${ssrInterpolate(props.submitting ? "Menyimpan..." : "Simpan Profil Sistem")}`);
          } else {
            return [
              props.submitting ? (openBlock(), createBlock(unref(_sfc_main$4), {
                key: 0,
                class: "size-4"
              })) : (openBlock(), createBlock(unref(Save), {
                key: 1,
                class: "size-4",
                "aria-hidden": "true"
              })),
              createTextVNode(" " + toDisplayString(props.submitting ? "Menyimpan..." : "Simpan Profil Sistem"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div><aside class="flex min-w-0 flex-col gap-3"><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="system-preview-title"><div class="mb-4 flex items-start gap-3"><span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">`);
      _push(ssrRenderComponent(unref(Store), {
        class: "size-4",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><div class="min-w-0"><h2 id="system-preview-title" class="text-base font-semibold tracking-normal"> Preview Sistem </h2><p class="mt-1 text-sm text-muted-foreground"> Gambaran identitas yang akan tampil. </p></div></div><div class="space-y-3"><div class="rounded-md border bg-background p-3"><div class="flex items-center gap-3"><span class="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary text-sm font-semibold text-primary-foreground">`);
      if (unref(canShowLogoPreview)) {
        _push(`<img${ssrRenderAttr("src", unref(form).logoUrl.trim())}${ssrRenderAttr("alt", `Logo ${unref(previewStoreName)}`)} class="size-full object-contain p-1.5">`);
      } else {
        _push(`<span>${ssrInterpolate(unref(logoInitials))}</span>`);
      }
      _push(`</span><div class="min-w-0"><p class="truncate text-sm font-semibold">${ssrInterpolate(unref(previewSystemDisplayName))}</p><p class="truncate text-xs text-muted-foreground">${ssrInterpolate(unref(previewStoreName))}</p></div></div></div></div></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs sm:p-4" aria-labelledby="receipt-preview-title"><div class="mb-4 flex items-start justify-between gap-3"><div class="flex min-w-0 items-start gap-3"><span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-info/10 text-info">`);
      _push(ssrRenderComponent(unref(ReceiptText), {
        class: "size-4",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</span><div class="min-w-0"><h2 id="receipt-preview-title" class="text-base font-semibold tracking-normal"> Preview Struk </h2><p class="mt-1 text-sm text-muted-foreground"> Contoh struk dari konfigurasi backend. </p></div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        type: "button",
        variant: "outline",
        size: "icon",
        disabled: unref(isReceiptPreviewLoading),
        "aria-label": "Muat ulang preview struk",
        onClick: ($event) => loadReceiptPreviewSample({ force: true })
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isReceiptPreviewLoading)) {
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(RefreshCcw), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(isReceiptPreviewLoading) ? (openBlock(), createBlock(unref(_sfc_main$4), {
                key: 0,
                class: "size-4"
              })) : (openBlock(), createBlock(unref(RefreshCcw), {
                key: 1,
                class: "size-4",
                "aria-hidden": "true"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mx-auto w-full max-w-xs rounded-md border bg-background p-4 font-mono text-xs shadow-xs">`);
      if (unref(receiptPreviewError)) {
        _push(`<p class="mb-3 rounded-md border border-destructive/30 bg-destructive/10 px-2 py-1.5 font-sans text-xs text-destructive">${ssrInterpolate(unref(receiptPreviewError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center">`);
      if (unref(canShowReceiptPreviewLogo)) {
        _push(`<img${ssrRenderAttr("src", unref(receiptPreviewLogoUrl))}${ssrRenderAttr("alt", `Logo ${unref(activeReceiptPreview).store_name || unref(previewStoreName)}`)} class="mx-auto mb-2 size-12 rounded-md border object-contain p-1.5">`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="font-bold">${ssrInterpolate(unref(activeReceiptPreview).store_name || unref(previewStoreName))}</p><p class="mt-1 text-muted-foreground">${ssrInterpolate(unref(activeReceiptPreview).store_address || unref(previewStoreAddress))}</p><p class="text-muted-foreground">${ssrInterpolate(unref(activeReceiptPreview).store_phone || unref(previewStoreContact))}</p></div><div class="my-3 border-t border-dashed"></div><p class="whitespace-pre-line text-center">${ssrInterpolate(unref(activeReceiptPreview).receipt_header || unref(previewReceiptHeader))}</p><div class="my-3 border-t border-dashed"></div><div class="space-y-1 text-muted-foreground"><div class="flex justify-between gap-3"><span>No</span><span class="text-right text-foreground">${ssrInterpolate(unref(activeReceiptPreview).receipt || "-")}</span></div><div class="flex justify-between gap-3"><span>Tanggal</span><span class="text-right text-foreground">${ssrInterpolate(unref(activeReceiptPreview).order_date || "-")} ${ssrInterpolate(unref(activeReceiptPreview).order_time || "")}</span></div><div class="flex justify-between gap-3"><span>Kasir</span><span class="text-right text-foreground">${ssrInterpolate(unref(activeReceiptPreview).cashier_name || "-")}</span></div><div class="flex justify-between gap-3"><span>Pelanggan</span><span class="max-w-36 truncate text-right text-foreground">${ssrInterpolate(unref(receiptPreviewCustomer))}</span></div></div><div class="my-3 border-t border-dashed"></div><div class="space-y-1"><!--[-->`);
      ssrRenderList(unref(activeReceiptPreview).items, (item, index) => {
        _push(`<div class="space-y-0.5"><div class="flex justify-between gap-3"><span class="min-w-0 truncate">${ssrInterpolate(item.name || "-")}</span><span>${ssrInterpolate(formatReceiptAmount(item.subtotal))}</span></div><p class="text-muted-foreground">${ssrInterpolate(formatReceiptAmount(item.price))} x ${ssrInterpolate(formatReceiptAmount(item.qty))}</p></div>`);
      });
      _push(`<!--]--></div><div class="my-3 border-t border-dashed"></div><div class="space-y-1"><div class="flex justify-between gap-3 font-bold"><span>Total</span><span>${ssrInterpolate(formatReceiptAmount(unref(activeReceiptPreview).total))}</span></div><div class="flex justify-between gap-3 text-muted-foreground"><span>Bayar</span><span class="text-foreground">${ssrInterpolate(formatReceiptAmount(unref(activeReceiptPreview).paid_amount))}</span></div><div class="flex justify-between gap-3 text-muted-foreground"><span>Kembali</span><span class="text-foreground">${ssrInterpolate(formatReceiptAmount(unref(activeReceiptPreview).change_amount))}</span></div><div class="flex justify-between gap-3 text-muted-foreground"><span>Metode</span><span class="text-foreground">${ssrInterpolate(unref(activeReceiptPreview).payment_type || "-")}</span></div></div><div class="my-3 border-t border-dashed"></div><p class="whitespace-pre-line text-center text-muted-foreground">${ssrInterpolate(unref(activeReceiptPreview).receipt_footer || unref(previewReceiptFooter))}</p></div></section></aside></form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/organisms/AdminSystemProfileForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AdminSystemProfileForm = Object.assign(_sfc_main$1, { __name: "OrganismsAdminSystemProfileForm" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "system-profile",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Profil Sistem"
    });
    const {
      systemProfile,
      isLoading,
      isSaving,
      errorMessage,
      successMessage,
      saveSystemProfile
    } = useAdminSystemProfile();
    async function handleSubmit(payload) {
      if (isSaving.value || isLoading.value) {
        return;
      }
      const settingsPayload = await saveSystemProfile(payload);
      if (settingsPayload) {
        toast.success(successMessage.value || "Profil sistem berhasil disimpan.");
        return;
      }
      toast.error(errorMessage.value || "Gagal menyimpan profil sistem.");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-full flex-col gap-3 p-3 sm:p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(AdminPageHeader, {
        title: "Profil Sistem",
        description: "Kelola identitas toko, tampilan struk, dan nama aplikasi."
      }, null, _parent));
      _push(ssrRenderComponent(AdminSystemProfileForm, {
        profile: unref(systemProfile),
        submitting: unref(isSaving) || unref(isLoading),
        "error-message": unref(errorMessage),
        "success-message": unref(successMessage),
        onSubmit: handleSubmit
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/system-profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=system-profile-BOmmdOww.mjs.map
