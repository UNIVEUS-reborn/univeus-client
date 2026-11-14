import { describe, expect, it } from 'vitest'

import { classifyImageFile } from '@src/components/common/Image/domain/imageFile'
import { smallJpeg } from '@src/components/common/Image/domain/imageFileFixtures'

describe('classifyImageFile', () => {
  it.each([
    ['image/jpeg', 'JPEG'],
    ['image/png', 'PNG'],
    ['image/webp', 'WEBP'],
    ['image/heic', 'HEIC'],
  ])('%s는 업로드할 수 있어요', (mimeType, contentType) => {
    expect(classifyImageFile({ ...smallJpeg, mimeType })).toEqual({ type: 'UPLOADABLE', contentType })
  })

  it.each(['image/gif', 'application/pdf', '', 'toString'])('"%s" 형식은 업로드할 수 없어요', (mimeType) => {
    expect(classifyImageFile({ ...smallJpeg, mimeType })).toEqual({ type: 'UNSUPPORTED_TYPE' })
  })

  it('1MB에서 1바이트 모자라면 업로드할 수 있어요', () => {
    expect(classifyImageFile({ ...smallJpeg, byteSize: 1024 * 1024 - 1 })).toEqual({
      type: 'UPLOADABLE',
      contentType: 'JPEG',
    })
  })

  it('1MB 이상이면 너무 커요', () => {
    expect(classifyImageFile({ ...smallJpeg, byteSize: 1024 * 1024 })).toEqual({ type: 'TOO_LARGE' })
  })

  it('형식이 맞지 않으면 용량보다 형식을 먼저 알려줘요', () => {
    expect(classifyImageFile({ byteSize: 1024 * 1024, mimeType: 'image/gif' })).toEqual({
      type: 'UNSUPPORTED_TYPE',
    })
  })
})
