import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, openBlock, createBlock, isRef, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Truck, Phone, History, Plus } from 'lucide-vue-next';
import { _ as _sfc_main$1 } from './index-BZG70idc.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminCrudDialog } from './AdminCrudDialog-GXCLLFMD.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminSupplierApi } from './useAdminSupplierApi-D0Yf0mZM.mjs';
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
import './api-endpoints-Bk94Aoou.mjs';
import 'vue-sonner';

const numberFormatter = new Intl.NumberFormat("id-ID");
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});
function mapAdminSupplierRecordToViewItem(record) {
  const stockMovementCount = Number(record._count?.stock_movements ?? 0);
  const normalizedStockMovementCount = Number.isFinite(stockMovementCount) ? stockMovementCount : 0;
  const phone = record.phone?.trim() ?? "";
  const address = record.address?.trim() ?? "";
  return {
    id: record.supplier_id,
    name: record.name,
    phone,
    phoneLabel: phone || "-",
    address,
    addressLabel: address || "-",
    stockMovementCount: normalizedStockMovementCount,
    stockMovementCountLabel: `${numberFormatter.format(normalizedStockMovementCount)} riwayat`,
    createdAt: formatAdminSupplierDateTime(record.created_at),
    updatedAt: formatAdminSupplierDateTime(record.updated_at),
    hasBeenUpdated: Boolean(record.updated_at)
  };
}
function createAdminSupplierMutationPayload(payload) {
  return {
    name: payload.name.trim(),
    phone: payload.phone.trim() || null,
    address: payload.address.trim() || null
  };
}
function getAdminSupplierValidationMessage(payload) {
  const name = payload.name.trim();
  const phone = payload.phone.trim();
  const address = payload.address.trim();
  if (!name) {
    return "Nama pemasok wajib diisi.";
  }
  if (name.length < 2) {
    return "Nama pemasok minimal 2 karakter.";
  }
  if (name.length > 100) {
    return "Nama pemasok maksimal 100 karakter.";
  }
  if (phone.length > 20) {
    return "Nomor telepon maksimal 20 karakter.";
  }
  if (address.length > 500) {
    return "Alamat maksimal 500 karakter.";
  }
  return "";
}
function formatAdminSupplierDateTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateFormatter.format(date);
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "suppliers",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Pemasok"
    });
    const adminSupplierApi = useAdminSupplierApi();
    const { runAdminAction } = useAdminActionFeedback();
    const search = ref("");
    const isLoading = ref(false);
    const isCrudLoading = ref(false);
    const isCrudDialogOpen = ref(false);
    const crudMode = ref("detail");
    const loadError = ref("");
    const formError = ref("");
    const totalRecordCount = ref(0);
    const suppliers = ref([]);
    const selectedSupplier = ref(null);
    const selectedSupplierDetail = ref(null);
    const crudForm = ref(createSupplierForm());
    let searchTimer = null;
    let supplierRequestId = 0;
    const supplierFields = [
      {
        key: "name",
        label: "Nama Pemasok",
        placeholder: "Contoh: PT Sumber Pangan Abadi",
        required: true,
        colSpan: "full"
      },
      {
        key: "phone",
        label: "Nomor Telepon",
        inputmode: "tel",
        placeholder: "08xx",
        colSpan: "full"
      },
      {
        key: "address",
        label: "Alamat",
        type: "textarea",
        placeholder: "Alamat pemasok",
        colSpan: "full"
      }
    ];
    const suppliersWithPhone = computed(() => suppliers.value.filter((item) => item.phone));
    const suppliersWithHistory = computed(() => suppliers.value.filter((item) => item.stockMovementCount > 0));
    const totalStockMovementCount = computed(() => suppliers.value.reduce((total, item) => total + item.stockMovementCount, 0));
    const hasSearch = computed(() => Boolean(search.value.trim()));
    const metrics = computed(() => [
      {
        id: "total",
        label: "Total Pemasok",
        value: String(totalRecordCount.value),
        helper: hasSearch.value ? "Dalam hasil pencarian" : "Pemasok aktif",
        tone: "info"
      },
      {
        id: "contact",
        label: "Kontak Tersedia",
        value: String(suppliersWithPhone.value.length),
        helper: "Memiliki nomor telepon",
        tone: "success"
      },
      {
        id: "history",
        label: "Riwayat Stok",
        value: String(totalStockMovementCount.value),
        helper: `${suppliersWithHistory.value.length} pemasok terkait`,
        tone: "default"
      }
    ]);
    const columns = [
      { key: "name", label: "Pemasok", class: "min-w-64" },
      { key: "phone", label: "Telepon", class: "min-w-36" },
      { key: "address", label: "Alamat", class: "min-w-64" },
      { key: "stockMovements", label: "Riwayat Stok", align: "right", class: "min-w-36" },
      { key: "updatedAt", label: "Diperbarui", class: "min-w-40" }
    ];
    const rows = computed(() => suppliers.value.map((item) => ({
      id: item.id,
      cells: {
        name: {
          label: item.name,
          description: item.phoneLabel !== "-" ? item.phoneLabel : item.addressLabel
        },
        phone: item.phoneLabel,
        address: item.addressLabel,
        stockMovements: {
          label: item.stockMovementCountLabel,
          description: item.stockMovementCount > 0 ? "Referensi stok tersimpan" : "Belum ada riwayat"
        },
        updatedAt: {
          label: item.updatedAt,
          description: item.hasBeenUpdated ? "Perubahan tersimpan" : "Belum pernah diubah"
        }
      }
    })));
    const dialogTitle = computed(() => {
      if (crudMode.value === "create") {
        return "Tambah Pemasok";
      }
      if (crudMode.value === "edit") {
        return "Ubah Pemasok";
      }
      if (crudMode.value === "delete") {
        return "Hapus Pemasok";
      }
      return "Detail Pemasok";
    });
    const dialogDescription = computed(() => {
      if (crudMode.value === "delete") {
        return "Pemasok akan dihapus secara soft delete. Riwayat stok lama tetap menyimpan referensi pemasok.";
      }
      if (crudMode.value === "detail") {
        return isCrudLoading.value ? "Memuat detail pemasok..." : "Informasi pemasok dan relasi riwayat stok.";
      }
      return "Nama pemasok wajib diisi. Nomor telepon dan alamat boleh dikosongkan.";
    });
    const detailItems = computed(() => {
      const item = selectedSupplierDetail.value ?? selectedSupplier.value;
      if (!item) {
        return [];
      }
      return [
        { label: "Nama Pemasok", value: item.name },
        { label: "Nomor Telepon", value: item.phoneLabel },
        { label: "Riwayat Stok", value: item.stockMovementCountLabel, description: "Jumlah pergerakan stok yang terkait pemasok." },
        { label: "Dibuat", value: item.createdAt },
        { label: "Diperbarui", value: item.updatedAt, description: item.hasBeenUpdated ? "Data pernah diperbarui." : "Belum ada perubahan setelah dibuat." },
        { label: "Alamat", value: item.addressLabel, description: "Alamat pemasok untuk kebutuhan pembelian." }
      ];
    });
    watch(search, () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      searchTimer = setTimeout(() => {
        loadSuppliers();
      }, 300);
    });
    watch(crudForm, () => {
      formError.value = "";
    }, { deep: true });
    async function loadSuppliers() {
      const requestId = ++supplierRequestId;
      isLoading.value = true;
      loadError.value = "";
      try {
        const result = await adminSupplierApi.getSuppliers({
          batch: 1,
          size: 100,
          search: search.value.trim() || void 0
        });
        const records = Array.isArray(result.records) ? result.records : [];
        if (requestId !== supplierRequestId) {
          return;
        }
        suppliers.value = records.map(mapAdminSupplierRecordToViewItem);
        totalRecordCount.value = result.page?.total_record_count ?? records.length;
      } catch (error) {
        if (requestId !== supplierRequestId) {
          return;
        }
        loadError.value = getErrorMessage(error, "Gagal memuat daftar pemasok.");
        suppliers.value = [];
        totalRecordCount.value = 0;
      } finally {
        if (requestId === supplierRequestId) {
          isLoading.value = false;
        }
      }
    }
    function createSupplierForm(item) {
      return {
        name: item?.name ?? "",
        phone: item?.phone ?? "",
        address: item?.address ?? ""
      };
    }
    function createSupplierPayload() {
      const payload = {
        name: crudForm.value.name ?? "",
        phone: crudForm.value.phone ?? "",
        address: crudForm.value.address ?? ""
      };
      const validationMessage = getAdminSupplierValidationMessage(payload);
      if (validationMessage) {
        formError.value = validationMessage;
        return null;
      }
      return payload;
    }
    function findSupplier(id) {
      return suppliers.value.find((item) => item.id === id) ?? null;
    }
    function openCreateDialog() {
      selectedSupplier.value = null;
      selectedSupplierDetail.value = null;
      formError.value = "";
      crudMode.value = "create";
      crudForm.value = createSupplierForm();
      isCrudDialogOpen.value = true;
    }
    async function openDetailDialog(id) {
      const item = findSupplier(id);
      if (!item) {
        return;
      }
      selectedSupplier.value = item;
      selectedSupplierDetail.value = item;
      formError.value = "";
      crudMode.value = "detail";
      isCrudDialogOpen.value = true;
      isCrudLoading.value = true;
      try {
        const detail = await adminSupplierApi.getSupplierDetail(id);
        selectedSupplierDetail.value = mapAdminSupplierRecordToViewItem({
          ...detail,
          _count: detail._count ?? {
            stock_movements: item.stockMovementCount
          }
        });
      } catch {
        selectedSupplierDetail.value = item;
      } finally {
        isCrudLoading.value = false;
      }
    }
    function openEditDialog(id) {
      const item = findSupplier(id);
      if (!item) {
        return;
      }
      selectedSupplier.value = item;
      selectedSupplierDetail.value = item;
      formError.value = "";
      crudMode.value = "edit";
      crudForm.value = createSupplierForm(item);
      isCrudDialogOpen.value = true;
    }
    function openDeleteDialog(id) {
      selectedSupplier.value = findSupplier(id);
      selectedSupplierDetail.value = selectedSupplier.value;
      formError.value = "";
      crudMode.value = "delete";
      isCrudDialogOpen.value = Boolean(selectedSupplier.value);
    }
    async function handleCrudSubmit() {
      const payload = createSupplierPayload();
      if (!payload) {
        return;
      }
      const successMessage = crudMode.value === "create" ? "Pemasok berhasil ditambahkan." : "Pemasok berhasil diperbarui.";
      const succeeded = await runAdminAction(async () => {
        const requestPayload = createAdminSupplierMutationPayload(payload);
        if (crudMode.value === "create") {
          await adminSupplierApi.createSupplier(requestPayload);
          await loadSuppliers();
          return;
        }
        if (crudMode.value === "edit" && selectedSupplier.value) {
          await adminSupplierApi.updateSupplier(selectedSupplier.value.id, requestPayload);
          await loadSuppliers();
        }
      }, {
        loading: isCrudLoading,
        successMessage,
        errorMessage: "Gagal menyimpan pemasok."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
      }
    }
    async function handleDelete() {
      if (!selectedSupplier.value) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        await adminSupplierApi.deleteSupplier(selectedSupplier.value.id);
        await loadSuppliers();
      }, {
        loading: isCrudLoading,
        successMessage: "Pemasok berhasil dihapus.",
        errorMessage: "Gagal menghapus pemasok."
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
        title: "Pemasok",
        description: "Kelola data pemasok untuk pembelian bahan dan riwayat pergerakan stok."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan pemasok"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.id === "total") {
                _push2(ssrRenderComponent(unref(Truck), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else if (item.id === "contact") {
                _push2(ssrRenderComponent(unref(Phone), {
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
                item.id === "total" ? (openBlock(), createBlock(unref(Truck), {
                  key: 0,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : item.id === "contact" ? (openBlock(), createBlock(unref(Phone), {
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
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="supplier-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="supplier-table-title" class="text-base font-semibold tracking-normal"> Daftar Pemasok </h2><p class="mt-1 text-sm text-muted-foreground"> Pencarian mencakup nama, nomor telepon, dan alamat pemasok. </p></div></div>`);
      if (unref(loadError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "supplier-search",
        "search-label": "Cari pemasok",
        "search-placeholder": "Cari nama, telepon, atau alamat",
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
                  _push3(` Tambah Pemasok `);
                } else {
                  return [
                    createVNode(unref(Plus), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Tambah Pemasok ")
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
                  createTextVNode(" Tambah Pemasok ")
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
        label: "pemasok",
        "empty-title": "Pemasok tidak ditemukan",
        "empty-description": "Ubah kata kunci pencarian pemasok.",
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
        fields: supplierFields,
        "detail-items": unref(detailItems),
        "target-name": unref(selectedSupplier)?.name,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/suppliers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=suppliers-CZ3xpUvV.mjs.map
