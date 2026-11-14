import { graphql, readInlineData } from 'relay-runtime'

import type { groupHostAction_group$key } from '@src/__generated__/groupHostAction_group.graphql'
import type { GroupHostActionInput } from '@src/components/common/Group/domain/groupHostAction'

export function readGroupHostAction(groupRef: groupHostAction_group$key): GroupHostActionInput {
  return readInlineData(
    graphql`
      fragment groupHostAction_group on Group @inline {
        status
        viewerRole
      }
    `,
    groupRef,
  )
}
