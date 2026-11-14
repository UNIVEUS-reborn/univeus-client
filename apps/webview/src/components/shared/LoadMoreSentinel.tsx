import { useEffect, useRef } from 'react'

import { Spinner } from '@src/components/shared/Spinner'

type Props = {
  loading: boolean
  onVisible: () => void
}

export function LoadMoreSentinel({ loading, onVisible }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (element === null) {
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onVisible()
      }
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [onVisible])

  return <div ref={ref}>{loading && <Spinner />}</div>
}
