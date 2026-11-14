export const NICKNAME_MIN_LENGTH = 2
export const NICKNAME_MAX_LENGTH = 13

const SPECIAL_CHARACTER = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/

export function validateNickname(
  nickname: string,
): { type: 'VALID'; value: string } | { type: 'INVALID'; reason: 'TOO_SHORT' | 'TOO_LONG' | 'SPECIAL_CHARACTER' } {
  const value = nickname.trim()
  if (value.length < NICKNAME_MIN_LENGTH) {
    return { type: 'INVALID', reason: 'TOO_SHORT' }
  }
  if (value.length > NICKNAME_MAX_LENGTH) {
    return { type: 'INVALID', reason: 'TOO_LONG' }
  }
  if (SPECIAL_CHARACTER.test(value)) {
    return { type: 'INVALID', reason: 'SPECIAL_CHARACTER' }
  }
  return { type: 'VALID', value }
}
