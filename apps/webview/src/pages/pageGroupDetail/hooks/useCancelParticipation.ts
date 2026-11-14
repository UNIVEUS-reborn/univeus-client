import { graphql, useMutation } from 'react-relay'

import type { useCancelParticipationMutation } from '@src/__generated__/useCancelParticipationMutation.graphql'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onSuccess: () => void
  onFailure: (message: string) => void
}

export function useCancelParticipation() {
  const [commit, isInFlight] = useMutation<useCancelParticipationMutation>(graphql`
    mutation useCancelParticipationMutation($input: CancelParticipationInput!) {
      cancelParticipation(input: $input) {
        group {
          id
          ...groupJoinAction_group
          ...groupHostAction_group
          ...GroupParticipants_group
          ...GroupDetailInfo_group
        }
        error {
          __typename
          ... on NotFoundGroupError {
            message
          }
          ... on GroupAlreadyClosedError {
            message
          }
          ... on NotGroupParticipantError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const cancelParticipation = (groupId: string, { onSuccess, onFailure }: Callbacks) =>
    commit({
      variables: { input: { groupId } },
      onCompleted: ({ cancelParticipation: result }) => {
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

  return { cancelParticipation, isInFlight }
}
