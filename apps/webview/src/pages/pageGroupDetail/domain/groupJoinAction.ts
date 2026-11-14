type GroupStatus = 'RECRUITING' | 'CLOSED_BY_HOST' | 'CLOSED_FULL' | 'CLOSED_DEADLINE' | '%future added value'
type GroupViewerRole = 'HOST' | 'PARTICIPANT' | 'PENDING' | 'NONE' | '%future added value'
type GroupJoinRestriction = 'NONE' | 'GENDER' | '%future added value'

export type GroupJoinActionInput = {
  status: GroupStatus
  viewerRole: GroupViewerRole
  viewerJoinRestriction: GroupJoinRestriction
}

export type GroupJoinAction =
  | { type: 'JOIN' }
  | { type: 'CANCEL' }
  | { type: 'BLOCKED'; reason: 'CLOSED' | 'GENDER' | 'HOST' | 'UNKNOWN' }

export function classifyGroupJoinAction({
  status,
  viewerRole,
  viewerJoinRestriction,
}: GroupJoinActionInput): GroupJoinAction {
  if (viewerRole === 'HOST') {
    return { type: 'BLOCKED', reason: 'HOST' }
  }
  if (viewerRole === '%future added value') {
    return { type: 'BLOCKED', reason: 'UNKNOWN' }
  }
  if (status !== 'RECRUITING') {
    return { type: 'BLOCKED', reason: 'CLOSED' }
  }
  if (viewerRole === 'PARTICIPANT' || viewerRole === 'PENDING') {
    return { type: 'CANCEL' }
  }
  switch (viewerJoinRestriction) {
    case 'NONE':
      return { type: 'JOIN' }
    case 'GENDER':
      return { type: 'BLOCKED', reason: 'GENDER' }
    case '%future added value':
      return { type: 'BLOCKED', reason: 'UNKNOWN' }
  }
}
