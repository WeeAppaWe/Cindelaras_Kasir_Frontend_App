import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, openBlock, createBlock, isRef, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { FolderTree, Tags, ListChecks, Plus } from 'lucide-vue-next';
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

const numberFormatter = new Intl.NumberFormat("id-ID");
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});
function mapAdminCategoryRecordToViewItem(record) {
  const menuCount = Number(record._count?.menus ?? 0);
  const normalizedMenuCount = Number.isFinite(menuCount) ? menuCount : 0;
  return {
    id: record.category_id,
    name: record.name,
    menuCount: normalizedMenuCount,
    menuCountLabel: `${numberFormatter.format(normalizedMenuCount)} menu`,
    createdAt: formatAdminCategoryDateTime(record.created_at),
    updatedAt: formatAdminCategoryDateTime(record.updated_at)
  };
}
function createAdminCategoryMutationPayload(payload) {
  return {
    name: payload.name.trim()
  };
}
function getAdminCategoryNameValidationMessage(name) {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return "Nama kategori wajib diisi.";
  }
  if (trimmedName.length < 2) {
    return "Nama kategori minimal 2 karakter.";
  }
  if (trimmedName.length > 50) {
    return "Nama kategori maksimal 50 karakter.";
  }
  return "";
}
function formatAdminCategoryDateTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateFormatter.format(date);
}
function useAdminCategoryApi() {
  const api = useApiClient();
  async function getCategories(query = {}) {
    const payload = await api.get(apiEndpoints.category.list, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getCategoryDetail(categoryId) {
    const payload = await api.get(apiEndpoints.category.detail(categoryId));
    return extractApiPayload(payload);
  }
  async function createCategory(payload) {
    const result = await api.post(apiEndpoints.category.create, payload);
    return extractApiPayload(result);
  }
  async function updateCategory(categoryId, payload) {
    const result = await api.patch(
      apiEndpoints.category.update(categoryId),
      payload
    );
    return extractApiPayload(result);
  }
  async function deleteCategory(categoryId) {
    const payload = await api.delete(apiEndpoints.category.remove(categoryId));
    return extractApiPayload(payload);
  }
  return {
    getCategories,
    getCategoryDetail,
    createCategory,
    updateCategory,
    deleteCategory
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
  __name: "menu-categories",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Kategori Menu"
    });
    const adminCategoryApi = useAdminCategoryApi();
    const { runAdminAction } = useAdminActionFeedback();
    const search = ref("");
    const isLoading = ref(false);
    const isCrudLoading = ref(false);
    const isCrudDialogOpen = ref(false);
    const crudMode = ref("detail");
    const loadError = ref("");
    const formError = ref("");
    const totalRecordCount = ref(0);
    const categories = ref([]);
    const selectedCategory = ref(null);
    const selectedCategoryDetail = ref(null);
    const crudForm = ref(createCategoryForm());
    let searchTimer = null;
    let categoryRequestId = 0;
    const categoryFields = [
      {
        key: "name",
        label: "Nama Kategori",
        placeholder: "Contoh: Minuman Dingin",
        required: true,
        colSpan: "full"
      }
    ];
    const totalLinkedMenus = computed(() => categories.value.reduce((total, item) => total + item.menuCount, 0));
    const usedCategories = computed(() => categories.value.filter((item) => item.menuCount > 0));
    const hasSearch = computed(() => Boolean(search.value.trim()));
    const metrics = computed(() => [
      {
        id: "total",
        label: "Total Kategori",
        value: String(totalRecordCount.value),
        helper: hasSearch.value ? "Dalam hasil pencarian" : "Kategori aktif",
        tone: "info"
      },
      {
        id: "used",
        label: "Kategori Terpakai",
        value: String(usedCategories.value.length),
        helper: "Memiliki menu aktif",
        tone: "success"
      },
      {
        id: "menus",
        label: "Menu Terhubung",
        value: String(totalLinkedMenus.value),
        helper: "Dari data termuat",
        tone: "default"
      }
    ]);
    const columns = [
      { key: "name", label: "Kategori", class: "min-w-64" },
      { key: "menus", label: "Menu", align: "right", class: "min-w-32" },
      { key: "createdAt", label: "Dibuat", class: "min-w-40" },
      { key: "updatedAt", label: "Diperbarui", class: "min-w-40" }
    ];
    const rows = computed(() => categories.value.map((item) => ({
      id: item.id,
      cells: {
        name: {
          label: item.name,
          description: item.menuCount > 0 ? "Dipakai pada menu aktif" : "Belum dipakai menu"
        },
        menus: {
          label: item.menuCountLabel,
          description: item.menuCount > 0 ? "Terhubung ke menu" : "Belum dipakai"
        },
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }
    })));
    const dialogTitle = computed(() => {
      if (crudMode.value === "create") {
        return "Tambah Kategori";
      }
      if (crudMode.value === "edit") {
        return "Ubah Kategori";
      }
      if (crudMode.value === "delete") {
        return "Hapus Kategori";
      }
      return "Detail Kategori";
    });
    const dialogDescription = computed(() => {
      if (crudMode.value === "delete") {
        if ((selectedCategory.value?.menuCount ?? 0) > 0) {
          return "Kategori masih memiliki menu aktif sehingga backend akan menolak proses hapus.";
        }
        return "Konfirmasi penghapusan kategori dari data sistem.";
      }
      if (crudMode.value === "detail") {
        return isCrudLoading.value ? "Memuat detail kategori..." : "Informasi kategori menu yang tercatat.";
      }
      return "Nama kategori dipakai untuk pengelompokan menu di admin dan kasir.";
    });
    const detailItems = computed(() => {
      const item = selectedCategoryDetail.value ?? selectedCategory.value;
      if (!item) {
        return [];
      }
      return [
        { label: "Nama Kategori", value: item.name },
        { label: "Menu Terhubung", value: item.menuCountLabel },
        { label: "Dibuat", value: item.createdAt },
        { label: "Diperbarui", value: item.updatedAt }
      ];
    });
    watch(search, () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      searchTimer = setTimeout(() => {
        loadCategories();
      }, 300);
    });
    watch(crudForm, () => {
      formError.value = "";
    }, { deep: true });
    async function loadCategories() {
      const requestId = ++categoryRequestId;
      isLoading.value = true;
      loadError.value = "";
      try {
        const result = await adminCategoryApi.getCategories({
          batch: 1,
          size: 100,
          search: search.value.trim() || void 0
        });
        const records = Array.isArray(result.records) ? result.records : [];
        if (requestId !== categoryRequestId) {
          return;
        }
        categories.value = records.map(mapAdminCategoryRecordToViewItem);
        totalRecordCount.value = result.page?.total_record_count ?? records.length;
      } catch (error) {
        if (requestId !== categoryRequestId) {
          return;
        }
        loadError.value = getErrorMessage(error, "Gagal memuat daftar kategori.");
        categories.value = [];
        totalRecordCount.value = 0;
      } finally {
        if (requestId === categoryRequestId) {
          isLoading.value = false;
        }
      }
    }
    function createCategoryForm(item) {
      return {
        name: item?.name ?? ""
      };
    }
    function createCategoryPayload() {
      const name = (crudForm.value.name ?? "").trim();
      const validationMessage = getAdminCategoryNameValidationMessage(name);
      if (validationMessage) {
        formError.value = validationMessage;
        return null;
      }
      return {
        name
      };
    }
    function findCategory(id) {
      return categories.value.find((item) => item.id === id) ?? null;
    }
    function openCreateDialog() {
      selectedCategory.value = null;
      selectedCategoryDetail.value = null;
      formError.value = "";
      crudMode.value = "create";
      crudForm.value = createCategoryForm();
      isCrudDialogOpen.value = true;
    }
    async function openDetailDialog(id) {
      const item = findCategory(id);
      if (!item) {
        return;
      }
      selectedCategory.value = item;
      selectedCategoryDetail.value = item;
      formError.value = "";
      crudMode.value = "detail";
      isCrudDialogOpen.value = true;
      isCrudLoading.value = true;
      try {
        const detail = await adminCategoryApi.getCategoryDetail(id);
        selectedCategoryDetail.value = mapAdminCategoryRecordToViewItem({
          ...detail,
          _count: detail._count ?? {
            menus: item.menuCount
          }
        });
      } catch {
        selectedCategoryDetail.value = item;
      } finally {
        isCrudLoading.value = false;
      }
    }
    function openEditDialog(id) {
      const item = findCategory(id);
      if (!item) {
        return;
      }
      selectedCategory.value = item;
      selectedCategoryDetail.value = item;
      formError.value = "";
      crudMode.value = "edit";
      crudForm.value = createCategoryForm(item);
      isCrudDialogOpen.value = true;
    }
    function openDeleteDialog(id) {
      selectedCategory.value = findCategory(id);
      selectedCategoryDetail.value = selectedCategory.value;
      formError.value = "";
      crudMode.value = "delete";
      isCrudDialogOpen.value = Boolean(selectedCategory.value);
    }
    async function handleCrudSubmit() {
      const payload = createCategoryPayload();
      if (!payload) {
        return;
      }
      const successMessage = crudMode.value === "create" ? "Kategori berhasil ditambahkan." : "Kategori berhasil diperbarui.";
      const succeeded = await runAdminAction(async () => {
        const requestPayload = createAdminCategoryMutationPayload(payload);
        if (crudMode.value === "create") {
          await adminCategoryApi.createCategory(requestPayload);
          await loadCategories();
          return;
        }
        if (crudMode.value === "edit" && selectedCategory.value) {
          await adminCategoryApi.updateCategory(selectedCategory.value.id, requestPayload);
          await loadCategories();
        }
      }, {
        loading: isCrudLoading,
        successMessage,
        errorMessage: "Gagal menyimpan kategori."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
      }
    }
    async function handleDelete() {
      if (!selectedCategory.value) {
        return;
      }
      if (selectedCategory.value.menuCount > 0) {
        formError.value = "Kategori masih memiliki menu aktif dan tidak dapat dihapus.";
        return;
      }
      const succeeded = await runAdminAction(async () => {
        await adminCategoryApi.deleteCategory(selectedCategory.value.id);
        await loadCategories();
      }, {
        loading: isCrudLoading,
        successMessage: "Kategori berhasil dihapus.",
        errorMessage: "Gagal menghapus kategori."
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
        title: "Kategori Menu",
        description: "Kelola kategori menu aktif, jumlah menu terhubung, dan perubahan nama kategori."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan kategori menu"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.id === "total") {
                _push2(ssrRenderComponent(unref(FolderTree), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else if (item.id === "used") {
                _push2(ssrRenderComponent(unref(Tags), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(ListChecks), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              }
            } else {
              return [
                item.id === "total" ? (openBlock(), createBlock(unref(FolderTree), {
                  key: 0,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : item.id === "used" ? (openBlock(), createBlock(unref(Tags), {
                  key: 1,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : (openBlock(), createBlock(unref(ListChecks), {
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
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="category-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="category-table-title" class="text-base font-semibold tracking-normal"> Daftar Kategori </h2><p class="mt-1 text-sm text-muted-foreground"> Data diambil dari kategori aktif dan menampilkan jumlah menu yang terhubung. </p></div></div>`);
      if (unref(loadError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "category-search",
        "search-label": "Cari kategori",
        "search-placeholder": "Cari nama kategori",
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
                  _push3(` Tambah Kategori `);
                } else {
                  return [
                    createVNode(unref(Plus), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Tambah Kategori ")
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
                  createTextVNode(" Tambah Kategori ")
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
        label: "kategori",
        "empty-title": "Kategori tidak ditemukan",
        "empty-description": "Ubah kata kunci pencarian kategori.",
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
        fields: categoryFields,
        "detail-items": unref(detailItems),
        "target-name": unref(selectedCategory)?.name,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/menu-categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=menu-categories-DklmBMsH.mjs.map
