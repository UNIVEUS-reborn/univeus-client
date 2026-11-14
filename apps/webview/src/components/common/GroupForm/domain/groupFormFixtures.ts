import type {
  GroupBasicsInput,
  GroupContentInput,
  GroupScheduleInput,
} from '@src/components/common/GroupForm/domain/groupForm'

export const completeBasics: GroupBasicsInput = {
  category: 'FOOD',
  participationMethod: 'AUTO_APPROVAL',
  genderRestriction: 'ANY',
  capacity: 3,
  participantCount: 0,
}

export const emptyBasics: GroupBasicsInput = {
  category: null,
  participationMethod: null,
  genderRestriction: null,
  capacity: null,
  participantCount: 0,
}

export const scheduleNow = new Date('2026-11-12T10:00:00+09:00')

export const completeSchedule: GroupScheduleInput = {
  date: '2026-11-12',
  time: '13:00',
  location: '이스퀘어 앞',
}

export const completeContent: GroupContentInput = {
  title: '같이 점심 먹어요',
  content: '학식 말고 맛집 가요',
}
