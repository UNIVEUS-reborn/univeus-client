import { describe, expect, it } from 'vitest'

import { validateNickname } from '@src/components/common/User/domain/nickname'

describe('validateNickname', () => {
  it.each(['유니', '가'.repeat(13), 'univeus', '유니 버스', 'abc123'])('"%s"는 쓸 수 있어요', (nickname) => {
    expect(validateNickname(nickname)).toEqual({ type: 'VALID', value: nickname })
  })

  it('앞뒤 공백을 지워서 돌려줘요', () => {
    expect(validateNickname('  유니버스  ')).toEqual({ type: 'VALID', value: '유니버스' })
  })

  it.each(['', '가', '   ', ' 가 '])('"%s"는 너무 짧아요', (nickname) => {
    expect(validateNickname(nickname)).toEqual({ type: 'INVALID', reason: 'TOO_SHORT' })
  })

  it('14자 이상이면 너무 길어요', () => {
    expect(validateNickname('가'.repeat(14))).toEqual({ type: 'INVALID', reason: 'TOO_LONG' })
  })

  it.each(['유니!', 'a@b', '유니_버스', 'uni.verse', '유니/버스', 'a"b', '유니?'])(
    '"%s"처럼 특수문자가 있으면 안 돼요',
    (nickname) => {
      expect(validateNickname(nickname)).toEqual({ type: 'INVALID', reason: 'SPECIAL_CHARACTER' })
    },
  )

  it('짧은 게 특수문자보다 먼저예요', () => {
    expect(validateNickname('!')).toEqual({ type: 'INVALID', reason: 'TOO_SHORT' })
  })

  it('긴 게 특수문자보다 먼저예요', () => {
    expect(validateNickname(`${'가'.repeat(13)}!`)).toEqual({ type: 'INVALID', reason: 'TOO_LONG' })
  })
})
