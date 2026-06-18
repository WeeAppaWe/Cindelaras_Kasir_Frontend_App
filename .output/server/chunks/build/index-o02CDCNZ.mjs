import { _ as __nuxt_component_0 } from './nuxt-link-B5v6N24G.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, isRef, createTextVNode, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { Plus, Factory, Boxes, PackageCheck, AlertTriangle, WalletCards, ListChecks, Calculator } from 'lucide-vue-next';
import { b as buttonVariants, _ as _sfc_main$7 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6, b as _sfc_main$3, c as _sfc_main$1, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-B5C6UhMx.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$8 } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$4 } from './Textarea-DYkcGDV8.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminCrudDialog } from './AdminCrudDialog-GXCLLFMD.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { u as useAdminSemiIngredientApi, b as formatAdminSemiIngredientCurrency, m as mapAdminSemiIngredientRecordToViewItem } from './useAdminSemiIngredientApi--c_3qxbu.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminActionFeedback } from './useAdminActionFeedback-BRkOE1ij.mjs';
import { n as navigateTo } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'class-variance-authority';
import 'reka-ui';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './index-DSBdqIS4.mjs';
import './image-upload-BN8fXv4v.mjs';
import './PaginationPrevious-DSL0-rZ8.mjs';
import './Skeleton-CQWwuiK0.mjs';
import './api-endpoints-BXkjOpII.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-sonner';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Bahan Setengah Jadi"
    });
    const adminSemiIngredientApi = useAdminSemiIngredientApi();
    const { runAdminAction } = useAdminActionFeedback();
    const search = ref("");
    const stockFilter = ref("all");
    const unitFilter = ref("all");
    const isLoading = ref(false);
    const isCrudLoading = ref(false);
    const isCrudDialogOpen = ref(false);
    const crudMode = ref("detail");
    const crudForm = ref({});
    const loadError = ref("");
    const crudError = ref("");
    const totalRecordCount = ref(0);
    const semiIngredients = ref([]);
    const unitOptions = ref([]);
    const selectedSemiIngredient = ref(null);
    const selectedSemiIngredientDetail = ref(null);
    const isProduceDialogOpen = ref(false);
    const isProduceLoading = ref(false);
    const produceError = ref("");
    const selectedProduceTarget = ref(null);
    const produceForm = ref({ qty: "", notes: "" });
    let searchTimer = null;
    let semiIngredientRequestId = 0;
    const hasSearch = computed(() => Boolean(search.value.trim()));
    const visibleIngredients = computed(() => {
      if (stockFilter.value === "all") {
        return semiIngredients.value;
      }
      return semiIngredients.value.filter((item) => item.statusKey === stockFilter.value);
    });
    const visibleRecordCount = computed(() => stockFilter.value === "all" ? totalRecordCount.value : visibleIngredients.value.length);
    const safeStockCount = computed(() => semiIngredients.value.filter((item) => item.statusKey === "safe").length);
    const attentionStockCount = computed(() => semiIngredients.value.filter((item) => item.statusKey !== "safe").length);
    const inventoryValue = computed(() => visibleIngredients.value.reduce((total, item) => total + item.inventoryValue, 0));
    const totalCompositionCount = computed(() => visibleIngredients.value.reduce((total, item) => total + item.compositionCount, 0));
    const metrics = computed(() => [
      {
        id: "total",
        label: "Total Olahan",
        value: String(visibleRecordCount.value),
        helper: hasSearch.value || unitFilter.value !== "all" || stockFilter.value !== "all" ? "Sesuai filter aktif" : "Bahan setengah jadi aktif",
        tone: "info"
      },
      {
        id: "safe",
        label: "Stok Aman",
        value: String(safeStockCount.value),
        helper: "Di atas minimum",
        tone: "success"
      },
      {
        id: "attention",
        label: "Perlu Produksi",
        value: String(attentionStockCount.value),
        helper: "Stok <= minimum",
        tone: attentionStockCount.value > 0 ? "warning" : "default"
      },
      {
        id: "value",
        label: "Nilai Stok",
        value: formatAdminSemiIngredientCurrency(inventoryValue.value),
        helper: totalCompositionCount.value > 0 ? `${totalCompositionCount.value} komposisi termuat` : "Stok x HPP",
        tone: "default"
      }
    ]);
    const columns = [
      { key: "name", label: "Bahan", class: "min-w-64" },
      { key: "stock", label: "Stok", align: "right" },
      { key: "minimumStock", label: "Minimum", align: "right" },
      { key: "hpp", label: "HPP/Unit", align: "right" },
      { key: "recipe", label: "Komposisi" },
      { key: "status", label: "Status Stok" }
    ];
    const rows = computed(() => visibleIngredients.value.map((item) => ({
      id: item.id,
      cells: {
        name: {
          label: item.name,
          description: `Satuan ${item.unitName}`
        },
        stock: {
          label: item.stockLabel,
          monospace: true
        },
        minimumStock: {
          label: item.minStockLabel,
          monospace: true
        },
        hpp: {
          label: item.avgCostLabel,
          description: `Nilai stok ${item.inventoryValueLabel}`,
          monospace: true
        },
        recipe: {
          label: item.compositionCount > 0 ? `${item.compositionCount} bahan` : "Detail komposisi",
          description: item.compositionSummary
        },
        status: {
          label: item.statusLabel,
          tone: item.statusTone
        }
      }
    })));
    const dialogTitle = computed(() => {
      if (crudMode.value === "delete") {
        return "Hapus Bahan Setengah Jadi";
      }
      return "Detail Bahan Setengah Jadi";
    });
    const dialogDescription = computed(() => {
      if (crudMode.value === "delete") {
        return "Bahan setengah jadi akan dihapus secara soft delete oleh backend.";
      }
      return isCrudLoading.value ? "Memuat detail bahan setengah jadi..." : "Informasi profil, stok, HPP, dan komposisi dari backend.";
    });
    const detailItems = computed(() => {
      const item = selectedSemiIngredientDetail.value ?? selectedSemiIngredient.value;
      if (!item) {
        return [];
      }
      return [
        { label: "Nama Olahan", value: item.name },
        { label: "Satuan", value: item.unitName },
        { label: "Stok Saat Ini", value: item.stockLabel },
        { label: "Stok Minimum", value: item.minStockLabel },
        { label: "HPP per Unit", value: item.avgCostLabel, monospace: true },
        { label: "Total HPP Resep", value: item.totalHppLabel, monospace: true },
        { label: "Status Stok", value: item.statusLabel, tone: item.statusTone },
        { label: "Dibuat", value: item.createdAt },
        { label: "Diperbarui", value: item.updatedAt, description: item.hasBeenUpdated ? "Perubahan terakhir dari backend." : "Belum pernah diperbarui." }
      ];
    });
    watch([search, unitFilter], () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      searchTimer = setTimeout(() => {
        void loadSemiIngredients();
      }, 300);
    });
    watch(produceForm, () => {
      produceError.value = "";
    }, { deep: true });
    async function loadSemiIngredients() {
      const requestId = ++semiIngredientRequestId;
      isLoading.value = true;
      loadError.value = "";
      try {
        const result = await adminSemiIngredientApi.getSemiIngredients({
          batch: 1,
          size: 100,
          search: search.value.trim() || void 0,
          unit_id: unitFilter.value === "all" ? void 0 : unitFilter.value
        });
        const records = Array.isArray(result.records) ? result.records : [];
        if (requestId !== semiIngredientRequestId) {
          return;
        }
        semiIngredients.value = records.map(mapAdminSemiIngredientRecordToViewItem);
        totalRecordCount.value = result.page?.total_record_count ?? records.length;
      } catch (error) {
        if (requestId !== semiIngredientRequestId) {
          return;
        }
        loadError.value = getErrorMessage(error, "Gagal memuat daftar bahan setengah jadi.");
        semiIngredients.value = [];
        totalRecordCount.value = 0;
      } finally {
        if (requestId === semiIngredientRequestId) {
          isLoading.value = false;
        }
      }
    }
    function findSemiIngredient(id) {
      return semiIngredients.value.find((item) => item.id === id) ?? null;
    }
    async function openDetailDialog(id) {
      const item = findSemiIngredient(id);
      if (!item) {
        return;
      }
      selectedSemiIngredient.value = item;
      selectedSemiIngredientDetail.value = item;
      crudMode.value = "detail";
      crudError.value = "";
      isCrudDialogOpen.value = true;
      isCrudLoading.value = true;
      try {
        const detail = await adminSemiIngredientApi.getSemiIngredientDetail(id);
        const mappedDetail = mapAdminSemiIngredientRecordToViewItem(detail);
        if (false) ;
        selectedSemiIngredientDetail.value = mappedDetail;
      } catch (error) {
        selectedSemiIngredientDetail.value = item;
        crudError.value = getErrorMessage(error, "Gagal memuat detail komposisi bahan setengah jadi.");
      } finally {
        isCrudLoading.value = false;
      }
    }
    function openEditPage(id) {
      return navigateTo(`/admin/semi-finished-ingredients/${id}`);
    }
    function openDeleteDialog(id) {
      selectedSemiIngredient.value = findSemiIngredient(id);
      selectedSemiIngredientDetail.value = selectedSemiIngredient.value;
      crudMode.value = "delete";
      crudError.value = "";
      isCrudDialogOpen.value = Boolean(selectedSemiIngredient.value);
    }
    async function handleDelete() {
      if (!selectedSemiIngredient.value) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        await adminSemiIngredientApi.deleteSemiIngredient(selectedSemiIngredient.value.id);
        await loadSemiIngredients();
      }, {
        loading: isCrudLoading,
        successMessage: "Bahan setengah jadi berhasil dihapus.",
        errorMessage: "Gagal menghapus bahan setengah jadi."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
      }
    }
    function openProduceDialog(id) {
      const item = findSemiIngredient(id);
      if (!item) {
        return;
      }
      selectedProduceTarget.value = item;
      produceError.value = "";
      produceForm.value = { qty: "", notes: "" };
      isProduceDialogOpen.value = true;
    }
    async function handleProduce() {
      const qty = Number(produceForm.value.qty);
      if (!Number.isFinite(qty) || qty <= 0) {
        produceError.value = "Jumlah produksi harus lebih dari 0.";
        return;
      }
      if (!selectedProduceTarget.value) {
        return;
      }
      const payload = {
        qty,
        notes: produceForm.value.notes.trim() || void 0
      };
      isProduceLoading.value = true;
      produceError.value = "";
      try {
        await adminSemiIngredientApi.produceSemiIngredient(selectedProduceTarget.value.id, payload);
        await loadSemiIngredients();
        isProduceDialogOpen.value = false;
      } catch (error) {
        produceError.value = formatProduceError(error);
      } finally {
        isProduceLoading.value = false;
      }
    }
    function formatProduceError(error) {
      const fallback = "Gagal mencatat produksi.";
      if (!isErrorRecord(error)) {
        return error instanceof Error ? error.message : fallback;
      }
      const candidates = [error, error.data, error.raw, isErrorRecord(error.raw) ? error.raw.data : null];
      let message = fallback;
      for (const candidate of candidates) {
        if (isErrorRecord(candidate) && typeof candidate.message === "string" && candidate.message.trim()) {
          message = candidate.message.trim();
          break;
        }
      }
      const errors = [];
      for (const candidate of candidates) {
        if (isErrorRecord(candidate) && Array.isArray(candidate.errors)) {
          errors.push(...candidate.errors);
        }
      }
      const details = errors.filter(isErrorRecord).map((entry) => {
        const field = typeof entry.field === "string" ? entry.field.trim() : "";
        const msg = typeof entry.message === "string" ? entry.message.trim() : "";
        if (!msg) return "";
        if (!field || field === "qty") return `- ${msg}`;
        return `- ${field}: ${msg}`;
      }).filter((line, index, arr) => line && arr.indexOf(line) === index);
      if (!details.length) return message;
      return [message, ...details].join("\n");
    }
    function isErrorRecord(value) {
      return typeof value === "object" && value !== null;
    }
    function getMetricIcon(metricId) {
      if (metricId === "total") {
        return Boxes;
      }
      if (metricId === "safe") {
        return PackageCheck;
      }
      if (metricId === "attention") {
        return AlertTriangle;
      }
      if (metricId === "value") {
        return WalletCards;
      }
      if (metricId === "recipe") {
        return ListChecks;
      }
      return Calculator;
    }
    function getErrorMessage(error, fallback) {
      if (error instanceof Error && error.message) {
        return error.message;
      }
      return fallback;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-full flex-col gap-3 p-3 sm:p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(AdminPageHeader, {
        title: "Bahan Setengah Jadi",
        description: "Kelola bahan olahan, HPP, dan komposisi bahan baku."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan bahan setengah jadi"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(getMetricIcon(item.id)), {
                class: "size-4",
                "aria-hidden": "true"
              }, null), _parent2, _scopeId);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(getMetricIcon(item.id)), {
                  class: "size-4",
                  "aria-hidden": "true"
                }))
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="semi-finished-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="semi-finished-table-title" class="text-base font-semibold tracking-normal"> Daftar Bahan Setengah Jadi </h2><p class="mt-1 text-sm text-muted-foreground"> Pantau stok, HPP per unit, dan komposisi produksi setiap olahan. </p></div></div>`);
      if (unref(loadError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "semi-finished-search",
        "search-label": "Cari bahan setengah jadi",
        "search-placeholder": "Cari nama bahan atau satuan",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="semi-finished-stock-filter" class="sr-only"${_scopeId}>Filter status stok bahan setengah jadi</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "semi-finished-stock-filter",
              modelValue: unref(stockFilter),
              "onUpdate:modelValue": ($event) => isRef(stockFilter) ? stockFilter.value = $event : null,
              class: "w-36",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua stok</option><option value="safe"${_scopeId2}>Aman</option><option value="low"${_scopeId2}>Menipis</option><option value="critical"${_scopeId2}>Kritis</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua stok"),
                    createVNode("option", { value: "safe" }, "Aman"),
                    createVNode("option", { value: "low" }, "Menipis"),
                    createVNode("option", { value: "critical" }, "Kritis")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="semi-finished-unit-filter" class="sr-only"${_scopeId}>Filter satuan bahan setengah jadi</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "semi-finished-unit-filter",
              modelValue: unref(unitFilter),
              "onUpdate:modelValue": ($event) => isRef(unitFilter) ? unitFilter.value = $event : null,
              class: "w-40",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua satuan</option><!--[-->`);
                  ssrRenderList(unref(unitOptions), (unit) => {
                    _push3(`<option${ssrRenderAttr("value", unit.id)}${_scopeId2}>${ssrInterpolate(unit.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua satuan"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(unitOptions), (unit) => {
                      return openBlock(), createBlock("option", {
                        key: unit.id,
                        value: unit.id
                      }, toDisplayString(unit.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("label", {
                  for: "semi-finished-stock-filter",
                  class: "sr-only"
                }, "Filter status stok bahan setengah jadi"),
                createVNode(unref(_sfc_main$2), {
                  id: "semi-finished-stock-filter",
                  modelValue: unref(stockFilter),
                  "onUpdate:modelValue": ($event) => isRef(stockFilter) ? stockFilter.value = $event : null,
                  class: "w-36",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua stok"),
                    createVNode("option", { value: "safe" }, "Aman"),
                    createVNode("option", { value: "low" }, "Menipis"),
                    createVNode("option", { value: "critical" }, "Kritis")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "semi-finished-unit-filter",
                  class: "sr-only"
                }, "Filter satuan bahan setengah jadi"),
                createVNode(unref(_sfc_main$2), {
                  id: "semi-finished-unit-filter",
                  modelValue: unref(unitFilter),
                  "onUpdate:modelValue": ($event) => isRef(unitFilter) ? unitFilter.value = $event : null,
                  class: "w-40",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua satuan"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(unitOptions), (unit) => {
                      return openBlock(), createBlock("option", {
                        key: unit.id,
                        value: unit.id
                      }, toDisplayString(unit.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ])
            ];
          }
        }),
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/admin/semi-finished-ingredients/create",
              class: [unref(buttonVariants)({ size: "sm" }), unref(isLoading) ? "pointer-events-none opacity-50" : ""],
              "aria-disabled": unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tambah Olahan `);
                } else {
                  return [
                    createVNode(unref(Plus), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Tambah Olahan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/admin/semi-finished-ingredients/create",
                class: [unref(buttonVariants)({ size: "sm" }), unref(isLoading) ? "pointer-events-none opacity-50" : ""],
                "aria-disabled": unref(isLoading)
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Tambah Olahan ")
                ]),
                _: 1
              }, 8, ["class", "aria-disabled"])
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
        actions: ["view", "produce", "edit", "delete"],
        label: "bahan setengah jadi",
        "empty-title": "Bahan setengah jadi tidak ditemukan",
        "empty-description": "Ubah kata kunci, status stok, atau filter satuan.",
        onView: openDetailDialog,
        onEdit: openEditPage,
        onProduce: openProduceDialog,
        onDelete: openDeleteDialog
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
        fields: [],
        "detail-items": unref(detailItems),
        "target-name": unref(selectedSemiIngredient)?.name,
        loading: unref(isCrudLoading),
        "form-error": unref(crudError),
        onDelete: handleDelete
      }, {
        detail: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(selectedSemiIngredientDetail) || unref(selectedSemiIngredient)) {
              _push2(`<section class="rounded-md border bg-muted/20 p-3" aria-labelledby="semi-finished-recipe-detail-title"${_scopeId}><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"${_scopeId}><div class="min-w-0"${_scopeId}><h3 id="semi-finished-recipe-detail-title" class="text-sm font-semibold tracking-normal"${_scopeId}> Komposisi Resep </h3><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(isCrudLoading) ? "Detail bahan penyusun sedang dimuat." : `${(unref(selectedSemiIngredientDetail) ?? unref(selectedSemiIngredient))?.compositionCount ?? 0} bahan penyusun`)}</p></div><p class="text-sm font-medium tabular-nums"${_scopeId}>${ssrInterpolate((unref(selectedSemiIngredientDetail) ?? unref(selectedSemiIngredient))?.totalHppLabel ?? "-")}</p></div>`);
              if (unref(isCrudLoading)) {
                _push2(`<div class="rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground"${_scopeId}> Memuat komposisi... </div>`);
              } else if (!(unref(selectedSemiIngredientDetail) ?? unref(selectedSemiIngredient))?.compositions.length) {
                _push2(`<div class="rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground"${_scopeId}> Belum ada bahan penyusun aktif yang tersimpan. </div>`);
              } else {
                _push2(`<div class="overflow-hidden rounded-md border bg-background"${_scopeId}><table class="w-full table-fixed text-xs sm:text-sm"${_scopeId}><colgroup${_scopeId}><col class="w-9"${_scopeId}><col class="w-[32%]"${_scopeId}><col class="w-[22%]"${_scopeId}><col class="w-[20%]"${_scopeId}><col class="w-[20%]"${_scopeId}></colgroup><thead class="bg-muted/60 text-xs uppercase text-muted-foreground"${_scopeId}><tr${_scopeId}><th class="px-2 py-2 text-left font-medium"${_scopeId}>No</th><th class="px-2 py-2 text-left font-medium"${_scopeId}>Bahan</th><th class="px-2 py-2 text-right font-medium"${_scopeId}>Jumlah</th><th class="px-2 py-2 text-right font-medium"${_scopeId}>HPP</th><th class="px-2 py-2 text-right font-medium"${_scopeId}>Subtotal</th></tr></thead><tbody class="divide-y"${_scopeId}><!--[-->`);
                ssrRenderList((unref(selectedSemiIngredientDetail) ?? unref(selectedSemiIngredient))?.compositions ?? [], (composition, index) => {
                  _push2(`<tr${_scopeId}><td class="px-2 py-2 text-muted-foreground"${_scopeId}>${ssrInterpolate(index + 1)}</td><td class="break-words px-2 py-2 font-medium text-foreground"${_scopeId}>${ssrInterpolate(composition.ingredientName)}</td><td class="break-words px-2 py-2 text-right tabular-nums"${_scopeId}>${ssrInterpolate(composition.qtyLabel)}</td><td class="break-words px-2 py-2 text-right tabular-nums"${_scopeId}>${ssrInterpolate(composition.avgCostLabel)}</td><td class="break-words px-2 py-2 text-right font-medium tabular-nums"${_scopeId}>${ssrInterpolate(composition.subtotalLabel)}</td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              }
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(selectedSemiIngredientDetail) || unref(selectedSemiIngredient) ? (openBlock(), createBlock("section", {
                key: 0,
                class: "rounded-md border bg-muted/20 p-3",
                "aria-labelledby": "semi-finished-recipe-detail-title"
              }, [
                createVNode("div", { class: "mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between" }, [
                  createVNode("div", { class: "min-w-0" }, [
                    createVNode("h3", {
                      id: "semi-finished-recipe-detail-title",
                      class: "text-sm font-semibold tracking-normal"
                    }, " Komposisi Resep "),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, toDisplayString(unref(isCrudLoading) ? "Detail bahan penyusun sedang dimuat." : `${(unref(selectedSemiIngredientDetail) ?? unref(selectedSemiIngredient))?.compositionCount ?? 0} bahan penyusun`), 1)
                  ]),
                  createVNode("p", { class: "text-sm font-medium tabular-nums" }, toDisplayString((unref(selectedSemiIngredientDetail) ?? unref(selectedSemiIngredient))?.totalHppLabel ?? "-"), 1)
                ]),
                unref(isCrudLoading) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground"
                }, " Memuat komposisi... ")) : !(unref(selectedSemiIngredientDetail) ?? unref(selectedSemiIngredient))?.compositions.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground"
                }, " Belum ada bahan penyusun aktif yang tersimpan. ")) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "overflow-hidden rounded-md border bg-background"
                }, [
                  createVNode("table", { class: "w-full table-fixed text-xs sm:text-sm" }, [
                    createVNode("colgroup", null, [
                      createVNode("col", { class: "w-9" }),
                      createVNode("col", { class: "w-[32%]" }),
                      createVNode("col", { class: "w-[22%]" }),
                      createVNode("col", { class: "w-[20%]" }),
                      createVNode("col", { class: "w-[20%]" })
                    ]),
                    createVNode("thead", { class: "bg-muted/60 text-xs uppercase text-muted-foreground" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-2 py-2 text-left font-medium" }, "No"),
                        createVNode("th", { class: "px-2 py-2 text-left font-medium" }, "Bahan"),
                        createVNode("th", { class: "px-2 py-2 text-right font-medium" }, "Jumlah"),
                        createVNode("th", { class: "px-2 py-2 text-right font-medium" }, "HPP"),
                        createVNode("th", { class: "px-2 py-2 text-right font-medium" }, "Subtotal")
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList((unref(selectedSemiIngredientDetail) ?? unref(selectedSemiIngredient))?.compositions ?? [], (composition, index) => {
                        return openBlock(), createBlock("tr", {
                          key: composition.id
                        }, [
                          createVNode("td", { class: "px-2 py-2 text-muted-foreground" }, toDisplayString(index + 1), 1),
                          createVNode("td", { class: "break-words px-2 py-2 font-medium text-foreground" }, toDisplayString(composition.ingredientName), 1),
                          createVNode("td", { class: "break-words px-2 py-2 text-right tabular-nums" }, toDisplayString(composition.qtyLabel), 1),
                          createVNode("td", { class: "break-words px-2 py-2 text-right tabular-nums" }, toDisplayString(composition.avgCostLabel), 1),
                          createVNode("td", { class: "break-words px-2 py-2 text-right font-medium tabular-nums" }, toDisplayString(composition.subtotalLabel), 1)
                        ]);
                      }), 128))
                    ])
                  ])
                ]))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        open: unref(isProduceDialogOpen),
        "onUpdate:open": ($event) => isRef(isProduceDialogOpen) ? isProduceDialogOpen.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6), { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1), { class: "flex items-center gap-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Factory), {
                                class: "size-5 text-success",
                                "aria-hidden": "true"
                              }, null, _parent5, _scopeId4));
                              _push5(` Catat Produksi `);
                            } else {
                              return [
                                createVNode(unref(Factory), {
                                  class: "size-5 text-success",
                                  "aria-hidden": "true"
                                }),
                                createTextVNode(" Catat Produksi ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(selectedProduceTarget)) {
                          _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Produksi <span class="font-medium text-foreground"${_scopeId4}>${ssrInterpolate(unref(selectedProduceTarget).name)}</span>. Stok bahan baku penyusun akan dipotong otomatis sesuai resep. `);
                              } else {
                                return [
                                  createTextVNode(" Produksi "),
                                  createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(unref(selectedProduceTarget).name), 1),
                                  createTextVNode(". Stok bahan baku penyusun akan dipotong otomatis sesuai resep. ")
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
                          createVNode(unref(_sfc_main$1), { class: "flex items-center gap-2" }, {
                            default: withCtx(() => [
                              createVNode(unref(Factory), {
                                class: "size-5 text-success",
                                "aria-hidden": "true"
                              }),
                              createTextVNode(" Catat Produksi ")
                            ]),
                            _: 1
                          }),
                          unref(selectedProduceTarget) ? (openBlock(), createBlock(unref(_sfc_main$5), { key: 0 }, {
                            default: withCtx(() => [
                              createTextVNode(" Produksi "),
                              createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(unref(selectedProduceTarget).name), 1),
                              createTextVNode(". Stok bahan baku penyusun akan dipotong otomatis sesuai resep. ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(produceError)) {
                    _push3(`<div class="whitespace-pre-line rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive" role="alert"${_scopeId2}>${ssrInterpolate(unref(produceError))}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(selectedProduceTarget)) {
                    _push3(`<div class="rounded-md border bg-muted/30 px-3 py-2 text-sm"${_scopeId2}><div class="flex justify-between gap-4"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Stok saat ini</span><span class="font-mono font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(unref(selectedProduceTarget).stockLabel)}</span></div><div class="mt-1 flex justify-between gap-4"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Bahan penyusun</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(unref(selectedProduceTarget).compositionCount > 0 ? `${unref(selectedProduceTarget).compositionCount} bahan` : "Belum ada resep")}</span></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="grid gap-4"${_scopeId2}><div class="grid gap-1.5"${_scopeId2}><label for="produce-qty" class="text-sm font-medium"${_scopeId2}> Jumlah Produksi <span class="text-destructive" aria-hidden="true"${_scopeId2}>*</span></label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$1$1), {
                    id: "produce-qty",
                    modelValue: unref(produceForm).qty,
                    "onUpdate:modelValue": ($event) => unref(produceForm).qty = $event,
                    type: "number",
                    inputmode: "decimal",
                    placeholder: "Masukkan jumlah yang diproduksi",
                    min: "0.001",
                    step: "any",
                    disabled: unref(isProduceLoading)
                  }, null, _parent3, _scopeId2));
                  if (unref(selectedProduceTarget)) {
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Satuan: ${ssrInterpolate(unref(selectedProduceTarget).unitName)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="grid gap-1.5"${_scopeId2}><label for="produce-notes" class="text-sm font-medium"${_scopeId2}> Catatan <span class="text-xs font-normal text-muted-foreground"${_scopeId2}>(opsional)</span></label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    id: "produce-notes",
                    modelValue: unref(produceForm).notes,
                    "onUpdate:modelValue": ($event) => unref(produceForm).notes = $event,
                    placeholder: "Catatan tambahan untuk produksi ini...",
                    disabled: unref(isProduceLoading),
                    class: "min-h-20 resize-none"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4$1), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          type: "button",
                          variant: "outline",
                          disabled: unref(isProduceLoading),
                          onClick: ($event) => isProduceDialogOpen.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Batal `);
                            } else {
                              return [
                                createTextVNode(" Batal ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$7), {
                          type: "button",
                          disabled: unref(isProduceLoading) || !unref(produceForm).qty,
                          onClick: handleProduce
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(isProduceLoading)) {
                                _push5(ssrRenderComponent(unref(_sfc_main$8), { class: "size-4" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(Factory), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(` ${ssrInterpolate(unref(isProduceLoading) ? "Memproses..." : "Catat Produksi")}`);
                            } else {
                              return [
                                unref(isProduceLoading) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                  key: 0,
                                  class: "size-4"
                                })) : (openBlock(), createBlock(unref(Factory), {
                                  key: 1,
                                  class: "size-4",
                                  "aria-hidden": "true"
                                })),
                                createTextVNode(" " + toDisplayString(unref(isProduceLoading) ? "Memproses..." : "Catat Produksi"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$7), {
                            type: "button",
                            variant: "outline",
                            disabled: unref(isProduceLoading),
                            onClick: ($event) => isProduceDialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode(unref(_sfc_main$7), {
                            type: "button",
                            disabled: unref(isProduceLoading) || !unref(produceForm).qty,
                            onClick: handleProduce
                          }, {
                            default: withCtx(() => [
                              unref(isProduceLoading) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                                key: 0,
                                class: "size-4"
                              })) : (openBlock(), createBlock(unref(Factory), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              })),
                              createTextVNode(" " + toDisplayString(unref(isProduceLoading) ? "Memproses..." : "Catat Produksi"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1), { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Factory), {
                              class: "size-5 text-success",
                              "aria-hidden": "true"
                            }),
                            createTextVNode(" Catat Produksi ")
                          ]),
                          _: 1
                        }),
                        unref(selectedProduceTarget) ? (openBlock(), createBlock(unref(_sfc_main$5), { key: 0 }, {
                          default: withCtx(() => [
                            createTextVNode(" Produksi "),
                            createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(unref(selectedProduceTarget).name), 1),
                            createTextVNode(". Stok bahan baku penyusun akan dipotong otomatis sesuai resep. ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    unref(produceError) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "whitespace-pre-line rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive",
                      role: "alert"
                    }, toDisplayString(unref(produceError)), 1)) : createCommentVNode("", true),
                    unref(selectedProduceTarget) ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "rounded-md border bg-muted/30 px-3 py-2 text-sm"
                    }, [
                      createVNode("div", { class: "flex justify-between gap-4" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Stok saat ini"),
                        createVNode("span", { class: "font-mono font-medium tabular-nums" }, toDisplayString(unref(selectedProduceTarget).stockLabel), 1)
                      ]),
                      createVNode("div", { class: "mt-1 flex justify-between gap-4" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Bahan penyusun"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(unref(selectedProduceTarget).compositionCount > 0 ? `${unref(selectedProduceTarget).compositionCount} bahan` : "Belum ada resep"), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "grid gap-4" }, [
                      createVNode("div", { class: "grid gap-1.5" }, [
                        createVNode("label", {
                          for: "produce-qty",
                          class: "text-sm font-medium"
                        }, [
                          createTextVNode(" Jumlah Produksi "),
                          createVNode("span", {
                            class: "text-destructive",
                            "aria-hidden": "true"
                          }, "*")
                        ]),
                        createVNode(unref(_sfc_main$1$1), {
                          id: "produce-qty",
                          modelValue: unref(produceForm).qty,
                          "onUpdate:modelValue": ($event) => unref(produceForm).qty = $event,
                          type: "number",
                          inputmode: "decimal",
                          placeholder: "Masukkan jumlah yang diproduksi",
                          min: "0.001",
                          step: "any",
                          disabled: unref(isProduceLoading)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                        unref(selectedProduceTarget) ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-muted-foreground"
                        }, " Satuan: " + toDisplayString(unref(selectedProduceTarget).unitName), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "grid gap-1.5" }, [
                        createVNode("label", {
                          for: "produce-notes",
                          class: "text-sm font-medium"
                        }, [
                          createTextVNode(" Catatan "),
                          createVNode("span", { class: "text-xs font-normal text-muted-foreground" }, "(opsional)")
                        ]),
                        createVNode(unref(_sfc_main$4), {
                          id: "produce-notes",
                          modelValue: unref(produceForm).notes,
                          "onUpdate:modelValue": ($event) => unref(produceForm).notes = $event,
                          placeholder: "Catatan tambahan untuk produksi ini...",
                          disabled: unref(isProduceLoading),
                          class: "min-h-20 resize-none"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$4$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$7), {
                          type: "button",
                          variant: "outline",
                          disabled: unref(isProduceLoading),
                          onClick: ($event) => isProduceDialogOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(unref(_sfc_main$7), {
                          type: "button",
                          disabled: unref(isProduceLoading) || !unref(produceForm).qty,
                          onClick: handleProduce
                        }, {
                          default: withCtx(() => [
                            unref(isProduceLoading) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                              key: 0,
                              class: "size-4"
                            })) : (openBlock(), createBlock(unref(Factory), {
                              key: 1,
                              class: "size-4",
                              "aria-hidden": "true"
                            })),
                            createTextVNode(" " + toDisplayString(unref(isProduceLoading) ? "Memproses..." : "Catat Produksi"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$6), { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1), { class: "flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Factory), {
                            class: "size-5 text-success",
                            "aria-hidden": "true"
                          }),
                          createTextVNode(" Catat Produksi ")
                        ]),
                        _: 1
                      }),
                      unref(selectedProduceTarget) ? (openBlock(), createBlock(unref(_sfc_main$5), { key: 0 }, {
                        default: withCtx(() => [
                          createTextVNode(" Produksi "),
                          createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(unref(selectedProduceTarget).name), 1),
                          createTextVNode(". Stok bahan baku penyusun akan dipotong otomatis sesuai resep. ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  unref(produceError) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "whitespace-pre-line rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive",
                    role: "alert"
                  }, toDisplayString(unref(produceError)), 1)) : createCommentVNode("", true),
                  unref(selectedProduceTarget) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "rounded-md border bg-muted/30 px-3 py-2 text-sm"
                  }, [
                    createVNode("div", { class: "flex justify-between gap-4" }, [
                      createVNode("span", { class: "text-muted-foreground" }, "Stok saat ini"),
                      createVNode("span", { class: "font-mono font-medium tabular-nums" }, toDisplayString(unref(selectedProduceTarget).stockLabel), 1)
                    ]),
                    createVNode("div", { class: "mt-1 flex justify-between gap-4" }, [
                      createVNode("span", { class: "text-muted-foreground" }, "Bahan penyusun"),
                      createVNode("span", { class: "font-medium" }, toDisplayString(unref(selectedProduceTarget).compositionCount > 0 ? `${unref(selectedProduceTarget).compositionCount} bahan` : "Belum ada resep"), 1)
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "grid gap-4" }, [
                    createVNode("div", { class: "grid gap-1.5" }, [
                      createVNode("label", {
                        for: "produce-qty",
                        class: "text-sm font-medium"
                      }, [
                        createTextVNode(" Jumlah Produksi "),
                        createVNode("span", {
                          class: "text-destructive",
                          "aria-hidden": "true"
                        }, "*")
                      ]),
                      createVNode(unref(_sfc_main$1$1), {
                        id: "produce-qty",
                        modelValue: unref(produceForm).qty,
                        "onUpdate:modelValue": ($event) => unref(produceForm).qty = $event,
                        type: "number",
                        inputmode: "decimal",
                        placeholder: "Masukkan jumlah yang diproduksi",
                        min: "0.001",
                        step: "any",
                        disabled: unref(isProduceLoading)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                      unref(selectedProduceTarget) ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-muted-foreground"
                      }, " Satuan: " + toDisplayString(unref(selectedProduceTarget).unitName), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "grid gap-1.5" }, [
                      createVNode("label", {
                        for: "produce-notes",
                        class: "text-sm font-medium"
                      }, [
                        createTextVNode(" Catatan "),
                        createVNode("span", { class: "text-xs font-normal text-muted-foreground" }, "(opsional)")
                      ]),
                      createVNode(unref(_sfc_main$4), {
                        id: "produce-notes",
                        modelValue: unref(produceForm).notes,
                        "onUpdate:modelValue": ($event) => unref(produceForm).notes = $event,
                        placeholder: "Catatan tambahan untuk produksi ini...",
                        disabled: unref(isProduceLoading),
                        class: "min-h-20 resize-none"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$4$1), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), {
                        type: "button",
                        variant: "outline",
                        disabled: unref(isProduceLoading),
                        onClick: ($event) => isProduceDialogOpen.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"]),
                      createVNode(unref(_sfc_main$7), {
                        type: "button",
                        disabled: unref(isProduceLoading) || !unref(produceForm).qty,
                        onClick: handleProduce
                      }, {
                        default: withCtx(() => [
                          unref(isProduceLoading) ? (openBlock(), createBlock(unref(_sfc_main$8), {
                            key: 0,
                            class: "size-4"
                          })) : (openBlock(), createBlock(unref(Factory), {
                            key: 1,
                            class: "size-4",
                            "aria-hidden": "true"
                          })),
                          createTextVNode(" " + toDisplayString(unref(isProduceLoading) ? "Memproses..." : "Catat Produksi"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/semi-finished-ingredients/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-o02CDCNZ.mjs.map
