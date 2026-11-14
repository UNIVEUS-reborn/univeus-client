import { useEffect, useMemo, type ReactNode } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { MainAuthGateQuery } from '@src/__generated__/MainAuthGateQuery.graphql'
import { classifyAuthDestination } from '@src/components/common/Auth/domain/authDestination'
import { readAuthDestination } from '@src/components/common/Auth/domain/authDestination.relay'
import { useAuthNavigation } from '@src/components/common/Auth/useAuthNavigation'

export function MainAuthGate({ children }: { children: ReactNode }) {
  const { authState } = useLazyLoadQuery<MainAuthGateQuery>(
    graphql`
      query MainAuthGateQuery {
        authState {
          id
          ...authDestination_authState
        }
      }
    `,
    {},
    { fetchPolicy: 'store-and-network' },
  )
  const destination = useMemo(() => classifyAuthDestination(readAuthDestination(authState)), [authState])
  const navigate = useAuthNavigation({ animate: false })

  useEffect(() => {
    if (destination.type !== 'MAIN') {
      navigate(destination)
    }
  }, [destination, navigate])

  return destination.type === 'MAIN' ? children : null
}
