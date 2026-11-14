import { graphql, useMutation } from 'react-relay'

import type { useSignOutMutation } from '@src/__generated__/useSignOutMutation.graphql'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

export function useSignOut() {
  const [commit, isInFlight] = useMutation<useSignOutMutation>(graphql`
    mutation useSignOutMutation {
      signOut {
        authState {
          id
          status
        }
        error {
          __typename
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const signOut = (onFailure: (message: string) => void) =>
    commit({
      variables: {},
      onCompleted: ({ signOut: result }) => {
        if (result.error !== null && result.error !== undefined) {
          onFailure(toMutationErrorMessage(result.error))
          return
        }
        window.location.replace('/')
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { signOut, isInFlight }
}
