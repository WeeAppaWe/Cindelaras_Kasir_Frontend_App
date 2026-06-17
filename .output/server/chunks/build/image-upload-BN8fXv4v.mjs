const ADMIN_IMAGE_UPLOAD_ACCEPT = "image/jpeg,image/jpg,image/png,image/gif,image/webp";
const ADMIN_IMAGE_UPLOAD_ALLOWED_TYPES = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp"
]);
const ADMIN_IMAGE_UPLOAD_MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ADMIN_IMAGE_UPLOAD_MAX_SIZE_LABEL = "5 MB";
function getImageFileValidationMessage(file) {
  if (!ADMIN_IMAGE_UPLOAD_ALLOWED_TYPES.has(file.type)) {
    return "Tipe file harus JPEG, PNG, GIF, atau WebP.";
  }
  if (file.size > ADMIN_IMAGE_UPLOAD_MAX_SIZE_BYTES) {
    return `Ukuran gambar maksimal ${ADMIN_IMAGE_UPLOAD_MAX_SIZE_LABEL}.`;
  }
  return "";
}
function readImageFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const result = reader.result;
      if (typeof result === "string" && isImageDataUrl(result)) {
        resolve(result);
        return;
      }
      reject(new Error("File gambar tidak valid."));
    });
    reader.addEventListener("error", () => {
      reject(new Error("Gagal membaca file gambar."));
    });
    reader.readAsDataURL(file);
  });
}
function isImageDataUrl(value) {
  return /^data:image\/[a-z0-9.+-]+;base64,/i.test(value.trim());
}
function isValidImageReference(value) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return true;
  }
  if (isImageDataUrl(trimmedValue)) {
    return true;
  }
  if (trimmedValue.startsWith("/")) {
    return trimmedValue.length > 1;
  }
  try {
    const url = new URL(trimmedValue);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export { ADMIN_IMAGE_UPLOAD_ACCEPT as A, isImageDataUrl as a, getImageFileValidationMessage as g, isValidImageReference as i, readImageFileAsDataUrl as r };
//# sourceMappingURL=image-upload-BN8fXv4v.mjs.map
