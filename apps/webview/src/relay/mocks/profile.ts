import { isRef, type IMocks, type IMockStore, type Ref } from '@graphql-tools/mock'

import { validateNickname } from '@src/components/common/User/domain/nickname'

export const VIEWER_USER_KEY = 'viewer'

type Introduction = Record<string, string | null>

const sampleIntroduction: Introduction = {
  mbti: 'ENFP',
  favoriteFood: '떡볶이',
  recentSong: null,
  interest: '보드게임',
  matchingPerson: null,
  collegeGoal: '교환학생',
}

export const profileMocks: IMocks = {
  Viewer: () => ({ marketingAgreed: true }),
}

export function profileResolvers(store: IMockStore) {
  const introductions = new Map<string, Introduction>()

  const refOf = (typeName: string, key: string): Ref => {
    const ref = store.get(typeName, key)
    if (!isRef(ref)) {
      throw new Error(`${typeName}:${key}를 찾을 수 없어요`)
    }
    return ref
  }

  const viewerRef = () => {
    const viewer = refOf('Viewer', 'me')
    store.set(viewer, 'user', refOf('User', VIEWER_USER_KEY))
    return viewer
  }

  return {
    User: {
      _id: (user: Ref) => user.$ref.key,
      isViewer: (user: Ref) => user.$ref.key === VIEWER_USER_KEY,
      introduction: (user: Ref) => {
        const key = user.$ref.key
        const saved = introductions.get(key)
        if (saved !== undefined) {
          return saved
        }
        if (key === VIEWER_USER_KEY || key.charCodeAt(key.length - 1) % 2 === 0) {
          return null
        }
        return sampleIntroduction
      },
    },
    Query: {
      viewer: viewerRef,
      user: (_: unknown, { userId }: { userId: string }) => refOf('User', userId),
      nicknameAvailability: (_: unknown, { nickname }: { nickname: string }) => {
        if (validateNickname(nickname).type === 'INVALID') {
          return 'INVALID_FORMAT'
        }
        return nickname.includes('중복') ? 'DUPLICATED' : 'AVAILABLE'
      },
    },
    Mutation: {
      saveIntroduction: (_: unknown, { input }: { input: Introduction }) => {
        introductions.set(VIEWER_USER_KEY, input)
        return { user: refOf('User', VIEWER_USER_KEY), error: null }
      },
      updateProfile: (_: unknown, { input }: { input: { nickname: string; profileImageId?: string | null } }) => {
        if (input.nickname.includes('중복')) {
          return { user: null, error: { __typename: 'DuplicatedNicknameError', message: '중복된 닉네임입니다.' } }
        }
        const user = refOf('User', VIEWER_USER_KEY)
        store.set(user, 'nickname', input.nickname)
        store.set(
          user,
          'profileImage',
          typeof input.profileImageId === 'string' ? refOf('Image', input.profileImageId) : null,
        )
        return { user, error: null }
      },
      updateMarketingAgreement: (_: unknown, { input }: { input: { agreed: boolean } }) => {
        const viewer = viewerRef()
        store.set(viewer, 'marketingAgreed', input.agreed)
        return { viewer, error: null }
      },
    },
  }
}
