import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, openBlock, createBlock, isRef, createVNode, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { History, PackagePlus, PackageMinus, SlidersHorizontal } from 'lucide-vue-next';
import { _ as _sfc_main$1 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminCrudDialog } from './AdminCrudDialog-GXCLLFMD.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { u as useAdminInventoryApi, h as hydrateAdminInventoryMovementStockType, m as mapAdminInventoryMovementRecordToViewItem } from './useAdminInventoryApi-BMpHShMd.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminSupplierApi } from './useAdminSupplierApi-CX9ChO1Y.mjs';
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
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-DSBdqIS4.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './index-BZG70idc.mjs';
import './DialogTrigger-B5C6UhMx.mjs';
import './Textarea-DYkcGDV8.mjs';
import './image-upload-BN8fXv4v.mjs';
import './PaginationPrevious-DSL0-rZ8.mjs';
import './Skeleton-CQWwuiK0.mjs';
import './api-endpoints-BXkjOpII.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stock-history",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Riwayat Stok"
    });
    const adminInventoryApi = useAdminInventoryApi();
    useAdminSupplierApi();
    const search = ref("");
    const typeFilter = ref("all");
    const ingredientFilter = ref("all");
    const supplierFilter = ref("all");
    const dateFrom = ref("");
    const dateTo = ref("");
    const isLoading = ref(false);
    const isDetailLoading = ref(false);
    const isDetailDialogOpen = ref(false);
    const loadError = ref("");
    const totalRecordCount = ref(0);
    const stockHistory = ref([]);
    const stockTypeOptions = ref([]);
    const ingredientOptions = ref([]);
    const supplierOptions = ref([]);
    const selectedHistory = ref(null);
    const selectedHistoryDetail = ref(null);
    const detailForm = ref({});
    let searchTimer = null;
    let historyRequestId = 0;
    const hasActiveFilter = computed(() => Boolean(
      search.value.trim() || typeFilter.value !== "all" || ingredientFilter.value !== "all" || supplierFilter.value !== "all" || dateFrom.value || dateTo.value
    ));
    const incomingCount = computed(() => stockHistory.value.filter((item) => item.movementKind === "in").length);
    const outgoingCount = computed(() => stockHistory.value.filter((item) => item.movementKind === "out" || item.movementKind === "sale").length);
    const metrics = computed(() => [
      {
        id: "total",
        label: "Total Mutasi",
        value: String(totalRecordCount.value),
        helper: hasActiveFilter.value ? "Sesuai filter aktif" : "Perubahan stok tercatat",
        tone: "info"
      },
      {
        id: "in",
        label: "Stok Masuk",
        value: String(incomingCount.value),
        helper: "Dalam data termuat",
        tone: "success"
      },
      {
        id: "out",
        label: "Stok Keluar",
        value: String(outgoingCount.value),
        helper: "Manual atau penjualan",
        tone: "warning"
      }
    ]);
    const columns = [
      { key: "date", label: "Waktu", class: "min-w-44" },
      { key: "ingredient", label: "Bahan", class: "min-w-60" },
      { key: "type", label: "Tipe", class: "min-w-36" },
      { key: "source", label: "Sumber", class: "min-w-48" },
      { key: "quantity", label: "Jumlah", align: "right" },
      { key: "balance", label: "Saldo", align: "right" }
    ];
    const rows = computed(() => stockHistory.value.map((item) => ({
      id: item.id,
      cells: {
        date: {
          label: item.date,
          description: item.stockTypeLabel
        },
        ingredient: {
          label: item.ingredientName,
          description: item.notes
        },
        type: {
          label: item.typeLabel,
          tone: item.typeTone
        },
        source: item.source,
        quantity: {
          label: item.quantityLabel,
          monospace: true
        },
        balance: {
          label: item.balanceLabel,
          monospace: true
        }
      }
    })));
    const detailItems = computed(() => {
      const item = selectedHistoryDetail.value ?? selectedHistory.value;
      if (!item) {
        return [];
      }
      return [
        { label: "Waktu", value: item.date },
        { label: "Bahan", value: item.ingredientName, description: `Satuan ${item.unitName}` },
        { label: "Tipe", value: item.typeLabel, tone: item.typeTone },
        { label: "Sumber", value: item.source },
        { label: "Pemasok", value: item.supplierName },
        { label: "Dicatat Oleh", value: item.userName },
        { label: "Jumlah", value: item.quantityLabel, monospace: true },
        { label: "Saldo Setelah Mutasi", value: item.balanceLabel, monospace: true },
        { label: "Harga Satuan", value: item.unitCostLabel, monospace: true },
        { label: "Total Nilai", value: item.totalCostLabel, monospace: true },
        { label: "Catatan", value: item.notes, description: "Catatan yang tersimpan pada riwayat stok." }
      ];
    });
    watch([search, typeFilter, ingredientFilter, supplierFilter, dateFrom, dateTo], () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      searchTimer = setTimeout(() => {
        void loadStockHistory();
      }, 300);
    });
    async function loadStockHistory() {
      const requestId = ++historyRequestId;
      isLoading.value = true;
      loadError.value = "";
      try {
        const result = await adminInventoryApi.getInventoryMovements({
          batch: 1,
          size: 100,
          search: search.value.trim() || void 0,
          stock_type_id: typeFilter.value === "all" ? void 0 : typeFilter.value,
          ingredient_id: ingredientFilter.value === "all" ? void 0 : ingredientFilter.value,
          supplier_id: supplierFilter.value === "all" ? void 0 : supplierFilter.value,
          date_from: dateFrom.value || void 0,
          date_to: dateTo.value || void 0
        });
        const records = Array.isArray(result.records) ? result.records : [];
        if (requestId !== historyRequestId) {
          return;
        }
        stockHistory.value = records.map((record) => hydrateAdminInventoryMovementStockType(record, stockTypeOptions.value)).map(mapAdminInventoryMovementRecordToViewItem);
        totalRecordCount.value = result.page?.total_record_count ?? records.length;
      } catch (error) {
        if (requestId !== historyRequestId) {
          return;
        }
        loadError.value = getErrorMessage(error, "Gagal memuat riwayat stok.");
        stockHistory.value = [];
        totalRecordCount.value = 0;
      } finally {
        if (requestId === historyRequestId) {
          isLoading.value = false;
        }
      }
    }
    async function openDetailDialog(id) {
      const item = stockHistory.value.find((history) => history.id === id);
      if (!item) {
        return;
      }
      selectedHistory.value = item;
      selectedHistoryDetail.value = item;
      isDetailDialogOpen.value = true;
      isDetailLoading.value = true;
      try {
        const detail = await adminInventoryApi.getInventoryMovementDetail(id);
        selectedHistoryDetail.value = mapAdminInventoryMovementRecordToViewItem(
          hydrateAdminInventoryMovementStockType(detail, stockTypeOptions.value)
        );
      } catch {
        selectedHistoryDetail.value = item;
      } finally {
        isDetailLoading.value = false;
      }
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
        title: "Riwayat Stok",
        description: "Pantau audit keluar-masuk stok bahan, pemasok, tipe mutasi, dan saldo akhir."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan riwayat stok"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.id === "total") {
                _push2(ssrRenderComponent(unref(History), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else if (item.id === "in") {
                _push2(ssrRenderComponent(unref(PackagePlus), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(PackageMinus), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              }
            } else {
              return [
                item.id === "total" ? (openBlock(), createBlock(unref(History), {
                  key: 0,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : item.id === "in" ? (openBlock(), createBlock(unref(PackagePlus), {
                  key: 1,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : (openBlock(), createBlock(unref(PackageMinus), {
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
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="stock-history-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="stock-history-table-title" class="text-base font-semibold tracking-normal"> Tabel Riwayat Stok </h2><p class="mt-1 text-sm text-muted-foreground"> Filter riwayat berdasarkan bahan, pemasok, tipe pergerakan, dan rentang tanggal. </p></div></div>`);
      if (unref(loadError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "stock-history-search",
        "search-label": "Cari riwayat stok",
        "search-placeholder": "Cari bahan atau catatan",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="stock-history-type-filter" class="sr-only"${_scopeId}>Filter tipe mutasi stok</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "stock-history-type-filter",
              modelValue: unref(typeFilter),
              "onUpdate:modelValue": ($event) => isRef(typeFilter) ? typeFilter.value = $event : null,
              class: "w-40",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua tipe</option><!--[-->`);
                  ssrRenderList(unref(stockTypeOptions), (type) => {
                    _push3(`<option${ssrRenderAttr("value", type.id)}${_scopeId2}>${ssrInterpolate(type.label)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua tipe"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(stockTypeOptions), (type) => {
                      return openBlock(), createBlock("option", {
                        key: type.id,
                        value: type.id
                      }, toDisplayString(type.label), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="stock-history-ingredient-filter" class="sr-only"${_scopeId}>Filter bahan</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "stock-history-ingredient-filter",
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
            _push2(`</div><div${_scopeId}><label for="stock-history-supplier-filter" class="sr-only"${_scopeId}>Filter pemasok</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "stock-history-supplier-filter",
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
            _push2(`</div><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(SlidersHorizontal), {
              class: "size-4 text-muted-foreground",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`<label for="stock-history-date-from" class="sr-only"${_scopeId}>Tanggal mulai</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              id: "stock-history-date-from",
              modelValue: unref(dateFrom),
              "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
              type: "date",
              class: "w-36",
              disabled: unref(isLoading)
            }, null, _parent2, _scopeId));
            _push2(`<label for="stock-history-date-to" class="sr-only"${_scopeId}>Tanggal akhir</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              id: "stock-history-date-to",
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
                  for: "stock-history-type-filter",
                  class: "sr-only"
                }, "Filter tipe mutasi stok"),
                createVNode(unref(_sfc_main$2), {
                  id: "stock-history-type-filter",
                  modelValue: unref(typeFilter),
                  "onUpdate:modelValue": ($event) => isRef(typeFilter) ? typeFilter.value = $event : null,
                  class: "w-40",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua tipe"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(stockTypeOptions), (type) => {
                      return openBlock(), createBlock("option", {
                        key: type.id,
                        value: type.id
                      }, toDisplayString(type.label), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "stock-history-ingredient-filter",
                  class: "sr-only"
                }, "Filter bahan"),
                createVNode(unref(_sfc_main$2), {
                  id: "stock-history-ingredient-filter",
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
                  for: "stock-history-supplier-filter",
                  class: "sr-only"
                }, "Filter pemasok"),
                createVNode(unref(_sfc_main$2), {
                  id: "stock-history-supplier-filter",
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
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(unref(SlidersHorizontal), {
                  class: "size-4 text-muted-foreground",
                  "aria-hidden": "true"
                }),
                createVNode("label", {
                  for: "stock-history-date-from",
                  class: "sr-only"
                }, "Tanggal mulai"),
                createVNode(unref(_sfc_main$1), {
                  id: "stock-history-date-from",
                  modelValue: unref(dateFrom),
                  "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
                  type: "date",
                  class: "w-36",
                  disabled: unref(isLoading)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                createVNode("label", {
                  for: "stock-history-date-to",
                  class: "sr-only"
                }, "Tanggal akhir"),
                createVNode(unref(_sfc_main$1), {
                  id: "stock-history-date-to",
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
        _: 1
      }, _parent));
      _push(`<div class="mt-3">`);
      _push(ssrRenderComponent(AdminDataTable, {
        columns,
        rows: unref(rows),
        loading: unref(isLoading),
        actions: ["view"],
        label: "mutasi stok",
        "empty-title": "Riwayat stok tidak ditemukan",
        "empty-description": "Ubah kata kunci atau filter riwayat stok.",
        onView: openDetailDialog
      }, null, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(AdminCrudDialog, {
        open: unref(isDetailDialogOpen),
        "onUpdate:open": ($event) => isRef(isDetailDialogOpen) ? isDetailDialogOpen.value = $event : null,
        form: unref(detailForm),
        "onUpdate:form": ($event) => isRef(detailForm) ? detailForm.value = $event : null,
        mode: "detail",
        title: "Detail Riwayat Stok",
        description: unref(isDetailLoading) ? "Memuat detail riwayat stok..." : "Informasi mutasi stok yang tercatat.",
        "detail-items": unref(detailItems),
        loading: unref(isDetailLoading)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/stock-history.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=stock-history-Dfb9Au2m.mjs.map
