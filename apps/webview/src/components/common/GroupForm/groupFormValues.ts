import type {
  GenderRestriction,
  GroupBasics,
  GroupCategory,
  GroupContentInput,
  GroupSchedule,
  ParticipationMethod,
} from '@src/components/common/GroupForm/domain/groupForm'

export type GroupFormImage = {
  id: string
  url: string
  isLocal: boolean
}

export type GroupFormValues = {
  category: GroupCategory | null
  participationMethod: ParticipationMethod | null
  genderRestriction: GenderRestriction | null
  capacity: number | null
  date: string
  time: string
  location: string
  title: string
  content: string
  images: GroupFormImage[]
}

export type GroupFormSubmitValues = GroupBasics & GroupSchedule & GroupContentInput & { imageIds: string[] }

export const emptyGroupFormValues: GroupFormValues = {
  category: null,
  participationMethod: null,
  genderRestriction: null,
  capacity: null,
  date: '',
  time: '',
  location: '',
  title: '',
  content: '',
  images: [],
}
