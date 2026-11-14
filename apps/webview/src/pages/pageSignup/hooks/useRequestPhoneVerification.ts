import { graphql, useMutation } from 'react-relay'

import type { useRequestPhoneVerificationMutation } from '@src/__generated__/useRequestPhoneVerificationMutation.graphql'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onSuccess: () => void
  onInvalidPhoneNumber: () => void
  onFailure: (message: string) => void
}

export function useRequestPhoneVerification() {
  const [commit, isInFlight] = useMutation<useRequestPhoneVerificationMutation>(graphql`
    mutation useRequestPhoneVerificationMutation($input: RequestPhoneVerificationInput!) {
      requestPhoneVerification(input: $input) {
        success
        error {
          __typename
          ... on InvalidPhoneNumberError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const requestPhoneVerification = (phoneNumber: string, { onSuccess, onInvalidPhoneNumber, onFailure }: Callbacks) =>
    commit({
      variables: { input: { phoneNumber } },
      onCompleted: ({ requestPhoneVerification: result }) => {
        const { error } = result
        if (error !== null && error !== undefined) {
          if (error.__typename === 'InvalidPhoneNumberError') {
            onInvalidPhoneNumber()
            return
          }
          onFailure(toMutationErrorMessage(error))
          return
        }
        if (result.success !== true) {
          onFailure(NETWORK_ERROR_MESSAGE)
          return
        }
        onSuccess()
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { requestPhoneVerification, isInFlight }
}
