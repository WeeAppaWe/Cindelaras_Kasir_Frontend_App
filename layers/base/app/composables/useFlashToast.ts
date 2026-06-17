import { toast } from 'vue-sonner'

type FlashToastType = 'success' | 'error' | 'warning' | 'info'

interface FlashToastPayload {
  type: FlashToastType
  title: string
  description?: string
}

const flashToastStateKey = 'app:flash-toast'

export function useFlashToast() {
  const pendingToast = useState<FlashToastPayload | null>(flashToastStateKey, () => null)

  function setFlashToast(payload: FlashToastPayload) {
    pendingToast.value = payload
  }

  async function consumeFlashToast() {
    const payload = pendingToast.value

    if (!payload) {
      return
    }

    pendingToast.value = null
    await nextTick()
    showToast(payload)
  }

  return {
    consumeFlashToast,
    setFlashToast,
  }
}

function showToast(payload: FlashToastPayload) {
  const options = payload.description ? { description: payload.description } : undefined

  if (payload.type === 'error') {
    toast.error(payload.title, options)
    return
  }

  if (payload.type === 'warning') {
    toast.warning(payload.title, options)
    return
  }

  if (payload.type === 'info') {
    toast.info(payload.title, options)
    return
  }

  toast.success(payload.title, options)
}
