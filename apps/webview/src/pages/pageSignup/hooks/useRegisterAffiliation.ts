import { graphql, useMutation } from 'react-relay'

import type { useRegisterAffiliationMutation } from '@src/__generated__/useRegisterAffiliationMutation.graphql'
import type { College } from '@src/pages/pageSignup/domain/affiliation'
import { handleSignupResult, type SignupCallbacks } from '@src/pages/pageSignup/hooks/signupMutationResult'
import { NETWORK_ERROR_MESSAGE } from '@src/relay/mutationError'

export function useRegisterAffiliation() {
  const [commit, isInFlight] = useMutation<useRegisterAffiliationMutation>(graphql`
    mutation useRegisterAffiliationMutation($input: RegisterAffiliationInput!) {
      registerAffiliation(input: $input) {
        authState {
          id
          ...authDestination_authState
        }
        error {
          __typename
          ... on InvalidStudentIdError {
            message
          }
          ... on UnexpectedError {
            message
          }
        }
      }
    }
  `)

  const registerAffiliation = (input: { college: College; studentId: string }, callbacks: SignupCallbacks) =>
    commit({
      variables: { input },
      onCompleted: ({ registerAffiliation: result }) => handleSignupResult(result, callbacks),
      onError: () => callbacks.onFailure(NETWORK_ERROR_MESSAGE),
    })

  return { registerAffiliation, isInFlight }
}
