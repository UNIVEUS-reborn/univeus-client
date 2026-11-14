import { graphql, useMutation } from 'react-relay'

import type { useDeleteGroupMutation } from '@src/__generated__/useDeleteGroupMutation.graphql'
import { homeGroupConnectionIds } from '@src/components/common/Group/homeGroupConnections'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onSuccess: () => void
  onFailure: (message: string) => void
}

export function useDeleteGroup() {
  const [commit, isInFlight] = useMutation<useDeleteGroupMutation>(graphql`
    mutation useDeleteGroupMutation($input: DeleteGroupInput!, $connections: [ID!]!) {
      deleteGroup(input: $input) {
        deletedId @deleteEdge(connections: $connections)
        error {
          __typename
          ... on NotFoundGroupError {
            message
          }
          ... on NotGroupHostError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const deleteGroup = (groupId: string, category: string, { onSuccess, onFailure }: Callbacks) =>
    commit({
      variables: { input: { groupId }, connections: homeGroupConnectionIds(category) },
      onCompleted: ({ deleteGroup: result }) => {
        if (result.error !== null && result.error !== undefined) {
          onFailure(toMutationErrorMessage(result.error))
          return
        }
        if (result.deletedId === null || result.deletedId === undefined) {
          onFailure(NETWORK_ERROR_MESSAGE)
          return
        }
        onSuccess()
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { deleteGroup, isInFlight }
}
