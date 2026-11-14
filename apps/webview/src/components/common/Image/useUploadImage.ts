import { graphql, useMutation } from 'react-relay'

import type { ImageUploadPurpose, useUploadImageMutation } from '@src/__generated__/useUploadImageMutation.graphql'
import { classifyImageFile } from '@src/components/common/Image/domain/imageFile'
import { uploadImage } from '@src/relay/uploadImage'

export const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/heic'

export type UploadedImage = {
  id: string
  url: string
  isLocal: boolean
}

export function useUploadImage(purpose: ImageUploadPurpose) {
  const [commit] = useMutation<useUploadImageMutation>(graphql`
    mutation useUploadImageMutation($input: CreateImageUploadUrlInput!) {
      createImageUploadUrl(input: $input) {
        uploadUrl
        imageId
        error {
          __typename
        }
      }
    }
  `)

  return async (file: File): Promise<UploadedImage | null> => {
    const result = classifyImageFile({ byteSize: file.size, mimeType: file.type })
    switch (result.type) {
      case 'UNSUPPORTED_TYPE':
      case 'TOO_LARGE':
        return null
      case 'UPLOADABLE':
        break
    }
    const response = await new Promise<useUploadImageMutation['response']['createImageUploadUrl']>((resolve, reject) =>
      commit({
        variables: { input: { purpose, contentType: result.contentType, byteSize: file.size } },
        onCompleted: ({ createImageUploadUrl }) => resolve(createImageUploadUrl),
        onError: reject,
      }),
    )
    if (response.error !== null && response.error !== undefined) {
      return null
    }
    if (typeof response.uploadUrl !== 'string' || typeof response.imageId !== 'string') {
      return null
    }
    await uploadImage(response.uploadUrl, file)
    return { id: response.imageId, url: URL.createObjectURL(file), isLocal: true }
  }
}
