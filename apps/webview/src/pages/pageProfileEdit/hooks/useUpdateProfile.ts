import { graphql, useMutation } from 'react-relay'

import type { useUpdateProfileMutation } from '@src/__generated__/useUpdateProfileMutation.graphql'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onSuccess: () => void
  onDuplicated: () => void
  onInvalid: () => void
  onFailure: (message: string) => void
}

export function useUpdateProfile() {
  const [commit, isInFlight] = useMutation<useUpdateProfileMutation>(graphql`
    mutation useUpdateProfileMutation($input: UpdateProfileInput!) {
      updateProfile(input: $input) {
        user {
          id
          nickname
          profileImage {
            id
            url
          }
          ...UserProfileCard_user
        }
        error {
          __typename
          ... on DuplicatedNicknameError {
            message
          }
          ... on InvalidNicknameError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const updateProfile = (
    input: { nickname: string; profileImageId: string | null },
    { onSuccess, onDuplicated, onInvalid, onFailure }: Callbacks,
  ) =>
    commit({
      variables: { input },
      onCompleted: ({ updateProfile: result }) => {
        const { error } = result
        if (error !== null && error !== undefined) {
          switch (error.__typename) {
            case 'DuplicatedNicknameError':
              onDuplicated()
              return
            case 'InvalidNicknameError':
              onInvalid()
              return
            default:
              onFailure(toMutationErrorMessage(error))
              return
          }
        }
        if (result.user === null || result.user === undefined) {
          onFailure(NETWORK_ERROR_MESSAGE)
          return
        }
        onSuccess()
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { updateProfile, isInFlight }
}
