import { graphql, readInlineData } from 'relay-runtime'

import type { groupJoinAction_group$key } from '@src/__generated__/groupJoinAction_group.graphql'
import type { GroupJoinActionInput } from '@src/pages/pageGroupDetail/domain/groupJoinAction'

export function readGroupJoinAction(groupRef: groupJoinAction_group$key): GroupJoinActionInput {
  return readInlineData(
    graphql`
      fragment groupJoinAction_group on Group @inline {
        status
        viewerRole
        viewerJoinRestriction
      }
    `,
    groupRef,
  )
}
