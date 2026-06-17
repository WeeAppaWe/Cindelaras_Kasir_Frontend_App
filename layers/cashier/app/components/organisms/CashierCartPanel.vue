<script setup lang="ts">
import type { CashierCartItem, CashierDiningOption, CashierPaymentMethod } from '../../types/cashier'
import { Check, ChevronDown, CreditCard, Package, PanelRightClose, PanelRightOpen, Phone, Receipt, ShoppingCart, Trash2, UserRound, Utensils } from 'lucide-vue-next'
import { Button } from '#layers/base/app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#layers/base/app/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '#layers/base/app/components/ui/collapsible'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#layers/base/app/components/ui/empty'
import { Input } from '#layers/base/app/components/ui/input'
import { Label } from '#layers/base/app/components/ui/label'
import { ScrollArea } from '#layers/base/app/components/ui/scroll-area'
import { Separator } from '#layers/base/app/components/ui/separator'
import CashierCurrency from '../atoms/CashierCurrency.vue'
import CashierCartItemRow from '../molecules/CashierCartItemRow.vue'

const props = defineProps<{
  items: CashierCartItem[]
  itemCount: number
  subtotal: number
  total: number
  paymentMethod: CashierPaymentMethod
  customerName: string
  customerPhone: string
  diningOption: CashierDiningOption
  open: boolean
}>()

const emit = defineEmits<{
  decrement: [productId: string]
  increment: [productId: string]
  remove: [productId: string]
  clear: []
  checkout: []
  'update:open': [value: boolean]
  'update:paymentMethod': [value: CashierPaymentMethod]
  'update:customerName': [value: string]
  'update:customerPhone': [value: string]
  'update:diningOption': [value: CashierDiningOption]
}>()

const paymentMethods: CashierPaymentMethod[] = ['Tunai', 'QRIS']
const diningOptions: CashierDiningOption[] = ['Makan di Tempat', 'Bungkus']
const areCheckoutDetailsOpen = ref(false)
const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const isCartPanelOpen = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})

const customerNameModel = computed({
  get: () => props.customerName,
  set: value => emit('update:customerName', String(value)),
})

const customerPhoneModel = computed({
  get: () => props.customerPhone,
  set: value => emit('update:customerPhone', String(value)),
})

const canCheckout = computed(() => (
  props.items.length > 0
  && props.customerName.trim().length > 0
))

const checkoutHint = computed(() => {
  if (!props.items.length) {
    return 'Tambahkan item ke keranjang untuk melanjutkan.'
  }

  if (!props.customerName.trim()) {
    return areCheckoutDetailsOpen.value
      ? 'Isi nama pelanggan untuk melanjutkan.'
      : 'Buka detail transaksi untuk mengisi nama pelanggan.'
  }

  return ''
})

const cartPanelToggleTitle = computed(() => {
  const action = isCartPanelOpen.value ? 'Tutup panel keranjang' : 'Buka panel keranjang'
  return `${action}. ${props.itemCount} item, total ${currencyFormatter.format(props.total).replace(/\s/g, ' ')}.`
})

function handleCheckout() {
  if (!canCheckout.value) {
    return
  }

  emit('checkout')
}
</script>

<template>
  <Card
    class="flex min-h-0 gap-0 overflow-hidden rounded-md py-0 shadow-xs transition-[width] duration-200 ease-linear motion-reduce:transition-none lg:shrink-0"
    :class="isCartPanelOpen ? 'lg:h-full lg:w-[24rem] lg:self-stretch xl:w-[26rem] 2xl:w-[28rem]' : 'w-full lg:h-full lg:w-14 lg:self-stretch'"
    aria-labelledby="cart-title"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-150 ease-linear motion-reduce:transition-none"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100 ease-linear motion-reduce:transition-none"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <CardHeader v-if="isCartPanelOpen" key="open-header" class="shrink-0 border-b p-3">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <CardTitle id="cart-title" class="flex items-center gap-2 text-base tracking-normal">
              <ShoppingCart class="size-4 text-muted-foreground" aria-hidden="true" />
              Keranjang
            </CardTitle>
            <CardDescription>
              {{ props.itemCount }} item dalam transaksi.
            </CardDescription>
          </div>

          <div class="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              :disabled="!props.items.length"
              aria-label="Kosongkan keranjang"
              title="Kosongkan keranjang"
              @click="emit('clear')"
            >
              <Trash2 class="size-4" aria-hidden="true" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              :aria-expanded="isCartPanelOpen"
              aria-controls="cart-panel-body"
              :aria-label="cartPanelToggleTitle"
              :title="cartPanelToggleTitle"
              @click="isCartPanelOpen = !isCartPanelOpen"
            >
              <PanelRightClose v-if="isCartPanelOpen" class="size-4" aria-hidden="true" />
              <PanelRightOpen v-else class="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardHeader v-else key="closed-header" class="flex min-h-14 grid-rows-none flex-row items-center justify-between gap-3 border-b-0 p-2 lg:h-full lg:flex-col lg:justify-start">
        <p id="cart-title" class="sr-only">Keranjang</p>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          :aria-expanded="isCartPanelOpen"
          aria-controls="cart-panel-body"
          :aria-label="cartPanelToggleTitle"
          :title="cartPanelToggleTitle"
          @click="isCartPanelOpen = true"
        >
          <PanelRightOpen class="size-4" aria-hidden="true" />
        </Button>

        <div class="flex items-center gap-2 text-center lg:flex-col">
          <span class="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <ShoppingCart class="size-4" aria-hidden="true" />
          </span>
          <span class="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
            {{ props.itemCount }}
          </span>
        </div>

        <p class="sr-only">
          Total keranjang <CashierCurrency :value="props.total" />.
        </p>
      </CardHeader>
    </Transition>

    <Transition
      enter-active-class="transition-opacity duration-150 ease-linear motion-reduce:transition-none"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100 ease-linear motion-reduce:transition-none"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isCartPanelOpen" id="cart-panel-body" class="flex min-h-0 flex-1 flex-col">
        <CardContent class="min-h-0 flex-1 p-0">
          <ScrollArea class="h-full">
            <div class="p-3">
              <ul v-if="props.items.length" class="space-y-2" aria-label="Item keranjang">
                <CashierCartItemRow
                  v-for="item in props.items"
                  :key="item.productId"
                  :item="item"
                  @decrement="emit('decrement', $event)"
                  @increment="emit('increment', $event)"
                  @remove="emit('remove', $event)"
                />
              </ul>

              <Empty v-else class="min-h-48 rounded-md border p-6 md:p-6">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Receipt class="size-5" aria-hidden="true" />
                  </EmptyMedia>
                  <EmptyTitle class="text-sm">Belum ada item</EmptyTitle>
                  <EmptyDescription>
                    Pilih produk untuk mulai transaksi.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter class="block shrink-0 border-t p-3">
          <form class="space-y-3" @submit.prevent="handleCheckout">
            <Collapsible v-model:open="areCheckoutDetailsOpen">
              <div class="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2">
                <div class="min-w-0">
                  <p class="truncate text-sm font-medium">Detail transaksi</p>
                  <p class="truncate text-xs text-muted-foreground">
                    Nama pelanggan, tipe pesanan, dan pembayaran.
                  </p>
                </div>

                <CollapsibleTrigger as-child>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    :aria-label="areCheckoutDetailsOpen ? 'Sembunyikan detail transaksi' : 'Tampilkan detail transaksi'"
                    :title="areCheckoutDetailsOpen ? 'Sembunyikan detail transaksi' : 'Tampilkan detail transaksi'"
                  >
                    <ChevronDown
                      class="size-4 transition-transform duration-200 ease-out motion-reduce:transition-none"
                      :class="areCheckoutDetailsOpen ? 'rotate-180' : ''"
                      aria-hidden="true"
                    />
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent class="group/checkout-details overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down motion-reduce:animate-none">
                <div class="space-y-3 pt-3 transition-[opacity,transform] duration-200 ease-out group-data-[state=closed]/checkout-details:-translate-y-1 group-data-[state=closed]/checkout-details:opacity-0 group-data-[state=open]/checkout-details:translate-y-0 group-data-[state=open]/checkout-details:opacity-100 motion-reduce:transition-none">
                  <div class="grid gap-3">
                    <div>
                      <Label for="customer-name" class="mb-1.5">
                        <UserRound class="size-4 text-muted-foreground" aria-hidden="true" />
                        Nama pelanggan
                      </Label>
                      <Input
                        id="customer-name"
                        v-model="customerNameModel"
                        class="h-10"
                        placeholder="Nama pelanggan"
                        autocomplete="name"
                        required
                      />
                    </div>

                    <div>
                      <Label for="customer-phone" class="mb-1.5">
                        <Phone class="size-4 text-muted-foreground" aria-hidden="true" />
                        Nomor telepon (opsional)
                      </Label>
                      <Input
                        id="customer-phone"
                        v-model="customerPhoneModel"
                        type="tel"
                        inputmode="tel"
                        class="h-10"
                        placeholder="08xxxxxxxxxx"
                        autocomplete="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <p class="mb-2 flex items-center gap-2 text-sm font-medium">
                      <Utensils class="size-4 text-muted-foreground" aria-hidden="true" />
                      Tipe pesanan
                    </p>
                    <div class="grid grid-cols-2 gap-2" aria-label="Pilih tipe pesanan">
                      <Button
                        v-for="option in diningOptions"
                        :key="option"
                        type="button"
                        size="sm"
                        :variant="props.diningOption === option ? 'default' : 'outline'"
                        :aria-pressed="props.diningOption === option"
                        class="h-10 justify-between"
                        @click="emit('update:diningOption', option)"
                      >
                        <span class="inline-flex min-w-0 items-center gap-2">
                          <Utensils v-if="option === 'Makan di Tempat'" class="size-4" aria-hidden="true" />
                          <Package v-else class="size-4" aria-hidden="true" />
                          <span class="truncate">{{ option }}</span>
                        </span>
                        <Check
                          class="size-4"
                          :class="props.diningOption === option ? 'opacity-100' : 'opacity-0'"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p class="mb-2 flex items-center gap-2 text-sm font-medium">
                      <CreditCard class="size-4 text-muted-foreground" aria-hidden="true" />
                      Metode pembayaran
                    </p>
                    <div class="grid grid-cols-2 gap-2" aria-label="Pilih metode pembayaran">
                      <Button
                        v-for="method in paymentMethods"
                        :key="method"
                        type="button"
                        size="sm"
                        :variant="props.paymentMethod === method ? 'default' : 'outline'"
                        :aria-pressed="props.paymentMethod === method"
                        class="h-10 justify-between"
                        @click="emit('update:paymentMethod', method)"
                      >
                        <span>{{ method }}</span>
                        <Check
                          class="size-4"
                          :class="props.paymentMethod === method ? 'opacity-100' : 'opacity-0'"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <dl class="space-y-2 text-sm">
              <div class="flex justify-between gap-3">
                <dt class="text-muted-foreground">Subtotal</dt>
                <dd class="font-medium"><CashierCurrency :value="props.subtotal" /></dd>
              </div>
              <Separator />
              <div class="flex justify-between gap-3 text-base" aria-live="polite">
                <dt class="font-semibold">Total</dt>
                <dd class="font-semibold"><CashierCurrency :value="props.total" /></dd>
              </div>
            </dl>

            <Button
              type="submit"
              class="mt-3 h-11 w-full"
              :disabled="!canCheckout"
            >
              Bayar Sekarang
            </Button>
            <p v-if="checkoutHint" class="text-xs text-muted-foreground" aria-live="polite">
              {{ checkoutHint }}
            </p>
          </form>
        </CardFooter>
      </div>
    </Transition>
  </Card>
</template>
