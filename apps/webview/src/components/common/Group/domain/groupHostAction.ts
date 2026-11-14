type GroupStatus = 'RECRUITING' | 'CLOSED_BY_HOST' | 'CLOSED_FULL' | 'CLOSED_DEADLINE' | '%future added value'
type GroupViewerRole = 'HOST' | 'PARTICIPANT' | 'PENDING' | 'NONE' | '%future added value'

export type GroupHostActionInput = {
  status: GroupStatus
  viewerRole: GroupViewerRole
}

export type GroupHostAction = { type: 'MANAGE' } | { type: 'CLOSED' } | { type: 'NOT_HOST' }

export function classifyGroupHostAction({ status, viewerRole }: GroupHostActionInput): GroupHostAction {
  if (viewerRole !== 'HOST') {
    return { type: 'NOT_HOST' }
  }
  if (status === 'RECRUITING') {
    return { type: 'MANAGE' }
  }
  return { type: 'CLOSED' }
}
