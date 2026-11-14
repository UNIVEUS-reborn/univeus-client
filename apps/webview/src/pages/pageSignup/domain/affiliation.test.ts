import { describe, expect, it } from 'vitest'

import { validateAffiliation } from '@src/pages/pageSignup/domain/affiliation'
import { validAffiliation } from '@src/pages/pageSignup/domain/affiliationFixtures'

describe('validateAffiliation', () => {
  it('단과대와 9자리 학번이면 통과해요', () => {
    expect(validateAffiliation(validAffiliation)).toEqual({
      type: 'VALID',
      value: { college: 'SOFTWARE_AND_BUSINESS', studentId: '201912345' },
    })
  })

  it('단과대를 고르지 않으면 막아요', () => {
    expect(validateAffiliation({ ...validAffiliation, college: null })).toEqual({
      type: 'INVALID',
      reason: 'COLLEGE_REQUIRED',
    })
  })

  it.each(['', '20191234', '2019123456', '20191234a'])('학번 "%s"는 형식이 틀려요', (studentId) => {
    expect(validateAffiliation({ ...validAffiliation, studentId })).toEqual({
      type: 'INVALID',
      reason: 'INVALID_STUDENT_ID',
    })
  })

  it('단과대가 학번보다 먼저예요', () => {
    expect(validateAffiliation({ college: null, studentId: '' })).toEqual({
      type: 'INVALID',
      reason: 'COLLEGE_REQUIRED',
    })
  })
})
