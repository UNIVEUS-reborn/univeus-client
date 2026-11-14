import { describe, expect, it } from 'vitest'

import {
  formatAdmissionYear,
  formatCardDate,
  formatCardTime,
  formatDeadline,
  formatMeetingAt,
  toKstDateAndTime,
  toKstDateTime,
  toKstToday,
} from '@src/utils/dateTime'

describe('toKstDateTime', () => {
  it('날짜와 시간을 KST ISO 문자열로 합쳐요', () => {
    expect(toKstDateTime('2026-11-12', '13:00')).toBe('2026-11-12T13:00:00+09:00')
  })

  it.each([
    ['2026-02-30', '13:00'],
    ['2026-13-01', '13:00'],
    ['2026-11-12', '25:00'],
    ['2026/11/12', '13:00'],
    ['', ''],
  ])('%s %s는 날짜로 바꿀 수 없어요', (date, time) => {
    expect(toKstDateTime(date, time)).toBeNull()
  })
})

describe('KST 표시', () => {
  const iso = '2026-03-04T15:05:00.000Z'

  it('UTC 시각을 KST 날짜와 시간으로 나눠요', () => {
    expect(toKstDateAndTime(iso)).toEqual({ date: '2026-03-05', time: '00:05' })
  })

  it('KST 기준 오늘 날짜를 알려줘요', () => {
    expect(toKstToday(new Date(iso))).toBe('2026-03-05')
  })

  it('마감 일시, 모임 일시, 카드 날짜·시간 형식으로 보여줘요', () => {
    expect(formatDeadline(iso)).toBe('2026년 03월 05일 마감')
    expect(formatMeetingAt(iso)).toBe('2026년 03월 05일 / 00:05')
    expect(formatCardDate(iso)).toBe('3월5일')
    expect(formatCardTime(iso)).toBe('00:05')
  })

  it('입학 연도를 학번으로 보여줘요', () => {
    expect(formatAdmissionYear(2019)).toBe('19학번')
    expect(formatAdmissionYear(2005)).toBe('05학번')
  })
})
