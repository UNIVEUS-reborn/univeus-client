import { describe, expect, it } from 'vitest'

import { classifyAuthDestination } from '@src/components/common/Auth/domain/authDestination'
import { signedIn } from '@src/components/common/Auth/domain/authDestinationFixtures'

describe('classifyAuthDestination', () => {
  it('로그인했으면 홈이에요', () => {
    expect(classifyAuthDestination(signedIn)).toEqual({ type: 'MAIN' })
  })

  it('로그인했으면 가입 단계가 남아 있어도 홈이에요', () => {
    expect(classifyAuthDestination({ ...signedIn, signupStep: 'PROFILE' })).toEqual({ type: 'MAIN' })
  })

  it('로그아웃이면 랜딩이에요', () => {
    expect(classifyAuthDestination({ status: 'SIGNED_OUT', signupStep: null })).toEqual({ type: 'LANDING' })
  })

  it.each(['IDENTITY_VERIFICATION', 'TERMS_AGREEMENT', 'AFFILIATION', 'PROFILE'] as const)(
    '가입 중이면 남은 단계 %s로 가요',
    (signupStep) => {
      expect(classifyAuthDestination({ status: 'SIGNING_UP', signupStep })).toEqual({
        type: 'SIGNUP',
        step: signupStep,
      })
    },
  )

  it('가입 중인데 단계가 없으면 랜딩이에요', () => {
    expect(classifyAuthDestination({ status: 'SIGNING_UP', signupStep: null })).toEqual({ type: 'LANDING' })
  })

  it('가입 중인데 알 수 없는 단계면 랜딩이에요', () => {
    expect(classifyAuthDestination({ status: 'SIGNING_UP', signupStep: '%future added value' })).toEqual({
      type: 'LANDING',
    })
  })

  it('알 수 없는 상태면 랜딩이에요', () => {
    expect(classifyAuthDestination({ status: '%future added value', signupStep: null })).toEqual({ type: 'LANDING' })
  })
})
