import { graphql, useMutation } from 'react-relay'

import type { useApproveParticipationMutation } from '@src/__generated__/useApproveParticipationMutation.graphql'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onSuccess: () => void
  onFailure: (message: string) => void
}

export function useApproveParticipation() {
  const [commit, isInFlight] = useMutation<useApproveParticipationMutation>(graphql`
    mutation useApproveParticipationMutation($input: ApproveParticipationInput!) {
      approveParticipation(input: $input) {
        participation {
          id
          status
          group {
            id
            ...groupHostAction_group
            ...GroupParticipants_group
            ...GroupDetailInfo_group
          }
        }
        error {
          __typename
          ... on NotFoundParticipationError {
            message
          }
          ... on NotGroupHostError {
            message
          }
          ... on GroupAlreadyClosedError {
            message
          }
          ... on ParticipationAlreadyApprovedError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const approveParticipation = (participationId: string, { onSuccess, onFailure }: Callbacks) =>
    commit({
      variables: { input: { participationId } },
      onCompleted: ({ approveParticipation: result }) => {
        if (result.error !== null && result.error !== undefined) {
          onFailure(toMutationErrorMessage(result.error))
          return
        }
        if (result.participation === null || result.participation === undefined) {
          onFailure(NETWORK_ERROR_MESSAGE)
          return
        }
        onSuccess()
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { approveParticipation, isInFlight }
}
