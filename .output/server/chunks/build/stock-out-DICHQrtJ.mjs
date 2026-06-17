import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, openBlock, createBlock, isRef, createVNode, createTextVNode, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { PackageMinus, ClipboardCheck, AlertTriangle, Plus } from 'lucide-vue-next';
import { _ as _sfc_main$1 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$1$1 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminCrudDialog } from './AdminCrudDialog-GXCLLFMD.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { u as useAdminInventoryApi, a as isManualStockOutTypeName, h as hydrateAdminInventoryMovementStockType, m as mapAdminInventoryMovementRecordToViewItem, b as createAdminInventoryStockOutPayload, d as getAdminInventoryStockOutValidationMessage } from './useAdminInventoryApi-BAZJNA8p.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminRawIngredientApi } from './useAdminRawIngredientApi-i_i6QbK-.mjs';
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
import './api-endpoints-aT5YyZ8V.mjs';
import 'vue-sonner';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stock-out",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Stok Keluar"
    });
    const adminInventoryApi = useAdminInventoryApi();
    useAdminRawIngredientApi();
    const { runAdminAction } = useAdminActionFeedback();
    const search = ref("");
    const ingredientFilter = ref("all");
    const reasonFilter = ref("all");
    const dateFrom = ref("");
    const dateTo = ref("");
    const isLoading = ref(false);
    const isCrudLoading = ref(false);
    const isCrudDialogOpen = ref(false);
    const crudMode = ref("detail");
    const loadError = ref("");
    const formError = ref("");
    const stockOutItems = ref([]);
    const stockTypeOptions = ref([]);
    const ingredientOptions = ref([]);
    const selectedStockOut = ref(null);
    const selectedStockOutDetail = ref(null);
    const crudForm = ref(createStockOutForm());
    let searchTimer = null;
    let stockOutRequestId = 0;
    const stockOutTypeIds = computed(() => stockTypeOptions.value.filter((type) => isManualStockOutTypeName(type.name)).map((type) => type.id));
    const canCreate = computed(() => ingredientOptions.value.length > 0);
    const hasActiveFilter = computed(() => Boolean(
      search.value.trim() || ingredientFilter.value !== "all" || reasonFilter.value !== "all" || dateFrom.value || dateTo.value
    ));
    const visibleStockOutItems = computed(() => {
      if (reasonFilter.value === "all") {
        return stockOutItems.value;
      }
      return stockOutItems.value.filter((item) => item.reason === reasonFilter.value);
    });
    const totalQty = computed(() => visibleStockOutItems.value.reduce((total, item) => total + item.absQty, 0));
    const damagedCount = computed(() => visibleStockOutItems.value.filter((item) => item.reason === "DAMAGED").length);
    const expiredCount = computed(() => visibleStockOutItems.value.filter((item) => item.reason === "EXPIRED").length);
    const stockOutFields = computed(() => [
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
        key: "qty",
        label: "Qty Keluar",
        type: "number",
        inputmode: "decimal",
        required: true
      },
      {
        key: "reason",
        label: "Alasan",
        type: "select",
        required: true,
        options: [
          { label: "Rusak", value: "DAMAGED" },
          { label: "Kedaluwarsa", value: "EXPIRED" },
          { label: "Lainnya", value: "OTHER" }
        ]
      },
      {
        key: "notes",
        label: "Catatan",
        type: "textarea",
        placeholder: "Contoh: Tumpah di meja racik",
        colSpan: "full"
      }
    ]);
    const metrics = computed(() => [
      {
        id: "total",
        label: "Transaksi Keluar",
        value: String(visibleStockOutItems.value.length),
        helper: hasActiveFilter.value ? "Sesuai filter aktif" : "Pengeluaran manual",
        tone: "info"
      },
      {
        id: "qty",
        label: "Qty Keluar",
        value: formatNumber(totalQty.value),
        helper: "Dalam data termuat",
        tone: "warning"
      },
      {
        id: "attention",
        label: "Perlu Perhatian",
        value: String(damagedCount.value + expiredCount.value),
        helper: `${damagedCount.value} rusak, ${expiredCount.value} kedaluwarsa`,
        tone: damagedCount.value + expiredCount.value > 0 ? "warning" : "default"
      }
    ]);
    const columns = [
      { key: "date", label: "Waktu", class: "min-w-44" },
      { key: "ingredient", label: "Bahan", class: "min-w-60" },
      { key: "reason", label: "Alasan", class: "min-w-36" },
      { key: "quantity", label: "Qty", align: "right" },
      { key: "balance", label: "Saldo", align: "right" },
      { key: "handledBy", label: "Dicatat Oleh", class: "min-w-44" }
    ];
    const rows = computed(() => visibleStockOutItems.value.map((item) => ({
      id: item.id,
      cells: {
        date: {
          label: item.date,
          description: item.reasonLabel
        },
        ingredient: {
          label: item.ingredientName,
          description: item.notes
        },
        reason: item.reasonLabel,
        quantity: {
          label: item.quantityLabel,
          monospace: true
        },
        balance: {
          label: item.balanceLabel,
          monospace: true
        },
        handledBy: item.userName
      }
    })));
    const dialogTitle = computed(() => crudMode.value === "create" ? "Catat Stok Keluar" : "Detail Stok Keluar");
    const dialogDescription = computed(() => {
      if (crudMode.value === "detail") {
        return isCrudLoading.value ? "Memuat detail stok keluar..." : "Informasi pengeluaran stok manual yang tercatat.";
      }
      return "Pilih bahan, qty, dan alasan pengeluaran manual. Stok akan berkurang setelah tersimpan.";
    });
    const detailItems = computed(() => {
      const item = selectedStockOutDetail.value ?? selectedStockOut.value;
      if (!item) {
        return [];
      }
      return [
        { label: "Waktu", value: item.date },
        { label: "Tipe Stok", value: item.stockTypeLabel },
        { label: "Bahan", value: item.ingredientName, description: `Satuan ${item.unitName}` },
        { label: "Alasan", value: item.reasonLabel },
        { label: "Qty Keluar", value: item.quantityLabel, monospace: true },
        { label: "Saldo Setelah Keluar", value: item.balanceLabel, monospace: true },
        { label: "Dicatat Oleh", value: item.userName },
        { label: "Catatan", value: item.notes, description: "Catatan pengeluaran stok." }
      ];
    });
    watch([search, ingredientFilter, dateFrom, dateTo], () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      searchTimer = setTimeout(() => {
        void loadStockOutItems();
      }, 300);
    });
    watch(crudForm, () => {
      formError.value = "";
    }, { deep: true });
    async function loadStockOutItems() {
      const requestId = ++stockOutRequestId;
      isLoading.value = true;
      loadError.value = "";
      try {
        const records = await loadStockOutMovementRecords();
        if (requestId !== stockOutRequestId) {
          return;
        }
        stockOutItems.value = records.map((record) => hydrateAdminInventoryMovementStockType(record, stockTypeOptions.value)).map(mapAdminInventoryMovementRecordToViewItem).filter((item) => item.movementKind === "out");
      } catch (error) {
        if (requestId !== stockOutRequestId) {
          return;
        }
        loadError.value = getErrorMessage(error, "Gagal memuat daftar stok keluar.");
        stockOutItems.value = [];
      } finally {
        if (requestId === stockOutRequestId) {
          isLoading.value = false;
        }
      }
    }
    async function loadStockOutMovementRecords() {
      const baseQuery = {
        batch: 1,
        size: 100,
        search: search.value.trim() || void 0,
        ingredient_id: ingredientFilter.value === "all" ? void 0 : ingredientFilter.value,
        date_from: dateFrom.value || void 0,
        date_to: dateTo.value || void 0
      };
      if (!stockOutTypeIds.value.length) {
        const result = await adminInventoryApi.getInventoryMovements(baseQuery);
        return Array.isArray(result.records) ? result.records : [];
      }
      const results = await Promise.all(stockOutTypeIds.value.map((stockTypeId) => adminInventoryApi.getInventoryMovements({
        ...baseQuery,
        stock_type_id: stockTypeId
      })));
      return dedupeMovementRecords(results.flatMap((result) => Array.isArray(result.records) ? result.records : []));
    }
    function createStockOutForm() {
      return {
        ingredientId: ingredientOptions.value[0]?.id ?? "",
        qty: "",
        reason: "DAMAGED",
        notes: ""
      };
    }
    function createStockOutPayload() {
      const payload = {
        ingredientId: crudForm.value.ingredientId ?? "",
        qty: toNumber(crudForm.value.qty),
        reason: getStockOutReason(crudForm.value.reason),
        notes: (crudForm.value.notes ?? "").trim()
      };
      const validationMessage = getAdminInventoryStockOutValidationMessage(payload);
      if (validationMessage) {
        formError.value = validationMessage;
        return null;
      }
      return payload;
    }
    function openCreateDialog() {
      selectedStockOut.value = null;
      selectedStockOutDetail.value = null;
      formError.value = "";
      crudMode.value = "create";
      crudForm.value = createStockOutForm();
      isCrudDialogOpen.value = true;
    }
    async function openDetailDialog(id) {
      const item = stockOutItems.value.find((stockOut) => stockOut.id === id);
      if (!item) {
        return;
      }
      selectedStockOut.value = item;
      selectedStockOutDetail.value = item;
      formError.value = "";
      crudMode.value = "detail";
      isCrudDialogOpen.value = true;
      isCrudLoading.value = true;
      try {
        const detail = await adminInventoryApi.getInventoryMovementDetail(id);
        selectedStockOutDetail.value = mapAdminInventoryMovementRecordToViewItem(
          hydrateAdminInventoryMovementStockType(detail, stockTypeOptions.value)
        );
      } catch {
        selectedStockOutDetail.value = item;
      } finally {
        isCrudLoading.value = false;
      }
    }
    async function handleCrudSubmit() {
      const payload = createStockOutPayload();
      if (!payload) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        await adminInventoryApi.createStockOut(createAdminInventoryStockOutPayload(payload));
        await loadStockOutItems();
      }, {
        loading: isCrudLoading,
        successMessage: "Stok keluar berhasil dicatat.",
        errorMessage: "Gagal mencatat stok keluar."
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
    function getStockOutReason(value) {
      if (value === "DAMAGED" || value === "EXPIRED" || value === "OTHER") {
        return value;
      }
      return "OTHER";
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
        title: "Stok Keluar",
        description: "Catat pengeluaran stok manual untuk kerusakan, kedaluwarsa, atau kebutuhan koreksi."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan stok keluar"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.id === "total") {
                _push2(ssrRenderComponent(unref(PackageMinus), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else if (item.id === "qty") {
                _push2(ssrRenderComponent(unref(ClipboardCheck), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(AlertTriangle), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              }
            } else {
              return [
                item.id === "total" ? (openBlock(), createBlock(unref(PackageMinus), {
                  key: 0,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : item.id === "qty" ? (openBlock(), createBlock(unref(ClipboardCheck), {
                  key: 1,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : (openBlock(), createBlock(unref(AlertTriangle), {
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
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="stock-out-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="stock-out-table-title" class="text-base font-semibold tracking-normal"> Daftar Stok Keluar </h2><p class="mt-1 text-sm text-muted-foreground"> Pengeluaran manual mengurangi stok bahan tanpa mengubah harga rata-rata. </p></div></div>`);
      if (unref(loadError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "stock-out-search",
        "search-label": "Cari stok keluar",
        "search-placeholder": "Cari bahan, alasan, atau catatan",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="stock-out-ingredient-filter" class="sr-only"${_scopeId}>Filter bahan stok keluar</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "stock-out-ingredient-filter",
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
            _push2(`</div><div${_scopeId}><label for="stock-out-reason-filter" class="sr-only"${_scopeId}>Filter alasan stok keluar</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "stock-out-reason-filter",
              modelValue: unref(reasonFilter),
              "onUpdate:modelValue": ($event) => isRef(reasonFilter) ? reasonFilter.value = $event : null,
              class: "w-40",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua alasan</option><option value="DAMAGED"${_scopeId2}>Rusak</option><option value="EXPIRED"${_scopeId2}>Kedaluwarsa</option><option value="OTHER"${_scopeId2}>Lainnya</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua alasan"),
                    createVNode("option", { value: "DAMAGED" }, "Rusak"),
                    createVNode("option", { value: "EXPIRED" }, "Kedaluwarsa"),
                    createVNode("option", { value: "OTHER" }, "Lainnya")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-2"${_scopeId}><label for="stock-out-date-from" class="sr-only"${_scopeId}>Tanggal mulai stok keluar</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), {
              id: "stock-out-date-from",
              modelValue: unref(dateFrom),
              "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
              type: "date",
              class: "w-36",
              disabled: unref(isLoading)
            }, null, _parent2, _scopeId));
            _push2(`<label for="stock-out-date-to" class="sr-only"${_scopeId}>Tanggal akhir stok keluar</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), {
              id: "stock-out-date-to",
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
                  for: "stock-out-ingredient-filter",
                  class: "sr-only"
                }, "Filter bahan stok keluar"),
                createVNode(unref(_sfc_main$2), {
                  id: "stock-out-ingredient-filter",
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
                  for: "stock-out-reason-filter",
                  class: "sr-only"
                }, "Filter alasan stok keluar"),
                createVNode(unref(_sfc_main$2), {
                  id: "stock-out-reason-filter",
                  modelValue: unref(reasonFilter),
                  "onUpdate:modelValue": ($event) => isRef(reasonFilter) ? reasonFilter.value = $event : null,
                  class: "w-40",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua alasan"),
                    createVNode("option", { value: "DAMAGED" }, "Rusak"),
                    createVNode("option", { value: "EXPIRED" }, "Kedaluwarsa"),
                    createVNode("option", { value: "OTHER" }, "Lainnya")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", { class: "flex gap-2" }, [
                createVNode("label", {
                  for: "stock-out-date-from",
                  class: "sr-only"
                }, "Tanggal mulai stok keluar"),
                createVNode(unref(_sfc_main$1$1), {
                  id: "stock-out-date-from",
                  modelValue: unref(dateFrom),
                  "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
                  type: "date",
                  class: "w-36",
                  disabled: unref(isLoading)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                createVNode("label", {
                  for: "stock-out-date-to",
                  class: "sr-only"
                }, "Tanggal akhir stok keluar"),
                createVNode(unref(_sfc_main$1$1), {
                  id: "stock-out-date-to",
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
                  _push3(` Catat Keluar `);
                } else {
                  return [
                    createVNode(unref(Plus), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Catat Keluar ")
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
                  createTextVNode(" Catat Keluar ")
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
        label: "stok keluar",
        "empty-title": "Stok keluar tidak ditemukan",
        "empty-description": "Ubah kata kunci, bahan, alasan, atau rentang tanggal.",
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
        fields: unref(stockOutFields),
        "detail-items": unref(detailItems),
        "target-name": unref(selectedStockOut)?.ingredientName,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/stock-out.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=stock-out-DICHQrtJ.mjs.map
