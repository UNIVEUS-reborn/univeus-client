import { useCallback } from 'react'

import type { AuthDestination } from '@src/components/common/Auth/domain/authDestination'
import { toSignupStepParam } from '@src/components/common/Auth/signupStepParam'
import { Activity } from '@src/routes/activityNames'
import type { SignupStepParam } from '@src/routes/activityParams'
import { useFlow } from '@src/stackflow/useFlow'

type Options = {
  animate?: boolean
  replaceSignupStep?: (step: SignupStepParam) => void
}

export function useAuthNavigation({ animate, replaceSignupStep }: Options = {}) {
  const { replace } = useFlow()

  return useCallback(
    (destination: AuthDestination) => {
      switch (destination.type) {
        case 'LANDING':
          replace(Activity.LANDING, {}, { animate })
          return
        case 'SIGNUP': {
          const step = toSignupStepParam(destination.step)
          if (replaceSignupStep !== undefined) {
            replaceSignupStep(step)
            return
          }
          replace(Activity.SIGNUP, { step }, { animate })
          return
        }
        case 'MAIN':
          replace(Activity.MAIN, {}, { animate })
          return
      }
    },
    [animate, replace, replaceSignupStep],
  )
}
