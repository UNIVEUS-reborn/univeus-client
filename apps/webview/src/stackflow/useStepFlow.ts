import type { RegisteredActivityName } from '@stackflow/config'
import { useActivity, useStepFlow as useStackflowStepFlow } from '@stackflow/react'
import { useMemo } from 'react'

export function useStepFlow<Name extends RegisteredActivityName>(activityName: Name) {
  const { id } = useActivity()
  const { pushStep, replaceStep, popStep } = useStackflowStepFlow(activityName)

  return useMemo(() => {
    const targetPushStep: typeof pushStep = (params, options) => pushStep(params, { targetActivityId: id, ...options })
    const targetReplaceStep: typeof replaceStep = (params, options) =>
      replaceStep(params, { targetActivityId: id, ...options })
    const targetPopStep: typeof popStep = (options) => popStep({ targetActivityId: id, ...options })

    return { pushStep: targetPushStep, replaceStep: targetReplaceStep, popStep: targetPopStep }
  }, [id, pushStep, replaceStep, popStep])
}
