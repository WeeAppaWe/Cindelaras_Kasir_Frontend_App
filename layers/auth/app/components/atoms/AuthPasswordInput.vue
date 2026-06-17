<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { Input } from '#layers/base/app/components/ui/input'

defineOptions({
  inheritAttrs: false,
})

const modelValue = defineModel<string>({ default: '' })
withDefaults(defineProps<{
  autocomplete?: string
  placeholder?: string
}>(), {
  autocomplete: 'current-password',
  placeholder: 'Masukkan kata sandi',
})
const attrs = useAttrs()
const isVisible = ref(false)
const isDisabled = computed(() => attrs.disabled === true || attrs.disabled === '')
</script>

<template>
  <div class="relative">
    <Input
      v-bind="attrs"
      v-model="modelValue"
      :type="isVisible ? 'text' : 'password'"
      class="h-11 pr-11"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
    />

    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      class="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      :aria-label="isVisible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
      :disabled="isDisabled"
      @click="isVisible = !isVisible"
    >
      <EyeOff v-if="isVisible" class="size-4" />
      <Eye v-else class="size-4" />
    </Button>
  </div>
</template>
