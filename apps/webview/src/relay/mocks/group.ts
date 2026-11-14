import type { IMocks } from '@graphql-tools/mock'

import defaultImage from '@src/assets/group/default_image.png'

const HOUR = 60 * 60 * 1000
const titles = ['같이 점심 먹어요', '토익 스터디 구해요', '저녁 메뉴는 뭘 먹을까', '공강에 보드게임 하실 분']
const nicknames = ['소하', '행쨩', '유니', '버스']

const pick = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)]
const between = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1))

export const groupMocks: IMocks = {
  Group: () => {
    const meetingAt = new Date(Date.now() + between(24, 24 * 7) * HOUR)
    const capacity = between(1, 5)
    return {
      title: pick(titles),
      content: '학식 말고 맛집 가요\n편하게 오세요!',
      location: '이스퀘어 앞',
      meetingAt: meetingAt.toISOString(),
      recruitDeadlineAt: new Date(meetingAt.getTime() - 3 * HOUR).toISOString(),
      capacity,
      participantCount: between(0, capacity),
      status: 'RECRUITING',
      viewerRole: 'HOST',
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
}

type Input = Record<string, unknown> & { groupId?: string; imageIds?: string[] }

const groupIds = new Map<string, string>()

const stableGroupId = (groupId: string) => {
  const id = groupIds.get(groupId) ?? crypto.randomUUID()
  groupIds.set(groupId, id)
  return id
}

const toGroup = ({ imageIds = [], ...input }: Input) => ({
  ...input,
  images: imageIds.map((id) => ({ id, url: defaultImage })),
})

export const groupResolvers = {
  Query: {
    group: (_: unknown, { groupId }: { groupId: string }) => ({ id: stableGroupId(groupId), _id: groupId }),
  },
  Mutation: {
    createGroup: (_: unknown, { input }: { input: Input }) => ({
      edge: { node: { ...toGroup(input), participantCount: 0, status: 'RECRUITING', viewerRole: 'HOST' } },
      error: null,
    }),
    updateGroup: (_: unknown, { input: { groupId, ...input } }: { input: Input }) => ({
      group: { id: groupId, ...toGroup(input) },
      error: null,
    }),
    closeGroup: (_: unknown, { input }: { input: { groupId: string } }) => ({
      group: { id: input.groupId, status: 'CLOSED_BY_HOST' },
      error: null,
    }),
    deleteGroup: (_: unknown, { input }: { input: { groupId: string } }) => ({
      success: true,
      deletedId: input.groupId,
      error: null,
    }),
    createImageUploadUrl: () => ({ uploadUrl: 'mock', imageId: crypto.randomUUID(), error: null }),
  },
}
