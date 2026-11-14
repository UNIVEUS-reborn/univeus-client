import { graphql, useMutation } from 'react-relay'

import type { useCreateGroupMutation } from '@src/__generated__/useCreateGroupMutation.graphql'
import { homeGroupConnectionIds } from '@src/components/common/Group/homeGroupConnections'
import type { GroupFormSubmitValues } from '@src/components/common/GroupForm/groupFormValues'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onSuccess: (groupId: string) => void
  onFailure: (message: string) => void
}

export function useCreateGroup() {
  const [commit, isInFlight] = useMutation<useCreateGroupMutation>(graphql`
    mutation useCreateGroupMutation($input: CreateGroupInput!, $connections: [ID!]!) {
      createGroup(input: $input) {
        edge @prependEdge(connections: $connections) {
          cursor
          node {
            id
            _id
            ...GroupCard_group
          }
        }
        error {
          __typename
          ... on InvalidGroupInputError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const createGroup = (values: GroupFormSubmitValues, { onSuccess, onFailure }: Callbacks) =>
    commit({
      variables: { input: values, connections: homeGroupConnectionIds(values.category) },
      onCompleted: ({ createGroup: result }) => {
        if (result.error !== null && result.error !== undefined) {
          onFailure(toMutationErrorMessage(result.error))
          return
        }
        if (result.edge === null || result.edge === undefined) {
          onFailure(NETWORK_ERROR_MESSAGE)
          return
        }
        onSuccess(result.edge.node._id)
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { createGroup, isInFlight }
}
