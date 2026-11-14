import { graphql, useMutation } from 'react-relay'

import type { useUpdateGroupMutation } from '@src/__generated__/useUpdateGroupMutation.graphql'
import type { GroupFormSubmitValues } from '@src/components/common/GroupForm/groupFormValues'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onSuccess: () => void
  onFailure: (message: string) => void
}

export function useUpdateGroup() {
  const [commit, isInFlight] = useMutation<useUpdateGroupMutation>(graphql`
    mutation useUpdateGroupMutation($input: UpdateGroupInput!) {
      updateGroup(input: $input) {
        group {
          id
          ...GroupCard_group
          ...GroupDetailHost_group
          ...GroupDetailInfo_group
          ...GroupDetailBody_group
        }
        error {
          __typename
          ... on NotFoundGroup {
            message
          }
          ... on NotGroupHost {
            message
          }
          ... on GroupAlreadyClosed {
            message
          }
          ... on InvalidGroupInput {
            message
          }
          ... on CapacityBelowParticipants {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const updateGroup = (groupId: string, values: GroupFormSubmitValues, { onSuccess, onFailure }: Callbacks) =>
    commit({
      variables: { input: { groupId, ...values } },
      onCompleted: ({ updateGroup: result }) => {
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

  return { updateGroup, isInFlight }
}
