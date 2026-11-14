import { describe, expect, it } from 'vitest'

import { validatePhoneNumber, validateVerificationCode } from '@src/pages/pageSignup/domain/identity'

describe('validatePhoneNumber', () => {
  it.each(['01012345678', '010-1234-5678', ' 010 1234 5678 '])('"%s"는 숫자 11자리로 돌려줘요', (input) => {
    expect(validatePhoneNumber(input)).toEqual({ type: 'VALID', value: '01012345678' })
  })

  it.each(['', '   ', '---'])('"%s"는 비어 있어요', (input) => {
    expect(validatePhoneNumber(input)).toEqual({ type: 'INVALID', reason: 'EMPTY' })
  })

  it.each(['0101234567', '010123456789', '010-123'])('"%s"는 형식이 틀려요', (input) => {
    expect(validatePhoneNumber(input)).toEqual({ type: 'INVALID', reason: 'INVALID_FORMAT' })
  })
})

describe('validateVerificationCode', () => {
  it('숫자 6자리면 통과해요', () => {
    expect(validateVerificationCode('123456')).toEqual({ type: 'VALID', value: '123456' })
  })

  it('비어 있으면 입력하지 않은 거예요', () => {
    expect(validateVerificationCode('')).toEqual({ type: 'INVALID', reason: 'EMPTY' })
  })

  it.each(['12345', '1234567', '12345a'])('"%s"는 형식이 틀려요', (input) => {
    expect(validateVerificationCode(input)).toEqual({ type: 'INVALID', reason: 'INVALID_FORMAT' })
  })
})
