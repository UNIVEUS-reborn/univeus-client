import { toDigits } from '@src/utils/phoneNumber'

export const PHONE_NUMBER_LENGTH = 11
export const VERIFICATION_CODE_LENGTH = 6

export function validatePhoneNumber(
  input: string,
): { type: 'VALID'; value: string } | { type: 'INVALID'; reason: 'EMPTY' | 'INVALID_FORMAT' } {
  const digits = toDigits(input)
  if (digits === '') {
    return { type: 'INVALID', reason: 'EMPTY' }
  }
  if (digits.length !== PHONE_NUMBER_LENGTH) {
    return { type: 'INVALID', reason: 'INVALID_FORMAT' }
  }
  return { type: 'VALID', value: digits }
}

export function validateVerificationCode(
  input: string,
): { type: 'VALID'; value: string } | { type: 'INVALID'; reason: 'EMPTY' | 'INVALID_FORMAT' } {
  if (input === '') {
    return { type: 'INVALID', reason: 'EMPTY' }
  }
  if (!new RegExp(`^\\d{${VERIFICATION_CODE_LENGTH}}$`).test(input)) {
    return { type: 'INVALID', reason: 'INVALID_FORMAT' }
  }
  return { type: 'VALID', value: input }
}
