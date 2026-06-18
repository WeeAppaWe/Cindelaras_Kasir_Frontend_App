import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, openBlock, createBlock, isRef, createVNode, createTextVNode, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { PackagePlus, ClipboardCheck, ReceiptText, Plus } from 'lucide-vue-next';
import { _ as _sfc_main$1 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1$1 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminCrudDialog } from './AdminCrudDialog-GXCLLFMD.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { u as useAdminInventoryApi, i as isStockInTypeName, f as formatAdminInventoryCurrency, h as hydrateAdminInventoryMovementStockType, m as mapAdminInventoryMovementRecordToViewItem, c as createAdminInventoryStockInPayload, g as getAdminInventoryStockInValidationMessage } from './useAdminInventoryApi-BMpHShMd.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminRawIngredientApi } from './useAdminRawIngredientApi-ru1YQE4X.mjs';
import { u as useAdminSupplierApi } from './useAdminSupplierApi-CX9ChO1Y.mjs';
import { u as useAdminActionFeedback } from './useAdminActionFeedback-BRkOE1ij.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
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
import './index-DSBdqIS4.mjs';
import './DialogTrigger-B5C6UhMx.mjs';
import './Textarea-DYkcGDV8.mjs';
import './image-upload-BN8fXv4v.mjs';
import './PaginationPrevious-DSL0-rZ8.mjs';
import './Skeleton-CQWwuiK0.mjs';
import './api-endpoints-BXkjOpII.mjs';
import 'vue-sonner';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stock-in",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Stok Masuk"
    });
    const adminInventoryApi = useAdminInventoryApi();
    useAdminRawIngredientApi();
    useAdminSupplierApi();
    const { runAdminAction } = useAdminActionFeedback();
    const search = ref("");
    const ingredientFilter = ref("all");
    const supplierFilter = ref("all");
    const dateFrom = ref("");
    const dateTo = ref("");
    const isLoading = ref(false);
    const isCrudLoading = ref(false);
    const isCrudDialogOpen = ref(false);
    const crudMode = ref("detail");
    const loadError = ref("");
    const formError = ref("");
    const totalRecordCount = ref(0);
    const stockInItems = ref([]);
    const stockTypeOptions = ref([]);
    const ingredientOptions = ref([]);
    const supplierOptions = ref([]);
    const selectedStockIn = ref(null);
    const selectedStockInDetail = ref(null);
    const crudForm = ref(createStockInForm());
    let searchTimer = null;
    let stockInRequestId = 0;
    const stockInTypeIds = computed(() => stockTypeOptions.value.filter((type) => isStockInTypeName(type.name)).map((type) => type.id));
    const canCreate = computed(() => ingredientOptions.value.length > 0 && supplierOptions.value.length > 0);
    const hasActiveFilter = computed(() => Boolean(
      search.value.trim() || ingredientFilter.value !== "all" || supplierFilter.value !== "all" || dateFrom.value || dateTo.value
    ));
    const totalQty = computed(() => stockInItems.value.reduce((total, item) => total + item.absQty, 0));
    const totalValue = computed(() => stockInItems.value.reduce((total, item) => total + item.totalCost, 0));
    const supplierCount = computed(() => new Set(stockInItems.value.map((item) => item.supplierId).filter(Boolean)).size);
    const stockInFields = computed(() => [
      {
        key: "ingredientId",
        label: "Bahan",
        type: "select",
        required: true,
        options: ingredientOptions.value.map((item) => ({
          label: `${item.name} (${item.unitName})`,
          value: item.id
        })),
        colSpan: "full"
      },
      {
        key: "supplierId",
        label: "Pemasok",
        type: "select",
        required: true,
        options: supplierOptions.value.map((item) => ({
          label: item.name,
          value: item.id
        })),
        colSpan: "full"
      },
      {
        key: "qty",
        label: "Qty Masuk",
        type: "number",
        inputmode: "decimal",
        required: true
      },
      {
        key: "unitCost",
        label: "Harga Satuan",
        type: "number",
        inputmode: "decimal",
        required: true
      },
      {
        key: "notes",
        label: "Catatan",
        type: "textarea",
        placeholder: "Nomor nota atau catatan penerimaan",
        colSpan: "full"
      }
    ]);
    const metrics = computed(() => [
      {
        id: "total",
        label: "Transaksi Masuk",
        value: String(totalRecordCount.value),
        helper: hasActiveFilter.value ? "Sesuai filter aktif" : "Penerimaan tercatat",
        tone: "info"
      },
      {
        id: "qty",
        label: "Qty Diterima",
        value: formatNumber(totalQty.value),
        helper: "Dalam data termuat",
        tone: "success"
      },
      {
        id: "value",
        label: "Nilai Pembelian",
        value: formatAdminInventoryCurrency(totalValue.value),
        helper: `${supplierCount.value} pemasok terkait`,
        tone: "default"
      }
    ]);
    const columns = [
      { key: "date", label: "Waktu", class: "min-w-44" },
      { key: "ingredient", label: "Bahan", class: "min-w-60" },
      { key: "supplier", label: "Pemasok", class: "min-w-48" },
      { key: "quantity", label: "Qty", align: "right" },
      { key: "unitCost", label: "Harga Satuan", align: "right" },
      { key: "totalCost", label: "Total", align: "right" }
    ];
    const rows = computed(() => stockInItems.value.map((item) => ({
      id: item.id,
      cells: {
        date: {
          label: item.date,
          description: item.supplierName
        },
        ingredient: {
          label: item.ingredientName,
          description: item.notes
        },
        supplier: item.supplierName,
        quantity: {
          label: item.quantityLabel,
          description: `Saldo ${item.balanceLabel}`,
          monospace: true
        },
        unitCost: {
          label: item.unitCostLabel,
          monospace: true
        },
        totalCost: {
          label: item.totalCostLabel,
          monospace: true
        }
      }
    })));
    const dialogTitle = computed(() => crudMode.value === "create" ? "Catat Stok Masuk" : "Detail Stok Masuk");
    const dialogDescription = computed(() => {
      if (crudMode.value === "detail") {
        return isCrudLoading.value ? "Memuat detail stok masuk..." : "Informasi penerimaan stok yang tercatat.";
      }
      return "Pilih bahan dan pemasok, lalu isi kuantitas dan harga beli per satuan.";
    });
    const detailItems = computed(() => {
      const item = selectedStockInDetail.value ?? selectedStockIn.value;
      if (!item) {
        return [];
      }
      return [
        { label: "Waktu", value: item.date },
        { label: "Pemasok", value: item.supplierName },
        { label: "Bahan", value: item.ingredientName, description: `Satuan ${item.unitName}` },
        { label: "Qty Masuk", value: item.quantityLabel, monospace: true },
        { label: "Harga Satuan", value: item.unitCostLabel, monospace: true },
        { label: "Total Nilai", value: item.totalCostLabel, monospace: true },
        { label: "Saldo Setelah Masuk", value: item.balanceLabel, monospace: true },
        { label: "Dicatat Oleh", value: item.userName },
        { label: "Catatan", value: item.notes, description: "Catatan penerimaan stok." }
      ];
    });
    watch([search, ingredientFilter, supplierFilter, dateFrom, dateTo], () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      searchTimer = setTimeout(() => {
        void loadStockInItems();
      }, 300);
    });
    watch(crudForm, () => {
      formError.value = "";
    }, { deep: true });
    async function loadStockInItems() {
      const requestId = ++stockInRequestId;
      isLoading.value = true;
      loadError.value = "";
      try {
        const records = await loadStockInMovementRecords();
        if (requestId !== stockInRequestId) {
          return;
        }
        stockInItems.value = records.map((record) => hydrateAdminInventoryMovementStockType(record, stockTypeOptions.value)).map(mapAdminInventoryMovementRecordToViewItem).filter((item) => item.movementKind === "in");
        totalRecordCount.value = stockInItems.value.length;
      } catch (error) {
        if (requestId !== stockInRequestId) {
          return;
        }
        loadError.value = getErrorMessage(error, "Gagal memuat daftar stok masuk.");
        stockInItems.value = [];
        totalRecordCount.value = 0;
      } finally {
        if (requestId === stockInRequestId) {
          isLoading.value = false;
        }
      }
    }
    async function loadStockInMovementRecords() {
      const baseQuery = {
        batch: 1,
        size: 100,
        search: search.value.trim() || void 0,
        ingredient_id: ingredientFilter.value === "all" ? void 0 : ingredientFilter.value,
        supplier_id: supplierFilter.value === "all" ? void 0 : supplierFilter.value,
        date_from: dateFrom.value || void 0,
        date_to: dateTo.value || void 0
      };
      if (!stockInTypeIds.value.length) {
        const result = await adminInventoryApi.getInventoryMovements(baseQuery);
        return Array.isArray(result.records) ? result.records : [];
      }
      const results = await Promise.all(stockInTypeIds.value.map((stockTypeId) => adminInventoryApi.getInventoryMovements({
        ...baseQuery,
        stock_type_id: stockTypeId
      })));
      return dedupeMovementRecords(results.flatMap((result) => Array.isArray(result.records) ? result.records : []));
    }
    function createStockInForm() {
      return {
        ingredientId: ingredientOptions.value[0]?.id ?? "",
        supplierId: supplierOptions.value[0]?.id ?? "",
        qty: "",
        unitCost: "",
        notes: ""
      };
    }
    function createStockInPayload() {
      const payload = {
        ingredientId: crudForm.value.ingredientId ?? "",
        supplierId: crudForm.value.supplierId ?? "",
        qty: toNumber(crudForm.value.qty),
        unitCost: toNumber(crudForm.value.unitCost),
        notes: (crudForm.value.notes ?? "").trim()
      };
      const validationMessage = getAdminInventoryStockInValidationMessage(payload);
      if (validationMessage) {
        formError.value = validationMessage;
        return null;
      }
      return payload;
    }
    function openCreateDialog() {
      selectedStockIn.value = null;
      selectedStockInDetail.value = null;
      formError.value = "";
      crudMode.value = "create";
      crudForm.value = createStockInForm();
      isCrudDialogOpen.value = true;
    }
    async function openDetailDialog(id) {
      const item = stockInItems.value.find((stockIn) => stockIn.id === id);
      if (!item) {
        return;
      }
      selectedStockIn.value = item;
      selectedStockInDetail.value = item;
      formError.value = "";
      crudMode.value = "detail";
      isCrudDialogOpen.value = true;
      isCrudLoading.value = true;
      try {
        const detail = await adminInventoryApi.getInventoryMovementDetail(id);
        selectedStockInDetail.value = mapAdminInventoryMovementRecordToViewItem(
          hydrateAdminInventoryMovementStockType(detail, stockTypeOptions.value)
        );
      } catch {
        selectedStockInDetail.value = item;
      } finally {
        isCrudLoading.value = false;
      }
    }
    async function handleCrudSubmit() {
      const payload = createStockInPayload();
      if (!payload) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        await adminInventoryApi.createStockIn(createAdminInventoryStockInPayload(payload));
        await loadStockInItems();
      }, {
        loading: isCrudLoading,
        successMessage: "Stok masuk berhasil dicatat.",
        errorMessage: "Gagal mencatat stok masuk."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
      }
    }
    function dedupeMovementRecords(records) {
      const recordMap = /* @__PURE__ */ new Map();
      records.forEach((record) => {
        recordMap.set(record.stock_movement_id, record);
      });
      return Array.from(recordMap.values()).sort((first, second) => new Date(second.created_at).getTime() - new Date(first.created_at).getTime());
    }
    function toNumber(value) {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    function formatNumber(value) {
      return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(value);
    }
    function getErrorMessage(error, fallback) {
      if (error instanceof Error && error.message) {
        return error.message;
      }
      return fallback;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-full flex-col gap-3 p-3 sm:p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(AdminPageHeader, {
        title: "Stok Masuk",
        description: "Catat penerimaan bahan dari pemasok dan pantau nilai pembelian yang menambah stok."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan stok masuk"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.id === "total") {
                _push2(ssrRenderComponent(unref(PackagePlus), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else if (item.id === "qty") {
                _push2(ssrRenderComponent(unref(ClipboardCheck), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(ReceiptText), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              }
            } else {
              return [
                item.id === "total" ? (openBlock(), createBlock(unref(PackagePlus), {
                  key: 0,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : item.id === "qty" ? (openBlock(), createBlock(unref(ClipboardCheck), {
                  key: 1,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : (openBlock(), createBlock(unref(ReceiptText), {
                  key: 2,
                  class: "size-4",
                  "aria-hidden": "true"
                }))
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="stock-in-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="stock-in-table-title" class="text-base font-semibold tracking-normal"> Daftar Stok Masuk </h2><p class="mt-1 text-sm text-muted-foreground"> Penerimaan bahan memperbarui stok dan harga rata-rata bahan di backend. </p></div></div>`);
      if (unref(loadError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "stock-in-search",
        "search-label": "Cari stok masuk",
        "search-placeholder": "Cari bahan, pemasok, atau catatan",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="stock-in-ingredient-filter" class="sr-only"${_scopeId}>Filter bahan stok masuk</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "stock-in-ingredient-filter",
              modelValue: unref(ingredientFilter),
              "onUpdate:modelValue": ($event) => isRef(ingredientFilter) ? ingredientFilter.value = $event : null,
              class: "w-44",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua bahan</option><!--[-->`);
                  ssrRenderList(unref(ingredientOptions), (ingredient) => {
                    _push3(`<option${ssrRenderAttr("value", ingredient.id)}${_scopeId2}>${ssrInterpolate(ingredient.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua bahan"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(ingredientOptions), (ingredient) => {
                      return openBlock(), createBlock("option", {
                        key: ingredient.id,
                        value: ingredient.id
                      }, toDisplayString(ingredient.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="stock-in-supplier-filter" class="sr-only"${_scopeId}>Filter pemasok stok masuk</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "stock-in-supplier-filter",
              modelValue: unref(supplierFilter),
              "onUpdate:modelValue": ($event) => isRef(supplierFilter) ? supplierFilter.value = $event : null,
              class: "w-44",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua pemasok</option><!--[-->`);
                  ssrRenderList(unref(supplierOptions), (supplier) => {
                    _push3(`<option${ssrRenderAttr("value", supplier.id)}${_scopeId2}>${ssrInterpolate(supplier.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua pemasok"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(supplierOptions), (supplier) => {
                      return openBlock(), createBlock("option", {
                        key: supplier.id,
                        value: supplier.id
                      }, toDisplayString(supplier.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-2"${_scopeId}><label for="stock-in-date-from" class="sr-only"${_scopeId}>Tanggal mulai stok masuk</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), {
              id: "stock-in-date-from",
              modelValue: unref(dateFrom),
              "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
              type: "date",
              class: "w-36",
              disabled: unref(isLoading)
            }, null, _parent2, _scopeId));
            _push2(`<label for="stock-in-date-to" class="sr-only"${_scopeId}>Tanggal akhir stok masuk</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), {
              id: "stock-in-date-to",
              modelValue: unref(dateTo),
              "onUpdate:modelValue": ($event) => isRef(dateTo) ? dateTo.value = $event : null,
              type: "date",
              class: "w-36",
              disabled: unref(isLoading)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("label", {
                  for: "stock-in-ingredient-filter",
                  class: "sr-only"
                }, "Filter bahan stok masuk"),
                createVNode(unref(_sfc_main$2), {
                  id: "stock-in-ingredient-filter",
                  modelValue: unref(ingredientFilter),
                  "onUpdate:modelValue": ($event) => isRef(ingredientFilter) ? ingredientFilter.value = $event : null,
                  class: "w-44",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua bahan"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(ingredientOptions), (ingredient) => {
                      return openBlock(), createBlock("option", {
                        key: ingredient.id,
                        value: ingredient.id
                      }, toDisplayString(ingredient.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "stock-in-supplier-filter",
                  class: "sr-only"
                }, "Filter pemasok stok masuk"),
                createVNode(unref(_sfc_main$2), {
                  id: "stock-in-supplier-filter",
                  modelValue: unref(supplierFilter),
                  "onUpdate:modelValue": ($event) => isRef(supplierFilter) ? supplierFilter.value = $event : null,
                  class: "w-44",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua pemasok"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(supplierOptions), (supplier) => {
                      return openBlock(), createBlock("option", {
                        key: supplier.id,
                        value: supplier.id
                      }, toDisplayString(supplier.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", { class: "flex gap-2" }, [
                createVNode("label", {
                  for: "stock-in-date-from",
                  class: "sr-only"
                }, "Tanggal mulai stok masuk"),
                createVNode(unref(_sfc_main$1$1), {
                  id: "stock-in-date-from",
                  modelValue: unref(dateFrom),
                  "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
                  type: "date",
                  class: "w-36",
                  disabled: unref(isLoading)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                createVNode("label", {
                  for: "stock-in-date-to",
                  class: "sr-only"
                }, "Tanggal akhir stok masuk"),
                createVNode(unref(_sfc_main$1$1), {
                  id: "stock-in-date-to",
                  modelValue: unref(dateTo),
                  "onUpdate:modelValue": ($event) => isRef(dateTo) ? dateTo.value = $event : null,
                  type: "date",
                  class: "w-36",
                  disabled: unref(isLoading)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ])
            ];
          }
        }),
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              type: "button",
              size: "sm",
              disabled: unref(isLoading) || !unref(canCreate),
              onClick: openCreateDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(` Catat Masuk `);
                } else {
                  return [
                    createVNode(unref(Plus), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Catat Masuk ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1), {
                type: "button",
                size: "sm",
                disabled: unref(isLoading) || !unref(canCreate),
                onClick: openCreateDialog
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Catat Masuk ")
                ]),
                _: 1
              }, 8, ["disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3">`);
      _push(ssrRenderComponent(AdminDataTable, {
        columns,
        rows: unref(rows),
        loading: unref(isLoading),
        actions: ["view"],
        label: "stok masuk",
        "empty-title": "Stok masuk tidak ditemukan",
        "empty-description": "Ubah kata kunci, bahan, pemasok, atau rentang tanggal.",
        onView: openDetailDialog
      }, null, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(AdminCrudDialog, {
        open: unref(isCrudDialogOpen),
        "onUpdate:open": ($event) => isRef(isCrudDialogOpen) ? isCrudDialogOpen.value = $event : null,
        form: unref(crudForm),
        "onUpdate:form": ($event) => isRef(crudForm) ? crudForm.value = $event : null,
        mode: unref(crudMode),
        title: unref(dialogTitle),
        description: unref(dialogDescription),
        fields: unref(stockInFields),
        "detail-items": unref(detailItems),
        "target-name": unref(selectedStockIn)?.ingredientName,
        loading: unref(isCrudLoading),
        "form-error": unref(formError),
        onSubmit: handleCrudSubmit
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/stock-in.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=stock-in-Cx9uYbz5.mjs.map
