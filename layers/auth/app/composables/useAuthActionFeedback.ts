import type { Ref } from 'vue'
import { toast } from 'vue-sonner'

type AuthFeedbackMessage<T> = string | ((result: T) => string)

interface AuthActionFeedbackOptions<T> {
  loading?: Ref<boolean>
  successMessage: AuthFeedbackMessage<T>
  successDescription?: AuthFeedbackMessage<T>
  errorMessage?: string
  showErrorToast?: boolean
}

export function useAuthActionFeedback() {
  async function runAuthAction<T>(
    action: () => T | Promise<T>,
    options: AuthActionFeedbackOptions<T>,
  ) {
    if (options.loading?.value) {
      return null
    }

    try {
      const result = await action()

      if (result) {
        showSuccessToast(options, result)
      }

      return result
    }
    catch (error) {
      if (options.showErrorToast) {
        toast.error(getErrorMessage(error, options.errorMessage))
      }

      return null
    }
  }

  return {
    runAuthAction,
  }
}

function showSuccessToast<T>(options: AuthActionFeedbackOptions<T>, result: T) {
  const message = resolveFeedbackMessage(options.successMessage, result)
  const description = resolveFeedbackMessage(options.successDescription, result)

  if (description) {
    toast.success(message, { description })
    return
  }

  toast.success(message)
}

function resolveFeedbackMessage<T>(message: AuthFeedbackMessage<T> | undefined, result: T) {
  if (!message) {
    return ''
  }

  return typeof message === 'function' ? message(result) : message
}

function getErrorMessage(error: unknown, fallback = 'Aksi autentikasi gagal diproses.') {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
