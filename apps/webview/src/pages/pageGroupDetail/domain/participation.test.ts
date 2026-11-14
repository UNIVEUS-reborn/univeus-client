import { describe, expect, it } from 'vitest'

import { classifyParticipation } from '@src/pages/pageGroupDetail/domain/participation'
import { pendingForHost } from '@src/pages/pageGroupDetail/domain/participationFixtures'

describe('classifyParticipation', () => {
  it('모집 중인 모임의 호스트는 승인 대기를 승인할 수 있어요', () => {
    expect(classifyParticipation(pendingForHost)).toEqual({ type: 'APPROVABLE' })
  })

  it.each(['HOST', 'PARTICIPANT', 'PENDING', 'NONE'] as const)('%s가 보면 참여 중은 참여중이에요', (viewerRole) => {
    expect(classifyParticipation({ ...pendingForHost, participationStatus: 'PARTICIPATING', viewerRole })).toEqual({
      type: 'PARTICIPATING',
    })
  })

  it.each(['PARTICIPANT', 'PENDING', 'NONE', '%future added value'] as const)(
    '%s가 보면 승인 대기는 대기중이에요',
    (viewerRole) => {
      expect(classifyParticipation({ ...pendingForHost, viewerRole })).toEqual({ type: 'PENDING' })
    },
  )

  it.each(['CLOSED_BY_HOST', 'CLOSED_FULL', 'CLOSED_DEADLINE', '%future added value'] as const)(
    '%s 상태면 호스트도 승인할 수 없어요',
    (groupStatus) => {
      expect(classifyParticipation({ ...pendingForHost, groupStatus })).toEqual({ type: 'PENDING' })
    },
  )

  it('알 수 없는 참여 상태는 표시하지 않아요', () => {
    expect(classifyParticipation({ ...pendingForHost, participationStatus: '%future added value' })).toEqual({
      type: 'UNKNOWN',
    })
  })
})
