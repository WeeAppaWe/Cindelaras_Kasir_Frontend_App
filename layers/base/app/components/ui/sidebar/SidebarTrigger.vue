<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { PanelLeft } from "lucide-vue-next"
import { cn } from '#layers/base/app/utils'
import { Button } from '#layers/base/app/components/ui/button'
import { useSidebar } from "./utils"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  label?: string
}>(), {
  label: "Buka atau tutup sidebar",
})

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    :aria-label="props.label"
    v-bind="$attrs"
    @click="toggleSidebar"
  >
    <PanelLeft aria-hidden="true" />
    <span class="sr-only">{{ props.label }}</span>
  </Button>
</template>
