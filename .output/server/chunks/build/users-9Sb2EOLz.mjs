import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, openBlock, createBlock, isRef, createVNode, createTextVNode, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { Users, ShieldCheck, UserCog, Plus } from 'lucide-vue-next';
import { _ as _sfc_main$1 } from './index-BZG70idc.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';
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
import './Spinner-nalFRPxS.mjs';
import './index-DSBdqIS4.mjs';
import './DialogTrigger-B5C6UhMx.mjs';
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
function mapAdminUserRecordToViewItem(record) {
  const roleName = record.role?.name ?? "-";
  const statusName = record.user_status?.name ?? "-";
  const phoneNumber = record.phone_number?.trim() ?? "";
  return {
    id: record.user_id,
    name: record.name,
    username: record.username,
    phoneNumber,
    phoneNumberLabel: phoneNumber || "-",
    roleId: record.role?.role_id ?? "",
    roleName,
    roleLabel: formatAdminUserRoleName(roleName),
    roleTone: getAdminUserRoleTone(roleName),
    statusId: record.user_status?.user_status_id ?? "",
    statusName,
    statusLabel: formatAdminUserStatusName(statusName),
    statusTone: getAdminUserStatusTone(statusName),
    lastLogin: formatAdminUserDateTime(record.last_login),
    createdAt: formatAdminUserDateTime(record.created_at),
    updatedAt: formatAdminUserDateTime(record.updated_at),
    hasBeenUpdated: Boolean(record.updated_at)
  };
}
function createAdminUserCreatePayload(payload) {
  return {
    username: payload.username.trim(),
    password: payload.password,
    name: payload.name.trim(),
    role_id: payload.roleId,
    user_status_id: payload.statusId || void 0,
    phone_number: payload.phoneNumber.trim() || null
  };
}
function createAdminUserUpdatePayload(payload) {
  const updatePayload = {
    username: payload.username.trim(),
    name: payload.name.trim(),
    role_id: payload.roleId,
    user_status_id: payload.statusId,
    phone_number: payload.phoneNumber.trim() || null
  };
  if (payload.password) {
    updatePayload.password = payload.password;
  }
  return updatePayload;
}
function getAdminUserValidationMessage(payload, mode) {
  const name = payload.name.trim();
  const username = payload.username.trim();
  const password = payload.password;
  const phoneNumber = payload.phoneNumber.trim();
  if (!name) {
    return "Nama pengguna wajib diisi.";
  }
  if (name.length < 2) {
    return "Nama pengguna minimal 2 karakter.";
  }
  if (name.length > 100) {
    return "Nama pengguna maksimal 100 karakter.";
  }
  if (!username) {
    return "Username wajib diisi.";
  }
  if (username.length < 3) {
    return "Username minimal 3 karakter.";
  }
  if (username.length > 50) {
    return "Username maksimal 50 karakter.";
  }
  if (!/^\w+$/.test(username)) {
    return "Username hanya boleh berisi huruf, angka, dan underscore.";
  }
  if (mode === "create" && !password) {
    return "Password wajib diisi.";
  }
  if (password && password.length < 6) {
    return "Password minimal 6 karakter.";
  }
  if (phoneNumber && (phoneNumber.length < 9 || phoneNumber.length > 20)) {
    return "Nomor handphone harus 9 sampai 20 karakter.";
  }
  if (!payload.roleId) {
    return "Role pengguna wajib dipilih.";
  }
  if (!payload.statusId) {
    return "Status pengguna wajib dipilih.";
  }
  return "";
}
function formatAdminUserRoleName(value) {
  const normalized = value.trim().toUpperCase();
  if (normalized === "ADMIN") {
    return "Admin";
  }
  if (normalized === "CASHIER") {
    return "Kasir";
  }
  return value || "-";
}
function formatAdminUserStatusName(value) {
  const normalized = value.trim().toUpperCase();
  if (normalized === "ACTIVE") {
    return "Aktif";
  }
  if (normalized === "INACTIVE") {
    return "Nonaktif";
  }
  if (normalized === "DELETED") {
    return "Dihapus";
  }
  return value || "-";
}
function getAdminUserRoleTone(value) {
  return value.trim().toUpperCase() === "ADMIN" ? "info" : "default";
}
function getAdminUserStatusTone(value) {
  const normalized = value.trim().toUpperCase();
  if (normalized === "ACTIVE") {
    return "success";
  }
  if (normalized === "INACTIVE") {
    return "warning";
  }
  if (normalized === "DELETED") {
    return "destructive";
  }
  return "default";
}
function formatAdminUserDateTime(value) {
  if (!value) {
    return "-";
  }
  if (/^\d{2}:\d{2}(:\d{2})?$/.test(value)) {
    return value.slice(0, 5);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return dateFormatter.format(date);
}
function useAdminUserApi() {
  const api = useApiClient();
  async function getRoles() {
    const payload = await api.get(apiEndpoints.user.roles);
    return extractApiPayload(payload);
  }
  async function getStatuses() {
    const payload = await api.get(apiEndpoints.user.statuses);
    return extractApiPayload(payload);
  }
  async function getUsers(query = {}) {
    const payload = await api.get(apiEndpoints.user.list, {
      query: normalizeQuery(query)
    });
    return extractApiPayload(payload);
  }
  async function getUserDetail(userId) {
    const payload = await api.get(apiEndpoints.user.detail(userId));
    return extractApiPayload(payload);
  }
  async function createUser(payload) {
    const result = await api.post(apiEndpoints.user.create, payload);
    return extractApiPayload(result);
  }
  async function updateUser(userId, payload) {
    const result = await api.patch(
      apiEndpoints.user.update(userId),
      payload
    );
    return extractApiPayload(result);
  }
  async function deleteUser(userId) {
    const payload = await api.delete(apiEndpoints.user.remove(userId));
    return extractApiPayload(payload);
  }
  return {
    getRoles,
    getStatuses,
    getUsers,
    getUserDetail,
    createUser,
    updateUser,
    deleteUser
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
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Manajemen Pengguna"
    });
    const adminUserApi = useAdminUserApi();
    const { runAdminAction } = useAdminActionFeedback();
    const search = ref("");
    const roleFilter = ref("all");
    const statusFilter = ref("all");
    const isLoading = ref(false);
    const isLookupLoading = ref(false);
    const isCrudLoading = ref(false);
    const isCrudDialogOpen = ref(false);
    const crudMode = ref("detail");
    const loadError = ref("");
    const lookupError = ref("");
    const formError = ref("");
    const totalRecordCount = ref(0);
    const users = ref([]);
    const roleOptions = ref([]);
    const statusOptions = ref([]);
    const selectedUser = ref(null);
    const selectedUserDetail = ref(null);
    const crudForm = ref(createUserForm());
    let searchTimer = null;
    let userRequestId = 0;
    const hasRequiredLookup = computed(() => roleOptions.value.length > 0 && statusOptions.value.length > 0);
    const activeUsers = computed(() => users.value.filter((item) => isNamedOption(item.statusName, "ACTIVE")));
    const adminUsers = computed(() => users.value.filter((item) => isNamedOption(item.roleName, "ADMIN")));
    const usersWithoutLogin = computed(() => users.value.filter((item) => item.lastLogin === "-"));
    const hasSearchOrFilter = computed(() => {
      return Boolean(search.value.trim()) || roleFilter.value !== "all" || statusFilter.value !== "all";
    });
    const userFields = computed(() => [
      {
        key: "name",
        label: "Nama Pengguna",
        placeholder: "Contoh: Siti Nurhaliza",
        required: true
      },
      {
        key: "username",
        label: "Username",
        placeholder: "kasir_siti",
        required: true
      },
      {
        key: "password",
        label: crudMode.value === "edit" ? "Password Baru" : "Password",
        type: "password",
        placeholder: crudMode.value === "edit" ? "Kosongkan jika tidak diubah" : "Minimal 6 karakter",
        required: crudMode.value === "create"
      },
      {
        key: "phoneNumber",
        label: "Nomor Handphone",
        inputmode: "tel",
        placeholder: "081122334455"
      },
      {
        key: "roleId",
        label: "Role",
        type: "select",
        required: true,
        options: [
          { label: "Pilih role", value: "" },
          ...roleOptions.value.map((option) => ({
            label: option.label,
            value: option.id
          }))
        ]
      },
      {
        key: "statusId",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Pilih status", value: "" },
          ...statusOptions.value.map((option) => ({
            label: option.label,
            value: option.id
          }))
        ]
      }
    ]);
    const metrics = computed(() => [
      {
        id: "total",
        label: "Total Pengguna",
        value: String(totalRecordCount.value),
        helper: hasSearchOrFilter.value ? "Dalam hasil filter" : "Akun aktif backend",
        tone: "info"
      },
      {
        id: "admin",
        label: "Admin",
        value: String(adminUsers.value.length),
        helper: "Data termuat saat ini",
        tone: "default"
      },
      {
        id: "active",
        label: "Akun Aktif",
        value: String(activeUsers.value.length),
        helper: `${usersWithoutLogin.value.length} belum login`,
        tone: "success"
      }
    ]);
    const columns = [
      { key: "name", label: "Pengguna", class: "min-w-64" },
      { key: "username", label: "Username", class: "min-w-40" },
      { key: "role", label: "Role", class: "min-w-32" },
      { key: "status", label: "Status", class: "min-w-32" },
      { key: "phoneNumber", label: "Handphone", class: "min-w-40" },
      { key: "lastLogin", label: "Login Terakhir", class: "min-w-40" }
    ];
    const rows = computed(() => users.value.map((item) => ({
      id: item.id,
      cells: {
        name: {
          label: item.name,
          description: item.phoneNumberLabel !== "-" ? item.phoneNumberLabel : item.username
        },
        username: {
          label: item.username,
          monospace: true
        },
        role: {
          label: item.roleLabel,
          tone: item.roleTone
        },
        status: {
          label: item.statusLabel,
          tone: item.statusTone
        },
        phoneNumber: item.phoneNumberLabel,
        lastLogin: item.lastLogin
      }
    })));
    const dialogTitle = computed(() => {
      if (crudMode.value === "create") {
        return "Tambah Pengguna";
      }
      if (crudMode.value === "edit") {
        return "Ubah Pengguna";
      }
      if (crudMode.value === "delete") {
        return "Hapus Pengguna";
      }
      return "Detail Pengguna";
    });
    const dialogDescription = computed(() => {
      if (crudMode.value === "delete") {
        return "Pengguna akan dihapus secara soft delete agar riwayat transaksi tetap aman.";
      }
      if (crudMode.value === "detail") {
        return isCrudLoading.value ? "Memuat detail pengguna..." : "Informasi akun pengguna yang tercatat di backend.";
      }
      if (crudMode.value === "edit") {
        return "Kosongkan password jika tidak perlu reset sandi pengguna.";
      }
      return "Role dan status diambil dari master backend. Password tidak pernah ditampilkan ulang.";
    });
    const detailItems = computed(() => {
      const item = selectedUserDetail.value ?? selectedUser.value;
      if (!item) {
        return [];
      }
      return [
        { label: "Nama", value: item.name },
        { label: "Username", value: item.username, monospace: true },
        { label: "Nomor Handphone", value: item.phoneNumberLabel },
        { label: "Role", value: item.roleLabel, tone: item.roleTone },
        { label: "Status", value: item.statusLabel, tone: item.statusTone },
        { label: "Login Terakhir", value: item.lastLogin },
        { label: "Dibuat", value: item.createdAt, description: "Waktu pendaftaran akun." },
        { label: "Diperbarui", value: item.updatedAt, description: item.hasBeenUpdated ? "Data pernah diperbarui." : "Belum ada perubahan setelah dibuat." }
      ];
    });
    watch(search, () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
      searchTimer = setTimeout(() => {
        loadUsers();
      }, 300);
    });
    watch([roleFilter, statusFilter], () => {
      loadUsers();
    });
    watch(crudForm, () => {
      formError.value = "";
    }, { deep: true });
    async function loadUsers() {
      const requestId = ++userRequestId;
      isLoading.value = true;
      loadError.value = "";
      try {
        const result = await adminUserApi.getUsers({
          batch: 1,
          size: 100,
          search: search.value.trim() || void 0,
          role_id: roleFilter.value === "all" ? void 0 : roleFilter.value,
          user_status_id: statusFilter.value === "all" ? void 0 : statusFilter.value
        });
        const records = Array.isArray(result.records) ? result.records : [];
        if (requestId !== userRequestId) {
          return;
        }
        users.value = records.map(mapAdminUserRecordToViewItem);
        totalRecordCount.value = result.page?.total_record_count ?? records.length;
      } catch (error) {
        if (requestId !== userRequestId) {
          return;
        }
        loadError.value = getErrorMessage(error, "Gagal memuat daftar pengguna.");
        users.value = [];
        totalRecordCount.value = 0;
      } finally {
        if (requestId === userRequestId) {
          isLoading.value = false;
        }
      }
    }
    function createUserForm(item) {
      return {
        name: item?.name ?? "",
        username: item?.username ?? "",
        password: "",
        phoneNumber: item?.phoneNumber ?? "",
        roleId: item?.roleId ?? getDefaultRoleId(),
        statusId: item?.statusId ?? getDefaultStatusId()
      };
    }
    function createUserPayload() {
      const payload = {
        name: crudForm.value.name ?? "",
        username: crudForm.value.username ?? "",
        password: crudForm.value.password ?? "",
        phoneNumber: crudForm.value.phoneNumber ?? "",
        roleId: crudForm.value.roleId ?? "",
        statusId: crudForm.value.statusId ?? ""
      };
      const validationMessage = getAdminUserValidationMessage(payload, crudMode.value === "create" ? "create" : "edit");
      if (validationMessage) {
        formError.value = validationMessage;
        return null;
      }
      return payload;
    }
    function findUser(id) {
      return users.value.find((item) => item.id === id) ?? null;
    }
    function openCreateDialog() {
      selectedUser.value = null;
      selectedUserDetail.value = null;
      formError.value = getLookupGuardMessage();
      crudMode.value = "create";
      crudForm.value = createUserForm();
      isCrudDialogOpen.value = true;
    }
    async function openDetailDialog(id) {
      const item = findUser(id);
      if (!item) {
        return;
      }
      selectedUser.value = item;
      selectedUserDetail.value = item;
      formError.value = "";
      crudMode.value = "detail";
      isCrudDialogOpen.value = true;
      isCrudLoading.value = true;
      try {
        const detail = await adminUserApi.getUserDetail(id);
        selectedUserDetail.value = mapAdminUserRecordToViewItem(detail);
      } catch {
        selectedUserDetail.value = item;
      } finally {
        isCrudLoading.value = false;
      }
    }
    function openEditDialog(id) {
      const item = findUser(id);
      if (!item) {
        return;
      }
      selectedUser.value = item;
      selectedUserDetail.value = item;
      formError.value = getLookupGuardMessage();
      crudMode.value = "edit";
      crudForm.value = createUserForm(item);
      isCrudDialogOpen.value = true;
    }
    function openDeleteDialog(id) {
      selectedUser.value = findUser(id);
      selectedUserDetail.value = selectedUser.value;
      formError.value = "";
      crudMode.value = "delete";
      isCrudDialogOpen.value = Boolean(selectedUser.value);
    }
    async function handleCrudSubmit() {
      const payload = createUserPayload();
      if (!payload || !hasRequiredLookup.value) {
        formError.value ||= getLookupGuardMessage();
        return;
      }
      const successMessage = crudMode.value === "create" ? "Pengguna berhasil ditambahkan." : "Pengguna berhasil diperbarui.";
      const succeeded = await runAdminAction(async () => {
        if (crudMode.value === "create") {
          await adminUserApi.createUser(createAdminUserCreatePayload(payload));
          await loadUsers();
          return;
        }
        if (crudMode.value === "edit" && selectedUser.value) {
          await adminUserApi.updateUser(selectedUser.value.id, createAdminUserUpdatePayload(payload));
          await loadUsers();
        }
      }, {
        loading: isCrudLoading,
        successMessage,
        errorMessage: "Gagal menyimpan pengguna."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
      }
    }
    async function handleDelete() {
      if (!selectedUser.value) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        await adminUserApi.deleteUser(selectedUser.value.id);
        await loadUsers();
      }, {
        loading: isCrudLoading,
        successMessage: "Pengguna berhasil dihapus.",
        errorMessage: "Gagal menghapus pengguna."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
      }
    }
    function getDefaultRoleId() {
      return findOptionByName(roleOptions.value, "CASHIER")?.id ?? roleOptions.value[0]?.id ?? "";
    }
    function getDefaultStatusId() {
      return findOptionByName(statusOptions.value, "ACTIVE")?.id ?? statusOptions.value[0]?.id ?? "";
    }
    function findOptionByName(options, name) {
      return options.find((option) => isNamedOption(option.name, name));
    }
    function isNamedOption(value, name) {
      return value.trim().toUpperCase() === name;
    }
    function getLookupGuardMessage() {
      if (hasRequiredLookup.value) {
        return "";
      }
      return lookupError.value || "Pilihan role dan status belum tersedia.";
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
        title: "Manajemen Pengguna",
        description: "Kelola akun admin dan kasir, status akses, serta reset password pengguna."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan pengguna"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.id === "total") {
                _push2(ssrRenderComponent(unref(Users), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else if (item.id === "admin") {
                _push2(ssrRenderComponent(unref(ShieldCheck), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(UserCog), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              }
            } else {
              return [
                item.id === "total" ? (openBlock(), createBlock(unref(Users), {
                  key: 0,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : item.id === "admin" ? (openBlock(), createBlock(unref(ShieldCheck), {
                  key: 1,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : (openBlock(), createBlock(unref(UserCog), {
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
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="user-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="user-table-title" class="text-base font-semibold tracking-normal"> Daftar Pengguna </h2><p class="mt-1 text-sm text-muted-foreground"> Pencarian mencakup nama dan username. Filter role dan status mengikuti master backend. </p></div></div>`);
      if (unref(loadError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(lookupError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(lookupError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "user-search",
        "search-label": "Cari pengguna",
        "search-placeholder": "Cari nama atau username",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="user-role-filter" class="sr-only"${_scopeId}>Filter role pengguna</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "user-role-filter",
              modelValue: unref(roleFilter),
              "onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
              class: "w-36",
              disabled: unref(isLoading) || unref(isLookupLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua role</option><!--[-->`);
                  ssrRenderList(unref(roleOptions), (option) => {
                    _push3(`<option${ssrRenderAttr("value", option.id)}${_scopeId2}>${ssrInterpolate(option.label)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua role"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(roleOptions), (option) => {
                      return openBlock(), createBlock("option", {
                        key: option.id,
                        value: option.id
                      }, toDisplayString(option.label), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="user-status-filter" class="sr-only"${_scopeId}>Filter status pengguna</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "user-status-filter",
              modelValue: unref(statusFilter),
              "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
              class: "w-40",
              disabled: unref(isLoading) || unref(isLookupLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua status</option><!--[-->`);
                  ssrRenderList(unref(statusOptions), (option) => {
                    _push3(`<option${ssrRenderAttr("value", option.id)}${_scopeId2}>${ssrInterpolate(option.label)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua status"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(statusOptions), (option) => {
                      return openBlock(), createBlock("option", {
                        key: option.id,
                        value: option.id
                      }, toDisplayString(option.label), 9, ["value"]);
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
                  for: "user-role-filter",
                  class: "sr-only"
                }, "Filter role pengguna"),
                createVNode(unref(_sfc_main$2), {
                  id: "user-role-filter",
                  modelValue: unref(roleFilter),
                  "onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
                  class: "w-36",
                  disabled: unref(isLoading) || unref(isLookupLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua role"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(roleOptions), (option) => {
                      return openBlock(), createBlock("option", {
                        key: option.id,
                        value: option.id
                      }, toDisplayString(option.label), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "user-status-filter",
                  class: "sr-only"
                }, "Filter status pengguna"),
                createVNode(unref(_sfc_main$2), {
                  id: "user-status-filter",
                  modelValue: unref(statusFilter),
                  "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                  class: "w-40",
                  disabled: unref(isLoading) || unref(isLookupLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua status"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(statusOptions), (option) => {
                      return openBlock(), createBlock("option", {
                        key: option.id,
                        value: option.id
                      }, toDisplayString(option.label), 9, ["value"]);
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
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              type: "button",
              size: "sm",
              disabled: unref(isLoading) || unref(isLookupLoading) || !unref(hasRequiredLookup),
              onClick: openCreateDialog
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tambah Pengguna `);
                } else {
                  return [
                    createVNode(unref(Plus), {
                      class: "size-4",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Tambah Pengguna ")
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
                disabled: unref(isLoading) || unref(isLookupLoading) || !unref(hasRequiredLookup),
                onClick: openCreateDialog
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), {
                    class: "size-4",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" Tambah Pengguna ")
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
        label: "pengguna",
        "empty-title": "Pengguna tidak ditemukan",
        "empty-description": "Ubah kata kunci, role, atau status pengguna.",
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
        fields: unref(userFields),
        "detail-items": unref(detailItems),
        "target-name": unref(selectedUser)?.name,
        "submit-label": unref(crudMode) === "edit" ? "Simpan / Reset Password" : void 0,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=users-9Sb2EOLz.mjs.map
