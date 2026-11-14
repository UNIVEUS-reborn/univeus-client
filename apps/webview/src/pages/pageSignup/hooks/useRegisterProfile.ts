import { graphql, useMutation } from 'react-relay'

import type { useRegisterProfileMutation } from '@src/__generated__/useRegisterProfileMutation.graphql'
import { handleSignupResult, type SignupCallbacks } from '@src/pages/pageSignup/hooks/signupMutationResult'
import { NETWORK_ERROR_MESSAGE } from '@src/relay/mutationError'

type Callbacks = SignupCallbacks & {
  onDuplicated: () => void
  onInvalid: () => void
}

export function useRegisterProfile() {
  const [commit, isInFlight] = useMutation<useRegisterProfileMutation>(graphql`
    mutation useRegisterProfileMutation($input: RegisterProfileInput!) {
      registerProfile(input: $input) {
        authState {
          id
          ...authDestination_authState
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

  const registerProfile = (
    input: { nickname: string; gender: 'MALE' | 'FEMALE'; profileImageId: string | null },
    callbacks: Callbacks,
  ) =>
    commit({
      variables: { input },
      onCompleted: ({ registerProfile: result }) =>
        handleSignupResult(result, callbacks, (error) => {
          switch (error.__typename) {
            case 'DuplicatedNicknameError':
              callbacks.onDuplicated()
              return true
            case 'InvalidNicknameError':
              callbacks.onInvalid()
              return true
            default:
              return false
          }
        }),
      onError: () => callbacks.onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { registerProfile, isInFlight }
}
