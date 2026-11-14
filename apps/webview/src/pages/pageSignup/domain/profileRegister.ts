type Gender = 'MALE' | 'FEMALE'

export type ProfileRegisterInput = {
  nickname: string
  checkedNickname: string | null
  gender: Gender | null
}

export function canRegisterProfile({
  nickname,
  checkedNickname,
  gender,
}: ProfileRegisterInput): { type: 'ALLOWED' } | { type: 'BLOCKED'; reason: 'NEEDS_CHECK' | 'GENDER_REQUIRED' } {
  if (nickname !== checkedNickname) {
    return { type: 'BLOCKED', reason: 'NEEDS_CHECK' }
  }
  if (gender === null) {
    return { type: 'BLOCKED', reason: 'GENDER_REQUIRED' }
  }
  return { type: 'ALLOWED' }
}
