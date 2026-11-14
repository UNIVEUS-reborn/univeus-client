import { describe, expect, it } from 'vitest'

import { validateIntroduction } from '@src/pages/pageIntroductionEdit/domain/introduction'
import { emptyIntroduction } from '@src/pages/pageIntroductionEdit/domain/introductionFixtures'

const allNull = {
  mbti: null,
  favoriteFood: null,
  recentSong: null,
  interest: null,
  matchingPerson: null,
  collegeGoal: null,
}

describe('validateIntroduction', () => {
  it('전부 비워도 저장할 수 있고 빈 답은 null이에요', () => {
    expect(validateIntroduction(emptyIntroduction)).toEqual({ type: 'VALID', value: allNull })
  })

  it('답은 앞뒤 공백을 지우고, 공백만 있으면 null이에요', () => {
    expect(validateIntroduction({ ...emptyIntroduction, mbti: ' ENFP ', favoriteFood: '   ' })).toEqual({
      type: 'VALID',
      value: { ...allNull, mbti: 'ENFP' },
    })
  })

  it('30자까지 괜찮아요', () => {
    const answer = '가'.repeat(30)
    expect(validateIntroduction({ ...emptyIntroduction, interest: answer })).toEqual({
      type: 'VALID',
      value: { ...allNull, interest: answer },
    })
  })

  it('앞뒤 공백은 글자 수에 넣지 않아요', () => {
    expect(validateIntroduction({ ...emptyIntroduction, interest: ` ${'가'.repeat(30)}` })).toEqual({
      type: 'VALID',
      value: { ...allNull, interest: '가'.repeat(30) },
    })
  })

  it('30자를 넘으면 그 질문을 알려줘요', () => {
    expect(validateIntroduction({ ...emptyIntroduction, recentSong: '가'.repeat(31) })).toEqual({
      type: 'INVALID',
      reason: 'TOO_LONG',
      field: 'recentSong',
    })
  })

  it('여러 개가 넘으면 질문 순서상 첫 번째를 알려줘요', () => {
    expect(
      validateIntroduction({ ...emptyIntroduction, collegeGoal: '가'.repeat(31), favoriteFood: '가'.repeat(31) }),
    ).toEqual({ type: 'INVALID', reason: 'TOO_LONG', field: 'favoriteFood' })
  })
})
