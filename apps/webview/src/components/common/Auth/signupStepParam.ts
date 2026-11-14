import type { SignupStepParam } from '@src/routes/activityParams'

type SignupStep = 'IDENTITY_VERIFICATION' | 'TERMS_AGREEMENT' | 'AFFILIATION' | 'PROFILE'

const STEP_PARAMS: Record<SignupStep, SignupStepParam> = {
  IDENTITY_VERIFICATION: 'identity',
  TERMS_AGREEMENT: 'terms',
  AFFILIATION: 'affiliation',
  PROFILE: 'profile',
}

export function toSignupStepParam(step: SignupStep) {
  return STEP_PARAMS[step]
}
