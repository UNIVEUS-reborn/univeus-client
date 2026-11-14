import type { ParticipationInput } from '@src/pages/pageGroupDetail/domain/participation'

export const pendingForHost: ParticipationInput = {
  participationStatus: 'PENDING',
  viewerRole: 'HOST',
  groupStatus: 'RECRUITING',
}
