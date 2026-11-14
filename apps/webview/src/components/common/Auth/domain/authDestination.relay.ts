import { graphql, readInlineData } from 'relay-runtime'

import type { authDestination_authState$key } from '@src/__generated__/authDestination_authState.graphql'
import type { AuthDestinationInput } from '@src/components/common/Auth/domain/authDestination'

export function readAuthDestination(authStateRef: authDestination_authState$key): AuthDestinationInput {
  return readInlineData(
    graphql`
      fragment authDestination_authState on AuthState @inline {
        status
        signupStep
      }
    `,
    authStateRef,
  )
}
