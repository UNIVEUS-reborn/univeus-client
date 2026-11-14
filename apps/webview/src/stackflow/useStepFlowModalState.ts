import type { RegisteredActivityName } from '@stackflow/config'
import { useActivity } from '@stackflow/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useStepFlow } from '@src/stackflow/useStepFlow'

export function useStepFlowModalState<Name extends RegisteredActivityName>(activityName: Name, modalId: string) {
  const [uuid] = useState(() => crypto.randomUUID())
  const key = `modal-${modalId}-${uuid}`
  const { params } = useActivity()
  const { pushStep, popStep } = useStepFlow(activityName)
  const isOpen = params[key] === 'true'
  const closing = useRef<{ promise: Promise<void>; resolve: () => void } | null>(null)

  const open = useCallback(() => {
    if (isOpen) {
      return
    }
    pushStep((prev) => ({ ...prev, [key]: 'true' }))
  }, [isOpen, key, pushStep])

  const close = useCallback(() => {
    if (!isOpen) {
      return Promise.resolve()
    }
    if (closing.current !== null) {
      return closing.current.promise
    }
    let resolve = () => {}
    const promise = new Promise<void>((r) => {
      resolve = r
    })
    closing.current = { promise, resolve }
    popStep()
    return promise
  }, [isOpen, popStep])

  useEffect(() => {
    if (isOpen) {
      return
    }
    closing.current?.resolve()
    closing.current = null
  }, [isOpen])

  return [isOpen, open, close] as const
}
