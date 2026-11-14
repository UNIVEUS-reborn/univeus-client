export const INTRODUCTION_ANSWER_MAX_LENGTH = 30

export const INTRODUCTION_FIELDS = [
  'mbti',
  'favoriteFood',
  'recentSong',
  'interest',
  'matchingPerson',
  'collegeGoal',
] as const

export type IntroductionField = (typeof INTRODUCTION_FIELDS)[number]

export type IntroductionInput = Record<IntroductionField, string>

export function validateIntroduction(
  input: IntroductionInput,
):
  | { type: 'VALID'; value: Record<IntroductionField, string | null> }
  | { type: 'INVALID'; reason: 'TOO_LONG'; field: IntroductionField } {
  const tooLong = INTRODUCTION_FIELDS.find((field) => input[field].trim().length > INTRODUCTION_ANSWER_MAX_LENGTH)
  if (tooLong !== undefined) {
    return { type: 'INVALID', reason: 'TOO_LONG', field: tooLong }
  }
  const answerOf = (field: IntroductionField) => input[field].trim() || null
  return {
    type: 'VALID',
    value: {
      mbti: answerOf('mbti'),
      favoriteFood: answerOf('favoriteFood'),
      recentSong: answerOf('recentSong'),
      interest: answerOf('interest'),
      matchingPerson: answerOf('matchingPerson'),
      collegeGoal: answerOf('collegeGoal'),
    },
  }
}
