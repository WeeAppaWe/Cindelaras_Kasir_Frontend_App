import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, openBlock, createBlock, createTextVNode, toDisplayString, createVNode, isRef, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { ClipboardCheck, PackageSearch, AlertTriangle, AlertCircle, Plus, Eye, Pencil, CheckCircle2, Send, XCircle, Trash2, Save, CalendarDays } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { _ as _sfc_main$2, a as _sfc_main$1 } from './index-rcdgmEu2.mjs';
import { _ as _sfc_main$3 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$3, d as _sfc_main$5$1, e as _sfc_main$4$2 } from './DialogTrigger-B5C6UhMx.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$a } from './Spinner-nalFRPxS.mjs';
import { _ as _sfc_main$2$1 } from './NativeSelectOption-BTdv0zYA.mjs';
import { _ as _sfc_main$4 } from './Skeleton-CQWwuiK0.mjs';
import { a as _sfc_main$9, b as _sfc_main$1$2, c as _sfc_main$5, d as _sfc_main$2$2, e as _sfc_main$8, f as _sfc_main$6, g as _sfc_main$4$1 } from './index-DSBdqIS4.mjs';
import { _ as _sfc_main$7 } from './Textarea-DYkcGDV8.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar, b as AdminStatusBadge } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { u as useApiClient, a as apiEndpoints } from './api-endpoints-aT5YyZ8V.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminActionFeedback } from './useAdminActionFeedback-BRkOE1ij.mjs';
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

function useAdminOpnameApi() {
  const api = useApiClient();
  async function getOpnameIngredients() {
    const payload = await api.get(apiEndpoints.opname.ingredients);
    return extractApiPayload(payload);
  }
  async function getOpnames(query = {}) {
    const payload = await api.get(apiEndpoints.opname.list, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getOpnameDetail(stockOpnameId) {
    const payload = await api.get(apiEndpoints.opname.detail(stockOpnameId));
    return extractApiPayload(payload);
  }
  async function createOpname(payload) {
    const result = await api.post(
      apiEndpoints.opname.create,
      payload
    );
    return extractApiPayload(result);
  }
  async function updateOpname(stockOpnameId, payload) {
    const result = await api.patch(
      apiEndpoints.opname.update(stockOpnameId),
      payload
    );
    return extractApiPayload(result);
  }
  async function updateOpnameStatus(stockOpnameId, payload) {
    const result = await api.patch(
      apiEndpoints.opname.updateStatus(stockOpnameId),
      payload
    );
    return extractApiPayload(result);
  }
  async function applyOpname(stockOpnameId) {
    const result = await api.post(apiEndpoints.opname.apply(stockOpnameId));
    return extractApiPayload(result);
  }
  async function deleteOpname(stockOpnameId) {
    const payload = await api.delete(apiEndpoints.opname.remove(stockOpnameId));
    return extractApiPayload(payload);
  }
  return {
    getOpnameIngredients,
    getOpnames,
    getOpnameDetail,
    createOpname,
    updateOpname,
    updateOpnameStatus,
    applyOpname,
    deleteOpname
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
    if ("response" in payload && isStandardEnvelopeShape(payload)) {
      return payload.response;
    }
  }
  return payload;
}
function isDirectResponseShape(value) {
  return typeof value.code === "number" && typeof value.message === "string";
}
function isStandardEnvelopeShape(value) {
  return isRecord(value.metaData);
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
const numberFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 2
});
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});
const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});
function mapAdminOpnameIngredientRecordToOption(record) {
  const stockQty = toNumber(record.stock_qty);
  const unitName = record.unit?.name?.trim() || "-";
  return {
    id: record.ingredient_id,
    name: record.name,
    stockQty,
    unitName,
    stockLabel: formatAdminOpnameQuantity(stockQty, unitName)
  };
}
function mapAdminOpnameRecordToViewItem(record) {
  const items = (Array.isArray(record.items) ? record.items : []).map(mapAdminOpnameItemRecordToViewItem);
  const totalDifference = roundQty(items.reduce((total, item) => total + item.difference, 0));
  const status = normalizeAdminOpnameStatus(record.status);
  const itemCount = record._count?.items ?? items.length;
  return {
    id: record.stock_opname_id,
    opnameDate: formatAdminOpnameDate(record.opname_date),
    opnameDateInput: formatAdminOpnameDateInput(record.opname_date),
    status,
    statusLabel: getAdminOpnameStatusLabel(status),
    statusTone: getAdminOpnameStatusTone(status),
    notes: record.notes?.trim() || "-",
    userName: record.user?.name || "-",
    itemCount,
    itemCountLabel: `${itemCount} bahan`,
    createdAt: formatAdminOpnameDateTime(record.created_at),
    updatedAt: record.updated_at ? formatAdminOpnameDateTime(record.updated_at) : "-",
    totalDifference,
    totalDifferenceLabel: items.length ? formatAdminOpnameSignedQuantity(totalDifference, "") : "-",
    totalDifferenceTone: getAdminOpnameDifferenceTone(totalDifference),
    items
  };
}
function createAdminOpnameCreatePayload(payload) {
  return {
    opname_date: payload.opnameDate,
    notes: payload.notes.trim() || void 0,
    items: payload.items.map((item) => ({
      ingredient_id: item.ingredientId,
      physical_qty: item.physicalQty
    }))
  };
}
function createAdminOpnameUpdatePayload(payload) {
  return {
    opname_date: payload.opnameDate,
    notes: payload.notes.trim(),
    items: payload.items.map((item) => ({
      ingredient_id: item.ingredientId,
      physical_qty: item.physicalQty
    }))
  };
}
function getAdminOpnameValidationMessage(payload) {
  if (!payload.opnameDate) {
    return "Tanggal opname wajib diisi.";
  }
  if (payload.notes.length > 500) {
    return "Catatan maksimal 500 karakter.";
  }
  if (!payload.items.length) {
    return "Tambahkan minimal 1 bahan ke sesi stok opname.";
  }
  const selectedIds = /* @__PURE__ */ new Set();
  for (const item of payload.items) {
    if (!item.ingredientId) {
      return "Setiap baris opname wajib memilih bahan.";
    }
    if (selectedIds.has(item.ingredientId)) {
      return "Bahan yang sama tidak boleh dipilih lebih dari satu kali.";
    }
    selectedIds.add(item.ingredientId);
    if (!Number.isFinite(item.physicalQty) || item.physicalQty < 0) {
      return "Stok fisik setiap bahan harus berupa angka 0 atau lebih.";
    }
  }
  return "";
}
function isAdminOpnameEditable(status) {
  return status === "DRAFT";
}
function canCompleteAdminOpname(status) {
  return status === "DRAFT";
}
function canCancelAdminOpname(status) {
  return status === "DRAFT";
}
function canApplyAdminOpname(status) {
  return status === "COMPLETED";
}
function canDeleteAdminOpname(status) {
  return status === "DRAFT" || status === "CANCELLED";
}
function getAdminOpnameStatusLabel(status) {
  if (status === "DRAFT") {
    return "Draft";
  }
  if (status === "COMPLETED") {
    return "Selesai";
  }
  if (status === "APPLIED") {
    return "Diterapkan";
  }
  return "Dibatalkan";
}
function getAdminOpnameStatusTone(status) {
  if (status === "COMPLETED") {
    return "info";
  }
  if (status === "APPLIED") {
    return "success";
  }
  if (status === "CANCELLED") {
    return "destructive";
  }
  return "warning";
}
function getAdminOpnameDifferenceTone(value) {
  if (value === 0) {
    return "success";
  }
  if (value < 0) {
    return "destructive";
  }
  return "warning";
}
function formatAdminOpnameQuantity(value, unit) {
  const suffix = unit.trim();
  return suffix ? `${formatNumber(value)} ${suffix}` : formatNumber(value);
}
function formatAdminOpnameSignedQuantity(value, unit) {
  if (value > 0) {
    return `+${formatAdminOpnameQuantity(value, unit)}`;
  }
  return formatAdminOpnameQuantity(value, unit);
}
function normalizeAdminOpnameStatus(value) {
  const normalized = value.trim().toUpperCase();
  if (normalized === "COMPLETED" || normalized === "APPLIED" || normalized === "CANCELLED") {
    return normalized;
  }
  return "DRAFT";
}
function parseAdminOpnameQtyInput(value) {
  const normalizedValue = value.trim().replace(",", ".");
  if (!normalizedValue) {
    return null;
  }
  const parsedValue = Number(normalizedValue);
  if (!Number.isFinite(parsedValue)) {
    return null;
  }
  return roundQty(parsedValue);
}
function roundAdminOpnameQty(value) {
  return roundQty(value);
}
function mapAdminOpnameItemRecordToViewItem(record) {
  const systemQty = toNumber(record.system_qty);
  const physicalQty = toNumber(record.physical_qty);
  const difference = toNumber(record.difference);
  const unitName = record.ingredient?.unit?.name?.trim() || "-";
  return {
    id: record.stock_opname_item_id,
    ingredientId: record.ingredient_id,
    ingredientName: record.ingredient?.name || record.ingredient_id,
    unitName,
    systemQty,
    physicalQty,
    difference,
    systemQtyLabel: formatAdminOpnameQuantity(systemQty, unitName),
    physicalQtyLabel: formatAdminOpnameQuantity(physicalQty, unitName),
    differenceLabel: formatAdminOpnameSignedQuantity(difference, unitName),
    differenceTone: getAdminOpnameDifferenceTone(difference)
  };
}
function formatAdminOpnameDate(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateFormatter.format(date);
}
function formatAdminOpnameDateTime(value) {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateTimeFormatter.format(date);
}
function formatAdminOpnameDateInput(value) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}
function toNumber(value) {
  const parsedValue = Number(value ?? 0);
  return Number.isFinite(parsedValue) ? roundQty(parsedValue) : 0;
}
function roundQty(value) {
  return Math.round(value * 100) / 100;
}
function formatNumber(value) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stock-opname",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Stok Opname"
    });
    const adminOpnameApi = useAdminOpnameApi();
    const { runAdminAction } = useAdminActionFeedback();
    const search = ref("");
    const statusFilter = ref("all");
    const dateFrom = ref("");
    const dateTo = ref("");
    const loadError = ref("");
    const lookupError = ref("");
    const formError = ref("");
    const isLoading = ref(false);
    const isLookupLoading = ref(false);
    const isFormDialogOpen = ref(false);
    const isFormLoading = ref(false);
    const isDetailDialogOpen = ref(false);
    const isDetailLoading = ref(false);
    const isConfirmDialogOpen = ref(false);
    const isConfirmLoading = ref(false);
    const formMode = ref("create");
    const opnameItems = ref([]);
    const ingredientOptions = ref([]);
    const totalRecordCount = ref(0);
    const selectedOpname = ref(null);
    const selectedOpnameDetail = ref(null);
    const confirmAction = ref(null);
    const newLineIngredientId = ref("");
    const form = ref(createEmptyForm());
    let searchTimer = null;
    let opnameRequestId = 0;
    let formLineSequence = 0;
    const hasActiveFilter = computed(() => Boolean(
      search.value.trim() || statusFilter.value !== "all" || dateFrom.value || dateTo.value
    ));
    const draftCount = computed(() => opnameItems.value.filter((item) => item.status === "DRAFT").length);
    const completedCount = computed(() => opnameItems.value.filter((item) => item.status === "COMPLETED").length);
    const appliedCount = computed(() => opnameItems.value.filter((item) => item.status === "APPLIED").length);
    const selectedIngredientIds = computed(() => new Set(form.value.lines.map((line) => line.ingredientId).filter(Boolean)));
    const availableIngredientOptions = computed(() => ingredientOptions.value.filter((item) => !selectedIngredientIds.value.has(item.id)));
    const canAddLine = computed(() => Boolean(newLineIngredientId.value) && !selectedIngredientIds.value.has(newLineIngredientId.value));
    const canCreateOpname = computed(() => ingredientOptions.value.length > 0);
    const metrics = computed(() => [
      {
        id: "total",
        label: "Total Sesi",
        value: String(totalRecordCount.value),
        helper: hasActiveFilter.value ? "Sesuai filter aktif" : "Riwayat opname tercatat",
        tone: "info"
      },
      {
        id: "draft",
        label: "Draft",
        value: String(draftCount.value),
        helper: "Masih bisa diubah",
        tone: "warning"
      },
      {
        id: "apply",
        label: "Perlu Apply",
        value: String(completedCount.value),
        helper: `${appliedCount.value} sesi sudah diterapkan`,
        tone: completedCount.value ? "destructive" : "success"
      }
    ]);
    const formTitle = computed(() => formMode.value === "create" ? "Buat Stok Opname" : "Ubah Draft Stok Opname");
    const formDescription = computed(() => formMode.value === "create" ? "Pilih bahan baku yang dihitung, lalu isi stok fisik hasil opname." : "Perubahan hanya bisa disimpan selama sesi masih berstatus draft.");
    const detailItem = computed(() => selectedOpnameDetail.value ?? selectedOpname.value);
    const confirmTitle = computed(() => {
      const action = confirmAction.value;
      if (!action) {
        return "Konfirmasi Stok Opname";
      }
      if (action.type === "complete") {
        return "Selesaikan Stok Opname";
      }
      if (action.type === "cancel") {
        return "Batalkan Stok Opname";
      }
      if (action.type === "apply") {
        return "Apply Penyesuaian Stok";
      }
      return "Hapus Stok Opname";
    });
    const confirmDescription = computed(() => {
      const action = confirmAction.value;
      if (!action) {
        return "";
      }
      if (action.type === "complete") {
        return "Sesi akan dikunci sebagai selesai. Draft tidak bisa diubah setelah status ini.";
      }
      if (action.type === "cancel") {
        return "Sesi akan dibatalkan dan tidak bisa diterapkan ke stok asli.";
      }
      if (action.type === "apply") {
        return "Stok asli bahan akan diubah mengikuti stok fisik pada sesi opname ini.";
      }
      return "Data stok opname akan dihapus secara soft delete dari daftar aktif.";
    });
    const confirmSubmitLabel = computed(() => {
      const action = confirmAction.value?.type;
      if (action === "complete") {
        return "Selesaikan";
      }
      if (action === "cancel") {
        return "Batalkan Opname";
      }
      if (action === "apply") {
        return "Apply Stok";
      }
      return "Hapus";
    });
    const confirmSubmitVariant = computed(() => {
      const action = confirmAction.value?.type;
      return action === "delete" || action === "cancel" ? "destructive" : "default";
    });
    watch([search, statusFilter, dateFrom, dateTo], () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      searchTimer = setTimeout(() => {
        void loadOpnames();
      }, 300);
    });
    watch(isFormDialogOpen, (isOpen) => {
      if (!isOpen) {
        formError.value = "";
        newLineIngredientId.value = "";
      }
    });
    async function loadOpnameIngredients() {
      isLookupLoading.value = true;
      lookupError.value = "";
      try {
        const records = await adminOpnameApi.getOpnameIngredients();
        ingredientOptions.value = (Array.isArray(records) ? records : []).map(mapAdminOpnameIngredientRecordToOption);
      } catch (error) {
        lookupError.value = getErrorMessage(error, "Gagal memuat referensi bahan stok opname.");
        ingredientOptions.value = [];
      } finally {
        isLookupLoading.value = false;
      }
    }
    async function loadOpnames() {
      const requestId = ++opnameRequestId;
      isLoading.value = true;
      loadError.value = "";
      try {
        const result = await adminOpnameApi.getOpnames({
          batch: 1,
          size: 100,
          search: search.value.trim() || void 0,
          status: statusFilter.value === "all" ? void 0 : statusFilter.value,
          start_date: dateFrom.value || void 0,
          end_date: dateTo.value || void 0
        });
        const records = Array.isArray(result.records) ? result.records : [];
        if (requestId !== opnameRequestId) {
          return;
        }
        opnameItems.value = records.map(mapAdminOpnameRecordToViewItem);
        totalRecordCount.value = result.page?.total_record_count ?? records.length;
      } catch (error) {
        if (requestId !== opnameRequestId) {
          return;
        }
        loadError.value = getErrorMessage(error, "Gagal memuat daftar stok opname.");
        opnameItems.value = [];
        totalRecordCount.value = 0;
      } finally {
        if (requestId === opnameRequestId) {
          isLoading.value = false;
        }
      }
    }
    function openCreateDialog() {
      selectedOpname.value = null;
      selectedOpnameDetail.value = null;
      formMode.value = "create";
      formError.value = "";
      form.value = createEmptyForm();
      newLineIngredientId.value = "";
      isFormDialogOpen.value = true;
    }
    async function openEditDialog(id) {
      const item = opnameItems.value.find((opname) => opname.id === id);
      if (!item) {
        return;
      }
      if (!isAdminOpnameEditable(item.status)) {
        toast.error("Stok opname hanya bisa diubah saat masih berstatus draft.");
        return;
      }
      selectedOpname.value = item;
      selectedOpnameDetail.value = item;
      formMode.value = "edit";
      formError.value = "";
      newLineIngredientId.value = "";
      isFormDialogOpen.value = true;
      isFormLoading.value = true;
      try {
        const detail = await adminOpnameApi.getOpnameDetail(id);
        const viewItem = mapAdminOpnameRecordToViewItem(detail);
        selectedOpnameDetail.value = viewItem;
        form.value = createFormFromOpname(viewItem);
      } catch (error) {
        formError.value = getErrorMessage(error, "Gagal memuat detail stok opname untuk diubah.");
        form.value = createFormFromOpname(item);
      } finally {
        isFormLoading.value = false;
      }
    }
    async function openDetailDialog(id) {
      const item = opnameItems.value.find((opname) => opname.id === id);
      if (!item) {
        return;
      }
      selectedOpname.value = item;
      selectedOpnameDetail.value = item;
      isDetailDialogOpen.value = true;
      isDetailLoading.value = true;
      try {
        const detail = await adminOpnameApi.getOpnameDetail(id);
        selectedOpnameDetail.value = mapAdminOpnameRecordToViewItem(detail);
      } catch {
        selectedOpnameDetail.value = item;
      } finally {
        isDetailLoading.value = false;
      }
    }
    function openConfirmDialog(id, type) {
      const item = opnameItems.value.find((opname) => opname.id === id);
      if (!item || !canRunConfirmAction(item, type)) {
        return;
      }
      confirmAction.value = {
        type,
        item
      };
      isConfirmDialogOpen.value = true;
    }
    async function handleFormSubmit() {
      const payload = createFormPayload();
      if (!payload) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        if (formMode.value === "create") {
          await adminOpnameApi.createOpname(createAdminOpnameCreatePayload(payload));
        } else if (selectedOpname.value) {
          await adminOpnameApi.updateOpname(selectedOpname.value.id, createAdminOpnameUpdatePayload(payload));
        }
        await loadOpnames();
      }, {
        loading: isFormLoading,
        successMessage: formMode.value === "create" ? "Stok opname berhasil dibuat." : "Draft stok opname berhasil diperbarui.",
        errorMessage: formMode.value === "create" ? "Gagal membuat stok opname." : "Gagal memperbarui stok opname."
      });
      if (succeeded) {
        isFormDialogOpen.value = false;
      }
    }
    async function handleConfirmSubmit() {
      const action = confirmAction.value;
      if (!action) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        if (action.type === "complete") {
          await adminOpnameApi.updateOpnameStatus(action.item.id, { status: "COMPLETED" });
        } else if (action.type === "cancel") {
          await adminOpnameApi.updateOpnameStatus(action.item.id, { status: "CANCELLED" });
        } else if (action.type === "apply") {
          await adminOpnameApi.applyOpname(action.item.id);
          await loadOpnameIngredients();
        } else {
          await adminOpnameApi.deleteOpname(action.item.id);
        }
        await loadOpnames();
      }, {
        loading: isConfirmLoading,
        successMessage: getConfirmSuccessMessage(action.type),
        errorMessage: "Aksi stok opname gagal diproses."
      });
      if (succeeded) {
        isConfirmDialogOpen.value = false;
        confirmAction.value = null;
      }
    }
    function createFormPayload() {
      const payload = {
        opnameDate: form.value.opnameDate,
        notes: form.value.notes.trim(),
        items: form.value.lines.map((line) => ({
          ingredientId: line.ingredientId,
          physicalQty: parseAdminOpnameQtyInput(line.physicalQtyInput) ?? Number.NaN
        }))
      };
      const validationMessage = getAdminOpnameValidationMessage(payload);
      if (validationMessage) {
        formError.value = validationMessage;
        return null;
      }
      formError.value = "";
      return payload;
    }
    function addFormLine() {
      if (!canAddLine.value) {
        return;
      }
      const option = getIngredientOption(newLineIngredientId.value);
      if (!option) {
        return;
      }
      form.value.lines = [
        ...form.value.lines,
        createFormLineFromIngredient(option)
      ];
      newLineIngredientId.value = "";
      formError.value = "";
    }
    function removeFormLine(localId) {
      form.value.lines = form.value.lines.filter((line) => line.localId !== localId);
      formError.value = "";
    }
    function handleLineIngredientChange(line, event) {
      const ingredientId = event.target.value;
      const option = getIngredientOption(ingredientId);
      line.ingredientId = ingredientId;
      if (option) {
        line.ingredientName = option.name;
        line.unitName = option.unitName;
        line.systemQty = option.stockQty;
      }
      formError.value = "";
    }
    function getIngredientOption(ingredientId) {
      return ingredientOptions.value.find((item) => item.id === ingredientId);
    }
    function getFormLineSystemQtyLabel(line) {
      return formatAdminOpnameQuantity(line.systemQty, line.unitName);
    }
    function getFormLinePhysicalQty(line) {
      return parseAdminOpnameQtyInput(line.physicalQtyInput);
    }
    function getFormLineDifference(line) {
      const physicalQty = getFormLinePhysicalQty(line);
      if (physicalQty === null) {
        return null;
      }
      return roundAdminOpnameQty(physicalQty - line.systemQty);
    }
    function getFormLineDifferenceLabel(line) {
      const difference = getFormLineDifference(line);
      if (difference === null) {
        return "-";
      }
      return formatAdminOpnameSignedQuantity(difference, line.unitName);
    }
    function getFormLineDifferenceTone(line) {
      const difference = getFormLineDifference(line);
      if (difference === null) {
        return "default";
      }
      return getAdminOpnameDifferenceTone(difference);
    }
    function createEmptyForm() {
      return {
        opnameDate: createLocalDateInput(),
        notes: "",
        lines: []
      };
    }
    function createFormFromOpname(item) {
      return {
        opnameDate: item.opnameDateInput || createLocalDateInput(),
        notes: item.notes === "-" ? "" : item.notes,
        lines: item.items.map((line) => ({
          localId: createFormLineLocalId(),
          ingredientId: line.ingredientId,
          ingredientName: line.ingredientName,
          unitName: line.unitName,
          systemQty: line.systemQty,
          physicalQtyInput: String(line.physicalQty)
        }))
      };
    }
    function createFormLineFromIngredient(option) {
      return {
        localId: createFormLineLocalId(),
        ingredientId: option.id,
        ingredientName: option.name,
        unitName: option.unitName,
        systemQty: option.stockQty,
        physicalQtyInput: ""
      };
    }
    function createFormLineLocalId() {
      formLineSequence += 1;
      return `opname-line-${Date.now()}-${formLineSequence}`;
    }
    function createLocalDateInput() {
      const date = /* @__PURE__ */ new Date();
      const timezoneOffsetMs = date.getTimezoneOffset() * 60 * 1e3;
      return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 10);
    }
    function canRunConfirmAction(item, type) {
      if (type === "complete") {
        if (canCompleteAdminOpname(item.status)) {
          return true;
        }
        toast.error("Hanya stok opname draft yang bisa diselesaikan.");
        return false;
      }
      if (type === "cancel") {
        if (canCancelAdminOpname(item.status)) {
          return true;
        }
        toast.error("Hanya stok opname draft yang bisa dibatalkan.");
        return false;
      }
      if (type === "apply") {
        if (canApplyAdminOpname(item.status)) {
          return true;
        }
        toast.error("Hanya stok opname selesai yang bisa di-apply.");
        return false;
      }
      if (canDeleteAdminOpname(item.status)) {
        return true;
      }
      toast.error("Stok opname hanya bisa dihapus saat draft atau dibatalkan.");
      return false;
    }
    function getConfirmSuccessMessage(type) {
      if (type === "complete") {
        return "Stok opname berhasil diselesaikan.";
      }
      if (type === "cancel") {
        return "Stok opname berhasil dibatalkan.";
      }
      if (type === "apply") {
        return "Penyesuaian stok opname berhasil diterapkan.";
      }
      return "Stok opname berhasil dihapus.";
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
        title: "Stok Opname",
        description: "Kelola sesi perhitungan stok fisik bahan baku, kunci hasil opname, lalu apply penyesuaian ke stok sistem."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan stok opname"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.id === "total") {
                _push2(ssrRenderComponent(unref(ClipboardCheck), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else if (item.id === "draft") {
                _push2(ssrRenderComponent(unref(PackageSearch), {
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
                item.id === "total" ? (openBlock(), createBlock(unref(ClipboardCheck), {
                  key: 0,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : item.id === "draft" ? (openBlock(), createBlock(unref(PackageSearch), {
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
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="stock-opname-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="stock-opname-table-title" class="text-base font-semibold tracking-normal"> Daftar Stok Opname </h2><p class="mt-1 text-sm text-muted-foreground"> Status draft masih bisa diubah, status selesai bisa di-apply ke stok asli. </p></div></div>`);
      if (unref(loadError) || unref(lookupError)) {
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          variant: "destructive",
          class: "mb-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(AlertCircle), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$1), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(loadError) || unref(lookupError))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(loadError) || unref(lookupError)), 1)
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
                createVNode(unref(_sfc_main$1), null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(loadError) || unref(lookupError)), 1)
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
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "stock-opname-search",
        "search-label": "Cari stok opname",
        "search-placeholder": "Cari catatan stok opname",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="stock-opname-status-filter" class="sr-only"${_scopeId}>Filter status stok opname</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2$1), {
              id: "stock-opname-status-filter",
              modelValue: unref(statusFilter),
              "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
              class: "w-40",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua status</option><option value="DRAFT"${_scopeId2}>Draft</option><option value="COMPLETED"${_scopeId2}>Selesai</option><option value="APPLIED"${_scopeId2}>Diterapkan</option><option value="CANCELLED"${_scopeId2}>Dibatalkan</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua status"),
                    createVNode("option", { value: "DRAFT" }, "Draft"),
                    createVNode("option", { value: "COMPLETED" }, "Selesai"),
                    createVNode("option", { value: "APPLIED" }, "Diterapkan"),
                    createVNode("option", { value: "CANCELLED" }, "Dibatalkan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-2"${_scopeId}><label for="stock-opname-date-from" class="sr-only"${_scopeId}>Tanggal mulai stok opname</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), {
              id: "stock-opname-date-from",
              modelValue: unref(dateFrom),
              "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
              type: "date",
              class: "w-36",
              disabled: unref(isLoading)
            }, null, _parent2, _scopeId));
            _push2(`<label for="stock-opname-date-to" class="sr-only"${_scopeId}>Tanggal akhir stok opname</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), {
              id: "stock-opname-date-to",
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
                  for: "stock-opname-status-filter",
                  class: "sr-only"
                }, "Filter status stok opname"),
                createVNode(unref(_sfc_main$2$1), {
                  id: "stock-opname-status-filter",
                  modelValue: unref(statusFilter),
                  "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                  class: "w-40",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua status"),
                    createVNode("option", { value: "DRAFT" }, "Draft"),
                    createVNode("option", { value: "COMPLETED" }, "Selesai"),
                    createVNode("option", { value: "APPLIED" }, "Diterapkan"),
                    createVNode("option", { value: "CANCELLED" }, "Dibatalkan")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", { class: "flex gap-2" }, [
                createVNode("label", {
                  for: "stock-opname-date-from",
                  class: "sr-only"
                }, "Tanggal mulai stok opname"),
                createVNode(unref(_sfc_main$1$1), {
                  id: "stock-opname-date-from",
                  modelValue: unref(dateFrom),
                  "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
                  type: "date",
                  class: "w-36",
                  disabled: unref(isLoading)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                createVNode("label", {
                  for: "stock-opname-date-to",
                  class: "sr-only"
                }, "Tanggal akhir stok opname"),
                createVNode(unref(_sfc_main$1$1), {
                  id: "stock-opname-date-to",
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
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              type: "button",
              size: "sm",
              disabled: unref(isLoading) || unref(isLookupLoading) || !unref(canCreateOpname),
              onClick: openCreateDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(` Buat Opname `);
                } else {
                  return [
                    createVNode(unref(Plus), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Buat Opname ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), {
                type: "button",
                size: "sm",
                disabled: unref(isLoading) || unref(isLookupLoading) || !unref(canCreateOpname),
                onClick: openCreateDialog
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Buat Opname ")
                ]),
                _: 1
              }, 8, ["disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3 rounded-md border"><div class="overflow-x-auto">`);
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        class: "min-w-260",
        "aria-busy": unref(isLoading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1$2), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "min-w-40" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tanggal`);
                            } else {
                              return [
                                createTextVNode("Tanggal")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "min-w-72" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Catatan`);
                            } else {
                              return [
                                createTextVNode("Catatan")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "min-w-36" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Status`);
                            } else {
                              return [
                                createTextVNode("Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "text-right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Item`);
                            } else {
                              return [
                                createTextVNode("Item")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "min-w-44" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pembuat`);
                            } else {
                              return [
                                createTextVNode("Pembuat")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "min-w-44" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update`);
                            } else {
                              return [
                                createTextVNode("Update")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$2$2), { class: "w-120 min-w-120 text-right" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Aksi`);
                            } else {
                              return [
                                createTextVNode("Aksi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$2$2), { class: "min-w-40" }, {
                            default: withCtx(() => [
                              createTextVNode("Tanggal")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { class: "min-w-72" }, {
                            default: withCtx(() => [
                              createTextVNode("Catatan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { class: "min-w-36" }, {
                            default: withCtx(() => [
                              createTextVNode("Status")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                            default: withCtx(() => [
                              createTextVNode("Item")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { class: "min-w-44" }, {
                            default: withCtx(() => [
                              createTextVNode("Pembuat")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { class: "min-w-44" }, {
                            default: withCtx(() => [
                              createTextVNode("Update")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$2$2), { class: "w-120 min-w-120 text-right" }, {
                            default: withCtx(() => [
                              createTextVNode("Aksi")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$2$2), { class: "min-w-40" }, {
                          default: withCtx(() => [
                            createTextVNode("Tanggal")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { class: "min-w-72" }, {
                          default: withCtx(() => [
                            createTextVNode("Catatan")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { class: "min-w-36" }, {
                          default: withCtx(() => [
                            createTextVNode("Status")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                          default: withCtx(() => [
                            createTextVNode("Item")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { class: "min-w-44" }, {
                          default: withCtx(() => [
                            createTextVNode("Pembuat")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { class: "min-w-44" }, {
                          default: withCtx(() => [
                            createTextVNode("Update")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$2$2), { class: "w-120 min-w-120 text-right" }, {
                          default: withCtx(() => [
                            createTextVNode("Aksi")
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$8), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(`<!--[-->`);
                    ssrRenderList(5, (index) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        key: `stock-opname-loading-${index}`
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(7, (column) => {
                              _push4(ssrRenderComponent(unref(_sfc_main$6), {
                                key: `stock-opname-loading-${index}-${column}`
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$4), { class: "h-4 w-full" }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$4), { class: "h-4 w-full" })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(), createBlock(Fragment, null, renderList(7, (column) => {
                                return createVNode(unref(_sfc_main$6), {
                                  key: `stock-opname-loading-${index}-${column}`
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$4), { class: "h-4 w-full" })
                                  ]),
                                  _: 1
                                });
                              }), 64))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else if (unref(opnameItems).length) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(opnameItems), (item) => {
                      _push3(ssrRenderComponent(unref(_sfc_main$5), {
                        key: item.id
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="min-w-0"${_scopeId4}><p class="text-sm font-medium"${_scopeId4}>${ssrInterpolate(item.opnameDate)}</p></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "min-w-0" }, [
                                      createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.opnameDate), 1)
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<p class="line-clamp-2 text-sm"${_scopeId4}>${ssrInterpolate(item.notes)}</p>`);
                                } else {
                                  return [
                                    createVNode("p", { class: "line-clamp-2 text-sm" }, toDisplayString(item.notes), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(AdminStatusBadge, {
                                    tone: item.statusTone
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.statusLabel)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.statusLabel), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(AdminStatusBadge, {
                                      tone: item.statusTone
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.statusLabel), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["tone"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.itemCountLabel)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.itemCountLabel), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.userName)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.userName), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.updatedAt)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.updatedAt), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-nowrap items-center justify-end gap-1.5"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$3), {
                                    type: "button",
                                    variant: "ghost",
                                    size: "sm",
                                    class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                    onClick: ($event) => openDetailDialog(item.id)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(Eye), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }, null, _parent6, _scopeId5));
                                        _push6(` Detail `);
                                      } else {
                                        return [
                                          createVNode(unref(Eye), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Detail ")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  if (unref(isAdminOpnameEditable)(item.status)) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$3), {
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground",
                                      onClick: ($event) => openEditDialog(item.id)
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(Pencil), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }, null, _parent6, _scopeId5));
                                          _push6(` Ubah `);
                                        } else {
                                          return [
                                            createVNode(unref(Pencil), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Ubah ")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  if (unref(canCompleteAdminOpname)(item.status)) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$3), {
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                      onClick: ($event) => openConfirmDialog(item.id, "complete")
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(CheckCircle2), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }, null, _parent6, _scopeId5));
                                          _push6(` Selesai `);
                                        } else {
                                          return [
                                            createVNode(unref(CheckCircle2), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Selesai ")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  if (unref(canApplyAdminOpname)(item.status)) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$3), {
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success",
                                      onClick: ($event) => openConfirmDialog(item.id, "apply")
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(Send), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }, null, _parent6, _scopeId5));
                                          _push6(` Apply `);
                                        } else {
                                          return [
                                            createVNode(unref(Send), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Apply ")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  if (unref(canCancelAdminOpname)(item.status)) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$3), {
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                      onClick: ($event) => openConfirmDialog(item.id, "cancel")
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(XCircle), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }, null, _parent6, _scopeId5));
                                          _push6(` Batal `);
                                        } else {
                                          return [
                                            createVNode(unref(XCircle), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Batal ")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  if (unref(canDeleteAdminOpname)(item.status)) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$3), {
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                      onClick: ($event) => openConfirmDialog(item.id, "delete")
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(Trash2), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }, null, _parent6, _scopeId5));
                                          _push6(` Hapus `);
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
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-nowrap items-center justify-end gap-1.5" }, [
                                      createVNode(unref(_sfc_main$3), {
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                        onClick: ($event) => openDetailDialog(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Eye), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Detail ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      unref(isAdminOpnameEditable)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                        key: 0,
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground",
                                        onClick: ($event) => openEditDialog(item.id)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Pencil), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Ubah ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : createCommentVNode("", true),
                                      unref(canCompleteAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                        key: 1,
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                        onClick: ($event) => openConfirmDialog(item.id, "complete")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(CheckCircle2), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Selesai ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : createCommentVNode("", true),
                                      unref(canApplyAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                        key: 2,
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success",
                                        onClick: ($event) => openConfirmDialog(item.id, "apply")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Send), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Apply ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : createCommentVNode("", true),
                                      unref(canCancelAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                        key: 3,
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                        onClick: ($event) => openConfirmDialog(item.id, "cancel")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(XCircle), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Batal ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : createCommentVNode("", true),
                                      unref(canDeleteAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                        key: 4,
                                        type: "button",
                                        variant: "ghost",
                                        size: "sm",
                                        class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                        onClick: ($event) => openConfirmDialog(item.id, "delete")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Trash2), {
                                            class: "size-4",
                                            "aria-hidden": "true"
                                          }),
                                          createTextVNode(" Hapus ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : createCommentVNode("", true)
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.opnameDate), 1)
                                  ])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "line-clamp-2 text-sm" }, toDisplayString(item.notes), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createVNode(AdminStatusBadge, {
                                    tone: item.statusTone
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.statusLabel), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["tone"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.itemCountLabel), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.userName), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.updatedAt), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-nowrap items-center justify-end gap-1.5" }, [
                                    createVNode(unref(_sfc_main$3), {
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                      onClick: ($event) => openDetailDialog(item.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Eye), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Detail ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    unref(isAdminOpnameEditable)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                      key: 0,
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground",
                                      onClick: ($event) => openEditDialog(item.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Pencil), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Ubah ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true),
                                    unref(canCompleteAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                      key: 1,
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                      onClick: ($event) => openConfirmDialog(item.id, "complete")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(CheckCircle2), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Selesai ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true),
                                    unref(canApplyAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                      key: 2,
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success",
                                      onClick: ($event) => openConfirmDialog(item.id, "apply")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Send), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Apply ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true),
                                    unref(canCancelAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                      key: 3,
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                      onClick: ($event) => openConfirmDialog(item.id, "cancel")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(XCircle), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Batal ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true),
                                    unref(canDeleteAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                      key: 4,
                                      type: "button",
                                      variant: "ghost",
                                      size: "sm",
                                      class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                      onClick: ($event) => openConfirmDialog(item.id, "delete")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Trash2), {
                                          class: "size-4",
                                          "aria-hidden": "true"
                                        }),
                                        createTextVNode(" Hapus ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    _push3(ssrRenderComponent(unref(_sfc_main$4$1), { colspan: 7 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="text-center"${_scopeId3}><p class="text-sm font-medium"${_scopeId3}>Stok opname tidak ditemukan</p><p class="mt-1 text-sm text-muted-foreground"${_scopeId3}>Ubah kata kunci, status, atau rentang tanggal.</p></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "text-center" }, [
                              createVNode("p", { class: "text-sm font-medium" }, "Stok opname tidak ditemukan"),
                              createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Ubah kata kunci, status, atau rentang tanggal.")
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(5, (index) => {
                      return createVNode(unref(_sfc_main$5), {
                        key: `stock-opname-loading-${index}`
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(7, (column) => {
                            return createVNode(unref(_sfc_main$6), {
                              key: `stock-opname-loading-${index}-${column}`
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$4), { class: "h-4 w-full" })
                              ]),
                              _: 1
                            });
                          }), 64))
                        ]),
                        _: 2
                      }, 1024);
                    }), 64)) : unref(opnameItems).length ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(opnameItems), (item) => {
                      return openBlock(), createBlock(unref(_sfc_main$5), {
                        key: item.id
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.opnameDate), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode("p", { class: "line-clamp-2 text-sm" }, toDisplayString(item.notes), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createVNode(AdminStatusBadge, {
                                tone: item.statusTone
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.statusLabel), 1)
                                ]),
                                _: 2
                              }, 1032, ["tone"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.itemCountLabel), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.userName), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.updatedAt), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-nowrap items-center justify-end gap-1.5" }, [
                                createVNode(unref(_sfc_main$3), {
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                  onClick: ($event) => openDetailDialog(item.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Eye), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Detail ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                unref(isAdminOpnameEditable)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                  key: 0,
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground",
                                  onClick: ($event) => openEditDialog(item.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Pencil), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Ubah ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                unref(canCompleteAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                  key: 1,
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                  onClick: ($event) => openConfirmDialog(item.id, "complete")
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(CheckCircle2), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Selesai ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                unref(canApplyAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                  key: 2,
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success",
                                  onClick: ($event) => openConfirmDialog(item.id, "apply")
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Send), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Apply ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                unref(canCancelAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                  key: 3,
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                  onClick: ($event) => openConfirmDialog(item.id, "cancel")
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(XCircle), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Batal ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                unref(canDeleteAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                  key: 4,
                                  type: "button",
                                  variant: "ghost",
                                  size: "sm",
                                  class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                  onClick: ($event) => openConfirmDialog(item.id, "delete")
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash2), {
                                      class: "size-4",
                                      "aria-hidden": "true"
                                    }),
                                    createTextVNode(" Hapus ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                      key: 2,
                      colspan: 7
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("p", { class: "text-sm font-medium" }, "Stok opname tidak ditemukan"),
                          createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Ubah kata kunci, status, atau rentang tanggal.")
                        ])
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1$2), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$2$2), { class: "min-w-40" }, {
                        default: withCtx(() => [
                          createTextVNode("Tanggal")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { class: "min-w-72" }, {
                        default: withCtx(() => [
                          createTextVNode("Catatan")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { class: "min-w-36" }, {
                        default: withCtx(() => [
                          createTextVNode("Status")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                        default: withCtx(() => [
                          createTextVNode("Item")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { class: "min-w-44" }, {
                        default: withCtx(() => [
                          createTextVNode("Pembuat")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { class: "min-w-44" }, {
                        default: withCtx(() => [
                          createTextVNode("Update")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$2$2), { class: "w-120 min-w-120 text-right" }, {
                        default: withCtx(() => [
                          createTextVNode("Aksi")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$8), null, {
                default: withCtx(() => [
                  unref(isLoading) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(5, (index) => {
                    return createVNode(unref(_sfc_main$5), {
                      key: `stock-opname-loading-${index}`
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(7, (column) => {
                          return createVNode(unref(_sfc_main$6), {
                            key: `stock-opname-loading-${index}-${column}`
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$4), { class: "h-4 w-full" })
                            ]),
                            _: 1
                          });
                        }), 64))
                      ]),
                      _: 2
                    }, 1024);
                  }), 64)) : unref(opnameItems).length ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(opnameItems), (item) => {
                    return openBlock(), createBlock(unref(_sfc_main$5), {
                      key: item.id
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(item.opnameDate), 1)
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode("p", { class: "line-clamp-2 text-sm" }, toDisplayString(item.notes), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createVNode(AdminStatusBadge, {
                              tone: item.statusTone
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.statusLabel), 1)
                              ]),
                              _: 2
                            }, 1032, ["tone"])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.itemCountLabel), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.userName), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.updatedAt), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-nowrap items-center justify-end gap-1.5" }, [
                              createVNode(unref(_sfc_main$3), {
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                onClick: ($event) => openDetailDialog(item.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Eye), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Detail ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              unref(isAdminOpnameEditable)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                key: 0,
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-warning-foreground hover:bg-warning/20 hover:text-warning-foreground",
                                onClick: ($event) => openEditDialog(item.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Pencil), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Ubah ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true),
                              unref(canCompleteAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                key: 1,
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-primary hover:bg-primary/10 hover:text-primary",
                                onClick: ($event) => openConfirmDialog(item.id, "complete")
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(CheckCircle2), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Selesai ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true),
                              unref(canApplyAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                key: 2,
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-success hover:bg-success/10 hover:text-success",
                                onClick: ($event) => openConfirmDialog(item.id, "apply")
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Send), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Apply ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true),
                              unref(canCancelAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                key: 3,
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                onClick: ($event) => openConfirmDialog(item.id, "cancel")
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(XCircle), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Batal ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true),
                              unref(canDeleteAdminOpname)(item.status) ? (openBlock(), createBlock(unref(_sfc_main$3), {
                                key: 4,
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                class: "h-8 shrink-0 whitespace-nowrap px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive",
                                onClick: ($event) => openConfirmDialog(item.id, "delete")
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash2), {
                                    class: "size-4",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(" Hapus ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                    key: 2,
                    colspan: 7
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("p", { class: "text-sm font-medium" }, "Stok opname tidak ditemukan"),
                        createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Ubah kata kunci, status, atau rentang tanggal.")
                      ])
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="border-t p-3 text-sm text-muted-foreground"> Menampilkan ${ssrInterpolate(unref(opnameItems).length)} dari ${ssrInterpolate(unref(totalRecordCount))} sesi stok opname. </div></div></section>`);
      _push(ssrRenderComponent(unref(_sfc_main$9$1), {
        open: unref(isFormDialogOpen),
        "onUpdate:open": ($event) => isRef(isFormDialogOpen) ? isFormDialogOpen.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6$1), { class: "max-h-[calc(100vh-2rem)] gap-0 overflow-hidden p-0 sm:max-w-5xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3$1), { class: "border-b p-4 pr-12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(formTitle))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(formTitle)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(formDescription))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(formDescription)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1$3), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(formTitle)), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(formDescription)), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="max-h-[calc(100vh-13rem)] overflow-y-auto px-4 py-4"${_scopeId2}>`);
                  if (unref(formError)) {
                    _push3(ssrRenderComponent(unref(_sfc_main$2), {
                      variant: "destructive",
                      class: "mb-4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(AlertCircle), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$1), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(formError))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(formError)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(AlertCircle), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }),
                            createVNode(unref(_sfc_main$1), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(formError)), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="grid gap-4 sm:grid-cols-[14rem_minmax(0,1fr)]"${_scopeId2}><div class="grid gap-2"${_scopeId2}><label for="stock-opname-form-date" class="text-sm font-medium text-foreground"${_scopeId2}>Tanggal Opname</label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$1$1), {
                    id: "stock-opname-form-date",
                    modelValue: unref(form).opnameDate,
                    "onUpdate:modelValue": ($event) => unref(form).opnameDate = $event,
                    type: "date",
                    disabled: unref(isFormLoading),
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}><label for="stock-opname-form-notes" class="text-sm font-medium text-foreground"${_scopeId2}>Catatan</label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "stock-opname-form-notes",
                    modelValue: unref(form).notes,
                    "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                    class: "min-h-20",
                    maxlength: "500",
                    placeholder: "Contoh: opname rutin akhir bulan",
                    disabled: unref(isFormLoading)
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="mt-4 rounded-md border bg-muted/20 p-3"${_scopeId2}><div class="flex flex-col gap-2 lg:flex-row lg:items-end"${_scopeId2}><div class="grid min-w-0 flex-1 gap-2"${_scopeId2}><label for="stock-opname-add-ingredient" class="text-sm font-medium text-foreground"${_scopeId2}>Tambah Bahan</label>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$2$1), {
                    id: "stock-opname-add-ingredient",
                    modelValue: unref(newLineIngredientId),
                    "onUpdate:modelValue": ($event) => isRef(newLineIngredientId) ? newLineIngredientId.value = $event : null,
                    disabled: unref(isFormLoading) || !unref(availableIngredientOptions).length
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<option value=""${_scopeId3}>Pilih bahan</option><!--[-->`);
                        ssrRenderList(unref(availableIngredientOptions), (ingredient) => {
                          _push4(`<option${ssrRenderAttr("value", ingredient.id)}${_scopeId3}>${ssrInterpolate(ingredient.name)} - stok sistem ${ssrInterpolate(ingredient.stockLabel)}</option>`);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          createVNode("option", { value: "" }, "Pilih bahan"),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(availableIngredientOptions), (ingredient) => {
                            return openBlock(), createBlock("option", {
                              key: ingredient.id,
                              value: ingredient.id
                            }, toDisplayString(ingredient.name) + " - stok sistem " + toDisplayString(ingredient.stockLabel), 9, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$3), {
                    type: "button",
                    class: "lg:w-auto",
                    disabled: unref(isFormLoading) || !unref(canAddLine),
                    onClick: addFormLine
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), {
                          class: "size-4",
                          "aria-hidden": "true"
                        }, null, _parent4, _scopeId3));
                        _push4(` Tambah `);
                      } else {
                        return [
                          createVNode(unref(Plus), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }),
                          createTextVNode(" Tambah ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="mt-4 rounded-md border"${_scopeId2}><div class="overflow-x-auto"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), { class: "min-w-210" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$5), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Bahan`);
                                        } else {
                                          return [
                                            createTextVNode("Bahan")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Stok Sistem`);
                                        } else {
                                          return [
                                            createTextVNode("Stok Sistem")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$2$2), { class: "w-44" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Stok Fisik`);
                                        } else {
                                          return [
                                            createTextVNode("Stok Fisik")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Selisih`);
                                        } else {
                                          return [
                                            createTextVNode("Selisih")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$2$2), { class: "w-24 text-right" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Aksi`);
                                        } else {
                                          return [
                                            createTextVNode("Aksi")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Bahan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Stok Sistem")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "w-44" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Stok Fisik")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Selisih")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "w-24 text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aksi")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bahan")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Stok Sistem")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "w-44" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Stok Fisik")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Selisih")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "w-24 text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Aksi")
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(form).lines.length) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(form).lines, (line) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$5), {
                                    key: line.localId,
                                    class: "align-top"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<label${ssrRenderAttr("for", `stock-opname-line-ingredient-${line.localId}`)} class="sr-only"${_scopeId6}>Bahan opname</label>`);
                                              _push7(ssrRenderComponent(unref(_sfc_main$2$1), {
                                                id: `stock-opname-line-ingredient-${line.localId}`,
                                                "model-value": line.ingredientId,
                                                disabled: unref(isFormLoading),
                                                onChange: ($event) => handleLineIngredientChange(line, $event)
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<option value=""${_scopeId7}>Pilih bahan</option><!--[-->`);
                                                    ssrRenderList(unref(ingredientOptions), (ingredient) => {
                                                      _push8(`<option${ssrRenderAttr("value", ingredient.id)}${_scopeId7}>${ssrInterpolate(ingredient.name)}</option>`);
                                                    });
                                                    _push8(`<!--]-->`);
                                                  } else {
                                                    return [
                                                      createVNode("option", { value: "" }, "Pilih bahan"),
                                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(ingredientOptions), (ingredient) => {
                                                        return openBlock(), createBlock("option", {
                                                          key: ingredient.id,
                                                          value: ingredient.id
                                                        }, toDisplayString(ingredient.name), 9, ["value"]);
                                                      }), 128))
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId6}>Satuan ${ssrInterpolate(line.unitName)}</p>`);
                                            } else {
                                              return [
                                                createVNode("label", {
                                                  for: `stock-opname-line-ingredient-${line.localId}`,
                                                  class: "sr-only"
                                                }, "Bahan opname", 8, ["for"]),
                                                createVNode(unref(_sfc_main$2$1), {
                                                  id: `stock-opname-line-ingredient-${line.localId}`,
                                                  "model-value": line.ingredientId,
                                                  disabled: unref(isFormLoading),
                                                  onChange: ($event) => handleLineIngredientChange(line, $event)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("option", { value: "" }, "Pilih bahan"),
                                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(ingredientOptions), (ingredient) => {
                                                      return openBlock(), createBlock("option", {
                                                        key: ingredient.id,
                                                        value: ingredient.id
                                                      }, toDisplayString(ingredient.name), 9, ["value"]);
                                                    }), 128))
                                                  ]),
                                                  _: 1
                                                }, 8, ["id", "model-value", "disabled", "onChange"]),
                                                createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(getFormLineSystemQtyLabel(line))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(getFormLineSystemQtyLabel(line)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<label${ssrRenderAttr("for", `stock-opname-line-physical-${line.localId}`)} class="sr-only"${_scopeId6}>Stok fisik</label>`);
                                              _push7(ssrRenderComponent(unref(_sfc_main$1$1), {
                                                id: `stock-opname-line-physical-${line.localId}`,
                                                modelValue: line.physicalQtyInput,
                                                "onUpdate:modelValue": ($event) => line.physicalQtyInput = $event,
                                                inputmode: "decimal",
                                                placeholder: "0",
                                                disabled: unref(isFormLoading)
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode("label", {
                                                  for: `stock-opname-line-physical-${line.localId}`,
                                                  class: "sr-only"
                                                }, "Stok fisik", 8, ["for"]),
                                                createVNode(unref(_sfc_main$1$1), {
                                                  id: `stock-opname-line-physical-${line.localId}`,
                                                  modelValue: line.physicalQtyInput,
                                                  "onUpdate:modelValue": ($event) => line.physicalQtyInput = $event,
                                                  inputmode: "decimal",
                                                  placeholder: "0",
                                                  disabled: unref(isFormLoading)
                                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "disabled"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(AdminStatusBadge, {
                                                tone: getFormLineDifferenceTone(line)
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(getFormLineDifferenceLabel(line))}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(getFormLineDifferenceLabel(line)), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(AdminStatusBadge, {
                                                  tone: getFormLineDifferenceTone(line)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(getFormLineDifferenceLabel(line)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["tone"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(_sfc_main$3), {
                                                type: "button",
                                                variant: "ghost",
                                                size: "sm",
                                                class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                                disabled: unref(isFormLoading),
                                                onClick: ($event) => removeFormLine(line.localId)
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(Trash2), {
                                                      class: "size-4",
                                                      "aria-hidden": "true"
                                                    }, null, _parent8, _scopeId7));
                                                    _push8(` Hapus `);
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
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(_sfc_main$3), {
                                                  type: "button",
                                                  variant: "ghost",
                                                  size: "sm",
                                                  class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                                  disabled: unref(isFormLoading),
                                                  onClick: ($event) => removeFormLine(line.localId)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Trash2), {
                                                      class: "size-4",
                                                      "aria-hidden": "true"
                                                    }),
                                                    createTextVNode(" Hapus ")
                                                  ]),
                                                  _: 1
                                                }, 8, ["disabled", "onClick"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(_sfc_main$6), null, {
                                            default: withCtx(() => [
                                              createVNode("label", {
                                                for: `stock-opname-line-ingredient-${line.localId}`,
                                                class: "sr-only"
                                              }, "Bahan opname", 8, ["for"]),
                                              createVNode(unref(_sfc_main$2$1), {
                                                id: `stock-opname-line-ingredient-${line.localId}`,
                                                "model-value": line.ingredientId,
                                                disabled: unref(isFormLoading),
                                                onChange: ($event) => handleLineIngredientChange(line, $event)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("option", { value: "" }, "Pilih bahan"),
                                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(ingredientOptions), (ingredient) => {
                                                    return openBlock(), createBlock("option", {
                                                      key: ingredient.id,
                                                      value: ingredient.id
                                                    }, toDisplayString(ingredient.name), 9, ["value"]);
                                                  }), 128))
                                                ]),
                                                _: 1
                                              }, 8, ["id", "model-value", "disabled", "onChange"]),
                                              createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(getFormLineSystemQtyLabel(line)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$6), null, {
                                            default: withCtx(() => [
                                              createVNode("label", {
                                                for: `stock-opname-line-physical-${line.localId}`,
                                                class: "sr-only"
                                              }, "Stok fisik", 8, ["for"]),
                                              createVNode(unref(_sfc_main$1$1), {
                                                id: `stock-opname-line-physical-${line.localId}`,
                                                modelValue: line.physicalQtyInput,
                                                "onUpdate:modelValue": ($event) => line.physicalQtyInput = $event,
                                                inputmode: "decimal",
                                                placeholder: "0",
                                                disabled: unref(isFormLoading)
                                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "disabled"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode(AdminStatusBadge, {
                                                tone: getFormLineDifferenceTone(line)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(getFormLineDifferenceLabel(line)), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["tone"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$3), {
                                                type: "button",
                                                variant: "ghost",
                                                size: "sm",
                                                class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                                disabled: unref(isFormLoading),
                                                onClick: ($event) => removeFormLine(line.localId)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Trash2), {
                                                    class: "size-4",
                                                    "aria-hidden": "true"
                                                  }),
                                                  createTextVNode(" Hapus ")
                                                ]),
                                                _: 1
                                              }, 8, ["disabled", "onClick"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                _push5(ssrRenderComponent(unref(_sfc_main$4$1), { colspan: 5 }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="text-center"${_scopeId5}><p class="text-sm font-medium"${_scopeId5}>Belum ada bahan dipilih</p><p class="mt-1 text-sm text-muted-foreground"${_scopeId5}>Tambahkan bahan yang sedang dihitung stok fisiknya.</p></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "text-center" }, [
                                          createVNode("p", { class: "text-sm font-medium" }, "Belum ada bahan dipilih"),
                                          createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Tambahkan bahan yang sedang dihitung stok fisiknya.")
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              }
                            } else {
                              return [
                                unref(form).lines.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(form).lines, (line) => {
                                  return openBlock(), createBlock(unref(_sfc_main$5), {
                                    key: line.localId,
                                    class: "align-top"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createVNode("label", {
                                            for: `stock-opname-line-ingredient-${line.localId}`,
                                            class: "sr-only"
                                          }, "Bahan opname", 8, ["for"]),
                                          createVNode(unref(_sfc_main$2$1), {
                                            id: `stock-opname-line-ingredient-${line.localId}`,
                                            "model-value": line.ingredientId,
                                            disabled: unref(isFormLoading),
                                            onChange: ($event) => handleLineIngredientChange(line, $event)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("option", { value: "" }, "Pilih bahan"),
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(ingredientOptions), (ingredient) => {
                                                return openBlock(), createBlock("option", {
                                                  key: ingredient.id,
                                                  value: ingredient.id
                                                }, toDisplayString(ingredient.name), 9, ["value"]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          }, 8, ["id", "model-value", "disabled", "onChange"]),
                                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(getFormLineSystemQtyLabel(line)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createVNode("label", {
                                            for: `stock-opname-line-physical-${line.localId}`,
                                            class: "sr-only"
                                          }, "Stok fisik", 8, ["for"]),
                                          createVNode(unref(_sfc_main$1$1), {
                                            id: `stock-opname-line-physical-${line.localId}`,
                                            modelValue: line.physicalQtyInput,
                                            "onUpdate:modelValue": ($event) => line.physicalQtyInput = $event,
                                            inputmode: "decimal",
                                            placeholder: "0",
                                            disabled: unref(isFormLoading)
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "disabled"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode(AdminStatusBadge, {
                                            tone: getFormLineDifferenceTone(line)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(getFormLineDifferenceLabel(line)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["tone"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$3), {
                                            type: "button",
                                            variant: "ghost",
                                            size: "sm",
                                            class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                            disabled: unref(isFormLoading),
                                            onClick: ($event) => removeFormLine(line.localId)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Trash2), {
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              }),
                                              createTextVNode(" Hapus ")
                                            ]),
                                            _: 1
                                          }, 8, ["disabled", "onClick"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                                  key: 1,
                                  colspan: 5
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-center" }, [
                                      createVNode("p", { class: "text-sm font-medium" }, "Belum ada bahan dipilih"),
                                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Tambahkan bahan yang sedang dihitung stok fisiknya.")
                                    ])
                                  ]),
                                  _: 1
                                }))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1$2), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Bahan")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Stok Sistem")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "w-44" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Stok Fisik")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Selisih")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "w-24 text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Aksi")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              unref(form).lines.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(form).lines, (line) => {
                                return openBlock(), createBlock(unref(_sfc_main$5), {
                                  key: line.localId,
                                  class: "align-top"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createVNode("label", {
                                          for: `stock-opname-line-ingredient-${line.localId}`,
                                          class: "sr-only"
                                        }, "Bahan opname", 8, ["for"]),
                                        createVNode(unref(_sfc_main$2$1), {
                                          id: `stock-opname-line-ingredient-${line.localId}`,
                                          "model-value": line.ingredientId,
                                          disabled: unref(isFormLoading),
                                          onChange: ($event) => handleLineIngredientChange(line, $event)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("option", { value: "" }, "Pilih bahan"),
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(ingredientOptions), (ingredient) => {
                                              return openBlock(), createBlock("option", {
                                                key: ingredient.id,
                                                value: ingredient.id
                                              }, toDisplayString(ingredient.name), 9, ["value"]);
                                            }), 128))
                                          ]),
                                          _: 1
                                        }, 8, ["id", "model-value", "disabled", "onChange"]),
                                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(getFormLineSystemQtyLabel(line)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createVNode("label", {
                                          for: `stock-opname-line-physical-${line.localId}`,
                                          class: "sr-only"
                                        }, "Stok fisik", 8, ["for"]),
                                        createVNode(unref(_sfc_main$1$1), {
                                          id: `stock-opname-line-physical-${line.localId}`,
                                          modelValue: line.physicalQtyInput,
                                          "onUpdate:modelValue": ($event) => line.physicalQtyInput = $event,
                                          inputmode: "decimal",
                                          placeholder: "0",
                                          disabled: unref(isFormLoading)
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "disabled"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createVNode(AdminStatusBadge, {
                                          tone: getFormLineDifferenceTone(line)
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(getFormLineDifferenceLabel(line)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["tone"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$3), {
                                          type: "button",
                                          variant: "ghost",
                                          size: "sm",
                                          class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                          disabled: unref(isFormLoading),
                                          onClick: ($event) => removeFormLine(line.localId)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Trash2), {
                                              class: "size-4",
                                              "aria-hidden": "true"
                                            }),
                                            createTextVNode(" Hapus ")
                                          ]),
                                          _: 1
                                        }, 8, ["disabled", "onClick"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                                key: 1,
                                colspan: 5
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center" }, [
                                    createVNode("p", { class: "text-sm font-medium" }, "Belum ada bahan dipilih"),
                                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Tambahkan bahan yang sedang dihitung stok fisiknya.")
                                  ])
                                ]),
                                _: 1
                              }))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4$2), { class: "border-t p-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          type: "button",
                          variant: "outline",
                          disabled: unref(isFormLoading),
                          onClick: ($event) => isFormDialogOpen.value = false
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
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          type: "button",
                          disabled: unref(isFormLoading),
                          onClick: handleFormSubmit
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(isFormLoading)) {
                                _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "size-4" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(Save), {
                                  class: "size-4",
                                  "aria-hidden": "true"
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(` ${ssrInterpolate(unref(isFormLoading) ? "Menyimpan..." : "Simpan Opname")}`);
                            } else {
                              return [
                                unref(isFormLoading) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                                  key: 0,
                                  class: "size-4"
                                })) : (openBlock(), createBlock(unref(Save), {
                                  key: 1,
                                  class: "size-4",
                                  "aria-hidden": "true"
                                })),
                                createTextVNode(" " + toDisplayString(unref(isFormLoading) ? "Menyimpan..." : "Simpan Opname"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$3), {
                            type: "button",
                            variant: "outline",
                            disabled: unref(isFormLoading),
                            onClick: ($event) => isFormDialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode(unref(_sfc_main$3), {
                            type: "button",
                            disabled: unref(isFormLoading),
                            onClick: handleFormSubmit
                          }, {
                            default: withCtx(() => [
                              unref(isFormLoading) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                                key: 0,
                                class: "size-4"
                              })) : (openBlock(), createBlock(unref(Save), {
                                key: 1,
                                class: "size-4",
                                "aria-hidden": "true"
                              })),
                              createTextVNode(" " + toDisplayString(unref(isFormLoading) ? "Menyimpan..." : "Simpan Opname"), 1)
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
                    createVNode(unref(_sfc_main$3$1), { class: "border-b p-4 pr-12" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$3), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(formTitle)), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5$1), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(formDescription)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "max-h-[calc(100vh-13rem)] overflow-y-auto px-4 py-4" }, [
                      unref(formError) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                        key: 0,
                        variant: "destructive",
                        class: "mb-4"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(AlertCircle), {
                            class: "size-4",
                            "aria-hidden": "true"
                          }),
                          createVNode(unref(_sfc_main$1), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(formError)), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode("div", { class: "grid gap-4 sm:grid-cols-[14rem_minmax(0,1fr)]" }, [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode("label", {
                            for: "stock-opname-form-date",
                            class: "text-sm font-medium text-foreground"
                          }, "Tanggal Opname"),
                          createVNode(unref(_sfc_main$1$1), {
                            id: "stock-opname-form-date",
                            modelValue: unref(form).opnameDate,
                            "onUpdate:modelValue": ($event) => unref(form).opnameDate = $event,
                            type: "date",
                            disabled: unref(isFormLoading),
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode("label", {
                            for: "stock-opname-form-notes",
                            class: "text-sm font-medium text-foreground"
                          }, "Catatan"),
                          createVNode(unref(_sfc_main$7), {
                            id: "stock-opname-form-notes",
                            modelValue: unref(form).notes,
                            "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                            class: "min-h-20",
                            maxlength: "500",
                            placeholder: "Contoh: opname rutin akhir bulan",
                            disabled: unref(isFormLoading)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 rounded-md border bg-muted/20 p-3" }, [
                        createVNode("div", { class: "flex flex-col gap-2 lg:flex-row lg:items-end" }, [
                          createVNode("div", { class: "grid min-w-0 flex-1 gap-2" }, [
                            createVNode("label", {
                              for: "stock-opname-add-ingredient",
                              class: "text-sm font-medium text-foreground"
                            }, "Tambah Bahan"),
                            createVNode(unref(_sfc_main$2$1), {
                              id: "stock-opname-add-ingredient",
                              modelValue: unref(newLineIngredientId),
                              "onUpdate:modelValue": ($event) => isRef(newLineIngredientId) ? newLineIngredientId.value = $event : null,
                              disabled: unref(isFormLoading) || !unref(availableIngredientOptions).length
                            }, {
                              default: withCtx(() => [
                                createVNode("option", { value: "" }, "Pilih bahan"),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(availableIngredientOptions), (ingredient) => {
                                  return openBlock(), createBlock("option", {
                                    key: ingredient.id,
                                    value: ingredient.id
                                  }, toDisplayString(ingredient.name) + " - stok sistem " + toDisplayString(ingredient.stockLabel), 9, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                          ]),
                          createVNode(unref(_sfc_main$3), {
                            type: "button",
                            class: "lg:w-auto",
                            disabled: unref(isFormLoading) || !unref(canAddLine),
                            onClick: addFormLine
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), {
                                class: "size-4",
                                "aria-hidden": "true"
                              }),
                              createTextVNode(" Tambah ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 rounded-md border" }, [
                        createVNode("div", { class: "overflow-x-auto" }, [
                          createVNode(unref(_sfc_main$9), { class: "min-w-210" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$1$2), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Bahan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Stok Sistem")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "w-44" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Stok Fisik")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Selisih")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "w-24 text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Aksi")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  unref(form).lines.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(form).lines, (line) => {
                                    return openBlock(), createBlock(unref(_sfc_main$5), {
                                      key: line.localId,
                                      class: "align-top"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$6), null, {
                                          default: withCtx(() => [
                                            createVNode("label", {
                                              for: `stock-opname-line-ingredient-${line.localId}`,
                                              class: "sr-only"
                                            }, "Bahan opname", 8, ["for"]),
                                            createVNode(unref(_sfc_main$2$1), {
                                              id: `stock-opname-line-ingredient-${line.localId}`,
                                              "model-value": line.ingredientId,
                                              disabled: unref(isFormLoading),
                                              onChange: ($event) => handleLineIngredientChange(line, $event)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("option", { value: "" }, "Pilih bahan"),
                                                (openBlock(true), createBlock(Fragment, null, renderList(unref(ingredientOptions), (ingredient) => {
                                                  return openBlock(), createBlock("option", {
                                                    key: ingredient.id,
                                                    value: ingredient.id
                                                  }, toDisplayString(ingredient.name), 9, ["value"]);
                                                }), 128))
                                              ]),
                                              _: 1
                                            }, 8, ["id", "model-value", "disabled", "onChange"]),
                                            createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(getFormLineSystemQtyLabel(line)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$6), null, {
                                          default: withCtx(() => [
                                            createVNode("label", {
                                              for: `stock-opname-line-physical-${line.localId}`,
                                              class: "sr-only"
                                            }, "Stok fisik", 8, ["for"]),
                                            createVNode(unref(_sfc_main$1$1), {
                                              id: `stock-opname-line-physical-${line.localId}`,
                                              modelValue: line.physicalQtyInput,
                                              "onUpdate:modelValue": ($event) => line.physicalQtyInput = $event,
                                              inputmode: "decimal",
                                              placeholder: "0",
                                              disabled: unref(isFormLoading)
                                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "disabled"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode(AdminStatusBadge, {
                                              tone: getFormLineDifferenceTone(line)
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(getFormLineDifferenceLabel(line)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["tone"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$3), {
                                              type: "button",
                                              variant: "ghost",
                                              size: "sm",
                                              class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                              disabled: unref(isFormLoading),
                                              onClick: ($event) => removeFormLine(line.localId)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Trash2), {
                                                  class: "size-4",
                                                  "aria-hidden": "true"
                                                }),
                                                createTextVNode(" Hapus ")
                                              ]),
                                              _: 1
                                            }, 8, ["disabled", "onClick"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                                    key: 1,
                                    colspan: 5
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-center" }, [
                                        createVNode("p", { class: "text-sm font-medium" }, "Belum ada bahan dipilih"),
                                        createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Tambahkan bahan yang sedang dihitung stok fisiknya.")
                                      ])
                                    ]),
                                    _: 1
                                  }))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$4$2), { class: "border-t p-4" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), {
                          type: "button",
                          variant: "outline",
                          disabled: unref(isFormLoading),
                          onClick: ($event) => isFormDialogOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(unref(_sfc_main$3), {
                          type: "button",
                          disabled: unref(isFormLoading),
                          onClick: handleFormSubmit
                        }, {
                          default: withCtx(() => [
                            unref(isFormLoading) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                              key: 0,
                              class: "size-4"
                            })) : (openBlock(), createBlock(unref(Save), {
                              key: 1,
                              class: "size-4",
                              "aria-hidden": "true"
                            })),
                            createTextVNode(" " + toDisplayString(unref(isFormLoading) ? "Menyimpan..." : "Simpan Opname"), 1)
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
              createVNode(unref(_sfc_main$6$1), { class: "max-h-[calc(100vh-2rem)] gap-0 overflow-hidden p-0 sm:max-w-5xl" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$1), { class: "border-b p-4 pr-12" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$3), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formTitle)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5$1), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formDescription)), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "max-h-[calc(100vh-13rem)] overflow-y-auto px-4 py-4" }, [
                    unref(formError) ? (openBlock(), createBlock(unref(_sfc_main$2), {
                      key: 0,
                      variant: "destructive",
                      class: "mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(AlertCircle), {
                          class: "size-4",
                          "aria-hidden": "true"
                        }),
                        createVNode(unref(_sfc_main$1), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(formError)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode("div", { class: "grid gap-4 sm:grid-cols-[14rem_minmax(0,1fr)]" }, [
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode("label", {
                          for: "stock-opname-form-date",
                          class: "text-sm font-medium text-foreground"
                        }, "Tanggal Opname"),
                        createVNode(unref(_sfc_main$1$1), {
                          id: "stock-opname-form-date",
                          modelValue: unref(form).opnameDate,
                          "onUpdate:modelValue": ($event) => unref(form).opnameDate = $event,
                          type: "date",
                          disabled: unref(isFormLoading),
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode("label", {
                          for: "stock-opname-form-notes",
                          class: "text-sm font-medium text-foreground"
                        }, "Catatan"),
                        createVNode(unref(_sfc_main$7), {
                          id: "stock-opname-form-notes",
                          modelValue: unref(form).notes,
                          "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                          class: "min-h-20",
                          maxlength: "500",
                          placeholder: "Contoh: opname rutin akhir bulan",
                          disabled: unref(isFormLoading)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 rounded-md border bg-muted/20 p-3" }, [
                      createVNode("div", { class: "flex flex-col gap-2 lg:flex-row lg:items-end" }, [
                        createVNode("div", { class: "grid min-w-0 flex-1 gap-2" }, [
                          createVNode("label", {
                            for: "stock-opname-add-ingredient",
                            class: "text-sm font-medium text-foreground"
                          }, "Tambah Bahan"),
                          createVNode(unref(_sfc_main$2$1), {
                            id: "stock-opname-add-ingredient",
                            modelValue: unref(newLineIngredientId),
                            "onUpdate:modelValue": ($event) => isRef(newLineIngredientId) ? newLineIngredientId.value = $event : null,
                            disabled: unref(isFormLoading) || !unref(availableIngredientOptions).length
                          }, {
                            default: withCtx(() => [
                              createVNode("option", { value: "" }, "Pilih bahan"),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(availableIngredientOptions), (ingredient) => {
                                return openBlock(), createBlock("option", {
                                  key: ingredient.id,
                                  value: ingredient.id
                                }, toDisplayString(ingredient.name) + " - stok sistem " + toDisplayString(ingredient.stockLabel), 9, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
                        createVNode(unref(_sfc_main$3), {
                          type: "button",
                          class: "lg:w-auto",
                          disabled: unref(isFormLoading) || !unref(canAddLine),
                          onClick: addFormLine
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), {
                              class: "size-4",
                              "aria-hidden": "true"
                            }),
                            createTextVNode(" Tambah ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 rounded-md border" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode(unref(_sfc_main$9), { class: "min-w-210" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$1$2), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bahan")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Stok Sistem")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "w-44" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Stok Fisik")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "w-40 text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Selisih")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "w-24 text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Aksi")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                unref(form).lines.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(form).lines, (line) => {
                                  return openBlock(), createBlock(unref(_sfc_main$5), {
                                    key: line.localId,
                                    class: "align-top"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createVNode("label", {
                                            for: `stock-opname-line-ingredient-${line.localId}`,
                                            class: "sr-only"
                                          }, "Bahan opname", 8, ["for"]),
                                          createVNode(unref(_sfc_main$2$1), {
                                            id: `stock-opname-line-ingredient-${line.localId}`,
                                            "model-value": line.ingredientId,
                                            disabled: unref(isFormLoading),
                                            onChange: ($event) => handleLineIngredientChange(line, $event)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("option", { value: "" }, "Pilih bahan"),
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(ingredientOptions), (ingredient) => {
                                                return openBlock(), createBlock("option", {
                                                  key: ingredient.id,
                                                  value: ingredient.id
                                                }, toDisplayString(ingredient.name), 9, ["value"]);
                                              }), 128))
                                            ]),
                                            _: 1
                                          }, 8, ["id", "model-value", "disabled", "onChange"]),
                                          createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(getFormLineSystemQtyLabel(line)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createVNode("label", {
                                            for: `stock-opname-line-physical-${line.localId}`,
                                            class: "sr-only"
                                          }, "Stok fisik", 8, ["for"]),
                                          createVNode(unref(_sfc_main$1$1), {
                                            id: `stock-opname-line-physical-${line.localId}`,
                                            modelValue: line.physicalQtyInput,
                                            "onUpdate:modelValue": ($event) => line.physicalQtyInput = $event,
                                            inputmode: "decimal",
                                            placeholder: "0",
                                            disabled: unref(isFormLoading)
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "disabled"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode(AdminStatusBadge, {
                                            tone: getFormLineDifferenceTone(line)
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(getFormLineDifferenceLabel(line)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["tone"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$3), {
                                            type: "button",
                                            variant: "ghost",
                                            size: "sm",
                                            class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                            disabled: unref(isFormLoading),
                                            onClick: ($event) => removeFormLine(line.localId)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Trash2), {
                                                class: "size-4",
                                                "aria-hidden": "true"
                                              }),
                                              createTextVNode(" Hapus ")
                                            ]),
                                            _: 1
                                          }, 8, ["disabled", "onClick"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                                  key: 1,
                                  colspan: 5
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-center" }, [
                                      createVNode("p", { class: "text-sm font-medium" }, "Belum ada bahan dipilih"),
                                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Tambahkan bahan yang sedang dihitung stok fisiknya.")
                                    ])
                                  ]),
                                  _: 1
                                }))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$4$2), { class: "border-t p-4" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), {
                        type: "button",
                        variant: "outline",
                        disabled: unref(isFormLoading),
                        onClick: ($event) => isFormDialogOpen.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"]),
                      createVNode(unref(_sfc_main$3), {
                        type: "button",
                        disabled: unref(isFormLoading),
                        onClick: handleFormSubmit
                      }, {
                        default: withCtx(() => [
                          unref(isFormLoading) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                            key: 0,
                            class: "size-4"
                          })) : (openBlock(), createBlock(unref(Save), {
                            key: 1,
                            class: "size-4",
                            "aria-hidden": "true"
                          })),
                          createTextVNode(" " + toDisplayString(unref(isFormLoading) ? "Menyimpan..." : "Simpan Opname"), 1)
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
      _push(ssrRenderComponent(unref(_sfc_main$9$1), {
        open: unref(isDetailDialogOpen),
        "onUpdate:open": ($event) => isRef(isDetailDialogOpen) ? isDetailDialogOpen.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6$1), { class: "max-h-[calc(100vh-2rem)] gap-0 overflow-hidden p-0 sm:max-w-4xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3$1), { class: "border-b p-4 pr-12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Detail Stok Opname`);
                            } else {
                              return [
                                createTextVNode("Detail Stok Opname")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(isDetailLoading) ? "Memuat detail stok opname..." : "Rincian bahan, stok sistem, stok fisik, dan selisih opname.")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(isDetailLoading) ? "Memuat detail stok opname..." : "Rincian bahan, stok sistem, stok fisik, dan selisih opname."), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Detail Stok Opname")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(isDetailLoading) ? "Memuat detail stok opname..." : "Rincian bahan, stok sistem, stok fisik, dan selisih opname."), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="max-h-[calc(100vh-13rem)] overflow-y-auto px-4 py-4"${_scopeId2}>`);
                  if (unref(detailItem)) {
                    _push3(`<div class="grid gap-2 sm:grid-cols-4"${_scopeId2}><div class="rounded-md border bg-muted/30 p-3"${_scopeId2}><p class="text-xs font-medium uppercase text-muted-foreground"${_scopeId2}>Tanggal</p><p class="mt-1 text-sm font-medium"${_scopeId2}>${ssrInterpolate(unref(detailItem).opnameDate)}</p></div><div class="rounded-md border bg-muted/30 p-3"${_scopeId2}><p class="text-xs font-medium uppercase text-muted-foreground"${_scopeId2}>Status</p>`);
                    _push3(ssrRenderComponent(AdminStatusBadge, {
                      tone: unref(detailItem).statusTone,
                      class: "mt-2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(detailItem).statusLabel)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(detailItem).statusLabel), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="rounded-md border bg-muted/30 p-3"${_scopeId2}><p class="text-xs font-medium uppercase text-muted-foreground"${_scopeId2}>Item</p><p class="mt-1 text-sm font-medium"${_scopeId2}>${ssrInterpolate(unref(detailItem).itemCountLabel)}</p></div><div class="rounded-md border bg-muted/30 p-3"${_scopeId2}><p class="text-xs font-medium uppercase text-muted-foreground"${_scopeId2}>Pembuat</p><p class="mt-1 text-sm font-medium"${_scopeId2}>${ssrInterpolate(unref(detailItem).userName)}</p></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(detailItem)) {
                    _push3(`<div class="mt-3 rounded-md border bg-muted/30 p-3"${_scopeId2}><p class="text-xs font-medium uppercase text-muted-foreground"${_scopeId2}>Catatan</p><p class="mt-1 text-sm"${_scopeId2}>${ssrInterpolate(unref(detailItem).notes)}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="mt-4 rounded-md border"${_scopeId2}><div class="overflow-x-auto"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), {
                    class: "min-w-190",
                    "aria-busy": unref(isDetailLoading)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$5), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Bahan`);
                                        } else {
                                          return [
                                            createTextVNode("Bahan")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$2$2), { class: "text-right" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Stok Sistem`);
                                        } else {
                                          return [
                                            createTextVNode("Stok Sistem")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$2$2), { class: "text-right" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Stok Fisik`);
                                        } else {
                                          return [
                                            createTextVNode("Stok Fisik")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$2$2), { class: "text-right" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Selisih`);
                                        } else {
                                          return [
                                            createTextVNode("Selisih")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Bahan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Stok Sistem")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Stok Fisik")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Selisih")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bahan")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Stok Sistem")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Stok Fisik")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Selisih")
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$8), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(isDetailLoading)) {
                                _push5(`<!--[-->`);
                                ssrRenderList(4, (index) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$5), {
                                    key: `stock-opname-detail-loading-${index}`
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<!--[-->`);
                                        ssrRenderList(4, (column) => {
                                          _push6(ssrRenderComponent(unref(_sfc_main$6), {
                                            key: `stock-opname-detail-loading-${index}-${column}`
                                          }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(ssrRenderComponent(unref(_sfc_main$4), { class: "h-4 w-full" }, null, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  createVNode(unref(_sfc_main$4), { class: "h-4 w-full" })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        });
                                        _push6(`<!--]-->`);
                                      } else {
                                        return [
                                          (openBlock(), createBlock(Fragment, null, renderList(4, (column) => {
                                            return createVNode(unref(_sfc_main$6), {
                                              key: `stock-opname-detail-loading-${index}-${column}`
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$4), { class: "h-4 w-full" })
                                              ]),
                                              _: 1
                                            });
                                          }), 64))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else if (unref(detailItem)?.items.length) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(detailItem).items, (line) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$5), {
                                    key: line.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(_sfc_main$6), null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<p class="text-sm font-medium"${_scopeId6}>${ssrInterpolate(line.ingredientName)}</p><p class="mt-0.5 text-xs text-muted-foreground"${_scopeId6}>Satuan ${ssrInterpolate(line.unitName)}</p>`);
                                            } else {
                                              return [
                                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(line.ingredientName), 1),
                                                createVNode("p", { class: "mt-0.5 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(line.systemQtyLabel)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(line.systemQtyLabel), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(line.physicalQtyLabel)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(line.physicalQtyLabel), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(unref(_sfc_main$6), { class: "text-right" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(AdminStatusBadge, {
                                                tone: line.differenceTone
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(line.differenceLabel)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(line.differenceLabel), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(AdminStatusBadge, {
                                                  tone: line.differenceTone
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(line.differenceLabel), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["tone"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(_sfc_main$6), null, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(line.ingredientName), 1),
                                              createVNode("p", { class: "mt-0.5 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(line.systemQtyLabel), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(line.physicalQtyLabel), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode(AdminStatusBadge, {
                                                tone: line.differenceTone
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(line.differenceLabel), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["tone"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                _push5(ssrRenderComponent(unref(_sfc_main$4$1), { colspan: 4 }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="text-center"${_scopeId5}><p class="text-sm font-medium"${_scopeId5}>Detail bahan belum tersedia</p><p class="mt-1 text-sm text-muted-foreground"${_scopeId5}>Data detail tidak dikembalikan oleh API.</p></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "text-center" }, [
                                          createVNode("p", { class: "text-sm font-medium" }, "Detail bahan belum tersedia"),
                                          createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Data detail tidak dikembalikan oleh API.")
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              }
                            } else {
                              return [
                                unref(isDetailLoading) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(4, (index) => {
                                  return createVNode(unref(_sfc_main$5), {
                                    key: `stock-opname-detail-loading-${index}`
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(4, (column) => {
                                        return createVNode(unref(_sfc_main$6), {
                                          key: `stock-opname-detail-loading-${index}-${column}`
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$4), { class: "h-4 w-full" })
                                          ]),
                                          _: 1
                                        });
                                      }), 64))
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64)) : unref(detailItem)?.items.length ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(detailItem).items, (line) => {
                                  return openBlock(), createBlock(unref(_sfc_main$5), {
                                    key: line.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(line.ingredientName), 1),
                                          createVNode("p", { class: "mt-0.5 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(line.systemQtyLabel), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(line.physicalQtyLabel), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode(AdminStatusBadge, {
                                            tone: line.differenceTone
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(line.differenceLabel), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["tone"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                                  key: 2,
                                  colspan: 4
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-center" }, [
                                      createVNode("p", { class: "text-sm font-medium" }, "Detail bahan belum tersedia"),
                                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Data detail tidak dikembalikan oleh API.")
                                    ])
                                  ]),
                                  _: 1
                                }))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1$2), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$5), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Bahan")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Stok Sistem")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Stok Fisik")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Selisih")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$8), null, {
                            default: withCtx(() => [
                              unref(isDetailLoading) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(4, (index) => {
                                return createVNode(unref(_sfc_main$5), {
                                  key: `stock-opname-detail-loading-${index}`
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(4, (column) => {
                                      return createVNode(unref(_sfc_main$6), {
                                        key: `stock-opname-detail-loading-${index}-${column}`
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$4), { class: "h-4 w-full" })
                                        ]),
                                        _: 1
                                      });
                                    }), 64))
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64)) : unref(detailItem)?.items.length ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(detailItem).items, (line) => {
                                return openBlock(), createBlock(unref(_sfc_main$5), {
                                  key: line.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$6), null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-sm font-medium" }, toDisplayString(line.ingredientName), 1),
                                        createVNode("p", { class: "mt-0.5 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(line.systemQtyLabel), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(line.physicalQtyLabel), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createVNode(AdminStatusBadge, {
                                          tone: line.differenceTone
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(line.differenceLabel), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["tone"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                                key: 2,
                                colspan: 4
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "text-center" }, [
                                    createVNode("p", { class: "text-sm font-medium" }, "Detail bahan belum tersedia"),
                                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Data detail tidak dikembalikan oleh API.")
                                  ])
                                ]),
                                _: 1
                              }))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4$2), { class: "border-t p-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          type: "button",
                          variant: "outline",
                          disabled: unref(isDetailLoading),
                          onClick: ($event) => isDetailDialogOpen.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Tutup `);
                            } else {
                              return [
                                createTextVNode(" Tutup ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$3), {
                            type: "button",
                            variant: "outline",
                            disabled: unref(isDetailLoading),
                            onClick: ($event) => isDetailDialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Tutup ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3$1), { class: "border-b p-4 pr-12" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$3), null, {
                          default: withCtx(() => [
                            createTextVNode("Detail Stok Opname")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5$1), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(isDetailLoading) ? "Memuat detail stok opname..." : "Rincian bahan, stok sistem, stok fisik, dan selisih opname."), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "max-h-[calc(100vh-13rem)] overflow-y-auto px-4 py-4" }, [
                      unref(detailItem) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid gap-2 sm:grid-cols-4"
                      }, [
                        createVNode("div", { class: "rounded-md border bg-muted/30 p-3" }, [
                          createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, "Tanggal"),
                          createVNode("p", { class: "mt-1 text-sm font-medium" }, toDisplayString(unref(detailItem).opnameDate), 1)
                        ]),
                        createVNode("div", { class: "rounded-md border bg-muted/30 p-3" }, [
                          createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, "Status"),
                          createVNode(AdminStatusBadge, {
                            tone: unref(detailItem).statusTone,
                            class: "mt-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(detailItem).statusLabel), 1)
                            ]),
                            _: 1
                          }, 8, ["tone"])
                        ]),
                        createVNode("div", { class: "rounded-md border bg-muted/30 p-3" }, [
                          createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, "Item"),
                          createVNode("p", { class: "mt-1 text-sm font-medium" }, toDisplayString(unref(detailItem).itemCountLabel), 1)
                        ]),
                        createVNode("div", { class: "rounded-md border bg-muted/30 p-3" }, [
                          createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, "Pembuat"),
                          createVNode("p", { class: "mt-1 text-sm font-medium" }, toDisplayString(unref(detailItem).userName), 1)
                        ])
                      ])) : createCommentVNode("", true),
                      unref(detailItem) ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-3 rounded-md border bg-muted/30 p-3"
                      }, [
                        createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, "Catatan"),
                        createVNode("p", { class: "mt-1 text-sm" }, toDisplayString(unref(detailItem).notes), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "mt-4 rounded-md border" }, [
                        createVNode("div", { class: "overflow-x-auto" }, [
                          createVNode(unref(_sfc_main$9), {
                            class: "min-w-190",
                            "aria-busy": unref(isDetailLoading)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$1$2), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$5), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Bahan")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Stok Sistem")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Stok Fisik")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Selisih")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$8), null, {
                                default: withCtx(() => [
                                  unref(isDetailLoading) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(4, (index) => {
                                    return createVNode(unref(_sfc_main$5), {
                                      key: `stock-opname-detail-loading-${index}`
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList(4, (column) => {
                                          return createVNode(unref(_sfc_main$6), {
                                            key: `stock-opname-detail-loading-${index}-${column}`
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$4), { class: "h-4 w-full" })
                                            ]),
                                            _: 1
                                          });
                                        }), 64))
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 64)) : unref(detailItem)?.items.length ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(detailItem).items, (line) => {
                                    return openBlock(), createBlock(unref(_sfc_main$5), {
                                      key: line.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$6), null, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "text-sm font-medium" }, toDisplayString(line.ingredientName), 1),
                                            createVNode("p", { class: "mt-0.5 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(line.systemQtyLabel), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(line.physicalQtyLabel), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode(AdminStatusBadge, {
                                              tone: line.differenceTone
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(line.differenceLabel), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["tone"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                                    key: 2,
                                    colspan: 4
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "text-center" }, [
                                        createVNode("p", { class: "text-sm font-medium" }, "Detail bahan belum tersedia"),
                                        createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Data detail tidak dikembalikan oleh API.")
                                      ])
                                    ]),
                                    _: 1
                                  }))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["aria-busy"])
                        ])
                      ])
                    ]),
                    createVNode(unref(_sfc_main$4$2), { class: "border-t p-4" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), {
                          type: "button",
                          variant: "outline",
                          disabled: unref(isDetailLoading),
                          onClick: ($event) => isDetailDialogOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tutup ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])
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
              createVNode(unref(_sfc_main$6$1), { class: "max-h-[calc(100vh-2rem)] gap-0 overflow-hidden p-0 sm:max-w-4xl" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$1), { class: "border-b p-4 pr-12" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Detail Stok Opname")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5$1), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(isDetailLoading) ? "Memuat detail stok opname..." : "Rincian bahan, stok sistem, stok fisik, dan selisih opname."), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "max-h-[calc(100vh-13rem)] overflow-y-auto px-4 py-4" }, [
                    unref(detailItem) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid gap-2 sm:grid-cols-4"
                    }, [
                      createVNode("div", { class: "rounded-md border bg-muted/30 p-3" }, [
                        createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, "Tanggal"),
                        createVNode("p", { class: "mt-1 text-sm font-medium" }, toDisplayString(unref(detailItem).opnameDate), 1)
                      ]),
                      createVNode("div", { class: "rounded-md border bg-muted/30 p-3" }, [
                        createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, "Status"),
                        createVNode(AdminStatusBadge, {
                          tone: unref(detailItem).statusTone,
                          class: "mt-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(detailItem).statusLabel), 1)
                          ]),
                          _: 1
                        }, 8, ["tone"])
                      ]),
                      createVNode("div", { class: "rounded-md border bg-muted/30 p-3" }, [
                        createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, "Item"),
                        createVNode("p", { class: "mt-1 text-sm font-medium" }, toDisplayString(unref(detailItem).itemCountLabel), 1)
                      ]),
                      createVNode("div", { class: "rounded-md border bg-muted/30 p-3" }, [
                        createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, "Pembuat"),
                        createVNode("p", { class: "mt-1 text-sm font-medium" }, toDisplayString(unref(detailItem).userName), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    unref(detailItem) ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-3 rounded-md border bg-muted/30 p-3"
                    }, [
                      createVNode("p", { class: "text-xs font-medium uppercase text-muted-foreground" }, "Catatan"),
                      createVNode("p", { class: "mt-1 text-sm" }, toDisplayString(unref(detailItem).notes), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "mt-4 rounded-md border" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode(unref(_sfc_main$9), {
                          class: "min-w-190",
                          "aria-busy": unref(isDetailLoading)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$1$2), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$5), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$2$2), { class: "min-w-64" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Bahan")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Stok Sistem")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Stok Fisik")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$2$2), { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Selisih")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$8), null, {
                              default: withCtx(() => [
                                unref(isDetailLoading) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(4, (index) => {
                                  return createVNode(unref(_sfc_main$5), {
                                    key: `stock-opname-detail-loading-${index}`
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(4, (column) => {
                                        return createVNode(unref(_sfc_main$6), {
                                          key: `stock-opname-detail-loading-${index}-${column}`
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$4), { class: "h-4 w-full" })
                                          ]),
                                          _: 1
                                        });
                                      }), 64))
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64)) : unref(detailItem)?.items.length ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(detailItem).items, (line) => {
                                  return openBlock(), createBlock(unref(_sfc_main$5), {
                                    key: line.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$6), null, {
                                        default: withCtx(() => [
                                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(line.ingredientName), 1),
                                          createVNode("p", { class: "mt-0.5 text-xs text-muted-foreground" }, "Satuan " + toDisplayString(line.unitName), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(line.systemQtyLabel), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(line.physicalQtyLabel), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(unref(_sfc_main$6), { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode(AdminStatusBadge, {
                                            tone: line.differenceTone
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(line.differenceLabel), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["tone"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128)) : (openBlock(), createBlock(unref(_sfc_main$4$1), {
                                  key: 2,
                                  colspan: 4
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "text-center" }, [
                                      createVNode("p", { class: "text-sm font-medium" }, "Detail bahan belum tersedia"),
                                      createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, "Data detail tidak dikembalikan oleh API.")
                                    ])
                                  ]),
                                  _: 1
                                }))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["aria-busy"])
                      ])
                    ])
                  ]),
                  createVNode(unref(_sfc_main$4$2), { class: "border-t p-4" }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), {
                        type: "button",
                        variant: "outline",
                        disabled: unref(isDetailLoading),
                        onClick: ($event) => isDetailDialogOpen.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tutup ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"])
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
      _push(ssrRenderComponent(unref(_sfc_main$9$1), {
        open: unref(isConfirmDialogOpen),
        "onUpdate:open": ($event) => isRef(isConfirmDialogOpen) ? isConfirmDialogOpen.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6$1), { class: "sm:max-w-lg" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3$1), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(confirmTitle))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(confirmTitle)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(confirmDescription))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(confirmDescription)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1$3), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(confirmTitle)), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(confirmDescription)), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(confirmAction)) {
                    _push3(`<div class="rounded-md border bg-muted/30 p-3"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}><span class="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"${_scopeId2}>`);
                    if (unref(confirmAction).type === "complete") {
                      _push3(ssrRenderComponent(unref(CalendarDays), {
                        class: "size-4",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                    } else if (unref(confirmAction).type === "apply") {
                      _push3(ssrRenderComponent(unref(Send), {
                        class: "size-4",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                    } else if (unref(confirmAction).type === "delete") {
                      _push3(ssrRenderComponent(unref(Trash2), {
                        class: "size-4",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(XCircle), {
                        class: "size-4",
                        "aria-hidden": "true"
                      }, null, _parent3, _scopeId2));
                    }
                    _push3(`</span><div class="min-w-0"${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(unref(confirmAction).item.opnameDate)}</p><p class="mt-1 line-clamp-2 text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(confirmAction).item.notes)}</p></div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(_sfc_main$4$2), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          type: "button",
                          variant: "outline",
                          disabled: unref(isConfirmLoading),
                          onClick: ($event) => isConfirmDialogOpen.value = false
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
                        _push4(ssrRenderComponent(unref(_sfc_main$3), {
                          type: "button",
                          variant: unref(confirmSubmitVariant),
                          disabled: unref(isConfirmLoading),
                          onClick: handleConfirmSubmit
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(isConfirmLoading)) {
                                _push5(ssrRenderComponent(unref(_sfc_main$a), { class: "size-4" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(` ${ssrInterpolate(unref(isConfirmLoading) ? "Memproses..." : unref(confirmSubmitLabel))}`);
                            } else {
                              return [
                                unref(isConfirmLoading) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                                  key: 0,
                                  class: "size-4"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(unref(isConfirmLoading) ? "Memproses..." : unref(confirmSubmitLabel)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$3), {
                            type: "button",
                            variant: "outline",
                            disabled: unref(isConfirmLoading),
                            onClick: ($event) => isConfirmDialogOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode(unref(_sfc_main$3), {
                            type: "button",
                            variant: unref(confirmSubmitVariant),
                            disabled: unref(isConfirmLoading),
                            onClick: handleConfirmSubmit
                          }, {
                            default: withCtx(() => [
                              unref(isConfirmLoading) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                                key: 0,
                                class: "size-4"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(unref(isConfirmLoading) ? "Memproses..." : unref(confirmSubmitLabel)), 1)
                            ]),
                            _: 1
                          }, 8, ["variant", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$3), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(confirmTitle)), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5$1), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(confirmDescription)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    unref(confirmAction) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "rounded-md border bg-muted/30 p-3"
                    }, [
                      createVNode("div", { class: "flex items-start gap-3" }, [
                        createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" }, [
                          unref(confirmAction).type === "complete" ? (openBlock(), createBlock(unref(CalendarDays), {
                            key: 0,
                            class: "size-4",
                            "aria-hidden": "true"
                          })) : unref(confirmAction).type === "apply" ? (openBlock(), createBlock(unref(Send), {
                            key: 1,
                            class: "size-4",
                            "aria-hidden": "true"
                          })) : unref(confirmAction).type === "delete" ? (openBlock(), createBlock(unref(Trash2), {
                            key: 2,
                            class: "size-4",
                            "aria-hidden": "true"
                          })) : (openBlock(), createBlock(unref(XCircle), {
                            key: 3,
                            class: "size-4",
                            "aria-hidden": "true"
                          }))
                        ]),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(confirmAction).item.opnameDate), 1),
                          createVNode("p", { class: "mt-1 line-clamp-2 text-sm text-muted-foreground" }, toDisplayString(unref(confirmAction).item.notes), 1)
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode(unref(_sfc_main$4$2), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$3), {
                          type: "button",
                          variant: "outline",
                          disabled: unref(isConfirmLoading),
                          onClick: ($event) => isConfirmDialogOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(unref(_sfc_main$3), {
                          type: "button",
                          variant: unref(confirmSubmitVariant),
                          disabled: unref(isConfirmLoading),
                          onClick: handleConfirmSubmit
                        }, {
                          default: withCtx(() => [
                            unref(isConfirmLoading) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                              key: 0,
                              class: "size-4"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(unref(isConfirmLoading) ? "Memproses..." : unref(confirmSubmitLabel)), 1)
                          ]),
                          _: 1
                        }, 8, ["variant", "disabled"])
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
              createVNode(unref(_sfc_main$6$1), { class: "sm:max-w-lg" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$1), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$3), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(confirmTitle)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5$1), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(confirmDescription)), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  unref(confirmAction) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-md border bg-muted/30 p-3"
                  }, [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode("span", { class: "flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary" }, [
                        unref(confirmAction).type === "complete" ? (openBlock(), createBlock(unref(CalendarDays), {
                          key: 0,
                          class: "size-4",
                          "aria-hidden": "true"
                        })) : unref(confirmAction).type === "apply" ? (openBlock(), createBlock(unref(Send), {
                          key: 1,
                          class: "size-4",
                          "aria-hidden": "true"
                        })) : unref(confirmAction).type === "delete" ? (openBlock(), createBlock(unref(Trash2), {
                          key: 2,
                          class: "size-4",
                          "aria-hidden": "true"
                        })) : (openBlock(), createBlock(unref(XCircle), {
                          key: 3,
                          class: "size-4",
                          "aria-hidden": "true"
                        }))
                      ]),
                      createVNode("div", { class: "min-w-0" }, [
                        createVNode("p", { class: "text-sm font-medium" }, toDisplayString(unref(confirmAction).item.opnameDate), 1),
                        createVNode("p", { class: "mt-1 line-clamp-2 text-sm text-muted-foreground" }, toDisplayString(unref(confirmAction).item.notes), 1)
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode(unref(_sfc_main$4$2), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$3), {
                        type: "button",
                        variant: "outline",
                        disabled: unref(isConfirmLoading),
                        onClick: ($event) => isConfirmDialogOpen.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"]),
                      createVNode(unref(_sfc_main$3), {
                        type: "button",
                        variant: unref(confirmSubmitVariant),
                        disabled: unref(isConfirmLoading),
                        onClick: handleConfirmSubmit
                      }, {
                        default: withCtx(() => [
                          unref(isConfirmLoading) ? (openBlock(), createBlock(unref(_sfc_main$a), {
                            key: 0,
                            class: "size-4"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(unref(isConfirmLoading) ? "Memproses..." : unref(confirmSubmitLabel)), 1)
                        ]),
                        _: 1
                      }, 8, ["variant", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/stock-opname.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=stock-opname-BQ_yFnhZ.mjs.map
