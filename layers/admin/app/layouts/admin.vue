<script setup lang="ts">
import { LogOut, ShieldAlert } from 'lucide-vue-next'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#layers/base/app/components/ui/alert-dialog'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '#layers/base/app/components/ui/sidebar'
import { Toaster } from '#layers/base/app/components/ui/sonner'
import { Spinner } from '#layers/base/app/components/ui/spinner'
import AdminDateTime from '../components/molecules/AdminDateTime.vue'
import AdminSidebar from '../components/organisms/AdminSidebar.vue'

const { logout, user } = useAuth()
const { consumeFlashToast, setFlashToast } = useFlashToast()
const { loadSystemProfile } = useAdminSystemProfile()

const isLogoutDialogOpen = ref(false)
const isLoggingOut = ref(false)
const sidebarCookie = useCookie<string | null>('sidebar_state')
const isSidebarOpen = useState<boolean>('admin:sidebar-open', () => sidebarCookie.value !== 'false')

if (sidebarCookie.value === 'false') {
  isSidebarOpen.value = false
}

onMounted(() => {
  consumeFlashToast()
  void loadSystemProfile()
})

async function handleRequestLogout() {
  if (isLoggingOut.value) {
    return
  }

  isLogoutDialogOpen.value = true
}

async function handleConfirmLogout() {
  if (isLoggingOut.value) {
    return
  }

  isLoggingOut.value = true

  try {
    setFlashToast({
      type: 'success',
      title: 'Logout admin berhasil',
      description: `${user.value?.name ?? 'Admin'} sudah keluar dari area admin.`,
    })
    await logout()
    isLogoutDialogOpen.value = false
  }
  finally {
    isLoggingOut.value = false
  }
}
</script>

<template>
  <SidebarProvider v-model:open="isSidebarOpen" class="admin-blue-sidebar h-dvh min-h-dvh overflow-hidden">
    <a
      href="#admin-main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring"
    >
      Lewati menu admin
    </a>

    <AdminSidebar
      :logging-out="isLoggingOut"
      @request-logout="handleRequestLogout"
    />

    <SidebarInset id="admin-main-content" class="h-dvh min-h-0 overflow-hidden">
      <header class="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background px-3 sm:px-4">
        <div class="flex min-w-0 items-center gap-2">
          <SidebarTrigger
            class="h-8 w-8"
            label="Buka atau tutup menu admin"
            title="Buka atau tutup menu admin"
          />
          <div class="min-w-0">
            <p class="truncate text-sm font-medium">
              {{ user?.name ?? 'Admin' }}
            </p>
            <p class="truncate text-xs text-muted-foreground">
              Area kerja admin
            </p>
          </div>
        </div>

        <div class="flex shrink-0 items-center gap-2">
          <div class="hidden sm:block">
            <AdminDateTime />
          </div>
        </div>
      </header>

      <div class="admin-scrollbar min-h-0 flex-1 overflow-y-auto bg-muted/50">
        <slot />
      </div>
    </SidebarInset>

    <Toaster rich-colors close-button position="top-right" />

    <AlertDialog v-model:open="isLogoutDialogOpen">
      <AlertDialogContent class="gap-0 overflow-hidden p-0 sm:max-w-md">
        <AlertDialogHeader class="border-b bg-muted/40 px-5 pt-5 pb-4 text-left">
          <div class="flex items-start gap-3">
            <span class="flex size-11 shrink-0 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 text-destructive">
              <ShieldAlert class="size-5" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <AlertDialogTitle>Keluar dari akun admin?</AlertDialogTitle>
              <AlertDialogDescription class="mt-1">
                Pastikan pekerjaan yang belum disimpan sudah selesai sebelum sesi admin diakhiri.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div class="space-y-4 px-5 py-5">
          <div class="rounded-md border bg-card p-3 text-card-foreground">
            <div class="flex items-center justify-between gap-3">
              <div class="min-w-0">
                <p class="text-xs font-medium text-muted-foreground">Sesi aktif</p>
                <p class="mt-1 truncate text-sm font-semibold">{{ user?.name ?? 'Admin' }}</p>
              </div>
              <span class="shrink-0 rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Administrator
              </span>
            </div>
          </div>

          <div class="rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-warning-foreground">
            Anda akan diarahkan ke halaman login dan perlu masuk kembali untuk mengakses area admin.
          </div>
        </div>

        <AlertDialogFooter class="border-t bg-muted/30 px-5 py-4 sm:grid sm:grid-cols-2 sm:justify-normal">
          <AlertDialogCancel class="h-10 w-full" :disabled="isLoggingOut">Tetap di Admin</AlertDialogCancel>
          <AlertDialogAction
            class="h-10 w-full bg-destructive text-white hover:bg-destructive/90"
            :disabled="isLoggingOut"
            @click.prevent="handleConfirmLogout"
          >
            <Spinner v-if="isLoggingOut" class="size-4" />
            <LogOut v-else class="size-4" aria-hidden="true" />
            {{ isLoggingOut ? 'Mengakhiri sesi...' : 'Keluar Sekarang' }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </SidebarProvider>
</template>

<style scoped>
.admin-scrollbar {
  scrollbar-color: color-mix(in oklab, var(--muted-foreground) 45%, transparent) transparent;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
}

.admin-scrollbar::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

.admin-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.admin-scrollbar::-webkit-scrollbar-thumb {
  background-clip: padding-box;
  background-color: color-mix(in oklab, var(--muted-foreground) 35%, transparent);
  border: 3px solid transparent;
  border-radius: 999px;
}

.admin-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: color-mix(in oklab, var(--primary) 65%, transparent);
}

.admin-scrollbar::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
