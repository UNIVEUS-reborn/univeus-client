import type { RegisteredActivityName } from '@stackflow/config'
import { useFlow, useStepFlow } from '@stackflow/react'

export function useNavigator() {
  const { push, replace, pop } = useFlow()
  return { push, replace, pop }
}

export function useStepNavigator<Name extends RegisteredActivityName>(activityName: Name) {
  const { pushStep, replaceStep, popStep } = useStepFlow(activityName)
  return { pushStep, replaceStep, popStep }
}
