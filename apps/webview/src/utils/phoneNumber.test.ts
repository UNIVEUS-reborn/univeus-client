import { describe, expect, it } from 'vitest'

import { formatPhoneNumber, toDigits } from '@src/utils/phoneNumber'

describe('phoneNumber', () => {
  it('숫자만 남겨요', () => {
    expect(toDigits('010-1234 5678')).toBe('01012345678')
  })

  it.each([
    ['010', '010'],
    ['0101', '010-1'],
    ['0101234', '010-1234'],
    ['01012345', '010-1234-5'],
    ['01012345678', '010-1234-5678'],
    ['010123456789', '010-1234-5678'],
    ['010-12a34', '010-1234'],
  ])('%s는 %s로 보여줘요', (input, expected) => {
    expect(formatPhoneNumber(input)).toBe(expected)
  })
})
