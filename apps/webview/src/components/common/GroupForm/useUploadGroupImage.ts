import { graphql, useMutation } from 'react-relay'

import type { useUploadGroupImageMutation } from '@src/__generated__/useUploadGroupImageMutation.graphql'
import { classifyGroupImageFile } from '@src/components/common/GroupForm/domain/groupImage'
import type { GroupFormImage } from '@src/components/common/GroupForm/groupFormValues'
import { uploadImage } from '@src/relay/uploadImage'

export function useUploadGroupImage() {
  const [commit] = useMutation<useUploadGroupImageMutation>(graphql`
    mutation useUploadGroupImageMutation($input: CreateImageUploadUrlInput!) {
      createImageUploadUrl(input: $input) {
        uploadUrl
        imageId
        error {
          __typename
        }
      }
    }
  `)

  return async (file: File): Promise<GroupFormImage | null> => {
    const result = classifyGroupImageFile({ byteSize: file.size, mimeType: file.type })
    switch (result.type) {
      case 'UNSUPPORTED_TYPE':
      case 'TOO_LARGE':
        return null
      case 'UPLOADABLE':
        break
    }
    const response = await new Promise<useUploadGroupImageMutation['response']['createImageUploadUrl']>(
      (resolve, reject) =>
        commit({
          variables: { input: { purpose: 'GROUP', contentType: result.contentType, byteSize: file.size } },
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
