import { useActivityParams } from '@stackflow/react'
import { useCallback, useState } from 'react'

import { useAuthNavigation } from '@src/components/common/Auth/useAuthNavigation'
import { RequestFailureSheet } from '@src/components/shared/RequestFailureSheet'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { SignupStepResolver } from '@src/pages/pageSignup/SignupStepResolver'
import { AffiliationStep } from '@src/pages/pageSignup/steps/AffiliationStep'
import { IdentityStep } from '@src/pages/pageSignup/steps/IdentityStep'
import { ProfileStep } from '@src/pages/pageSignup/steps/ProfileStep'
import { TermsStep } from '@src/pages/pageSignup/steps/TermsStep'
import { Activity } from '@src/routes/activityNames'
import type { SignupStepParam } from '@src/routes/activityParams'
import { useStepFlow } from '@src/stackflow/useStepFlow'
import { useStepFlowModalState } from '@src/stackflow/useStepFlowModalState'

const TITLES: Record<SignupStepParam, string> = {
  identity: '본인인증',
  terms: '약관동의',
  affiliation: '소속등록',
  profile: '프로필 등록',
}

export function SignupScreen() {
  const { step } = useActivityParams<typeof Activity.SIGNUP>()
  const { replaceStep } = useStepFlow(Activity.SIGNUP)
  const replaceSignupStep = useCallback((next: SignupStepParam) => replaceStep({ step: next }), [replaceStep])
  const navigate = useAuthNavigation({ replaceSignupStep })
  const [failureMessage, setFailureMessage] = useState('')
  const [isFailureOpen, openFailure, closeFailure] = useStepFlowModalState(Activity.SIGNUP, 'failure')

  const showFailure = (message: string) => {
    setFailureMessage(message)
    openFailure()
  }
  const stepProps = { onComplete: navigate, onFailure: showFailure }

  return (
    <ScreenLayout title={step === undefined ? undefined : TITLES[step]}>
      {step === undefined && <SignupStepResolver onResolve={navigate} />}
      {step === 'identity' && <IdentityStep {...stepProps} />}
      {step === 'terms' && <TermsStep {...stepProps} />}
      {step === 'affiliation' && <AffiliationStep {...stepProps} />}
      {step === 'profile' && <ProfileStep {...stepProps} />}
      <RequestFailureSheet open={isFailureOpen} message={failureMessage} onClose={closeFailure} />
    </ScreenLayout>
  )
}
