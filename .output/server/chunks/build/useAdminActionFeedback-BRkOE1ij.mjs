import { toast } from 'vue-sonner';

const defaultMinimumLoadingMs = 300;
function useAdminActionFeedback() {
  async function runAdminAction(action, options) {
    if (options.loading.value) {
      return false;
    }
    options.loading.value = true;
    const startedAt = Date.now();
    try {
      await action();
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs);
      toast.success(options.successMessage);
      return true;
    } catch (error) {
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs);
      options.onError?.(error);
      toast.error(getErrorMessage(error, options.errorMessage));
      return false;
    } finally {
      options.loading.value = false;
    }
  }
  async function runAdminExportAction(action, options) {
    if (options.exporting.value) {
      return false;
    }
    options.exporting.value = options.format;
    const startedAt = Date.now();
    try {
      await action();
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs);
      toast.success(options.successMessage);
      return true;
    } catch (error) {
      await waitForMinimumDuration(startedAt, options.minimumLoadingMs ?? defaultMinimumLoadingMs);
      options.onError?.(error);
      toast.error(getErrorMessage(error, options.errorMessage));
      return false;
    } finally {
      options.exporting.value = null;
    }
  }
  return {
    runAdminAction,
    runAdminExportAction
  };
}
async function waitForMinimumDuration(startedAt, minimumLoadingMs) {
  const remainingMs = minimumLoadingMs - (Date.now() - startedAt);
  if (remainingMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, remainingMs));
  }
}
function getErrorMessage(error, fallback = "Aksi admin gagal diproses.") {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

export { useAdminActionFeedback as u };
//# sourceMappingURL=useAdminActionFeedback-BRkOE1ij.mjs.map
