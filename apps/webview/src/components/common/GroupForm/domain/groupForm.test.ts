import { describe, expect, it } from 'vitest'

import {
  validateGroupBasics,
  validateGroupContent,
  validateGroupSchedule,
} from '@src/components/common/GroupForm/domain/groupForm'
import {
  completeBasics,
  completeContent,
  completeSchedule,
  emptyBasics,
  scheduleNow,
} from '@src/components/common/GroupForm/domain/groupFormFixtures'

describe('validateGroupBasics', () => {
  it('네 항목을 다 고르면 고른 값을 돌려줘요', () => {
    expect(validateGroupBasics(completeBasics)).toEqual({
      type: 'VALID',
      value: { category: 'FOOD', participationMethod: 'AUTO_APPROVAL', genderRestriction: 'ANY', capacity: 3 },
    })
  })

  it.each(['category', 'participationMethod', 'genderRestriction', 'capacity'] as const)(
    '%s를 고르지 않으면 미완료예요',
    (field) => {
      expect(validateGroupBasics({ ...completeBasics, [field]: null })).toEqual({
        type: 'INVALID',
        reason: 'INCOMPLETE',
      })
    },
  )

  it('아무것도 고르지 않으면 미완료예요', () => {
    expect(validateGroupBasics(emptyBasics)).toEqual({ type: 'INVALID', reason: 'INCOMPLETE' })
  })

  it.each([1, 5])('인원 %i명은 고를 수 있어요', (capacity) => {
    expect(validateGroupBasics({ ...completeBasics, capacity })).toEqual({
      type: 'VALID',
      value: { category: 'FOOD', participationMethod: 'AUTO_APPROVAL', genderRestriction: 'ANY', capacity },
    })
  })

  it.each([0, 6, 2.5])('인원 %s명은 범위를 벗어나요', (capacity) => {
    expect(validateGroupBasics({ ...completeBasics, capacity })).toEqual({
      type: 'INVALID',
      reason: 'CAPACITY_OUT_OF_RANGE',
    })
  })

  it('인원이 현재 참여 인원보다 적으면 안 돼요', () => {
    expect(validateGroupBasics({ ...completeBasics, capacity: 2, participantCount: 3 })).toEqual({
      type: 'INVALID',
      reason: 'CAPACITY_BELOW_PARTICIPANTS',
    })
  })

  it('인원이 현재 참여 인원과 같으면 괜찮아요', () => {
    expect(validateGroupBasics({ ...completeBasics, capacity: 3, participantCount: 3 })).toEqual({
      type: 'VALID',
      value: { category: 'FOOD', participationMethod: 'AUTO_APPROVAL', genderRestriction: 'ANY', capacity: 3 },
    })
  })

  it('미완료가 범위 초과보다 먼저예요', () => {
    expect(validateGroupBasics({ ...completeBasics, category: null, capacity: 6 })).toEqual({
      type: 'INVALID',
      reason: 'INCOMPLETE',
    })
  })

  it('범위 초과가 참여 인원 부족보다 먼저예요', () => {
    expect(validateGroupBasics({ ...completeBasics, capacity: 6, participantCount: 7 })).toEqual({
      type: 'INVALID',
      reason: 'CAPACITY_OUT_OF_RANGE',
    })
  })
})

describe('validateGroupSchedule', () => {
  it('지금부터 정확히 3시간 뒤면 KST 일시와 장소를 돌려줘요', () => {
    expect(validateGroupSchedule(completeSchedule, scheduleNow)).toEqual({
      type: 'VALID',
      value: { meetingAt: '2026-11-12T13:00:00+09:00', location: '이스퀘어 앞' },
    })
  })

  it('장소 앞뒤 공백을 지워서 돌려줘요', () => {
    expect(validateGroupSchedule({ ...completeSchedule, location: '  이스퀘어 앞  ' }, scheduleNow)).toEqual({
      type: 'VALID',
      value: { meetingAt: '2026-11-12T13:00:00+09:00', location: '이스퀘어 앞' },
    })
  })

  it('3시간이 안 남았으면 너무 이른 모임이에요', () => {
    expect(validateGroupSchedule({ ...completeSchedule, time: '12:59' }, scheduleNow)).toEqual({
      type: 'INVALID',
      reason: 'MEETING_TOO_SOON',
    })
  })

  it('지난 날짜면 너무 이른 모임이에요', () => {
    expect(validateGroupSchedule({ ...completeSchedule, date: '2026-11-11' }, scheduleNow)).toEqual({
      type: 'INVALID',
      reason: 'MEETING_TOO_SOON',
    })
  })

  it.each([
    ['날짜', { date: '' }],
    ['시간', { time: '' }],
    ['장소', { location: '' }],
    ['공백만 있는 장소', { location: '   ' }],
  ])('%s가 비어 있으면 미완료예요', (_, override) => {
    expect(validateGroupSchedule({ ...completeSchedule, ...override }, scheduleNow)).toEqual({
      type: 'INVALID',
      reason: 'INCOMPLETE',
    })
  })

  it.each([
    ['없는 날짜', { date: '2026-02-30' }],
    ['없는 월', { date: '2026-13-01' }],
    ['없는 시간', { time: '25:00' }],
    ['형식이 다른 날짜', { date: '2026/11/20' }],
  ])('%s면 일시가 잘못됐어요', (_, override) => {
    expect(validateGroupSchedule({ ...completeSchedule, ...override }, scheduleNow)).toEqual({
      type: 'INVALID',
      reason: 'INVALID_DATETIME',
    })
  })

  it('장소는 24자까지 괜찮아요', () => {
    const location = '가'.repeat(24)
    expect(validateGroupSchedule({ ...completeSchedule, location }, scheduleNow)).toEqual({
      type: 'VALID',
      value: { meetingAt: '2026-11-12T13:00:00+09:00', location },
    })
  })

  it('장소가 24자를 넘으면 너무 길어요', () => {
    expect(validateGroupSchedule({ ...completeSchedule, location: '가'.repeat(25) }, scheduleNow)).toEqual({
      type: 'INVALID',
      reason: 'LOCATION_TOO_LONG',
    })
  })

  it('미완료가 다른 이유보다 먼저예요', () => {
    expect(validateGroupSchedule({ date: '2026-02-30', time: '13:00', location: '' }, scheduleNow)).toEqual({
      type: 'INVALID',
      reason: 'INCOMPLETE',
    })
  })
})

describe('validateGroupContent', () => {
  it('제목과 내용이 있으면 앞뒤 공백을 지워서 돌려줘요', () => {
    expect(validateGroupContent({ title: ' 같이 점심 먹어요 ', content: '\n학식 말고 맛집 가요\n' })).toEqual({
      type: 'VALID',
      value: completeContent,
    })
  })

  it.each([
    ['제목', { title: '' }],
    ['공백만 있는 제목', { title: '   ' }],
    ['내용', { content: '' }],
    ['공백만 있는 내용', { content: '\n\n' }],
  ])('%s가 비어 있으면 미완료예요', (_, override) => {
    expect(validateGroupContent({ ...completeContent, ...override })).toEqual({
      type: 'INVALID',
      reason: 'INCOMPLETE',
    })
  })

  it('제목은 48자, 내용은 500자까지 괜찮아요', () => {
    const value = { title: '가'.repeat(48), content: '가'.repeat(500) }
    expect(validateGroupContent(value)).toEqual({ type: 'VALID', value })
  })

  it('앞뒤 공백은 글자 수에 넣지 않아요', () => {
    expect(validateGroupContent({ ...completeContent, title: ` ${'가'.repeat(48)} ` })).toEqual({
      type: 'VALID',
      value: { ...completeContent, title: '가'.repeat(48) },
    })
  })

  it('제목이 48자를 넘으면 너무 길어요', () => {
    expect(validateGroupContent({ ...completeContent, title: '가'.repeat(49) })).toEqual({
      type: 'INVALID',
      reason: 'TITLE_TOO_LONG',
    })
  })

  it('내용이 500자를 넘으면 너무 길어요', () => {
    expect(validateGroupContent({ ...completeContent, content: '가'.repeat(501) })).toEqual({
      type: 'INVALID',
      reason: 'CONTENT_TOO_LONG',
    })
  })
})
