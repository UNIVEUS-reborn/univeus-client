import { describe, expect, it } from 'vitest'

import { canAgreeToTerms } from '@src/pages/pageSignup/domain/terms'
import { requiredAgreed } from '@src/pages/pageSignup/domain/termsFixtures'

describe('canAgreeToTerms', () => {
  it('필수 2개에 동의하면 다음으로 갈 수 있어요', () => {
    expect(canAgreeToTerms(requiredAgreed)).toEqual({ type: 'ALLOWED' })
  })

  it('문자 수신 동의는 상관없어요', () => {
    expect(canAgreeToTerms({ ...requiredAgreed, marketing: true })).toEqual({ type: 'ALLOWED' })
  })

  it.each(['serviceTerms', 'privacyPolicy'] as const)('%s에 동의하지 않으면 막아요', (field) => {
    expect(canAgreeToTerms({ ...requiredAgreed, [field]: false })).toEqual({
      type: 'BLOCKED',
      reason: 'REQUIRED_NOT_AGREED',
    })
  })

  it('문자 수신만 동의하면 막아요', () => {
    expect(canAgreeToTerms({ serviceTerms: false, privacyPolicy: false, marketing: true })).toEqual({
      type: 'BLOCKED',
      reason: 'REQUIRED_NOT_AGREED',
    })
  })
})
