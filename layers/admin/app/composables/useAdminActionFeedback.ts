import type { Ref } from 'vue'
import { toast } from 'vue-sonner'

interface AdminActionFeedbackOptions {
  loading: Ref<boolean>
  successMessage: string
  errorMessage?: string
  onError?: (error: unknown) => void
  minimumLoadingMs?: number
}

type AdminExportFormat = 'pdf' | 'excel'

interface AdminExportActionFeedbackOptions {
  exporting: Ref<AdminExportFormat | null>
  format: AdminExportFormat
  successMessage: string
  errorMessage?: string
  onError?: (error: unknown) => void
  minimumLoadingMs?: number
}

const defaultMinimumLoadingMs = 300

export function useAdminActionFeedback() {
  async function runAdminAction(
    action: () => void | Promise<void>,
    options: AdminActionFeedbackOptions,
  ) {
    if (options.loading.value) {
      return false
    }

    options.loading.value = true
    const startedAt = Date.now()

    try {
      await action()
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs)
      toast.success(options.successMessage)

      return true
    }
    catch (error) {
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs)
      options.onError?.(error)
      toast.error(getErrorMessage(error, options.errorMessage))

      return false
    }
    finally {
      options.loading.value = false
    }
  }

  async function runAdminExportAction(
    action: () => void | Promise<void>,
    options: AdminExportActionFeedbackOptions,
  ) {
    if (options.exporting.value) {
      return false
    }

    options.exporting.value = options.format
    const startedAt = Date.now()

    try {
      await action()
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs)
      toast.success(options.successMessage)

      return true
    }
    catch (error) {
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs)
      options.onError?.(error)
      toast.error(getErrorMessage(error, options.errorMessage))

      return false
    }
    finally {
      options.exporting.value = null
    }
  }

  return {
    runAdminAction,
    runAdminExportAction,
  }
}

async function waitForMinimumDuration(startedAt: number, minimumLoadingMs: number) {
  const remainingMs = minimumLoadingMs - (Date.now() - startedAt)

  if (remainingMs > 0) {
    await new Promise(resolve => setTimeout(resolve, remainingMs))
  }
}

function getErrorMessage(error: unknown, fallback = 'Aksi admin gagal diproses.') {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
