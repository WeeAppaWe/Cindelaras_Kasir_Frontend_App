<script setup lang="ts">
import { Banknote, History, ReceiptText, Settings, WalletCards } from 'lucide-vue-next'
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

const route = useRoute()
const { user } = useAuth()
const { activeShift } = useCashierStore()
const { publicStoreProfile } = usePublicStoreProfile()
const emit = defineEmits<{
  'request-logout': []
}>()

const navItems = [
  {
    label: 'Kasir',
    to: '/cashier',
    description: 'Transaksi aktif',
    icon: ReceiptText,
  },
  {
    label: 'Riwayat Transaksi',
    to: '/cashier/transactions',
    description: 'Daftar transaksi',
    icon: History,
  },
  {
    label: 'Penyesuaian Kas',
    to: '/cashier/cash-adjustments',
    description: 'Mutasi kas manual',
    icon: WalletCards,
  },
]

const systemLogoUrl = computed(() => publicStoreProfile.value.logoUrl.trim())
const systemDisplayName = computed(() => publicStoreProfile.value.storeName.trim() || 'Sistem Kasir')
const systemInitials = computed(() => {
  const words = systemDisplayName.value.split(/\s+/).filter(Boolean)
  const initials = words.slice(0, 2).map(word => word[0]?.toUpperCase()).join('')

  return initials || 'SK'
})

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader class="border-b border-sidebar-border px-2 py-3">
      <NuxtLink
        to="/cashier"
        class="flex min-h-10 items-center gap-3 rounded-md px-2 text-sidebar-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        :aria-label="`Beranda kasir ${systemDisplayName}`"
      >
        <span class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
          <img
            v-if="systemLogoUrl"
            :src="systemLogoUrl"
            :alt="`Logo ${systemDisplayName}`"
            class="size-full object-contain p-1"
          >
          <span v-else>{{ systemInitials }}</span>
        </span>
        <span class="min-w-0 group-data-[collapsible=icon]:hidden">
          <span class="block truncate text-sm font-semibold">{{ systemDisplayName }}</span>
          <span class="block truncate text-xs text-sidebar-foreground/90">Mode kasir</span>
        </span>
      </NuxtLink>
    </SidebarHeader>

    <SidebarContent>
      <nav aria-label="Navigasi utama kasir">
        <SidebarGroup>
          <SidebarGroupLabel class="text-sidebar-foreground/90">
            Menu utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in navItems" :key="item.to">
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
              <Banknote class="size-4" aria-hidden="true" />
            </span>
            <div class="min-w-0 group-data-[collapsible=icon]:hidden">
              <p class="truncate text-sm font-medium">{{ user?.name ?? 'Kasir' }}</p>
              <p class="truncate text-xs text-sidebar-foreground/90">{{ activeShift ? 'Shift aktif' : 'Belum buka shift' }}</p>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            type="button"
            class="cashier-logout-button"
            tooltip="Keluar"
            aria-label="Keluar dari akun kasir"
            @click="emit('request-logout')"
          >
            <Settings aria-hidden="true" />
            <span>Keluar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
