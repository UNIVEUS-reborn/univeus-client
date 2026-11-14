import { describe, expect, it } from 'vitest'

import { classifyGroupJoinAction } from '@src/pages/pageGroupDetail/domain/groupJoinAction'
import { joinableGroup } from '@src/pages/pageGroupDetail/domain/groupJoinActionFixtures'

describe('classifyGroupJoinAction', () => {
  it('모집 중이고 관계와 제한이 없으면 참여할 수 있어요', () => {
    expect(classifyGroupJoinAction(joinableGroup)).toEqual({ type: 'JOIN' })
  })

  it.each(['PARTICIPANT', 'PENDING'] as const)('%s면 참여를 취소할 수 있어요', (viewerRole) => {
    expect(classifyGroupJoinAction({ ...joinableGroup, viewerRole })).toEqual({ type: 'CANCEL' })
  })

  it.each(['CLOSED_BY_HOST', 'CLOSED_FULL', 'CLOSED_DEADLINE', '%future added value'] as const)(
    '%s 상태면 모집 종료로 막아요',
    (status) => {
      expect(classifyGroupJoinAction({ ...joinableGroup, status })).toEqual({ type: 'BLOCKED', reason: 'CLOSED' })
    },
  )

  it('모집이 끝나면 참여 중이어도 취소할 수 없어요', () => {
    expect(classifyGroupJoinAction({ ...joinableGroup, status: 'CLOSED_FULL', viewerRole: 'PARTICIPANT' })).toEqual({
      type: 'BLOCKED',
      reason: 'CLOSED',
    })
  })

  it('성별 제한이 있으면 참여할 수 없어요', () => {
    expect(classifyGroupJoinAction({ ...joinableGroup, viewerJoinRestriction: 'GENDER' })).toEqual({
      type: 'BLOCKED',
      reason: 'GENDER',
    })
  })

  it('모집 종료가 성별 제한보다 먼저예요', () => {
    expect(
      classifyGroupJoinAction({ ...joinableGroup, status: 'CLOSED_BY_HOST', viewerJoinRestriction: 'GENDER' }),
    ).toEqual({ type: 'BLOCKED', reason: 'CLOSED' })
  })

  it('이미 참여했으면 성별 제한이 있어도 취소할 수 있어요', () => {
    expect(
      classifyGroupJoinAction({ ...joinableGroup, viewerRole: 'PENDING', viewerJoinRestriction: 'GENDER' }),
    ).toEqual({ type: 'CANCEL' })
  })

  it('호스트는 참여 버튼 대상이 아니에요', () => {
    expect(classifyGroupJoinAction({ ...joinableGroup, viewerRole: 'HOST' })).toEqual({
      type: 'BLOCKED',
      reason: 'HOST',
    })
  })

  it('알 수 없는 관계면 막아요', () => {
    expect(classifyGroupJoinAction({ ...joinableGroup, viewerRole: '%future added value' })).toEqual({
      type: 'BLOCKED',
      reason: 'UNKNOWN',
    })
  })

  it('알 수 없는 제한이면 막아요', () => {
    expect(classifyGroupJoinAction({ ...joinableGroup, viewerJoinRestriction: '%future added value' })).toEqual({
      type: 'BLOCKED',
      reason: 'UNKNOWN',
    })
  })
})
