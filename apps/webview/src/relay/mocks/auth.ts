import { isRef, type IMockStore } from '@graphql-tools/mock'

import { VIEWER_USER_KEY } from '@src/relay/mocks/profile'

type SignupStep = 'IDENTITY_VERIFICATION' | 'TERMS_AGREEMENT' | 'AFFILIATION' | 'PROFILE'
type MockAuth = { status: 'SIGNED_OUT' | 'SIGNING_UP' | 'SIGNED_IN'; signupStep: SignupStep | null }

const STORAGE_KEY = 'mock-auth'
const SIGNED_IN: MockAuth = { status: 'SIGNED_IN', signupStep: null }
const NEXT_STEP: Record<SignupStep, SignupStep | null> = {
  IDENTITY_VERIFICATION: 'TERMS_AGREEMENT',
  TERMS_AGREEMENT: 'AFFILIATION',
  AFFILIATION: 'PROFILE',
  PROFILE: null,
}

let memory: MockAuth = SIGNED_IN

const isMockAuth = (value: unknown): value is MockAuth =>
  typeof value === 'object' && value !== null && 'status' in value && 'signupStep' in value

const readAuth = (): MockAuth => {
  if (typeof sessionStorage === 'undefined') {
    return memory
  }
  const saved: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null')
  return isMockAuth(saved) ? saved : SIGNED_IN
}

const writeAuth = (auth: MockAuth) => {
  memory = auth
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
  }
  return { id: 'AuthState', ...auth }
}

const advance = () => {
  const { signupStep } = readAuth()
  const next = signupStep === null ? null : NEXT_STEP[signupStep]
  return writeAuth(next === null ? SIGNED_IN : { status: 'SIGNING_UP', signupStep: next })
}

export function authResolvers(store: IMockStore) {
  return {
    Query: {
      authState: () => ({ id: 'AuthState', ...readAuth() }),
    },
    Mutation: {
      signInWithGoogle: () => ({
        authState: writeAuth({ status: 'SIGNING_UP', signupStep: 'IDENTITY_VERIFICATION' }),
        error: null,
      }),
      signOut: () => ({ authState: writeAuth({ status: 'SIGNED_OUT', signupStep: null }), error: null }),
      requestPhoneVerification: () => ({ success: true, error: null }),
      verifyPhone: (_: unknown, { input }: { input: { code: string } }) =>
        input.code === '123456'
          ? { authState: advance(), error: null }
          : {
              authState: null,
              error: { __typename: 'InvalidVerificationCodeError', message: '인증번호가 일치하지 않습니다.' },
            },
      agreeToTerms: (_: unknown, { input }: { input: { serviceTerms: boolean; privacyPolicy: boolean } }) =>
        input.serviceTerms && input.privacyPolicy
          ? { authState: advance(), error: null }
          : {
              authState: null,
              error: { __typename: 'RequiredTermsNotAgreedError', message: '필수 약관에 동의해주세요.' },
            },
      registerAffiliation: () => ({ authState: advance(), error: null }),
      registerProfile: (
        _: unknown,
        { input }: { input: { nickname: string; gender: string; profileImageId?: string | null } },
      ) => {
        if (input.nickname.includes('중복')) {
          return {
            authState: null,
            error: { __typename: 'DuplicatedNicknameError', message: '중복된 닉네임입니다.' },
          }
        }
        const user = store.get('User', VIEWER_USER_KEY)
        if (isRef(user)) {
          store.set(user, 'nickname', input.nickname)
          store.set(user, 'gender', input.gender)
          store.set(
            user,
            'profileImage',
            typeof input.profileImageId === 'string' ? store.get('Image', input.profileImageId) : null,
          )
        }
        return { authState: advance(), error: null }
      },
    },
  }
}
