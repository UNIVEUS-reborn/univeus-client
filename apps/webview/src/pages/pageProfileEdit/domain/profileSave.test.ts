import { describe, expect, it } from 'vitest'

import { canSaveProfile } from '@src/pages/pageProfileEdit/domain/profileSave'
import { unchangedNickname } from '@src/pages/pageProfileEdit/domain/profileSaveFixtures'

describe('canSaveProfile', () => {
  it('닉네임을 바꾸지 않았으면 저장할 수 있어요', () => {
    expect(canSaveProfile(unchangedNickname)).toEqual({ type: 'ALLOWED' })
  })

  it('바꾼 닉네임이 중복확인을 통과한 값이면 저장할 수 있어요', () => {
    expect(canSaveProfile({ ...unchangedNickname, nickname: '버스', checkedNickname: '버스' })).toEqual({
      type: 'ALLOWED',
    })
  })

  it('바꾼 닉네임을 확인하지 않았으면 중복확인이 필요해요', () => {
    expect(canSaveProfile({ ...unchangedNickname, nickname: '버스' })).toEqual({
      type: 'BLOCKED',
      reason: 'NEEDS_CHECK',
    })
  })

  it('확인한 뒤 다시 바꾸면 중복확인이 필요해요', () => {
    expect(canSaveProfile({ ...unchangedNickname, nickname: '버스2', checkedNickname: '버스' })).toEqual({
      type: 'BLOCKED',
      reason: 'NEEDS_CHECK',
    })
  })

  it('바꿨다가 원래 닉네임으로 되돌리면 저장할 수 있어요', () => {
    expect(canSaveProfile({ ...unchangedNickname, checkedNickname: '버스' })).toEqual({ type: 'ALLOWED' })
  })
})
