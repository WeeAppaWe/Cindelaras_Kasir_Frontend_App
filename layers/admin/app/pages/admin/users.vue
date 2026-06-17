<script setup lang="ts">
import type {
  AdminUserFormPayload,
  AdminUserOption,
  AdminUserViewItem,
} from '../../types/admin-user'
import type {
  AdminCrudDetailItem,
  AdminCrudField,
  AdminDataMetric as AdminDataMetricItem,
  AdminDataTableColumn,
  AdminDataTableRow,
} from '../../types/admin-management'
import { Plus, ShieldCheck, UserCog, Users } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { NativeSelect } from '#layers/base/app/components/ui/native-select'
import AdminDataMetric from '../../components/molecules/AdminDataMetric.vue'
import AdminDataToolbar from '../../components/molecules/AdminDataToolbar.vue'
import AdminPageHeader from '../../components/molecules/AdminPageHeader.vue'
import AdminCrudDialog from '../../components/organisms/AdminCrudDialog.vue'
import AdminDataTable from '../../components/organisms/AdminDataTable.vue'
import {
  createAdminUserCreatePayload,
  createAdminUserUpdatePayload,
  getAdminUserValidationMessage,
  mapAdminUserRecordToViewItem,
  mapAdminUserRoleOption,
  mapAdminUserStatusOption,
} from '../../utils/admin-user'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-only',
})

useHead({
  title: 'Manajemen Pengguna',
})

type CrudMode = 'create' | 'detail' | 'edit' | 'delete'

const adminUserApi = useAdminUserApi()
const { runAdminAction } = useAdminActionFeedback()
const search = ref('')
const roleFilter = ref('all')
const statusFilter = ref('all')
const isLoading = ref(false)
const isLookupLoading = ref(false)
const isCrudLoading = ref(false)
const isCrudDialogOpen = ref(false)
const crudMode = ref<CrudMode>('detail')
const loadError = ref('')
const lookupError = ref('')
const formError = ref('')
const totalRecordCount = ref(0)
const users = ref<AdminUserViewItem[]>([])
const roleOptions = ref<AdminUserOption[]>([])
const statusOptions = ref<AdminUserOption[]>([])
const selectedUser = ref<AdminUserViewItem | null>(null)
const selectedUserDetail = ref<AdminUserViewItem | null>(null)
const crudForm = ref<Record<string, string>>(createUserForm())

let searchTimer: ReturnType<typeof setTimeout> | null = null
let userRequestId = 0

const hasRequiredLookup = computed(() => roleOptions.value.length > 0 && statusOptions.value.length > 0)
const activeUsers = computed(() => users.value.filter(item => isNamedOption(item.statusName, 'ACTIVE')))
const adminUsers = computed(() => users.value.filter(item => isNamedOption(item.roleName, 'ADMIN')))
const usersWithoutLogin = computed(() => users.value.filter(item => item.lastLogin === '-'))
const hasSearchOrFilter = computed(() => {
  return Boolean(search.value.trim()) || roleFilter.value !== 'all' || statusFilter.value !== 'all'
})

const userFields = computed<AdminCrudField[]>(() => [
  {
    key: 'name',
    label: 'Nama Pengguna',
    placeholder: 'Contoh: Siti Nurhaliza',
    required: true,
  },
  {
    key: 'username',
    label: 'Username',
    placeholder: 'kasir_siti',
    required: true,
  },
  {
    key: 'password',
    label: crudMode.value === 'edit' ? 'Password Baru' : 'Password',
    type: 'password',
    placeholder: crudMode.value === 'edit' ? 'Kosongkan jika tidak diubah' : 'Minimal 6 karakter',
    required: crudMode.value === 'create',
  },
  {
    key: 'phoneNumber',
    label: 'Nomor Handphone',
    inputmode: 'tel',
    placeholder: '081122334455',
  },
  {
    key: 'roleId',
    label: 'Role',
    type: 'select',
    required: true,
    options: [
      { label: 'Pilih role', value: '' },
      ...roleOptions.value.map(option => ({
        label: option.label,
        value: option.id,
      })),
    ],
  },
  {
    key: 'statusId',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Pilih status', value: '' },
      ...statusOptions.value.map(option => ({
        label: option.label,
        value: option.id,
      })),
    ],
  },
])

const metrics = computed<AdminDataMetricItem[]>(() => [
  {
    id: 'total',
    label: 'Total Pengguna',
    value: String(totalRecordCount.value),
    helper: hasSearchOrFilter.value ? 'Dalam hasil filter' : 'Akun aktif backend',
    tone: 'info',
  },
  {
    id: 'admin',
    label: 'Admin',
    value: String(adminUsers.value.length),
    helper: 'Data termuat saat ini',
    tone: 'default',
  },
  {
    id: 'active',
    label: 'Akun Aktif',
    value: String(activeUsers.value.length),
    helper: `${usersWithoutLogin.value.length} belum login`,
    tone: 'success',
  },
])

const columns: AdminDataTableColumn[] = [
  { key: 'name', label: 'Pengguna', class: 'min-w-64' },
  { key: 'username', label: 'Username', class: 'min-w-40' },
  { key: 'role', label: 'Role', class: 'min-w-32' },
  { key: 'status', label: 'Status', class: 'min-w-32' },
  { key: 'phoneNumber', label: 'Handphone', class: 'min-w-40' },
  { key: 'lastLogin', label: 'Login Terakhir', class: 'min-w-40' },
]

const rows = computed<AdminDataTableRow[]>(() => users.value.map(item => ({
  id: item.id,
  cells: {
    name: {
      label: item.name,
      description: item.phoneNumberLabel !== '-' ? item.phoneNumberLabel : item.username,
    },
    username: {
      label: item.username,
      monospace: true,
    },
    role: {
      label: item.roleLabel,
      tone: item.roleTone,
    },
    status: {
      label: item.statusLabel,
      tone: item.statusTone,
    },
    phoneNumber: item.phoneNumberLabel,
    lastLogin: item.lastLogin,
  },
})))

const dialogTitle = computed(() => {
  if (crudMode.value === 'create') {
    return 'Tambah Pengguna'
  }

  if (crudMode.value === 'edit') {
    return 'Ubah Pengguna'
  }

  if (crudMode.value === 'delete') {
    return 'Hapus Pengguna'
  }

  return 'Detail Pengguna'
})
const dialogDescription = computed(() => {
  if (crudMode.value === 'delete') {
    return 'Pengguna akan dihapus secara soft delete agar riwayat transaksi tetap aman.'
  }

  if (crudMode.value === 'detail') {
    return isCrudLoading.value ? 'Memuat detail pengguna...' : 'Informasi akun pengguna yang tercatat di backend.'
  }

  if (crudMode.value === 'edit') {
    return 'Kosongkan password jika tidak perlu reset sandi pengguna.'
  }

  return 'Role dan status diambil dari master backend. Password tidak pernah ditampilkan ulang.'
})
const detailItems = computed<AdminCrudDetailItem[]>(() => {
  const item = selectedUserDetail.value ?? selectedUser.value

  if (!item) {
    return []
  }

  return [
    { label: 'Nama', value: item.name },
    { label: 'Username', value: item.username, monospace: true },
    { label: 'Nomor Handphone', value: item.phoneNumberLabel },
    { label: 'Role', value: item.roleLabel, tone: item.roleTone },
    { label: 'Status', value: item.statusLabel, tone: item.statusTone },
    { label: 'Login Terakhir', value: item.lastLogin },
    { label: 'Dibuat', value: item.createdAt, description: 'Waktu pendaftaran akun.' },
    { label: 'Diperbarui', value: item.updatedAt, description: item.hasBeenUpdated ? 'Data pernah diperbarui.' : 'Belum ada perubahan setelah dibuat.' },
  ]
})

onMounted(() => {
  loadInitialData()
})

onBeforeUnmount(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
})

watch(search, () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    loadUsers()
  }, 300)
})

watch([roleFilter, statusFilter], () => {
  loadUsers()
})

watch(crudForm, () => {
  formError.value = ''
}, { deep: true })

async function loadInitialData() {
  await Promise.all([
    loadUserLookups(),
    loadUsers(),
  ])
}

async function loadUserLookups() {
  isLookupLoading.value = true
  lookupError.value = ''

  try {
    const [roles, statuses] = await Promise.all([
      adminUserApi.getRoles(),
      adminUserApi.getStatuses(),
    ])

    roleOptions.value = Array.isArray(roles) ? roles.map(mapAdminUserRoleOption) : []
    statusOptions.value = Array.isArray(statuses) ? statuses.map(mapAdminUserStatusOption) : []
  }
  catch (error) {
    lookupError.value = getErrorMessage(error, 'Gagal memuat pilihan role dan status pengguna.')
    roleOptions.value = []
    statusOptions.value = []
  }
  finally {
    isLookupLoading.value = false
  }
}

async function loadUsers() {
  const requestId = ++userRequestId
  isLoading.value = true
  loadError.value = ''

  try {
    const result = await adminUserApi.getUsers({
      batch: 1,
      size: 100,
      search: search.value.trim() || undefined,
      role_id: roleFilter.value === 'all' ? undefined : roleFilter.value,
      user_status_id: statusFilter.value === 'all' ? undefined : statusFilter.value,
    })
    const records = Array.isArray(result.records) ? result.records : []

    if (requestId !== userRequestId) {
      return
    }

    users.value = records.map(mapAdminUserRecordToViewItem)
    totalRecordCount.value = result.page?.total_record_count ?? records.length
  }
  catch (error) {
    if (requestId !== userRequestId) {
      return
    }

    loadError.value = getErrorMessage(error, 'Gagal memuat daftar pengguna.')
    users.value = []
    totalRecordCount.value = 0
  }
  finally {
    if (requestId === userRequestId) {
      isLoading.value = false
    }
  }
}

function createUserForm(item?: AdminUserViewItem): Record<string, string> {
  return {
    name: item?.name ?? '',
    username: item?.username ?? '',
    password: '',
    phoneNumber: item?.phoneNumber ?? '',
    roleId: item?.roleId ?? getDefaultRoleId(),
    statusId: item?.statusId ?? getDefaultStatusId(),
  }
}

function createUserPayload(): AdminUserFormPayload | null {
  const payload = {
    name: crudForm.value.name ?? '',
    username: crudForm.value.username ?? '',
    password: crudForm.value.password ?? '',
    phoneNumber: crudForm.value.phoneNumber ?? '',
    roleId: crudForm.value.roleId ?? '',
    statusId: crudForm.value.statusId ?? '',
  }
  const validationMessage = getAdminUserValidationMessage(payload, crudMode.value === 'create' ? 'create' : 'edit')

  if (validationMessage) {
    formError.value = validationMessage
    return null
  }

  return payload
}

function findUser(id: string) {
  return users.value.find(item => item.id === id) ?? null
}

function openCreateDialog() {
  selectedUser.value = null
  selectedUserDetail.value = null
  formError.value = getLookupGuardMessage()
  crudMode.value = 'create'
  crudForm.value = createUserForm()
  isCrudDialogOpen.value = true
}

async function openDetailDialog(id: string) {
  const item = findUser(id)

  if (!item) {
    return
  }

  selectedUser.value = item
  selectedUserDetail.value = item
  formError.value = ''
  crudMode.value = 'detail'
  isCrudDialogOpen.value = true
  isCrudLoading.value = true

  try {
    const detail = await adminUserApi.getUserDetail(id)
    selectedUserDetail.value = mapAdminUserRecordToViewItem(detail)
  }
  catch {
    selectedUserDetail.value = item
  }
  finally {
    isCrudLoading.value = false
  }
}

function openEditDialog(id: string) {
  const item = findUser(id)

  if (!item) {
    return
  }

  selectedUser.value = item
  selectedUserDetail.value = item
  formError.value = getLookupGuardMessage()
  crudMode.value = 'edit'
  crudForm.value = createUserForm(item)
  isCrudDialogOpen.value = true
}

function openDeleteDialog(id: string) {
  selectedUser.value = findUser(id)
  selectedUserDetail.value = selectedUser.value
  formError.value = ''
  crudMode.value = 'delete'
  isCrudDialogOpen.value = Boolean(selectedUser.value)
}

async function handleCrudSubmit() {
  const payload = createUserPayload()

  if (!payload || !hasRequiredLookup.value) {
    formError.value ||= getLookupGuardMessage()
    return
  }

  const successMessage = crudMode.value === 'create'
    ? 'Pengguna berhasil ditambahkan.'
    : 'Pengguna berhasil diperbarui.'

  const succeeded = await runAdminAction(async () => {
    if (crudMode.value === 'create') {
      await adminUserApi.createUser(createAdminUserCreatePayload(payload))
      await loadUsers()
      return
    }

    if (crudMode.value === 'edit' && selectedUser.value) {
      await adminUserApi.updateUser(selectedUser.value.id, createAdminUserUpdatePayload(payload))
      await loadUsers()
    }
  }, {
    loading: isCrudLoading,
    successMessage,
    errorMessage: 'Gagal menyimpan pengguna.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
}

async function handleDelete() {
  if (!selectedUser.value) {
    return
  }

  const succeeded = await runAdminAction(async () => {
    await adminUserApi.deleteUser(selectedUser.value!.id)
    await loadUsers()
  }, {
    loading: isCrudLoading,
    successMessage: 'Pengguna berhasil dihapus.',
    errorMessage: 'Gagal menghapus pengguna.',
  })

  if (succeeded) {
    isCrudDialogOpen.value = false
  }
}

function getDefaultRoleId() {
  return findOptionByName(roleOptions.value, 'CASHIER')?.id ?? roleOptions.value[0]?.id ?? ''
}

function getDefaultStatusId() {
  return findOptionByName(statusOptions.value, 'ACTIVE')?.id ?? statusOptions.value[0]?.id ?? ''
}

function findOptionByName(options: AdminUserOption[], name: string) {
  return options.find(option => isNamedOption(option.name, name))
}

function isNamedOption(value: string, name: string) {
  return value.trim().toUpperCase() === name
}

function getLookupGuardMessage() {
  if (hasRequiredLookup.value) {
    return ''
  }

  return lookupError.value || 'Pilihan role dan status belum tersedia.'
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
</script>

<template>
  <div class="flex min-h-full flex-col gap-3 p-3 sm:p-4">
    <AdminPageHeader
      title="Manajemen Pengguna"
      description="Kelola akun admin dan kasir, status akses, serta reset password pengguna."
    />

    <section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan pengguna">
      <AdminDataMetric v-for="item in metrics" :key="item.id" v-bind="item">
        <template #icon>
          <Users v-if="item.id === 'total'" class="size-4" aria-hidden="true" />
          <ShieldCheck v-else-if="item.id === 'admin'" class="size-4" aria-hidden="true" />
          <UserCog v-else class="size-4" aria-hidden="true" />
        </template>
      </AdminDataMetric>
    </section>

    <section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="user-table-title">
      <div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h2 id="user-table-title" class="text-base font-semibold tracking-normal">
            Daftar Pengguna
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Pencarian mencakup nama dan username. Filter role dan status mengikuti master backend.
          </p>
        </div>
      </div>

      <div v-if="loadError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ loadError }}
      </div>

      <div v-if="lookupError" class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
        {{ lookupError }}
      </div>

      <AdminDataToolbar
        v-model="search"
        search-id="user-search"
        search-label="Cari pengguna"
        search-placeholder="Cari nama atau username"
        :disabled="isLoading"
      >
        <template #filters>
          <div>
            <label for="user-role-filter" class="sr-only">Filter role pengguna</label>
            <NativeSelect
              id="user-role-filter"
              v-model="roleFilter"
              class="w-36"
              :disabled="isLoading || isLookupLoading"
            >
              <option value="all">Semua role</option>
              <option
                v-for="option in roleOptions"
                :key="option.id"
                :value="option.id"
              >
                {{ option.label }}
              </option>
            </NativeSelect>
          </div>

          <div>
            <label for="user-status-filter" class="sr-only">Filter status pengguna</label>
            <NativeSelect
              id="user-status-filter"
              v-model="statusFilter"
              class="w-40"
              :disabled="isLoading || isLookupLoading"
            >
              <option value="all">Semua status</option>
              <option
                v-for="option in statusOptions"
                :key="option.id"
                :value="option.id"
              >
                {{ option.label }}
              </option>
            </NativeSelect>
          </div>
        </template>

        <template #action>
          <Button
            type="button"
            size="sm"
            :disabled="isLoading || isLookupLoading || !hasRequiredLookup"
            @click="openCreateDialog"
          >
            <Plus class="size-4" aria-hidden="true" />
            Tambah Pengguna
          </Button>
        </template>
      </AdminDataToolbar>

      <div class="mt-3">
        <AdminDataTable
          :columns="columns"
          :rows="rows"
          :loading="isLoading"
          label="pengguna"
          empty-title="Pengguna tidak ditemukan"
          empty-description="Ubah kata kunci, role, atau status pengguna."
          @view="openDetailDialog"
          @edit="openEditDialog"
          @delete="openDeleteDialog"
        />
      </div>
    </section>

    <AdminCrudDialog
      v-model:open="isCrudDialogOpen"
      v-model:form="crudForm"
      :mode="crudMode"
      :title="dialogTitle"
      :description="dialogDescription"
      :fields="userFields"
      :detail-items="detailItems"
      :target-name="selectedUser?.name"
      :submit-label="crudMode === 'edit' ? 'Simpan / Reset Password' : undefined"
      :loading="isCrudLoading"
      :form-error="formError"
      @submit="handleCrudSubmit"
      @delete="handleDelete"
    />
  </div>
</template>
