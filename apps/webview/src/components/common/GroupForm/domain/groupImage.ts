export const GROUP_IMAGE_MAX_BYTE_SIZE = 1024 * 1024

type ImageContentType = 'JPEG' | 'PNG' | 'WEBP' | 'HEIC'

export type GroupImageFileInput = {
  byteSize: number
  mimeType: string
}

function toContentType(mimeType: string): ImageContentType | null {
  switch (mimeType) {
    case 'image/jpeg':
      return 'JPEG'
    case 'image/png':
      return 'PNG'
    case 'image/webp':
      return 'WEBP'
    case 'image/heic':
      return 'HEIC'
    default:
      return null
  }
}

export function classifyGroupImageFile({
  byteSize,
  mimeType,
}: GroupImageFileInput):
  | { type: 'UPLOADABLE'; contentType: ImageContentType }
  | { type: 'UNSUPPORTED_TYPE' }
  | { type: 'TOO_LARGE' } {
  const contentType = toContentType(mimeType)
  if (contentType === null) {
    return { type: 'UNSUPPORTED_TYPE' }
  }
  if (byteSize >= GROUP_IMAGE_MAX_BYTE_SIZE) {
    return { type: 'TOO_LARGE' }
  }
  return { type: 'UPLOADABLE', contentType }
}
