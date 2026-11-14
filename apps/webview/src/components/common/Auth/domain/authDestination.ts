type AuthStatus = 'SIGNED_OUT' | 'SIGNING_UP' | 'SIGNED_IN' | '%future added value'
type SignupStep = 'IDENTITY_VERIFICATION' | 'TERMS_AGREEMENT' | 'AFFILIATION' | 'PROFILE' | '%future added value'
type KnownSignupStep = Exclude<SignupStep, '%future added value'>

export type AuthDestinationInput = {
  status: AuthStatus
  signupStep: SignupStep | null | undefined
}

export type AuthDestination = { type: 'LANDING' } | { type: 'SIGNUP'; step: KnownSignupStep } | { type: 'MAIN' }

export function classifyAuthDestination({ status, signupStep }: AuthDestinationInput): AuthDestination {
  switch (status) {
    case 'SIGNED_IN':
      return { type: 'MAIN' }
    case 'SIGNING_UP':
      if (signupStep === null || signupStep === undefined || signupStep === '%future added value') {
        return { type: 'LANDING' }
      }
      return { type: 'SIGNUP', step: signupStep }
    case 'SIGNED_OUT':
    case '%future added value':
      return { type: 'LANDING' }
  }
}
