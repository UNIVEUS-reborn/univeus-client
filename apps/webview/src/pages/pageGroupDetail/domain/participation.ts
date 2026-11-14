type GroupStatus = 'RECRUITING' | 'CLOSED_BY_HOST' | 'CLOSED_FULL' | 'CLOSED_DEADLINE' | '%future added value'
type GroupViewerRole = 'HOST' | 'PARTICIPANT' | 'PENDING' | 'NONE' | '%future added value'
type ParticipationStatus = 'PARTICIPATING' | 'PENDING' | '%future added value'

export type ParticipationInput = {
  participationStatus: ParticipationStatus
  viewerRole: GroupViewerRole
  groupStatus: GroupStatus
}

export type ParticipationDisplay =
  | { type: 'PARTICIPATING' }
  | { type: 'PENDING' }
  | { type: 'APPROVABLE' }
  | { type: 'UNKNOWN' }

export function classifyParticipation({
  participationStatus,
  viewerRole,
  groupStatus,
}: ParticipationInput): ParticipationDisplay {
  switch (participationStatus) {
    case 'PARTICIPATING':
      return { type: 'PARTICIPATING' }
    case 'PENDING':
      return viewerRole === 'HOST' && groupStatus === 'RECRUITING' ? { type: 'APPROVABLE' } : { type: 'PENDING' }
    case '%future added value':
      return { type: 'UNKNOWN' }
  }
}
