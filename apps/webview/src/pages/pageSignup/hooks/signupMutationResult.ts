import type { authDestination_authState$key } from '@src/__generated__/authDestination_authState.graphql'
import { classifyAuthDestination, type AuthDestination } from '@src/components/common/Auth/domain/authDestination'
import { readAuthDestination } from '@src/components/common/Auth/domain/authDestination.relay'
import { NETWORK_ERROR_MESSAGE, toMutationErrorMessage } from '@src/relay/mutationError'

type Result<Error extends { readonly __typename: string }> = {
  readonly authState?: authDestination_authState$key | null
  readonly error?: Error | null
}

export type SignupCallbacks = {
  onSuccess: (destination: AuthDestination) => void
  onFailure: (message: string) => void
}

export function handleSignupResult<Error extends { readonly __typename: string; readonly message?: string }>(
  { authState, error }: Result<Error>,
  { onSuccess, onFailure }: SignupCallbacks,
  onError?: (error: Error) => boolean,
) {
  if (error !== null && error !== undefined) {
    if (onError?.(error) !== true) {
      onFailure(toMutationErrorMessage(error))
    }
    return
  }
  if (authState === null || authState === undefined) {
    onFailure(NETWORK_ERROR_MESSAGE)
    return
  }
  onSuccess(classifyAuthDestination(readAuthDestination(authState)))
}
