<script setup lang="ts">
import type { CashierDiningOption, CashierPaymentMethod, CashierPaymentResult, CashierReceiptPreview } from '../../types/cashier'
import { toast } from 'vue-sonner'
import CashierPageHeader from '../../components/molecules/CashierPageHeader.vue'
import CashierCartPanel from '../../components/organisms/CashierCartPanel.vue'
import CashierPaymentDialog from '../../components/organisms/CashierPaymentDialog.vue'
import CashierPaymentSuccessDialog from '../../components/organisms/CashierPaymentSuccessDialog.vue'
import CashierProductSection from '../../components/organisms/CashierProductSection.vue'

definePageMeta({
  layout: 'cashier',
  middleware: 'cashier-only',
})

useHead({
  title: 'Kasir',
})

const {
  products,
  productCategories,
  cartItems,
  cartQuantities,
  cartItemCount,
  subtotal,
  total,
  addProductToCart,
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
  clearCart,
  checkoutCart,
  isProductListLoading,
  isCategoryListLoading,
  loadCategories,
  loadProducts,
} = useCashierStore()

const productSearch = ref('')
const selectedCategoryId = ref('')
const availabilityFilter = ref<'all' | 'available' | 'unavailable'>('all')
const customerName = ref('')
const customerPhone = ref('')
const diningOption = ref<CashierDiningOption>('Makan di Tempat')
const paymentMethod = ref<CashierPaymentMethod>('Tunai')
const isPaymentDialogOpen = ref(false)
const isPaymentSubmitting = ref(false)
const isPaymentSuccessDialogOpen = ref(false)
const lastReceipt = ref<CashierReceiptPreview | null>(null)
const isCartPanelOpen = ref(true)
const isSidebarOpen = useState<boolean>('cashier:sidebar-open', () => true)
const { runCashierAction } = useCashierActionFeedback()

const productDesktopColumnCount = computed<3 | 4 | 5>(() => {
  if (isSidebarOpen.value && isCartPanelOpen.value) {
    return 3
  }

  if (!isSidebarOpen.value && !isCartPanelOpen.value) {
    return 5
  }

  return 4
})

onMounted(async () => {
  const [categoryResult, productResult] = await Promise.allSettled([
    loadCategories({ force: true }),
    loadProducts({ force: true }),
  ])

  if (categoryResult.status === 'rejected') {
    toast.warning(getErrorMessage(categoryResult.reason, 'Gagal memuat daftar kategori.'))
  }

  if (productResult.status === 'rejected') {
    toast.error(getErrorMessage(productResult.reason, 'Gagal memuat daftar menu.'))
  }
})

watch(selectedCategoryId, async (categoryId) => {
  try {
    await loadProducts({
      force: true,
      categoryId,
    })
  }
  catch (error) {
    toast.error(getErrorMessage(error, 'Gagal memuat daftar menu.'))
  }
})

function handleCheckoutRequest() {
  isPaymentDialogOpen.value = true
}

async function handlePaymentComplete(paymentResult: CashierPaymentResult) {
  await runCashierAction(async () => {
    await nextTick()
    const checkoutResult = await checkoutCart({
      customerName: customerName.value,
      customerPhone: customerPhone.value,
      diningOption: diningOption.value,
      paymentMethod: paymentMethod.value,
      cashReceived: paymentResult.cashReceived,
      cashChange: paymentResult.cashChange,
    })

    if (!checkoutResult) {
      throw new Error('Transaksi gagal disimpan. Periksa keranjang dan nama pelanggan.')
    }

    lastReceipt.value = checkoutResult.receipt

    isPaymentDialogOpen.value = false
    isPaymentSuccessDialogOpen.value = true
    customerName.value = ''
    customerPhone.value = ''
    diningOption.value = 'Makan di Tempat'
    paymentMethod.value = 'Tunai'

    return checkoutResult.transaction
  }, {
    loading: isPaymentSubmitting,
    successMessage: 'Pembayaran berhasil',
    successDescription: transaction => `Transaksi ${transaction.id} tersimpan. Struk siap dikirim.`,
    errorMessage: 'Pembayaran gagal diproses.',
  })
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col gap-3 p-3 sm:p-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_minmax(0,1fr)]">
    <CashierPageHeader
      class="lg:col-start-1 lg:row-start-1"
      title="Kasir"
      description="Input transaksi, pilih produk, dan proses pembayaran dari satu layar."
    />

    <CashierProductSection
      v-model:search-term="productSearch"
      v-model:selected-category-id="selectedCategoryId"
      v-model:availability-filter="availabilityFilter"
      class="lg:col-start-1 lg:row-start-2"
      :products="products"
      :categories="productCategories"
      :cart-quantities="cartQuantities"
      :desktop-column-count="productDesktopColumnCount"
      :loading="isProductListLoading || isCategoryListLoading"
      @add-product="addProductToCart"
    />

    <CashierCartPanel
      v-model:open="isCartPanelOpen"
      v-model:payment-method="paymentMethod"
      v-model:customer-name="customerName"
      v-model:customer-phone="customerPhone"
      v-model:dining-option="diningOption"
      class="lg:col-start-2 lg:row-span-2 lg:row-start-1"
      :items="cartItems"
      :item-count="cartItemCount"
      :subtotal="subtotal"
      :total="total"
      @decrement="decrementCartItem"
      @increment="incrementCartItem"
      @remove="removeCartItem"
      @clear="clearCart"
      @checkout="handleCheckoutRequest"
    />

    <CashierPaymentDialog
      v-model:open="isPaymentDialogOpen"
      v-model:payment-method="paymentMethod"
      :items="cartItems"
      :total="total"
      :item-count="cartItemCount"
      :customer-name="customerName"
      :dining-option="diningOption"
      :submitting="isPaymentSubmitting"
      @submit="handlePaymentComplete"
    />

    <CashierPaymentSuccessDialog
      v-model:open="isPaymentSuccessDialogOpen"
      :receipt="lastReceipt"
    />
  </div>
</template>
