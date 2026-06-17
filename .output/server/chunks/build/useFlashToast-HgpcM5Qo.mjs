import { toast } from 'vue-sonner';
import { u as useState } from './state-Dw1r7BQr.mjs';
import { nextTick } from 'vue';

const flashToastStateKey = "app:flash-toast";
function useFlashToast() {
  const pendingToast = useState(flashToastStateKey, () => null);
  function setFlashToast(payload) {
    pendingToast.value = payload;
  }
  async function consumeFlashToast() {
    const payload = pendingToast.value;
    if (!payload) {
      return;
    }
    pendingToast.value = null;
    await nextTick();
    showToast(payload);
  }
  return {
    consumeFlashToast,
    setFlashToast
  };
}
function showToast(payload) {
  const options = payload.description ? { description: payload.description } : void 0;
  if (payload.type === "error") {
    toast.error(payload.title, options);
    return;
  }
  if (payload.type === "warning") {
    toast.warning(payload.title, options);
    return;
  }
  if (payload.type === "info") {
    toast.info(payload.title, options);
    return;
  }
  toast.success(payload.title, options);
}

export { useFlashToast as u };
//# sourceMappingURL=useFlashToast-HgpcM5Qo.mjs.map
