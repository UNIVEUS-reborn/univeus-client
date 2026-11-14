import { describe, expect, it } from 'vitest'

import { canRegisterProfile } from '@src/pages/pageSignup/domain/profileRegister'
import { readyProfile } from '@src/pages/pageSignup/domain/profileRegisterFixtures'

describe('canRegisterProfile', () => {
  it('중복확인을 통과하고 성별을 고르면 가입할 수 있어요', () => {
    expect(canRegisterProfile(readyProfile)).toEqual({ type: 'ALLOWED' })
  })

  it('중복확인을 안 했으면 막아요', () => {
    expect(canRegisterProfile({ ...readyProfile, checkedNickname: null })).toEqual({
      type: 'BLOCKED',
      reason: 'NEEDS_CHECK',
    })
  })

  it('확인한 뒤 닉네임을 바꾸면 막아요', () => {
    expect(canRegisterProfile({ ...readyProfile, nickname: '유니2' })).toEqual({
      type: 'BLOCKED',
      reason: 'NEEDS_CHECK',
    })
  })

  it('성별을 고르지 않으면 막아요', () => {
    expect(canRegisterProfile({ ...readyProfile, gender: null })).toEqual({
      type: 'BLOCKED',
      reason: 'GENDER_REQUIRED',
    })
  })

  it('중복확인이 성별보다 먼저예요', () => {
    expect(canRegisterProfile({ nickname: '유니', checkedNickname: null, gender: null })).toEqual({
      type: 'BLOCKED',
      reason: 'NEEDS_CHECK',
    })
  })
})
