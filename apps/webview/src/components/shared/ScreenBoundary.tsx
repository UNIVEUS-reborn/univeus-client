import { Suspense, type ReactNode } from 'react'

import { ErrorBoundary, ErrorView } from '@src/components/shared/ErrorBoundary'
import { ScreenLayout } from '@src/components/shared/ScreenLayout'
import { Spinner } from '@src/components/shared/Spinner'

type Props = {
  children: ReactNode
}

export function ScreenBoundary({ children }: Props) {
  return (
    <ErrorBoundary
      renderFallback={(reset) => (
        <ScreenLayout>
          <ErrorView onRetry={reset} />
        </ScreenLayout>
      )}
    >
      <Suspense
        fallback={
          <ScreenLayout>
            <Spinner />
          </ScreenLayout>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}
