import type { GroupHostActionInput } from '@src/components/common/Group/domain/groupHostAction'

export const recruitingHostGroup: GroupHostActionInput = {
  status: 'RECRUITING',
  viewerRole: 'HOST',
}

export const recruitingGuestGroup: GroupHostActionInput = {
  status: 'RECRUITING',
  viewerRole: 'NONE',
}
