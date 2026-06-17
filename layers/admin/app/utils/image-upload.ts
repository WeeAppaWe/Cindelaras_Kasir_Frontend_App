export const ADMIN_IMAGE_UPLOAD_ACCEPT = 'image/jpeg,image/jpg,image/png,image/gif,image/webp'
export const ADMIN_IMAGE_UPLOAD_ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
])
export const ADMIN_IMAGE_UPLOAD_MAX_SIZE_BYTES = 5 * 1024 * 1024
export const ADMIN_IMAGE_UPLOAD_MAX_SIZE_LABEL = '5 MB'

export function getImageFileValidationMessage(file: File) {
  if (!ADMIN_IMAGE_UPLOAD_ALLOWED_TYPES.has(file.type)) {
    return 'Tipe file harus JPEG, PNG, GIF, atau WebP.'
  }

  if (file.size > ADMIN_IMAGE_UPLOAD_MAX_SIZE_BYTES) {
    return `Ukuran gambar maksimal ${ADMIN_IMAGE_UPLOAD_MAX_SIZE_LABEL}.`
  }

  return ''
}

export function readImageFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const result = reader.result

      if (typeof result === 'string' && isImageDataUrl(result)) {
        resolve(result)
        return
      }

      reject(new Error('File gambar tidak valid.'))
    })

    reader.addEventListener('error', () => {
      reject(new Error('Gagal membaca file gambar.'))
    })

    reader.readAsDataURL(file)
  })
}

export function isImageDataUrl(value: string) {
  return /^data:image\/[a-z0-9.+-]+;base64,/i.test(value.trim())
}

export function isValidImageReference(value: string) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return true
  }

  if (isImageDataUrl(trimmedValue)) {
    return true
  }

  if (trimmedValue.startsWith('/')) {
    return trimmedValue.length > 1
  }

  try {
    const url = new URL(trimmedValue)

    return ['http:', 'https:'].includes(url.protocol)
  }
  catch {
    return false
  }
}
