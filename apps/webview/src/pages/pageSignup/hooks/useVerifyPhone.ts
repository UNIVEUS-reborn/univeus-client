import { graphql, useMutation } from 'react-relay'

import type { useVerifyPhoneMutation } from '@src/__generated__/useVerifyPhoneMutation.graphql'
import { handleSignupResult, type SignupCallbacks } from '@src/pages/pageSignup/hooks/signupMutationResult'
import { NETWORK_ERROR_MESSAGE } from '@src/relay/mutationError'

type Callbacks = SignupCallbacks & {
  onMismatch: () => void
}

export function useVerifyPhone() {
  const [commit, isInFlight] = useMutation<useVerifyPhoneMutation>(graphql`
    mutation useVerifyPhoneMutation($input: VerifyPhoneInput!) {
      verifyPhone(input: $input) {
        authState {
          id
          ...authDestination_authState
        }
        error {
          __typename
          ... on InvalidVerificationCodeError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const verifyPhone = (input: { phoneNumber: string; code: string }, callbacks: Callbacks) =>
    commit({
      variables: { input },
      onCompleted: ({ verifyPhone: result }) =>
        handleSignupResult(result, callbacks, (error) => {
          switch (error.__typename) {
            case 'InvalidVerificationCodeError':
              callbacks.onMismatch()
              return true
            default:
              return false
          }
        }),
      onError: () => callbacks.onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { verifyPhone, isInFlight }
}
