import { graphql, useMutation } from 'react-relay'

import type { useSignInWithGoogleMutation } from '@src/__generated__/useSignInWithGoogleMutation.graphql'
import { classifyAuthDestination, type AuthDestination } from '@src/components/common/Auth/domain/authDestination'
import { readAuthDestination } from '@src/components/common/Auth/domain/authDestination.relay'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onSuccess: (destination: AuthDestination) => void
  onNotUniversityEmail: () => void
  onFailure: (message: string) => void
}

export function useSignInWithGoogle() {
  const [commit, isInFlight] = useMutation<useSignInWithGoogleMutation>(graphql`
    mutation useSignInWithGoogleMutation($input: SignInWithGoogleInput!) {
      signInWithGoogle(input: $input) {
        authState {
          id
          ...authDestination_authState
        }
        error {
          __typename
          ... on NotUniversityEmailError {
            message
          }
          ... on InvalidGoogleTokenError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const signIn = (googleIdToken: string, { onSuccess, onNotUniversityEmail, onFailure }: Callbacks) =>
    commit({
      variables: { input: { googleIdToken } },
      onCompleted: ({ signInWithGoogle: result }) => {
        const { error, authState } = result
        if (error !== null && error !== undefined) {
          if (error.__typename === 'NotUniversityEmailError') {
            onNotUniversityEmail()
            return
          }
          onFailure(toMutationErrorMessage(error))
          return
        }
        if (authState === null || authState === undefined) {
          onFailure(NETWORK_ERROR_MESSAGE)
          return
        }
        onSuccess(classifyAuthDestination(readAuthDestination(authState)))
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { signIn, isInFlight }
}
