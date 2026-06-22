import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, openBlock, createBlock, isRef, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Scale, Ruler, History, Plus } from 'lucide-vue-next';
import { _ as _sfc_main$1 } from './index-BZG70idc.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminCrudDialog } from './AdminCrudDialog-GXCLLFMD.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useApiClient, a as apiEndpoints } from './api-endpoints-Bk94Aoou.mjs';
import { u as useAdminActionFeedback } from './useAdminActionFeedback-BRkOE1ij.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './Spinner-nalFRPxS.mjs';
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
import './NativeSelectOption-BTdv0zYA.mjs';
import './Textarea-DYkcGDV8.mjs';
import './image-upload-BN8fXv4v.mjs';
import './PaginationPrevious-DSL0-rZ8.mjs';
import './Skeleton-CQWwuiK0.mjs';
import 'vue-sonner';

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});
function mapAdminUnitMeasureRecordToViewItem(record) {
  return {
    id: record.unit_measure_id,
    name: record.name,
    createdAt: formatAdminUnitMeasureDateTime(record.created_at),
    updatedAt: formatAdminUnitMeasureDateTime(record.updated_at),
    hasBeenUpdated: Boolean(record.updated_at)
  };
}
function createAdminUnitMeasureMutationPayload(payload) {
  return {
    name: payload.name.trim()
  };
}
function getAdminUnitMeasureNameValidationMessage(name) {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return "Nama satuan wajib diisi.";
  }
  if (trimmedName.length > 50) {
    return "Nama satuan maksimal 50 karakter.";
  }
  return "";
}
function formatAdminUnitMeasureDateTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateFormatter.format(date);
}
function useAdminUnitMeasureApi() {
  const api = useApiClient();
  async function getUnitMeasures(query = {}) {
    const payload = await api.get(apiEndpoints.unitMeasure.list, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getUnitMeasureDetail(unitMeasureId) {
    const payload = await api.get(apiEndpoints.unitMeasure.detail(unitMeasureId));
    return extractApiPayload(payload);
  }
  async function createUnitMeasure(payload) {
    const result = await api.post(apiEndpoints.unitMeasure.create, payload);
    return extractApiPayload(result);
  }
  async function updateUnitMeasure(unitMeasureId, payload) {
    const result = await api.patch(
      apiEndpoints.unitMeasure.update(unitMeasureId),
      payload
    );
    return extractApiPayload(result);
  }
  async function deleteUnitMeasure(unitMeasureId) {
    const payload = await api.delete(apiEndpoints.unitMeasure.remove(unitMeasureId));
    return extractApiPayload(payload);
  }
  return {
    getUnitMeasures,
    getUnitMeasureDetail,
    createUnitMeasure,
    updateUnitMeasure,
    deleteUnitMeasure
  };
}
function normalizeQuery(query) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== void 0 && value !== null && value !== "")
  );
}
function extractApiPayload(payload) {
  if (isRecord(payload)) {
    if ("data" in payload && isDirectResponseShape(payload)) {
      return payload.data;
    }
    if ("response" in payload && isDirectResponseShape(payload)) {
      return payload.response;
    }
  }
  return payload;
}
function isDirectResponseShape(value) {
  return typeof value.code === "number" && typeof value.message === "string";
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "units",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Satuan Ukur"
    });
    const adminUnitMeasureApi = useAdminUnitMeasureApi();
    const { runAdminAction } = useAdminActionFeedback();
    const search = ref("");
    const isLoading = ref(false);
    const isCrudLoading = ref(false);
    const isCrudDialogOpen = ref(false);
    const crudMode = ref("detail");
    const loadError = ref("");
    const formError = ref("");
    const totalRecordCount = ref(0);
    const unitMeasures = ref([]);
    const selectedUnit = ref(null);
    const selectedUnitDetail = ref(null);
    const crudForm = ref(createUnitForm());
    let searchTimer = null;
    let unitRequestId = 0;
    const unitFields = [
      {
        key: "name",
        label: "Nama Satuan",
        placeholder: "Contoh: Kilogram",
        required: true,
        colSpan: "full"
      }
    ];
    const updatedUnits = computed(() => unitMeasures.value.filter((item) => item.hasBeenUpdated));
    const neverUpdatedUnits = computed(() => unitMeasures.value.filter((item) => !item.hasBeenUpdated));
    const hasSearch = computed(() => Boolean(search.value.trim()));
    const metrics = computed(() => [
      {
        id: "total",
        label: "Total Satuan",
        value: String(totalRecordCount.value),
        helper: hasSearch.value ? "Dalam hasil pencarian" : "Satuan aktif",
        tone: "info"
      },
      {
        id: "loaded",
        label: "Data Termuat",
        value: String(unitMeasures.value.length),
        helper: "Maksimal 100 record",
        tone: "success"
      },
      {
        id: "updated",
        label: "Pernah Diperbarui",
        value: String(updatedUnits.value.length),
        helper: `${neverUpdatedUnits.value.length} belum diubah`,
        tone: "default"
      }
    ]);
    const columns = [
      { key: "name", label: "Satuan", class: "min-w-64" },
      { key: "createdAt", label: "Dibuat", class: "min-w-40" },
      { key: "updatedAt", label: "Diperbarui", class: "min-w-40" }
    ];
    const rows = computed(() => unitMeasures.value.map((item) => ({
      id: item.id,
      cells: {
        name: {
          label: item.name,
          description: item.hasBeenUpdated ? "Perubahan tersimpan" : "Belum pernah diubah"
        },
        createdAt: item.createdAt,
        updatedAt: {
          label: item.updatedAt,
          description: item.hasBeenUpdated ? "Perubahan tersimpan" : "Belum pernah diubah"
        }
      }
    })));
    const dialogTitle = computed(() => {
      if (crudMode.value === "create") {
        return "Tambah Satuan";
      }
      if (crudMode.value === "edit") {
        return "Ubah Satuan";
      }
      if (crudMode.value === "delete") {
        return "Hapus Satuan";
      }
      return "Detail Satuan";
    });
    const dialogDescription = computed(() => {
      if (crudMode.value === "delete") {
        return "Satuan tidak dapat dihapus jika masih digunakan oleh bahan aktif.";
      }
      if (crudMode.value === "detail") {
        return isCrudLoading.value ? "Memuat detail satuan..." : "Informasi satuan ukur yang tercatat.";
      }
      return "Nama satuan dipakai pada bahan baku, bahan setengah jadi, stok, dan resep.";
    });
    const detailItems = computed(() => {
      const item = selectedUnitDetail.value ?? selectedUnit.value;
      if (!item) {
        return [];
      }
      return [
        { label: "Nama Satuan", value: item.name },
        { label: "Dibuat", value: item.createdAt },
        { label: "Diperbarui", value: item.updatedAt, description: item.hasBeenUpdated ? "Data pernah diperbarui." : "Belum ada perubahan setelah dibuat." }
      ];
    });
    watch(search, () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      searchTimer = setTimeout(() => {
        loadUnitMeasures();
      }, 300);
    });
    watch(crudForm, () => {
      formError.value = "";
    }, { deep: true });
    async function loadUnitMeasures() {
      const requestId = ++unitRequestId;
      isLoading.value = true;
      loadError.value = "";
      try {
        const result = await adminUnitMeasureApi.getUnitMeasures({
          batch: 1,
          size: 100,
          search: search.value.trim() || void 0
        });
        const records = Array.isArray(result.records) ? result.records : [];
        if (requestId !== unitRequestId) {
          return;
        }
        unitMeasures.value = records.map(mapAdminUnitMeasureRecordToViewItem);
        totalRecordCount.value = result.page?.total_record_count ?? records.length;
      } catch (error) {
        if (requestId !== unitRequestId) {
          return;
        }
        loadError.value = getErrorMessage(error, "Gagal memuat daftar satuan ukur.");
        unitMeasures.value = [];
        totalRecordCount.value = 0;
      } finally {
        if (requestId === unitRequestId) {
          isLoading.value = false;
        }
      }
    }
    function createUnitForm(item) {
      return {
        name: item?.name ?? ""
      };
    }
    function createUnitPayload() {
      const name = (crudForm.value.name ?? "").trim();
      const validationMessage = getAdminUnitMeasureNameValidationMessage(name);
      if (validationMessage) {
        formError.value = validationMessage;
        return null;
      }
      return {
        name
      };
    }
    function findUnit(id) {
      return unitMeasures.value.find((item) => item.id === id) ?? null;
    }
    function openCreateDialog() {
      selectedUnit.value = null;
      selectedUnitDetail.value = null;
      formError.value = "";
      crudMode.value = "create";
      crudForm.value = createUnitForm();
      isCrudDialogOpen.value = true;
    }
    async function openDetailDialog(id) {
      const item = findUnit(id);
      if (!item) {
        return;
      }
      selectedUnit.value = item;
      selectedUnitDetail.value = item;
      formError.value = "";
      crudMode.value = "detail";
      isCrudDialogOpen.value = true;
      isCrudLoading.value = true;
      try {
        const detail = await adminUnitMeasureApi.getUnitMeasureDetail(id);
        selectedUnitDetail.value = mapAdminUnitMeasureRecordToViewItem(detail);
      } catch {
        selectedUnitDetail.value = item;
      } finally {
        isCrudLoading.value = false;
      }
    }
    function openEditDialog(id) {
      const item = findUnit(id);
      if (!item) {
        return;
      }
      selectedUnit.value = item;
      selectedUnitDetail.value = item;
      formError.value = "";
      crudMode.value = "edit";
      crudForm.value = createUnitForm(item);
      isCrudDialogOpen.value = true;
    }
    function openDeleteDialog(id) {
      selectedUnit.value = findUnit(id);
      selectedUnitDetail.value = selectedUnit.value;
      formError.value = "";
      crudMode.value = "delete";
      isCrudDialogOpen.value = Boolean(selectedUnit.value);
    }
    async function handleCrudSubmit() {
      const payload = createUnitPayload();
      if (!payload) {
        return;
      }
      const successMessage = crudMode.value === "create" ? "Satuan berhasil ditambahkan." : "Satuan berhasil diperbarui.";
      const succeeded = await runAdminAction(async () => {
        const requestPayload = createAdminUnitMeasureMutationPayload(payload);
        if (crudMode.value === "create") {
          await adminUnitMeasureApi.createUnitMeasure(requestPayload);
          await loadUnitMeasures();
          return;
        }
        if (crudMode.value === "edit" && selectedUnit.value) {
          await adminUnitMeasureApi.updateUnitMeasure(selectedUnit.value.id, requestPayload);
          await loadUnitMeasures();
        }
      }, {
        loading: isCrudLoading,
        successMessage,
        errorMessage: "Gagal menyimpan satuan."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
      }
    }
    async function handleDelete() {
      if (!selectedUnit.value) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        await adminUnitMeasureApi.deleteUnitMeasure(selectedUnit.value.id);
        await loadUnitMeasures();
      }, {
        loading: isCrudLoading,
        successMessage: "Satuan berhasil dihapus.",
        errorMessage: "Gagal menghapus satuan."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
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
        title: "Satuan Ukur",
        description: "Kelola master satuan aktif untuk bahan, resep, stok masuk, stok keluar, dan stok opname."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan satuan ukur"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.id === "total") {
                _push2(ssrRenderComponent(unref(Scale), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else if (item.id === "loaded") {
                _push2(ssrRenderComponent(unref(Ruler), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(History), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              }
            } else {
              return [
                item.id === "total" ? (openBlock(), createBlock(unref(Scale), {
                  key: 0,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : item.id === "loaded" ? (openBlock(), createBlock(unref(Ruler), {
                  key: 1,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : (openBlock(), createBlock(unref(History), {
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
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="unit-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="unit-table-title" class="text-base font-semibold tracking-normal"> Daftar Satuan </h2><p class="mt-1 text-sm text-muted-foreground"> Data diambil dari satuan aktif dan bisa dicari berdasarkan nama satuan. </p></div></div>`);
      if (unref(loadError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "unit-search",
        "search-label": "Cari satuan ukur",
        "search-placeholder": "Cari nama satuan",
        disabled: unref(isLoading)
      }, {
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              type: "button",
              size: "sm",
              disabled: unref(isLoading),
              onClick: openCreateDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tambah Satuan `);
                } else {
                  return [
                    createVNode(unref(Plus), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Tambah Satuan ")
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
                disabled: unref(isLoading),
                onClick: openCreateDialog
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Tambah Satuan ")
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
        label: "satuan",
        "empty-title": "Satuan tidak ditemukan",
        "empty-description": "Ubah kata kunci pencarian satuan.",
        onView: openDetailDialog,
        onEdit: openEditDialog,
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
        fields: unitFields,
        "detail-items": unref(detailItems),
        "target-name": unref(selectedUnit)?.name,
        loading: unref(isCrudLoading),
        "form-error": unref(formError),
        onSubmit: handleCrudSubmit,
        onDelete: handleDelete
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/units.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=units-CXbdjbu-.mjs.map
