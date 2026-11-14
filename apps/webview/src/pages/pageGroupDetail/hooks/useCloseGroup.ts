import { graphql, useMutation } from 'react-relay'

import type { useCloseGroupMutation } from '@src/__generated__/useCloseGroupMutation.graphql'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onSuccess: () => void
  onFailure: (message: string) => void
}

export function useCloseGroup() {
  const [commit, isInFlight] = useMutation<useCloseGroupMutation>(graphql`
    mutation useCloseGroupMutation($input: CloseGroupInput!) {
      closeGroup(input: $input) {
        group {
          id
          status
        }
        error {
          __typename
          ... on NotFoundGroupError {
            message
          }
          ... on NotGroupHostError {
            message
          }
          ... on GroupAlreadyClosedError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const closeGroup = (groupId: string, { onSuccess, onFailure }: Callbacks) =>
    commit({
      variables: { input: { groupId } },
      onCompleted: ({ closeGroup: result }) => {
        if (result.error !== null && result.error !== undefined) {
          onFailure(toMutationErrorMessage(result.error))
          return
        }
        if (result.group === null || result.group === undefined) {
          onFailure(NETWORK_ERROR_MESSAGE)
          return
        }
        onSuccess()
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { closeGroup, isInFlight }
}
