export type ProfileSaveInput = {
  originalNickname: string
  nickname: string
  checkedNickname: string | null
}

export function canSaveProfile({
  originalNickname,
  nickname,
  checkedNickname,
}: ProfileSaveInput): { type: 'ALLOWED' } | { type: 'BLOCKED'; reason: 'NEEDS_CHECK' } {
  if (nickname === originalNickname || nickname === checkedNickname) {
    return { type: 'ALLOWED' }
  }
  return { type: 'BLOCKED', reason: 'NEEDS_CHECK' }
}
