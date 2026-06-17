<script setup lang="ts">
import type { Component } from 'vue'
import {
  BarChart3,
  Boxes,
  ClipboardCheck,
  History,
  LayoutDashboard,
  LogOut,
  PackageCheck,
  PackageMinus,
  PackagePlus,
  ReceiptText,
  Scale,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Tags,
  Truck,
  UserCog,
  UtensilsCrossed,
  Warehouse,
} from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '#layers/base/app/components/ui/sidebar'
import { Spinner } from '#layers/base/app/components/ui/spinner'

withDefaults(defineProps<{
  loggingOut?: boolean
}>(), {
  loggingOut: false,
})

const route = useRoute()
const { user } = useAuth()
const { systemProfile } = useAdminSystemProfile()
const emit = defineEmits<{
  'request-logout': []
}>()

interface AdminNavigationItem {
  label: string
  to: string
  icon: Component
}

interface AdminNavigationGroup {
  label: string
  items: AdminNavigationItem[]
}

const navigationGroups: AdminNavigationGroup[] = [
  {
    label: 'Ringkasan',
    items: [
      {
        label: 'Dashboard',
        to: '/admin',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: 'Kategori & Menu',
    items: [
      {
        label: 'Kategori Menu',
        to: '/admin/menu-categories',
        icon: Tags,
      },
      {
        label: 'Menu',
        to: '/admin/menu',
        icon: UtensilsCrossed,
      },
    ],
  },
  {
    label: 'Persediaan',
    items: [
      {
        label: 'Satuan Ukur',
        to: '/admin/units',
        icon: Scale,
      },
      {
        label: 'Bahan Baku',
        to: '/admin/ingredients',
        icon: Boxes,
      },
      {
        label: 'Bahan Setengah Jadi',
        to: '/admin/semi-finished-ingredients',
        icon: PackageCheck,
      },
      {
        label: 'Riwayat Stok',
        to: '/admin/stock-history',
        icon: History,
      },
      {
        label: 'Stok Opname',
        to: '/admin/stock-opname',
        icon: ClipboardCheck,
      },
      {
        label: 'Stok Masuk',
        to: '/admin/stock-in',
        icon: PackagePlus,
      },
      {
        label: 'Stok Keluar',
        to: '/admin/stock-out',
        icon: PackageMinus,
      },
    ],
  },
  {
    label: 'Pembelian',
    items: [
      {
        label: 'Pemasok',
        to: '/admin/suppliers',
        icon: Truck,
      },
      {
        label: 'Rekomendasi Belanja',
        to: '/admin/purchase-recommendations',
        icon: ShoppingCart,
      },
    ],
  },
  {
    label: 'Laporan',
    items: [
      {
        label: 'Keuangan',
        to: '/admin/reports/finance',
        icon: BarChart3,
      },
      {
        label: 'Operasional',
        to: '/admin/reports/operations',
        icon: ReceiptText,
      },
      {
        label: 'Persediaan',
        to: '/admin/reports/inventory',
        icon: Warehouse,
      },
    ],
  },
  {
    label: 'Sistem',
    items: [
      {
        label: 'Pengguna',
        to: '/admin/users',
        icon: UserCog,
      },
      {
        label: 'Profil Sistem',
        to: '/admin/system-profile',
        icon: Settings,
      },
    ],
  },
]

const systemLogoUrl = computed(() => systemProfile.value.logoUrl.trim())
const systemDisplayName = computed(() => systemProfile.value.systemDisplayName.trim() || 'Sistem Kasir')
const storeName = computed(() => systemProfile.value.storeName.trim() || 'Panel admin')
const systemInitials = computed(() => {
  const words = systemDisplayName.value.split(/\s+/).filter(Boolean)
  const initials = words.slice(0, 2).map(word => word[0]?.toUpperCase()).join('')

  return initials || 'SK'
})

function isActive(path: string) {
  if (path === '/admin') {
    return route.path === path
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader class="border-b border-sidebar-border px-2 py-3">
      <NuxtLink
        to="/admin"
        class="flex min-h-10 items-center gap-3 rounded-md px-2 text-sidebar-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        :aria-label="`Beranda admin ${systemDisplayName}`"
      >
        <span class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
          <img
            v-if="systemLogoUrl"
            :src="systemLogoUrl"
            :alt="`Logo ${storeName}`"
            class="size-full object-contain p-1"
          >
          <span v-else>{{ systemInitials }}</span>
        </span>
        <span class="min-w-0 group-data-[collapsible=icon]:hidden">
          <span class="block truncate text-sm font-semibold">{{ systemDisplayName }}</span>
          <span class="block truncate text-xs text-sidebar-foreground/90">{{ storeName }}</span>
        </span>
      </NuxtLink>
    </SidebarHeader>

    <SidebarContent>
      <nav aria-label="Navigasi utama admin">
        <SidebarGroup v-for="group in navigationGroups" :key="group.label">
          <SidebarGroupLabel class="text-sidebar-foreground/90">
            {{ group.label }}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in group.items" :key="item.to">
                <SidebarMenuButton
                  as-child
                  :is-active="isActive(item.to)"
                  :tooltip="item.label"
                >
                  <NuxtLink
                    :to="item.to"
                    :aria-label="item.label"
                    :aria-current="isActive(item.to) ? 'page' : undefined"
                  >
                    <component :is="item.icon" aria-hidden="true" />
                    <span>{{ item.label }}</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </nav>
    </SidebarContent>

    <SidebarFooter class="p-2">
      <SidebarSeparator class="mx-2 mb-1" />

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            as="div"
            class="h-10 cursor-default hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
          >
            <span class="flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:-m-1 group-data-[collapsible=icon]:size-6">
              <ShieldCheck class="size-4" aria-hidden="true" />
            </span>
            <div class="min-w-0 group-data-[collapsible=icon]:hidden">
              <p class="truncate text-sm font-medium">{{ user?.name ?? 'Admin' }}</p>
              <p class="truncate text-xs text-sidebar-foreground/90">Administrator</p>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            type="button"
            class="admin-logout-button disabled:opacity-50"
            tooltip="Keluar"
            aria-label="Keluar dari akun admin"
            :disabled="loggingOut"
            @click="emit('request-logout')"
          >
            <Spinner v-if="loggingOut" class="size-4" />
            <LogOut v-else aria-hidden="true" />
            <span>{{ loggingOut ? 'Keluar...' : 'Keluar' }}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
