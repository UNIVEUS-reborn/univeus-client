import { describe, expect, it } from 'vitest'

import { classifyGroupHostAction } from '@src/components/common/Group/domain/groupHostAction'
import { recruitingGuestGroup, recruitingHostGroup } from '@src/components/common/Group/domain/groupHostActionFixtures'

describe('classifyGroupHostAction', () => {
  it('호스트이고 모집 중이면 관리할 수 있어요', () => {
    expect(classifyGroupHostAction(recruitingHostGroup)).toEqual({ type: 'MANAGE' })
  })

  it.each(['CLOSED_BY_HOST', 'CLOSED_FULL', 'CLOSED_DEADLINE'] as const)(
    '호스트이고 %s 상태면 모집 종료예요',
    (status) => {
      expect(classifyGroupHostAction({ ...recruitingHostGroup, status })).toEqual({ type: 'CLOSED' })
    },
  )

  it('호스트인데 알 수 없는 상태면 관리를 막아요', () => {
    expect(classifyGroupHostAction({ ...recruitingHostGroup, status: '%future added value' })).toEqual({
      type: 'CLOSED',
    })
  })

  it.each(['PARTICIPANT', 'PENDING', 'NONE'] as const)('%s는 호스트가 아니에요', (viewerRole) => {
    expect(classifyGroupHostAction({ ...recruitingGuestGroup, viewerRole })).toEqual({ type: 'NOT_HOST' })
  })

  it('호스트가 아니면 모집이 끝나도 호스트가 아니에요', () => {
    expect(classifyGroupHostAction({ ...recruitingGuestGroup, status: 'CLOSED_FULL' })).toEqual({
      type: 'NOT_HOST',
    })
  })

  it('알 수 없는 관계면 호스트가 아닌 걸로 봐요', () => {
    expect(classifyGroupHostAction({ ...recruitingGuestGroup, viewerRole: '%future added value' })).toEqual({
      type: 'NOT_HOST',
    })
  })
})
