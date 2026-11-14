import type { GroupJoinActionInput } from '@src/pages/pageGroupDetail/domain/groupJoinAction'

export const joinableGroup: GroupJoinActionInput = {
  status: 'RECRUITING',
  viewerRole: 'NONE',
  viewerJoinRestriction: 'NONE',
}
