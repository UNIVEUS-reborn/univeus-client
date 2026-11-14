import { toKstDateTime } from '@src/utils/dateTime'

export const GROUP_CAPACITY_MIN = 1
export const GROUP_CAPACITY_MAX = 5
export const GROUP_LOCATION_MAX_LENGTH = 24
export const GROUP_MEETING_MIN_LEAD_HOURS = 3
export const GROUP_TITLE_MAX_LENGTH = 48
export const GROUP_CONTENT_MAX_LENGTH = 500

export type GroupCategory =
  | 'FREE_PERIOD'
  | 'CAREER'
  | 'HOBBY_CULTURE'
  | 'HABIT'
  | 'FOOD'
  | 'JOB_HUNTING'
  | 'CLASS_FRIEND'
  | 'ETC'
export type ParticipationMethod = 'AUTO_APPROVAL' | 'MANUAL_APPROVAL'
export type GenderRestriction = 'ANY' | 'MALE_ONLY' | 'FEMALE_ONLY'

export type GroupBasicsInput = {
  category: GroupCategory | null
  participationMethod: ParticipationMethod | null
  genderRestriction: GenderRestriction | null
  capacity: number | null
  participantCount: number
}

export type GroupBasics = {
  category: GroupCategory
  participationMethod: ParticipationMethod
  genderRestriction: GenderRestriction
  capacity: number
}

export type GroupScheduleInput = {
  date: string
  time: string
  location: string
}

export type GroupSchedule = {
  meetingAt: string
  location: string
}

export type GroupContentInput = {
  title: string
  content: string
}

export function validateGroupBasics({
  category,
  participationMethod,
  genderRestriction,
  capacity,
  participantCount,
}: GroupBasicsInput):
  | { type: 'VALID'; value: GroupBasics }
  | { type: 'INVALID'; reason: 'INCOMPLETE' | 'CAPACITY_OUT_OF_RANGE' | 'CAPACITY_BELOW_PARTICIPANTS' } {
  if (category === null || participationMethod === null || genderRestriction === null || capacity === null) {
    return { type: 'INVALID', reason: 'INCOMPLETE' }
  }
  if (!Number.isInteger(capacity) || capacity < GROUP_CAPACITY_MIN || capacity > GROUP_CAPACITY_MAX) {
    return { type: 'INVALID', reason: 'CAPACITY_OUT_OF_RANGE' }
  }
  if (capacity < participantCount) {
    return { type: 'INVALID', reason: 'CAPACITY_BELOW_PARTICIPANTS' }
  }
  return { type: 'VALID', value: { category, participationMethod, genderRestriction, capacity } }
}

export function validateGroupSchedule(
  { date, time, location }: GroupScheduleInput,
  now: Date,
):
  | { type: 'VALID'; value: GroupSchedule }
  | { type: 'INVALID'; reason: 'INCOMPLETE' | 'INVALID_DATETIME' | 'LOCATION_TOO_LONG' | 'MEETING_TOO_SOON' } {
  const trimmedLocation = location.trim()
  if (date.trim() === '' || time.trim() === '' || trimmedLocation === '') {
    return { type: 'INVALID', reason: 'INCOMPLETE' }
  }
  const meetingAt = toKstDateTime(date, time)
  if (meetingAt === null) {
    return { type: 'INVALID', reason: 'INVALID_DATETIME' }
  }
  if (trimmedLocation.length > GROUP_LOCATION_MAX_LENGTH) {
    return { type: 'INVALID', reason: 'LOCATION_TOO_LONG' }
  }
  if (new Date(meetingAt).getTime() < now.getTime() + GROUP_MEETING_MIN_LEAD_HOURS * 60 * 60 * 1000) {
    return { type: 'INVALID', reason: 'MEETING_TOO_SOON' }
  }
  return { type: 'VALID', value: { meetingAt, location: trimmedLocation } }
}

export function validateGroupContent({
  title,
  content,
}: GroupContentInput):
  | { type: 'VALID'; value: GroupContentInput }
  | { type: 'INVALID'; reason: 'INCOMPLETE' | 'TITLE_TOO_LONG' | 'CONTENT_TOO_LONG' } {
  const trimmedTitle = title.trim()
  const trimmedContent = content.trim()
  if (trimmedTitle === '' || trimmedContent === '') {
    return { type: 'INVALID', reason: 'INCOMPLETE' }
  }
  if (trimmedTitle.length > GROUP_TITLE_MAX_LENGTH) {
    return { type: 'INVALID', reason: 'TITLE_TOO_LONG' }
  }
  if (trimmedContent.length > GROUP_CONTENT_MAX_LENGTH) {
    return { type: 'INVALID', reason: 'CONTENT_TOO_LONG' }
  }
  return { type: 'VALID', value: { title: trimmedTitle, content: trimmedContent } }
}
