import { useEffect, useMemo } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import type { SignupStepResolverQuery } from '@src/__generated__/SignupStepResolverQuery.graphql'
import { classifyAuthDestination, type AuthDestination } from '@src/components/common/Auth/domain/authDestination'
import { readAuthDestination } from '@src/components/common/Auth/domain/authDestination.relay'

export function SignupStepResolver({ onResolve }: { onResolve: (destination: AuthDestination) => void }) {
  const { authState } = useLazyLoadQuery<SignupStepResolverQuery>(
    graphql`
      query SignupStepResolverQuery {
        authState {
          id
          ...authDestination_authState
        }
      }
    `,
    {},
    { fetchPolicy: 'store-or-network' },
  )
  const destination = useMemo(() => classifyAuthDestination(readAuthDestination(authState)), [authState])

  useEffect(() => {
    onResolve(destination)
  }, [destination, onResolve])

  return null
}
