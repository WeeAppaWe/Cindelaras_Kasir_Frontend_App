<script setup lang="ts">
import { toast } from 'vue-sonner'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '#layers/base/app/components/ui/sidebar'
import { Toaster } from '#layers/base/app/components/ui/sonner'
import CashierDateTime from '../components/molecules/CashierDateTime.vue'
import CashierCloseShiftDialog from '../components/organisms/CashierCloseShiftDialog.vue'
import CashierOpenShiftDialog from '../components/organisms/CashierOpenShiftDialog.vue'
import CashierSidebar from '../components/organisms/CashierSidebar.vue'

const { logout, user } = useAuth()
const {
  activeShift,
  cashSalesTotal,
  closeShift,
  expectedCashTotal,
  formatCurrency,
  hasLoadedShiftStatus,
  isShiftStatusLoading,
  loadActiveShift,
  loadActiveShiftSummary,
  shiftRevenue,
} = useCashierStore()
const { consumeFlashToast, setFlashToast } = useFlashToast()
const { loadPublicStoreProfile } = usePublicStoreProfile()

const isCloseShiftDialogOpen = ref(false)
const isLoggingOut = ref(false)
const isShiftBootstrapping = ref(true)
const sidebarCookie = useCookie<string | null>('sidebar_state')
const isSidebarOpen = useState<boolean>('cashier:sidebar-open', () => sidebarCookie.value !== 'false')
const shouldShowOpenShiftDialog = computed(() => (
  hasLoadedShiftStatus.value
  && !isShiftBootstrapping.value
  && !isShiftStatusLoading.value
  && !activeShift.value
  && !isLoggingOut.value
))

if (sidebarCookie.value === 'false') {
  isSidebarOpen.value = false
}

onMounted(async () => {
  consumeFlashToast()
  void loadPublicStoreProfile()

  try {
    await loadActiveShift({ force: true })
  }
  catch (error) {
    toast.error(getErrorMessage(error, 'Gagal mengecek shift aktif.'))
  }
  finally {
    isShiftBootstrapping.value = false
  }
})

async function handleRequestLogout() {
  if (isLoggingOut.value) {
    return
  }

  if (!activeShift.value) {
    isLoggingOut.value = true
    try {
      setFlashToast({
        type: 'success',
        title: 'Logout kasir berhasil',
        description: `${user.value?.name ?? 'Kasir'} sudah keluar dari area kasir.`,
      })
      await logout()
    }
    finally {
      isLoggingOut.value = false
    }
    return
  }

  isLoggingOut.value = true
  try {
    await loadActiveShiftSummary()
    isCloseShiftDialogOpen.value = true
  }
  catch (error) {
    toast.error(getErrorMessage(error, 'Gagal mengambil ringkasan shift.'))
  }
  finally {
    isLoggingOut.value = false
  }
}

async function handleCloseShift(payload: { physicalCash: number, notes?: string }) {
  if (isLoggingOut.value) {
    return
  }

  isLoggingOut.value = true
  try {
    const closedShift = await closeShift(payload.physicalCash, payload.notes)
    isCloseShiftDialogOpen.value = false
    setFlashToast({
      type: 'success',
      title: 'Shift ditutup dan logout berhasil',
      description: `${user.value?.name ?? 'Kasir'} keluar. Selisih kas ${formatCurrency(closedShift.difference)}.`,
    })
    await logout()
  }
  catch (error) {
    toast.error(getErrorMessage(error, 'Shift gagal ditutup.'))
  }
  finally {
    isLoggingOut.value = false
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
</script>

<template>
  <SidebarProvider v-model:open="isSidebarOpen" class="cashier-blue-sidebar h-dvh min-h-dvh overflow-hidden">
    <a
      href="#cashier-main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring"
    >
      Lewati menu kasir
    </a>

    <CashierSidebar @request-logout="handleRequestLogout" />

    <SidebarInset id="cashier-main-content" class="h-dvh min-h-0 overflow-hidden">
      <header class="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background px-3 sm:px-4">
        <div class="flex min-w-0 items-center gap-2">
          <SidebarTrigger
            class="h-8 w-8"
            label="Buka atau tutup menu kasir"
            title="Buka atau tutup menu kasir"
          />
          <div class="min-w-0">
            <p class="truncate text-sm font-medium">
              {{ user?.name ?? 'Kasir' }}
            </p>
            <p class="truncate text-xs text-muted-foreground">
              Area kerja kasir
            </p>
          </div>
        </div>

        <div class="flex shrink-0 items-center gap-2">
          <CashierDateTime />
        </div>
      </header>

      <div class="cashier-scrollbar min-h-0 flex-1 overflow-y-auto bg-muted/50">
        <slot />
      </div>
    </SidebarInset>

    <CashierOpenShiftDialog
      :open="shouldShowOpenShiftDialog"
    />

    <CashierCloseShiftDialog
      v-model:open="isCloseShiftDialogOpen"
      :opening-cash="activeShift?.openingCash ?? 0"
      :sales-total="shiftRevenue"
      :cash-sales-total="cashSalesTotal"
      :expected-cash="expectedCashTotal"
      :submitting="isLoggingOut"
      @submit="handleCloseShift"
    />

    <Toaster rich-colors close-button position="top-right" />
  </SidebarProvider>
</template>
