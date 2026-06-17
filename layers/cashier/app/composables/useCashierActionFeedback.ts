import type { Ref } from 'vue'
import { toast } from 'vue-sonner'

type CashierFeedbackMessage<T> = string | ((result: T) => string)

interface CashierActionFeedbackOptions<T> {
  loading: Ref<boolean>
  successMessage: CashierFeedbackMessage<T>
  successDescription?: CashierFeedbackMessage<T>
  errorMessage?: string
  minimumLoadingMs?: number
}

const defaultMinimumLoadingMs = 300

export function useCashierActionFeedback() {
  async function runCashierAction<T>(
    action: () => T | Promise<T>,
    options: CashierActionFeedbackOptions<T>,
  ) {
    if (options.loading.value) {
      return null
    }

    options.loading.value = true
    const startedAt = Date.now()

    try {
      const result = await action()
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs)
      showSuccessToast(options, result)

      return result
    }
    catch (error) {
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs)
      toast.error(getErrorMessage(error, options.errorMessage))

      return null
    }
    finally {
      options.loading.value = false
    }
  }

  return {
    runCashierAction,
  }
}

async function waitForMinimumDuration(startedAt: number, minimumLoadingMs: number) {
  const remainingMs = minimumLoadingMs - (Date.now() - startedAt)

  if (remainingMs > 0) {
    await new Promise(resolve => setTimeout(resolve, remainingMs))
  }
}

function showSuccessToast<T>(options: CashierActionFeedbackOptions<T>, result: T) {
  const message = resolveFeedbackMessage(options.successMessage, result)
  const description = resolveFeedbackMessage(options.successDescription, result)

  if (description) {
    toast.success(message, { description })
    return
  }

  toast.success(message)
}

function resolveFeedbackMessage<T>(message: CashierFeedbackMessage<T> | undefined, result: T) {
  if (!message) {
    return ''
  }

  return typeof message === 'function' ? message(result) : message
}

function getErrorMessage(error: unknown, fallback = 'Aksi kasir gagal diproses.') {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
