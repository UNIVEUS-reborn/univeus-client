import { isRef, type IMocks, type IMockStore, type Ref } from '@graphql-tools/mock'

import defaultImage from '@src/assets/group/default_image.png'

const HOUR = 60 * 60 * 1000
const titles = ['같이 점심 먹어요', '토익 스터디 구해요', '저녁 메뉴는 뭘 먹을까', '공강에 보드게임 하실 분']
const nicknames = ['소하', '행쨩', '유니', '버스']

const pick = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)]
const between = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1))
const isEvenAt = (key: string, fromEnd: number) => key.charCodeAt(key.length - fromEnd) % 2 === 0

export const groupMocks: IMocks = {
  Group: () => {
    const meetingAt = new Date(Date.now() + between(24, 24 * 7) * HOUR)
    return {
      title: pick(titles),
      content: '학식 말고 맛집 가요\n편하게 오세요!',
      location: '이스퀘어 앞',
      meetingAt: meetingAt.toISOString(),
      recruitDeadlineAt: new Date(meetingAt.getTime() - 3 * HOUR).toISOString(),
      capacity: between(3, 5),
      status: 'RECRUITING',
      viewerJoinRestriction: 'NONE',
      participations: Array.from({ length: between(0, 3) }, () => ({})),
      images: Array.from({ length: between(0, 2) }, () => ({})),
    }
  },
  User: () => ({
    nickname: pick(nicknames),
    admissionYear: between(2019, 2024),
    isVerified: Math.random() < 0.5,
  }),
  Image: () => ({ url: defaultImage }),
  GroupConnection: () => ({
    edges: Array.from({ length: 10 }, () => ({})),
    pageInfo: { hasNextPage: true },
  }),
  CreateGroupResult: () => ({ error: null }),
  UpdateGroupResult: () => ({ error: null }),
  CloseGroupResult: () => ({ error: null }),
  DeleteGroupResult: () => ({ error: null }),
  CreateImageUploadUrlResult: () => ({ error: null }),
  JoinGroupResult: () => ({ error: null }),
  CancelParticipationResult: () => ({ error: null }),
  ApproveParticipationResult: () => ({ error: null }),
  Participation: () => ({ status: pick(['PARTICIPATING', 'PENDING']) }),
}

type GroupInput = {
  groupId?: string
  imageIds?: string[]
  participationMethod?: string
  [field: string]: unknown
}

export function groupResolvers(store: IMockStore) {
  const viewerRoles = new Map<string, string>()
  const participationMethods = new Map<string, string>()
  const viewerParticipations = new Map<string, Ref>()

  const participationMethodOf = (key: string) =>
    participationMethods.get(key) ?? (isEvenAt(key, 2) ? 'AUTO_APPROVAL' : 'MANUAL_APPROVAL')

  const refOf = (typeName: string, key: string): Ref => {
    const ref = store.get(typeName, key)
    if (!isRef(ref)) {
      throw new Error(`${typeName}:${key}를 찾을 수 없어요`)
    }
    return ref
  }

  const participationsOf = (group: Ref): Ref[] => {
    const items = store.get(group, 'participations')
    return Array.isArray(items) ? items.filter(isRef) : []
  }

  const countParticipating = (group: Ref) =>
    participationsOf(group).filter((participation) => store.get(participation, 'status') === 'PARTICIPATING').length

  const closeIfFull = (group: Ref) => {
    if (countParticipating(group) >= Number(store.get(group, 'capacity'))) {
      store.set(group, 'status', 'CLOSED_FULL')
    }
  }

  const applyInput = (group: Ref, { groupId: _groupId, imageIds = [], participationMethod, ...fields }: GroupInput) => {
    Object.entries(fields).forEach(([field, value]) => store.set(group, field, value))
    store.set(
      group,
      'images',
      imageIds.map((id) => refOf('Image', id)),
    )
    if (typeof participationMethod === 'string') {
      participationMethods.set(group.$ref.key, participationMethod)
    }
  }

  return {
    Group: {
      _id: (group: Ref) => group.$ref.key,
      viewerRole: (group: Ref) => viewerRoles.get(group.$ref.key) ?? (isEvenAt(group.$ref.key, 1) ? 'HOST' : 'NONE'),
      participationMethod: (group: Ref) => participationMethodOf(group.$ref.key),
      participantCount: (group: Ref) => countParticipating(group),
      participations: (group: Ref) => {
        const items = participationsOf(group)
        items.forEach((participation) => store.set(participation, 'group', group))
        return items
      },
    },
    Query: {
      group: (_: unknown, { groupId }: { groupId: string }) => refOf('Group', groupId),
    },
    Mutation: {
      createGroup: (_: unknown, { input }: { input: GroupInput }) => {
        const key = crypto.randomUUID()
        const group = refOf('Group', key)
        applyInput(group, input)
        store.set(group, 'status', 'RECRUITING')
        store.set(group, 'participations', [])
        viewerRoles.set(key, 'HOST')
        return { edge: { cursor: key, node: group }, error: null }
      },
      updateGroup: (_: unknown, { input }: { input: GroupInput & { groupId: string } }) => {
        const group = refOf('Group', input.groupId)
        applyInput(group, input)
        return { group, error: null }
      },
      closeGroup: (_: unknown, { input }: { input: { groupId: string } }) => {
        const group = refOf('Group', input.groupId)
        store.set(group, 'status', 'CLOSED_BY_HOST')
        return { group, error: null }
      },
      deleteGroup: (_: unknown, { input }: { input: { groupId: string } }) => ({
        success: true,
        deletedId: input.groupId,
        error: null,
      }),
      createImageUploadUrl: () => ({ uploadUrl: 'mock', imageId: crypto.randomUUID(), error: null }),
      joinGroup: (_: unknown, { input }: { input: { groupId: string } }) => {
        const group = refOf('Group', input.groupId)
        const isAuto = participationMethodOf(input.groupId) === 'AUTO_APPROVAL'
        const participation = refOf('Participation', crypto.randomUUID())
        store.set(participation, 'status', isAuto ? 'PARTICIPATING' : 'PENDING')
        store.set(group, 'participations', [...participationsOf(group), participation])
        viewerParticipations.set(input.groupId, participation)
        viewerRoles.set(input.groupId, isAuto ? 'PARTICIPANT' : 'PENDING')
        closeIfFull(group)
        return { group, error: null }
      },
      cancelParticipation: (_: unknown, { input }: { input: { groupId: string } }) => {
        const group = refOf('Group', input.groupId)
        const mine = viewerParticipations.get(input.groupId)
        store.set(
          group,
          'participations',
          participationsOf(group).filter((participation) => participation.$ref.key !== mine?.$ref.key),
        )
        viewerParticipations.delete(input.groupId)
        viewerRoles.set(input.groupId, 'NONE')
        return { group, error: null }
      },
      approveParticipation: (_: unknown, { input }: { input: { participationId: string } }) => {
        const participation = refOf('Participation', input.participationId)
        store.set(participation, 'status', 'PARTICIPATING')
        const group = store.get(participation, 'group')
        if (isRef(group)) {
          closeIfFull(group)
        }
        return { participation, error: null }
      },
    },
  }
}
