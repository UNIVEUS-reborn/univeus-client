import { graphql, useMutation } from 'react-relay'

import type { useJoinGroupMutation } from '@src/__generated__/useJoinGroupMutation.graphql'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Callbacks = {
  onJoined: () => void
  onPending: () => void
  onFailure: (message: string) => void
}

export function useJoinGroup() {
  const [commit, isInFlight] = useMutation<useJoinGroupMutation>(graphql`
    mutation useJoinGroupMutation($input: JoinGroupInput!) {
      joinGroup(input: $input) {
        group {
          id
          viewerRole
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
          ... on AlreadyJoinedGroupError {
            message
          }
          ... on GenderRestrictedGroupError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const joinGroup = (groupId: string, { onJoined, onPending, onFailure }: Callbacks) =>
    commit({
      variables: { input: { groupId } },
      onCompleted: ({ joinGroup: result }) => {
        if (result.error !== null && result.error !== undefined) {
          onFailure(toMutationErrorMessage(result.error))
          return
        }
        switch (result.group?.viewerRole) {
          case 'PARTICIPANT':
            onJoined()
            return
          case 'PENDING':
            onPending()
            return
          default:
            onFailure(NETWORK_ERROR_MESSAGE)
        }
      },
      onError: () => onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { joinGroup, isInFlight }
}
